import Image from "next/image";
import { manishImage } from "@/lib/media";

const expertise = [
  "Bridal Transformations",
  "Editorial & Fashion Makeup",
  "Pre-Wedding & Cinematic Shoots",
  "HD & Long-Lasting Finishes"
];

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-24" aria-labelledby="about-title">
      <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
        <h2 id="about-title" className="luxury-section-title mb-8">
          ABOUT ME
        </h2>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="relative min-h-[620px] overflow-hidden rounded-[16px]">
            <Image
              src={manishImage("About me.png")}
              alt="Manish Kachru portrait"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-[28px] text-black">Meet Manish Kachru</h3>

            <div className="mt-6 grid gap-4 text-[16px] leading-8 text-black/80">
              <p>
                Manish Kachru is a luxury bridal and editorial makeup artist known for
                crafting timeless, camera-ready transformations. With a sharp eye for
                detail and a deep understanding of lighting, photography, and cinematic
                storytelling, he creates looks that are not just beautiful but
                unforgettable.
              </p>
              <p>
                Specializing in bridal glamour and modern elegance, Manish focuses on
                enhancing natural features while delivering a refined, long-lasting
                finish. Every look is tailored to complement the bride’s personality,
                outfit, and event setting.
              </p>
              <p>
                Beyond traditional bridal artistry, Manish blends makeup with visual
                direction ensuring every transformation looks flawless both in person
                and on camera.
              </p>
              <p>His work reflects precision, creativity, and a commitment to excellence.</p>
              <p className="mt-2 text-[16px]">Signature Expertise</p>
            </div>
            <ul className="mt-6 grid gap-3 text-[16px] text-black/90">
              {expertise.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
