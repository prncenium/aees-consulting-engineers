import { useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { cn, mapEmbedUrl, mapLinkUrl } from '@/lib/utils';

/**
 * Keyless Google Maps embed inside a glass frame. Renders an explicit loading
 * state (never a blank rectangle) and always offers a text link out, since an
 * embedded map is not usable by everyone.
 */
export default function MapEmbed({
  query,
  title,
  zoom = 15,
  ratio = 'aspect-[4/3]',
  className,
  showLink = true,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div
        className={cn(
          'glass-thick glass-rim relative overflow-hidden rounded-3xl p-1.5',
          ratio
        )}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-surface-2">
          {!loaded ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span aria-hidden="true" className="texture-dots absolute inset-0 opacity-70" />
              <MapPin aria-hidden="true" className="relative h-6 w-6 text-primary/50" strokeWidth={1.5} />
              <p className="relative font-mono text-[0.625rem] font-medium uppercase tracking-eyebrow text-meta">
                Loading map…
              </p>
            </div>
          ) : null}

          <iframe
            src={mapEmbedUrl(query, zoom)}
            title={title ?? `Map of ${query}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
            className={cn(
              'h-full w-full opacity-0 transition-opacity duration-500',
              loaded && 'opacity-100'
            )}
          />
        </div>
      </div>

      {showLink ? (
        <a
          href={mapLinkUrl(query)}
          target="_blank"
          rel="noreferrer noopener"
          className="link-sweep inline-flex w-fit items-center gap-2 text-small font-medium text-accent-ink transition-colors duration-200 hover:text-ink"
        >
          Open in Google Maps
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : null}
    </div>
  );
}
