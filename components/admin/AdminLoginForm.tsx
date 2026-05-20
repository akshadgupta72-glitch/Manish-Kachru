"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pinInputRef = useRef<HTMLInputElement>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(searchParams.get("error") === "not_admin" ? "This account is not allowed to access admin." : "");
  const [isPending, setIsPending] = useState(false);

  function handlePinChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextPin = event.target.value.replace(/\D/g, "").slice(0, 6);
    setPin(nextPin);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const redirectedFrom = searchParams.get("redirectedFrom") || "/admin";

    if (pin.length !== 6) {
      setError("Enter your 6 digit admin PIN.");
      setIsPending(false);
      return;
    }

    try {
      const supabase = createBrowserSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: pin });

      if (signInError) {
        setError(signInError.message);
        setIsPending(false);
        return;
      }

      window.sessionStorage.setItem("studio-unlock-intro", "true");
      router.push(redirectedFrom);
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Could not open admin.");
      setIsPending(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-[420px] rounded-[26px] border border-white/12 bg-white/[0.07] p-5 shadow-[0_36px_110px_rgba(0,0,0,0.44)] backdrop-blur-2xl mobile-l:p-6 tablet:mx-0 tablet:justify-self-end laptop:p-7"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#d8ae64]">Private Access</p>
      <h1 className="mt-5 text-[38px] font-semibold leading-[0.92] tracking-[-0.065em] text-white mobile-m:text-[42px] mobile-l:text-[46px] tablet:text-[50px] laptop:text-[54px]">
        Studio admin
        <br />
        login
      </h1>
      <p className="mt-5 max-w-[330px] text-sm leading-6 text-white/48">
        Enter your admin email and 6 digit PIN to unlock the private studio.
      </p>

      <div className="mt-8 space-y-5">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.22em] text-white/45">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue="akshadgupta848@gmail.com"
            className="mt-2 h-12 w-full rounded-[13px] border border-white/12 bg-black/34 px-4 text-[15px] text-white outline-none transition-colors placeholder:text-white/24 focus:border-[#d8ae64]/70 mobile-l:h-13"
            placeholder="admin email"
          />
        </label>

        <div>
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="admin-pin" className="text-xs uppercase tracking-[0.22em] text-white/45">
              Admin PIN
            </label>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/24">6 digits</span>
          </div>
          <button
            type="button"
            onClick={() => pinInputRef.current?.focus()}
            className="mt-3 flex h-16 w-full items-center justify-center rounded-[16px] border border-white/14 bg-black/34 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d8ae64] hover:border-white/26"
          >
            <span className="flex items-center gap-3" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, index) => (
                <span
                  key={index}
                  className={[
                    "size-3 rounded-full border transition-all duration-200",
                    index < pin.length
                      ? "scale-110 border-[#d8ae64] bg-[#d8ae64] shadow-[0_0_18px_rgba(216,174,100,0.45)]"
                      : "border-white/25 bg-white/5"
                  ].join(" ")}
                />
              ))}
            </span>
          </button>
          <input
            ref={pinInputRef}
            id="admin-pin"
            name="pin"
            value={pin}
            onChange={handlePinChange}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            autoComplete="current-password"
            className="sr-only"
            aria-label="Six digit admin PIN"
            required
          />
        </div>
      </div>

      {error ? <p className="mt-5 rounded-[12px] border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}

      <button
        type="submit"
        disabled={isPending || pin.length !== 6}
        className="mt-7 h-12 w-full rounded-[13px] bg-white text-sm font-medium text-black transition-all hover:bg-[#d8ae64] disabled:cursor-not-allowed disabled:opacity-45"
      >
        {isPending ? "Unlocking studio..." : "Unlock Studio"}
      </button>
    </motion.form>
  );
}
