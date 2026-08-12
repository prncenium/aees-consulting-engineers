import { site } from '@/data/site';

/**
 * Per-route SEO copy. Keys match the route path.
 * <Seo routeKey="about" /> reads from here.
 */
export const seo = {
  home: {
    title: `${site.name} — Highway & Infrastructure Consultancy`,
    description:
      'AEES Consulting Engineers delivers detailed project reports, authority engineer services, construction supervision and road safety audits for national and state highway programmes across India.',
    path: '/',
  },
  about: {
    title: `About Us — ${site.name}`,
    description: `Established in 2016 and owned by ${site.owner}, AEES Consulting Engineers is an independent consultancy of highway, bridge and transport engineers based at ${site.address.full}.`,
    path: '/about',
  },
  sectors: {
    title: `Sectors — ${site.name}`,
    description:
      'Ten core engineering sectors: detailed highway design, structural and bridge design, township infrastructure, traffic and transportation, highway safety, pavement design, geo-technical investigation, environment and social studies, project management and pre-bid/post-bid services for BOT and EPC projects.',
    path: '/sectors',
  },
  projects: {
    title: `Project Register — ${site.name}`,
    description:
      'A searchable register of completed and ongoing AEES assignments: corridor, length, client, state and delivery mode for every project.',
    path: '/projects',
  },
  contact: {
    title: `Contact Us — ${site.name}`,
    description: `Reach AEES Consulting Engineers at ${site.address.full}. Enquiries, tenders, pre-qualification credentials and careers.`,
    path: '/contact',
  },
  notFound: {
    title: `Page not found — ${site.name}`,
    description: 'The page you requested could not be found on the AEES Consulting Engineers site.',
    path: '/404',
    noIndex: true,
  },
  error: {
    title: `Something went wrong — ${site.name}`,
    description: 'An unexpected error occurred while loading this page.',
    path: '/error',
    noIndex: true,
  },
};

export default seo;
