import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import GlassPanel from '@/components/ui/GlassPanel';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Reusable closing call-to-action band, used on Home, About, Sectors and
 * Projects. A deep primary panel so the accent CTA has something to sit on.
 */
export default function ClosingCta({ eyebrow, heading, body, primary, secondary }) {
  return (
    <section aria-labelledby="closing-cta-heading" className="py-16 md:py-24">
      <Container>
        <GlassPanel
          tier="thick"
          radius="rounded-[2rem] sm:rounded-[2.5rem]"
          className="overflow-hidden bg-primary/95 px-6 py-14 sm:px-10 md:py-16 lg:px-14"
        >
          {/* Interior haze so the flat graphite reads as a lit surface */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(255,255,255,0.18),transparent_55%),radial-gradient(ellipse_at_85%_90%,rgba(255,107,53,0.28),transparent_58%)]"
          />

          <div className="relative grid grid-cols-1 items-end gap-x-12 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="font-mono text-eyebrow font-medium uppercase tracking-eyebrow text-white/70">
                  {eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 id="closing-cta-heading" className="mt-5 text-balance text-white">
                  {heading}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-prose text-copy text-white/85">{body}</p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
              <div className="flex flex-wrap gap-3.5 lg:justify-end">
                <Button to={primary.to} size="lg" variant="primary">
                  {primary.label}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
                </Button>
                {secondary ? (
                  <Button
                    to={secondary.to}
                    size="lg"
                    variant="secondary"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  >
                    {secondary.label}
                  </Button>
                ) : null}
              </div>
            </Reveal>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}
