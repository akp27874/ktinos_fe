import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    login();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ backgroundColor: '#fdf8ff', fontFamily: theme.fonts.body }}>

      {/* Decorative paw top right */}
      <div className="absolute top-6 right-8 text-6xl opacity-20" style={{ color: theme.colors.primary.softLavender }}>🐾</div>
      {/* Decorative plant bottom left */}
      <div className="absolute bottom-6 left-8 text-5xl opacity-30">🌱</div>

      {/* Left Panel */}
      <div className="flex-1 flex flex-col justify-center px-16 py-12">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-10">
          <span className="text-2xl">🐾</span>
          <span className="text-xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
            Ktinos<em style={{ color: theme.colors.primary.healthGreen }}>kare</em>
          </span>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold leading-tight mb-4"
          style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}
        >
          The Curated<br />Sanctuary for your<br />pets.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm mb-8 max-w-xs"
          style={{ color: theme.colors.neutral.gray[500] }}
        >
          Elevate your pet's lifestyle with premium care management, health monitoring, and expert advice tailored to their needs.
        </motion.p>

        {/* Pet image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative w-fit"
        >
          <img
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80"
            alt="Happy pet"
            className="w-80 h-56 object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md text-sm font-semibold"
            style={{ color: theme.colors.primary.deepPurple }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors.primary.healthGreen }}></span>
            98.4% Health Vitality
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Login Card */}
      <div className="flex-1 flex flex-col justify-center items-center px-12 py-12">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
            Welcome Back
          </h2>
          <p className="text-sm mb-6" style={{ color: theme.colors.neutral.gray[400] }}>
            Sign in to manage your pet sanctuary.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[700] }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="care@petcare.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{ backgroundColor: `${theme.colors.primary.softLavender}18`, color: theme.colors.neutral.gray[700], fontFamily: theme.fonts.body }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-semibold" style={{ color: theme.colors.neutral.gray[700] }}>Password</label>
                <button type="button" className="text-xs font-semibold" style={{ color: theme.colors.primary.deepPurple }}>
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                style={{ backgroundColor: `${theme.colors.primary.softLavender}18`, color: theme.colors.neutral.gray[700], fontFamily: theme.fonts.body }}
              />
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                className="w-4 h-4 rounded"
                style={{ accentColor: theme.colors.primary.deepPurple }}
              />
              <label htmlFor="remember" className="text-sm" style={{ color: theme.colors.neutral.gray[500] }}>
                Keep me logged in
              </label>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2"
              style={{ backgroundColor: theme.colors.primary.healthGreen, fontFamily: theme.fonts.heading }}
            >
              Sign In to Dashboard →
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.neutral.gray[200] }}></div>
            <span className="text-xs font-bold tracking-widest" style={{ color: theme.colors.neutral.gray[400] }}>SOCIAL CONNECT</span>
            <div className="flex-1 h-px" style={{ backgroundColor: theme.colors.neutral.gray[200] }}></div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              style={{ backgroundColor: `${theme.colors.primary.softLavender}18`, color: theme.colors.neutral.gray[600] }}>
              <span className="text-lg">G</span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              style={{ backgroundColor: `${theme.colors.primary.softLavender}18`, color: theme.colors.neutral.gray[600] }}>
              <span className="text-sm font-bold">iOS</span>
            </motion.button>
          </div>

          <p className="text-center text-sm" style={{ color: theme.colors.neutral.gray[400] }}>
            Don't have an account?{' '}
            <button className="font-bold" style={{ color: theme.colors.primary.deepPurple }}>Create Profile</button>
          </p>
        </motion.div>

        {/* Footer links */}
        <div className="flex gap-6 mt-6 text-xs" style={{ color: theme.colors.neutral.gray[400] }}>
          <button className="hover:underline uppercase tracking-wider">Privacy Policy</button>
          <button className="hover:underline uppercase tracking-wider">Terms of Care</button>
          <button className="hover:underline uppercase tracking-wider">Help Center</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
