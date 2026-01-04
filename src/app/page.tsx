"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import ColorfulBackground from "~/components/ColorfulBackground";
import TEDxITBBadge from "~/components/TEDxITBBadge";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="hidden sr-only">TEDxITB 9.0 - Happiness Through Colors</h1>
      
      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative">
        <ColorfulBackground>
          <TEDxITBBadge />
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
            className="z-10 w-[120%] md:w-[90%] max-w-[8xl] mb-5 md:max-w-[8xl] mt-20 md:mt-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/exploretedx.png"
                alt="TEDxITB 9.0 - Happiness Through Colors"
                width={1000}
                height={600}
                className="w-full h-auto scale-125 md:scale-100"
                draggable={false}
                priority
              />
            </motion.div>
          </motion.div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8 lg:gap-20 w-full max-w-7xl px-4">
          {/* Main Event Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-xl p-4 md:p-6 shadow-2xl"
            style={{ background: 'linear-gradient(to bottom right, #E12D2D, #FA5151)' }}
          >
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 justify-between">
              <div>
                <Image
                  src="/senyummainevent.svg"
                  alt="Main Event"
                  width={40}
                  height={40}
                  className="w-8 h-8 md:w-12 md:h-12"
                  draggable={false}
                />
              </div>
              <h2 className="text-2xl md:text-4xl font-titan text-white">Main Event</h2>
            </div>
            <p className="text-white text-justify text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
              TEDxITB is an independent, locally licensed TED event held at the Bandung Institute of Technology
            </p>
            <div className="flex justify-end">
              <Link href="/main-event">
                <button className="bg-white text-red-600 font-semibold text-sm px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md">
                  Learn more
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </motion.div>

          {/* About Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="rounded-xl p-4 md:p-6 shadow-2xl"
            style={{ background: 'linear-gradient(to bottom right, #FF6A15, #FF975C)' }}
          >
            <div className="flex items-center gap-2 md:gap-3 justify-between mb-3 md:mb-4">
              <div>
                <Image
                  src="/aboutsenyum.svg"
                  alt="Main Event"
                  width={40}
                  height={40}
                  className="w-8 h-8 md:w-12 md:h-12"
                  draggable={false}
                />
              </div>
              <h2 className="text-2xl md:text-4xl font-titan text-white">About</h2>
            </div>
            <p className="text-white text-justify text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
              TEDxITB is an independent, locally licensed TED event held at the Bandung Institute of Technology
            </p>
            <div className="flex justify-end">
              <Link href="/about">
                <button className="bg-white text-orange-600 font-semibold text-sm px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md">
                  Learn more
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Pre Event Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="rounded-xl p-4 md:p-6 shadow-2xl"
            style={{ background: '#FFB820' }}
          >
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 justify-between">
              <div>
                <Image
                  src="/senyumpreevent.svg"
                  alt="Pre Event"
                  width={40}
                  height={40}
                  className="w-8 h-8 md:w-12 md:h-12"
                  draggable={false}
                />
              </div>
              <h2 className="text-2xl md:text-4xl font-titan text-white">Pre Event</h2>
            </div>
            <p className="text-white text-justify text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
              TEDxITB is an independent, locally licensed TED event held at the Bandung Institute of Technology
            </p>
            <div className="flex justify-end">
              <Link href="/pre-event">
                <button className="bg-white text-yellow-600 font-semibold text-sm px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md">
                  Learn more
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Exclusively Section */}
      <section className="min-h-screen md:h-screen w-full flex flex-col items-center justify-center relative overflow-hidden py-12 md:py-0 md:pb-[-20]">
        <ColorfulBackground>
          {/* Cloud Border Frame */}
          <div className="absolute top-0 left-0 w-full h-auto z-20 pointer-events-none">
            <Image
              src="/cloud.png"
              alt=""
              width={2000}
              height={100}
              className="w-full h-auto"
              draggable={false}
            />
          </div>

          <motion.div
            className="z-10 w-[105%] md:w-[90%] max-w-[8xl] md:max-w-[8xl] mt-20 md:mt-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/exclusively.png"
                alt="TEDxITB 9.0 - Happiness Through Colors"
                width={1000}
                height={600}
                className="w-full h-auto scale-125 md:scale-100"
                draggable={false}
                priority
              />
            </motion.div>
          </motion.div>

          <div className="flex flex-row gap-3 md:gap-40 z-10 px-4 w-full max-w-[320px] md:max-w-4xl mb-8 md:mb-32">
            {/* Magazine Card */}
            <Link href="/magazine" className="w-1/2 md:w-auto md:flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl py-4 px-3 md:py-10 md:px-12 shadow-lg flex flex-col items-center text-center h-full cursor-pointer hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(to bottom right, #FF3A8C, #FF75AE)' }}
              >
              <div className="bg-white rounded-xl p-2 md:py-8 md:px-10 mb-2 md:mb-4 w-full aspect-square flex items-center justify-center relative">
                <div className="absolute top-1 right-1 md:top-3 md:right-3">
                  <Image
                    src="/smilesmall.svg"
                    alt="Magazine"
                    width={120}
                    height={120}
                    className="w-5 md:w-10 h-auto object-contain"
                    draggable={false}
                  />
                </div>
                <Image
                  src="/magazine.svg"
                  alt="Magazine"
                  width={120}
                  height={120}
                  className="w-16 md:w-40 h-auto object-contain"
                  draggable={false}
                />
              </div>
              <h3 className="text-base md:text-4xl font-titan mt-2 md:mt-5 text-white mb-1 md:mb-2">Magazine</h3>
              <p className="text-white text-[7px] md:text-sm leading-tight">Check out TEDxITB 9.0's magazine!</p>
            </motion.div>
            </Link>

            {/* Merchandise Card */}
            <Link href="/merchandise" className="w-1/2 md:w-auto md:flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl py-4 px-3 md:py-10 md:px-12 shadow-lg flex flex-col items-center text-center h-full cursor-pointer hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(to bottom right, #443BF4, #635BF7)' }}
              >
              <div className="bg-white rounded-xl p-2 md:py-8 md:px-10 mb-2 md:mb-4 w-full aspect-square flex items-center justify-center relative">
                <div className="absolute top-1 right-1 md:top-3 md:right-3">
                  <Image
                    src="/smilemerchandise.svg"
                    alt="Merchandise"
                    width={120}
                    height={120}
                    className="w-5 md:w-10 h-auto object-contain"
                    draggable={false}
                  />
                </div>
                <Image
                  src="/merchandise.svg"
                  alt="Merchandise"
                  width={120}
                  height={120}
                  className="w-16 md:w-40 h-auto object-contain"
                  draggable={false}
                />
              </div>
              <h3 className="text-base md:text-4xl font-titan mt-2 md:mt-5 text-white mb-1 md:mb-2">Merchandise</h3>
              <p className="text-white text-[7px] md:text-sm leading-tight">Check out TEDxITB 9.0's Merchandise!</p>
            </motion.div>
            </Link>
          </div>
        </ColorfulBackground>
      </section>
    </main>
  );
}
