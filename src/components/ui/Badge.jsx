import { cn } from '@/lib/utils';

/**
 * Thin-glass pill. Text uses `meta` (5.9:1) rather than `muted`, which is
 * decorative-only at this size.
 */
const TONES = {
  default: 'glass-thin text-meta',
  primary: 'bg-primary-tint/80 text-primary border border-primary/15',
  accent: 'bg-accent-soft/80 text-accent-ink border border-accent/25',
  success: 'bg-success-soft/80 text-success-ink border border-success/25',
  solid: 'bg-white/85 text-ink border border-hairline',
};

export default function Badge({
  as: Tag = 'span',
  tone = 'default',
  icon: Icon,
  className,
  children,
  ...rest
}) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.75rem] font-medium leading-none',
        TONES[tone] ?? TONES.default,
        className
      )}
      {...rest}
    >
      {Icon ? <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} /> : null}
      {children}
    </Tag>
  );
}
