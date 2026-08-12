import { cn } from '@/lib/utils';

/**
 * Project status marker. A dot plus a text label — status is never conveyed by
 * colour alone.
 */
const STATES = {
  Ongoing: { dot: 'bg-accent', text: 'text-accent-ink', fill: 'bg-accent-soft/80 border-accent/25' },
  Completed: {
    dot: 'bg-success',
    text: 'text-success-ink',
    fill: 'bg-success-soft/80 border-success/25',
  },
  default: { dot: 'bg-muted', text: 'text-meta', fill: 'bg-white/80 border-hairline' },
};

export default function StatusPill({ status, className }) {
  const tone = STATES[status] ?? STATES.default;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.75rem] font-medium leading-none',
        tone.fill,
        tone.text,
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          tone.dot,
          status === 'Ongoing' && 'animate-pulse-soft'
        )}
      />
      {status}
    </span>
  );
}
