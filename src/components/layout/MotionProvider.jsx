"use client";
import { MotionConfig } from "motion/react";

// Respects the OS "reduce motion" setting for every Motion animation in the app.
const MotionProvider = ({ children }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export default MotionProvider;
