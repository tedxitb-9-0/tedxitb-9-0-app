"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ColorfulBackground from "~/components/ColorfulBackground";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <ColorfulBackground>
        <motion.div
          className="z-10 w-[80%] max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/hero-section.png"
              alt="TEDxITB 9.0 - Happiness Through Colors"
              width={800}
              height={400}
              className="w-full h-auto"
              draggable={false}
              priority
            />
          </motion.div>
        </motion.div>
      </ColorfulBackground>
    </main>
  );
}
