
import { useQuery } from '@tanstack/react-query';
import { Property } from '@/types/property';

// Mock data with 2-3 properties per destination
const mockProperties: Property[] = [
  // Jibhi, Himachal Pradesh - 3 properties
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
      'https://drive.google.com/file/d/1jyDGHDltiMvNzGEvhl7r_sB9NbQ5I5zR/preview',
      'https://drive.google.com/file/d/1j8JidRIL7ONZexNFMtqnlIvieVC70QIR/preview',
      'https://drive.google.com/file/d/1FtaMwe6lIwavPrp6Kfi4bePEDD2-Hqo2/preview'
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
    views: ['mountain'],
    themes: ['family-getaway', 'romantic'],
    amenities: ['WiFi', 'Kitchen', 'Parking', 'Mountain View', 'Fireplace'],
    nearbyExperiences: ['Jibhi Waterfall', 'Serolsar Lake trek', 'Local village walks'],
    localTips: ['Best views at sunrise', 'Visit Jibhi waterfall in morning'],
    hostName: 'Rajesh Kumar',
    contactNumber: '+91-9876543210',
    whatsappNumber: '+91-9876543210',
    rating: 4.8,
    reviewCount: 24,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Himalayan Retreat Cottage',
    location: 'Jibhi',
    state: 'Himachal Pradesh',
    price: 6200,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    videos: [
      'https://drive.google.com/file/d/1BD05ZZg-H6e0Ycbq0KfMvEE_fM04wa4r/preview',
      'https://drive.google.com/file/d/1hAjJwT1IrL8emR7W2DP3vNZwHvygJtdO/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Cozy cottage in the mountains of Jibhi with traditional Himachali architecture and modern amenities.',
    shortDescription: 'Cozy mountain cottage with traditional Himachali architecture',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'cottage',
    views: ['mountain'],
    themes: ['romantic', 'honeymoon'],
    amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Mountain View', 'Garden'],
    nearbyExperiences: ['Mountain trekking', 'Local markets', 'Temple visits'],
    localTips: ['Best for winter stays', 'Try local Himachali cuisine'],
    hostName: 'Priya Sharma',
    contactNumber: '+91-9876543211',
    whatsappNumber: '+91-9876543211',
    rating: 4.6,
    reviewCount: 18,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Pine Valley Homestay',
    location: 'Jibhi',
    state: 'Himachal Pradesh',
    price: 4800,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1502780402662-acc01917949e',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3'
    ],
    videos: [
      'https://drive.google.com/file/d/1x2X8UlXXVvU2tCQVmhf059AZZ_2Zw4Hu/preview',
      'https://drive.google.com/file/d/15GhIrzwuQCwAieR6G3sgWs191TIaDZmu/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Traditional homestay experience in Jibhi with authentic Himachali hospitality and home-cooked meals.',
    shortDescription: 'Traditional homestay with authentic Himachali hospitality',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    propertyType: 'homestay',
    views: ['mountain'],
    themes: ['eco-friendly', 'family-getaway'],
    amenities: ['WiFi', 'Home-cooked meals', 'Mountain View', 'Garden', 'Cultural experience'],
    nearbyExperiences: ['Village walks', 'Apple orchards', 'Traditional crafts'],
    localTips: ['Experience local culture', 'Try homemade apple jam'],
    hostName: 'Suresh Thakur',
    contactNumber: '+91-9876543212',
    whatsappNumber: '+91-9876543212',
    rating: 4.7,
    reviewCount: 21,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  },

  // Agatti, Lakshadweep - 2 properties
  {
    id: '4',
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
      'https://drive.google.com/file/d/1kEQYF7OP3ZLwufRllI81zmUqyXF9ubSq/preview',
      'https://drive.google.com/file/d/1PBAAZL6v11StUewFpgBQR3oA_rFIowNY/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Experience paradise at this exclusive sea-view resort in Agatti, Lakshadweep. Wake up to pristine turquoise waters and enjoy world-class snorkeling and diving.',
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
    contactNumber: '+91-9876543213',
    whatsappNumber: '+91-9876543213',
    rating: 4.9,
    reviewCount: 18,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    name: 'Lagoon Paradise Villa',
    location: 'Agatti',
    state: 'Lakshadweep',
    price: 15200,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1590004953392-5aba2e72269a',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19'
    ],
    videos: [
      'https://drive.google.com/file/d/1yo99kgMaTlfUly09nL4UAZ53XQlbNOvS/preview',
      'https://drive.google.com/file/d/1JFHgJHWGOn3FSG0s4YjRVvCF8ZFZ7yYq/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Luxury villa with direct lagoon access in Agatti, perfect for water sports and romantic getaways.',
    shortDescription: 'Luxury villa with direct lagoon access in Agatti',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    propertyType: 'villa',
    views: ['ocean'],
    themes: ['honeymoon', 'romantic'],
    amenities: ['Lagoon Access', 'Water Sports', 'Private Beach', 'WiFi', 'Spa'],
    nearbyExperiences: ['Lagoon kayaking', 'Sunset cruises', 'Marine life spotting'],
    localTips: ['Perfect for sunset views', 'Try local seafood'],
    hostName: 'Ocean Villas',
    contactNumber: '+91-9876543214',
    whatsappNumber: '+91-9876543214',
    rating: 4.8,
    reviewCount: 14,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },

  // Varkala, Kerala - 3 properties
  {
    id: '6',
    name: 'Cliffside Sea Villa',
    location: 'Varkala',
    state: 'Kerala',
    price: 6500,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3'
    ],
    videos: [
      'https://drive.google.com/file/d/12ziy5udhe9hBOUn_H4mTbEBYAg06xJQ0/preview',
      'https://drive.google.com/file/d/16--wutfajVswutK7f4Y8qhb6-3m6iv0l/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
    ],
    description: 'Perched on the dramatic cliffs of Varkala, this villa offers breathtaking sea views and direct access to the famous Varkala Beach.',
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
    contactNumber: '+91-9876543215',
    whatsappNumber: '+91-9876543215',
    rating: 4.7,
    reviewCount: 31,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z'
  },
  {
    id: '7',
    name: 'Backwater Retreat Villa',
    location: 'Varkala',
    state: 'Kerala',
    price: 5800,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    videos: [
      'https://drive.google.com/file/d/1Ilfb2Hoqsu6y0IWpHJCt9cFXDIHKZKqB/preview',
      'https://drive.google.com/file/d/1WjsTggou1uwYasyvSZLo5v9FCPdZE6FL/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Peaceful villa near Varkala backwaters with traditional Kerala architecture and Ayurvedic wellness facilities.',
    shortDescription: 'Peaceful villa near backwaters with traditional Kerala architecture',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'villa',
    views: ['ocean'],
    themes: ['ayurveda-retreat', 'family-getaway'],
    amenities: ['Backwater View', 'Ayurvedic Spa', 'Traditional Architecture', 'WiFi', 'Pool'],
    nearbyExperiences: ['Backwater cruises', 'Ayurvedic treatments', 'Local markets'],
    localTips: ['Try Kerala cuisine', 'Book backwater cruise in advance'],
    hostName: 'Kerala Retreats',
    contactNumber: '+91-9876543216',
    whatsappNumber: '+91-9876543216',
    rating: 4.5,
    reviewCount: 26,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-07T00:00:00Z',
    updatedAt: '2024-01-07T00:00:00Z'
  },
  {
    id: '8',
    name: 'Coastal Heritage Resort',
    location: 'Varkala',
    state: 'Kerala',
    price: 7200,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562',
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
    ],
    videos: [
      'https://drive.google.com/file/d/1619mhh2EhFREu2bEMiWHScK9dQacoUux/preview',
      'https://drive.google.com/file/d/1z74G0kGEOJvtgFF8nmchsuIrkr_AYZOb/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Heritage resort in Varkala with blend of traditional and modern amenities, perfect for cultural experiences.',
    shortDescription: 'Heritage resort with traditional and modern amenities',
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    propertyType: 'resort',
    views: ['ocean'],
    themes: ['romantic', 'family-getaway'],
    amenities: ['Heritage Architecture', 'Cultural Programs', 'Sea View', 'WiFi', 'Restaurant'],
    nearbyExperiences: ['Cultural shows', 'Temple visits', 'Beach activities'],
    localTips: ['Attend cultural programs', 'Visit nearby temples'],
    hostName: 'Heritage Hotels',
    contactNumber: '+91-9876543217',
    whatsappNumber: '+91-9876543217',
    rating: 4.6,
    reviewCount: 19,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z'
  },

  // Tehri Lake, Garhwal, Uttarakhand - 2 properties
  {
    id: '9',
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
      'https://drive.google.com/file/d/1GcJgyZxSpOrmrBidiF3zsxoBjke0Dhru/preview',
      'https://drive.google.com/file/d/13HQsKJRSK2wlk3WDq10u9jGYE51z9SZS/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Stunning lodge overlooking the pristine Tehri Lake in Garhwal, Uttarakhand. Surrounded by Himalayan peaks and offering spectacular lake views.',
    shortDescription: 'Mountain lodge with spectacular Tehri Lake views in Garhwal',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'cabin',
    views: ['lake'],
    themes: ['adventure', 'family-getaway', 'workation'],
    amenities: ['Lake View', 'Water Sports', 'Mountain Views', 'WiFi', 'Boat Access'],
    nearbyExperiences: ['Tehri Dam', 'Water sports', 'Mountain trekking'],
    localTips: ['Best boat rides at sunrise', 'Try water skiing'],
    hostName: 'Vikram Singh',
    contactNumber: '+91-9876543218',
    whatsappNumber: '+91-9876543218',
    rating: 4.6,
    reviewCount: 22,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-09T00:00:00Z',
    updatedAt: '2024-01-09T00:00:00Z'
  },
  {
    id: '10',
    name: 'Himalayan Lake Resort',
    location: 'Tehri Lake, Garhwal',
    state: 'Uttarakhand',
    price: 6800,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1502780402662-acc01917949e',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      'https://images.unsplash.com/photo-1590004953392-5aba2e72269a',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3'
    ],
    videos: [
      'https://drive.google.com/file/d/1jyDGHDltiMvNzGEvhl7r_sB9NbQ5I5zR/preview',
      'https://drive.google.com/file/d/1j8JidRIL7ONZexNFMtqnlIvieVC70QIR/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Luxury resort on Tehri Lake with panoramic mountain views and premium water sports facilities.',
    shortDescription: 'Luxury resort with panoramic mountain and lake views',
    maxGuests: 12,
    bedrooms: 6,
    bathrooms: 5,
    propertyType: 'resort',
    views: ['lake'],
    themes: ['adventure', 'romantic'],
    amenities: ['Lake View', 'Premium Water Sports', 'Spa', 'WiFi', 'Restaurant'],
    nearbyExperiences: ['Adventure sports', 'Boat cruises', 'Mountain hiking'],
    localTips: ['Book water sports in advance', 'Best views at sunset'],
    hostName: 'Lake Resorts',
    contactNumber: '+91-9876543219',
    whatsappNumber: '+91-9876543219',
    rating: 4.8,
    reviewCount: 17,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },

  // Ziro Town, Arunachal Pradesh - 2 properties
  {
    id: '11',
    name: 'Riverside Valley Cottage',
    location: 'Ziro Town',
    state: 'Arunachal Pradesh',
    price: 4200,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    videos: [
      'https://drive.google.com/file/d/1FtaMwe6lIwavPrp6Kfi4bePEDD2-Hqo2/preview',
      'https://drive.google.com/file/d/1BD05ZZg-H6e0Ycbq0KfMvEE_fM04wa4r/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Peaceful cottage along the pristine rivers of Ziro Town, Arunachal Pradesh. Experience the unique Apatani culture.',
    shortDescription: 'Riverside cottage in cultural Ziro Town, Arunachal Pradesh',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'cottage',
    views: ['river'],
    themes: ['off-grid', 'adventure', 'eco-friendly'],
    amenities: ['River View', 'Cultural Tours', 'Trekking Base', 'WiFi', 'Traditional Meals'],
    nearbyExperiences: ['Apatani village tours', 'Ziro Music Festival', 'River trekking'],
    localTips: ['Visit during festival season', 'Learn about Apatani culture'],
    hostName: 'Tashi Dorje',
    contactNumber: '+91-9876543220',
    whatsappNumber: '+91-9876543220',
    rating: 4.5,
    reviewCount: 15,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-11T00:00:00Z',
    updatedAt: '2024-01-11T00:00:00Z'
  },
  {
    id: '12',
    name: 'Apatani Heritage Homestay',
    location: 'Ziro Town',
    state: 'Arunachal Pradesh',
    price: 3800,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
    ],
    videos: [
      'https://drive.google.com/file/d/1hAjJwT1IrL8emR7W2DP3vNZwHvygJtdO/preview',
      'https://drive.google.com/file/d/1x2X8UlXXVvU2tCQVmhf059AZZ_2Zw4Hu/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Authentic Apatani homestay in Ziro Town offering immersive cultural experience with traditional lifestyle.',
    shortDescription: 'Authentic Apatani homestay with immersive cultural experience',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'homestay',
    views: ['river'],
    themes: ['off-grid', 'eco-friendly'],
    amenities: ['Cultural Experience', 'Traditional Food', 'River View', 'Local Crafts', 'Nature Walks'],
    nearbyExperiences: ['Traditional farming', 'Handicraft workshops', 'Nature photography'],
    localTips: ['Participate in daily activities', 'Learn traditional crafts'],
    hostName: 'Abo Tara',
    contactNumber: '+91-9876543221',
    whatsappNumber: '+91-9876543221',
    rating: 4.7,
    reviewCount: 12,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  },

  // Jim Corbett, Uttarakhand - 3 properties
  {
    id: '13',
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
      'https://drive.google.com/file/d/15GhIrzwuQCwAieR6G3sgWs191TIaDZmu/preview',
      'https://drive.google.com/file/d/1kEQYF7OP3ZLwufRllI81zmUqyXF9ubSq/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Luxury safari lodge with spectacular forest views in Jim Corbett National Park. Perfect for wildlife enthusiasts.',
    shortDescription: 'Safari lodge with forest views in Jim Corbett National Park',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'resort',
    views: ['forest'],
    themes: ['adventure', 'family-getaway'],
    amenities: ['Forest View', 'Safari Tours', 'Wildlife Spotting', 'Restaurant', 'Nature Walks'],
    nearbyExperiences: ['Tiger safari', 'Bird watching', 'Jungle walks'],
    localTips: ['Early morning safaris are best', 'Carry binoculars'],
    hostName: 'Ravi Sharma',
    contactNumber: '+91-9876543222',
    whatsappNumber: '+91-9876543222',
    rating: 4.7,
    reviewCount: 33,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-13T00:00:00Z',
    updatedAt: '2024-01-13T00:00:00Z'
  },
  {
    id: '14',
    name: 'Wildlife Adventure Resort',
    location: 'Jim Corbett',
    state: 'Uttarakhand',
    price: 9200,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    videos: [
      'https://drive.google.com/file/d/1PBAAZL6v11StUewFpgBQR3oA_rFIowNY/preview',
      'https://drive.google.com/file/d/1yo99kgMaTlfUly09nL4UAZ53XQlbNOvS/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Premium wildlife resort in Jim Corbett with luxury amenities and guided safari experiences.',
    shortDescription: 'Premium wildlife resort with luxury amenities and guided safaris',
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
    propertyType: 'resort',
    views: ['forest'],
    themes: ['adventure', 'romantic'],
    amenities: ['Luxury Suites', 'Guided Safaris', 'Spa', 'WiFi', 'Fine Dining'],
    nearbyExperiences: ['Premium safaris', 'Photography tours', 'Nature conservation programs'],
    localTips: ['Book premium safari packages', 'Best photography opportunities at dawn'],
    hostName: 'Corbett Adventures',
    contactNumber: '+91-9876543223',
    whatsappNumber: '+91-9876543223',
    rating: 4.8,
    reviewCount: 28,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-14T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z'
  },
  {
    id: '15',
    name: 'Jungle Edge Cottage',
    location: 'Jim Corbett',
    state: 'Uttarakhand',
    price: 5600,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    videos: [
      'https://drive.google.com/file/d/1JFHgJHWGOn3FSG0s4YjRVvCF8ZFZ7yYq/preview',
      'https://drive.google.com/file/d/12ziy5udhe9hBOUn_H4mTbEBYAg06xJQ0/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Cozy cottage at the edge of Corbett forest, perfect for budget travelers seeking wildlife experience.',
    shortDescription: 'Cozy cottage at forest edge for budget wildlife experience',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: 'cottage',
    views: ['forest'],
    themes: ['adventure', 'eco-friendly'],
    amenities: ['Forest View', 'Budget Safaris', 'Nature Walks', 'WiFi', 'Campfire'],
    nearbyExperiences: ['Budget safaris', 'Bird watching', 'Village visits'],
    localTips: ['Book early for safari slots', 'Evening campfires are special'],
    hostName: 'Forest Cottages',
    contactNumber: '+91-9876543224',
    whatsappNumber: '+91-9876543224',
    rating: 4.4,
    reviewCount: 21,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },

  // Cherrapunji, Meghalaya - 2 properties
  {
    id: '16',
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
      'https://drive.google.com/file/d/16--wutfajVswutK7f4Y8qhb6-3m6iv0l/preview',
      'https://drive.google.com/file/d/1Ilfb2Hoqsu6y0IWpHJCt9cFXDIHKZKqB/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Unique treehouse experience in the wettest place on earth - Cherrapunji, Meghalaya. Surrounded by lush rainforests.',
    shortDescription: 'Unique treehouse in rainforest of Cherrapunji, Meghalaya',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'treehouse',
    views: ['forest'],
    themes: ['adventure', 'eco-friendly', 'off-grid'],
    amenities: ['Treehouse Experience', 'Waterfall Views', 'Rain Forest', 'Bird Watching', 'Nature Walks'],
    nearbyExperiences: ['Living root bridges', 'Nohkalikai Falls', 'Cave exploration'],
    localTips: ['Visit during monsoon for best experience', 'Carry rain gear'],
    hostName: 'Mary Khongwir',
    contactNumber: '+91-9876543225',
    whatsappNumber: '+91-9876543225',
    rating: 4.8,
    reviewCount: 19,
    reviews: [],
    featured: true,
    verified: true,
    createdAt: '2024-01-16T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z'
  },
  {
    id: '17',
    name: 'Cloud Valley Resort',
    location: 'Cherrapunji',
    state: 'Meghalaya',
    price: 6500,
    priceUnit: 'night',
    images: [
      'https://images.unsplash.com/photo-1440581572325-0bea30075d9d',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1578662015808-cd82bfbf37b3',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
    ],
    videos: [
      'https://drive.google.com/file/d/1WjsTggou1uwYasyvSZLo5v9FCPdZE6FL/preview',
      'https://drive.google.com/file/d/1619mhh2EhFREu2bEMiWHScK9dQacoUux/preview'
    ],
    seasonalImages: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126'
    ],
    description: 'Luxury resort in Cherrapunji with panoramic views of clouds and valleys, perfect for monsoon experiences.',
    shortDescription: 'Luxury resort with panoramic cloud and valley views',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'resort',
    views: ['forest'],
    themes: ['adventure', 'romantic'],
    amenities: ['Cloud Views', 'Monsoon Experience', 'Spa', 'WiFi', 'Restaurant'],
    nearbyExperiences: ['Waterfall visits', 'Cave expeditions', 'Root bridge treks'],
    localTips: ['Best during monsoon season', 'Spectacular cloud formations'],
    hostName: 'Meghalaya Resorts',
    contactNumber: '+91-9876543226',
    whatsappNumber: '+91-9876543226',
    rating: 4.6,
    reviewCount: 16,
    reviews: [],
    featured: false,
    verified: true,
    createdAt: '2024-01-17T00:00:00Z',
    updatedAt: '2024-01-17T00:00:00Z'
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
