import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '../theme';
import logo from '../assets/images/logokk-withoutbg.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed w-full z-50">
      {/* Offer Ribbon */}
      <div className="w-full py-2.5 text-center" style={{ backgroundColor: theme.colors.primary.healthGreen }}>
        <p className="text-white text-sm font-semibold" style={{ fontFamily: theme.fonts.body }}>
          🎉 Special Offer: Get 20% off your first month! Use code: <span className="font-bold">KARE20</span> 🎉
        </p>
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-white shadow-md">
        <div className="container-lg mr-5">
          <div className="flex justify-between items-center py-4">
            <img src={logo} height={30} alt="ktinoskare logo" className='h-12 w-auto'/>
          
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
                <li><button onClick={() => { navigate('/login'); setIsOpen(false); }} className="text-white px-6 py-2 rounded-lg transition font-semibold" style={{ backgroundColor: theme.colors.primary.healthGreen }}>Login</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
