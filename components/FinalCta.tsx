"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { manishImage } from "@/lib/media";

type FinalCtaProps = {
  sectionId?: string;
  bookingHref?: string;
  portfolioHref?: string;
};

export function FinalCta({ sectionId = "booking", bookingHref = "/bridals#booking", portfolioHref = "#portfolio" }: FinalCtaProps) {
  return (
    <section
      id={sectionId}
      className="py-0"
      aria-labelledby="cta-title"
    >
      <div className="relative min-h-[703px] overflow-hidden">
        <Image
          src={manishImage("Cta.png")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto flex min-h-[703px] w-full max-w-[1240px] items-center justify-center px-4 text-center lg:px-8">
          <h2
            id="cta-title"
            className="font-sans text-[34px] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-white mobile-m:text-[38px] mobile-l:text-[42px] tablet:text-[48px]"
          >
            Ready to transform your look?
          </h2>
          <div className="absolute top-[56%] mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
              <Link
                href={bookingHref}
                className="focus-ring inline-flex rounded-[5px] bg-white px-4 py-3 text-[14px] text-black transition-colors hover:bg-white/86"
              >
                Book Your Session
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
              <Link
                href={portfolioHref}
                className="focus-ring inline-flex rounded-[5px] border border-white/70 px-4 py-3 text-[14px] text-white transition-colors hover:bg-white hover:text-black"
              >
                View Work
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
