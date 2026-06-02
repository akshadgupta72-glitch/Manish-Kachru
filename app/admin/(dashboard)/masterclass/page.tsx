import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { StudentsTable } from "@/components/admin/StudentsTable";
import { getMasterclassStudents, revenueSummary } from "@/lib/admin/data";

export default async function AdminMasterclassPage() {
  const students = await getMasterclassStudents();
  const paidStudents = students.filter((student) => student.paymentStatus === "Paid").length;
  const pendingStudents = students.filter((student) => student.paymentStatus === "Pending").length;

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d8ae64]">Weekly Education</p>
        <h1 className="mt-3 text-[44px] font-semibold uppercase leading-none tracking-[-0.055em] sm:text-[56px]">
          Masterclass Management
        </h1>
        <p className="mt-4 max-w-[660px] text-sm leading-6 text-black/48">
          Monday to Saturday batch visibility with placeholders ready for Razorpay payments, invoices, and attendance.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard label="Total enrolled" value={String(students.length)} icon="users" />
        <AdminStatCard label="Current week" value={String(paidStudents)} detail="Paid students in this week's batch." icon="calendarDays" />
        <AdminStatCard label="Next batch" value="1" detail="Sunday enrollments move to the next week." icon="calendarDays" tone="gold" />
        <AdminStatCard label="Pending payments" value={String(pendingStudents)} icon="creditCard" />
        <AdminStatCard label="Weekly revenue" value={revenueSummary.masterclass} icon="indianRupee" tone="dark" />
      </section>

      <StudentsTable students={students} />
    </div>
  );
}
