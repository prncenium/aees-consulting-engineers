import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import MapEmbed from '@/components/ui/MapEmbed';
import { offices, site } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * Office locations with a live, keyless Google Maps embed. Selecting an office
 * swaps the map — implemented as a tab list so it is keyboard-operable.
 */
export default function OfficesBlock() {
  const [activeId, setActiveId] = useState(offices[0].id);
  const active = offices.find((office) => office.id === activeId) ?? offices[0];

  return (
    <Section id="offices">
      <SectionHeading
        eyebrow="Location"
        title={`Find us in ${offices[0].city}.`}
        body={`${site.ownerTitle}: ${site.owner}. ${site.address.full}.`}
      />

      <div className="mt-14 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div role="tablist" aria-label="Select an office" className="flex flex-col gap-3">
            {offices.map((office, index) => {
              const selected = office.id === active.id;
              return (
                <button
                  key={office.id}
                  role="tab"
                  type="button"
                  id={`office-tab-${office.id}`}
                  aria-selected={selected}
                  aria-controls={`office-panel-${office.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(office.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                      event.preventDefault();
                      setActiveId(offices[(index + 1) % offices.length].id);
                    }
                    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                      event.preventDefault();
                      setActiveId(offices[(index - 1 + offices.length) % offices.length].id);
                    }
                  }}
                  className={cn(
                    'glass-rim cursor-pointer rounded-3xl px-6 py-5 text-left transition-all duration-300 ease-fluid',
                    selected
                      ? 'glass-read -translate-y-[1px] shadow-glass-lg'
                      : 'glass-thin hover:-translate-y-[1px] hover:bg-white/80'
                  )}
                >
                  <span className="text-[0.8125rem] font-medium text-meta">{office.kind}</span>
                  <span
                    className={cn(
                      'mt-1.5 block font-display text-h4 font-semibold',
                      selected ? 'text-accent-ink' : 'text-ink'
                    )}
                  >
                    {office.city}, {office.state}
                  </span>
                </button>
              );
            })}
          </div>

          <Card
            tier="read"
            role="tabpanel"
            id={`office-panel-${active.id}`}
            aria-labelledby={`office-tab-${active.id}`}
            className="mt-6"
          >
            <address className="flex flex-col gap-4 not-italic">
              <p className="flex items-start gap-3 text-copy-sm text-body">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-muted"
                  strokeWidth={1.75}
                />
                <span>
                  {active.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <a
                href={`tel:${active.phone.replace(/\s/g, '')}`}
                className="link-sweep inline-flex w-fit items-center gap-3 text-copy-sm font-medium text-ink transition-colors duration-200 hover:text-accent-ink"
              >
                <Phone aria-hidden="true" className="h-4 w-4 text-muted" strokeWidth={1.75} />
                {active.phone}
              </a>
              <a
                href={`mailto:${active.email}`}
                className="link-sweep inline-flex w-fit items-center gap-3 text-copy-sm font-medium text-ink transition-colors duration-200 hover:text-accent-ink"
              >
                <Mail aria-hidden="true" className="h-4 w-4 text-muted" strokeWidth={1.75} />
                {active.email}
              </a>
            </address>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <MapEmbed
            key={active.id}
            query={active.mapQuery}
            title={`Map showing the AEES ${active.city} office`}
            ratio="aspect-[4/3] lg:aspect-[3/2]"
          />
        </div>
      </div>
    </Section>
  );
}
