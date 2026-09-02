# PowSys Engineering — website

Rebuild of powsysengineering.com. Astro + Tailwind CSS, statically generated,
zero client-side framework.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve the built dist/ locally
```

## Where things live

Content is deliberately separated from markup so copy can be edited without
touching layout.

| File | What it holds |
|---|---|
| `src/data/site.ts` | Company name, address, phone, email, social links. **Single source of truth** — never retype these into a page. |
| `src/data/content.ts` | Services, industries, projects, credentials, tools, FAQs. |
| `src/data/knowledge.ts` | Every Knowledge Centre entry, plus the type labels and category list. |
| `src/data/industry-pages.ts` | Per-industry intro, sector context, grouped capabilities and FAQs. |
| `src/data/industry-images.ts` | Hero photo + alt per industry, shared by the hub and detail pages. |
| `src/data/careers.ts` | Open positions, requirement lists, culture pillars. |
| `src/data/team.ts` | Team members, bios, office hours, values. |
| `src/data/forms.ts` | Form endpoint URLs — paste one in to activate every form. |
| `src/data/na-map.ts` | **Generated.** Country outline paths + the projection used to plot map markers. |
| `src/data/relations.ts` | Cross-links: which industries, articles and projects belong to each service. Ids are validated at build time. |
| `src/styles/global.css` | All design tokens (colour, type, radius) in one `@theme` block, plus the page wash, reveal, expando and marquee styles. |
| `src/layouts/BaseLayout.astro` | `<head>`, SEO meta, JSON-LD structured data, scroll-reveal script. |
| `src/components/` | Header, Footer, Hero, Logo, EntryCard, KnowledgeMini, ProjectMini, IndustryMosaic. |
| `src/pages/index.astro` | The homepage. |
| `src/pages/knowledge-centre/` | Listing page + `[slug].astro`, which generates one page per entry. |
| `src/pages/services/` | The services hub. |
| `src/pages/industries/` | Industries hub + `[slug].astro`, one page per industry. |
| `src/pages/projects/` | Case studies, engagement types and coverage. |
| `src/pages/about/` | About, `our-story.astro`, and `[slug].astro` per team member. |
| `src/pages/careers/` | Culture, open positions, application form. |
| `src/pages/contact/` | Contact channels, enquiry form, map. |
| `public/robots.txt` | Crawl rules; explicitly allows AI answer-engine bots. |
| `public/llms.txt` | Plain-text site summary for LLMs. |

To change a colour, edit the token in `global.css` — not the individual
components. To change copy, edit `src/data/content.ts`.

## Palette

Taken straight from the logo:

| Token | Hex | Use |
|---|---|---|
| `brand` | `#1A4194` | Headings, links, primary buttons, the CTA panel |
| `lime` | `#B0D038` | Graphic accents only — rules, bullets, glows, the CTA button |
| `lime-600` / `lime-deep` | `#89A521` / `#63781A` | The only limes with enough contrast for text on white |

Lime is bright and fails contrast as body text on white, so never use bare
`lime` for type — reach for `lime-600` or `lime-deep`.

Sections have no background of their own. A single fixed `.page-wash` layer
paints one continuous gradient behind the whole document, which is what makes
the sections blend rather than stack.

## Motion

- `.reveal` — fade-and-rise on scroll. Add `style="--i:N"` to stagger a group.
  Visible by default; JS only arms the animation once its observer is live.
- `.expando` + `data-expands="<panel-id>"` on a button — the expand/collapse
  pattern used by services, industries and projects. Height animates via CSS
  grid, so panel content can change freely with no hard-coded max-height.
- `data-count-to` — ticks a number up when it scrolls into view. Omit it for
  figures that shouldn't animate (years, for instance).
- `.marquee` — the continuous tooling strip. Pauses on hover.

All of it is disabled under `prefers-reduced-motion`.

## Images

Source photos live in `src/assets/images/` as reasonably sized JPEGs. Astro
converts them to AVIF/WebP at multiple widths at build time, so **never
hand-optimise or pre-convert** — just drop in the largest version you have.

Original full-size downloads from the old site are archived in `.src-images/`
(not published). `npm run optimize:images` regenerates the working set from them.

Where real project photography becomes available, replace the corresponding
file in `src/assets/images/` and update the `alt` text in `src/data/content.ts`.

## SEO / GEO notes

- One `<h1>` per page. Headings are semantic, not decorative.
- Structured data is emitted per page from `BaseLayout.astro`
  (`Organization` + `LocalBusiness`, `WebSite`) plus page-specific blocks
  (`FAQPage`, `Service` `ItemList` on the homepage).
- FAQ answers in `content.ts` are written to stand alone when quoted out of
  context — this is what gets the site cited by AI answer engines. Keep that
  style for any new ones.
- `site` in `astro.config.mjs` drives canonical URLs and the sitemap. It must
  match the live domain exactly, including www/non-www.

## Knowledge Centre

Lives at `/knowledge-centre`, with a page per entry generated from
`src/data/knowledge.ts`. Every entry carries a **type label** (Article,
Opinion, Guide, Field Note, Blog), a **category**, and a **read length** — all
three show on the card and on the entry page.

To add an entry, append to `entries` in `knowledge.ts`. Bodies are built from
simple blocks: `{ p }` paragraph, `{ h }` heading, `{ ul: [...] }` list,
`{ quote }` pull quote. Set `featured: true` to promote one to the hero slot
(only the first one found is used).

⚠️ **Every entry is currently filler.** Topics are real; bodies are placeholder
drafts. Bylines are team names — no named individual is credited with writing
something they did not write — and dates are plausible placeholders. Each entry
page shows a visible "Placeholder content" notice; delete that block from
`[slug].astro` once real writing replaces the drafts.

The older `insights` array in `content.ts` still feeds the homepage teaser
section. `/insights` redirects to `/knowledge-centre`.

## Before the About page goes live

Three things on `/about` are placeholders and need real input:

1. **Team photos.** No headshot files were supplied, so everyone renders an
   initials avatar. Drop square images in `src/assets/team/`, import them at the
   top of `team.ts`, and set each member's `photo`. Nothing else changes.
2. **Bios.** Names and job titles came from LinkedIn; everything in `bio` and
   `focus` is drafted and unconfirmed. **Have each person review their own
   entry** — publishing invented claims about named individuals is a real risk.
   The only verified text is the client quote on Prashant Dave, reproduced from
   the existing site's testimonials page.
3. **Job posting dates.** Every listing on the current site shows 14/09/2026,
   which is in the future — unclear whether that is a posting date, a closing
   date, or a stale CMS placeholder. `datesVerified` in `careers.ts` is false,
   so the date renders on the page but is **not** emitted as `datePosted` in
   the JobPosting schema. A future `datePosted` is invalid and Google rejects
   the listing. Confirm what the date means, then flip the flag.
4. **Opening hours.** The current site publishes none, only "by appointment
   only". The hours in `officeHours` are an assumption. They render on the page
   but are deliberately **not** emitted as structured data — set
   `hoursVerified = true` in `team.ts` once confirmed and the schema turns on.

## Forms

Every form (booking, brochure request, subscription) runs through
`SiteForm.astro` and reads its endpoint from `src/data/forms.ts`. Paste a
Formspree/Web3Forms/Cloudflare endpoint in there and they all start posting.

Until then they fall back to composing a pre-filled email — usable, but it
loses a meaningful share of enquiries, so wire up an endpoint before launch.

## The Google map

`MapEmbed.astro` is a click-to-load facade. A Maps iframe pulls roughly a
megabyte of third-party JavaScript and sets cookies on load, which would undo
most of the performance work and track visitors who never look at the map. The
facade shows the address and a static street-grid backdrop; the iframe is only
inserted when someone presses the button. There is always a plain link out.

## The coverage map

`/projects` shows an inline SVG map of North America with dots for the head
office and published project locations. There is no mapping library and no tile
server — the outlines are baked into `src/data/na-map.ts` by:

```bash
node scripts/build-map.mjs
```

That script fetches Natural Earth 110m country outlines (public domain, CC0),
projects them with Albers Equal Area Conic (standard parallels 29.5°N / 45.5°N,
origin 23°N 96°W), crops to lon −134..−60 / lat 24..61, and writes both the
path data and a matching `project(lon, lat)` helper. Because markers use the
same projection constants, dots land in geographically correct positions.

Re-run it only if you need a different crop or extra countries. Marker
coordinates live in `mapMarkers` in `content.ts`; `labelDx`/`labelDy`/
`labelAnchor` nudge labels apart where locations sit close together.

⚠️ Albers y increases northward while SVG y increases downward, so the script
flips the vertical axis. Removing that flip renders the map upside-down.

## Performance notes

Things that are deliberate and easy to undo by accident:

- **Fonts are preloaded** in `BaseLayout.astro` by importing the woff2 URLs
  directly. Without those two `<link rel="preload">` tags the browser cannot
  discover a font until it has fetched and parsed the CSS — a wasted round trip
  on the critical path. Note `crossorigin` is required even same-origin.
- **The marquee pauses off-screen.** A CSS animation keeps compositing forever
  otherwise, costing CPU and battery on a strip nobody is looking at.
- **Scroll reveal has a failsafe.** Arming hides content until the observer
  reveals it, so if `IntersectionObserver` exists but never fires — which
  happens in some embedded and headless contexts — the page would stay blank.
  A 2-second timer disarms everything if no callback has arrived.
- **Zero external JavaScript files.** All scripts are small enough that Astro
  inlines them. If a `.js` file ever appears in `dist/_astro/`, something has
  grown a dependency worth questioning.
- **`og-image.jpg`** is generated by `node scripts/build-og-image.mjs`. The
  markup declares `summary_large_image`, so removing the image leaves a broken
  social card rather than a plain one.

## Redirects

`astro.config.mjs` maps every URL from the OLD site's sitemap to its closest
equivalent here, and `public/_redirects` repeats them as real 301s for
Netlify/Cloudflare Pages. Redirect stubs are excluded from the sitemap and
skipped by the audit.

## Auditing

```bash
npm run build && npm run audit
```

`scripts/audit.mjs` walks every built page and reports duplicate element ids,
malformed JSON-LD, images without alt text, pages with zero or multiple `<h1>`,
over-long titles or descriptions, and missing canonicals. These are the bugs
that never show up in a browser but break crawling.

The only expected finding is `/insights/` — Astro's redirect stub, which has no
h1 or description by design. It is excluded from the sitemap, and
`public/_redirects` turns it into a real 301 on Netlify/Cloudflare Pages.

There is also a link checker worth re-running by hand after adding pages: any
`href` pointing at a path with no corresponding file in `dist/`.

## Cross-linking

`src/data/relations.ts` is the one place that says what relates to what. Adding
an article or project only requires wiring it up there — page templates read
from it. The `get*` helpers throw on an unknown id, so a mistyped cross-link
**fails the build** rather than shipping a dead link.

## Still to build

**Every page in the navigation now exists, and the site has zero broken
internal links.**

Done: homepage, Knowledge Centre (listing + 9 entries), services hub,
industries hub + 4 industry pages, projects, about + our story + 3 team
profiles, careers, contact.

Remaining before launch: real team photos and reviewed bios, confirmed opening
hours and job dates, a form endpoint, the brochure PDF, real Knowledge Centre
articles, and a 301 redirect map from the old site's URLs.

### Projects

Only three case studies are public, matching the original site's stated
position. Rather than padding the page, it says why the list is short and shows
the *types* of engagement instead. If more case studies are cleared for
publication, add them to `projects` in `content.ts` and wire their services,
industries and articles up in `relations.ts`.

### Note on previewing

`astro preview` caches the build it started with. After a rebuild, restart it
(or start it on a fresh port) or you will be looking at stale output — this
cost real debugging time once already.

Also outstanding: contact form backend, 301 redirect map from the old URLs,
and writing the Insights articles.

The supplied logo (`src/assets/powsys-logo.png`) is a solid blue/lime
rectangle with no transparency, so `Logo.astro` renders it as a rounded badge.
A transparent PNG or SVG would let it sit directly on the page instead.
