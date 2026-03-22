import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import { pets } from '../data/pets';

const navItems = [
  { icon: '🐾', label: 'Pets Dashboard', key: 'dashboard' },
  { icon: '📍', label: 'GPS Tracking', key: 'gps' },
  { icon: '💊', label: 'Health Monitoring', key: 'health' },
  { icon: '⚙️', label: 'Settings', key: 'settings' },
];

const activityData = {
  Daily:  [40, 65, 50, 80, 55, 30, 20],
  Weekly: [60, 75, 55, 85, 70, 35, 25],
};
const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const weeklyTrends = [
  { icon: '📈', label: 'Social Engagement', sub: 'Time spent with other dogs at the park.', value: '+24%', color: theme.colors.primary.healthGreen, barW: '60%' },
  { icon: '🍽️', label: 'Calorie Burn', sub: 'Estimated energy expenditure daily.', value: '1,240', color: theme.colors.primary.softLavender, barW: '75%' },
  { icon: '💧', label: 'Hydration Index', sub: 'Water intake frequency tracking.', value: 'Optimal', color: theme.colors.primary.tealWellness, barW: '85%' },
  { icon: '😌', label: 'Stress Levels', sub: 'Barking and erratic movement rate.', value: 'Low', color: theme.colors.neutral.gray[300], barW: '20%' },
];

const featured = pets[3]; // Luna

const HealthMonitoring = () => {
  const navigate = useNavigate();
  const [activityTab, setActivityTab] = useState<'Daily' | 'Weekly'>('Weekly');
  const maxActivity = Math.max(...activityData[activityTab]);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: theme.colors.neutral.lightBg, fontFamily: theme.fonts.body }}>

      {/* Sidebar */}
      <aside className="w-56 min-h-screen bg-white shadow-sm flex flex-col justify-between py-8 px-4 fixed left-0 top-0 z-40">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2" style={{ borderColor: theme.colors.primary.deepPurple }}>
              <img src={featured.avatar} alt="sanctuary" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Pet Sanctuary</p>
              <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>Premium Care Management</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  if (item.key === 'dashboard') navigate('/dashboard');
                  if (item.key === 'gps') navigate('/gps');
                  if (item.key === 'health') navigate('/health');
                  if (item.key === 'settings') navigate('/settings');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition"
                style={{
                  backgroundColor: item.key === 'health' ? `${theme.colors.primary.healthGreen}22` : 'transparent',
                  color: item.key === 'health' ? theme.colors.primary.deepPurple : theme.colors.neutral.gray[400],
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-3">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="w-full py-2 rounded-full text-white font-bold text-sm"
            style={{ backgroundColor: theme.colors.primary.healthGreen, fontFamily: theme.fonts.heading }}>
            + Add New Pet
          </motion.button>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm" style={{ color: theme.colors.neutral.gray[400] }}>❓ Support</button>
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-2 px-4 py-2 text-sm" style={{ color: theme.colors.neutral.gray[400] }}>↩ Logout</button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 p-8">

        {/* Breadcrumb + Title */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm mb-1" style={{ color: theme.colors.neutral.gray[400] }}>
              <span className="cursor-pointer hover:underline" onClick={() => navigate('/dashboard')}>Dashboard</span>
              <span className="mx-2">›</span>
              <span style={{ color: theme.colors.primary.deepPurple, fontWeight: 600 }}>Health Monitoring</span>
            </p>
            <h1 className="text-4xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
              {featured.petName}'s Vitality
            </h1>
            <p className="text-sm mt-1" style={{ color: theme.colors.neutral.gray[400] }}>
              Detailed analysis for February 12th – February 18th
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold"
              style={{ backgroundColor: theme.colors.primary.healthGreen, fontFamily: theme.fonts.heading }}>
              ⚡ Optimal Recovery
            </motion.div>
            <img src={featured.avatar} alt={featured.petName} className="w-10 h-10 rounded-full object-cover shadow" />
          </div>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* Health Alerts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 border"
            style={{ backgroundColor: '#fff5f5', borderColor: '#fecaca' }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🔔</span>
              <h3 className="font-bold text-lg" style={{ fontFamily: theme.fonts.heading, color: '#dc2626' }}>Health Alerts</h3>
              <span className="ml-auto text-2xl">⚠️</span>
            </div>
            <div className="space-y-3">
              {[
                { icon: '🌙', title: 'Disturbed Sleep', desc: `${featured.petName} woke up 4 times last night between 2:00 AM and 4:30 AM.` },
                { icon: '🏃', title: 'Lower Activity', desc: 'Movement is 15% below her weekly average today.' },
              ].map((alert, i) => (
                <div key={i} className="bg-white rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{alert.icon}</span>
                    <p className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[800] }}>{alert.title}</p>
                  </div>
                  <p className="text-xs" style={{ color: theme.colors.neutral.gray[500] }}>{alert.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity Monitoring */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-bold text-lg" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[800] }}>Activity Monitoring</h3>
                <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>Step count and active minutes</p>
              </div>
              <div className="flex gap-1">
                {(['Daily', 'Weekly'] as const).map((t) => (
                  <button key={t} onClick={() => setActivityTab(t)}
                    className="px-3 py-1 rounded-full text-xs font-semibold transition"
                    style={{
                      backgroundColor: activityTab === t ? theme.colors.primary.deepPurple : theme.colors.neutral.lightBg,
                      color: activityTab === t ? 'white' : theme.colors.neutral.gray[500],
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-2 h-32 mt-4 mb-2">
              {activityData[activityTab].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  {i === 6 && <span className="text-xs font-bold text-white px-1 rounded" style={{ backgroundColor: '#ef4444', fontSize: '10px' }}>Low</span>}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / maxActivity) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="w-full rounded-t-lg"
                    style={{
                      backgroundColor: i === 6 ? '#ef4444' : i === days.indexOf('SAT') ? theme.colors.primary.healthGreen : `${theme.colors.primary.softLavender}55`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs" style={{ color: theme.colors.neutral.gray[400] }}>
              {days.map((d) => <span key={d}>{d}</span>)}
            </div>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* Daily Insights */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">✨</span>
              <h3 className="font-bold text-lg" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Daily Insights</h3>
            </div>
            <p className="text-sm italic mb-6 leading-relaxed" style={{ color: theme.colors.neutral.gray[600] }}>
              "{featured.petName}'s restless night correlates with the drop in daytime activity. Consider a shorter, more engaging walk this evening to stimulate her mind without over-exerting her joints."
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Hydration:', value: 'Normal' },
                { label: 'Mood:', value: 'Calm' },
              ].map((tag, i) => (
                <div key={i} className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: theme.colors.neutral.lightBg, color: theme.colors.neutral.gray[600] }}>
                  <span className="font-semibold">{tag.label}</span> {tag.value}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sleep Monitoring */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-lg" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[800] }}>Sleep Monitoring</h3>
              <div className="text-right">
                <p className="text-2xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>8h 42m</p>
                <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>AVERAGE REST</p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 mb-3 text-xs" style={{ color: theme.colors.neutral.gray[500] }}>
              {[
                { color: theme.colors.primary.deepPurple, label: 'Deep Sleep' },
                { color: theme.colors.primary.softLavender, label: 'Light Sleep' },
                { color: '#ef4444', label: 'Awake' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: l.color }}></span>
                  {l.label}
                </div>
              ))}
            </div>

            {/* Sleep bar */}
            <div className="flex h-10 rounded-xl overflow-hidden mb-4">
              <div style={{ width: '15%', backgroundColor: theme.colors.primary.softLavender }}></div>
              <div style={{ width: '45%', backgroundColor: theme.colors.primary.deepPurple }}></div>
              <div style={{ width: '5%', backgroundColor: '#ef4444' }}></div>
              <div style={{ width: '25%', backgroundColor: theme.colors.primary.deepPurple }}></div>
              <div style={{ width: '5%', backgroundColor: '#ef4444' }}></div>
              <div style={{ width: '5%', backgroundColor: theme.colors.primary.softLavender }}></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Efficiency', value: '92%', color: theme.colors.primary.healthGreen },
                { label: 'Interruptions', value: '4 Times', color: '#ef4444' },
                { label: 'Heart Rate', value: '54 BPM', color: theme.colors.neutral.gray[700] },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl" style={{ backgroundColor: theme.colors.neutral.lightBg }}>
                  <p className="text-xs mb-1" style={{ color: theme.colors.neutral.gray[400] }}>{stat.label}</p>
                  <p className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading, color: stat.color }}>{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Weekly Trend Analysis */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
            Weekly Trend Analysis
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {weeklyTrends.map((trend, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ backgroundColor: theme.colors.neutral.lightBg }}>
                  {trend.icon}
                </div>
                <p className="font-bold text-sm mb-1" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[800] }}>{trend.label}</p>
                <p className="text-xs mb-3" style={{ color: theme.colors.neutral.gray[400] }}>{trend.sub}</p>
                <p className="text-xl font-bold mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>{trend.value}</p>
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.colors.neutral.gray[100] }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: trend.barW }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: trend.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HealthMonitoring;
