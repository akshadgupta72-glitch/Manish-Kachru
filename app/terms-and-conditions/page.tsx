import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Terms and Conditions | Looks By Manish Kachru",
  description: "Terms and conditions for Looks By Manish Kachru services and classes."
};

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage
      eyebrow="Terms"
      title="Terms and Conditions"
      intro="By submitting a request, booking a service, or enrolling in a class, you agree to the service process and communication terms below."
      sections={[
        {
          title: "Bookings",
          body: "Submitting a form does not guarantee availability. The studio will confirm dates, timing, location, requirements, and pricing before a booking is finalized."
        },
        {
          title: "Client Details",
          body: "You agree to provide accurate contact, event, and service information so the team can respond and prepare correctly."
        },
        {
          title: "Classes",
          body: "Masterclass access is subject to schedule, batch allocation, payment confirmation, and any instructions shared by the studio."
        },
        {
          title: "Content",
          body: "Website images, copy, layouts, videos, and brand material belong to Looks By Manish Kachru or their respective rights holders and may not be reused without permission."
        },
        {
          title: "Changes",
          body: "The studio may update services, pricing, schedules, and these terms when needed. Updated terms will be reflected on this website."
        }
      ]}
    />
  );
}
