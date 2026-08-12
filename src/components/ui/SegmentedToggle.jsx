import { cn } from '@/lib/utils';

/**
 * Thin-glass segmented control with a solid accent active segment.
 * Text on the accent fill is `ink` (6.3:1) — white would fail AA.
 *
 * Implemented as a radio group so arrow keys work and state is announced.
 */
export default function SegmentedToggle({
  options,
  value,
  onChange,
  label,
  className,
  name = 'segment',
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn('glass-thin glass-rim inline-flex flex-wrap items-stretch rounded-full p-1', className)}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            name={name}
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex min-h-[42px] cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[0.875rem] font-medium transition-all duration-300 ease-fluid',
              active
                ? 'bg-accent text-accent-on shadow-glow-accent'
                : 'text-meta hover:bg-white/70 hover:text-ink'
            )}
          >
            <span>{option.label}</span>
            {typeof option.count === 'number' ? (
              <span
                className={cn(
                  'tnum font-mono text-[0.6875rem]',
                  active ? 'text-accent-on/70' : 'text-muted'
                )}
              >
                {option.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
