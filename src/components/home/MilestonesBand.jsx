import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import StatCounter from '@/components/ui/StatCounter';
import RevealGroup, { RevealItem } from '@/components/ui/Reveal';
import { milestones } from '@/data/home';

function MilestoneList({ label, items, prefix, unit }) {
  return (
    <div>
      <h3 className="font-mono text-[0.6875rem] font-semibold uppercase tracking-eyebrow text-accent-ink">
        {label}
      </h3>
      <RevealGroup className="mt-5 flex flex-col gap-5" stagger={0.06}>
        {items.map((item) => (
          <RevealItem key={item.title} className="flex">
            <Card interactive tier="read" className="w-full">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-7">
                <div className="shrink-0 sm:w-44">
                  <StatCounter
                    value={item.value}
                    decimals={item.decimals ?? 0}
                    prefix={prefix}
                    unit={item.unit ?? unit}
                    label={item.title}
                    valueClassName="text-[clamp(1.6rem,2.6vw,2.1rem)]"
                    labelClassName="sr-only"
                  />
                </div>
                <div>
                  <p className="text-copy font-semibold leading-snug text-ink">{item.title}</p>
                  <p className="mt-1 text-copy-sm text-body">{item.detail}</p>
                </div>
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

export default function MilestonesBand() {
  return (
    <Section id="milestones" tone="none" className="relative overflow-hidden">
      {/* Background texture — decorative, sits behind the glass cards */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={milestones.backgroundImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/85 via-surface/55 to-surface/85" />
      </div>

      <SectionHeading
        eyebrow={milestones.eyebrow}
        title={milestones.heading}
        body={milestones.body}
      />

      <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-8">
        <MilestoneList label={milestones.valueLabel} items={milestones.values} prefix="₹ " />
        <MilestoneList label={milestones.distanceLabel} items={milestones.distances} />
      </div>
    </Section>
  );
}
