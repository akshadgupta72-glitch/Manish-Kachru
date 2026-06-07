"use client";

import type { RevenuePoint } from "@/types/admin";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type RevenueChartsProps = {
  data: RevenuePoint[];
};

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

export function RevenueCharts({ data }: RevenueChartsProps) {
  const hasRevenue = data.some((point) => point.masterclass || point.bridal || point.consultation);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(0,0,0,0.05)]">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d8ae64]">Revenue Flow</p>
            <h2 className="mt-3 text-[30px] font-semibold leading-none tracking-[-0.06em]">Weekly studio earnings</h2>
          </div>
          <p className="hidden text-sm text-black/45 sm:block">Masterclass, bridal, and consultation split</p>
        </div>
        <div className="h-[340px]">
          {hasRevenue ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="adminRevenue" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#080808" stopOpacity={0.26} />
                  <stop offset="100%" stopColor="#080808" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#000" strokeOpacity={0.06} vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "rgba(0,0,0,0.45)", fontSize: 12 }} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "rgba(0,0,0,0.36)", fontSize: 12 }}
                tickFormatter={(value) => `₹${Number(value) / 1000}k`}
              />
              <Tooltip
                formatter={(value) => currencyFormatter.format(Number(value))}
                contentStyle={{
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: 16,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.12)"
                }}
              />
              <Area type="monotone" dataKey="bridal" stroke="#080808" strokeWidth={2} fill="url(#adminRevenue)" />
              <Area type="monotone" dataKey="masterclass" stroke="#d8ae64" strokeWidth={2} fill="transparent" />
              <Area type="monotone" dataKey="consultation" stroke="#8f8f8f" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="grid h-full place-items-center rounded-[18px] border border-dashed border-black/10 bg-[#fbfaf8] text-center">
              <div>
                <p className="text-[22px] font-semibold tracking-[-0.05em]">No paid revenue yet</p>
                <p className="mt-2 text-sm text-black/45">Verified Razorpay payments will build this chart automatically.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-[24px] border border-black/10 bg-black p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.14)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d8ae64]">Category Mix</p>
        <h2 className="mt-3 text-[30px] font-semibold leading-none tracking-[-0.06em]">Service contribution</h2>
        <div className="mt-8 h-[300px]">
          {hasRevenue ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ left: -20, right: 6, top: 8, bottom: 0 }}>
              <CartesianGrid stroke="#fff" strokeOpacity={0.08} vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "rgba(255,255,255,0.48)", fontSize: 12 }} />
              <YAxis hide />
              <Tooltip
                formatter={(value) => currencyFormatter.format(Number(value))}
                contentStyle={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#111",
                  color: "#fff",
                  borderRadius: 16
                }}
              />
              <Bar dataKey="bridal" stackId="a" fill="#fff" radius={[8, 8, 0, 0]} />
              <Bar dataKey="masterclass" stackId="a" fill="#d8ae64" radius={[8, 8, 0, 0]} />
              <Bar dataKey="consultation" stackId="a" fill="#777" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="grid h-full place-items-center rounded-[18px] border border-dashed border-white/10 bg-white/[0.04] text-center">
              <div>
                <p className="text-[22px] font-semibold tracking-[-0.05em]">Waiting for payments</p>
                <p className="mt-2 text-sm text-white/45">Only verified Supabase payment records are used here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
