import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [secretCount, setSecretCount] = useState(0);

  const handleSecretAccess = () => {
    const newCount = secretCount + 1;
    setSecretCount(newCount);
    
    // Secret Logic: 5 clicks to go to Admin
    if (newCount >= 5) {
      navigate('/admin');
      setSecretCount(0);
    }

    // Reset counter if user stops clicking for 2 seconds
    setTimeout(() => {
      setSecretCount(0);
    }, 2000);
  };

  return (
    <footer className="bg-elok-navy border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Menghadirkan standar baru dalam perawatan rambut dan kecantikan. Setiap detil dirancang untuk kesempurnaan Anda.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-elok-gold hover:text-elok-navy transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-elok-gold hover:text-elok-navy transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-elok-gold hover:text-elok-navy transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/services" className="hover:text-elok-gold transition-colors">Services Menu</Link></li>
              <li><Link to="/stylists" className="hover:text-elok-gold transition-colors">Stylist Team</Link></li>
              <li><Link to="/gallery" className="hover:text-elok-gold transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-elok-gold transition-colors">Location</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-elok-gold shrink-0 mt-1" size={18} />
                <span>Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-elok-gold shrink-0" size={18} />
                <span>+62 21 555 0199</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-elok-gold shrink-0" size={18} />
                <span>hello@elokstudio.id</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6">Newsletter</h3>
            <p className="text-slate-400 mb-4 text-sm">Dapatkan penawaran eksklusif dan tips perawatan rambut.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-elok-gold text-white"
              />
              <button className="bg-elok-gold text-elok-navy px-4 rounded-r-lg font-bold hover:bg-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-slate-500 text-sm">
          {/* Secret Trigger on the copyright text */}
          <p 
            onClick={handleSecretAccess} 
            className="cursor-default select-none transition-colors hover:text-slate-400 active:text-slate-600"
            title="© ELOK Studio"
          >
            &copy; {new Date().getFullYear()} ELOK Studio. All rights reserved. Designed with elegance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;