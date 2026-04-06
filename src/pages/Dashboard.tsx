import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { theme } from '../theme';
import { usePets } from '../context/PetsContext';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const { pets } = usePets();
  const featured = pets[3] ?? pets[0];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: theme.colors.neutral.lightBg, fontFamily: theme.fonts.body }}>
      <Sidebar />

      {/* Main */}
      <main className="ml-56 flex-1 p-8">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-6 text-sm font-semibold">
            {['Dashboard', 'Community', 'Expert Advice'].map((t) => (
              <button key={t} className="pb-1 transition"
                style={{
                  color: t === 'Dashboard' ? theme.colors.primary.deepPurple : theme.colors.neutral.gray[400],
                  borderBottom: t === 'Dashboard' ? `2px solid ${theme.colors.primary.deepPurple}` : 'none',
                  fontFamily: theme.fonts.heading,
                }}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="text-xl">🔔</button>
            <button className="text-xl">💬</button>
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80" alt="user" className="w-9 h-9 rounded-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* Left col */}
          <div className="col-span-2 space-y-6">

            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl font-bold leading-tight" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
                Welcome home,
              </h1>
              <h1 className="text-5xl font-bold leading-tight mb-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[300] }}>
                The Sanctuary awaits.
              </h1>
              <p className="text-sm max-w-md" style={{ color: theme.colors.neutral.gray[500] }}>
                Everything is calm. Your companions are resting comfortably, and their vitals are within the optimal range.
              </p>
            </motion.div>

            {/* Featured Pet Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-6">
              <img src={featured.avatar} alt={featured.petName} className="w-32 h-32 rounded-xl object-cover shadow" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>{featured.petName}</h2>
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${theme.colors.primary.healthGreen}22`, color: theme.colors.primary.tealWellness }}>
                    ● VITALITY OPTIMAL
                  </span>
                </div>
                <p className="text-sm italic mb-4" style={{ color: theme.colors.neutral.gray[500] }}>
                  "{featured.petName} has been 15% more active today during her morning forest walk."
                </p>
                <div className="flex gap-3">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/profile/${featured.id}`)}
                    className="px-5 py-2 rounded-full text-white text-sm font-semibold"
                    style={{ backgroundColor: theme.colors.primary.deepPurple, fontFamily: theme.fonts.heading }}>
                    View Profile
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-full text-sm font-semibold border"
                    style={{ borderColor: theme.colors.neutral.gray[300], color: theme.colors.neutral.gray[600], fontFamily: theme.fonts.heading }}>
                    Health Logs
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }} onClick={() => navigate('/health')}
                className="rounded-2xl p-6 text-white cursor-pointer" style={{ backgroundColor: theme.colors.primary.deepPurple }}>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: theme.fonts.heading }}>Health Monitoring</h3>
                <p className="text-sm opacity-80 mb-6">Deep dive into clinical-grade analytics for heart rate, respiratory patterns, and rest.</p>
                <span className="text-sm font-semibold" style={{ color: theme.colors.primary.healthGreen }}>Analyze Data →</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }} onClick={() => navigate('/gps')}
                className="rounded-2xl p-6 text-white cursor-pointer" style={{ backgroundColor: theme.colors.primary.tealWellness }}>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: theme.fonts.heading }}>GPS Tracking</h3>
                <p className="text-sm opacity-80 mb-6">{featured.petName} is currently in the 'Safe Zone'. Real-time location with 3m precision.</p>
                <span className="text-sm font-semibold text-white">Live Map →</span>
              </motion.div>
            </div>

            {/* All Pets */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>All Pets</h2>
                <button onClick={() => navigate('/users')} className="text-sm font-semibold" style={{ color: theme.colors.primary.healthGreen }}>View All →</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {pets.map((pet) => (
                  <motion.div key={pet.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03, boxShadow: `0 8px 24px ${theme.colors.primary.deepPurple}22` }}
                    className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <img src={pet.avatar} alt={pet.petName} className="w-14 h-14 rounded-full object-cover mx-auto mb-2" />
                    <p className="text-sm font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>{pet.petName}</p>
                    <p className="text-xs mb-2" style={{ color: theme.colors.neutral.gray[400] }}>{pet.breed}</p>
                    <div className="flex gap-1 justify-center">
                      <button onClick={() => navigate(`/profile/${pet.id}`)}
                        className="text-xs px-2 py-1 rounded-full text-white font-semibold"
                        style={{ backgroundColor: theme.colors.primary.deepPurple }}>Profile</button>
                      <button onClick={() => navigate(`/pet/${pet.id}`)}
                        className="text-xs px-2 py-1 rounded-full font-semibold border"
                        style={{ borderColor: theme.colors.primary.healthGreen, color: theme.colors.primary.healthGreen }}>Details</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right col */}
          <div className="space-y-6">

            {/* Health Alerts */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[700] }}>Health Alerts</h3>
                <span className="text-lg">📊</span>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Disturbed Sleep', desc: 'Detected 3 interruptions between 02:00 AM and 04:00 AM.', tag: 'NEEDS REVIEW', tagColor: theme.colors.primary.softLavender },
                  { title: 'Lower Activity', desc: 'Morning activity is 22% lower than the 7-day rolling average.', tag: 'OBSERVING', tagColor: theme.colors.primary.tealWellness },
                ].map((alert, i) => (
                  <div key={i} className="border-l-4 pl-3" style={{ borderColor: theme.colors.primary.deepPurple }}>
                    <p className="font-bold text-sm mb-1" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[800] }}>{alert.title}</p>
                    <p className="text-xs mb-2" style={{ color: theme.colors.neutral.gray[500] }}>{alert.desc}</p>
                    <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: alert.tagColor }}>{alert.tag}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Care */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: theme.colors.neutral.gray[400] }}>Upcoming Care</p>
              <div className="flex items-start gap-4 mb-4">
                <div className="rounded-xl px-3 py-2 text-center text-white min-w-[50px]" style={{ backgroundColor: theme.colors.primary.softLavender }}>
                  <p className="text-xs font-bold">OCT</p>
                  <p className="text-xl font-bold leading-tight">12</p>
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[800] }}>Veterinary Wellness Check</p>
                  <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>Central Pet Clinic · 14:30</p>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.03 }}
                className="w-full py-2 rounded-full text-sm font-semibold border"
                style={{ borderColor: theme.colors.neutral.gray[300], color: theme.colors.neutral.gray[600], fontFamily: theme.fonts.heading }}>
                View Schedule
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-sm mb-4" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[700] }}>Quick Stats</h3>
              <div className="space-y-3">
                {[
                  { label: 'Total Pets', value: pets.length, color: theme.colors.primary.deepPurple },
                  { label: 'Healthy', value: pets.filter(p => p.healthStatus === 'Healthy').length, color: theme.colors.primary.healthGreen },
                  { label: 'Needs Attention', value: pets.filter(p => p.healthStatus === 'Needs Attention').length, color: '#f59e0b' },
                  { label: 'Critical', value: pets.filter(p => p.healthStatus === 'Critical').length, color: '#ef4444' },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: theme.colors.neutral.gray[500] }}>{stat.label}</span>
                    <span className="font-bold text-sm" style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
