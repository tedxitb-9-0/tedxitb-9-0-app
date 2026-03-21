"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";

const MAP_LINK = "https://maps.app.goo.gl/BSqnyRkCGiFCGi5R6";

export default function VenueSection() {
    return (
        <motion.div
            className="relative z-30 container mx-auto flex max-w-6xl flex-col items-center px-4 py-18 md:py-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.div
                className="mb-8 w-full max-w-xl md:mb-10 md:max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
            >
                <Image
                    src="/pre-event/venue.png"
                    alt="Venue Information"
                    width={900}
                    height={180}
                    className="h-auto w-full object-contain"
                    draggable={false}
                />
            </motion.div>

            <motion.div
                className="w-full max-w-4xl rounded-4xl bg-[#9A1AEF] p-4 shadow-[0_22px_45px_rgba(48,0,96,0.45)] md:p-6"
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
            >
                <div className="overflow-hidden rounded-3xl">
                    <Image
                        src="/pre-event/altim.png"
                        alt="Aula Timur ITB venue"
                        width={1600}
                        height={900}
                        className="h-auto w-full object-cover"
                        draggable={false}
                        priority={false}
                    />
                </div>
            </motion.div>

            <motion.div
                className="mt-5 flex w-full max-w-4xl flex-col gap-3 sm:flex-row sm:justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.16 }}
            >
                <motion.a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#9A1AEF] px-5 py-2 text-base font-bold text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-0.5"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
                >
                    <FaLocationDot className="h-4 w-4" aria-hidden="true" />
                    Aula Timur ITB
                </motion.a>
                <motion.div
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#9A1AEF] px-5 py-2 text-base font-bold text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{
                        duration: 0.45,
                        ease: "easeOut",
                        delay: 0.22,
                    }}
                >
                    <FaCalendarDays className="h-4 w-4" aria-hidden="true" />
                    28 March 2026
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
