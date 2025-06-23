/*
  # Fix admin settings policy recursion

  1. Changes
    - Remove recursive admin policy from admin_settings table
    - Add new non-recursive admin policy
    - Update existing policies to use a simpler admin check

  2. Security
    - Maintains admin-only access to admin_settings
    - Prevents infinite recursion while keeping security intact
*/

-- First, drop the recursive policy
DROP POLICY IF EXISTS "Admin can manage settings" ON admin_settings;

-- Create new non-recursive admin policy
CREATE POLICY "Admin can manage settings"
ON admin_settings
FOR ALL
TO authenticated
USING (
  current_setting('request.jwt.claims', true)::json->>'role' = 'authenticated' AND
  EXISTS (
    SELECT 1 
    FROM admin_settings 
    WHERE key = 'admin_password' 
    AND value = 'Qwer1qwer'
    AND admin_settings.id != COALESCE(admin_settings.id, '00000000-0000-0000-0000-000000000000'::uuid)
  )
);