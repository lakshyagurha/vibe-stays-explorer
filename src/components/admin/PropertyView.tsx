
import React from 'react';
import { X, Edit, Star, MapPin, Users, Bed, Bath, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/types/property';

interface PropertyViewProps {
  property: Property;
  onClose: () => void;
  onEdit: () => void;
}

const PropertyView: React.FC<PropertyViewProps> = ({ property, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">{property.name}</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={onEdit} size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Gallery */}
          <div className="mb-6">
            <img 
              src={property.images[0]} 
              alt={property.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Basic Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  {property.location}, {property.state}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  {property.maxGuests} guests
                </div>
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-2 text-gray-500" />
                  {property.bedrooms} bedrooms
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-2 text-gray-500" />
                  {property.bathrooms} bathrooms
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Pricing & Contact</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Price:</strong> ₹{property.price.toLocaleString()} / {property.priceUnit}</p>
                <p><strong>Host:</strong> {property.hostName}</p>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  {property.contactNumber}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2 text-gray-500" />
                  {property.whatsappNumber}
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{property.propertyType}</Badge>
              {property.views?.map(view => (
                <Badge key={view} variant="outline">{view}</Badge>
              ))}
              {property.themes?.map(theme => (
                <Badge key={theme} variant="outline">{theme}</Badge>
              ))}
              {property.featured && <Badge className="bg-yellow-500">Featured</Badge>}
              {property.verified && <Badge className="bg-green-500">Verified</Badge>}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700">{property.description}</p>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="text-sm text-gray-700">• {amenity}</div>
                ))}
              </div>
            </div>
          )}

          {/* Rating */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span>{property.rating || 0} rating</span>
            </div>
            <span>•</span>
            <span>{property.reviewCount || 0} reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyView;
