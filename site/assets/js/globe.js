/* ==========================================================================
   OBRAS CULLERA — interactive globe
   Canvas 2D. Real land geometry (Natural Earth 110m) sampled to a dot matrix,
   orthographic projection with yaw + tilt, depth shading and a directional
   light. No dependencies.
   ========================================================================== */
window.OCGlobe = (function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DEG = Math.PI / 180;

  // office / country markers, keyed to the data-code on the legend rows
  var PINS = {
    es: [39.17, -0.25], pt: [38.72, -9.14], ma: [34.02, -6.83],
    mr: [18.09, -15.98], sn: [14.72, -17.47], cv: [14.93, -23.51],
    gn: [9.51, -13.71], ml: [12.64, -8.00], ci: [5.36, -4.01],
    cm: [3.85, 11.50], gq: [3.75, 8.78], ga: [0.39, 9.45]
  };
  var ARCS = [['es', 'gn'], ['es', 'sn'], ['es', 'ma'], ['gn', 'ci'], ['gn', 'cm'], ['mr', 'es']];
  var HUB = 'gn';

  function vec(lat, lon) {
    var la = lat * DEG, lo = lon * DEG, c = Math.cos(la);
    return [c * Math.sin(lo), Math.sin(la), c * Math.cos(lo)];
  }

  function decodePoints() {
    var b64 = window.OC_GLOBE_POINTS;
    if (!b64) return [];
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    var i16 = new Int16Array(bytes.buffer);
    var out = new Float32Array(i16.length / 2 * 3);
    for (var j = 0, k = 0; j < i16.length; j += 2, k += 3) {
      var v = vec(i16[j] / 100, i16[j + 1] / 100);
      out[k] = v[0]; out[k + 1] = v[1]; out[k + 2] = v[2];
    }
    return out;
  }

  function slerp(a, b, t) {
    var d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    d = Math.max(-1, Math.min(1, d));
    var o = Math.acos(d), so = Math.sin(o);
    if (so < 1e-6) return a.slice();
    var s1 = Math.sin((1 - t) * o) / so, s2 = Math.sin(t * o) / so;
    return [a[0] * s1 + b[0] * s2, a[1] * s1 + b[1] * s2, a[2] * s1 + b[2] * s2];
  }

  function init(canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext('2d');
    var land = decodePoints();
    var W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = 1;

    var yaw = 14 * DEG;          // starts with West Africa facing the viewer
    var tilt = 20 * DEG;
    var spin = REDUCED ? 0 : 0.055;
    var vel = 0, dragging = false, lastX = 0, lastY = 0, target = null;
    var hover = null, active = null, t0 = performance.now();
    var C = {};

    // colours come from CSS custom properties so the globe follows the theme
    function readTheme() {
      var s = getComputedStyle(canvas);
      var g = function (n, f) { return (s.getPropertyValue(n) || '').trim() || f; };
      C = {
        land: g('--globe-land', '#E6B98D'),
        landDim: g('--globe-land-dim', '#6B4A2C'),
        oceanA: g('--globe-ocean-a', '#141A21'),
        oceanB: g('--globe-ocean-b', '#070A0D'),
        grid: g('--globe-grid', 'rgba(230,185,141,.10)'),
        atmo: g('--globe-atmo', 'rgba(184,115,51,.42)'),
        pin: g('--globe-pin', '#F2D9BE'),
        arc: g('--globe-arc', 'rgba(230,185,141,.55)')
      };
    }

    function size() {
      var r = canvas.getBoundingClientRect();
      if (!r.width) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2; cy = H / 2;
      R = Math.min(W, H) * 0.455;
    }

    // rotate an earth-frame unit vector into screen space
    function project(v, lift) {
      var ca = Math.cos(yaw), sa = Math.sin(yaw);
      var x1 = v[0] * ca + v[2] * sa;
      var z1 = -v[0] * sa + v[2] * ca;
      var ct = Math.cos(tilt), st = Math.sin(tilt);
      var y2 = v[1] * ct - z1 * st;
      var z2 = v[1] * st + z1 * ct;
      var k = R * (lift || 1);
      return [cx + x1 * k, cy - y2 * k, z2, x1, y2];
    }

    var LIGHT = (function () {
      var l = [-0.38, 0.52, 0.76];
      var m = Math.hypot(l[0], l[1], l[2]);
      return [l[0] / m, l[1] / m, l[2] / m];
    })();

    function drawSphere() {
      var g = ctx.createRadialGradient(cx - R * 0.34, cy - R * 0.38, R * 0.05, cx, cy, R);
      g.addColorStop(0, C.oceanA);
      g.addColorStop(1, C.oceanB);
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.2832);
      ctx.fillStyle = g; ctx.fill();

      // atmosphere: a soft ring sitting just outside the limb
      var a = ctx.createRadialGradient(cx, cy, R * 0.94, cx, cy, R * 1.22);
      a.addColorStop(0, C.atmo);
      a.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.22, 0, 6.2832);
      ctx.fillStyle = a; ctx.fill();
    }

    function drawGraticule() {
      ctx.strokeStyle = C.grid; ctx.lineWidth = 0.6;
      var lat, lon, first, p, i;
      for (lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath(); first = true;
        for (lon = -180; lon <= 180; lon += 4) {
          p = project(vec(lat, lon));
          if (p[2] <= 0) { first = true; continue; }
          if (first) { ctx.moveTo(p[0], p[1]); first = false; } else ctx.lineTo(p[0], p[1]);
        }
        ctx.stroke();
      }
      for (lon = -180; lon < 180; lon += 30) {
        ctx.beginPath(); first = true;
        for (i = -90; i <= 90; i += 4) {
          p = project(vec(i, lon));
          if (p[2] <= 0) { first = true; continue; }
          if (first) { ctx.moveTo(p[0], p[1]); first = false; } else ctx.lineTo(p[0], p[1]);
        }
        ctx.stroke();
      }
    }

    function drawLand() {
      var ca = Math.cos(yaw), sa = Math.sin(yaw);
      var ct = Math.cos(tilt), st = Math.sin(tilt);
      var size0 = Math.max(1, R / 92);
      for (var i = 0; i < land.length; i += 3) {
        var x = land[i], y = land[i + 1], z = land[i + 2];
        var x1 = x * ca + z * sa;
        var z1 = -x * sa + z * ca;
        var y2 = y * ct - z1 * st;
        var z2 = y * st + z1 * ct;
        if (z2 <= 0.02) continue;                       // back of the globe
        var lum = x1 * LIGHT[0] + y2 * LIGHT[1] + z2 * LIGHT[2];
        if (lum < 0) lum = 0;
        var edge = Math.min(1, z2 * 3.2);               // fade into the limb
        var a = (0.34 + lum * 0.66) * edge;
        ctx.globalAlpha = a;
        ctx.fillStyle = lum > 0.30 ? C.land : C.landDim;
        var s = size0 * (0.55 + z2 * 0.55);
        ctx.fillRect(cx + x1 * R - s / 2, cy - y2 * R - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    }

    function drawArcs(now) {
      ctx.lineWidth = 1.1;
      ARCS.forEach(function (pair, idx) {
        var a = PINS[pair[0]], b = PINS[pair[1]];
        if (!a || !b) return;
        var va = vec(a[0], a[1]), vb = vec(b[0], b[1]);
        var pts = [], i, t, v, lift;
        for (i = 0; i <= 48; i++) {
          t = i / 48;
          v = slerp(va, vb, t);
          lift = 1 + 0.16 * Math.sin(Math.PI * t);
          pts.push(project(v, lift));
        }
        ctx.strokeStyle = C.arc;
        ctx.beginPath();
        var pen = false;
        for (i = 0; i < pts.length; i++) {
          if (pts[i][2] <= -0.08) { pen = false; continue; }
          if (!pen) { ctx.moveTo(pts[i][0], pts[i][1]); pen = true; }
          else ctx.lineTo(pts[i][0], pts[i][1]);
        }
        ctx.stroke();

        if (REDUCED) return;
        // a pulse travelling along the route
        var ph = ((now / 3600) + idx * 0.19) % 1;
        var pi = Math.floor(ph * 48);
        var p = pts[pi];
        if (p && p[2] > -0.05) {
          ctx.globalAlpha = Math.sin(Math.PI * ph);
          ctx.fillStyle = C.pin;
          ctx.beginPath(); ctx.arc(p[0], p[1], 2.2, 0, 6.2832); ctx.fill();
          ctx.globalAlpha = 1;
        }
      });
    }

    var pinScreen = {};

    function drawPins(now) {
      pinScreen = {};
      Object.keys(PINS).forEach(function (code) {
        var p = project(vec(PINS[code][0], PINS[code][1]));
        if (p[2] <= 0.03) return;
        pinScreen[code] = p;
        var isHub = code === HUB;
        var on = code === active || code === hover;
        var fade = Math.min(1, p[2] * 4);
        var r = (isHub ? 3.8 : 2.6) * (on ? 1.5 : 1);

        if (!REDUCED) {
          var ph = ((now / 2400) + (isHub ? 0 : 0.4)) % 1;
          ctx.globalAlpha = (1 - ph) * 0.55 * fade;
          ctx.strokeStyle = C.pin; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(p[0], p[1], r + ph * 16, 0, 6.2832); ctx.stroke();
        }
        ctx.globalAlpha = fade;
        ctx.fillStyle = C.pin;
        ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.2832); ctx.fill();
        if (on) {
          ctx.strokeStyle = C.pin; ctx.lineWidth = 1.2; ctx.globalAlpha = fade * 0.6;
          ctx.beginPath(); ctx.arc(p[0], p[1], r + 7, 0, 6.2832); ctx.stroke();
        }
        ctx.globalAlpha = 1;
      });
    }

    function frame(now) {
      if (!W) size();
      if (target !== null) {
        var d = target - yaw;
        while (d > Math.PI) d -= 2 * Math.PI;
        while (d < -Math.PI) d += 2 * Math.PI;
        yaw += d * 0.08;
        if (Math.abs(d) < 0.004) target = null;
      } else if (!dragging) {
        yaw += (spin * 0.0006) * 16 + vel;
        vel *= 0.94;
        if (Math.abs(vel) < 1e-5) vel = 0;
      }
      ctx.clearRect(0, 0, W, H);
      drawSphere();
      drawGraticule();
      drawLand();
      drawArcs(now);
      drawPins(now);
      requestAnimationFrame(frame);
    }

    // ---------------------------------------------------------- interaction
    function pointAt(e) {
      var r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    }
    function nearestPin(x, y) {
      var best = null, bd = 20;
      Object.keys(pinScreen).forEach(function (code) {
        var p = pinScreen[code];
        var d = Math.hypot(p[0] - x, p[1] - y);
        if (d < bd) { bd = d; best = code; }
      });
      return best;
    }

    canvas.addEventListener('pointerdown', function (e) {
      dragging = true; target = null;
      lastX = e.clientX; lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    });
    canvas.addEventListener('pointermove', function (e) {
      if (dragging) {
        var dx = e.clientX - lastX, dy = e.clientY - lastY;
        lastX = e.clientX; lastY = e.clientY;
        yaw += dx * 0.005;
        vel = dx * 0.005 * 0.4;
        tilt = Math.max(-55 * DEG, Math.min(70 * DEG, tilt + dy * 0.003));
        return;
      }
      var p = pointAt(e);
      var h = nearestPin(p[0], p[1]);
      if (h !== hover) {
        hover = h;
        canvas.style.cursor = h ? 'pointer' : 'grab';
        if (h && opts.onSelect) opts.onSelect(h);
      }
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      canvas.style.cursor = 'grab';
      try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    canvas.addEventListener('pointerleave', function () { hover = null; });
    canvas.addEventListener('click', function (e) {
      var p = pointAt(e);
      var h = nearestPin(p[0], p[1]);
      if (h && opts.onSelect) { active = h; opts.onSelect(h); }
    });

    canvas.style.cursor = 'grab';
    readTheme();
    size();
    addEventListener('resize', size);
    requestAnimationFrame(frame);

    return {
      focus: function (code) {
        if (!PINS[code]) return;
        active = code;
        // bring the marker's meridian round to face the viewer
        target = -PINS[code][1] * DEG;
      },
      refreshTheme: readTheme
    };
  }

  return { init: init };
})();
