import { useState } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import { pets } from '../data/pets';
import Sidebar from '../components/Sidebar';

const safeZones = [
  { name: 'Home Sweet Home', radius: '500M RADIUS', active: true, icon: '🏠', alert: 'Entry & Exit Alerts active' },
  { name: 'Central Park', radius: '1.2KM RADIUS', active: false, icon: '🌲', alert: null },
];

const featured = pets[0];

const GpsTracking = () => {
  const [zones, setZones] = useState(safeZones);

  const toggleZone = (idx: number) => {
    setZones((prev) => prev.map((z, i) => i === idx ? { ...z, active: !z.active } : z));
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: theme.colors.neutral.lightBg, fontFamily: theme.fonts.body }}>
      <Sidebar />

      {/* Map Area */}
      <main className="ml-56 flex-1 flex">

        {/* Map */}
        <div className="flex-1 relative overflow-hidden" style={{ minHeight: '100vh' }}>
          {/* Hardcoded map using OpenStreetMap iframe */}
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1276%2C51.5074%2C-0.1076%2C51.5174&layer=mapnik"
            className="w-full h-full border-0"
            style={{ minHeight: '100vh', filter: 'saturate(0.7) brightness(1.05)' }}
            title="GPS Map"
          />

          {/* Geo-fence circle overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-full border-2 border-dashed" style={{ width: 320, height: 320, borderColor: `${theme.colors.primary.tealWellness}88`, backgroundColor: `${theme.colors.primary.tealWellness}11` }}></div>
          </div>

          {/* Pet marker */}
          <div className="absolute" style={{ top: '46%', left: '47%', transform: 'translate(-50%, -50%)' }}>
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl shadow-lg"
              style={{ backgroundColor: theme.colors.primary.deepPurple }}
            >
              🐾
            </motion.div>
          </div>

          {/* Pet popup */}
          <div className="absolute bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-3" style={{ top: '36%', left: '50%', transform: 'translateX(-50%)' }}>
            <img src={featured.avatar} alt={featured.petName} className="w-9 h-9 rounded-full object-cover" />
            <div>
              <p className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>{featured.petName} is Safe</p>
              <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>Last updated: Just now</p>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            {['+', '−', '⊕'].map((btn, i) => (
              <button key={i} className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center font-bold text-lg transition hover:bg-gray-50" style={{ color: theme.colors.primary.deepPurple }}>
                {btn}
              </button>
            ))}
          </div>

          {/* Bottom stats bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-white font-bold text-sm"
              style={{ backgroundColor: theme.colors.primary.healthGreen }}
            >
              <span>❤️</span>
              <div>
                <p className="text-xs opacity-80 leading-none">HEART RATE</p>
                <p className="text-lg leading-tight">84 BPM</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-5 py-3 rounded-full shadow-lg font-bold text-sm bg-white"
              style={{ color: theme.colors.primary.deepPurple }}
            >
              <span>🔋</span>
              <div>
                <p className="text-xs opacity-60 leading-none">TRACKER</p>
                <p className="text-lg leading-tight">68%</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 bg-white shadow-sm p-6 flex flex-col gap-6 overflow-y-auto" style={{ minHeight: '100vh' }}>

          {/* Geo-fencing header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Geo-fencing</h2>
              <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: theme.colors.primary.healthGreen }}>
                <span className="w-2 h-2 rounded-full bg-white inline-block"></span> LIVE
              </span>
            </div>
            <p className="text-sm" style={{ color: theme.colors.neutral.gray[500] }}>
              Designate secure areas for your pet. Receive instant alerts if {featured.petName} departs from these predefined zones.
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ backgroundColor: theme.colors.neutral.lightBg }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl" style={{ backgroundColor: theme.colors.primary.healthGreen }}>
              🛡️
            </div>
            <div>
              <p className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[800] }}>Status: Within Zone</p>
              <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>Currently in "Home Sweet Home"</p>
            </div>
          </div>

          {/* Active Safe Zones */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <p className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Active Safe Zones</p>
              <button className="text-xs font-semibold" style={{ color: theme.colors.primary.healthGreen }}>Manage All</button>
            </div>
            <div className="space-y-3">
              {zones.map((zone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 rounded-2xl border"
                  style={{ borderColor: theme.colors.neutral.gray[100] }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: theme.colors.neutral.lightBg }}>
                        {zone.icon}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[800] }}>{zone.name}</p>
                        <p className="text-xs font-bold" style={{ color: theme.colors.neutral.gray[400] }}>{zone.radius}</p>
                      </div>
                    </div>
                    {/* Toggle */}
                    <button
                      onClick={() => toggleZone(idx)}
                      className="w-12 h-6 rounded-full transition-all relative"
                      style={{ backgroundColor: zone.active ? theme.colors.primary.healthGreen : theme.colors.neutral.gray[200] }}
                    >
                      <span
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
                        style={{ left: zone.active ? '26px' : '4px' }}
                      />
                    </button>
                  </div>
                  {zone.alert && (
                    <p className="text-xs mt-2 flex items-center gap-1" style={{ color: theme.colors.neutral.gray[400] }}>
                      🔔 {zone.alert}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Notification Preferences */}
          <div>
            <p className="font-bold text-sm mb-3" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Notification Preferences</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '📱', title: 'Push Alerts', sub: 'Immediate mobile ping' },
                { icon: '📞', title: 'Emergency Call', sub: 'On exit after 5m' },
              ].map((pref, i) => (
                <div key={i} className="p-3 rounded-2xl" style={{ backgroundColor: theme.colors.neutral.lightBg }}>
                  <span className="text-2xl">{pref.icon}</span>
                  <p className="font-bold text-sm mt-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[800] }}>{pref.title}</p>
                  <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>{pref.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Create Safe Zone CTA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 mt-auto"
            style={{ backgroundColor: theme.colors.primary.deepPurple, fontFamily: theme.fonts.heading }}
          >
            📍 Create New Safe Zone
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default GpsTracking;
