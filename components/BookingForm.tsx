export function BookingForm() {
  return (
    <section id="booking" className="py-20 sm:py-28" aria-labelledby="booking-title">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.72fr_1fr]">
        <div>
          <p className="eyebrow mb-4">Booking</p>
          <h2 id="booking-title" className="font-sans text-[48px] font-semibold leading-none tracking-[-0.04em] text-black">
            Begin with a date, a mood, and a face to remember.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-ink/62">
            This form is ready to connect to Supabase or a server action when
            the booking workflow is finalized.
          </p>
        </div>

        <form className="grid gap-4" aria-label="Booking enquiry form">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-xs uppercase tracking-editorial text-ink/55">
              Name
              <input
                className="focus-ring border border-ink/15 bg-transparent px-4 py-3 text-base normal-case tracking-normal text-ink"
                name="name"
                autoComplete="name"
                required
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-editorial text-ink/55">
              Email
              <input
                className="focus-ring border border-ink/15 bg-transparent px-4 py-3 text-base normal-case tracking-normal text-ink"
                type="email"
                name="email"
                autoComplete="email"
                required
              />
            </label>
          </div>
          <label className="grid gap-2 text-xs uppercase tracking-editorial text-ink/55">
            Occasion
            <input
              className="focus-ring border border-ink/15 bg-transparent px-4 py-3 text-base normal-case tracking-normal text-ink"
              name="occasion"
            />
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-editorial text-ink/55">
            Message
            <textarea
              className="focus-ring min-h-36 resize-y border border-ink/15 bg-transparent px-4 py-3 text-base normal-case tracking-normal text-ink"
              name="message"
              required
            />
          </label>
          <button
            className="focus-ring mt-2 w-full bg-ink px-6 py-4 text-xs font-semibold uppercase tracking-editorial text-paper transition-colors hover:bg-rouge sm:w-auto sm:justify-self-start"
            type="submit"
          >
            Send Enquiry
          </button>
        </form>
      </div>
    </section>
  );
}
