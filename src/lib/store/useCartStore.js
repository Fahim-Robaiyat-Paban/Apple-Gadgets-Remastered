"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const MAX_QUANTITY = 10;

// localStorage can hold anything from an older app version (or hand edits), so rehydrated
// items are checked before they are trusted. Prices here are display-only:
// TODO: the backend must re-price the cart from its own catalogue at checkout.
const sanitizeItems = (items) =>
  Array.isArray(items)
    ? items.filter(
        (item) =>
          typeof item?.id === "string" &&
          typeof item?.slug === "string" &&
          typeof item?.name === "string" &&
          Number.isFinite(item?.price) &&
          Number.isInteger(item?.quantity) &&
          item.quantity > 0 &&
          (item.variant === undefined || item.variant === null || typeof item.variant === "string"),
      )
    : [];

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_QUANTITY) }
                  : item,
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity: Math.min(quantity, MAX_QUANTITY) }],
          };
        }),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(Math.max(quantity, 1), MAX_QUANTITY) }
              : item,
          ),
        })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      version: 1, // bump whenever the shape of persisted state changes
      skipHydration: true, // hydrated in <StoreHydrator /> after mount, so SSR and first client render agree
      partialize: (state) => ({ items: state.items }),
      migrate: (persisted) => persisted, // nothing to migrate yet
      merge: (persisted, current) => ({
        ...current,
        items: sanitizeItems(persisted?.items),
      }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
