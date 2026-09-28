"use client";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store/useCartStore";

// The cart store uses skipHydration, so localStorage is only read after mount.
const CartHydrator = () => {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
};

export default CartHydrator;
