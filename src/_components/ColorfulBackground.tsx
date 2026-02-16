"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

interface ColorfulBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showSmiles?: boolean;
}

export default function ColorfulBackground({
  children,
  className = "",
  showSmiles = true,
}: ColorfulBackgroundProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms - assets exit when scrolling down
  const leftSmileX = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rightSmileX = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const leftAssetY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const leftAssetX = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rightAssetY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const rightAssetX = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={containerRef}
      className={`relative z-0 flex h-fit min-h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden bg-cover bg-center bg-no-repeat select-none ${className}`}
      style={{ backgroundImage: "url('/colorfulbg/colorfulbg.png')" }}
    >
      {/* Left Smiles */}
      <motion.div
        className={`${showSmiles ? "absolute" : "hidden"} top-[10%] left-[5%] z-20 w-40 md:w-sm`}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        style={{ x: leftSmileX }}
      >
        <Image
          src="/colorfulbg/leftsmile.png"
          alt="Decorative smile pattern"
          width={400}
          height={400}
          className="h-auto w-full"
          draggable={false}
        />
      </motion.div>
      {/* Right Smiles */}
      <motion.div
        className={`${showSmiles ? "absolute" : "hidden"} absolute right-[5%] bottom-0 z-20 w-48 md:top-[10%] md:w-lg`}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        style={{ x: rightSmileX }}
      >
        <Image
          src="/colorfulbg/rightsmile.png"
          alt="Decorative smile pattern"
          width={400}
          height={400}
          className="h-auto w-full"
          draggable={false}
        />
      </motion.div>
      {/* Left Asset - parallax scroll, below corner elements */}
      <motion.div
        className="absolute top-32 left-0 z-0 w-lg md:w-2xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        style={{ x: leftAssetX, y: leftAssetY }}
      >
        <Image
          src="/colorfulbg/leftasset.png"
          alt="Decorative geometric pattern"
          width={400}
          height={400}
          className="h-auto w-full"
          draggable={false}
        />
      </motion.div>
      {/* Right Asset - parallax scroll, below corner elements */}
      <motion.div
        className="absolute right-0 bottom-32 z-0 w-lg md:w-2xl"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        style={{ x: rightAssetX, y: rightAssetY }}
      >
        <Image
          src="/colorfulbg/rightasset.png"
          alt="Decorative geometric pattern"
          width={400}
          height={400}
          className="h-auto w-full opacity-50"
          draggable={false}
        />
      </motion.div>
      {/* Top Left - floats diagonally from corner */}
      <motion.div
        className="absolute top-0 left-0 z-10 w-64 md:w-2xl"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        >
          <Image
            src="/colorfulbg/topleft.png"
            alt="Decorative corner element"
            width={200}
            height={200}
            className="h-auto w-full"
            draggable={false}
          />
        </motion.div>
      </motion.div>
      {/* Top Leftish - entry animation only, hidden on small screens */}
      <motion.div
        className="absolute top-0 left-80 z-10 hidden w-64 md:block md:w-xl"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <Image
          src="/colorfulbg/topbubble.png"
          alt="Decorative bubble element"
          width={200}
          height={200}
          className="h-auto w-full"
          draggable={false}
        />
      </motion.div>
      {/* Top Rightish - entry animation only, hidden on small screens */}
      <motion.div
        className="absolute top-0 right-40 z-10 hidden w-48 md:block md:w-lg"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
      >
        <Image
          src="/colorfulbg/topmark.png"
          alt="Decorative mark element"
          width={200}
          height={200}
          className="h-auto w-full"
          draggable={false}
        />
      </motion.div>
      {/* Top Right  - floats diagonally from corner */}
      <motion.div
        className="absolute top-0 right-0 z-10 w-48 md:w-64"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        >
          {" "}
          <Image
            src="/colorfulbg/topright.png"
            alt="Decorative corner element"
            width={200}
            height={200}
            className="h-auto w-full"
            draggable={false}
          />{" "}
        </motion.div>{" "}
      </motion.div>{" "}
      {/* Top Right - floats diagonally from corner */}{" "}
      <motion.div
        className="absolute top-0 right-0 z-10 w-48 md:w-64"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        >
          <Image
            src="/colorfulbg/topright.png"
            alt="Decorative corner element"
            width={200}
            height={200}
            className="h-auto w-full"
            draggable={false}
          />
        </motion.div>
      </motion.div>
      {/* Bottom Left - floats diagonally from corner */}
      <motion.div
        className="absolute bottom-0 left-0 z-10 w-64 md:w-72"
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
      >
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        >
          <Image
            src="/colorfulbg/bottomleft.png"
            alt="Decorative corner element"
            width={200}
            height={200}
            className="h-auto w-full"
            draggable={false}
          />
        </motion.div>
      </motion.div>
      {/* Bottom Right - floats diagonally from corner */}
      <motion.div
        className="absolute right-0 bottom-0 z-10 w-48 md:w-96"
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.3 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        >
          <Image
            src="/colorfulbg/bottomright.png"
            alt="Decorative corner element"
            width={200}
            height={200}
            className="h-auto w-full"
            draggable={false}
          />
        </motion.div>
      </motion.div>
      {/* White fade at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full">
        <Image
          src="/colorfulbg/whitefade.png"
          alt="Decorative gradient fade"
          width={400}
          height={400}
          className="h-auto w-full"
          draggable={false}
        />
      </div>
      {children}
    </section>
  );
}
