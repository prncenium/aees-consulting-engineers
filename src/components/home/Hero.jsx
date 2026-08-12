import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import GlassPanel from '@/components/ui/GlassPanel';
import Placeholder from '@/components/ui/Placeholder';
import RoadLine from '@/components/ui/RoadLine';
import { hero } from '@/data/home';
import { trustChips } from '@/data/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SPRING = { type: 'spring', stiffness: 120, damping: 22, mass: 0.9 };

export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  // Subtle parallax: the glass layer drifts a little slower than the bed.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const glassY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -36]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -68]);

  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { ...SPRING, delay },
        };

  return (
    <section ref={ref} className="relative overflow-hidden pb-14 pt-8 md:pb-20 md:pt-12">
      {/* Full-bleed hero background photograph — decorative. Washed back so the
          glass panel and the copy inside it keep their contrast. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={hero.backgroundImage}
          alt=""
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/75 via-surface/55 to-surface/85" />
      </div>

      <Container>
        <motion.div style={{ y: glassY }}>
          <GlassPanel
            tier="thick"
            radius="rounded-[2rem] sm:rounded-[2.5rem]"
            className="overflow-hidden bg-white/70 px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
          >
            {/* road motif behind the panel content */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 opacity-70"
            >
              <RoadLine height={150} />
            </div>

            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <motion.p {...rise(0)} className="eyebrow">
                  {hero.eyebrow}
                </motion.p>

                <motion.h1 {...rise(0.06)} className="mt-5 text-balance">
                  {hero.headlineBefore}
                  <span className="text-accent-ink">{hero.accentWord}</span>
                  {hero.headlineAfter}
                </motion.h1>

                <motion.p {...rise(0.12)} className="mt-7 max-w-prose text-copy text-body">
                  {hero.lead}
                </motion.p>

                <motion.div {...rise(0.18)} className="mt-9 flex flex-wrap items-center gap-3.5">
                  <Button to={hero.primaryCta.to} size="lg" variant="primary">
                    {hero.primaryCta.label}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.25} />
                  </Button>
                  <Button to={hero.secondaryCta.to} size="lg" variant="secondary">
                    {hero.secondaryCta.label}
                  </Button>
                </motion.div>

                <motion.ul {...rise(0.24)} className="mt-10 flex flex-wrap gap-2.5">
                  {trustChips.map((chip) => (
                    <li
                      key={chip}
                      className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-2 text-[0.8125rem] font-medium text-meta shadow-glass-sm"
                    >
                      <Check
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-success-ink"
                        strokeWidth={2.5}
                      />
                      {chip}
                    </li>
                  ))}
                </motion.ul>
              </div>

              {/* IMAGE SLOT — hero photograph, glass-framed */}
              <motion.div
                style={{ y: artY }}
                {...(reduced
                  ? {}
                  : {
                      initial: { opacity: 0, y: 26 },
                      animate: { opacity: 1, y: 0 },
                      transition: { ...SPRING, delay: 0.16 },
                    })}
                className="lg:col-span-5"
              >
                <Placeholder
                  variant="hardhat"
                  caption={hero.imageCaptionPending}
                  src={hero.image}
                  alt={hero.imageAlt}
                  ratio="4/5"
                  radius="rounded-[1.75rem]"
                  loading="eager"
                />
              </motion.div>
            </div>
          </GlassPanel>
        </motion.div>
      </Container>
    </section>
  );
}
