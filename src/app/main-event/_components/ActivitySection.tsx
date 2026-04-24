"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

import ActivityCard from "./ActivityCard";
import CountdownTimer from "./CountdownTimer";

const activities = [
    {
        title: "Naura Tsabita",
        imageSrc: "/main-event/naura-tsabita.png",
        imageAlt: "Naura Tsabita",
        releaseAt: new Date(2026, 3, 24),
    },
    {
        title: "Zahid Ibrahim",
        imageSrc: "/main-event/zahid-ibrahim.png",
        imageAlt: "Zahid Ibrahim",
        releaseAt: new Date(2026, 3, 26),
    },
    {
        title: "Keisha Rochelline",
        imageSrc: "/main-event/keisha-rochelline.png",
        imageAlt: "Keisha Rochelline",
        releaseAt: new Date(2026, 3, 27),
    },
] as const;

function getReleaseTimestamp(releaseAt: Date) {
    const start = new Date(releaseAt);
    start.setHours(0, 0, 0, 0);
    return start.getTime();
}

const ActivitySection = () => {
    const [mounted, setMounted] = useState(false);
    const [now, setNow] = useState<number>(() => Date.now());

    useEffect(() => {
        setMounted(true);
    }, []);

    const nextReleaseTimestamp = useMemo(() => {
        if (!mounted) return null;

        const upcoming = activities
            .map((activity) => getReleaseTimestamp(activity.releaseAt))
            .filter((timestamp) => timestamp > now)
            .sort((a, b) => a - b);

        return upcoming[0] ?? null;
    }, [mounted, now]);

    const nextUnrevealedIndex = useMemo(() => {
        if (!mounted) return 0;

        return activities.findIndex(
            (activity) => now < getReleaseTimestamp(activity.releaseAt),
        );
    }, [mounted, now]);

    useEffect(() => {
        if (!nextReleaseTimestamp) return;

        const millisecondsUntilNext = Math.max(
            0,
            nextReleaseTimestamp - Date.now(),
        );

        const timeoutId = window.setTimeout(() => {
            setNow(Date.now());
        }, millisecondsUntilNext + 50);

        return () => window.clearTimeout(timeoutId);
    }, [nextReleaseTimestamp]);

    return (
        <section className="relative overflow-hidden bg-white bg-[url('/pattern-bg.svg')] bg-repeat py-12">
            <div className="pointer-events-none absolute top-0 left-0 hidden h-full w-full lg:block">
                <Image
                    src="/main-event/last-year-bg.png"
                    alt="Decorative geometric pattern"
                    fill
                    className="object-cover opacity-100"
                    draggable={false}
                />
                <motion.div
                    className="absolute bottom-10 left-0 z-0"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" as const }}
                >
                    <Image
                        src="/main-event/left-asset.png"
                        alt="Left decorative asset"
                        width={100}
                        height={800}
                        className="h-auto w-[100px]"
                        draggable={false}
                    />
                </motion.div>
                <motion.div
                    className="absolute top-10 right-0 z-10"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" as const }}
                >
                    <Image
                        src="/main-event/right-asset.png"
                        alt="Right decorative asset"
                        width={200}
                        height={700}
                        className="h-auto w-[100px]"
                        draggable={false}
                    />
                </motion.div>
            </div>
            <div className="relative z-10 container mx-auto max-w-352 px-4 pt-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center md:mb-16"
                >
                    {/* "Workshop and Activities"*/}
                    <div className="mx-auto mb-6 flex justify-center">
                        <Image
                            src="/main-event/workshop-activities.png"
                            alt="Workshop and Activities"
                            width={865}
                            height={95}
                            className="h-auto w-[80%] max-w-3xl md:w-[70%]"
                            draggable={false}
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                    className="flex gap-6 overflow-x-auto pb-4 lg:gap-8"
                >
                    {activities.map((activity, index) => {
                        const releaseTimestamp = getReleaseTimestamp(
                            activity.releaseAt,
                        );
                        const isReleased = mounted && now >= releaseTimestamp;
                        const shouldShowCountdown =
                            !isReleased && index === nextUnrevealedIndex;

                        if (!isReleased && !shouldShowCountdown) {
                            return null;
                        }

                        return (
                            <div
                                key={activity.title}
                                className="shrink-0 basis-[88%] sm:basis-[68%] lg:basis-[46%] xl:basis-[32%]"
                            >
                                {isReleased ? (
                                    <ActivityCard
                                        title={activity.title}
                                        imageSrc={activity.imageSrc}
                                        imageAlt={activity.imageAlt}
                                        index={index}
                                    />
                                ) : (
                                    <motion.div
                                        variants={{
                                            hidden: { opacity: 0, y: 40 },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    duration: 0.6,
                                                    ease: "easeOut" as const,
                                                    delay: index * 0.15,
                                                },
                                            },
                                        }}
                                        className="flex min-h-130 w-full flex-col items-center justify-center rounded-3xl border-4 border-[#2b4289] bg-white/95 p-6"
                                    >
                                        <h3
                                            className="text-red mb-6 text-center text-2xl outline-1 outline-white drop-shadow-md"
                                            style={{
                                                fontFamily:
                                                    "var(--font-titan-one), cursive",
                                            }}
                                        >
                                            {`Speaker #${index + 1}`}
                                        </h3>
                                        <CountdownTimer
                                            to={releaseTimestamp}
                                            showBuyButton={false}
                                        />
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ActivitySection;
