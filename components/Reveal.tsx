import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
}

const Reveal: React.FC<RevealProps> = ({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.8,
  direction = 'up',
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, {
      threshold: threshold,
      rootMargin: "0px 0px -50px 0px" 
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up': return 'translate3d(0, 50px, 0)';
      case 'down': return 'translate3d(0, -50px, 0)';
      case 'left': return 'translate3d(50px, 0, 0)';
      case 'right': return 'translate3d(-50px, 0, 0)';
      case 'none': return 'translate3d(0, 0, 0)';
      default: return 'translate3d(0, 50px, 0)';
    }
  };

  return (
    <div 
      ref={ref}
      className={className}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `transform ${duration}s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s, opacity ${duration}s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;