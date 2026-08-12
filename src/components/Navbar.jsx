import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { navigation } from '@/data/site';
import { useScrolled } from '@/hooks/useScrolled';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * Floating thin-glass bar. Sticky with a gap from the viewport edge; on scroll
 * the sheen intensifies, the blur deepens and the bar tightens slightly.
 *
 * Mobile opens a glass panel that closes on Escape, locks body scroll and
 * returns focus to the trigger.
 */
export default function Navbar() {
  const scrolled = useScrolled(24);
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector('a, button')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const linkClasses = ({ isActive }) =>
    cn(
      'link-sweep relative inline-flex min-h-[44px] items-center rounded-full px-3 text-[0.9375rem] font-medium transition-colors duration-200',
      isActive ? 'text-accent-ink' : 'text-body hover:text-ink'
    );

  return (
    <header className="sticky top-3 z-header w-full md:top-4">
      <Container>
        <div
          className={cn(
            'glass-thin glass-rim flex items-center justify-between gap-4 rounded-full pl-4 pr-3 transition-all duration-500 ease-fluid sm:pl-5 sm:pr-4',
            scrolled
              ? 'h-[3.75rem] bg-white/75 shadow-glass-lg backdrop-blur-heavy'
              : 'h-[4.25rem] shadow-glass'
          )}
        >
          <Logo compact={scrolled} />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClasses}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button to="/contact" size="sm" variant="primary">
              Start an enquiry
            </Button>
          </div>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close main menu' : 'Open main menu'}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/70 text-ink shadow-glass-sm transition-all duration-200 hover:bg-white hover:-translate-y-[1px] lg:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
            )}
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-nav"
              ref={panelRef}
              initial={reduced ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="glass-read glass-rim mt-3 overflow-hidden rounded-3xl p-4 lg:hidden"
            >
              <nav aria-label="Mobile" className="flex flex-col">
                {navigation.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex min-h-[52px] items-center rounded-2xl px-4 text-[1.0625rem] font-medium transition-colors duration-200',
                        isActive ? 'bg-accent-soft text-accent-ink' : 'text-ink hover:bg-white/70'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <Button to="/contact" size="md" variant="primary" className="mt-4 w-full">
                Start an enquiry
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </header>
  );
}
