/* ==========================================================================
   OBRAS CULLERA — interaction layer
   Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TOUCH = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  /* ------------------------------------------------------------ preloader */
  function preloader() {
    var el = $('#preloader');
    if (!el) return;
    var bar = $('.pre-bar i', el);
    var p = 0;
    var tick = setInterval(function () {
      p = Math.min(100, p + Math.random() * 18 + 6);
      if (bar) bar.style.transform = 'scaleX(' + (p / 100) + ')';
      if (p >= 100) {
        clearInterval(tick);
        setTimeout(function () {
          el.classList.add('done');
          document.body.classList.remove('is-locked');
          document.documentElement.classList.add('loaded');
          window.dispatchEvent(new CustomEvent('oc:ready'));
        }, 420);
      }
    }, REDUCED ? 60 : 210);
  }

  /* ------------------------------------------------- page transition curtain */
  function curtain() {
    var c = $('#curtain');
    if (!c) return;
    c.classList.add('in');
    setTimeout(function () { c.className = ''; }, 900);

    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || a.target === '_blank' || a.hasAttribute('download')) return;
      if (href.charAt(0) === '#' || /^(mailto:|tel:|http)/i.test(href)) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      document.body.classList.remove('menu-open');
      c.className = 'out';
      setTimeout(function () { window.location.href = href; }, REDUCED ? 60 : 640);
    });
  }

  /* --------------------------------------------------------------- cursor */
  function cursor() {
    if (TOUCH || REDUCED) return;
    var ring = document.createElement('div'); ring.className = 'cursor';
    var dot = document.createElement('div'); dot.className = 'cursor-dot';
    document.body.appendChild(ring); document.body.appendChild(dot);
    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
    });
    (function loop() {
      rx = lerp(rx, mx, 0.16); ry = lerp(ry, my, 0.16);
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest ? e.target.closest('a,button,.pillar,.pcard,.acc-head,.pin,.map-country,input,textarea,select') : null;
      ring.classList.toggle('is-hot', !!t);
    });
  }

  /* ------------------------------------------------------- scroll progress */
  function progress() {
    var bar = $('#scroll-progress');
    if (!bar) return;
    var upd = function () {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? clamp(scrollY / h, 0, 1) : 0) + ')';
    };
    addEventListener('scroll', upd, { passive: true });
    addEventListener('resize', upd);
    upd();
  }

  /* --------------------------------------------------------------- header */
  function header() {
    var head = $('.site-head');
    if (!head) return;
    var last = 0;
    addEventListener('scroll', function () {
      var y = scrollY;
      head.classList.toggle('stuck', y > 40);
      if (!document.body.classList.contains('menu-open')) {
        head.classList.toggle('hide', y > 320 && y > last);
      }
      last = y;
      var top = $('#to-top');
      if (top) top.classList.toggle('on', y > innerHeight * 0.9);
    }, { passive: true });

    var burger = $('.burger');
    if (burger) burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      document.body.classList.toggle('is-locked', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      head.classList.remove('hide');
    });

    var top = $('#to-top');
    if (top) top.addEventListener('click', function () { scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); });
  }

  /* ------------------------------------------------------ language switch */
  function language() {
    var wrap = $('.lang');
    if (!wrap) return;
    var btn = $('.lang-btn', wrap);
    btn.addEventListener('click', function (e) { e.stopPropagation(); wrap.classList.toggle('open'); });
    document.addEventListener('click', function () { wrap.classList.remove('open'); });
    $$('.lang-menu button', wrap).forEach(function (b) {
      b.addEventListener('click', function () {
        if (window.OCI18N) window.OCI18N.set(b.dataset.lang);
        wrap.classList.remove('open');
      });
    });
  }

  /* -------------------------------------------------------------- reveals */
  function splitLines() {
    $$('.split').forEach(function (el) {
      if (el.dataset.splitDone) return;
      var parts = el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML = parts.map(function (p) {
        return '<span class="line"><span>' + p.trim() + '</span></span>';
      }).join('');
      el.dataset.splitDone = '1';
    });
  }
  window.OCsplit = splitLines;

  function reveals() {
    splitLines();
    var targets = $$('[data-reveal], .mask, .split, .img-mask, .stat, .rail-hint');
    if (!('IntersectionObserver' in window) || REDUCED) {
      targets.forEach(function (t) { t.classList.add('in'); });
      $$('[data-count]').forEach(function (n) { n.textContent = n.dataset.count; });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var d = parseFloat(el.dataset.delay || 0);
        setTimeout(function () { el.classList.add('in'); }, d * 1000);
        if (el.classList.contains('stat')) countUp(el);
        io.unobserve(el);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) { io.observe(t); });
    // failsafe: nothing may stay invisible if the observer never fires
    setTimeout(function () {
      targets.forEach(function (t) {
        if (t.classList.contains('in')) return;
        t.classList.add('in');
        if (t.classList.contains('stat')) countUp(t);
      });
    }, 6000);
  }

  function fmt(v, dec, el) {
    if (dec) return v.toFixed(dec).replace('.', (document.documentElement.lang === 'en' ? '.' : ','));
    var n = Math.round(v);
    if (el.dataset.group === 'off') return String(n);
    try { return n.toLocaleString(document.documentElement.lang || 'en'); } catch (e) { return String(n); }
  }

  function countUp(scope) {
    $$('[data-count]', scope).forEach(function (el) {
      var target = parseFloat(el.dataset.count);
      var dec = (el.dataset.count.split('.')[1] || '').length;
      var dur = 1700, t0 = null;
      if (REDUCED) { el.textContent = fmt(target, dec, el); return; }
      function step(ts) {
        if (!t0) t0 = ts;
        var p = clamp((ts - t0) / dur, 0, 1);
        var e = 1 - Math.pow(1 - p, 3);
        var v = target * e;
        el.textContent = fmt(v, dec, el);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ------------------------------------------------------------ hero show */
  function hero() {
    var slides = $$('.hero-slide');
    var dots = $$('.hero-dot');
    var caps = $$('[data-hero-caption]');
    if (slides.length < 2) return;
    var i = 0, timer;
    function go(n) {
      slides[i].classList.remove('on');
      if (dots[i]) dots[i].classList.remove('on');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('on');
      if (dots[i]) { dots[i].classList.remove('on'); void dots[i].offsetWidth; dots[i].classList.add('on'); }
      caps.forEach(function (c, k) { c.hidden = k !== i; });
      clearTimeout(timer);
      timer = setTimeout(function () { go(i + 1); }, 9000);
    }
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
    go(0);
  }

  /* -------------------------------------------------------- hero particles */
  function particles() {
    var cv = $('#hero-canvas');
    if (!cv || REDUCED) return;
    var ctx = cv.getContext('2d');
    var pts = [], w = 0, h = 0, dpr = Math.min(devicePixelRatio || 1, 2);
    var mouse = { x: -9999, y: -9999 };

    function size() {
      var r = cv.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = clamp(Math.round(w * h / 15000), 26, 92);
      pts = [];
      for (var k = 0; k < n; k++) {
        pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: Math.random() * 1.5 + .6 });
      }
    }
    addEventListener('resize', size);
    cv.addEventListener('mousemove', function (e) { var r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    cv.addEventListener('mouseleave', function () { mouse.x = mouse.y = -9999; });
    size();

    (function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var a = 0; a < pts.length; a++) {
        var p = pts[a];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (var b = a + 1; b < pts.length; b++) {
          var q = pts[b], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 132) {
            ctx.strokeStyle = 'rgba(230,185,141,' + (0.16 * (1 - d / 132)).toFixed(3) + ')';
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        var mdx = p.x - mouse.x, mdy = p.y - mouse.y, md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 170) {
          ctx.strokeStyle = 'rgba(242,217,190,' + (0.30 * (1 - md / 170)).toFixed(3) + ')';
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = 'rgba(242,217,190,.42)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(draw);
    })();
  }

  /* ------------------------------------------------------------- accordion */
  function accordion() {
    $$('.acc').forEach(function (acc) {
      var items = $$('.acc-item', acc);
      items.forEach(function (item, k) {
        var head = $('.acc-head', item);
        if (!head) return;
        if (k === 0) item.classList.add('open');
        head.setAttribute('aria-expanded', k === 0 ? 'true' : 'false');
        head.addEventListener('click', function () {
          var open = item.classList.contains('open');
          items.forEach(function (o) { o.classList.remove('open'); var h = $('.acc-head', o); if (h) h.setAttribute('aria-expanded', 'false'); });
          if (!open) { item.classList.add('open'); head.setAttribute('aria-expanded', 'true'); }
        });
      });
    });
  }

  /* ------------------------------------------------------------------- map */
  function map() {
    var stage = $('.map-stage');
    if (!stage) return;
    var readout = $('.map-readout');
    var rows = $$('.map-country');
    var pins = $$('.pin', stage);

    function show(code) {
      pins.forEach(function (p) { p.classList.toggle('on', p.dataset.code === code); });
      rows.forEach(function (r) { r.classList.toggle('on', r.dataset.code === code); });
      var src = rows.filter(function (r) { return r.dataset.code === code; })[0];
      if (src && readout) {
        readout.innerHTML = '<h4>' + src.dataset.name + '</h4><p>' + src.dataset.desc + '</p>';
      }
    }
    pins.forEach(function (p) { p.addEventListener('mouseenter', function () { show(p.dataset.code); }); p.addEventListener('click', function () { show(p.dataset.code); }); });
    rows.forEach(function (r) { r.addEventListener('mouseenter', function () { show(r.dataset.code); }); r.addEventListener('click', function () { show(r.dataset.code); }); });
    if (rows[0]) show(rows[0].dataset.code);
  }

  /* ------------------------------------------------------- horizontal rail */
  function rail() {
    var outer = $('.rail-outer');
    if (!outer) return;
    var track = $('.rail', outer);
    var bar = $('.rail-hint .track i');
    if (!track) return;
    var cur = 0, goal = 0;

    function span() { return Math.max(0, track.scrollWidth - innerWidth + 40); }

    function onScroll() {
      var r = outer.getBoundingClientRect();
      var total = r.height - innerHeight;
      if (total <= 0) return;
      var p = clamp(-r.top / total, 0, 1);
      goal = -p * span();
      if (bar) bar.style.transform = 'scaleX(' + p + ')';
    }
    function loop() {
      cur = lerp(cur, goal, REDUCED ? 1 : 0.09);
      track.style.transform = 'translate3d(' + cur.toFixed(2) + 'px,0,0)';
      requestAnimationFrame(loop);
    }
    if (matchMedia('(min-width: 900px)').matches) {
      outer.style.height = (track.scrollWidth * 0.92) + 'px';
      outer.style.position = 'relative';
      // wrap contents in a sticky viewport so the rail scrubs horizontally
      var inner = document.createElement('div');
      inner.style.cssText = 'position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;overflow:hidden';
      while (outer.firstChild) inner.appendChild(outer.firstChild);
      outer.appendChild(inner);
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', function () { outer.style.height = (track.scrollWidth * 0.92) + 'px'; onScroll(); });
      onScroll(); loop();
    } else {
      track.style.overflowX = 'auto';
      outer.style.overflowX = 'auto';
      outer.style.scrollSnapType = 'x mandatory';
      $$('.rail-card', track).forEach(function (c) { c.style.scrollSnapAlign = 'start'; });
    }
  }

  /* ---------------------------------------------------------- project filter */
  function filters() {
    var bar = $('.filters');
    if (!bar) return;
    var cards = $$('.pcard');
    var empty = $('#filter-empty');
    $$('.filter', bar).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.filter', bar).forEach(function (o) { o.classList.remove('on'); });
        b.classList.add('on');
        var f = b.dataset.filter, shown = 0;
        cards.forEach(function (c) {
          var ok = f === 'all' || (c.dataset.tags || '').split(' ').indexOf(f) > -1;
          c.classList.toggle('hidden', !ok);
          if (ok) { shown++; c.classList.remove('in'); void c.offsetWidth; c.classList.add('in'); }
        });
        if (empty) empty.hidden = shown > 0;
      });
    });
  }

  /* ------------------------------------------------------------- parallax */
  function parallax() {
    var els = $$('.parallax');
    if (!els.length || REDUCED) return;
    function upd() {
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        var sp = parseFloat(el.dataset.speed || 0.12);
        var off = (r.top + r.height / 2 - innerHeight / 2) * -sp;
        el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
      });
      requestAnimationFrame(upd);
    }
    requestAnimationFrame(upd);
  }

  /* -------------------------------------------------------------- magnetic */
  function magnetic() {
    if (TOUCH || REDUCED) return;
    $$('.btn, .socials a, #to-top').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.26;
        var y = (e.clientY - r.top - r.height / 2) * 0.36;
        el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* --------------------------------------------------------------- marquee */
  function marquee() {
    $$('.marquee-track').forEach(function (t) {
      if (t.dataset.dup) return;
      t.innerHTML += t.innerHTML;
      t.dataset.dup = '1';
    });
  }

  /* ----------------------------------------------------------------- forms */
  function forms() {
    $$('form[data-demo]').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var msg = $('.form-msg', f);
        var ok = true;
        $$('[required]', f).forEach(function (i) {
          if (!i.value.trim() || (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(i.value))) {
            ok = false; i.style.borderBottomColor = '#C0563C';
            setTimeout(function () { i.style.borderBottomColor = ''; }, 2200);
          }
        });
        if (!msg) return;
        var key = ok ? f.dataset.okKey : f.dataset.errKey;
        msg.setAttribute('data-i18n', key || '');
        msg.textContent = ok ? (f.dataset.ok || 'Thank you — your message has been recorded.')
                             : (f.dataset.err || 'Please complete the required fields.');
        if (window.OCI18N) window.OCI18N.refresh(msg);
        if (ok) f.reset();
      });
    });
  }

  /* ------------------------------------------------------------------ boot */
  function boot() {
    document.body.classList.add('is-locked');
    preloader(); curtain(); cursor(); progress(); header(); language();
    reveals(); hero(); particles(); accordion(); map(); filters();
    parallax(); magnetic(); marquee(); forms();
    requestAnimationFrame(rail);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
