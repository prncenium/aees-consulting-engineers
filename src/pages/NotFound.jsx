import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '@/components/Seo';
import Container from '@/components/ui/Container';
import GlassPanel from '@/components/ui/GlassPanel';
import RoadLine from '@/components/ui/RoadLine';
import { Reveal } from '@/components/ui/Reveal';
import { notFound } from '@/data/notFound';

export default function NotFound() {
  return (
    <>
      <Seo routeKey="notFound" />

      <section className="py-14 md:py-20">
        <Container>
          <GlassPanel
            tier="thick"
            radius="rounded-[2rem] sm:rounded-[2.5rem]"
            className="overflow-hidden px-6 py-14 sm:px-10 md:py-18 lg:px-14"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 opacity-60">
              <RoadLine height={140} />
            </div>

            <div className="relative grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Reveal>
                  <p className="font-mono text-[clamp(3rem,10vw,5.5rem)] font-semibold leading-none tracking-tight text-accent-ink/25">
                    {notFound.code}
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <p className="eyebrow mt-7">{notFound.eyebrow}</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h1 className="mt-4 text-balance">{notFound.heading}</h1>
                </Reveal>
                <Reveal delay={0.15}>
                  <p className="mt-5 max-w-prose text-copy text-body">{notFound.body}</p>
                </Reveal>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <h2 className="text-small font-semibold text-ink">Try one of these</h2>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {notFound.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="group flex items-center justify-between gap-6 rounded-2xl bg-white/70 px-5 py-4 shadow-glass-sm transition-all duration-300 ease-fluid hover:-translate-y-[1px] hover:bg-white hover:shadow-glass"
                      >
                        <span>
                          <span className="block text-copy font-semibold text-ink transition-colors duration-200 group-hover:text-accent-ink">
                            {link.label}
                          </span>
                          <span className="mt-0.5 block text-copy-sm text-body">{link.note}</span>
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-ink"
                          strokeWidth={2}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassPanel>
        </Container>
      </section>
    </>
  );
}
