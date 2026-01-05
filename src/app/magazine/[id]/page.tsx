"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { getMagazineById } from "../data";

export default function MagazineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const magazineId = params.id as string;

  const magazine = getMagazineById(magazineId);

  if (!magazine) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-navy">Magazine Not Found</h1>
          <button
            onClick={() => router.push("/magazine")}
            className="rounded-md bg-blue px-6 py-3 text-white hover:opacity-90"
          >
            Back to Magazines
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header with Back Button */}
      <motion.div
        className="sticky top-0 z-40 bg-white shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={() => router.push("/magazine")}
            className="flex items-center gap-2 text-navy transition-opacity hover:opacity-70"
          >
            <span className="text-2xl">←</span>
            <span className="text-lg font-semibold">Back to Magazines</span>
          </button>
          <h1 className="text-xl font-bold text-navy md:text-2xl">{magazine.title}</h1>
        </div>
      </motion.div>

      {/* Flipbook Iframe */}
      <motion.div
        className="flex-1 bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <iframe
          src={magazine.flipbookUrl}
          className="h-[calc(100vh-80px)] w-full"
          allowFullScreen
          title={magazine.title}
        />
      </motion.div>
    </main>
  );
}
