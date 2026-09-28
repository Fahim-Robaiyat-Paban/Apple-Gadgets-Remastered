"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { EASE } from "@/lib/utils/motion";

// The title rises out of a mask and a yellow-to-orange bar draws under it.
// `inverted` switches the text and link to their light versions for dark bands.
const SectionHeading = ({ title, href, linkLabel = "See all", inverted = false }) => (
  <div className="mb-8 flex items-end justify-between gap-6">
    <div>
      <h2
        className={`overflow-hidden pb-1 text-3xl font-extrabold tracking-tight sm:text-4xl ${
          inverted ? "text-paper" : "text-ink"
        }`}
      >
        <motion.span
          className="block"
          initial={{ y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {title}
        </motion.span>
      </h2>
      <motion.span
        aria-hidden="true"
        className="mt-2 block h-1.5 w-20 origin-left bg-linear-to-r from-sticker to-glow"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
      />
    </div>
    {href && (
      <Link
        href={href}
        aria-label={`${linkLabel}: ${title}`}
        className={`inline-flex min-h-11 shrink-0 items-center py-2 pl-7 pr-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [clip-path:polygon(12px_0,100%_0,100%_100%,12px_100%,0_50%)] ${
          inverted ? "bg-sticker text-ink hover:bg-white" : "bg-ink text-paper hover:bg-brand"
        }`}
      >
        {linkLabel}
      </Link>
    )}
  </div>
);

export default SectionHeading;
