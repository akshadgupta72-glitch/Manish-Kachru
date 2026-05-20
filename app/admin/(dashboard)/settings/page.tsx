export default function AdminSettingsPage() {
  return (
    <div className="mx-auto w-full max-w-[1040px] space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d8ae64]">Studio Preferences</p>
        <h1 className="mt-3 text-[44px] font-semibold uppercase leading-none tracking-[-0.055em] sm:text-[56px]">
          Settings
        </h1>
      </header>

      <section className="grid gap-4">
        {[
          {
            title: "Admin Profile",
            description: "Manage the primary admin identity, profile email, and private studio access list."
          },
          {
            title: "Change Password",
            description: "Use Supabase Auth password reset flows for secure credential changes."
          },
          {
            title: "WhatsApp Default Message",
            description:
              "Hi! Thank you for reaching out to Looks By Manish Kachru ✨ We would love to know more about your event requirements, preferred makeup style, event date, and budget range."
          },
          {
            title: "Business Contact Details",
            description: "Add official phone, city, email, Instagram, and support contact details for team workflow."
          },
          {
            title: "Future Integrations",
            description: "Razorpay payments, invoice PDF generation, xlsx exports, and automated email journeys."
          }
        ].map((item) => (
          <article key={item.title} className="rounded-[22px] border border-black/10 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.04)]">
            <h2 className="text-[26px] font-semibold leading-none tracking-[-0.05em]">{item.title}</h2>
            <p className="mt-4 max-w-[780px] text-sm leading-6 text-black/50">{item.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

