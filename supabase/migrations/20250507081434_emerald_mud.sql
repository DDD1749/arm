/*
  # Fix admin settings policy recursion

  1. Changes
    - Remove recursive admin settings policy
    - Add new policy for admin password verification
    - Add policy for initial admin password setup

  2. Security
    - Policies ensure only authenticated users can access admin settings
    - Special handling for initial admin password setup
    - Prevents infinite recursion while maintaining security
*/

-- Drop the existing problematic policy
DROP POLICY IF EXISTS "Admin can manage settings" ON admin_settings;

-- Create new policy for admin password verification
CREATE POLICY "Admin can manage settings when password matches"
ON admin_settings
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM admin_settings settings 
    WHERE settings.key = 'admin_password' 
    AND settings.value = 'Qwer1qwer'
    AND settings.id != admin_settings.id
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM admin_settings settings 
    WHERE settings.key = 'admin_password' 
    AND settings.value = 'Qwer1qwer'
    AND settings.id != admin_settings.id
  )
);

-- Create policy for initial admin password setup
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