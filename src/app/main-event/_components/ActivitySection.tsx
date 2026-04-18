"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

import ActivityCard from "./ActivityCard";
import CountdownTimer from "./CountdownTimer";

const activities = [
  {
    title: "Naura Tsabita",
    imageSrc: "/main-event/naura-tsabita.png",
    imageAlt: "Naura Tsabita",
    releaseAt: new Date(2026, 3, 24),
  },
  {
    title: "Zahid Ibrahim",
    imageSrc: "/main-event/zahid-ibrahim.png",
    imageAlt: "Zahid Ibrahim",
    releaseAt: new Date(2026, 3, 26),
  },
  {
    title: "Keisha Roschelline",
    imageSrc: "/main-event/keisha-rochelline.png",
    imageAlt: "Keisha Roschelline",
    releaseAt: new Date(2026, 3, 27),
  },
] as const;

function hasReleasePassed(releaseAt: Date) {
  const start = new Date(releaseAt);
  start.setHours(0, 0, 0, 0);
  return Date.now() >= start.getTime();
}

const ActivitySection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const releasedActivities = useMemo(() => {
    if (!mounted) return [];
    return activities.filter((a) => hasReleasePassed(a.releaseAt));
  }, [mounted]);

  const carouselItems =
    releasedActivities.length > 0 ? [...releasedActivities] : [];

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const pauseAutoScrollRef = useRef(false);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    if (releasedActivities.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const loopWidth = container.scrollWidth / 2;
    container.scrollLeft = loopWidth;

    let animationFrameId = 0;

    const tick = () => {
      if (!pauseAutoScrollRef.current) {
        container.scrollLeft -= 0.45;

        if (container.scrollLeft <= 0) {
          container.scrollLeft += loopWidth;
        } else if (container.scrollLeft >= loopWidth) {
          container.scrollLeft -= loopWidth;
        }
      }

      animationFrameId = window.requestAnimationFrame(tick);
    };

    animationFrameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [releasedActivities.length]);

  return (
    <section className="relative overflow-hidden bg-white bg-[url('/pattern-bg.svg')] bg-repeat py-12">
      <div className="pointer-events-none absolute top-0 left-0 hidden h-full w-full lg:block">
        <Image
          src="/main-event/last-year-bg.png"
          alt="Decorative geometric pattern"
          fill
          className="object-cover opacity-100"
          draggable={false}
        />
        <motion.div
          className="absolute bottom-10 left-0 z-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <Image
            src="/main-event/left-asset.png"
            alt="Left decorative asset"
            width={100}
            height={800}
            className="h-auto w-[100px]"
            draggable={false}
          />
        </motion.div>
        <motion.div
          className="absolute top-10 right-0 z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <Image
            src="/main-event/right-asset.png"
            alt="Right decorative asset"
            width={200}
            height={700}
            className="h-auto w-[100px]"
            draggable={false}
          />
        </motion.div>
      </div>
      <div className="relative z-10 container mx-auto max-w-352 px-4 pt-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          {/* "Workshop and Activities"*/}
          <div className="mx-auto mb-6 flex justify-center">
            <Image
              src="/main-event/workshop-activities.png"
              alt="Workshop and Activities"
              width={865}
              height={95}
              className="h-auto w-[80%] max-w-3xl md:w-[70%]"
              draggable={false}
            />
          </div>
        </motion.div>

        {/* Activity cards — only after release day; otherwise placeholder */}
        {releasedActivities.length === 0 ? (
          <div className="mx-auto w-full max-w-4xl py-8">
            <CountdownTimer to={new Date(2026, 3, 24)} showBuyButton={false} />
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-4 lg:gap-8"
            onMouseEnter={() => {
              pauseAutoScrollRef.current = true;
            }}
            onMouseLeave={() => {
              pauseAutoScrollRef.current = false;
            }}
            onTouchStart={() => {
              pauseAutoScrollRef.current = true;
            }}
            onTouchEnd={() => {
              pauseAutoScrollRef.current = false;
            }}
          >
            {carouselItems.map((activity, index) => (
              <div
                key={`${activity.title}-${index}`}
                data-activity-slide
                className="shrink-0 basis-[88%] sm:basis-[68%] lg:basis-[46%] xl:basis-[32%]"
              >
                <ActivityCard
                  title={activity.title}
                  imageSrc={activity.imageSrc}
                  imageAlt={activity.imageAlt}
                  index={index % releasedActivities.length}
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ActivitySection;
