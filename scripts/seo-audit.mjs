/* Crawl-and-SEO audit of the built site.

   Builds the internal link graph and reports the things that actually decide
   whether a page can rank: is it reachable, how deep, how many internal links
   point at it, and does it carry unique title/description/schema.

   Run with `npm run seo` after `npm run build`. */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const walk = (dir) =>
  readdirSync(dir).flatMap((e) => {
    const p = path.join(dir, e);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

const norm = (u) => {
  const p = (u.split('#')[0].split('?')[0] || '/').replace(/\/index\.html$/, '/');
  return p === '' ? '/' : p.endsWith('/') || p === '/' ? p : p + '/';
};

const pages = new Map();
for (const file of walk('dist')) {
  const rel = path.relative('dist', file).replaceAll('\\', '/');

  // The 404 page is deliberately unlinked and is never crawled, so including
  // it would report the same false positives on every run.
  if (rel === '404.html') continue;

  const html = readFileSync(file, 'utf8');
  const url = norm('/' + rel);
  const isRedirect = html.includes('http-equiv="refresh"');
  pages.set(url, {
    file,
    isRedirect,
    title: (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '',
    desc: (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '',
    canonical: (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '',
    noindex: /content="[^"]*noindex/.test(html),
    h1: (html.match(/<h1[\s>]/g) || []).length,
    words: (html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').match(/\S+/g) || []).length,
    schema: [...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]),
    links: [...new Set([...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]))]
      .filter((h) => !h.startsWith('/_astro') && !/\.(css|js|xml|txt|woff2?|svg|png|jpe?g|webp|avif|pdf|ico)$/.test(h.split('#')[0]))
      .map(norm),
  });
}

const real = [...pages.entries()].filter(([, p]) => !p.isRedirect);

/* Breadth-first from the homepage to get click depth and inbound counts. */
const depth = new Map([['/', 0]]);
const inbound = new Map();
const queue = ['/'];
while (queue.length) {
  const cur = queue.shift();
  for (const link of pages.get(cur)?.links ?? []) {
    inbound.set(link, (inbound.get(link) ?? 0) + 1);
    const target = pages.has(link) ? link : null;
    if (target && !depth.has(target)) {
      depth.set(target, depth.get(cur) + 1);
      queue.push(target);
    }
  }
}

const problems = [];
const orphans = real.filter(([u]) => u !== '/' && !depth.has(u));
if (orphans.length) problems.push(['Unreachable from the homepage', orphans.map(([u]) => u)]);

const deep = real.filter(([u]) => (depth.get(u) ?? 99) > 3).map(([u]) => `${u} (depth ${depth.get(u)})`);
if (deep.length) problems.push(['More than 3 clicks deep', deep]);

const thin = real.filter(([, p]) => p.words < 300).map(([u, p]) => `${u} (${p.words} words)`);
if (thin.length) problems.push(['Thin content, under 300 words', thin]);

const noIndexed = real.filter(([, p]) => p.noindex).map(([u]) => u);
if (noIndexed.length) problems.push(['Set to noindex', noIndexed]);

const dupTitles = {};
real.forEach(([u, p]) => (dupTitles[p.title] ??= []).push(u));
const dups = Object.entries(dupTitles).filter(([, v]) => v.length > 1);
if (dups.length) problems.push(['Duplicate titles', dups.map(([t, v]) => `"${t.slice(0, 40)}" on ${v.join(', ')}`)]);

const dupDesc = {};
real.forEach(([u, p]) => (dupDesc[p.desc] ??= []).push(u));
const dd = Object.entries(dupDesc).filter(([, v]) => v.length > 1);
if (dd.length) problems.push(['Duplicate meta descriptions', dd.map(([, v]) => v.join(', '))]);

const noSchema = real.filter(([, p]) => p.schema.length < 3).map(([u, p]) => `${u} (${p.schema.length})`);
if (noSchema.length) problems.push(['Fewer than 3 schema blocks', noSchema]);

const lonely = real
  .filter(([u]) => u !== '/' && (inbound.get(u) ?? 0) < 2)
  .map(([u]) => `${u} (${inbound.get(u) ?? 0} inbound)`);
if (lonely.length) problems.push(['Fewer than 2 internal links pointing in', lonely]);

console.log(`crawled ${pages.size} files — ${real.length} real pages, ${pages.size - real.length} redirects\n`);
console.log('depth distribution:');
const byDepth = {};
real.forEach(([u]) => (byDepth[depth.get(u) ?? 'unreachable'] ??= []).push(u));
Object.entries(byDepth).sort().forEach(([d, list]) => console.log(`  ${d} click(s): ${list.length} pages`));

console.log('\nmost-linked pages:');
[...inbound.entries()].filter(([u]) => pages.has(u)).sort((a, b) => b[1] - a[1]).slice(0, 6)
  .forEach(([u, n]) => console.log(`  ${String(n).padStart(3)} <- ${u}`));

if (!problems.length) {
  console.log('\nno issues');
} else {
  console.log('');
  for (const [title, list] of problems) {
    console.log(`${title} (${list.length}):`);
    list.slice(0, 8).forEach((x) => console.log('   ', x));
  }
}
