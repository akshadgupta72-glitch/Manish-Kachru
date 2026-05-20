import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { BookingLeadCard } from "@/components/admin/BookingLeadCard";
import { getAdminBookings, masterclassStudents, revenueSummary } from "@/lib/admin/data";

export default async function AdminPage() {
  const bookings = await getAdminBookings(6);
  const newBookings = bookings.filter((booking) => booking.status === "new");

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-8">
      <section className="overflow-hidden rounded-[28px] bg-black p-6 text-white shadow-[0_30px_100px_rgba(0,0,0,0.2)] sm:p-8 lg:p-10">
        <div className="max-w-[760px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#d8ae64]">Luxury Studio Control</p>
          <h1 className="mt-5 text-[46px] font-semibold leading-[0.92] tracking-[-0.065em] sm:text-[64px] lg:text-[76px]">
            Looks By Manish Kachru Admin
          </h1>
          <p className="mt-6 max-w-[560px] text-base leading-7 text-white/56">
            Manage bookings, masterclasses, clients, and revenue.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="New leads" value={String(newBookings.length)} detail="Fresh booking requests waiting for reply." icon="sparkles" tone="gold" />
        <AdminStatCard label="Total bookings" value={String(bookings.length)} detail="Latest requests currently in the private inbox." icon="calendarCheck" />
        <AdminStatCard label="Students" value={String(masterclassStudents.length)} detail="Weekly masterclass sample roster." icon="users" />
        <AdminStatCard label="Weekly revenue" value={revenueSummary.weekly} detail="Projected studio revenue overview." icon="indianRupee" tone="dark" />
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="size-3 animate-pulse rounded-full bg-[#d8ae64] shadow-[0_0_0_10px_rgba(216,174,100,0.16)]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d8ae64]">Live Inbox</p>
            </div>
            <h2 className="mt-3 text-[38px] font-semibold uppercase leading-none tracking-[-0.055em] sm:text-[48px]">
              New Booking Requests
            </h2>
          </div>
          <p className="max-w-[360px] text-sm leading-6 text-black/45">
            Treat this like incoming studio DMs: newest enquiries first, quick WhatsApp action, and fast status control.
          </p>
        </div>

        {bookings.length > 0 ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {bookings.map((booking) => (
              <BookingLeadCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-black/10 bg-white p-12 text-center">
            <p className="text-[28px] font-semibold tracking-[-0.05em]">No booking requests yet</p>
            <p className="mt-3 text-sm text-black/45">When a client submits the website form, the request will appear here.</p>
          </div>
        )}
      </section>
    </div>
  );
}
