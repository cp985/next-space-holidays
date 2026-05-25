-- Ora creiamo solo le 2 regole necessarie
CREATE POLICY "Allow insert for everyone" 
ON "public"."orders" 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow select for everyone" 
ON "public"."orders" 
FOR SELECT 
USING (true);