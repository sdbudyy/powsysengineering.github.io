/* ---------------------------------------------------------------------------
   CROSS-LINKS

   Which industries, Knowledge Centre entries and past projects belong to each
   service — and which services each industry draws on.

   Kept in one place so a new article or project only has to be wired up here,
   not hunted for across page templates. Every id below is validated at build
   time by the helpers at the bottom of this file, so a typo fails the build
   rather than rendering a dead link.
--------------------------------------------------------------------------- */

import { services, industries, projects } from './content';
import { entries } from './knowledge';

export interface ServiceLinks {
  /** Industry slugs where this service is most often applied. */
  industries: string[];
  /** Knowledge Centre entry slugs. */
  knowledge: string[];
  /** Project slugs. */
  projects: string[];
}

export const serviceLinks: Record<string, ServiceLinks> = {
  'engineering-design': {
    industries: ['oil-and-gas', 'renewable-energy', 'mining', 'utilities'],
    knowledge: ['arc-flash-studies-csa-z462', 'why-etap-models-drift', 'data-centre-power-density'],
    projects: ['rectifier-transformer-harmonic-study', 'solar-pv-1115-mwh'],
  },
  'compliance-verification': {
    industries: ['oil-and-gas', 'mining', 'utilities'],
    knowledge: ['arc-flash-studies-csa-z462', 'hazardous-area-verification-dossier'],
    projects: ['switchgear-upgrade-etap-verification'],
  },
  'project-management': {
    industries: ['oil-and-gas', 'renewable-energy', 'mining', 'utilities'],
    knowledge: ['one-person-team-model', 'solar-interconnection-lessons', 'why-etap-models-drift'],
    projects: ['solar-pv-1115-mwh'],
  },
  'condition-based-maintenance': {
    industries: ['oil-and-gas', 'mining', 'utilities'],
    knowledge: [
      'partial-discharge-testing-explained',
      'cbm-is-not-predictive-maintenance',
      'thermography-what-it-cannot-see',
    ],
    projects: ['switchgear-upgrade-etap-verification'],
  },
  'data-centres': {
    industries: ['utilities', 'commercial-buildings'],
    knowledge: ['data-centre-power-density', 'why-etap-models-drift'],
    projects: [],
  },
  'commercial-sector': {
    industries: ['commercial-buildings'],
    knowledge: ['arc-flash-studies-csa-z462', 'thermography-what-it-cannot-see'],
    projects: [],
  },
  'control-panel-design': {
    industries: ['oil-and-gas', 'mining', 'commercial-buildings'],
    knowledge: ['hazardous-area-verification-dossier', 'arc-flash-studies-csa-z462'],
    projects: ['switchgear-upgrade-etap-verification'],
  },
  bcmi: {
    industries: ['commercial-buildings'],
    knowledge: ['thermography-what-it-cannot-see', 'data-centre-power-density'],
    projects: [],
  },
};

/** Which services each industry draws on most. */
export const industryServices: Record<string, string[]> = {
  'oil-and-gas': [
    'engineering-design',
    'control-panel-design',
    'compliance-verification',
    'condition-based-maintenance',
    'project-management',
  ],
  'renewable-energy': ['engineering-design', 'project-management'],
  mining: [
    'engineering-design',
    'control-panel-design',
    'compliance-verification',
    'condition-based-maintenance',
    'project-management',
  ],
  utilities: ['engineering-design', 'condition-based-maintenance', 'data-centres'],
  'commercial-buildings': [
    'bcmi',
    'control-panel-design',
    'commercial-sector',
    'compliance-verification',
  ],
};

/* ---------------------------------------------------------------------------
   What each past project connects to. Used by the projects page to link a case
   study back to the services and industries it drew on, and out to the
   Knowledge Centre pieces that explain the technical work.
--------------------------------------------------------------------------- */

export interface ProjectLinks {
  services: string[];
  industries: string[];
  knowledge: string[];
}

export const projectLinks: Record<string, ProjectLinks> = {
  'rectifier-transformer-harmonic-study': {
    services: ['engineering-design'],
    industries: ['oil-and-gas', 'utilities'],
    knowledge: ['why-etap-models-drift', 'data-centre-power-density'],
  },
  'solar-pv-1115-mwh': {
    services: ['engineering-design', 'project-management'],
    industries: ['renewable-energy'],
    knowledge: ['solar-interconnection-lessons'],
  },
  'switchgear-upgrade-etap-verification': {
    services: ['compliance-verification', 'condition-based-maintenance'],
    industries: ['oil-and-gas', 'utilities'],
    knowledge: ['why-etap-models-drift', 'arc-flash-studies-csa-z462'],
  },
};

/* ---------------------------------------------------------------------------
   Lookup helpers. Each throws on an unknown id, so a broken cross-link is a
   build failure rather than a silently missing card.
--------------------------------------------------------------------------- */

const findOrThrow = <T>(list: T[], match: (item: T) => boolean, kind: string, id: string): T => {
  const found = list.find(match);
  if (!found) {
    throw new Error(
      `relations.ts references ${kind} "${id}", which does not exist. ` +
        `Fix the id or add the ${kind}.`
    );
  }
  return found;
};

export const getIndustry = (slug: string) =>
  findOrThrow(industries, (i) => i.slug === slug, 'industry', slug);

export const getService = (slug: string) =>
  findOrThrow(services, (s) => s.slug === slug, 'service', slug);

export const getEntry = (slug: string) =>
  findOrThrow(entries, (e) => e.slug === slug, 'knowledge entry', slug);

export const getProject = (slug: string) =>
  findOrThrow(projects, (p) => p.slug === slug, 'project', slug);
