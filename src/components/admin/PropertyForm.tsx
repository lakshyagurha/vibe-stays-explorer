
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Property } from '@/types/property';
import { X, Plus } from 'lucide-react';

interface PropertyFormProps {
  property?: Property | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ 
  property, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    state: '',
    price: '',
    priceUnit: 'night',
    images: [''],
    videos: [''],
    description: '',
    shortDescription: '',
    maxGuests: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: 'villa',
    views: [] as string[],
    themes: [] as string[],
    amenities: [''],
    nearbyExperiences: [''],
    localTips: [''],
    hostName: '',
    contactNumber: '',
    whatsappNumber: '',
    featured: false,
    verified: false
  });

  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name || '',
        location: property.location || '',
        state: property.state || '',
        price: property.price?.toString() || '',
        priceUnit: property.priceUnit || 'night',
        images: property.images?.length ? property.images : [''],
        videos: property.videos?.length ? property.videos : [''],
        description: property.description || '',
        shortDescription: property.shortDescription || '',
        maxGuests: property.maxGuests?.toString() || '',
        bedrooms: property.bedrooms?.toString() || '',
        bathrooms: property.bathrooms?.toString() || '',
        propertyType: property.propertyType || 'villa',
        views: property.views || [],
        themes: property.themes || [],
        amenities: property.amenities?.length ? property.amenities : [''],
        nearbyExperiences: property.nearbyExperiences?.length ? property.nearbyExperiences : [''],
        localTips: property.localTips?.length ? property.localTips : [''],
        hostName: property.hostName || '',
        contactNumber: property.contactNumber || '',
        whatsappNumber: property.whatsappNumber || '',
        featured: property.featured || false,
        verified: property.verified || false
      });
    }
  }, [property]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      maxGuests: parseInt(formData.maxGuests),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      images: formData.images.filter(img => img.trim()),
      videos: formData.videos.filter(vid => vid.trim()),
      amenities: formData.amenities.filter(amenity => amenity.trim()),
      nearbyExperiences: formData.nearbyExperiences.filter(exp => exp.trim()),
      localTips: formData.localTips.filter(tip => tip.trim()),
    };

    onSubmit(submitData);
  };

  const addArrayField = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev] as string[], '']
    }));
  };

  const removeArrayField = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }));
  };

  const updateArrayField = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => 
        i === index ? value : item
      )
    }));
  };

  const toggleCheckbox = (field: 'views' | 'themes', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const viewOptions = ['mountain', 'river', 'jungle', 'ocean', 'village'];
  const themeOptions = ['romantic', 'family', 'workation', 'off-grid', 'adventure'];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{property ? 'Edit Property' : 'Add New Property'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Property Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="propertyType">Property Type *</Label>
              <Select value={formData.propertyType} onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="tent">Tent</SelectItem>
                  <SelectItem value="homestay">Homestay</SelectItem>
                  <SelectItem value="cabin">Cabin</SelectItem>
                  <SelectItem value="treehouse">Treehouse</SelectItem>
                  <SelectItem value="houseboat">Houseboat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing and Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="priceUnit">Price Unit</Label>
              <Select value={formData.priceUnit} onValueChange={(value) => setFormData(prev => ({ ...prev, priceUnit: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="night">Per Night</SelectItem>
                  <SelectItem value="person">Per Person</SelectItem>
                  <SelectItem value="group">Per Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="maxGuests">Max Guests *</Label>
              <Input
                id="maxGuests"
                type="number"
                value={formData.maxGuests}
                onChange={(e) => setFormData(prev => ({ ...prev, maxGuests: e.target.value }))}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <Label htmlFor="shortDescription">Short Description *</Label>
            <Input
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="Brief, catchy description"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Full Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
            />
          </div>

          {/* Images */}
          <div>
            <Label>Images (URLs) *</Label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={image}
                  onChange={(e) => updateArrayField('images', index, e.target.value)}
                  placeholder="Image URL"
                />
                {formData.images.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeArrayField('images', index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addArrayField('images')}>
              <Plus className="h-4 w-4 mr-1" /> Add Image
            </Button>
          </div>

          {/* Views and Themes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Views</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {viewOptions.map(view => (
                  <div key={view} className="flex items-center space-x-2">
                    <Checkbox
                      id={`view-${view}`}
                      checked={formData.views.includes(view)}
                      onCheckedChange={() => toggleCheckbox('views', view)}
                    />
                    <Label htmlFor={`view-${view}`} className="capitalize">{view}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Themes</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {themeOptions.map(theme => (
                  <div key={theme} className="flex items-center space-x-2">
                    <Checkbox
                      id={`theme-${theme}`}
                      checked={formData.themes.includes(theme)}
                      onCheckedChange={() => toggleCheckbox('themes', theme)}
                    />
                    <Label htmlFor={`theme-${theme}`} className="capitalize">{theme}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="hostName">Host Name *</Label>
              <Input
                id="hostName"
                value={formData.hostName}
                onChange={(e) => setFormData(prev => ({ ...prev, hostName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
              <Input
                id="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Amenities, Experiences, Tips */}
          {['amenities', 'nearbyExperiences', 'localTips'].map(field => (
            <div key={field}>
              <Label className="capitalize">{field.replace(/([A-Z])/g, ' $1').toLowerCase()}</Label>
              {(formData[field as keyof typeof formData] as string[]).map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={item}
                    onChange={(e) => updateArrayField(field, index, e.target.value)}
                    placeholder={`Add ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                  />
                  {(formData[field as keyof typeof formData] as string[]).length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeArrayField(field, index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addArrayField(field)}>
                <Plus className="h-4 w-4 mr-1" /> Add {field.replace(/([A-Z])/g, ' $1')}
              </Button>
            </div>
          ))}

          {/* Status */}
          <div className="flex gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: !!checked }))}
              />
              <Label htmlFor="featured">Featured Property</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified"
                checked={formData.verified}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, verified: !!checked }))}
              />
              <Label htmlFor="verified">Verified Property</Label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Saving...' : (property ? 'Update Property' : 'Create Property')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
