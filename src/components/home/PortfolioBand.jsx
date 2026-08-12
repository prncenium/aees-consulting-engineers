import Container from '@/components/ui/Container';
import GlassPanel from '@/components/ui/GlassPanel';
import StatCounter from '@/components/ui/StatCounter';
import RevealGroup, { RevealItem } from '@/components/ui/Reveal';
import { portfolioBand } from '@/data/home';

/**
 * Portfolio-by-numbers: a wide glass band sitting over the aurora bed.
 */
export default function PortfolioBand() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="py-16 md:py-24">
      <Container>
        <GlassPanel
          tier="thick"
          radius="rounded-[2rem] sm:rounded-[2.5rem]"
          className="px-6 py-12 sm:px-10 md:py-14 lg:px-14"
        >
          <div className="grid grid-cols-1 items-end gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow mb-4">{portfolioBand.eyebrow}</p>
              <h2 id="portfolio-heading" className="text-balance">
                {portfolioBand.heading}
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="max-w-prose text-copy-sm text-body">{portfolioBand.body}</p>
            </div>
          </div>

          <RevealGroup
            as="dl"
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6"
            stagger={0.05}
          >
            {portfolioBand.stats.map((stat) => (
              <RevealItem key={stat.label} className="border-t border-hairline pt-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <StatCounter
                    value={stat.value}
                    prefix={stat.prefix ?? ''}
                    suffix={stat.suffix ?? ''}
                    unit={stat.unit}
                    label={stat.label}
                    valueClassName="text-[clamp(1.75rem,3vw,2.4rem)]"
                  />
                </dd>
              </RevealItem>
            ))}
          </RevealGroup>
        </GlassPanel>
      </Container>
    </section>
  );
}
