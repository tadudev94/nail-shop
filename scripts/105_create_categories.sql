-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policies: everyone can view, only admins can manage
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert categories"
  ON categories FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update categories"
  ON categories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete categories"
  ON categories FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Seed some default categories
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Đồ dùng bếp', 'do-dung-bep', 'Các sản phẩm tre dùng trong nhà bếp', 1),
  ('Trang trí', 'trang-tri', 'Đồ trang trí nội thất từ tre', 2),
  ('Chăm sóc cá nhân', 'cham-soc-ca-nhan', 'Đồ dùng cá nhân từ tre', 3),
  ('Đồ gia dụng', 'do-gia-dung', 'Các vật dụng gia đình từ tre', 4)
ON CONFLICT (slug) DO NOTHING;

-- Update products table to use category slug
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_slug TEXT;

-- Migrate existing categories to slugs
UPDATE products SET category_slug = 
  CASE 
    WHEN category = 'Đồ dùng bếp' THEN 'do-dung-bep'
    WHEN category = 'Trang trí' THEN 'trang-tri'
    WHEN category = 'Chăm sóc cá nhân' THEN 'cham-soc-ca-nhan'
    ELSE 'do-gia-dung'
  END
WHERE category_slug IS NULL;
