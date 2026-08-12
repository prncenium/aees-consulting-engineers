import { site } from '@/data/site';

/** About page content. */

export const aboutHero = {
  eyebrow: 'About us',
  heading: 'Founded in 2016 to do one thing properly.',
  lead: `AEES Consulting Engineers was established in 2016 by a group of professional engineers, for the express purpose of providing specialised services in the structural and civil engineering fields. The practice is owned by ${site.owner} and has operated from ${site.address.city} since its formation.`,
  imageCaption: 'Wide banner — corridor survey team at first light, 21:9',
  imageVariant: 'road',
  image:
    'https://res.cloudinary.com/dbtfi1rbi/image/upload/v1786522003/Gemini_Generated_Image_aqup8raqup8raqup_c7ylzd.png',
  imageAlt:
    'Survey team with a total station on an empty highway corridor at first light, mist over the fields either side',
};

/** Ownership panel — the first thing on the page after the heading. */
export const ownership = {
  eyebrow: 'Ownership',
  label: 'Owner',
  name: site.owner,
  title: 'Owner · Lead Highway Engineer cum Safety Expert',
  credentials:
    'Graduate in Civil Engineering · Master’s in Transportation Engineering · Over 22 years of experience',
  body: `AEES Consulting Engineers is owned and led by ${site.owner}. The firm was established in 2016 and has been held under the same ownership ever since, operating from ${site.address.full}.`,
  facts: [
    { label: 'Owner', value: site.owner },
    { label: 'Established', value: '2016' },
    { label: 'Registered office', value: `${site.address.city}, ${site.address.state}` },
  ],
};

/** The founding facts, surfaced as a small record card set. */
export const foundingFacts = [
  { label: 'Established', value: '2016' },
  { label: 'Owner', value: site.owner },
  { label: 'Registered office', value: `${site.address.city}, ${site.address.state}` },
  { label: 'Founded by', value: 'A group of professional engineers' },
  { label: 'Formed to provide', value: 'Structural & civil engineering services' },
];

export const story = {
  eyebrow: 'Founding story',
  heading: 'A specialist firm, deliberately founded as one.',
  paragraphs: [
    'AEES Consulting Engineers came into being in 2016. It was not a general practice that drifted into infrastructure — it was formed by a group of professional engineers with an express purpose: to provide specialised services in the structural and civil engineering fields.',
    `The firm has been owned throughout by ${site.owner}, a highway engineer with more than 22 years in design, construction supervision and execution. The registered office is at ${site.address.full}.`,
    'The firm prides itself on the positive and vibrant attitude expressed by all staff members, both in and out of the office environment.',
    'Today the practice carries 36 listed projects — 21 ongoing and 15 completed — for ten corporate and government clients including NHAI, PWD Government of Odisha and NIT Rourkela, delivered by a core of ten key professionals.',
  ],
};

export const timeline = [
  {
    year: '2016',
    title: 'The firm is established',
    body: `AEES Consulting Engineers is founded by a group of professional engineers for the express purpose of providing specialised services in the structural and civil engineering fields, owned by ${site.owner}.`,
  },
  {
    year: '2016',
    title: 'Registered in Bhubaneswar',
    body: `The practice takes its registered office at ${site.address.full}, from where it operates today.`,
  },
  {
    year: 'Today',
    title: 'Ten years of practice',
    body: '36 listed projects — 21 ongoing and 15 completed — for ten corporate and government clients including NHAI, PWD Government of Odisha and NIT Rourkela, delivered by ten key professionals.',
  },
];

/** How the firm works — operational philosophy. */
export const workEthic = {
  eyebrow: 'How the firm works',
  heading: 'Functionally sound. Economically feasible. Practical.',
  body: 'Five commitments govern how every assignment is run, from the first reconnaissance to the end of the defect liability period.',
  points: [
    {
      title: 'Economy of design',
      body: 'Economy of design sits at the absolute forefront of the work ethic.',
    },
    {
      title: 'Problem-solving, combined',
      body: 'Our main objective is to combine all applicable problem-solving skills to provide solutions that are functionally sound, economically feasible and practical — while holding a high standard of technical excellence.',
    },
    {
      title: 'Technology plus hands-on knowledge',
      body: 'We combine the latest technology in analysis and computer-aided design systems with a practical, hands-on approach rooted in deep construction industry knowledge.',
    },
    {
      title: 'Designed for local constructability',
      body: 'We deliver optimised, innovative and state-of-the-art designs for infrastructure and major structures, specifically adapted for local, economic constructability.',
    },
    {
      title: 'A quality policy across the life cycle',
      body: 'We establish healthy, long-lasting client relationships by committing to excellence, to sustainable development, and to adapting as times change, across the entire project life cycle.',
    },
  ],
};

export const culture = {
  eyebrow: 'Inside the firm',
  heading: 'A positive and vibrant place to work.',
  body: 'The firm prides itself on the attitude expressed by all staff members, both in and out of the office environment.',
};

export const leadership = [
  {
    id: 'm-garnaik',
    name: 'Mohita Mohan Garnaik',
    shortName: 'Mr. Mohit Garnaik',
    role: 'Owner · Lead Highway Engineer cum Safety Expert',
    discipline: 'Highway engineering & road safety',
    education: 'Graduate in Civil Engineering · Master’s in Transportation Engineering',
    experience: '22+ years',
    bio: 'Over 22 years of experience in the design, construction supervision and execution of major and minor projects in India and abroad. He translates project requirements into innovative, cost-effective formulations.',
    expertise: [
      'Highway design',
      'Transportation planning',
      'Highway safety audits',
      'Project costing',
      'Pre-bid studies',
      'National Highways, Expressways & freeway schemes',
    ],
    imageCaption: 'Portrait 4:5',
  },
  {
    id: 'r-prusty',
    name: 'Rajesh Prusty',
    shortName: 'Mr. Rajesh Prusty',
    role: 'Lead Structural Engineer',
    discipline: 'Bridges & structures',
    education: 'Graduate in Civil Engineering · Master’s in Structural Engineering',
    experience: '18+ years',
    bio: 'Over 18 years of experience in design, construction supervision and project planning. He ensures every structural design aligns strictly with the governing specifications and manuals.',
    expertise: [
      'Pre-stressing',
      'Well & pile foundations',
      'Box girders',
      'Grade separators',
      'Road Over Bridges (ROBs)',
      'Bridge rehabilitation works',
    ],
    imageCaption: 'Portrait 4:5',
  },
];

export const disciplines = [
  { name: 'Detailed engineering design of highway projects' },
  { name: 'Structural and bridge design' },
  { name: 'Township infrastructure design' },
  { name: 'Traffic & transportation engineering' },
  { name: 'Highway safety' },
  { name: 'Pavement design' },
  { name: 'Geo-technical investigation & materials' },
  { name: 'Environment & social studies' },
  { name: 'Project management & contract documentation' },
  { name: 'Pre-bid & post-bid services for BOT / EPC' },
];

export const teamIntro = {
  eyebrow: 'Team',
  heading: 'Ten key professionals across ten disciplines.',
  body: 'The firm is led by ten key professionals and engineers. These are the fields their work covers.',
};

export const aboutSectorsIntro = {
  eyebrow: 'Where we work',
  heading: 'Ten sectors, one engineering culture.',
  body: 'The practice is organised into ten core engineering sectors so that specialist depth survives scale. Each sector holds its own standards library and review discipline.',
  cta: { label: 'See all ten sectors', to: '/sectors' },
};

export const aboutCta = {
  eyebrow: 'Work with us',
  heading: 'Bring us the file nobody wants to open.',
  body: `Feasibility that has stalled, a design that needs a second signature, a corridor with a dispute on it. Write to us, or visit the office at ${site.address.full}.`,
  primary: { label: 'Contact the practice', to: '/contact' },
  secondary: { label: 'Review our sectors', to: '/sectors' },
};
