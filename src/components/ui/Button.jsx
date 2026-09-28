"use client";
import Link from "next/link";
import { motion } from "motion/react";

const MotionLink = motion.create(Link);

const isExternal = (href) => href?.startsWith("http");

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-ink text-paper hover:bg-brand",
  sticker: "bg-sticker text-ink hover:bg-ink hover:text-sticker",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
  light: "border-2 border-paper/70 text-paper hover:bg-paper hover:text-ink",
};

const Button = ({ href, variant = "primary", className = "", children, ...rest }) => {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (isExternal(href)) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        whileTap={{ scale: 0.96 }}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  if (href) {
    return (
      <MotionLink href={href} className={classes} whileTap={{ scale: 0.96 }} {...rest}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button type="button" className={classes} whileTap={{ scale: 0.96 }} {...rest}>
      {children}
    </motion.button>
  );
};

export default Button;
