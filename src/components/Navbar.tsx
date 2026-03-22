import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '../theme';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold cursor-pointer" style={{ fontFamily: theme.fonts.heading }} onClick={() => navigate('/')}>
            <span style={{ color: theme.colors.primary.deepPurple }}>Ktinos</span><em style={{ color: theme.colors.primary.healthGreen }}>kare</em>
          </div>
          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden" style={{ color: theme.colors.primary.deepPurple }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <ul className={`${isOpen ? 'block' : 'hidden'} md:flex md:space-x-8 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`} style={{ fontFamily: theme.fonts.body }}>
            <li><button onClick={() => scrollToSection('home')} className="block py-2 transition hover:opacity-80" style={{ color: theme.colors.neutral.gray[700] }}>Home</button></li>
            <li><button onClick={() => scrollToSection('about')} className="block py-2 transition hover:opacity-80" style={{ color: theme.colors.neutral.gray[700] }}>About</button></li>
            <li><button onClick={() => scrollToSection('practice-areas')} className="block py-2 transition hover:opacity-80" style={{ color: theme.colors.neutral.gray[700] }}>Features</button></li>
            <li><button onClick={() => scrollToSection('our-team')} className="block py-2 transition hover:opacity-80" style={{ color: theme.colors.neutral.gray[700] }}>Our Team</button></li>
            <li><button onClick={() => { navigate('/login'); setIsOpen(false); }} className="text-white px-6 py-2 rounded-lg transition font-semibold" style={{ backgroundColor: theme.colors.primary.healthGreen }}>Login</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
