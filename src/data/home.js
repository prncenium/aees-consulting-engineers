/**
 * Home page content. `accentWord` is the single terracotta keyword in the H1.
 */

export const hero = {
  eyebrow: 'Consulting engineers · Established 2016',
  headlineBefore: 'Designs that are ',
  accentWord: 'economical',
  headlineAfter: ', practical and built to last.',
  lead: 'AEES Consulting Engineers combines the latest analysis and CAD technology with hands-on construction industry experience. We deliver optimised, innovative and state-of-the-art designs adapted for local economic constructability — on time and within budget.',
  primaryCta: { label: 'View the project register', to: '/projects' },
  secondaryCta: { label: 'Talk to an engineer', to: '/contact' },
  imageCaption: 'Hero image — corridor at dusk, 4:5',
  imageVariant: 'road',
  backgroundImage:
    'https://res.cloudinary.com/dbtfi1rbi/image/upload/v1786510980/Gemini_Generated_Image_qgm683qgm683qgm6_shp6i1.png',
  image:
    'https://res.cloudinary.com/dbtfi1rbi/image/upload/v1786513806/Gemini_Generated_Image_j5mc2kj5mc2kj5mc_tppxj8.png',
  imageAlt: 'Civil engineer in hard hat and high-visibility vest on a highway site at golden hour',
  imageCaptionPending: 'Hero image — engineers on site, 4:5',
};

export const heroStrip = [
  { label: 'Ongoing projects', value: 21, suffix: '' },
  { label: 'Completed projects', value: 15, suffix: '' },
  { label: 'Corporate & govt. clients', value: 10, suffix: '' },
  { label: 'Key professionals', value: 10, suffix: '' },
];

/**
 * "How the Company Really Works" — the operational philosophy. Rendered by
 * <MandateBlock />.
 */
export const mandate = {
  eyebrow: 'How the company really works',
  heading: 'Economy of design, at the forefront of the work ethic.',
  body: 'Our approach is not a slogan. It is a method: a product-based execution model, problem-solving that stays economically feasible, and designs proven against how things actually get built on site.',
  points: [
    {
      title: 'Product-based approach',
      body: 'Project execution is organised around a defined product rather than an open-ended service. That is what keeps assignments completed on time and within budget.',
    },
    {
      title: 'Economic and practical design',
      body: 'Economy of design sits at the forefront of our work ethic. We combine problem-solving skills to deliver solutions that are functionally sound, economically feasible and practical.',
    },
    {
      title: 'Technology with a hands-on core',
      body: 'The latest technology in analysis and computer-aided design is combined with a practical approach rooted in real construction industry experience — not modelling in isolation.',
    },
    {
      title: 'Specialised, constructable expertise',
      body: 'We provide optimised, innovative and state-of-the-art designs specifically adapted for local economic constructability, so the drawing survives contact with the site.',
    },
    {
      title: 'A quality policy that adapts',
      body: 'Our quality policy focuses on adapting to changing times, on sustainable development, and on establishing healthy, long-lasting relationships with our clients.',
    },
  ],
};

/** Background texture behind the services section. */
export const servicesBackground =
  'https://res.cloudinary.com/dbtfi1rbi/image/upload/v1786511597/Gemini_Generated_Image_2le6xg2le6xg2le6_czyfbm.png';

export const services = [
  {
    id: 'highway-design',
    icon: 'Route',
    title: 'Detailed Engineering Design of Highway Projects',
    body: 'Detailed engineering across the full range of carriageways — intermediate lane, 2-lane with paved shoulders, 4-lane, 6-lane and 8-lane dual carriageways — for greenfield access-controlled expressways, bypasses, city portions and district roads.',
    tags: ['Expressways', 'Bypasses', 'MDR & ODR'],
    size: 'wide',
    imageCaption: 'Corridor design review',
    imageVariant: 'clipboard',
    imageRatio: '16/9',
    image:
      'https://res.cloudinary.com/dbtfi1rbi/image/upload/v1786510979/Gemini_Generated_Image_sgc4onsgc4onsgc4_y1zysr.png',
    imageAlt:
      'Highway alignment drawings and cross-sections spread across a design office desk with a scale rule',
  },
  {
    id: 'structures',
    icon: 'Landmark',
    title: 'Structural and Bridge Design',
    body: 'Concrete and structural steel bridges for vehicular, rail and pedestrian use, together with grade separators, Road Over Bridges and elevated trumpet interchanges.',
    tags: ['Box girders', 'ROBs', 'Grade separators'],
    size: 'tall',
    imageCaption: 'Bridge deck under construction',
    imageVariant: 'bridge',
    imageRatio: '4/5',
    image:
      'https://res.cloudinary.com/dbtfi1rbi/image/upload/v1786510979/Gemini_Generated_Image_5slr5q5slr5q5slr_th4td9.png',
    imageAlt:
      'Concrete highway bridge under construction, precast box girders resting on tall round piers',
  },
  {
    id: 'safety',
    icon: 'TriangleAlert',
    title: 'Highway Safety',
    body: 'Acting as Safety Consultant and Safety Auditor for projects at various stages, on multi-lane highways and expressways across multiple states.',
    tags: ['Safety audit', 'Multi-state'],
    size: 'normal',
  },
  {
    id: 'traffic',
    icon: 'Waypoints',
    title: 'Traffic & Transportation Engineering',
    body: 'Transportation planning and traffic engineering for major highway schemes, including examination of techno-economic feasibility reports.',
    tags: ['Planning', 'Feasibility'],
    size: 'normal',
  },
  {
    id: 'project-management',
    icon: 'ClipboardList',
    title: 'Project Management & Contract Documentation',
    body: 'Construction supervision as Authority’s Engineer and Independent Engineer, with project costing, contract documentation and preparation of re-bidding documents.',
    tags: ["Authority's Engineer", 'Independent Engineer'],
    size: 'normal',
  },
  {
    id: 'bid-services',
    icon: 'Scale',
    title: 'Pre-Bid and Post-Bid Design Services for BOT / EPC Projects',
    body: 'Pre-bid services and post-bid design services across EPC, BOT, DBFOT and HAM projects, alongside geo-technical investigation, material survey and analysis, pavement design, township infrastructure and environment and social studies.',
    tags: ['EPC', 'BOT', 'DBFOT', 'HAM'],
    size: 'wide',
  },
];

export const portfolioBand = {
  eyebrow: 'Portfolio by numbers',
  heading: 'Since 2016, measured.',
  body: 'Company portfolio as listed, together with the experience the leadership team brings to every assignment.',
  stats: [
    { label: 'Years in practice', value: 10, suffix: '+' },
    { label: 'Total listed projects', value: 36, suffix: '' },
    { label: 'Ongoing projects', value: 21, suffix: '' },
    { label: 'Completed projects', value: 15, suffix: '' },
    { label: 'Corporate & govt. clients', value: 10, suffix: '' },
    { label: 'Key professionals', value: 10, suffix: '' },
  ],
};

/**
 * Leadership portfolio highlights — the scale of work the team has handled.
 * Rendered by <MilestonesBand />.
 */
export const milestones = {
  eyebrow: 'Leadership portfolio',
  heading: 'The scale our engineers have worked at.',
  backgroundImage:
    'https://res.cloudinary.com/dbtfi1rbi/image/upload/v1786511597/Gemini_Generated_Image_2le6xg2le6xg2le6_czyfbm.png',
  body: 'Project milestones from the leadership team’s past experience across national expressways, state highway programmes and BOT corridors.',
  valueLabel: 'Top project valuations',
  values: [
    {
      value: 3750,
      unit: 'cr',
      title: 'Agra – Lucknow Access Controlled Expressway',
      detail: 'Supervision of the 6/8-lane expressway',
    },
    {
      value: 1400,
      unit: 'cr',
      title: 'NH-8A extension, Gandhidham – Mundra Port',
      detail: '4/6-laning · 71.4 km',
    },
    {
      value: 1372,
      unit: 'cr',
      title: 'Indore – Gujarat/MP Border Section',
      detail: '4-laning · 161 km',
    },
    {
      value: 985,
      unit: 'cr',
      title: 'Cuttack – Angul Section',
      detail: '4-laning on BOT basis · 112 km',
    },
    {
      value: 953.8,
      unit: 'cr',
      decimals: 1,
      title: 'NH-8A, Samakhiyali – Gandhidham',
      detail: '6-laning · 56 km',
    },
  ],
  distanceLabel: 'Infrastructure distances',
  distances: [
    {
      value: 750,
      unit: 'km',
      title: 'Selected State Highways, Madhya Pradesh',
      detail: 'Rehabilitation and up-gradation',
    },
    {
      value: 390,
      unit: 'km',
      title: 'Chhattisgarh State Roads Project',
      detail: 'Rehabilitation of Phase-II roads',
    },
    {
      value: 253,
      unit: 'km',
      title: 'Ganga Expressway',
      detail: 'Engineering and design · 8-lane with 2-lane service roads',
    },
    {
      value: 180,
      unit: 'km',
      title: 'Himalayan Highways, Uttaranchal',
      detail: 'Construction from Mussoorie – Maletha Road',
    },
  ],
};

export const methodology = {
  eyebrow: 'The engineers behind the work',
  heading: 'Two lead engineers. Forty years between them.',
  body: 'The expertise of the firm is driven by its two lead engineers. Every technical submission carries one of these signatures or is reviewed against it.',
  pillars: [
    {
      index: 1,
      title: 'Mohita Mohan Garnaik — Lead Highway Engineer cum Safety Expert',
      body: 'Over 22 years of experience in the design, construction supervision and execution of major and minor projects in India and abroad. Highway design, transportation planning, highway safety audits, project costing and pre-bid studies for National Highways, Expressways and freeway schemes.',
      detail: 'Graduate in Civil Engineering · Master’s in Transportation Engineering',
    },
    {
      index: 2,
      title: 'Rajesh Prusty — Lead Structural Engineer',
      body: 'Over 18 years of experience in design, construction supervision and project planning. Familiar with modern bridge construction methods — pre-stressing, well and pile foundations, box girders — along with grade separators, Road Over Bridges and the rehabilitation of bridge works.',
      detail: 'Graduate in Civil Engineering · Master’s in Structural Engineering',
    },
  ],
  inventory: {
    title: 'The firm in figures',
    note: 'Company portfolio and team as listed.',
    items: [
      { label: 'Lead Highway Engineer experience', value: '22+ yrs' },
      { label: 'Lead Structural Engineer experience', value: '18+ yrs' },
      { label: 'Key professionals on the team', value: '10' },
      { label: 'Corporate & government clients', value: '10' },
      { label: 'Ongoing projects', value: '21' },
      { label: 'Completed projects', value: '15' },
      { label: 'Practice established', value: '2016' },
    ],
  },
};

export const process = {
  eyebrow: 'Delivery models',
  heading: 'The contract models we work under.',
  stages: [
    {
      step: 'EPC',
      title: 'Engineering, Procurement & Construction',
      body: 'Design and supervision support on EPC packages, including pre-bid services and post-bid design services.',
    },
    {
      step: 'BOT',
      title: 'Build – Operate – Transfer',
      body: 'Consultancy on BOT corridors, including the Authority’s Engineer and Independent Engineer roles.',
    },
    {
      step: 'DBFOT',
      title: 'Design – Build – Finance – Operate – Transfer',
      body: 'Design and advisory services on concession-based schemes delivered under the DBFOT model.',
    },
    {
      step: 'HAM',
      title: 'Hybrid Annuity Model',
      body: 'Design, supervision and contract documentation support on projects procured under the Hybrid Annuity Model.',
    },
  ],
};

export const closingCta = {
  eyebrow: 'Next step',
  heading: 'Have a corridor, a bid deadline, or a second opinion to seek?',
  body: 'Send the scope and the timeline. You will get a named engineer, an honest read on feasibility, and a written response — not a sales call.',
  primary: { label: 'Start a conversation', to: '/contact' },
  secondary: { label: 'Browse past assignments', to: '/projects' },
};
