-- Remove the dangerous public UPDATE policy on scan_metrics
-- The increment_scan_count() function uses SECURITY DEFINER, so it bypasses RLS anyway
DROP POLICY "Anyone can update scan metrics" ON public.scan_metrics;