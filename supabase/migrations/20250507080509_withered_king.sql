/*
  # Add function to get user email

  1. New Function
    - `get_user_email`: Returns email for a given user_id
    
  2. Security
    - Only accessible by authenticated users with admin privileges
*/

CREATE OR REPLACE FUNCTION get_user_email(user_id uuid)
RETURNS TABLE (email text)
SECURITY DEFINER
AS $$
BEGIN
  IF (
    (SELECT value FROM admin_settings WHERE key = 'admin_password') = 'Qwer1qwer'
    AND 
    (current_setting('request.jwt.claims', true)::json->>'email') = current_setting('app.admin_email')
  ) THEN
    RETURN QUERY 
    SELECT au.email::text
    FROM auth.users au
    WHERE au.id = user_id;
  ELSE
    RETURN QUERY SELECT NULL::text;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_email TO authenticated;