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
  { file: 'who-we-are',  nav: 'who-we-are.html',  title: 'Who We Are — Obras Cullera',
    desc: 'Obras Cullera is a Spanish business and development company that identifies opportunities, connects capabilities and structures operations.' },
  { file: 'what-we-do',  nav: 'what-we-do.html',  title: 'What We Do — Obras Cullera',
    desc: 'Four areas: infrastructure and development, industry and market entry, aviation and connectivity, investment and strategic opportunities.' },
  { file: 'projects',    nav: 'projects.html',    title: 'Projects — Obras Cullera',
    desc: 'Projects and opportunities: how Obras Cullera identifies, structures, negotiates and develops operations with its partners.' },
  { file: 'our-impact',  nav: 'our-impact.html',  title: 'Our Impact — Obras Cullera',
    desc: 'Our approach: local development, knowledge transfer, long-term viability, governance and transparency.' },
  { file: 'news',        nav: 'news.html',        title: 'News & Insights — Obras Cullera',
    desc: 'Corporate news from Obras Cullera: agreements, operations, alliances and analysis.' },
  { file: 'contact',     nav: 'contact.html',     title: 'Contact — Obras Cullera',
    desc: 'Speak to Obras Cullera. Head office in Cullera, Valencia. Opportunities, partners, operators and investors.' },

  // the four activity areas, each with its own page
  { file: 'area-infrastructure', nav: 'what-we-do.html', title: 'Infrastructure & Development — Obras Cullera',
    desc: 'Identifying, structuring and developing opportunities linked to infrastructure, public facilities, real estate and territorial transformation.' },
  { file: 'area-industry', nav: 'what-we-do.html', title: 'Industry & Market Entry — Obras Cullera',
    desc: 'Supporting companies and investors from the decision to invest through to a real presence in a new market.' },
  { file: 'area-aviation', nav: 'what-we-do.html', title: 'Aviation & Connectivity — Obras Cullera',
    desc: 'Developing and structuring air connectivity opportunities alongside duly authorised operators.' },
  { file: 'area-investment', nav: 'what-we-do.html', title: 'Investment & Strategic Opportunities — Obras Cullera',
    desc: 'Identifying and structuring investment and business operations with the right partners.' },
  { file: 'submit-opportunity', nav: 'contact.html', title: 'Submit an Opportunity — Obras Cullera',
    desc: 'Present a national or international opportunity to Obras Cullera. Information is treated confidentially.' },
  { file: 'operation', nav: 'projects.html', title: 'Operation — Obras Cullera',
    desc: 'Detail template for an operation in development.' }
];

PAGES.forEach(function (p) {
  const body = fs.readFileSync(path.join(BODIES, p.file + '.html'), 'utf8');
  let top = CHROME_TOP
    .replace('<title>Obras Cullera — International Business &amp; Development</title>', '<title>' + p.title.replace('&', '&amp;') + '</title>')
    .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + p.desc.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '">');

  // active nav state
  top = top.replace('<a class="nav-link" href="' + p.nav + '">', '<a class="nav-link active" href="' + p.nav + '">');

  const html = top + '<main>\n' + body.trim() + '\n</main>' + CHROME_BOTTOM;
  fs.writeFileSync(path.join(SITE, p.file + '.html'), html);
  console.log('built ' + p.file + '.html  (' + Math.round(html.length / 1024) + ' kB)');
});
