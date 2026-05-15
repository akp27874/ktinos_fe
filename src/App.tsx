import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PracticeAreas from './components/PracticeAreas';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UserList from './pages/UserList';
import PetDetails from './pages/PetDetails';
import Dashboard from './pages/Dashboard';
import PetProfile from './pages/PetProfile';
import GpsTracking from './pages/GpsTracking';
import HealthMonitoring from './pages/HealthMonitoring';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Testimonial from './components/Testimonial';
import FAQ from './components/FAQ';
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
      <About />
      <PracticeAreas />
      {/* <Team /> */}
      <Testimonial />
      <FAQ /> 
      <Contact />
      <Footer />
    </>
  );
};

import { PetsProvider } from './context/PetsContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <PetsProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/users" element={<><Navbar /><UserList /></>} />
        <Route path="/pet/:id" element={<><Navbar /><PetDetails /></>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:id" element={<PetProfile />} />
        <Route path="/gps" element={<GpsTracking />} />
        <Route path="/health" element={<HealthMonitoring />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </PetsProvider>
    </AuthProvider>
  );
}

export default App;
