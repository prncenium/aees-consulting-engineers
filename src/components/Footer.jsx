import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import GlassPanel from '@/components/ui/GlassPanel';
import ContactList from '@/components/ui/ContactList';
import { footer, offices, site } from '@/data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden pb-6 pt-16 md:pb-8 md:pt-24">
      {/* Background texture — decorative, sits behind the glass panel */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={footer.backgroundImage}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/45 to-surface/70" />
      </div>

      <Container>
        <GlassPanel tier="read" radius="rounded-[2rem]" className="p-8 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
            {/* Identity */}
            <div className="lg:col-span-4">
              <Logo />
              <p className="mt-6 max-w-sm text-copy-sm text-body">{footer.blurb}</p>

              <address className="mt-6 not-italic">
                <p className="text-copy-sm font-semibold text-ink">
                  {site.ownerTitle}: {site.owner}
                </p>
                <p className="mt-2 max-w-xs text-copy-sm leading-relaxed text-body">
                  {site.address.lines.join(', ')}, {site.address.city}-{site.address.postalCode},{' '}
                  {site.address.state}
                </p>
              </address>

              <div className="mt-6 flex flex-col gap-5">
                <ContactList type="phone" items={offices[0].phones} />
                <ContactList type="email" items={offices[0].emails} />
              </div>
            </div>

            {/* Link columns */}
            <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-4 lg:col-start-6">
              {footer.columns.map((column) => (
                <div key={column.title}>
                  <h2 className="font-mono text-[0.625rem] font-semibold uppercase tracking-eyebrow text-meta">
                    {column.title}
                  </h2>
                  <ul className="mt-5 flex flex-col gap-3.5">
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.label}`}>
                        <Link
                          to={link.to}
                          className="link-sweep text-copy-sm text-body transition-colors duration-200 hover:text-accent-ink"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Offices */}
            <div className="lg:col-span-3 lg:col-start-10">
              <h2 className="font-mono text-[0.625rem] font-semibold uppercase tracking-eyebrow text-meta">
                Offices
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {offices.map((office) => (
                  <li key={office.id}>
                    <p className="text-copy-sm font-medium text-ink">{office.city}</p>
                    <p className="mt-0.5 text-[0.8125rem] text-meta">{office.kind}</p>
                  </li>
                ))}
              </ul>
              {footer.social.length ? (
                <ul className="mt-7 flex flex-col gap-3">
                  {footer.social.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-sweep inline-flex items-center gap-1.5 text-copy-sm font-medium text-accent-ink transition-colors duration-200 hover:text-ink"
                      >
                        {item.label}
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          {/* Registrations */}
          <ul className="mt-12 flex flex-wrap gap-2 border-t border-hairline pt-8">
            {site.registrations.map((item) => (
              <li
                key={item}
                className="rounded-full bg-white/70 px-3 py-1.5 text-[0.75rem] text-meta shadow-glass-sm"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Legal line */}
          <div className="mt-8 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.8125rem] text-meta">
              © {year} {site.legalName} · {site.ownerTitle}: {site.owner}
            </p>
            <ul className="flex flex-wrap gap-6">
              {footer.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="link-sweep text-[0.8125rem] text-meta transition-colors duration-200 hover:text-accent-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </GlassPanel>
      </Container>
    </footer>
  );
}
