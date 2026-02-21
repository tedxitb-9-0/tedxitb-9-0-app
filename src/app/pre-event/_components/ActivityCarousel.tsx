"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/pre-event/carousel-1.jpg",
  "/pre-event/carousel-2.jpg",
  "/pre-event/carousel-3.jpg",
  "/pre-event/carousel-4.jpg",
  "/pre-event/carousel-5.jpg",
  "/pre-event/carousel-6.jpg",
];

export default function ActivityCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative mt-8 w-full overflow-hidden pb-10">
      {/* Navigation Arrows */}
      <div className="pointer-events-none absolute top-[45%] z-50 flex w-full -translate-y-1/2 justify-between px-4 md:px-12">
        <button
          onClick={scrollPrev}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-all hover:scale-110 hover:bg-white focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-8 w-8 text-neutral-800" />
        </button>
        <button
          onClick={scrollNext}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md transition-all hover:scale-110 hover:bg-white focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRight className="h-8 w-8 text-neutral-800" />
        </button>
      </div>

      <div className="overflow-hidden py-12" ref={emblaRef}>
        <div className="flex touch-pan-y" style={{ backfaceVisibility: "hidden" }}>
          {images.map((src, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={index}
                className="flex-[0_0_auto] min-w-0 px-4 transition-transform duration-500 ease-out"
                style={{
                  transform: isActive ? "scale(1)" : "scale(0.85)",
                  opacity: isActive ? 1 : 0.6,
                }}
                onClick={() => {
                  if (!isActive) scrollTo(index);
                }}
              >
                <div
                  className="relative h-[250px] w-[300px] cursor-pointer overflow-hidden rounded-3xl sm:h-[350px] sm:w-[420px] md:h-[420px] md:w-[520px]"
                  style={{
                    boxShadow: isActive
                      ? "0 25px 65px rgba(0,0,0,0.25)"
                      : "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Pre-event activity ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 300px, (max-width: 768px) 420px, 520px"
                    draggable={false}
                    priority={isActive}
                  />
                  {!isActive && (
                    <div className="pointer-events-none absolute inset-0 bg-white/30 transition-opacity duration-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Left/Right Overlays to hide cutoff images */}
      <div className="pointer-events-none absolute left-0 top-0 z-40 h-full w-24 bg-gradient-to-r from-white to-transparent md:w-40 xl:w-64" />
      <div className="pointer-events-none absolute right-0 top-0 z-40 h-full w-24 bg-gradient-to-l from-white to-transparent md:w-40 xl:w-64" />

      {/* Pagination Dots */}
      <div className="mt-8 flex justify-center gap-3">
        {images.map((_, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${isActive
                  ? "w-8 bg-red-500"
                  : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}
