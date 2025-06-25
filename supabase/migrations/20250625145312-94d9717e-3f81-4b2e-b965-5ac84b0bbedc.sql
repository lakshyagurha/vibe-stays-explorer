
-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  price_unit TEXT NOT NULL CHECK (price_unit IN ('night', 'person', 'group')),
  images TEXT[] NOT NULL DEFAULT '{}',
  videos TEXT[] DEFAULT '{}',
  seasonal_images TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  max_guests INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('villa', 'tent', 'homestay', 'cabin', 'treehouse', 'houseboat')),
  views TEXT[] DEFAULT '{}',
  themes TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  nearby_experiences TEXT[] DEFAULT '{}',
  local_tips TEXT[] DEFAULT '{}',
  host_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  guest_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin users table (for login functionality)
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Properties policies (public read, admin write)
CREATE POLICY "Anyone can view published properties" 
  ON public.properties 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can insert properties" 
  ON public.properties 
  FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.email()));

CREATE POLICY "Only admins can update properties" 
  ON public.properties 
  FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.email()));

CREATE POLICY "Only admins can delete properties" 
  ON public.properties 
  FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.email()));

-- Reviews policies (public read approved reviews, admin manage all)
CREATE POLICY "Anyone can view approved reviews" 
  ON public.reviews 
  FOR SELECT 
  USING (approved = true);

CREATE POLICY "Anyone can submit reviews" 
  ON public.reviews 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Only admins can update reviews" 
  ON public.reviews 
  FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.email()));

CREATE POLICY "Only admins can delete reviews" 
  ON public.reviews 
  FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.email()));

-- Admin users policies (admin only access)
CREATE POLICY "Only admins can view admin users" 
  ON public.admin_users 
  FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.email()));

-- Create function to update property rating when reviews change
CREATE OR REPLACE FUNCTION update_property_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.properties 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0) 
      FROM public.reviews 
      WHERE property_id = COALESCE(NEW.property_id, OLD.property_id) 
      AND approved = true
    ),
    review_count = (
      SELECT COUNT(*) 
      FROM public.reviews 
      WHERE property_id = COALESCE(NEW.property_id, OLD.property_id) 
      AND approved = true
    )
  WHERE id = COALESCE(NEW.property_id, OLD.property_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers to auto-update property ratings
CREATE TRIGGER update_property_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_property_rating();

-- Insert sample admin user (password: admin123)
INSERT INTO public.admin_users (email, password_hash, name) VALUES 
('admin@vibestays.com', '$2a$10$rZ4Rk9.9Oj/Nxp1/5o5u5e6WH8XQ2zV3L1N7F0A2E4R7T8M9P1Q6S', 'VibeStays Admin');

-- Insert sample properties
INSERT INTO public.properties (
  name, location, state, price, price_unit, images, description, short_description,
  max_guests, bedrooms, bathrooms, property_type, views, themes, amenities,
  nearby_experiences, local_tips, host_name, contact_number, whatsapp_number,
  rating, review_count, featured, verified
) VALUES 
(
  'Mountain View Villa',
  'Manali',
  'Himachal Pradesh',
  8500,
  'night',
  ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d'],
  'A stunning villa with panoramic mountain views nestled in the heart of Manali. Perfect for families looking to escape the city and reconnect with nature.',
  'Stunning villa with panoramic mountain views in Manali',
  8,
  4,
  3,
  'villa',
  ARRAY['mountain', 'village'],
  ARRAY['family', 'romantic'],
  ARRAY['WiFi', 'Kitchen', 'Parking', 'Mountain View'],
  ARRAY['Solang Valley skiing', 'Old Manali cafes', 'Hadimba Temple'],
  ARRAY['Best views at sunrise', 'Local market opens at 9 AM'],
  'Rajesh Kumar',
  '+91-9876543210',
  '+91-9876543210',
  4.8,
  24,
  true,
  true
);
