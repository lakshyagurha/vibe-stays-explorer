
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Property } from '@/types/property';
import { X, Star, MapPin, Users, Bed, Bath, Phone, MessageCircle } from 'lucide-react';

interface PropertyViewProps {
  property: Property;
  onClose: () => void;
  onEdit: () => void;
}

const PropertyView: React.FC<PropertyViewProps> = ({ property, onClose, onEdit }) => {
  const openWhatsApp = () => {
    const message = `Hi! I'm interested in ${property.name} in ${property.location}. Can you provide more details?`;
    const url = `https://wa.me/${property.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const callHost = () => {
    window.location.href = `tel:${property.contactNumber}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{property.name}</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.name} - Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Property Details</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {property.location}, {property.state}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  Up to {property.maxGuests} guests
                </div>
                <div className="flex items-center text-gray-600">
                  <Bed className="h-4 w-4 mr-2" />
                  {property.bedrooms} bedrooms
                </div>
                <div className="flex items-center text-gray-600">
                  <Bath className="h-4 w-4 mr-2" />
                  {property.bathrooms} bathrooms
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Pricing & Rating</h3>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary-600">
                  ₹{property.price.toLocaleString()}
                  <span className="text-sm font-normal text-gray-600 ml-1">per {property.priceUnit}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{property.rating || 0}</span>
                  <span className="text-gray-600 ml-1">({property.reviewCount || 0} reviews)</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant={property.featured ? "default" : "secondary"}>
                    {property.featured ? "Featured" : "Standard"}
                  </Badge>
                  <Badge variant={property.verified ? "default" : "destructive"}>
                    {property.verified ? "Verified" : "Pending"}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {property.propertyType}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700 mb-2 font-medium">{property.shortDescription}</p>
            <p className="text-gray-600">{property.description}</p>
          </div>

          {/* Views and Themes */}
          {(property.views?.length || property.themes?.length) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {property.views?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Views</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.views.map((view, index) => (
                      <Badge key={index} variant="outline" className="capitalize">
                        {view}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {property.themes?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Themes</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.themes.map((theme, index) => (
                      <Badge key={index} variant="outline" className="capitalize">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Amenities */}
          {property.amenities?.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="text-gray-600">• {amenity}</div>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Experiences */}
          {property.nearbyExperiences?.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Nearby Experiences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {property.nearbyExperiences.map((experience, index) => (
                  <div key={index} className="text-gray-600">• {experience}</div>
                ))}
              </div>
            </div>
          )}

          {/* Local Tips */}
          {property.localTips?.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Local Tips</h3>
              <div className="space-y-1">
                {property.localTips.map((tip, index) => (
                  <div key={index} className="text-gray-600">• {tip}</div>
                ))}
              </div>
            </div>
          )}

          {/* Host Information */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Host Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium mb-2">{property.hostName}</div>
              <div className="flex gap-4">
                <Button onClick={callHost} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call {property.contactNumber}
                </Button>
                <Button onClick={openWhatsApp} variant="outline" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyView;
