import { motion } from 'framer-motion';
import { theme } from '../theme';
import { useState } from 'react';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <section id="home" className="relative h-screen flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: theme.fonts.heading }}>
              <span className="text-white">Ktinos</span><span style={{ color: theme.colors.primary.healthGreen }}>kare</span>
            </h2>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4"
            style={{ fontFamily: theme.fonts.heading }}
          >
            Know before they show
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            style={{ fontFamily: theme.fonts.body }}
          >
            Proactive and predictive animal care for healthier, happier lives
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.1, backgroundColor: theme.colors.primary.tealWellness }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowVideo(true)}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg cursor-pointer"
            style={{ backgroundColor: theme.colors.primary.healthGreen }}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </motion.button>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white text-4xl hover:opacity-75 transition"
            >
              ×
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/J9BG0Ea3ccY?autoplay=1"
                title="Pet Care Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Hero;