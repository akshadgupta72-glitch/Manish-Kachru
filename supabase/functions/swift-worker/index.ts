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

function leadLabel(payload: BookingEmailPayload) {
  const service = `${payload.service_slug || ""} ${payload.service_title || ""}`.toLowerCase();

  if (service.includes("masterclass")) return "weekly masterclass enrollment";
  if (service.includes("consultation")) return "beauty consultation request";
  return "makeup quotation request";
}

async function sendEmail({
  resendApiKey,
  from,
  to,
  subject,
  html
}: {
  resendApiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
}) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html
    })
  });
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
  const safeEmail = escapeHtml(payload.email);
  const safeService = escapeHtml(payload.service_title);
  const safeLeadLabel = escapeHtml(leadLabel(payload));
  const safeFunctions =
    payload.functions?.length > 0 ? payload.functions.map(escapeHtml).join(", ") : "Not specified";
  const safeDate = payload.event_date ? escapeHtml(payload.event_date) : "Not specified";
  const safeLocation = payload.location ? escapeHtml(payload.location) : "Not specified";
  const safePhone = escapeHtml(payload.phone || "Not specified");
  const safeNotes = payload.notes ? escapeHtml(payload.notes) : "Not added";
  const safePaymentStatus = payload.payment_status ? escapeHtml(payload.payment_status) : "Not required";
  const safePaymentPlan = payload.payment_plan ? escapeHtml(payload.payment_plan) : "Not specified";
  const safePaymentAmount = escapeHtml(rupees(payload.payment_amount));
  const safePaymentId = payload.razorpay_payment_id ? escapeHtml(payload.razorpay_payment_id) : "Not applicable";
  const safeOrderId = payload.razorpay_order_id ? escapeHtml(payload.razorpay_order_id) : "Not applicable";
  const safeCrmUrl = escapeHtml(crmUrl);

  const customerDetailsBlock = `
    <div style="border:1px solid #e7e1d8; padding:18px; margin:24px 0; border-radius:14px; background:#fffaf5;">
      <p><strong>Service:</strong> ${safeService}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Date:</strong> ${safeDate}</p>
      <p><strong>Location:</strong> ${safeLocation}</p>
      <p><strong>Occasion / Function:</strong> ${safeFunctions}</p>
      <p><strong>Notes:</strong> ${safeNotes}</p>
    </div>
  `;

  const ownerDetailsBlock = `
    <div style="border:1px solid #e7e1d8; padding:18px; margin:24px 0; border-radius:14px; background:#fffaf5;">
      <p><strong>Lead type:</strong> ${safeLeadLabel}</p>
      <p><strong>Service:</strong> ${safeService}</p>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Date:</strong> ${safeDate}</p>
      <p><strong>Location:</strong> ${safeLocation}</p>
      <p><strong>Occasion / Function:</strong> ${safeFunctions}</p>
      <p><strong>Notes:</strong> ${safeNotes}</p>
      <p><strong>Payment status:</strong> ${safePaymentStatus}</p>
      <p><strong>Payment plan:</strong> ${safePaymentPlan}</p>
      <p><strong>Payment amount:</strong> ${safePaymentAmount}</p>
      <p><strong>Razorpay payment ID:</strong> ${safePaymentId}</p>
      <p><strong>Razorpay order ID:</strong> ${safeOrderId}</p>
    </div>
  `;

  const customerHtml = `
    <div style="font-family:Inter, Arial, sans-serif; color:#111; line-height:1.6; max-width:640px; margin:0 auto;">
      <p style="text-transform:uppercase; letter-spacing:0.24em; font-size:11px; color:#9f7c50;">Looks by Manish Kachru</p>
      <h1 style="font-size:30px; line-height:1.1; margin:12px 0 18px;">Your request has been received.</h1>
      <p>Hi ${safeName},</p>
      <p>Thank you for sharing your requirements for <strong>${safeService}</strong>. We have received your details and our studio team will review them carefully.</p>
      <p>Our team will contact you within 24 hours with availability, next steps, and guidance tailored to your occasion.</p>
      ${customerDetailsBlock}
      <p style="color:#666;">Warmly,<br />Looks by Manish Kachru</p>
    </div>
  `;

  const ownerHtml = `
    <div style="font-family:Inter, Arial, sans-serif; color:#111; line-height:1.6; max-width:680px; margin:0 auto;">
      <p style="text-transform:uppercase; letter-spacing:0.24em; font-size:11px; color:#9f7c50;">New CRM Lead</p>
      <h1 style="font-size:30px; line-height:1.1; margin:12px 0 18px;">New ${safeLeadLabel}</h1>
      <p>Hi Manish,</p>
      <p><strong>${safeName}</strong> has submitted a new <strong>${safeService}</strong> enquiry. Review the client details below and open the CRM to update status, follow up, or archive the lead.</p>
      ${ownerDetailsBlock}
      <p>
        <a href="${safeCrmUrl}" style="display:inline-block; background:#111; color:#fff; text-decoration:none; padding:12px 18px; border-radius:999px;">Open CRM</a>
      </p>
    </div>
  `;

  const [customerResponse, ownerResponse] = await Promise.all([
    sendEmail({
      resendApiKey,
      from,
      to: payload.email,
      subject: `We received your ${payload.service_title} request`,
      html: customerHtml
    }),
    sendEmail({
      resendApiKey,
      from,
      to: ownerEmail,
      subject: `New ${leadLabel(payload)} - ${payload.name}`,
      html: ownerHtml
    })
  ]);

  if (!customerResponse.ok) {
    const error = await customerResponse.text();
    return new Response(JSON.stringify({ error: `Customer email failed: ${error}` }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  if (!ownerResponse.ok) {
    const error = await ownerResponse.text();
    return new Response(JSON.stringify({ error: `Owner email failed: ${error}` }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
});
