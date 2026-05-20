"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { manishImage } from "@/lib/media";

const heroStats = [
  { label: "clients", value: "1000+" },
  { label: "Reviews", value: "400+" },
  { label: "Satisfaction", value: "99%" },
  { label: "Audience", value: "100k+" }
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.82,
      ease: easeOut
    }
  }
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 14]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-black pt-[72px]"
      aria-labelledby="hero-title"
    >
      <div className="relative min-h-[calc(100svh-72px)] w-full">
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.05, ease: easeOut }}
          aria-hidden="true"
        >
          <Image
            src={manishImage("Hero.png")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[76%_63%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.76)_27%,rgba(0,0,0,0.28)_52%,rgba(0,0,0,0.03)_78%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_54%,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_34%,rgba(0,0,0,0.3)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent" />
        </motion.div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] w-full max-w-[1200px] items-center px-5 py-12 sm:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-[600px]"
          >
            <motion.h1
              id="hero-title"
              variants={itemVariants}
              className="luxury-hero-title"
            >
              Crafted For The Exception.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-7 max-w-[560px] font-sans text-[16px] font-light leading-[24px] tracking-normal text-[#e7e7e7] sm:text-[18px] sm:leading-[28px]"
            >
              High-end makeup tailored with precision, for those who expect
              nothing less than perfection.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-3 min-[420px]:flex-row">
              <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/bridals#booking"
                  className="focus-ring inline-flex min-w-[165px] justify-center rounded-[5px] bg-white px-4 py-3 font-sans text-[15px] font-medium leading-none text-black transition-colors duration-300 hover:bg-white/88 sm:text-[16px]"
                >
                  Book Your Session
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                <Link
                  href="#portfolio"
                  className="focus-ring inline-flex min-w-[165px] justify-center rounded-[5px] border border-white/55 bg-transparent px-4 py-3 font-sans text-[15px] font-medium leading-none text-white shadow-[0_18px_48px_rgba(0,0,0,0.18)] transition-colors duration-300 hover:border-white hover:bg-white/10 sm:text-[16px]"
                >
                  View Work
                </Link>
              </motion.div>
            </motion.div>

            <motion.dl
              variants={itemVariants}
              className="mt-10 grid max-w-[560px] grid-cols-2 gap-x-10 gap-y-7 sm:mt-12 sm:grid-cols-4 sm:gap-x-12"
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <dt className="border-b border-white/34 pb-2 font-sans text-[12px] font-medium leading-[20px] tracking-[-0.05em] text-white">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-sans text-[31px] font-medium leading-[24px] tracking-[-0.05em] text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
