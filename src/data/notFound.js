/** 404 and router error copy. */

export const notFound = {
  code: '404',
  eyebrow: 'Chainage not found',
  heading: 'This alignment does not exist.',
  body: 'The page you asked for is not on this site. It may have been moved, renamed, or never surveyed in the first place.',
  links: [
    { label: 'Home', to: '/', note: 'Start again from the top of the corridor.' },
    { label: 'Sectors', to: '/sectors', note: 'The ten core engineering sectors we work across.' },
    { label: 'Project register', to: '/projects', note: 'Search completed and ongoing assignments.' },
    { label: 'Contact us', to: '/contact', note: 'Tell us what you were looking for.' },
  ],
};

export const routeError = {
  code: 'ERR',
  eyebrow: 'Unexpected condition',
  heading: 'Something failed to load.',
  body: 'An unexpected error interrupted this page. Reloading usually clears it. If it persists, please let us know what you were trying to reach.',
  primary: { label: 'Reload this page', action: 'reload' },
  secondary: { label: 'Return home', to: '/' },
};
