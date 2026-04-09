import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePets } from '../context/PetsContext';
import { theme } from '../theme';

const statusColor = (status: string): React.CSSProperties => {
  if (status === 'Healthy') return { backgroundColor: '#d1fae5', color: '#065f46' };
  if (status === 'Needs Attention') return { backgroundColor: '#fef3c7', color: '#92400e' };
  return { backgroundColor: '#fee2e2', color: '#991b1b' };
};

const UserList = () => {
  const [tab, setTab] = useState<'table' | 'card'>('table');
  const navigate = useNavigate();
  const { pets, loading } = usePets();

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: theme.colors.neutral.lightBg }}>
      <div className="container mx-auto px-4 py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
            Pet Users
          </h1>
          <p style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[600] }}>
            Manage and monitor all registered pets and their owners.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['table', 'card'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-6 py-2 rounded-lg font-semibold transition capitalize"
              style={{
                fontFamily: theme.fonts.body,
                backgroundColor: tab === t ? theme.colors.primary.deepPurple : theme.colors.neutral.white,
                color: tab === t ? theme.colors.neutral.white : theme.colors.primary.deepPurple,
                border: `2px solid ${theme.colors.primary.deepPurple}`,
              }}
            >
              {t === 'table' ? '📋 Table View' : '🃏 Card View'}
            </button>
          ))}
        </div>

        {/* Table View */}
        {tab === 'table' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-sm" style={{ fontFamily: theme.fonts.body }}>
              <thead>
                <tr style={{ backgroundColor: theme.colors.primary.deepPurple, color: 'white' }}>
                  <th className="px-4 py-3 text-left">Pet</th>
                  <th className="px-4 py-3 text-left">Owner</th>
                  <th className="px-4 py-3 text-left">Species</th>
                  <th className="px-4 py-3 text-left">Breed</th>
                  <th className="px-4 py-3 text-left">Age</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet, idx) => (
                  <motion.tr
                    key={pet.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b hover:bg-gray-50 cursor-pointer transition"
                    onClick={() => navigate(`/pet/${pet.id}`)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={pet.avatar} alt={pet.petName} className="w-10 h-10 rounded-full object-cover" />
                        <span className="font-semibold" style={{ color: theme.colors.primary.deepPurple }}>{pet.petName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{pet.ownerName}</td>
                    <td className="px-4 py-3 text-gray-700">{pet.species}</td>
                    <td className="px-4 py-3 text-gray-700">{pet.breed}</td>
                    <td className="px-4 py-3 text-gray-700">{pet.age} yrs</td>
                    <td className="px-4 py-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold" style={statusColor(pet.healthStatus)}>
                        {pet.healthStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="text-white px-3 py-1 rounded-lg text-xs font-semibold"
                        style={{ backgroundColor: theme.colors.primary.healthGreen }}
                        onClick={(e) => { e.stopPropagation(); navigate(`/pet/${pet.id}`); }}
                      >
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Card View */}
        {tab === 'card' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet, idx) => (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(106,27,154,0.15)' }}
                onClick={() => navigate(`/pet/${pet.id}`)}
                className="bg-white rounded-xl shadow p-5 cursor-pointer transition"
              >
                <img src={pet.avatar} alt={pet.petName} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
                  {pet.petName}
                </h3>
                <p className="text-sm mb-1" style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[600] }}>
                  {pet.breed} · {pet.age} yrs
                </p>
                <p className="text-sm mb-3" style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[500] }}>
                  Owner: {pet.ownerName}
                </p>
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={statusColor(pet.healthStatus)}>
                  {pet.healthStatus}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
