/*
  # Update order status handling

  1. Changes
    - Create enum type for order status
    - Update orders table to use enum type
    - Add admin policy for order status updates
    - Handle existing data conversion
*/

-- First, create an enum type for order status
CREATE TYPE order_status AS ENUM ('pending', 'delivering', 'delivered');

-- Update the orders table to use the new enum type
-- First, remove the default constraint
ALTER TABLE orders 
ALTER COLUMN status DROP DEFAULT;

-- Then convert existing data and change the column type
ALTER TABLE orders 
ALTER COLUMN status TYPE order_status 
USING CASE 
  WHEN status = 'pending' THEN 'pending'::order_status
  WHEN status = 'delivering' THEN 'delivering'::order_status
  WHEN status = 'delivered' THEN 'delivered'::order_status
  ELSE 'pending'::order_status
END;

-- Add the default back with the new type
ALTER TABLE orders 
ALTER COLUMN status SET DEFAULT 'pending'::order_status;

-- Add policy for admin to update order status
CREATE POLICY "Admin can update order status"
ON orders
FOR UPDATE
TO authenticated
USING (EXISTS ( 
  SELECT 1 
  FROM admin_settings 
  WHERE key = 'admin_password' 
  AND value = 'Qwer1qwer'
))
WITH CHECK (EXISTS ( 
  SELECT 1 
  FROM admin_settings 
  WHERE key = 'admin_password' 
  AND value = 'Qwer1qwer'
));