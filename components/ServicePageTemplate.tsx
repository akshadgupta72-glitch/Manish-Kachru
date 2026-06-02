import Image from "next/image";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ServiceBookingForm } from "@/components/ServiceBookingForm";
import { ServiceLooksTicker } from "@/components/ServiceLooksTicker";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type ServicePage } from "@/lib/service-pages";

type ServicePageTemplateProps = {
  page: ServicePage;
};

export function ServicePageTemplate({ page }: ServicePageTemplateProps) {
  const usesAccordionDetails = ["bridals", "party-hd-makeups", "editorial-film-direction"].includes(page.slug);

  return (
    <main className="bg-white">
      <Navbar />

      <section className="relative min-h-[720px] overflow-hidden pt-[72px]" aria-labelledby="service-hero-title">
        <Image
          src={page.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/42 to-black/16" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />

        <div className="relative mx-auto flex min-h-[648px] w-full max-w-[1200px] items-end px-5 pb-16 pt-24 sm:px-8 lg:pb-24">
          <div className="max-w-[610px] text-white">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.34em] text-white/65 tablet:text-[12px]">
              {page.eyebrow}
            </p>
            <h1
              id="service-hero-title"
              className="luxury-page-title mt-5"
            >
              {page.title}
            </h1>
            <p className="mt-7 max-w-[520px] font-sans text-[16px] leading-7 text-white/68">{page.description}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#booking"
                className="focus-ring inline-flex items-center justify-center rounded-[5px] bg-white px-5 py-4 font-sans text-[14px] font-medium leading-none text-black transition-colors hover:bg-white/88"
              >
                Book Your Session
              </Link>
              {page.showLooksTicker !== false ? (
                <Link
                  href="#looks"
                  className="focus-ring inline-flex items-center justify-center rounded-[5px] border border-white/70 px-5 py-4 font-sans text-[14px] font-medium leading-none text-white transition-colors hover:bg-white hover:text-black"
                >
                  View Work
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="what-you-get-title">
        <div className="mx-auto grid w-full max-w-[1200px] items-stretch gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="luxury-eyebrow mb-4">
              {page.detailEyebrow}
            </p>
            <h2
              id="what-you-get-title"
              className="luxury-detail-title"
            >
              {page.detailTitle}
            </h2>
            {usesAccordionDetails ? (
              <div className="mt-8">
                <p className="max-w-[620px] font-sans text-[15px] font-light leading-7 text-black/58">
                  {page.detailIntro}
                </p>
                <Accordion type="single" collapsible className="mt-7 grid gap-2">
                  {page.faqs.map((item, index) => (
                    <AccordionItem
                      key={item.question}
                      value={`detail-${index}`}
                      className="rounded-[12px] border border-black/16 px-4 sm:px-5"
                    >
                      <AccordionTrigger className="py-5 text-left font-sans text-[16px] font-semibold leading-6 text-black hover:no-underline">
                        <span className="mr-3 text-black/42">{String(index + 1).padStart(2, "0")}</span>
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 pl-9 font-sans text-[14px] font-light leading-7 text-black/60">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ) : (
              <div className="mt-8 border border-black/16 p-5 sm:p-6">
                <h3 className="flex items-center gap-3 font-sans text-[20px] font-semibold leading-7 text-black">
                  <span className="text-[#D8AE64]">✦</span>
                  {page.detailIntroTitle}
                </h3>
                <p className="mt-4 max-w-[620px] font-sans text-[14px] font-light leading-6 text-black/55">
                  {page.detailIntro}
                </p>
              </div>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {page.details.map((detail) => (
                <div key={detail.label} className="border border-black/16 p-4">
                  <p className="font-sans text-[13px] font-light leading-5 text-black/50">{detail.label}</p>
                  <p className="mt-1.5 font-sans text-[18px] font-semibold leading-6 text-black">{detail.value}</p>
                </div>
              ))}
            </div>

            {page.learnItems ? (
              <div className="mt-6">
                <h3 className="font-sans text-[20px] font-semibold leading-7 text-black">
                  {page.slug === "weekly-masterclasses" ? "What You'll Learn" : "Included Focus"}
                </h3>
                <ul className="mt-4 grid gap-2 font-sans text-[15px] font-light leading-6 text-black/72">
                  {page.learnItems.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <figure className="h-full min-h-[380px] overflow-hidden rounded-[16px] bg-black sm:min-h-[460px] lg:min-h-full">
            <video
              src={page.videoSrc}
              className="h-full min-h-[380px] w-full object-cover sm:min-h-[460px] lg:min-h-full"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              aria-label={page.videoLabel}
            />
          </figure>
        </div>
      </section>

      {page.showLooksTicker !== false ? (
        <div id="looks">
          <ServiceLooksTicker eyebrow={page.looksEyebrow} title={page.looksTitle} videos={page.looksVideos} />
        </div>
      ) : null}

      <ServiceBookingForm page={page} />
      <FinalCta
        sectionId="final-cta"
        bookingHref="#booking"
        portfolioHref={page.showLooksTicker !== false ? "#looks" : "#booking"}
      />
      <Footer />
    </main>
  );
}
