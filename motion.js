/* EMS prototypes: motion layer.
   GSAP + ScrollTrigger (появление блоков, слова заголовков, параллакс) и Lenis (мягкая прокрутка на ПК).
   Всё выключается при prefers-reduced-motion. Без этих библиотек страница остаётся рабочей. */
(function () {
  'use strict';
  /* ?motion=on включает анимации для показа, даже если в системе отключены эффекты */
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches && !/[?&]motion=on/.test(location.search);
  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  var cfg = window.EMS_MOTION || {};
  var root = document.documentElement;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis: мягкая прокрутка, только мышь и тачпад ---------- */
  var lenis = null;
  if (window.Lenis && matchMedia('(pointer: fine)').matches) {
    lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    var st = document.createElement('style');
    st.textContent = 'html.lenis,html.lenis body{height:auto}.lenis.lenis-smooth{scroll-behavior:auto!important}.lenis.lenis-stopped{overflow:hidden}';
    document.head.appendChild(st);

    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2) return;
      var t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      lenis.scrollTo(t, { offset: -76, duration: 1.1 });
    });

    /* окна и списки внутри них прокручиваются сами, страница под ними стоит */
    var show = HTMLDialogElement.prototype.showModal;
    HTMLDialogElement.prototype.showModal = function () {
      var d = this;
      lenis.stop();
      d.setAttribute('data-lenis-prevent', '');
      d.addEventListener('close', function h() { lenis.start(); d.removeEventListener('close', h); });
      return show.call(d);
    };
  }

  /* ---------- слова заголовков поднимаются из-под строки ---------- */
  function split(el) {
    if (el.children.length || el.dataset.split) return null;
    var text = el.textContent.trim();
    if (!text) return null;
    el.dataset.split = '1';
    el.setAttribute('aria-label', text);
    el.innerHTML = text.split(/\s+/).map(function (w) {
      return '<span class="mw" aria-hidden="true"><span class="mwi">' + w + '</span></span>';
    }).join(' ');
    return el.querySelectorAll('.mwi');
  }
  var css = document.createElement('style');
  css.textContent = '.mw{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.12em;margin-bottom:-.12em}.mwi{display:inline-block;will-change:transform}';
  document.head.appendChild(css);

  (cfg.split || ['h1', 'main h2']).forEach(function (sel) {
    [].forEach.call(document.querySelectorAll(sel), function (el) {
      if (el.classList.contains('sr')) return;
      var words = split(el);
      if (!words) return;
      gsap.set(words, { yPercent: 115 });
      ScrollTrigger.create({
        trigger: el, start: 'top 92%', once: true,
        onEnter: function () { gsap.to(words, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.06 }); }
      });
    });
  });

  /* ---------- первый экран: части выходят одна за другой ---------- */
  if (cfg.hero && cfg.hero.length) {
    var hero = [];
    cfg.hero.forEach(function (sel) { [].forEach.call(document.querySelectorAll(sel), function (el) { hero.push(el); }); });
    if (hero.length) {
      gsap.from(hero, { autoAlpha: 0, y: 22, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.25, clearProps: 'transform,opacity,visibility' });
    }
  }

  /* ---------- блоки появляются, когда до них доходит прокрутка ---------- */
  (cfg.reveal || []).forEach(function (sel) {
    var els = document.querySelectorAll(sel);
    if (!els.length) return;
    gsap.set(els, { autoAlpha: 0, y: 28 });
    ScrollTrigger.batch(els, {
      start: 'top 90%', once: true,
      onEnter: function (batch) {
        gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.08, overwrite: true, clearProps: 'transform,opacity,visibility' });
      }
    });
  });

  /* ---------- параллакс: фото чуть смещается при прокрутке ---------- */
  (cfg.parallax || []).forEach(function (sel) {
    [].forEach.call(document.querySelectorAll(sel), function (img) {
      gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, {
        yPercent: 6, scale: 1.12, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  });

  /* страховка: печать и снимки страницы видят всё */
  window.addEventListener('beforeprint', function () {
    gsap.set('[style*="visibility: hidden"]', { autoAlpha: 1, y: 0 });
    gsap.set('.mwi', { yPercent: 0 });
  });
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  window.EMS_LENIS = lenis;
})();
