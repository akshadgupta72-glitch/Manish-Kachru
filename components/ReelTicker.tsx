"use client";

import { useEffect, useRef, useState } from "react";
import { videoFile } from "@/lib/media";

const videos = [
  videoFile("Where Makeup meets cinema optimised", "IMG_1103.mp4"),
  videoFile("Where Makeup meets cinema optimised", "IMG_3992.mp4"),
  videoFile("Where Makeup meets cinema optimised", "IMG_4974.mp4"),
  videoFile("Where Makeup meets cinema optimised", "IMG_5253.mp4"),
  videoFile("Where Makeup meets cinema optimised", "IMG_6097 2.mp4"),
  videoFile("Where Makeup meets cinema optimised", "IMG_6345.mp4"),
  videoFile("Where Makeup meets cinema optimised", "IMG_9368.mp4"),
  videoFile("Where Makeup meets cinema optimised", "IMG_9496.mp4"),
  videoFile("Where Makeup meets cinema optimised", "IMG_9528.mp4"),
  videoFile("Where Makeup meets cinema optimised", "IMG_9786.mp4"),
  videoFile("Where Makeup meets cinema optimised", "IMG_9813.mp4"),
  videoFile("Where Makeup meets cinema optimised", "IMG_9885.mp4"),
  videoFile("Where Makeup meets cinema optimised", "SaveClip.App_AQNI0hu9vlRexPfwVq2HTWxVHZOooGxVKnEP3aNvGEzr_uP0JF4EPNPozLzRGiiVQRT6a8CYyFgK9w86OhFpYjK4GqXVDFaIy7YDaCY.mp4"),
  videoFile("Where Makeup meets cinema optimised", "SaveClip.App_AQNNt4XT037ImjotaAyQmXQ3uK-WfHirKcLaeT5EYFBJVasbFZ5GYpJfkHHl4QQPJn9WQGCfgQ1diQYKGZX02D7rkRaVCJPeG77aQ3s.mp4"),
  videoFile("Where Makeup meets cinema optimised", "SaveClip.App_AQP_CCvPtmIeBLIBHAiqsyomOj2jGtfkxo8oMrvAwf_tMVBmw371Pt5-txaEBiQX0fDaCrLk5mjFYEuQIxbX_p4bOFADsHXxmK-LWUU.mp4"),
  videoFile("Where Makeup meets cinema optimised", "Untitled.mp4"),
  videoFile("Where Makeup meets cinema optimised", "Video-297.mp4"),
  videoFile("Where Makeup meets cinema optimised", "Video-395.mp4"),
  videoFile("Where Makeup meets cinema optimised", "Video-802.mp4")
];

function TickerVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
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
      ref={videoRef}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.2]"
      src={shouldLoad ? src : undefined}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}

export function ReelTicker() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const tickerVideos = [...videos, ...videos, ...videos];

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
    <section className="bg-white py-20" aria-label="Where makeup meets cinema">
      <div className="mx-auto w-full max-w-[1240px] px-4 lg:px-8">
        <p className="luxury-eyebrow text-center">
          MOTION AND BEAUTY
        </p>
        <h2 className="luxury-section-title mt-4 text-center">
          WHERE MAKEUP MEETS CINEMA
        </h2>
      </div>

      <div
        ref={scrollerRef}
        className="mt-8 w-full overflow-x-auto overflow-y-visible pb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max animate-[ticker_66s_linear_infinite] gap-4 px-4 hover:[animation-play-state:paused] lg:px-8">
          {tickerVideos.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="group relative h-[435px] w-[320px] shrink-0 overflow-hidden rounded-[16px] bg-black"
            >
              <TickerVideo src={src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
