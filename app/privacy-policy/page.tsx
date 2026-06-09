import type { Metadata } from "next";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Looks By Manish Kachru",
  description: "Privacy policy for Looks By Manish Kachru bookings, consultations, and masterclasses."
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="We collect only the information needed to respond to enquiries, manage bookings, process payments, and deliver beauty services or classes."
      sections={[
        {
          title: "Information We Collect",
          body: "We may collect your name, email, phone number, event date, location, selected service, function details, notes, and payment confirmation status when you submit a form or complete a checkout."
        },
        {
          title: "How We Use It",
          body: "Your details are used to contact you about your request, confirm availability, coordinate service delivery, manage masterclass enrollments, and maintain client records inside our CRM."
        },
        {
          title: "Payments",
          body: "Payments are processed through Razorpay. We do not store card numbers, UPI credentials, CVV, or banking passwords on this website."
        },
        {
          title: "Sharing",
          body: "We do not sell your personal information. We only share data with trusted service providers such as Supabase, Resend, Razorpay, and hosting providers when required to operate the website."
        },
        {
          title: "Contact",
          body: "For privacy requests, corrections, or deletion requests, contact the studio using the official website contact channels."
        }
      ]}
    />
  );
}
