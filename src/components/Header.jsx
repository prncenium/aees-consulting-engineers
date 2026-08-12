import { Mail, MapPin, Phone } from 'lucide-react';
import Container from '@/components/ui/Container';
import { offices, site } from '@/data/site';

/**
 * Thin utility strip above the floating navbar. Scrolls away — the sticky
 * chrome is <Navbar />. Hidden below `lg`, where the space is better spent on
 * content.
 */
export default function Header() {
  const head = offices[0];

  return (
    <div className="hidden lg:block">
      <Container className="flex h-11 items-center justify-between gap-6">
        <p className="flex items-center gap-2 text-[0.8125rem] text-meta">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} />
          {site.address.lines[1]}, {head.city}-{site.address.postalCode} — {site.descriptor}
        </p>

        <div className="flex items-center gap-7">
          <a
            href={`tel:${head.phone.replace(/\s/g, '')}`}
            className="link-sweep inline-flex items-center gap-2 text-[0.8125rem] font-medium text-meta transition-colors duration-200 hover:text-accent-ink"
          >
            <Phone aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
            {head.phone}
          </a>
          {head.phoneAlt ? (
            <a
              href={`tel:${head.phoneAlt.replace(/\s/g, '')}`}
              className="link-sweep inline-flex items-center gap-2 text-[0.8125rem] font-medium text-meta transition-colors duration-200 hover:text-accent-ink"
            >
              {head.phoneAlt}
            </a>
          ) : null}
          <a
            href={`mailto:${head.email}`}
            className="link-sweep inline-flex items-center gap-2 text-[0.8125rem] font-medium text-meta transition-colors duration-200 hover:text-accent-ink"
          >
            <Mail aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
            {head.email}
          </a>
        </div>
      </Container>
    </div>
  );
}
