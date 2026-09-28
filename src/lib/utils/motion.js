export const EASE = [0.65, 0, 0.35, 1]; // matches --ease-brand in globals.css

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

// Grid cells "stamp" in: quick scale-up rather than the usual fade-and-slide.
export const stampItem = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};
