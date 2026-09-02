/* Prepares the Earth textures for the globe.
   Sources: NASA Blue Marble / Visible Earth derivatives (public domain),
   staged in images/earth/.

   Produces two WebP files per size tier:
     earth-day-<w>.webp    colour surface (Blue Marble)
     earth-mask-<w>.webp    R = night city lights
                            G = cloud cover
                            B = ocean mask (specular)
   Packing the three greyscale maps into one RGB image means the page makes
   two texture requests instead of four.

   Run:  npm install --no-save sharp
         node build/gen-earth-textures.js */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'images', 'earth');
const OUT = path.join(__dirname, '..', 'site', 'assets', 'img');

const DAY = path.join(SRC, 'earth_atmos_2048.jpg');
const NIGHT = path.join(SRC, 'earth_lights_2048.png');
const CLOUDS = path.join(SRC, 'earth_clouds_2048.png');
const SPEC = path.join(SRC, 'earth_specular_2048.jpg');

// Day map at 2048 for desktop and 1024 for phones. The mask only ships at
// 1024: city lights, cloud and the ocean mask are all low-frequency enough
// that a larger one costs ~230 kB for no visible gain.
const TIERS = [2048, 1024];
const MASK_TIERS = [1024];

async function grey(file, w, h, channel) {
  var p = sharp(file).resize(w, h, { fit: 'fill' });
  if (channel === 'alpha') p = p.ensureAlpha().extractChannel(3);
  else p = p.greyscale().extractChannel(0);
  return p.raw().toBuffer();
}

(async function () {
  for (const w of TIERS) {
    const h = w / 2;

    await sharp(DAY)
      .resize(w, h, { fit: 'fill' })
      .webp({ quality: w === 2048 ? 78 : 74, effort: 6 })
      .toFile(path.join(OUT, 'earth-day-' + w + '.webp'));

    if (MASK_TIERS.indexOf(w) === -1) continue;

    const [night, clouds, spec] = await Promise.all([
      grey(NIGHT, w, h),
      grey(CLOUDS, w, h, 'alpha'),
      grey(SPEC, w, h)
    ]);

    const packed = Buffer.alloc(w * h * 3);
    for (let i = 0, j = 0; i < w * h; i++, j += 3) {
      packed[j] = night[i];
      packed[j + 1] = clouds[i];
      packed[j + 2] = spec[i];
    }

    await sharp(packed, { raw: { width: w, height: h, channels: 3 } })
      .webp({ quality: w === 2048 ? 76 : 72, effort: 6 })
      .toFile(path.join(OUT, 'earth-mask-' + w + '.webp'));
  }

  let total = 0;
  fs.readdirSync(OUT).filter(f => /^earth-/.test(f)).sort().forEach(f => {
    const s = fs.statSync(path.join(OUT, f)).size;
    total += s;
    console.log(f.padEnd(24) + (s / 1024).toFixed(0).padStart(6) + ' kB');
  });
  console.log('\ndesktop pair: ' +
    ((fs.statSync(path.join(OUT, 'earth-day-2048.webp')).size +
      fs.statSync(path.join(OUT, 'earth-mask-2048.webp')).size) / 1024).toFixed(0) + ' kB');
  console.log('mobile pair:  ' +
    ((fs.statSync(path.join(OUT, 'earth-day-1024.webp')).size +
      fs.statSync(path.join(OUT, 'earth-mask-1024.webp')).size) / 1024).toFixed(0) + ' kB');
})();
