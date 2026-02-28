"use client";

import Image from "next/image";
import { X, ShoppingCart } from "lucide-react";
import {
  type IMerchandise,
  type IMerchandiseBundle,
} from "~/server/contentful/types";
import { useState } from "react";

interface MerchandiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  // It can be a bundle or a group of merchandise items of the same type
  itemGroup: IMerchandiseBundle | IMerchandise[] | null;
  type: "bundle" | "regular";
}

export default function MerchandiseModal({
  isOpen,
  onClose,
  itemGroup,
  type,
}: MerchandiseModalProps) {
  // 1. Hooks unconditionally at the top level
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isBundle =
    type === "bundle" && !!itemGroup && !Array.isArray(itemGroup);
  const bundleData = isBundle ? itemGroup : null;

  const regularItems = !isBundle && Array.isArray(itemGroup) ? itemGroup : [];

  // Guarantee we never read out of bounds if selectedIndex was kept from a previous modal open
  const safeIndex = selectedIndex < regularItems.length ? selectedIndex : 0;
  const currentRegularItem = regularItems[safeIndex] ?? null;

  // For regular items, we might need options if it requires design selection
  const merchType = currentRegularItem?.merchandiseType;

  // 2. Early return AFTER all hooks
  if (!isOpen || !itemGroup) return null;

  const title = isBundle ? bundleData?.name : currentRegularItem?.name;
  const description = isBundle
    ? bundleData?.description
    : currentRegularItem?.description;
  const price = isBundle ? bundleData?.price : currentRegularItem?.price;
  const displayImage = isBundle ? bundleData?.image : currentRegularItem?.image;

  // Format price to IDR
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price ?? 0);

  const handleAddToCart = () => {
    // Placeholder logic for adding to cart

    alert(`Added ${title ?? "Item"} to cart!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity">
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white bg-[url('/pattern-bg.svg')] bg-repeat shadow-2xl md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full p-2 text-black transition-colors hover:scale-105 hover:cursor-pointer hover:bg-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image Section */}
        <div className="relative flex h-64 w-full items-center justify-center p-6 md:h-auto md:w-1/2">
          <div className="relative aspect-square h-full max-h-[400px] w-full overflow-hidden rounded-xl border-2 border-black bg-black">
            {displayImage ? (
              <Image
                src={displayImage}
                alt={title ?? "Merchandise"}
                fill
                className="object-cover"
                draggable={false}
              />
            ) : (
              <div className="h-full w-full bg-black" />
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex w-full flex-col overflow-y-auto p-6 md:w-1/2">
          <div className="mb-2">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider text-white uppercase ${isBundle ? "bg-blue" : "bg-pink"}`}
            >
              {type === "bundle" ? "Merchandise Bundle" : "Merchandise Item"}
            </span>
          </div>

          <h2
            className={`font-titan mb-2 text-3xl font-bold ${isBundle ? "text-blue" : "text-pink"}`}
          >
            {title}
          </h2>

          <p className="mb-6 text-2xl font-semibold text-gray-800">
            {formattedPrice}
          </p>

          <div className="prose prose-sm mb-8 max-w-none text-gray-700">
            <p className="whitespace-pre-wrap">
              {description ?? "No description available."}
            </p>
          </div>

          {/* If resolving a bundle, show its contents */}
          {isBundle &&
            bundleData?.merchandises &&
            bundleData.merchandises.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-3 font-bold text-gray-800">
                  Bundle Includes:
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-gray-700">
                  {bundleData.merchandises.map((merch) => (
                    <li key={merch.id}>{merch.name}</li>
                  ))}
                </ul>
              </div>
            )}

          {/* Variant Selector (if there are multiple products of the same type like Faculty Pins) */}
          {!isBundle && regularItems.length > 1 && (
            <div className="mb-6">
              <h3 className="mb-3 font-bold text-gray-800">Select Variant:</h3>
              <div className="flex flex-wrap gap-2">
                {regularItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedIndex(idx);
                    }}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors hover:cursor-pointer ${
                      safeIndex === idx
                        ? "border-pink-500 bg-pink-50 text-pink-600"
                        : "border-gray-200 bg-white text-gray-600 hover:border-pink-200"
                    }`}
                  >
                    {item.name.replace(
                      (item.merchandiseType ?? "") + " ",
                      "",
                    ) || item.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-4">
            <button
              onClick={handleAddToCart}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold text-white transition-transform hover:cursor-pointer active:scale-95 ${
                isBundle
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-pink-500 hover:bg-pink-600"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
