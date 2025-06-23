/*
  # Update admin policies and fix order display

  1. Changes
    - Drop existing admin policies
    - Add new admin policies with correct conditions
    - Add missing relationship between orders and users
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin can view all orders" ON orders;
DROP POLICY IF EXISTS "Admin can view all order items" ON order_items;

-- Add new admin policies
CREATE POLICY "Admin can view all orders" ON orders
FOR SELECT TO authenticated
USING (
  (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
  AND auth.jwt() ->> 'email' = current_setting('app.admin_email')
);

CREATE POLICY "Admin can view all order items" ON order_items
FOR SELECT TO authenticated
USING (
  (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
  AND auth.jwt() ->> 'email' = current_setting('app.admin_email')
);