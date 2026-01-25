"use client";

import { motion } from "motion/react";
import { useState } from "react";
import PlainBackground from "~/_components/PlainBackground";
import Image from "next/image";
import { api } from "~/trpc/react";

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

export default function MagazineClient() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Fetch magazines from tRPC API (connected to Contentful)
  const { data: latestMagazine, isLoading: isLoadingLatest } =
    api.magazine.getLatest.useQuery();
  const { data: magazines, isLoading: isLoadingAll } =
    api.magazine.getAll.useQuery();

  // Quick preview in modal (click on cover/title/description)
  const handleQuickPreview = (flipbookUrl: string) => {
    setPreviewUrl(flipbookUrl);
  };

  const handleClosePreview = () => {
    setPreviewUrl(null);
  };

  // Open flipbook URL in new tab (click on "View Flipbook" button)
  const handleViewFlipbook = (flipbookUrl: string) => {
    window.open(flipbookUrl, "_blank");
  };

  // Loading state
  if (isLoadingLatest || isLoadingAll) {
    return (
      <main className="flex min-h-screen flex-col">
        <PlainBackground color="pink">
          <div className="flex min-h-screen items-center justify-center">
            <motion.div
              className="relative z-30 flex flex-col items-center gap-4 px-4 text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent sm:h-16 sm:w-16" />
              <p className="text-lg font-medium sm:text-xl">Loading magazines...</p>
            </motion.div>
          </div>
        </PlainBackground>
      </main>
    );
  }

  // Error state - no latest magazine found
  if (!latestMagazine) {
    return (
      <main className="flex min-h-screen flex-col">
        <PlainBackground color="pink">
          <div className="flex min-h-screen items-center justify-center">
            <motion.div
              className="relative z-30 flex flex-col items-center gap-4 px-4 text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg font-medium sm:text-xl">No magazines available at the moment.</p>
              <p className="text-sm opacity-80 sm:text-base">Please check back later.</p>
            </motion.div>
          </div>
        </PlainBackground>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* Modal Preview */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/80 p-4"
          onClick={handleClosePreview}
        >
          {/* Close Button - Outside iframe */}
          <motion.button
            onClick={handleClosePreview}
            className="bg-blue z-60 rounded-md px-6 py-2 text-white shadow-lg transition-opacity hover:opacity-90"
            whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          >
            ✕ Close
          </motion.button>

          <div
            className="z-55 h-[85vh] w-[90vw] max-w-6xl"
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

      {/* Hero Section*/}
      <PlainBackground color="pink">
        <motion.div
          className="relative z-30 container mx-auto px-4 pt-20 pb-12 md:px-6 md:pt-32 md:pb-32 lg:px-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h1 className="sr-only">TEDxITB 9.0 Magazine</h1>
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <motion.div
              variants={itemVariants}
              className="order-1 flex justify-center"
            >
              <div
                className="w-full max-w-70 cursor-pointer overflow-hidden rounded-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.5)] sm:max-w-xs md:max-w-sm"
                onClick={() => handleQuickPreview(latestMagazine.flipbookUrl)}
              >
                <Image
                  src={latestMagazine.coverImage}
                  alt={latestMagazine.title}
                  width={400}
                  height={600}
                  className="h-auto w-full object-contain"
                />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              variants={itemVariants}
              className="order-2 space-y-4 text-center text-white md:space-y-6 md:text-left"
            >
              <div
                className="flex cursor-pointer justify-center transition-opacity hover:opacity-80 md:justify-start"
                onClick={() => handleQuickPreview(latestMagazine.flipbookUrl)}
              >
                <Image
                  src="/magazine/magazine.png"
                  alt="Magazine"
                  width={500}
                  height={200}
                  className="w-full max-w-62.5 drop-shadow-lg sm:max-w-sm md:max-w-md"
                />
              </div>
              {/* Subtitle*/}
              <h2
                className="cursor-pointer px-2 text-lg font-bold transition-opacity hover:opacity-80 sm:text-xl md:px-0 md:text-2xl lg:text-3xl"
                onClick={() => handleQuickPreview(latestMagazine.flipbookUrl)}
              >
                {new Date(latestMagazine.date).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}{" "}
                Edition: {latestMagazine.title}
              </h2>
              {/* Description - rendered as HTML since it comes from Contentful rich text */}
              <div
                className="cursor-pointer px-2 text-justify text-sm leading-snug transition-opacity hover:opacity-80 sm:text-base md:px-0 md:text-lg md:leading-relaxed"
                onClick={() => handleQuickPreview(latestMagazine.flipbookUrl)}
                dangerouslySetInnerHTML={{ __html: latestMagazine.description }}
              />
              {/* View Flipbook Button*/}
              <div className="z-50 flex justify-center md:justify-start">
                <motion.button
                  className="bg-blue rounded-md px-6 py-2 text-sm text-white shadow-lg transition-opacity hover:cursor-pointer hover:opacity-90 sm:text-base"
                  whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                  onClick={() => handleViewFlipbook(latestMagazine.flipbookUrl)}
                >
                  View Flipbook
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </PlainBackground>

      {/* Magazine List Section */}
      <section className="relative w-full overflow-hidden bg-[url('/pattern-bg.svg')] bg-repeat py-12 md:py-16 lg:py-24">
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-12">
          {/* Section Title */}
          <motion.div
            className="mb-12 flex justify-center md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/magazine/our_magazines.png"
              alt="Our Magazines"
              width={600}
              height={200}
              className="w-full max-w-xs px-4 md:max-w-xl"
            />
          </motion.div>

          <motion.div
            className="mx-auto flex max-w-4xl flex-col space-y-8 md:space-y-12 lg:space-y-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {magazines?.map((magazine) => (
              <motion.div
                key={magazine.id}
                variants={itemVariants}
                className="flex flex-col items-center gap-6 md:flex-row md:gap-8 lg:gap-12"
              >
                {/* Magazine Cover*/}
                <div
                  className="w-full max-w-50 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.4)] sm:max-w-60 md:w-64"
                  onClick={() => handleQuickPreview(magazine.flipbookUrl)}
                >
                  <Image
                    src={magazine.coverImage}
                    alt={magazine.title}
                    width={300}
                    height={450}
                    className="h-auto w-full object-contain"
                  />
                </div>

                {/* Text & Button*/}
                <div className="flex w-full flex-col items-center gap-3 px-4 text-center md:items-start md:gap-4 md:px-0 md:text-left">
                  <h3
                    className="cursor-pointer text-2xl font-bold transition-opacity hover:opacity-80 sm:text-3xl md:text-4xl"
                    style={{
                      color: "#443bf4",
                      WebkitTextStroke: "1.5px white",
                      paintOrder: "stroke fill",
                      textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                    onClick={() => handleQuickPreview(magazine.flipbookUrl)}
                  >
                    {magazine.title}
                  </h3>

                  {/* Description - rendered as HTML since it comes from Contentful rich text */}
                  <div
                    className="text-navy line-clamp-3 cursor-pointer text-sm transition-opacity hover:opacity-80 sm:text-base md:line-clamp-none md:text-lg"
                    onClick={() => handleQuickPreview(magazine.flipbookUrl)}
                    dangerouslySetInnerHTML={{ __html: magazine.description }}
                  />

                  {/* View Flipbook Button*/}
                  <motion.button
                    className="bg-blue mt-2 rounded-md px-6 py-2 text-sm text-white shadow-lg transition-opacity hover:cursor-pointer hover:opacity-90 sm:text-base"
                    whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                    onClick={() => handleViewFlipbook(magazine.flipbookUrl)}
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
