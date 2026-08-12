import { cn } from '@/lib/utils';

/**
 * IMAGE SLOT
 * ---------------------------------------------------------------------------
 * Every place a photograph belongs renders one of these instead of a broken
 * <img>: a glass-framed surface box with a thin-line SVG and a small caption.
 *
 * Drop a real image in later by passing `src` + `alt` — the component then
 * renders the picture inside the same glass frame and keeps the aspect ratio.
 *
 *   <Placeholder variant="bridge" caption="Deck pour, Package 4" ratio="16/9" />
 *   <Placeholder src={heroJpg} alt="Corridor at dusk" ratio="16/9" />
 */

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const ART = {
  road: (
    <g {...STROKE}>
      <path d="M14 78 L38 22 M86 78 L62 22" />
      <path d="M50 24 v8 M50 40 v8 M50 56 v10 M50 72 v8" />
      <path d="M6 78 h88" strokeOpacity="0.5" />
      <circle cx="50" cy="14" r="4" strokeOpacity="0.6" />
    </g>
  ),
  bridge: (
    <g {...STROKE}>
      <path d="M6 52 h88" />
      <path d="M22 52 V24 M78 52 V24" />
      <path d="M22 26 C 40 46, 60 46, 78 26" />
      <path d="M32 52 V37 M42 52 V32 M58 52 V32 M68 52 V37" strokeOpacity="0.6" />
      <path d="M16 52 v26 M84 52 v26" />
      <path d="M6 78 h88" strokeOpacity="0.4" />
    </g>
  ),
  cone: (
    <g {...STROKE}>
      <path d="M50 16 L66 72 H34 Z" />
      <path d="M41 46 h18 M38 58 h24" strokeOpacity="0.7" />
      <path d="M26 78 h48" />
      <path d="M8 78 h10 M82 78 h10" strokeOpacity="0.4" />
    </g>
  ),
  hardhat: (
    <g {...STROKE}>
      <path d="M22 58 a28 28 0 0 1 56 0" />
      <path d="M14 58 h72" />
      <path d="M42 32 v-8 h16 v8" />
      <path d="M50 30 v28" strokeOpacity="0.5" />
      <path d="M20 74 h60" strokeOpacity="0.4" />
    </g>
  ),
  clipboard: (
    <g {...STROKE}>
      <rect x="26" y="16" width="48" height="68" rx="4" />
      <path d="M40 16 v-6 h20 v6" />
      <path d="M36 38 h28 M36 50 h28 M36 62 h18" strokeOpacity="0.7" />
    </g>
  ),
  mappin: (
    <g {...STROKE}>
      <path d="M50 84 C 50 84, 74 58, 74 40 a24 24 0 1 0 -48 0 C 26 58, 50 84, 50 84 Z" />
      <circle cx="50" cy="39" r="8" />
      <path d="M18 84 h64" strokeOpacity="0.4" />
    </g>
  ),
  tunnel: (
    <g {...STROKE}>
      <path d="M18 76 V44 a32 32 0 0 1 64 0 v32" />
      <path d="M32 76 V46 a18 18 0 0 1 36 0 v30" strokeOpacity="0.65" />
      <path d="M50 60 v16" strokeDasharray="4 5" />
      <path d="M8 76 h84" strokeOpacity="0.4" />
    </g>
  ),
  survey: (
    <g {...STROKE}>
      <path d="M50 30 v22 M34 78 L50 52 L66 78" />
      <rect x="38" y="18" width="24" height="12" rx="3" />
      <path d="M62 24 h12" strokeOpacity="0.7" />
      <path d="M14 78 h72" strokeOpacity="0.4" />
    </g>
  ),
  portrait: (
    <g {...STROKE}>
      <circle cx="50" cy="38" r="15" />
      <path d="M22 80 a28 28 0 0 1 56 0" />
    </g>
  ),
  chart: (
    <g {...STROKE}>
      <path d="M18 78 V22 M18 78 H84" />
      <path d="M28 66 v-14 M44 66 v-28 M60 66 v-20 M76 66 v-38" />
      <path d="M18 66 h68" strokeOpacity="0.35" />
    </g>
  ),
};

const RATIOS = {
  '16/9': 'aspect-[16/9]',
  '21/9': 'aspect-[21/9]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '4/5': 'aspect-[4/5]',
  '1/1': 'aspect-square',
  auto: '',
};

export default function Placeholder({
  variant = 'road',
  caption = 'Image',
  ratio = '16/9',
  src,
  alt,
  className,
  artClassName,
  radius = 'rounded-3xl',
  loading = 'lazy',
}) {
  const ratioClass = RATIOS[ratio] ?? RATIOS['16/9'];

  // Real artwork supplied — same glass frame, real picture inside.
  if (src) {
    return (
      <figure
        className={cn(
          'glass-thick glass-rim relative overflow-hidden',
          radius,
          ratioClass,
          className
        )}
      >
        <img
          src={src}
          alt={alt ?? caption}
          loading={loading}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </figure>
    );
  }

  return (
    <figure
      className={cn(
        'glass-thick glass-rim relative flex items-center justify-center overflow-hidden',
        radius,
        ratioClass,
        className
      )}
      role="img"
      aria-label={`Image placeholder — ${caption}`}
    >
      <span
        aria-hidden="true"
        className="texture-dots pointer-events-none absolute inset-0 opacity-60"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_25%,rgba(255,107,53,0.10),transparent_62%)]"
      />

      <div className="relative flex flex-col items-center gap-3 px-4 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 shadow-glass-sm sm:h-18 sm:w-18">
          <svg
            viewBox="0 0 100 92"
            aria-hidden="true"
            className={cn('h-9 w-9 text-primary/55 sm:h-10 sm:w-10', artClassName)}
          >
            {ART[variant] ?? ART.road}
          </svg>
        </span>
        <figcaption className="font-mono text-[0.625rem] font-medium uppercase leading-relaxed tracking-eyebrow text-meta">
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}
