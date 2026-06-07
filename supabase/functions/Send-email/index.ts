type BookingEmailPayload = {
  service_slug?: string;
  service_title: string;
  name: string;
  phone: string;
  email: string;
  event_date: string | null;
  location: string | null;
  functions: string[];
  notes: string | null;
  payment_status?: string | null;
  payment_amount?: number | null;
  payment_currency?: string | null;
  payment_plan?: string | null;
  razorpay_payment_id?: string | null;
  razorpay_order_id?: string | null;
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

function rupees(amount?: number | null) {
  if (!amount) return "Not applicable";
  return `₹${(amount / 100).toLocaleString("en-IN")}`;
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
  const ownerEmail = Deno.env.get("BUSINESS_OWNER_EMAIL") || "manishkachru@gmail.com";
  const crmUrl = Deno.env.get("CRM_URL") || "https://www.looksbymanishkachru.com/admin/bookings";

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
  const safeFunctions =
    payload.functions?.length > 0 ? payload.functions.map(escapeHtml).join(", ") : "Not specified";
  const safeDate = payload.event_date ? escapeHtml(payload.event_date) : "Not specified";
  const safeLocation = payload.location ? escapeHtml(payload.location) : "Not specified";
  const safePhone = escapeHtml(payload.phone);
  const safeNotes = payload.notes ? escapeHtml(payload.notes) : "Not added";
  const safePaymentStatus = payload.payment_status ? escapeHtml(payload.payment_status) : "Not required";
  const safePaymentPlan = payload.payment_plan ? escapeHtml(payload.payment_plan) : "Not specified";
  const safePaymentAmount = escapeHtml(rupees(payload.payment_amount));
  const safePaymentId = payload.razorpay_payment_id ? escapeHtml(payload.razorpay_payment_id) : "Not applicable";
  const safeOrderId = payload.razorpay_order_id ? escapeHtml(payload.razorpay_order_id) : "Not applicable";
  const safeCrmUrl = escapeHtml(crmUrl);

  const detailsBlock = `
    <div style="border: 1px solid #e7e1d8; padding: 18px; margin: 24px 0;">
      <p><strong>Service:</strong> ${safeService}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Date:</strong> ${safeDate}</p>
      <p><strong>Location:</strong> ${safeLocation}</p>
      <p><strong>Functions:</strong> ${safeFunctions}</p>
      <p><strong>Payment:</strong> ${safePaymentStatus}</p>
      <p><strong>Plan:</strong> ${safePaymentPlan}</p>
      <p><strong>Amount:</strong> ${safePaymentAmount}</p>
      <p><strong>Razorpay Payment ID:</strong> ${safePaymentId}</p>
      <p><strong>Razorpay Order ID:</strong> ${safeOrderId}</p>
      <p><strong>Notes:</strong> ${safeNotes}</p>
    </div>
  `;

  const customerHtml = `
    <div style="font-family: Inter, Arial, sans-serif; color: #111; line-height: 1.6;">
      <p style="text-transform: uppercase; letter-spacing: 0.24em; font-size: 11px; color: #9f7c50;">Looks by Manish Kachru</p>
      <h1 style="font-size: 30px; line-height: 1.1; margin: 12px 0 18px;">Your request has been received.</h1>
      <p>Hi ${safeName},</p>
      <p>Thank you for sharing your requirements for <strong>${safeService}</strong>. We have received your request and our studio team will review the details carefully.</p>
      <p>You can expect a reply within 24 hours with availability, next steps, and guidance tailored to your occasion.</p>
      ${detailsBlock}
      <p style="color: #666;">Warmly,<br />Looks by Manish Kachru</p>
    </div>
  `;

  const ownerHtml = `
    <div style="font-family: Inter, Arial, sans-serif; color: #111; line-height: 1.6;">
      <p style="text-transform: uppercase; letter-spacing: 0.24em; font-size: 11px; color: #9f7c50;">New CRM Lead</p>
      <h1 style="font-size: 30px; line-height: 1.1; margin: 12px 0 18px;">New client quotation request</h1>
      <p><strong>${safeName}</strong> submitted a new ${safeService} request.</p>
      ${detailsBlock}
      <p>
        <a href="${safeCrmUrl}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;">Open CRM</a>
      </p>
    </div>
  `;

  const customerResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: payload.email,
      subject: `We received your ${payload.service_title} request`,
      html: customerHtml
    })
  });

  if (!customerResponse.ok) {
    const error = await customerResponse.text();
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  const ownerResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: ownerEmail,
      subject: `New ${payload.service_title} lead - ${payload.name}`,
      html: ownerHtml
    })
  });

  if (!ownerResponse.ok) {
    const error = await ownerResponse.text();
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
});
