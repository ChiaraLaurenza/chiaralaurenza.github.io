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
      .catch(function () { statusEl.textContent = tr('Something went wrong — please try again.'); })
      .finally(function () { btn.disabled = false; });
  }

  window.handleContact = function (e) {
    e.preventDefault();
    var status = document.getElementById('cs');
    send(e.target, { _subject: 'Website: new message' }, function () {
      status.textContent = tr('Message received — I will be in touch shortly.');
    }, status);
  };

  window.submitModal = function (e) {
    e.preventDefault();
    var status = document.getElementById('m-success');
    var what = document.getElementById('m-title').textContent;
    send(e.target, { _subject: 'Website booking: ' + what, Request: what }, function () {
      status.textContent = tr('Received — I will be in touch shortly.');
      setTimeout(closeModal, 3000);
    }, status);
  };
})();
