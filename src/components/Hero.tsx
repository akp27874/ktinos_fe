import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';
import { useState, useEffect, useRef } from 'react';

const YOUTUBE_VIDEO_ID = 'J9BG0Ea3ccY';

const slides = [
  { type: 'video' as const },
  {
    type: 'banner' as const,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920&q=80',
    heading: 'Your Pet Deserves the Best',
    subheading: 'Real-time health monitoring so you never miss a moment that matters.',
  },
  {
    type: 'banner' as const,
    image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=1920&q=80',
    heading: 'Health Insights, Anytime',
    subheading: 'AI-powered alerts and wellness scores delivered straight to your phone.',
  },
];

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const NAVBAR_HEIGHT = 120;

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const playerRef = useRef<any>(null);
  const isMountedRef = useRef(true);

  const goTo = (index: number) => setCurrent((index + slides.length) % slides.length);
  const goNext = () => goTo(current + 1);
  const goPrev = () => goTo(current - 1);

  useEffect(() => {
    isMountedRef.current = true;

    const initPlayer = () => {
      if (!isMountedRef.current) return;
      playerRef.current = new window.YT.Player('yt-player', {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          playsinline: 1,
        },
        events: {
          onStateChange: (event: any) => {
            if (event.data === 0 && isMountedRef.current) {
              goNext();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      if (!document.getElementById('yt-api-script')) {
        const script = document.createElement('script');
        script.id = 'yt-api-script';
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
      }
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      isMountedRef.current = false;
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (current === 0 && playerRef.current?.playVideo) {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
    }
  }, [current]);

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
      {/* ── YouTube video slide — always in DOM, shown/hidden with opacity ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          opacity: current === 0 ? 1 : 0,
          zIndex: current === 0 ? 1 : -1,
          transition: 'opacity 0.7s ease',
          pointerEvents: 'none',
        }}
      >
        {/* iframe wrapper — clips overflow */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
          <div
            id="yt-player"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              /* Always cover the container regardless of aspect ratio */
            width: '100%',
            height: '100%',
            }}
          />
        </div>

        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />

        {/* Text overlay */}
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 1rem', pointerEvents: 'none' }}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: current === 0 ? 1 : 0, y: current === 0 ? 0 : -30 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '1rem' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: theme.fonts.heading }}>
              <span className="text-white">Ktinos</span>
              <span style={{ color: theme.colors.primary.healthGreen }}>kare</span>
            </h2>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: current === 0 ? 1 : 0, y: current === 0 ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading, color: 'white' }}
          >
            Know before they show
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: current === 0 ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            style={{ fontFamily: theme.fonts.body, color: 'white' }}
          >
            Proactive and predictive animal care for healthier, happier lives
          </motion.p>
        </div>
      </div>

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
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 1rem' }}>
              <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: '1rem' }}>
                <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: theme.fonts.heading }}>
                  <span className="text-white">Ktinos</span>
                  <span style={{ color: theme.colors.primary.healthGreen }}>kare</span>
                </h2>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-4"
                style={{ fontFamily: theme.fonts.heading, color: 'white' }}
              >
                {(slides[current] as { type: 'banner'; heading: string }).heading}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl max-w-3xl mx-auto"
                style={{ fontFamily: theme.fonts.body, color: 'white' }}
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

      {/* ── Video badge ── */}
      {current === 0 && (
        <div
          className="absolute top-6 right-6 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-sm font-medium"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', border: `1px solid ${theme.colors.primary.healthGreen}` }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.colors.primary.healthGreen }} />
          Live Video
        </div>
      )}

      {/* ── Scroll-to-top button ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: theme.colors.primary.healthGreen }}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </section>
  );
};

export default Hero;