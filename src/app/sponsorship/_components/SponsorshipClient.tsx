"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { api } from "~/trpc/react";
import { useMemo } from "react";
import { type ISponsorSize } from "~/server/contentful/types";

const SIZE_ORDER: ISponsorSize[] = ["S", "M", "L", "XL", "XXL"];

// Base height in px for S; each tier scales by 0.5x increments
const BASE_HEIGHT = 80; // px — chosen to look good on the page
const SIZE_SCALE: Record<ISponsorSize, number> = {
  S: 1,
  M: 1.5,
  L: 2,
  XL: 2.5,
  XXL: 3,
};

const SponsorshipClient = () => {
  const { data: sponsors, isLoading } = api.sponsorship.getAll.useQuery();

  const grouped = useMemo(() => {
    if (!sponsors) return [];

    const onlySponsors = sponsors.filter((s) => s.type === "Sponsorship");

    return SIZE_ORDER.map((size) => ({
      size,
      items: onlySponsors.filter((s) => s.size === size),
    })).filter((group) => group.items.length > 0);
  }, [sponsors]);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
      </div>
    );
  }

  if (!grouped.length) {
    return (
      <div className="flex min-h-[40vh] w-full items-center justify-center">
        <p className="text-gray-500 font-medium">No sponsors to display.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-16 px-6 py-16 md:py-24">
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
                      className="h-full w-auto max-w-[180px] object-contain transition-transform duration-300 hover:scale-105"
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
