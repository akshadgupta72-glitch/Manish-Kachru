"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export type PortfolioItem = {
  title: string;
  category: string;
  image: string;
  alt: string;
  featured?: boolean;
};

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <motion.article
      className={item.featured ? "lg:col-span-2" : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-mist">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes={item.featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 29vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-sans text-[14px] font-medium leading-none text-ink">
            {item.title}
          </h3>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink/55">
            {item.category}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
