#!/usr/bin/env node
// Writes one static copy of index.html per route (work.html, about.html, ...).
// GitHub Pages serves /work from work.html with a 200, so Google and AI crawlers
// can index every page instead of getting the 404.html redirect.
// Each copy gets that route's title, description, canonical and share tags baked in,
// plus a WebPage JSON-LD block. The SPA router still runs exactly as before.
// Run after every change to index.html:  node tools/build-pages.js
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = "https://openframe.design/";
const src = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

// Pull the PAGE_META and SLUG2ID maps out of the router so the copies never drift from it.
const grab = (name, end) => {
  const i = src.indexOf("const " + name + "=");
  if (i < 0) throw new Error("missing " + name + " in index.html");
  const j = src.indexOf(end, i);
  return Function("return " + src.slice(i + name.length + 7, j + end.length - 1))();
};
const META = grab("PAGE_META", "};");
const SLUG2ID = grab("SLUG2ID", "};");

const esc = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const setTag = (html, re, val) => {
  if (!re.test(html)) throw new Error("tag not found: " + re);
  return html.replace(re, (m, a, _old, b) => a + val + b);
};

function pageFor(slug, id) {
  const m = META[id];
  if (!m) throw new Error("no PAGE_META entry for " + id);
  const url = SITE + slug, t = esc(m.t), d = esc(m.d);
  let h = src;
  h = setTag(h, /(<title>)(.*?)(<\/title>)/, t);
  h = setTag(h, /(<meta name="description" content=")(.*?)(">)/, d);
  h = setTag(h, /(<link rel="canonical" href=")(.*?)(">)/, url);
  h = setTag(h, /(<meta property="og:url" content=")(.*?)(">)/, url);
  h = setTag(h, /(<meta property="og:title" content=")(.*?)(">)/, t);
  h = setTag(h, /(<meta property="og:description" content=")(.*?)(">)/, d);
  h = setTag(h, /(<meta name="twitter:title" content=")(.*?)(">)/, t);
  h = setTag(h, /(<meta name="twitter:description" content=")(.*?)(">)/, d);
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url + "#webpage",
    url, name: m.t, description: m.d,
    isPartOf: { "@id": SITE + "#website" },
    about: { "@id": SITE + "#organization" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: m.t.split(/ [—|] /)[0], item: url }
      ]
    }
  };
  h = h.replace("</head>", '<script type="application/ld+json">' + JSON.stringify(ld) + "</script>\n</head>");
  // Mark the route's page active in the markup so it shows before the router runs.
  h = h.replace('<section class="page" id="' + id + '"', '<section class="page active" id="' + id + '"');
  return h;
}

const today = new Date().toISOString().slice(0, 10);
const urls = [SITE];
for (const slug in SLUG2ID) {
  if (!slug) continue;
  fs.writeFileSync(path.join(ROOT, slug + ".html"), pageFor(slug, SLUG2ID[slug]));
  urls.push(SITE + slug);
  console.log("wrote " + slug + ".html");
}

// Sitemap: every route, dated today.
const pri = u => (u === SITE ? "1.0" : /\/(work|services|about)$/.test(u) ? "0.8" : /\/contact$/.test(u) ? "0.7" : "0.6");
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><priority>${pri(u)}</priority></url>`).join("\n") +
  "\n</urlset>\n";
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);
console.log("wrote sitemap.xml (" + urls.length + " urls)");
