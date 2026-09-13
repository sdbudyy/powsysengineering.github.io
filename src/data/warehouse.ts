/* ---------------------------------------------------------------------------
   THE INSTRUMENTED WAREHOUSE

   The six building systems shown in the interactive warehouse on the BCMI
   service page. Each becomes a numbered callout in the 3D scene and a real
   HTML entry in the list under it, so the content is crawlable whether or not
   the scene ever loads.

   ⚠️  The counts in `metrics` are illustrative and need PowSys to confirm
   them before launch. They are deliberately counts (zones, points,
   interfaces) rather than savings percentages, which the firm could not
   stand behind. The readouts inside the scene are simulated and are
   labelled as such on the page.
--------------------------------------------------------------------------- */

export interface WarehouseSystem {
  id: string;
  /** Short label on the callout chip. */
  label: string;
  /** Category tag shown on the card. */
  tag: string;
  /** Full title. */
  title: string;
  body: string;
  /** Three [value, label] pairs. Counts, not claims. */
  metrics: [string, string][];
  /** World position of the callout anchor in the scene. */
  pos: [number, number, number];
}

export const warehouseSystems: WarehouseSystem[] = [
  {
    id: 'lighting',
    label: 'Lighting',
    tag: 'Lighting control',
    title: 'Zoned high-bay LED',
    body:
      'Aisles are lit by occupancy and daylight, not by a wall switch. PowSys specifies the zoning, the sensors and the control narrative the lighting follows.',
    metrics: [['5', 'lighting zones'], ['2', 'control inputs'], ['1', 'narrative']],
    pos: [0, 13.2, 0],
  },
  {
    id: 'hvac',
    label: 'HVAC',
    tag: 'HVAC zoning',
    title: 'Air handling by demand',
    body:
      'Three rooftop units, four floor zones, one schedule that follows how the floor is actually used. Demand-driven rather than always-on.',
    metrics: [['3', 'rooftop units'], ['4', 'floor zones'], ['1', 'schedule']],
    pos: [0, 15.6, -9.5],
  },
  {
    id: 'meter',
    label: 'Metering',
    tag: 'Sub-metering',
    title: 'Main incomer and panel-level metering',
    body:
      'You cannot manage what you do not measure. Metering at the incomer and at each distribution board makes consumption visible per zone and per system.',
    metrics: [['1', 'incomer meter'], ['11', 'panel meters'], ['12', 'points']],
    pos: [-23, 4.9, -11.5],
  },
  {
    id: 'panel',
    label: 'BMS panel',
    tag: 'BMS head-end',
    title: 'One control panel, one narrative',
    body:
      'The head-end panel PowSys designs and specifies: every interface documented, every sequence written down, verified against the narrative before handover.',
    metrics: [['1', 'control narrative'], ['6', 'interfaces'], ['FAT', 'witnessed']],
    pos: [-23, 5.6, -6],
  },
  {
    id: 'life',
    label: 'Life safety',
    tag: 'Life safety interface',
    title: 'Fire alarm, HVAC and emergency power, as one system',
    body:
      'Three compliant systems that were never proven together. PowSys specifies and verifies the interfaces so the shutdown, the fans and the backup power behave as one.',
    metrics: [['3', 'systems'], ['1', 'interface schedule'], ['1', 'proof test']],
    pos: [23.3, 9.0, 6],
  },
  {
    id: 'pq',
    label: 'Power quality',
    tag: 'Power quality',
    title: 'Voltage events and harmonics, logged',
    body:
      'A monitor at the incomer records sags, swells and harmonic distortion — the evidence that turns an unexplained trip into a diagnosable one.',
    metrics: [['24/7', 'logging'], ['THD', 'tracked'], ['1', 'event log']],
    pos: [-19.4, 6.4, 11.4],
  },
];
