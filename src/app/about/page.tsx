"use client";

import { motion } from "motion/react";
import PlainBackground from "~/components/PlainBackground";

export default function About() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <PlainBackground color="red">
          <div className="flex min-h-screen items-center justify-center pt-16 md:pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="z-20 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 md:px-12"
            >
              <div className="w-full text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font text-center text-5xl font-black text-white md:text-6xl lg:text-7xl"
                  style={{
                    fontFamily: "var(--font-titan-one), cursive",
                    textShadow: "0 4px 0 #E12D2D, 0 8px 0 rgba(0,0,0,0.2)",
                  }}
                >
                  About TEDxITB
                </motion.h1>
              </div>

              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="w-full rounded-xl bg-white p-8 shadow-xl"
                >
                  <h3 className="mb-3 text-2xl font-extrabold text-orange-600 md:text-3xl">
                    What does TED stand for?
                  </h3>
                  <p className="text-foreground/90 text-justify text-sm leading-7 md:text-base">
                    TED stands for Technology, Entertainment, Design — three
                    broad subject areas that are collectively shaping our world.
                    But a TED conference is broader still, showcasing important
                    research and ideas from all disciplines and exploring how
                    they connect. The goal is to expand the imagination, make
                    unexpected connections, inspire conversation and set the
                    ball in motion for meaningful learning and change.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="w-full rounded-xl bg-white p-8 shadow-xl"
                >
                  <h3 className="mb-3 text-2xl font-extrabold text-orange-600 md:text-3xl">
                    What is TEDx?
                  </h3>
                  <p className="text-foreground/90 text-justify text-sm leading-7 md:text-base">
                    TEDx is a grassroots initiative, created in the spirit of
                    TED's overall mission to research and discover "ideas worth
                    spreading." TEDx brings the spirit of TED to local
                    communities around the globe through TEDx events. TEDx
                    events include live speakers and recorded TED Talks, and are
                    organized independently under a free license granted by TED.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </PlainBackground>

        <section className="relative w-full overflow-hidden bg-[url('/pattern-bg.svg')] bg-repeat py-12 md:py-16 lg:py-24">
          <div className="max-w-1xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-4"
                >
                  <img
                    src="/about/TEDxPresent.svg"
                    alt="TEDxITB 9.0 Presents"
                    className="mx-auto block h-auto w-[220px]"
                  />
                </motion.div>
                <motion.img
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  src="/about/Happiness.svg"
                  alt="Happiness Through Colors"
                  className="lg:max-w-8xl mx-auto mt-2 h-auto w-full max-w-2xl md:max-w-7xl"
                />
              </div>

              <div className="relative mt-8 w-full">
                {/* Left Hand - sticks to page border */}
                <motion.div
                  className="pointer-events-none absolute top-1/2 left-0 z-10 hidden h-auto w-[400px] -translate-y-1/2 md:block lg:w-[500px]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src="/about/LeftHand.png"
                    alt="Left Hand"
                    className="h-full w-full object-contain"
                  />
                </motion.div>

                {/* Right Hand - sticks to page border */}
                <motion.div
                  className="pointer-events-none absolute top-1/2 right-0 z-10 hidden h-auto w-[400px] -translate-y-1/2 md:block lg:w-[500px]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                >
                  <img
                    src="/about/RightHand.png"
                    alt="Right Hand"
                    className="h-full w-full object-contain"
                  />
                </motion.div>

                <div className="relative flex w-full justify-center">
                  {/* Paper Container - Desktop */}
                  <div
                    className="relative hidden w-full max-w-2xl sm:max-w-3xl md:block lg:max-w-5xl"
                    style={{
                      backgroundImage: "url('/about/PaperBG.svg')",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      backgroundSize: "contain",
                      backgroundAttachment: "scroll",
                    }}
                  >
                    <div className="px-12 py-12 sm:px-16 sm:py-16 md:px-24 md:py-20 lg:px-32 lg:py-24">
                      <div className="bg-transparent">
                        <p className="text-foreground/90 text-justify text-xs leading-6 sm:text-sm sm:leading-7 md:text-base md:leading-7">
                          Happiness Through Colors was born from the belief that
                          each person holds their own unique color of happiness.
                          Its message is simple yet profound, that every
                          individual has the right to define and celebrate the
                          color that represents their joy, whether it comes
                          through achievement, passion, creativity,
                          relationships, reflection and self-acceptance. Color
                          is chosen as a universal metaphor because each one
                          carries its own meaning, and when brought together,
                          they form a spectrum that reflects the beauty of
                          diverse human happiness. This theme is not about
                          forcing a single definition of happiness, but about
                          celebrating the differences in how people experience
                          joy and realizing that our lives become richer when
                          every color is acknowledged and celebrated together.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Box - Mobile */}
                  <div className="relative w-full md:hidden">
                    <div
                      className="mx-4 rounded-2xl border-4 border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, #FFF5EC 0%, rgba(255,248,240,0.95) 100%)",
                        borderColor: "rgba(255,255,255,0.4)",
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                        <div className="h-4 w-16 rounded-full bg-white/60 shadow-sm" />
                      </div>
                      <p className="text-foreground/90 text-justify text-xs leading-6">
                        Happiness Through Colors was born from the belief that
                        each person holds their own unique color of happiness.
                        Its message is simple yet profound, that every
                        individual has the right to define and celebrate the
                        color that represents their joy, whether it comes
                        through achievement, passion, creativity, relationships,
                        reflection and self-acceptance. Color is chosen as a
                        universal metaphor because each one carries its own
                        meaning, and when brought together, they form a spectrum
                        that reflects the beauty of diverse human happiness.
                        This theme is not about forcing a single definition of
                        happiness, but about celebrating the differences in how
                        people experience joy and realizing that our lives
                        become richer when every color is acknowledged and
                        celebrated together.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {/* Accomplishment */}
              <div
                className="overflow-hidden rounded-xl px-8 py-6 shadow-[0_10px_10px_rgba(0,0,0,0.25)] md:px-5 md:py-7"
                style={{
                  backgroundImage: "linear-gradient(135deg,#E12D2D,#FA5151)",
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
                    <img
                      src="/about/faces/accomplishment.svg"
                      alt="Accomplishment"
                      className="h-7 w-7"
                    />
                  </div>
                  <h4
                    className="md:text-1xl text-right text-3xl font-extrabold text-white"
                    style={{
                      fontFamily: "var(--font-titan-one), cursive",
                      textShadow: "0 6px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    Accomplishment
                  </h4>
                </div>
                <p className="text-justify text-sm leading-7 text-white/90 md:text-base">
                  Happiness often arises when we achieve goals or challenges we
                  set, because it reflects our personal growth and perseverance.
                  The sense of accomplishment proves our perseverance and hard
                  work is worthy. This accomplishment not only gives us
                  self-assurance but also inspires us to take on further
                  challenges in the future.
                </p>
              </div>

              {/* Passion */}
              <div
                className="overflow-hidden rounded-xl px-8 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] md:px-5 md:py-7"
                style={{
                  backgroundImage: "linear-gradient(135deg,#FF6A15,#FF975C)",
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
                    <img
                      src="/about/faces/passion.svg"
                      alt="Passion"
                      className="h-7 w-7"
                    />
                  </div>
                  <h4
                    className="md:text-1xl text-right text-3xl font-extrabold text-white"
                    style={{
                      fontFamily: "var(--font-titan-one), cursive",
                      textShadow: "0 6px 10px rgba(0,0,0,0.18)",
                    }}
                  >
                    Passion
                  </h4>
                </div>
                <p className="text-justify text-sm leading-7 text-white/90 md:text-base">
                  Happiness often begins within ourselves, with passion as one
                  of its strongest sources. When we dedicate time and energy to
                  what we love, it creates fulfillment beyond achievements.
                  Passion drives growth and turns simple actions into meaningful
                  experiences. Thus, happiness is not something we wait for from
                  others, but something we create through what we truly care
                  about.
                </p>
              </div>

              {/* Creation */}
              <div
                className="overflow-hidden rounded-xl px-8 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] md:px-5 md:py-7"
                style={{
                  backgroundImage: "linear-gradient(135deg,#FFB820,#FFCF69)",
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
                    <img
                      src="/about/faces/creation.svg"
                      alt="Creation"
                      className="h-7 w-7"
                    />
                  </div>
                  <h4
                    className="md:text-1xl text-right text-3xl font-extrabold text-white"
                    style={{
                      fontFamily: "var(--font-titan-one), cursive",
                      textShadow: "0 6px 10px rgba(0,0,0,0.12)",
                    }}
                  >
                    Creation
                  </h4>
                </div>
                <p className="text-justify text-sm leading-7 text-white/90 md:text-base">
                  Happiness is not always something we wait to receive. Often it
                  is something we shape with our own hands and hearts. Through
                  creation in art, work or other forms of making, we give shape
                  to our deepest values and emotions.
                </p>
              </div>

              {/* Connection */}
              <div
                className="overflow-hidden rounded-xl px-8 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] md:px-5 md:py-7"
                style={{
                  backgroundImage: "linear-gradient(135deg,#FF3A8C,#FF75AE)",
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
                    <img
                      src="/about/faces/connection.svg"
                      alt="Connection"
                      className="h-7 w-7"
                    />
                  </div>
                  <h4
                    className="md:text-1xl text-right text-3xl font-extrabold text-white"
                    style={{
                      fontFamily: "var(--font-titan-one), cursive",
                      textShadow: "0 6px 10px rgba(0,0,0,0.18)",
                    }}
                  >
                    Connection
                  </h4>
                </div>
                <p className="text-justify text-sm leading-7 text-white/90 md:text-base">
                  Connection is more than just being with others; it is about
                  finding meaning in shared experiences and feeling understood.
                  When we build genuine bonds, we create spaces where happiness
                  flows naturally, and hope grows stronger.
                </p>
              </div>

              {/* Acceptance */}
              <div
                className="overflow-hidden rounded-xl px-8 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] md:px-5 md:py-7"
                style={{
                  backgroundImage: "linear-gradient(135deg,#9A1AEF,#B45CEE)",
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
                    <img
                      src="/about/faces/acceptance.svg"
                      alt="Acceptance"
                      className="h-7 w-7"
                    />
                  </div>
                  <h4
                    className="md:text-1xl text-right text-3xl font-extrabold text-white"
                    style={{
                      fontFamily: "var(--font-titan-one), cursive",
                      textShadow: "0 6px 10px rgba(0,0,0,0.18)",
                    }}
                  >
                    Acceptance
                  </h4>
                </div>
                <p className="text-justify text-sm leading-7 text-white/90 md:text-base">
                  Sometimes happiness is not loud. It grows after we rise from
                  hardship and learn to accept pain as part of the journey.
                  Unspoken happiness is the strength to stay grateful and the
                  peace to move forward.
                </p>
              </div>

              {/* Reflection */}
              <div
                className="overflow-hidden rounded-xl px-8 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] md:px-5 md:py-7"
                style={{
                  backgroundImage: "linear-gradient(135deg,#443BF4,#635BF7)",
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md">
                    <img
                      src="/about/faces/reflection.svg"
                      alt="Reflection"
                      className="h-7 w-7"
                    />
                  </div>
                  <h4
                    className="md:text-1xl text-right text-3xl font-extrabold text-white"
                    style={{
                      fontFamily: "var(--font-titan-one), cursive",
                      textShadow: "0 6px 10px rgba(0,0,0,0.18)",
                    }}
                  >
                    Reflection
                  </h4>
                </div>
                <p className="text-justify text-sm leading-7 text-white/90 md:text-base">
                  Unspoken happiness often comes from struggles we once endured.
                  When we transform those challenges into kindness for others,
                  happiness becomes more than personal, it turns into impact.
                  Just like giving back after once receiving help, reflecting
                  unspoken happiness means spreading hope and showing gratitude
                  through action.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
