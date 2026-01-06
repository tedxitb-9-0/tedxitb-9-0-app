import ColorfulBackground from "./ColorfulBackground";
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"


const ExclusivelySection = () => {
  return (
     <section className="min-h-screen md:h-screen w-full flex flex-col items-center justify-center relative overflow-hidden py-12 md:py-0 md:pb-[-20]">
        <ColorfulBackground>
          {/* Cloud Border Frame */} <div className="absolute top-0 left-0 w-full h-auto z-20 pointer-events-none"> <Image src="/cloud.png" alt="" width={2000} height={100} className="w-full h-auto"
              draggable={false}
            />
          </div>

          <motion.div
            className="z-20 w-xl md:w-[90%] max-w-[8xl] md:max-w-[8xl] mt-20 md:mt-40"
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
                width={1000}
                height={150}
                className="w-full h-auto"
                draggable={false}
                priority
              />
            </motion.div>
          </motion.div>

          <div className="flex flex-row gap-3 md:gap-40 z-20 px-4 w-full max-w-[320px] md:max-w-4xl mb-8 md:mb-32">
            {/* Magazine Card */}
            <Link href="/magazine" className="w-1/2 md:w-auto md:flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl py-4 px-3 md:py-10 md:px-12 shadow-lg flex flex-col items-center text-center h-full cursor-pointer hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(to bottom right, #FF3A8C, #FF75AE)' }}
              >
              <div className="bg-white rounded-xl p-2 md:py-8 md:px-10 mb-2 md:mb-4 w-full aspect-square flex items-center justify-center relative">
                <div className="absolute top-1 right-1 md:top-3 md:right-3">
                  <Image
                    src="/smilesmall.svg"
                    alt="Magazine"
                    width={120}
                    height={120}
                    className="w-5 md:w-10 h-auto object-contain"
                    draggable={false}
                  />
                </div>
                <Image
                  src="/magazine.svg"
                  alt="Magazine"
                  width={120}
                  height={120}
                  className="w-16 md:w-40 h-auto object-contain"
                  draggable={false}
                />
              </div>
              <h3 className="text-base md:text-4xl font-titan mt-2 md:mt-5 text-white mb-1 md:mb-2">Magazine</h3>
              <p className="text-white text-[7px] md:text-sm leading-tight">Check out TEDxITB {`9.0's`} magazine!</p>
            </motion.div>
            </Link>

            {/* Merchandise Card */}
            <Link href="/merchandise" className="w-1/2 md:w-auto md:flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl py-4 px-3 md:py-10 md:px-12 shadow-lg flex flex-col items-center text-center h-full cursor-pointer hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(to bottom right, #443BF4, #635BF7)' }}
              >
              <div className="bg-white rounded-xl p-2 md:py-8 md:px-10 mb-2 md:mb-4 w-full aspect-square flex items-center justify-center relative">
                <div className="absolute top-1 right-1 md:top-3 md:right-3">
                  <Image
                    src="/smilemerchandise.svg"
                    alt="Merchandise"
                    width={120}
                    height={120}
                    className="w-5 md:w-10 h-auto object-contain"
                    draggable={false}
                  />
                </div>
                <Image
                  src="/merchandise.svg"
                  alt="Merchandise"
                  width={120}
                  height={120}
                  className="w-16 md:w-40 h-auto object-contain"
                  draggable={false}
                />
              </div>
              <h3 className="text-base md:text-4xl font-titan mt-2 md:mt-5 text-white mb-1 md:mb-2">Merchandise</h3>
              <p className="text-white text-[7px] md:text-sm leading-tight">Check out TEDxITB {`9.0's`} Merchandise!</p>
            </motion.div>
            </Link>
          </div>
        </ColorfulBackground>
      </section>
  );

}


export default ExclusivelySection;
