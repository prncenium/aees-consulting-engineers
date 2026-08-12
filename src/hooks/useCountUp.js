import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts from 0 to `target` once `active` flips true.
 * Snaps straight to the target when the user prefers reduced motion, so the
 * number is never withheld from anyone.
 */
export function useCountUp(target, { duration = 1600, decimals = 0, active = true } = {}) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!active) return undefined;

    if (reduced) {
      setValue(target);
      return undefined;
    }

    const start = performance.now();
    const factor = Math.pow(10, decimals);

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const next = target * easeOutExpo(progress);
      setValue(Math.round(next * factor) / factor);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, decimals, active, reduced]);

  return value;
}

export default useCountUp;
