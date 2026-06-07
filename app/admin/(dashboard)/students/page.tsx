import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { StudentsTable } from "@/components/admin/StudentsTable";
import { getMasterclassStudents } from "@/lib/admin/data";

export default async function AdminStudentsPage() {
  const students = await getMasterclassStudents();

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d8ae64]">Student CRM</p>
        <h1 className="mt-3 text-[44px] font-semibold uppercase leading-none tracking-[-0.055em] sm:text-[56px]">
          Students
        </h1>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <AdminStatCard label="Total students" value={String(students.length)} icon="graduationCap" />
        <AdminStatCard label="Paid students" value={String(students.filter((student) => student.paymentStatus === "Paid").length)} icon="userCheck" tone="gold" />
        <AdminStatCard label="Pending follow-ups" value={String(students.filter((student) => student.paymentStatus === "Pending").length)} icon="mail" tone="dark" />
      </section>

      <StudentsTable students={students} />
    </div>
  );
}
