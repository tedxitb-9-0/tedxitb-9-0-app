"use client";

import Image from "next/image";
import { motion } from "motion/react";

const HeroSection = () => {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center pt-32 pb-16">
            {/* Top Squiggle */}
            <motion.div
                className="absolute top-10 right-0 left-0 z-10 w-[80%]"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Image
                    src="/main-event/top-squiggle.webp"
                    alt="Decorative top squiggle"
                    width={1920}
                    height={300}
                    className="h-auto w-full object-cover"
                    draggable={false}
                    priority
                />
            </motion.div>

            {/* Right Mascot */}
            <motion.div
                className="absolute right-0 bottom-0 z-20 w-80 md:w-96 lg:w-[600px] xl:w-[600px]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Image
                        src="/main-event/right-mascot.webp"
                        alt="Right Mascot"
                        width={800}
                        height={800}
                        className="h-auto w-full"
                        draggable={false}
                        priority
                    />
                </motion.div>
            </motion.div>

            {/* Purple Cloud at the Bottom */}
            <motion.div
                className="absolute right-0 bottom-0 left-0 z-20 w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
                <Image
                    src="/main-event/purple-cloud.webp"
                    alt="Purple Cloud"
                    width={1920}
                    height={400}
                    className="h-auto w-full object-cover"
                    draggable={false}
                />
            </motion.div>

            {/* Content Area */}
            <div className="relative z-30 container mx-auto flex w-full flex-col px-4 lg:flex-row lg:items-center">
                {/* Left Side: Title and Description */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.3,
                            },
                        },
                    }}
                    className="flex w-full flex-col items-center gap-8 lg:w-[65%] lg:items-start lg:pl-12 xl:w-[60%] xl:pl-24"
                >
                    {/* Hero Title */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            visible: {
                                opacity: 1,
                                scale: 1,
                                transition: { duration: 0.6 },
                            },
                        }}
                        className="w-full max-w-[400px] md:max-w-md lg:max-w-5xl"
                    >
                        <Image
                            src="/main-event/hero-title.webp"
                            alt="Happiness Through Colors"
                            width={800}
                            height={400}
                            className="h-auto w-full"
                            draggable={false}
                            priority
                        />
                    </motion.div>

                    {/* Liquid Glass Description */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.6 },
                            },
                        }}
                        className="rounded-[2rem] border border-white/60 bg-white/20 p-6 shadow-xl backdrop-blur-md md:p-8"
                    >
                        <p className="text-navy xl:text-md text-center text-xs leading-relaxed font-normal md:text-base lg:text-left">
                            Step into this year&apos;s TEDxITB 9.0 Happiness
                            Through Colors, where ideas, emotions, and
                            interactions unfold through a vibrant spectrum of
                            moments designed to inspire curiosity and
                            connection. More than a series of speaker talks,
                            each session invites you to see and feel the world
                            in new ways, while interactive experiences bring the
                            theme of happiness through color to life. Move
                            freely between lively exchanges and quieter
                            reflections, then immerse yourself in the Color
                            Sanctuary, a space of shifting moods, and curated
                            moments to pause, recharge, and reconnect. Mark your
                            calendar and come with an open mind, ready to
                            explore a dynamic journey of stories, perspectives,
                            and shared experiences.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Right Side: Spacer for the mascot */}
                <div className="hidden lg:block lg:w-[35%] xl:w-[40%]"></div>
            </div>
        </div>
    );
};

export default HeroSection;
