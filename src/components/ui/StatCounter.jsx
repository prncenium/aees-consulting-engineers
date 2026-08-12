import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { cn, formatNumber } from '@/lib/utils';

/**
 * Big mono figure that counts up once it scrolls into view.
 * Assistive tech receives the final value immediately, so a screen reader
 * never announces a partial count.
 */
export default function StatCounter({
  value,
  label,
  prefix = '',
  suffix = '',
  unit,
  decimals = 0,
  duration = 1600,
  className,
  valueClassName,
  labelClassName,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const current = useCountUp(value, { duration, decimals, active: inView });

  const display = `${prefix}${formatNumber(
    decimals ? Number(current).toFixed(decimals) : Math.round(current)
  )}${suffix}`;
  const full = `${prefix}${formatNumber(value)}${suffix}`;

  return (
    <div ref={ref} className={cn('flex flex-col gap-2', className)}>
      <span className="sr-only">
        {label}: {full}
        {unit ? ` ${unit}` : ''}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          'tnum font-mono text-data font-semibold leading-none text-primary',
          valueClassName
        )}
      >
        {display}
        {unit ? (
          <span className="ml-1.5 text-[0.36em] font-medium uppercase tracking-eyebrow text-meta">
            {unit}
          </span>
        ) : null}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          'font-mono text-[0.6875rem] font-medium uppercase leading-snug tracking-eyebrow text-meta',
          labelClassName
        )}
      >
        {label}
      </span>
    </div>
  );
}
