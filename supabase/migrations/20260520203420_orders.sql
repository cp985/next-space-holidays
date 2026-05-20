CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  trip_id TEXT NOT NULL,
  price_paid NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1. Assicurati che l'RLS sia attivo (questo lo hai già fatto, ma nel file di migrazione serve)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 2. Policy di Scrittura (INSERT): Un utente può inserire un record solo per se stesso
CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 3. Policy di Lettura (SELECT): Un utente può vedere solo i PROPRI ordini
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);