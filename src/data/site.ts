/* ---------------------------------------------------------------------------
   SITE-WIDE FACTS
   This is the single source of truth for the company's name, address, phone
   and social links (its "NAP" data). Search engines and AI answer engines both
   penalise inconsistency, so nothing here should ever be retyped into a page —
   import it instead.
--------------------------------------------------------------------------- */

export const site = {
  name: 'PowSys Engineering',
  legalName: 'PowSys Engineering Inc.',
  url: 'https://powsysengineering.com',
  founded: '2017',

  // One-sentence entity definition. AI answer engines quote this kind of
  // sentence directly, so keep it factual, specific and self-contained.
  definition:
    'PowSys Engineering Inc. is a woman-owned electrical engineering and technical services firm founded in 2017 and based in Calgary, Alberta, Canada, serving the oil and gas, mining, renewable energy, utility, commercial and data centre sectors across Canada and the United States.',

  tagline: 'Amp up your projects with PowSys Engineering.',

  email: 'info@powsysengineering.com',
  hrEmail: 'hr@powsysengineering.com',
  phone: '+1 (866) 269-0545',
  phoneRaw: '+18662690545',

  address: {
    street: '5538, 1A St SW',
    locality: 'Calgary',
    region: 'AB',
    postalCode: 'T2H 0E7',
    country: 'CA',
    note: 'Visit by appointment only',
  },

  geo: { lat: 51.0016, lng: -114.0731 },

  social: {
    linkedin: 'https://www.linkedin.com/company/powsys-engineering/',
  },

  // Regions where work is delivered — drives the LocalBusiness schema and the
  // "serving Alberta / BC / Saskatchewan" local-SEO signals.
  areaServed: [
    'Alberta',
    'British Columbia',
    'Saskatchewan',
    'Canada',
    'United States',
  ],
} as const;

/* --------------------------------------------------------------------------- */

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Projects', href: '/projects' },
  { label: 'Knowledge Centre', href: '/knowledge-centre' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];
