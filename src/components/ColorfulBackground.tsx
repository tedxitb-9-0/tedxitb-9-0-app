"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";


interface ColorfulBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ColorfulBackground({ children, className = "" }: ColorfulBackgroundProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms - assets exit when scrolling down
  const leftAssetY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const leftAssetX = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rightAssetY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const rightAssetX = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section 
      ref={containerRef}
      className={`h-screen w-full overflow-hidden flex flex-col items-center justify-center gap-2 md:gap-4 bg-cover bg-center bg-no-repeat relative select-none ${className}`}
      style={{ backgroundImage: "url('/colorfulbg/colorfulbg.png')" }}
    >
      {/* Left Asset - parallax scroll, below corner elements */}
      <motion.div
        className="absolute top-32 left-0 w-lg md:w-2xl z-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        style={{ x: leftAssetX, y: leftAssetY }}
      >
        <Image src="/colorfulbg/leftasset.png" alt="" width={400} height={400} className="w-full h-auto" draggable={false} />
      </motion.div>

      {/* Right Asset - parallax scroll, below corner elements */}
      <motion.div
        className="absolute bottom-32 right-0 w-lg md:w-2xl z-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        style={{ x: rightAssetX, y: rightAssetY }}
      >
        <Image src="/colorfulbg/rightasset.png" alt="" width={400} height={400} className="w-full h-auto opacity-50" draggable={false} />
      </motion.div>

      {/* Top Left - floats diagonally from corner */}
      <motion.div
        className="absolute top-0 left-0 w-64 md:w-2xl z-10"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/colorfulbg/topleft.png" alt="" width={200} height={200} className="w-full h-auto" draggable={false} />
        </motion.div>
      </motion.div>

      {/* Top Leftish - entry animation only, hidden on small screens */}
      <motion.div
        className="hidden md:block absolute top-0 left-80 w-64 md:w-xl z-10"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <Image src="/colorfulbg/topbubble.png" alt="" width={200} height={200} className="w-full h-auto" draggable={false} />
      </motion.div>

      {/* Top Rightish - entry animation only, hidden on small screens */}
      <motion.div
        className="hidden md:block absolute top-0 right-40 w-48 md:w-lg z-10"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
      >
        <Image src="/colorfulbg/topmark.png" alt="" width={200} height={200} className="w-full h-auto" draggable={false} />
      </motion.div>

      {/* Top Right  - floats diagonally from corner */}
      <motion.div
        className="absolute top-0 right-0 w-48 md:w-64 z-10"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" as const }}
        > <Image src="/colorfulbg/topright.png" alt="" width={200} height={200} className="w-full h-auto" draggable={false} /> </motion.div> </motion.div> {/* Top Right - floats diagonally from corner */} <motion.div
        className="absolute top-0 right-0 w-48 md:w-64 z-10"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/colorfulbg/topright.png" alt="" width={200} height={200} className="w-full h-auto" draggable={false} />
        </motion.div>
      </motion.div>

      {/* Bottom Left - floats diagonally from corner */}
      <motion.div
        className="absolute bottom-0 left-0 w-64 md:w-72 z-10"
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
      >
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/colorfulbg/bottomleft.png" alt="" width={200} height={200} className="w-full h-auto" draggable={false} />
        </motion.div>
      </motion.div>

      {/* Bottom Right - floats diagonally from corner */}
      <motion.div
        className="absolute bottom-0 right-0 w-48 md:w-96 z-10"
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.3 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/colorfulbg/bottomright.png" alt="" width={200} height={200} className="w-full h-auto" draggable={false} />
        </motion.div>
      </motion.div>

      {/* White fade at bottom */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <Image src="/colorfulbg/whitefade.png" alt="" width={400} height={400} className="w-full h-auto" draggable={false} />
      </div>

      {children}
    </section>
  );
}
