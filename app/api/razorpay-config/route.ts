import { NextResponse } from "next/server";
import { readRazorpayPublicKeyId } from "@/lib/razorpay-env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const keyId = readRazorpayPublicKeyId();

  if (!keyId) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Missing Razorpay public key. Add Razorpay_Live_API_Key or NEXT_PUBLIC_RAZORPAY_KEY_ID in Vercel Production environment variables."
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
