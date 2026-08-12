import { cn } from '@/lib/utils';

/**
 * The material primitive. Everything glass on the site goes through here.
 *
 *   tier="thin"   floating chrome — navbar, chips, small controls.
 *                 More transparent, heavier blur.
 *   tier="thick"  content surfaces — hero panel, feature cards.
 *                 More opaque so headings and short copy stay legible.
 *   tier="read"   the opacity floor for dense body copy. Use this whenever a
 *                 panel carries a paragraph or a form; never put running text
 *                 on `thin`.
 *
 * `rim` adds the 1px specular gradient border (brighter top-left).
 * `hover` adds the 2px lift with a rim brighten.
 */
const TIERS = {
  thin: 'glass-thin',
  thick: 'glass-thick',
  read: 'glass-read',
};

export default function GlassPanel({
  as: Tag = 'div',
  tier = 'thick',
  rim = true,
  hover = false,
  sheen = false,
  radius = 'rounded-3xl',
  className,
  children,
  ...rest
}) {
  return (
    <Tag
      className={cn(
        'relative',
        TIERS[tier] ?? TIERS.thick,
        radius,
        rim && 'glass-rim',
        hover && 'glass-hover',
        sheen && 'liquid-sheen',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
