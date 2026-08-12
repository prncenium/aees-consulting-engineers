/**
 * The ten core engineering sectors, exactly as the firm states them, each with
 * named sub-discipline groups rendered as chips.
 *
 * The Sectors page paginates these 4 at a time (2 x 2), so ten sectors fill
 * three pages. The jump-nav lists all ten and switches to the page holding the
 * one you pick.
 */

export const sectorsIntro = {
  eyebrow: 'Sectors',
  heading: 'Ten sectors. One standard of proof.',
  lead: 'Our services encompass ten core engineering fields, from detailed highway design and bridge engineering through to safety auditing, contract documentation and pre-bid support for BOT and EPC schemes. Most corridors draw on four or five of them at once.',
  count: 10,
  label: 'All ten sectors',
  backgroundImage:
    'https://res.cloudinary.com/dbtfi1rbi/image/upload/v1786522683/Gemini_Generated_Image_h4lz6th4lz6th4lz_bqfpy9.png',
  gridBackgroundImage:
    'https://res.cloudinary.com/dbtfi1rbi/image/upload/v1786511597/Gemini_Generated_Image_2le6xg2le6xg2le6_czyfbm.png',
};

/**
 * "In practice" band, shown between the sector cards and the closing CTA.
 * Explains that the ten sectors are not ordered from a menu — they overlap on
 * a single corridor — and lists the delivery models and roles we work under.
 */
export const sectorsInAction = {
  eyebrow: 'In practice',
  heading: 'One corridor. Five sectors at once.',
  body: 'Sectors are how we organise expertise, not how work arrives. A single four-lane upgrade will pull in highway design, structures, pavement, geo-technical investigation and safety before a drawing is issued — and project management to hold all of it together afterwards. One team carries the file, so nothing is handed between silos mid-project.',
  imageCaption: 'Corridor under construction — sectors overlapping on site, 4:5',
  imageVariant: 'bridge',
  image:
    'https://res.cloudinary.com/dbtfi1rbi/image/upload/v1786522723/Gemini_Generated_Image_8x3tq68x3tq68x3t_lnodwu.png',
  imageAlt:
    'Highway corridor under construction with fresh asphalt, a bridge pier under formwork and the completed carriageway beyond',
  example: {
    title: 'An illustrative 4-lane upgrade draws on',
    note: 'Illustrative only — sector numbers as listed above.',
    items: [
      '01 Highway Design',
      '02 Bridges & Structures',
      '05 Highway Safety',
      '06 Pavement Design',
      '07 Geo-technical & Materials',
      '09 Project Management',
    ],
  },
  models: {
    title: 'Delivery models we work across',
    items: ['EPC', 'BOT', 'DBFOT', 'HAM'],
  },
  roles: {
    title: 'Roles we take on',
    items: [
      "Authority's Engineer",
      'Independent Engineer',
      'Safety Consultant',
      'Safety Auditor',
    ],
  },
};

export const sectors = [
  {
    id: 'highway-design',
    short: 'Highway Design',
    index: '01',
    icon: 'Route',
    name: 'Detailed Engineering Design of Highway Projects',
    summary:
      'Detailed engineering for the full range of carriageways — from intermediate lanes and 2-lane roads with paved shoulders up to 8-lane dual carriageways — across greenfield expressways, bypasses and existing corridors due for upgrade.',
    groups: [
      {
        title: 'Carriageway configurations',
        items: [
          'Intermediate lane',
          '2-lane with paved shoulders',
          '4-lane',
          '6-lane',
          '8-lane dual carriageway',
        ],
      },
      {
        title: 'Road types',
        items: [
          'Greenfield access-controlled expressways',
          'Bypasses',
          'City portion improvement',
          'Himalayan & mountainous highways',
          'Major District Roads (MDR)',
          'Other District Roads (ODR)',
        ],
      },
      {
        title: 'Rehabilitation & upgrade',
        items: [
          'Geometric improvement',
          'Reconstruction',
          'Up-gradation & strengthening',
          'State & national highways',
        ],
      },
    ],
  },
  {
    id: 'structures',
    short: 'Bridges & Structures',
    index: '02',
    icon: 'Landmark',
    name: 'Structural and Bridge Design',
    summary:
      'Concrete and structural steel bridges for vehicle, rail and pedestrian use, together with the grade separators, road over bridges and interchanges that carry a corridor over everything in its way.',
    groups: [
      {
        title: 'Bridge typology',
        items: [
          'Concrete bridges',
          'Structural steel bridges',
          'Vehicular',
          'Rail',
          'Pedestrian',
        ],
      },
      {
        title: 'Methodologies',
        items: [
          'Pre-stressing',
          'Well foundations',
          'Pile foundations',
          'Voided slabs',
          'Tee beam girders',
          'Box girders',
        ],
      },
      {
        title: 'Infrastructure structures',
        items: [
          'Grade separators',
          'Road Over Bridges (ROBs)',
          'Elevated trumpet interchanges',
          'Bridge rehabilitation',
        ],
      },
    ],
  },
  {
    id: 'township',
    short: 'Township Infrastructure',
    index: '03',
    icon: 'Building2',
    name: 'Township Infrastructure Design',
    summary:
      'Infrastructure design for townships and developed layouts — internal road networks, services and the structures that sit within them, including familiarity with pre-cast housing technology.',
    groups: [
      {
        title: 'Scope',
        items: ['Township infrastructure design', 'Internal road networks'],
      },
      {
        title: 'Housing technology',
        items: ['Pre-cast housing technology'],
      },
    ],
  },
  {
    id: 'traffic',
    short: 'Traffic & Transportation',
    index: '04',
    icon: 'Waypoints',
    name: 'Traffic & Transportation Engineering',
    summary:
      'Transportation planning and traffic engineering for major highway schemes, including examination of techno-economic feasibility reports on which investment decisions rest.',
    groups: [
      {
        title: 'Planning',
        items: ['Transportation planning', 'Traffic engineering'],
      },
      {
        title: 'Studies',
        items: ['Techno-economic feasibility reports'],
      },
      {
        title: 'Application',
        items: ['Major highway schemes', 'Expressway schemes', 'Freeway schemes'],
      },
    ],
  },
  {
    id: 'safety',
    short: 'Highway Safety',
    index: '05',
    icon: 'TriangleAlert',
    name: 'Highway Safety',
    summary:
      'Acting as dedicated safety consultants and safety auditors at every project stage, on multi-lane highways and expressways across multiple states.',
    groups: [
      {
        title: 'Roles',
        items: ['Safety Consultant', 'Safety Auditor'],
      },
      {
        title: 'Audit stages',
        items: ['Design stage', 'Construction stage', 'Pre-opening', 'Existing road'],
      },
      {
        title: 'Coverage',
        items: ['Multi-lane highways', 'Expressways', 'Multi-state assignments'],
      },
    ],
  },
  {
    id: 'pavement',
    short: 'Pavement Design',
    index: '06',
    icon: 'Layers',
    name: 'Pavement Design',
    summary:
      'Pavement design for new construction, strengthening and rehabilitation — sized against traffic loading, subgrade condition and the lifecycle cost the asset will actually carry.',
    groups: [
      {
        title: 'New construction',
        items: ['Flexible pavement', 'Rigid pavement'],
      },
      {
        title: 'Existing corridors',
        items: ['Strengthening', 'Reconstruction', 'Up-gradation'],
      },
    ],
  },
  {
    id: 'geotechnical',
    short: 'Geo-technical & Materials',
    index: '07',
    icon: 'Microscope',
    name: 'Geo-technical Investigations and Material Survey & Analysis',
    summary:
      'Sub-surface investigation and materials work that establishes what the corridor is actually built on, before anything is designed on top of it.',
    groups: [
      {
        title: 'Investigation',
        items: ['Geo-technical investigation', 'Sub-surface investigation'],
      },
      {
        title: 'Materials',
        items: ['Material survey', 'Material analysis'],
      },
    ],
  },
  {
    id: 'environment',
    short: 'Environment & Social',
    index: '08',
    icon: 'Leaf',
    name: 'Environment & Social Studies',
    summary:
      'Environmental and social studies carried alongside the engineering, so clearances and community impacts are resolved on the same timeline as the design.',
    groups: [
      {
        title: 'Environmental',
        items: ['Environmental studies'],
      },
      {
        title: 'Social',
        items: ['Social studies'],
      },
    ],
  },
  {
    id: 'project-management',
    short: 'Project Management',
    index: '09',
    icon: 'ClipboardList',
    name: 'Project Management and Contract Documentation',
    summary:
      'Construction supervision as Authority’s Engineer and Independent Engineer, together with project costing, contract documentation and the preparation of re-bidding documents.',
    groups: [
      {
        title: 'Supervisory roles',
        items: [
          "Authority's Engineer",
          'Independent Engineer',
          'Construction supervision',
        ],
      },
      {
        title: 'Commercial',
        items: ['Project costing'],
      },
      {
        title: 'Documentation',
        items: ['Contract documentation', 'Re-bidding documents'],
      },
    ],
  },
  {
    id: 'bid-services',
    short: 'Pre-Bid / Post-Bid Services',
    index: '10',
    icon: 'Scale',
    name: 'Pre-Bid and Post-Bid Design Services for BOT / EPC Projects',
    summary:
      'Support on both sides of award — pre-bid studies that tell a bidder what the corridor really costs, and post-bid design services that turn a winning bid into buildable drawings.',
    groups: [
      {
        title: 'Delivery models',
        items: ['EPC', 'BOT', 'DBFOT', 'HAM'],
      },
      {
        title: 'Pre-bid',
        items: ['Pre-bid services', 'Pre-bid studies'],
      },
      {
        title: 'Post-bid',
        items: ['Post-bid design services'],
      },
    ],
  },
];

export default sectors;
