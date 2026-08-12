import { cn } from '@/lib/utils';

/**
 * Decorative corner ornament: a fading survey grid crossed by a dashed
 * alignment line and a few station ticks — the counterpart to <ContourMark />,
 * for sections that need a different texture in the same accent.
 *
 * Purely ornamental — always aria-hidden and pointer-events-none.
 */
export default function GridMark({ className }) {
  const lines = [0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400];

  return (
    <div className={cn('pointer-events-none select-none', className)} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,107,53,0.14),transparent_62%)] blur-2xl" />

      <svg viewBox="0 0 400 400" fill="none" className="relative h-full w-full">
        <defs>
          <linearGradient id="grid-fade" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C2410C" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#FF6B35" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </linearGradient>
        </defs>

        {lines.map((v) => (
          <line key={`v${v}`} x1={v} y1="0" x2={v} y2="400" stroke="url(#grid-fade)" strokeWidth="1" />
        ))}
        {lines.map((h) => (
          <line key={`h${h}`} x1="0" y1={h} x2="400" y2={h} stroke="url(#grid-fade)" strokeWidth="1" />
        ))}

        {/* dashed alignment sweeping across the grid, with station ticks */}
        <path
          d="M-20 300 C 120 300, 180 120, 420 90"
          stroke="#FF6B35"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="14 16"
        />
        <circle cx="120" cy="252" r="4" fill="#C2410C" fillOpacity="0.65" />
        <circle cx="248" cy="146" r="4" fill="#C2410C" fillOpacity="0.5" />
        <circle cx="352" cy="100" r="4" fill="#C2410C" fillOpacity="0.35" />
      </svg>
    </div>
  );
}
