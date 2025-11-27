import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Check, Calendar, Clock, User, Scissors } from 'lucide-react';
import { SERVICES, STYLISTS } from '../constants';
import { Service, Stylist, BookingData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string | null;
}

const steps = ['Service', 'Stylist', 'Time', 'Confirm'];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialServiceId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceId: null,
    stylistId: null,
    date: null,
    time: null,
    customerName: '',
    customerPhone: '',
    customerEmail: ''
  });

  // Reset or pre-fill data when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0); // Always start at step 0
      setBookingData(prev => ({
        ...prev,
        serviceId: initialServiceId || null,
        // Keep other fields if you want persistence, or reset them:
        // stylistId: null,
        // date: null,
        // time: null
      }));
    }
  }, [isOpen, initialServiceId]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const updateData = (key: keyof BookingData, value: any) => {
    setBookingData(prev => ({ ...prev, [key]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Select Service
        return (
          <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2">
            {SERVICES.map(service => (
              <div 
                key={service.id}
                onClick={() => updateData('serviceId', service.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center gap-4 ${
                  bookingData.serviceId === service.id 
                    ? 'border-elok-gold bg-elok-gold/10' 
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img src={service.image} alt={service.name} className="w-16 h-16 rounded object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-white">{service.name}</h4>
                  <p className="text-sm text-slate-400">
                     {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(service.price)} • {service.duration} min
                  </p>
                </div>
                {bookingData.serviceId === service.id && <Check className="text-elok-gold" />}
              </div>
            ))}
          </div>
        );
      case 1: // Select Stylist
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STYLISTS.map(stylist => (
              <div 
                key={stylist.id}
                onClick={() => updateData('stylistId', stylist.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all text-center ${
                  bookingData.stylistId === stylist.id 
                    ? 'border-elok-gold bg-elok-gold/10' 
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img src={stylist.image} alt={stylist.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-elok-purple" />
                <h4 className="font-bold text-white">{stylist.name}</h4>
                <p className="text-xs text-elok-gold uppercase tracking-wider">{stylist.role}</p>
              </div>
            ))}
          </div>
        );
      case 2: // Select Date & Time
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Select Date</label>
              <input 
                type="date" 
                className="w-full bg-elok-dark border border-white/20 rounded-lg p-3 text-white focus:border-elok-gold outline-none"
                onChange={(e) => updateData('date', e.target.value)}
                value={bookingData.date || ''}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Select Time</label>
              <div className="grid grid-cols-3 gap-2">
                {['10:00', '11:00', '13:00', '14:30', '16:00', '17:30'].map(time => (
                  <button
                    key={time}
                    onClick={() => updateData('time', time)}
                    className={`p-2 rounded border text-sm ${
                      bookingData.time === time
                        ? 'bg-elok-gold text-elok-dark border-elok-gold'
                        : 'border-white/20 text-slate-300 hover:border-white/50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3: // Confirmation
        const selectedService = SERVICES.find(s => s.id === bookingData.serviceId);
        const selectedStylist = STYLISTS.find(s => s.id === bookingData.stylistId);
        
        return (
          <div className="space-y-6">
             <div className="bg-white/5 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-3 text-slate-300">
                  <Scissors className="w-4 h-4 text-elok-gold" />
                  <span>{selectedService?.name || 'Not selected'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <User className="w-4 h-4 text-elok-gold" />
                  <span>{selectedStylist?.name || 'Any Stylist'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Calendar className="w-4 h-4 text-elok-gold" />
                  <span>{bookingData.date}, {bookingData.time}</span>
                </div>
             </div>

             <div className="space-y-4">
               <input 
                 placeholder="Your Name" 
                 className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-elok-gold outline-none"
                 value={bookingData.customerName}
                 onChange={(e) => updateData('customerName', e.target.value)}
               />
               <input 
                 placeholder="WhatsApp Number" 
                 className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-elok-gold outline-none"
                 value={bookingData.customerPhone}
                 onChange={(e) => updateData('customerPhone', e.target.value)}
               />
               <input 
                 placeholder="Email Address" 
                 className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-elok-gold outline-none"
                 value={bookingData.customerEmail}
                 onChange={(e) => updateData('customerEmail', e.target.value)}
               />
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-elok-navy border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-elok-dark/50">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white">Booking</h2>
            <p className="text-slate-400 text-sm">Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-white/5 w-full">
          <div 
            className="h-full bg-gradient-to-r from-elok-gold to-elok-rose transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-between bg-elok-dark/50">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-300 hover:text-white'
            }`}
          >
            Back
          </button>
          
          <button 
            onClick={() => {
              if (currentStep === steps.length - 1) {
                alert("Booking Confirmed! (Demo)");
                onClose();
              } else {
                handleNext();
              }
            }}
            className="px-8 py-2 bg-elok-gold text-elok-navy font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2"
          >
            {currentStep === steps.length - 1 ? 'Confirm Booking' : 'Next'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;