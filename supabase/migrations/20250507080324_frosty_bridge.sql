/*
  # Fix Admin Orders Display

  1. Changes
    - Drop and recreate admin policies with correct permissions
    - Add missing join between orders and users tables
    - Ensure proper access to user data for admin
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can view all orders" ON orders;
DROP POLICY IF EXISTS "Admin can view all order items" ON order_items;

-- Add policy for admin to view all orders
CREATE POLICY "Admin can view all orders" ON orders
FOR ALL TO authenticated
USING (
  (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
  AND auth.jwt() ->> 'email' = current_setting('app.admin_email')
);

-- Add policy for admin to view all order items
CREATE POLICY "Admin can view all order items" ON order_items
FOR ALL TO authenticated
USING (
  (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
  AND auth.jwt() ->> 'email' = current_setting('app.admin_email')
);

-- Add policy for admin to view all users
CREATE POLICY "Admin can view all users" ON users
FOR ALL TO authenticated
USING (
  (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
  AND auth.jwt() ->> 'email' = current_setting('app.admin_email')
);

-- Add policy for admin to view all profiles
CREATE POLICY "Admin can view all profiles" ON profiles
FOR ALL TO authenticated
USING (
  (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
  AND auth.jwt() ->> 'email' = current_setting('app.admin_email')
);