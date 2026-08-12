import { cn } from '@/lib/utils';

/**
 * Decorative corner ornament: concentric contour arcs, the way a survey plan
 * renders a rise in the ground. Drawn as SVG so it stays crisp, uses the brand
 * accent and costs nothing over the network.
 *
 * Purely ornamental — always aria-hidden and pointer-events-none.
 */
export default function ContourMark({ className }) {
  const rings = [40, 74, 108, 142, 176, 210, 244, 278, 312];

  return (
    <div className={cn('pointer-events-none select-none', className)} aria-hidden="true">
      {/* soft warm glow underneath */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_65%,rgba(255,107,53,0.16),transparent_62%)] blur-2xl" />

      <svg viewBox="0 0 400 400" fill="none" className="relative h-full w-full">
        <defs>
          <linearGradient id="contour-fade" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#C2410C" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#FF6B35" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </linearGradient>
        </defs>

        {rings.map((r, i) => (
          <circle
            key={r}
            cx="80"
            cy="320"
            r={r}
            stroke="url(#contour-fade)"
            strokeWidth={i % 3 === 0 ? 1.6 : 1}
          />
        ))}

        {/* one accented ring, and a dashed arc echoing a road centre-line */}
        <circle cx="80" cy="320" r="142" stroke="#FF6B35" strokeOpacity="0.42" strokeWidth="2" />
        <path
          d="M80 108 A 212 212 0 0 1 292 320"
          stroke="#C2410C"
          strokeOpacity="0.35"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="12 16"
        />
        <circle cx="80" cy="320" r="4" fill="#C2410C" fillOpacity="0.7" />
      </svg>
    </div>
  );
}
