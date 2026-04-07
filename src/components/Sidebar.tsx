import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';
import { ENDPOINTS } from '../config/api';
import axiosInstance from '../config/axiosInstance';
import { usePets } from '../context/PetsContext';
import { useAuth } from '../context/AuthContext';

interface SpeciesOption { id: number; name: string; }
interface BreedOption { id: number; name: string; species: number; }

const navItems = [
  { icon: '🐾', label: 'Pets Dashboard', key: 'dashboard', path: '/dashboard' },
  { icon: '📍', label: 'GPS Tracking', key: 'gps', path: '/gps' },
  { icon: '💊', label: 'Health Monitoring', key: 'health', path: '/health' },
  { icon: '⚙️', label: 'Settings', key: 'settings', path: '/settings' },
];

const emptyForm = { petName: '', species: '', speciesId: '', breed: '', breedId: '', age: '', weight: '', gender: 'Male', dob: '', color: '', device: '', ownerName: '', ownerEmail: '', ownerPhone: '' };

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pets: allPets, addPet, refetch } = usePets();
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [speciesList, setSpeciesList] = useState<SpeciesOption[]>([]);
  const [breedList, setBreedList] = useState<BreedOption[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  const activeKey = navItems.find(n => n.path === location.pathname)?.key ?? '';

  useEffect(() => {
    axiosInstance.get(ENDPOINTS.species)
      .then(res => setSpeciesList(res.data.results ?? []))
      .catch(() => setSpeciesList([]));
  }, []);

  useEffect(() => {
    if (!form.speciesId) { setBreedList([]); return; }
    axiosInstance.get(ENDPOINTS.breeds(form.speciesId))
      .then(res => setBreedList(res.data.results ?? []))
      .catch(() => setBreedList([]));
  }, [form.speciesId]);

  console.log(speciesList,"speciesList")
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const payload = {
      owner: 1,
      device: Number(form.device),
      name: form.petName,
      breedId: Number(form.breedId),
      species: form.species,
      gender: form.gender,
      dob: form.dob || today,
      age: 0,
      weight: Number(form.weight) || 0,
      color: form.color || '',
      vaccinated: false,
      lastCheckup: today,
      nextCheckup: nextMonth,
      healthStatus: 'Healthy',
      notes: '',
      avatar: photoPreview || '',
    };
    try {
      await axiosInstance.post(ENDPOINTS.addPet, payload);
      // only add to local state and show success if API succeeds
      const newPet = {
        id: Date.now(),
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        petName: form.petName,
        species: form.species,
        speciesId: Number(form.speciesId),
        breed: form.breed,
        breedId: Number(form.breedId),
        age: Number(form.age),
        weight: form.weight,
        gender: form.gender,
        color: form.color,
        vaccinated: false,
        lastCheckup: today,
        nextCheckup: nextMonth,
        healthStatus: 'Healthy' as const,
        notes: '',
        avatar: photoPreview || `https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80`,
      };
      addPet(newPet);
      refetch();
      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setForm(emptyForm);
        setPhotoPreview('');
        setSubmitted(false);
      }, 1500);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: unknown } })?.response?.data;
      setApiError(msg ? JSON.stringify(msg) : 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <aside className="w-56 min-h-screen bg-white shadow-sm flex flex-col justify-between py-8 px-4 fixed left-0 top-0 z-40">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2" style={{ borderColor: theme.colors.primary.deepPurple }}>
              <img src={allPets[0]?.avatar} alt="sanctuary" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>Pet Sanctuary</p>
              <p className="text-xs" style={{ color: theme.colors.neutral.gray[400] }}>Premium Care Management</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button key={item.key} onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition"
                style={{
                  backgroundColor: activeKey === item.key ? `${theme.colors.primary.healthGreen}22` : 'transparent',
                  color: activeKey === item.key ? theme.colors.primary.deepPurple : theme.colors.neutral.gray[400],
                }}>
                <span>{item.icon}</span>{item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-3">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            className="w-full py-2 rounded-full text-white font-bold text-sm"
            style={{ backgroundColor: theme.colors.primary.healthGreen, fontFamily: theme.fonts.heading }}>
            + Add New Pet
          </motion.button>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm" style={{ color: theme.colors.neutral.gray[400] }}>
            ❓ Support
          </button>
          <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm" style={{ color: theme.colors.neutral.gray[400] }}>
            ↩ Logout
          </button>
        </div>
      </aside>

      {/* Add New Pet Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[75vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-5 py-3 border-b" style={{ borderColor: theme.colors.neutral.gray[100] }}>
                <div>
                  <h2 className="text-xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
                    Add New Pet
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: theme.colors.neutral.gray[400] }}>Fill in the details to register a new pet</p>
                </div>
                <button onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-gray-100 transition"
                  style={{ color: theme.colors.neutral.gray[500] }}>×</button>
              </div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="text-6xl mb-4">🐾</div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
                    Pet Added Successfully!
                  </h3>
                  <p className="text-sm text-center" style={{ color: theme.colors.neutral.gray[400] }}>
                    Your new pet has been registered to the sanctuary.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="px-5 py-3 space-y-3">

                  {/* Row 1: Pet Name + Species */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>Pet Name</label>
                      <input type="text" placeholder="e.g. Buddy" value={form.petName}
                        onChange={e => setForm({ ...form, petName: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg text-xs focus:outline-none border"
                        style={{ borderColor: theme.colors.neutral.gray[200], fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>Species</label>
                      <select value={form.speciesId}
                        onChange={e => {
                          const selected = speciesList.find(s => String(s.id) === e.target.value);
                          setForm({ ...form, speciesId: e.target.value, species: selected?.name ?? '', breed: '', breedId: '' });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg text-xs focus:outline-none border"
                        style={{ borderColor: theme.colors.neutral.gray[200], fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }}>
                        <option value="">Select species</option>
                        {speciesList.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Breed + DOB */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>Breed</label>
                      <select value={form.breedId}
                        onChange={e => {
                          const selected = breedList.find(b => String(b.id) === e.target.value);
                          setForm({ ...form, breedId: e.target.value, breed: selected?.name ?? '' });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg text-xs focus:outline-none border"
                        style={{ borderColor: theme.colors.neutral.gray[200], fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }}>
                        <option value="">Select breed</option>
                        {breedList.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>Date of Birth</label>
                      <input type="date" value={form.dob}
                        onChange={e => setForm({ ...form, dob: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg text-xs focus:outline-none border"
                        style={{ borderColor: theme.colors.neutral.gray[200], fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }} />
                    </div>
                  </div>

                  {/* Row 3: Weight + Gender */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>Weight (kg)</label>
                      <input type="number" placeholder="e.g. 10" value={form.weight}
                        onChange={e => setForm({ ...form, weight: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg text-xs focus:outline-none border"
                        style={{ borderColor: theme.colors.neutral.gray[200], fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>Gender</label>
                      <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg text-xs focus:outline-none border"
                        style={{ borderColor: theme.colors.neutral.gray[200], fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }}>
                        <option>Male</option><option>Female</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Color + Device */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>Color</label>
                      <input type="text" placeholder="e.g. Golden" value={form.color}
                        onChange={e => setForm({ ...form, color: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg text-xs focus:outline-none border"
                        style={{ borderColor: theme.colors.neutral.gray[200], fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>Device ID</label>
                      <input type="number" placeholder="e.g. 10" value={form.device}
                        onChange={e => setForm({ ...form, device: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg text-xs focus:outline-none border"
                        style={{ borderColor: theme.colors.neutral.gray[200], fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }} />
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>Pet Photo</label>
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border flex items-center justify-center"
                        style={{ borderColor: theme.colors.neutral.gray[200], backgroundColor: theme.colors.neutral.lightBg }}>
                        {photoPreview
                          ? <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                          : <span className="text-2xl">🐾</span>
                        }
                      </div>
                      <label className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition hover:opacity-80"
                        style={{ borderColor: theme.colors.primary.deepPurple, color: theme.colors.primary.deepPurple, fontFamily: theme.fonts.heading }}>
                        📷 {photoPreview ? 'Change Photo' : 'Upload Photo'}
                        <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => { setShowModal(false); setApiError(''); }}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold border transition hover:bg-gray-50"
                      style={{ borderColor: theme.colors.neutral.gray[200], color: theme.colors.neutral.gray[600], fontFamily: theme.fonts.heading }}>
                      Cancel
                    </button>
                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 rounded-xl text-white text-xs font-bold"
                      style={{ backgroundColor: theme.colors.primary.healthGreen, fontFamily: theme.fonts.heading }}>
                      Add Pet
                    </motion.button>
                  </div>
                  {apiError && (
                    <p className="text-xs text-red-500 mt-2 text-center">{apiError}</p>
                  )}
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
