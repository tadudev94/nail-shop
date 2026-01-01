-- Drop old policies if they exist
drop policy if exists "Admins can read all profiles" on public.profiles;
drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "System can insert profiles" on public.profiles;

-- Drop old function if exists
drop function if exists public.is_admin();

-- Recreate simplified policies for profiles table
-- Users can only read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile but cannot change role
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id and 
    role = (select role from public.profiles where id = auth.uid())
  );

-- System can insert profiles (via trigger)
create policy "System can insert profiles"
  on public.profiles for insert
  with check (true);

-- Note: Admin role checking for products table is done in product policies
-- This avoids recursion by checking profiles table from products policies
