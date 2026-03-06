import Image from "next/image";
import SponsorshipClient from "./_components/SponsorshipClient";

const Sponsorship = () => {
  return (
    <main className="w-full">
      <h1 className="sr-only">TEDxITB 9.0 Sponsors</h1>

      {/* Header */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[url('/pattern-bg.svg')] bg-repeat px-6 py-16 md:py-24">
        {/* Title image */}
        <Image
          src="/Sponsorships.png"
          alt="Our Sponsors"
          width={800}
          height={120}
          className="mb-4 h-auto max-h-16 w-auto max-w-[80%] object-contain md:max-h-20"
          priority
          draggable={false}
        />

        <SponsorshipClient />
      </section>
    </main>
  );
};

export default Sponsorship;
