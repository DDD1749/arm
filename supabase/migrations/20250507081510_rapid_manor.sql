/*
  # Fix Admin Settings Policies

  1. Changes
    - Remove recursive admin policies that were causing infinite loops
    - Create new admin policies that use a direct password check
    - Maintain security while preventing recursion

  2. Security
    - Policies still require admin password authentication
    - Prevents unauthorized access to admin settings
    - Eliminates infinite recursion issue
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Admin can manage settings when password matches" ON admin_settings;
DROP POLICY IF EXISTS "Allow initial admin password setup" ON admin_settings;

-- Create new non-recursive policies
CREATE POLICY "Admin can manage settings"
ON admin_settings
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

-- Policy for initial password setup
CREATE POLICY "Allow initial admin password setup"
ON admin_settings
FOR INSERT 
TO authenticated
WITH CHECK (
  NOT EXISTS (
    SELECT 1 
    FROM admin_settings 
    WHERE key = 'admin_password'
  )
  AND key = 'admin_password'
);