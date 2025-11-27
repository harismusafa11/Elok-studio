import React from 'react';
import { STYLISTS } from '../constants';
import Reveal from './Reveal';

const Team: React.FC = () => {
  return (
    <section id="team" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <Reveal className="mb-20">
           <h2 className="text-5xl md:text-8xl font-serif text-white opacity-10 leading-none">The <br/>Artisans</h2>
           <div className="mt-[-60px] ml-4 md:ml-20 relative z-10">
              <span className="text-elok-gold text-xs uppercase tracking-[0.3em] block mb-2">Expertly Trained</span>
              <p className="text-zinc-400 max-w-lg text-lg">
                Bertemu dengan para visioner di balik setiap transformasi. Dedikasi penuh pada kerajinan dan detail.
              </p>
           </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
          {STYLISTS.map((stylist, index) => (
            <Reveal key={stylist.id} delay={index * 0.1}>
              <div className="group relative aspect-[3/4] overflow-hidden cursor-none">
                <img 
                  src={stylist.image} 
                  alt={stylist.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
                />
                
                {/* Overlay Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <p className="text-elok-gold text-[10px] uppercase tracking-widest mb-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {stylist.role}
                  </p>
                  <h3 className="text-2xl font-serif text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {stylist.name}
                  </h3>
                  <div className="h-[1px] w-0 bg-white group-hover:w-full transition-all duration-700 mt-4 opacity-50"></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;