import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import RevealGroup, { RevealItem } from '@/components/ui/Reveal';
import { mandate } from '@/data/home';
import { pad2 } from '@/lib/utils';

export default function MandateBlock() {
  return (
    <Section id="mandate">
      <SectionHeading eyebrow={mandate.eyebrow} title={mandate.heading} body={mandate.body} />

      <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16">
        {mandate.points.map((point, i) => (
          <RevealItem key={point.title} className="flex">
            <Card interactive tier="read" className="flex w-full flex-col">
              <span className="tnum font-mono text-[0.75rem] font-semibold tracking-eyebrow text-accent-ink">
                {pad2(i + 1)}
              </span>
              <h3 className="mt-5">{point.title}</h3>
              <p className="mt-3.5 max-w-prose text-copy-sm text-body">{point.body}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
