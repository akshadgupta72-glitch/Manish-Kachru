"use client";

import type { ServicePage } from "@/lib/service-pages";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";

type ServiceBookingFormProps = {
  page: ServicePage;
};

type BookingState = {
  ok: boolean;
  message: string;
};

type RazorpayOrderResponse = {
  ok: boolean;
  order_id?: string;
  amount?: number;
  currency?: string;
  message?: string;
};

type RazorpayConfigResponse = {
  ok: boolean;
  keyId?: string;
  message?: string;
};

type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
  };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
  handler: (response: RazorpayPaymentResponse) => void;
};

type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", callback: (response: RazorpayFailureResponse) => void) => void;
};

type RazorpayConstructor = new (options: RazorpayOptions) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

const initialState: BookingState = {
  ok: false,
  message: ""
};

const masterclassPaymentOptions = {
  "next-class": {
    label: "Next class enrollment",
    amount: 50000,
    displayAmount: "₹500",
    buttonLabel: "Enroll for Next Class"
  },
  "monthly-access": {
    label: "Monthly access",
    amount: 150000,
    displayAmount: "₹1,500",
    buttonLabel: "Get Monthly Access"
  }
} as const;

const consultationPaymentOption = {
  label: "Beauty consultation",
  amount: 50000,
  displayAmount: "₹500",
  buttonLabel: "Get Consultation"
};

type MasterclassPaymentOptionKey = keyof typeof masterclassPaymentOptions;

function getMasterclassPaymentOption(value: string | undefined) {
  if (value === "monthly-access") return masterclassPaymentOptions["monthly-access"];
  return masterclassPaymentOptions["next-class"];
}

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function getRazorpayPublicKey() {
  const bundledKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim();

  if (bundledKey) return bundledKey;

  const response = await fetch("/api/razorpay-config", {
    cache: "no-store"
  });
  const data = (await response.json()) as RazorpayConfigResponse;

  if (!response.ok || !data.ok || !data.keyId) {
    throw new Error(data.message || "Missing Razorpay public key.");
  }

  return data.keyId;
}

function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise<boolean>((resolve) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), { once: true });
      existingScript.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function ServiceBookingForm({ page }: ServiceBookingFormProps) {
  const [state, setState] = useState<BookingState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const playedSuccessSound = useRef(false);
  const isWeeklyMasterclass = page.slug === "weekly-masterclasses";
  const isBeautyConsultation = page.slug === "beauty-consultation";

  useEffect(() => {
    if (!state.ok) return;

    setShowNotification(true);
    const timeout = window.setTimeout(() => {
      setShowNotification(false);
    }, 5200);

    return () => window.clearTimeout(timeout);
  }, [state.ok]);

  async function submitBooking(formData: FormData) {
    const response = await fetch("/api/booking", {
        method: "POST",
        body: formData
      });

    return (await response.json()) as BookingState;
  }

  async function handleMasterclassPayment(formData: FormData, paymentOption: (typeof masterclassPaymentOptions)[MasterclassPaymentOptionKey]) {
    try {
      const key = await getRazorpayPublicKey();

      const isScriptReady = await loadRazorpayScript();

      if (!isScriptReady || !window.Razorpay) {
        throw new Error("Razorpay checkout could not be loaded. Please try again.");
      }

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: paymentOption.amount,
          currency: "INR",
          receipt: `weekly_masterclass_${Date.now()}_${paymentOption.amount}`
        })
      });
      const order = (await orderResponse.json()) as RazorpayOrderResponse;

      if (!orderResponse.ok || !order.ok || !order.order_id || !order.amount || !order.currency) {
        throw new Error(order.message || "Could not create Razorpay order.");
      }

      const razorpay = new window.Razorpay({
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Looks By Manish Kachru",
        description: `Weekly Masterclass - ${paymentOption.label}`,
        order_id: order.order_id,
        prefill: {
          name: readFormValue(formData, "name"),
          email: readFormValue(formData, "email"),
          contact: readFormValue(formData, "phone")
        },
        theme: {
          color: "#1f1a17"
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            setState({
              ok: false,
              message: "Payment was cancelled. Your card or UPI was not charged."
            });
          }
        },
        handler: async (payment) => {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(payment)
            });
            const verifyResult = (await verifyResponse.json()) as BookingState;

            if (!verifyResponse.ok || !verifyResult.ok) {
              throw new Error(verifyResult.message || "Payment verification failed.");
            }

            const existingNotes = readFormValue(formData, "notes");
            formData.append("functions", paymentOption.label);
            formData.set(
              "notes",
              [
                existingNotes,
                "Weekly masterclass payment verified.",
                `Plan: ${paymentOption.label}`,
                `Payment ID: ${payment.razorpay_payment_id}`,
                `Order ID: ${payment.razorpay_order_id}`,
                `Amount: ${paymentOption.displayAmount}`
              ]
                .filter(Boolean)
                .join("\n")
            );

            const bookingResult = await submitBooking(formData);
            setState({
              ok: bookingResult.ok,
              message: bookingResult.ok
                ? "Payment received. Your weekly masterclass enrollment has been added to the CRM."
                : `Payment received, but we could not save the form: ${bookingResult.message}`
            });
          } catch (error) {
            setState({
              ok: false,
              message:
                error instanceof Error
                  ? error.message
                  : "Payment could not be verified. Please contact the team."
            });
          } finally {
            setIsSubmitting(false);
          }
        }
      });

      razorpay.on("payment.failed", (response) => {
        setIsSubmitting(false);
        setState({
          ok: false,
          message: response.error?.description || "Payment failed. Please try again."
        });
      });

      razorpay.open();
    } catch (error) {
      setIsSubmitting(false);
      setState({
        ok: false,
        message: error instanceof Error ? error.message : "Could not start Razorpay checkout."
      });
    }
  }

  async function handleConsultationPayment() {
    setIsSubmitting(true);
    setState(initialState);

    try {
      const key = await getRazorpayPublicKey();

      const isScriptReady = await loadRazorpayScript();

      if (!isScriptReady || !window.Razorpay) {
        throw new Error("Razorpay checkout could not be loaded. Please try again.");
      }

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: consultationPaymentOption.amount,
          currency: "INR",
          receipt: `beauty_consultation_${Date.now()}`
        })
      });
      const order = (await orderResponse.json()) as RazorpayOrderResponse;

      if (!orderResponse.ok || !order.ok || !order.order_id || !order.amount || !order.currency) {
        throw new Error(order.message || "Could not create Razorpay order.");
      }

      const razorpay = new window.Razorpay({
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Looks By Manish Kachru",
        description: "Beauty Consultation",
        order_id: order.order_id,
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        theme: {
          color: "#1f1a17"
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            setState({
              ok: false,
              message: "Payment was cancelled. Your card or UPI was not charged."
            });
          }
        },
        handler: async (payment) => {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(payment)
            });
            const verifyResult = (await verifyResponse.json()) as BookingState;

            if (!verifyResponse.ok || !verifyResult.ok) {
              throw new Error(verifyResult.message || "Payment verification failed.");
            }

            setState({
              ok: true,
              message: "Payment received. Your beauty consultation has been reserved."
            });
          } catch (error) {
            setState({
              ok: false,
              message:
                error instanceof Error
                  ? error.message
                  : "Payment could not be verified. Please contact the team."
            });
          } finally {
            setIsSubmitting(false);
          }
        }
      });

      razorpay.on("payment.failed", (response) => {
        setIsSubmitting(false);
        setState({
          ok: false,
          message: response.error?.description || "Payment failed. Please try again."
        });
      });

      razorpay.open();
    } catch (error) {
      setIsSubmitting(false);
      setState({
        ok: false,
        message: error instanceof Error ? error.message : "Could not start Razorpay checkout."
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState(initialState);

    const formData = new FormData(event.currentTarget);

    if (isWeeklyMasterclass) {
      const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
      const paymentOption = getMasterclassPaymentOption(submitter?.value);
      await handleMasterclassPayment(formData, paymentOption);
      return;
    }

    try {
      const result = await submitBooking(formData);
      setState(result);
    } catch (error) {
      setState({
        ok: false,
        message: error instanceof Error ? error.message : "Could not submit request."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!state.ok || playedSuccessSound.current) return;

    playedSuccessSound.current = true;
    const AudioContextConstructor =
      window.AudioContext ||
      (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextConstructor) return;

    const audioContext = new AudioContextConstructor();
    void audioContext.resume();
    const gain = audioContext.createGain();
    const firstTone = audioContext.createOscillator();
    const secondTone = audioContext.createOscillator();

    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.42);

    firstTone.frequency.setValueAtTime(523.25, audioContext.currentTime);
    firstTone.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.14);
    secondTone.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.18);

    firstTone.connect(gain);
    secondTone.connect(gain);
    gain.connect(audioContext.destination);

    firstTone.start(audioContext.currentTime);
    secondTone.start(audioContext.currentTime + 0.14);
    firstTone.stop(audioContext.currentTime + 0.38);
    secondTone.stop(audioContext.currentTime + 0.42);

    return () => {
      firstTone.disconnect();
      secondTone.disconnect();
      gain.disconnect();
      void audioContext.close();
    };
  }, [state.ok]);

  return (
    <section id="booking" className="bg-white px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="service-booking-title">
      {isWeeklyMasterclass || isBeautyConsultation ? (
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      ) : null}
      <div className="mx-auto w-full max-w-[680px] rounded-[14px] border border-black/10 bg-white p-5 shadow-[0_18px_70px_rgba(8,8,8,0.06)] sm:p-8">
        {state.ok ? (
          <div className="relative" aria-live="polite">
            <AnimatePresence>
              {showNotification ? (
                <motion.div
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed left-1/2 top-24 z-[60] flex w-[calc(100%-32px)] max-w-[430px] -translate-x-1/2 items-center gap-3 rounded-[12px] border border-black/10 bg-white px-4 py-3 text-[13px] text-black shadow-[0_18px_60px_rgba(0,0,0,0.12)]"
                  role="status"
                >
                  <span aria-hidden="true" className="text-[18px] leading-none">
                    ✅
                  </span>
                  <span className="min-w-0 flex-1 leading-5">Success. Your request has been received.</span>
                  <button
                    type="button"
                    className="focus-ring inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-black/55 transition-colors hover:bg-black/[0.06] hover:text-black"
                    aria-label="Close notification"
                    onClick={() => setShowNotification(false)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.34em] text-[#9f7c50]">
              Request Sent
            </p>
            <h2 className="luxury-form-title mt-3">Your request has been received.</h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/62">
              {isWeeklyMasterclass
                ? "Your payment has been verified and your enrollment has been added to the studio CRM. Our team will share your class details within 24 hours."
                : isBeautyConsultation
                  ? "Your payment has been verified. Our team will contact you with consultation details within 24 hours."
                : "Our team will contact you within 24 hours. We have also sent a confirmation email to the address you entered."}
            </p>
          </div>
        ) : (
          <>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.34em] text-[#9f7c50]">
          {page.bookingEyebrow}
        </p>
        <h2
          id="service-booking-title"
          className="luxury-form-title mt-3"
        >
          {page.bookingTitle}
        </h2>
        <p className="mt-3 max-w-xl text-[14px] leading-6 text-black/58">{page.bookingDescription}</p>

        {isBeautyConsultation ? (
          <div className="mt-7 grid gap-5" aria-label={`${page.title} checkout`}>
            <div className="rounded-[12px] border border-black/12 bg-[#fbfaf8] p-5">
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.24em] text-[#9f7c50]">
                Consultation Fee
              </p>
              <p className="mt-3 font-sans text-[34px] font-semibold leading-none tracking-[-0.04em] text-black">
                {consultationPaymentOption.displayAmount}
              </p>
              <p className="mt-4 max-w-lg font-sans text-[14px] font-light leading-6 text-black/58">
                No form is needed here. Checkout opens securely through Razorpay, then the team will coordinate your beauty consultation.
              </p>
            </div>

            {state.message ? (
              <p className={state.ok ? "text-[13px] text-black/70" : "text-[13px] text-red-700"}>
                {state.message}
              </p>
            ) : null}

            <button
              className="focus-ring mt-1 rounded-full bg-[#1f1a17] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-60"
              type="button"
              disabled={isSubmitting}
              onClick={handleConsultationPayment}
            >
              {isSubmitting ? "Opening Checkout" : consultationPaymentOption.buttonLabel}
            </button>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="mt-7 grid gap-4" aria-label={`${page.title} booking form`}>
          <input type="hidden" name="service_slug" value={page.slug} />
          <input type="hidden" name="service_title" value={page.title} />
          {isWeeklyMasterclass ? (
            <>
              <label className="grid gap-2 font-sans text-[13px] font-medium text-black/78">
                Name
                <input
                  className="focus-ring rounded-[10px] border border-black/14 bg-white px-4 py-3 text-[14px] font-normal text-black outline-none placeholder:text-black/32"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 font-sans text-[13px] font-medium text-black/78">
                  Email
                  <input
                    className="focus-ring rounded-[10px] border border-black/14 bg-white px-4 py-3 text-[14px] font-normal text-black outline-none placeholder:text-black/32"
                    name="email"
                    placeholder="Your email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="grid gap-2 font-sans text-[13px] font-medium text-black/78">
                  Phone number
                  <input
                    className="focus-ring rounded-[10px] border border-black/14 bg-white px-4 py-3 text-[14px] font-normal text-black outline-none placeholder:text-black/32"
                    name="phone"
                    placeholder="Your phone number"
                    autoComplete="tel"
                    required
                  />
                </label>
              </div>
              <label className="grid gap-2 font-sans text-[13px] font-medium text-black/78">
                Function
                <select
                  className="focus-ring rounded-[10px] border border-black/14 bg-white px-4 py-3 text-[14px] font-normal text-black outline-none"
                  name="functions"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your level or format
                  </option>
                  {page.functions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 font-sans text-[13px] font-medium text-black/78">
                Notes
                <textarea
                  className="focus-ring min-h-[96px] resize-y rounded-[10px] border border-black/14 bg-white px-4 py-3 text-[14px] font-normal text-black outline-none placeholder:text-black/32"
                  name="notes"
                  placeholder="Tell us about your experience level, goals, or preferred class format"
                />
              </label>
            </>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 font-sans text-[13px] font-medium text-black/78">
                  Name
                  <input
                    className="focus-ring rounded-[10px] border border-black/14 bg-white px-4 py-3 text-[14px] font-normal text-black outline-none placeholder:text-black/32"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="grid gap-2 font-sans text-[13px] font-medium text-black/78">
                  Phone
                  <input
                    className="focus-ring rounded-[10px] border border-black/14 bg-white px-4 py-3 text-[14px] font-normal text-black outline-none placeholder:text-black/32"
                    name="phone"
                    placeholder="Your phone number"
                    autoComplete="tel"
                    required
                  />
                </label>
                <label className="grid gap-2 font-sans text-[13px] font-medium text-black/78">
                  Email
                  <input
                    className="focus-ring rounded-[10px] border border-black/14 bg-white px-4 py-3 text-[14px] font-normal text-black outline-none placeholder:text-black/32"
                    name="email"
                    placeholder="Your email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="grid gap-2 font-sans text-[13px] font-medium text-black/78">
                  Date
                  <input
                    className="focus-ring rounded-[10px] border border-black/14 bg-white px-4 py-3 text-[14px] font-normal text-black outline-none placeholder:text-black/32"
                    name="date"
                    type="date"
                  />
                </label>
              </div>

              <label className="grid gap-2 font-sans text-[13px] font-medium text-black/78">
                Location
                <input
                  className="focus-ring rounded-[10px] border border-black/14 bg-white px-4 py-3 text-[14px] font-normal text-black outline-none placeholder:text-black/32"
                  name="location"
                  placeholder="Venue or city"
                />
              </label>

              <fieldset>
                <legend className="font-sans text-[13px] font-medium text-black/78">Functions</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {page.functions.map((item) => (
                    <label
                      key={item}
                      className="focus-within:ring-2 focus-within:ring-black/30 rounded-full border border-black/12 bg-[#fbfaf8] px-3 py-1.5 text-[13px] text-black/70"
                    >
                      <input className="sr-only" type="checkbox" name="functions" value={item} />
                      {item}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="grid gap-2 font-sans text-[13px] font-medium text-black/78">
                Notes
                <textarea
                  className="focus-ring min-h-[96px] resize-y rounded-[10px] border border-black/14 bg-white px-4 py-3 text-[14px] font-normal text-black outline-none placeholder:text-black/32"
                  name="notes"
                  placeholder="Tell us about your look or event details"
                />
              </label>
            </>
          )}

          {state.message ? (
            <p className={state.ok ? "text-[13px] text-black/70" : "text-[13px] text-red-700"}>
              {state.message}
            </p>
          ) : null}

          {isWeeklyMasterclass ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {(Object.entries(masterclassPaymentOptions) as Array<
                [MasterclassPaymentOptionKey, (typeof masterclassPaymentOptions)[MasterclassPaymentOptionKey]]
              >).map(([value, option]) => (
                <div key={value} className="rounded-[14px] border border-black/12 bg-[#fbfaf8] p-4">
                  <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9f7c50]">
                    {option.label}
                  </p>
                  <p className="mt-2 font-sans text-[26px] font-semibold leading-none tracking-[-0.04em] text-black">
                    {option.displayAmount}
                  </p>
                  <button
                    className="focus-ring mt-4 w-full rounded-full bg-[#1f1a17] px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-60"
                    type="submit"
                    name="payment_plan"
                    value={value}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing Payment" : option.buttonLabel}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <button
              className="focus-ring mt-1 rounded-full bg-[#1f1a17] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting" : "Submit Request"}
            </button>
          )}
        </form>
        )}
          </>
        )}
      </div>
    </section>
  );
}
