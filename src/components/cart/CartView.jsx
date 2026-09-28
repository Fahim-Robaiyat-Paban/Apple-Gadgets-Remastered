"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Trash2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Button from "@/components/ui/Button";
import QuantityStepper from "@/components/ui/QuantityStepper";
import EmiEstimator from "@/components/product/EmiEstimator";
import { useCartStore } from "@/lib/store/useCartStore";
import { formatPrice } from "@/lib/utils/formatters";
import { getCartCount, getCartTotal } from "@/lib/utils/pricing";
import { buildOrderMessage, getWhatsAppUrl } from "@/lib/utils/whatsapp";
import { EASE } from "@/lib/utils/motion";
import { notchMask } from "@/lib/utils/shapes";

const CartSkeleton = () => (
  <div role="status" aria-busy="true" className="animate-pulse space-y-4">
    <span className="sr-only">Loading your cart</span>
    <div className="h-24 rounded-3xl bg-mist" />
    <div className="h-24 rounded-3xl bg-mist" />
  </div>
);

// The order summary is a till receipt: it prints down onto the page once, has a perforated
// tear edge, and lists lines with dotted leaders. Same shape family as the price tags.
const Receipt = ({ children }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      initial={reduceMotion ? false : { clipPath: "inset(0 -30px 100% -30px)" }}
      animate={{ clipPath: "inset(0 -30px -30px -30px)" }}
      transition={{ duration: 1.1, ease: EASE }}
      className="drop-shadow-[0_8px_0_var(--color-ink)] lg:sticky lg:top-28"
    >
      <div style={notchMask} className="bg-white px-6 pb-12 pt-7 font-mono">
        {children}
      </div>
    </motion.aside>
  );
};

const CartView = () => {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const [demoNotice, setDemoNotice] = useState(false);

  if (!hasHydrated) return <CartSkeleton />;

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] bg-linear-to-br from-white to-mist px-6 py-16 text-center">
        <p className="text-2xl font-extrabold">Your cart is empty.</p>
        <p className="mt-2 text-ink/80">Add something from the shelves and it will show up here.</p>
        <Button href="/category/all?offer=true" variant="sticker" className="mt-6">
          Browse offers
        </Button>
      </div>
    );
  }

  const total = getCartTotal(items);
  const count = getCartCount(items);
  const whatsappUrl = getWhatsAppUrl(buildOrderMessage(items, total));

  // TODO: replace with a POST to the orders endpoint once the backend exists.
  const handleCheckout = () => setDemoNotice(true);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
      <ul className="space-y-3">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex flex-col gap-4 rounded-3xl bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-mono text-xs text-ink/70">{item.brand}</p>
                <Link
                  href={`/product/${item.slug}`}
                  className="font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
                >
                  {item.name}
                </Link>
                {item.variant && <p className="text-sm text-ink/70">{item.variant}</p>}
                <p className="mt-1 font-mono text-sm text-ink/70">{formatPrice(item.price)} each</p>
              </div>
              <div className="flex items-center gap-4">
                <QuantityStepper
                  value={item.quantity}
                  onChange={(next) => setQuantity(item.id, next)}
                  label={`Quantity for ${item.name}`}
                />
                <p className="w-28 text-right font-mono font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeItem(item.id)}
                  className="grid size-11 place-items-center hover:text-sale focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <Trash2 className="size-5" aria-hidden="true" />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <Receipt>
        <h2 className="text-center text-xl font-semibold uppercase tracking-tight">Order summary</h2>
        <p className="mt-1 border-b-2 border-dashed border-ink/40 pb-4 text-center text-xs text-ink/70">
          Apple Gadgets
        </p>
        <p className="mt-4 flex justify-between text-ink/80">
          <span>Items</span>
          <span>{count}</span>
        </p>
        <p className="mt-3 flex items-baseline justify-between border-t-2 border-dashed border-ink/40 pt-4 text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </p>
        <p className="mt-2 text-sm text-ink/70">Delivery is worked out when the order is confirmed.</p>

        <div className="mt-5">
          <EmiEstimator price={total} />
        </div>

        <Button href={whatsappUrl} variant="sticker" className="mt-6 w-full">
          <FaWhatsapp className="size-4" aria-hidden="true" />
          Order on WhatsApp
        </Button>
        <Button variant="primary" onClick={handleCheckout} className="mt-3 w-full">
          Proceed to checkout
        </Button>
        <Button variant="outline" onClick={clear} className="mt-3 w-full">
          Clear cart
        </Button>
        {demoNotice && (
          <p
            role="status"
            className="mt-4 rounded-2xl border-2 border-dashed border-ink bg-sticker/40 p-3 text-sm font-medium"
          >
            Demo mode: online checkout isn&apos;t connected to an orders API yet, so nothing was
            submitted. Use &ldquo;Order on WhatsApp&rdquo; to place this order for real.
          </p>
        )}
      </Receipt>
    </div>
  );
};

export default CartView;
