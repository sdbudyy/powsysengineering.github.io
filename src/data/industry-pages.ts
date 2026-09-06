/* ---------------------------------------------------------------------------
   INDUSTRY PAGE CONTENT

   The long "detail" string in content.ts is fine for a teaser, but a full page
   needs the same scope broken into groups that can be laid out visually. That
   regrouping lives here, alongside the per-industry intro, context and FAQs.

   Every capability listed below comes from the existing powsysengineering.com
   industry pages — regrouped, not invented.
--------------------------------------------------------------------------- */

export interface CapabilityGroup {
  title: string;
  items: string[];
}

export interface IndustryPage {
  /** Short line under the page title. */
  tagline: string;
  /** Overrides the auto-built `<title>`, which is just "<name> Engineering
      Services". Set this where the sector is searched for by another name.
      Keep it under about 60 characters. */
  seoTitle?: string;
  /** Overrides the meta description, which otherwise takes the first 300
      characters of `intro` and can cut mid-sentence. Aim for ~155 characters. */
  seoDescription?: string;
  /** Opening statement. Written to stand alone if quoted by an answer engine. */
  intro: string;
  /** What makes this sector hard — the "why us" context. */
  challenge: string;
  capabilityGroups: CapabilityGroup[];
  faqs: { q: string; a: string }[];
}

export const industryPages: Record<string, IndustryPage> = {
  'oil-and-gas': {
    tagline: 'Hazardous areas, ageing assets and non-negotiable compliance.',
    intro:
      'PowSys Engineering provides electrical and instrumentation engineering services to oil and gas operators across Canada and the United States, covering assessment, design, installation, commissioning, maintenance, repair and inspection — from a single field device through to a complete electrotechnical system.',
    challenge:
      'Oil and gas plants combine classified hazardous areas, high-consequence failure modes and equipment that frequently outlives its documentation. The engineering is rarely the hard part; proving the installation is compliant, and keeping that proof current through years of modification, usually is.',
    capabilityGroups: [
      {
        title: 'Design & engineering',
        items: [
          'Design and engineering',
          'Medium and high voltage design',
          'Power station design',
          'Facility and station engineering',
          'Instrumentation and control panel design',
          'Electrical power equipment',
        ],
      },
      {
        title: 'Automation & control',
        items: [
          'Protection and control',
          'Substation automation',
          'Process automation and engineering',
          'Process commissioning',
        ],
      },
      {
        title: 'Hazardous areas (EEHA)',
        items: [
          'Hazardous area classification',
          'Hazardous area equipment selection',
          'Inspections and rectification',
          'Verification dossiers',
        ],
      },
      {
        title: 'Maintenance & assurance',
        items: [
          'Electrical and instrumentation fault finding, calibration and repairs',
          'Preventative and scheduled maintenance',
          'Monitoring and testing',
          'Engineering studies and diagnostics',
          'Field service maintenance and commissioning',
          'New installations and project management',
          'Compliance management and process safety advisory',
          'Training',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is hazardous area (EEHA) classification?',
        a: 'Hazardous area classification divides a facility into zones according to the likelihood that an explosive atmosphere is present, which in turn dictates what electrical equipment may be installed there. It governs equipment selection, installation method, inspection grade and inspection interval, and it must be documented well enough to be defended during an audit.',
      },
      {
        q: 'Does PowSys work on live oil and gas facilities?',
        a: 'Yes. PowSys Engineering delivers assessment, maintenance, repair and inspection work on operating facilities as well as design and commissioning on new installations, and supports shutdowns and turnarounds where an outage is required.',
      },
      {
        q: 'What electrical studies do oil and gas facilities typically need?',
        a: 'The common set is arc flash analysis, protective device coordination, fault analysis, harmonic analysis, large motor starting studies and ground grid design. Facilities with on-site generation usually add grid islanding, load shedding and transient stability studies.',
      },
    ],
  },

  'renewable-energy': {
    tagline: 'Generation, interconnection and the full asset life-cycle.',
    intro:
      'PowSys Engineering supports renewable energy developers and operators with full life-cycle management of power systems integrated with renewable generation — spanning solar photovoltaic, wind, hydro and landfill gas across every stage of the asset life-cycle.',
    challenge:
      'On most renewable projects the generation equipment is not the constraint. Interconnection is. Utility study queues, protection settings, grounding design and harmonic limits are interface problems between parties, and they move schedules far more often than the technology does.',
    capabilityGroups: [
      {
        title: 'Generation',
        items: [
          'Solar, wind and organic power generation',
          'Hydro power generation',
          'Landfill gas power stations',
          'Solar and wind-powered pumping systems',
          'Eco-friendly renewable energy power',
        ],
      },
      {
        title: 'Integration & grid',
        items: [
          'Interconnection with conventional plants',
          'Hybrid and integrated landscapes',
          'Flexible renewable energy engineering',
          'Clean Energy Council accredited solutions',
        ],
      },
      {
        title: 'Delivery & life-cycle',
        items: [
          'Startup, commissioning, testing and maintenance',
          'Full life-cycle power system management',
          'Scientific cost management across the asset life-cycle',
        ],
      },
      {
        title: 'Innovation',
        items: [
          'Prototyping and proof of concept',
          'Research and development outsourcing',
          'Reduced time-to-market support from product idea onward',
        ],
      },
    ],
    faqs: [
      {
        q: 'Does PowSys design solar PV projects?',
        a: 'Yes. PowSys Engineering has designed utility-scale solar photovoltaic projects including a 1.115 MWh installation across 2.3 acres, covering array layout, land utilisation, interconnection and balance-of-system design.',
      },
      {
        q: 'What causes delays on renewable interconnection projects?',
        a: 'The most common causes are utility study queues started too late, protection settings agreed verbally but not in writing, grounding design revisited after civil works are complete, harmonic and flicker requirements discovered after inverter selection is locked, and as-built documentation lagging far enough behind that energisation becomes a survey exercise.',
      },
      {
        q: 'Can PowSys support hybrid renewable and conventional generation?',
        a: 'Yes. PowSys Engineering works on hybrid and integrated landscapes where renewable generation interconnects with conventional plant, including the grid islanding, load shedding and transient stability studies those configurations require.',
      },
    ],
  },

  mining: {
    tagline: 'Safety, rapid response and first-time-right solutions.',
    intro:
      'PowSys Engineering delivers and manages electrical and instrumentation engineering for mining operations — covering operating and new systems, and including compliance management, reliability engineering and repair across federal, provincial, industry and site requirements.',
    challenge:
      'Mining sites punish downtime harder than most sectors and give less warning before it happens. Work windows are short, shutdowns are tightly sequenced, and a fix that is not right the first time can cost more in lost production than the repair itself ever did.',
    capabilityGroups: [
      {
        title: 'Asset restoration',
        items: [
          'Refurbishment',
          'Rectification',
          'Upgrade or restoration of electrical and instrumentation equipment',
        ],
      },
      {
        title: 'Maintenance',
        items: [
          'Preventative, on-condition and scheduled maintenance',
          'Instrument fault finding, calibration and repairs',
          'Maintenance planning',
          'Customised strategies to keep asset maintenance on track',
        ],
      },
      {
        title: 'Hazardous areas',
        items: [
          'Hazardous area installation',
          'Hazardous area maintenance',
          'Hazardous area inspections (EEHA)',
        ],
      },
      {
        title: 'Projects & studies',
        items: [
          'Shutdowns and turnarounds',
          'Plant commissioning and startup',
          'New installations and project management',
          'Site audits and feasibility studies',
          'Economic and reliability studies',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can PowSys support a mining shutdown or turnaround?',
        a: 'Yes. PowSys Engineering supports shutdowns and turnarounds including the planning, electrical and instrumentation work, plant commissioning and startup that surround them, and can work to the compressed schedules those windows impose.',
      },
      {
        q: 'How does condition-based maintenance apply in mining?',
        a: 'Condition-based maintenance uses measured asset condition — vibration, temperature, electrical signature — rather than a fixed schedule to decide when to intervene. In mining, where unplanned downtime is expensive and access windows are short, it lets maintenance be planned into an existing outage instead of forcing an unplanned one.',
      },
      {
        q: 'Does PowSys carry out reliability studies for mining operations?',
        a: 'Yes. PowSys Engineering performs economic and reliability studies alongside site audits and feasibility studies, which are used to reduce unplanned downtime and to justify where monitoring and maintenance spend should be directed.',
      },
    ],
  },

  utilities: {
    tagline: 'Generation, transmission, distribution and the studies behind them.',
    intro:
      'PowSys Engineering works across utility and power generation assets — natural gas, solar photovoltaic and diesel — from design through to commissioning, with the power system studies that support protection, stability and capacity decisions.',
    challenge:
      'Utility networks change incrementally and their models do not always change with them. A study run against a stale model produces a confident answer to a question about a network that no longer exists, and the discrepancy usually surfaces at commissioning rather than at design.',
    capabilityGroups: [
      {
        title: 'Generation & distribution design',
        items: [
          'Power system design',
          'Generator system design',
          'Power generation design',
          'Power distribution design, modelling and development',
          'Cogeneration system design',
        ],
      },
      {
        title: 'Protection & automation',
        items: [
          'Substation automation',
          'Protection and control',
          'Automation and control systems design',
        ],
      },
      {
        title: 'Network studies',
        items: [
          'Transmission line switching studies',
          'TRV and RRRV studies',
          'Grid islanding and load shedding studies',
          'Power system transient stability studies',
          'Ground grid system design and studies',
        ],
      },
      {
        title: 'Asset life-cycle',
        items: [
          'Full life-cycle management across natural gas, solar PV and diesel assets',
          'Asset reliability engineering',
          'Condition monitoring and model maintenance',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is a transient stability study?',
        a: 'A transient stability study simulates how generators and the wider network respond in the moments following a large disturbance such as a fault, a sudden load change or the loss of a generating unit. It determines whether the system returns to synchronous operation or loses stability, and it informs protection settings, load shedding schemes and islanding strategies.',
      },
      {
        q: 'Why do power system models need maintaining?',
        a: 'Models drift because changes accumulate faster than they are recorded — a relay setting altered during a trip investigation, a cable rerouted during a shutdown, a motor replaced with a higher-rated unit. Each change is documented somewhere, but rarely in the model, and a study run on a stale model produces results that look valid and are not.',
      },
      {
        q: 'Does PowSys work on substation automation?',
        a: 'Yes. PowSys Engineering delivers substation automation alongside protection and control, automation and control systems design, and the transmission line switching, TRV/RRRV and stability studies that inform how those systems are configured.',
      },
    ],
  },
  'commercial-buildings': {
    tagline: 'Systems from different eras, expected to work as one.',
    seoTitle: 'Commercial Building Engineering & BCMI | PowSys',
    seoDescription:
      'Engineering for commercial, institutional and light-industrial buildings in Calgary — BCMI, life safety, RCDD-led telecommunications and electrical distribution.',
    intro:
      'PowSys Engineering serves commercial, institutional and light-industrial building operators across Canada and the United States, covering building control, monitoring and instrumentation (BCMI), life safety systems, telecommunications infrastructure and the electrical distribution underneath all of it.',
    challenge:
      'A building is rarely designed once. It is designed, extended, re-tenanted and re-commissioned, each time by a different party working to the standard of its day. The result is a set of individually compliant systems with no single party able to say how they behave together, and no measurement in place to find out. Proving the whole works is a different exercise from proving each part does.',
    capabilityGroups: [
      {
        title: 'Building control, monitoring & instrumentation',
        items: [
          'Building control and automation system design',
          'Control narratives and sequences of operation',
          'Instrumentation selection and specification',
          'Metering, sub-metering and energy monitoring',
          'Power quality monitoring',
          'Trending, alarming and reporting requirements',
        ],
      },
      {
        title: 'Life safety',
        items: [
          'Life safety systems',
          'Life safety system interfaces and integration',
          'Fire alarm and emergency power interface coordination',
        ],
      },
      {
        title: 'Electrical distribution',
        items: [
          'Electrical system assessment, design and implementation',
          'Arc flash analysis for building distribution',
          'Protective device coordination',
          'Targeted upgrades through to fully integrated infrastructure',
        ],
      },
      {
        title: 'Telecommunications',
        items: [
          'Telecommunications infrastructure led by RCDD-certified designers',
          'Network infrastructure supporting building monitoring',
        ],
      },
      {
        title: 'Commissioning & verification',
        items: [
          'Commissioning support',
          'Functional verification against the control narrative',
          'Post-occupancy verification of installed systems',
        ],
      },
    ],
    faqs: [
      {
        q: 'What kinds of buildings does PowSys Engineering work on?',
        a: 'Commercial, institutional and light-industrial facilities — the buildings where control, monitoring, life safety and electrical distribution all have to coexist and be demonstrable to an authority having jurisdiction. The work is engineering, assessment and verification rather than installation.',
      },
      {
        q: 'Can an existing building be brought under proper monitoring without a full retrofit?',
        a: 'Usually, but the value depends entirely on where the measurement points go. A staged approach that starts with main incomers and the largest loads answers most operational questions at a fraction of the cost of full sub-metering. The mistake is to instrument everything uniformly, which is expensive and still leaves the important questions unanswered.',
      },
      {
        q: 'Who is responsible when two compliant building systems do not work together?',
        a: 'In practice, nobody, unless the interface was explicitly in someone’s scope from the outset. That is why interface schedules and a single control narrative matter more in buildings than in plants: the systems arrive from separate contracts, and the gap between them is where the failure sits. Establishing that ownership at design stage is cheaper than arbitrating it after handover.',
      },
    ],
  },
};
