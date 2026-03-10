"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface FloatingImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
}

export default function FloatingImage({
  src,
  alt,
  width,
  height,
  className = "",
  containerClassName = "",
}: FloatingImageProps) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={containerClassName}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </motion.div>
  );
}
