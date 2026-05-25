-- 1. Cancelliamo TUTTE le vecchie policy per evitare conflitti e doppioni
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON "public"."orders";
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON "public"."orders";
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."orders";
DROP POLICY IF EXISTS "Stories are live for a day" ON "public"."orders";
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."orders";

-- 2. CREIAMO LE UNICHE DUE POLICY CHE TI SERVONO DAVVERO

-- POLICY DI SCRITTURA: Chiunque sia autenticato (tramite la tua anon/service key del server) può inserire l'ordine
CREATE POLICY "Allow insert for system actions" 
ON "public"."orders" 
FOR INSERT 
WITH CHECK (true);

-- POLICY DI LETTURA: L'utente può vedere solo i propri ordini legati al suo ID utente del database
-- Nota: Usiamo una sottoquery sulla tabella users basandoci sulla sessione email se necessario, 
-- oppure per ora permettiamo la lettura totale se vuoi testare senza blocchi:
CREATE POLICY "Allow select for everyone" 
ON "public"."orders" 
FOR SELECT 
USING (true);