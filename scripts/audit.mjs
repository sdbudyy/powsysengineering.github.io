/* Static audit of the built site. Run with `npm run audit` after `npm run build`.
   Catches the classes of bug that are invisible in a browser but break crawling
   or accessibility: duplicate ids, malformed JSON-LD, missing alt text,
   multiple h1s, missing canonical/meta. */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { readdirSync, statSync } from 'node:fs';

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const p = path.join(dir, entry);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

const pages = walk('dist').sort();
const issues = new Map();
const add = (kind, detail) => {
  if (!issues.has(kind)) issues.set(kind, []);
  issues.get(kind).push(detail);
};

for (const file of pages) {
  const name = file.replaceAll('\\', '/').replace('dist', '').replace('/index.html', '/') || '/';
  const html = readFileSync(file, 'utf8');

  // Astro emits a meta-refresh stub for every configured redirect. They carry
  // no h1 or description by design and are excluded from the sitemap, so
  // auditing them just buries the real findings.
  if (html.includes('http-equiv="refresh"')) continue;

  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) add('h1 count != 1', `${name} (=${h1s})`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const seen = new Map();
  ids.forEach((id) => seen.set(id, (seen.get(id) ?? 0) + 1));
  const dupes = [...seen].filter(([, c]) => c > 1).map(([id]) => id);
  if (dupes.length) add('duplicate ids', `${name}: ${dupes.slice(0, 6).join(', ')}`);

  [...html.matchAll(/type="application\/ld\+json">([\s\S]*?)<\/script>/g)].forEach((m, i) => {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      add('invalid JSON-LD', `${name} block ${i}: ${e.message}`);
    }
  });

  const noAlt = (html.match(/<img[^>]*>/g) ?? []).filter((t) => !t.includes('alt='));
  if (noAlt.length) add('img missing alt', `${name} (${noAlt.length})`);

  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  if (!title) add('missing title', name);
  else if (title.length > 70) add('title > 70 chars', `${name} (${title.length})`);

  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) add('missing description', name);
  else if (desc.length < 50 || desc.length > 320) add('description length', `${name} (${desc.length})`);

  if (!html.includes('rel="canonical"')) add('missing canonical', name);
}

console.log(`audited ${pages.length} pages\n`);
if (issues.size === 0) console.log('no issues');
for (const [kind, list] of issues) {
  console.log(`${kind}  (${list.length})`);
  list.slice(0, 8).forEach((x) => console.log('   ', x));
}
