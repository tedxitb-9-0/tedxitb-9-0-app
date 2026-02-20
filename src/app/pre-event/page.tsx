"use client";

import Link from "next/link";
import { motion } from "motion/react";
import ColorfulBackground from "~/_components/ColorfulBackground";

const PreEvent = () => {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">TEDxITB 9.0 Pre-Event</h1>
      <ColorfulBackground>
        <div className="py-16-50 relative z-30 container mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-blue/50 text-center"
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
                className="hover:shadow-3xl inline-block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-4 text-xl font-bold text-white shadow-2xl transition-all hover:scale-105 hover:from-blue-700 hover:to-purple-700"
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
    </main>
  );
};

export default PreEvent;
