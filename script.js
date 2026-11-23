const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.animate(
        [{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 800, easing: 'cubic-bezier(.2,.7,.2,1)' }
      );
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.statement-text, .about-bottom, .service-row, .timeline li, .credentials > div, footer h2').forEach(el => observer.observe(el));

  const title = document.querySelector('.hero h1');
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      title.style.transform = 'translateX(' + Math.min(window.scrollY * 0.12, 100) + 'px)';
      scheduled = false;
    });
  }, { passive: true });
}
