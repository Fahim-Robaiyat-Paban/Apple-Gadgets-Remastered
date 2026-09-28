"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { CreditCard, Repeat, Truck, Wrench } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Button from "@/components/ui/Button";
import QuantityStepper from "@/components/ui/QuantityStepper";
import AddToCartButton from "@/components/product/AddToCartButton";
import EmiEstimator from "@/components/product/EmiEstimator";
import PriceTag from "@/components/product/PriceTag";
import ProductImage from "@/components/product/ProductImage";
import { getCategoryTone } from "@/lib/data/tones";
import { formatPrice } from "@/lib/utils/formatters";
import { getDiscount } from "@/lib/utils/pricing";
import { getWhatsAppUrl } from "@/lib/utils/whatsapp";
import { SITE_URL } from "@/lib/utils/site";
import { EASE } from "@/lib/utils/motion";

const perks = [
  { id: "emi", label: "EMI available up to 36 months", Icon: CreditCard },
  { id: "delivery", label: "Fastest home delivery", Icon: Truck },
  { id: "exchange", label: "Exchange facility", Icon: Repeat },
  { id: "service", label: "After-sales service", Icon: Wrench },
];

// Colour gallery: the main photo cross-fades when the colour changes, and each thumbnail is a colour.
const Gallery = ({ product, colors, colorIndex, onSelect }) => {
  if (colors.length === 0) return <ProductImage product={product} priority />;

  const active = colors[colorIndex];

  return (
    <div>
      <div
        className={`relative aspect-square overflow-hidden rounded-[2.5rem] bg-linear-to-br ${getCategoryTone(product.category).well}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <Image
              src={active.image}
              alt={`${product.name} in ${active.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <ul className="mt-3 grid grid-cols-6 gap-2">
        {colors.map((color, index) => (
          <li key={color.id}>
            <button
              type="button"
              aria-label={`Show ${color.name}`}
              aria-pressed={index === colorIndex}
              onClick={() => onSelect(index)}
              className={`relative block aspect-square w-full overflow-hidden rounded-2xl border-2 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                index === colorIndex ? "border-ink" : "border-ink/20 hover:border-ink"
              }`}
            >
              <Image src={color.image} alt="" fill sizes="96px" className="object-contain p-1.5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductBuySection = ({ product, details }) => {
  const colors = details?.colors ?? [];
  const [colorIndex, setColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const discount = getDiscount(product);
  const variant = colors[colorIndex]?.name ?? null;
  const whatsappUrl = getWhatsAppUrl(
    `I want to know more about ${product.name}\nURL: ${SITE_URL}/product/${product.slug}`,
  );

  return (
    <>
      <div className="mt-4 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Gallery product={product} colors={colors} colorIndex={colorIndex} onSelect={setColorIndex} />

        <div>
          <p className="font-mono text-sm text-ink/70">{product.brand}</p>
          <h1 className="mt-1 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {product.name}
          </h1>

          <motion.div
            initial={{ y: -70, rotate: -10 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 8, delay: 0.2 }}
            style={{ transformOrigin: "0% 0%" }}
            className="mt-6 w-fit"
          >
            <PriceTag price={product.price} size="lg" />
            {discount > 0 && (
              <p className="mt-3 flex flex-wrap items-baseline gap-x-4 font-mono">
                <s className="text-ink/60">{formatPrice(product.regularPrice)}</s>
                <span className="font-semibold text-sale">{formatPrice(discount)} OFF</span>
              </p>
            )}
          </motion.div>

          {!product.preorder && (
            <div className="mt-6">
              <EmiEstimator price={product.price * quantity} />
            </div>
          )}

          {colors.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold">Colour: {variant}</p>
              <div role="group" aria-label="Colour" className="flex flex-wrap gap-2">
                {colors.map((color, index) => (
                  <button
                    key={color.id}
                    type="button"
                    aria-pressed={index === colorIndex}
                    onClick={() => setColorIndex(index)}
                    className={`min-h-11 rounded-full border-2 border-ink px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                      index === colorIndex ? "bg-ink text-paper" : "hover:bg-sticker"
                    }`}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold">Quantity</p>
            <QuantityStepper value={quantity} onChange={setQuantity} label={`Quantity for ${product.name}`} />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <AddToCartButton product={product} variant={variant} quantity={quantity} buyNow className="sm:min-w-44" />
            <AddToCartButton product={product} variant={variant} quantity={quantity} className="sm:min-w-44" />
            <Button href={whatsappUrl} variant="outline">
              <FaWhatsapp className="size-4" aria-hidden="true" />
              Ask on WhatsApp
            </Button>
          </div>

          <ul className="mt-10 rounded-3xl bg-white px-5 py-2">
            {perks.map(({ id, label, Icon }) => (
              <li key={id} className="flex items-center gap-3 border-b border-dashed border-ink/25 py-3 last:border-b-0">
                <Icon className="size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile buy bar: sticks to the bottom while this section is on screen, then rests at its end. */}
      <div className="sticky bottom-0 z-30 -mx-5 mt-8 flex items-center gap-3 rounded-t-3xl border-t-2 border-ink bg-paper px-5 py-3 sm:-mx-8 sm:px-8 lg:hidden">
        <p className="font-mono text-lg font-semibold">{formatPrice(product.price * quantity)}</p>
        <AddToCartButton product={product} variant={variant} quantity={quantity} className="flex-1" />
      </div>
    </>
  );
};

export default ProductBuySection;
