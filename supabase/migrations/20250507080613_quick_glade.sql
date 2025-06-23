/*
  # Fix admin access configuration

  1. Changes
    - Set admin email in settings
    - Ensure admin policies are correctly applied
*/

-- Set the admin email in the settings
INSERT INTO admin_settings (key, value)
VALUES ('admin_email', 'admin@example.com')
ON CONFLICT (key) DO UPDATE
SET value = 'admin@example.com';

-- Ensure the app.admin_email setting is available
SELECT set_config('app.admin_email', 'admin@example.com', false);

-- Refresh policies
DO $$
BEGIN
  -- Refresh orders policies
  DROP POLICY IF EXISTS "Admin can view all orders" ON orders;
  CREATE POLICY "Admin can view all orders" ON orders
    FOR ALL TO authenticated
    USING (
      (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
      AND (current_setting('request.jwt.claims', true)::json->>'email') = 
          (SELECT value FROM admin_settings WHERE key = 'admin_email')
    );

  -- Refresh order items policies
  DROP POLICY IF EXISTS "Admin can view all order items" ON order_items;
  CREATE POLICY "Admin can view all order items" ON order_items
    FOR ALL TO authenticated
    USING (
      (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
      AND (current_setting('request.jwt.claims', true)::json->>'email') = 
          (SELECT value FROM admin_settings WHERE key = 'admin_email')
    );

  -- Refresh profiles policies
  DROP POLICY IF EXISTS "Admin can view all profiles" ON profiles;
  CREATE POLICY "Admin can view all profiles" ON profiles
    FOR ALL TO authenticated
    USING (
      (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
      AND (current_setting('request.jwt.claims', true)::json->>'email') = 
          (SELECT value FROM admin_settings WHERE key = 'admin_email')
    );

  -- Refresh users policies
  DROP POLICY IF EXISTS "Admin can view all users" ON users;
  CREATE POLICY "Admin can view all users" ON users
    FOR ALL TO authenticated
    USING (
      (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
      AND (current_setting('request.jwt.claims', true)::json->>'email') = 
          (SELECT value FROM admin_settings WHERE key = 'admin_email')
    );
END $$;