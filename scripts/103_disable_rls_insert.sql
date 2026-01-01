-- Drop all existing policies on orders and order_items
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Anyone can create order items" ON order_items;
DROP POLICY IF EXISTS "Only admins can view orders" ON orders;
DROP POLICY IF EXISTS "Only admins can view order items" ON order_items;
DROP POLICY IF EXISTS "Only admins can update orders" ON orders;
DROP POLICY IF EXISTS "Only admins can delete orders" ON orders;

-- Disable RLS temporarily to test
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;

-- If you want to keep RLS enabled but allow all inserts, use this instead:
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "allow_all_insert_orders" ON orders
--   FOR INSERT WITH CHECK (true);

-- CREATE POLICY "allow_all_insert_order_items" ON order_items
--   FOR INSERT WITH CHECK (true);

-- CREATE POLICY "admins_select_orders" ON orders
--   FOR SELECT USING (
--     auth.uid() IN (
--       SELECT id FROM profiles WHERE role = 'admin'
--     )
--   );

-- CREATE POLICY "admins_select_order_items" ON order_items
--   FOR SELECT USING (
--     auth.uid() IN (
--       SELECT id FROM profiles WHERE role = 'admin'
--     )
--   );

-- CREATE POLICY "admins_update_orders" ON orders
--   FOR UPDATE USING (
--     auth.uid() IN (
--       SELECT id FROM profiles WHERE role = 'admin'
--     )
--   );

-- CREATE POLICY "admins_delete_orders" ON orders
--   FOR DELETE USING (
--     auth.uid() IN (
--       SELECT id FROM profiles WHERE role = 'admin'
--     )
--   );
