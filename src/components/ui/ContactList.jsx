import { Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Renders a list of phone numbers or email addresses as links.
 * Used wherever the office contact details appear, so every surface shows the
 * full set rather than only the first entry.
 */
export default function ContactList({
  type = 'email',
  items = [],
  className,
  itemClassName,
  showIcon = true,
  iconClassName,
}) {
  const Icon = type === 'phone' ? Phone : Mail;

  return (
    <ul className={cn('flex flex-col gap-2.5', className)}>
      {items.map((item) => (
        <li key={item}>
          <a
            href={type === 'phone' ? `tel:${item.replace(/[\s-]/g, '')}` : `mailto:${item}`}
            className={cn(
              'link-sweep inline-flex w-fit items-center gap-2.5 break-all text-copy-sm font-medium text-ink transition-colors duration-200 hover:text-accent-ink',
              itemClassName
            )}
          >
            {showIcon ? (
              <Icon
                aria-hidden="true"
                className={cn('h-4 w-4 shrink-0 text-muted', iconClassName)}
                strokeWidth={1.75}
              />
            ) : null}
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}
