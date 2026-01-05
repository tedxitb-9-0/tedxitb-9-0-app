"use client";

import { motion } from "motion/react";
import Image from "next/image";

const colors = [
  {
    name: "Accomplishment",
    icon: "/about/faces/accomplishment.svg",
    gradient: "linear-gradient(135deg,#E12D2D,#FA5151)",
    description: "Happiness often arises when we achieve goals or challenges we set, because it reflects our personal growth and perseverance. The sense of accomplishment proves our perseverance and hard work is worthy. This accomplishment not only gives us self-assurance but also inspires us to take on further challenges in the future.",
  },
  {
    name: "Passion",
    icon: "/about/faces/passion.svg",
    gradient: "linear-gradient(135deg,#FF6A15,#FF975C)",
    description: "Happiness often begins within ourselves, with passion as one of its strongest sources. When we dedicate time and energy to what we love, it creates fulfillment beyond achievements. Passion drives growth and turns simple actions into meaningful experiences. Thus, happiness is not something we wait for from others, but something we create through what we truly care about.",
  },
  {
    name: "Creation",
    icon: "/about/faces/creation.svg",
    gradient: "linear-gradient(135deg,#FFB820,#FFCF69)",
    description: "Happiness is not always something we wait to receive. Often it is something we shape with our own hands and hearts. Through creation in art, work or other forms of making, we give shape to our deepest values and emotions.",
  },
  {
    name: "Connection",
    icon: "/about/faces/connection.svg",
    gradient: "linear-gradient(135deg,#FF3A8C,#FF75AE)",
    description: "Connection is more than just being with others; it is about finding meaning in shared experiences and feeling understood. When we build genuine bonds, we create spaces where happiness flows naturally, and hope grows stronger.",
  },
  {
    name: "Acceptance",
    icon: "/about/faces/acceptance.svg",
    gradient: "linear-gradient(135deg,#9A1AEF,#B45CEE)",
    description: "Sometimes happiness is not loud. It grows after we rise from hardship and learn to accept pain as part of the journey. Unspoken happiness is the strength to stay grateful and the peace to move forward.",
  },
  {
    name: "Reflection",
    icon: "/about/faces/reflection.svg",
    gradient: "linear-gradient(135deg,#443BF4,#635BF7)",
    description: "Unspoken happiness often comes from struggles we once endured. When we transform those challenges into kindness for others, happiness becomes more than personal, it turns into impact. Just like giving back after once receiving help, reflecting unspoken happiness means spreading hope and showing gratitude through action.",
  },
];

export default function ColorGrid() {
  return (
    <div className="relative mx-auto mt-12 max-w-7xl px-6">
      <div className="hidden lg:block absolute top-0 left-0 -z-20 w-full pointer-events-none">
        <Image 
          src="/about/gridbackground.svg"  
          alt="Decorative geometric pattern" 
          width={1000} 
          height={1000} 
          className="w-full h-auto opacity-100" 
          draggable={false} 
        />
      </div>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {colors.map((color, index) => (
          <motion.div
            key={color.name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                },
              },
            }}
            className="overflow-hidden rounded-xl px-8 py-6 shadow-[0_10px_10px_rgba(0,0,0,0.25)] md:px-5 md:py-7"
            style={{
              backgroundImage: color.gradient,
            }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full  shadow-md">
                <Image
                  src={color.icon}
                  alt={color.name}
                  width={28}
                  height={28}
                  className="h-12 w-12"
                />
              </div>
              <h4
                className="md:text-1xl text-right text-3xl  text-white"
                style={{
                  fontFamily: "var(--font-titan-one), cursive",
                  textShadow: "0 6px 10px rgba(0,0,0,0.18)",
                }}
              >
                {color.name}
              </h4>
            </div>
            <p className="text-justify text-sm leading-7 text-white/90 md:text-base">
              {color.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
