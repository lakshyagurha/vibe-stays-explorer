import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { useProperties } from '@/hooks/useProperties';
import { FilterOptions } from '@/types/property';

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterOptions>({});
  const { data: properties = [], isLoading, error } = useProperties();

  // Initialize filters from URL parameters
  useEffect(() => {
    const initialFilters: FilterOptions = {};
    
    const search = searchParams.get('search');
    const theme = searchParams.get('theme');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests');
    
    console.log('URL Search Params:', { search, theme, checkIn, checkOut, guests });
    
    if (search) {
      initialFilters.location = search;
    }
    
    if (theme) {
      initialFilters.themes = [theme];
    }

    if (guests) {
      const guestNumber = parseInt(guests.split(' ')[0]);
      if (!isNaN(guestNumber)) {
        initialFilters.maxGuests = guestNumber;
      }
    }
    
    console.log('Initial Filters:', initialFilters);
    setFilters(initialFilters);
  }, [searchParams]);

  // Get search parameters for display
  const search = searchParams.get('search');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');

  // Format dates for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString; // Return as is if parsing fails
    }
  };

  const filteredProperties = useMemo(() => {
    let filtered = [...properties];
    
    console.log('Total properties:', filtered.length);
    console.log('Current filters:', filters);

    // Location/Search filter (searches in location, state, and property name)
    if (filters.location) {
      const query = filters.location.toLowerCase().trim();
      const searchTerms = query.split(',').map(term => term.trim());
      
      console.log('Search query:', query);
      console.log('Search terms:', searchTerms);
      
      filtered = filtered.filter(property => {
        const propertyText = [
          property.location.toLowerCase(),
          property.state.toLowerCase(),
          property.name.toLowerCase()
        ].join(' ');
        
        // Check if any search term matches any part of the property
        const matches = searchTerms.some(term => 
          propertyText.includes(term) ||
          property.location.toLowerCase().includes(term) ||
          property.state.toLowerCase().includes(term) ||
          property.name.toLowerCase().includes(term)
        );
        
        if (matches) {
          console.log('Property matches:', property.name, property.location, property.state);
        }
        
        return matches;
      });
      
      console.log('Properties after location filter:', filtered.length);
    }

    // Property type filter
    if (filters.propertyType?.length) {
      filtered = filtered.filter(property =>
        filters.propertyType!.includes(property.propertyType)
      );
    }

    // Views filter
    if (filters.views?.length) {
      filtered = filtered.filter(property =>
        filters.views!.some(view => property.views.includes(view as any))
      );
    }

    // Themes filter
    if (filters.themes?.length) {
      filtered = filtered.filter(property =>
        filters.themes!.some(theme => property.themes.includes(theme as any))
      );
    }

    // Max guests filter
    if (filters.maxGuests) {
      filtered = filtered.filter(property =>
        property.maxGuests >= filters.maxGuests!
      );
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(property =>
        property.price >= filters.priceRange![0] &&
        property.price <= filters.priceRange![1]
      );
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'rating':
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'price_low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'popular':
          filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }

    return filtered;
  }, [properties, filters]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading properties</p>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Unique Stays
          </h1>
          
          {/* Search Summary */}
          {(search || checkIn || checkOut || guests) && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                {search && (
                  <div className="flex items-center">
                    <span className="font-medium">📍 {search}</span>
                  </div>
                )}
                {checkIn && checkOut && (
                  <div className="flex items-center">
                    <span className="font-medium">📅 {formatDate(checkIn)} - {formatDate(checkOut)}</span>
                  </div>
                )}
                {guests && (
                  <div className="flex items-center">
                    <span className="font-medium">👥 {guests}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <p className="text-gray-600 text-lg">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found across India
          </p>
        </div>
      </div>

      {/* Filters */}
      <PropertyFilters 
        onFiltersChange={setFilters}
        initialFilters={filters}
      />

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProperties.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">
              {filters.location 
                ? `No properties found for "${filters.location}". Try adjusting your search or filters.`
                : 'Try adjusting your filters to see more results.'
              }
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties.map((property) => (
              <motion.div key={property.id} variants={itemVariants}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Properties;
