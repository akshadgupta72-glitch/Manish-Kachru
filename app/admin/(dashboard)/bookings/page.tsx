import { BookingsTable } from "@/components/admin/BookingsTable";
import { getAdminBookings } from "@/lib/admin/data";

export default async function AdminBookingsPage() {
  const bookings = await getAdminBookings();

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d8ae64]">Client Enquiries</p>
        <h1 className="mt-3 text-[44px] font-semibold uppercase leading-none tracking-[-0.055em] sm:text-[56px]">
          Bookings Management
        </h1>
        <p className="mt-4 max-w-[620px] text-sm leading-6 text-black/48">
          Search, sort, contact, archive, and export all booking requests from the website.
        </p>
      </header>
      <BookingsTable bookings={bookings} />
    </div>
  );
}

