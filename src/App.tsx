import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PracticeAreas from './components/PracticeAreas';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UserList from './pages/UserList';
import PetDetails from './pages/PetDetails';

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
      <Team />
      <Contact />
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/pet/:id" element={<PetDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
