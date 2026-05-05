import Image from "next/image";
import { api } from "~/trpc/server";
import SponsorshipClient from "./_components/SponsorshipClient";

const Sponsorship = async () => {
  const sponsors = await api.sponsorship.getAll();

  const sponsorships = sponsors.filter((s) => s.type === "Sponsorship");
  const partnerships = sponsors.filter((s) => s.type === "Partnership");

  return (
    <main className="w-full">
      <h1 className="sr-only">TEDxITB 9.0 Sponsors</h1>

      <section className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-[url('/pattern-bg.svg')] bg-repeat px-6 pt-12 pb-24 md:pt-32">
        {/* Sponsorships section */}
        <Image
          src="/Sponsorships.png"
          alt="Our Sponsors"
          width={800}
          height={120}
          className="mb-2 h-auto max-h-16 w-auto max-w-[80%] object-contain md:max-h-20"
          priority
          draggable={false}
        />

        <SponsorshipClient sponsors={sponsorships} />

        {/* Partnerships section */}
        <Image
          src="/partnerships.webp"
          alt="Our Partners"
          width={800}
          height={120}
          className="mb-2 mt-12 h-auto max-h-16 w-auto max-w-[80%] object-contain md:mt-16 md:max-h-20"
          draggable={false}
        />

        <SponsorshipClient sponsors={partnerships} emptyMessage="No partners to display." />
      </section>
    </main>
  );
};

export default Sponsorship;
