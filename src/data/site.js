/**
 * Global site content: brand, navigation, offices, contact channels, footer.
 * Edit anything here and it updates everywhere — no component hardcodes copy.
 */

export const site = {
  name: 'AEES Consulting Engineers',
  shortName: 'AEES',
  legalName: 'AEES Consulting Engineers',
  owner: 'Mohita Mohan Garnaik',
  ownerTitle: 'Owner',
  tagline: 'Economical, practical, constructable engineering',
  descriptor: 'Civil · Highway · Infrastructure Consultancy',
  founded: 2016,
  /** Single source of truth for the registered address. */
  address: {
    lines: ['Plot No. 2018/5839, Lane-2', 'Niladri Nagar, Jharpada'],
    city: 'Bhubaneswar',
    state: 'Odisha',
    postalCode: '751006',
    country: 'India',
    full: 'Plot No. 2018/5839, Lane-2, Niladri Nagar, Jharpada, Bhubaneswar-751006, Odisha',
    mapQuery: 'Niladri Nagar, Jharpada, Bhubaneswar, Odisha 751006, India',
  },
  url: 'https://www.aeesconsulting.in',
  defaultOgImage: '/og-default.jpg',
  registrations: [
    'Established 2016',
    'Structural & civil engineering consultancy',
    'Clients include NHAI, PWD Govt. of Odisha & NIT Rourkela',
    '36 listed projects',
  ],
};

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Sectors', to: '/sectors' },
  { label: 'Projects', to: '/projects' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

export const contactChannels = [
  {
    id: 'general',
    icon: 'Mail',
    label: 'General enquiries',
    value: 'aeesbbsr@gmail.com',
    href: 'mailto:aeesbbsr@gmail.com',
    note: 'Answered within one working day.',
  },
  {
    id: 'phone',
    icon: 'Phone',
    label: 'Office switchboard',
    value: '+91 99370 35596',
    href: 'tel:+919937035596',
    note: 'Mon–Sat, 09:30–18:30 IST.',
  },
  {
    id: 'careers',
    icon: 'Users',
    label: 'Careers',
    value: 'mmgarnaik@gmail.com',
    href: 'mailto:mmgarnaik@gmail.com',
    note: 'Highway, structures, geotech and survey roles.',
  },
];

export const offices = [
  {
    id: 'bhubaneswar',
    kind: 'Registered & head office',
    city: site.address.city,
    state: site.address.state,
    lines: [...site.address.lines, `${site.address.city}-${site.address.postalCode}`],
    phone: '+91 99370 35596',
    phoneAlt: '+91 94374 63577',
    email: 'aeesbbsr@gmail.com',
    emailAlt: 'mmgarnaik@gmail.com',
    mapQuery: site.address.mapQuery,
    hours: [
      { days: 'Monday – Friday', time: '09:30 – 18:30 IST' },
      { days: 'Saturday', time: '10:00 – 15:00 IST' },
      { days: 'Sunday & public holidays', time: 'Closed' },
    ],
  },
];

export const footer = {
  backgroundImage:
    'https://res.cloudinary.com/dbtfi1rbi/image/upload/v1786512060/Gemini_Generated_Image_xif67bxif67bxif6_lnorgp.png',
  blurb:
    'An independent consultancy of highway, bridge and transport engineers working with national and state road authorities, concessionaires and public institutions.',
  columns: [
    {
      title: 'Company',
      links: [
        { label: 'Sectors', to: '/sectors' },
        { label: 'Project register', to: '/projects' },
        { label: 'About us', to: '/about' },
        { label: 'Contact', to: '/contact' },
      ],
    },
    {
      title: 'Core services',
      links: [
        { label: 'Detailed project reports', to: '/sectors' },
        { label: 'Authority engineer', to: '/sectors' },
        { label: 'Construction supervision', to: '/sectors' },
      ],
    },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aees-consulting-engineers' },
  ],
  legal: [
    { label: 'Privacy', to: '/contact' },
    { label: 'Terms', to: '/contact' },
  ],
};

export const trustChips = [
  'Established 2016',
  'NHAI · PWD Odisha · NIT Rourkela',
  'Product-based project execution',
  '36 listed projects',
];
