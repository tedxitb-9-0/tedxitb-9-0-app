"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const speakers = [
    {
        id: 1,
        name: "Naura Tsabita",
        revealAt: new Date(Date.UTC(2026, 3, 24, 12, 0, 0)),
    },
    {
        id: 2,
        name: "Zahid Ibrahim",
        revealAt: new Date(Date.UTC(2026, 3, 26, 12, 0, 0)),
    },
    {
        id: 3,
        name: "Keisha Rochelline",
        revealAt: new Date(Date.UTC(2026, 3, 29, 12, 0, 0)),
    },
    {
        id: 4,
        name: "Speaker 4",
        revealAt: new Date(Date.UTC(2026, 3, 30, 12, 0, 0)),
    },
    {
        id: 5,
        name: "Speaker 5",
        revealAt: new Date(Date.UTC(2026, 4, 1, 12, 0, 0)),
    },
    {
        id: 6,
        name: "Speaker 6",
        revealAt: new Date(Date.UTC(2026, 4, 2, 12, 0, 0)),
    },
    {
        id: 7,
        name: "Speaker 7",
        revealAt: new Date(Date.UTC(2026, 4, 3, 12, 0, 0)),
    },
] as const;

const SPEAKERS_WITH_IMAGE = new Set([1, 2, 3, 4, 5]);

// 10 May 2026 00:00 WIB = 9 May 2026 17:00 UTC
const COUNTDOWN_TARGET = new Date(Date.UTC(2026, 4, 9, 17, 0, 0));
const COUNTDOWN_UNITS = ["Days", "Hours", "Minutes", "Seconds"] as const;

function getTimeLeft() {
    const diff = Math.max(0, COUNTDOWN_TARGET.getTime() - Date.now());
    return {
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
    };
}

const gradientNumberStyle: React.CSSProperties = {
    fontFamily: "var(--font-titan-one), cursive",
    fontWeight: 400,
    background: "linear-gradient(90deg, #9A1AEF 0%, #443BF4 63%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    paintOrder: "stroke fill",
    lineHeight: 1,
};

export default function SpeakersSection() {
    const [now, setNow] = useState<number>(() => Date.now());
    const [timeLeft, setTimeLeft] = useState(getTimeLeft);

    useEffect(() => {
        const nowId = window.setInterval(() => setNow(Date.now()), 60_000);
        const cdId = setInterval(() => setTimeLeft(getTimeLeft()), 1_000);
        return () => {
            window.clearInterval(nowId);
            clearInterval(cdId);
        };
    }, []);

    const cdValues = [
        timeLeft.days,
        timeLeft.hours,
        timeLeft.minutes,
        timeLeft.seconds,
    ];

    return (
        <section className="relative w-full overflow-hidden bg-white bg-[url('/pattern-bg.svg')] bg-repeat">
            {/* ── Top cloud – flipped upside-down ── */}
            <div className="relative z-20 w-full rotate-180">
                <Image
                    src="/main-event/cloud.webp"
                    alt=""
                    width={1920}
                    height={400}
                    className="h-auto w-full"
                    draggable={false}
                    priority
                />
            </div>

            <div className="pointer-events-none absolute inset-0 z-0">
                <Image
                    src="/main-event/speakers-asset.webp"
                    alt=""
                    fill
                    className="object-contain object-center"
                    draggable={false}
                />
            </div>

            <div className="relative z-20 mx-auto w-full max-w-[110rem] px-4 pb-12">
                {/* Heading */}
                <motion.div
                    className="mb-28 flex flex-col items-center justify-center sm:mb-32 md:mb-36"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Mobile heading */}
                    <Image
                        src="/main-event/meet-ours-speaker.webp"
                        alt="Meet Our Speakers"
                        width={865}
                        height={120}
                        className="h-auto w-[85%] max-w-2xl sm:hidden"
                        draggable={false}
                        priority
                    />
                    {/* Desktop heading */}
                    <Image
                        src="/main-event/workshop-activities.png"
                        alt="Meet Our Speakers"
                        width={865}
                        height={120}
                        className="hidden h-auto w-[70%] max-w-4xl sm:block"
                        draggable={false}
                        priority
                    />
                </motion.div>

                {/* Desktop: alternating row */}
                <motion.div
                    className="hidden items-start justify-center gap-2 pb-28 sm:flex"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 },
                        },
                    }}
                >
                    {speakers.map((speaker, index) => {
                        const isRevealed = now >= speaker.revealAt.getTime();
                        const hasRealImage = SPEAKERS_WITH_IMAGE.has(
                            speaker.id,
                        );
                        const imageSrc =
                            isRevealed && hasRealImage
                                ? `/main-event/speaker-${speaker.id}.webp`
                                : "/main-event/speaker-unrevealed.webp";
                        return (
                            <motion.div
                                key={speaker.id}
                                className={`shrink-0 ${index % 2 === 0 ? "translate-y-0" : "translate-y-16"}`}
                                variants={{
                                    hidden: { opacity: 0, y: 40 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.55,
                                            ease: "easeOut",
                                        },
                                    },
                                }}
                            >
                                <SpeakerCard
                                    speaker={speaker}
                                    imageSrc={imageSrc}
                                    isRevealed={isRevealed && hasRealImage}
                                    widthClass="w-[140px] sm:w-[155px] md:w-[170px] lg:w-[190px] xl:w-[210px]"
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Mobile: 2-column grid */}
                <motion.div
                    className="grid grid-cols-2 place-items-center gap-x-4 gap-y-16 pb-16 sm:hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.08 },
                        },
                    }}
                >
                    {speakers.map((speaker) => {
                        const isRevealed = now >= speaker.revealAt.getTime();
                        const hasRealImage = SPEAKERS_WITH_IMAGE.has(
                            speaker.id,
                        );
                        const imageSrc =
                            isRevealed && hasRealImage
                                ? `/main-event/speaker-${speaker.id}.webp`
                                : "/main-event/speaker-unrevealed.webp";
                        return (
                            <motion.div
                                key={speaker.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.45,
                                            ease: "easeOut",
                                        },
                                    },
                                }}
                            >
                                <SpeakerCard
                                    speaker={speaker}
                                    imageSrc={imageSrc}
                                    isRevealed={isRevealed && hasRealImage}
                                    widthClass="w-[130px]"
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            <div className="relative z-20 w-full pb-4">
                {/* "Fun Collides in" header */}
                <motion.div
                    className="relative z-10 -mb-4 flex justify-center sm:-mb-8 lg:-mb-16"
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
                    />
                </motion.div>

                {/* Calendar – full viewport width */}
                <motion.div
                    className="relative w-full"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <Image
                        src="/main-event/calendar-asset.webp"
                        alt="Calendar background"
                        width={1920}
                        height={630}
                        className="h-auto w-full"
                        draggable={false}
                    />

                    {/* Countdown overlay inside the white notebook area */}
                    <div className="absolute inset-x-0 top-[28%] bottom-[5%] flex flex-col items-center justify-center">
                        <div className="flex items-start justify-center gap-1 sm:gap-3 md:gap-6">
                            {cdValues.map((val, i) => (
                                <Fragment key={COUNTDOWN_UNITS[i]}>
                                    <div className="flex flex-col items-center gap-1">
                                        <span
                                            className="text-[7vw] sm:text-[6vw] md:text-7xl lg:text-8xl xl:text-9xl [-webkit-text-stroke:1px_white] sm:[-webkit-text-stroke:2px_white] md:[-webkit-text-stroke:4px_white]"
                                            style={gradientNumberStyle}
                                        >
                                            {String(val).padStart(2, "0")}
                                        </span>
                                        <span className="text-[1.8vw] text-gray-500 sm:text-xs md:text-sm lg:text-base">
                                            {COUNTDOWN_UNITS[i]}
                                        </span>
                                    </div>
                                    {i < 3 && (
                                        <span
                                            className="text-[7vw] sm:text-[6vw] md:text-7xl lg:text-8xl xl:text-9xl [-webkit-text-stroke:1px_white] sm:[-webkit-text-stroke:2px_white] md:[-webkit-text-stroke:3px_white]"
                                            style={gradientNumberStyle}
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

            {/* ── Bottom cloud – normal orientation ── */}
            <div className="relative z-20 w-full">
                <Image
                    src="/main-event/cloud.webp"
                    alt=""
                    width={1920}
                    height={400}
                    className="h-auto w-full"
                    draggable={false}
                />
            </div>
        </section>
    );
}

type Speaker = (typeof speakers)[number];

interface SpeakerCardProps {
    speaker: Speaker;
    imageSrc: string;
    isRevealed: boolean;
    widthClass: string;
}

function SpeakerCard({
    speaker,
    imageSrc,
    isRevealed,
    widthClass,
}: SpeakerCardProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleOutside(e: MouseEvent | TouchEvent) {
            if (ref.current && !ref.current.contains(e.target as Node))
                setOpen(false);
        }
        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("touchstart", handleOutside);
        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("touchstart", handleOutside);
        };
    }, []);

    return (
        <div ref={ref} className="relative flex flex-col items-center">
            <div
                className={`relative cursor-pointer ${widthClass}`}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onClick={() => setOpen((v) => !v)}
            >
                <Image
                    src="/main-event/speaker-back.webp"
                    alt=""
                    width={400}
                    height={600}
                    className="h-auto w-full"
                    draggable={false}
                />
                <div className="absolute inset-[6%] overflow-hidden rounded-xl">
                    <Image
                        src={imageSrc}
                        alt={
                            isRevealed
                                ? `Speaker ${speaker.id}`
                                : "Speaker to be revealed"
                        }
                        fill
                        className="object-cover object-top"
                        draggable={false}
                    />
                </div>
                <Image
                    src="/main-event/speaker-front.webp"
                    alt=""
                    width={400}
                    height={600}
                    className="absolute inset-0 h-auto w-full"
                    draggable={false}
                />
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="absolute top-full z-50 mt-2 w-max max-w-[180px] rounded-2xl px-5 py-3 text-center shadow-xl"
                        style={{
                            background:
                                "linear-gradient(180deg, #FFB820 0%, #FF6A15 100%)",
                        }}
                        initial={{ opacity: 0, y: -6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.95 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                        <span
                            className="text-sm leading-tight text-white sm:text-base"
                            style={{
                                fontFamily: "var(--font-titan-one), cursive",
                            }}
                        >
                            {isRevealed ? speaker.name : "Coming Soon"}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
