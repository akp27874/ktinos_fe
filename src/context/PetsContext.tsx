import { createContext, useContext, useState, ReactNode } from 'react';
import { pets as initialPets, Pet } from '../data/pets';

interface PetsContextType {
  pets: Pet[];
  addPet: (pet: Pet) => void;
  updatePet: (pet: Pet) => void;
}

const PetsContext = createContext<PetsContextType>({ pets: initialPets, addPet: () => {}, updatePet: () => {} });

export const PetsProvider = ({ children }: { children: ReactNode }) => {
  const [pets, setPets] = useState<Pet[]>(initialPets);

  const addPet = (pet: Pet) => setPets(prev => [...prev, pet]);
  const updatePet = (updated: Pet) => setPets(prev => prev.map(p => p.id === updated.id ? updated : p));

  return <PetsContext.Provider value={{ pets, addPet, updatePet }}>{children}</PetsContext.Provider>;
};

export const usePets = () => useContext(PetsContext);
