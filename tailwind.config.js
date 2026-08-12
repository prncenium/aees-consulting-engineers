/** @type {import('tailwindcss').Config} */

/**
 * AEES design tokens — Apple "Liquid Glass", warm light theme.
 * ---------------------------------------------------------------------------
 * This file is the single source of truth for brand colour, type, glass and
 * shape. Change a value here and it propagates through the whole site.
 *
 * PALETTE DIRECTION
 * Warm stone neutrals + a single terracotta accent. There is deliberately NO
 * blue anywhere in the system — not in the type, the chrome, the aurora bed,
 * the shadows or the line work. `primary` is a warm graphite: it carries
 * structure (solid controls, figures, icon tiles) while terracotta carries
 * every interactive emphasis. That is the Apple pattern — neutral chrome, one
 * vivid accent — and it keeps accent usage near 10%.
 *
 * CONTRAST — verified against the warm light bed (#FAF8F5 / white glass):
 *   ink        #1C1917  -> 17.0:1  headings, primary text        AAA
 *   body       #44403C  ->  9.9:1  body copy                     AAA
 *   meta       #57534E  ->  7.6:1  small labels, table meta      AAA
 *   muted      #A8A29E  ->  2.6:1  DECORATIVE ONLY — icons,
 *                                  dividers, never body text
 *   primary    #332F2B  -> 13.3:1  structure, figures, solid fills AAA
 *   accent-ink #C2410C  ->  5.2:1  accent AS TEXT on light       AA
 *   accent     #FF6B35  ->  2.8:1  FILL ONLY — never text
 *   success-ink#047857  ->  5.5:1  verified state as text        AA
 *
 * The fill/text split matters: #FF6B35 is bright enough as a FILL but fails as
 * TEXT on white. Use `accent` to fill and `accent-ink` to write. Text on an
 * accent fill must be `ink` (6.4:1) — white on accent is only 2.8:1.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm graphite. Structural, never decorative — no blue in it.
        primary: {
          DEFAULT: '#332F2B',
          dark: '#1C1917',
          light: '#57534E',
          tint: '#F2EDE6',
        },
        accent: {
          DEFAULT: '#FF6B35', // fill only
          ink: '#C2410C', // accent as text on light, and as the pressed fill
          soft: '#FFEDE4',
          on: '#1C1917', // text that sits ON an accent fill
        },
        success: {
          DEFAULT: '#10B981',
          ink: '#047857',
          soft: '#E8F7F1',
        },
        danger: {
          DEFAULT: '#E11D48',
          ink: '#BE123C',
          soft: '#FDE8EC',
        },
        ink: '#1C1917',
        body: '#44403C',
        meta: '#57534E',
        muted: '#A8A29E',
        hairline: '#EDE9E3',
        surface: {
          DEFAULT: '#FAF8F5',
          2: '#F3EFE9',
        },
        glass: {
          light: 'rgba(255,255,255,0.65)',
          dark: 'rgba(28,25,23,0.55)',
          border: 'rgba(255,255,255,0.20)',
          shadow: 'rgba(41,37,33,0.16)',
        },
      },
      fontFamily: {
        display: [
          '"SF Pro Display"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Inter Tight"',
          'Manrope',
          'system-ui',
          'sans-serif',
        ],
        sans: [
          '"SF Pro Text"',
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        mono: ['"SF Mono"', '"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        h1: ['clamp(2.75rem, 6vw, 4.75rem)', { lineHeight: '1.05', letterSpacing: '-0.028em' }],
        h2: ['clamp(1.9rem, 3.5vw, 2.9rem)', { lineHeight: '1.1', letterSpacing: '-0.022em' }],
        h3: ['1.4rem', { lineHeight: '1.28', letterSpacing: '-0.015em' }],
        h4: ['1.15rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        /* Named `copy` rather than `body` so it never collides with the
           `body` TEXT COLOUR token — both would generate `.text-body`. */
        copy: ['1.0625rem', { lineHeight: '1.65' }],
        'copy-sm': ['0.9375rem', { lineHeight: '1.62' }],
        small: ['0.875rem', { lineHeight: '1.55' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.14em' }],
        data: ['clamp(2.25rem, 4.5vw, 3.25rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
      },
      letterSpacing: {
        eyebrow: '0.14em',
        display: '-0.02em',
      },
      maxWidth: {
        shell: '1240px',
        prose: '68ch',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glass-sm': '0 1px 2px rgba(41,37,33,0.06), inset 0 1px 0 0 rgba(255,255,255,0.70)',
        glass:
          '0 8px 24px -10px rgba(41,37,33,0.16), 0 2px 6px -2px rgba(41,37,33,0.08), inset 0 1px 0 0 rgba(255,255,255,0.85)',
        'glass-lg':
          '0 24px 60px -24px rgba(41,37,33,0.26), 0 6px 16px -8px rgba(41,37,33,0.12), inset 0 1px 0 0 rgba(255,255,255,0.92)',
        'glass-hover':
          '0 30px 70px -26px rgba(41,37,33,0.30), 0 8px 20px -8px rgba(41,37,33,0.14), inset 0 1px 0 0 rgba(255,255,255,0.95)',
        'glow-accent':
          '0 10px 30px -10px rgba(255,107,53,0.55), 0 2px 8px -2px rgba(255,107,53,0.35)',
        'glow-primary': '0 10px 30px -10px rgba(41,37,33,0.40)',
      },
      backdropBlur: {
        thin: '24px',
        thick: '32px',
        heavy: '40px',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(rgba(51,47,43,0.10) 1px, transparent 1px)',
        'line-grid':
          'linear-gradient(to right, rgba(51,47,43,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(51,47,43,0.05) 1px, transparent 1px)',
        sheen: 'linear-gradient(120deg, rgba(255,255,255,0.85), rgba(255,255,255,0) 42%)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
        'line-grid': '64px 64px',
      },
      spacing: {
        18: '4.5rem',
        30: '7.5rem',
      },
      transitionTimingFunction: {
        fluid: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        'drift-a': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(6%, -4%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-4%, 5%, 0) scale(0.96)' },
        },
        'drift-b': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1.04)' },
          '50%': { transform: 'translate3d(-7%, 6%, 0) scale(0.94)' },
        },
        'drift-c': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(0.98)' },
          '40%': { transform: 'translate3d(5%, 6%, 0) scale(1.1)' },
          '75%': { transform: 'translate3d(-6%, -3%, 0) scale(1.02)' },
        },
        dash: {
          to: { strokeDashoffset: '-160' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
      animation: {
        'drift-a': 'drift-a 34s ease-in-out infinite',
        'drift-b': 'drift-b 44s ease-in-out infinite',
        'drift-c': 'drift-c 38s ease-in-out infinite',
        dash: 'dash 3s linear infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
      zIndex: {
        header: '50',
        overlay: '40',
        raised: '20',
        base: '10',
      },
    },
  },
  plugins: [],
};
