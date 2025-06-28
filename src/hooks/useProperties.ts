
import { useQuery } from '@tanstack/react-query';
import { Property } from '@/types/property';

// Mock data for demo purposes
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Mountain Paradise Villa',
    location: 'Jibhi',
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
    videos: [
      'https://drive.google.com/file/d/1jyDGHDltiMvNzGEvhl7r_sB9NbQ5I5zR/view?usp=sharing',
      'https://drive.google.com/file/d/1j8JidRIL7ONZexNFMtqnlIvieVC70QIR/view?usp=drive_link',
      'https://drive.google.com/file/d/1FtaMwe6lIwavPrp6Kfi4bePEDD2-Hqo2/view?usp=drive_link'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96'
    ],
    description: 'A stunning villa with panoramic mountain views nestled in the serene valley of Jibhi, Himachal Pradesh. Perfect for families looking to escape the city and reconnect with nature in the heart of the Himalayas.',
    shortDescription: 'Stunning villa with panoramic mountain views in Jibhi, Himachal Pradesh',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'villa',
    views: ['mountain', 'himalayas'],
    themes: ['family-getaway', 'romantic'],
    amenities: ['WiFi', 'Kitchen', 'Parking', 'Mountain View', 'Fireplace'],
    nearbyExperiences: ['Jibhi Waterfall', 'Serolsar Lake trek', 'Local village walks'],
    localTips: ['Best views at sunrise', 'Visit Jibhi waterfall in morning'],
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
        comment: 'Absolutely breathtaking mountain views and amazing hospitality!',
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
    name: 'Crystal Sea Resort',
    location: 'Agatti',
    state: 'Lakshadweep',
    price: 12500,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1590004953392-5aba2e72269a'
    ],
    videos: [
      'https://drive.google.com/file/d/1BD05ZZg-H6e0Ycbq0KfMvEE_fM04wa4r/view?usp=drive_link',
      'https://drive.google.com/file/d/1hAjJwT1IrL8emR7W2DP3vNZwHvygJtdO/view?usp=drive_link'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Experience paradise at this exclusive sea-view resort in Agatti, Lakshadweep. Wake up to pristine turquoise waters and enjoy world-class snorkeling and diving in one of India\'s most beautiful coral islands.',
    shortDescription: 'Exclusive sea-view resort with pristine waters in Agatti, Lakshadweep',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'resort',
    views: ['ocean'],
    themes: ['honeymoon', 'adventure'],
    amenities: ['Sea View', 'Snorkeling', 'Diving', 'Beach Access', 'WiFi'],
    nearbyExperiences: ['Coral reef diving', 'Island hopping', 'Traditional fishing'],
    localTips: ['Best diving spots in morning', 'Book permits in advance'],
    hostName: 'Lakshadweep Resorts',
    contactNumber: '+91-9876543211',
    whatsappNumber: '+91-9876543211',
    rating: 4.9,
    reviewCount: 18,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Cliffside Sea Villa',
    location: 'Varkala',
    state: 'Kerala',
    price: 6500,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
    ],
    videos: [
      'https://drive.google.com/file/d/1x2X8UlXXVvU2tCQVmhf059AZZ_2Zw4Hu/view?usp=drive_link',
      'https://drive.google.com/file/d/15GhIrzwuQCwAieR6G3sgWs191TIaDZmu/view?usp=drive_link',
      'https://drive.google.com/file/d/1kEQYF7OP3ZLwufRllI81zmUqyXF9ubSq/view?usp=drive_link'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
    ],
    description: 'Perched on the dramatic cliffs of Varkala, this villa offers breathtaking sea views and direct access to the famous Varkala Beach. Perfect for those seeking tranquility with stunning ocean vistas and Ayurvedic wellness.',
    shortDescription: 'Cliffside villa with stunning sea views in Varkala, Kerala',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'villa',
    views: ['ocean'],
    themes: ['ayurveda-retreat', 'romantic', 'eco-friendly'],
    amenities: ['Sea View', 'Cliff Access', 'WiFi', 'Ayurvedic Spa', 'Beach Access'],
    nearbyExperiences: ['Varkala Beach', 'Ayurvedic treatments', 'Cliff walking'],
    localTips: ['Best sunset views from cliff', 'Try Ayurvedic massage'],
    hostName: 'Priya Nair',
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
    name: 'Lakeside Mountain Lodge',
    location: 'Tehri Lake, Garhwal',
    state: 'Uttarakhand',
    price: 5200,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      'https://images.unsplash.com/photo-1590004953392-5aba2e72269a',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1502780402662-acc01917949e'
    ],
    videos: [
      'https://drive.google.com/file/d/1PBAAZL6v11StUewFpgBQR3oA_rFIowNY/view?usp=drive_link',
      'https://drive.google.com/file/d/1yo99kgMaTlfUly09nL4UAZ53XQlbNOvS/view?usp=drive_link'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Stunning lodge overlooking the pristine Tehri Lake in Garhwal, Uttarakhand. Surrounded by Himalayan peaks and offering spectacular lake views, perfect for water sports and mountain adventures.',
    shortDescription: 'Mountain lodge with spectacular Tehri Lake views in Garhwal',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'cabin',
    views: ['lake', 'mountain'],
    themes: ['adventure', 'family-getaway', 'workation'],
    amenities: ['Lake View', 'Water Sports', 'Mountain Views', 'WiFi', 'Boat Access'],
    nearbyExperiences: ['Tehri Dam', 'Water sports', 'Mountain trekking'],
    localTips: ['Best boat rides at sunrise', 'Try water skiing'],
    hostName: 'Vikram Singh',
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
    name: 'Riverside Valley Cottage',
    location: 'Ziro Town',
    state: 'Arunachal Pradesh',
    price: 4200,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d'
    ],
    videos: [
      'https://drive.google.com/file/d/1JFHgJHWGOn3FSG0s4YjRVvCF8ZFZ7yYq/view?usp=drive_link',
      'https://drive.google.com/file/d/12ziy5udhe9hBOUn_H4mTbEBYAg06xJQ0/view?usp=drive_link',
      'https://drive.google.com/file/d/16--wutfajVswutK7f4Y8qhb6-3m6iv0l/view?usp=drive_link'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Peaceful cottage along the pristine rivers of Ziro Town, Arunachal Pradesh. Experience the unique Apatani culture while enjoying serene river views and exploring the UNESCO World Heritage site.',
    shortDescription: 'Riverside cottage in cultural Ziro Town, Arunachal Pradesh',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'cottage',
    views: ['river', 'valley'],
    themes: ['off-grid', 'adventure', 'eco-friendly'],
    amenities: ['River View', 'Cultural Tours', 'Trekking Base', 'WiFi', 'Traditional Meals'],
    nearbyExperiences: ['Apatani village tours', 'Ziro Music Festival', 'River trekking'],
    localTips: ['Visit during festival season', 'Learn about Apatani culture'],
    hostName: 'Tashi Dorje',
    contactNumber: '+91-9876543214',
    whatsappNumber: '+91-9876543214',
    rating: 4.5,
    reviewCount: 15,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '6',
    name: 'Forest View Safari Lodge',
    location: 'Jim Corbett',
    state: 'Uttarakhand',
    price: 7800,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    videos: [
      'https://drive.google.com/file/d/1Ilfb2Hoqsu6y0IWpHJCt9cFXDIHKZKqB/view?usp=drive_link',
      'https://drive.google.com/file/d/1WjsTggou1uwYasyvSZLo5v9FCPdZE6FL/view?usp=drive_link'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Luxury safari lodge with spectacular forest views in Jim Corbett National Park. Perfect for wildlife enthusiasts and adventure seekers looking to experience India\'s premier tiger reserve.',
    shortDescription: 'Safari lodge with forest views in Jim Corbett National Park',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'resort',
    views: ['forest', 'jungle'],
    themes: ['adventure', 'family-getaway'],
    amenities: ['Forest View', 'Safari Tours', 'Wildlife Spotting', 'Restaurant', 'Nature Walks'],
    nearbyExperiences: ['Tiger safari', 'Bird watching', 'Jungle walks'],
    localTips: ['Early morning safaris are best', 'Carry binoculars'],
    hostName: 'Ravi Sharma',
    contactNumber: '+91-9876543215',
    whatsappNumber: '+91-9876543215',
    rating: 4.7,
    reviewCount: 33,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z'
  },
  {
    id: '7',
    name: 'Rainforest Treehouse',
    location: 'Cherrapunji',
    state: 'Meghalaya',
    price: 5800,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
    ],
    videos: [
      'https://drive.google.com/file/d/1619mhh2EhFREu2bEMiWHScK9dQacoUux/view?usp=drive_link',
      'https://drive.google.com/file/d/1z74G0kGEOJvtgFF8nmchsuIrkr_AYZOb/view?usp=drive_link',
      'https://drive.google.com/file/d/1GcJgyZxSpOrmrBidiF3zsxoBjke0Dhru/view?usp=drive_link'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Unique treehouse experience in the wettest place on earth - Cherrapunji, Meghalaya. Surrounded by lush rainforests and cascading waterfalls, perfect for nature lovers and adventure seekers.',
    shortDescription: 'Unique treehouse in rainforest of Cherrapunji, Meghalaya',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'treehouse',
    views: ['forest', 'waterfall'],
    themes: ['adventure', 'eco-friendly', 'off-grid'],
    amenities: ['Treehouse Experience', 'Waterfall Views', 'Rain Forest', 'Bird Watching', 'Nature Walks'],
    nearbyExperiences: ['Living root bridges', 'Nohkalikai Falls', 'Cave exploration'],
    localTips: ['Visit during monsoon for best experience', 'Carry rain gear'],
    hostName: 'Mary Khongwir',
    contactNumber: '+91-9876543216',
    whatsappNumber: '+91-9876543216',
    rating: 4.8,
    reviewCount: 19,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-07T00:00:00Z',
    updatedAt: '2024-01-07T00:00:00Z'
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
