/* Converts the source PNGs in images/ into sized, compressed WebP in site/assets/img/.
   Run:  node build/optimise-images.js
   Requires: npm install sharp   (dev-only, not needed to serve the site) */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'images');
const OUT = path.join(__dirname, '..', 'site', 'assets', 'img');

// Full-bleed slots (hero, page hero, CTA band) keep the full source width.
const FULL = ['art-hero-1', 'art-hero-2', 'art-hero-3', 'art-hero-4',
  'art-about', 'art-impact', 'art-contact', 'art-agri', 'art-infrastructure',
  'art-urban', 'art-news-1', 'art-p1', 'art-p3', 'art-p9'];

// Only ever shown in a portrait frame (pillar card / pull-quote) — crop to 3:4.
const PORTRAIT = ['art-energy', 'art-mining'];

// Everything else is a card or accordion figure: 1200px is ample at 2x.
const ALL = ['art-about', 'art-agri', 'art-contact', 'art-digital', 'art-energy',
  'art-hero-1', 'art-hero-2', 'art-hero-3', 'art-hero-4', 'art-impact',
  'art-infrastructure', 'art-logistics', 'art-mining', 'art-news-1', 'art-news-2',
  'art-news-3', 'art-news-4', 'art-p1', 'art-p2', 'art-p3', 'art-p4', 'art-p5',
  'art-p6', 'art-p7', 'art-p8', 'art-p9', 'art-road', 'art-solar', 'art-urban',
  'art-water'];

// ChatGPT exported one filename with a typo.
const ALIAS = { 'art-hero-2': 'art-here-2' };

function source(name) {
  for (const candidate of [name, ALIAS[name]]) {
    if (!candidate) continue;
    const p = path.join(SRC, candidate + '.png');
    if (fs.existsSync(p)) return p;
  }
  return null;
}

(async function () {
  let before = 0, after = 0;
  const missing = [];
  const rows = [];

  for (const name of ALL) {
    const src = source(name);
    if (!src) { missing.push(name); continue; }
    before += fs.statSync(src).size;

    const portrait = PORTRAIT.includes(name);
    const full = FULL.includes(name);
    let pipe = sharp(src).rotate();

    if (portrait) {
      pipe = pipe.resize(768, 1024, { fit: 'cover', position: 'attention' });
    } else if (!full) {
      pipe = pipe.resize({ width: 1200, withoutEnlargement: true });
    }

    // Heroes and CTA bands sit under heavy dark gradients, so they take more
    // compression without showing it; cards are seen at full strength.
    const quality = full ? 72 : 78;
    const dest = path.join(OUT, name + '.webp');
    const info = await pipe
      .webp({ quality, effort: 6, smartSubsample: true })
      .toFile(dest);

    after += info.size;
    rows.push([name, info.width + '×' + info.height, (info.size / 1024).toFixed(0) + ' kB']);
  }

  rows.forEach(r => console.log(r[0].padEnd(24) + r[1].padEnd(12) + r[2].padStart(8)));
  if (missing.length) console.log('\nMISSING SOURCE: ' + missing.join(', '));
  console.log('\nsource PNG: ' + (before / 1048576).toFixed(1) + ' MB');
  console.log('output WebP: ' + (after / 1048576).toFixed(2) + ' MB   (' +
    (100 - after / before * 100).toFixed(1) + '% smaller)');
})();
