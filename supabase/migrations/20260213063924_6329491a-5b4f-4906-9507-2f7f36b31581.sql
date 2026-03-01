
-- Add auth check to increment_scan_count RPC
CREATE OR REPLACE FUNCTION public.increment_scan_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  UPDATE public.scan_metrics
  SET 
    total_scans = total_scans + 1,
    carbon_saved_kg = carbon_saved_kg + 0.2,
    trees_equivalent = FLOOR((total_scans + 1) / 100),
    updated_at = now()
  WHERE id = (SELECT id FROM public.scan_metrics LIMIT 1);
END;
$$;

-- Add length constraints on order_inquiries for defense in depth
ALTER TABLE public.order_inquiries
ADD CONSTRAINT name_length CHECK (char_length(name) <= 100 AND char_length(name) >= 1),
ADD CONSTRAINT email_length CHECK (char_length(email) <= 255),
ADD CONSTRAINT phone_length CHECK (phone IS NULL OR char_length(phone) <= 20),
ADD CONSTRAINT message_length CHECK (message IS NULL OR char_length(message) <= 1000);
