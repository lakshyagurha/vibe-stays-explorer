
import React, { useState } from 'react';
import { Filter, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { FilterOptions } from '@/types/property';

interface PropertyFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ 
  onFiltersChange, 
  initialFilters = {} 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [searchQuery, setSearchQuery] = useState(initialFilters.location || '');
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange || [1000, 15000]);

  const propertyTypes = [
    { value: 'villa', label: 'Villa' },
    { value: 'resort', label: 'Resort' },
    { value: 'cottage', label: 'Cottage' },
    { value: 'cabin', label: 'Cabin' },
    { value: 'treehouse', label: 'Treehouse' },
    { value: 'tent', label: 'Tent' },
    { value: 'homestay', label: 'Homestay' },
    { value: 'houseboat', label: 'Houseboat' }
  ];

  const views = [
    { value: 'mountain', label: 'Mountain View' },
    { value: 'ocean', label: 'Sea View' },
    { value: 'lake', label: 'Lake View' },
    { value: 'river', label: 'River View' },
    { value: 'forest', label: 'Forest View' }
  ];

  const themes = [
    { value: 'adventure', label: 'Adventure' },
    { value: 'romantic', label: 'Romantic' },
    { value: 'honeymoon', label: 'Honeymoon' },
    { value: 'family-getaway', label: 'Family Getaway' },
    { value: 'eco-friendly', label: 'Eco Friendly' },
    { value: 'off-grid', label: 'Off-grid' },
    { value: 'workation', label: 'Workation' },
    { value: 'ayurveda-retreat', label: 'Ayurveda Retreat' },
    { value: 'corporate-training', label: 'Corporate Training' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' }
  ];

  const handleArrayFilter = (
    currentArray: string[] = [],
    value: string,
    key: 'propertyType' | 'views' | 'themes'
  ) => {
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    const newFilters = { ...filters, [key]: newArray.length > 0 ? newArray : undefined };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const newFilters = { ...filters, location: value || undefined };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = { ...filters, sortBy: sortBy as FilterOptions['sortBy'] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
    const newFilters = { ...filters, priceRange: newRange };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters: FilterOptions = {};
    setFilters(newFilters);
    setSearchQuery('');
    setPriceRange([1000, 15000]);
    onFiltersChange(newFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.location) count++;
    if (filters.propertyType?.length) count++;
    if (filters.views?.length) count++;
    if (filters.themes?.length) count++;
    if (filters.priceRange) count++;
    if (filters.maxGuests) count++;
    return count;
  };

  return (
    <div className="bg-white border-b sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search and Filter Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by destination, state, or property name..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center space-x-2 h-12 px-6"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {getActiveFilterCount() > 0 && (
              <Badge className="bg-primary-600 text-white ml-2">
                {getActiveFilterCount()}
              </Badge>
            )}
          </Button>

          {getActiveFilterCount() > 0 && (
            <Button variant="ghost" onClick={clearFilters} size="sm" className="h-12">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-2">
          <span className="text-sm text-gray-600 whitespace-nowrap font-medium">Sort by:</span>
          <div className="flex space-x-2">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={filters.sortBy === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleSortChange(option.value)}
                className="whitespace-nowrap"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Expanded Filters */}
        {isOpen && (
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-8">
            {/* Price Range */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()} per night
              </h3>
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={15000}
                min={1000}
                step={500}
                className="w-full max-w-md"
              />
            </div>

            {/* Property Types */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Property Type</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {propertyTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={filters.propertyType?.includes(type.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleArrayFilter(filters.propertyType, type.value, 'propertyType')}
                    className="justify-start"
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Views */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Views</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {views.map((view) => (
                  <Button
                    key={view.value}
                    variant={filters.views?.includes(view.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleArrayFilter(filters.views, view.value, 'views')}
                    className="justify-start"
                  >
                    {view.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Themes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Themes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <Button
                    key={theme.value}
                    variant={filters.themes?.includes(theme.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleArrayFilter(filters.themes, theme.value, 'themes')}
                    className="justify-start"
                  >
                    {theme.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Guests */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Max Guests</h3>
              <div className="flex flex-wrap gap-3">
                {[2, 4, 6, 8, 10, 12].map((guests) => (
                  <Button
                    key={guests}
                    variant={filters.maxGuests === guests ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const newFilters = { 
                        ...filters, 
                        maxGuests: filters.maxGuests === guests ? undefined : guests 
                      };
                      setFilters(newFilters);
                      onFiltersChange(newFilters);
                    }}
                  >
                    {guests}+ guests
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyFilters;
