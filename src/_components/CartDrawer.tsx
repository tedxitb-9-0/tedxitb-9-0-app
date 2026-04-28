"use client";

import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "~/stores/cartStore";
import { motion, AnimatePresence } from "motion/react";

export const CartDrawer = () => {
  const { isDrawerOpen, setDrawerOpen, items, updateQuantity } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.merchandise.price * item.quantity,
    0,
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl sm:w-[400px]"
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="font-titan flex items-center gap-2 text-2xl text-pink-600">
                <ShoppingBag className="h-6 w-6" />
                Your Cart
              </h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-gray-500">
                  <ShoppingBag className="mb-4 h-16 w-16 opacity-20" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm">
                    Add some cool merchandise to check out!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.merchandise.id} className="flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border bg-gray-50">
                        <Image
                          src={item.merchandise.image}
                          alt={item.merchandise.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="line-clamp-2 pr-4 font-bold text-gray-800">
                            {item.merchandise.name}
                          </h3>
                        </div>
                        <p className="mt-1 font-semibold text-pink-600">
                          {formatPrice(item.merchandise.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center rounded-lg border border-gray-200">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.merchandise.id,
                                  item.quantity - 1,
                                )
                              }
                              className="p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.merchandise.id,
                                  item.quantity + 1,
                                )
                              }
                              className="p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t bg-gray-50 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-gray-600">
                    Total ({totalItems} items)
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <button
                  disabled
                  className="flex w-full items-center justify-center rounded-xl bg-gray-300 px-6 py-4 font-bold text-gray-500 cursor-not-allowed"
                >
                  Merchandise Sales Are Closed
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
