-- Create storage bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Allow public to read images
create policy "Public can view product images"
on storage.objects for select
using (bucket_id = 'product-images');

-- Allow authenticated admins to upload images
create policy "Admins can upload product images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'product-images' and
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Allow authenticated admins to update images
create policy "Admins can update product images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'product-images' and
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Allow authenticated admins to delete images
create policy "Admins can delete product images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'product-images' and
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);
