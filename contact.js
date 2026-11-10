// Sends the contact form and the booking popup to Chiara's inbox via FormSubmit.
// After the first message, FormSubmit emails an activation link once; after
// activating, the address below can be replaced with the random alias they send.
(function () {
  var ENDPOINT = 'https://formsubmit.co/ajax/chiara.laurenza99@gmail.com';

  function tr(s) { return window.t ? window.t(s) : s; }

  function collect(form, extra) {
    var data = {};
    form.querySelectorAll('.fg').forEach(function (fg) {
      var label = fg.querySelector('label');
      var field = fg.querySelector('input, select, textarea');
      if (label && field && field.value) data[label.textContent.trim()] = field.value;
    });
    Object.keys(extra).forEach(function (k) { data[k] = extra[k]; });
    data._template = 'table';
    data._captcha = 'false';
    return data;
  }

  function send(form, extra, onOk, statusEl) {
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    statusEl.style.display = 'block';
    statusEl.textContent = tr('Sending…');
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(collect(form, extra))
    })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function () { form.reset(); onOk(); })
      .catch(function () { statusEl.textContent = tr('Something went wrong. Please try again.'); })
      .finally(function () { btn.disabled = false; });
  }

  window.handleContact = function (e) {
    e.preventDefault();
    var status = document.getElementById('cs');
    send(e.target, { _subject: 'Website: new message' }, function () {
      status.textContent = tr('Message received. I will be in touch shortly.');
    }, status);
  };

  window.handleQuestion = function (e) {
    e.preventDefault();
    var form = e.target, status = document.getElementById('ask-status'), btn = form.querySelector('button');
    btn.disabled = true; status.style.display = 'block'; status.textContent = tr('Sending…');
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ _subject: 'Website: anonymous question', Question: document.getElementById('ask-q').value,
        Page: location.pathname, Language: document.documentElement.getAttribute('data-lang') || 'en',
        _template: 'table', _captcha: 'false' })
    })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function () { form.reset(); status.textContent = tr('Thank you. Your question has been sent anonymously.'); })
      .catch(function () { status.textContent = tr('Something went wrong. Please try again.'); })
      .finally(function () { btn.disabled = false; });
  };

  window.submitModal = function (e) {
    e.preventDefault();
    var status = document.getElementById('m-success');
    var what = document.getElementById('m-title').textContent;
    send(e.target, { _subject: 'Website booking: ' + what, Request: what }, function () {
      status.textContent = tr('Received. I will be in touch shortly.');
      setTimeout(closeModal, 3000);
    }, status);
  };
  // Newsletter "Everything" chip selects or clears all topics.
  document.addEventListener('change', function (e) {
    var box = e.target;
    if (!box.matches || !box.matches('.nl-topics input[name="topic"]')) return;
    var form = box.closest('form'), all = form.querySelector('input[data-all]');
    var others = form.querySelectorAll('input[name="topic"]:not([data-all])');
    if (box === all) others.forEach(function (c) { c.checked = all.checked; });
    else all.checked = Array.prototype.every.call(others, function (c) { return c.checked; });
  });

  // Newsletter: each signup arrives as an email listing the courses the
  // subscriber picked, so Chiara can add them to the right mailing groups.
  window.handleNewsletter = function (e) {
    e.preventDefault();
    var form = e.target, status = document.getElementById('nl-ok'), btn = form.querySelector('button[type="submit"]');
    var topics = Array.prototype.map.call(form.querySelectorAll('input[name="topic"]:checked'), function (c) { return c.value; });
    if (form.querySelector('input[data-all]:checked')) topics = ['Everything'];
    status.style.display = 'block';
    if (!topics.length) { status.textContent = tr('Please pick at least one topic.'); return; }
    btn.disabled = true; status.textContent = tr('Sending…');
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ _subject: 'Newsletter: new subscriber', Email: document.getElementById('nl-email').value,
        Topics: topics.join(', '), Language: document.documentElement.getAttribute('data-lang') || 'en',
        Page: location.pathname, _template: 'table', _captcha: 'false' })
    })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function () { form.reset(); status.textContent = tr('You are subscribed. Thank you!'); })
      .catch(function () { status.textContent = tr('Something went wrong. Please try again.'); })
      .finally(function () { btn.disabled = false; });
  };

  // Unsubscribe page: Chiara (and the studio-notes routine) get an email and
  // remove the address from the notes list, or from every list.
  window.handleUnsubscribe = function (e) {
    e.preventDefault();
    var form = e.target, status = document.getElementById('un-ok'), btn = form.querySelector('button[type="submit"]');
    var what = form.querySelector('input[name="what"]:checked').value;
    btn.disabled = true; status.style.display = 'block'; status.textContent = tr('Sending…');
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ _subject: 'Newsletter: unsubscribe', Email: document.getElementById('un-email').value,
        Stop: what, Page: location.pathname, _template: 'table', _captcha: 'false' })
    })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function () { form.reset(); status.textContent = tr('Done. You will not get these emails any more.'); })
      .catch(function () { status.textContent = tr('Something went wrong. Please try again.'); })
      .finally(function () { btn.disabled = false; });
  };

  // ?email=... in the unsubscribe link fills in the address.
  document.addEventListener('DOMContentLoaded', function () {
    var box = document.getElementById('un-email');
    var m = /[?&]email=([^&]+)/.exec(location.search);
    if (box && m) box.value = decodeURIComponent(m[1]);
  });
})();
