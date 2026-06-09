import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Service Delivery Policy | Looks By Manish Kachru",
  description: "Service delivery policy for Looks By Manish Kachru makeup services, consultations, and masterclasses."
};

export default function ServiceDeliveryPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Delivery"
      title="Service Delivery Policy"
      intro="Looks By Manish Kachru provides in-person makeup services, beauty consultations, and learning experiences based on confirmed booking details."
      sections={[
        {
          title: "Makeup Services",
          body: "Service delivery depends on confirmed date, time, venue, selected functions, artist availability, travel requirements, and final communication with the client."
        },
        {
          title: "Consultations",
          body: "Consultation delivery is coordinated after payment confirmation. The team will contact the client using the details submitted on the website."
        },
        {
          title: "Masterclasses",
          body: "Masterclass access and batch details are shared after successful enrollment and payment confirmation."
        },
        {
          title: "Contact Window",
          body: "After a request or payment is received, the team aims to contact the client within 24 hours during working days."
        }
      ]}
    />
  );
}
