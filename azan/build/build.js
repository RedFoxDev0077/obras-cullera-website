/* Assembles the static pages from index.html's chrome + per-page bodies.
   Run:  node build/build.js
   Output: site/<page>.html  (plain static HTML, no runtime dependency) */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, 'site');
const BODIES = path.join(__dirname, 'bodies');

const index = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');
const headEnd = index.indexOf('<main>');
const footStart = index.indexOf('</main>') + '</main>'.length;
const CHROME_TOP = index.slice(0, headEnd);
const CHROME_BOTTOM = index.slice(footStart);

const PAGES = [
  { file: 'about', nav: 'about.html', title: 'About AZAN — AZAN Global Logistics',
    desc: 'AZAN Global Logistics W.L.L. is established in the Kingdom of Bahrain, its corporate hub for contracting, coordination and project management, with operations carried out through local structures and authorised partners.' },
  { file: 'logistics', nav: 'logistics.html', title: 'Land Logistics — AZAN Global Logistics',
    desc: 'Structuring and coordination of cross-border road freight between ports, logistics centres and inland markets, executed through operating structures and licensed carriers.' },
  { file: 'corridor', nav: 'logistics.html', title: 'West Africa Logistics Corridor — AZAN Global Logistics',
    desc: 'A cross-border road freight corridor under development, conceived to connect ports, logistics centres and inland markets across West Africa.' },
  { file: 'aviation', nav: 'aviation.html', title: 'Executive Aviation — AZAN Global Logistics',
    desc: 'Commercial and coordination solutions for private and executive flights, arranged through licensed and specialised air operators.' },
  { file: 'network', nav: 'network.html', title: 'Global Network — AZAN Global Logistics',
    desc: 'Bahrain as corporate hub, West Africa as first territory of implementation, and commercial connections across the Middle East, Africa and Europe.' },
  { file: 'contact', nav: 'contact.html', title: 'Contact — AZAN Global Logistics',
    desc: 'Speak to AZAN Global Logistics. Head office in Manama, Kingdom of Bahrain. Shippers, operators, partners and institutions.' }
];

PAGES.forEach(function (p) {
  const body = fs.readFileSync(path.join(BODIES, p.file + '.html'), 'utf8');
  let top = CHROME_TOP
    .replace('<title>AZAN Global Logistics — International Logistics &amp; Mobility</title>', '<title>' + p.title.replace(/&/g, '&amp;') + '</title>')
    .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + p.desc.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '">');

  // active nav state
  top = top.replace('<a class="nav-link" href="' + p.nav + '">', '<a class="nav-link active" href="' + p.nav + '">');

  const html = top + '<main>\n' + body.trim() + '\n</main>' + CHROME_BOTTOM;
  fs.writeFileSync(path.join(SITE, p.file + '.html'), html);
  console.log('built ' + p.file + '.html  (' + Math.round(html.length / 1024) + ' kB)');
});
