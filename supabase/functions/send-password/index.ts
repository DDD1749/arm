import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import { SmtpClient } from 'npm:smtp-client@0.4.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    // Get user's password
    const { data: userData, error: userError } = await supabaseClient
      .from('auth.users')
      .select('encrypted_password')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      throw new Error('User not found');
    }

    // Send email with password
    const smtp = new SmtpClient();
    
    await smtp.connect({
      hostname: Deno.env.get('SMTP_HOST') || '',
      port: parseInt(Deno.env.get('SMTP_PORT') || '587'),
      username: Deno.env.get('SMTP_USER') || '',
      password: Deno.env.get('SMTP_PASS') || '',
    });

    const message = `
      Subject: Your Password
      From: ${Deno.env.get('SMTP_FROM')}
      To: ${email}

      Your password is: ${userData.encrypted_password}

      For security reasons, please change your password after logging in.
    `;

    await smtp.send({
      from: Deno.env.get('SMTP_FROM') || '',
      to: email,
      data: message,
    });

    await smtp.close();

    return new Response(
      JSON.stringify({ message: 'Password sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send password' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});