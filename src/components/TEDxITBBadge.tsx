"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function TEDxITBBadge( {className}: {className?: string} ) {
  return (
    <motion.div
      className={`z-20 mb-6 flex-row flex ${className}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          duration: 3.2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.8
        }}
        className="px-8 bg-white rounded-full flex items-center justify-center flex-row shadow-[0_0_40px_rgba(147,51,234,0.6),0_10px_25px_rgba(0,0,0,0.15),inset_0_2px_10px_rgba(147,51,234,0.2)]"
        style={{ willChange: 'transform' }}
      >
        <Image
          src="/TEDxITB.png"
          alt="TEDxITB Presents"
          width={256}
          height={64}
          className="h-6 md:h-8 w-auto"
          draggable={false}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
