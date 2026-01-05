"use client";

import { motion } from "motion/react";
import Image from "next/image";
import TEDxITBBadge from "~/components/TEDxITBBadge";

export default function HappinessThroughColors() {
  return (
    <div className="max-w-1xl mx-auto relative">
      <div className="flex flex-col items-center px-6">
        <div className="flex flex-col items-center">
          <TEDxITBBadge className="mx-auto"/>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:max-w-8xl mx-auto mt-2 h-auto w-full max-w-2xl md:max-w-7xl z-40 relative"
          >
            <Image
              src="/about/Happiness.svg"
              alt="Happiness Through Colors"
              width={1200}
              height={200}
              className="w-full h-auto"
            />
          </motion.div>
        </div>

         {/* Background decorative pattern */}
          <div className="hidden lg:block absolute top-0 left-0 -z-20 w-full pointer-events-none">
            <Image 
              src="/about/htcbackground.svg"  
              alt="Decorative geometric pattern" 
              width={1000} 
              height={1000} 
              className="w-full h-auto opacity-100" 
              draggable={false} 
            />
          </div>


        <div className="relative mt-8 w-screen">               
          {/* Left Hand - sticks to page border */}
          <motion.div
            className="pointer-events-none absolute top-[15%] left-0 z-10 hidden h-auto w-[30%] -translate-y-1/2 lg:block"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{
              y: [0, -20, 0], // idle float
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeOut" },
              x: { duration: 0.8, ease: "easeOut" },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Image
              src="/about/LeftHand.png"
              alt="Left Hand"
              width={500}
              height={500}
              className="h-full w-full object-contain"
            />
          </motion.div>

          {/* Right Hand - sticks to page border */}
          <motion.div
            className="pointer-events-none absolute top-[80%] right-0 z-10 hidden h-auto w-[30%] -translate-y-1/2 lg:block"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{
              y: [0, -20, 0], // slightly larger float
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              x: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              y: {
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5, // phase offset
              },
            }}
          >
            <Image
              src="/about/RightHand.png"
              alt="Right Hand"
              width={500}
              height={500}
              className="h-full w-full object-contain"
            />
          </motion.div>

          <div className="relative flex w-full flex-col items-center justify-center md:block">

            {/* --- SPLIT VIEW: Two Separate Papers (< lg) --- */}
            <div className="flex w-full flex-col gap-6 px-6 lg:hidden">
              {/* Paper 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full rounded-xl p-8"
                style={{
                  backgroundImage: "url('/about/PaperBG.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "100% 100%", 
                }}
              >
                <p className="text-foreground/90 text-justify text-xs leading-6 font-bold sm:text-sm sm:leading-7 px-5">
                  Happiness Through Colors was born from the belief that each person holds
                  their own unique color of happiness. Its message is simple yet profound,
                  that every individual has the right to define and celebrate the color
                  that represents their joy, whether it comes through <span className="text-red">achievement </span>,
                  <span className="text-orange"> passion</span>, <span className="text-yellow"> creativity</span>, 
                  <span className="text-pink"> relationships</span>, <span className="text-purple"> reflection</span> and 
                  <span className="text-blue"> self-acceptance</span>.
                </p>
              </motion.div>

              {/* Paper 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="relative w-full rounded-xl p-8"
                style={{
                  backgroundImage: "url('/about/PaperBG.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "100% 100%", 
                }}
              >
                <p className="text-foreground/90 text-justify text-xs leading-6 font-bold sm:text-sm sm:leading-7 px-5">
                  Color is chosen as a universal metaphor because each one carries its own
                  meaning, and when brought together, they form a spectrum that reflects
                  the beauty of diverse human happiness. This theme is not about forcing a
                  single definition of happiness, but about celebrating the differences in
                  how people experience joy and realizing that our lives become richer
                  when every color is acknowledged and celebrated together.
                </p>
              </motion.div>
            </div>

            {/* --- DESKTOP VIEW: Single Combined Paper (>= lg) --- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative hidden lg:block mx-auto w-[90%] h-auto"
              style={{
                backgroundImage: "url('/about/PaperBG.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "contain",
                backgroundAttachment: "scroll",
              }}
            >
              <div className="flex h-full items-center justify-center px-16 py-12 md:px-32 md:py-16 lg:py-20">
                <div className="bg-transparent max-w-3xl">
                  <p className="text-foreground/90 text-justify text-xs leading-6 font-bold sm:text-xs sm:leading-7 md:text-md lg:text-lg lg:leading-7 xl:leading-10">
                  Happiness Through Colors was born from the belief that each person holds
                  their own unique color of happiness. Its message is simple yet profound,
                  that every individual has the right to define and celebrate the color
                  that represents their joy, whether it comes through <span className="text-red">achievement</span>,
                  <span className="text-orange"> passion</span>, <span className="text-yellow"> creativity</span>, 
                  <span className="text-pink"> relationships</span>, <span className="text-purple"> reflection</span> and 
                  <span className="text-blue"> self-acceptance</span>.
                  </p>
                  <p className="text-foreground/90 text-justify text-xs leading-6 font-bold sm:text-xs sm:leading-7 lg:text-lg lg:leading-7 xl:leading-10 mt-4">
                    Color is chosen as a universal metaphor because each one carries its
                    own meaning, and when brought together, they form a spectrum that
                    reflects the beauty of diverse human happiness. This theme is not
                    about forcing a single definition of happiness, but about celebrating
                    the differences in how people experience joy and realizing that our
                    lives become richer when every color is acknowledged and celebrated
                    together.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
