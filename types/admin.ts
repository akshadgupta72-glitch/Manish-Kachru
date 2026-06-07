export type AdminStatus = "new" | "contacted" | "confirmed" | "closed" | "archived";

export type AdminBooking = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  serviceSlug: string;
  eventDate: string | null;
  location: string | null;
  budget: string;
  notes: string | null;
  functions: string[];
  paymentStatus: string;
  paymentAmount: number | null;
  paymentCurrency: string | null;
  paymentPlan: string | null;
  razorpayPaymentId: string | null;
  razorpayOrderId: string | null;
  status: AdminStatus;
  viewedAt: string | null;
  submittedAt: string;
};

export type MasterclassStudent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
  enrollmentDate: string;
  assignedBatch: string;
  attendance: "Not marked" | "Present" | "Absent";
};

export type RevenuePoint = {
  label: string;
  masterclass: number;
  bridal: number;
  consultation: number;
};
