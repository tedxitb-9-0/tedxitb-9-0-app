"use client";

import { useEffect, useRef, useState } from "react";

const images = Array.from({ length: 9 }); // 9 dummy images

export default function ActivityCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = Array.from(container.children) as HTMLElement[];
      const containerCenter =
        container.scrollLeft + container.offsetWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      children.forEach((child, index) => {
        const childCenter =
          child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(containerCenter - childCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative mt-32 w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex items-center overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
      >
      {images.map((_, index) => {
        const offset = index - activeIndex;
        const absOffset = Math.abs(offset);
        const isActive = offset === 0;

        // 🔥 Dynamic scale based on distance
        let scale = 1;

        if (absOffset === 1) scale = 0.88;
        else if (absOffset === 2) scale = 0.78;
        else if (absOffset >= 3) scale = 0.72;

        return (
          <div
            key={index}
            className="snap-center flex-shrink-0 transition-all duration-500 ease-out"
            style={{
              transform: `
                scale(${scale})
                translateX(${offset * -60}px)
              `,
              zIndex: 30 - absOffset,
              margin: "0 -80px",
              opacity: absOffset > 3 ? 0.25 : 1,
            }}
          >
            <div
              className="h-[420px] w-[520px] rounded-3xl bg-neutral-300"
              style={{
                boxShadow: isActive
                  ? "0 25px 55px rgba(0,0,0,0.22)"
                  : "0 15px 35px rgba(0,0,0,0.16)",
              }}
            />
          </div>
        );
      })}
      </div>
      {/* Left Fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-white to-transparent z-40" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-white to-transparent z-40" />
      {/* Dots */}
        <div className="mt-10 flex justify-center gap-3">
          {images.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-6 bg-red-500"
                    : "w-2.5 bg-neutral-300"
                }`}
              />
            );
          })}
        </div>
    </section>
    
  );
}