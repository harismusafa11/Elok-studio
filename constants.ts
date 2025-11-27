import { Service, Stylist, Testimonial, BeforeAfterImage } from './types';
import { Scissors, Palette, Sparkles, Crown } from 'lucide-react';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Signature Precision Cut',
    description: 'Konsultasi detail, pencucian relaksasi, dan potongan presisi sesuai bentuk wajah.',
    price: 250000,
    duration: 60,
    category: 'Hair',
    image: 'https://files.catbox.moe/mv763j.jpg'
  },
  {
    id: 's2',
    name: 'Royal Color Transformation',
    description: 'Pewarnaan premium menggunakan produk organik yang menjaga kesehatan rambut.',
    price: 850000,
    duration: 180,
    category: 'Color',
    image: 'https://files.catbox.moe/k1xz5i.jpg'
  },
  {
    id: 's3',
    name: 'Scalp & Hair Spa Ritual',
    description: 'Perawatan intensif untuk kulit kepala dan batang rambut dengan pijatan akupresur.',
    price: 450000,
    duration: 90,
    category: 'Spa',
    image: 'https://files.catbox.moe/6giu6h.jpg'
  },
  {
    id: 's4',
    name: 'Keratin Smoothing Treatment',
    description: 'Mengembalikan kilau alami rambut dan mengurangi kusut hingga 3 bulan.',
    price: 1200000,
    duration: 240,
    category: 'Treatment',
    image: 'https://files.catbox.moe/nwx5hv.jpg'
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'st1',
    name: 'Sarah Wijaya',
    role: 'Master Stylist',
    image: 'https://files.catbox.moe/ng90r5.jpg',
    specialties: ['Short Cuts', 'Creative Color']
  },
  {
    id: 'st2',
    name: 'David Tan',
    role: 'Senior Barber',
    image: 'https://files.catbox.moe/u0i26s.jpg',
    specialties: ['Classic Fade', 'Beard Grooming']
  },
  {
    id: 'st3',
    name: 'Elena Rossa',
    role: 'Color Specialist',
    image: 'https://files.catbox.moe/nwj4ou.jpg',
    specialties: ['Balayage', 'Color Correction']
  },
  {
    id: 'st4',
    name: 'Kiki Saputra',
    role: 'Texture Expert',
    image: 'https://files.catbox.moe/jx19h1.jpg',
    specialties: ['Curly Hair', 'Perming']
  }
];

export const CATEGORY_ICONS = {
  'Hair': Scissors,
  'Color': Palette,
  'Spa': Sparkles,
  'Treatment': Crown
};

export const TRANSFORMATIONS: BeforeAfterImage[] = [
  {
    id: 't1',
    title: 'Warm Balayage Correction',
    stylistName: 'Sarah Wijaya',
    before: 'https://files.catbox.moe/av2ab3.png',
    after: 'https://files.catbox.moe/pc44cj.png'
  },
  {
    id: 't2',
    title: 'Precision Bob Cut',
    stylistName: 'David Tan',
    before: 'https://files.catbox.moe/n4dul1.png',
    after: 'https://files.catbox.moe/hd593j.png'
  }
];

export const PRICING_PLANS = [
  {
    name: 'Essential Care',
    price: '350K',
    period: '/ month',
    features: ['1x Signature Cut', '1x Hair Spa Ritual', '10% Product Discount', 'Priority Booking'],
    isPopular: false
  },
  {
    name: 'Royal Elite',
    price: '950K',
    period: '/ month',
    features: ['Unlimited Cuts', '2x Scalp Treatment', '1x Glossing Service', '20% Product Discount', 'VIP Private Room Access'],
    isPopular: true
  },
  {
    name: 'Ultimate Luxe',
    price: '2.5M',
    period: '/ month',
    features: ['Unlimited All Services', 'Weekly Blowouts', 'Free Home Care Kit', 'Family Member Add-on', 'Concierge Service'],
    isPopular: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'tm1',
    name: 'Amanda Manopo',
    role: 'Actress',
    content: 'Saya sangat terkesan dengan perhatian terhadap detail di ELOK. Warna rambut saya belum pernah terlihat sesehat dan berkilau ini. Truly a masterpiece.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'tm2',
    name: 'Chef Juna',
    role: 'Professional Chef',
    content: 'Potongan rambut yang presisi dan layanan yang efisien. Tempat terbaik untuk gentleman cut di Jakarta Selatan.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'tm3',
    name: 'Raisa Andriana',
    role: 'Singer',
    content: 'Suasana yang sangat menenangkan dan privat. Treatment spa rambutnya benar-benar meremajakan saya setelah jadwal tour yang padat.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
  }
];
