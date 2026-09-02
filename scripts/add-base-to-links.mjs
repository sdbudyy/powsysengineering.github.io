/* One-off codemod: wrap every internal href in withBase() so the site can be
   served from a subpath as well as a domain root. Safe to re-run — already
   wrapped links are skipped. */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const p = path.join(dir, entry);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.astro') ? [p] : [];
  });

/* Values that are already absolute, external, or handled by Astro. */
const SKIP_EXPRESSIONS = new Set([
  'canonical',
  'interLatin',
  'archivoLatin',
  'linkOut',
  'site.social.linkedin',
]);

let filesChanged = 0;
let linksWrapped = 0;

for (const file of walk('src')) {
  const original = readFileSync(file, 'utf8');
  let out = original;

  // href="/some/path"  ->  href={withBase('/some/path')}
  out = out.replace(/href="(\/[^"]*)"/g, (_m, p1) => {
    linksWrapped++;
    return `href={withBase('${p1}')}`;
  });

  // href={`/some/${expr}`}  ->  href={withBase(`/some/${expr}`)}
  out = out.replace(/href=\{(`\/[^`]*`)\}/g, (_m, p1) => {
    linksWrapped++;
    return `href={withBase(${p1})}`;
  });

  // href={someExpression}  ->  href={withBase(someExpression)}
  // Only for the handful of data-driven links; withBase ignores anything that
  // is not a root-relative path, so this is safe even for mailto:/tel: values.
  out = out.replace(/href=\{([A-Za-z_$][\w$.]*)\}/g, (m, expr) => {
    if (SKIP_EXPRESSIONS.has(expr)) return m;
    linksWrapped++;
    return `href={withBase(${expr})}`;
  });

  if (out === original) continue;

  // Add the import once, immediately after the frontmatter fence.
  if (!out.includes("from '") || !/import \{ withBase \}/.test(out)) {
    const depth = path.relative(path.dirname(file), 'src/lib').split(path.sep).length;
    const rel = path.relative(path.dirname(file), 'src/lib/url').split(path.sep).join('/');
    const spec = rel.startsWith('.') ? rel : `./${rel}`;
    const importLine = `import { withBase } from '${spec}';`;

    if (out.startsWith('---')) {
      const end = out.indexOf('\n', 3);
      out = out.slice(0, end + 1) + importLine + '\n' + out.slice(end + 1);
    } else {
      out = `---\n${importLine}\n---\n\n` + out;
    }
    void depth;
  }

  writeFileSync(file, out);
  filesChanged++;
}

console.log(`wrapped ${linksWrapped} links across ${filesChanged} files`);
