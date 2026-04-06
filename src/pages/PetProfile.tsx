import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { pets } from '../data/pets';
import { theme } from '../theme';
import Sidebar from '../components/Sidebar';

const heartRateData = [40, 65, 55, 82, 70, 60, 75, 50, 68, 82, 58, 45];
const timeLabels = ['06:00', '12:00', '18:00', '00:00'];

const PetProfile = () => {
  const { id } = useParams();
  const [chartTab, setChartTab] = useState<'Day' | 'Week' | 'Month'>('Week');
  const pet = pets.find((p) => p.id === Number(id));

  if (!pet) return (
    <div className="flex items-center justify-center min-h-screen">
      <p style={{ fontFamily: theme.fonts.body }}>Pet not found.</p>
    </div>
  );

  const maxHR = Math.max(...heartRateData);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: theme.colors.neutral.lightBg, fontFamily: theme.fonts.body }}>

      <Sidebar />

      {/* Main */}
      <main className="ml-56 flex-1 p-8">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: theme.colors.primary.tealWellness }}>Live Monitoring</p>
            <h1 className="text-4xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
              Vital Sanctuary
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm">
            <img src={pet.avatar} alt={pet.petName} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>{pet.petName}</p>
              <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>{pet.breed} · {pet.age} yrs</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">

          {/* Left - Pet Info Card */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden"
            >
              {/* Status */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: theme.colors.primary.healthGreen }}></span>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.colors.primary.healthGreen }}>Stable Status</span>
              </div>

              <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>{pet.petName}</h2>
              <p className="text-sm mb-4" style={{ color: theme.colors.neutral.gray[500] }}>
                {pet.breed}, {pet.gender === 'Male' ? 'energetic' : 'graceful'} and {pet.healthStatus === 'Healthy' ? 'healthy' : 'under observation'}. Last check-up was {Math.floor(Math.random() * 20) + 5} days ago.
              </p>

              <div className="space-y-3 border-t pt-4" style={{ borderColor: theme.colors.neutral.gray[100] }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: theme.colors.neutral.gray[400] }}>Weight</span>
                  <span className="font-semibold" style={{ color: theme.colors.neutral.gray[800] }}>{pet.weight}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: theme.colors.neutral.gray[400] }}>Activity Level</span>
                  <span className="font-bold" style={{ color: theme.colors.primary.healthGreen }}>High</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: theme.colors.neutral.gray[400] }}>Next Vet Visit</span>
                  <span className="font-semibold" style={{ color: theme.colors.neutral.gray[800] }}>
                    {new Date(pet.nextCheckup).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Decorative paw */}
              <div className="absolute bottom-4 right-4 text-6xl opacity-5">🐾</div>
            </motion.div>

            {/* Health Insight Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-6 text-white"
              style={{ background: `linear-gradient(135deg, ${theme.colors.primary.deepPurple}, ${theme.colors.primary.softLavender})` }}
            >
              <div className="text-2xl mb-3">💡</div>
              <h3 className="text-lg font-bold mb-3" style={{ fontFamily: theme.fonts.heading }}>Health Insight</h3>
              <p className="text-sm opacity-85 mb-4 leading-relaxed">
                {pet.petName}'s heart rate is slightly elevated compared to resting average. This is normal following a morning walk, but monitor for the next 2 hours.
              </p>
              <div className="flex items-center gap-2 mb-4 bg-white bg-opacity-10 rounded-xl p-3">
                <span className="text-lg">✅</span>
                <p className="text-xs opacity-80">Advice confirmed by Dr. Aris</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 rounded-xl text-sm font-bold border border-white border-opacity-40 hover:bg-white hover:bg-opacity-10 transition"
                style={{ fontFamily: theme.fonts.heading }}
              >
                View Full Health Report
              </motion.button>
            </motion.div>
          </div>

          {/* Right - Vitals + Chart */}
          <div className="col-span-2 space-y-4">

            {/* Vitals Row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Heart Rate', value: '82', unit: 'BPM', sub: 'REAL-TIME', icon: '📈', bars: [3, 6, 4, 8, 5, 7, 6] },
                { label: 'Temperature', value: '38.2', unit: '°C', sub: 'LIVE SENSOR', icon: '🌡️', range: true },
                { label: 'Respiratory', value: '24', unit: 'BR/MIN', sub: 'TRACKING', icon: '💨', bars: [4, 7, 5, 6, 4, 7, 5] },
              ].map((vital, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.colors.neutral.gray[400] }}>{vital.sub}</span>
                    <span className="text-lg">{vital.icon}</span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: theme.colors.neutral.gray[500] }}>{vital.label}</p>
                  <div className="flex items-end gap-1 mb-3">
                    <span className="text-3xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>{vital.value}</span>
                    <span className="text-sm mb-1" style={{ color: theme.colors.neutral.gray[400] }}>{vital.unit}</span>
                  </div>
                  {vital.bars && (
                    <div className="flex items-end gap-1 h-8">
                      {vital.bars.map((h, j) => (
                        <div key={j} className="flex-1 rounded-sm" style={{ height: `${h * 10}%`, backgroundColor: j === 3 ? theme.colors.primary.deepPurple : `${theme.colors.primary.softLavender}55` }}></div>
                      ))}
                    </div>
                  )}
                  {vital.range && (
                    <div>
                      <div className="h-2 rounded-full mb-1 overflow-hidden" style={{ backgroundColor: theme.colors.neutral.gray[100] }}>
                        <div className="h-full rounded-full w-3/4" style={{ backgroundColor: theme.colors.primary.healthGreen }}></div>
                      </div>
                      <div className="flex justify-between text-xs" style={{ color: theme.colors.neutral.gray[400] }}>
                        <span>Normal Range</span><span>Optimal</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Heart Rate Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-lg font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[800] }}>Heart Rate Intensity</h3>
                  <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>24-hour physiological trend</p>
                </div>
                <div className="flex gap-1">
                  {(['Day', 'Week', 'Month'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setChartTab(t)}
                      className="px-3 py-1 rounded-full text-xs font-semibold transition"
                      style={{
                        backgroundColor: chartTab === t ? theme.colors.primary.deepPurple : theme.colors.neutral.gray[100],
                        color: chartTab === t ? 'white' : theme.colors.neutral.gray[500],
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bar Chart */}
              <div className="flex items-end gap-2 h-40 mt-4 mb-2">
                {heartRateData.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / maxHR) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="flex-1 rounded-t-lg"
                    style={{
                      background: val === maxHR
                        ? `linear-gradient(to top, ${theme.colors.primary.tealWellness}, ${theme.colors.primary.healthGreen})`
                        : `linear-gradient(to top, ${theme.colors.primary.healthGreen}44, ${theme.colors.primary.healthGreen}88)`,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs" style={{ color: theme.colors.neutral.gray[400] }}>
                {timeLabels.map((t) => <span key={t}>{t}</span>)}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Chat with Vet floating button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 right-8 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: theme.colors.primary.healthGreen }}>💬</div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.colors.neutral.gray[400] }}>Expert Support</p>
            <p className="text-sm font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Chat with a Vet Now</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PetProfile;
