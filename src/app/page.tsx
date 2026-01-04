"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ColorfulBackground from "~/components/ColorfulBackground";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="hidden sr-only">TEDxITB 9.0</h1>
      
      {/* Hero Section */}
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

      {/* Explore Section */}
      <section 
        className="min-h-screen md:h-screen w-full flex flex-col items-center justify-center py-12 md:py-0 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/exploreTEDxITBeffectsIZIN.png')" }}
      >
        <motion.div
          className="z-10 w-full md:w-[90%] max-w-[8xl] md:max-w-6xl mb-8 md:mb-12"
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
              width={1000}
              height={600}
              className="w-full h-auto"
              draggable={false}
              priority
            />
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-20 w-full max-w-7xl px-4">
          {/* Main Event Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-xl p-6 shadow-2xl"
            style={{ background: 'linear-gradient(to bottom right, #E12D2D, #FA5151)' }}
          >
            <div className="flex items-center gap-3 mb-4 justify-between">
              <div>
                <Image
                  src="/senyummainevent.svg"
                  alt="Main Event"
                  width={40}
                  height={40}
                  className="w-12 h-12"
                  draggable={false}
                />
              </div>
              <h2 className="text-4xl font-titan text-white">Main Event</h2>
            </div>
            <p className="text-white text-justify  text-sm mb-6 leading-relaxed">
              TEDxITB is an independent, locally licensed TED event held at the Bandung Institute of Technology
            </p>
            <div className="flex justify-end">
              <button className="bg-white text-red-600 font-semibold text-sm px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md">
                Learn more
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* About Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="rounded-xl p-6 shadow-2xl"
            style={{ background: 'linear-gradient(to bottom right, #FF6A15, #FF975C)' }}
          >
            <div className="flex items-center gap-3 justify-between mb-4">
              <div>
                <Image
                  src="/aboutsenyum.svg"
                  alt="Main Event"
                  width={40}
                  height={40}
                  className="w-12 h-12"
                  draggable={false}
                />
              </div>
              <h2 className="text-4xl font-titan text-white">About</h2>
            </div>
            <p className="text-white text-justify  text-sm mb-6 leading-relaxed">
              TEDxITB is an independent, locally licensed TED event held at the Bandung Institute of Technology
            </p>
            <div className="flex justify-end">
              <button className="bg-white text-orange-600 font-semibold text-sm px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md">
                Learn more
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Pre Event Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="rounded-xl p-6 shadow-2xl"
            style={{ background: '#FFB820' }}
          >
            <div className="flex items-center gap-3 mb-4 justify-between">
              <div>
                <Image
                  src="/senyumpreevent.svg"
                  alt="Pre Event"
                  width={40}
                  height={40}
                  className="w-12 h-12"
                  draggable={false}
                />
              </div>
              <h2 className="text-4xl font-titan text-white">Pre Event</h2>
            </div>
            <p className="text-white text-justify text-sm mb-6 leading-relaxed">
              TEDxITB is an independent, locally licensed TED event held at the Bandung Institute of Technology
            </p>
            <div className="flex justify-end">
              <button className="bg-white text-yellow-600 font-semibold text-sm px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md">
                Learn more
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
