// Motion layer shared by every page: cursor dot and image wipes.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cursor: only for a real mouse.
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced) {
    var dot = document.createElement('div');
    dot.className = 'cursor';
    document.body.appendChild(dot);
    var x = 0, y = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY; dot.classList.add('on');
    });
    document.addEventListener('mouseleave', function () { dot.classList.remove('on'); });
    document.addEventListener('mouseover', function (e) {
      dot.classList.toggle('big', !!e.target.closest('a, button, .work-item, .g-item'));
    });
    (function loop() {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      dot.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      requestAnimationFrame(loop);
    })();
  }

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
