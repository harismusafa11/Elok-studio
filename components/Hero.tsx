import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';

interface HeroProps {
  onBookClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const handleScroll = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Noise & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2669&auto=format&fit=crop" 
          alt="Luxury Salon Interior" 
          className="w-full h-full object-cover opacity-40 grayscale scale-105 animate-float"
          style={{ animationDuration: '20s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
      </div>

      <div className="container mx-auto px-6 relative z-30 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-elok-gold/50"></div>
            <span className="text-elok-gold text-xs uppercase tracking-[0.3em]">Est. 2024 Jakarta</span>
            <div className="h-[1px] w-12 bg-elok-gold/50"></div>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[0.9] tracking-tight mb-8">
            <span className="block italic font-thin text-zinc-400">The</span>
            Art of <span className="text-elok-gold">Detail</span>
          </h1>
        </Reveal>
        
        <Reveal delay={0.4}>
          <p className="text-zinc-300 max-w-xl mx-auto text-lg leading-relaxed font-light mb-12">
            Sebuah destinasi perawatan rambut eksklusif di mana presisi bertemu dengan kemewahan. Rasakan transformasi yang sesungguhnya.
          </p>
        </Reveal>

        <Reveal delay={0.6} className="relative z-40">
           <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link 
                to="/services"
                onClick={() => window.scrollTo(0, 0)}
                className="group relative px-10 py-4 bg-transparent border border-white/20 overflow-hidden rounded-full cursor-pointer hover:border-elok-gold/50 transition-colors inline-block"
              >
                <div className="absolute inset-0 bg-elok-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                <span className="relative z-10 text-white group-hover:text-black font-medium tracking-widest text-sm uppercase transition-colors">
                  Reserve Seat
                </span>
              </Link>
           </div>
        </Reveal>
      </div>

      {/* Scroll Indicator */}
      <div 
        onClick={handleScroll}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 cursor-pointer hover:opacity-100 transition-opacity z-20"
      >
        <span className="text-[10px] uppercase tracking-widest text-white">Scroll</span>
        <ArrowDown size={16} className="text-white" />
      </div>
    </section>
  );
};

export default Hero;