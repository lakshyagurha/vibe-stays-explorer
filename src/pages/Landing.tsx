
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Star, Users, Shield, Heart, Mountain, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PropertyCard from '@/components/PropertyCard';
import { sampleProperties } from '@/data/sampleProperties';

const Landing = () => {
  const featuredProperties = sampleProperties.filter(p => p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 lg:py-32"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={itemVariants}>
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              🌿 Curated Unique Stays Across India
            </Badge>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Discover Your Perfect
            <br />
            <span className="text-accent-400">Vibe Stay</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto"
          >
            From misty mountain cottages to riverside bamboo villas. Find handpicked, authentic stays that match your travel vibe.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button 
              size="lg" 
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 text-lg w-full sm:w-auto"
              asChild
            >
              <Link to="/properties">
                Explore Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 text-lg w-full sm:w-auto"
              asChild
            >
              <Link to="/contact">List Your Property</Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48V0H1200V120Z" />
          </svg>
        </div>
      </motion.section>

      {/* Why VibeStays Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 lg:py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose VibeStays?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We handpick unique properties that offer authentic experiences, ensuring every stay matches your travel vibe perfectly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Verified Properties",
                description: "Every property is personally verified by our team for quality and authenticity."
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Curated Experiences",
                description: "Handpicked stays that offer unique experiences beyond just accommodation."
              },
              {
                icon: <MapPin className="h-8 w-8" />,
                title: "Local Insights",
                description: "Get insider tips and local recommendations from our community of hosts."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Personal Support",
                description: "Direct contact with hosts and our team for personalized assistance."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Properties */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most loved stays, each offering a unique vibe and unforgettable experiences.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {featuredProperties.map((property) => (
              <motion.div key={property.id} variants={itemVariants}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700" asChild>
              <Link to="/properties">
                View All Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Preview */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 lg:py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Vibe
            </h2>
            <p className="text-xl text-gray-600">
              Whether you seek adventure, romance, or tranquility - we have the perfect stay for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Mountain Escapes",
                icon: <Mountain className="h-8 w-8" />,
                count: "12+ properties",
                image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
              },
              {
                title: "Riverside Retreats",
                icon: <Waves className="h-8 w-8" />,
                count: "8+ properties",
                image: "https://images.unsplash.com/photo-1500673922987-e212871fec22"
              },
              {
                title: "Desert Adventures",
                icon: <Star className="h-8 w-8" />,
                count: "6+ properties",
                image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
              },
              {
                title: "Jungle Hideaways",
                icon: <Heart className="h-8 w-8" />,
                count: "10+ properties",
                image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="aspect-square relative">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                    <div className="bg-white/20 p-3 rounded-full mb-3">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                    <p className="text-sm text-white/90">{category.count}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 lg:py-24 bg-primary-600 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Stay?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl mb-8 text-primary-100">
            Join thousands of travelers who have discovered their ideal vibe with VibeStays.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg w-full sm:w-auto"
              asChild
            >
              <Link to="/properties">Start Exploring</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-primary-700 px-8 py-4 text-lg w-full sm:w-auto"
              asChild
            >
              <Link to="/contact">List Your Property</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Landing;
