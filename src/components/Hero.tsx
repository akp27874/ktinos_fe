import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';
import { useState, useEffect, useRef } from 'react';

// ── YouTube video ID — swap this with any YouTube video ID ──
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

// Extend Window to include YT
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);

  const goTo = (index: number) => setCurrent((index + slides.length) % slides.length);
  const goNext = () => goTo(current + 1);
  const goPrev = () => goTo(current - 1);

  // ── Load YouTube IFrame API once ──
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
            // YT.PlayerState.ENDED = 0
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
      // Inject the script tag if not already there
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
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // ── When navigating back to video slide, restart the video ──
  useEffect(() => {
    if (current === 0 && playerRef.current && playerRef.current.playVideo) {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
    }
  }, [current]);

  return (
    <section id="home" className="relative h-screen overflow-hidden">

      {/* ── YouTube player — always mounted but hidden when not on video slide ── */}
      <div
        ref={playerContainerRef}
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{ opacity: current === 0 ? 1 : 0, zIndex: current === 0 ? 1 : -1 }}
      >
        {/* Oversized iframe to cover full section without black bars */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            id="yt-player"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '177.78vh',   /* 16/9 * 100vh */
              height: '56.25vw',  /* 9/16 * 100vw */
              minWidth: '100%',
              minHeight: '100%',
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50" />

        {/* Text overlay for video slide */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: current === 0 ? 1 : 0, y: current === 0 ? 0 : -30 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
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
            style={{ fontFamily: theme.fonts.heading }}
          >
            Know before they show
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: current === 0 ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            style={{ fontFamily: theme.fonts.body }}
          >
            Proactive and predictive animal care for healthier, happier lives
          </motion.p>
        </div>
      </div>

      {/* ── Banner slides ── */}
      <AnimatePresence mode="wait">
        {slides[current].type === 'banner' && (
          <motion.div
            key={`banner-slide-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 z-10"
            style={{
              backgroundImage: `url(${(slides[current] as { type: 'banner'; image: string }).image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: theme.fonts.heading }}>
                  <span className="text-white">Ktinos</span>
                  <span style={{ color: theme.colors.primary.healthGreen }}>kare</span>
                </h2>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-4"
                style={{ fontFamily: theme.fonts.heading }}
              >
                {(slides[current] as { type: 'banner'; heading: string }).heading}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl max-w-3xl mx-auto"
                style={{ fontFamily: theme.fonts.body }}
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
    </section>
  );
};

export default Hero;