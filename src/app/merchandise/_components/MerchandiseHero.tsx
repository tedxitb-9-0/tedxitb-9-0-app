"use client";

import { motion } from "motion/react";
import Image from "next/image";
import PlainBackground from "~/_components/PlainBackground";

export default function MerchandiseHero() {
    return (
        <section className="relative overflow-hidden">
            <PlainBackground
                color="blue"
                className="min-h-screen overflow-hidden"
            >
                <div className="relative z-0 mx-auto flex min-h-[78vh] w-full max-w-7xl flex-col items-center justify-start overflow-hidden px-4 pt-24 pb-24 md:min-h-[86vh] md:px-8 md:pt-24 md:pb-28 lg:pt-28">
                    <motion.div
                        initial={{ opacity: 0, y: -18, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="z-99"
                    >
                        <Image
                            src="/merchandise/merchandise.png"
                            alt="Merchandise"
                            width={460}
                            height={75}
                            className="z-50 h-auto w-60 sm:w-75 md:w-95 lg:w-100"
                            draggable={false}
                            priority
                        />
                    </motion.div>

                    <div className="mt-6 flex w-full flex-col items-center justify-start gap-4 sm:gap-6 md:mt-8 md:gap-8 lg:relative lg:min-h-132.5 lg:flex-1 lg:justify-center lg:gap-0">
                        <motion.div
                            initial={{ opacity: 0, y: 24, x: -16, rotate: -2 }}
                            whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 0.65,
                                delay: 0.2,
                                ease: "easeOut",
                            }}
                            className="z-20 w-78 sm:w-120 md:w-170.5 lg:absolute lg:top-[6%] lg:left-[-3%] lg:w-150 xl:w-170"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 5.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Image
                                    src="/merchandise/merch-left.png"
                                    alt="Merchandise collection on the left"
                                    width={960}
                                    height={720}
                                    className="h-auto w-full"
                                    draggable={false}
                                    priority
                                />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24, x: 16, rotate: 2 }}
                            whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 0.65,
                                delay: 0.3,
                                ease: "easeOut",
                            }}
                            className="z-20 mb-20 w-100 sm:w-120 md:w-170.5 lg:absolute lg:top-[8%] lg:right-[-3%] lg:w-150 xl:w-170"
                        >
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{
                                    duration: 5.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Image
                                    src="/merchandise/merch-right.png"
                                    alt="Merchandise collection on the right"
                                    width={960}
                                    height={720}
                                    className="h-auto w-full"
                                    draggable={false}
                                    priority
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </PlainBackground>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                    duration: 0.7,
                    delay: 0.35,
                    ease: "easeOut",
                }}
                className="pointer-events-none absolute -bottom-[20%] left-1/2 z-10 w-100 -translate-x-1/2 sm:-bottom-[20%] sm:w-97.5 md:-bottom-[20%] md:w-125 lg:-bottom-[30%] lg:w-160"
            >
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                        duration: 4.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Image
                        src="/merchandise/mascot.png"
                        alt="TEDxITB mascot"
                        width={1100}
                        height={580}
                        className="h-auto w-full"
                        draggable={false}
                        priority
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
