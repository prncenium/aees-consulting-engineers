import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Placeholder from '@/components/ui/Placeholder';
import RevealGroup, { RevealItem } from '@/components/ui/Reveal';
import { services, servicesBackground } from '@/data/home';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

/**
 * Asymmetric bento grid. `size` on each service controls its span:
 *   wide -> 2 columns, tall -> 2 rows, normal -> 1 x 1.
 */
const SPANS = {
  wide: 'lg:col-span-2',
  tall: '',
  normal: '',
};

export default function ServicesGrid() {
  return (
    <Section id="services" tone="none" className="relative overflow-hidden">
      {/* Background texture — decorative, sits behind the glass cards */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={servicesBackground}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/85 via-surface/60 to-surface/90" />
      </div>

      <SectionHeading
        eyebrow="What we do"
        title="Services, arranged the way projects actually arrive."
        body="Most authorities come to us with a corridor and a deadline rather than a neat service line. These are the mandates that follow."
        actions={
          <Button to="/sectors" variant="secondary" size="md">
            Explore all ten sectors
          </Button>
        }
      />

      <RevealGroup
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        stagger={0.06}
      >
        {services.map((service) => {
          const Icon = getIcon(service.icon);
          return (
            <RevealItem key={service.id} className={cn('flex', SPANS[service.size] ?? '')}>
              <Card interactive tier="read" className="flex w-full flex-col">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-tint text-primary shadow-glass-sm">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                </span>

                <h3 className="mt-6 text-balance">{service.title}</h3>
                <p className="mt-3.5 text-copy-sm text-body">{service.body}</p>

                {/* IMAGE SLOT — optional supporting photograph */}
                {service.imageCaption ? (
                  <Placeholder
                    variant={service.imageVariant}
                    caption={service.imageCaption}
                    src={service.image}
                    alt={service.imageAlt}
                    ratio={service.imageRatio ?? '16/9'}
                    radius="rounded-2xl"
                    className="mt-6"
                  />
                ) : null}

                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {service.tags.map((tag) => (
                    <li key={tag}>
                      <Badge>{tag}</Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
