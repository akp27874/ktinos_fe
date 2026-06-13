import { createContext, useContext, ReactNode } from 'react';
import { useAuth as useClerkAuth, useUser } from '@clerk/react';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: any;
}

const AuthContext = createContext<AuthContextType>({ isLoggedIn: false, isLoading: false, user: null });

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

export const useAuthContext = () => useContext(AuthContext);
