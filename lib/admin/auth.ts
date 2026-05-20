export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null) {
  const adminEmails = getAdminEmails();

  if (!email) return false;

  // Development fallback: when ADMIN_EMAILS is not configured, any authenticated
  // Supabase user can enter admin. Set ADMIN_EMAILS before production deployment.
  if (adminEmails.length === 0) return true;

  return adminEmails.includes(email.toLowerCase());
}

