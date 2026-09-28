"use client";
import { motion } from "motion/react";
import { EASE } from "@/lib/utils/motion";

const Reveal = ({ children, className = "", delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.6, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

export default Reveal;
