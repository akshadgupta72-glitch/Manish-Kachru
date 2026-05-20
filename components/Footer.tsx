import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white py-8">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-6 px-5 font-sans text-[12px] font-semibold uppercase tracking-[0.34em] text-black/72 sm:flex-row lg:px-8">
        <Link href="/" className="focus-ring text-black">
          LOOKS BY MANISH KACHRU
        </Link>
        <div className="flex flex-wrap items-center gap-8">
          <a
            className="focus-ring transition-opacity hover:opacity-60"
            href="#"
          >
            Instagram
          </a>
          <a
            className="focus-ring transition-opacity hover:opacity-60"
            href="#"
          >
            YouTube
          </a>
          <a
            className="focus-ring transition-opacity hover:opacity-60"
            href="#"
          >
            WhatsApp
          </a>
        </div>
        <p className="text-[12px] text-black/50">© 2026</p>
      </div>
    </footer>
  );
}
