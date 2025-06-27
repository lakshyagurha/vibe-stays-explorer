
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
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1502780402662-acc01917949e'
    ],
    videos: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96'
    ],
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
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1590004953392-5aba2e72269a'
    ],
    videos: ['https://www.youtube.com/watch?v=example2'],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
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
  },
  {
    id: '3',
    name: 'Himalayan Eco Lodge',
    location: 'Dharamshala',
    state: 'Himachal Pradesh',
    price: 6500,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
    ],
    videos: ['https://www.youtube.com/watch?v=example3'],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
    ],
    description: 'Sustainable eco-lodge surrounded by pristine Himalayan forests. Perfect for nature lovers seeking tranquility and mindful living experiences.',
    shortDescription: 'Eco-friendly lodge in the heart of Himalayas',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'cabin',
    views: ['mountain', 'forest'],
    themes: ['eco-friendly', 'workation', 'family-getaway'],
    amenities: ['Solar Power', 'Organic Garden', 'WiFi', 'Meditation Space', 'Library'],
    nearbyExperiences: ['McLeod Ganj monasteries', 'Triund trek', 'Local organic markets'],
    localTips: ['Best meditation time is at dawn', 'Try local Tibetan cuisine'],
    hostName: 'Tenzin Norbu',
    contactNumber: '+91-9876543212',
    whatsappNumber: '+91-9876543212',
    rating: 4.7,
    reviewCount: 31,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Backwater Cottage',
    location: 'Alleppey',
    state: 'Kerala',
    price: 5200,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1590004953392-5aba2e72269a',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1502780402662-acc01917949e'
    ],
    videos: ['https://www.youtube.com/watch?v=example4'],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Traditional Kerala cottage overlooking serene backwaters. Experience authentic Kerala hospitality with Ayurvedic treatments and organic meals.',
    shortDescription: 'Traditional cottage with backwater views and Ayurveda',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'cottage',
    views: ['lake', 'village'],
    themes: ['ayurveda-retreat', 'honeymoon', 'eco-friendly'],
    amenities: ['Ayurvedic Spa', 'Traditional Kitchen', 'Boat Rides', 'Organic Meals'],
    nearbyExperiences: ['Backwater boat tours', 'Kathakali performances', 'Spice plantation visits'],
    localTips: ['Best boat rides at sunset', 'Try authentic fish curry'],
    hostName: 'Ravi Menon',
    contactNumber: '+91-9876543213',
    whatsappNumber: '+91-9876543213',
    rating: 4.6,
    reviewCount: 22,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    name: 'Desert Camp Resort',
    location: 'Jaisalmer',
    state: 'Rajasthan',
    price: 7200,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1590004953392-5aba2e72269a',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d'
    ],
    videos: ['https://www.youtube.com/watch?v=example5'],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Luxury desert camp with traditional Rajasthani architecture. Experience camel safaris, folk performances, and stargazing in the Thar Desert.',
    shortDescription: 'Luxury desert camp with camel safaris and cultural shows',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'resort',
    views: ['valley', 'village'],
    themes: ['adventure', 'honeymoon', 'corporate-training'],
    amenities: ['Swimming Pool', 'Camel Safari', 'Folk Shows', 'Spa', 'Restaurant'],
    nearbyExperiences: ['Jaisalmer Fort tours', 'Sand dune adventures', 'Local handicraft shopping'],
    localTips: ['Best camel rides at sunrise', 'Carry sunscreen and hats'],
    hostName: 'Maharaja Singh',
    contactNumber: '+91-9876543214',
    whatsappNumber: '+91-9876543214',
    rating: 4.9,
    reviewCount: 45,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '6',
    name: 'Forest Treehouse',
    location: 'Munnar',
    state: 'Kerala',
    price: 4800,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    videos: ['https://www.youtube.com/watch?v=example6'],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Unique treehouse experience in lush tea plantations. Perfect for adventure seekers and nature photographers looking for an elevated perspective.',
    shortDescription: 'Elevated treehouse surrounded by tea plantations',
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'treehouse',
    views: ['forest', 'valley'],
    themes: ['adventure', 'honeymoon', 'eco-friendly'],
    amenities: ['Tree Canopy Access', 'Bird Watching', 'Tea Plantation Tours', 'WiFi'],
    nearbyExperiences: ['Tea factory visits', 'Wildlife spotting', 'Trekking trails'],
    localTips: ['Early morning bird watching is amazing', 'Try fresh tea from plantations'],
    hostName: 'Priya Nair',
    contactNumber: '+91-9876543215',
    whatsappNumber: '+91-9876543215',
    rating: 4.4,
    reviewCount: 17,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z'
  },
  {
    id: '7',
    name: 'Himalayan View Cottage',
    location: 'Kasol',
    state: 'Himachal Pradesh',
    price: 3800,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
    ],
    videos: ['https://www.youtube.com/watch?v=example7'],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Cozy cottage in the Parvati Valley with stunning Himalayan views. Perfect for backpackers and groups looking for budget-friendly mountain accommodation.',
    shortDescription: 'Budget-friendly cottage with panoramic Himalayan views',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'cottage',
    views: ['himalayas', 'waterfall'],
    themes: ['adventure', 'workation', 'school-education-stays'],
    amenities: ['Mountain Views', 'Trekking Base', 'Bonfire Area', 'WiFi'],
    nearbyExperiences: ['Malana village trek', 'Kheerganga hot springs', 'Tosh village exploration'],
    localTips: ['Carry warm clothes even in summer', 'Try local Israeli cuisine'],
    hostName: 'Vikram Chauhan',
    contactNumber: '+91-9876543216',
    whatsappNumber: '+91-9876543216',
    rating: 4.2,
    reviewCount: 28,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-07T00:00:00Z',
    updatedAt: '2024-01-07T00:00:00Z'
  },
  {
    id: '8',
    name: 'Lakeside Resort',
    location: 'Nainital',
    state: 'Uttarakhand',
    price: 9500,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1590004953392-5aba2e72269a'
    ],
    videos: ['https://www.youtube.com/watch?v=example8'],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Premium lakeside resort with luxury amenities and breathtaking lake views. Ideal for corporate retreats, family gatherings, and romantic getaways.',
    shortDescription: 'Premium resort overlooking pristine mountain lake',
    maxGuests: 12,
    bedrooms: 6,
    bathrooms: 5,
    propertyType: 'resort',
    views: ['lake', 'mountain'],
    themes: ['family-getaway', 'corporate-training', 'honeymoon'],
    amenities: ['Lake Access', 'Boat Rides', 'Spa', 'Restaurant', 'Conference Hall', 'WiFi'],
    nearbyExperiences: ['Naini Lake boating', 'Snow View Point', 'Mall Road shopping'],
    localTips: ['Best lake views from room balconies', 'Book boat rides in advance'],
    hostName: 'Sanjay Bisht',
    contactNumber: '+91-9876543217',
    whatsappNumber: '+91-9876543217',
    rating: 4.8,
    reviewCount: 52,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z'
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
