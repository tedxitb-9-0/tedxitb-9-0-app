import ColorfulBackground from "./ColorfulBackground";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const ExclusivelySection = () => {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-12 md:h-screen md:py-0 md:pb-[-20]">
      <ColorfulBackground showSmiles={false}>
        {/* Cloud Border Frame */}{" "}
        <div className="pointer-events-none absolute top-0 left-0 z-20 h-auto w-full">
          <Image
            src="/cloud.png"
            alt="cloud"
            width={2000}
            height={100}
            className="h-auto w-full"
            draggable={false}
          />
        </div>
        <motion.div
          className="z-20 mt-20 w-xl max-w-[8xl] md:mt-40 md:w-[90%] md:max-w-[8xl]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full"
          >
            <Image
              src="/exclusively.webp"
              alt="TEDxITB 9.0 - Happiness Through Colors"
              width={1300}
              height={120}
              className="h-auto w-full"
              draggable={false}
              priority
            />
          </motion.div>
        </motion.div>
        <div className="z-20 mb-8 flex w-full max-w-[320px] flex-row gap-3 px-4 md:mb-32 md:max-w-4xl md:gap-40">
          {/* Magazine Card */}
          <Link href="/magazine" className="w-1/2 md:w-auto md:flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex h-full cursor-pointer flex-col items-center rounded-2xl px-3 py-4 text-center shadow-lg transition-transform hover:scale-105 md:px-12 md:py-10"
              style={{
                background:
                  "linear-gradient(to bottom right, #FF3A8C, #FF75AE)",
              }}
            >
              <div className="relative mb-2 flex aspect-square w-full items-center justify-center rounded-xl bg-white p-2 md:mb-4 md:px-10 md:py-8">
                <div className="absolute top-1 right-1 md:top-3 md:right-3">
                  <Image
                    src="/smilesmall.svg"
                    alt="Magazine"
                    width={120}
                    height={120}
                    className="h-auto w-5 object-contain md:w-10"
                    draggable={false}
                  />
                </div>
                <Image
                  src="/magazine.svg"
                  alt="Magazine"
                  width={120}
                  height={120}
                  className="h-auto w-16 object-contain md:w-40"
                  draggable={false}
                />
              </div>
              <h3 className="font-titan mt-2 mb-1 text-base text-white md:mt-5 md:mb-2 md:text-4xl">
                Magazine
              </h3>
              <p className="text-[7px] leading-tight text-white md:text-sm">
                Check out TEDxITB {`9.0's`} magazine!
              </p>
            </motion.div>
          </Link>

          {/* Merchandise Card */}
          <Link href="/merchandise" className="w-1/2 md:w-auto md:flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex h-full cursor-pointer flex-col items-center rounded-2xl px-3 py-4 text-center shadow-lg transition-transform hover:scale-105 md:px-12 md:py-10"
              style={{
                background:
                  "linear-gradient(to bottom right, #443BF4, #635BF7)",
              }}
            >
              <div className="relative mb-2 flex aspect-square w-full items-center justify-center rounded-xl bg-white p-2 md:mb-4 md:px-10 md:py-8">
                <div className="absolute top-1 right-1 md:top-3 md:right-3">
                  <Image
                    src="/smilemerchandise.svg"
                    alt="Merchandise"
                    width={120}
                    height={120}
                    className="h-auto w-5 object-contain md:w-10"
                    draggable={false}
                  />
                </div>
                <Image
                  src="/merchandise.svg"
                  alt="Merchandise"
                  width={120}
                  height={120}
                  className="h-auto w-16 object-contain md:w-40"
                  draggable={false}
                />
              </div>
              <h3 className="font-titan mt-2 mb-1 text-base text-white md:mt-5 md:mb-2 md:text-4xl">
                Merchandise
              </h3>
              <p className="text-[7px] leading-tight text-white md:text-sm">
                Check out TEDxITB {`9.0's`} Merchandise!
              </p>
            </motion.div>
          </Link>
        </div>
      </ColorfulBackground>
    </section>
  );
};

export default ExclusivelySection;
