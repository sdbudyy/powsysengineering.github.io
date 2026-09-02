/* ---------------------------------------------------------------------------
   KNOWLEDGE CENTRE

   Article metadata lives here; the article bodies live in
   `knowledge-articles.ts` so this file stays readable as the list grows.

   ⚠️  The articles are written and technically grounded, but they are
   published under PowSys's name and make assertions a client may act on.
   A P.Eng should review each one before launch and confirm it matches the
   firm's own practice and the current edition of every standard cited.
   See the note at the top of `knowledge-articles.ts`.

   Bylines are team names rather than individuals. Change `author` to the real
   writer once someone has reviewed and taken ownership of a piece.

   Every entry needs, at minimum:
     • `type`  — the label point shown on the card (Article / Opinion / …)
     • `readMinutes` — derived from the body, so it is never wrong
--------------------------------------------------------------------------- */

import { articleBodies } from './knowledge-articles';

export type EntryType = 'Article' | 'Opinion' | 'Guide' | 'Field Note' | 'Blog';

/** Label styling per entry type. Kept here so cards and detail pages agree. */
export const typeStyles: Record<EntryType, string> = {
  Article: 'bg-brand-50 text-brand border-brand-100',
  Opinion: 'bg-lime-50 text-lime-deep border-lime-100',
  Guide: 'bg-brand-50 text-brand border-brand-100',
  'Field Note': 'bg-paper-tint text-ink-soft border-line',
  Blog: 'bg-lime-50 text-lime-deep border-lime-100',
};

export const categories = [
  'Compliance',
  'Reliability',
  'Renewables',
  'Oil & Gas',
  'Project Delivery',
  'Data Centres',
] as const;

export interface Block {
  h?: string;
  p?: string;
  ul?: string[];
  quote?: string;
}

export interface Entry {
  slug: string;
  type: EntryType;
  category: (typeof categories)[number];
  title: string;
  /** Shorter title for the <title> tag. Full titles run past the ~60
      characters search engines display; the on-page h1 keeps the long form. */
  seoTitle?: string;
  excerpt: string;
  readMinutes: number;
  date: string;
  author: string;
  featured?: boolean;
  status: 'published' | 'draft';
  body: Block[];
}

type EntryMeta = Omit<Entry, 'body' | 'readMinutes'>;

const meta: EntryMeta[] = [
  {
    slug: 'arc-flash-studies-csa-z462',
    type: 'Guide',
    category: 'Compliance',
    title: 'Arc flash studies and CSA Z462: what Alberta operators actually need',
    seoTitle: 'Arc Flash Studies & CSA Z462 Explained',
    excerpt:
      'What incident energy analysis actually involves, what changed in IEEE 1584-2018, when a study must be reissued, and the three data errors behind most of the studies we are asked to correct.',
    date: '2026-08-18',
    author: 'PowSys Power Systems Group',
    featured: true,
    status: 'published',
  },
  {
    slug: 'partial-discharge-testing-explained',
    type: 'Article',
    category: 'Reliability',
    title: 'Partial discharge testing: catching insulation failure years early',
    seoTitle: 'Partial Discharge Testing Explained',
    excerpt:
      'How PD erodes insulation from the inside, what online and offline testing each reveal, why inception and extinction voltage matter, and why a single reading in picocoulombs tells you almost nothing.',
    date: '2026-08-04',
    author: 'PowSys Reliability Group',
    status: 'published',
  },
  {
    slug: 'cbm-is-not-predictive-maintenance',
    type: 'Opinion',
    category: 'Reliability',
    title: 'Condition-based maintenance is not predictive maintenance',
    seoTitle: 'CBM vs Predictive Maintenance',
    excerpt:
      'Four maintenance strategies get used interchangeably and they are not the same thing. Why the P-F interval decides whether any monitoring programme works, and where a fixed schedule still wins.',
    date: '2026-07-21',
    author: 'PowSys Engineering',
    status: 'published',
  },
  {
    slug: 'hazardous-area-verification-dossier',
    type: 'Guide',
    category: 'Oil & Gas',
    title: 'Building a hazardous area verification dossier that holds up',
    seoTitle: 'Hazardous Area Verification Dossiers',
    excerpt:
      'Classification under the Canadian Electrical Code, matching equipment to zone, gas group and temperature class, the inspection grades in IEC 60079-17, and the gap that appears in almost every audit.',
    date: '2026-07-07',
    author: 'PowSys Engineering',
    status: 'published',
  },
  {
    slug: 'solar-interconnection-lessons',
    type: 'Field Note',
    category: 'Renewables',
    title: 'Five things that delay a solar interconnection',
    seoTitle: 'Why Solar Interconnections Get Delayed',
    excerpt:
      'Observations from PV projects where the array was ready long before the connection was. What IEEE 1547-2018 changed, why anti-islanding belongs in design rather than commissioning, and why none of the delays were about panels.',
    date: '2026-06-16',
    author: 'PowSys Engineering',
    status: 'published',
  },
  {
    slug: 'data-centre-power-density',
    type: 'Article',
    category: 'Data Centres',
    title: 'Rising rack density is a power system problem before it is a cooling one',
    seoTitle: 'Rack Density & Power System Limits',
    excerpt:
      'Fault current ceilings, compressed coordination margins, harmonic distortion at the point of common coupling and invalidated arc flash labels — the electrical limits reached before the thermal ones.',
    date: '2026-05-28',
    author: 'PowSys Power Systems Group',
    status: 'published',
  },
  {
    slug: 'why-etap-models-drift',
    type: 'Blog',
    category: 'Project Delivery',
    title: 'Why power system models drift, and what it costs',
    seoTitle: 'Why Power System Models Drift',
    excerpt:
      'A model is only as good as the last change captured in it. How the gap opens quietly, what it costs when a study is run against it, and why verification beats reconstruction.',
    date: '2026-05-12',
    author: 'PowSys Engineering',
    status: 'published',
  },
  {
    slug: 'thermography-what-it-cannot-see',
    type: 'Field Note',
    category: 'Reliability',
    title: 'What infrared thermography cannot see',
    seoTitle: 'The Limits of Infrared Thermography',
    excerpt:
      'Emissivity, reflected apparent temperature, load dependency and spot size — the four measurement errors behind most misread surveys, and the defects a camera will never find.',
    date: '2026-04-23',
    author: 'PowSys Reliability Group',
    status: 'published',
  },
  {
    slug: 'one-person-team-model',
    type: 'Opinion',
    category: 'Project Delivery',
    title: 'The case for embedding one engineer instead of contracting a package',
    seoTitle: 'Embedded Engineer vs Packaged Scope',
    excerpt:
      'Not every project needs a delivery team. Some need one experienced person inside the client organisation with the authority to unblock things — and some emphatically do not.',
    date: '2026-04-02',
    author: 'PowSys Engineering',
    status: 'published',
  },
];

/* ---------------------------------------------------------------------------
   Reading time is derived from the body rather than typed by hand, so it can
   never drift out of step with the article after an edit. 200 words per
   minute is the usual convention for technical prose.
--------------------------------------------------------------------------- */

const countWords = (body: Block[]): number =>
  body.reduce((n, b) => {
    const text = [b.h, b.p, b.quote, ...(b.ul ?? [])].filter(Boolean).join(' ');
    return n + (text.match(/\S+/g)?.length ?? 0);
  }, 0);

export const entries: Entry[] = meta.map((m) => {
  const body = articleBodies[m.slug];
  if (!body) throw new Error(`No article body found for "${m.slug}" in knowledge-articles.ts`);
  return { ...m, body, readMinutes: Math.max(1, Math.round(countWords(body) / 200)) };
});

/* --------------------------------------------------------------------------- */

/** Newest first. Used by the listing page and the homepage teaser. */
export const sortedEntries = [...entries]
  .filter((e) => e.status === 'published')
  .sort((a, b) => b.date.localeCompare(a.date));

export const featuredEntry = sortedEntries.find((e) => e.featured) ?? sortedEntries[0];

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
