"use client";

import Image from "next/image";
import { motion } from "motion/react";
import React from "react";
import PlainBackground from "~/_components/PlainBackground";

const scheduleData = [
    { time: "12.00", info: "Open Gate" },
    { time: "12.30", info: "Opening" },
    { time: "12.40", info: "Opening Theater" },
    { time: "12.45", info: "Talks - Part I" },
    { time: "14.25", info: "Activity I" },
    { time: "14.45", info: "Break" },
    { time: "15.45", info: "Talks - Part II" },
    { time: "16.40", info: "Closing Theater" },
    { time: "16.45", info: "Activity III" },
    { time: "17.00", info: "TEDx Talks Closing" },
    { time: "17.10", info: "Lounge" },
    { time: "18.25", info: "Group Activity" },
    { time: "19.15", info: "Closing" },
];

const getTextStrokeStyle = (strokeWidth: string): React.CSSProperties => ({
    fontFamily: "var(--font-titan-one), cursive",
    background: "linear-gradient(90deg, #9A1AEF 0%, #443BF4 63%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "white",
    WebkitTextStroke: `${strokeWidth} transparent`,
});

const speakersGrid = [
    { id: 2, name: "Zahid Ibrahim", image: "zahid" },
    { id: 4, name: "Keisha Rochelline", image: "roche" },
    { id: 3, name: "Amanda Rawles", image: "amanda" },
    { id: 7, name: "Luna Maya", image: "luna" },
    { id: 1, name: "Naura Tsabita", image: "naura" },
    { id: 6, name: "Sadam Permana", image: "sadam" },
    { id: 5, name: "Eva Alicia", image: "eva" },
];

export default function GuidePage() {
    return (
        <main className="min-h-screen w-full">
            <div className="w-full bg-white bg-[url('/main-event/guide-asset.png')] bg-[length:100%_auto] bg-top bg-repeat-y pt-24 pb-32">
                <div className="container mx-auto flex flex-col items-center px-4">
                    {/* Header Image */}
                    <motion.div
                        className="mb-12 flex w-full max-w-4xl justify-center px-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src="/main-event/spectrum.png"
                            alt="Spectrum of Happiness"
                            width={900}
                            height={200}
                            className="h-auto w-full object-contain drop-shadow-xl"
                            draggable={false}
                            priority
                        />
                    </motion.div>

                    {/* Schedule Table */}
                    <motion.div
                        className="flex w-full max-w-4xl flex-col gap-3 md:gap-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 },
                            },
                        }}
                    >
                        {/* Header Row */}
                        <motion.div
                            className="flex w-full flex-row gap-3 md:gap-4"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.4 },
                                },
                            }}
                        >
                            <div
                                className="flex w-[35%] items-center justify-center rounded-xl py-3 shadow-lg md:w-56 md:rounded-2xl md:py-4"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #FFB820 0%, #FF6A15 100%)",
                                }}
                            >
                                <span
                                    className="text-2xl tracking-wide md:text-5xl"
                                    style={getTextStrokeStyle("6px")}
                                >
                                    Time
                                </span>
                            </div>
                            <div
                                className="flex flex-1 items-center justify-center rounded-xl py-3 shadow-lg md:rounded-2xl md:py-4"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #FFB820 0%, #FF6A15 100%)",
                                }}
                            >
                                <span
                                    className="text-2xl tracking-wide md:text-5xl"
                                    style={getTextStrokeStyle("6px")}
                                >
                                    Information
                                </span>
                            </div>
                        </motion.div>

                        {/* Body Rows */}
                        {scheduleData.map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex w-full flex-row gap-3 md:gap-4"
                                variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.3 },
                                    },
                                }}
                            >
                                <div
                                    className="flex w-[35%] items-center justify-center rounded-xl py-2 shadow-md md:w-56 md:rounded-2xl md:py-3"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #261DC7 0%, #443BF4 100%)",
                                    }}
                                >
                                    <span
                                        className="text-xl tracking-wide md:text-4xl"
                                        style={getTextStrokeStyle("5px")}
                                    >
                                        {item.time}
                                    </span>
                                </div>
                                <div
                                    className="flex flex-1 items-center justify-center rounded-xl py-2 shadow-md md:rounded-2xl md:py-3"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #261DC7 0%, #443BF4 100%)",
                                    }}
                                >
                                    <span
                                        className="text-xl tracking-wide md:text-4xl"
                                        style={getTextStrokeStyle("5px")}
                                    >
                                        {item.info}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Get to Know Our Speakers Section */}
                    <motion.div
                        className="mt-28 flex w-full max-w-6xl flex-col items-center gap-12 px-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.15 },
                            },
                        }}
                    >
                        <motion.div
                            className="flex w-full justify-center px-4"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.5 },
                                },
                            }}
                        >
                            <Image
                                src="/main-event/gettoknow.webp"
                                alt="Get to Know Our Speakers"
                                width={600}
                                height={150}
                                className="h-auto w-full max-w-3xl object-contain drop-shadow-xl"
                                draggable={false}
                            />
                        </motion.div>

                        <motion.div
                            className="grid w-full grid-cols-1 place-items-center gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 },
                                },
                            }}
                        >
                            {speakersGrid.map((speaker, index) => (
                                <motion.div
                                    key={speaker.id}
                                    className={`relative flex w-full max-w-[320px] flex-col items-center lg:max-w-[360px] ${
                                        index === 6
                                            ? "sm:col-span-2 md:col-span-1 md:col-start-2"
                                            : ""
                                    }`}
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            scale: 0.9,
                                            y: 20,
                                        },
                                        visible: {
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                            transition: { duration: 0.4 },
                                        },
                                    }}
                                >
                                    <div className="relative aspect-[424/410] w-full">
                                        <Image
                                            src="/main-event/back-layer.svg"
                                            alt="background layer"
                                            fill
                                            className="object-contain drop-shadow-xl"
                                            draggable={false}
                                        />

                                        <div className="absolute top-[3%] right-[3%] bottom-[6%] left-[3%] overflow-hidden">
                                            <Image
                                                src={`/main-event/${speaker.image}.webp`}
                                                alt={speaker.name}
                                                fill
                                                className="object-contain object-bottom"
                                                draggable={false}
                                            />
                                        </div>

                                        <div className="absolute bottom-[1%] left-1/2 aspect-[394/106] w-[93%] -translate-x-1/2">
                                            <Image
                                                src="/main-event/top-layer.svg"
                                                alt="top layer"
                                                fill
                                                className="object-contain"
                                                draggable={false}
                                            />
                                            <div className="absolute inset-0 flex flex-col justify-center pt-[1%] pb-[4%] pl-[8%]">
                                                {speaker.name
                                                    .split(" ")
                                                    .map((part, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-base leading-tight text-white drop-shadow-md md:text-lg lg:text-xl"
                                                            style={{
                                                                fontFamily:
                                                                    "var(--font-titan-one), cursive",
                                                            }}
                                                        >
                                                            {part}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <section className="bg-white">
                <PlainBackground color="blue" showTopCloud>
                    <div className="container mx-auto flex flex-col gap-10 px-4 py-16 md:py-24">
                        {/* Header Image */}
                        <motion.div
                            className="z-99 mb-4 flex w-full justify-center px-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                src="/main-event/whattoexpect.webp"
                                alt="What to Expect"
                                width={600}
                                height={150}
                                className="h-auto w-full max-w-2xl object-contain drop-shadow-xl"
                                draggable={false}
                            />
                        </motion.div>

                        {/* Three Columns Grid */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {/* Section 1 */}
                            <motion.div
                                className="flex w-full flex-col gap-4 rounded-3xl bg-white/10 p-6 backdrop-blur-md md:p-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3
                                    className="text-2xl tracking-wide text-white drop-shadow-sm md:text-3xl"
                                    style={{
                                        fontFamily:
                                            "var(--font-titan-one), cursive",
                                    }}
                                >
                                    TED Talks
                                </h3>
                                <div className="flex flex-col gap-3 text-base leading-relaxed text-white md:text-lg">
                                    <p>
                                        At this year’s TEDx, expect a series of
                                        talks that go beyond simply informing.
                                        Each session is designed to spark
                                        curiosity, stir emotion, and leave a
                                        lasting impression inviting you to
                                        reflect, reconnect, and rediscover what
                                        drives you.
                                    </p>
                                    <p>
                                        More than just a stage of speakers, come
                                        with an open mind, and immerse yourself
                                        in an experience that is evolving, and
                                        full of moments that inspire a genuine
                                        sense of joy and connection.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Section 2 */}
                            <motion.div
                                className="flex w-full flex-col gap-4 rounded-3xl bg-white/10 p-6 backdrop-blur-md md:p-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h3
                                    className="text-2xl tracking-wide text-white drop-shadow-sm md:text-3xl"
                                    style={{
                                        fontFamily:
                                            "var(--font-titan-one), cursive",
                                    }}
                                >
                                    A Spectrum of Shared Experiences
                                </h3>
                                <div className="flex flex-col gap-3 text-base leading-relaxed text-white md:text-lg">
                                    <p>
                                        Take part in a series of interactive
                                        moments designed to bring the theme of
                                        happiness through color to life, an
                                        experience that’s engaging, easy to step
                                        into, and open to everyone.
                                    </p>
                                    <p>
                                        Move through different moods and
                                        energies, from more lively and social
                                        interactions to quieter, more personal
                                        ones, all at your own pace. It’s a
                                        chance to be involved without pressure,
                                        in a way that feels natural and
                                        enjoyable.
                                    </p>
                                    <p>
                                        We’ll be introducing a series of
                                        interactive activities during the main
                                        event, something you can step into,
                                        enjoy, and interpret in your own way and
                                        leave a lasting impression.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Section 3 */}
                            <motion.div
                                className="flex w-full flex-col gap-4 rounded-3xl bg-white/10 p-6 backdrop-blur-md md:p-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h3
                                    className="text-2xl tracking-wide text-white drop-shadow-sm md:text-3xl"
                                    style={{
                                        fontFamily:
                                            "var(--font-titan-one), cursive",
                                    }}
                                >
                                    The Color Sanctuary
                                </h3>
                                <div className="flex flex-col gap-3 text-base leading-relaxed text-white md:text-lg">
                                    <p>
                                        Step into our Color Sanctuary, a space
                                        shaped by shifting colors, moods, and
                                        moments.
                                    </p>
                                    <p>
                                        Move through areas designed for
                                        different rhythms. From quieter corners
                                        that invite you to slow down and
                                        reflect, to a curated selection of meals
                                        and drinks you can enjoy at your own
                                        pace.
                                    </p>
                                    <p>
                                        Along the way, you’ll find subtle
                                        prompts to pause, express, and connect,
                                        whether that’s with yourself or with
                                        others. It’s a space to recharge,
                                        explore, and experience the theme in a
                                        more personal, immersive way.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </PlainBackground>
            </section>
        </main>
    );
}
