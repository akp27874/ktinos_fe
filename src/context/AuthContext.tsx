/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, ReactNode } from 'react';
import { useAuth as useClerkAuth, useUser } from '@clerk/react';

type ClerkUser = ReturnType<typeof useUser>['user'];

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: ClerkUser;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, isLoaded } = useClerkAuth();
  const { user } = useUser();

  const contextValue: AuthContextType = {
    isLoggedIn: isSignedIn ?? false,
    isLoading: !isLoaded,
    user: user,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
};
