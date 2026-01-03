"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

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
    <section 
      className="h-screen w-full overflow-hidden flex flex-col items-center justify-center gap-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('colorfulbg/colorfulbg.png')" }}
    >
      {/* Top Left - floats diagonally from corner */}
      <motion.div
        className="absolute top-0 left-0 w-32 md:w-48"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/colorfulbg/topleft.svg" alt="" width={200} height={200} className="w-full h-auto" />
        </motion.div>
      </motion.div>

      {/* Top Right - floats diagonally from corner */}
      <motion.div
        className="absolute top-0 right-0 w-32 md:w-48"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
      >
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/colorfulbg/topright.svg" alt="" width={200} height={200} className="w-full h-auto" />
        </motion.div>
      </motion.div>

      {/* Bottom Left - floats diagonally from corner */}
      <motion.div
        className="absolute bottom-0 left-0 w-32 md:w-48"
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/colorfulbg/bottomleft.svg" alt="" width={200} height={200} className="w-full h-auto" />
        </motion.div>
      </motion.div>

      {/* Bottom Right - floats diagonally from corner */}
      <motion.div
        className="absolute bottom-0 right-0 w-32 md:w-48"
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.3 }}
      >
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/colorfulbg/bottomright.svg" alt="" width={200} height={200} className="w-full h-auto" />
        </motion.div>
      </motion.div>

      {/* Center content with stagger */}
      <motion.div
        className="flex flex-col w-full items-center gap-4 z-10"
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
        className="w-[70%] max-w-4xl z-10"
      >
        <Image 
          src="/404notfound.svg" 
          alt="404 Not Found" 
          width={400} 
          height={400}
          className="w-full h-auto"
        />
      </motion.div>
      
        
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        >
          <Link 
            href="/" 
            className="mt-8 px-6 py-2 bg-red text-white rounded-md hover:opacity-90 transition shadow-lg"
          >
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
