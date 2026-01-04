"use client";

import Link from "next/link";
import { motion } from "motion/react";
import PlainBackground from "~/components/PlainBackground";

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
    <main className="flex min-h-screen flex-col  items-center justify-center ">
      <PlainBackground color="red">


      </PlainBackground>  
    </main>
  );
}
