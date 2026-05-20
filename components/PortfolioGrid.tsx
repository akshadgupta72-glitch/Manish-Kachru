"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { selectedWorkImage } from "@/lib/media";

type PortfolioItem = {
  title: string;
  image: string;
  alt: string;
  className: string;
  heightClass?: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    title: "Look 01",
    image: selectedWorkImage("1.JPG"),
    alt: "Selected makeup look 1",
    className: "md:col-span-4"
  },
  {
    title: "Look 02",
    image: selectedWorkImage("2a.JPG"),
    alt: "Selected makeup look 2",
    className: "md:col-span-8"
  },
  {
    title: "Look 03",
    image: selectedWorkImage("3a.JPG"),
    alt: "Selected makeup look 3",
    className: "md:col-span-7"
  },
  {
    title: "Look 04",
    image: selectedWorkImage("4a.jpg"),
    alt: "Selected makeup look 4",
    className: "md:col-span-5"
  },
  {
    title: "Look 05",
    image: selectedWorkImage("5a.JPG"),
    alt: "Selected makeup look 5",
    className: "md:col-span-5",
    heightClass: "h-[330px] sm:h-[520px] md:h-[896px]"
  },
  {
    title: "Look 06",
    image: selectedWorkImage("6a.JPG"),
    alt: "Selected makeup look 6",
    className: "md:col-span-7",
    heightClass: "h-[330px] sm:h-[520px] md:h-[896px]"
  },
  {
    title: "Look 07",
    image: selectedWorkImage("7a.JPG"),
    alt: "Selected makeup look 7",
    className: "md:col-span-5"
  },
  {
    title: "Look 08",
    image: selectedWorkImage("8a.JPG"),
    alt: "Selected makeup look 8",
    className: "md:col-span-7"
  }
];

export function PortfolioGrid() {
  return (
    <section id="portfolio" className="bg-[#f5f5f5] py-24" aria-labelledby="portfolio-title">
      <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
        <div className="mb-8">
          <h2
            id="portfolio-title"
            className="luxury-section-title"
          >
            OUR SELECTED
            <br />
            WORK
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-12">
          {portfolioItems.map((item) => (
            <motion.article
              key={item.title}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "relative h-[230px] overflow-hidden sm:h-[310px] md:h-[520px]",
                item.heightClass,
                item.className
              )}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 66vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
