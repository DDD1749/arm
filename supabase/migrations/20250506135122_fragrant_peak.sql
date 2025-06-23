/*
  # Update users table RLS policies

  1. Security Changes
    - Add RLS policy for users to create their own records
    - Add RLS policy for users to read their own records
*/

-- Enable RLS on users table if not already enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to insert their own records
CREATE POLICY "Users can create their own record"
ON users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Create policy for users to read their own records
CREATE POLICY "Users can read their own record"
ON users
FOR SELECT
TO authenticated
USING (auth.uid() = id);