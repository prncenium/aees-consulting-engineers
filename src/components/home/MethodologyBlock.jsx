import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import RevealGroup, { RevealItem } from '@/components/ui/Reveal';
import { methodology } from '@/data/home';
import { pad2 } from '@/lib/utils';

export default function MethodologyBlock() {
  return (
    <Section id="method">
      <SectionHeading
        eyebrow={methodology.eyebrow}
        title={methodology.heading}
        body={methodology.body}
      />

      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 lg:mt-16 lg:grid-cols-12">
        {/* Four numbered pillars */}
        <RevealGroup className="flex flex-col gap-6 lg:col-span-7" stagger={0.07}>
          {methodology.pillars.map((pillar) => (
            <RevealItem key={pillar.index} className="flex">
              <Card interactive tier="read" className="w-full">
                <div className="flex gap-5 sm:gap-6">
                  <span className="tnum inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-[0.8125rem] font-semibold text-accent-ink">
                    {pad2(pillar.index)}
                  </span>
                  <div>
                    <h3 className="text-balance">{pillar.title}</h3>
                    <p className="mt-3 max-w-prose text-copy-sm text-body">{pillar.body}</p>
                    <p className="mt-4 inline-flex rounded-full bg-white/70 px-3 py-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-eyebrow text-meta shadow-glass-sm">
                      {pillar.detail}
                    </p>
                  </div>
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Technical inventory */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Card tier="read" className="lg:sticky lg:top-28">
            <h3 className="font-display text-h4 font-semibold">{methodology.inventory.title}</h3>
            <p className="mt-2.5 text-copy-sm text-body">{methodology.inventory.note}</p>

            <dl className="mt-6 flex flex-col">
              {methodology.inventory.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-4 border-t border-hairline py-3.5"
                >
                  <dt className="text-copy-sm text-body">{item.label}</dt>
                  <dd className="tnum shrink-0 font-mono text-[0.875rem] font-semibold text-primary">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>
    </Section>
  );
}
