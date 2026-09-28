"use client";
import { motion } from "motion/react";
import ProductCard from "@/components/product/ProductCard";
import TiltCard from "@/components/ui/TiltCard";
import { staggerContainer, stampItem } from "@/lib/utils/motion";

// White cards with a chamfered top-right corner, echoing the price sticker.
// `reveal={false}` (used for filtered listings) skips the scroll-in so results are visible immediately.
const ProductGrid = ({ products, reveal = true }) => (
  <motion.ul
    variants={staggerContainer}
    initial={reveal ? "hidden" : "show"}
    whileInView="show"
    viewport={{ once: true, amount: 0.1 }}
    className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4"
  >
    {products.map((product) => (
      <motion.li key={product.id} variants={stampItem}>
        <TiltCard
          max={5}
          className="bg-white [clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_100%,0_100%)]"
        >
          <ProductCard product={product} />
        </TiltCard>
      </motion.li>
    ))}
  </motion.ul>
);

export default ProductGrid;
