"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { motion } from "motion/react";

// 10 May 2026 00:00 WIB = 9 May 2026 17:00 UTC
const TARGET = new Date(Date.UTC(2026, 4, 9, 17, 0, 0));

function getTimeLeft() {
    const diff = Math.max(0, TARGET.getTime() - Date.now());
    return {
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
    };
}

const UNITS = ["Days", "Hours", "Minutes", "Seconds"] as const;

const gradientNumberStyle: React.CSSProperties = {
    fontFamily: "var(--font-titan-one), cursive",
    fontWeight: 400,
    background: "linear-gradient(90deg, #9A1AEF 0%, #443BF4 63%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    WebkitTextStroke: "4px white",
    paintOrder: "stroke fill",
    lineHeight: 1,
};

export default function CalendarCountdownSection() {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft);

    useEffect(() => {
        const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    const values = [
        timeLeft.days,
        timeLeft.hours,
        timeLeft.minutes,
        timeLeft.seconds,
    ];

    return (
        <section className="relative py-4">
            <div className="mx-auto w-full max-w-7xl px-2">
                {/* "Fun Collides in" header image */}
                <motion.div
                    className="mb-2 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src="/main-event/fun-collides.webp"
                        alt="Fun Collides in"
                        width={700}
                        height={120}
                        className="h-auto w-[65%] max-w-xl"
                        draggable={false}
                        priority
                    />
                </motion.div>

                {/* Calendar + countdown overlay */}
                <motion.div
                    className="relative mx-auto w-full"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <Image
                        src="/main-event/calendar-asset.webp"
                        alt="Calendar background"
                        width={1400}
                        height={460}
                        className="h-auto w-full"
                        draggable={false}
                    />
                    <div className="absolute inset-x-0 top-[20%] bottom-[12%] flex flex-col items-center justify-center">
                        <div className="flex items-start justify-center gap-1 sm:gap-3 md:gap-6">
                            {values.map((val, i) => (
                                <Fragment key={UNITS[i]}>
                                    <div className="flex flex-col items-center gap-1">
                                        {/* Number */}
                                        <span
                                            className="text-[7vw] sm:text-[6vw] md:text-7xl lg:text-8xl xl:text-9xl"
                                            style={gradientNumberStyle}
                                        >
                                            {String(val).padStart(2, "0")}
                                        </span>
                                        {/* Label */}
                                        <span
                                            className="text-[1.8vw] text-gray-500 sm:text-xs md:text-sm lg:text-base"
                                            style={{ fontFamily: "inherit" }}
                                        >
                                            {UNITS[i]}
                                        </span>
                                    </div>

                                    {i < 3 && (
                                        <span
                                            className="mt-0 text-[7vw] sm:text-[6vw] md:text-7xl lg:text-8xl xl:text-9xl"
                                            style={{
                                                ...gradientNumberStyle,
                                                WebkitTextStroke: "3px white",
                                            }}
                                        >
                                            :
                                        </span>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
