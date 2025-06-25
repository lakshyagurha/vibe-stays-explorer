
import React, { useState } from 'react';
import { Filter, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

  const propertyTypes = [
    { value: 'villa', label: 'Villa' },
    { value: 'tent', label: 'Tent' },
    { value: 'homestay', label: 'Homestay' },
    { value: 'cabin', label: 'Cabin' },
    { value: 'treehouse', label: 'Treehouse' },
    { value: 'houseboat', label: 'Houseboat' }
  ];

  const views = [
    { value: 'mountain', label: 'Mountain' },
    { value: 'river', label: 'River' },
    { value: 'jungle', label: 'Jungle' },
    { value: 'ocean', label: 'Ocean' },
    { value: 'village', label: 'Village' }
  ];

  const themes = [
    { value: 'romantic', label: 'Romantic' },
    { value: 'family', label: 'Family' },
    { value: 'workation', label: 'Workation' },
    { value: 'off-grid', label: 'Off-grid' },
    { value: 'adventure', label: 'Adventure' }
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

  const clearFilters = () => {
    const newFilters: FilterOptions = {};
    setFilters(newFilters);
    setSearchQuery('');
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
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by location..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2"
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
            <Button variant="ghost" onClick={clearFilters} size="sm">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
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

        {/* Expanded Filters */}
        {isOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-6">
            {/* Property Types */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Property Type</h3>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={filters.propertyType?.includes(type.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleArrayFilter(filters.propertyType, type.value, 'propertyType')}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Views */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Views</h3>
              <div className="flex flex-wrap gap-2">
                {views.map((view) => (
                  <Button
                    key={view.value}
                    variant={filters.views?.includes(view.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleArrayFilter(filters.views, view.value, 'views')}
                  >
                    {view.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Themes */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Themes</h3>
              <div className="flex flex-wrap gap-2">
                {themes.map((theme) => (
                  <Button
                    key={theme.value}
                    variant={filters.themes?.includes(theme.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleArrayFilter(filters.themes, theme.value, 'themes')}
                  >
                    {theme.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Guests */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Max Guests</h3>
              <div className="flex space-x-2">
                {[2, 4, 6, 8, 10].map((guests) => (
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
