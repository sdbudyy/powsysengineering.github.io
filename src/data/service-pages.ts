/* ---------------------------------------------------------------------------
   SERVICE PAGE CONTENT

   The old powsysengineering.com had four real, indexed service pages. Folding
   them into anchors on a single hub collapsed four ranking URLs into one —
   Google treats /services#service-x as the same page as /services. These give
   each service line its own page, title, schema and keyword focus again.

   Everything below is regrouped from the existing site's service copy. The
   FAQs are new, and deliberately do not repeat any question used on the
   homepage, the services hub or the industry pages: duplicate FAQPage blocks
   across a site compete with each other rather than adding coverage.
--------------------------------------------------------------------------- */

export interface ServiceGroup {
  title: string;
  items: string[];
}

export interface ServicePage {
  /** Short line under the page title. */
  tagline: string;
  /** Opening statement, written to stand alone if quoted by an answer engine. */
  intro: string;
  /** Why this work is harder than it looks — the reason to hire for it. */
  challenge: string;
  groups: ServiceGroup[];
  /** What the client physically receives at the end. */
  deliverables: string[];
  faqs: { q: string; a: string }[];
}

export const servicePages: Record<string, ServicePage> = {
  'engineering-design': {
    tagline: 'Studies, front-end design and detailed engineering.',
    intro:
      'PowSys Engineering provides electrical engineering and design services covering power system studies, front-end engineering design and detailed design for industrial facilities across Canada and the United States — turning an industrial concept into drawings, specifications and calculations that can be built from.',
    challenge:
      'A design is only as good as the model behind it, and models drift away from the plant the moment it is commissioned. Most of the corrective work we are asked to do traces back to a study run against a system that no longer existed — utility fault levels never confirmed, relay settings taken from drawings rather than devices, motor contributions quietly omitted.',
    groups: [
      {
        title: 'Power system studies',
        items: [
          'Feasibility studies',
          'Ground grid system design and studies',
          'Protective device coordination study',
          'Arc-flash analysis study',
          'Fault analysis',
          'Harmonic analysis',
          'Transmission line switching studies',
          'TRV/RRRV studies',
          'Large motor starting studies',
          'Grid islanding and load shedding studies',
          'Power system transient stability study',
        ],
      },
      {
        title: 'Design & detailed engineering',
        items: [
          'Front End Engineering and Design (FEED)',
          'Detailed engineering',
          'Design basis memorandum',
          'Piping and instrumentation diagrams',
          'Cogeneration system design',
          'Automation and control systems design',
          'Instrumentation and control',
        ],
      },
      {
        title: 'Delivery support',
        items: [
          'Procurement',
          'Project controls and schedule',
          'Startup and commissioning support',
          'Asset reliability engineering',
        ],
      },
    ],
    deliverables: [
      'A validated system model you keep, not just a report',
      'Single-line diagrams and design drawings',
      'Study reports with stated assumptions and their basis',
      'Equipment specifications and datasheets',
      'Calculations traceable to the applicable standard',
      'Arc flash equipment labelling where a study calls for it',
    ],
    faqs: [
      {
        q: 'What is included in a front end engineering design (FEED) package?',
        a: 'A FEED package defines a project well enough to price and execute it. For electrical scope that typically means a design basis memorandum, preliminary single-line diagrams, load lists, equipment sizing, major equipment specifications, a cost estimate and an execution schedule. Its purpose is to remove enough uncertainty that detailed design and procurement can proceed without rework.',
      },
      {
        q: 'How long does a power system study take?',
        a: 'The modelling is rarely the constraint — collecting accurate field data is. Where an up-to-date model and verified equipment data already exist, a coordination or arc flash study is a matter of weeks. Where the model must be rebuilt from site conditions, the data-gathering phase typically dominates the schedule, which is why an existing maintained model is worth more than it appears.',
      },
      {
        q: 'Can PowSys work from an existing model rather than starting over?',
        a: 'Yes, and it is usually the right approach. PowSys verifies an existing ETAP or SKM model against site conditions first, corrects what has drifted, and then runs the study. That is faster and cheaper than a rebuild, and it leaves the client with a model that stays useful for the next project.',
      },
    ],
  },

  'compliance-verification': {
    tagline: 'Proving the installation is what the paperwork says it is.',
    intro:
      'PowSys Engineering provides electrical compliance and verification services — auditing, testing and documenting installations against federal, provincial, industry and site standards so that operators can demonstrate compliance rather than assert it.',
    challenge:
      'Compliance and the evidence of compliance are two different deliverables, and the second is usually the weaker one. An installation can be entirely correct and still fail an audit because a field device was swapped for an identical-looking unit and the certificate on file no longer matches what is installed.',
    groups: [
      {
        title: 'Quality assurance & control',
        items: [
          'Quality assurance (QA) compliance',
          'Quality control (QC) compliance',
          'QA/QC documentation',
          'Performance standards',
          'Drawing as-builts and redlines',
        ],
      },
      {
        title: 'Testing & acceptance',
        items: [
          'Factory Acceptance Testing (FAT)',
          'Site Acceptance Testing (SAT)',
          'Integrated Factory Acceptance Testing (IFAT)',
          'Functional safety and function testing',
          'Performance testing',
          'Commissioning',
        ],
      },
      {
        title: 'Audit & verification',
        items: [
          'Process safety audit',
          'Regulatory compliance',
          'Code reviews, inspections and compliance',
          'Equipment evaluations, validation and verification',
          'Written schemes of verification',
          'HAZOPs',
        ],
      },
      {
        title: 'Advisory',
        items: [
          'Application of electrical standards',
          'Troubleshooting',
          'Client representative',
          'Emergency and contingency planning',
          'General consulting services',
        ],
      },
    ],
    deliverables: [
      'A verification dossier that survives an audit',
      'Signed test records: FAT, SAT and integrated acceptance',
      'Gap register with each finding closed out and dated',
      'Written schemes of verification',
      'As-built drawings reconciled against the installation',
      'A defined periodic inspection regime, with the interval justified',
    ],
    faqs: [
      {
        q: 'What is a written scheme of verification?',
        a: 'A written scheme of verification is the document that records how an installation was assessed as compliant, by whom, against which standard, and on what evidence. It covers the basis of the design, the equipment installed, the inspections carried out and the interval at which they must be repeated. It is the artefact an auditor asks for, and the one most often found incomplete.',
      },
      {
        q: 'What is the difference between FAT, SAT and integrated FAT?',
        a: 'Factory acceptance testing proves equipment works before it leaves the supplier. Site acceptance testing proves it still works once installed and connected. Integrated factory acceptance testing goes further, proving that separately supplied systems work together as one before anything ships — which is where most interface problems are cheapest to find.',
      },
      {
        q: 'How often should an electrical installation be re-verified?',
        a: 'The interval depends on the environment, the grade of inspection and the consequence of failure, and standards allow considerable latitude in setting it. What matters is that the chosen interval is justified and recorded. An interval inherited from a previous operator with no stated reasoning is one of the easier findings for an auditor to write up.',
      },
    ],
  },

  'project-management': {
    tagline: 'Delivery from inception through to commissioning.',
    intro:
      'PowSys Engineering provides electrical engineering project management — delivering an entire project or a specified element of one, from inception through detailed design, procurement and construction to final commissioning, staff training and operational handover.',
    challenge:
      'What stalls industrial projects is rarely the engineering. It is a decision nobody owns, a vendor question circulating for six weeks, or a scope disagreement that predates the current project manager. None of that is solved by producing another deliverable.',
    groups: [
      {
        title: 'Planning & control',
        items: [
          'Project delivery in line with ISO 9001',
          'Project scope development',
          'Project costing and estimation services',
          'Execution plan',
          'Quality plan',
          'Scheduling',
        ],
      },
      {
        title: 'Commercial & supply chain',
        items: [
          'Subcontract management',
          'Material procurement and product development',
          'Cost control',
          'Resource control',
        ],
      },
      {
        title: 'Assurance & reporting',
        items: [
          'Reporting and KPIs',
          'Effective change management',
          'Squad checks',
          'Risk management',
          'HAZOPs',
          'Design and engineering support',
        ],
      },
    ],
    deliverables: [
      'An execution plan and quality plan you can hold us to',
      'Cost and schedule reporting against an agreed baseline',
      'A live risk register, reviewed rather than filed',
      'Change control records with cost and schedule impact stated',
      'Commissioning records and operational manuals',
      'Staff training at handover',
    ],
    faqs: [
      {
        q: 'Can PowSys manage only part of a project?',
        a: 'Yes. PowSys Engineering delivers either an entire project or specified elements of one, and can join at any phase of the life cycle. Where the constraint is coordination rather than engineering capacity, a single embedded engineer inside the client team is often more effective than a packaged scope.',
      },
      {
        q: 'What does the embedded engineer model involve?',
        a: 'One experienced PowSys engineer becomes part of the client core team for the duration. They attend the meetings, hold the open items, and carry enough technical authority to close questions rather than escalate them. It suits projects that have stalled on decisions and interfaces rather than on technical difficulty.',
      },
      {
        q: 'How is progress reported during a project?',
        a: 'Cost, schedule and resource status are reported against an agreed baseline rather than described narratively, with KPIs defined at the outset so that progress is measured the same way each period. Change is handled through formal change control, with the cost and schedule impact of each change stated before it is accepted rather than absorbed silently.',
      },
    ],
  },

  'condition-based-maintenance': {
    tagline: 'Maintenance triggered by measurement, not by the calendar.',
    intro:
      'PowSys Engineering provides condition-based maintenance services — using thermography, partial discharge testing, tan delta testing and motor current signature analysis to determine when an electrical asset actually needs intervention, rather than servicing it on a fixed schedule.',
    challenge:
      'Condition-based maintenance is routinely oversold as an analytics purchase. It is not. It is a decision rule applied to a measurement, and a disciplined inspection route with the right instruments will outperform a monitoring platform bought before anyone decided which assets justify monitoring.',
    groups: [
      {
        title: 'Industrial thermography',
        items: [
          'Faulty electrical connections and overloaded circuits',
          'Poor insulation and heat leaks',
          'Corrosion, erosion and material defects',
          'Non-destructive testing with certified technicians',
        ],
      },
      {
        title: 'Power cable diagnostics',
        items: [
          'Partial discharge (PD) testing to locate insulation defects',
          'Tan delta testing to assess insulation quality',
          'Remaining-life assessment from trended results',
        ],
      },
      {
        title: 'Motor & generator monitoring',
        items: [
          'Partial discharge testing for early insulation failure',
          'Rotor shorted turns detection under normal operating conditions',
          'Motor current signature analysis (MCSA) for bearing wear and mechanical faults',
        ],
      },
      {
        title: 'Reliability engineering',
        items: [
          'Problem definition and data collection',
          'Root cause analysis',
          'Solution implementation and verification',
          'Criticality analysis to decide what warrants monitoring',
        ],
      },
    ],
    deliverables: [
      'A criticality analysis saying which assets justify monitoring — and which do not',
      'Baseline measurements to trend future readings against',
      'Survey reports with load conditions recorded alongside every reading',
      'Prioritised findings, separating what needs an outage from what does not',
      'A repeatable inspection route rather than a one-off diagnostic',
    ],
    faqs: [
      {
        q: 'What is tan delta testing?',
        a: 'Tan delta testing, also called dissipation factor testing, measures how much energy a cable insulation system loses as heat when energised. A healthy insulator stores charge efficiently; a degrading one dissipates progressively more. Because the measurement trends predictably as insulation ages, it gives a usable estimate of remaining service life rather than a simple pass or fail.',
      },
      {
        q: 'What is motor current signature analysis?',
        a: 'Motor current signature analysis is a non-intrusive technique that examines the electrical current a motor draws to detect mechanical problems inside it. Faults such as broken rotor bars, bearing wear and air-gap eccentricity each modulate the current in a characteristic way, so they can be identified from the supply side without stopping the machine or opening it.',
      },
      {
        q: 'Which assets are worth monitoring?',
        a: 'The value of condition-based maintenance scales with the cost of unplanned downtime. Where an asset is inexpensive, where monitoring costs more than the component, or where failure carries no meaningful consequence, a fixed schedule remains the rational choice. Deciding which assets fall on each side of that line is a criticality analysis, and it should precede any purchase of monitoring hardware.',
      },
    ],
  },

  'data-centres': {
    tagline: 'Power engineering for environments where uptime is the product.',
    intro:
      'PowSys Engineering provides electrical engineering services for data centres — power system studies, interconnection design, and design and delivery support for high-density, mission-critical environments where uptime and precision are non-negotiable.',
    challenge:
      'Discussion of rising rack density goes straight to cooling, but the electrical distribution system usually reaches its limits first and less visibly. Fault levels rise, coordination margins compress, harmonic profiles shift, and available incident energy changes — invalidating arc flash labelling that was correct at first fit-out.',
    groups: [
      {
        title: 'Power system studies',
        items: [
          'Power system studies and modelling',
          'Fault level and coordination assessment as capacity is added',
          'Harmonic analysis under rectifier loading',
          'Arc flash reassessment across phased build-outs',
        ],
      },
      {
        title: 'Design & interconnection',
        items: [
          'Designing interconnections',
          'Distribution design for high-density loads',
          'Standby and backup generation integration',
          'Automation and control systems design',
        ],
      },
      {
        title: 'Delivery & optimisation',
        items: [
          'Design, delivery and performance optimisation',
          'System enhancements through to complete builds',
          'Commissioning and acceptance testing',
          'Maintained system model for future expansion',
        ],
      },
    ],
    deliverables: [
      'A maintained system model that survives each expansion phase',
      'Fault, coordination and harmonic study reports',
      'Interconnection design and utility submission support',
      'Updated arc flash labelling after each capacity change',
      'Acceptance test records for energisation',
    ],
    faqs: [
      {
        q: 'Why does rack density affect the electrical system before cooling?',
        a: 'Adding capacity adds transformer capacity, which raises available fault current — potentially past the rating of existing switchgear. It also compresses protective device coordination margins, shifts the harmonic profile as rectifier loading increases, and changes incident energy, which invalidates existing arc flash labels. These limits are reached quietly, whereas thermal limits announce themselves.',
      },
      {
        q: 'Does an arc flash study need redoing after a data hall expansion?',
        a: 'Yes. Incident energy depends on available fault current and protective device clearing time, and both change when distribution capacity is added. A study performed at first fit-out does not describe the facility at third fit-out, and the labelling left on the equipment will understate the hazard.',
      },
      {
        q: 'Can PowSys support a phased build rather than a single project?',
        a: 'Yes, and a maintained model is what makes phased work efficient. Keeping the system model current between phases means each expansion is answerable in hours rather than beginning with another data-gathering exercise that has already been done several times.',
      },
    ],
  },

  'commercial-sector': {
    tagline: 'Life safety, telecommunications and electrical systems.',
    intro:
      'PowSys Engineering provides electrical engineering for the commercial sector — life safety systems, telecommunications infrastructure led by RCDD-certified designers, and electrical system assessment and design for safety-critical, highly regulated buildings.',
    challenge:
      'Commercial buildings accumulate systems from different eras and different contractors, each commissioned in isolation. The failure mode is rarely a single faulty system; it is two compliant systems that were never proven to work together.',
    groups: [
      {
        title: 'Life safety',
        items: [
          'Life safety systems assessment and design',
          'Fire alarm and detection infrastructure',
          'Emergency and standby power',
          'Compliance with applicable fire safety standards',
        ],
      },
      {
        title: 'Telecommunications',
        items: [
          'Telecommunications distribution design (RCDD-led)',
          'Structured cabling infrastructure',
          'Pathways, spaces and grounding for telecommunications',
          'Integration with building systems',
        ],
      },
      {
        title: 'Electrical systems',
        items: [
          'Electrical system assessment',
          'Distribution and lighting design',
          'Targeted upgrades through to integrated infrastructure',
          'Power quality and load assessment',
        ],
      },
    ],
    deliverables: [
      'Condition assessment of the existing installation',
      'Design drawings and specifications for upgrade or new build',
      'Telecommunications infrastructure design to RCDD standards',
      'Integration testing across life safety, telecoms and power',
      'Documentation suited to a building operations team, not just a contractor',
    ],
    faqs: [
      {
        q: 'What does an RCDD do?',
        a: 'A Registered Communications Distribution Designer is certified to design telecommunications distribution infrastructure — the pathways, spaces, cabling, grounding and administration that carry a building’s networks. The certification covers the structural and electrical decisions that determine whether a building’s cabling remains serviceable and standards-compliant over its life.',
      },
      {
        q: 'Can PowSys assess an existing building rather than a new build?',
        a: 'Yes. A substantial share of commercial work is assessment of installed systems, identifying where an existing building falls short of current requirements and what a proportionate upgrade path looks like — from a targeted intervention through to fully integrated infrastructure.',
      },
      {
        q: 'Who is responsible for making separate building systems work together?',
        a: 'Usually nobody, which is the problem. Life safety, telecommunications and power are frequently procured and commissioned as separate packages, each compliant in isolation. PowSys takes the integration scope explicitly, so the interfaces between those systems are designed and tested rather than assumed.',
      },
    ],
  },
};
