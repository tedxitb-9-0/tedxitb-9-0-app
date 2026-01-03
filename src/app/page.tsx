"use client";

import Link from "next/link";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-red items-center justify-center bg-gradient-to-b">
      <motion.div 
        className="container flex flex-col items-center justify-center gap-12 px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      </motion.div>
    </main>
  );
}
