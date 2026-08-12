import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, pageWindow } from '@/lib/utils';

/**
 * Windowed pagination with ellipses. Thin-glass controls, 44px touch targets,
 * aria-current on the active page.
 */
export default function Pagination({
  page,
  totalPages,
  onChange,
  siblings = 1,
  className,
  label = 'Pagination',
}) {
  if (totalPages <= 1) return null;

  const pages = pageWindow(page, totalPages, siblings);

  const go = (next) => {
    const clamped = Math.min(Math.max(1, next), totalPages);
    if (clamped !== page) onChange(clamped);
  };

  const arrowClasses = (disabled) =>
    cn(
      'inline-flex h-11 min-w-[44px] items-center justify-center gap-1.5 rounded-full px-4 text-[0.8125rem] font-medium transition-all duration-200',
      disabled
        ? 'cursor-not-allowed bg-white/50 text-muted'
        : 'glass-thin cursor-pointer text-ink hover:bg-white/85 hover:-translate-y-[1px]'
    );

  return (
    <nav aria-label={label} className={cn('flex flex-wrap items-center gap-2', className)}>
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        className={arrowClasses(page === 1)}
        aria-label="Go to previous page"
      >
        <ChevronLeft aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      <ul className="flex flex-wrap items-center gap-2">
        {pages.map((item) =>
          typeof item === 'number' ? (
            <li key={item}>
              <button
                type="button"
                onClick={() => go(item)}
                aria-current={item === page ? 'page' : undefined}
                aria-label={`Go to page ${item}`}
                className={cn(
                  'tnum inline-flex h-11 min-w-[44px] cursor-pointer items-center justify-center rounded-full px-3 font-mono text-[0.8125rem] font-medium transition-all duration-200',
                  item === page
                    ? 'bg-primary text-white shadow-glow-primary'
                    : 'glass-thin text-meta hover:-translate-y-[1px] hover:bg-white/85 hover:text-ink'
                )}
              >
                {item}
              </button>
            </li>
          ) : (
            <li
              key={item}
              aria-hidden="true"
              className="inline-flex h-11 items-center px-1 text-sm text-muted"
            >
              …
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        className={arrowClasses(page === totalPages)}
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
      </button>
    </nav>
  );
}
