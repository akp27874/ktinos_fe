import axios from 'axios';
import { BASE_URL } from './api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add auth token interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Token can be added here from AsyncStorage if needed
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
