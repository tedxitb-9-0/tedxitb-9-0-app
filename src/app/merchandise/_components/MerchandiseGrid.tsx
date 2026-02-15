"use client";

import Image from "next/image";
import MerchandiseCard from "./MerchandiseCard";
import { motion } from "motion/react";

// Placeholder data - will be replaced with Contentful API later
const bundlePlaceholders = [
  { id: "bundle-1", name: "Merch Bundle #1", price: "Rpx.xxx,xx" },
  { id: "bundle-2", name: "Merch Bundle #1", price: "Rpx.xxx,xx" },
  { id: "bundle-3", name: "Merch Bundle #1", price: "Rpx.xxx,xx" },
];

const regularPlaceholders = [
  { id: "regular-1", name: "Merch Name #1", price: "Rpx.xxx,xx" },
  { id: "regular-2", name: "Merch Name #1", price: "Rpx.xxx,xx" },
  { id: "regular-3", name: "Merch Name #1", price: "Rpx.xxx,xx" },
  { id: "regular-4", name: "Merch Name #1", price: "Rpx.xxx,xx" },
  { id: "regular-5", name: "Merch Name #1", price: "Rpx.xxx,xx" },
];

const MerchandiseGrid = () => {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[url('/pattern-bg.svg')] bg-repeat py-12 md:py-16 lg:py-24">
      {/* Bundles Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-8 flex w-full flex-col items-center"
      >
        <Image
          src="/merchandise/merchandise-bundle.png"
          alt="Merchandise Bundle"
          width={750}
          height={70}
          className="mb-12 h-12 w-auto md:h-18"
          draggable={false}
          priority
        />

        {/* Bundle Cards Grid */}
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 justify-items-center gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {bundlePlaceholders.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MerchandiseCard
                type="bundle"
                name={bundle.name}
                price={bundle.price}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Merchandise Collection Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 flex w-full flex-col items-center"
      >
        <Image
          src="/merchandise/merchandise-collection.png"
          alt="Merchandise Collection"
          width={3300}
          height={300}
          className="mb-12 h-12 w-auto md:h-18"
          draggable={false}
          priority
        />

        {/* Regular Cards Grid */}
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-items-center gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularPlaceholders.map((merch, index) => (
            <motion.div
              key={merch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MerchandiseCard
                type="regular"
                name={merch.name}
                price={merch.price}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default MerchandiseGrid;
