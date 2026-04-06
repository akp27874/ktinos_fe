export const BASE_URL = 'http://13.127.11.71';
export const API_URL = `${BASE_URL}/api/v1`;

export const ENDPOINTS = {
  species: `${API_URL}/pets/species/`,
  breeds: (speciesId: number) => `${API_URL}/pets/breeds/?species=${speciesId}`,
};
