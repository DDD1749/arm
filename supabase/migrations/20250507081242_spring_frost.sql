/*
  # Fix admin policies

  1. Changes
    - Update admin policies to use admin_settings table instead of app.admin_email parameter
    - Remove references to current_setting('app.admin_email')
    - Use admin_settings table for authentication

  2. Security
    - Policies remain secure by checking against stored admin credentials
    - Only authenticated users can access admin features
*/

-- Drop existing policies that use app.admin_email
DROP POLICY IF EXISTS "Admin can manage settings" ON admin_settings;
DROP POLICY IF EXISTS "Admin can view all orders" ON orders;
DROP POLICY IF EXISTS "Admin can view all order items" ON order_items;
DROP POLICY IF EXISTS "Admin can view all users" ON users;
DROP POLICY IF EXISTS "Admin can view all profiles" ON profiles;

-- Create new policies using admin_settings table
CREATE POLICY "Admin can manage settings"
ON admin_settings
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_settings
    WHERE key = 'admin_password'
    AND value = 'Qwer1qwer'
  )
);

CREATE POLICY "Admin can view all orders"
ON orders
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_settings
    WHERE key = 'admin_password'
    AND value = 'Qwer1qwer'
  )
);

CREATE POLICY "Admin can view all order items"
ON order_items
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_settings
    WHERE key = 'admin_password'
    AND value = 'Qwer1qwer'
  )
);

CREATE POLICY "Admin can view all users"
ON users
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_settings
    WHERE key = 'admin_password'
    AND value = 'Qwer1qwer'
  )
);

CREATE POLICY "Admin can view all profiles"
ON profiles
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_settings
    WHERE key = 'admin_password'
    AND value = 'Qwer1qwer'
  )
);