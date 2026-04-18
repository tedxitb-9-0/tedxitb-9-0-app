import Image from "next/image";
import ColorfulBackground from "~/_components/ColorfulBackground";
// import ActivityCarousel from "./_components/ActivityCarousel";
import ActivitySection from "./_components/ActivitySection";
import PlainBackground from "~/_components/PlainBackground";
import HeroSection from "./_components/HeroSection";
import FadeInView from "~/_components/FadeInView";
import VenueSection from "./_components/VenueSection";

const PreEvent = () => {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">TEDxITB 9.0 Pre-Event</h1>

      {/* Hero Section */}
      <ColorfulBackground showSmiles={true}>
        <HeroSection />
      </ColorfulBackground>
      <ActivitySection />
      <section className="bg-white">
        <PlainBackground color="purple" showTopCloud>
          <VenueSection />
        </PlainBackground>
      </section>

      {/* Get Your Tickets Section */}
      <section className="bg-white">
        <PlainBackground color="red" showTopCloud>
          <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
            <FadeInView className="z-30 mb-8 flex w-full max-w-[600px] flex-col justify-center md:max-w-4xl">
              <Image
                src="/pre-event/getyourtickets.png"
                width={700}
                height={200}
                alt="Get Your Tickets"
                className="w-full object-contain"
                priority
                draggable={false}
              />

              <div className="mx-auto my-8 w-fit max-w-full overflow-x-auto overflow-y-hidden rounded-2xl border border-red-100 bg-white/95 p-8 text-center shadow-2xl backdrop-blur">
                <h2 className="mb-3 text-4xl font-black tracking-tight text-[#E62B1E] md:text-5xl">
                  SOLD OUT
                </h2>
                <p className="text-lg font-bold text-gray-800 md:text-xl">
                  All pre-event tickets have been fully claimed.
                </p>
                <p className="mt-2 font-medium text-gray-600">
                  Thank you for your overwhelming enthusiasm!
                </p>
              </div>
            </FadeInView>
          </div>
        </PlainBackground>
      </section>
    </main>
  );
};

export default PreEvent;
