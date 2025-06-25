
import { useQuery } from '@tanstack/react-query';
import { Property } from '@/types/property';

// Mock data for demo purposes
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Mountain View Villa',
    location: 'Manali',
    state: 'Himachal Pradesh',
    price: 8500,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d'
    ],
    videos: [],
    seasonalImages: [],
    description: 'A stunning villa with panoramic mountain views nestled in the heart of Manali. Perfect for families looking to escape the city and reconnect with nature.',
    shortDescription: 'Stunning villa with panoramic mountain views in Manali',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'villa',
    views: ['mountain', 'village'],
    themes: ['family', 'romantic'],
    amenities: ['WiFi', 'Kitchen', 'Parking', 'Mountain View'],
    nearbyExperiences: ['Solang Valley skiing', 'Old Manali cafes', 'Hadimba Temple'],
    localTips: ['Best views at sunrise', 'Local market opens at 9 AM'],
    hostName: 'Rajesh Kumar',
    contactNumber: '+91-9876543210',
    whatsappNumber: '+91-9876543210',
    rating: 4.8,
    reviewCount: 24,
    reviews: [
      {
        id: '1',
        propertyId: '1',
        guestName: 'Sarah Johnson',
        rating: 5,
        comment: 'Absolutely breathtaking views and amazing hospitality!',
        verified: true,
        createdAt: '2024-01-15T10:00:00Z',
        approved: true
      }
    ],
    featured: true,
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Riverside Tent Camp',
    location: 'Rishikesh',
    state: 'Uttarakhand',
    price: 3500,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1504851149312-7a075b496cc7',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e'
    ],
    videos: [],
    seasonalImages: [],
    description: 'Experience the perfect blend of adventure and comfort at our riverside tent camp. Wake up to the sound of flowing water and enjoy activities like rafting and yoga.',
    shortDescription: 'Adventure tent camp by the sacred Ganges river',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'tent',
    views: ['river', 'jungle'],
    themes: ['adventure', 'off-grid'],
    amenities: ['Campfire', 'River Access', 'Yoga Deck', 'Adventure Sports'],
    nearbyExperiences: ['White water rafting', 'Yoga sessions', 'Temple visits'],
    localTips: ['Early morning river views', 'Book rafting in advance'],
    hostName: 'Adventure Camps India',
    contactNumber: '+91-9876543211',
    whatsappNumber: '+91-9876543211',
    rating: 4.5,
    reviewCount: 18,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  }
];

export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async (): Promise<Property[]> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockProperties;
    }
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async (): Promise<Property | null> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockProperties.find(p => p.id === id) || null;
    }
  });
};
