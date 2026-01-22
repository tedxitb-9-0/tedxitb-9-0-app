"use client";

import Link from "next/link";
import { InstagramIcon, Twitter } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="w-full text-black">
      <div className="flex flex-col md:flex-row justify-around items-center md:items-start gap-8 px-6 md:px-12 py-8">
        <motion.div 
          className="flex flex-col gap-2 items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image src="/tedx9.png" alt="Logo" width={156} height={30} />
          <p className="font-semibold">Happiness Through Colors</p>
          
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <Link href="https://instagram.com/tedxitb" className="flex items-center gap-1 hover:opacity-70">
              <InstagramIcon size={18} />
              <span className="text-sm">@tedxitb</span>
            </Link>
            <Link href="https://tiktok.com/@tedxitb" className="flex items-center gap-1 hover:opacity-70">
              <Image src="/tiktok.svg" alt="TikTok" width={18} height={18} />
              <span className="text-sm">@tedxitb</span>
            </Link>
            <Link href="https://x.com/TEDxITB2025" className="flex items-center gap-1 hover:opacity-70">
              <Twitter size={18} />
              <span className="text-sm">@TEDxITB2025</span>
            </Link>
          </div>
        </motion.div>

        {/* Right Section - Navigation */}
        <motion.div 
          className="flex gap-8 sm:gap-16"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex flex-col gap-2 text-center md:text-left">
            <Link href="/" className="hover:opacity-70">Home</Link>
            <Link href="/about" className="hover:opacity-70">About</Link>
            <Link href="/main-event" className="hover:opacity-70">Main Event</Link>
            <Link href="/pre-event" className="hover:opacity-70">Pre-Event</Link>
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <Link href="/merchandise" className="hover:opacity-70">Merchandise</Link>
            <Link href="/magazine" className="hover:opacity-70">Magazine</Link>
            <Link href="/sponsorship" className="hover:opacity-70">Sponsorships</Link>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="border-t border-gray-300 py-4 text-center text-sm"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
      >
        © TEDxITB 9.0 2025. All Rights Reserved.
      </motion.div>
    </footer>
  );
}
