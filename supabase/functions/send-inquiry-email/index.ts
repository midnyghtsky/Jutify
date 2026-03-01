import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const RECIPIENT_EMAIL = "bagsjutify@gmail.com";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate the caller
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ success: false, error: 'Authentication required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid authentication' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { inquiry } = await req.json();
    const { name, email, phone, message, items } = inquiry;

    // Server-side input validation
    if (!name || typeof name !== 'string' || name.length > 100) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid name' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!email || typeof email !== 'string' || email.length > 255) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid email' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid items' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const sanitize = (str: string) => str.replace(/[<>&"']/g, (c) => 
      ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c] || c)
    );

    const itemRows = items
      .map((item: { name: string; bag_id: string; quantity: number }) =>
        `<tr>
          <td style="padding:8px;border:1px solid #ddd;">${sanitize(String(item.name))}</td>
          <td style="padding:8px;border:1px solid #ddd;">${sanitize(String(item.bag_id))}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:center;">${Number(item.quantity) || 0}</td>
        </tr>`
      )
      .join('');

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safePhone = phone ? sanitize(String(phone)) : '';
    const safeMessage = message ? sanitize(String(message)) : '';

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#2d6a4f;">New Order Inquiry from Jutify Bags</h2>
        <hr style="border-color:#ddd;">
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
        ${safeMessage ? `<p><strong>Message:</strong> ${safeMessage}</p>` : ''}
        <h3>Requested Items</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#2d6a4f;color:white;">
              <th style="padding:8px;border:1px solid #ddd;">Product</th>
              <th style="padding:8px;border:1px solid #ddd;">ID</th>
              <th style="padding:8px;border:1px solid #ddd;">Qty</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>
        <hr style="border-color:#ddd;margin-top:20px;">
        <p style="color:#666;font-size:12px;">You can reply directly to this email to respond to the customer at ${safeEmail}.</p>
      </div>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Jutify Bags <onboarding@resend.dev>',
        to: [RECIPIENT_EMAIL],
        reply_to: email,
        subject: `New Order Inquiry from ${safeName}`,
        html: htmlBody,
      }),
    });

    const resendData = await resendRes.json();
    if (!resendRes.ok) {
      throw new Error(`Resend API error [${resendRes.status}]: ${JSON.stringify(resendData)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error sending inquiry email:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
