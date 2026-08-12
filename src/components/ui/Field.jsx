import { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Labelled form control (input / textarea / select) with hint and error text
 * wired to the control through aria-describedby + aria-invalid.
 *
 * Controls sit on a near-solid white fill rather than thin glass — form text is
 * dense, and dense text does not go on a busy blur.
 */
const CONTROL_BASE =
  'w-full rounded-2xl border bg-white/85 px-4 py-3.5 text-[0.9375rem] text-ink placeholder:text-muted shadow-glass-sm backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary min-h-[48px]';

const Field = forwardRef(function Field(
  {
    id,
    label,
    type = 'text',
    hint,
    error,
    required = false,
    options,
    rows = 6,
    className,
    controlClassName,
    ...rest
  },
  ref
) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const controlClasses = cn(
    CONTROL_BASE,
    error
      ? 'border-danger/60 bg-danger-soft/60'
      : 'border-white/70 hover:border-primary/25 focus-visible:border-primary/40',
    controlClassName
  );

  const shared = {
    id,
    ref,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
    'aria-required': required || undefined,
    className: controlClasses,
    ...rest,
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-small font-semibold text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-accent-ink" aria-hidden="true">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>

      {type === 'textarea' ? (
        <textarea rows={rows} {...shared} />
      ) : type === 'select' ? (
        <select {...shared} className={cn(controlClasses, 'cursor-pointer')}>
          {(options ?? []).map((option) => (
            <option key={option.value} value={option.value} disabled={option.value === ''}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} {...shared} />
      )}

      {hint && !error ? (
        <p id={hintId} className="text-[0.8125rem] leading-snug text-meta">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={errorId}
          className="flex items-start gap-2 text-[0.8125rem] font-medium leading-snug text-danger-ink"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
          {error}
        </p>
      ) : null}
    </div>
  );
});

export default Field;
