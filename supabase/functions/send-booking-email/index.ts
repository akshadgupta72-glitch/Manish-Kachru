type BookingEmailPayload = {
  service_title: string;
  name: string;
  phone: string;
  email: string;
  event_date: string | null;
  location: string | null;
  functions: string[];
  notes: string | null;
};

declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("BOOKING_EMAIL_FROM");

  if (!resendApiKey || !from) {
    return new Response(JSON.stringify({ error: "Missing email environment variables" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const payload = (await request.json()) as BookingEmailPayload;

  if (!payload.email || !payload.name) {
    return new Response(JSON.stringify({ error: "Missing recipient details" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const safeName = escapeHtml(payload.name);
  const safeService = escapeHtml(payload.service_title);
  const safeFunctions = payload.functions.length > 0 ? payload.functions.map(escapeHtml).join(", ") : "Not specified";
  const safeDate = payload.event_date ? escapeHtml(payload.event_date) : "Not specified";
  const safeLocation = payload.location ? escapeHtml(payload.location) : "Not specified";
  const safePhone = escapeHtml(payload.phone);
  const safeNotes = payload.notes ? escapeHtml(payload.notes) : "Not added";

  const html = `
    <div style="font-family: Inter, Arial, sans-serif; color: #111; line-height: 1.6;">
      <p style="text-transform: uppercase; letter-spacing: 0.24em; font-size: 11px; color: #9f7c50;">Looks by Manish Kachru</p>
      <h1 style="font-size: 30px; line-height: 1.1; margin: 12px 0 18px;">Your request has been received.</h1>
      <p>Hi ${safeName},</p>
      <p>Thank you for reaching out for <strong>${safeService}</strong>. Our team will contact you within 24 hours.</p>
      <div style="border: 1px solid #e7e1d8; padding: 18px; margin: 24px 0;">
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Date:</strong> ${safeDate}</p>
        <p><strong>Location:</strong> ${safeLocation}</p>
        <p><strong>Functions:</strong> ${safeFunctions}</p>
        <p><strong>Notes:</strong> ${safeNotes}</p>
      </div>
      <p style="color: #666;">Warmly,<br />Looks by Manish Kachru</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: payload.email,
      subject: `We received your ${payload.service_title} request`,
      html
    })
  });

  if (!response.ok) {
    const error = await response.text();
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
});
