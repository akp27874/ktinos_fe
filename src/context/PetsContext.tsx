import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pet } from '../data/pets';
import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../config/api';
import { BASE_URL } from '../config/api';

interface ApiPet {
  id: number;
  owner_id: number;
  owner_username: string;
  name: string;
  device: number | null;
  device_uid?: string;
  breed_id: number | null;
  breed_name: string;
  species_id: number | null;
  gender: string;
  dob: string;
  age?: number;
  weight: number;
  color: string;
  vaccinated: boolean;
  lastCheckup: string | null;
  nextCheckup: string | null;
  healthStatus: 'Healthy' | 'Needs Attention' | 'Critical';
  notes: string;
  avatar: string | null;
}

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80';

const mapApiPet = (p: ApiPet): Pet => ({
  id: p.id,
  ownerName: p.owner_username,
  ownerEmail: '',
  ownerPhone: '',
  petName: p.name,
  species: String(p.species_id ?? ''),
  breed: p.breed_name,
  age: p.age ?? 0,
  weight: String(p.weight),
  gender: p.gender,
  color: p.color,
  vaccinated: p.vaccinated,
  lastCheckup: p.lastCheckup ?? '',
  nextCheckup: p.nextCheckup ?? '',
  healthStatus: p.healthStatus,
  notes: p.notes,
  avatar: p.avatar ? `${BASE_URL}${p.avatar}` : DEFAULT_AVATAR,
});

interface PetsContextType {
  pets: Pet[];
  loading: boolean;
  addPet: (pet: Pet) => void;
  updatePet: (pet: Pet) => void;
  refetch: () => void;
}

const PetsContext = createContext<PetsContextType>({
  pets: [], loading: false, addPet: () => {}, updatePet: () => {}, refetch: () => {},
});

export const PetsProvider = ({ children }: { children: ReactNode }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = () => {
    setLoading(true);
    axiosInstance.get(ENDPOINTS.getPets(1))
      .then(res => {
        const results: ApiPet[] = res.data.results ?? res.data;
        setPets(results.map(mapApiPet));
      })
      .catch(() => setPets([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPets(); }, []);

  const addPet = (pet: Pet) => setPets(prev => [...prev, pet]);
  const updatePet = (updated: Pet) => setPets(prev => prev.map(p => p.id === updated.id ? updated : p));

  return (
    <PetsContext.Provider value={{ pets, loading, addPet, updatePet, refetch: fetchPets }}>
      {children}
    </PetsContext.Provider>
  );
};

export const usePets = () => useContext(PetsContext);
