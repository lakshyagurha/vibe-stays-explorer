
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Property } from '@/types/property';

export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async (): Promise<Property[]> => {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          reviews (
            id,
            guest_name,
            rating,
            comment,
            verified,
            created_at,
            approved
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }

      // Transform the data to match our Property interface
      return data.map(property => ({
        ...property,
        reviews: property.reviews.filter(review => review.approved).map(review => ({
          ...review,
          propertyId: property.id
        }))
      }));
    }
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async (): Promise<Property | null> => {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          reviews (
            id,
            guest_name,
            rating,
            comment,
            verified,
            created_at,
            approved
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        return null;
      }

      // Transform the data to match our Property interface
      return {
        ...data,
        reviews: data.reviews.filter(review => review.approved).map(review => ({
          ...review,
          propertyId: data.id
        }))
      };
    }
  });
};
