"use client";

import { MerchandiseHero } from "./_components/MerchandiseHero";
import MerchandiseGrid from "./_components/MerchandiseGrid";

const Merchandise = () => {
  return (
    <main className="">
      <h1 className="sr-only">TEDxITB 9.0 Merchandise</h1>
      <MerchandiseHero />
      <MerchandiseGrid />
    </main>
  );
};

export default Merchandise;
