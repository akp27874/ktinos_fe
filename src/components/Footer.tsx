import { theme } from '../theme';

const Footer = () => {
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
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="fixed bottom-8 right-8 text-white p-4 rounded-full shadow-lg transition hover:opacity-90"
        style={{ backgroundColor: theme.colors.primary.healthGreen }}
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;
