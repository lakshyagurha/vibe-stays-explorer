import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Users, Mountain, Waves, Trees, Heart, ChevronLeft, ChevronRight, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { format } from 'date-fns';

const Landing = () => {
  const navigate = useNavigate();
  const { data: allProperties = [], isLoading } = useProperties();
  const featuredProperties = allProperties.filter(property => property.featured).slice(0, 3);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guestCount, setGuestCount] = useState('2 guests');
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Hero slider images
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      title: 'Mountain Retreats'
    },
    {
      url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000',
      title: 'Ocean Views'
    },
    {
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      title: 'Forest Escapes'
    },
    {
      url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd',
      title: 'Waterfall Views'
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Popular destinations for suggestions
  const popularDestinations = [
    { name: 'Jibhi, Himachal Pradesh', type: 'Mountain Retreat' },
    { name: 'Rishikesh, Uttarakhand', type: 'Adventure Hub' },
    { name: 'Munnar, Kerala', type: 'Tea Gardens' },
    { name: 'Alleppey, Kerala', type: 'Backwaters' },
    { name: 'Jaisalmer, Rajasthan', type: 'Desert Camp' },
    { name: 'Agatti, Lakshadweep', type: 'Island Paradise' },
    { name: 'Manali, Himachal Pradesh', type: 'Himalayan Valley' },
    { name: 'Coorg, Karnataka', type: 'Coffee Estates' }
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Handle click outside destination suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.destination-input-container')) {
        setShowDestinationSuggestions(false);
      }
    };

    if (showDestinationSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDestinationSuggestions]);

  // Handle search
  const handleSearch = () => {
    setIsSearching(true);
    
    const searchParams = new URLSearchParams();
    
    if (searchQuery.trim()) {
      searchParams.append('search', searchQuery.trim());
    }
    
    // Always add fake dates for demonstration
    if (checkInDate) {
      searchParams.append('checkIn', format(checkInDate, 'yyyy-MM-dd'));
    } else {
      // Add a fake check-in date if none selected
      const fakeCheckIn = new Date();
      fakeCheckIn.setDate(fakeCheckIn.getDate() + 7); // 7 days from now
      searchParams.append('checkIn', format(fakeCheckIn, 'yyyy-MM-dd'));
    }
    
    if (checkOutDate) {
      searchParams.append('checkOut', format(checkOutDate, 'yyyy-MM-dd'));
    } else {
      // Add a fake check-out date if none selected
      const fakeCheckOut = new Date();
      fakeCheckOut.setDate(fakeCheckOut.getDate() + 10); // 10 days from now
      searchParams.append('checkOut', format(fakeCheckOut, 'yyyy-MM-dd'));
    }
    
    if (guestCount) {
      searchParams.append('guests', guestCount);
    }
    
    const queryString = searchParams.toString();
    console.log('Navigating to:', `/properties?${queryString}`);
    
    // Small delay to show loading state
    setTimeout(() => {
      navigate(`/properties?${queryString}`);
      setIsSearching(false);
    }, 300);
  };

  // Handle destination selection
  const handleDestinationSelect = (destination: string) => {
    setSearchQuery(destination);
    setShowDestinationSuggestions(false);
  };

  // Enhanced Search Bar component
  const SearchBar = () => (
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-6xl mx-auto border border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Destination Field */}
        <div className="lg:col-span-2 relative destination-input-container">
          <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Where are you going?" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDestinationSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowDestinationSuggestions(true)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {showDestinationSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                {popularDestinations
                  .filter(dest => 
                    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    dest.type.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((dest, index) => (
                    <button
                      key={index}
                      onClick={() => handleDestinationSelect(dest.name)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex flex-col"
                    >
                      <div className="font-medium text-gray-900">{dest.name}</div>
                      <div className="text-sm text-gray-500">{dest.type}</div>
                    </button>
                  ))}
                {popularDestinations.filter(dest => 
                  dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  dest.type.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && searchQuery.length > 0 && (
                  <div className="px-4 py-3 text-gray-500 text-sm">
                    No destinations found. Try a different search term.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Check-in Date */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal pl-3 pr-3 py-3 h-auto border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkInDate ? format(checkInDate, 'MMM dd') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal pl-3 pr-3 py-3 h-auto border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkOutDate ? format(checkOutDate, 'MMM dd') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                disabled={(date) => 
                  date < new Date() || 
                  (checkInDate ? date <= checkInDate : false)
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Search Button */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
          <Button 
            onClick={handleSearch}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                <span>{searchQuery.trim() ? 'Search' : 'Explore All'}</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Additional Options */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2 rounded border-gray-300" />
            <span>Flexible dates</span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2 rounded border-gray-300" />
            <span>Pet-friendly only</span>
          </div>
        </div>
        
        {/* Guest Count */}
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-gray-400" />
          <select 
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            className="text-sm text-gray-600 bg-transparent border-none focus:outline-none"
          >
            <option>1 guest</option>
            <option>2 guests</option>
            <option>3 guests</option>
            <option>4 guests</option>
            <option>5+ guests</option>
          </select>
        </div>
      </div>
    </div>
  );

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Slider */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          ))}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect{' '}
              <span className="text-primary-400 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Escape
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light">
              Discover handpicked unique stays across India's most breathtaking landscapes. 
              From mountain retreats to riverside cabins.
            </p>
          </motion.div>
          
          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <SearchBar />
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white/80 text-sm"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                <span className="text-2xl font-bold text-white">4.8</span>
              </div>
              <span>Average Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-white mb-2">{allProperties.length}+</div>
              <span>Unique Properties</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-white mb-2">50K+</div>
              <span>Happy Guests</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-white mb-2">24/7</div>
              <span>Support</span>
            </div>
          </motion.div>
        </div>

        {/* Manual Navigation Arrows */}
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-200 z-20 border border-white/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-200 z-20 border border-white/20"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce z-20">
          <div className="flex flex-col items-center">
            <span className="text-xs mb-2">Scroll to explore</span>
            <div className="w-5 h-8 border border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/60 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why VibeStays Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose VibeStays?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
              We curate exceptional stays that offer more than just accommodation—they offer experiences.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mountain className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Curated Collection</h3>
              <p className="text-gray-600">
                Every property is handpicked by our team for its unique character, stunning location, and exceptional hospitality.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentic Experiences</h3>
              <p className="text-gray-600">
                Immerse yourself in local culture with insider tips, nearby experiences, and connections to the community.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trees className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nature-Focused</h3>
              <p className="text-gray-600">
                Reconnect with nature through properties that showcase India's diverse landscapes and natural beauty.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most loved stays, each offering a unique perspective on India's natural beauty.
            </motion.p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {featuredProperties.map((property) => (
                <motion.div key={property.id} variants={itemVariants}>
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button size="lg" asChild variant="outline" className="text-lg px-8 py-3">
              <Link to="/properties">
                View All Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Vibe
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're seeking adventure, romance, or tranquility, we have the perfect stay for you.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {[
              { theme: 'honeymoon', label: 'Honeymoon', color: 'bg-pink-100 text-pink-700' },
              { theme: 'family-getaway', label: 'Family', color: 'bg-blue-100 text-blue-700' },
              { theme: 'workation', label: 'Workation', color: 'bg-purple-100 text-purple-700' },
              { theme: 'eco-friendly', label: 'Eco-Friendly', color: 'bg-green-100 text-green-700' },
              { theme: 'adventure', label: 'Adventure', color: 'bg-orange-100 text-orange-700' }
            ].map((category) => (
              <motion.div key={category.theme} variants={itemVariants}>
                <Link to={`/properties?theme=${category.theme}`}>
                  <div className="group cursor-pointer">
                    <div className={`${category.color} rounded-lg p-6 text-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-md`}>
                      <div className="text-2xl mb-2">
                        {category.theme === 'honeymoon' && '💕'}
                        {category.theme === 'family-getaway' && '👨‍👩‍👧‍👦'}
                        {category.theme === 'workation' && '💻'}
                        {category.theme === 'eco-friendly' && '🌿'}
                        {category.theme === 'adventure' && '🏔️'}
                      </div>
                      <h3 className="font-semibold">{category.label}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Guests Say
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from travelers who found their perfect vibe with us.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Priya & Arjun",
                location: "Mumbai",
                comment: "The mountain villa in Jibhi was absolutely magical. Perfect for our anniversary getaway!",
                rating: 5
              },
              {
                name: "The Sharma Family",
                location: "Delhi",
                comment: "Our kids loved the treehouse experience. VibeStays made our family vacation unforgettable.",
                rating: 5
              },
              {
                name: "Rahul",
                location: "Bangalore",
                comment: "Working remotely from the lakeside cottage was a dream. Great WiFi and even better views!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.location}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Vibe?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of travelers who have discovered their perfect escape with VibeStays.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3">
                <Link to="/properties">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3">
                <Link to="/contact">
                  List Your Property
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
