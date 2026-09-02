/* ---------------------------------------------------------------------------
   CAREERS

   Openings, culture pillars and requirement lists are taken verbatim (lightly
   re-punctuated) from the careers page of the existing powsysengineering.com.

   ⚠️  THE DATES NEED CONFIRMING. Each listing on the current site shows
   14/09/2026, which is in the future. It is unclear whether that is a posting
   date, a closing date, or a placeholder left in the old CMS. Until someone
   confirms which, `datesVerified` stays false: the date is shown on the page
   under a neutral label and is deliberately NOT emitted as `datePosted` in the
   JobPosting structured data, because a future `datePosted` is invalid and
   Google will reject the listing.
--------------------------------------------------------------------------- */

export const datesVerified = false;

export interface Opening {
  slug: string;
  title: string;
  department: string;
  location: string;
  /** ISO date as shown on the current site — meaning unconfirmed. */
  date: string;
  employmentType: string;
  summary: string;
  requirements: string[];
}

export const openings: Opening[] = [
  {
    slug: 'electrical-engineer',
    title: 'Electrical Engineer',
    department: 'Engineering',
    location: 'Calgary, Alberta',
    date: '2026-09-14',
    employmentType: 'FULL_TIME',
    summary:
      'Contribute to studies and analyses, and help prepare the detailed designs, drawings, specifications, calculations and reports that our engineering work is delivered on.',
    requirements: [
      'Bachelor’s degree in Electrical Engineering',
      'Identify issues and problems using strong problem-solving skills, develop appropriate solutions, and ask for assistance if required',
      'Demonstrated ability to learn quickly; highly inquisitive and driven to broaden your knowledge base',
      'Contribute to appropriate studies and analyses, and recommend actions',
      'Assist with the preparation of detailed designs and drawings, specifications, data, calculations and reports',
      'Deliver electrical engineering services meeting PowSys Engineering’s, its customers’ and applicable statutory and regulatory specifications',
      'Ability to work as part of a team and on your own initiative',
      'Excellent Microsoft Office knowledge',
      'Good time management',
      'Excellent communication skills',
    ],
  },
  {
    slug: 'marketing-executive',
    title: 'Marketing Executive',
    department: 'Marketing and Sales',
    location: 'Calgary, Alberta',
    date: '2026-09-14',
    employmentType: 'FULL_TIME',
    summary:
      'Turn complex engineering topics into content that lands with technical and non-technical audiences alike, across campaigns, whitepapers, blogs and social.',
    requirements: [
      'Bachelor’s degree in Electrical Engineering, Business Administration or equivalent business education and experience preferred',
      '1+ years of experience in content creation — technical marketing, engineering service marketing, or engineering content development',
      'Excellent writing skills and a passion for storytelling and digital content',
      'Experience transforming complex topics into digestible concepts for all levels of audience',
      'Experience developing engineering marketing campaigns: social posts, messaging, whitepapers, blogs, eBooks, videos and webcasts',
      'Strong knowledge of engineering services, solutions, compliance and the regulations landscape in North America',
      'Ability to work as part of a team and on your own initiative',
      'Excellent Microsoft Office knowledge',
      'Good time management',
      'Excellent communication skills; self-starter, self-directed and highly motivated',
    ],
  },
  {
    slug: 'engineering-draftsman',
    title: 'Engineering Draftsman',
    department: 'CAD / CAM',
    location: 'Calgary, Alberta',
    date: '2026-09-14',
    employmentType: 'FULL_TIME',
    summary:
      'Produce the engineering designs and drawings that sit behind our design and detailed engineering work, primarily in AutoCAD.',
    requirements: [
      'Minimum of 3 years’ experience, or equivalent relevant experience',
      'A diploma in CAD Drafting or Engineering Design and Drafting, with experience in the oil and gas drafting industry',
      'Experience in engineering designs and drawings',
      'Ability to work as part of a team and on your own initiative',
      'Excellent AutoCAD, Microsoft Office and design sketch knowledge',
      'Good time management',
      'Excellent communication skills',
    ],
  },
];

/* Culture pillars, verbatim from the existing careers page. */
export const culturePillars = [
  {
    title: 'Safety first',
    detail:
      'The highest safety standards for employees and clients alike, on every site and in every design decision.',
  },
  {
    title: 'Recognition and reward',
    detail:
      'Contribution is noticed. We recruit, nurture and develop people to deliver continuous improvement, and we say so.',
  },
  {
    title: 'Learning organisation',
    detail:
      'Broadening the knowledge base is part of the job, not something done in spare time.',
  },
  {
    title: 'Teamwork',
    detail:
      'A safe, supportive, teamwork-based environment where every team member is a hands-on contributor.',
  },
];
