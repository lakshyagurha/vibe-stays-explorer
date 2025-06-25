
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Users, MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, compact = false }) => {
  const formatPrice = (price: number, unit: string) => {
    return `₹${price.toLocaleString()} / ${unit}`;
  };

  const getPropertyTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      villa: 'Villa',
      tent: 'Tent',
      homestay: 'Homestay',
      cabin: 'Cabin',
      treehouse: 'Treehouse',
      houseboat: 'Houseboat'
    };
    return labels[type] || type;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Elements */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {property.featured && (
            <Badge className="bg-accent-500 text-white text-xs px-2 py-1">
              Featured
            </Badge>
          )}
          {property.verified && (
            <Badge className="bg-primary-600 text-white text-xs px-2 py-1">
              Verified
            </Badge>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 h-auto"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Property Type Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-700">
            {getPropertyTypeLabel(property.propertyType)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}, {property.state}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {property.name}
        </h3>

        {/* Description */}
        {!compact && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {property.shortDescription}
          </p>
        )}

        {/* Features */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Users className="h-4 w-4 mr-1" />
          <span>{property.maxGuests} guests</span>
          <span className="mx-2">•</span>
          <span>{property.bedrooms} bed</span>
          <span className="mx-2">•</span>
          <span>{property.bathrooms} bath</span>
        </div>

        {/* Views/Themes Tags */}
        {!compact && (
          <div className="flex flex-wrap gap-1 mb-3">
            {property.views.slice(0, 2).map((view) => (
              <Badge key={view} variant="outline" className="text-xs">
                {view}
              </Badge>
            ))}
            {property.themes.slice(0, 2).map((theme) => (
              <Badge key={theme} variant="outline" className="text-xs">
                {theme}
              </Badge>
            ))}
          </div>
        )}

        {/* Rating and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900 ml-1">
              {property.rating}
            </span>
            <span className="text-sm text-gray-600 ml-1">
              ({property.reviewCount})
            </span>
          </div>
          
          <div className="text-right">
            <div className="font-semibold text-gray-900">
              {formatPrice(property.price, property.priceUnit)}
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <Button 
            className="w-full bg-primary-600 hover:bg-primary-700" 
            asChild
          >
            <Link to={`/property/${property.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
