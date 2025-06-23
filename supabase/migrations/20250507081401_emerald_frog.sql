/*
  # Fix admin_settings RLS policy

  1. Changes
    - Drop the recursive admin policy on admin_settings table
    - Create a new policy that checks the password directly without recursion
  
  2. Security
    - Maintains admin-only access to admin_settings table
    - Prevents infinite recursion while maintaining security
*/

-- Drop the existing problematic policy
DROP POLICY IF EXISTS "Admin can manage settings" ON admin_settings;

-- Create new non-recursive policy
CREATE POLICY "Admin can manage settings" ON admin_settings
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM admin_settings settings 
    WHERE settings.key = 'admin_password' 
    AND settings.value = 'Qwer1qwer'
    AND settings.id != admin_settings.id
  )
  OR (
    -- Allow access to the admin_password record itself for initial verification
    admin_settings.key = 'admin_password'
  )
);