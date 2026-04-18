import Image from "next/image";
import ColorfulBackground from "~/_components/ColorfulBackground";
import ActivitySection from "./_components/ActivitySection";
import PlainBackground from "~/_components/PlainBackground";
import HeroSection from "./_components/HeroSection";
import FadeInView from "~/_components/FadeInView";
import VenueSection from "./_components/VenueSection";
import MainEventBuyTicketsLink from "./_components/MainEventBuyTicketsLink";

const MainEvent = () => {
  return (
    <main className="min-h-screen">
      <h1 className="sr-only">TEDxITB 9.0 Main Event</h1>

      {/* Hero Section */}
      <ColorfulBackground showSmiles={true}>
        <HeroSection />
      </ColorfulBackground>
      <section className="bg-white">
        <PlainBackground color="red" showTopCloud>
          <VenueSection />
        </PlainBackground>
      </section>
      <ActivitySection />

      {/* Get Your Tickets Section */}
      <section className="bg-white">
        <PlainBackground color="red" showTopCloud>
          <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
            <FadeInView className="z-30 mb-8 flex w-full max-w-[600px] flex-col justify-center md:max-w-4xl">
              <Image
                src="/main-event/getyourtickets.png"
                width={700}
                height={200}
                alt="Get Your Tickets"
                className="w-full object-contain"
                priority
                draggable={false}
              />
              <div className="mx-auto my-8 flex w-fit max-w-full justify-center">
                <MainEventBuyTicketsLink />
              </div>
            </FadeInView>
          </div>
        </PlainBackground>
      </section>
    </main>
  );
};

export default MainEvent;
