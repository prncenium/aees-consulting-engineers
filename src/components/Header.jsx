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

        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-2 text-[0.8125rem] text-meta">
            <Phone aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
            {head.phones.map((phone, i) => (
              <span key={phone} className="inline-flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true" className="text-muted">/</span> : null}
                <a
                  href={`tel:${phone.replace(/[\s-]/g, '')}`}
                  className="link-sweep font-medium transition-colors duration-200 hover:text-accent-ink"
                >
                  {phone}
                </a>
              </span>
            ))}
          </span>
          <a
            href={`mailto:${head.emails[0]}`}
            className="link-sweep inline-flex items-center gap-2 text-[0.8125rem] font-medium text-meta transition-colors duration-200 hover:text-accent-ink"
          >
            <Mail aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
            {head.emails[0]}
          </a>
        </div>
      </Container>
    </div>
  );
}
