"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface ActivityCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  index?: number;
}

export default function ActivityCard({
  title,
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
      style={{ maxWidth: 400, aspectRatio: "400/580" }}
    >
      <div className="absolute top-4 right-0 z-0 h-[76%] w-full">
        <Image
          src="/main-event/back-layer.svg"
          alt="Decorative back layer"
          fill
          className="object-fill"
          draggable={false}
        />
      </div>

      <div className="absolute top-[2%] right-[9%] z-2 aspect-3/4 w-[82%] overflow-hidden rounded-xl transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:-translate-y-6 group-hover:-rotate-2">
        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 30vw"
            draggable={false}
          />
        </div>
      </div>

      <div className="absolute bottom-[0%] left-0 z-8 h-[56%] w-[96%] -translate-y-2 md:-translate-y-3">
        <Image
          src="/main-event/top-layer.svg"
          alt="Front card layer"
          fill
          className="object-fill"
          draggable={false}
        />

        <div className="relative z-4 flex h-full flex-col justify-start px-6 pt-[36%] pb-6 sm:w-1/2 sm:pt-[30%] md:px-8 md:pt-[33%] md:pb-8">
          <h3
            className="text-xl text-white md:text-2xl"
            style={{
              fontFamily: "var(--font-titan-one), cursive",
              textShadow:
                "2px 2px 0 rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
