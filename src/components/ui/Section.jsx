import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';

/**
 * Vertical rhythm wrapper. `bleed` renders children edge-to-edge (glass bands,
 * hero); otherwise content sits in the 1240px shell.
 *
 * Sections are transparent by default so the aurora bed shows through and the
 * glass above it has something to sample. `tone="veil"` lays a soft white wash
 * over the bed where a section needs a calmer backdrop.
 */
export default function Section({
  as: Tag = 'section',
  id,
  bleed = false,
  tone = 'none',
  className,
  containerClassName,
  children,
  ...rest
}) {
  const tones = {
    none: '',
    veil: 'bg-white/45',
    solid: 'bg-white',
    tint: 'bg-primary-tint/35',
  };

  const body = bleed ? children : <Container className={containerClassName}>{children}</Container>;

  return (
    <Tag
      id={id}
      className={cn('relative py-16 md:py-24 lg:py-28', tones[tone] ?? tones.none, className)}
      {...rest}
    >
      {body}
    </Tag>
  );
}
