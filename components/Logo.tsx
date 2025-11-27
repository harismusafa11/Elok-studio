import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", light = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Geometric Star Icon */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Main Star */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-elok-gold drop-shadow-[0_0_10px_rgba(212,185,150,0.5)]">
          <path d="M50 0 C55 25 75 45 100 50 C75 55 55 75 50 100 C45 75 25 55 0 50 C25 45 45 25 50 0 Z" fill="currentColor" />
        </svg>
        
        {/* Inner Sparkle (Animated) */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        </div>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center h-full">
        <span className={`font-serif text-xl tracking-[0.2em] font-bold leading-none ${light ? 'text-white' : 'text-zinc-900'}`}>
          ELOK
        </span>
        <span className={`text-[0.4rem] uppercase tracking-[0.4em] leading-none mt-1 ${light ? 'text-zinc-500' : 'text-zinc-400'}`}>
          Studio
        </span>
      </div>
    </div>
  );
};

export default Logo;