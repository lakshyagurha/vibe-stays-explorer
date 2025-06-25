
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, MapPin, Star, Award } from 'lucide-react';

const About = () => {
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
        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 variants={itemVariants} className="text-4xl lg:text-5xl font-bold mb-6">
            About VibeStays
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-primary-100 max-w-3xl mx-auto">
            We're passionate about connecting travelers with unique, authentic stays that create unforgettable memories 
            and support local communities across India.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              To curate and showcase India's most unique accommodations, from misty mountain cottages to riverside bamboo villas, 
              ensuring every traveler finds their perfect vibe while supporting local communities and sustainable tourism.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Authentic Experiences",
                description: "Every property is handpicked for its unique character and ability to offer genuine local experiences."
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Quality Assured",
                description: "We personally verify each property to ensure it meets our high standards for comfort, safety, and authenticity."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Community First",
                description: "We prioritize properties that benefit local communities and promote sustainable, responsible tourism."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 lg:py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  VibeStays was born from a simple observation: India is full of incredible, unique places to stay, 
                  but finding them can be overwhelming. Traditional booking platforms focus on hotels and standard accommodations, 
                  missing the magic of authentic, local experiences.
                </p>
                <p>
                  Our founders, avid travelers themselves, spent years discovering hidden gems – from a treehouse in Kerala's backwaters 
                  to a heritage haveli in Rajasthan's desert. They realized these special places needed a platform that understood 
                  their uniqueness and could connect them with like-minded travelers.
                </p>
                <p>
                  Today, VibeStays is more than just a booking platform. We're a community of property owners who are passionate 
                  about sharing their special spaces, and travelers who value authentic experiences over cookie-cutter accommodations.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-8 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
                alt="Beautiful mountain landscape"
                className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from selecting properties to supporting our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="h-6 w-6" />,
                title: "Excellence",
                description: "We maintain the highest standards in everything we do."
              },
              {
                icon: <Heart className="h-6 w-6" />,
                title: "Authenticity",
                description: "We celebrate genuine, unique experiences over generic ones."
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Community",
                description: "We support local communities and sustainable tourism practices."
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Trust",
                description: "We build trust through transparency, verification, and reliability."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 lg:py-24 bg-primary-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">VibeStays by the Numbers</h2>
            <p className="text-xl text-primary-100">
              Our growing community of unique stays and happy travelers.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Unique Properties" },
              { number: "15", label: "States Covered" },
              { number: "1000+", label: "Happy Travelers" },
              { number: "4.8", label: "Average Rating" }
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-16 lg:py-24 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Find Your Vibe?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8">
            Join our community of travelers who value authentic experiences and unique accommodations.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/properties"
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Explore Properties
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium rounded-lg transition-colors"
            >
              List Your Property
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
