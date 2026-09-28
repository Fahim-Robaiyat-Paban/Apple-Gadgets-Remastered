"use client";
import { motion } from "motion/react";
import { notchedBottom } from "@/lib/utils/shapes";
import { EASE } from "@/lib/utils/motion";

// The header band for every inner page: brand gradient, a perforated bottom edge, and an
// icon that gets "stamped" onto the page once. Same family as the home hero.
const PageBanner = ({ title, icon, children }) => (
  <section
    style={notchedBottom}
    className="relative overflow-hidden bg-linear-to-br from-deep via-brand to-brand text-paper"
  >
    <span
      aria-hidden="true"
      className="absolute -right-24 -top-24 size-80 rounded-full border-[3px] border-sticker/30"
    />
    <span
      aria-hidden="true"
      className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-deep/50"
    />
    <div className="site-container relative flex items-center justify-between gap-6 px-5 pb-16 pt-10 sm:px-8 lg:px-16 lg:pb-20 lg:pt-14">
      <div className="min-w-0">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight sm:text-6xl">{title}</h1>
        {children}
      </div>
      {icon && (
        <motion.div
          aria-hidden="true"
          initial={{ scale: 2.4, rotate: -24, opacity: 0 }}
          animate={{ scale: 1, rotate: -8, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.25 }}
          className="hidden size-28 shrink-0 place-items-center rounded-full bg-sticker text-ink shadow-[0_0_0_6px_var(--color-ink)] sm:grid"
        >
          {icon}
        </motion.div>
      )}
    </div>
  </section>
);

export default PageBanner;
