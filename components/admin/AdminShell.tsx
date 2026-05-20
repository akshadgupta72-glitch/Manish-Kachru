"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Control", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Masterclass", href: "/admin/masterclass", icon: GraduationCap },
  { label: "Revenue", href: "/admin/revenue", icon: BarChart3 },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings }
];

type AdminShellProps = {
  children: React.ReactNode;
  userEmail?: string | null;
};

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-full flex-col bg-[#070707] text-white">
      <div className="border-b border-white/10 px-6 py-7">
        <p className="font-logo text-[17px] uppercase tracking-[-0.08em]">LOOKSBYMANISH</p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-[#d8ae64]">Studio Admin</p>
      </div>

      <nav className="flex-1 space-y-2 px-3 py-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={[
                "group flex items-center gap-3 rounded-[14px] px-4 py-3 text-sm transition-all duration-200",
                active
                  ? "bg-white text-black shadow-[0_18px_60px_rgba(255,255,255,0.12)]"
                  : "text-white/58 hover:bg-white/8 hover:text-white"
              ].join(" ")}
            >
              <Icon className="size-4" strokeWidth={1.6} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-[14px] px-4 py-3 text-left text-sm text-white/58 transition-colors hover:bg-white/8 hover:text-white"
        >
          <LogOut className="size-4" strokeWidth={1.6} />
          Sign out
        </button>
      </div>
    </aside>
  );
}

export function AdminShell({ children, userEmail }: AdminShellProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("studio-unlock-intro") !== "true") return;

    window.sessionStorage.removeItem("studio-unlock-intro");

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextClass) return;

      const audioContext = new AudioContextClass();
      const gain = audioContext.createGain();
      const oscillator = audioContext.createOscillator();
      const shimmer = audioContext.createOscillator();

      oscillator.type = "sine";
      shimmer.type = "triangle";
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1046.5, audioContext.currentTime + 0.28);
      shimmer.frequency.setValueAtTime(1318.5, audioContext.currentTime + 0.04);
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.14, audioContext.currentTime + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.55);
      oscillator.connect(gain);
      shimmer.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      shimmer.start(audioContext.currentTime + 0.06);
      oscillator.stop(audioContext.currentTime + 0.56);
      shimmer.stop(audioContext.currentTime + 0.48);
    } catch {
      // Browser audio can be blocked if the login click was not treated as activation.
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Access unlocked. Welcome to the Studio.");
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((voice) => voice.lang === "en-US" && /samantha|zira|female|google/i.test(voice.name)) ||
        voices.find((voice) => voice.lang === "en-US") ||
        voices.find((voice) => voice.lang.startsWith("en"));

      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.lang = "en-US";
      utterance.rate = 0.92;
      utterance.pitch = 1.04;
      utterance.volume = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-black">
      <div className="fixed inset-y-0 left-0 z-40 hidden w-[264px] lg:block">
        <Sidebar />
      </div>

      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#f7f4ef]/86 backdrop-blur-xl lg:ml-[264px]">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-black/10 bg-white lg:hidden"
            aria-label="Open admin navigation"
          >
            <Menu className="size-4" />
          </button>
          <div className="hidden lg:block">
            <p className="text-[11px] uppercase tracking-[0.3em] text-black/40">Private Studio System</p>
          </div>
          <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-black/60">
            {userEmail || "Admin"}
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="h-full w-[82vw] max-w-[320px]"
            >
              <div className="absolute right-4 top-4 z-10">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid size-9 place-items-center rounded-full bg-white text-black"
                  aria-label="Close admin navigation"
                >
                  <X className="size-4" />
                </button>
              </div>
              <Sidebar onNavigate={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="lg:ml-[264px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="px-4 py-8 sm:px-6 lg:px-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
