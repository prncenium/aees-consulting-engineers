import { Link } from 'react-router-dom';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

/**
 * Wordmark + mark. The mark is an abstracted "A" as a carriageway, with an
 * accent centre line dropping out of it.
 */
export function LogoMark({ className, title = 'AEES' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={cn('h-9 w-9', className)}
      fill="none"
    >
      <rect width="64" height="64" rx="15" className="fill-primary" />
      <path
        d="M10 52 L27 12 L37 12 L54 52"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M21 34 H43" stroke="#FF6B35" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M32 42 V52"
        stroke="#FF6B35"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="4 5"
      />
    </svg>
  );
}

export default function Logo({ to = '/', showText = true, className, compact = false }) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-3 rounded-full transition-transform duration-300 ease-fluid hover:-translate-y-[1px]',
        className
      )}
      aria-label={`${site.name} — home`}
    >
      <LogoMark
        className={cn(
          'shrink-0 shadow-glass-sm transition-all duration-300',
          compact ? 'h-8 w-8' : 'h-10 w-10'
        )}
      />
      {showText ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.25rem] font-bold tracking-display text-ink">
            AEES
          </span>
          <span className="mt-1 font-mono text-[0.5625rem] font-medium uppercase tracking-eyebrow text-meta">
            Consulting Engineers
          </span>
        </span>
      ) : null}
    </Link>
  );
}
