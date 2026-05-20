"use client";

import { createWhatsAppUrl } from "@/lib/admin/whatsapp";
import type { AdminBooking, AdminStatus } from "@/types/admin";
import { motion } from "framer-motion";
import { Archive, Check, ExternalLink, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type BookingLeadCardProps = {
  booking: AdminBooking;
};

function formatDate(value: string | null) {
  if (!value) return "Date not shared";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    Math.round((new Date(value).getTime() - Date.now()) / 86400000),
    "day"
  );
}

async function updateBookingStatus(id: string, status: AdminStatus) {
  await fetch(`/api/admin/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
}

export function BookingLeadCard({ booking }: BookingLeadCardProps) {
  const [status, setStatus] = useState(booking.status);
  const isNew = status === "new";

  async function handleStatus(nextStatus: AdminStatus) {
    setStatus(nextStatus);
    await updateBookingStatus(booking.id, nextStatus);
  }

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="rounded-[22px] border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {isNew ? <span className="size-2.5 animate-pulse rounded-full bg-[#d8ae64] shadow-[0_0_0_8px_rgba(216,174,100,0.16)]" /> : null}
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/40">{status}</p>
          </div>
          <h3 className="mt-4 text-[28px] font-semibold leading-none tracking-[-0.06em] text-black">{booking.name}</h3>
        </div>
        <span className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/55">{formatTime(booking.submittedAt)}</span>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-black/64 sm:grid-cols-2">
        <p><span className="text-black">Service:</span> {booking.service}</p>
        <p><span className="text-black">Date:</span> {formatDate(booking.eventDate)}</p>
        <p><span className="text-black">City:</span> {booking.location}</p>
        <p><span className="text-black">Budget:</span> {booking.budget}</p>
      </div>

      {booking.notes ? <p className="mt-5 line-clamp-2 text-sm leading-6 text-black/48">{booking.notes}</p> : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-[#262626]"
        >
          Open Details <ExternalLink className="size-3.5" />
        </Link>
        <a
          href={createWhatsAppUrl(booking.phone)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-black transition-colors hover:border-[#d8ae64] hover:bg-[#f7f0e2]"
        >
          WhatsApp Client <MessageCircle className="size-3.5" />
        </a>
        <button
          type="button"
          onClick={() => handleStatus("contacted")}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-black/70 transition-colors hover:bg-black hover:text-white"
        >
          Mark Contacted <Check className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => handleStatus("archived")}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-black/50 transition-colors hover:bg-black hover:text-white"
        >
          Archive <Archive className="size-3.5" />
        </button>
      </div>
    </motion.article>
  );
}

