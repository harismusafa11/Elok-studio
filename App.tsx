import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import BookingModal from './components/BookingModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Layout component to handle Navbar/Footer visibility based on route
const MainLayout: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  const handleOpenBooking = () => {
    setPreselectedServiceId(null); // Reset specific service if general booking
    setIsBookingOpen(true);
  };

  const handleBookService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  return (
    <>
      <div className="bg-noise"></div>
      <ScrollToTop />
      {!isAdmin && <Navbar onBookClick={handleOpenBooking} />}
      
      <main>
        <Routes>
          {/* Home Page: The Full Experience */}
          <Route path="/" element={
            <>
              <Hero onBookClick={handleOpenBooking} />
              <Services onBookService={handleBookService} />
              <Pricing onBookClick={handleOpenBooking} />
              <Gallery />
              <Team />
              <Testimonials />
              <Location />
            </>
          } />

          {/* Dedicated Pages */}
          <Route path="/services" element={
            <div className="pt-32">
              <Services onBookService={handleBookService} />
              <Pricing onBookClick={handleOpenBooking} />
            </div>
          } />
          
          <Route path="/gallery" element={
            <div className="pt-32">
              <Gallery />
            </div>
          } />
          
          <Route path="/stylists" element={
            <div className="pt-32">
              <Team />
            </div>
          } />

          <Route path="/contact" element={
            <div className="pt-32">
              <Location />
            </div>
          } />

          {/* Admin Route */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {!isAdmin && <Footer />}
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialServiceId={preselectedServiceId}
      />
    </>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <MainLayout />
    </HashRouter>
  );
};

export default App;