"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { videoFile } from "@/lib/media";

const bullets = [
  "HD bridal & editorial techniques",
  "Skin prep & product mastery",
  "Live Q&A and portfolio reviews",
  "Limited to 20 seats per session"
];

export function MasterclassSection() {
  return (
    <section id="classes" className="bg-white py-24" aria-labelledby="classes-title">
      <div className="mx-auto grid w-full max-w-[1240px] gap-6 px-4 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:px-8">
        <div className="relative overflow-hidden rounded-[16px] border border-black/10 bg-white p-8 text-black sm:p-10">
          <div>
            <p className="luxury-eyebrow mb-4">
              LEARN FROM THE BEST
            </p>
            <h2
              id="classes-title"
              className="luxury-section-title"
            >
              WEEKLY
              <br />
              MASTERCLASS
            </h2>
            <p className="mt-6 max-w-2xl text-[16px] leading-7 text-black/75">
              Join Manish for live, intimate beauty sessions every week. Learn
              editorial techniques, skin prep secrets, and the art of personalized
              face design.
            </p>

            <ul className="mt-8 grid gap-3 text-sm text-black/80">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 inline-block text-[13px] text-[#D8AE64]">✦</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 grid gap-6">
            <div className="flex items-end gap-8">
              <div>
                <p className="text-[36px] leading-none text-black">₹499</p>
                <p className="mt-2 text-[12px] text-black/55">Per Session</p>
              </div>
              <div>
                <p className="text-[36px] leading-none text-black">₹1,499</p>
                <p className="mt-2 text-[12px] text-black/55">Monthly Access</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/weekly-masterclasses"
                  className="focus-ring inline-flex items-center justify-center rounded-[5px] border border-black/70 px-4 py-3 text-[14px] text-black transition-colors hover:bg-black hover:text-white"
                >
                  Enroll Today
                </Link>
              </motion.div>
              <p className="text-[12px] text-black/55">Only 8 seats remaining</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto aspect-[2/3] w-full max-w-[420px] overflow-hidden rounded-[16px] bg-black lg:justify-self-end">
          <video
            src={videoFile("Weekly master class optimised", "FacetuneEAE98DF0-0F13-46AA-827E-1DF380C36DBB copy.mp4")}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
}
