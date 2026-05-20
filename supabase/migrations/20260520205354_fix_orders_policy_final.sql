-- 1. Forza il proprietario corretto sulla tabella orders
ALTER TABLE public.orders OWNER TO postgres;

-- 2. Attiva il Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Rimuove eventuali policy vecchie con lo stesso nome per evitare errori di duplicati
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- 4. Crea la Policy di Scrittura (INSERT): l'utente inserisce dati solo se loggato e solo per se stesso
CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- 5. Crea la Policy di Lettura (SELECT): l'utente vede solo i propri ordini
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);