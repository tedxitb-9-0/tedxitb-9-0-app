import Image from "next/image";
import ColorfulBackground from "~/_components/ColorfulBackground";
import ActivityCarousel from "./_components/ActivityCarousel";
import ActivitySection from "./_components/ActivitySection";
import PlainBackground from "~/_components/PlainBackground";
import HeroSection from "./_components/HeroSection";
import FadeInView from "~/_components/FadeInView";
import FloatingImage from "./_components/FloatingImage";

const PreEvent = () => {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">TEDxITB 9.0 Pre-Event</h1>

      {/* Hero Section */}
      <ColorfulBackground showSmiles={true}>
        <HeroSection />
      </ColorfulBackground>
      <ActivitySection />
      <section className="relative overflow-hidden bg-white bg-[url('/pattern-bg.svg')] bg-repeat py-16 md:py-24">
        <div className="relative z-10 container mx-auto flex max-w-7xl flex-col items-center justify-center px-4">
          <FadeInView className="z-20 flex w-[50%] justify-center md:max-w-sm">
            <Image
              src="/pre-event/gallery.png"
              width={550}
              height={220}
              alt="A Glimpse into Last Year's Pre-Event Experience"
              className="w-full object-contain"
              priority
            />
          </FadeInView>
          {/* Activity Carousel */}
          <ActivityCarousel />
        </div>
      </section>

      {/* Get Your Tickets Section */}
      <section className="bg-white">
        <PlainBackground color="red">
          <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
            <FadeInView className="z-30 mb-8 flex w-full max-w-[600px] justify-center md:max-w-4xl">
              {/*
              <Image
                src="/pre-event/getyourtickets.png"
                width={700}
                height={200}
                alt="Get Your Tickets"
                className="w-full object-contain"
                priority
                draggable={false}
              />

            */}
              <div className="z-30 flex w-full flex-col items-center justify-center px-4">
                {/* <div className="mx-auto w-fit max-w-full overflow-x-auto overflow-y-hidden rounded-xl bg-white p-4 shadow-xl sm:p-6 md:p-8">
                <CountdownTimer />
              </div> */}
                <FloatingImage
                  src="/comingsoon.webp"
                  width={800}
                  height={800}
                  alt="Coming Soon"
                  className="w-full object-contain drop-shadow-2xl"
                  containerClassName="mx-auto w-fit max-w-5xl"
                />
              </div>
            </FadeInView>
          </div>
        </PlainBackground>
      </section>
    </main>
  );
};

export default PreEvent;
