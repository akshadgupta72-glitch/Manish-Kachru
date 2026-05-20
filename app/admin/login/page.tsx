import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 py-6 text-white mobile-l:px-6 tablet:grid tablet:place-items-center tablet:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(216,174,100,0.2),transparent_26%),radial-gradient(circle_at_88%_20%,rgba(255,255,255,0.11),transparent_22%),linear-gradient(135deg,#050505_0%,#111_58%,#050505_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(216,174,100,0.07),transparent_30%,rgba(255,255,255,0.035)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8ae64]/60 to-transparent" />
      <div className="relative mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-[1180px] flex-col justify-center gap-8 tablet:grid tablet:min-h-0 tablet:grid-cols-[minmax(0,0.9fr)_minmax(360px,440px)] tablet:items-center laptop:grid-cols-[minmax(0,1fr)_440px]">
        <section className="hidden tablet:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#d8ae64]">Looks By Manish Kachru</p>
          <h2 className="mt-8 max-w-[560px] text-[58px] font-semibold leading-[0.9] tracking-[-0.07em] text-white laptop:text-[76px]">
            Private studio command.
          </h2>
          <p className="mt-7 max-w-[420px] text-sm leading-7 text-white/45">
            A quiet luxury system for bookings, masterclasses, students, and revenue.
          </p>
        </section>
        <Suspense fallback={null}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </main>
  );
}
