/* ---------------------------------------------------------------------------
   KNOWLEDGE CENTRE — ARTICLE BODIES

   ⚠️  REQUIRES TECHNICAL REVIEW BEFORE PUBLICATION.

   These are written to be accurate, and every standard referenced is real —
   CSA Z462, IEEE 1584, IEC 60270, IEC 60079, IEEE 519, IEEE 1547, ISO 17359,
   the Canadian Electrical Code. But they are published under PowSys's name and
   make technical assertions a client may act on, so a P.Eng should read each
   one and confirm it matches the firm's own practice and the current edition
   of every standard cited. Standards are revised; clause references age.

   Bylines are team names, not individuals. Change them to the actual author
   once someone has reviewed and taken ownership of a piece.
--------------------------------------------------------------------------- */

import type { Block } from './knowledge';

export const articleBodies: Record<string, Block[]> = {
  /* ======================================================================= */
  'arc-flash-studies-csa-z462': [
    {
      p: 'An arc flash study calculates the thermal energy a worker would be exposed to if an arcing fault occurred at a given point in a power system. That figure — incident energy, expressed in calories per square centimetre at a defined working distance — determines the arc-rated clothing and equipment a worker must wear, and the boundaries that must be observed while energised work is in progress. Everything else in the process follows from calculating it correctly.',
    },
    {
      p: 'In Canada the governing standard is CSA Z462, Workplace electrical safety, which is harmonised with NFPA 70E and sits alongside the Canadian Electrical Code (CSA C22.1) and provincial occupational health and safety regulation. CSA Z462 sets out the safety-related work practices; the calculation method itself comes from IEEE 1584, Guide for Performing Arc-Flash Hazard Calculations.',
    },
    { h: 'A study is not a single number' },
    {
      p: 'The incident energy figure is the last thing produced, not the first. It depends on how much fault current is available and how long the upstream protective device takes to clear the arc — and both of those have to be established before any arc flash calculation means anything.',
    },
    {
      ul: [
        'A verified single-line diagram reflecting as-built conditions, not the design intent',
        'Utility short-circuit contribution confirmed with the utility, not assumed',
        'A short-circuit study establishing available fault current at every relevant bus',
        'A protective device coordination study establishing actual clearing times',
        'Incident energy and arc flash boundary calculated per IEEE 1584',
        'Equipment labels carrying the content CSA Z462 requires',
      ],
    },
    {
      p: 'Skipping the coordination step is the most common shortcut, and it is the one that most often produces labels that are confidently wrong. Incident energy is roughly proportional to arcing time. A device that clears in 0.1 s rather than the 0.5 s assumed produces a fifth of the energy — and the reverse is equally true. A miscoordinated upstream device that fails to see the arc can leave it burning far longer than any table would suggest.',
    },
    { h: 'What changed in IEEE 1584-2018' },
    {
      p: 'The 2018 edition replaced the single empirical model of the 2002 edition with a set of models covering five electrode configurations — vertical conductors in a box, vertical conductors terminating in an insulating barrier, horizontal conductors in a box, and vertical or horizontal conductors in open air. Electrode orientation materially affects how the arc plasma is directed, and therefore how much energy reaches a worker standing in front of the equipment.',
    },
    {
      p: 'The revised model also widened the validated range of system voltage, electrode gap and enclosure size, and changed how arcing current variation is handled. A study produced under the 2002 model is not automatically wrong, but it was built on a narrower empirical base, and results for equipment outside the old test envelope deserve re-examination.',
    },
    { h: 'The arc flash boundary' },
    {
      p: 'The arc flash boundary is the distance at which incident energy falls to 1.2 cal/cm² — the level conventionally associated with the onset of a second-degree burn on bare skin. It is a distance, not a PPE rating, and it is frequently confused with the limited and restricted approach boundaries, which are shock-protection distances derived from system voltage and have nothing to do with thermal energy.',
    },
    { h: 'When a study has to be revisited' },
    {
      p: 'CSA Z462 expects the study to reflect the electrical system as it currently exists. In practice that means revisiting it whenever the distribution system is modified in a way that changes available fault current or clearing time, and reviewing it at least every five years regardless.',
    },
    {
      ul: [
        'A new or replaced transformer, or a change in its impedance',
        'A revised utility short-circuit contribution — utilities reinforce their networks',
        'Protective devices replaced, or settings changed during a trip investigation',
        'Significant motor load added, which contributes to fault current',
        'New distribution added during a phased expansion',
      ],
    },
    {
      quote:
        'The most expensive arc flash study is the one that was done once, filed, and never revisited after the plant expanded.',
    },
    { h: 'Where studies go wrong' },
    {
      p: 'Three failure modes account for most of the corrective work we are asked to do, and all three are data problems rather than calculation problems.',
    },
    {
      ul: [
        'Utility fault current taken from a design document rather than confirmed in writing with the utility — often years out of date, and usually understated',
        'Protective device settings read from drawings rather than from the devices as actually configured, which diverge after every trip investigation',
        'Motor contribution omitted, which understates fault current on exactly the low-voltage buses where people work most often',
      ],
    },
    {
      p: 'There is also a persistent assumption that low voltage is low risk. It is not. Arcing faults at 480 V and below frequently produce higher incident energy than equivalent faults at medium voltage, because upstream protection is slower to distinguish an arcing fault from normal load current, and the arc sustains for longer.',
    },
    { h: 'Labelling and PPE selection' },
    {
      p: 'CSA Z462 permits two routes to PPE selection: the incident energy analysis method, which uses calculated values, and the arc flash PPE category method, which uses tables bounded by equipment type and fault parameters. The two must not be mixed on the same equipment. Where a study exists, the calculated value governs, and the label should carry the incident energy, the working distance it was calculated at, the arc flash boundary, the nominal system voltage and the shock approach boundaries.',
    },
    {
      p: 'A label without a working distance is not usable. Incident energy falls off sharply with distance, so a value quoted without the distance it applies at tells a worker nothing about the exposure at the position they will actually stand in.',
    },
  ],

  /* ======================================================================= */
  'partial-discharge-testing-explained': [
    {
      p: 'Partial discharge is a localised electrical discharge that bridges only part of the insulation between two conductors. Each event is small — measured in picocoulombs of apparent charge — and none of them, individually, does noticeable harm. Cumulatively they erode insulation from the inside, and partial discharge is the dominant long-term degradation mechanism in medium and high voltage cables, motors and generators.',
    },
    {
      p: 'The conventional electrical measurement method is defined by IEC 60270, High-voltage test techniques: partial discharge measurements, which established apparent charge in picocoulombs (pC) as the reference quantity. Non-conventional methods — ultra-high frequency, acoustic and transient earth voltage — are covered by IEC 62478 and are common in field work, though they do not produce a calibrated pC value.',
    },
    { h: 'Where discharge originates' },
    {
      p: 'PD requires a local enhancement of electric field strength beyond what the surrounding dielectric can withstand. In practice that means a defect, and the defect type shapes the discharge pattern.',
    },
    {
      ul: [
        'Internal voids or cavities left by manufacturing or thermal cycling within solid insulation',
        'Surface discharge, tracking along an interface where an insulator meets air or a different dielectric',
        'Corona from a sharp conductor edge or a poorly dressed termination',
        'Electrical treeing, where earlier discharge activity has begun to propagate branching channels',
      ],
    },
    {
      p: 'Terminations and joints account for a disproportionate share of cable findings, because they are assembled in the field rather than in a factory, and because they are where insulation systems of different types meet.',
    },
    { h: 'Online versus offline testing' },
    {
      p: 'Online testing measures discharge activity while the asset runs at normal operating voltage. It reflects genuine service conditions, needs no outage, and is the right basis for trending. Its limitation is that it only ever sees the asset at one voltage — the one it happens to operate at.',
    },
    {
      p: 'Offline testing energises the asset from an external source, most commonly a very low frequency supply at 0.1 Hz for shielded power cable, as described in IEEE 400.2. Because the applied voltage can be varied, offline testing establishes two values that online testing cannot.',
    },
    {
      ul: [
        'Partial discharge inception voltage (PDIV) — the voltage at which discharge begins as voltage is raised',
        'Partial discharge extinction voltage (PDEV) — the voltage at which it stops as voltage is lowered again',
      ],
    },
    {
      p: 'A PDIV close to or below normal operating voltage means the defect is discharging in service, every cycle. A PDIV comfortably above it means the defect exists but is not currently active. That distinction changes the urgency of the response, and it cannot be established from an online measurement alone.',
    },
    { h: 'Detecting is not locating' },
    {
      p: 'Knowing that a 300-metre feeder is discharging somewhere is of limited operational use. Location requires either time-domain reflectometry, which times the arrival of the discharge pulse and its reflection to compute distance along the cable, or acoustic and UHF sensing to narrow down a position in a switchboard or machine. Specify location as part of the scope, or expect to receive a result you cannot act on.',
    },
    { h: 'Read the trend, not the number' },
    {
      p: 'A single PD magnitude in isolation is close to meaningless. Apparent charge is affected by sensor type and placement, coupling capacitance, ambient electrical noise, load, temperature and humidity. Two contractors measuring the same machine on the same day with different equipment can report materially different values, and both can be correct within their own measurement basis.',
    },
    {
      p: 'What carries information is the direction of travel under repeatable conditions. A machine whose discharge activity has tripled across four quarterly measurements, taken with the same instrument at the same sensor positions, is telling you something a one-off reading never could. This is why partial discharge testing belongs inside a condition-based maintenance programme rather than being commissioned reactively — by the time it is ordered in response to a problem, the useful early-warning window has usually closed.',
    },
    {
      quote:
        'A first partial discharge measurement is not a diagnosis. It is a baseline, and its value is entirely in what the next one is compared against.',
    },
  ],

  /* ======================================================================= */
  'cbm-is-not-predictive-maintenance': [
    {
      p: 'Ask three vendors what condition-based maintenance means and at least one answer will be a machine learning pitch. The terms have been blurred to the point where operators are buying analytics platforms to solve problems a disciplined quarterly thermography route would have caught, and the vocabulary confusion has real budget consequences.',
    },
    { h: 'The actual distinction' },
    {
      ul: [
        'Reactive, or run-to-failure: the asset is operated until it fails, then repaired. A deliberate strategy for some assets, not an absence of strategy.',
        'Preventive: the asset is serviced on a fixed calendar or run-hour interval, regardless of its measured condition.',
        'Condition-based: the actual condition of the asset is measured, and intervention is triggered when the measurement crosses a defined threshold.',
        'Predictive: measurements are modelled to forecast a future failure point, so that intervention can be scheduled against a projected date rather than a present threshold.',
      ],
    },
    {
      p: 'Condition-based maintenance is a decision rule applied to a measurement. Predictive maintenance is a forecast built on top of one. ISO 17359, Condition monitoring and diagnostics of machines, describes the general framework, and nothing in it requires a model. A rigorous CBM programme can run on infrared cameras, a partial discharge test set, a vibration analyser and a disciplined route.',
    },
    { h: 'The P-F interval decides whether any of this works' },
    {
      p: 'The concept that makes condition monitoring coherent is the P-F interval: the time between the point at which a developing failure first becomes detectable, and the point at which it becomes a functional failure. Monitoring is only useful if the inspection interval is comfortably shorter than that window.',
    },
    {
      p: 'This is where programmes quietly fail. A quarterly route against a failure mode with a two-week P-F interval will detect almost nothing, and the organisation concludes that condition monitoring does not work — when in fact the technique was sound and the interval was wrong for that failure mode. Bearing degradation, insulation ageing and loose connections have very different P-F intervals, and they cannot all be sensibly covered by the same route frequency.',
    },
    { h: 'Where fixed schedules still win' },
    {
      p: 'This is the part usually left out. Condition-based maintenance is not universally superior. Where an asset is inexpensive, where the monitoring costs more than the component it protects, where no detectable degradation precedes failure, or where a failure carries no meaningful consequence, a fixed interval is the rational choice — and so, sometimes, is running to failure.',
    },
    {
      quote:
        'Monitoring everything is not a maintenance strategy. It is a way of spending a maintenance budget without deciding anything.',
    },
    {
      p: 'The value of condition-based maintenance scales with the cost of unplanned downtime and with the existence of a detectable degradation path. Both of those are properties of the asset, not of the monitoring technology.',
    },
    { h: 'Start with criticality, not with sensors' },
    {
      p: 'The useful question is not which strategy is best, but which assets justify which strategy. That is a criticality analysis, usually informed by a failure modes and effects analysis, and it belongs before any purchase of monitoring hardware. It asks what the asset does, what happens when it stops, which failure modes actually occur, whether those modes give warning, and whether that warning arrives far enough ahead to act on.',
    },
    {
      p: 'Done first, that analysis usually shortens the monitoring shopping list considerably — and it directs the spend at the small number of assets where it changes an outcome.',
    },
  ],

  /* ======================================================================= */
  'hazardous-area-verification-dossier': [
    {
      p: 'A hazardous location installation can be entirely compliant and still fail an audit, because compliance and the evidence of compliance are two different deliverables. The verification dossier is the second one, and in most facilities it is the weaker of the two.',
    },
    { h: 'The Canadian framework' },
    {
      p: 'In Canada, hazardous location requirements sit in the Canadian Electrical Code (CSA C22.1), principally Section 18 for hazardous locations and Section 20 for specific occupancies such as fuel dispensing and finishing processes. Canada recognises both the traditional Class and Division system and the Zone system aligned with the IEC 60079 series, and a facility may contain areas classified under either. Equipment certification is to the CSA C22.2 No. 60079 series for Zone-classified equipment.',
    },
    {
      p: 'Terminology varies by jurisdiction, and it is worth being precise about which system a document is written in. "EEHA" — electrical equipment in hazardous areas — is common in Australian practice and appears in some international scopes; Canadian documentation more usually refers to hazardous locations. Mixing the vocabulary across a dossier is a reliable way to create ambiguity about which standard an inspection was carried out against.',
    },
    { h: 'Classification is the foundation, and it must state its basis' },
    {
      p: 'Area classification divides a facility into zones or divisions according to the likelihood that an explosive atmosphere is present. Under the Zone system, Zone 0 is where an explosive gas atmosphere is present continuously or for long periods, Zone 1 where it is likely in normal operation, and Zone 2 where it is not likely and would persist only briefly.',
    },
    {
      p: 'A classification drawing that shows zones without recording how they were derived is of limited value. The dossier needs the basis: the release sources considered, the material properties, the ventilation assumptions, and the reference standard used. Without that, no one can later assess whether a process change has invalidated the classification.',
    },
    { h: 'Equipment selection has to match three things at once' },
    {
      ul: [
        'The zone, which sets the required equipment protection level',
        'The gas or dust group of the substance present — a device certified for IIA is not suitable where IIC hydrogen or acetylene atmospheres occur',
        'The temperature class, so that no surface can reach the ignition temperature of the surrounding atmosphere',
      ],
    },
    {
      p: 'Each of these is stamped on the equipment marking, and each must be reconciled against the classification drawing for the location the equipment actually occupies. An item certified correctly but installed in the wrong zone is a finding.',
    },
    { h: 'What the dossier has to contain' },
    {
      ul: [
        'Area classification drawings with the basis of classification recorded',
        'Equipment schedules listing certification, protection concept, gas group and temperature class per item',
        'Certificates for every item of Ex equipment installed',
        'Initial detailed inspection records against IEC 60079-17 or the applicable standard',
        'A defined periodic inspection regime, with grade and interval justified rather than inherited',
        'Records of every rectification, closed out and dated',
        'Competency records for the people who carried out the inspections',
      ],
    },
    { h: 'Inspection grades' },
    {
      p: 'IEC 60079-17 defines three grades of inspection. A detailed inspection may require the equipment to be opened and de-energised, and examines internal conditions such as terminations and enclosure integrity. A close inspection examines features visible with access equipment but without opening. A visual inspection identifies defects apparent to the unaided eye. Grades and intervals are selected on the basis of environment, equipment type and consequence, and the standard expects that selection to be justified.',
    },
    {
      p: 'An interval inherited from a previous operator, with no recorded reasoning, is one of the easier findings for an auditor to write up.',
    },
    { h: 'The gap that appears most often' },
    {
      p: 'Equipment gets replaced. A field device fails, a similar-looking unit goes in during a turnaround, and the certificate on file no longer describes the item in the field. Nothing about the installation looks different on a walkdown. The dossier is now wrong, and it will stay wrong until someone physically reconciles the equipment schedule against the plant.',
    },
    {
      quote:
        'The dossier does not drift because anyone decided to change it. It drifts because equipment changed and the paperwork was never part of the change.',
    },
    {
      p: 'The fix is procedural rather than technical: no Ex equipment change without a corresponding dossier update, enforced through the same management-of-change process that governs the rest of the plant. Where that link does not exist, the periodic reconciliation walkdown is the only remaining control, and it should be scoped accordingly.',
    },
  ],

  /* ======================================================================= */
  'solar-interconnection-lessons': [
    {
      p: 'On most of the photovoltaic projects we have supported, the generation equipment was never the constraint. The interconnection was. The modules, inverters and racking arrive broadly on schedule; the connection to the grid is where the programme moves. A short list of what has actually caused that, and what it costs.',
    },
    { h: 'The five that recur' },
    {
      ul: [
        'The utility interconnection study treated as an administrative formality and started late. Study queues are a long-lead item, and their duration is outside the developer’s control.',
        'Protection settings agreed verbally but never issued in writing, then reopened at commissioning when the utility’s protection engineer sees them for the first time.',
        'Grounding arrangement revisited after civil works are complete, because the transformer configuration and system grounding were not settled against the utility’s requirements early enough.',
        'Power quality requirements — harmonic and flicker limits — discovered after inverter selection is locked, when the remedy is filtering rather than a different inverter.',
        'As-built documentation lagging far enough behind that energisation becomes a survey exercise.',
      ],
    },
    { h: 'What governs the connection' },
    {
      p: 'The technical requirements for connecting an inverter-based resource are set by IEEE 1547, Standard for Interconnection and Interoperability of Distributed Energy Resources with Associated Electric Power Systems Interfaces, and in Canada by CSA C22.3 No. 9, Interconnection of distributed energy resources with electricity supply systems. The 2018 revision of IEEE 1547 changed the landscape significantly: distributed resources are now expected to ride through defined voltage and frequency excursions rather than disconnect immediately, and to provide reactive power capability.',
    },
    {
      p: 'That matters commercially, not just technically. Ride-through and voltage regulation requirements affect inverter selection and settings, and a project scoped against the older assumption that inverters simply trip on disturbance can find its equipment non-compliant late.',
    },
    { h: 'Anti-islanding is where the protection discussion concentrates' },
    {
      p: 'An unintentional island — a section of network still energised by the resource after the utility source has opened — is a safety hazard for line workers and a risk to equipment reconnecting out of synchronism. Inverters carry active anti-islanding detection, but the utility will often require additional protection at the point of interconnection, and the settings are theirs to approve.',
    },
    {
      p: 'The common failure is treating this as a commissioning conversation. Protection philosophy, settings and any transfer trip requirement should be agreed and documented at design stage, because the answer can change what equipment is needed.',
    },
    { h: 'Power quality limits are a design input' },
    {
      p: 'IEEE 519 sets harmonic limits at the point of common coupling, expressed as total demand distortion rather than total harmonic distortion — the distinction matters, because TDD is referenced to maximum demand load current rather than to the fundamental at the moment of measurement, and a lightly loaded plant can show alarming THD while remaining fully compliant on TDD.',
    },
    {
      p: 'Establishing the applicable limit early is cheap. Discovering it after inverters are procured is not.',
    },
    { h: 'The common thread' },
    {
      p: 'Every item on that list is an interface between parties rather than a technical difficulty. None of them are hard engineering problems. All of them are slow problems when they surface late, because each requires a decision from an organisation that is not the developer and does not share the developer’s schedule.',
    },
    {
      p: 'The practical countermeasure is unglamorous: identify every external dependency at the front end, assign an owner and a date to each, and review them as a standing agenda item rather than as an exception report.',
    },
  ],

  /* ======================================================================= */
  'data-centre-power-density': [
    {
      p: 'Discussion of rising rack density moves almost immediately to cooling. Cooling is the visible constraint and the one with the clearest thermal ceiling. But the electrical distribution system usually encounters its limits first, and it does so far less visibly — because none of the symptoms announce themselves the way a hot aisle does.',
    },
    { h: 'What changes upstream when density rises' },
    {
      ul: [
        'Available fault current rises as transformer capacity is added, potentially exceeding the interrupting rating of installed switchgear',
        'Protective device coordination margins compress as devices are added in series within a fixed voltage drop budget',
        'The harmonic profile shifts as rectifier loading increases, changing distortion at the point of common coupling',
        'Incident energy changes, which invalidates existing arc flash labelling',
        'Neutral conductor loading rises with triplen harmonics from single-phase non-linear loads',
      ],
    },
    { h: 'Fault current is the ceiling nobody watches' },
    {
      p: 'Switchgear carries an interrupting rating, and that rating is a hard limit. Adding transformer capacity — or a utility reinforcing its network upstream, which happens without reference to the facility — raises available fault current. A board that was adequately rated at first fit-out can become under-rated without anything inside the building changing.',
    },
    {
      p: 'This is not a performance problem that degrades gracefully. Equipment asked to interrupt beyond its rating can fail catastrophically, and the failure occurs at precisely the moment protection is most needed.',
    },
    { h: 'Selectivity is the property that makes redundancy real' },
    {
      p: 'A data centre’s redundancy topology assumes that a fault takes out the smallest possible section. That assumption holds only if protective devices are selectively coordinated, so that the device nearest the fault operates and those upstream of it do not.',
    },
    {
      p: 'Each additional level of distribution compresses the time-current margin available to achieve that. Add enough levels within a fixed voltage envelope and full selectivity stops being achievable with conventional time grading — at which point a fault in one cabinet can trip a board serving many, and the redundancy on the single-line diagram does not exist in practice.',
    },
    {
      quote:
        'A single-line diagram shows the redundancy you designed. A coordination study shows the redundancy you actually have.',
    },
    { h: 'Harmonics and the point of common coupling' },
    {
      p: 'IT loads are rectifier loads. As density rises, so does the aggregate non-linear load, and with it harmonic current injection. IEEE 519 sets limits at the point of common coupling, and compliance is a shared responsibility between the facility and the utility. Total demand distortion is the referenced quantity, and it is assessed against maximum demand rather than instantaneous load.',
    },
    {
      p: 'Beyond the compliance question, harmonic current causes additional transformer heating and elevated neutral currents. A transformer sized on kVA alone, without a K-factor or derating assessment for the harmonic content it will actually carry, can run hot at what appears on paper to be partial load.',
    },
    { h: 'Arc flash labelling does not survive an expansion' },
    {
      p: 'Incident energy depends on available fault current and protective device clearing time. Both change when distribution capacity is added. A study performed at first fit-out does not describe the facility at third fit-out, and the labels left on the equipment will understate the hazard — which is worse than no label, because a worker will select PPE from it.',
    },
    { h: 'The case for a maintained model' },
    {
      p: 'Phased build-outs are where a maintained system model earns its cost. Keeping the model current between phases means each expansion is a question answerable in hours: what does this do to fault levels, does coordination still hold, does the arc flash study need reissuing. Without one, every phase begins with a data-gathering exercise that has already been performed several times, by different people, at full cost each time.',
    },
  ],

  /* ======================================================================= */
  'why-etap-models-drift': [
    {
      p: 'We are regularly asked to verify an existing power system model before it is used for a study. In a meaningful share of those engagements the model no longer represents the plant — and nobody in the organisation knew, because nothing had drawn attention to it.',
    },
    { h: 'How the drift happens' },
    {
      p: 'Rarely through a single large omission. Almost always through accumulation, and almost always through changes that were each properly documented somewhere other than the model.',
    },
    {
      ul: [
        'A relay setting adjusted during a trip investigation, recorded in the investigation report',
        'A cable rerouted or replaced during a shutdown, captured on a redline that never reached the drawing office',
        'A spare feeder brought into service, noted in the operations log',
        'A motor replaced with a higher-rated unit, recorded in the asset register',
        'A utility reinforcing its upstream network, which changes fault contribution without any notification at all',
      ],
    },
    {
      p: 'Every one of those is a change to the electrical system. None of them naturally triggers a model update, because the model is usually owned by whoever last ran a study rather than by the organisation that operates the plant.',
    },
    {
      quote:
        'A study run on a stale model does not produce a wrong answer. It produces a confident answer to a question about a plant that no longer exists.',
    },
    { h: 'What it costs' },
    {
      ul: [
        'Protection settings coordinated against fault levels that have changed, so selectivity is assumed rather than achieved',
        'Arc flash labels understating incident energy, with PPE selected from them',
        'Capacity decisions made against the wrong headroom figure',
        'Equipment specified against a fault duty that no longer applies',
        'Rework discovered at commissioning rather than at design, when it is most expensive',
      ],
    },
    { h: 'Verification is cheaper than reconstruction' },
    {
      p: 'The instinct when a model is suspect is to rebuild it. That is usually the wrong call. Verifying an existing model against site conditions — confirming utility contribution in writing, reading protective device settings from the devices rather than the drawings, walking the single-line against the plant, checking nameplate data on major equipment — is faster and cheaper, and it leaves the organisation with a model that has a known basis.',
    },
    {
      p: 'It also produces something a rebuild does not: a record of what had drifted, which is usually the more useful finding. The list of discrepancies tells you where the change control process is leaking.',
    },
    { h: 'Treat the model as an asset with an owner' },
    {
      p: 'Model maintenance is inexpensive relative to any one of the failure modes above. It is also easy to defer indefinitely, because the consequences of deferring it never appear on the project that deferred it — they appear two projects later, to someone else.',
    },
    {
      p: 'The organisations that avoid this treat the system model as a controlled document with a named owner, updated through the same management-of-change process as the drawings. That is a governance decision rather than an engineering one, which is exactly why it tends not to get made.',
    },
  ],

  /* ======================================================================= */
  'thermography-what-it-cannot-see': [
    {
      p: 'Infrared thermography finds loose connections, overloaded circuits, imbalanced phases and failing components quickly, without an outage, and at the lowest cost per asset of any electrical inspection technique available. It is the highest-yield tool in an electrical maintenance programme. It is also routinely over-trusted, and the reason is that its limitations are not visible in the image.',
    },
    { h: 'It measures surface temperature, and only that' },
    {
      p: 'An infrared camera detects radiation emitted from a surface within its line of sight. It cannot see through an enclosure, through insulation, or through anything opaque to infrared. A defect inside a sealed enclosure, within cast resin, or beneath insulation may not raise an exterior surface temperature enough to register — particularly early in its development, which is exactly when detection would be most useful.',
    },
    { h: 'The four measurement errors that matter' },
    {
      ul: [
        'Emissivity. Different materials emit differently at the same temperature. Bare or oxidised metal has low emissivity and will read far cooler than it is unless the value is corrected or a high-emissivity target applied.',
        'Reflected apparent temperature. A low-emissivity surface is a good reflector, so a shiny busbar can display the temperature of a lamp or a nearby hot object rather than its own.',
        'Load. Temperature rise at a resistive fault scales roughly with the square of current. A connection inspected at 30 per cent load may read as normal and still be a serious defect at full load.',
        'Distance and optics. Beyond the instrument’s spot size ratio the reading is an average across a larger area, and a small hot spot is diluted into the surrounding surface.',
      ],
    },
    {
      p: 'Of these, load is the one most often left out of a report. A survey that does not record load conditions cannot be compared against a later one, and cannot be extrapolated to operating conditions.',
    },
    {
      quote:
        'A thermographic survey without recorded load conditions is an observation, not a measurement.',
    },
    { h: 'Qualitative and quantitative surveys are different products' },
    {
      p: 'A qualitative survey compares similar components under similar conditions — the three phases of a connection, or two identical motors — and looks for the odd one out. It is fast, robust against emissivity error, and well suited to routine routes.',
    },
    {
      p: 'A quantitative survey assigns an absolute temperature and grades severity against it, commonly using the temperature rise above a reference: either the corresponding component in another phase, or the ambient air. Severity criteria of this kind appear in the NETA maintenance testing specifications and in many corporate standards. Quantitative work demands correct emissivity, reflected temperature compensation and recorded load, and it is not what most routine routes actually deliver.',
    },
    { h: 'What it will not find' },
    {
      ul: [
        'Insulation degradation before it produces heat — partial discharge and tan delta testing exist for this',
        'Developing mechanical faults inside a motor, where vibration analysis or motor current signature analysis is the appropriate tool',
        'Loose connections carrying little current, which generate too little heat to distinguish from ambient',
        'Defects within any enclosure the camera cannot see into, unless an infrared window has been fitted',
      ],
    },
    {
      p: 'None of this is an argument against thermography. It is an argument for reporting load conditions with every survey, for stating whether a survey was qualitative or quantitative, and for pairing thermal inspection with electrical diagnostics rather than treating one as a substitute for the other.',
    },
  ],

  /* ======================================================================= */
  'one-person-team-model': [
    {
      p: 'Engineering services default to packaged scopes: a defined deliverable, a fixed fee, a handover. That structure works well when the requirement is genuinely well defined. A substantial share of stalled industrial projects do not have that problem, and buying another packaged scope does not fix them.',
    },
    { h: 'What actually stalls is rarely the engineering' },
    {
      p: 'It is a decision nobody owns. A vendor question that has been circulating for six weeks. A drawing revision waiting on an approval from someone who has left. A scope disagreement that predates the current project manager and that everyone has learned to work around. An interface between two contractors where each believes the other holds the scope.',
    },
    {
      p: 'None of that is solved by producing another deliverable. It is solved by someone with enough technical authority and enough continuity to close the question.',
    },
    { h: 'What embedding actually means' },
    {
      p: 'One experienced engineer becomes part of the client’s core team for the duration. They attend the internal meetings, hold the open-items list, talk to the vendors directly, and carry the technical standing to make a call rather than escalate it. They are accountable to the client’s project manager, not managing a parallel workstream alongside them.',
    },
    {
      ul: [
        'Continuity: the same person holds the context week to week, so nothing is re-explained',
        'Authority: decisions within the agreed technical envelope get made rather than queued',
        'Visibility: problems surface at the point they appear, not at the next reporting gate',
        'Neutrality: an engineer with no stake in which contractor is at fault can resolve an interface faster than either party',
      ],
    },
    { h: 'The honest limitations' },
    {
      p: 'This model is not cheaper per hour, and it is not a way to acquire capacity at a discount. Where the deliverable is well defined and the client organisation is functioning, a packaged scope is more efficient and easier to govern — the deliverable is specified, priced and accepted, and everyone knows what done looks like.',
    },
    {
      p: 'Embedding also depends on the client actually granting the authority. An embedded engineer with no decision rights becomes an expensive observer, and the arrangement will underperform a conventional scope. That authority has to be agreed at the outset, in writing, including where its boundary sits.',
    },
    {
      quote:
        'The embedded model earns its cost specifically where coordination, not calculation, is the bottleneck.',
    },
    { h: 'How to tell which one you need' },
    {
      p: 'If you can write down the deliverable, the acceptance criteria and the interfaces, buy a packaged scope. If the honest answer to "what exactly do we need" is that it depends on decisions not yet made, an embedded engineer will get you to a definable scope faster than a proposal process will.',
    },
  ],
};
