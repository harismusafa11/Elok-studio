import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';
import Reveal from './Reveal';

const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-zinc-950 border-y border-white/5">
      <div className="container mx-auto px-6">
        <Reveal className="text-center mb-24">
           <Quote size={40} className="text-elok-gold mx-auto mb-6 opacity-50" />
           <h2 className="text-4xl md:text-5xl font-serif text-white">Client Stories</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.2} className="px-6 pt-8 md:pt-0 text-center">
              <p className="text-zinc-300 text-lg italic leading-relaxed mb-8 font-light">
                "{testimonial.content}"
              </p>
              
              <div className="flex flex-col items-center gap-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover grayscale opacity-70" 
                />
                <div>
                  <h4 className="text-white font-serif text-lg">{testimonial.name}</h4>
                  <p className="text-xs text-elok-gold uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;