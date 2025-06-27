
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Property } from '@/types/property';
import { useToast } from '@/hooks/use-toast';

// Database to Property type mapping function
const mapDatabaseToProperty = (dbProperty: any): Property => ({
  id: dbProperty.id,
  name: dbProperty.name,
  location: dbProperty.location,
  state: dbProperty.state,
  price: Number(dbProperty.price),
  priceUnit: dbProperty.price_unit,
  images: dbProperty.images || [],
  videos: dbProperty.videos || [],
  seasonalImages: dbProperty.seasonal_images || [],
  description: dbProperty.description,
  shortDescription: dbProperty.short_description,
  maxGuests: dbProperty.max_guests,
  bedrooms: dbProperty.bedrooms,
  bathrooms: dbProperty.bathrooms,
  propertyType: dbProperty.property_type,
  views: dbProperty.views || [],
  themes: dbProperty.themes || [],
  amenities: dbProperty.amenities || [],
  nearbyExperiences: dbProperty.nearby_experiences || [],
  localTips: dbProperty.local_tips || [],
  hostName: dbProperty.host_name,
  contactNumber: dbProperty.contact_number,
  whatsappNumber: dbProperty.whatsapp_number,
  rating: Number(dbProperty.rating) || 0,
  reviewCount: dbProperty.review_count || 0,
  reviews: [], // Reviews are handled separately
  featured: dbProperty.featured || false,
  verified: dbProperty.verified || false,
  createdAt: dbProperty.created_at,
  updatedAt: dbProperty.updated_at
});

// Property to Database type mapping function
const mapPropertyToDatabase = (property: Omit<Property, 'id' | 'created_at' | 'updated_at' | 'rating' | 'reviewCount' | 'reviews'>) => ({
  name: property.name,
  location: property.location,
  state: property.state,
  price: property.price,
  price_unit: property.priceUnit,
  images: property.images,
  videos: property.videos,
  seasonal_images: property.seasonalImages,
  description: property.description,
  short_description: property.shortDescription,
  max_guests: property.maxGuests,
  bedrooms: property.bedrooms,
  bathrooms: property.bathrooms,
  property_type: property.propertyType,
  views: property.views,
  themes: property.themes,
  amenities: property.amenities,
  nearby_experiences: property.nearbyExperiences,
  local_tips: property.localTips,
  host_name: property.hostName,
  contact_number: property.contactNumber,
  whatsapp_number: property.whatsappNumber,
  featured: property.featured,
  verified: property.verified
});

export const useAdminProperties = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ['admin-properties'],
    queryFn: async (): Promise<Property[]> => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(mapDatabaseToProperty);
    }
  });

  const createProperty = useMutation({
    mutationFn: async (propertyData: Omit<Property, 'id' | 'created_at' | 'updated_at' | 'rating' | 'reviewCount' | 'reviews'>) => {
      const dbData = mapPropertyToDatabase(propertyData);
      const { data, error } = await supabase
        .from('properties')
        .insert([dbData])
        .select()
        .single();

      if (error) throw error;
      return mapDatabaseToProperty(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Success",
        description: "Property created successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create property: " + error.message,
        variant: "destructive",
      });
    }
  });

  const updateProperty = useMutation({
    mutationFn: async ({ id, ...propertyData }: Partial<Property> & { id: string }) => {
      const dbData = mapPropertyToDatabase(propertyData as any);
      const { data, error } = await supabase
        .from('properties')
        .update(dbData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return mapDatabaseToProperty(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Success",
        description: "Property updated successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update property: " + error.message,
        variant: "destructive",
      });
    }
  });

  const deleteProperty = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Success",
        description: "Property deleted successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete property: " + error.message,
        variant: "destructive",
      });
    }
  });

  return {
    properties,
    isLoading,
    error,
    createProperty,
    updateProperty,
    deleteProperty
  };
};
