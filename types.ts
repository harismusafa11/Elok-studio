export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'Hair' | 'Treatment' | 'Color' | 'Spa';
  image: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  image: string;
  specialties: string[];
}

export interface BookingStep {
  id: number;
  title: string;
}

export interface BookingData {
  serviceId: string | null;
  stylistId: string | null;
  date: string | null;
  time: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Regular Client"
  content: string;
  rating: number;
  image: string;
}

export interface BeforeAfterImage {
  id: string;
  before: string;
  after: string;
  title: string;
  stylistName: string;
}