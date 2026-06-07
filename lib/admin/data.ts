import type { AdminBooking, AdminStatus, MasterclassStudent, RevenuePoint } from "@/types/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type BookingRow = {
  id: string;
  service_slug: string | null;
  service_title: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  event_date: string | null;
  location: string | null;
  functions: string[] | null;
  notes: string | null;
  payment_status: string | null;
  payment_amount: number | null;
  payment_currency: string | null;
  payment_plan: string | null;
  razorpay_payment_id: string | null;
  razorpay_order_id: string | null;
  status: string | null;
  viewed_at: string | null;
  created_at: string | null;
};

function normalizeStatus(status?: string | null): AdminStatus {
  if (status === "contacted" || status === "confirmed" || status === "closed" || status === "archived") {
    return status;
  }

  return "new";
}

function mapBooking(row: BookingRow): AdminBooking {
  return {
    id: row.id,
    name: row.name || "Unnamed client",
    phone: row.phone || "",
    email: row.email || "",
    service: row.service_title || "Makeup service",
    serviceSlug: row.service_slug || "booking",
    eventDate: row.event_date,
    location: row.location || "Not shared",
    budget: "Not shared",
    notes: row.notes,
    functions: row.functions ?? [],
    paymentStatus: row.payment_status || "not_required",
    paymentAmount: row.payment_amount,
    paymentCurrency: row.payment_currency || "INR",
    paymentPlan: row.payment_plan,
    razorpayPaymentId: row.razorpay_payment_id,
    razorpayOrderId: row.razorpay_order_id,
    status: normalizeStatus(row.status),
    viewedAt: row.viewed_at,
    submittedAt: row.created_at || new Date().toISOString()
  };
}

function formatMoney(amount: number) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

function isMasterclassSlug(slug: string) {
  return slug === "weekly-masterclasses";
}

function isConsultationSlug(slug: string) {
  return slug === "beauty-consultation";
}

function isMakeupSlug(slug: string) {
  return !isMasterclassSlug(slug) && !isConsultationSlug(slug);
}

export async function getAdminBookings(limit?: number) {
  try {
    const supabase = createSupabaseAdminClient();
    let query = supabase
      .from("booking_requests")
      .select("id, service_slug, service_title, name, phone, email, event_date, location, functions, notes, payment_status, payment_amount, payment_currency, payment_plan, razorpay_payment_id, razorpay_order_id, status, viewed_at, created_at")
      .order("created_at", { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;

    if (error) {
      const shouldRetryLegacySelect =
        error.message.includes("payment_") || error.message.includes("razorpay_") || error.message.includes("viewed_at");

      if (!shouldRetryLegacySelect) throw error;

      let fallbackQuery = supabase
        .from("booking_requests")
        .select("id, service_slug, service_title, name, phone, email, event_date, location, functions, notes, status, created_at")
        .order("created_at", { ascending: false });

      if (limit) fallbackQuery = fallbackQuery.limit(limit);
      const { data: fallbackData, error: fallbackError } = await fallbackQuery;
      if (fallbackError) throw fallbackError;

      return (fallbackData ?? []).map((row) =>
        mapBooking({
          ...(row as Omit<BookingRow, "payment_status" | "payment_amount" | "payment_currency" | "payment_plan" | "razorpay_payment_id" | "razorpay_order_id">),
          payment_status: "not_required",
          payment_amount: null,
          payment_currency: "INR",
          payment_plan: null,
          razorpay_payment_id: null,
          razorpay_order_id: null,
          viewed_at: null
        })
      );
    }

    return (data ?? []).map((row) => mapBooking(row as BookingRow));
  } catch {
    return [];
  }
}

function formatBatchLabel(start: Date, end: Date) {
  const formatter = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" });
  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

export async function getMasterclassStudents() {
  const bookings = await getAdminBookings();
  const students = bookings
    .filter((booking) => booking.serviceSlug === "weekly-masterclasses")
    .map((booking): MasterclassStudent => {
      const enrollmentDate = new Date(booking.submittedAt);
      const { batchStart, batchEnd } = getMasterclassBatchForEnrollment(enrollmentDate);

      return {
        id: booking.id,
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        paymentStatus: booking.paymentStatus === "paid" ? "Paid" : "Pending",
        enrollmentDate: enrollmentDate.toISOString().slice(0, 10),
        assignedBatch: formatBatchLabel(batchStart, batchEnd),
        attendance: "Not marked"
      };
    });

  return students;
}

export function getMasterclassBatchForEnrollment(enrollmentDate: Date) {
  // Business rule: masterclasses run Monday through Saturday. Sunday enrollments
  // are assigned to the next week's batch, which starts the following Monday.
  const date = new Date(enrollmentDate);
  const day = date.getDay();
  const daysUntilMonday = day === 0 ? 1 : (8 - day) % 7 || 7;
  const batchStart = new Date(date);
  batchStart.setDate(date.getDate() + daysUntilMonday);
  const batchEnd = new Date(batchStart);
  batchEnd.setDate(batchStart.getDate() + 5);

  return { batchStart, batchEnd };
}

export async function getRevenueData() {
  const bookings = await getAdminBookings();
  const paidBookings = bookings.filter((booking) => booking.paymentStatus === "paid" && booking.paymentAmount);
  const now = new Date();
  const dayStart = new Date(now);
  dayStart.setHours(0, 0, 0, 0);
  const weekStart = new Date(dayStart);
  weekStart.setDate(dayStart.getDate() - 6);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const yearStart = new Date(now.getFullYear(), 0, 1);

  const sum = (items: AdminBooking[]) =>
    items.reduce((total, booking) => total + (booking.paymentAmount || 0) / 100, 0);

  const inRange = (booking: AdminBooking, start: Date) => new Date(booking.submittedAt) >= start;
  const byService = (predicate: (slug: string) => boolean) =>
    sum(paidBookings.filter((booking) => predicate(booking.serviceSlug)));

  const labels = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return date;
  });

  const revenueSeries: RevenuePoint[] = labels.map((date) => {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    const dayBookings = paidBookings.filter((booking) => {
      const submitted = new Date(booking.submittedAt);
      return submitted >= date && submitted < nextDate;
    });

    return {
      label: new Intl.DateTimeFormat("en-IN", { weekday: "short" }).format(date),
      masterclass: sum(dayBookings.filter((booking) => isMasterclassSlug(booking.serviceSlug))),
      bridal: sum(dayBookings.filter((booking) => isMakeupSlug(booking.serviceSlug))),
      consultation: sum(dayBookings.filter((booking) => isConsultationSlug(booking.serviceSlug)))
    };
  });

  return {
    revenueSeries,
    revenueSummary: {
      daily: formatMoney(sum(paidBookings.filter((booking) => inRange(booking, dayStart)))),
      weekly: formatMoney(sum(paidBookings.filter((booking) => inRange(booking, weekStart)))),
      monthly: formatMoney(sum(paidBookings.filter((booking) => inRange(booking, monthStart)))),
      yearly: formatMoney(sum(paidBookings.filter((booking) => inRange(booking, yearStart)))),
      masterclass: formatMoney(byService(isMasterclassSlug)),
      bridal: formatMoney(byService(isMakeupSlug)),
      consultation: formatMoney(byService(isConsultationSlug))
    }
  };
}
