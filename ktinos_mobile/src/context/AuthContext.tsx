import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/api';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  login: async () => false,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored auth token on app start
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('ktinoskare_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      }
    } catch {
      // No stored auth
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      console.log('Login attempt:', { username, url: `${BASE_URL}/api/v1/accounts/login/` });
      
      // Using axios instead of fetch - axios handles SSL differently in React Native
      const response = await axios.post(
        `${BASE_URL}/api/v1/accounts/login/`,
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 30000,
          // Allow self-signed certificates
          validateStatus: (status) => status < 500,
        }
      );

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      if (response.status !== 200 && response.status !== 201) {
        console.error('Login failed:', response.status, response.data);
        return false;
      }

      const data = response.data;
      console.log('Login success, data:', data);
      
      const authenticatedUser: User = {
        id: data.user?.id || data.id || '1',
        email: data.user?.email || data.email || '',
        name: data.user?.username || data.username || data.first_name || username,
        token: data.token || data.access_token || data.access || 'token_' + Date.now(),
      };
      
      await AsyncStorage.setItem('ktinoskare_user', JSON.stringify(authenticatedUser));
      setUser(authenticatedUser);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message);
        console.error('Axios error response:', error.response?.data);
        console.error('Axios error code:', error.code);
      } else if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('ktinoskare_user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
