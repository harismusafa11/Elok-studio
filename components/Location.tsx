import React from 'react';
import { MapPin } from 'lucide-react';
import Reveal from './Reveal';

const Location: React.FC = () => {
  return (
    <section className="bg-black relative h-[600px] flex items-center overflow-hidden">
       {/* Map Embed Background */}
       <div className="absolute inset-0 z-0">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.257522507856!2d106.80486847582046!3d-6.229728861008688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1506e300259%3A0xac23a73c4475477d!2sJl.%20Senopati%2C%20Kebayoran%20Baru%2C%20Kota%20Jakarta%20Selatan!5e0!3m2!1sen!2sid!4v1709283451234!5m2!1sen!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale invert-[1] contrast-[1.1] opacity-60"
            title="Location Map"
          ></iframe>
       </div>
       
       <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none"></div>

       <div className="container mx-auto px-6 relative z-10 pointer-events-none">
          <Reveal>
            <div className="max-w-md bg-zinc-950/80 backdrop-blur-xl border border-white/10 p-10 pointer-events-auto">
               <span className="text-elok-gold text-xs uppercase tracking-[0.3em]">Visit Us</span>
               <h2 className="text-4xl font-serif text-white mt-4 mb-6">The Studio</h2>
               
               <div className="space-y-6 text-zinc-400 font-light">
                  <div className="flex gap-4">
                     <span className="text-white w-24 shrink-0 uppercase text-xs tracking-wider font-medium">Address</span>
                     <p>Jl. Senopati No. 88, Kebayoran Baru<br/>Jakarta Selatan</p>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-white w-24 shrink-0 uppercase text-xs tracking-wider font-medium">Contact</span>
                     <p>+62 21 555 0199<br/>hello@elokstudio.id</p>
                  </div>
                  <div className="flex gap-4">
                     <span className="text-white w-24 shrink-0 uppercase text-xs tracking-wider font-medium">Hours</span>
                     <div>
                        <p>Mon - Fri: 10am - 8pm</p>
                        <p>Sat - Sun: 9am - 9pm</p>
                     </div>
                  </div>
               </div>

               <a 
                  href="https://goo.gl/maps/something" 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-8 block w-full text-center border border-white/20 text-white py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
               >
                  Get Directions
               </a>
            </div>
          </Reveal>
       </div>
    </section>
  );
};

export default Location;