import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import RoadLine from '@/components/ui/RoadLine';
import RevealGroup, { RevealItem } from '@/components/ui/Reveal';
import { process } from '@/data/home';

export default function ProcessRow() {
  return (
    <Section id="process" tone="veil">
      <SectionHeading eyebrow={process.eyebrow} title={process.heading} align="stacked" />

      {/* The corridor, drawn — centre line animates along it */}
      <div aria-hidden="true" className="mt-10 hidden opacity-80 lg:block">
        <RoadLine height={110} />
      </div>

      <RevealGroup
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.07}
      >
        {process.stages.map((stage) => (
          <RevealItem key={stage.step} className="flex">
            <Card interactive tier="read" className="flex w-full flex-col">
              <span className="tnum inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-mono text-[0.75rem] font-semibold shadow-glow-primary">
                {stage.step}
              </span>
              <h3 className="mt-5 text-h4 font-semibold">{stage.title}</h3>
              <p className="mt-3 text-copy-sm text-body">{stage.body}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
