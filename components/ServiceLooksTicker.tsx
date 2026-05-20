"use client";

import { useEffect, useRef, useState } from "react";

type ServiceLooksTickerProps = {
  eyebrow: string;
  title: string;
  videos: string[];
};

function LookVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "700px" }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [shouldLoad]);

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.12]"
      muted
      loop
      playsInline
      preload="none"
    />
  );
}

export function ServiceLooksTicker({ eyebrow, title, videos }: ServiceLooksTickerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const loopedVideos = [...videos, ...videos, ...videos];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const setMiddle = () => {
      scroller.scrollLeft = scroller.scrollWidth / 3;
    };

    const handleScroll = () => {
      const segment = scroller.scrollWidth / 3;
      if (scroller.scrollLeft < segment * 0.35) {
        scroller.scrollLeft += segment;
      }
      if (scroller.scrollLeft > segment * 1.65) {
        scroller.scrollLeft -= segment;
      }
    };

    setMiddle();
    scroller.addEventListener("scroll", handleScroll, { passive: true });

    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-white py-20 sm:py-24" aria-label={title}>
      <div className="mx-auto w-full max-w-[1200px] px-5 text-center sm:px-8">
        <p className="luxury-eyebrow">
          {eyebrow}
        </p>
        <h2 className="luxury-section-title mt-5">
          {title}
        </h2>
      </div>

      <div
        ref={scrollerRef}
        className="mt-10 w-full overflow-x-auto overflow-y-visible pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max animate-[ticker_60s_linear_infinite] gap-4 px-4 hover:[animation-play-state:paused] sm:px-8">
          {loopedVideos.map((video, index) => (
            <div
              key={`${video}-${index}`}
              className="group relative h-[360px] w-[260px] shrink-0 overflow-hidden rounded-[16px] bg-black sm:h-[480px] sm:w-[350px]"
            >
              <LookVideo src={video} />
              <span className="absolute left-5 top-5 inline-flex h-4 w-4 rounded-[4px] border border-white/45" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
