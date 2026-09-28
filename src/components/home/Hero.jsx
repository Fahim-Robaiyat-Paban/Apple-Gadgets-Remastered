"use client";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import Button from "@/components/ui/Button";
import { EASE } from "@/lib/utils/motion";
import { formatPrice } from "@/lib/utils/formatters";
import { getDiscount } from "@/lib/utils/pricing";
import { notchedBottom } from "@/lib/utils/shapes";

const headlineLines = ["Genuine gadgets,", "up to 36 months EMI."];

// The hero's one orchestrated moment: headline lines rise out of a mask, a price tag drops in
// on its string, settles into a slow sway and can be dragged sideways, then a "genuine" stamp
// thumps down beside it.
const HangingTag = ({ product }) => {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-160, 160], [-14, 14]);
  const discount = getDiscount(product);

  return (
    <div className="relative mx-auto w-fit">
      <motion.div
        initial={reduceMotion ? false : { y: -420 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 55, damping: 9, delay: 0.6 }}
      >
        <motion.div
          style={{ transformOrigin: "50% 0%" }}
          animate={reduceMotion ? undefined : { rotate: [-2.5, 2.5] }}
          transition={{
            duration: 3.2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1.6,
          }}
        >
          <span aria-hidden="true" className="relative z-10 mx-auto -mb-5 block h-28 w-0.5 bg-paper" />
          <motion.div
            drag="x"
            dragSnapToOrigin
            dragElastic={0.4}
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x, rotate, transformOrigin: "50% 0%" }}
            className="relative w-72 cursor-grab bg-linear-to-br from-sticker to-amber-300 p-7 pt-12 text-ink active:cursor-grabbing sm:w-80 [clip-path:polygon(0_20px,20px_0,calc(100%_-_20px)_0,100%_20px,100%_100%,0_100%)]"
          >
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-4 size-4 -translate-x-1/2 rounded-full bg-brand ring-2 ring-ink"
            />
            {product.image && (
              <div className="relative mb-4 h-44 w-full">
                <Image src={product.image} alt="" fill priority sizes="320px" className="object-contain" />
              </div>
            )}
            <p className="text-2xl font-extrabold leading-tight">{product.name}</p>
            <p className="mt-5 font-mono text-4xl font-semibold">{formatPrice(product.price)}</p>
            {product.regularPrice && (
              <s className="mt-1 block font-mono text-sm text-ink/70">{formatPrice(product.regularPrice)}</s>
            )}
            {discount > 0 && (
              <p className="mt-3 inline-block rounded-full bg-ink px-3 py-1 font-mono text-sm font-semibold text-sticker">
                {formatPrice(discount)} OFF
              </p>
            )}
            <Button href={`/product/${product.slug}`} className="mt-6 w-full">
              View product
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.p
        aria-hidden="true"
        initial={reduceMotion ? false : { scale: 3, rotate: 30, opacity: 0 }}
        animate={{ scale: 1, rotate: 14, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 15, delay: 1.9 }}
        className="absolute -right-6 bottom-24 grid size-24 place-items-center rounded-full bg-sale text-center font-mono text-xs font-semibold uppercase leading-tight text-white shadow-[0_0_0_4px_var(--color-paper)] sm:-right-10 sm:size-28"
      >
        100%
        <br />
        genuine
      </motion.p>
    </div>
  );
};

const Hero = ({ product }) => (
  <section
    style={notchedBottom}
    className="relative overflow-hidden bg-linear-to-br from-deep via-brand to-brand text-paper"
  >
    <span aria-hidden="true" className="absolute -right-40 top-10 size-[38rem] rounded-full bg-deep/50" />
    <span
      aria-hidden="true"
      className="absolute -right-16 -top-20 size-[26rem] rounded-full border-[3px] border-sticker/40"
    />
    <span aria-hidden="true" className="absolute -bottom-24 -left-24 size-72 rounded-full bg-sticker/15" />
    <div className="site-container relative grid items-center gap-12 px-5 pb-24 pt-12 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:px-16 lg:pb-32 lg:pt-20">
      <div>
        <h1 className="text-[clamp(2.5rem,5vw+1rem,5.5rem)] font-extrabold leading-[0.95] tracking-tight">
          {headlineLines.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-2">
              <motion.span
                className={`block ${index === 1 ? "text-sticker" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 + index * 0.15 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="mt-6 max-w-xl text-lg text-paper/85"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          iPhones, MacBooks, Samsung, Nothing and home appliances, with exchange, fast home
          delivery and after-sales service.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <Button href="/category/all?preorder=true" variant="sticker">
            Shop Apple pre-orders
          </Button>
          <Button href="/category/all?offer=true" variant="light">
            See offers
          </Button>
        </motion.div>
      </div>
      <div className="min-h-[430px]">
        <HangingTag product={product} />
      </div>
    </div>
  </section>
);

export default Hero;
