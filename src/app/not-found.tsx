"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import ColorfulBackground from "~/components/ColorfulBackground";

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

export default function NotFound() {
  return (
    <ColorfulBackground>
      {/* Center content with stagger */}
      <motion.div
        className="flex flex-col w-full items-center gap-4 z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Image - center floating */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-[70%] max-w-4xl z-30"
        >
          <Image 
            src="/notfound.webp" 
            alt="404 Not Found" 
            width={1000} 
            height={100}
            className="w-full h-auto"
            draggable={false}
          />
        </motion.div>
       
        <motion.div
          variants={itemVariants}
        >
       <p>
          Seems like {`you've`} lost your way!
       </p> 
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        >
          <Link 
            href="/" 
            className="mt-12 px-6 py-2 bg-red text-white rounded-md hover:opacity-90 transition shadow-lg"
          >
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </ColorfulBackground>
  );
}
