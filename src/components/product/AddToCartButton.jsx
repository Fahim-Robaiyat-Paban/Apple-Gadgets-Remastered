"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShoppingBag, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/useCartStore";

// `variant` (e.g. a colour) makes the same product in another variant a separate cart line.
// `buyNow` adds to the cart and goes straight to /cart.
const AddToCartButton = ({ product, variant = null, quantity = 1, buyNow = false, className = "" }) => {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(timer);
  }, [added]);

  // Instant, local feedback: the store updates synchronously and the badge bumps.
  const handleAdd = () => {
    addItem(
      {
        id: variant ? `${product.id}:${variant}` : product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        price: product.price,
        variant,
      },
      quantity,
    );
    if (buyNow) {
      router.push("/cart");
    } else {
      setAdded(true);
    }
  };

  const Icon = buyNow ? Zap : added ? Check : ShoppingBag;
  const label = buyNow
    ? "Buy now"
    : added
      ? "Added"
      : product.preorder
        ? "Pre-order"
        : "Add to cart";

  return (
    <>
      <Button
        variant={buyNow || added ? "primary" : "sticker"}
        onClick={handleAdd}
        className={className}
      >
        <Icon className="size-4" aria-hidden="true" />
        {label}
      </Button>
      {!buyNow && (
        <p className="sr-only" role="status" aria-live="polite">
          {added ? `${product.name} added to cart` : ""}
        </p>
      )}
    </>
  );
};

export default AddToCartButton;
