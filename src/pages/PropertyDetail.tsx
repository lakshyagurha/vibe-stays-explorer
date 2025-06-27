import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Star, Users, Bed, Bath, MapPin, Phone, MessageCircle, 
  Wifi, Car, Utensils, Mountain, Heart, Shield, Camera, ChevronLeft, 
  ChevronRight, X, Play, Calendar, Coffee, MapIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useProperty } from '@/hooks/useProperties';

const PropertyDetail = () => {
  const { id } = useParams();
  const { data: property, isLoading, error } = useProperty(id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageType, setCurrentImageType] = useState<'regular' | 'seasonal' | '360' | 'video'>('regular');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Function to convert Google Drive URL to embeddable format
  const convertGoogleDriveUrl = (url: string) => {
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    return url;
  };

  // Mock data for enhanced features
  const mockSeasonalImages = [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843'
  ];

  const mock360Image = 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb';

  const mockCategorizedExperiences = {
    'Local Festivals': [
      'Diwali celebration at village temple',
      'Holi festival with local families',
      'Harvest festival in autumn'
    ],
    'Local Cafes': [
      'Mountain View Cafe - 2 km away',
      'Riverside Tea House - 1.5 km away',
      'Local Organic Farm Cafe - 3 km away'
    ],
    'Historical Places': [
      'Ancient monastery ruins - 5 km away',
      '200-year-old village temple - 1 km away',
      'Colonial era bridge - 4 km away'
    ]
  };

  const mockDetailedReviews = [
    {
      id: '1',
      guestName: 'Priya Sharma',
      rating: 5,
      comment: 'Absolutely stunning property with incredible mountain views. The host was extremely helpful and the amenities were top-notch.',
      verified: true,
      createdAt: '2024-01-15',
      approved: true,
      detailedRatings: {
        view: 5,
        hygiene: 4,
        foodService: 5,
        host: 5
      }
    },
    {
      id: '2',
      guestName: 'Rajesh Kumar',
      rating: 4,
      comment: 'Great place for a family vacation. Kids loved the nearby waterfall and the property was very clean.',
      verified: true,
      createdAt: '2024-01-10',
      approved: true,
      detailedRatings: {
        view: 4,
        hygiene: 5,
        foodService: 4,
        host: 4
      }
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h1>
          <Button asChild>
            <Link to="/properties">Back to Properties</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, unit: string) => {
    return `₹${price.toLocaleString()} / ${unit}`;
  };

  const getWhatsAppMessage = () => {
    return `Hi! I'm interested in ${property.name} in ${property.location}. Can you please provide more details?`;
  };

  const getWhatsAppUrl = () => {
    const message = encodeURIComponent(getWhatsAppMessage());
    return `https://wa.me/${property.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;
  };

  const getCurrentImages = () => {
    switch (currentImageType) {
      case 'seasonal':
        return mockSeasonalImages;
      case '360':
        return [mock360Image];
      case 'video':
        return property.videos || [];
      default:
        return property.images;
    }
  };

  const nextImage = () => {
    const images = getCurrentImages();
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    const images = getCurrentImages();
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const amenityIcons: Record<string, React.ReactNode> = {
    'WiFi': <Wifi className="h-4 w-4" />,
    'Parking': <Car className="h-4 w-4" />,
    'Kitchen': <Utensils className="h-4 w-4" />,
    'Mountain View': <Mountain className="h-4 w-4" />,
    'Default': <Shield className="h-4 w-4" />
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="sticky top-16 bg-white border-b z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" asChild>
            <Link to="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
          </Button>
        </div>
      </div>

      {/* Enhanced Image Gallery */}
      <div className="relative">
        {/* Image Type Selector */}
        <div className="absolute top-4 left-4 z-30 flex space-x-2">
          {['regular', 'seasonal', '360', 'video'].map((type) => (
            <Button
              key={type}
              size="sm"
              variant={currentImageType === type ? "default" : "secondary"}
              onClick={() => {
                setCurrentImageType(type as any);
                setCurrentImageIndex(0);
              }}
              className="bg-white/90 hover:bg-white text-gray-900"
            >
              {type === 'regular' && 'Photos'}
              {type === 'seasonal' && 'Seasonal'}
              {type === '360' && '360°'}
              {type === 'video' && <Play className="h-4 w-4" />}
            </Button>
          ))}
        </div>

        <div className="aspect-[16/9] lg:aspect-[21/9] relative overflow-hidden">
          {currentImageType === 'video' && property.videos && property.videos.length > 0 ? (
            <iframe
              src={convertGoogleDriveUrl(property.videos[currentImageIndex])}
              title="Property Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={getCurrentImages()[currentImageIndex]}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Gallery Controls */}
          {getCurrentImages().length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="bg-black/50 text-white hover:bg-black/70 rounded-full p-2"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="bg-black/50 text-white hover:bg-black/70 rounded-full p-2"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {getCurrentImages().length}
          </div>

          {/* View All Photos Button */}
          <Button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 bg-white text-gray-900 hover:bg-gray-100"
          >
            <Camera className="h-4 w-4 mr-2" />
            View All
          </Button>

          {/* Property Badges */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {property.featured && (
              <Badge className="bg-accent-500 text-white">Featured</Badge>
            )}
            {property.verified && (
              <Badge className="bg-primary-600 text-white">Verified</Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-16 right-4 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}, {property.state}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {property.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{property.rating || 0}</span>
                  <span className="ml-1 text-gray-600">({property.reviewCount || 0} reviews)</span>
                </div>
                
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {property.maxGuests} guests
                  </div>
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {property.bedrooms} bed
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {property.bathrooms} bath
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                  {property.propertyType}
                </Badge>
                {property.views?.map(view => (
                  <Badge key={view} variant="outline">{view}</Badge>
                ))}
                {property.themes?.map(theme => (
                  <Badge key={theme} variant="outline">{theme}</Badge>
                ))}
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            <Separator className="mb-6" />

            {/* Videos Section */}
            {property.videos && property.videos.length > 0 && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Videos</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {property.videos.map((video, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <iframe
                          src={convertGoogleDriveUrl(video)}
                          title={`Property Video ${index + 1}`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <Separator className="mb-6" />
              </>
            )}

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        {amenityIcons[amenity] || amenityIcons.Default}
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator className="mb-6" />
              </>
            )}

            {/* Categorized Nearby Experiences */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Nearby Experiences</h2>
              <div className="space-y-6">
                {Object.entries(mockCategorizedExperiences).map(([category, experiences]) => (
                  <div key={category}>
                    <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                      {category === 'Local Festivals' && <Calendar className="h-5 w-5 mr-2 text-primary-600" />}
                      {category === 'Local Cafes' && <Coffee className="h-5 w-5 mr-2 text-primary-600" />}
                      {category === 'Historical Places' && <MapIcon className="h-5 w-5 mr-2 text-primary-600" />}
                      {category}
                    </h3>
                    <ul className="space-y-2 ml-7">
                      {experiences.map((experience, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{experience}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Local Tips */}
            {property.localTips && property.localTips.length > 0 && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Local Tips</h2>
                  <ul className="space-y-2">
                    {property.localTips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator className="mb-6" />
              </>
            )}

            {/* Enhanced Reviews */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
              <div className="space-y-6">
                {mockDetailedReviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{review.guestName}</span>
                        {review.verified && (
                          <Badge variant="outline" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                        <span className="ml-1 text-sm font-medium">{review.rating}</span>
                      </div>
                    </div>

                    {/* Detailed Ratings */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">View</div>
                        {renderStars(review.detailedRatings.view, 'sm')}
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Hygiene</div>
                        {renderStars(review.detailedRatings.hygiene, 'sm')}
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Food Service</div>
                        {renderStars(review.detailedRatings.foodService, 'sm')}
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Host</div>
                        {renderStars(review.detailedRatings.host, 'sm')}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <div className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {formatPrice(property.price, property.priceUnit)}
                  </div>
                  <p className="text-sm text-gray-600">Contact for booking</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Hosted by</p>
                    <p className="font-medium text-gray-900">{property.hostName}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-primary-600 hover:bg-primary-700"
                    asChild
                  >
                    <a href={`tel:${property.contactNumber}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-green-500 text-green-600 hover:bg-green-50"
                    asChild
                  >
                    <a 
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>Verified property & host</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <Button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute top-4 right-4 bg-white/20 text-white hover:bg-white/30 rounded-full p-2 z-10"
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {currentImageType === 'video' && property.videos && property.videos.length > 0 ? (
              <div className="w-full max-w-4xl aspect-video">
                <iframe
                  src={convertGoogleDriveUrl(property.videos[currentImageIndex])}
                  title="Property Video"
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={getCurrentImages()[currentImageIndex]}
                alt={property.name}
                className="max-w-full max-h-full object-contain"
              />
            )}
            
            {getCurrentImages().length > 1 && (
              <>
                <Button
                  onClick={prevImage}
                  className="absolute left-4 bg-white/20 text-white hover:bg-white/30 rounded-full p-2"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button
                  onClick={nextImage}
                  className="absolute right-4 bg-white/20 text-white hover:bg-white/30 rounded-full p-2"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {getCurrentImages().length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
