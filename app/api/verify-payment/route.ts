import crypto from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type VerifyPaymentBody = {
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};

export async function POST(request: Request) {
  let body: VerifyPaymentBody;

  try {
    body = (await request.json()) as VerifyPaymentBody;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return NextResponse.json(
      { ok: false, message: "Missing Razorpay payment verification fields." },
      { status: 400 }
    );
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

  if (!keySecret) {
    return NextResponse.json(
      { ok: false, message: "Missing Razorpay server environment variables." },
      { status: 500 }
    );
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const expected = Buffer.from(expectedSignature);
  const received = Buffer.from(razorpay_signature);
  const isValid =
    expected.length === received.length && crypto.timingSafeEqual(expected, received);

  if (!isValid) {
    return NextResponse.json(
      { ok: false, message: "Payment signature mismatch." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Payment verified successfully."
  });
}
