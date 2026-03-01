-- Create jute_bags table to store bag information
CREATE TABLE public.jute_bags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bag_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  batch_number TEXT NOT NULL,
  image_url TEXT,
  farm_region TEXT NOT NULL,
  farm_country TEXT NOT NULL,
  artisan_name TEXT NOT NULL,
  artisan_story TEXT,
  carbon_saved_grams INTEGER NOT NULL DEFAULT 200,
  water_saved_liters INTEGER NOT NULL DEFAULT 45,
  weight_grams INTEGER NOT NULL DEFAULT 180,
  biodegradable_months INTEGER NOT NULL DEFAULT 18,
  certifications TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scan_metrics table for impact counter (single row)
CREATE TABLE public.scan_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  total_scans INTEGER NOT NULL DEFAULT 0,
  carbon_saved_kg NUMERIC NOT NULL DEFAULT 0,
  trees_equivalent INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.jute_bags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_metrics ENABLE ROW LEVEL SECURITY;

-- Public read access for jute_bags (consumers can view bag info)
CREATE POLICY "Anyone can view jute bags" 
ON public.jute_bags 
FOR SELECT 
USING (true);

-- Public read access for scan_metrics (for impact counter)
CREATE POLICY "Anyone can view scan metrics" 
ON public.scan_metrics 
FOR SELECT 
USING (true);

-- Public update for scan_metrics (for incrementing scans)
CREATE POLICY "Anyone can update scan metrics"
ON public.scan_metrics
FOR UPDATE
USING (true);

-- Enable realtime for scan_metrics
ALTER PUBLICATION supabase_realtime ADD TABLE public.scan_metrics;

-- Function to increment scan count
CREATE OR REPLACE FUNCTION public.increment_scan_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.scan_metrics
  SET 
    total_scans = total_scans + 1,
    carbon_saved_kg = carbon_saved_kg + 0.2,
    trees_equivalent = FLOOR((total_scans + 1) / 100),
    updated_at = now()
  WHERE id = (SELECT id FROM public.scan_metrics LIMIT 1);
END;
$$;

-- Insert initial scan metrics row
INSERT INTO public.scan_metrics (total_scans, carbon_saved_kg, trees_equivalent) 
VALUES (12847, 2569, 128);

-- Insert sample jute bags
INSERT INTO public.jute_bags (bag_id, name, batch_number, farm_region, farm_country, artisan_name, artisan_story, carbon_saved_grams, water_saved_liters, weight_grams, biodegradable_months, certifications)
VALUES 
  ('JUTE-001', 'Classic Tote', 'BT-2024-001', 'Bengal Delta', 'Bangladesh', 'Fatima Begum', 'Fatima has been weaving jute bags for 15 years. Her skill has been passed down through three generations, combining traditional techniques with modern designs.', 200, 45, 180, 18, ARRAY['Organic', 'Fair Trade', 'GOTS Certified']),
  ('JUTE-002', 'Shopper Deluxe', 'BT-2024-002', 'Ganges Plains', 'India', 'Ravi Kumar', 'Ravi learned the art of jute weaving from his grandmother. Each bag he creates tells a story of his village''s rich textile heritage.', 250, 55, 220, 20, ARRAY['Organic', 'Handmade']),
  ('JUTE-003', 'Eco Carry', 'BT-2024-003', 'Brahmaputra Valley', 'Bangladesh', 'Amina Khatun', 'Amina is a cooperative leader who trains young women in sustainable craftsmanship, empowering her community one bag at a time.', 180, 40, 150, 16, ARRAY['Fair Trade', 'Women Empowerment']);