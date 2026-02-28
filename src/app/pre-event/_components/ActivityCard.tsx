"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface ActivityCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  index?: number;
}

export default function ActivityCard({
  title,
  description,
  imageSrc,
  imageAlt,
  index = 0,
}: ActivityCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: index * 0.15,
          },
        },
      }}
      className="group relative mx-auto w-full"
      style={{ maxWidth: 400, aspectRatio: "400/540" }}
    >
      {/* Layer 1 (back)*/}
      <div className="absolute top-0 right-0 z-0 h-[76%] w-[95%]">
        <Image
          src="/pre-event/back-layer.svg"
          alt="Decorative back layer"
          fill
          className="object-fill"
          draggable={false}
        />
      </div>

      {/* Decorative accent top-left */}
      <div className="absolute top-[15%] -left-25 z-3 h-48 w-48 md:h-52 md:w-52">
        <Image
          src="/pre-event/curvy-atas.png"
          alt="Decorative top accent"
          fill
          className="object-contain"
          draggable={false}
        />
      </div>

      {/* Decorative accent bottom-right */}
      <div className="absolute -right-20 bottom-[5%] z-3 h-48 w-48 md:h-52 md:w-52">
        <Image
          src="/pre-event/curvy-bawah.png"
          alt="Decorative bottom accent"
          fill
          className="object-contain"
          draggable={false}
        />
      </div>

      {/* Layer 2 (middle) – Cover image */}
      <div className="absolute top-[4%] right-[4%] z-2 h-[55%] w-[88%] overflow-hidden rounded-xl transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:-translate-y-6 group-hover:-rotate-2">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 30vw"
          draggable={false}
        />
      </div>

      {/* Layer 3 (front)*/}
      <div className="absolute bottom-0 left-0 z-8 h-[62%] w-[96%]">
        <Image
          src="/pre-event/top-layer.svg"
          alt="Front card layer"
          fill
          className="object-fill"
          draggable={false}
        />

        {/* Card content positioned over the front card */}
        <div className="relative z-4 flex h-full flex-col justify-start px-6 pt-[22%] pb-6 md:px-8 md:pt-[26%] md:pb-8">
          <h3
            className="mb-3 text-xl text-white md:text-2xl"
            style={{
              fontFamily: "var(--font-titan-one), cursive",
              textShadow:
                "2px 2px 0 rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            {title}
          </h3>
          <p className="text-justify text-xs leading-relaxed text-white/90 md:text-sm">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
