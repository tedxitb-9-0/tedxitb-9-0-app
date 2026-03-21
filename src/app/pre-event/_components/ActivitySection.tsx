"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";

import ActivityCard from "./ActivityCard";

const activities = [
    {
        title: "Qreate Studios",
        description:
            "A hands-on creative workshop where ideas are explored through making. Participants experiment with different tools and mediums while learning the creative process through collaboration and practice.",
        imageSrc: "/pre-event/qreate-img.png",
        imageAlt: "Qreate Studios activity",
        logoSrc: "/pre-event/qreate-logo.png",
        logoAlt: "Qreate Studios logo",
    },
    {
        title: "The Sanctuary Wellness",
        description:
            "A guided wellness session designed to help participants slow down, breathe, and reconnect with themselves. Through simple practices like mindful breathing and body awareness, the workshop focuses on restoring balance and inner calm.",
        imageSrc: "/pre-event/sanctuary-img.png",
        imageAlt: "The Sanctuary Wellness activity",
        logoSrc: "/pre-event/sanctuary-logo.png",
        logoAlt: "The Sanctuary Wellness logo",
    },
    {
        title: "MICROARTMUNITY",
        description:
            "A unique workshop where science meets art. Participants explore the beauty of microorganisms, discovering how microscopic life can form natural colors, patterns, and artistic visuals.",
        imageSrc: "/pre-event/microart-img.png",
        imageAlt: "MICROARTMUNITY activity",
        logoSrc: "/pre-event/microart-logo.png",
        logoAlt: "MICROARTMUNITY logo",
    },
    {
        title: "Merakee",
        description:
            "A floral bouquet-making workshop led by Merakee, a Bandung-based floral studio. Participants learn to arrange flowers from scratch while enjoying a creative, hands-on experience that encourages connection and self-expression.",
        imageSrc: "/pre-event/merakee-img.png",
        imageAlt: "Merakee activity",
        logoSrc: "/pre-event/merakee-logo.png",
        logoAlt: "Merakee logo",
    },
];

const ActivitySection = () => {
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const pauseAutoScrollRef = useRef(false);
    const carouselItems = [...activities, ...activities];

    useEffect(() => {
        const container = carouselRef.current;
        if (!container) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (prefersReducedMotion) return;

        const loopWidth = container.scrollWidth / 2;
        container.scrollLeft = loopWidth;

        let animationFrameId = 0;

        const tick = () => {
            if (!pauseAutoScrollRef.current) {
                container.scrollLeft -= 0.45;

                if (container.scrollLeft <= 0) {
                    container.scrollLeft += loopWidth;
                } else if (container.scrollLeft >= loopWidth) {
                    container.scrollLeft -= loopWidth;
                }
            }

            animationFrameId = window.requestAnimationFrame(tick);
        };

        animationFrameId = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <section className="relative overflow-hidden bg-white bg-[url('/pattern-bg.svg')] bg-repeat py-12">
            <div className="pointer-events-none absolute top-0 left-0 hidden h-full w-full lg:block">
                <Image
                    src="/pre-event/last-year-bg.png"
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
                        src="/pre-event/left-asset.png"
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
                        src="/pre-event/right-asset.png"
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
                            src="/pre-event/workshop-activities.png"
                            alt="Workshop and Activities"
                            width={865}
                            height={95}
                            className="h-auto w-[80%] max-w-3xl md:w-[70%]"
                            draggable={false}
                        />
                    </div>
                </motion.div>

                {/* Activity Cards Carousel */}
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
                    ref={carouselRef}
                    className="flex gap-6 overflow-x-auto pb-4 lg:gap-8"
                    onMouseEnter={() => {
                        pauseAutoScrollRef.current = true;
                    }}
                    onMouseLeave={() => {
                        pauseAutoScrollRef.current = false;
                    }}
                    onTouchStart={() => {
                        pauseAutoScrollRef.current = true;
                    }}
                    onTouchEnd={() => {
                        pauseAutoScrollRef.current = false;
                    }}
                >
                    {carouselItems.map((activity, index) => (
                        <div
                            key={`${activity.title}-${index}`}
                            data-activity-slide
                            className="shrink-0 basis-[88%] sm:basis-[68%] lg:basis-[46%] xl:basis-[32%]"
                        >
                            <ActivityCard
                                title={activity.title}
                                description={activity.description}
                                imageSrc={activity.imageSrc}
                                imageAlt={activity.imageAlt}
                                logoSrc={activity.logoSrc}
                                logoAlt={activity.logoAlt}
                                index={index % activities.length}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ActivitySection;
