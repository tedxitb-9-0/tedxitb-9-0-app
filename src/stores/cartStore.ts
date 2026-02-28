import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type ICartItem, type IMerchandise } from "~/server/contentful/types";

interface CartState {
  items: ICartItem[];
  isDrawerOpen: boolean;

  // Cart Actions
  addItem: (merchandise: IMerchandise, quantity?: number) => void;
  removeItem: (merchandiseId: string) => void;
  updateQuantity: (merchandiseId: string, quantity: number) => void;
  clearCart: () => void;

  // UI Actions
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (merchandise, quantity = 1) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.merchandise.id === merchandise.id,
          );

          if (existingItemIndex >= 0) {
            // Update quantity if item already exists
            const nextItems = [...state.items];
            nextItems[existingItemIndex]!.quantity += quantity;
            return { items: nextItems };
          }

          // Add new item
          return { items: [...state.items, { merchandise, quantity }] };
        }),

      removeItem: (merchandiseId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.merchandise.id !== merchandiseId,
          ),
        })),

      updateQuantity: (merchandiseId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => item.merchandise.id !== merchandiseId,
              ),
            };
          }

          const nextItems = state.items.map((item) =>
            item.merchandise.id === merchandiseId
              ? { ...item, quantity }
              : item,
          );

          return { items: nextItems };
        }),

      clearCart: () => set({ items: [] }),

      toggleDrawer: () =>
        set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      setDrawerOpen: (open) => set({ isDrawerOpen: open }),
    }),
    {
      name: "tedxitb-cart-storage", // name of the item in the storage (must be unique)
      // Only persist the items, we don't need to persist whether the drawer is open
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
