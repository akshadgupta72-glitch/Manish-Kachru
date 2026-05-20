"use client";

import { createWhatsAppUrl } from "@/lib/admin/whatsapp";
import type { MasterclassStudent } from "@/types/admin";
import { Download, Eye, MessageCircle } from "lucide-react";

type StudentsTableProps = {
  students: MasterclassStudent[];
};

export function StudentsTable({ students }: StudentsTableProps) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-2 border-b border-black/10 p-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d8ae64]">Students</p>
          <h2 className="mt-3 text-[30px] font-semibold leading-none tracking-[-0.06em]">Weekly masterclass roster</h2>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-black/70 transition-colors hover:bg-black hover:text-white"
        >
          <Download className="size-4" /> Export Students PDF
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="text-[11px] uppercase tracking-[0.22em] text-black/38">
            <tr className="border-b border-black/10">
              <th className="px-5 py-4 font-semibold">Student</th>
              <th className="px-5 py-4 font-semibold">Email</th>
              <th className="px-5 py-4 font-semibold">Phone</th>
              <th className="px-5 py-4 font-semibold">Payment</th>
              <th className="px-5 py-4 font-semibold">Enrollment</th>
              <th className="px-5 py-4 font-semibold">Batch</th>
              <th className="px-5 py-4 font-semibold">Attendance</th>
              <th className="px-5 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-black/[0.06]">
                <td className="px-5 py-4 font-medium">{student.name}</td>
                <td className="px-5 py-4 text-black/55">{student.email}</td>
                <td className="px-5 py-4 text-black/55">{student.phone}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs ${student.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-[#f7f0e2] text-[#876323]"}`}>
                    {student.paymentStatus}
                  </span>
                </td>
                <td className="px-5 py-4 text-black/55">{student.enrollmentDate}</td>
                <td className="px-5 py-4 text-black/55">{student.assignedBatch}</td>
                <td className="px-5 py-4 text-black/55">{student.attendance}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button type="button" className="grid size-9 place-items-center rounded-full border border-black/10 hover:bg-black hover:text-white" aria-label="View student details">
                      <Eye className="size-4" />
                    </button>
                    <button type="button" className="grid size-9 place-items-center rounded-full border border-black/10 hover:bg-black hover:text-white" aria-label="Download invoice">
                      <Download className="size-4" />
                    </button>
                    <a href={createWhatsAppUrl(student.phone)} target="_blank" rel="noreferrer" className="grid size-9 place-items-center rounded-full border border-black/10 hover:bg-black hover:text-white" aria-label="WhatsApp student">
                      <MessageCircle className="size-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

