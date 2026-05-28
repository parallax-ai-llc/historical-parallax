#!/usr/bin/env node
/**
 * SEO smoke check — run against a live server.
 *
 *   1. Build & start prod:  npm run build && npm start
 *   2. In another terminal:  node scripts/seo-check.mjs
 *      (or against dev: BASE_URL=http://localhost:3000 node scripts/seo-check.mjs)
 *
 * Verifies:
 *   - /sitemap.xml resolves with 200 + valid XML and reports the URL count.
 *   - /robots.txt resolves and advertises the sitemap.
 *   - Every representative route returns 200 with exactly one <h1>.
 *
 * Exits non-zero if any check fails, so it can gate CI/deploys.
 */

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

// One URL per route *type* the site renders.
const ROUTES = [
  { path: "/", label: "home" },
  { path: "/a/14k-triad", label: "article (/a/[id])" },
  { path: "/maps/china-history", label: "map (/maps/[mapId])" },
  { path: "/contribute", label: "contribute" },
  { path: "/terms-of-service", label: "terms-of-service" },
  { path: "/privacy-policy", label: "privacy-policy" },
];

let failures = 0;
const pass = (msg) => console.log(`  \x1b[32m✓\x1b[0m ${msg}`);
const fail = (msg) => {
  failures++;
  console.log(`  \x1b[31m✗ ${msg}\x1b[0m`);
};

async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`, { redirect: "manual" });
  const body = await res.text();
  return { status: res.status, body, type: res.headers.get("content-type") || "" };
}

function countMatches(html, regex) {
  return (html.match(regex) || []).length;
}

async function checkSitemap() {
  console.log("\nsitemap.xml");
  try {
    const { status, body, type } = await get("/sitemap.xml");
    if (status !== 200) return fail(`/sitemap.xml returned ${status} (expected 200)`);
    if (!/xml/.test(type)) fail(`/sitemap.xml content-type is "${type}" (expected XML)`);
    const urlCount = countMatches(body, /<loc>/g);
    if (urlCount === 0) return fail("/sitemap.xml contains no <loc> entries");
    if (urlCount > 50000) fail(`/sitemap.xml has ${urlCount} URLs (>50,000 limit — paginate it)`);
    pass(`/sitemap.xml → 200, ${urlCount.toLocaleString()} URLs`);
  } catch (e) {
    fail(`/sitemap.xml request failed: ${e.message}`);
  }
}

async function checkRobots() {
  console.log("\nrobots.txt");
  try {
    const { status, body } = await get("/robots.txt");
    if (status !== 200) return fail(`/robots.txt returned ${status} (expected 200)`);
    if (!/Sitemap:\s*\S*\/sitemap\.xml/i.test(body)) {
      fail("/robots.txt does not advertise /sitemap.xml");
    } else {
      pass("/robots.txt → 200, advertises /sitemap.xml");
    }
  } catch (e) {
    fail(`/robots.txt request failed: ${e.message}`);
  }
}

async function checkH1() {
  console.log("\nh1 tags (exactly one per route)");
  for (const { path, label } of ROUTES) {
    try {
      const { status, body } = await get(path);
      if (status !== 200) {
        fail(`${label} (${path}) returned ${status}`);
        continue;
      }
      const h1Count = countMatches(body, /<h1[\s>]/gi);
      if (h1Count === 1) pass(`${label} (${path}) → 1 <h1>`);
      else fail(`${label} (${path}) → ${h1Count} <h1> (expected 1)`);
    } catch (e) {
      fail(`${label} (${path}) request failed: ${e.message}`);
    }
  }
}

(async () => {
  console.log(`SEO check against ${BASE_URL}`);
  await checkSitemap();
  await checkRobots();
  await checkH1();
  console.log(failures === 0 ? "\n\x1b[32mAll SEO checks passed.\x1b[0m" : `\n\x1b[31m${failures} check(s) failed.\x1b[0m`);
  process.exit(failures === 0 ? 0 : 1);
})();
