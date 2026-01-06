import { Play } from "next/font/google";
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
  
const ExploreSection = () => {
  return (
  <section 
    className="h-fit w-full flex bg-repeat flex-col items-center justify-center py-12 md:py-24 px-4"
  >
      <Image
            src="/exploreTEDxITBeffectsIZIN.png"
            alt="TEDxITB 9.0 - Happiness Through Colors"
            width={806}
            height={175}
            className="absolute w-full h-auto"
            draggable={false}
            priority
      />
    <motion.div
        className="z-20 m:w-[90%] max-w-[8xl] mb-5 md:max-w-[6xl] "
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
            className="w-full h-auto"
            draggable={false}
            priority
          />
        </motion.div>
      </motion.div>

    <div className="flex flex-col lg:flex-row gap-4 md:gap-8 lg:gap-20 w-full max-w-7xl px-4">
      {/* Main Event Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="rounded-xl p-4 md:p-6 shadow-2xl"
        style={{ background: 'linear-gradient(to bottom right, #E12D2D, #FA5151)' }}
      >
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 justify-between">
          <div>
            <Image
              src="/senyummainevent.svg"
              alt="Main Event"
              width={40}
              height={40}
              className="w-8 h-8 md:w-12 md:h-12"
              draggable={false}
            />
          </div>
          <h2 className="text-2xl md:text-4xl font-titan text-white">Main Event</h2>
        </div>
        <p className="text-white text-justify text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
          TEDxITB is an independent, locally licensed TED event held at the Bandung Institute of Technology
        </p>
        <div className="flex justify-end">
          <Link href="/main-event">
            <button className="bg-white text-red-600 font-semibold text-sm px-6 hover:cursor-pointer py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md">
              Learn more
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </div>
      </motion.div>

      {/* About Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="rounded-xl p-4 md:p-6 shadow-2xl"
        style={{ background: 'linear-gradient(to bottom right, #FF6A15, #FF975C)' }}
      >
        <div className="flex items-center gap-2 md:gap-3 justify-between mb-3 md:mb-4">
          <div>
            <Image
              src="/aboutsenyum.svg"
              alt="Main Event"
              width={40}
              height={40}
              className="w-8 h-8 md:w-12 md:h-12"
              draggable={false}
            />
          </div>
          <h2 className="text-2xl md:text-4xl font-titan text-white">About</h2>
        </div>
        <p className="text-white text-justify text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
          TEDxITB is an independent, locally licensed TED event held at the Bandung Institute of Technology
        </p>
        <div className="flex justify-end">
          <Link href="/about">
            <button className="bg-white text-orange-600 font-semibold hover:cursor-pointer text-sm px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md">
              Learn more
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
        className="rounded-xl p-4 md:p-6 shadow-2xl"
        style={{ background: '#FFB820' }}
      >
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 justify-between">
          <div>
            <Image
              src="/senyumpreevent.svg"
              alt="Pre Event"
              width={40}
              height={40}
              className="w-8 h-8 md:w-12 md:h-12"
              draggable={false}
            />
          </div>
          <h2 className="text-2xl md:text-4xl font-titan text-white">Pre Event</h2>
        </div>
        <p className="text-white text-justify text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
          TEDxITB is an independent, locally licensed TED event held at the Bandung Institute of Technology
        </p>
        <div className="flex justify-end">
          <Link href="/pre-event">
            <button className="bg-white text-yellow-600 font-semibold text-sm px-6 py-2 rounded-lg hover:cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-md">
              Learn more
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>

  );
}

export default ExploreSection;
