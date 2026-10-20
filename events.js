// Upcoming events from Chiara's public Google calendar "Teaching".
// A GitHub Action (.github/workflows/events.yml) turns the calendar into events.json once a day.
// A link in an event's description becomes its "Register" button.
(function () {
  // raw.githubusercontent serves the newest events.json right after the Action commits it
  var SOURCES = [
    'https://raw.githubusercontent.com/ChiaraLaurenza/chiaralaurenza.github.io/main/events.json',
    'events.json'
  ];

  var LOCALES = { en: 'en-GB', de: 'de-DE', it: 'it-IT' };
  var cache = null;

  function tr(s) { return window.t ? window.t(s) : s; }
  function lang() { return document.documentElement.getAttribute('data-lang') || 'en'; }
  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function firstLink(text) {
    var m = String(text || '').match(/https?:\/\/[^\s"<>]+/);
    return m ? m[0] : null;
  }

  // 45 -> "45 min", 90 -> "1 h 30 min"
  function duration(min) {
    var h = Math.floor(min / 60), m = Math.round(min % 60);
    return (h ? h + ' h' : '') + (h && m ? ' ' : '') + (m ? m + ' min' : '');
  }

  function load() {
    if (cache) return Promise.resolve(cache);
    function tryFrom(i) {
      if (i >= SOURCES.length) return Promise.reject(new Error('no events source'));
      return fetch(SOURCES[i] + '?t=' + Math.floor(Date.now() / 600000), { cache: 'no-store' })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .catch(function () { return tryFrom(i + 1); });
    }
    return tryFrom(0).then(function (d) {
      var now = Date.now();
      cache = (d.items || []).filter(function (e) {
        var end = e.end && (e.end.dateTime || (e.end.date && e.end.date + 'T23:59:59'));
        return !end || new Date(end).getTime() > now;
      });
      return cache;
    });
  }

  function render(list, events) {
    var max = parseInt(list.getAttribute('data-max') || '50', 10);
    var loc = LOCALES[lang()] || 'en-GB';
    var items = events.slice(0, max);
    var section = list.closest('[data-hide-if-empty]');
    if (!items.length) {
      if (section) { section.hidden = true; return; }
      list.innerHTML = '<p class="ev-empty">' + esc(tr('No upcoming events right now. New dates are coming soon.')) + '</p>';
      return;
    }
    if (section) section.hidden = false;
    list.innerHTML = items.map(function (e) {
      var allDay = !!(e.start && e.start.date);
      var start = new Date(allDay ? e.start.date + 'T00:00:00' : e.start.dateTime);
      var day = start.toLocaleDateString(loc, { day: '2-digit' });
      var month = start.toLocaleDateString(loc, { month: 'short' }).replace('.', '');
      var hm = { hour: '2-digit', minute: '2-digit' };
      var when = start.toLocaleDateString(loc, { weekday: 'long' });
      if (!allDay) {
        when += ' · ' + start.toLocaleTimeString(loc, hm);
        var end = e.end && e.end.dateTime ? new Date(e.end.dateTime) : null;
        if (end) when += '–' + end.toLocaleTimeString(loc, hm) + ' (' + duration((end - start) / 60000) + ')';
      }
      var reg = firstLink(e.description);
      return '<div class="ev-row">' +
        '<div class="ev-date"><span class="ev-day">' + esc(day) + '</span><span class="ev-month">' + esc(month) + '</span></div>' +
        '<div class="ev-main"><h3>' + esc(e.summary) + '</h3>' +
        '<p>' + esc(when) + (e.location ? ' · ' + esc(e.location) : '') + '</p></div>' +
        '<div class="ev-actions">' +
        (reg ? '<a class="book-link" href="' + esc(reg) + '" target="_blank" rel="noopener">' + esc(tr('Register')) + '</a>' : '') +
        (e.htmlLink ? '<a class="ev-add" href="' + esc(e.htmlLink) + '" target="_blank" rel="noopener">' + esc(tr('Add to calendar')) + '</a>' : '') +
        '</div></div>';
    }).join('');
  }

  function renderAll() {
    var lists = document.querySelectorAll('[data-events]');
    if (!lists.length) return;
    load().then(function (events) {
      lists.forEach(function (l) { render(l, events); });
    }).catch(function () {
      lists.forEach(function (l) {
        var section = l.closest('[data-hide-if-empty]');
        if (section) section.hidden = true;
        else l.innerHTML = '<p class="ev-empty">' + esc(tr('Events could not be loaded. Please try again later.')) + '</p>';
      });
    });
  }

  // re-render in the new language after the language switch
  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.lang-switch button')) setTimeout(renderAll, 0);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderAll);
  else renderAll();
})();
