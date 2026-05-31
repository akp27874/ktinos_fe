import { useState, useEffect } from 'react';
import { theme } from '../theme';
import { motion } from 'framer-motion';

const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="text-white py-8" style={{ background: `linear-gradient(to right, ${theme.colors.primary.deepPurple}, ${theme.colors.primary.softLavender})` }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0" style={{ fontFamily: theme.fonts.body }}>
            <p className="text-sm">&copy; 2024 Ktinoskare. All Rights Reserved.</p>
            <p className="text-sm">Proactive care for healthier animals</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:opacity-80 transition text-2xl" style={{ color: theme.colors.primary.healthGreen }}>🐦</a>
            <a href="#" className="hover:opacity-80 transition text-2xl" style={{ color: theme.colors.primary.healthGreen }}>📘</a>
            <a href="#" className="hover:opacity-80 transition text-2xl" style={{ color: theme.colors.primary.healthGreen }}>💼</a>
            <a href="#" className="hover:opacity-80 transition text-2xl" style={{ color: theme.colors.primary.healthGreen }}>📷</a>
          </div>
        </div>
      </div>

      {showButton && (
  <motion.button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-8 right-8 rounded-full shadow-2xl flex items-center justify-center"
    style={{
  width: '50px',
  height: '70px',
  background: `linear-gradient(135deg, ${theme.colors.primary.deepPurple}, ${theme.colors.primary.tealWellness})`,
  boxShadow: '0 8px 32px rgba(99,38,180,0.5), 0 0 0 4px rgba(99,38,180,0.15)',
  border: '2px solid rgba(255,255,255,0.2)',
  borderRadius: '50px',
}}
  >
    {/* Rotating ring around button */}
    
  
    {/* Bouncing arrow */}
    <motion.span
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
      style={{
        fontSize: '22px',
        color: 'white',
        fontWeight: 'bold',
        lineHeight: 1,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </motion.span>
  </motion.button>
)}
    </footer>
  );
};

export default Footer;