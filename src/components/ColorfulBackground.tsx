"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface ColorfulBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ColorfulBackground({ children, className = "" }: ColorfulBackgroundProps) {
  return (
    <section 
      className={`h-screen w-full overflow-hidden flex flex-col items-center justify-center gap-4 bg-cover bg-center bg-no-repeat relative ${className}`}
      style={{ backgroundImage: "url('/colorfulbg/colorfulbg.png')" }}
    >
      {/* Top Left - floats diagonally from corner */}
      <motion.div
        className="absolute top-0 left-0 w-32 md:w-48"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/colorfulbg/topleft.svg" alt="" width={200} height={200} className="w-full h-auto" />
        </motion.div>
      </motion.div>

      {/* Top Right - floats diagonally from corner */}
      <motion.div
        className="absolute top-0 right-0 w-32 md:w-48"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
      >
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/colorfulbg/topright.svg" alt="" width={200} height={200} className="w-full h-auto" />
        </motion.div>
      </motion.div>

      {/* Bottom Left - floats diagonally from corner */}
      <motion.div
        className="absolute bottom-0 left-0 w-32 md:w-48"
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/colorfulbg/bottomleft.svg" alt="" width={200} height={200} className="w-full h-auto" />
        </motion.div>
      </motion.div>

      {/* Bottom Right - floats diagonally from corner */}
      <motion.div
        className="absolute bottom-0 right-0 w-32 md:w-48"
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.3 }}
      >
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/colorfulbg/bottomright.svg" alt="" width={200} height={200} className="w-full h-auto" />
        </motion.div>
      </motion.div>

      {children}
    </section>
  );
}
