import PlainBackground from "~/_components/PlainBackground";
import { motion } from "motion/react";
import Image from "next/image";

export const MerchandiseHero = (props: {}) => {
  return (
    <section>
      <PlainBackground color="blue">
        <div className="my-20 flex min-h-screen items-start justify-center pt-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="z-20 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 md:px-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font text-center text-5xl font-black text-white md:text-6xl lg:text-7xl"
            >
              <Image
                src="/merchandise.png"
                alt="Merchandise"
                width={504}
                height={90}
                className="h-12 w-auto md:h-18"
                draggable={false}
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </PlainBackground>
    </section>
  );
};
