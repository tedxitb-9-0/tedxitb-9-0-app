"use client";

import Image from "next/image";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <div className="relative container mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between gap-12 px-4 pt-32 pb-16 lg:flex-row">
      <motion.div
        className="absolute top-10 left-[25%] z-0 w-lg md:w-4xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <Image
          src="/pre-event/top-asset.png"
          alt="Decorative geometric pattern"
          width={400}
          height={400}
          className="h-auto w-full"
          draggable={false}
        />
      </motion.div>
      <motion.div
        className="absolute -bottom-25 left-[25%] z-0 w-lg md:w-5xl"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <Image
          src="/pre-event/bottom-asset.png"
          alt="Decorative geometric pattern"
          width={1800}
          height={500}
          className="h-auto w-full"
          draggable={false}
        />
      </motion.div>
      {/* Text section*/}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="z-10 flex w-full flex-col items-center justify-center gap-6 lg:w-1/2 lg:items-start"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
          className="flex w-full justify-center lg:justify-start"
        >
          <Image
            src="/pre-event/tedxpressive.png"
            width={600}
            height={150}
            alt="TEDxpressive"
            className="w-full max-w-[450px] object-contain md:max-w-xl"
            priority
          />
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
          className="flex w-full justify-center lg:justify-start"
        >
          <Image
            src="/pre-event/glimpse.png"
            width={500}
            height={120}
            alt="A Glimpse into Last Year's Pre-Event Experience"
            className="w-full max-w-[350px] object-contain md:max-w-md"
            priority
          />
        </motion.div>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
          className="text-navy max-w-[450px] text-center text-sm leading-relaxed font-medium md:text-base lg:text-left"
        >
          TEDxplore, a hands-on pre-event designed to tackle the theme{" "}
          <strong>PUZZLE: The Struggles of Tomorrow</strong>. We brought
          together creators, activists, and leaders for 8 hours of exhibitions,
          workshops, and honest talk about what it actually takes to build our
          future.
        </motion.p>
      </motion.div>

      {/* image section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="relative -z-10 flex w-full justify-center lg:w-1/2 lg:justify-end"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/pre-event/hero-asset.png"
            width={2000}
            height={2000}
            alt="Pre-Event Hero Asset"
            className="w-full max-w-[450px] object-contain md:max-w-2xl xl:max-w-5xl"
            priority
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
