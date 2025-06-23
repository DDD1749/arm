/*
  # Fix profiles RLS policies

  1. Changes
    - Update RLS policies for profiles table to allow proper creation and updates
    - Add missing policy for INSERT operations
    - Fix UPDATE policy to work with upsert operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new comprehensive policies
CREATE POLICY "Users can manage own profile" ON profiles
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add index for performance
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON profiles(user_id);