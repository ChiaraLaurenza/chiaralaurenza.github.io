// Upcoming events, read from Chiara's public Google Calendar.
// Fill in CALENDAR_ID and API_KEY once (see README in the session notes).
// A link in an event's description becomes its "Register" button.
(function () {
  var CALENDAR_ID = ''; // e.g. abc123@group.calendar.google.com
  var API_KEY = '';     // Google Calendar API key, restricted to chiaralaurenza.com

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

  function load() {
    if (cache) return Promise.resolve(cache);
    if (!CALENDAR_ID || !API_KEY) return Promise.resolve([]);
    var url = 'https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(CALENDAR_ID) +
      '/events?singleEvents=true&orderBy=startTime&maxResults=20&timeMin=' +
      encodeURIComponent(new Date().toISOString()) + '&key=' + encodeURIComponent(API_KEY);
    return fetch(url)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { cache = d.items || []; return cache; });
  }

  function render(list, events) {
    var max = parseInt(list.getAttribute('data-max') || '50', 10);
    var loc = LOCALES[lang()] || 'en-GB';
    var items = events.slice(0, max);
    var section = list.closest('[data-hide-if-empty]');
    if (!items.length) {
      if (section) { section.hidden = true; return; }
      list.innerHTML = '<p class="ev-empty">' + esc(tr('No upcoming events right now — new dates are coming soon.')) + '</p>';
      return;
    }
    if (section) section.hidden = false;
    list.innerHTML = items.map(function (e) {
      var allDay = !!(e.start && e.start.date);
      var start = new Date(allDay ? e.start.date + 'T00:00:00' : e.start.dateTime);
      var day = start.toLocaleDateString(loc, { day: '2-digit' });
      var month = start.toLocaleDateString(loc, { month: 'short' }).replace('.', '');
      var when = start.toLocaleDateString(loc, { weekday: 'long' }) +
        (allDay ? '' : ' · ' + start.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' }));
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
        else l.innerHTML = '<p class="ev-empty">' + esc(tr('Events could not be loaded — please try again later.')) + '</p>';
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
