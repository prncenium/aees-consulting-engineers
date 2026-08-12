import Container from '@/components/ui/Container';
import GlassPanel from '@/components/ui/GlassPanel';
import StatCounter from '@/components/ui/StatCounter';
import { heroStrip } from '@/data/home';

/**
 * Glass band of counting figures, floating over the aurora bed.
 */
export default function StatStrip() {
  return (
    <section aria-label="Practice at a glance" className="relative pb-6">
      <Container>
        <GlassPanel tier="thin" radius="rounded-[2rem]" className="px-6 py-10 sm:px-10 md:py-12">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {heroStrip.map((stat, i) => (
              <div
                key={stat.label}
                className={i > 0 ? 'lg:border-l lg:border-hairline lg:pl-8' : undefined}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
                </dd>
              </div>
            ))}
          </dl>
        </GlassPanel>
      </Container>
    </section>
  );
}
