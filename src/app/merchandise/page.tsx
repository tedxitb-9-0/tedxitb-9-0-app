"use client";

import { motion } from "motion/react";
import { Titan_One } from "next/font/google";
import PlainBackground from "~/components/PlainBackground"; // Menggunakan komponen yang sama dengan Magazine
import Image from "next/image";
import { merchBundles, merchCollection, MerchItem } from "./data";

// --- 1. SETUP FONT TITAN ONE ---
const titanOne = Titan_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// --- 2. VARIAN ANIMASI (Sama Persis dengan Magazine) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } as const,
  },
};

export default function MerchandisePage() {

  const renderMerchCard = (item: MerchItem) => (
    <motion.div
      key={item.id}
      variants={itemVariants}
      className="flex flex-col"
    >
      <div 
        className="group relative aspect-square w-full cursor-pointer rounded-2xl bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex items-center justify-center border border-gray-100"
        onClick={() => window.open(item.link, "_blank")}
      >
        <span 
            className={`${titanOne.className} text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider select-none`}
            style={{
                color: "white", 
                WebkitTextStroke: "2px #FFB6C1", 
                paintOrder: "stroke fill",
                filter: "drop-shadow(0 3px 2px rgba(0,0,0,0.3))"
            }}
        >
            Placeholder
        </span>
      </div>
    </motion.div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      
      <PlainBackground color="blue"> 
        <motion.div
            className="container mx-auto px-4 md:px-6 lg:px-12 z-30 relative pt-32 pb-20 min-h-[50vh] flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >

            {/* JUDUL MERCHANDISE (Posisi Kanan) */}
            <div className="flex justify-end items-center relative z-10 w-full">
                <motion.h1 
                    variants={itemVariants}
                    className={`${titanOne.className} text-5xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-md tracking-wide text-right`}
                    style={{ textShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
                >
                    Merchandise
                </motion.h1>
            </div>
        </motion.div>
      </PlainBackground>

      {/* --- CONTENT SECTION (White Background) --- */}
      <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
            
            {/* 1. BUNDLES SECTION */}
            <motion.div
                className="flex flex-col space-y-12 mb-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                {/* Judul Section */}
                <motion.div variants={itemVariants} className="flex justify-center">
                     <h2 
                        className={`${titanOne.className} text-4xl sm:text-5xl md:text-6xl text-center uppercase tracking-wide`}
                        style={{
                            backgroundImage: "linear-gradient(180deg, #FF6B6B 0%, #FFC048 100%)", // Gradient Pink-Kuning
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            WebkitTextStroke: "3px white", // Stroke Putih Tebal
                            paintOrder: "stroke fill",
                            filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.15))",
                            lineHeight: "1.2"
                        }}
                    >
                        Merchandise Bundles
                    </h2>
                </motion.div>

                {/* Grid Bundles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {merchBundles.map(renderMerchCard)}
                </div>
            </motion.div>


            {/* 2. COLLECTION SECTION */}
            <motion.div
                className="flex flex-col space-y-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                {/* Judul Section */}
                <motion.div variants={itemVariants} className="flex justify-center">
                     <h2 
                        className={`${titanOne.className} text-4xl sm:text-5xl md:text-6xl text-center uppercase tracking-wide`}
                        style={{
                            backgroundImage: "linear-gradient(180deg, #FF6B6B 0%, #FFC048 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            WebkitTextStroke: "3px white",
                            paintOrder: "stroke fill",
                            filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.15))",
                            lineHeight: "1.2"
                        }}
                    >
                        Merchandise Collection
                    </h2>
                </motion.div>

                {/* Grid Collection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {merchCollection.map(renderMerchCard)}
                </div>
            </motion.div>

        </div>
      </section>
    </main>
  );
}