import Link from "next/link";

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "WhatsApp", href: "#" }
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
  { label: "Service Delivery", href: "/service-delivery-policy" }
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-8 px-5 py-8 font-sans lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-[12px] font-semibold uppercase tracking-[0.34em] text-black/72 sm:flex-row">
          <Link href="/" className="focus-ring text-black">
            LOOKS BY MANISH KACHRU
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {socialLinks.map((link) => (
              <a key={link.label} className="focus-ring transition-opacity hover:opacity-60" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-5 text-center text-[11px] uppercase tracking-[0.18em] text-black/50 sm:flex-row sm:text-left">
          <p>© {year} Looks By Manish Kachru. All rights reserved.</p>
          <nav aria-label="Footer policies" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {policyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="focus-ring transition-colors hover:text-black">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
