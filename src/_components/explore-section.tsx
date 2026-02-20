import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const ExploreSection = () => {
  return (
    <section className="flex h-fit w-full flex-col items-center justify-center bg-repeat px-4 py-12 md:py-24">
      <Image
        src="/exploreTEDxITBeffectsIZIN.png"
        alt="TEDxITB 9.0 - Happiness Through Colors"
        width={806}
        height={175}
        className="pointer-events-none absolute h-auto w-full"
        draggable={false}
        priority
      />
      <motion.div
        className="m:w-[90%] z-20 mb-5 max-w-[8xl] md:max-w-[6xl]"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/exploretedx.webp"
            alt="TEDxITB 9.0 - Happiness Through Colors"
            width={806}
            height={175}
            className="h-auto w-full"
            draggable={false}
            priority
          />
        </motion.div>
      </motion.div>

      <div className="flex w-full max-w-7xl flex-col gap-4 px-4 md:gap-8 lg:flex-row lg:gap-20">
        {/* Main Event Card */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-xl p-4 shadow-2xl md:p-6"
          style={{
            background: "linear-gradient(to bottom right, #E12D2D, #FA5151)",
          }}
        >
          <div className="mb-3 flex items-center justify-between gap-2 md:mb-4 md:gap-3">
            <div>
              <Image
                src="/senyummainevent.svg"
                alt="Main Event"
                width={40}
                height={40}
                className="h-8 w-8 md:h-12 md:w-12"
                draggable={false}
              />
            </div>
            <h2 className="font-titan text-2xl text-white md:text-4xl">
              Main Event
            </h2>
          </div>
          <p className="mb-4 text-justify text-xs leading-relaxed text-white md:mb-6 md:text-sm">
            TEDxITB is an independent, locally licensed TED event held at the
            Bandung Institute of Technology
          </p>
          <div className="flex justify-end">
            <Link href="/main-event">
              <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-2 text-sm font-semibold text-red-600 shadow-md transition-colors hover:cursor-pointer hover:bg-gray-100">
                Learn more
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </motion.div> */}

        {/* About Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="rounded-xl p-4 shadow-2xl md:p-6 lg:min-w-0 lg:flex-1"
          style={{
            background: "linear-gradient(to bottom right, #FF6A15, #FF975C)",
          }}
        >
          <div className="mb-3 flex items-center justify-between gap-2 md:mb-4 md:gap-3">
            <div>
              <Image
                src="/aboutsenyum.svg"
                alt="Main Event"
                width={40}
                height={40}
                className="h-8 w-8 md:h-12 md:w-12"
                draggable={false}
              />
            </div>
            <h2 className="font-titan text-2xl text-white md:text-4xl">
              About
            </h2>
          </div>
          <p className="mb-4 text-justify text-xs leading-relaxed text-white md:mb-6 md:text-sm">
            TEDxITB is an independent, locally licensed TED event held at the
            Bandung Institute of Technology
          </p>
          <div className="flex justify-end">
            <Link href="/about">
              <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-2 text-sm font-semibold text-orange-600 shadow-md transition-colors hover:cursor-pointer hover:bg-gray-100">
                Learn more
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Pre Event Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="rounded-xl p-4 shadow-2xl md:p-6 lg:min-w-0 lg:flex-1"
          style={{ background: "#FFB820" }}
        >
          <div className="mb-3 flex items-center justify-between gap-2 md:mb-4 md:gap-3">
            <div>
              <Image
                src="/senyumpreevent.svg"
                alt="Pre Event"
                width={40}
                height={40}
                className="h-8 w-8 md:h-12 md:w-12"
                draggable={false}
              />
            </div>
            <h2 className="font-titan text-2xl text-white md:text-4xl">
              Pre Event
            </h2>
          </div>
          <p className="mb-4 text-justify text-xs leading-relaxed text-white md:mb-6 md:text-sm">
            TEDxplore, a hands-on pre-event designed to tackle the theme PUZZLE:
            The Struggles of Tomorrow. We brought together creators, activists,
            and leaders for 8 hours of exhibitions, workshops, and honest talk
            about what it actually takes to build our future.
          </p>
          <div className="flex justify-end">
            <Link href="/pre-event">
              <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-2 text-sm font-semibold text-yellow-600 shadow-md transition-colors hover:cursor-pointer hover:bg-gray-100">
                Learn more
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreSection;
