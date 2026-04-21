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
          src="/main-event/venue.png"
          alt="Venue Information"
          width={900}
          height={180}
          className="h-auto w-full object-contain"
          draggable={false}
        />
      </motion.div>

      <motion.div
        className="w-full max-w-4xl rounded-4xl bg-[#E12D2D] p-4 shadow-[0_22px_45px_rgba(225,45,45,0.45)] md:p-6"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
      >
        <div className="relative aspect-video min-h-[280px] w-full overflow-hidden rounded-3xl bg-neutral-200">
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
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E12D2D] px-5 py-2 text-base font-bold text-white shadow-[0_10px_24px_rgba(225,45,45,0.4)] transition-transform hover:-translate-y-0.5 hover:brightness-110"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
        >
          <FaLocationDot className="h-4 w-4" aria-hidden="true" />
          Graha Pos{" "}
          <span className="text-xs">
            Jl. Banda No.30, Citarum, Kec. Bandung Wetan
          </span>
        </motion.a>
        <motion.div
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E12D2D] px-5 py-2 text-base font-bold text-white shadow-[0_10px_24px_rgba(225,45,45,0.4)]"
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
          10 May 2026
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
