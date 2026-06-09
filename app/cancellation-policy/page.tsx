import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Cancellation Policy | Looks By Manish Kachru",
  description: "Cancellation policy for Looks By Manish Kachru bookings and classes."
};

export default function CancellationPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Cancellations"
      title="Cancellation Policy"
      intro="Cancellations should be communicated as early as possible so the studio can manage scheduling and availability."
      sections={[
        {
          title: "Makeup Services",
          body: "Confirmed service bookings may have cancellation terms based on date, travel, artist allocation, and preparation already completed by the studio."
        },
        {
          title: "Rescheduling",
          body: "Rescheduling is subject to availability. The team will try to accommodate genuine changes, but alternate dates cannot be guaranteed."
        },
        {
          title: "Masterclasses",
          body: "If you cannot attend a scheduled class, contact the team before the class begins. Batch changes are subject to seat availability."
        },
        {
          title: "No-Show",
          body: "No-shows for consultations, classes, or confirmed appointments may not be eligible for refund or reschedule."
        }
      ]}
    />
  );
}
