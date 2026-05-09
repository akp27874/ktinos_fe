export const BASE_URL = 'https://13.233.237.155';
export const API_URL = `${BASE_URL}/api/v1`;

export const ENDPOINTS = {
  species: `/api/v1/pets/species/`,
  breeds: (speciesId: number | string) => `/api/v1/pets/breeds/?species_id=${speciesId}`,
  addPet: `/api/v1/pets/`,
  getPets: (ownerId: number) => `/api/v1/pets/?owner_id=${ownerId}`,
  updatePet: (petId: number, ownerId: number) => `/api/v1/pets/${petId}/?owner_id=${ownerId}`,
  telemetry: (deviceId: number) => `/api/v1/telemetry/charts/${deviceId}/`,
};
