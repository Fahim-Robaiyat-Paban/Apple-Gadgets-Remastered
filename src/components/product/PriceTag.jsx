"use client";
import { motion } from "motion/react";
import { formatPrice } from "@/lib/utils/formatters";

// Price sticker: chamfered left edge with a punched hole, the site's signature shape.
// When rendered inside a motion parent using the "rest" / "hover" variants, it tilts on hover.
const sizes = {
  md: {
    tag: "py-1.5 pl-7 pr-3 text-base [clip-path:polygon(14px_0,100%_0,100%_100%,14px_100%,0_50%)]",
    hole: "left-2.5 size-1.5",
  },
  lg: {
    tag: "py-3 pl-12 pr-6 text-3xl [clip-path:polygon(24px_0,100%_0,100%_100%,24px_100%,0_50%)]",
    hole: "left-4 size-2.5",
  },
};

const tagVariants = { rest: { rotate: 0 }, hover: { rotate: -4 } };

const PriceTag = ({ price, size = "md" }) => (
  <motion.div
    variants={tagVariants}
    style={{ transformOrigin: "0% 50%" }}
    className={`relative inline-flex items-center bg-linear-to-r from-sticker to-glow font-mono font-semibold text-ink ${sizes[size].tag}`}
  >
    <span
      aria-hidden="true"
      className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-paper ring-1 ring-ink/40 ${sizes[size].hole}`}
    />
    {formatPrice(price)}
  </motion.div>
);

export default PriceTag;
