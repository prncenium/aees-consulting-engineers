import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Route-level transition: a soft, weighty settle on a low-stiffness spring.
 * Reduced-motion users get the page with no transform at all.
 */
export default function PageTransition({ children }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 130, damping: 24, mass: 0.9 }}
    >
      {children}
    </motion.div>
  );
}
