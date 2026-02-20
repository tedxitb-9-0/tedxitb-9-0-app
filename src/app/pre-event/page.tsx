"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import ColorfulBackground from "~/_components/ColorfulBackground";
import ActivityCard from "./_components/ActivityCard";
import ActivityCarousel from "./_components/ActivityCarousel";

const activities = [
  {
    title: "Workshop",
    description:
      "This workshop discussed waste management and plastic recycling. Participants learned about the process of transforming plastic waste into usable products through hands-on activities.",
    imageSrc: "/pre-event/activity-left.svg",
    imageAlt: "Workshop activity",
  },
  {
    title: "Talkshow",
    description:
      "This workshop focused on Batik as a cultural practice and artistic medium. Participants were introduced to basic Batik painting techniques and the importance of preserving Batik as part of Indonesian cultural identity.",
    imageSrc: "/pre-event/activity-middle.svg",
    imageAlt: "Talkshow activity",
  },
  {
    title: "Exhibition",
    description:
      "This workshop focused on Batik as a cultural practice and artistic medium. Participants were introduced to basic Batik painting techniques and the importance of preserving Batik as part of Indonesian cultural identity.",
    imageSrc: "/pre-event/activity-right.svg",
    imageAlt: "Exhibition activity",
  },
];

const sectionDescription =
  "This workshop focused on Batik as a cultural practice and artistic medium. Participants were introduced to basic Batik painting techniques and the importance of preserving Batik as part of Indonesian cultural identity.";

const PreEvent = () => {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">TEDxITB 9.0 Pre-Event</h1>

      {/* Hero Section */}
      <ColorfulBackground>
        <div className="container relative z-30 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Pre-Event Ticket
            </h2>
            <p className="mb-8 text-xl text-white/90 md:text-2xl">
              Get your exclusive access to the TEDxITB 9.0 Pre-Event
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12 rounded-2xl bg-white/10 p-8 backdrop-blur-sm"
            >
              <p className="mb-4 text-lg text-white">
                Join us for an exciting pre-event experience featuring exclusive
                talks, networking opportunities, and more!
              </p>
              <div className="flex items-center justify-center gap-8 text-white">
                <div>
                  <p className="text-3xl font-bold">IDR 50,000</p>
                  <p className="text-sm text-white/80">Per Ticket</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/pre-event/buy"
                className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-4 text-xl font-bold text-white shadow-2xl transition-all hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-3xl"
              >
                Buy Ticket Now
              </Link>
              <p className="mt-4 text-sm text-white/70">
                Secure your spot today!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </ColorfulBackground>

      {/* Workshop and Activities Section*/}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="container relative z-10 mx-auto max-w-7xl px-4 pt-16 md:pt-24">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center md:mb-16"
          >
            {/* "Last Year's"*/}
            <div className="mx-auto mb-2 flex justify-center">
              <Image
                src="/pre-event/last-year.svg"
                alt="Last Year's"
                width={305}
                height={58}
                className="h-auto w-48 md:w-64"
                draggable={false}
              />
            </div>

            {/* "Workshop and Activities"*/}
            <div className="mx-auto mb-6 flex justify-center">
              <Image
                src="/pre-event/workshop-activities.svg"
                alt="Workshop and Activities"
                width={865}
                height={95}
                className="h-auto w-[80%] max-w-2xl md:w-[70%]"
                draggable={false}
              />
            </div>

            {/* Section description */}
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-navy/80 md:text-base">
              {sectionDescription}
            </p>
          </motion.div>

          {/* Activity Cards Grid */}
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
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          >
            {activities.map((activity, index) => (
              <ActivityCard
                key={activity.title}
                title={activity.title}
                description={activity.description}
                imageSrc={activity.imageSrc}
                imageAlt={activity.imageAlt}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <h2 className="relative mb-20 text-center text-7xl font-titan leading-none">
          <span
            className="absolute inset-0 text-black opacity-20"
            style={{
              transform: "translateY(10px)",
              zIndex: 0,
            }}
          >
            Gallery
          </span>
          <span
            className="absolute inset-0 text-transparent"
            style={{
              WebkitTextStroke: "12px white",
              zIndex: 1,
            }}
          >
            Gallery
          </span>
          <span
            className="relative z-10 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent"
          >
            Gallery
          </span>
        </h2>
          {/* Activity Carousel */}
          <ActivityCarousel />
        </div>
      </section>
    </main>
  );
};

export default PreEvent;
