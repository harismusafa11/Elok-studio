import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

interface NavbarProps {
  onBookClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path ? 'text-white' : 'text-zinc-400 hover:text-white';

  return (
    <>
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-6xl ${
        isScrolled || isMobileMenuOpen ? 'translate-y-0' : 'translate-y-0'
      }`}>
        <div className={`
          relative flex justify-between items-center px-6 py-4 rounded-full border transition-all duration-300
          ${isScrolled 
            ? 'bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50' 
            : 'bg-transparent border-transparent'
          }
        `}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-50">
             <Logo />
          </Link>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center gap-8 ${!isScrolled && 'bg-black/40 px-8 py-3 rounded-full border border-white/5 backdrop-blur-sm'}`}>
            <Link to="/" className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors ${isActive('/')}`}>Home</Link>
            <Link to="/services" className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors ${isActive('/services')}`}>Services</Link>
            <Link to="/gallery" className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors ${isActive('/gallery')}`}>Gallery</Link>
            <Link to="/stylists" className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors ${isActive('/stylists')}`}>Stylists</Link>
            <Link to="/contact" className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors ${isActive('/contact')}`}>Contact</Link>
          </div>

          <div className="hidden md:block">
            <button 
              onClick={onBookClick}
              className="bg-elok-gold text-black font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-white transition-all duration-300"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white relative z-50 p-2 rounded-full bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-black flex flex-col justify-center items-center transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         <div className="flex flex-col gap-8 text-center">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-white hover:text-elok-gold transition-colors">Home</Link>
            <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-white hover:text-elok-gold transition-colors">Services</Link>
            <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-white hover:text-elok-gold transition-colors">Gallery</Link>
            <Link to="/stylists" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-white hover:text-elok-gold transition-colors">Stylists</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-white hover:text-elok-gold transition-colors">Contact</Link>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookClick();
              }}
              className="bg-elok-gold text-black text-xl font-serif px-8 py-3 rounded-full mt-4"
            >
              Book Appointment
            </button>
         </div>
      </div>
    </>
  );
};

export default Navbar;