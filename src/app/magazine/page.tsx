"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PlainBackground from "~/components/PlainBackground";
import { magazines, getLatestMagazine } from "./data";

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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Get latest magazine
const latestMagazine = getLatestMagazine();

export default function MagazinePage() {
  const router = useRouter();
  // State for modal quick preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Quick preview in modal (click on cover/title/description)
  const handleQuickPreview = (flipbookUrl: string) => {
    setPreviewUrl(flipbookUrl);
  };

  const handleClosePreview = () => {
    setPreviewUrl(null);
  };

  // Navigate to dedicated page (click on "View Flipbook" button)
  const handleViewFlipbook = (magazineId: string) => {
    router.push(`/magazine/${magazineId}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* Modal Preview */}
      {previewUrl && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4 gap-4"
          onClick={handleClosePreview}
        >
          {/* Close Button - Outside iframe container */}
          <motion.button
            onClick={handleClosePreview}
            className="px-6 py-2 bg-blue text-white rounded-md shadow-lg hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          >
            ✕ Close
          </motion.button>
          
          <div 
            className="h-[85vh] w-[90vw] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={previewUrl}
              className="h-full w-full rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Hero Section - Pink Background with Featured Magazine */}
      <PlainBackground color="pink">
        <motion.div
          className="container mx-auto px-6 md:px-12 z-20 relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Left - Magazine Cover (Clickable for quick preview) */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div 
                className="w-full max-w-sm rounded-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => handleQuickPreview(latestMagazine.flipbookUrl)}
              >
                <img 
                  src={latestMagazine.coverImage} 
                  alt={latestMagazine.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={itemVariants} className="space-y-6 text-white">
              {/* Title (Clickable for quick preview) */}
              <h1 
                className="font-titan text-5xl md:text-7xl leading-tight drop-shadow-lg cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleQuickPreview(latestMagazine.flipbookUrl)}
              >
                Magazine
              </h1>
              {/* Subtitle - Dynamic from magazine data (Clickable for quick preview) */}
              <h2 
                className="text-2xl md:text-3xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleQuickPreview(latestMagazine.flipbookUrl)}
              >
                {new Date(latestMagazine.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Edition: {latestMagazine.title}
              </h2>
              {/* Description - Dynamic from magazine data (Clickable for quick preview) */}
              <p 
                className="text-base md:text-lg leading-relaxed text-justify cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleQuickPreview(latestMagazine.flipbookUrl)}
              >
                {latestMagazine.description}
              </p>
              {/* View Flipbook Button - Navigate to dedicated page */}
              <motion.button
                className="px-6 py-2 bg-blue text-white rounded-md shadow-lg hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                onClick={() => handleViewFlipbook(latestMagazine.id)}
              >
                View Flipbook
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </PlainBackground>

      {/* Magazine List Section - White Background with Pattern */}
      <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Decorative Background Pattern - Snowflakes */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl select-none"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                transform: `rotate(${(i * 47) % 360}deg)`,
              }}
            >
              ❄
            </div>
          ))}
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Section Title */}
          <motion.h2
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-titan text-5xl md:text-6xl">
              <span className="text-pink">Our </span>
              <span className="text-orange">Magazines</span>
            </span>
          </motion.h2>

          <motion.div
            className="flex flex-col space-y-12 md:space-y-16 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {magazines.map((magazine) => (
              <motion.div
                key={magazine.id}
                variants={itemVariants}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                {/* Magazine Cover - Left (Clickable for quick preview) */}
                <div
                  className="w-full md:w-64 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.4)] overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => handleQuickPreview(magazine.flipbookUrl)}
                >
                  <img 
                    src={magazine.coverImage} 
                    alt={magazine.title}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Text & Button - Right */}
                <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                  <h3
                    className="font-bold text-3xl md:text-4xl cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      color: "#443bf4",
                      WebkitTextStroke: "2px white",
                      paintOrder: "stroke fill",
                      textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                    onClick={() => handleQuickPreview(magazine.flipbookUrl)}
                  >
                    {magazine.title}
                  </h3>

                  <p
                    className="text-navy text-base md:text-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleQuickPreview(magazine.flipbookUrl)}
                  >
                    {magazine.description}
                  </p>

                  {/* View Flipbook Button - Navigate to dedicated page */}
                  <motion.button
                    className="px-6 py-2 bg-blue text-white rounded-md shadow-lg hover:opacity-90 transition-opacity"
                    whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                    onClick={() => handleViewFlipbook(magazine.id)}
                  >
                    View Flipbook
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
