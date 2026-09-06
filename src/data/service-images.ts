/* Hero photograph per service, shared by the services hub and the individual
   service pages so both stay in sync. Alt text describes what is pictured. */

import imgDesign from '../assets/images/distributor-design-900x600.jpg';
import imgCompliance from '../assets/images/engineer-female-900x600.jpg';
import imgPm from '../assets/images/engineering-study.jpg';
import imgCbm from '../assets/images/engineer-male-900x600.jpg';
import imgData from '../assets/images/datacenter-900x600.jpg';
import imgCommercial from '../assets/images/clean-room-900x600.jpg';
import imgPanel from '../assets/images/distributor-design-900x600.jpg';
import imgBcmi from '../assets/images/engineering-study.jpg';

export const serviceMedia: Record<string, { src: ImageMetadata; alt: string }> = {
  'engineering-design': {
    src: imgDesign,
    alt: 'Close-up of an electrical schematic drawing with a pencil resting on it',
  },
  'compliance-verification': {
    src: imgCompliance,
    alt: 'Engineer in a hard hat and high-visibility vest on a site walkdown',
  },
  'project-management': {
    src: imgPm,
    alt: 'Two engineers reviewing a technical site drawing together',
  },
  'condition-based-maintenance': {
    src: imgCbm,
    alt: 'Technician in PowSys high-visibility PPE inspecting industrial machinery',
  },
  'data-centres': {
    src: imgData,
    alt: 'Rows of data centre server racks with structured network cabling',
  },
  'commercial-sector': {
    src: imgCommercial,
    alt: 'Interior of a commercial clean room with sealed wall panels and ceiling services',
  },
  'control-panel-design': {
    src: imgPanel,
    alt: 'Close-up of an electrical schematic drawing with a pencil resting on it',
  },
  bcmi: {
    src: imgBcmi,
    alt: 'Two engineers reviewing a technical site drawing together',
  },
};
