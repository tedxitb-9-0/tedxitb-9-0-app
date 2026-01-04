"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ColorfulBackground from "~/components/ColorfulBackground";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="hidden sr-only">TEDxITB 9.0</h1>
      
      {/* Hero Section - 200vh */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative">
        <ColorfulBackground>
          <motion.div
            className="z-20 mb-6 flex-row flex"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="px-8  bg-white rounded-full flex items-center justify-center flex-row shadow-[0_0_40px_rgba(147,51,234,0.6),0_10px_25px_rgba(0,0,0,0.15),inset_0_2px_10px_rgba(147,51,234,0.2)]"
            >
              <Image
                src="/TEDxITB.svg"
                alt="TEDxITB Presents"
                width={256}
                height={64}
                className="h-8 md:h-10 w-auto"
                draggable={false}
                priority
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="z-10 w-[80%] max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/hero-section.svg"
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
      </section>

      {/* Explore Section - 70vh */}
      <section className="h-[70vh] w-full flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
        <motion.div
          className="z-10 w-[80%] max-w-8xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/exploreTEDxITB.svg"
              alt="TEDxITB 9.0 - Happiness Through Colors"
              width={800}
              height={400}
              className="w-full h-auto"
              draggable={false}
              priority
            />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
