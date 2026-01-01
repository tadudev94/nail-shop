-- Drop all tables except profiles (keep admin users)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Drop storage bucket if exists
DELETE FROM storage.buckets WHERE id = 'product-images';
