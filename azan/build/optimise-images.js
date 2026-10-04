/* Converts every source image in azan/images/ into compressed WebP in
   azan/site/assets/img/, keeping the filename.

   Run:  node build/optimise-images.js          (from azan/)
   Requires: sharp   ->  npm install sharp   (dev-only, not needed to serve the site)

   Slots on this site are full-bleed heroes, CTA bands, gate panels and
   accordion figures, so 1536px wide is the useful ceiling; anything larger
   is downscaled, anything smaller is left alone. */
const fs = require('fs');
const path = require('path');
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('sharp is not installed. From the repo root run:  npm install sharp');
  process.exit(1);
}

const SRC = path.join(__dirname, '..', 'images');
const OUT = path.join(__dirname, '..', 'site', 'assets', 'img');
const MAX_WIDTH = 1536;
const QUALITY = 82;
const EXT = ['.png', '.jpg', '.jpeg', '.webp', '.tif', '.tiff'];

if (!fs.existsSync(SRC)) {
  console.error('No source folder: ' + SRC);
  console.error('Create it and drop the generated images in, then run this again.');
  process.exit(1);
}
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const files = fs.readdirSync(SRC)
  .filter(function (f) { return EXT.indexOf(path.extname(f).toLowerCase()) !== -1; })
  .sort();

if (!files.length) {
  console.log('Nothing to do: ' + SRC + ' holds no images.');
  process.exit(0);
}

const rows = [];
let done = 0;

files.forEach(function (file) {
  const name = path.basename(file, path.extname(file));
  const dest = path.join(OUT, name + '.webp');

  sharp(path.join(SRC, file))
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(dest)
    .then(function (info) {
      rows.push([name + '.webp', info.width + '×' + info.height,
        (info.size / 1024).toFixed(0) + ' kB']);
      if (++done === files.length) report();
    })
    .catch(function (err) {
      rows.push([file, 'FAILED', err.message]);
      if (++done === files.length) report();
    });
});

function report() {
  rows.sort();
  const w = rows.reduce(function (m, r) { return Math.max(m, r[0].length); }, 0);
  rows.forEach(function (r) {
    console.log('  ' + r[0] + ' '.repeat(w - r[0].length) + '   ' + r[1] + '   ' + r[2]);
  });
  console.log('\n' + rows.length + ' image(s) written to site/assets/img/');
}
