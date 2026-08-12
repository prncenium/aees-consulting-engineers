import Seo from '@/components/Seo';
import Hero from '@/components/home/Hero';
import StatStrip from '@/components/home/StatStrip';
import MandateBlock from '@/components/home/MandateBlock';
import ServicesGrid from '@/components/home/ServicesGrid';
import PortfolioBand from '@/components/home/PortfolioBand';
import MilestonesBand from '@/components/home/MilestonesBand';
import MethodologyBlock from '@/components/home/MethodologyBlock';
import ProcessRow from '@/components/home/ProcessRow';
import OfficesBlock from '@/components/home/OfficesBlock';
import ClosingCta from '@/components/home/ClosingCta';
import { closingCta } from '@/data/home';

export default function Home() {
  return (
    <>
      <Seo routeKey="home" />
      <Hero />
      <StatStrip />
      <MandateBlock />
      <ServicesGrid />
      <PortfolioBand />
      <MilestonesBand />
      <MethodologyBlock />
      <ProcessRow />
      <OfficesBlock />
      <ClosingCta
        eyebrow={closingCta.eyebrow}
        heading={closingCta.heading}
        body={closingCta.body}
        primary={closingCta.primary}
        secondary={closingCta.secondary}
      />
    </>
  );
}
