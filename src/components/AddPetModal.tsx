import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../theme';


interface NewPet {
  petName: string;
  species: string;
  breed: string;
  age: number;
  weight: string;
  gender: string;
  color: string;
}

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPet: (pet: NewPet) => void;
}

const AddPetModal: React.FC<AddPetModalProps> = ({ isOpen, onClose, onAddPet }) => {
  const [formData, setFormData] = useState<NewPet>({
    petName: '',
    species: '',
    breed: '',
    age: 0,
    weight: '',
    gender: '',
    color: '',
  });

  const [errors, setErrors] = useState<Partial<NewPet>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) || 0 : value }));
    if (errors[name as keyof NewPet]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<NewPet> = {};
    if (!formData.petName.trim()) newErrors.petName = 'Pet name is required';
    if (!formData.species) newErrors.species = 'Species is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onAddPet(formData);
      setFormData({
        petName: '',
        species: '',
        breed: '',
        age: 0,
        weight: '',
        gender: '',
        color: '',
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-8 w-full max-w-md mx-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary.deepPurple }}>
            Add New Pet
          </h2>
          <button onClick={onClose} className="text-2xl" style={{ color: theme.colors.neutral.gray[400] }}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: theme.colors.neutral.gray[700] }}>
              Pet Name *
            </label>
            <input
              type="text"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: theme.colors.neutral.gray[300] }}
            />
            {errors.petName && <p className="text-red-500 text-xs mt-1">{errors.petName}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: theme.colors.neutral.gray[700] }}>
              Species *
            </label>
            <select
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: theme.colors.neutral.gray[300]}}
            >
              <option value="">Select Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
            {errors.species && <p className="text-red-500 text-xs mt-1">{errors.species}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: theme.colors.neutral.gray[700] }}>
              Breed
            </label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: theme.colors.neutral.gray[300] }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: theme.colors.neutral.gray[700] }}>
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: theme.colors.neutral.gray[300]}}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: theme.colors.neutral.gray[700] }}>
              Weight
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g., 30kg"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: theme.colors.neutral.gray[300]}}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: theme.colors.neutral.gray[700] }}>
              Gender *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: theme.colors.neutral.gray[300] }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: theme.colors.neutral.gray[700] }}>
              Color
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: theme.colors.neutral.gray[300] }}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 rounded-lg font-semibold"
              style={{ backgroundColor: theme.colors.neutral.gray[200], color: theme.colors.neutral.gray[700] }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: theme.colors.primary.healthGreen }}
            >
              Add Pet
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddPetModal;