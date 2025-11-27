import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { TRANSFORMATIONS } from '../constants';
import { MoveHorizontal } from 'lucide-react';
import Reveal from './Reveal';

const CompareSlider: React.FC<{ item: typeof TRANSFORMATIONS[0] }> = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="space-y-4">
      <div 
        ref={containerRef}
        className="relative w-full h-[400px] overflow-hidden rounded-xl cursor-ew-resize select-none border-4 border-white/10 shadow-2xl"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={onMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={onTouchMove}
      >
        {/* After Image (Background) */}
        <img 
          src={item.after} 
          alt="After" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        />
        <div className="absolute top-4 right-4 bg-elok-navy/80 px-3 py-1 text-xs text-white rounded backdrop-blur">
          AFTER
        </div>

        {/* Before Image (Foreground, Clipped) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={item.before} 
            alt="Before" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute top-4 left-4 bg-elok-rose/80 px-3 py-1 text-xs text-white rounded backdrop-blur">
            BEFORE
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-elok-navy shadow-lg border-2 border-elok-gold">
            <MoveHorizontal size={16} />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-serif text-white">{item.title}</h3>
          <p className="text-elok-gold text-sm">Stylist: {item.stylistName}</p>
        </div>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-elok-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <Reveal className="max-w-2xl" direction="right">
            <span className="text-elok-rose font-medium tracking-widest text-sm uppercase">Real Results</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-3">The ELOK Transformation</h2>
            <p className="text-slate-400 mt-4">
              Lihat bagaimana kami mengubah penampilan dan meningkatkan kepercayaan diri klien kami melalui sentuhan profesional.
            </p>
          </Reveal>
          <Reveal delay={0.2} direction="left">
            <button className="text-elok-gold border-b border-elok-gold pb-1 hover:text-white hover:border-white transition-colors">
              Lihat Semua Gallery
            </button>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {TRANSFORMATIONS.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.2}>
              <CompareSlider item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;