#!/usr/bin/env python3
"""Publish one "Notes from the studio" post from a small JSON file.

    python3 scripts/new_note.py notes/2026-11-10-contemporary-open-class.json

The JSON looks like this (only title, date and body are required):

    {
      "title": "Contemporary open class",
      "date": "2026-11-10",
      "class": "Contemporary Open Class with Anna",
      "summary": "One sentence shown in the post list and the newsletter.",
      "images": [{"file": "2026-11-10-contemporary-open-class-page-1.jpg",
                  "alt": "Handwritten journal page: ..."}],
      "body": [
        {"h2": "Contemporary open class · 10.11.2026"},
        {"p": "A paragraph. *Stars* become italics."},
        {"ol": ["First point", "Second point"]},
        {"ul": ["A bullet"]}
      ]
    }

Images are read from blog/images/. The script writes blog/<date>-<slug>.html
(same layout as the TIME workshop post), adds the post to the top of
blog.html, to the "Notes from the Studio" list on about.html (newest three
are kept there) and to feed.xml. Running it twice for the same post only
rewrites the post page; the lists are not duplicated.
"""
import html
import json
import re
import sys
from datetime import datetime
from email.utils import format_datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / "blog" / "2026-10-time-workshop.html"
SITE = "https://chiaralaurenza.com"
ABOUT_KEEP = 3


def slugify(s):
    s = s.lower()
    s = re.sub(r"[àáâä]", "a", s); s = re.sub(r"[èéêë]", "e", s)
    s = re.sub(r"[ìíîï]", "i", s); s = re.sub(r"[òóôö]", "o", s)
    s = re.sub(r"[ùúûü]", "u", s); s = s.replace("ß", "ss")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def inline(text):
    """Escape text and turn *words* into <em>words</em>."""
    return re.sub(r"\*([^*]+)\*", r"<em>\1</em>", html.escape(text, quote=False))


def render_body(blocks):
    out = []
    for b in blocks:
        if "h2" in b:
            out.append(f"    <h2>{inline(b['h2'])}</h2>")
        elif "p" in b:
            out.append(f"    <p>{inline(b['p'])}</p>")
        elif "ol" in b or "ul" in b:
            tag = "ol" if "ol" in b else "ul"
            items = "\n".join(f"      <li>{inline(i)}</li>" for i in b[tag])
            out.append(f"    <{tag}>\n{items}\n    </{tag}>")
        else:
            raise SystemExit(f"Unknown body block: {b}")
    return "\n".join(out)


def post_row(href, date_label, title, summary):
    return (f'  <a class="post-row reveal" href="{href}">\n'
            f'    <span class="post-date">{date_label}</span>\n'
            f'    <div>\n'
            f'      <h3>{html.escape(title)}</h3>\n'
            f'      <p>{html.escape(summary)}</p>\n'
            f'    </div>\n'
            f'    <span class="post-more">Read &rarr;</span>\n'
            f'  </a>\n')


def main(spec_path):
    spec = json.loads(Path(spec_path).read_text(encoding="utf-8"))
    title, date = spec["title"], datetime.strptime(spec["date"], "%Y-%m-%d")
    slug = spec.get("slug") or f"{spec['date']}-{slugify(title)}"
    dmy = date.strftime("%d.%m.%Y")
    summary = spec.get("summary", "")
    klass = spec.get("class", "")
    images = spec.get("images", [])
    for im in images:
        if not (ROOT / "blog" / "images" / im["file"]).exists():
            raise SystemExit(f"Missing image blog/images/{im['file']}")

    # ── post page, built from the TIME workshop page ──
    tpl = TEMPLATE.read_text(encoding="utf-8")
    start, end = tpl.index('<section class="page-hero">'), tpl.index("</article>") + len("</article>")
    words = title.split()
    h1 = html.escape(" ".join(words[:-1])) + "<br/><em>" + html.escape(words[-1]) + "</em>" if len(words) > 1 else html.escape(title)
    desc = "<span>Handwritten in my journal.</span> " + (f"{html.escape(klass)}, {dmy}." if klass else f"{dmy}.")
    figures = "\n".join(
        f'  <figure class="page reveal">\n'
        f'    <img src="images/{im["file"]}" alt="{html.escape(im.get("alt", "Handwritten journal page"))}" loading="lazy">\n'
        f'  </figure>' for im in images)
    main_html = f'''<section class="page-hero">
  <div class="page-hero-left reveal from-left">
    <p class="page-hero-eyebrow"><span>Notes from the studio</span> · {dmy}</p>
    <h1 style="font-size:clamp(2.4rem,5vw,4.8rem)">{h1}</h1>
  </div>
  <div class="page-hero-right reveal from-right" style="transition-delay:120ms">
    <p class="page-hero-desc">{desc}</p>
  </div>
</section>

<article class="post-pages">
''' + (f'  <p class="post-summary">{html.escape(summary)}</p>\n' if summary else "") + (figures + "\n" if figures else "") + f'''  <section class="post-text reveal">
{render_body(spec["body"])}
  </section>
  <p><a href="../blog.html" class="book-link">All posts</a></p>
</article>'''
    page = tpl[:start] + main_html + tpl[end:]
    page = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)} · Chiara Laurenza</title>", page, count=1)
    page = re.sub(r'(<meta name="description" content=")[^"]*', lambda m: m.group(1) + html.escape(summary or title), page, count=1)
    (ROOT / "blog" / f"{slug}.html").write_text(page, encoding="utf-8")

    href = f"blog/{slug}.html"

    # ── blog.html: newest first ──
    blog = (ROOT / "blog.html").read_text(encoding="utf-8")
    if f'href="{href}"' not in blog:
        marker = '<section class="post-list">\n'
        blog = blog.replace(marker, marker + post_row(href, dmy, title, summary), 1)
        (ROOT / "blog.html").write_text(blog, encoding="utf-8")

    # ── about.html: newest three ──
    about = (ROOT / "about.html").read_text(encoding="utf-8")
    m = re.search(r'(<section class="notes-section" id="notes">\s*<div class="section-header-row reveal">.*?</div>\n)(.*?)(</section>)', about, re.S)
    if m and f'href="{href}"' not in m.group(2):
        rows = re.findall(r'  <a class="post-row.*?</a>\n', m.group(2), re.S)
        rows = [post_row(href, dmy, title, summary)] + rows
        about = about[:m.start(2)] + "".join(rows[:ABOUT_KEEP]) + about[m.end(2):]
        (ROOT / "about.html").write_text(about, encoding="utf-8")

    # ── feed.xml ──
    feed = (ROOT / "feed.xml").read_text(encoding="utf-8")
    url = f"{SITE}/{href}"
    if url not in feed:
        pub = format_datetime(date.replace(hour=20, tzinfo=ZoneInfo("Europe/Berlin")))
        item = (f"    <item>\n      <title>{html.escape(title)}</title>\n      <link>{url}</link>\n"
                f"      <guid>{url}</guid>\n      <pubDate>{pub}</pubDate>\n"
                f"      <description>{html.escape(summary or title)}</description>\n    </item>\n")
        feed = feed.replace("    <item>", item + "    <item>", 1) if "<item>" in feed else feed.replace("  </channel>", item + "  </channel>")
        (ROOT / "feed.xml").write_text(feed, encoding="utf-8")

    print(url)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    main(sys.argv[1])
