import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';
import { useState, useCallback, useEffect } from 'react';
import hero1 from '../assets/images/hero1.jpeg';
import herocat3 from '../assets/images/Top-banner_2.png';

const slides = [
  {
    type: 'banner' as const,
    image: hero1,
    heading: 'For The Ones Who Can\'t Tell You',
    subheading: 'Transform daily activity into meaningful health insights powered by AI.',
  },
  {
    type: 'banner' as const,
    image: herocat3,
    heading: 'Because Family Isn\'t Always Human',
    subheading: 'Transform daily activity into meaningful health insights powered by AI.',
  },
];

const NAVBAR_HEIGHT = 120;

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => setCurrent((index + slides.length) % slides.length);
  const goNext = useCallback(() => {
    setCurrent((value) => (value + 1) % slides.length);
  }, []);
  const goPrev = useCallback(() => {
    setCurrent((value) => (value - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(goNext, 5000);

    return () => window.clearInterval(interval);
  }, [goNext]);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        overflow: 'hidden',
      }}
    >
      {/* ── Banner slides ── */}
      <AnimatePresence mode="wait">
        {slides[current].type === 'banner' && (
          <motion.div
            key={`banner-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              backgroundImage: `url(${(slides[current] as { type: 'banner'; image: string }).image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', textAlign: 'left', padding: '0 clamp(1.5rem, 5vw, 5rem)', maxWidth: 'min(52rem, 72%)' }}>
              <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: '0.4rem' }}>
                <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: theme.fonts.heading }}>
                  <span className="text-white">Ktinos</span>
                  <span style={{ color: theme.colors.primary.healthGreen }}>kare</span>
                </h2>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold mb-2"
                style={{ fontFamily: theme.fonts.heading, color: 'white', lineHeight: 1.08, whiteSpace: 'nowrap', fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}
              >
                {(slides[current] as { type: 'banner'; heading: string }).heading}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base md:text-xl max-w-xl"
                style={{ fontFamily: theme.fonts.handwritten, color: 'white', lineHeight: 1.25 }}
              >
                {(slides[current] as { type: 'banner'; subheading: string }).subheading}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Left Arrow ── */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: 'rgba(0,0,0,0.45)', border: `2px solid ${theme.colors.primary.healthGreen}` }}
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* ── Right Arrow ── */}
      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: 'rgba(0,0,0,0.45)', border: `2px solid ${theme.colors.primary.healthGreen}` }}
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ── Dot Indicators ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '28px' : '10px',
              height: '10px',
              backgroundColor: i === current ? theme.colors.primary.healthGreen : 'rgba(255,255,255,0.5)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default Hero;