"use client";

import { motion } from "motion/react";
import Image from "next/image";
import PlainBackground from "~/components/PlainBackground";

export default function AboutHero() {
  return (
    <PlainBackground color="red">
      <div className="flex min-h-screen items-center justify-center pt-16 md:py-20 my-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-20 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 md:px-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font text-center text-5xl font-black text-white md:text-6xl lg:text-7xl"
          >
            <Image 
              src="/about/about.png"
              alt="TEDxITB Presents"
              width={504}
              height={90}
              className="h-12 md:h-18 w-auto"
              draggable={false}
              priority
            />
          </motion.div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 mt-3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full rounded-xl bg-white p-8 shadow-xl"
            >
              <h3 className="mb-3 text-2xl font-extrabold text-red md:text-3xl">
                What does TED stand for?
              </h3>
              <p className="text-foreground/90 text-justify text-sm leading-7 md:text-base">
                TED stands for Technology, Entertainment, Design — three
                broad subject areas that are collectively shaping our world.
                But a TED conference is broader still, showcasing important
                research and ideas from all disciplines and exploring how
                they connect. The goal is to expand the imagination, make
                unexpected connections, inspire conversation and set the
                ball in motion for meaningful learning and change.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full rounded-xl bg-white p-8 shadow-xl"
            >
              <h3 className="mb-3 text-2xl font-extrabold text-red md:text-3xl">
                What is TEDx?
              </h3>
              <p className="text-foreground/90 text-justify text-sm leading-7 md:text-base">
                {`TEDx is a grassroots initiative, created in the spirit of
                TED's overall mission to research and discover "ideas worth
                spreading." TEDx brings the spirit of TED to local
                communities around the globe through TEDx events. TEDx
                events include live speakers and recorded TED Talks, and are
                organized independently under a free license granted by TED.`}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PlainBackground>
  );
}
