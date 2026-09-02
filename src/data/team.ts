/* ---------------------------------------------------------------------------
   TEAM

   ⚠️  BIOS ARE PLACEHOLDERS. Names and job titles are taken from the LinkedIn
   profiles supplied; everything in `bio` and `focus` is drafted text that has
   NOT been confirmed by the people it describes. Publishing invented claims
   about real, named individuals is a genuine risk — have each person review
   and rewrite their own entry before this page goes live.

   The one exception is the client quote on Prashant Dave, which is reproduced
   from the testimonials page of the existing powsysengineering.com site.

   PHOTOS: no headshot files were supplied, so every member currently renders
   an initials avatar. To add a real photo:
     1. drop the file in `src/assets/team/` (square crop, 600px or larger)
     2. import it at the top of this file
     3. set it as the member's `photo`
   The avatar component handles the rest.
--------------------------------------------------------------------------- */

export interface Member {
  slug: string;
  name: string;
  role: string;
  /** Post-nominals shown after the name, e.g. 'P.Eng'. */
  credentials?: string;
  /** Square headshot. Falls back to an initials avatar when absent. */
  photo?: ImageMetadata;
  location: string;
  linkedin?: string;
  /** One-line summary used on the team grid. */
  summary: string;
  /** Body paragraphs for the member's own page. */
  bio: string[];
  focus: string[];
  /** Verbatim client testimonial, only where one genuinely exists. */
  quote?: { text: string; attribution: string };
}

export const team: Member[] = [
  {
    slug: 'prashant-dave',
    name: 'Prashant Dave',
    role: 'Director of Engineering',
    location: 'Calgary, Alberta',
    summary:
      'Leads engineering delivery, with a specialism in electrical protection systems.',
    bio: [
      'Prashant Dave is Director of Engineering at PowSys Engineering, responsible for engineering delivery across the firm’s power system, compliance and project management work.',
      'His technical specialism is electrical protection systems — the coordination studies, relay settings and protection schemes that determine how a power system behaves when something goes wrong.',
      'He works directly with clients from the earliest scoping conversations through to commissioning, and is the point of contact for the technical due diligence and verification work the firm is most often engaged for.',
    ],
    focus: [
      'Electrical protection systems',
      'Protective device coordination',
      'Power system studies',
      'Technical due diligence',
      'Client engagement and scoping',
    ],
    /* Reproduced verbatim from the testimonials page of the existing site. */
    quote: {
      text: 'Worked with Prashant on a number of projects as a client and was very impressed with his knowledge, experience, and professionalism. Possesses a wide range of high level skills in electrical engineering professional field, with specialty being electrical protection systems. A very client oriented and forward-thinking problem solver.',
      attribution: 'Mr. Josip, client',
    },
  },
  {
    slug: 'milan-bhatt',
    name: 'Milan Bhatt',
    role: 'Electrical & Computer Engineer',
    location: 'Calgary, Alberta',
    summary:
      'Electrical and computer engineering across power systems, automation and controls.',
    bio: [
      'Milan Bhatt is an Electrical and Computer Engineer at PowSys Engineering, working across the boundary between power systems and the automation and control layers that sit on top of them.',
      'His work spans design and modelling through to the instrumentation, control systems and data acquisition that make an installation observable and maintainable.',
      'That combination is increasingly what condition-based maintenance programmes depend on — the electrical engineering and the measurement systems have to be designed together rather than bolted on afterwards.',
    ],
    focus: [
      'Power system design and modelling',
      'Automation and control systems',
      'Instrumentation and data acquisition',
      'Condition monitoring systems',
    ],
  },
  {
    slug: 'shaurya-dave',
    name: 'Shaurya Dave',
    role: 'Engineering Student',
    location: 'Calgary, Alberta',
    summary: 'Supporting engineering and digital projects across the practice.',
    bio: [
      'Shaurya Dave supports PowSys Engineering as an engineering student, contributing to engineering and digital projects across the practice.',
      'The role spans hands-on engineering support alongside the firm’s technical documentation and digital presence.',
    ],
    focus: ['Engineering support', 'Technical documentation', 'Digital projects'],
  },
];

/* ---------------------------------------------------------------------------
   OFFICE

   ⚠️  OPENING HOURS ARE A PLACEHOLDER. The existing site states only "Visit by
   appointment only" and publishes no hours. The values below are a reasonable
   assumption, not confirmed fact, so they are shown on the page but are
   deliberately NOT emitted as `openingHoursSpecification` structured data —
   publishing unverified hours to Google is worse than publishing none.

   Once confirmed, set `hoursVerified` to true and the schema block turns on.
--------------------------------------------------------------------------- */

export const hoursVerified = false;

export const officeHours = [
  { day: 'Monday – Thursday', opens: '08:00', closes: '17:00' },
  { day: 'Friday', opens: '08:00', closes: '16:00' },
  { day: 'Saturday – Sunday', opens: null, closes: null },
];

export const values = [
  {
    title: 'Experience & enthusiasm',
    detail:
      'Professionals with live experience in the technologies, processes, compliances and tools the work actually depends on.',
  },
  {
    title: 'Reliability & relationship',
    detail:
      'Responsive communication and delivery against what was agreed — the reason the client list is largely repeat business.',
  },
  {
    title: 'Quality & creativity',
    detail:
      'Code-compliant electrical and technical workmanship, with solutions shaped around the business outcome rather than the deliverable list.',
  },
];
