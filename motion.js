// Motion layer shared by every page: image wipes.
(function () {
  // Image wipes: pictures uncover when they scroll into view.
  var wipes = document.querySelectorAll('.wipe');
  if (!('IntersectionObserver' in window)) {
    wipes.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  // A fully clipped element never counts as visible, so watch its parent.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.querySelectorAll(':scope > .wipe').forEach(function (w) { w.classList.add('visible'); });
      io.unobserve(en.target);
    });
  }, { threshold: 0.1 });
  wipes.forEach(function (el) { io.observe(el.parentElement); });
})();
