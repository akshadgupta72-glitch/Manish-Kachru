"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { serviceImage } from "@/lib/media";

const services = [
  {
    title: "Bridal Signature Experience",
    description:
      "Signature bridal beauty with polished skin, sculpted detail, and a calm luxury experience.",
    image: serviceImage("Bridal.JPG"),
    href: "/bridals"
  },
  {
    title: "Party HD Makeup",
    description:
      "Camera-ready HD glam for celebrations, cocktails, receptions, and modern evening moments.",
    image: serviceImage("Party.jpg"),
    href: "/party-hd-makeups"
  },
  {
    title: "Editorial & Film Direction",
    description:
      "Fashion-forward makeup direction for campaigns, films, shoots, and visual storytelling.",
    image: serviceImage("Editorial & Film Direction.JPG"),
    href: "/editorial-film-direction"
  },
  {
    title: "Beauty Consultation",
    description:
      "A private beauty edit for product clarity, skin prep, and a refined everyday signature.",
    image: serviceImage("Consultation .png"),
    href: "/beauty-consultation"
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20" aria-labelledby="services-title">
      <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
        <p className="luxury-eyebrow mb-3 text-center">
          WHAT WE OFFER
        </p>
        <h2
          id="services-title"
          className="luxury-section-title text-center"
        >
          SERVICES
        </h2>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {services.map((service) => (
            <motion.article
              key={service.title}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="group relative min-h-[500px] overflow-hidden rounded-[16px]"
            >
              <Link href={service.href} className="focus-ring block min-h-[500px]" aria-label={`Open ${service.title}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/64 to-black/18" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="font-sans text-[24px] font-bold leading-8 drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-[500px] font-sans text-[14px] font-light leading-5 text-white/50 drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex rounded-[5px] border border-white/24 bg-white/10 px-4 py-3 font-sans text-[14px] font-normal text-white transition-colors group-hover:bg-white group-hover:text-black">
                    View Service
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
