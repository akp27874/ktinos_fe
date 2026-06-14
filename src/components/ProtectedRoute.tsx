import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  // While Clerk is loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!isSignedIn) {
    return (
      <Navigate
        to="/login"
        state={{from: location}}
        replace
      />
    )
  }

  // User is authenticated, render the component
  return <>{children}</>;
};

export default ProtectedRoute;
