import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pets } from '../data/pets';
import { theme } from '../theme';

const statusColor = (status: string) => {
  if (status === 'Healthy') return { bg: '#d1fae5', text: '#065f46' };
  if (status === 'Needs Attention') return { bg: '#fef3c7', text: '#92400e' };
  return { backgroundColor: '#fee2e2', color: '#991b1b' };
};

const InfoRow = ({ label, value }: { label: string; value: string | number | boolean }) => (
  <div className="flex justify-between py-3 border-b border-gray-100">
    <span className="font-semibold text-sm" style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[500] }}>{label}</span>
    <span className="text-sm font-medium" style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[800] }}>
      {typeof value === 'boolean' ? (value ? '✅ Yes' : '❌ No') : value}
    </span>
  </div>
);

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pet = pets.find((p) => p.id === Number(id));

  if (!pet) return (
    <div className="min-h-screen flex items-center justify-center">
      <p style={{ fontFamily: theme.fonts.body }}>Pet not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-10" style={{ backgroundColor: theme.colors.neutral.lightBg }}>
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/users')}
          className="flex items-center gap-2 mb-6 font-semibold hover:opacity-75 transition"
          style={{ fontFamily: theme.fonts.body, color: theme.colors.primary.deepPurple }}
        >
          ← Back to User List
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Hero Banner */}
          <div className="h-40 w-full" style={{ background: `linear-gradient(to right, ${theme.colors.primary.deepPurple}, ${theme.colors.primary.tealWellness})` }}></div>

          {/* Avatar + Name */}
          <div className="px-8 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-6">
              <img src={pet.avatar} alt={pet.petName} className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg" />
              <div className="pb-2">
                <h1 className="text-3xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>{pet.petName}</h1>
                <p className="text-gray-500" style={{ fontFamily: theme.fonts.body }}>{pet.breed} · {pet.species}</p>
                <span className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold" style={statusColor(pet.healthStatus)}>
                  {pet.healthStatus}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Pet Info */}
              <div>
                <h2 className="text-lg font-bold mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>🐾 Pet Information</h2>
                <InfoRow label="Name" value={pet.petName} />
                <InfoRow label="Species" value={pet.species} />
                <InfoRow label="Breed" value={pet.breed} />
                <InfoRow label="Age" value={`${pet.age} years`} />
                <InfoRow label="Weight" value={pet.weight} />
                <InfoRow label="Gender" value={pet.gender} />
                <InfoRow label="Color" value={pet.color} />
                <InfoRow label="Vaccinated" value={pet.vaccinated} />
              </div>

              {/* Owner + Health Info */}
              <div>
                <h2 className="text-lg font-bold mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>👤 Owner Information</h2>
                <InfoRow label="Name" value={pet.ownerName} />
                <InfoRow label="Email" value={pet.ownerEmail} />
                <InfoRow label="Phone" value={pet.ownerPhone} />

                <h2 className="text-lg font-bold mt-6 mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>🏥 Health Records</h2>
                <InfoRow label="Last Checkup" value={pet.lastCheckup} />
                <InfoRow label="Next Checkup" value={pet.nextCheckup} />
                <InfoRow label="Health Status" value={pet.healthStatus} />
              </div>
            </div>

            {/* Notes */}
            <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: theme.colors.neutral.lightBg }}>
              <h2 className="text-lg font-bold mb-2" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>📝 Notes</h2>
              <p style={{ fontFamily: theme.fonts.body, color: theme.colors.neutral.gray[700] }}>{pet.notes}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PetDetails;
