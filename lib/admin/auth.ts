export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null) {
  const adminEmails = getAdminEmails();

  if (!email) return false;

  // Production-safe default: no configured admin emails means no admin access.
  // Set ADMIN_EMAILS in Vercel before deploying the CRM.
  if (adminEmails.length === 0) return false;

  return adminEmails.includes(email.toLowerCase());
}
