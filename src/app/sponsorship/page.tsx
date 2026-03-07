import Image from "next/image";
import { api } from "~/trpc/server";
import SponsorshipClient from "./_components/SponsorshipClient";

const Sponsorship = async () => {
  const sponsors = await api.sponsorship.getAll();

  return (
    <main className="w-full">
      <h1 className="sr-only">TEDxITB 9.0 Sponsors</h1>

      <section className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-[url('/pattern-bg.svg')] bg-repeat px-6 pt-12 pb-24 md:pt-32">
        {/* Title image */}
        <Image
          src="/Sponsorships.png"
          alt="Our Sponsors"
          width={800}
          height={120}
          className="mb-2 h-auto max-h-16 w-auto max-w-[80%] object-contain md:max-h-20"
          priority
          draggable={false}
        />

        <SponsorshipClient sponsors={sponsors} />
      </section>
    </main>
  );
};

export default Sponsorship;
