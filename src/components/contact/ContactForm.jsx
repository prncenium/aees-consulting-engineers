import { useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import Field from '@/components/ui/Field';
import Button from '@/components/ui/Button';
import GlassPanel from '@/components/ui/GlassPanel';
import { formFields, subjectOptions, successCopy } from '@/data/contact';
import { isEmail, isPhone } from '@/lib/utils';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

/** Field-level rules. Returns an error string, or undefined when valid. */
const RULES = {
  name: (value) => {
    if (!value.trim()) return 'Enter your full name.';
    if (value.trim().length < 2) return 'Name must be at least 2 characters.';
    return undefined;
  },
  email: (value) => {
    if (!value.trim()) return 'Enter an email address so we can reply.';
    if (!isEmail(value)) return 'Enter a valid email address, e.g. name@authority.gov.in.';
    return undefined;
  },
  phone: (value) => {
    if (!value.trim()) return 'Enter a contact number.';
    if (!isPhone(value)) return 'Enter a valid Indian phone number, e.g. +91 98765 43210.';
    return undefined;
  },
  subject: (value) => (value ? undefined : 'Choose a subject.'),
  message: (value) => {
    if (!value.trim()) return 'Tell us briefly what you need.';
    if (value.trim().length < 20) return 'Please give us at least 20 characters of detail.';
    return undefined;
  },
};

const FIELD_ORDER = ['name', 'email', 'phone', 'subject', 'message'];

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [company, setCompany] = useState(''); // honeypot
  const summaryRef = useRef(null);
  const fieldRefs = useRef({});

  const setField = (key) => (event) => {
    const { value } = event.target;
    setValues((previous) => ({ ...previous, [key]: value }));
    // Re-validate live only once the field has already errored.
    if (errors[key]) {
      setErrors((previous) => ({ ...previous, [key]: RULES[key](value) }));
    }
  };

  const handleBlur = (key) => () => {
    setTouched((previous) => ({ ...previous, [key]: true }));
    setErrors((previous) => ({ ...previous, [key]: RULES[key](values[key]) }));
  };

  const validateAll = () => {
    const next = {};
    FIELD_ORDER.forEach((key) => {
      const error = RULES[key](values[key]);
      if (error) next[key] = error;
    });
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateAll();
    setErrors(nextErrors);
    setTouched(Object.fromEntries(FIELD_ORDER.map((key) => [key, true])));

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the summary so the failure is announced, not just seen.
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company }),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
      window.requestAnimationFrame(() => summaryRef.current?.focus());
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStatus('idle');
  };

  // ---- Success panel -------------------------------------------------------
  if (status === 'success') {
    return (
      <GlassPanel tier="read" className="p-8 sm:p-10" role="status" aria-live="polite">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success-soft">
          <CheckCircle2 aria-hidden="true" className="h-7 w-7 text-success-ink" strokeWidth={1.75} />
        </span>
        <h3 className="mt-6">{successCopy.heading}</h3>
        <p className="mt-3.5 max-w-prose text-copy-sm text-body">{successCopy.body}</p>
        <p className="mt-5 max-w-prose rounded-2xl bg-white/70 p-4 text-[0.8125rem] leading-relaxed text-meta shadow-glass-sm">
          {successCopy.note}
        </p>
        <Button variant="secondary" size="md" className="mt-7" onClick={reset}>
          {successCopy.action}
        </Button>
      </GlassPanel>
    );
  }

  const errorList = FIELD_ORDER.filter((key) => errors[key]);

  return (
    <GlassPanel tier="read" className="p-6 sm:p-8">
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Honeypot — hidden from people, filled by bots */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="company-website">Company website</label>
          <input
            id="company-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>

        {status === 'error' ? (
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            className="rounded-2xl border border-danger/30 bg-danger-soft p-5 focus:outline-none"
          >
            <p className="flex items-center gap-2.5 text-small font-semibold text-danger-ink">
              <AlertTriangle aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              We could not send your message
            </p>
            <p className="mt-2 text-copy-sm text-body">
              Please try again, or email us directly at{' '}
              <a className="link-sweep font-medium text-accent-ink" href="mailto:info@aeesconsulting.in">
                info@aeesconsulting.in
              </a>
              .
            </p>
          </div>
        ) : null}
        {/* ---- Focusable error summary ---- */}
        {errorList.length > 0 && status !== 'error' ? (
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            className="rounded-2xl border border-danger/30 bg-danger-soft p-5 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
          >
            <p className="flex items-center gap-2.5 text-small font-semibold text-danger-ink">
              <AlertTriangle aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              {errorList.length} {errorList.length === 1 ? 'field needs' : 'fields need'} attention
            </p>
            <ul className="mt-3.5 flex flex-col gap-2">
              {errorList.map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => fieldRefs.current[key]?.focus()}
                    className="link-sweep cursor-pointer text-left text-copy-sm text-body transition-colors duration-200 hover:text-danger-ink"
                  >
                    {formFields[key].label}: {errors[key]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            {...formFields.name}
            ref={(node) => {
              fieldRefs.current.name = node;
            }}
            value={values.name}
            onChange={setField('name')}
            onBlur={handleBlur('name')}
            error={touched.name ? errors.name : undefined}
          />
          <Field
            {...formFields.email}
            ref={(node) => {
              fieldRefs.current.email = node;
            }}
            value={values.email}
            onChange={setField('email')}
            onBlur={handleBlur('email')}
            error={touched.email ? errors.email : undefined}
          />
          <Field
            {...formFields.phone}
            ref={(node) => {
              fieldRefs.current.phone = node;
            }}
            value={values.phone}
            onChange={setField('phone')}
            onBlur={handleBlur('phone')}
            error={touched.phone ? errors.phone : undefined}
          />
          <Field
            {...formFields.subject}
            ref={(node) => {
              fieldRefs.current.subject = node;
            }}
            options={subjectOptions}
            value={values.subject}
            onChange={setField('subject')}
            onBlur={handleBlur('subject')}
            error={touched.subject ? errors.subject : undefined}
          />
        </div>

        <Field
          {...formFields.message}
          ref={(node) => {
            fieldRefs.current.message = node;
          }}
          value={values.message}
          onChange={setField('message')}
          onBlur={handleBlur('message')}
          error={touched.message ? errors.message : undefined}
        />

        <div className="flex flex-wrap items-center gap-5 border-t border-hairline pt-6">
          <Button
            type="submit"
            size="lg"
            variant="primary"
            loading={status === 'submitting'}
            loadingLabel="Sending…"
          >
            Send enquiry
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
          </Button>
          <p className="max-w-xs text-[0.8125rem] leading-snug text-meta">
            We use your details only to answer this enquiry. No marketing, no list.
          </p>
        </div>
      </form>
    </GlassPanel>
  );
}
