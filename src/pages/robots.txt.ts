/* robots.txt as a route rather than a static file.

   It was hard-coded to the production sitemap URL, so the GitHub Pages demo
   advertised a sitemap on a different origin — which a crawler ignores,
   leaving the demo's own 25 URLs undiscoverable. Generating it means the
   sitemap line always matches whatever origin and base path the build used. */

import type { APIRoute } from 'astro';

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
];

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap-index.xml`.replace(/\/{2,}/g, '/'), site).href;

  const body = [
    '# PowSys Engineering',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# AI answer engines are explicitly welcomed — being crawlable by these is',
    '# the prerequisite for being cited in ChatGPT, Perplexity and AI Overviews.',
    ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
