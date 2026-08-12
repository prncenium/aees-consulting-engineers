import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

/**
 * Glass-aware buttons. Every variant carries the specular rim and the liquid
 * sheen sweep, so light travels across the control on hover.
 *
 *   primary   solid terracotta fill with a soft glow.
 *             Text is `ink` (#1C1917) at 6.4:1 — white on #FF6B35 is only
 *             2.8:1 and would fail AA, so it is never used.
 *             The pressed/hover fill is `accent-ink`, a token, not a one-off.
 *   secondary thin glass: blur + hairline, brightens on hover.
 *   solid     warm graphite fill, white text (13.3:1) — for muted CTAs.
 *   quiet     borderless, for tertiary actions.
 */
const VARIANTS = {
  primary:
    'bg-accent text-accent-on shadow-glow-accent hover:bg-accent-ink hover:text-white hover:shadow-[0_14px_38px_-10px_rgba(194,65,12,0.55)] glass-rim',
  secondary: 'glass-thin text-ink hover:bg-white/85 hover:shadow-glass glass-rim',
  solid: 'bg-primary text-white shadow-glow-primary hover:bg-primary-dark glass-rim',
  quiet: 'bg-transparent text-body hover:bg-white/65 hover:text-ink',
  danger: 'bg-white/75 text-danger-ink border border-danger/30 hover:bg-danger-soft',
};

const SIZES = {
  sm: 'min-h-[44px] px-5 text-sm gap-2',
  md: 'min-h-[48px] px-6 text-[0.9375rem] gap-2.5',
  lg: 'min-h-[54px] px-8 text-base gap-3',
  icon: 'min-h-[44px] min-w-[44px] px-0 justify-center',
};

const BASE =
  'liquid-sheen inline-flex cursor-pointer items-center justify-center rounded-full font-semibold tracking-[-0.005em] transition-all duration-300 ease-fluid hover:-translate-y-[1px] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

const Button = forwardRef(function Button(
  {
    as,
    to,
    href,
    variant = 'primary',
    size = 'md',
    className,
    children,
    type = 'button',
    disabled = false,
    loading = false,
    loadingLabel = 'Working…',
    ...rest
  },
  ref
) {
  const classes = cn(
    BASE,
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    className
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const Tag = as ?? 'button';

  return (
    <Tag
      ref={ref}
      type={Tag === 'button' ? type : undefined}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <>
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </Tag>
  );
});

export default Button;
