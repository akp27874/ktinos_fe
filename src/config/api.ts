export const BASE_URL = 'http://13.127.11.71';
export const API_URL = `${BASE_URL}/api/v1`;

export const ENDPOINTS = {
  species: `/api/v1/pets/species/`,
  breeds: (speciesId: number | string) => `/api/v1/pets/breeds/?species_id=${speciesId}`,
  addPet: `/api/v1/pets/`,
};
