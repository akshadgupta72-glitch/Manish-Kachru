import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const keyId =
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() || process.env.RAZORPAY_KEY_ID?.trim();

  if (!keyId) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Missing Razorpay public key. Add NEXT_PUBLIC_RAZORPAY_KEY_ID or RAZORPAY_KEY_ID in Vercel Production environment variables."
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      keyId
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
