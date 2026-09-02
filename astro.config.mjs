// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/* `site` drives canonical URLs, the sitemap and absolute social-share URLs.
   `base` is the path the site is served from.

   Both are overridable by environment variable so one codebase covers two
   deployments: the real domain at a root path, and the GitHub Pages demo,
   which serves a project repository from /<repo-name>/. The demo build sets
   PUBLIC_IS_DEMO, which adds a noindex tag so a duplicate copy of the site
   never competes with the real one in search results. */
const SITE = process.env.PUBLIC_SITE_URL || 'https://powsysengineering.com';

/* Normalised so the value can be passed as "repo", "/repo" or "/repo/" and
   still resolve. Git Bash on Windows rewrites a leading slash into a full
   Windows path, so accepting the bare name matters in practice. */
const rawBase = (process.env.PUBLIC_BASE_PATH || '').replace(/^\/+|\/+$/g, '');
const BASE = rawBase ? `/${rawBase}/` : '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',

  // Redirect map. Every URL in the OLD powsysengineering.com sitemap points at
  // its closest equivalent here, so existing search rankings and any inbound
  // links survive the switch instead of landing on a 404.
  redirects: {
    '/insights': '/knowledge-centre',

    // Old site structure
    '/about/who-we-are': '/about',
    '/about/industry-focus': '/industries',
    '/about/portfolio': '/projects',
    '/about/careers': '/careers',
    '/about/testimonials': '/about',
    '/services/engineering-design': '/services#service-engineering-design',
    '/services/compliance-verification': '/services#service-compliance-verification',
    '/services/project-management': '/services#service-project-management',
    '/services/cbm': '/services#service-condition-based-maintenance',
  },

  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Astro re-encodes every <Image /> to AVIF/WebP at build time.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  build: {
    // Inline small stylesheets so the homepage needs no render-blocking CSS request.
    inlineStylesheets: 'auto',
  },
});
