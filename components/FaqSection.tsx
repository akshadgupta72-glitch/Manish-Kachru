import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How far in advance should I book my bridal makeup?",
    a: "For peak wedding dates, booking 2–6 months in advance is recommended. If your date is sooner, still reach out—limited last-minute availability may be possible."
  },
  {
    q: "Do you offer trial sessions before the wedding day?",
    a: "Yes. Trials can be scheduled to finalize your preferred skin finish, eye shape, and overall mood, and to plan timings for the wedding day."
  },
  {
    q: "What products do you use?",
    a: "A curated mix of professional and luxury products selected for long wear, skin compatibility, and how they photograph under different lighting conditions."
  },
  {
    q: "Will the makeup last throughout the entire event?",
    a: "The goal is long-lasting, camera-ready wear. With proper prep and setting, it typically lasts through ceremonies and receptions; touch-up guidance is provided as needed."
  },
  {
    q: "Do you travel for destination weddings?",
    a: "Yes—travel and logistics are available based on location and dates. Share your venue and schedule and we’ll plan accordingly."
  },
  {
    q: "What makes Looks by Manish Kachru different from other makeup artists?",
    a: "A cinematic approach to beauty: precision skin work, thoughtful structure, and an understanding of photography and lighting—so the look is flawless in person and on camera."
  }
];

export function FaqSection() {
  return (
    <section className="bg-white py-20" aria-labelledby="faq-title">
      <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
        <h2
          id="faq-title"
          className="luxury-section-title"
        >
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <div className="mt-10">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((f, idx) => (
              <AccordionItem key={f.q} value={`item-${idx}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
