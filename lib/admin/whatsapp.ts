const defaultMessage = `Hi! Thank you for reaching out to Looks By Manish Kachru ✨

We would love to know more about your event requirements, preferred makeup style, event date, and budget range.

Our team will guide you further regarding availability and pricing.`;

export function createWhatsAppUrl(phone: string, message = defaultMessage) {
  const cleanPhone = phone.replace(/\D/g, "").replace(/^91/, "");
  return `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;
}

