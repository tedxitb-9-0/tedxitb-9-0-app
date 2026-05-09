"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { type ISponsor, type ISponsorSize } from "~/server/contentful/types";

const SIZE_ORDER: ISponsorSize[] = ["XXL", "XL", "L", "M", "S", "XS"];

// Base height in px for S; each tier scales by 0.5x increments
const BASE_HEIGHT = 80;
const SIZE_SCALE: Record<ISponsorSize, number> = {
  XS: 0.5,
  S: 1,
  M: 1.5,
  L: 2,
  XL: 2.5,
  XXL: 3,
};

interface SponsorshipClientProps {
  sponsors: ISponsor[];
  emptyMessage?: string;
}

const SponsorshipClient = ({ sponsors, emptyMessage = "No sponsors to display." }: SponsorshipClientProps) => {
  const grouped = SIZE_ORDER.map((size) => ({
    size,
    items: sponsors.filter((s) => s.size === size),
  })).filter((group) => group.items.length > 0);

  if (!grouped.length) {
    return (
      <div className="flex min-h-[20vh] w-full items-center justify-center">
        <p className="font-medium text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-16 px-6 pb-16 pt-8 md:pb-24 md:pt-10">
      {grouped.map((group, gi) => {
        const logoHeight = BASE_HEIGHT * SIZE_SCALE[group.size];

        return (
          <motion.div
            key={group.size}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="flex w-full max-w-5xl flex-col items-center gap-6"
          >
            {/* Sponsor logos row — wraps naturally */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {group.items.map((sponsor, si) => {
                const logo = (
                  <div
                    key={sponsor.id}
                    className="relative flex items-center justify-center"
                    style={{ height: `${logoHeight}px` }}
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.companyName}
                      width={logoHeight * 3}
                      height={logoHeight}
                      className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                      style={{ maxHeight: `${logoHeight}px` }}
                      draggable={false}
                    />
                  </div>
                );

                return sponsor.companyWebsiteLink ? (
                  <motion.a
                    key={sponsor.id}
                    href={sponsor.companyWebsiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: si * 0.05 }}
                    title={sponsor.companyName}
                  >
                    {logo}
                  </motion.a>
                ) : (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: si * 0.05 }}
                    title={sponsor.companyName}
                  >
                    {logo}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SponsorshipClient;
