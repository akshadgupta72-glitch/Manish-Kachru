import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Refund Policy | Looks By Manish Kachru",
  description: "Refund policy for Looks By Manish Kachru paid consultations and masterclasses."
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Refunds"
      title="Refund Policy"
      intro="Refund handling depends on the type of service, payment status, and whether the studio has already reserved time or delivered access."
      sections={[
        {
          title: "Consultations",
          body: "Consultation payments are generally non-refundable once a slot is confirmed or the consultation has been delivered. If the studio cannot provide the consultation, the team may offer a reschedule or refund."
        },
        {
          title: "Masterclasses",
          body: "Masterclass payments are generally non-refundable after batch allocation or access confirmation. If a class is cancelled by the studio, a reschedule or refund may be offered."
        },
        {
          title: "Failed Payments",
          body: "If payment is deducted but not confirmed, please share the payment reference with the team. Refunds for failed transactions are handled by the payment provider timelines."
        },
        {
          title: "How To Request",
          body: "Refund requests must be raised through the official contact channel with your name, phone number, email, service, and payment reference."
        }
      ]}
    />
  );
}
