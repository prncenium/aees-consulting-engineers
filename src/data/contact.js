/** Contact page content: intro, form config and reassurance copy. */

export const contactIntro = {
  eyebrow: 'Contact us',
  breadcrumb: [
    { label: 'Home', to: '/' },
    { label: 'Contact Us' },
  ],
  headingBefore: 'Tell us what ',
  accentWord: 'needs solving',
  headingAfter: '.',
  lead: 'Scope, corridor, deadline — whatever you have. Enquiries reach a named engineer, not a queue, and we reply in writing within one working day.',
};

export const formIntro = {
  eyebrow: 'Enquiry',
  heading: 'Send a brief.',
  body: 'Fields marked with an asterisk are required. We use these details only to respond to your enquiry.',
};

export const subjectOptions = [
  { value: '', label: 'Select a subject' },
  { value: 'new-assignment', label: 'New assignment or corridor' },
  { value: 'tender', label: 'Tender, EOI or pre-qualification' },
  { value: 'second-opinion', label: 'Design review or second opinion' },
  { value: 'safety-audit', label: 'Road safety audit' },
  { value: 'careers', label: 'Careers' },
  { value: 'other', label: 'Something else' },
];

export const responsePromise = [
  { label: 'First response', value: 'Within 1 working day' },
  { label: 'Technical call', value: 'Within 3 working days' },
  { label: 'Written proposal', value: '5–10 working days' },
];

export const successCopy = {
  heading: 'Enquiry received.',
  body: 'Thank you — your brief has been logged. A member of the technical team will respond to the address you provided within one working day.',
  note: 'This site is front-end only for now: the payload is logged to the browser console instead of being sent to a server.',
  action: 'Send another enquiry',
};

export const formFields = {
  name: {
    id: 'name',
    label: 'Full name',
    type: 'text',
    autoComplete: 'name',
    placeholder: 'Priya Raghunathan',
    required: true,
  },
  email: {
    id: 'email',
    label: 'Email address',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'you@authority.gov.in',
    required: true,
  },
  phone: {
    id: 'phone',
    label: 'Phone number',
    type: 'tel',
    autoComplete: 'tel',
    placeholder: '+91 98765 43210',
    required: true,
    hint: 'Indian mobile or landline with STD code.',
  },
  subject: {
    id: 'subject',
    label: 'Subject',
    type: 'select',
    required: true,
  },
  message: {
    id: 'message',
    label: 'Your brief',
    type: 'textarea',
    placeholder: 'Corridor, length, current stage, and what you need from us.',
    required: true,
    hint: 'Minimum 20 characters.',
  },
};
