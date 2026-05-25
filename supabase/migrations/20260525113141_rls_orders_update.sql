CREATE POLICY "Enable insert for authenticated users only" 
ON "public"."orders" 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Enable read access for users based on user_id" 
ON "public"."orders" 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);