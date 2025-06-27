
export interface Property {
  id: string;
  name: string;
  location: string;
  state: string;
  price: number;
  priceUnit: 'night' | 'person' | 'group';
  images: string[];
  videos?: string[];
  seasonalImages?: string[];
  description: string;
  shortDescription: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: 'villa' | 'tent' | 'homestay' | 'cabin' | 'treehouse' | 'houseboat' | 'cottage' | 'resort';
  views: ('mountain' | 'river' | 'jungle' | 'ocean' | 'village' | 'forest' | 'lake' | 'valley' | 'himalayas' | 'waterfall' | 'fieldview')[];
  themes: ('romantic' | 'family' | 'workation' | 'off-grid' | 'adventure' | 'eco-friendly' | 'ayurveda-retreat' | 'honeymoon' | 'family-getaway' | 'corporate-training' | 'school-education-stays')[];
  amenities: string[];
  nearbyExperiences: string[];
  localTips: string[];
  hostName: string;
  contactNumber: string;
  whatsappNumber: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  featured: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  guestName: string;
  rating: number;
  comment: string;
  verified: boolean;
  createdAt: string;
  approved: boolean;
}

export interface FilterOptions {
  location?: string;
  priceRange?: [number, number];
  maxGuests?: number;
  propertyType?: string[];
  views?: string[];
  themes?: string[];
  sortBy?: 'rating' | 'price_low' | 'price_high' | 'popular' | 'newest';
}
