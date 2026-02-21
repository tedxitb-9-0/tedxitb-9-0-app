"use client";

import ColorfulBackground from "./ColorfulBackground";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import TEDxITBBadge from "./TEDxITBBadge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const ComingSoon = () => {
  return (
    <ColorfulBackground>
      {/* Center content with stagger */}
      <motion.div
        className="z-20 flex w-full flex-col items-center gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <TEDxITBBadge />

        {/* Coming Soon Image - center floating */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="z-30 w-[70%] max-w-4xl"
        >
          <Image
            src="/comingsoon.webp"
            alt="Coming Soon"
            width={1200}
            height={100}
            className="h-auto w-full"
            draggable={false}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <p>Stay tuned for more!</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        >
          <Link
            href="/"
            className="bg-red mt-12 rounded-md px-6 py-2 text-white shadow-lg transition hover:opacity-90"
          >
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </ColorfulBackground>
  );
};

export default ComingSoon;
