import { cn } from '@/lib/utils';

/**
 * The 1320px editorial shell. Everything except full-bleed bands sits inside it.
 */
export default function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-shell px-4 sm:px-5 lg:px-6', className)} {...rest}>
      {children}
    </Tag>
  );
}
