import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import logo from '../assets/images/logokk-withoutbg.png';
import { useAuth } from '../context/AuthContext';

const TICKER_ITEMS = [
  '🎉 Special Offer — 20% off your first month! Use code KARE20',
  '✨ Track your pet\'s health in real-time',
  '🐾 GPS Tracking now available for all pets',
  '💊 Never miss a vet appointment again',
  '🏥 Smart health monitoring at your fingertips',
  '🚀 Join thousands of happy pet owners today',
];

const tickerText = TICKER_ITEMS.join('   ✦   ') + '   ✦   ';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed w-full z-50">
      {/* Ticker Banner */}
      <div className="w-full overflow-hidden relative"
        style={{
          background: `linear-gradient(90deg, #1a0533, ${theme.colors.primary.deepPurple}, #0d3d56, ${theme.colors.primary.tealWellness}, #0d3d56, ${theme.colors.primary.deepPurple}, #1a0533)`,
          backgroundSize: '400% 100%',
          animation: 'gradientPan 8s ease infinite',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 2px 20px rgba(99,38,180,0.4)',
        }}>
        {/* shimmer overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)', animation: 'shimmer 3s ease infinite' }} />
        <div className="flex py-2.5">
          <motion.div
            className="flex whitespace-nowrap text-sm font-semibold"
            style={{ fontFamily: theme.fonts.body }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}>
            {[tickerText, tickerText].map((t, i) => (
              <span key={i} className="flex items-center gap-1 pr-4" style={{ color: 'rgba(255,255,255,0.95)', textShadow: '0 0 12px rgba(255,255,255,0.3)' }}>
                {t.split('KARE20').map((part, j, arr) => (
                  <span key={j}>
                    {part}
                    {j < arr.length - 1 && (
                      <motion.span
                        className="inline-block px-2 py-0.5 rounded font-bold mx-1 text-xs"
                        style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#1a0533', letterSpacing: '0.08em', boxShadow: '0 0 8px rgba(255,215,0,0.6)' }}
                        animate={{ scale: [1, 1.12, 1], boxShadow: ['0 0 8px rgba(255,215,0,0.6)', '0 0 18px rgba(255,215,0,0.9)', '0 0 8px rgba(255,215,0,0.6)'] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}>
                        KARE20
                      </motion.span>
                    )}
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
        <style>{`
          @keyframes gradientPan { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        `}</style>
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-white shadow-md">
        <div className="container-lg mr-5">
          <div className="flex justify-between items-center py-4">
            <img src={logo} height={30} alt="ktinoskare logo" className='h-12 w-auto cursor-pointer' onClick={() => navigate('/dashboard')} />
          
            <div className="flex items-center gap-4">
              <button onClick={() => setIsOpen(!isOpen)} className="md:hidden" style={{ color: theme.colors.primary.deepPurple }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <ul className={`${isOpen ? 'block' : 'hidden'} md:flex md:space-x-8 absolute md:relative top-24 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`} style={{ fontFamily: theme.fonts.body }}>
            {/* <li><button onClick={() => scrollToSection('home')} className="block py-2 transition hover:opacity-80" style={{ color: theme.colors.neutral.gray[700] }}>Home</button></li>
            <li><button onClick={() => scrollToSection('about')} className="block py-2 transition hover:opacity-80" style={{ color: theme.colors.neutral.gray[700] }}>About</button></li>
            <li><button onClick={() => scrollToSection('practice-areas')} className="block py-2 transition hover:opacity-80" style={{ color: theme.colors.neutral.gray[700] }}>Features</button></li>
            <li><button onClick={() => scrollToSection('our-team')} className="block py-2 transition hover:opacity-80" style={{ color: theme.colors.neutral.gray[700] }}>Our Team</button></li> */}
                {isHome && !isLoggedIn
                  && <li><button onClick={() => { navigate('/login'); setIsOpen(false); }} className="text-white px-6 py-2 rounded-lg transition font-semibold" style={{ backgroundColor: theme.colors.primary.healthGreen }}>Login</button></li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
