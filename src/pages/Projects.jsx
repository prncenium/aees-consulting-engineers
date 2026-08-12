import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import Seo from '@/components/Seo';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import GlassPanel from '@/components/ui/GlassPanel';
import ContourMark from '@/components/ui/ContourMark';
import Pagination from '@/components/ui/Pagination';
import Card from '@/components/ui/Card';
import RevealGroup, { Reveal, RevealItem } from '@/components/ui/Reveal';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectStats from '@/components/projects/ProjectStats';
import ClosingCta from '@/components/home/ClosingCta';
import { leadershipProjects, projects, projectsIntro } from '@/data/projects';
import { includesText, paginate, uniqueBy } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const PER_PAGE = 9;
const SPRING = { type: 'spring', stiffness: 150, damping: 24, mass: 0.85 };

/** Defaults; a filter at its default value is omitted from the URL. */
const DEFAULTS = { status: 'All', q: '', service: [], state: 'All', mode: 'All', sort: 'recent' };

export default function Projects() {
  const reduced = useReducedMotion();
  const [searchParams, setSearchParams] = useSearchParams();

  // ---- Filter state, read straight out of the URL --------------------------
  const filters = useMemo(
    () => ({
      status: searchParams.get('status') ?? DEFAULTS.status,
      q: searchParams.get('q') ?? DEFAULTS.q,
      services: searchParams.get('service') ? searchParams.get('service').split(',') : [],
      state: searchParams.get('state') ?? DEFAULTS.state,
      mode: searchParams.get('mode') ?? DEFAULTS.mode,
      sort: searchParams.get('sort') ?? DEFAULTS.sort,
    }),
    [searchParams]
  );

  const page = Number(searchParams.get('page') ?? 1) || 1;

  /**
   * Write filter changes back to the query string. Any filter change resets to
   * page 1; paging itself keeps everything else intact. Values equal to their
   * default are removed so shared URLs stay short.
   */
  const updateParams = useCallback(
    (next, { resetPage = true } = {}) => {
      setSearchParams(
        (previous) => {
          const params = new URLSearchParams(previous);

          Object.entries(next).forEach(([key, value]) => {
            const isEmpty =
              value === null ||
              value === undefined ||
              value === '' ||
              value === 'All' ||
              (Array.isArray(value) && value.length === 0) ||
              (key === 'sort' && value === DEFAULTS.sort);

            if (isEmpty) params.delete(key);
            else params.set(key, Array.isArray(value) ? value.join(',') : String(value));
          });

          if (resetPage) params.delete('page');
          return params;
        },
        { replace: false }
      );
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: false });
  }, [setSearchParams]);

  // ---- Derived data --------------------------------------------------------
  const states = useMemo(() => uniqueBy(projects, 'state'), []);

  const counts = useMemo(
    () => ({
      All: projects.length,
      Ongoing: projects.filter((project) => project.status === 'Ongoing').length,
      Completed: projects.filter((project) => project.status === 'Completed').length,
    }),
    []
  );

  const filtered = useMemo(() => {
    const matches = projects.filter((project) => {
      if (filters.status !== 'All' && project.status !== filters.status) return false;
      if (filters.state !== 'All' && project.state !== filters.state) return false;
      if (filters.mode !== 'All' && project.mode !== filters.mode) return false;
      if (filters.services.length && !filters.services.includes(project.service)) return false;

      if (filters.q) {
        const haystack = [
          project.name,
          project.title,
          project.ref,
          project.client,
          project.corridor,
          project.state,
          project.service,
          project.mode,
        ].join(' · ');
        if (!includesText(haystack, filters.q)) return false;
      }

      return true;
    });

    const sorters = {
      recent: (a, b) => (b.year ?? 0) - (a.year ?? 0) || a.name.localeCompare(b.name),
      oldest: (a, b) => (a.year ?? 9999) - (b.year ?? 9999) || a.name.localeCompare(b.name),
      'length-desc': (a, b) => (b.lengthKm ?? 0) - (a.lengthKm ?? 0),
      'length-asc': (a, b) => (a.lengthKm ?? 0) - (b.lengthKm ?? 0),
      name: (a, b) => a.name.localeCompare(b.name),
    };

    return [...matches].sort(sorters[filters.sort] ?? sorters.recent);
  }, [filters]);

  const view = useMemo(() => paginate(filtered, page, PER_PAGE), [filtered, page]);

  const activeFilterCount =
    (filters.status !== 'All' ? 1 : 0) +
    (filters.q ? 1 : 0) +
    filters.services.length +
    (filters.state !== 'All' ? 1 : 0) +
    (filters.mode !== 'All' ? 1 : 0) +
    (filters.sort !== DEFAULTS.sort ? 1 : 0);

  const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.045 } },
    exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: SPRING },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] } },
  };

  return (
    <>
      <Seo routeKey="projects" />

      {/* ---- Page head ---- */}
      <section className="relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-20 lg:pb-36 lg:pt-24">
        {/* Full-bleed hero background photograph — decorative, washed back so
            the headline and lead keep their contrast. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <img
            src={projectsIntro.backgroundImage}
            alt=""
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/85 via-surface/70 to-surface/92" />
          <div className="absolute inset-0 bg-surface/25" />
        </div>

        <Container>
          <div className="grid grid-cols-1 items-end gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow mb-4">{projectsIntro.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-balance">{projectsIntro.heading}</h1>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
              <p className="max-w-prose rounded-2xl bg-white/70 p-5 text-copy text-ink shadow-glass-sm backdrop-blur-sm">
                {projectsIntro.lead}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---- Register at a glance ---- */}
      <ProjectStats />

      {/* ---- Register ---- */}
      <Section id="register" tone="none" className="relative overflow-hidden pt-8 md:pt-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <img
            src={projectsIntro.registerBackgroundImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/85 via-surface/60 to-surface/90" />
        </div>

        <ProjectFilters
          filters={filters}
          counts={counts}
          states={states}
          activeCount={activeFilterCount}
          resultCount={filtered.length}
          onChange={updateParams}
          onClear={clearFilters}
        />

        <div className="mt-8">
          {filtered.length === 0 ? (
            /* ---- Empty state ---- */
            <GlassPanel
              tier="read"
              className="flex flex-col items-center gap-5 px-6 py-20 text-center"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2">
                <SearchX aria-hidden="true" className="h-6 w-6 text-meta" strokeWidth={1.75} />
              </span>
              <h2 className="text-h3 font-semibold">No projects match those filters.</h2>
              <p className="max-w-md text-copy-sm text-body">
                Try widening the status, removing a service line, or clearing the keyword. The full
                register holds {projects.length} assignments.
              </p>
              <Button variant="primary" size="md" onClick={clearFilters} className="mt-2">
                Clear all filters
              </Button>
            </GlassPanel>
          ) : (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-hairline pb-4">
                <p className="text-small font-medium text-meta">
                  Showing {view.from}–{view.to} of {view.total}
                </p>
                <p className="text-small text-meta">
                  Page {view.page} of {view.totalPages}
                </p>
              </div>

              <h2 className="sr-only">Matching projects</h2>

              <AnimatePresence mode="wait">
                <motion.ul
                  key={`${view.page}|${filters.sort}|${filters.status}|${filters.state}|${filters.mode}|${filters.q}|${filters.services.join(',')}`}
                  variants={reduced ? undefined : gridVariants}
                  initial={reduced ? false : 'hidden'}
                  animate="visible"
                  exit={reduced ? undefined : 'exit'}
                  className="relative mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                  {view.items.map((project) => (
                    <motion.li
                      key={project.id}
                      variants={reduced ? undefined : cardVariants}
                      className="flex"
                    >
                      <ProjectCard project={project} />
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>

              <div className="mt-10 flex justify-center md:justify-start">
                <Pagination
                  page={view.page}
                  totalPages={view.totalPages}
                  onChange={(next) => updateParams({ page: next }, { resetPage: false })}
                  label="Project register pagination"
                />
              </div>
            </>
          )}
        </div>
      </Section>

      {/* ---- Leadership portfolio — career credentials, not company work ---- */}
      <Section id="leadership-portfolio" className="relative overflow-hidden">
        {/* Decorative contour ornament, top-left of the section */}
        <ContourMark className="absolute -left-32 -top-28 h-[26rem] w-[26rem] rotate-180 opacity-70 sm:h-[32rem] sm:w-[32rem]" />

        <SectionHeading
          eyebrow={leadershipProjects.eyebrow}
          title={leadershipProjects.heading}
          body={leadershipProjects.body}
        />

        <div className="mt-14 flex flex-col gap-12 lg:mt-16">
          {leadershipProjects.people.map((person, personIndex) => (
            <div key={person.id} className="relative">
              {personIndex === 1 ? (
                <>
                  <ContourMark className="absolute -right-32 -top-32 h-[24rem] w-[24rem] rotate-180 opacity-70 sm:h-[30rem] sm:w-[30rem]" />
                  <ContourMark className="absolute -bottom-32 -left-32 h-[24rem] w-[24rem] opacity-70 sm:h-[30rem] sm:w-[30rem]" />
                </>
              ) : null}
              <div className="relative flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-hairline pb-4">
                <h3 className="font-display text-h3 font-semibold">{person.name}</h3>
                <p className="text-small font-medium text-accent-ink">{person.role}</p>
              </div>

              <RevealGroup
                as="ul"
                className="relative mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                stagger={0.04}
              >
                {person.items.map((item) => (
                  <RevealItem as="li" key={item.name} className="flex">
                    <Card interactive tier="read" className="flex w-full flex-col">
                      <h4 className="text-copy font-semibold leading-snug text-ink">{item.name}</h4>
                      <p className="mt-3 flex-1 text-copy-sm text-body">{item.detail}</p>
                      <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-hairline pt-4">
                        <div>
                          <dt className="font-mono text-[0.625rem] font-semibold uppercase tracking-eyebrow text-meta">
                            State
                          </dt>
                          <dd className="mt-1 text-[0.8125rem] text-ink">{item.state}</dd>
                        </div>
                        <div>
                          <dt className="font-mono text-[0.625rem] font-semibold uppercase tracking-eyebrow text-meta">
                            Client
                          </dt>
                          <dd className="mt-1 text-[0.8125rem] text-ink">{item.client}</dd>
                        </div>
                      </dl>
                    </Card>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </Section>

      <ClosingCta
        eyebrow="Enquiries"
        heading="Need details on any of these projects?"
        body="Write to us with the project or tender reference and we will respond."
        primary={{ label: 'Contact us', to: '/contact' }}
        secondary={{ label: 'About the practice', to: '/about' }}
      />
    </>
  );
}
