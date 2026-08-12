import { useMemo } from 'react';
import Container from '@/components/ui/Container';
import GlassPanel from '@/components/ui/GlassPanel';
import StatCounter from '@/components/ui/StatCounter';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';

/**
 * Register summary band, between the page head and the filters.
 *
 * Every figure is DERIVED from the register itself rather than typed in, so it
 * can never drift out of step with the data — add or remove a project and
 * these numbers move with it.
 *
 * The corridor length deliberately says "recorded", because it only sums the
 * entries where a chainage was given; several assignments have none.
 */
export default function ProjectStats() {
  const stats = useMemo(() => {
    const ongoing = projects.filter((p) => p.status === 'Ongoing').length;
    const completed = projects.filter((p) => p.status === 'Completed').length;

    const states = new Set(
      projects.map((p) => p.state).filter((state) => state && state !== 'Not specified')
    );

    const withLength = projects.filter((p) => typeof p.lengthKm === 'number');
    const totalKm = withLength.reduce((sum, p) => sum + p.lengthKm, 0);

    return [
      { label: 'Total projects', value: projects.length },
      { label: 'Ongoing', value: ongoing },
      { label: 'Completed', value: completed },
      { label: 'States covered', value: states.size },
      {
        label: 'Corridor km recorded',
        value: Math.round(totalKm),
        unit: 'km',
        note: `across ${withLength.length} of ${projects.length} entries`,
      },
    ];
  }, []);

  return (
    <section aria-label="Project register at a glance" className="pb-8 md:pb-10">
      <Container>
        <GlassPanel
          tier="thin"
          radius="rounded-[2rem]"
          className="px-6 py-9 sm:px-9 md:py-11"
        >
          <dl className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  i > 0 && 'sm:border-l sm:border-hairline sm:pl-6',
                  i === 3 && 'sm:border-l-0 sm:pl-0 lg:border-l lg:pl-6'
                )}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <StatCounter
                    value={stat.value}
                    unit={stat.unit}
                    label={stat.label}
                    valueClassName="text-[clamp(1.85rem,3.4vw,2.6rem)]"
                  />
                  {stat.note ? (
                    <p className="mt-1.5 text-[0.75rem] leading-snug text-meta">{stat.note}</p>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </GlassPanel>
      </Container>
    </section>
  );
}
