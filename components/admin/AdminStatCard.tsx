import {
  Calendar,
  CalendarCheck,
  CalendarDays,
  CreditCard,
  GraduationCap,
  IndianRupee,
  Mail,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
  type LucideIcon
} from "lucide-react";

const iconMap = {
  calendar: Calendar,
  calendarCheck: CalendarCheck,
  calendarDays: CalendarDays,
  creditCard: CreditCard,
  graduationCap: GraduationCap,
  indianRupee: IndianRupee,
  mail: Mail,
  sparkles: Sparkles,
  trendingUp: TrendingUp,
  userCheck: UserCheck,
  users: Users,
  wallet: Wallet
} satisfies Record<string, LucideIcon>;

export type AdminStatIcon = keyof typeof iconMap;

type AdminStatCardProps = {
  label: string;
  value: string;
  detail?: string;
  icon?: AdminStatIcon;
  tone?: "dark" | "light" | "gold";
};

export function AdminStatCard({ label, value, detail, icon, tone = "light" }: AdminStatCardProps) {
  const isDark = tone === "dark";
  const Icon = icon ? iconMap[icon] : null;

  return (
    <article
      className={[
        "rounded-[18px] border p-5 transition-all duration-200 hover:-translate-y-1",
        isDark
          ? "border-white/10 bg-black text-white shadow-[0_30px_80px_rgba(0,0,0,0.22)]"
          : tone === "gold"
            ? "border-[#d8ae64]/30 bg-[#f7f0e2] text-black"
            : "border-black/10 bg-white text-black"
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className={["text-[11px] font-semibold uppercase tracking-[0.28em]", isDark ? "text-white/50" : "text-black/45"].join(" ")}>
            {label}
          </p>
          <p className="mt-5 text-[34px] font-semibold leading-none tracking-[-0.06em]">{value}</p>
        </div>
        {Icon ? (
          <span className={["grid size-10 place-items-center rounded-full", isDark ? "bg-white/10" : "bg-black/[0.04]"].join(" ")}>
            <Icon className="size-4" strokeWidth={1.5} />
          </span>
        ) : null}
      </div>
      {detail ? <p className={["mt-5 text-sm leading-5", isDark ? "text-white/54" : "text-black/50"].join(" ")}>{detail}</p> : null}
    </article>
  );
}
