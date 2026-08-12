import { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import PageTransition from '@/components/PageTransition';
import AuroraBackground from '@/components/ui/AuroraBackground';

/**
 * The shared shell: the aurora bed, utility strip, floating navbar, routed
 * <main> and footer. <main> is focusable (tabIndex -1) so route changes can
 * move focus to it.
 */
export default function RootLayout() {
  const mainRef = useRef(null);
  const location = useLocation();

  return (
    <div className="relative flex min-h-dvh flex-col">
      <AuroraBackground />

      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <ScrollToTop mainRef={mainRef} />

      <Header />
      <Navbar />

      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 focus:outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
