import { ArrowUpRight, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import ContactList from '@/components/ui/ContactList';
import MapEmbed from '@/components/ui/MapEmbed';
import RevealGroup, { Reveal, RevealItem } from '@/components/ui/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import { contactIntro, formIntro, responsePromise } from '@/data/contact';
import { contactChannels, offices, site } from '@/data/site';
import { getIcon } from '@/lib/icons';
import { mapLinkUrl } from '@/lib/utils';

export default function Contact() {
  const head = offices[0];

  return (
    <>
      <Seo routeKey="contact" />

      {/* ---- Page head ---- */}
      <section className="relative overflow-hidden bg-primary py-16 md:py-24 lg:py-28">
        {/* Warm interior lighting so the flat graphite reads as a lit surface */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,rgba(255,255,255,0.16),transparent_55%),radial-gradient(ellipse_at_88%_92%,rgba(255,107,53,0.30),transparent_58%)]"
        />
        <div aria-hidden="true" className="texture-dots pointer-events-none absolute inset-0 opacity-[0.18]" />

        <Container className="relative">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-small">
                {contactIntro.breadcrumb.map((crumb, i) => (
                  <li key={crumb.label} className="flex items-center gap-2">
                    {i > 0 ? (
                      <ChevronRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-white/40"
                        strokeWidth={2}
                      />
                    ) : null}
                    {crumb.to ? (
                      <Link
                        to={crumb.to}
                        className="link-sweep text-white/65 transition-colors duration-200 hover:text-white"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="font-medium text-white">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-8 flex items-center gap-3 font-mono text-eyebrow font-medium uppercase tracking-eyebrow text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent/70" />
              {contactIntro.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-4xl text-balance text-white">
              {contactIntro.headingBefore}
              <span className="text-accent">{contactIntro.accentWord}</span>
              {contactIntro.headingAfter}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-2xl text-copy text-white/80">{contactIntro.lead}</p>
          </Reveal>
        </Container>
      </section>

      {/* ---- Channel cards ---- */}
      <Section id="channels" className="py-10 md:py-14">
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {contactChannels.map((channel) => {
            const Icon = getIcon(channel.icon);
            return (
              <RevealItem key={channel.id} className="flex">
                <Card interactive tier="read" className="flex w-full flex-col">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-tint text-primary shadow-glass-sm">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h2 className="mt-5 text-small font-semibold text-meta">{channel.label}</h2>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {channel.values.map((entry) => (
                      <li key={entry.value}>
                        <a
                          href={entry.href}
                          className="link-sweep w-fit break-all text-copy font-semibold text-ink transition-colors duration-200 hover:text-accent-ink"
                        >
                          {entry.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3.5 flex-1 text-copy-sm text-body">{channel.note}</p>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* ---- Form + office info ---- */}
      <Section id="enquiry" tone="veil">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={formIntro.eyebrow}
              title={formIntro.heading}
              body={formIntro.body}
              align="stacked"
              className="mb-8"
            />
            <ContactForm />
          </div>

          <aside className="lg:col-span-5 lg:col-start-8" aria-labelledby="office-info-heading">
            <Card tier="read" className="lg:sticky lg:top-28">
              <h2 id="office-info-heading" className="text-small font-semibold text-accent-ink">
                {head.kind}
              </h2>

              <address className="mt-4 not-italic">
                <p className="font-display text-h4 font-semibold text-ink">
                  {head.city}, {head.state}
                </p>
                <div className="mt-2.5 text-copy-sm text-body">
                  {head.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </div>
                <p className="mt-4 border-t border-hairline pt-4 text-copy-sm text-body">
                  <span className="font-semibold text-ink">{site.ownerTitle}:</span> {site.owner}
                </p>
              </address>

              <dl className="mt-7 border-t border-hairline pt-6">
                <dt className="flex items-center gap-2 text-small font-semibold text-ink">
                  <Clock aria-hidden="true" className="h-4 w-4 text-muted" strokeWidth={1.75} />
                  Office hours
                </dt>
                <dd className="mt-3.5 flex flex-col gap-2.5">
                  {head.hours.map((entry) => (
                    <span key={entry.days} className="flex justify-between gap-4 text-copy-sm">
                      <span className="text-body">{entry.days}</span>
                      <span className="tnum shrink-0 font-mono text-[0.8125rem] text-meta">
                        {entry.time}
                      </span>
                    </span>
                  ))}
                </dd>
              </dl>

              <dl className="mt-7 border-t border-hairline pt-6">
                <dt className="text-small font-semibold text-ink">What to expect</dt>
                <dd className="mt-3.5 flex flex-col gap-2.5">
                  {responsePromise.map((entry) => (
                    <span key={entry.label} className="flex justify-between gap-4 text-copy-sm">
                      <span className="text-body">{entry.label}</span>
                      <span className="shrink-0 font-mono text-[0.8125rem] text-meta">
                        {entry.value}
                      </span>
                    </span>
                  ))}
                </dd>
              </dl>
            </Card>
          </aside>
        </div>
      </Section>

      {/* ---- All offices + live map ---- */}
      <Section id="find-us">
        <SectionHeading
          eyebrow="Find us"
          title={`${site.address.lines[1]}, ${site.address.city}.`}
          body={`${site.ownerTitle}: ${site.owner}. ${site.address.full}. Visits are by appointment — call ahead and we will have the right engineer in the room.`}
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <MapEmbed
              query={head.mapQuery}
              title={`Map showing the AEES head office in ${head.city}`}
              ratio="aspect-[4/3] lg:aspect-[16/10]"
            />
          </div>

          <div className="lg:col-span-5">
            <RevealGroup className="flex flex-col gap-6" stagger={0.06}>
              {offices.map((office) => (
                <RevealItem key={office.id} className="flex">
                  <Card interactive tier="read" className="w-full">
                    <p className="text-small font-semibold text-accent-ink">{office.kind}</p>
                    <h3 className="mt-2 text-h4 font-semibold">
                      {office.city}, {office.state}
                    </h3>
                    <div className="mt-2 text-copy-sm text-body">
                      {office.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-col gap-4">
                      <ContactList type="phone" items={office.phones} />
                      <ContactList type="email" items={office.emails} />
                    </div>
                    <a
                      href={mapLinkUrl(office.mapQuery)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-sweep mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-accent-ink transition-colors duration-200 hover:text-ink"
                    >
                      Directions
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </Card>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>
    </>
  );
}
