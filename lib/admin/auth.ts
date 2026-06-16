const fallbackAdminEmails = [
  "akshadgupta848@gmail.com",
  "akshadgupta72@gmail.com",
  "manishkachru@gmail.com"
];

export function getAdminEmails() {
  const configuredEmails = (
    process.env.ADMIN_EMAILS ??
    process.env.ADMIN_EMAIL ??
    process.env.NEXT_PUBLIC_ADMIN_EMAILS ??
    process.env.NEXT_PUBLIC_ADMIN_EMAIL ??
    ""
  )
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return Array.from(new Set([...configuredEmails, ...fallbackAdminEmails]));
}

export function isAdminEmail(email?: string | null) {
  const adminEmails = getAdminEmails();

  if (!email) return false;

  return adminEmails.includes(email.toLowerCase());
}
