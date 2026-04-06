import { createContext, useContext, useState, ReactNode } from 'react';
import { pets as initialPets, Pet } from '../data/pets';

interface PetsContextType {
  pets: Pet[];
  addPet: (pet: Pet) => void;
}

const PetsContext = createContext<PetsContextType>({ pets: initialPets, addPet: () => {} });

export const PetsProvider = ({ children }: { children: ReactNode }) => {
  const [pets, setPets] = useState<Pet[]>(initialPets);

  const addPet = (pet: Pet) => setPets((prev) => [...prev, pet]);

  return <PetsContext.Provider value={{ pets, addPet }}>{children}</PetsContext.Provider>;
};

export const usePets = () => useContext(PetsContext);
