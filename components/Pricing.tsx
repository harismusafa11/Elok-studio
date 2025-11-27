import React from 'react';
import { PRICING_PLANS } from '../constants';
import { Check } from 'lucide-react';
import Reveal from './Reveal';

interface PricingProps {
  onBookClick: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onBookClick }) => {
  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-20">
          <span className="text-elok-gold text-xs uppercase tracking-[0.3em]">Investment</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mt-4">Membership & Packages</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <Reveal key={index} delay={index * 0.1} className="h-full">
              <div 
                className={`group relative p-10 h-full flex flex-col border transition-all duration-500 hover:transform hover:-translate-y-2 ${
                  plan.isPopular 
                    ? 'bg-zinc-900 border-elok-gold/30 shadow-[0_0_50px_rgba(212,185,150,0.05)]' 
                    : 'bg-transparent border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-elok-gold text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1">
                    Recommended
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif text-white mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-elok-gold">
                    <span className="text-sm">IDR</span>
                    <span className="text-4xl font-light">{plan.price}</span>
                  </div>
                  {plan.period && <p className="text-zinc-500 text-xs mt-1">{plan.period}</p>}
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      <div className="w-1 h-1 bg-elok-gold rounded-full"></div>
                      <span className="text-sm font-light">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={onBookClick}
                  className={`w-full py-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 border ${
                    plan.isPopular 
                      ? 'bg-elok-gold border-elok-gold text-black hover:bg-white hover:border-white' 
                      : 'bg-transparent border-zinc-700 text-white hover:border-white hover:bg-white hover:text-black'
                  }`}
                >
                  Select Plan
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;