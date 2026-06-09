type PolicySection = {
  title: string;
  body: string;
};

type PolicyPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PolicySection[];
};

export function PolicyPage({ eyebrow, title, intro, sections }: PolicyPageProps) {
  return (
    <main className="bg-white pt-24 text-black md:pt-28">
      <section className="mx-auto w-full max-w-[980px] px-5 py-16 md:py-24 lg:px-8">
        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.34em] text-[#D8AE64]">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl font-sans text-[42px] font-semibold uppercase leading-[0.96] tracking-[-0.04em] md:text-[64px]">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl font-sans text-[16px] font-light leading-7 text-black/65">{intro}</p>

        <div className="mt-12 divide-y divide-black/10 border-y border-black/10">
          {sections.map((section) => (
            <section key={section.title} className="grid gap-4 py-8 md:grid-cols-[240px_1fr]">
              <h2 className="font-sans text-[14px] font-semibold uppercase tracking-[0.18em] text-black">
                {section.title}
              </h2>
              <p className="font-sans text-[15px] font-light leading-7 text-black/68">{section.body}</p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
