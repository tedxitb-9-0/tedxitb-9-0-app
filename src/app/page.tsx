"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ColorfulBackground from "~/_components/ColorfulBackground";
import TEDxITBBadge from "~/_components/TEDxITBBadge";
import ExploreSection from "~/_components/explore-section";
import ExclusivelySection from "~/_components/exclusively-section";

export default function Home() {
    return (
        <main className="flex flex-col items-center">
            <h1 className="sr-only hidden">
                TEDxITB 9.0 - Happiness Through Colors
            </h1>

            {/* Hero Section */}
            <section className="relative flex h-screen w-full flex-col items-center justify-center">
                <ColorfulBackground>
                    <h1 className="sr-only">
                        TEDxITB 9.0: Happiness Through Colors
                    </h1>
                    <TEDxITBBadge />
                    <motion.div
                        className="z-30 w-[80%] max-w-4xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        {" "}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Image
                                src="/herosection.webp"
                                alt="TEDxITB 9.0 - Happiness Through Colors"
                                width={900}
                                height={200}
                                className="h-auto w-full"
                                draggable={false}
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </ColorfulBackground>
            </section>

            <ExploreSection />
            <ExclusivelySection />
            {/* Exclusively Section */}
        </main>
    );
}
