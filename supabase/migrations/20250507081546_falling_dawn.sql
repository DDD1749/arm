/*
  # Fix admin settings policy recursion

  1. Changes
    - Drop existing policies on admin_settings table that cause recursion
    - Create new, simplified policies for admin settings management
    
  2. Security
    - Enable RLS on admin_settings table
    - Add policy for initial admin password setup
    - Add policy for admin access using direct password check
*/

-- First, drop the problematic policies
DROP POLICY IF EXISTS "Admin can manage settings" ON admin_settings;
DROP POLICY IF EXISTS "Allow initial admin password setup" ON admin_settings;

-- Create new policies without recursion
CREATE POLICY "Admin can view settings"
ON admin_settings
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_settings
    WHERE key = 'admin_password' 
    AND value = 'Qwer1qwer'
    LIMIT 1
  )
);

CREATE POLICY "Admin can manage settings"
ON admin_settings
FOR INSERT
TO authenticated
WITH CHECK (
  (NOT EXISTS (
    SELECT 1 FROM admin_settings
    WHERE key = 'admin_password'
  ) AND key = 'admin_password')
  OR
  EXISTS (
    SELECT 1 FROM admin_settings
    WHERE key = 'admin_password' 
    AND value = 'Qwer1qwer'
    LIMIT 1
  )
);

CREATE POLICY "Admin can update settings"
ON admin_settings
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_settings
    WHERE key = 'admin_password' 
    AND value = 'Qwer1qwer'
    LIMIT 1
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_settings
    WHERE key = 'admin_password' 
    AND value = 'Qwer1qwer'
    LIMIT 1
  )
);

CREATE POLICY "Admin can delete settings"
ON admin_settings
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_settings
    WHERE key = 'admin_password' 
    AND value = 'Qwer1qwer'
    LIMIT 1
  )
);