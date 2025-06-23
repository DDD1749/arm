/*
  # Create admin tables and policies

  1. New Tables
    - `admin_settings` table for admin configuration
  2. Security
    - Enable RLS on admin_settings table
    - Add policies for admin access
*/

CREATE TABLE admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Only admin can access admin settings
CREATE POLICY "Admin can manage settings" ON admin_settings
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email'));

-- Insert admin credentials
INSERT INTO admin_settings (key, value) VALUES ('admin_password', 'Qwer1qwer');