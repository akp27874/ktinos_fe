import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KeyFeatures from './components/KeyFeatures';
import Bands from './components/Bands';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UserList from './pages/UserList';
import PetDetails from './pages/PetDetails';
import Dashboard from './pages/Dashboard';
import PetProfile from './pages/PetProfile';
import GpsTracking from './pages/GpsTracking';
import HealthMonitoring from './pages/HealthMonitoring';
import Settings from './pages/Settings';
import { SignIn, SignUp, useAuth } from '@clerk/react';
import Testimonial from './components/Testimonial';
import FAQ from './components/FAQ';
import ProtectedRoute from './components/ProtectedRoute';
import WhatItIs from './components/WhatItIs';
import HowItWorks from './components/Howitworks';
import PlansAndPrices from './components/Plansandprices';
const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 500); }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );

  return (
    <>
      <Hero />
      <KeyFeatures />
      <Bands />
      <Testimonial />
      <FAQ /> 
      <Contact />
      <Footer />
    </>
  );
};

import { PetsProvider } from './context/PetsContext';
import { AuthProvider } from './context/AuthContext';

const HomeOrDashboard = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return isSignedIn ? <Dashboard /> : <><Navbar /><div className="pt-[120px]"><Home /></div></>;
};

function App() {
  return (
    <AuthProvider>
    <PetsProvider>
      <BrowserRouter>
      <Routes>
      {/* Clerk Auth Routes */}
<Route
  path="/login"
  element={
    <>
      <Navbar />
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/signup"
        forceRedirectUrl="/dashboard"
      />
    </>
  }
/>

<Route
  path="/signup"
  element={
    <>
      <Navbar />
      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/login"
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-lg"
          }
        }}
      />
    </>
  }
/>

<Route
  path="/"
  element={
    <>
      <HomeOrDashboard />
    </>
  }
/>
        <Route path="/users" element={<><Navbar /><UserList /></>} />
        <Route path="/pet/:id" element={<><Navbar /><PetDetails /></>} />
        {/* what-is-ktinoskare */}
        <Route path="/what-is-ktinoskare" element={<><Navbar /><WhatItIs /></>} />
        {/* how-it-works */}
        <Route path="/how-it-works" element={<><Navbar /><HowItWorks /></>} />
        {/* plans-and-prices */}
        <Route path="/plans" element={<><Navbar /><PlansAndPrices /></>} />
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><PetProfile /></ProtectedRoute>} />
        <Route path="/gps" element={<ProtectedRoute><GpsTracking /></ProtectedRoute>} />
        <Route path="/health" element={<ProtectedRoute><HealthMonitoring /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </PetsProvider>
    </AuthProvider>
  );
}

export default App;
