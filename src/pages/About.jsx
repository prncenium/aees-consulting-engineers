import { ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import GlassPanel from '@/components/ui/GlassPanel';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Placeholder from '@/components/ui/Placeholder';
import ContourMark from '@/components/ui/ContourMark';
import GridMark from '@/components/ui/GridMark';
import RevealGroup, { Reveal, RevealItem } from '@/components/ui/Reveal';
import ClosingCta from '@/components/home/ClosingCta';
import {
  aboutCta,
  aboutHero,
  aboutSectorsIntro,
  culture,
  disciplines,
  foundingFacts,
  leadership,
  ownership,
  story,
  teamIntro,
  timeline,
  workEthic,
} from '@/data/about';
import { sectors } from '@/data/sectors';
import { site } from '@/data/site';
import { getIcon } from '@/lib/icons';

export default function About() {
  return (
    <>
      <Seo routeKey="about" />

      {/* ---- Wide banner image, then the page heading beneath it ---- */}
      <section className="relative pb-10 pt-8 md:pb-14 md:pt-12">
        <Container>
          {/* IMAGE SLOT — wide 21:9 banner in a glass frame */}
          <Reveal>
            <Placeholder
              variant={aboutHero.imageVariant}
              caption={aboutHero.imageCaption}
              src={aboutHero.image}
              alt={aboutHero.imageAlt}
              ratio="21/9"
              radius="rounded-[2rem] sm:rounded-[2.5rem]"
              className="min-h-[220px]"
              loading="eager"
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 items-end gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow mb-4">{aboutHero.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-balance">{aboutHero.heading}</h1>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
              <p className="max-w-prose text-copy text-body">{aboutHero.lead}</p>
              <address className="mt-6 max-w-prose rounded-2xl bg-white/70 p-4 not-italic shadow-glass-sm">
                <p className="text-small font-semibold text-ink">
                  {site.ownerTitle}: {site.owner}
                </p>
                <p className="mt-1.5 text-copy-sm leading-relaxed text-body">
                  {site.address.full}
                </p>
              </address>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---- Ownership — named, up front ---- */}
      <Section id="ownership" className="py-10 md:py-14">
        <Reveal>
          <GlassPanel
            tier="thick"
            radius="rounded-[2rem]"
            className="overflow-hidden px-6 py-10 sm:px-10 sm:py-12"
          >
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-accent" />

            <div className="grid grid-cols-1 items-center gap-x-12 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="eyebrow">{ownership.eyebrow}</p>
                <p className="mt-5 font-mono text-[0.6875rem] font-semibold uppercase tracking-eyebrow text-meta">
                  {ownership.label}
                </p>
                <h2 className="mt-2 text-balance">{ownership.name}</h2>
                <p className="mt-3 text-copy font-semibold text-accent-ink">{ownership.title}</p>
                <p className="mt-1.5 text-copy-sm text-meta">{ownership.credentials}</p>
                <p className="mt-6 max-w-prose text-copy text-body">{ownership.body}</p>
              </div>

              <dl className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9">
                {ownership.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-2xl bg-white/70 px-5 py-4 shadow-glass-sm"
                  >
                    <dt className="font-mono text-[0.625rem] font-semibold uppercase tracking-eyebrow text-meta">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 text-copy font-semibold text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </GlassPanel>
        </Reveal>
      </Section>

      {/* ---- Founding facts, at a glance ---- */}
      <Section id="founded" className="pt-4 md:pt-6">
        <RevealGroup
          as="dl"
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
          stagger={0.05}
        >
          {foundingFacts.map((fact) => (
            <RevealItem key={fact.label} className="flex">
              <Card interactive tier="thin" radius="rounded-2xl" className="w-full">
                <dt className="font-mono text-[0.625rem] font-semibold uppercase tracking-eyebrow text-meta">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-copy-sm font-semibold leading-snug text-ink">
                  {fact.value}
                </dd>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---- Founding story ---- */}
      <Section id="story" className="relative overflow-hidden pt-6 md:pt-10">
        {/* Decorative contour ornament, bottom-left of the founding story */}
        <ContourMark className="absolute -bottom-32 -left-32 h-[30rem] w-[30rem] opacity-80 sm:h-[36rem] sm:w-[36rem] lg:h-[42rem] lg:w-[42rem]" />

        <div className="relative grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">{story.eyebrow}</p>
            <h2 className="text-balance">{story.heading}</h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <RevealGroup className="flex flex-col gap-5">
              {story.paragraphs.map((paragraph, i) => (
                <RevealItem key={i}>
                  <p className="max-w-prose text-copy text-body">{paragraph}</p>
                </RevealItem>
              ))}
            </RevealGroup>

          </div>
        </div>
      </Section>

      {/* ---- Year timeline ---- */}
      <Section id="timeline" tone="veil">
        <SectionHeading
          eyebrow="Timeline"
          title="From 2016, in order."
          body="A short record of how the firm was built — when it was established, when each capability was added, and what changed along the way."
        />

        <RevealGroup className="mt-14 flex flex-col gap-5 lg:mt-16" stagger={0.05}>
          <ol className="flex flex-col gap-5">
            {timeline.map((entry) => (
              <RevealItem as="li" key={entry.year} className="flex">
                <Card interactive tier="read" className="w-full">
                  <div className="grid grid-cols-1 items-baseline gap-x-8 gap-y-2 sm:grid-cols-[5.5rem_1fr] lg:grid-cols-[6rem_minmax(0,20rem)_1fr]">
                    <span className="tnum inline-flex w-fit rounded-full bg-primary-tint px-3 py-1.5 font-mono text-[0.8125rem] font-semibold leading-none text-primary">
                      {entry.year}
                    </span>
                    <h3 className="text-h4 font-semibold">{entry.title}</h3>
                    <p className="max-w-prose text-copy-sm text-body">{entry.body}</p>
                  </div>
                </Card>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>
      </Section>

      {/* ---- Leadership ---- */}
      <Section id="leadership" className="relative overflow-hidden">
        <ContourMark className="absolute -right-32 -top-32 h-[26rem] w-[26rem] rotate-180 opacity-70 sm:h-[32rem] sm:w-[32rem]" />
        <ContourMark className="absolute -bottom-32 -left-32 h-[26rem] w-[26rem] opacity-70 sm:h-[32rem] sm:w-[32rem]" />

        <SectionHeading
          eyebrow="Leadership"
          title="The people who sign the drawings."
          body="The expertise of the firm is driven by its two lead engineers. Every technical submission carries one of these signatures or is reviewed against it."
        />

        <RevealGroup
          className="relative mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16"
          stagger={0.07}
        >
          {leadership.map((person) => (
            <RevealItem key={person.id} className="flex">
              <Card interactive tier="read" className="flex w-full flex-col">
                <div className="flex flex-1 flex-col">
                  <span
                    aria-hidden="true"
                    className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft font-display text-[1.5rem] font-bold tracking-tight text-accent-ink shadow-glass-sm"
                  >
                    {person.name
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')}
                  </span>
                  <p className="text-small font-semibold text-accent-ink">{person.role}</p>
                  <h3 className="mt-2 text-h4 font-semibold">{person.name}</h3>
                  <p className="mt-1 text-[0.8125rem] text-meta">
                    {person.shortName} · {person.discipline}
                  </p>

                  <dl className="mt-5 flex flex-col gap-3 border-t border-hairline pt-5">
                    <div>
                      <dt className="font-mono text-[0.625rem] font-semibold uppercase tracking-eyebrow text-meta">
                        Education
                      </dt>
                      <dd className="mt-1 text-copy-sm text-ink">{person.education}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.625rem] font-semibold uppercase tracking-eyebrow text-meta">
                        Experience
                      </dt>
                      <dd className="mt-1 text-copy-sm text-ink">{person.experience}</dd>
                    </div>
                  </dl>

                  <p className="mt-5 flex-1 text-copy-sm text-body">{person.bio}</p>

                  <p className="mt-5 font-mono text-[0.625rem] font-semibold uppercase tracking-eyebrow text-meta">
                    Expertise
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {person.expertise.map((item) => (
                      <li key={item}>
                        <Badge>{item}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ---- How the firm works ---- */}
      <Section id="work-ethic" tone="veil">
        <SectionHeading
          eyebrow={workEthic.eyebrow}
          title={workEthic.heading}
          body={workEthic.body}
        />

        <RevealGroup
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
          stagger={0.06}
        >
          {workEthic.points.map((point, i) => (
            <RevealItem key={point.title} className="flex">
              <Card interactive tier="read" className="flex w-full flex-col">
                <span className="tnum inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft font-mono text-[0.8125rem] font-semibold text-accent-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-balance">{point.title}</h3>
                <p className="mt-3.5 flex-1 text-copy-sm text-body">{point.body}</p>
              </Card>
            </RevealItem>
          ))}

          {/* Work environment sits in the same grid as the sixth cell */}
          <RevealItem className="flex">
            <Card tier="thick" className="flex w-full flex-col justify-center">
              <p className="eyebrow">{culture.eyebrow}</p>
              <h3 className="mt-4 text-balance">{culture.heading}</h3>
              <p className="mt-3.5 text-copy-sm text-body">{culture.body}</p>
            </Card>
          </RevealItem>
        </RevealGroup>
      </Section>

      {/* ---- Sectors overview ---- */}
      <Section id="sectors-overview">
        <SectionHeading
          eyebrow={aboutSectorsIntro.eyebrow}
          title={aboutSectorsIntro.heading}
          body={aboutSectorsIntro.body}
          actions={
            <Button to={aboutSectorsIntro.cta.to} variant="secondary" size="md">
              {aboutSectorsIntro.cta.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
            </Button>
          }
        />

        <RevealGroup
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
          stagger={0.04}
        >
          {sectors.map((sector) => {
            const Icon = getIcon(sector.icon);
            return (
              <RevealItem key={sector.id} className="flex">
                <Card interactive tier="thin" className="flex w-full items-start gap-4" radius="rounded-2xl">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-tint text-primary">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-mono text-[0.625rem] font-semibold tracking-eyebrow text-meta">
                      {sector.index}
                    </p>
                    <h3 className="mt-1 text-copy font-semibold leading-snug text-ink">
                      {sector.short}
                    </h3>
                    <p className="mt-1 text-[0.8125rem] leading-snug text-meta">{sector.name}</p>
                  </div>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* ---- Team disciplines ---- */}
      <Section id="disciplines" className="relative overflow-hidden">
        {/* Decorative survey-grid ornament */}
        <GridMark className="absolute -left-24 top-0 h-[24rem] w-[24rem] opacity-70 sm:h-[30rem] sm:w-[30rem]" />
        <GridMark className="absolute -right-28 -bottom-24 h-[22rem] w-[22rem] rotate-180 opacity-60 sm:h-[28rem] sm:w-[28rem]" />

        <div className="relative grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">{teamIntro.eyebrow}</p>
            <h2 className="text-balance">{teamIntro.heading}</h2>
            <p className="mt-5 max-w-prose text-copy-sm text-body">{teamIntro.body}</p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Card tier="read">
              <RevealGroup as="ul" className="flex flex-col" stagger={0.035}>
                {disciplines.map((discipline, i) => (
                  <RevealItem
                    as="li"
                    key={discipline.name}
                    className={`flex items-center gap-4 py-3.5 ${i > 0 ? 'border-t border-hairline' : ''}`}
                  >
                    <span className="tnum w-7 shrink-0 font-mono text-[0.75rem] font-semibold text-accent-ink">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-copy-sm text-body">{discipline.name}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Card>
          </div>
        </div>
      </Section>


      <ClosingCta
        eyebrow={aboutCta.eyebrow}
        heading={aboutCta.heading}
        body={aboutCta.body}
        primary={aboutCta.primary}
        secondary={aboutCta.secondary}
      />
    </>
  );
}
