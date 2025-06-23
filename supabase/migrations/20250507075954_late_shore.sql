/*
  # Add admin policies for orders

  1. Changes
    - Add policies for admin to view all orders and order items
  
  2. Security
    - Add policies for admin access to orders and order items tables
*/

-- Add policy for admin to view all orders
CREATE POLICY "Admin can view all orders" ON orders
FOR SELECT TO authenticated
USING (
  (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
  AND auth.jwt() ->> 'email' = current_setting('app.admin_email')
);

-- Add policy for admin to view all order items
CREATE POLICY "Admin can view all order items" ON order_items
FOR SELECT TO authenticated
USING (
  (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
  AND auth.jwt() ->> 'email' = current_setting('app.admin_email')
);