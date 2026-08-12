import { cn } from '@/lib/utils';

/**
 * Thin-glass pill. Renders as a button when `onClick` is supplied, otherwise a
 * static tag. Selected state is a solid primary tint with primary text (8.9:1).
 */
export default function Chip({
  children,
  selected = false,
  onClick,
  className,
  count,
  disabled = false,
  ...rest
}) {
  const shared = cn(
    'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.8125rem] leading-none transition-all duration-200',
    selected
      ? 'bg-primary text-white shadow-glass-sm'
      : 'glass-thin text-meta hover:bg-white/85 hover:text-ink',
    disabled && 'cursor-not-allowed opacity-50',
    className
  );

  if (!onClick) {
    return (
      <span className={shared} {...rest}>
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        shared,
        'min-h-[40px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
      )}
      {...rest}
    >
      {children}
      {typeof count === 'number' ? (
        <span
          className={cn(
            'tnum font-mono text-[0.6875rem]',
            selected ? 'text-white/75' : 'text-muted'
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
