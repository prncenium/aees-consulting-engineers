import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * A carriageway drawn as an SVG, with the centre line animating along it.
 * Used as a quiet motif in the hero and the process row.
 *
 * The dash animation is CSS-driven, so `prefers-reduced-motion` stops it via
 * the global rule in index.css; we also drop it explicitly here.
 */
export default function RoadLine({ className, height = 120 }) {
  const reduced = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 120"
      preserveAspectRatio="none"
      className={cn('w-full', className)}
      style={{ height }}
      fill="none"
    >
      {/* carriageway edges */}
      <path
        d="M0 96 C 160 96, 240 30, 400 30 S 640 96, 800 96"
        stroke="rgba(51,47,43,0.14)"
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M0 96 C 160 96, 240 30, 400 30 S 640 96, 800 96"
        stroke="rgba(255,255,255,0.65)"
        strokeWidth="22"
        strokeLinecap="round"
      />
      {/* centre line */}
      <path
        d="M0 96 C 160 96, 240 30, 400 30 S 640 96, 800 96"
        stroke="#FF6B35"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="18 22"
        className={reduced ? undefined : 'animate-dash'}
      />
    </svg>
  );
}
