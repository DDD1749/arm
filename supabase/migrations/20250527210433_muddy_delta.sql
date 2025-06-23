/*
  # Add products management

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `model_url` (text)
      - `category` (text)
      - `created_at` (timestamp)
      - `customization_config` (jsonb)

  2. Security
    - Enable RLS
    - Add policies for public read access
    - Add policies for admin management
*/

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL,
  image_url text NOT NULL,
  model_url text NOT NULL,
  category text NOT NULL,
  customization_config jsonb NOT NULL DEFAULT '{
    "sections": []
  }',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON products
FOR SELECT
TO public
USING (true);

-- Allow admin to manage products
CREATE POLICY "Allow admin to manage products" ON products
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM admin_settings 
    WHERE key = 'admin_password' 
    AND value = 'Qwer1qwer'
    LIMIT 1
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM admin_settings 
    WHERE key = 'admin_password' 
    AND value = 'Qwer1qwer'
    LIMIT 1
  )
);

-- Add indexes
CREATE INDEX products_category_idx ON products(category);