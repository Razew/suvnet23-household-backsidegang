-- Create policies to allow read access for all users
CREATE POLICY "Enable read access for all users"
ON public.avatar
FOR SELECT
USING (true);

CREATE POLICY "Enable read access for all users"
ON public.chore
FOR SELECT
USING (true);

CREATE POLICY "Enable read access for all users"
ON public.chore_to_user
FOR SELECT
USING (true);

CREATE POLICY "Enable read access for all users"
ON public.household
FOR SELECT
USING (true);

CREATE POLICY "Enable read access for all users"
ON public.user
FOR SELECT
USING (true);

CREATE POLICY "Enable read access for all users"
ON public.user_to_household
FOR SELECT
USING (true);

-- Create policies to allow insert access for all users
CREATE POLICY "Enable insert access for all users"
ON public.avatar
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable insert access for all users"
ON public.chore
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable insert access for all users"
ON public.chore_to_user
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable insert access for all users"
ON public.household
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable insert access for all users"
ON public.user
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable insert access for all users"
ON public.user_to_household
FOR INSERT
WITH CHECK (true);

-- Create policies to allow update access for all users
CREATE POLICY "Enable update access for all users"
ON public.avatar
FOR UPDATE
USING (true);

CREATE POLICY "Enable update access for all users"
ON public.chore
FOR UPDATE
USING (true);

CREATE POLICY "Enable update access for all users"
ON public.chore_to_user
FOR UPDATE
USING (true);

CREATE POLICY "Enable update access for all users"
ON public.household
FOR UPDATE
USING (true);

CREATE POLICY "Enable update access for all users"
ON public.user
FOR UPDATE
USING (true);

CREATE POLICY "Enable update access for all users"
ON public.user_to_household
FOR UPDATE
USING (true);

-- Create policies to allow delete access for all users
CREATE POLICY "Enable delete access for all users"
ON public.avatar
FOR DELETE
USING (true);

CREATE POLICY "Enable delete access for all users"
ON public.chore
FOR DELETE
USING (true);

CREATE POLICY "Enable delete access for all users"
ON public.chore_to_user
FOR DELETE
USING (true);

CREATE POLICY "Enable delete access for all users"
ON public.household
FOR DELETE
USING (true);

CREATE POLICY "Enable delete access for all users"
ON public.user
FOR DELETE
USING (true);

CREATE POLICY "Enable delete access for all users"
ON public.user_to_household
FOR DELETE
USING (true);