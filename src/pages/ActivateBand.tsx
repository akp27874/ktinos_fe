
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, MessageSquare, PawPrint, ShieldIcon, UserPlus } from 'lucide-react';
import { theme } from '../theme';
import { PawIcon } from '../components/PawIcon';

const steps = [
  {
    number: '1.',
    icon: UserPlus,
    title: 'Sign up & Login to your Account',
    description: 'Create your account or log in to get started with your Ktinoskare tracker.',
  },
  {
    number: '2.',
    icon: PawPrint,
    title: 'Add your pet',
    description: 'Click “Add New Pet”, fill in the required details, and submit the form.',
  },
  {
    number: '3.',
    icon: CreditCard,
    title: 'Choose your subscription',
    description: 'Choose the subscription model that suits you best and submit your selection.',
  },
];

const ActivateBand = () => {
  const navigate = useNavigate();

  const handleActivation = () => {
    navigate('/login');
  };

  return (
    <>
      <main
        style={{
          minHeight: '100vh',
          padding: '150px 24px 96px',
          background: 'linear-gradient(180deg, rgba(155,89,182,0.04), rgba(255,255,255,1))',
          fontFamily: theme.fonts.body,
          color: theme.colors.neutral.gray[900],
        }}
      >
      <style>{`
        .activate-band-steps {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        @media (max-width: 768px) {
          .activate-band-steps {
            grid-template-columns: 1fr;
            gap: 44px;
          }
        }
      `}</style>
      <section style={{ maxWidth: '1180px', margin: '0 auto', textAlign: 'center' }}>
        <h1
          style={{
            margin: '0 auto',
            color: theme.colors.neutral.gray[800],
            fontFamily: theme.fonts.heading,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            lineHeight: 1.25,
            fontWeight: 800,
          }}
        >
          Activate your band in{' '}
          <span
            style={{
              backgroundImage: `linear-gradient(90deg, ${theme.colors.primary.deepPurple} 0%, ${theme.colors.primary.softLavender} 45%, ${theme.colors.primary.tealWellness} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            3 Easy Steps
          </span>
        </h1>
        <p style={{ maxWidth: '690px', margin: '16px auto 0', lineHeight: 1.7, color: theme.colors.neutral.gray[600] }}>
          You have received your Ktinoskare tracker? Follow these three simple steps to connect it and start caring for your pet.
        </p>

        <motion.button
          type="button"
          onClick={handleActivation}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: '24px',
            padding: '13px 30px',
            border: 0,
            borderRadius: '999px',
            background: theme.colors.primary.deepPurple,
            color: '#fff',
            fontFamily: theme.fonts.body,
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 10px 24px rgba(106, 27, 154, 0.22)',
          }}
        >
          Activate your band
        </motion.button>

        <div
          style={{
            display: 'grid',
            gap: '48px',
            marginTop: '58px',
            textAlign: 'center',
          }}
          className="activate-band-steps"
        >
          {steps.map((step) => (
            <article key={step.number} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <div style={{ width: '220px', height: '170px', padding: '12px', borderRadius: '16px', background: '#fff', border: '2px solid #fff', boxShadow: '0 20px 30px rgba(106,27,154,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '104px', height: '104px', borderRadius: '32px', background: 'rgba(155,89,182,0.10)', color: theme.colors.primary.deepPurple, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <step.icon size={58} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '-14px', right: '-14px', width: '38px', height: '38px', borderRadius: '999px', backgroundColor: theme.colors.primary.deepPurple, color: '#fff', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(106,27,154,0.2)' }}>
                  {step.number.replace('.', '')}
                </div>
              </div>
              <h2 style={{ maxWidth: '285px', margin: 0, fontFamily: theme.fonts.heading, fontSize: '1.15rem', lineHeight: 1.35, color: theme.colors.neutral.gray[800], fontWeight: 800 }}>
                {step.title}
              </h2>
              <p style={{ maxWidth: '285px', margin: '10px auto 0', lineHeight: 1.6, fontSize: '0.92rem', color: theme.colors.neutral.gray[600] }}>
                {step.description}
              </p>
            </article>
          ))}
        </div>

        
        </section>
      </main>

      <footer className="bg-gray-900 py-8 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-7 items-center">
            {[
              { icon: <PawPrint className="w-6 h-6 text-white" />, title: 'Trusted by', sub: 'Pet Parents' },
              { icon: <ShieldIcon className="w-6 h-6 text-white" />, title: 'Veterinarian', sub: 'Recommended' },
              { icon: <ShieldIcon className="w-6 h-6 text-white" />, title: 'Safe & Secure', sub: 'Technology' },
              { icon: <MessageSquare className="w-6 h-6 text-white" />, title: 'Dedicated Customer', sub: 'Support' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 text-white">
                <div className="opacity-80 flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs font-bold leading-tight">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <PawIcon className="w-5 h-5" style={{ color: theme.colors.primary.tealWellness }} />
              <span className="text-white font-extrabold text-sm tracking-widest uppercase">Ktinoskare</span>
            </div>
            <p className="font-extrabold text-sm text-center" style={{ color: theme.colors.primary.softLavender }}>
              Because They Deserve the Best Care{' '}
              <span style={{ color: theme.colors.primary.deepPurple }}>❤</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ActivateBand;