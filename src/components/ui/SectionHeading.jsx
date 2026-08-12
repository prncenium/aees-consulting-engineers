import RevealGroup, { RevealItem } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

/**
 * Mono eyebrow + display heading + supporting copy.
 *   align="split"    heading left, copy offset right (asymmetric editorial)
 *   align="stacked"  single column
 *   align="center"   centred, for full-bleed bands
 */
export default function SectionHeading({
  eyebrow,
  title,
  body,
  as: Tag = 'h2',
  align = 'split',
  actions,
  className,
  titleClassName,
}) {
  if (align === 'stacked' || align === 'center') {
    const centered = align === 'center';
    return (
      <RevealGroup
        className={cn('max-w-prose', centered && 'mx-auto text-center', className)}
      >
        {eyebrow ? (
          <RevealItem>
            <p className="eyebrow mb-4">{eyebrow}</p>
          </RevealItem>
        ) : null}
        <RevealItem>
          <Tag className={cn('text-balance', titleClassName)}>{title}</Tag>
        </RevealItem>
        {body ? (
          <RevealItem>
            <p className={cn('mt-5 text-copy text-body', centered && 'mx-auto')}>{body}</p>
          </RevealItem>
        ) : null}
        {actions ? (
          <RevealItem>
            <div className={cn('mt-8', centered && 'flex justify-center')}>{actions}</div>
          </RevealItem>
        ) : null}
      </RevealGroup>
    );
  }

  return (
    <RevealGroup className={cn('grid grid-cols-1 items-end gap-x-12 gap-y-6 lg:grid-cols-12', className)}>
      <div className="lg:col-span-6 lg:col-start-1">
        {eyebrow ? (
          <RevealItem>
            <p className="eyebrow mb-4">{eyebrow}</p>
          </RevealItem>
        ) : null}
        <RevealItem>
          <Tag className={cn('text-balance', titleClassName)}>{title}</Tag>
        </RevealItem>
      </div>
      {body || actions ? (
        <div className="lg:col-span-5 lg:col-start-8">
          {body ? (
            <RevealItem>
              <p className="max-w-prose text-copy text-body">{body}</p>
            </RevealItem>
          ) : null}
          {actions ? (
            <RevealItem>
              <div className="mt-7">{actions}</div>
            </RevealItem>
          ) : null}
        </div>
      ) : null}
    </RevealGroup>
  );
}
