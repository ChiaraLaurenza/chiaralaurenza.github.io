"""Turn the public Google calendar "Teaching" into events.json for the website.

Runs daily in GitHub Actions (.github/workflows/events.yml) and can be run by
hand: python3 scripts/ics_to_events.py
Only the Python standard library is used.
"""
import json
import re
import urllib.request
from datetime import date, datetime, time, timedelta, timezone
from zoneinfo import ZoneInfo

ICS_URL = (
    "https://calendar.google.com/calendar/ical/"
    "b93956fa6ab2517b90d2557be617c93a3f4d48696f6e19791cc6fd7bff1b563d"
    "%40group.calendar.google.com/public/basic.ics"
)
LOCAL = ZoneInfo("Europe/Berlin")
DAYS_AHEAD = 120
MAX_EVENTS = 60
MAX_PER_SERIES = 4  # weekly classes: show only the next few dates
WEEKDAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]


def unfold(text):
    return re.sub(r"\r?\n[ \t]", "", text).splitlines()


def unescape(value):
    return (value.replace("\\n", "\n").replace("\\N", "\n")
            .replace("\\,", ",").replace("\\;", ";").replace("\\\\", "\\"))


def parse_events(text):
    events, current = [], None
    for line in unfold(text):
        if line == "BEGIN:VEVENT":
            current = {}
        elif line == "END:VEVENT":
            events.append(current)
            current = None
        elif current is not None and ":" in line:
            head, value = line.split(":", 1)
            name, *params = head.split(";")
            params = dict(p.split("=", 1) for p in params if "=" in p)
            current.setdefault(name, []).append((params, value))
    return events


def parse_dt(params, value):
    """Return (datetime in local time, all_day)."""
    if params.get("VALUE") == "DATE" or re.fullmatch(r"\d{8}", value):
        return datetime.combine(datetime.strptime(value, "%Y%m%d").date(), time(), LOCAL), True
    if value.endswith("Z"):
        dt = datetime.strptime(value, "%Y%m%dT%H%M%SZ").replace(tzinfo=timezone.utc)
        return dt.astimezone(LOCAL), False
    tz = ZoneInfo(params["TZID"]) if "TZID" in params else LOCAL
    return datetime.strptime(value, "%Y%m%dT%H%M%S").replace(tzinfo=tz).astimezone(LOCAL), False


def first(ev, name):
    return ev[name][0] if name in ev else ({}, "")


def occurrences(start, rule, window_end):
    """Expand simple DAILY/WEEKLY rules (INTERVAL, BYDAY, COUNT, UNTIL)."""
    parts = dict(p.split("=", 1) for p in rule.split(";") if "=" in p)
    freq = parts.get("FREQ")
    interval = int(parts.get("INTERVAL", "1"))
    count = int(parts["COUNT"]) if "COUNT" in parts else None
    until = None
    if "UNTIL" in parts:
        until, _ = parse_dt({}, parts["UNTIL"])
    if freq == "DAILY":
        step_days, days = interval, None
    elif freq == "WEEKLY":
        step_days = 7 * interval
        days = [WEEKDAYS.index(d[-2:]) for d in parts.get("BYDAY", WEEKDAYS[start.weekday()]).split(",")]
    else:
        return [start]
    out, n = [], 0
    week_start = start - timedelta(days=start.weekday())
    cursor = start if days is None else week_start
    while cursor <= window_end:
        candidates = [cursor] if days is None else [cursor + timedelta(days=d) for d in sorted(days)]
        for c in candidates:
            c = c.replace(hour=start.hour, minute=start.minute, second=0)
            if c < start:
                continue
            if until and c > until:
                return out
            if count is not None and n >= count:
                return out
            out.append(c)
            n += 1
        cursor += timedelta(days=step_days)
    return out


def google_add_link(summary, start, end, location, all_day):
    fmt = "%Y%m%d" if all_day else "%Y%m%dT%H%M%SZ"
    s = start.date().strftime(fmt) if all_day else start.astimezone(timezone.utc).strftime(fmt)
    e = end.date().strftime(fmt) if all_day else end.astimezone(timezone.utc).strftime(fmt)
    from urllib.parse import urlencode
    return "https://calendar.google.com/calendar/render?" + urlencode(
        {"action": "TEMPLATE", "text": summary, "dates": f"{s}/{e}", "location": location})


def main():
    with urllib.request.urlopen(ICS_URL, timeout=30) as r:
        text = r.read().decode("utf-8")
    now = datetime.now(LOCAL)
    window_end = now + timedelta(days=DAYS_AHEAD)
    raw = parse_events(text)

    # moved or cancelled single dates of a series
    overrides = {}
    for ev in raw:
        if "RECURRENCE-ID" in ev:
            p, v = first(ev, "RECURRENCE-ID")
            overrides[(first(ev, "UID")[1], parse_dt(p, v)[0])] = ev

    items = []
    for ev in raw:
        if "RECURRENCE-ID" in ev or first(ev, "STATUS")[1] == "CANCELLED":
            continue
        start, all_day = parse_dt(*first(ev, "DTSTART"))
        if "DTEND" in ev:
            end, _ = parse_dt(*first(ev, "DTEND"))
        else:
            end = start + (timedelta(days=1) if all_day else timedelta(hours=1))
        duration = end - start
        uid = first(ev, "UID")[1]
        excluded = set()
        for p, v in ev.get("EXDATE", []):
            for one in v.split(","):
                excluded.add(parse_dt(p, one)[0])
        rule = first(ev, "RRULE")[1]
        starts = occurrences(start, rule, window_end) if rule else [start]
        shown = 0
        for s in starts:
            if shown >= MAX_PER_SERIES:
                break
            if s in excluded:
                continue
            item = overrides.get((uid, s), ev)
            if item is not ev:
                if first(item, "STATUS")[1] == "CANCELLED":
                    continue
                s, all_day = parse_dt(*first(item, "DTSTART"))
                e = parse_dt(*first(item, "DTEND"))[0] if "DTEND" in item else s + duration
            else:
                e = s + duration
            if e < now or s > window_end:
                continue
            summary = unescape(first(item, "SUMMARY")[1])
            summary = re.sub(r"^\s*Teaching:\s*", "", summary)
            location = unescape(first(item, "LOCATION")[1])
            entry = {
                "summary": summary,
                "location": location,
                "description": unescape(first(item, "DESCRIPTION")[1]),
                "start": {"date": s.date().isoformat()} if all_day else {"dateTime": s.isoformat()},
                "end": {"date": e.date().isoformat()} if all_day else {"dateTime": e.isoformat()},
                "htmlLink": google_add_link(summary, s, e, location, all_day),
            }
            items.append((s, entry))
            shown += 1

    items.sort(key=lambda x: x[0])
    data = {"items": [e for _, e in items[:MAX_EVENTS]]}
    with open("events.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{len(data['items'])} events written")


if __name__ == "__main__":
    main()
