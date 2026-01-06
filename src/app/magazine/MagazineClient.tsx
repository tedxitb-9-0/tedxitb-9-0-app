"use client";

import { motion } from "motion/react";
import { useState } from "react";
import PlainBackground from "~/components/PlainBackground";
import { magazines, getLatestMagazine } from "./data";
import Image from "next/image";

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

const latestMagazine = getLatestMagazine();

export default function MagazineClient() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Quick preview in modal (click on cover/title/description)
    const handleQuickPreview = (flipbookUrl: string) => {
        setPreviewUrl(flipbookUrl);
    };

    const handleClosePreview = () => {
        setPreviewUrl(null);
    };

    // Open flipbook URL in new tab (click on "View Flipbook" button)
    const handleViewFlipbook = (flipbookUrl: string) => {
        window.open(flipbookUrl, '_blank');
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            {/* Modal Preview */}
            {previewUrl && (
                <div 
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4 gap-4"
                    onClick={handleClosePreview}
                    >
                    {/* Close Button - Outside iframe */}
                    <motion.button
                        onClick={handleClosePreview}
                        className="px-6 py-2 bg-blue text-white rounded-md shadow-lg hover:opacity-90 transition-opacity z-60"
                        whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                    >
                        ✕ Close
                    </motion.button>
                    
                    <div 
                        className="h-[85vh] w-[90vw] max-w-6xl z-55"
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
                    className="container mx-auto px-4 md:px-6 lg:px-12 z-30 relative pt-20 md:pt-32 pb-12 md:pb-32"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <h1 className="sr-only">TEDxITB 9.0 Magazine</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
                        <motion.div variants={itemVariants} className="flex justify-center order-1">
                        <div 
                            className="w-full max-w-70 sm:max-w-xs md:max-w-sm rounded-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.5)] overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
                            onClick={() => handleQuickPreview(latestMagazine.flipbookUrl)}
                        >
                        <Image 
                            src={latestMagazine.coverImage} 
                            alt={latestMagazine.title}
                            width={400}
                            height={600}
                            className="w-full h-auto object-contain"
                            />
                        </div>
                        </motion.div>

                        {/* Right - Content */}
                        <motion.div variants={itemVariants} className="space-y-4 md:space-y-6 text-white text-center md:text-left order-2">
                        <div
                            className="cursor-pointer hover:opacity-80 transition-opacity flex justify-center md:justify-start"
                            onClick={() => handleQuickPreview(latestMagazine.flipbookUrl)}
                        >
                            <Image 
                            src="/magazine/magazine.png" 
                            alt="Magazine"
                            width={500}
                            height={200}
                            className="w-full max-w-62.5 sm:max-w-sm md:max-w-md drop-shadow-lg"
                            />
                        </div>
                        {/* Subtitle*/}
                        <h2 
                            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold cursor-pointer hover:opacity-80 transition-opacity px-2 md:px-0"
                            onClick={() => handleQuickPreview(latestMagazine.flipbookUrl)}
                        >
                            {new Date(latestMagazine.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Edition: {latestMagazine.title}
                        </h2>
                        {/* Description*/}
                        <p 
                            className="text-sm sm:text-base md:text-lg leading-snug md:leading-relaxed text-justify cursor-pointer hover:opacity-80 transition-opacity px-2 md:px-0"
                            onClick={() => handleQuickPreview(latestMagazine.flipbookUrl)}
                        >
                            {latestMagazine.description}
                        </p>
                        {/* View Flipbook Button*/}
                        <div className="flex justify-center md:justify-start z-50">
                            <motion.button
                            className="px-6 py-2 bg-blue text-white hover:cursor-pointer rounded-md shadow-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
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
            <section className="w-full py-12 md:py-16 lg:py-24 bg-[url('/pattern-bg.svg')] bg-repeat relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                    {/* Section Title */}
                    <motion.div
                        className="flex justify-center mb-12 md:mb-16"
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
                        className="w-full max-w-xs md:max-w-xl px-4"
                        />
                    </motion.div>

                    <motion.div
                        className="flex flex-col space-y-8 md:space-y-12 lg:space-y-16 max-w-4xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        {magazines.map((magazine) => (
                        <motion.div
                            key={magazine.id}
                            variants={itemVariants}
                            className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12"
                        >
                            {/* Magazine Cover*/}
                            <div
                            className="w-full max-w-50 sm:max-w-60 md:w-64 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_-10px_rgba(0,0,0,0.4)] overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-all duration-300"
                            onClick={() => handleQuickPreview(magazine.flipbookUrl)}
                            >
                            <Image 
                                src={magazine.coverImage} 
                                alt={magazine.title}
                                width={300}
                                height={450}
                                className="w-full h-auto object-contain"
                            />
                            </div>

                            {/* Text & Button*/}
                            <div className="flex flex-col items-center md:items-start gap-3 md:gap-4 text-center md:text-left w-full px-4 md:px-0">
                            <h3
                                className="font-bold text-2xl sm:text-3xl md:text-4xl cursor-pointer hover:opacity-80 transition-opacity"
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

                            <p
                                className="text-navy text-sm sm:text-base md:text-lg cursor-pointer hover:opacity-80 transition-opacity line-clamp-3 md:line-clamp-none"
                                onClick={() => handleQuickPreview(magazine.flipbookUrl)}
                            >
                                {magazine.description}
                            </p>

                            {/* View Flipbook Button*/}
                            <motion.button
                                className="px-6 py-2 bg-blue text-white rounded-md hover:cursor-pointer shadow-lg hover:opacity-90 transition-opacity text-sm sm:text-base mt-2"
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
