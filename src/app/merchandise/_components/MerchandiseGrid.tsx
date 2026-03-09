"use client";

import Image from "next/image";
import MerchandiseCard from "./MerchandiseCard";
import MerchandiseModal from "./MerchandiseModal";
import { motion } from "motion/react";
import { api } from "~/trpc/react";
import { useState, useMemo } from "react";
import {
  type IMerchandiseBundle,
  type IMerchandise,
  type IMerchandiseType,
} from "~/server/contentful/types";

const MerchandiseGrid = () => {
  const { data: bundles, isLoading: bundlesLoading } =
    api.merchandise.getAllBundles.useQuery();
  const { data: items, isLoading: itemsLoading } =
    api.merchandise.getAll.useQuery();

  // State for the modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<
    IMerchandiseBundle | IMerchandise[] | null
  >(null);
  const [modalType, setModalType] = useState<"bundle" | "regular">("regular");

  // Group individual merchandises by their Type
  const groupedItems = useMemo(() => {
    if (!items) return [];

    const groupMap = new Map<IMerchandiseType, IMerchandise[]>();

    items.forEach((item) => {
      if (!groupMap.has(item.merchandiseType)) {
        groupMap.set(item.merchandiseType, []);
      }
      groupMap.get(item.merchandiseType)!.push(item);
    });

    // Convert map to array for rendering
    return Array.from(groupMap.entries()).map(([type, merchandises]) => ({
      type,
      merchandises,
      // We use the first item to represent the whole group on the card
      representative: merchandises[0],
    }));
  }, [items]);

  const handleOpenBundle = (bundle: IMerchandiseBundle) => {
    setSelectedGroup(bundle);
    setModalType("bundle");
    setModalOpen(true);
  };

  const handleOpenRegular = (merchandises: IMerchandise[]) => {
    setSelectedGroup(merchandises);
    setModalType("regular");
    setModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[url('/pattern-bg.svg')] bg-repeat py-12 md:py-16 lg:py-24">
      {/* Bundles Section */}
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
          className="mb-12 h-auto max-h-12 w-auto max-w-[90%] object-contain md:max-h-16"
          draggable={false}
          priority
        />

        {itemsLoading ? (
          <div className="flex w-full justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>
          </div>
        ) : groupedItems.length > 0 ? (
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-items-center gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
            {groupedItems.map((group, index) => {
              if (!group.representative) return null;
              return (
                <motion.div
                  key={group.type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleOpenRegular(group.merchandises)}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  <MerchandiseCard
                    type="regular"
                    name={group.type} // Display the category name (e.g., "Enamel Pin Fakultas")
                    price={formatPrice(group.representative.price)}
                    imageUrl={group.representative.image}
                  />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="font-medium text-gray-500">
            No merchandises available yet.
          </p>
        )}
      </motion.div>

      {/* Modal */}
      <MerchandiseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        itemGroup={selectedGroup}
        type={modalType}
      />
    </section>
  );
};

export default MerchandiseGrid;
