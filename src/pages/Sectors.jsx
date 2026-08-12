import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Seo from '@/components/Seo';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import Pagination from '@/components/ui/Pagination';
import Placeholder from '@/components/ui/Placeholder';
import RevealGroup, { Reveal, RevealItem } from '@/components/ui/Reveal';
import ClosingCta from '@/components/home/ClosingCta';
import { sectors, sectorsInAction, sectorsIntro } from '@/data/sectors';
import { getIcon } from '@/lib/icons';
import { cn, paginate } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const PER_PAGE = 4;
const SPRING = { type: 'spring', stiffness: 140, damping: 24, mass: 0.9 };

export default function Sectors() {
  const reduced = useReducedMotion();
  const [page, setPage] = useState(1);
  const [focusedId, setFocusedId] = useState(null);

  const view = useMemo(() => paginate(sectors, page, PER_PAGE), [page]);

  /** Jump-nav: switch to the page holding the requested sector. */
  const jumpTo = (sectorId) => {
    const index = sectors.findIndex((sector) => sector.id === sectorId);
    if (index < 0) return;
    setPage(Math.floor(index / PER_PAGE) + 1);
    setFocusedId(sectorId);
  };

  const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
    exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: SPRING },
    exit: { opacity: 0, y: -14, transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] } },
  };

  return (
    <>
      <Seo routeKey="sectors" />

      {/* ---- Page head ---- */}
      <section className="pb-0 pt-10 md:pt-14">
        <Container>
          <div className="grid grid-cols-1 items-end gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-4">{sectorsIntro.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-balance">{sectorsIntro.heading}</h1>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="max-w-prose text-copy text-body">{sectorsIntro.lead}</p>
            </Reveal>
          </div>
        </Container>

        {/* Full-bleed banner beneath the heading */}
        <Reveal delay={0.14} className="mt-10 md:mt-14">
          <div className="relative h-[280px] w-full overflow-hidden sm:h-[380px] lg:h-[460px]">
            <img
              src={sectorsIntro.backgroundImage}
              alt="Aerial view of a highway interchange, ramps curving across the frame"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-surface to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* ---- Jump navigation across every sector ---- */}
      <Section id="sector-index" className="py-8 md:py-10">
        <nav aria-label="Jump to a sector">
          <h2 className="text-small font-semibold text-ink">{sectorsIntro.label}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {sectors.map((sector, index) => {
              const sectorPage = Math.floor(index / PER_PAGE) + 1;
              const active = focusedId === sector.id || sectorPage === page;
              return (
                <li key={sector.id}>
                  <Chip
                    selected={active}
                    onClick={() => jumpTo(sector.id)}
                    aria-label={`Show ${sector.name} — page ${sectorPage}`}
                  >
                    <span
                      className={cn(
                        'font-mono text-[0.6875rem]',
                        active ? 'text-white/70' : 'text-muted'
                      )}
                    >
                      {sector.index}
                    </span>
                    {sector.short}
                  </Chip>
                </li>
              );
            })}
          </ul>
        </nav>
      </Section>

      {/* ---- Paginated 2 x 2 grid ---- */}
      <Section id="sectors" tone="none" className="relative overflow-hidden pt-8 md:pt-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <img
            src={sectorsIntro.gridBackgroundImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/85 via-surface/60 to-surface/90" />
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="text-small font-medium text-meta">
            Showing {view.from}–{view.to} of {view.total}
          </p>
          <p className="text-small text-meta">
            Page {view.page} of {view.totalPages}
          </p>
        </div>

        <div className="mt-6 min-h-[540px]">
          <AnimatePresence mode="wait">
            <motion.ul
              key={view.page}
              variants={reduced ? undefined : gridVariants}
              initial={reduced ? false : 'hidden'}
              animate="visible"
              exit={reduced ? undefined : 'exit'}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {view.items.map((sector) => {
                const Icon = getIcon(sector.icon);
                const isFocused = focusedId === sector.id;
                return (
                  <motion.li
                    key={sector.id}
                    variants={reduced ? undefined : cardVariants}
                    className="flex"
                  >
                    <Card
                      interactive
                      tier="read"
                      className={cn(
                        'flex w-full flex-col',
                        isFocused && 'ring-2 ring-inset ring-accent/40'
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-tint text-primary shadow-glass-sm">
                          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[0.75rem] font-semibold tracking-eyebrow text-meta">
                          {sector.index}
                        </span>
                      </div>

                      <p className="mt-6 font-mono text-[0.625rem] font-semibold uppercase tracking-eyebrow text-accent-ink">
                        {sector.short}
                      </p>
                      <h2 className="mt-2 text-balance text-h3 font-semibold">{sector.name}</h2>
                      <p className="mt-3.5 text-copy-sm text-body">{sector.summary}</p>

                      <div className="mt-7 flex flex-1 flex-col gap-5 border-t border-hairline pt-6">
                        {sector.groups.map((group) => (
                          <div key={group.title}>
                            <h3 className="text-[0.8125rem] font-semibold text-ink">
                              {group.title}
                            </h3>
                            <ul className="mt-2.5 flex flex-wrap gap-2">
                              {group.items.map((item) => (
                                <li key={item}>
                                  <Chip className="text-[0.75rem]">{item}</Chip>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center md:justify-start">
          <Pagination
            page={view.page}
            totalPages={view.totalPages}
            onChange={(next) => {
              setPage(next);
              setFocusedId(null);
            }}
            label="Sector pagination"
          />
        </div>
      </Section>

      {/* ---- In practice: how the sectors combine on one corridor ---- */}
      <Section id="in-practice">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-10 lg:grid-cols-12">
          {/* IMAGE SLOT — corridor photograph, glass-framed */}
          <Reveal className="lg:col-span-5">
            <Placeholder
              variant={sectorsInAction.imageVariant}
              caption={sectorsInAction.imageCaption}
              src={sectorsInAction.image}
              alt={sectorsInAction.imageAlt}
              ratio="4/5"
              radius="rounded-[2rem]"
            />
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow mb-4">{sectorsInAction.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-balance">{sectorsInAction.heading}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-prose text-copy text-body">{sectorsInAction.body}</p>
            </Reveal>

            <RevealGroup className="mt-9 flex flex-col gap-6" stagger={0.07}>
              <RevealItem className="flex">
                <Card tier="read" className="w-full">
                  <h3 className="text-small font-semibold text-ink">
                    {sectorsInAction.example.title}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {sectorsInAction.example.items.map((item) => (
                      <li key={item}>
                        <Chip>{item}</Chip>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.8125rem] text-meta">
                    {sectorsInAction.example.note}
                  </p>
                </Card>
              </RevealItem>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <RevealItem className="flex">
                  <Card tier="thin" className="w-full">
                    <h3 className="text-small font-semibold text-ink">
                      {sectorsInAction.models.title}
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {sectorsInAction.models.items.map((item) => (
                        <li key={item}>
                          <Chip>{item}</Chip>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </RevealItem>

                <RevealItem className="flex">
                  <Card tier="thin" className="w-full">
                    <h3 className="text-small font-semibold text-ink">
                      {sectorsInAction.roles.title}
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {sectorsInAction.roles.items.map((item) => (
                        <li key={item}>
                          <Chip>{item}</Chip>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </RevealItem>
              </div>
            </RevealGroup>
          </div>
        </div>
      </Section>

      <ClosingCta
        eyebrow="Scoping"
        heading="Not sure which sectors your project touches?"
        body="Most corridors draw on four or five at once. Send the brief and we will map the disciplines your assignment actually needs — and the ones it does not."
        primary={{ label: 'Send a brief', to: '/contact' }}
        secondary={{ label: 'See past assignments', to: '/projects' }}
      />
    </>
  );
}
