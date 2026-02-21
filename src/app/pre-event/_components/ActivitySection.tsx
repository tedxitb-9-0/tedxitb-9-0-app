"use client";

import Image from "next/image";
import { motion } from "motion/react";

import ActivityCard from "./ActivityCard";

const sectionDescription =
  "This workshop focused on Batik as a cultural practice and artistic medium. Participants were introduced to basic Batik painting techniques and the importance of preserving Batik as part of Indonesian cultural identity.";

const activities = [
  {
    title: "Workshop",
    description:
      "Across the three workshop spots, participants learned about waste management and plastic recycling through hands-on activities, and explored Batik as a cultural art form by practicing basic painting techniques while understanding its importance in preserving Indonesian cultural identity.",
    imageSrc: "/pre-event/activity-left.svg",
    imageAlt: "Workshop activity",
  },
  {
    title: "Talkshow",
    description:
      "The talk show was a 45-minute discussion addressing challenges and opportunities related to Indonesia Emas 2045. The session focused on practical perspectives rather than theoretical concepts.",
    imageSrc: "/pre-event/activity-middle.png",
    imageAlt: "Talkshow activity",
  },
  {
    title: "Exhibition",
    description:
      "Live music performances by local rising stars (veterans of the West Java Festival 2024) were held throughout the event to support a relaxed environment. The exhibition area allowed participants to move freely between workshops, discussion sessions, and community booths.",
    imageSrc: "/pre-event/activity-right.svg",
    imageAlt: "Exhibition activity",
  },
];

const ActivitySection = () => {
  return (
    <section className="relative overflow-hidden bg-white bg-[url('/pattern-bg.svg')] bg-repeat">
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
      <div className="relative z-10 container mx-auto max-w-7xl px-4 pt-16">
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
              src="/pre-event/last-year.png"
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
              src="/pre-event/workshop-activities.png"
              alt="Workshop and Activities"
              width={865}
              height={95}
              className="h-auto w-[80%] max-w-2xl md:w-[70%]"
              draggable={false}
            />
          </div>

          {/* Section description */}
          <p className="text-navy/80 mx-auto max-w-3xl text-sm leading-relaxed md:text-base">
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
  );
};

export default ActivitySection;
