
-- Create bag_reviews table
CREATE TABLE public.bag_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bag_id UUID NOT NULL REFERENCES public.jute_bags(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  user_email TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT rating_range CHECK (rating >= 1 AND rating <= 5),
  CONSTRAINT comment_length CHECK (char_length(comment) >= 1 AND char_length(comment) <= 500)
);

-- Enable RLS
ALTER TABLE public.bag_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read reviews
CREATE POLICY "Anyone can view reviews"
ON public.bag_reviews FOR SELECT
USING (true);

-- Authenticated users can create reviews
CREATE POLICY "Users can create reviews"
ON public.bag_reviews FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
ON public.bag_reviews FOR DELETE
USING (auth.uid() = user_id);
