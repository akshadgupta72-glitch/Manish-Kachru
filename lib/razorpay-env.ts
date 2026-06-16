export function readRazorpayKeyId() {
  return (
    process.env.Razorpay_Live_API_Key?.trim() ||
    process.env.RAZORPAY_KEY_ID?.trim() ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim()
  );
}

export function readRazorpayPublicKeyId() {
  return (
    process.env.Razorpay_Live_API_Key?.trim() ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() ||
    process.env.RAZORPAY_KEY_ID?.trim()
  );
}

export function readRazorpayKeySecret() {
  return (
    process.env.Razorpay_Live_Key_Secret?.trim() ||
    process.env.RAZORPAY_KEY_SECRET?.trim()
  );
}
