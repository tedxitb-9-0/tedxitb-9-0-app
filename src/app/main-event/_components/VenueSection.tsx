"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";

/** Opens the same place as the embedded map (Google Maps short link) */
const MAP_LINK = "https://maps.app.goo.gl/SkzmSvDWzFL1NZRa9";

/** Official embed from Google Maps → Share → Embed a map */
const MAP_EMBED_SRC =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6411.034374791016!2d107.61781696917907!3d-6.909601958184898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64a0d1c259d%3A0x847f5df767b81f2b!2sGraha%20Pos%20Indonesia!5e0!3m2!1sen!2sid!4v1776451794262!5m2!1sen!2sid";

export default function VenueSection() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden pt-32 pb-16 md:pb-32">
            {/* Purple Cloud at the top */}
            <motion.div
                className="absolute top-0 right-0 left-0 z-40 w-full rotate-180"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
                <Image
                    src="/main-event/purple-cloud.webp"
                    alt="Purple Clouds Top"
                    width={1920}
                    height={400}
                    className="h-auto w-full"
                    draggable={false}
                    priority
                />
            </motion.div>

            <div className="relative z-30 container mx-auto flex max-w-6xl flex-col items-center px-4">
                {/* Title */}
                <motion.div
                    className="mb-8 w-full max-w-xl md:mb-12 md:max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                >
                    <Image
                        src="/main-event/venue-information.webp"
                        alt="Venue Information"
                        width={900}
                        height={180}
                        className="h-auto w-full object-contain drop-shadow-xl"
                        draggable={false}
                    />
                </motion.div>

                {/* Map Container */}
                <motion.div
                    className="w-full max-w-4xl rounded-[2rem] border-x-2 border-t-2 border-white/30 bg-gradient-to-b from-[#443BF4] to-[#261DC7] p-4 pb-4 shadow-[0_22px_45px_rgba(38,29,199,0.45)] sm:p-6 sm:pb-6"
                    initial={{ opacity: 0, y: 28, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                >
                    <div className="relative z-99 aspect-video min-h-[280px] w-full overflow-hidden rounded-2xl bg-neutral-200 shadow-inner">
                        <iframe
                            title="Peta lokasi Graha Pos Indonesia, Jl. Banda No. 30, Bandung"
                            src={MAP_EMBED_SRC}
                            className="absolute inset-0 h-full w-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </motion.div>

                {/* Info Buttons */}
                <motion.div
                    className="relative z-40 mt-6 flex w-full max-w-4xl flex-col gap-4 sm:flex-row sm:justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{
                        duration: 0.55,
                        ease: "easeOut",
                        delay: 0.16,
                    }}
                >
                    <motion.a
                        href={MAP_LINK}
                        target="_blank"
                        rel="noreferrer"
                        className="font-titan inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#9A1AEF_0%,#443BF4_63%)] px-6 py-3 text-xl text-white shadow-xl transition-transform hover:-translate-y-0.5 hover:brightness-110 sm:text-base md:px-8 md:text-xl"
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{
                            duration: 0.45,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                    >
                        <FaLocationDot
                            className="h-5 w-5 text-yellow-300"
                            aria-hidden="true"
                        />
                        Graha Pos Indonesia{" "}
                    </motion.a>
                    <motion.div
                        className="font-titan z-99 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#9A1AEF_0%,#443BF4_63%)] px-6 py-3 text-sm text-white shadow-xl sm:text-base md:px-8 md:text-xl"
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{
                            duration: 0.45,
                            ease: "easeOut",
                            delay: 0.22,
                        }}
                    >
                        <FaCalendarDays
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                        10 May 2026
                    </motion.div>
                </motion.div>

                <motion.div
                    className="absolute -bottom-48 left-1/2 z-10 flex w-full max-w-2xl -translate-x-1/2 justify-center sm:-bottom-64 md:-bottom-80 md:max-w-3xl lg:-bottom-[28rem] lg:max-w-4xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                >
                    <div className="relative flex w-full justify-center">
                        <Image
                            src="/main-event/mascot-arms.webp"
                            alt="Mascot Arms"
                            width={1000}
                            height={500}
                            className="absolute bottom-0 z-20 h-auto w-[110%] max-w-none md:w-[120%]"
                            draggable={false}
                        />
                        <Image
                            src="/main-event/mascot-head.webp"
                            alt="Mascot Head"
                            width={800}
                            height={800}
                            className="absolute bottom-32 z-10 h-auto w-[80%] md:w-[90%]"
                            draggable={false}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Cloud at the bottom */}
            <motion.div
                className="absolute right-0 bottom-0 left-0 z-20 w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
                <Image
                    src="/main-event/cloud.webp"
                    alt="Clouds"
                    width={1920}
                    height={600}
                    className="h-auto w-full drop-shadow-2xl"
                    draggable={false}
                    priority
                />
            </motion.div>
        </div>
    );
}
