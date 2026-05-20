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
};

function getSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
    notes: readNullableString(formData, "notes")
  };

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
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-booking-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      },
      body: JSON.stringify(payload)
    }).catch(() => undefined);

    return NextResponse.json({
      ok: true,
      message: "Your request has been received. Our team will contact you within 24 hours."
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Could not submit request." },
      { status: 500 }
    );
  }
}
