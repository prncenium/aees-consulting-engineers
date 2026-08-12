/**
 * THE BED
 * ---------------------------------------------------------------------------
 * The living layer every glass panel samples through: soft primary/accent
 * gradient blobs drifting very slowly, over a faint dotted grid.
 *
 * Fixed and pointer-events-none, so it costs nothing on scroll and never
 * intercepts input. It is mounted once, in RootLayout.
 *
 * `prefers-reduced-motion` freezes the drift and `prefers-reduced-transparency`
 * removes the blobs entirely — both handled in index.css so the rules apply
 * even before React hydrates.
 */
export default function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-surface" />

      {/* Aurora blobs — an entirely warm bed: amber, terracotta, rose and
          gold. No blue anywhere, so the glass never picks up a cold cast. */}
      <div
        className="aurora-blob animate-drift-a left-[-14%] top-[-18%] h-[62vmax] w-[62vmax] opacity-[0.46]"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(251,146,60,0.50), rgba(251,146,60,0) 68%)',
        }}
      />
      <div
        className="aurora-blob animate-drift-b right-[-18%] top-[4%] h-[54vmax] w-[54vmax] opacity-[0.34]"
        style={{
          background:
            'radial-gradient(circle at 60% 40%, rgba(244,114,182,0.38), rgba(244,114,182,0) 70%)',
        }}
      />
      <div
        className="aurora-blob animate-drift-c bottom-[-24%] left-[16%] h-[58vmax] w-[58vmax] opacity-[0.30]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255,107,53,0.42), rgba(255,107,53,0) 68%)',
        }}
      />
      <div
        className="aurora-blob animate-drift-b right-[4%] bottom-[-16%] h-[48vmax] w-[48vmax] opacity-[0.32]"
        style={{
          background:
            'radial-gradient(circle at 45% 55%, rgba(250,204,21,0.34), rgba(250,204,21,0) 70%)',
          animationDelay: '-12s',
        }}
      />

      {/* Contour / dot texture the blur picks up */}
      <div className="texture-dots absolute inset-0 opacity-[0.55]" />

      {/* Soften the whole bed so glass reads as glass, not as colour blocks */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/62 via-white/45 to-white/70" />
    </div>
  );
}
