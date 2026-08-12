import GlassPanel from '@/components/ui/GlassPanel';
import { cn } from '@/lib/utils';

/**
 * Thick-glass content card with a hairline top highlight, layered shadow and a
 * gentle hover lift + rim brighten.
 *
 * Cards carrying a paragraph should pass `tier="read"` for the opacity floor.
 */
export default function Card({
  as = 'div',
  interactive = false,
  padded = true,
  tier = 'thick',
  radius = 'rounded-3xl',
  className,
  children,
  ...rest
}) {
  return (
    <GlassPanel
      as={as}
      tier={tier}
      radius={radius}
      hover={interactive}
      sheen={interactive}
      className={cn(
        'overflow-hidden',
        padded && 'p-6 sm:p-7',
        interactive && 'group cursor-default',
        className
      )}
      {...rest}
    >
      {children}
    </GlassPanel>
  );
}
