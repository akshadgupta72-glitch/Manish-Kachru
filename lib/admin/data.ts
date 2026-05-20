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
  status: string | null;
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
    status: normalizeStatus(row.status),
    submittedAt: row.created_at || new Date().toISOString()
  };
}

export async function getAdminBookings(limit?: number) {
  try {
    const supabase = createSupabaseAdminClient();
    let query = supabase
      .from("booking_requests")
      .select("id, service_slug, service_title, name, phone, email, event_date, location, functions, notes, status, created_at")
      .order("created_at", { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;

    if (error) throw error;

    return (data ?? []).map((row) => mapBooking(row as BookingRow));
  } catch {
    return [];
  }
}

export const masterclassStudents: MasterclassStudent[] = [
  {
    id: "stu-001",
    name: "Aarohi Mehta",
    email: "aarohi@example.com",
    phone: "9876543210",
    paymentStatus: "Paid",
    enrollmentDate: "2026-05-14",
    assignedBatch: "May 18 - May 23",
    attendance: "Not marked"
  },
  {
    id: "stu-002",
    name: "Riya Kapoor",
    email: "riya@example.com",
    phone: "9876501234",
    paymentStatus: "Pending",
    enrollmentDate: "2026-05-17",
    assignedBatch: "May 25 - May 30",
    attendance: "Not marked"
  },
  {
    id: "stu-003",
    name: "Meher Sethi",
    email: "meher@example.com",
    phone: "9990011223",
    paymentStatus: "Paid",
    enrollmentDate: "2026-05-12",
    assignedBatch: "May 18 - May 23",
    attendance: "Present"
  }
];

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

export const revenueSeries: RevenuePoint[] = [
  { label: "Mon", masterclass: 14970, bridal: 42000, consultation: 2500 },
  { label: "Tue", masterclass: 9980, bridal: 36000, consultation: 3000 },
  { label: "Wed", masterclass: 12475, bridal: 52000, consultation: 1500 },
  { label: "Thu", masterclass: 15968, bridal: 30000, consultation: 4000 },
  { label: "Fri", masterclass: 19960, bridal: 68000, consultation: 3500 },
  { label: "Sat", masterclass: 24950, bridal: 74000, consultation: 5000 },
  { label: "Sun", masterclass: 7485, bridal: 48000, consultation: 2000 }
];

export const revenueSummary = {
  daily: "₹28.4K",
  weekly: "₹4.51L",
  monthly: "₹18.2L",
  yearly: "₹1.94Cr",
  masterclass: "₹1.06L",
  bridal: "₹3.50L",
  consultation: "₹21.5K"
};

