"use client";
import Link from "next/link";
import { motion } from "motion/react";
import ProductImage from "@/components/product/ProductImage";
import PriceTag from "@/components/product/PriceTag";
import AddToCartButton from "@/components/product/AddToCartButton";
import { formatPrice } from "@/lib/utils/formatters";
import { getDiscount } from "@/lib/utils/pricing";

const ProductCard = ({ product }) => {
  const discount = getDiscount(product);

  return (
    <motion.article
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="flex h-full flex-col p-3 sm:p-4"
    >
      <Link
        href={`/product/${product.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <ProductImage product={product} />
        <h3 className="mt-4 line-clamp-2 min-h-11 text-sm font-medium leading-snug sm:text-base">
          {product.name}
        </h3>
      </Link>
      <div className="mt-auto min-h-[4.5rem] pt-4">
        <PriceTag price={product.price} />
        {discount > 0 && (
          <p className="mt-2 flex flex-wrap items-baseline gap-x-3 font-mono text-xs">
            <s className="text-ink/60">{formatPrice(product.regularPrice)}</s>
            <span className="rounded-full bg-sale px-2 py-0.5 font-semibold text-white">{formatPrice(discount)} OFF</span>
          </p>
        )}
      </div>
      <AddToCartButton product={product} className="mt-4 w-full" />
    </motion.article>
  );
};

export default ProductCard;
