import React, { useState, useRef, MouseEvent } from 'react';
import { SERVICES, CATEGORY_ICONS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

interface ServiceCardProps {
  service: typeof SERVICES[0];
  index: number;
  onClick: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onClick }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const Icon = CATEGORY_ICONS[service.category];

  return (
    <div 
      ref={divRef}
      onClick={() => onClick(service.id)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full bg-zinc-900/40 border border-white/5 p-8 overflow-hidden transition-all duration-300 cursor-pointer hover:border-white/20"
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(212, 185, 150, 0.1), transparent 40%)`
        }}
      />

      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        <div className="flex justify-between items-start mb-8">
          <div className="p-3 rounded-full border border-white/10 text-zinc-400 group-hover:text-elok-gold group-hover:border-elok-gold transition-colors">
             <Icon size={20} />
          </div>
          <span className="text-4xl font-serif text-white/5 font-bold group-hover:text-white/10 transition-colors">0{index + 1}</span>
        </div>

        <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-elok-gold transition-colors">{service.name}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{service.description}</p>
        
        <div className="flex items-end justify-between border-t border-white/5 pt-6 mt-auto">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Starting from</p>
            <p className="text-lg font-medium text-white">
               {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(service.price)}
            </p>
          </div>
          <div className="p-2 rounded-full bg-white/5 text-white group-hover:bg-elok-gold group-hover:text-black transition-colors">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ServicesProps {
  onBookService?: (serviceId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onBookService }) => {
  return (
    <section id="services" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">Curated <span className="italic text-zinc-500">Menu</span></h2>
            <p className="text-zinc-400 text-lg">
              Rangkaian perawatan rambut dan kecantikan yang dirancang dengan presisi untuk menyempurnakan penampilan Anda.
            </p>
          </div>
          <button className="text-elok-gold uppercase tracking-widest text-xs border-b border-elok-gold pb-2 hover:text-white hover:border-white transition-colors">
            View Full Menu
          </button>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.1}>
              <ServiceCard 
                service={service} 
                index={index} 
                onClick={(id) => onBookService && onBookService(id)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;