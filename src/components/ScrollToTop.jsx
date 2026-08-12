import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * On every route change: jump to the top of the document and move keyboard
 * focus to <main>, so screen-reader and keyboard users start at the new page
 * rather than wherever the previous one left them.
 *
 * Hash links (#anchors) are left alone.
 */
export default function ScrollToTop({ mainRef }) {
  const { pathname, hash } = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const node = mainRef?.current;
    if (node) {
      // Focus without scrolling the freshly-reset viewport back down.
      node.focus({ preventScroll: true });
    }
  }, [pathname, hash, reduced, mainRef]);

  return null;
}
