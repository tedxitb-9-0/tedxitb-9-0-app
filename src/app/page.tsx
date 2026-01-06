"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import ColorfulBackground from "~/components/ColorfulBackground";
import TEDxITBBadge from "~/components/TEDxITBBadge";
import ExploreSection from "~/components/explore-section";
import ExclusivelySection from "~/components/exclusively-section";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="hidden sr-only">TEDxITB 9.0 - Happiness Through Colors</h1>
      
      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative">
        <ColorfulBackground>
          <TEDxITBBadge />
          <motion.div
            className="z-30 w-[80%] max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          > <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} > <Image src="/hero-section.webp" alt="TEDxITB 9.0 - Happiness Through Colors" width={800}
                height={400}
                className="w-full h-auto"
                draggable={false}
                priority
              />
            </motion.div>
          </motion.div>
        </ColorfulBackground>
      </section>

      <ExploreSection />
      <ExclusivelySection />
      {/* Exclusively Section */}
         </main>
  );
}
