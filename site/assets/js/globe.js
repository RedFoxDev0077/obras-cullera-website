/* ==========================================================================
   OBRAS CULLERA — satellite Earth
   Raw WebGL. A single full-screen quad; the fragment shader ray-traces the
   sphere and shades it from NASA Blue Marble textures — surface colour, city
   lights, cloud cover and an ocean mask packed into one RGB image.
   Day/night terminator, cloud layer drifting independently of the surface,
   atmospheric scattering on the limb, specular glint off the oceans.
   No Three.js, no WebGL framework. Falls back to a static disc without WebGL.
   ========================================================================== */
window.OCGlobe = (function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DEG = Math.PI / 180;
  var TAU = Math.PI * 2;

  var PINS = {
    es: [39.17, -0.25], pt: [38.72, -9.14], ma: [34.02, -6.83],
    mr: [18.09, -15.98], sn: [14.72, -17.47], cv: [14.93, -23.51],
    gn: [9.51, -13.71], ml: [12.64, -8.00], ci: [5.36, -4.01],
    cm: [3.85, 11.50], gq: [3.75, 8.78], ga: [0.39, 9.45],
    ae: [24.47, 54.37], sa: [24.71, 46.68]
  };
  var ARCS = [['es', 'gn'], ['es', 'sn'], ['es', 'ma'], ['gn', 'ci'], ['gn', 'cm']];
  var HUB = 'gn';

  // one revolution every four minutes — an orbital drift, not a spinning logo
  var SPIN = TAU / 240;
  var CLOUD_DRIFT = TAU / 1500;
  var TILT0 = 16 * DEG;

  function vec(lat, lon) {
    var la = lat * DEG, lo = lon * DEG, c = Math.cos(la);
    return [c * Math.sin(lo), Math.sin(la), c * Math.cos(lo)];
  }

  function slerp(a, b, t) {
    var d = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
    var o = Math.acos(d), so = Math.sin(o);
    if (so < 1e-6) return a.slice();
    var s1 = Math.sin((1 - t) * o) / so, s2 = Math.sin(t * o) / so;
    return [a[0] * s1 + b[0] * s2, a[1] * s1 + b[1] * s2, a[2] * s1 + b[2] * s2];
  }

  function css2rgb(str, fallback) {
    var s = (str || '').trim();
    var m = s.match(/^#([0-9a-f]{3,8})$/i);
    if (m) {
      var h = m[1];
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
    }
    m = s.match(/rgba?\(([^)]+)\)/i);
    if (m) {
      var p = m[1].split(/[,\s/]+/).filter(Boolean).map(parseFloat);
      return [p[0] / 255, p[1] / 255, p[2] / 255];
    }
    return fallback;
  }

  /* --------------------------------------------------------------- shaders */
  var VERT = [
    'attribute vec2 aPos;',
    'void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }'
  ].join('\n');

  var FRAG = [
    'precision highp float;',
    'uniform vec2 uRes;',
    'uniform vec2 uC;',
    'uniform float uR;',
    'uniform float uYaw, uTilt, uCloudYaw;',
    'uniform vec3 uSun;',
    'uniform sampler2D uDay, uMask;',
    'uniform vec3 uAtmo, uSpace;',
    'uniform float uSpaceAmt;',

    'const float PI = 3.14159265;',

    'vec2 lookup(vec3 n, float yaw, float tilt){',
    '  float ct = cos(tilt), st = sin(tilt);',
    '  float y  =  n.y * ct + n.z * st;',
    '  float z1 = -n.y * st + n.z * ct;',
    '  float cy = cos(yaw), sy = sin(yaw);',
    '  float x =  n.x * cy - z1 * sy;',
    '  float z =  n.x * sy + z1 * cy;',
    '  float lat = asin(clamp(y, -1.0, 1.0));',
    '  float lon = atan(x, z);',
    '  return vec2(lon / (2.0 * PI) + 0.5, 0.5 - lat / PI);',
    '}',

    'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',

    'void main(){',
    '  vec2 p = (gl_FragCoord.xy - uC) / uR;',
    '  float d2 = dot(p, p);',
    '  float d  = sqrt(d2);',
    '  float aa = 1.6 / uR;',
    '  vec3 col = vec3(0.0);',
    '  float alpha = 0.0;',

    /* --- space, stars and the outer halo ------------------------------- */
    // fade everything outside the planet to nothing before the canvas edge,
    // otherwise the field clips and you can see the square
    '  float edge = 1.0 - smoothstep(1.02, 1.40, d);',
    '  float space = exp(-(d - 1.0) * 1.7) * uSpaceAmt * edge;',
    '  space = clamp(space, 0.0, 1.0);',
    '  vec3 rimN = vec3(normalize(p + 1e-6), 0.0);',
    '  float rimLit = max(dot(rimN, uSun), 0.0);',
    '  float glow = exp(-(d - 1.0) * 24.0) + exp(-(d - 1.0) * 6.0) * 0.30;',
    '  glow *= step(1.0, d) * edge;',
    '  float starA = 0.0;',
    '  if (d > 1.06) {',
    '    vec2 cell = floor(gl_FragCoord.xy / 3.0);',
    '    float h = hash(cell);',
    '    starA = smoothstep(0.9972, 0.9998, h) * (0.35 + 0.65 * hash(cell + 7.3));',
    '    starA *= smoothstep(1.06, 1.22, d) * uSpaceAmt * edge;',
    '  }',
    '  col += uSpace * space;',
    '  col += uAtmo * glow * (0.10 + 0.90 * rimLit) * 1.15;',
    '  col += vec3(0.85, 0.88, 1.0) * starA;',
    '  alpha = clamp(space * 0.92 + glow * (0.12 + 0.88 * rimLit) * 1.3 + starA, 0.0, 1.0);',

    /* --- the planet ---------------------------------------------------- */
    '  if (d2 < 1.0 + aa) {',
    '    float z = sqrt(max(0.0, 1.0 - d2));',
    '    vec3 n = vec3(p, z);',
    '    vec2 uv  = lookup(n, uYaw, uTilt);',
    '    vec2 uvc = lookup(n, uCloudYaw, uTilt);',

    '    vec3 day  = texture2D(uDay, uv).rgb;',
    '    vec3 mask = texture2D(uMask, uv).rgb;',
    '    float night = mask.r;',
    '    float ocean = mask.b;',
    '    float cloud = texture2D(uMask, uvc).g;',

    '    float sd  = dot(n, uSun);',
    '    float lit = smoothstep(-0.14, 0.26, sd);',

    /* Lambert with a little wrap so the terminator is soft, not a hard edge */
    '    float diff = pow(max(sd, 0.0), 0.75);',
    '    vec3 surface = day * (0.045 + 0.955 * diff);',

    /* city lights only where the sun has genuinely set */
    '    vec3 city = vec3(1.0, 0.78, 0.46) * pow(night, 1.45) * 1.35;',
    '    vec3 base = mix(city + day * 0.020, surface, lit);',

    /* sun glinting off water */
    '    vec3 h = normalize(uSun + vec3(0.0, 0.0, 1.0));',
    '    float spec = pow(max(dot(n, h), 0.0), 55.0) * ocean * lit;',
    '    base += vec3(1.0, 0.97, 0.90) * spec * 0.42;',

    /* cloud deck: shadows the surface, catches the light itself */
    '    base *= 1.0 - 0.20 * cloud * lit;',
    '    vec3 cloudCol = vec3(1.0, 0.99, 0.97) * (0.05 + 0.95 * pow(max(sd, 0.0), 0.65));',
    '    base = mix(base, cloudCol, cloud * (0.10 + 0.90 * lit));',

    /* atmosphere thickening towards the limb */
    '    float fres = pow(1.0 - z, 3.0);',
    '    base += uAtmo * fres * (0.22 + 1.05 * max(sd, 0.0));',

    '    float cover = smoothstep(1.0 + aa, 1.0 - aa, d);',
    '    col = mix(col, base, cover);',
    '    alpha = max(alpha, cover);',
    '  }',

    '  gl_FragColor = vec4(col * alpha, alpha);',
    '}'
  ].join('\n');

  function compile(gl, type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn('globe shader: ' + gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  }

  /* ------------------------------------------------------------------ init */
  function init(canvas, opts) {
    opts = opts || {};

    // marker layer sits over the planet; keeps hit-testing in plain 2D
    var pinCv = document.createElement('canvas');
    pinCv.className = 'globe-pins';
    canvas.parentNode.insertBefore(pinCv, canvas.nextSibling);
    var pctx = pinCv.getContext('2d');

    var gl = null, prog = null, uni = {}, texDay = null, texMask = null;
    var W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = 1;
    var yaw = 14 * DEG, tilt = TILT0, cloudYaw = 14 * DEG;
    var vel = 0, dragging = false, lastX = 0, lastY = 0, target = null;
    var hover = null, active = null, ready = false, visible = false, raf = 0;
    var prev = 0, theme = {};
    var SUN = (function () {
      var s = [-0.62, 0.24, 0.75];
      var m = Math.hypot(s[0], s[1], s[2]);
      return [s[0] / m, s[1] / m, s[2] / m];
    })();

    function readTheme() {
      var s = getComputedStyle(canvas);
      var g = function (n) { return (s.getPropertyValue(n) || '').trim(); };
      theme = {
        atmo: css2rgb(g('--globe-atmo'), [0.30, 0.52, 0.86]),
        space: css2rgb(g('--globe-space'), [0.02, 0.03, 0.05]),
        spaceAmt: parseFloat(g('--globe-space-amount')) || 0.9,
        pin: g('--globe-pin') || '#FFE6C8',
        arc: g('--globe-arc') || 'rgba(255,224,190,.20)'
      };
    }

    function size() {
      var r = canvas.getBoundingClientRect();
      if (!r.width) return false;
      dpr = Math.min(window.devicePixelRatio || 1, r.width < 420 ? 2 : 1.75);
      W = r.width; H = r.height;
      [canvas, pinCv].forEach(function (c) {
        c.width = Math.round(W * dpr);
        c.height = Math.round(H * dpr);
      });
      pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2; cy = H / 2;
      R = Math.min(W, H) * 0.365;
      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
      return true;
    }

    /* --- CPU-side copy of the shader's rotation, for the markers --------- */
    function project(v, lift) {
      var ca = Math.cos(yaw), sa = Math.sin(yaw);
      var x1 = v[0] * ca + v[2] * sa;
      var z1 = -v[0] * sa + v[2] * ca;
      var ct = Math.cos(tilt), st = Math.sin(tilt);
      var y2 = v[1] * ct - z1 * st;
      var z2 = v[1] * st + z1 * ct;
      var k = R * (lift || 1);
      return [cx + x1 * k, cy - y2 * k, z2];
    }

    var pinScreen = {};

    function drawPins() {
      pctx.clearRect(0, 0, W, H);
      pinScreen = {};

      pctx.lineWidth = 0.9;
      pctx.strokeStyle = theme.arc;
      ARCS.forEach(function (pair) {
        var va = vec(PINS[pair[0]][0], PINS[pair[0]][1]);
        var vb = vec(PINS[pair[1]][0], PINS[pair[1]][1]);
        pctx.beginPath();
        var pen = false;
        for (var i = 0; i <= 40; i++) {
          var t = i / 40;
          var q = project(slerp(va, vb, t), 1 + 0.05 * Math.sin(Math.PI * t));
          if (q[2] <= 0.04) { pen = false; continue; }
          if (!pen) { pctx.moveTo(q[0], q[1]); pen = true; } else pctx.lineTo(q[0], q[1]);
        }
        pctx.stroke();
      });

      Object.keys(PINS).forEach(function (code) {
        var q = project(vec(PINS[code][0], PINS[code][1]));
        if (q[2] <= 0.05) return;
        pinScreen[code] = q;
        var on = code === active || code === hover;
        var r = (code === HUB ? 2.9 : 2.1) * (on ? 1.45 : 1);
        var fade = Math.min(1, q[2] * 3.4);

        var g = pctx.createRadialGradient(q[0], q[1], 0, q[0], q[1], r * 5);
        g.addColorStop(0, theme.pin);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        pctx.globalAlpha = 0.42 * fade;
        pctx.fillStyle = g;
        pctx.beginPath(); pctx.arc(q[0], q[1], r * 5, 0, TAU); pctx.fill();

        pctx.globalAlpha = fade;
        pctx.fillStyle = theme.pin;
        pctx.beginPath(); pctx.arc(q[0], q[1], r, 0, TAU); pctx.fill();

        if (on) {
          pctx.globalAlpha = fade * 0.75;
          pctx.strokeStyle = theme.pin; pctx.lineWidth = 1;
          pctx.beginPath(); pctx.arc(q[0], q[1], r + 6, 0, TAU); pctx.stroke();
        }
        pctx.globalAlpha = 1;
      });
    }

    /* ------------------------------------------------------------ textures */
    function loadTex(url, cb) {
      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        var t = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
        cb(t);
      };
      img.onerror = function () { cb(null); };
      img.src = url;
    }

    function start() {
      gl = canvas.getContext('webgl', {
        alpha: true, premultipliedAlpha: true, antialias: false,
        depth: false, stencil: false, powerPreference: 'low-power'
      }) || canvas.getContext('experimental-webgl');
      if (!gl) return fallback();

      var vs = compile(gl, gl.VERTEX_SHADER, VERT);
      var fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return fallback();
      prog = gl.createProgram();
      gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return fallback();
      gl.useProgram(prog);

      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(prog, 'aPos');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      ['uRes', 'uC', 'uR', 'uYaw', 'uTilt', 'uCloudYaw', 'uSun', 'uDay', 'uMask',
        'uAtmo', 'uSpace', 'uSpaceAmt'].forEach(function (n) {
          uni[n] = gl.getUniformLocation(prog, n);
        });

      gl.clearColor(0, 0, 0, 0);
      size();

      // phones and low-DPR screens get the light pair
      var small = Math.min(screen.width, screen.height) < 700 || (window.devicePixelRatio || 1) < 1.3;
      var dayUrl = 'assets/img/earth-day-' + (small ? 1024 : 2048) + '.webp';

      var pending = 2;
      var done = function () { if (--pending === 0) { ready = true; loop(performance.now()); } };
      loadTex(dayUrl, function (t) { texDay = t; done(); });
      loadTex('assets/img/earth-mask-1024.webp', function (t) { texMask = t; done(); });
    }

    function fallback() {
      // no WebGL: a plain shaded disc so the section still reads
      canvas.classList.add('globe-fallback');
      var c2 = canvas.getContext('2d');
      if (!c2) return;
      var img = new Image();
      img.onload = function () {
        size();
        c2.setTransform(dpr, 0, 0, dpr, 0, 0);
        c2.save();
        c2.beginPath(); c2.arc(cx, cy, R, 0, TAU); c2.clip();
        c2.drawImage(img, cx - R, cy - R * 0.5, R * 2, R);
        c2.drawImage(img, cx - R, cy - R, R * 2, R * 2);
        var g = c2.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.1, cx, cy, R);
        g.addColorStop(0, 'rgba(0,0,0,0)');
        g.addColorStop(1, 'rgba(0,0,0,.72)');
        c2.fillStyle = g; c2.fillRect(cx - R, cy - R, R * 2, R * 2);
        c2.restore();
        drawPins();
      };
      img.src = 'assets/img/earth-day-1024.webp';
    }

    function render() {
      if (!ready || !gl || !texDay || !texMask) return;
      gl.uniform2f(uni.uRes, canvas.width, canvas.height);
      gl.uniform2f(uni.uC, cx * dpr, canvas.height - cy * dpr);
      gl.uniform1f(uni.uR, R * dpr);
      gl.uniform1f(uni.uYaw, yaw);
      gl.uniform1f(uni.uTilt, tilt);
      gl.uniform1f(uni.uCloudYaw, cloudYaw);
      gl.uniform3fv(uni.uSun, SUN);
      gl.uniform3fv(uni.uAtmo, theme.atmo);
      gl.uniform3fv(uni.uSpace, theme.space);
      gl.uniform1f(uni.uSpaceAmt, theme.spaceAmt);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texDay);
      gl.uniform1i(uni.uDay, 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, texMask);
      gl.uniform1i(uni.uMask, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function loop(now) {
      raf = requestAnimationFrame(loop);
      var dt = Math.min(0.05, (now - prev) / 1000 || 0.016);
      prev = now;
      if (!visible) return;

      if (target !== null) {
        var d = target - yaw;
        while (d > Math.PI) d -= TAU;
        while (d < -Math.PI) d += TAU;
        yaw += d * 0.055;
        cloudYaw += d * 0.055;
        if (Math.abs(d) < 0.003) target = null;
      } else if (!dragging) {
        if (!REDUCED) { yaw += SPIN * dt; cloudYaw += (SPIN + CLOUD_DRIFT) * dt; }
        yaw += vel; cloudYaw += vel;
        vel *= 0.95;
        if (Math.abs(vel) < 1e-5) vel = 0;
      }
      render();
      drawPins();
    }

    /* --------------------------------------------------------- interaction */
    function pointAt(e) {
      var r = pinCv.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    }
    function nearestPin(x, y) {
      var best = null, bd = 22;
      Object.keys(pinScreen).forEach(function (code) {
        var q = pinScreen[code];
        var dd = Math.hypot(q[0] - x, q[1] - y);
        if (dd < bd) { bd = dd; best = code; }
      });
      return best;
    }

    pinCv.addEventListener('pointerdown', function (e) {
      dragging = true; target = null;
      lastX = e.clientX; lastY = e.clientY;
      pinCv.setPointerCapture(e.pointerId);
      pinCv.style.cursor = 'grabbing';
    });
    pinCv.addEventListener('pointermove', function (e) {
      if (dragging) {
        var dx = e.clientX - lastX, dy = e.clientY - lastY;
        lastX = e.clientX; lastY = e.clientY;
        yaw += dx * 0.004; cloudYaw += dx * 0.004;
        vel = dx * 0.0016;
        tilt = Math.max(-50 * DEG, Math.min(65 * DEG, tilt + dy * 0.0025));
        return;
      }
      var p = pointAt(e);
      var h = nearestPin(p[0], p[1]);
      if (h !== hover) {
        hover = h;
        pinCv.style.cursor = h ? 'pointer' : 'grab';
        if (h && opts.onSelect) opts.onSelect(h);
      }
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      pinCv.style.cursor = 'grab';
      try { pinCv.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    pinCv.addEventListener('pointerup', endDrag);
    pinCv.addEventListener('pointercancel', endDrag);
    pinCv.addEventListener('pointerleave', function () { hover = null; });
    pinCv.addEventListener('click', function (e) {
      var p = pointAt(e);
      var h = nearestPin(p[0], p[1]);
      if (h && opts.onSelect) { active = h; opts.onSelect(h); }
    });

    pinCv.style.cursor = 'grab';
    readTheme();

    // don't build the context or fetch 250 kB of texture until it is near view
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          visible = en.isIntersecting;
          if (visible && !gl) { io.unobserve(canvas); start(); }
        });
      }, { rootMargin: '250px 0px' });
      io.observe(canvas);
      // keep pausing the loop when it scrolls away
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { visible = en.isIntersecting; });
      }, { rootMargin: '120px 0px' });
      io2.observe(canvas);
    } else {
      visible = true; start();
    }

    addEventListener('resize', function () { size(); });

    return {
      focus: function (code) {
        if (!PINS[code]) return;
        active = code;
        target = -PINS[code][1] * DEG;
      },
      refreshTheme: readTheme
    };
  }

  return { init: init };
})();
