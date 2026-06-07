import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

type BookingPayload = {
  service_slug: string;
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

function getSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE ||
    process.env.service_role;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing Supabase server environment variables.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") return "";
  return value.trim();
}

function readNullableString(formData: FormData, key: string) {
  const value = readString(formData, key);
  return value.length > 0 ? value : null;
}

function readNullableNumber(formData: FormData, key: string) {
  const value = readString(formData, key);
  if (!value) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function appendPaymentNotes(payload: BookingPayload) {
  const paymentLines = [
    payload.payment_status ? `Payment status: ${payload.payment_status}` : "",
    payload.payment_plan ? `Payment plan: ${payload.payment_plan}` : "",
    payload.payment_amount ? `Payment amount: ₹${(payload.payment_amount / 100).toLocaleString("en-IN")}` : "",
    payload.razorpay_payment_id ? `Razorpay payment ID: ${payload.razorpay_payment_id}` : "",
    payload.razorpay_order_id ? `Razorpay order ID: ${payload.razorpay_order_id}` : ""
  ].filter(Boolean);

  if (paymentLines.length === 0) return payload.notes;

  return [payload.notes, "Payment details:", ...paymentLines].filter(Boolean).join("\n");
}

function getServiceRoleKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE ||
    process.env.service_role ||
    ""
  );
}

function getBookingEmailFunctionUrl() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const functionName = process.env.SUPABASE_BOOKING_EMAIL_FUNCTION || "Send-email";

  if (!supabaseUrl) return null;

  return `${supabaseUrl}/functions/v1/${functionName}`;
}

async function sendBookingEmail(payload: BookingPayload) {
  const emailFunctionUrl = getBookingEmailFunctionUrl();

  if (!emailFunctionUrl) {
    console.error("Booking email skipped: missing NEXT_PUBLIC_SUPABASE_URL.");
    return false;
  }

  try {
    const response = await fetch(emailFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getServiceRoleKey()}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Booking email function failed", {
        status: response.status,
        body: errorBody
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error("Booking email function request failed", error);
    return false;
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const payload: BookingPayload = {
    service_slug: readString(formData, "service_slug"),
    service_title: readString(formData, "service_title"),
    name: readString(formData, "name"),
    phone: readString(formData, "phone"),
    email: readString(formData, "email"),
    event_date: readNullableString(formData, "date"),
    location: readNullableString(formData, "location"),
    functions: formData
      .getAll("functions")
      .filter((value): value is string => typeof value === "string")
      .map((value) => value.trim())
      .filter(Boolean),
    notes: readNullableString(formData, "notes"),
    payment_status: readNullableString(formData, "payment_status"),
    payment_amount: readNullableNumber(formData, "payment_amount"),
    payment_currency: readNullableString(formData, "payment_currency"),
    payment_plan: readNullableString(formData, "payment_plan"),
    razorpay_payment_id: readNullableString(formData, "razorpay_payment_id"),
    razorpay_order_id: readNullableString(formData, "razorpay_order_id")
  };
  payload.notes = appendPaymentNotes(payload);

  if (!payload.name || !payload.phone || !payload.email || !payload.service_slug) {
    return NextResponse.json(
      { ok: false, message: "Please add your name, phone number, and email address." },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("booking_requests").insert(payload);

    if (error) {
      const shouldRetryWithoutNewColumns =
        error.message.includes("payment_") || error.message.includes("razorpay_");

      if (!shouldRetryWithoutNewColumns) {
        return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
      }

      const fallbackPayload = {
        service_slug: payload.service_slug,
        service_title: payload.service_title,
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        event_date: payload.event_date,
        location: payload.location,
        functions: payload.functions,
        notes: payload.notes
      };
      const { error: fallbackError } = await supabase.from("booking_requests").insert(fallbackPayload);

      if (fallbackError) {
        return NextResponse.json({ ok: false, message: fallbackError.message }, { status: 500 });
      }
    }

    const emailSent = await sendBookingEmail(payload);

    return NextResponse.json({
      ok: true,
      email_sent: emailSent,
      message: "Your request has been received. Our team will contact you within 24 hours."
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Could not submit request." },
      { status: 500 }
    );
  }
}
