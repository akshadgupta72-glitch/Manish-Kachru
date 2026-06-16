import { NextResponse } from "next/server";
import { readRazorpayKeyId, readRazorpayKeySecret } from "@/lib/razorpay-env";

export const runtime = "nodejs";

type CreateOrderBody = {
  amount?: number;
  currency?: string;
  receipt?: string;
};

function getRazorpayCredentials() {
  const keyId = readRazorpayKeyId();
  const keySecret = readRazorpayKeySecret();

  if (!keyId || !keySecret) {
    throw new Error(
      "Missing Razorpay environment variables. Add Razorpay_Live_API_Key and Razorpay_Live_Key_Secret in Vercel."
    );
  }

  return { keyId, keySecret };
}

export async function POST(request: Request) {
  let body: CreateOrderBody;

  try {
    body = (await request.json()) as CreateOrderBody;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const amount = Number(body.amount);
  const currency = body.currency || "INR";
  const receipt = body.receipt || `receipt_${Date.now()}`;

  if (!Number.isInteger(amount) || amount < 100) {
    return NextResponse.json(
      { ok: false, message: "Amount must be at least 100 paise." },
      { status: 400 }
    );
  }

  try {
    const { keyId, keySecret } = getRazorpayCredentials();
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt
      })
    });

    const data = (await response.json()) as {
      id?: string;
      amount?: number;
      currency?: string;
      error?: { description?: string };
    };

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, message: data.error?.description || "Could not create Razorpay order." },
        { status: response.status === 401 ? 401 : 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      order_id: data.id,
      amount: data.amount,
      currency: data.currency
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Could not create order." },
      { status: 500 }
    );
  }
}
