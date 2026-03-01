-- Create the updated_at function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create carts table
CREATE TABLE public.carts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cart_id UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
  bag_id UUID NOT NULL REFERENCES public.jute_bags(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(cart_id, bag_id)
);

-- Create order_inquiries table
CREATE TABLE public.order_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_inquiry_items table
CREATE TABLE public.order_inquiry_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  inquiry_id UUID NOT NULL REFERENCES public.order_inquiries(id) ON DELETE CASCADE,
  bag_id UUID NOT NULL REFERENCES public.jute_bags(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1
);

-- Enable RLS on all tables
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_inquiry_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for carts
CREATE POLICY "Users can view own cart" ON public.carts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own cart" ON public.carts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON public.carts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart" ON public.carts FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for cart_items
CREATE POLICY "Users can view own cart items" ON public.cart_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.carts WHERE id = cart_id AND user_id = auth.uid())
);
CREATE POLICY "Users can add to own cart" ON public.cart_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.carts WHERE id = cart_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own cart items" ON public.cart_items FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.carts WHERE id = cart_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete own cart items" ON public.cart_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.carts WHERE id = cart_id AND user_id = auth.uid())
);

-- RLS policies for order_inquiries
CREATE POLICY "Users can view own inquiries" ON public.order_inquiries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own inquiries" ON public.order_inquiries FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for order_inquiry_items
CREATE POLICY "Users can view own inquiry items" ON public.order_inquiry_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.order_inquiries WHERE id = inquiry_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create own inquiry items" ON public.order_inquiry_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.order_inquiries WHERE id = inquiry_id AND user_id = auth.uid())
);

-- Add updated_at trigger for carts
CREATE TRIGGER update_carts_updated_at
BEFORE UPDATE ON public.carts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();