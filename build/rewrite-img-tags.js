/* One-off: points the markup at the WebP files and adds the loading hints.
   Rewrites site/index.html and build/bodies/*.html in place.
   Run:  node build/rewrite-img-tags.js */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const IMG = path.join(ROOT, 'site', 'assets', 'img');

const targets = [path.join(ROOT, 'site', 'index.html')]
  .concat(fs.readdirSync(path.join(__dirname, 'bodies'))
    .map(f => path.join(__dirname, 'bodies', f)));

(async function () {
  // intrinsic sizes, so the browser can reserve space before the file lands
  const dims = {};
  for (const f of fs.readdirSync(IMG).filter(f => f.endsWith('.webp'))) {
    const m = await sharp(path.join(IMG, f)).metadata();
    dims[f] = [m.width, m.height];
  }

  let heroIndex = 0;

  for (const file of targets) {
    let s = fs.readFileSync(file, 'utf8');
    heroIndex = 0;

    s = s.replace(
      /(<(?:div|span) class="([^"]*)"[^>]*>\s*)<img src="assets\/img\/(art-[a-z0-9-]+)\.svg"([^>]*)>/g,
      (m, open, cls, name, rest) => {
        const webp = name + '.webp';
        if (!dims[webp]) return m;
        const [w, h] = dims[webp];
        const ctx = cls.split(/\s+/)[0];
        const aboveFold = ctx === 'hero-slide' || ctx === 'page-hero-media';

        let attrs = ' width="' + w + '" height="' + h + '" decoding="async"';
        let srcAttr = 'src="assets/img/' + webp + '"';

        if (ctx === 'hero-slide') {
          // Only the first slide is needed for the first paint; the rest are
          // fetched by the carousel just before they are shown.
          if (heroIndex === 0) attrs += ' fetchpriority="high"';
          else srcAttr = 'data-src="assets/img/' + webp + '"';
          heroIndex++;
        }
        if (!aboveFold) attrs += ' loading="lazy"';

        return open + '<img ' + srcAttr + attrs + rest + '>';
      }
    );

    fs.writeFileSync(file, s);
    console.log('rewrote ' + path.relative(ROOT, file));
  }
})();
