import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pet } from '../data/pets';
import axiosInstance from '../config/axiosInstance';
import { ENDPOINTS } from '../config/api';

interface ApiPet {
  id: number;
  owner: number;
  owner_username: string;
  name: string;
  device: number;
  device_uid: string;
  breedId: number;
  breed_name: string;
  species: string;
  gender: string;
  dob: string;
  age: number;
  weight: number;
  color: string;
  vaccinated: boolean;
  lastCheckup: string;
  nextCheckup: string;
  healthStatus: 'Healthy' | 'Needs Attention' | 'Critical';
  notes: string;
  avatar: string;
}

const mapApiPet = (p: ApiPet): Pet => ({
  id: p.id,
  ownerName: p.owner_username,
  ownerEmail: '',
  ownerPhone: '',
  petName: p.name,
  species: p.species,
  breed: p.breed_name,
  age: p.age,
  weight: String(p.weight),
  gender: p.gender,
  color: p.color,
  vaccinated: p.vaccinated,
  lastCheckup: p.lastCheckup,
  nextCheckup: p.nextCheckup,
  healthStatus: p.healthStatus,
  notes: p.notes,
  avatar: p.avatar || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80',
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
