"use client";

import { createWhatsAppUrl } from "@/lib/admin/whatsapp";
import type { AdminBooking, AdminStatus } from "@/types/admin";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownAZ, ArrowDownUp, Download, Eye, Filter, MessageCircle, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

type BookingsTableProps = {
  bookings: AdminBooking[];
};

type SortMode = "newest" | "oldest" | "name-asc" | "event-asc" | "event-desc";
type ServiceFilter = "all" | "makeup" | "weekly-masterclasses" | "beauty-consultation";

const statuses: Array<AdminStatus | "all"> = ["all", "new", "contacted", "confirmed", "closed", "archived"];

function formatDate(value: string | null) {
  if (!value) return "Not shared";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function formatCompactDate(value: string | null) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(new Date(value));
}

function formatPaymentAmount(amount: number | null, currency: string | null) {
  if (!amount) return "Not applicable";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0
  }).format(amount / 100);
}

function serviceKind(booking: AdminBooking): ServiceFilter {
  if (booking.serviceSlug === "weekly-masterclasses") return "weekly-masterclasses";
  if (booking.serviceSlug === "beauty-consultation") return "beauty-consultation";
  return "makeup";
}

function serviceBadgeClasses(booking: AdminBooking) {
  const kind = serviceKind(booking);
  if (kind === "weekly-masterclasses") return "border-indigo-200 bg-indigo-50 text-indigo-700";
  if (kind === "beauty-consultation") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  return "border-[#ead8b8] bg-[#fff8ec] text-[#8a5f1c]";
}

function statusClasses(status: AdminStatus) {
  if (status === "new") return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (status === "contacted") return "bg-sky-50 text-sky-700 ring-sky-200";
  if (status === "confirmed") return "bg-black text-white ring-black";
  if (status === "closed") return "bg-zinc-100 text-zinc-600 ring-zinc-200";
  return "bg-stone-100 text-stone-500 ring-stone-200";
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
    "Viewed At",
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
    booking.viewedAt ?? "",
    booking.notes ?? "",
    booking.submittedAt
  ]);

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
}

async function patchBooking(id: string, body: { status?: AdminStatus; viewed_at?: string | null }) {
  await fetch(`/api/admin/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

async function deleteBooking(id: string) {
  await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
}

export function BookingsTable({ bookings }: BookingsTableProps) {
  const [rows, setRows] = useState(bookings);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<AdminStatus | "all">("all");
  const [service, setService] = useState<ServiceFilter>("all");
  const [date, setDate] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [sort, setSort] = useState<SortMode>("newest");
  const [selected, setSelected] = useState<AdminBooking | null>(null);

  const newLeads = useMemo(
    () => rows.filter((booking) => booking.status === "new" && !booking.viewedAt),
    [rows]
  );

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();
    const normalizedBudget = budget.trim().toLowerCase();

    const results = rows.filter((booking) => {
      const submitted = booking.submittedAt.slice(0, 10);
      const eventDate = booking.eventDate ?? "";
      const matchesStatus = status === "all" || booking.status === status;
      const matchesService = service === "all" || serviceKind(booking) === service;
      const matchesEventDate = !date || eventDate === date;
      const matchesSubmittedDate = !submittedDate || submitted === submittedDate;
      const matchesLocation = !normalizedLocation || (booking.location ?? "").toLowerCase().includes(normalizedLocation);
      const matchesBudget = !normalizedBudget || booking.budget.toLowerCase().includes(normalizedBudget);
      const matchesQuery =
        !normalizedQuery ||
        [booking.name, booking.phone, booking.email, booking.service, booking.location ?? "", booking.notes ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchesStatus &&
        matchesService &&
        matchesEventDate &&
        matchesSubmittedDate &&
        matchesLocation &&
        matchesBudget &&
        matchesQuery
      );
    });

    return results.sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "oldest") return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      if (sort === "event-asc") return new Date(a.eventDate || "2999-12-31").getTime() - new Date(b.eventDate || "2999-12-31").getTime();
      if (sort === "event-desc") return new Date(b.eventDate || "1900-01-01").getTime() - new Date(a.eventDate || "1900-01-01").getTime();
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });
  }, [budget, date, location, query, rows, service, sort, status, submittedDate]);

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
    if (selected?.id === id) setSelected({ ...selected, status: nextStatus });
    await patchBooking(id, { status: nextStatus });
  }

  async function handleOpen(booking: AdminBooking) {
    setSelected(booking.viewedAt ? booking : { ...booking, viewedAt: new Date().toISOString() });

    if (!booking.viewedAt) {
      const viewedAt = new Date().toISOString();
      setRows((current) => current.map((row) => (row.id === booking.id ? { ...row, viewedAt } : row)));
      await patchBooking(booking.id, { viewed_at: viewedAt });
    }
  }

  async function handleDelete(id: string) {
    setRows((current) => current.filter((row) => row.id !== id));
    setSelected(null);
    await deleteBooking(id);
  }

  return (
    <div className="space-y-4">
      <section className="rounded-[18px] border border-emerald-200 bg-emerald-50/90 p-4 shadow-[0_18px_60px_rgba(16,185,129,0.08)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-emerald-700">New leads to view</p>
            <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.04em] text-emerald-950">
              {newLeads.length} unseen {newLeads.length === 1 ? "lead" : "leads"}
            </h2>
          </div>
          <p className="max-w-[420px] text-xs leading-5 text-emerald-900/62">
            Opening a lead marks it as viewed and removes it from this green priority tray.
          </p>
        </div>
        {newLeads.length > 0 ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {newLeads.slice(0, 12).map((booking) => (
              <button
                key={booking.id}
                type="button"
                onClick={() => handleOpen(booking)}
                className="rounded-[14px] border border-emerald-200 bg-white p-3 text-left transition-transform hover:-translate-y-0.5"
              >
                <span className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${serviceBadgeClasses(booking)}`}>
                  {booking.service}
                </span>
                <p className="mt-3 truncate text-sm font-semibold text-black">{booking.name}</p>
                <p className="mt-1 truncate text-xs text-black/48">{booking.location || "No location"} · {formatCompactDate(booking.eventDate)}</p>
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <div className="rounded-[18px] border border-black/10 bg-white p-4 shadow-[0_18px_60px_rgba(0,0,0,0.04)]">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black/35" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, service, city, phone, notes..."
              className="h-10 w-full rounded-[12px] border border-black/10 bg-[#fbfaf8] pl-10 pr-3 text-[13px] outline-none transition-colors focus:border-black/30"
            />
          </div>
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[12px] border border-black/10 px-3 text-[12px] font-medium text-black transition-colors hover:border-[#d8ae64] hover:bg-[#f7f0e2]"
          >
            <Download className="size-4" /> Export CSV
          </button>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <label className="grid gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
            Status
            <select value={status} onChange={(event) => setStatus(event.target.value as AdminStatus | "all")} className="h-9 rounded-[10px] border border-black/10 bg-white px-2 text-[12px] normal-case tracking-normal text-black outline-none">
              {statuses.map((item) => (
                <option key={item} value={item}>{item === "all" ? "All" : item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
            Service
            <select value={service} onChange={(event) => setService(event.target.value as ServiceFilter)} className="h-9 rounded-[10px] border border-black/10 bg-white px-2 text-[12px] normal-case tracking-normal text-black outline-none">
              <option value="all">All</option>
              <option value="makeup">Makeup quotation</option>
              <option value="weekly-masterclasses">Weekly masterclass</option>
              <option value="beauty-consultation">Consultation</option>
            </select>
          </label>
          <label className="grid gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
            Event date
            <input value={date} onChange={(event) => setDate(event.target.value)} type="date" className="h-9 rounded-[10px] border border-black/10 bg-white px-2 text-[12px] normal-case tracking-normal text-black outline-none" />
          </label>
          <label className="grid gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
            Location
            <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City" className="h-9 rounded-[10px] border border-black/10 bg-white px-2 text-[12px] normal-case tracking-normal text-black outline-none" />
          </label>
          <label className="grid gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
            Budget
            <input value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="Budget" className="h-9 rounded-[10px] border border-black/10 bg-white px-2 text-[12px] normal-case tracking-normal text-black outline-none" />
          </label>
          <label className="grid gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
            Submitted
            <input value={submittedDate} onChange={(event) => setSubmittedDate(event.target.value)} type="date" className="h-9 rounded-[10px] border border-black/10 bg-white px-2 text-[12px] normal-case tracking-normal text-black outline-none" />
          </label>
          <label className="grid gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40">
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)} className="h-9 rounded-[10px] border border-black/10 bg-white px-2 text-[12px] normal-case tracking-normal text-black outline-none">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name-asc">Name A-Z</option>
              <option value="event-asc">Event date ↑</option>
              <option value="event-desc">Event date ↓</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-black/45">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-3 py-1">
            <Filter className="size-3" /> {filteredRows.length} shown
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-3 py-1">
            <ArrowDownUp className="size-3" /> {sort.replace("-", " ")}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-3 py-1">
            <ArrowDownAZ className="size-3" /> Filter controls active
          </span>
        </div>
      </div>

      {filteredRows.length > 0 ? (
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {filteredRows.map((booking) => (
            <motion.article
              key={booking.id}
              layout
              className="group rounded-[16px] border border-black/10 bg-white p-3 shadow-[0_12px_45px_rgba(0,0,0,0.035)] transition-colors hover:border-black/20"
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`rounded-full px-2 py-1 text-[10px] font-semibold capitalize ring-1 ${statusClasses(booking.status)}`}>
                  {booking.viewedAt || booking.status !== "new" ? booking.status : "new unseen"}
                </span>
                <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${serviceBadgeClasses(booking)}`}>
                  {serviceKind(booking) === "makeup" ? "Makeup" : serviceKind(booking) === "weekly-masterclasses" ? "Class" : "Consult"}
                </span>
              </div>
              <button type="button" onClick={() => handleOpen(booking)} className="mt-3 block w-full text-left">
                <h3 className="truncate text-[15px] font-semibold tracking-[-0.03em] text-black">{booking.name}</h3>
                <p className="mt-1 truncate text-[12px] text-black/50">{booking.service}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-black/55">
                  <span className="truncate rounded-[10px] bg-[#fbfaf8] px-2 py-1.5">{formatCompactDate(booking.eventDate)}</span>
                  <span className="truncate rounded-[10px] bg-[#fbfaf8] px-2 py-1.5">{booking.location || "No city"}</span>
                  <span className="truncate rounded-[10px] bg-[#fbfaf8] px-2 py-1.5">{booking.phone || "No phone"}</span>
                  <span className="truncate rounded-[10px] bg-[#fbfaf8] px-2 py-1.5">{formatCompactDate(booking.submittedAt)}</span>
                </div>
                {booking.notes ? <p className="mt-3 line-clamp-2 text-[12px] leading-5 text-black/42">{booking.notes}</p> : null}
              </button>
              <div className="mt-3 flex items-center gap-2">
                <button type="button" onClick={() => handleOpen(booking)} className="grid size-8 place-items-center rounded-full border border-black/10 text-black/70 hover:bg-black hover:text-white" aria-label="Open details">
                  <Eye className="size-3.5" />
                </button>
                <a href={createWhatsAppUrl(booking.phone)} target="_blank" rel="noreferrer" className="grid size-8 place-items-center rounded-full border border-black/10 text-black/70 hover:bg-black hover:text-white" aria-label="WhatsApp client">
                  <MessageCircle className="size-3.5" />
                </a>
                <select
                  value={booking.status}
                  onClick={(event) => event.stopPropagation()}
                  onChange={(event) => handleStatus(booking.id, event.target.value as AdminStatus)}
                  className="ml-auto h-8 rounded-full border border-black/10 bg-white px-2 text-[11px] capitalize outline-none"
                >
                  {statuses.filter((item) => item !== "all").map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="rounded-[18px] border border-black/10 bg-white p-12 text-center">
          <p className="text-[24px] font-semibold tracking-[-0.05em]">No matching leads</p>
          <p className="mt-2 text-sm text-black/45">Clear one filter or wait for the next enquiry to arrive.</p>
        </div>
      )}

      <AnimatePresence>
        {selected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/45 p-3 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.aside
              initial={{ x: 420 }}
              animate={{ x: 0 }}
              exit={{ x: 420 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="ml-auto flex h-full w-full max-w-[430px] flex-col overflow-y-auto rounded-[20px] bg-white p-5 shadow-[0_30px_120px_rgba(0,0,0,0.32)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#d8ae64]">Lead Details</p>
                  <h2 className="mt-3 text-[30px] font-semibold leading-none tracking-[-0.06em]">{selected.name}</h2>
                  <p className="mt-2 text-xs text-black/45">Opened leads leave the green new-lead tray.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="grid size-9 place-items-center rounded-full border border-black/10"
                  aria-label="Close booking details"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-5 grid gap-2 text-[12px]">
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
                  ["Submitted", formatDate(selected.submittedAt)],
                  ["Viewed", selected.viewedAt ? formatDate(selected.viewedAt) : "Just now"],
                  ["Functions", selected.functions.join(", ") || "Not shared"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[12px] border border-black/10 p-3">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-black/35">{label}</p>
                    <p className="mt-1.5 break-words text-black/72">{value}</p>
                  </div>
                ))}
                <div className="rounded-[12px] border border-black/10 p-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-black/35">Notes</p>
                  <p className="mt-1.5 whitespace-pre-line leading-5 text-black/72">{selected.notes || "No notes shared."}</p>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-5">
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
