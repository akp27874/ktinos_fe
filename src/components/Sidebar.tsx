import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';
import { ENDPOINTS } from '../config/api';
import axiosInstance from '../config/axiosInstance';
import { usePets } from '../context/PetsContext';
import logo from '../assets/images/logokk-withoutbg.png';
import { Show, UserButton } from '@clerk/react';

interface SpeciesOption { id: number; name: string; }
interface BreedOption { id: number; name: string; species: number; }
interface DeviceOption { id: number; device_uid: string; }

const navItems = [
  { icon: '🐾', label: 'Pets Dashboard', key: 'dashboard', path: '/dashboard' },
  { icon: '📍', label: 'GPS Tracking', key: 'gps', path: '/gps' },
  { icon: '💊', label: 'Health Monitoring', key: 'health', path: '/health' },
  { icon: '⚙️', label: 'Settings', key: 'settings', path: '/settings' },
];

const emptyForm = { petName: '', species: '', speciesId: '', breed: '', breedId: '', age: '', weight: '', gender: 'Male', dob: '', color: '', device: '', subscription: '', ownerName: '', ownerEmail: '', ownerPhone: '' };

interface DropdownOption {
  value: string;
  label: string;
}

interface StyledSelectProps {
  value: string;
  options: DropdownOption[];
  placeholder: string;
  onChange: (value: string) => void;
}

const StyledSelect = ({ value, options, placeholder, onChange }: StyledSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(open => !open)}
        className="w-full px-3 py-1.5 rounded-lg text-xs focus:outline-none border text-left flex items-center justify-between"
        style={{ borderColor: theme.colors.neutral.gray[200], fontFamily: theme.fonts.body, color: selectedOption ? theme.colors.neutral.gray[700] : theme.colors.neutral.gray[400], backgroundColor: theme.colors.neutral.white }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption?.label ?? placeholder}</span>
        <span aria-hidden="true" style={{ color: theme.colors.neutral.gray[700] }}>⌄</span>
      </button>
      {isOpen && (
        <div
          className="absolute left-0 right-0 z-20 mt-1 rounded-lg border bg-white shadow-lg overflow-hidden"
          style={{ borderColor: theme.colors.neutral.gray[200] }}
          role="listbox"
        >
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => { onChange(option.value); setIsOpen(false); }}
              className="w-full px-3 py-2 text-left text-xs transition-colors"
              style={{ color: theme.colors.neutral.gray[700], backgroundColor: theme.colors.neutral.white }}
              onMouseEnter={event => {
                event.currentTarget.style.backgroundColor = theme.colors.primary.healthGreen;
                event.currentTarget.style.color = theme.colors.neutral.white;
              }}
              onMouseLeave={event => {
                event.currentTarget.style.backgroundColor = theme.colors.neutral.white;
                event.currentTarget.style.color = theme.colors.neutral.gray[700];
              }}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addPet, refetch } = usePets();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [speciesList, setSpeciesList] = useState<SpeciesOption[]>([]);
  const [breedList, setBreedList] = useState<BreedOption[]>([]);
  const [deviceList, setDeviceList] = useState<DeviceOption[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  const activeKey = navItems.find(n => n.path === location.pathname)?.key ?? '';
  const visibleBreedList = form.speciesId ? breedList : [];

  useEffect(() => {
    axiosInstance.get(ENDPOINTS.species)
      .then(res => setSpeciesList(res.data ?? []))
      .catch(() => setSpeciesList([]));
  }, []);

  useEffect(() => {
    if (!form.speciesId) { return; }
    axiosInstance.get(ENDPOINTS.breeds(form.speciesId))
      .then(res => setBreedList(res.data ?? []))
      .catch(() => setBreedList([]));
  }, [form.speciesId]);

  useEffect(() => {
    if (!showModal) { return; }
    axiosInstance.get(ENDPOINTS.getDevicesByUser(1))
      .then(res => {
        const results = res.data?.results ?? [];
        setDeviceList(results
          .map((device: { hardware_info?: DeviceOption }) => device.hardware_info)
          .filter((device: DeviceOption | undefined): device is DeviceOption => Boolean(device?.id && device.device_uid)));
      })
      .catch(() => setDeviceList([]));
  }, [showModal]);

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
      owner_id: 1,
      device: Number(form.device),
      name: form.petName,
      breed: Number(form.breedId),
      species: Number(form.speciesId),
      gender: form.gender,
      dob: form.dob || today,
      age: 0,
      weight: Number(form.weight) || 0,
      color: form.color || '',
      vaccinated: false,
      lastCheckup: today,
      nextCheckup: nextMonth,
      health_status: 'HEALTHY',
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
        health_status: 'HEALTHY' as const,
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
          <div className="flex items-center gap-2 mb-8 px-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <img src={logo} alt="Ktinoskare" className="h-10 w-auto object-contain" />
          </div>

          <div className="mb-6 flex justify-center">
            <Show when="signed-in">
              <div className="flex items-center justify-center">
                <UserButton />
              </div>
            </Show>
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
                      <StyledSelect
                        value={form.speciesId}
                        placeholder="Select species"
                        options={speciesList.map(s => ({ value: String(s.id), label: s.name }))}
                        onChange={value => {
                          const selected = speciesList.find(s => String(s.id) === value);
                          setBreedList([]);
                          setForm({ ...form, speciesId: value, species: selected?.name ?? '', breed: '', breedId: '' });
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Breed + DOB */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>Breed</label>
                      <StyledSelect
                        value={form.breedId}
                        placeholder="Select breed"
                        options={visibleBreedList.map(b => ({ value: String(b.id), label: b.name }))}
                        onChange={value => {
                          const selected = breedList.find(b => String(b.id) === value);
                          setForm({ ...form, breedId: value, breed: selected?.name ?? '' });
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>Date of Birth</label>
                      <input type="date" value={form.dob}
                        onChange={e => setForm({ ...form, dob: e.target.value })}
                        className="pet-date-input w-full px-3 py-1.5 rounded-lg text-xs focus:outline-none border"
                        style={{ borderColor: theme.colors.neutral.gray[200], fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700], accentColor: theme.colors.primary.deepPurple }} />
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
                      <StyledSelect
                        value={form.gender}
                        placeholder="Select gender"
                        options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]}
                        onChange={value => setForm({ ...form, gender: value })}
                      />
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
                      <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>Device</label>
                      <StyledSelect
                        value={form.device}
                        placeholder="Select device"
                        options={deviceList.map(device => ({ value: String(device.id), label: device.device_uid }))}
                        onChange={value => setForm({ ...form, device: value })}
                      />
                    </div>
                  </div>

                  {/* Row 5: Subscription Model */}
                  <div>
                    <label className="text-xs font-semibold block mb-1" style={{ color: theme.colors.neutral.gray[600] }}>
                      Choose the subscription model
                    </label>
                    <StyledSelect
                      value={form.subscription}
                      placeholder="Select subscription model"
                      options={[
                        { value: 'Monthly', label: 'Monthly 399/-' },
                        { value: 'Quarterly', label: 'Quarterly : 999/-' },
                        { value: 'Half yearly', label: 'Half yearly- 1999/-' },
                        { value: 'Yearly', label: 'Yearly-3999/-' },
                      ]}
                      onChange={value => setForm({ ...form, subscription: value })}
                    />
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
