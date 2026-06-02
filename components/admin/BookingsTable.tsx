"use client";

import { createWhatsAppUrl } from "@/lib/admin/whatsapp";
import type { AdminBooking, AdminStatus } from "@/types/admin";
import { AnimatePresence, motion } from "framer-motion";
import { Download, MessageCircle, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

type BookingsTableProps = {
  bookings: AdminBooking[];
};

const statuses: AdminStatus[] = ["new", "contacted", "confirmed", "closed"];

function formatDate(value: string | null) {
  if (!value) return "Not shared";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function formatPaymentAmount(amount: number | null, currency: string | null) {
  if (!amount) return "Not applicable";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0
  }).format(amount / 100);
}

function toCsv(bookings: AdminBooking[]) {
  const headers = [
    "Name",
    "Phone",
    "Email",
    "Service",
    "Event Date",
    "Location",
    "Budget",
    "Payment Status",
    "Payment Plan",
    "Payment Amount",
    "Razorpay Payment ID",
    "Razorpay Order ID",
    "Status",
    "Notes",
    "Submission Date"
  ];
  const rows = bookings.map((booking) => [
    booking.name,
    booking.phone,
    booking.email,
    booking.service,
    booking.eventDate ?? "",
    booking.location ?? "",
    booking.budget,
    booking.paymentStatus,
    booking.paymentPlan ?? "",
    formatPaymentAmount(booking.paymentAmount, booking.paymentCurrency),
    booking.razorpayPaymentId ?? "",
    booking.razorpayOrderId ?? "",
    booking.status,
    booking.notes ?? "",
    booking.submittedAt
  ]);

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
}

async function patchStatus(id: string, status: AdminStatus) {
  await fetch(`/api/admin/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
}

async function deleteBooking(id: string) {
  await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
}

export function BookingsTable({ bookings }: BookingsTableProps) {
  const [rows, setRows] = useState(bookings);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<AdminStatus | "all">("all");
  const [selected, setSelected] = useState<AdminBooking | null>(null);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return rows.filter((booking) => {
      const matchesStatus = status === "all" || booking.status === status;
      const matchesQuery =
        !normalizedQuery ||
        [booking.name, booking.phone, booking.email, booking.service, booking.location ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [query, rows, status]);

  function exportCsv() {
    const blob = new Blob([toCsv(filteredRows)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "looks-by-manish-bookings.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function handleStatus(id: string, nextStatus: AdminStatus) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status: nextStatus } : row)));
    await patchStatus(id, nextStatus);
  }

  async function handleDelete(id: string) {
    setRows((current) => current.filter((row) => row.id !== id));
    setSelected(null);
    await deleteBooking(id);
  }

  return (
    <div className="rounded-[24px] border border-black/10 bg-white p-4 shadow-[0_24px_80px_rgba(0,0,0,0.05)] sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-black/35" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, service, city, phone..."
            className="h-12 w-full rounded-full border border-black/10 bg-[#f8f5f1] pl-11 pr-4 text-sm outline-none transition-colors focus:border-black/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setStatus("all")}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${status === "all" ? "bg-black text-white" : "border border-black/10 text-black/60 hover:bg-black hover:text-white"}`}
          >
            All
          </button>
          {statuses.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={`rounded-full px-4 py-2 text-sm capitalize transition-colors ${status === item ? "bg-black text-white" : "border border-black/10 text-black/60 hover:bg-black hover:text-white"}`}
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-black transition-colors hover:border-[#d8ae64] hover:bg-[#f7f0e2]"
          >
            <Download className="size-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="text-[11px] uppercase tracking-[0.22em] text-black/38">
            <tr className="border-b border-black/10">
              <th className="py-4 font-semibold">Name</th>
              <th className="py-4 font-semibold">Phone</th>
              <th className="py-4 font-semibold">Service</th>
              <th className="py-4 font-semibold">Event Date</th>
              <th className="py-4 font-semibold">Location</th>
              <th className="py-4 font-semibold">Budget</th>
              <th className="py-4 font-semibold">Status</th>
              <th className="py-4 font-semibold">Submission</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((booking) => (
              <tr
                key={booking.id}
                onClick={() => setSelected(booking)}
                className="cursor-pointer border-b border-black/[0.06] transition-colors hover:bg-[#f8f5f1]"
              >
                <td className="py-4 font-medium text-black">{booking.name}</td>
                <td className="py-4 text-black/55">{booking.phone}</td>
                <td className="py-4 text-black/68">{booking.service}</td>
                <td className="py-4 text-black/55">{formatDate(booking.eventDate)}</td>
                <td className="py-4 text-black/55">{booking.location}</td>
                <td className="py-4 text-black/55">{booking.budget}</td>
                <td className="py-4">
                  <select
                    value={booking.status}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => handleStatus(booking.id, event.target.value as AdminStatus)}
                    className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs capitalize outline-none"
                  >
                    {statuses.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 text-black/55">{formatDate(booking.submittedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRows.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg font-medium tracking-[-0.03em]">No bookings found</p>
          <p className="mt-2 text-sm text-black/45">New client enquiries will appear here as soon as they arrive.</p>
        </div>
      ) : null}

      <AnimatePresence>
        {selected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/45 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.aside
              initial={{ x: 420 }}
              animate={{ x: 0 }}
              exit={{ x: 420 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="ml-auto flex h-full w-full max-w-[440px] flex-col rounded-[24px] bg-white p-6 shadow-[0_30px_120px_rgba(0,0,0,0.32)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#d8ae64]">Booking Details</p>
                  <h2 className="mt-4 text-[34px] font-semibold leading-none tracking-[-0.06em]">{selected.name}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="grid size-10 place-items-center rounded-full border border-black/10"
                  aria-label="Close booking details"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-8 space-y-4 text-sm">
                {[
                  ["Phone", selected.phone],
                  ["Email", selected.email],
                  ["Service", selected.service],
                  ["Event Date", formatDate(selected.eventDate)],
                  ["Location", selected.location ?? "Not shared"],
                  ["Budget", selected.budget],
                  ["Payment Status", selected.paymentStatus],
                  ["Payment Plan", selected.paymentPlan ?? "Not applicable"],
                  ["Payment Amount", formatPaymentAmount(selected.paymentAmount, selected.paymentCurrency)],
                  ["Razorpay Payment ID", selected.razorpayPaymentId ?? "Not applicable"],
                  ["Razorpay Order ID", selected.razorpayOrderId ?? "Not applicable"],
                  ["Submission Date", formatDate(selected.submittedAt)],
                  ["Functions", selected.functions.join(", ") || "Not shared"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[14px] border border-black/10 p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-black/35">{label}</p>
                    <p className="mt-2 text-black/72">{value}</p>
                  </div>
                ))}
                <div className="rounded-[14px] border border-black/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-black/35">Notes</p>
                  <p className="mt-2 leading-6 text-black/72">{selected.notes || "No notes shared."}</p>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                <a
                  href={createWhatsAppUrl(selected.phone)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-sm text-white"
                >
                  WhatsApp <MessageCircle className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(selected.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-red-300 px-4 py-3 text-sm text-red-600"
                >
                  Delete <Trash2 className="size-4" />
                </button>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
