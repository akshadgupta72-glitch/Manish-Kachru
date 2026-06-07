import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { RevenueCharts } from "@/components/admin/RevenueCharts";
import { getRevenueData } from "@/lib/admin/data";

export default async function AdminRevenuePage() {
  const { revenueSeries, revenueSummary } = await getRevenueData();

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d8ae64]">Luxury Analytics</p>
        <h1 className="mt-3 text-[44px] font-semibold uppercase leading-none tracking-[-0.055em] sm:text-[56px]">
          Revenue
        </h1>
        <p className="mt-4 max-w-[620px] text-sm leading-6 text-black/48">
          A calm editorial view of bookings, classes, and consultation revenue. Razorpay settlement data can plug in here later.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Daily" value={revenueSummary.daily} icon="indianRupee" />
        <AdminStatCard label="Weekly" value={revenueSummary.weekly} icon="trendingUp" tone="gold" />
        <AdminStatCard label="Monthly" value={revenueSummary.monthly} icon="calendar" />
        <AdminStatCard label="Yearly" value={revenueSummary.yearly} icon="wallet" tone="dark" />
      </section>

      <RevenueCharts data={revenueSeries} />

      <section className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Masterclass revenue" value={revenueSummary.masterclass} />
        <AdminStatCard label="Bridal revenue" value={revenueSummary.bridal} />
        <AdminStatCard label="Consultation revenue" value={revenueSummary.consultation} />
      </section>
    </div>
  );
}
