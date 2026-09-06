/* Hero photograph per industry, shared by the industries hub and the detail
   pages so both stay in sync. Alt text describes what is actually pictured. */

import imgOil from '../assets/images/oil-refinery-900x600.jpg';
import imgSolar from '../assets/images/renewables.jpg';
import imgMining from '../assets/images/mining.jpg';
import imgPower from '../assets/images/power-plant.jpg';
import imgBuildings from '../assets/images/engineer-female-900x600.jpg';

export const industryHeroes: Record<string, { src: ImageMetadata; alt: string }> = {
  'oil-and-gas': {
    src: imgOil,
    alt: 'Oil refinery with distillation columns and striped stacks against a mountain backdrop',
  },
  'renewable-energy': {
    src: imgSolar,
    alt: 'Large ground-mounted solar photovoltaic array on grassland under a clear sky',
  },
  mining: {
    src: imgMining,
    alt: 'Yellow wheel loader tipping material into a hopper at an aggregate site',
  },
  utilities: {
    src: imgPower,
    alt: 'Electrical substation with transformers, insulator stacks and switchgear',
  },
  'commercial-buildings': {
    src: imgBuildings,
    alt: 'Engineer in a hard hat and high-visibility vest carrying out a site walkdown',
  },
};
