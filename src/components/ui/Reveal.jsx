import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * Scroll reveal: fade + short slide-up on a low-stiffness spring, so panels
 * settle with a little weight and no bounce (damping is high enough that the
 * value never overshoots).
 *
 * With `prefers-reduced-motion` nothing translates — content is simply present
 * at full opacity from the first frame.
 */
const SPRING = { type: 'spring', stiffness: 120, damping: 22, mass: 0.9 };

export function Reveal({
  as = 'div',
  delay = 0,
  y = 18,
  once = true,
  amount = 0.25,
  className,
  children,
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ ...SPRING, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that staggers its <RevealItem> children. */
export function RevealGroup({
  as = 'div',
  className,
  stagger = 0.07,
  delay = 0,
  once = true,
  amount = 0.2,
  children,
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ as = 'div', className, y = 16, children, ...rest }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: SPRING },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** A hairline that draws itself along a section edge as it enters view. */
export function DrawLine({ className, orientation = 'horizontal', duration = 1, delay = 0 }) {
  const reduced = useReducedMotion();
  const isH = orientation === 'horizontal';
  const base = cn(
    isH ? 'h-px w-full' : 'h-full w-px',
    'bg-gradient-to-r from-transparent via-accent/35 to-transparent',
    className
  );

  if (reduced) return <div aria-hidden="true" className={base} />;

  return (
    <motion.div
      aria-hidden="true"
      className={cn(base, isH ? 'origin-left' : 'origin-top')}
      initial={isH ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={isH ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration, delay, ease: [0.32, 0.72, 0, 1] }}
    />
  );
}

export default RevealGroup;
