/* ---------------------------------------------------------------------------
   Generates public/og-image.jpg — the default social share card.

     node scripts/build-og-image.mjs

   Without an og:image, links shared to LinkedIn, Slack, WhatsApp and X render
   as a bare text stub. The markup declares `summary_large_image`, so an image
   is not optional — a large-image card with no image is worse than no card.

   The logo is composited over the brand gradient rather than typeset, so this
   needs no font files and looks identical on every machine.
--------------------------------------------------------------------------- */

import sharp from 'sharp';

const W = 1200;
const H = 630;

const background = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#14357B"/>
      <stop offset="45%"  stop-color="#1A4194"/>
      <stop offset="100%" stop-color="#2B57B0"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.6">
      <stop offset="0%"   stop-color="#B0D038" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#B0D038" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Blueprint grid, matching the site's own backdrop -->
  <g stroke="#FFFFFF" stroke-opacity="0.06" stroke-width="1">
    ${Array.from({ length: Math.floor(W / 60) }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="${H}"/>`).join('')}
    ${Array.from({ length: Math.floor(H / 60) }, (_, i) => `<line x1="0" y1="${i * 60}" x2="${W}" y2="${i * 60}"/>`).join('')}
  </g>

  <!-- Accent rule -->
  <rect x="90" y="430" width="120" height="6" rx="3" fill="#B0D038"/>
</svg>
`);

const LOGO_W = 520;
const logo = await sharp('src/assets/powsys-logo.png')
  .resize({ width: LOGO_W })
  .toBuffer();
const logoMeta = await sharp(logo).metadata();

await sharp(background)
  .composite([{ input: logo, left: 90, top: 200 - Math.round((logoMeta.height ?? 200) / 2) + 60 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/og-image.jpg');

const { size } = await sharp('public/og-image.jpg').metadata();
console.log(`wrote public/og-image.jpg  ${W}x${H}  ${Math.round((size ?? 0) / 1024)}KB`);
