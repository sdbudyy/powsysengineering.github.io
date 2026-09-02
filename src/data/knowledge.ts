/* ---------------------------------------------------------------------------
   KNOWLEDGE CENTRE

   ⚠️  ALL ENTRIES BELOW ARE FILLER. The topics are real and drawn from PowSys's
   actual expertise, but the bodies are placeholder drafts and the bylines are
   team names rather than named individuals — no real person is attributed to
   writing something they did not write. Dates are plausible placeholders.

   To publish a real piece: replace `body`, set a real `date`, set `author` to
   the actual writer, and flip `status` to 'published'.

   Every entry needs, at minimum:
     • `type`  — the label point shown on the card (Article / Opinion / …)
     • `readMinutes` — the read-length indicator
--------------------------------------------------------------------------- */

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

export const entries: Entry[] = [
  {
    slug: 'arc-flash-studies-csa-z462',
    type: 'Guide',
    category: 'Compliance',
    title: 'Arc flash studies and CSA Z462: what Alberta operators actually need',
    seoTitle: 'Arc Flash Studies & CSA Z462 Explained',
    excerpt:
      'What an incident energy calculation covers, when a study must be refreshed after system changes, and how labelling and PPE selection follow from the results.',
    readMinutes: 8,
    date: '2026-08-18',
    author: 'PowSys Power Systems Group',
    featured: true,
    status: 'published',
    body: [
      {
        p: 'An arc flash study calculates the incident energy released by an electrical fault at each point in a power system. That number, expressed in calories per square centimetre, determines the personal protective equipment a worker must wear and the approach boundaries that must be observed. Everything else in the process follows from getting it right.',
      },
      { h: 'What the study actually produces' },
      {
        p: 'A complete study is not a single number. It produces a validated system model, a short-circuit analysis, a protective device coordination study, and only then the incident energy calculation. Skipping the coordination step is the most common shortcut, and it is the one that most often produces labels that are confidently wrong.',
      },
      {
        ul: [
          'A verified single-line diagram reflecting as-built conditions',
          'Short-circuit fault current at every relevant bus',
          'Protective device coordination showing clearing times',
          'Incident energy and arc flash boundary per location',
          'Equipment labels meeting CSA Z462 content requirements',
        ],
      },
      { h: 'When a study must be refreshed' },
      {
        p: 'CSA Z462 expects the study to reflect the system as it exists. In practice that means a refresh whenever the electrical distribution system is modified — a new transformer, a changed utility contribution, replaced protective devices, or altered settings. Absent modifications, a review at least every five years is the accepted interval.',
      },
      {
        quote:
          'The most expensive arc flash study is the one that was done once, filed, and never revisited after the plant expanded.',
      },
      { h: 'Where studies go wrong' },
      {
        p: 'Three failure modes account for most of the problems we are asked to correct. Utility fault current data that was never confirmed with the utility. Protective device settings taken from the design drawings rather than from the devices as actually configured. And models that quietly omit downstream contributions from motors, which understates fault current where it matters most.',
      },
      {
        p: 'Each of these produces a study that passes internal review and fails the moment someone tests it against reality. Verification of the model against site conditions is not an optional refinement — it is the difference between a compliance document and a safety control.',
      },
    ],
  },

  {
    slug: 'partial-discharge-testing-explained',
    type: 'Article',
    category: 'Reliability',
    title: 'Partial discharge testing: catching insulation failure years early',
    seoTitle: 'Partial Discharge Testing Explained',
    excerpt:
      'How PD activity erodes cable and machine insulation, what online versus offline testing each reveal, and why a single reading tells you almost nothing.',
    readMinutes: 6,
    date: '2026-08-04',
    author: 'PowSys Reliability Group',
    status: 'published',
    body: [
      {
        p: 'Partial discharge is a small electrical discharge that bridges part — but not all — of the insulation between two conductors. Individually these events are trivial. Cumulatively they erode insulation from the inside, and they are the dominant long-term degradation mechanism in medium and high voltage cables, motors and generators.',
      },
      { h: 'Online versus offline' },
      {
        p: 'Online testing measures PD activity while the asset runs at normal operating voltage. It reflects real conditions, requires no outage, and is the right choice for trending. Offline testing energises the asset from an external source, which allows the voltage to be varied and inception and extinction points to be identified precisely.',
      },
      {
        ul: [
          'Online: no outage, real operating stress, best for trending over time',
          'Offline: controlled voltage, precise inception/extinction data, requires isolation',
          'Both: locate the defect, not just detect it, when paired with time-domain methods',
        ],
      },
      { h: 'Read the trend, not the number' },
      {
        p: 'A single PD magnitude in isolation is close to meaningless. Ambient noise, sensor placement, load, temperature and humidity all move the number. What matters is the direction of travel: a machine whose PD activity has tripled over four quarterly measurements is telling you something a one-off reading never could.',
      },
      {
        p: 'This is why PD testing belongs inside a condition-based maintenance programme rather than being commissioned as a standalone diagnostic after a problem appears. By the time PD is measured reactively, the useful early-warning window has usually closed.',
      },
    ],
  },

  {
    slug: 'cbm-is-not-predictive-maintenance',
    type: 'Opinion',
    category: 'Reliability',
    title: 'Condition-based maintenance is not predictive maintenance',
    seoTitle: 'CBM vs Predictive Maintenance',
    excerpt:
      'The three maintenance strategies get used interchangeably in vendor material and they are not the same thing. The distinction has real budget consequences.',
    readMinutes: 5,
    date: '2026-07-21',
    author: 'PowSys Engineering',
    status: 'published',
    body: [
      {
        p: 'Ask three vendors what condition-based maintenance means and you will get three answers, at least one of which will be a machine learning pitch. The terms have been blurred to the point where operators are buying analytics platforms to solve problems that a quarterly thermography route would have caught.',
      },
      { h: 'The actual distinction' },
      {
        ul: [
          'Reactive: run the asset until it fails, then repair it.',
          'Preventive: service the asset on a fixed calendar or run-hour schedule, regardless of its condition.',
          'Condition-based: measure the actual condition of the asset, and intervene when the measurement says to.',
          'Predictive: model the measurements to forecast a future failure point.',
        ],
      },
      {
        p: 'Condition-based maintenance is a decision rule applied to a measurement. Predictive maintenance is a forecast built on top of one. You can run a rigorous, effective CBM programme with infrared cameras, a PD test set and a disciplined route — no model required.',
      },
      { h: 'Where fixed schedules still win' },
      {
        p: 'This is the part that gets left out. CBM is not universally superior. Where an asset is cheap, where monitoring costs more than the component, or where a failure has no meaningful consequence, a fixed schedule is the rational choice. The value of CBM scales with the cost of unplanned downtime, and on a low-criticality asset that cost is close to zero.',
      },
      {
        quote:
          'Monitoring everything is not a maintenance strategy. It is a way of spending a maintenance budget without deciding anything.',
      },
      {
        p: 'The useful question is not which strategy is best, but which assets justify which strategy. That is a criticality analysis, and it should precede any purchase of monitoring hardware.',
      },
    ],
  },

  {
    slug: 'hazardous-area-verification-dossier',
    type: 'Guide',
    category: 'Oil & Gas',
    title: 'Building a hazardous area verification dossier that holds up',
    seoTitle: 'Hazardous Area Verification Dossiers',
    excerpt:
      'Zone classification, equipment selection and the inspection record that turns a compliant installation into a defensible one.',
    readMinutes: 9,
    date: '2026-07-07',
    author: 'PowSys Engineering',
    status: 'published',
    body: [
      {
        p: 'A hazardous area installation can be entirely compliant and still fail an audit, because compliance and the evidence of compliance are two different deliverables. The verification dossier is the second one, and it is usually the weaker of the two.',
      },
      { h: 'What a dossier has to contain' },
      {
        ul: [
          'Area classification drawings with the basis of classification stated',
          'Equipment schedules listing certification, gas group and temperature class',
          'Certificates for every item of Ex equipment installed',
          'Initial detailed inspection records against the applicable standard',
          'A defined periodic inspection regime, with the grade and interval justified',
          'Records of every rectification, closed out and dated',
        ],
      },
      { h: 'The gap that shows up most often' },
      {
        p: 'Equipment gets replaced. A field device fails, an identical-looking unit goes in, and the certificate on file no longer matches the item in the field. Nothing about the installation looks different. The dossier is now wrong, and it will stay wrong until someone physically walks the plant against the schedule.',
      },
      {
        p: 'The fix is procedural rather than technical: no Ex equipment change without a corresponding dossier update, enforced through the same change control that governs the rest of the plant.',
      },
      { h: 'Grade and interval' },
      {
        p: 'Standards allow considerable latitude in setting inspection grade and interval, and that latitude has to be justified rather than assumed. An interval inherited from a previous operator, with no recorded reasoning, is one of the easier findings for an auditor to write up.',
      },
    ],
  },

  {
    slug: 'solar-interconnection-lessons',
    type: 'Field Note',
    category: 'Renewables',
    title: 'Five things that delay a solar interconnection',
    seoTitle: 'Why Solar Interconnections Get Delayed',
    excerpt:
      'Observations from PV projects where the array was ready long before the connection was. Almost none of the delays were about the panels.',
    readMinutes: 4,
    date: '2026-06-16',
    author: 'PowSys Engineering',
    status: 'published',
    body: [
      {
        p: 'On most of the photovoltaic projects we have supported, the generation side was not the constraint. The interconnection was. A short list of what actually caused the schedule to move.',
      },
      {
        ul: [
          'Utility study queues treated as a formality rather than a long-lead item, and started late.',
          'Protection settings agreed in principle but not in writing, then reopened at commissioning.',
          'Grounding design revisited after the civil works were complete.',
          'Harmonic and flicker requirements discovered after inverter selection was locked.',
          'As-built documentation lagging far enough behind that the energisation walkdown became a survey.',
        ],
      },
      {
        p: 'The common thread is that each item is an interface between parties rather than a technical difficulty. None of them are hard problems. All of them are slow ones when they surface late.',
      },
      {
        p: 'The practical countermeasure is unglamorous: identify every external dependency at the front end, assign an owner and a date to each, and review them as a standing agenda item rather than as an exception report.',
      },
    ],
  },

  {
    slug: 'data-centre-power-density',
    type: 'Article',
    category: 'Data Centres',
    title: 'Rising rack density is a power system problem before it is a cooling one',
    seoTitle: 'Rack Density & Power System Limits',
    excerpt:
      'High-density deployments change fault levels, selectivity margins and harmonic profiles well before the thermal limits are reached.',
    readMinutes: 7,
    date: '2026-05-28',
    author: 'PowSys Power Systems Group',
    status: 'published',
    body: [
      {
        p: 'Discussion of high-density racks tends to move straight to cooling. Cooling is the visible constraint, but the electrical distribution system usually encounters its limits first, and less obviously.',
      },
      { h: 'What changes upstream' },
      {
        ul: [
          'Fault levels rise as transformer capacity is added, potentially exceeding switchgear ratings',
          'Coordination margins compress as devices are added in series within a fixed voltage drop budget',
          'Harmonic contribution from higher rectifier loading shifts the distortion profile',
          'Available incident energy changes, invalidating existing arc flash labelling',
        ],
      },
      {
        p: 'The last point is the one most often missed during a phased build-out. Each expansion is individually small; the cumulative effect on incident energy is not. A study performed at first fit-out will not describe the facility at third fit-out.',
      },
      { h: 'Model before you densify' },
      {
        p: 'A maintained system model — kept current rather than rebuilt for each project — makes each of these questions answerable in hours rather than weeks. Without one, every expansion begins with a data-gathering exercise that has already been done several times before.',
      },
    ],
  },

  {
    slug: 'why-etap-models-drift',
    type: 'Blog',
    category: 'Project Delivery',
    title: 'Why power system models drift, and what it costs',
    seoTitle: 'Why Power System Models Drift',
    excerpt:
      'A model is only as good as the last change captured in it. The gap between model and plant widens quietly, and always at the worst moment.',
    readMinutes: 5,
    date: '2026-05-12',
    author: 'PowSys Engineering',
    status: 'published',
    body: [
      {
        p: 'We are regularly asked to verify an existing system model before it is used for a study. In a meaningful share of those engagements the model no longer represents the plant, and nobody knew.',
      },
      { h: 'How the drift happens' },
      {
        p: 'Rarely through a single large omission. Almost always through accumulation: a relay setting changed during a trip investigation, a cable rerouted during a shutdown, a spare feeder brought into service, a motor replaced with a higher-rated unit. Every change is individually documented somewhere. None of them reach the model.',
      },
      {
        quote:
          'A study run on a stale model does not produce a wrong answer. It produces a confident answer to a question about a plant that no longer exists.',
      },
      { h: 'The cost' },
      {
        ul: [
          'Protection settings coordinated against fault levels that have changed',
          'Arc flash labels understating incident energy',
          'Capacity decisions made against the wrong headroom figure',
          'Rework when the discrepancy is found during commissioning rather than design',
        ],
      },
      {
        p: 'Model maintenance is cheap relative to any one of those. It is also easy to defer indefinitely, because the consequences of deferring it never appear on the project that deferred it.',
      },
    ],
  },

  {
    slug: 'thermography-what-it-cannot-see',
    type: 'Field Note',
    category: 'Reliability',
    title: 'What infrared thermography cannot see',
    seoTitle: 'The Limits of Infrared Thermography',
    excerpt:
      'Thermography is the most cost-effective electrical inspection technique available. Knowing its blind spots is what makes it trustworthy.',
    readMinutes: 4,
    date: '2026-04-23',
    author: 'PowSys Reliability Group',
    status: 'published',
    body: [
      {
        p: 'Infrared thermography finds loose connections, overloaded circuits, imbalanced phases and failing components quickly and without an outage. It is the highest-yield inspection technique per dollar in electrical maintenance. It is also routinely over-trusted.',
      },
      { h: 'The limits' },
      {
        ul: [
          'It measures surface temperature. Enclosed and insulated defects may not reach the surface.',
          'Load matters. A fault inspected at low load may read as normal.',
            'Emissivity varies by material and finish; uncorrected readings can be badly off.',
          'Reflected apparent temperature can create hot spots that are not there.',
          'Insulation degradation is largely invisible to it — that is what PD testing is for.',
        ],
      },
      {
        p: 'None of these are arguments against thermography. They are arguments for reporting load conditions alongside every survey, and for pairing thermal inspection with electrical diagnostics rather than substituting one for the other.',
      },
    ],
  },

  {
    slug: 'one-person-team-model',
    type: 'Opinion',
    category: 'Project Delivery',
    title: 'The case for embedding one engineer instead of contracting a package',
    seoTitle: 'Embedded Engineer vs Packaged Scope',
    excerpt:
      'Not every project needs a delivery team. Some need one experienced person inside the client organisation with the authority to unblock things.',
    readMinutes: 5,
    date: '2026-04-02',
    author: 'PowSys Engineering',
    status: 'published',
    body: [
      {
        p: 'Engineering services default to packaged scopes: a defined deliverable, a fixed fee, a handover. That structure works well when the requirement is genuinely well defined. A substantial share of stalled projects do not have that problem.',
      },
      { h: 'What stalls is rarely the engineering' },
      {
        p: 'It is a decision nobody owns, a vendor question that has been circulating for six weeks, a drawing revision waiting on an approval, or a scope disagreement that predates the current project manager. None of that is solved by another deliverable.',
      },
      {
        p: 'Embedding a single experienced engineer inside the client team addresses a different failure mode: the absence of continuous ownership. The engineer attends the meetings, holds the open items, and has enough technical authority to close questions rather than escalate them.',
      },
      { h: 'When it does not fit' },
      {
        p: 'Where the deliverable is well defined and the client organisation is functioning, a packaged scope is more efficient and usually cheaper. The embedded model earns its cost specifically where coordination — not calculation — is the bottleneck.',
      },
    ],
  },
];

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
