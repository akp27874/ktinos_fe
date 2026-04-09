import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePets } from '../context/PetsContext';
import { theme } from '../theme';
import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../config/api';

const statusColor = (status: string): React.CSSProperties => {
  if (status === 'Healthy') return { backgroundColor: '#d1fae5', color: '#065f46' };
  if (status === 'Needs Attention') return { backgroundColor: '#fef3c7', color: '#92400e' };
  return { backgroundColor: '#fee2e2', color: '#991b1b' };
};

const inputCls = "w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2";
const inputStyle = { borderColor: theme.colors.neutral.gray[200], fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] };

const Field = ({ label, value, editing, onChange, type = 'text' }: {
  label: string; value: string; editing: boolean; onChange: (v: string) => void; type?: string;
}) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100">
    <span className="font-semibold text-sm w-1/3" style={{ color: theme.colors.neutral.gray[500] }}>{label}</span>
    {editing
      ? <input type={type} value={value} onChange={e => onChange(e.target.value)} className={`${inputCls} w-2/3`} style={inputStyle} />
      : <span className="text-sm font-medium text-right w-2/3" style={{ color: theme.colors.neutral.gray[800] }}>{value || '—'}</span>
    }
  </div>
);

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pets, loading, updatePet, refetch } = usePets();
  const pet = pets.find(p => p.id === Number(id));

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(pet ? { ...pet } : null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Sync form when pet loads from API
  useEffect(() => {
    if (pet && !form) setForm({ ...pet });
  }, [pet]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2" style={{ borderColor: theme.colors.primary.deepPurple }}></div>
    </div>
  );

  if (!pet || !form) return (
    <div className="min-h-screen flex items-center justify-center">
      <p style={{ fontFamily: theme.fonts.body }}>Pet not found.</p>
    </div>
  );

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPhotoPreview(result);
      setForm(prev => prev ? { ...prev, avatar: result } : prev);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    setSaveError('');
    try {
      await axiosInstance.patch(ENDPOINTS.updatePet(form.id, 1), {
        name: form.petName,
        gender: form.gender,
        weight: Number(form.weight) || 0,
        color: form.color,
        vaccinated: form.vaccinated,
        lastCheckup: form.lastCheckup || null,
        nextCheckup: form.nextCheckup || null,
        healthStatus: form.healthStatus,
        notes: form.notes,
        avatar: photoPreview || form.avatar || null,
      });
      updatePet({ ...form, avatar: photoPreview || form.avatar });
      refetch();
      setEditing(false);
      setPhotoPreview('');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: unknown } })?.response?.data;
      setSaveError(msg ? JSON.stringify(msg) : 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({ ...pet });
    setPhotoPreview('');
    setEditing(false);
  };

  const set = (key: string) => (v: string) => setForm(prev => prev ? { ...prev, [key]: v } : prev);

  return (
    <div className="min-h-screen pt-20 pb-10" style={{ backgroundColor: theme.colors.neutral.lightBg, fontFamily: theme.fonts.body }}>
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Back */}
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 font-semibold hover:opacity-75 transition"
          style={{ color: theme.colors.primary.deepPurple }}>
          ← Back
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Banner */}
          <div className="h-36 w-full" style={{ background: `linear-gradient(to right, ${theme.colors.primary.deepPurple}, ${theme.colors.primary.tealWellness})` }} />

          <div className="px-8 pb-8">
            {/* Avatar + Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-6">
              <div className="relative">
                <img
                  src={photoPreview || form.avatar}
                  alt={form.petName}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                <label className="absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm cursor-pointer shadow"
                  style={{ backgroundColor: theme.colors.primary.deepPurple }}>
                  📷
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                </label>
              </div>
              <div className="pb-2 flex-1">
                {editing
                  ? <input value={form.petName} onChange={e => setForm(p => p ? { ...p, petName: e.target.value } : p)}
                      className="text-3xl font-bold bg-transparent border-b-2 focus:outline-none w-full mb-1"
                      style={{ borderColor: theme.colors.primary.deepPurple, color: theme.colors.primary.deepPurple, fontFamily: theme.fonts.heading }} />
                  : <h1 className="text-3xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>{form.petName}</h1>
                }
                <p className="text-gray-500 text-sm">{form.breed} · {form.species}</p>
                <span className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold" style={statusColor(form.healthStatus)}>
                  {form.healthStatus}
                </span>
              </div>

              {/* Edit / Save buttons */}
              <div className="flex flex-col gap-2 pb-2">
                {editing ? (
                  <>
                    <div className="flex gap-2">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSave}
                        disabled={saving}
                        className="px-5 py-2 rounded-full text-white text-sm font-semibold disabled:opacity-60"
                        style={{ backgroundColor: theme.colors.primary.healthGreen, fontFamily: theme.fonts.heading }}>
                        {saving ? 'Saving...' : 'Save'}
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCancel}
                        className="px-5 py-2 rounded-full text-sm font-semibold border"
                        style={{ borderColor: theme.colors.neutral.gray[300], color: theme.colors.neutral.gray[600], fontFamily: theme.fonts.heading }}>
                        Cancel
                      </motion.button>
                    </div>
                    {saveError && <p className="text-xs text-red-500">{saveError}</p>}
                  </>
                ) : (
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setEditing(true)}
                    className="px-5 py-2 rounded-full text-white text-sm font-semibold"
                    style={{ backgroundColor: theme.colors.primary.deepPurple, fontFamily: theme.fonts.heading }}>
                    ✏️ Edit
                  </motion.button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Pet Info */}
              <div>
                <h2 className="text-lg font-bold mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>🐾 Pet Information</h2>
                <Field label="Species"    value={form.species}        editing={editing} onChange={set('species')} />
                <Field label="Breed"      value={form.breed}          editing={editing} onChange={set('breed')} />
                <Field label="Weight (kg)" value={form.weight}        editing={editing} onChange={set('weight')} />
                <Field label="Gender"     value={form.gender}         editing={editing} onChange={set('gender')} />
                <Field label="Color"      value={form.color}          editing={editing} onChange={set('color')} />
                <Field label="Vaccinated" value={form.vaccinated ? 'Yes' : 'No'} editing={false} onChange={() => {}} />
              </div>

              {/* Health */}
              <div>
                <h2 className="text-lg font-bold mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>🏥 Health Records</h2>
                <Field label="Health Status" value={form.healthStatus} editing={editing} onChange={set('healthStatus')} />
                <Field label="Last Checkup"  value={form.lastCheckup}  editing={editing} onChange={set('lastCheckup')} type="date" />
                <Field label="Next Checkup"  value={form.nextCheckup}  editing={editing} onChange={set('nextCheckup')} type="date" />
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-sm w-1/3" style={{ color: theme.colors.neutral.gray[500] }}>Vaccinated</span>
                  {editing
                    ? <select value={form.vaccinated ? 'Yes' : 'No'}
                        onChange={e => setForm(p => p ? { ...p, vaccinated: e.target.value === 'Yes' } : p)}
                        className="w-2/3 px-3 py-2 rounded-lg text-sm border focus:outline-none"
                        style={{ borderColor: theme.colors.neutral.gray[200], fontFamily: theme.fonts.body }}>
                        <option>Yes</option><option>No</option>
                      </select>
                    : <span className="text-sm font-medium text-right w-2/3" style={{ color: form.vaccinated ? '#065f46' : '#991b1b' }}>
                        {form.vaccinated ? '✅ Yes' : '❌ No'}
                      </span>
                  }
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: theme.colors.neutral.lightBg }}>
              <h2 className="text-lg font-bold mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>📝 Notes</h2>
              {editing
                ? <textarea value={form.notes} onChange={e => setForm(p => p ? { ...p, notes: e.target.value } : p)}
                    rows={3} className={`${inputCls} w-full`} style={inputStyle} />
                : <p style={{ color: theme.colors.neutral.gray[700] }}>{form.notes || '—'}</p>
              }
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PetDetails;
