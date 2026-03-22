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

const Settings = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState({ health: true, expert: true, community: false });
  const [profile, setProfile] = useState({
    name: 'Julian Alexander',
    email: 'julian.care@sanctuary.com',
    location: 'San Francisco, CA',
    accountType: 'Premium Sanctuary',
  });
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: theme.colors.neutral.lightBg, fontFamily: theme.fonts.body }}>

      {/* Sidebar */}
      <aside className="w-56 min-h-screen bg-white shadow-sm flex flex-col justify-between py-8 px-4 fixed left-0 top-0 z-40">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2" style={{ borderColor: theme.colors.primary.deepPurple }}>
              <img src={pets[0].avatar} alt="sanctuary" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Pet Sanctuary</p>
              <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>Premium Care Management</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button key={item.key}
                onClick={() => {
                  if (item.key === 'dashboard') navigate('/dashboard');
                  if (item.key === 'gps') navigate('/gps');
                  if (item.key === 'health') navigate('/health');
                  if (item.key === 'settings') navigate('/settings');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition"
                style={{
                  backgroundColor: item.key === 'settings' ? `${theme.colors.primary.healthGreen}22` : 'transparent',
                  color: item.key === 'settings' ? theme.colors.primary.deepPurple : theme.colors.neutral.gray[400],
                }}>
                <span>{item.icon}</span>{item.label}
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
      <main className="ml-56 flex-1 p-8 pb-0">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-1" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Preferences</h1>
            <p className="text-sm" style={{ color: theme.colors.neutral.gray[500] }}>Tailor your editorial petcare experience to suit your lifestyle and sanctuary needs.</p>
          </div>
          <div className="flex items-center">
            {pets.slice(0, 2).map((p, i) => (
              <img key={p.id} src={p.avatar} alt={p.petName}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                style={{ marginLeft: i > 0 ? '-10px' : 0, zIndex: 2 - i }} />
            ))}
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow"
              style={{ marginLeft: '-10px', backgroundColor: theme.colors.primary.softLavender }}>+2</div>
          </div>
        </div>

        {/* Row 1: Personal Profile + Vital Alerts */}
        <div className="grid grid-cols-3 gap-6 mb-6">

          {/* Personal Profile */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Personal Profile</h2>
                <p className="text-sm" style={{ color: theme.colors.neutral.gray[400] }}>Update your caretaker information and profile visual.</p>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setEditing(!editing)}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-semibold"
                style={{ backgroundColor: theme.colors.primary.healthGreen, fontFamily: theme.fonts.heading }}>
                ✏️ {editing ? 'Save Profile' : 'Edit Profile'}
              </motion.button>
            </div>

            <div className="flex gap-8 items-start">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border-2"
                  style={{ borderColor: theme.colors.neutral.gray[200] }}>
                  <span className="text-5xl">👤</span>
                </div>
                <button className="absolute bottom-1 right-1 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs shadow"
                  style={{ backgroundColor: theme.colors.primary.deepPurple }}>📷</button>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1">
                {[
                  { label: 'FULL NAME', key: 'name' },
                  { label: 'EMAIL ADDRESS', key: 'email' },
                  { label: 'LOCATION', key: 'location' },
                  { label: 'ACCOUNT TYPE', key: 'accountType' },
                ].map((field) => (
                  <div key={field.key}>
                    <p className="text-xs font-bold mb-1" style={{ color: theme.colors.neutral.gray[400], letterSpacing: '0.05em' }}>{field.label}</p>
                    {editing && field.key !== 'accountType' ? (
                      <input
                        className="w-full border-b-2 bg-transparent text-sm font-semibold focus:outline-none pb-1"
                        style={{ borderColor: theme.colors.primary.deepPurple, color: theme.colors.neutral.gray[800], fontFamily: theme.fonts.body }}
                        value={profile[field.key as keyof typeof profile]}
                        onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold" style={{ color: theme.colors.neutral.gray[800] }}>
                          {profile[field.key as keyof typeof profile]}
                        </p>
                        {field.key === 'accountType' && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: theme.colors.primary.healthGreen }}>ACTIVE</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vital Alerts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: `${theme.colors.primary.softLavender}22` }}>🔔</span>
              <h2 className="text-xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Vital Alerts</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'health', label: 'Health Milestones', sub: 'Vaccines and check-ups' },
                { key: 'expert', label: 'Expert Advice', sub: 'Weekly editorial content' },
                { key: 'community', label: 'Community Chat', sub: 'Direct messages and tags' },
              ].map((item) => (
                <div key={item.key} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: theme.colors.neutral.gray[800] }}>{item.label}</p>
                    <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>{item.sub}</p>
                  </div>
                  <button
                    onClick={() => setAlerts({ ...alerts, [item.key]: !alerts[item.key as keyof typeof alerts] })}
                    className="w-12 h-6 rounded-full transition-all relative flex-shrink-0"
                    style={{ backgroundColor: alerts[item.key as keyof typeof alerts] ? theme.colors.primary.healthGreen : theme.colors.neutral.gray[200] }}>
                    <span className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
                      style={{ left: alerts[item.key as keyof typeof alerts] ? '26px' : '4px' }} />
                  </button>
                </div>
              ))}
            </div>

            <button className="mt-5 text-sm font-semibold" style={{ color: theme.colors.primary.deepPurple }}>
              Configure advanced alerts →
            </button>
          </motion.div>
        </div>

        {/* Row 2: Security + Privacy */}
        <div className="grid grid-cols-3 gap-6 mb-6">

          {/* Security & Access */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-5" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Security & Access</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🔒', title: 'Password', desc: 'Last changed 4 months ago. We recommend a change every 6.', btn: 'Change Password', btnStyle: 'outline' },
                { icon: '🛡️', title: 'Two-Factor', desc: 'Keep your pet records safe with dual-layer authentication.', btn: 'Manage 2FA', btnStyle: 'filled' },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border" style={{ borderColor: theme.colors.neutral.gray[100] }}>
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <p className="font-bold text-sm mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.neutral.gray[800] }}>{item.title}</p>
                  <p className="text-xs mb-4" style={{ color: theme.colors.neutral.gray[400] }}>{item.desc}</p>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition"
                    style={item.btnStyle === 'filled'
                      ? { backgroundColor: theme.colors.primary.healthGreen, color: 'white', fontFamily: theme.fonts.heading }
                      : { border: `1.5px solid ${theme.colors.neutral.gray[300]}`, color: theme.colors.neutral.gray[700], fontFamily: theme.fonts.heading }}>
                    {item.btn}
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Privacy Portal */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                style={{ backgroundColor: theme.colors.primary.deepPurple }}>🔕</div>
              <h2 className="text-xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Privacy Portal</h2>
            </div>
            <div className="space-y-3 mb-5 flex-1">
              {[
                'Pet records are encrypted and visible only to you and your vet.',
                'GPS data is deleted every 24 hours automatically.',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-sm mt-0.5" style={{ color: theme.colors.primary.healthGreen }}>✅</span>
                  <p className="text-sm" style={{ color: theme.colors.neutral.gray[600] }}>{text}</p>
                </div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-2xl text-white font-bold flex items-center justify-center gap-2"
              style={{ backgroundColor: theme.colors.primary.deepPurple, fontFamily: theme.fonts.heading }}>
              ⬇️ Export My Data
            </motion.button>
          </motion.div>
        </div>

        {/* Danger Zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl px-6 py-5 shadow-sm flex justify-between items-center mb-0">
          <div>
            <p className="font-bold text-sm mb-1" style={{ fontFamily: theme.fonts.heading, color: '#dc2626' }}>Danger Zone</p>
            <p className="text-sm" style={{ color: theme.colors.neutral.gray[500] }}>Deleting your account will permanently erase all pet health history and sanctuary data.</p>
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="px-6 py-2 rounded-full text-sm font-semibold flex-shrink-0"
            style={{ border: `1.5px solid #dc2626`, color: '#dc2626', fontFamily: theme.fonts.heading }}>
            Close Account
          </motion.button>
        </motion.div>

        {/* Footer */}
        <div className="flex justify-between items-center py-6 mt-4" style={{ borderTop: `1px solid ${theme.colors.neutral.gray[200]}` }}>
          <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>© 2024 Ktinoskare. A Sanctuary for Every Companion</p>
          <div className="flex gap-4 text-xs" style={{ color: theme.colors.neutral.gray[400] }}>
            <button className="hover:underline">Terms of Care</button>
            <button className="hover:underline">Privacy Policy</button>
            <button className="hover:underline">Cookies</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
