"use client";
import { motion } from "motion/react";
import { EASE } from "@/lib/utils/motion";

// A template remounts on every navigation, which gives each route change an entrance.
// Opacity starts above zero so the server-rendered page is never blank before hydration.
const Template = ({ children }) => (
  <motion.div
    initial={{ opacity: 0.35, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: EASE }}
  >
    {children}
  </motion.div>
);

export default Template;
