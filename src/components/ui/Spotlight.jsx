"use client";
import { useRef } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { notchedBottom } from "@/lib/utils/shapes";

// A section whose gradient reacts to the visitor: a soft light follows the pointer, and the
// background gradient slides slowly as the section scrolls through the viewport.
// With reduced motion it is just a plain section.
const Spotlight = ({ className = "", glow = "rgba(255,255,255,0.65)", drift = true, notch = false, children }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowOpacity = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 20 });
  const light = useMotionTemplate`radial-gradient(520px circle at ${smoothX}px ${smoothY}px, ${glow}, transparent 70%)`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const positionY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") return;
    const rect = ref.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  if (reduceMotion) {
    return (
      <section style={notch ? notchedBottom : undefined} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => animate(glowOpacity, 1, { duration: 0.3 })}
      onPointerLeave={() => animate(glowOpacity, 0, { duration: 0.5 })}
      style={{
        ...(notch ? notchedBottom : {}),
        ...(drift ? { backgroundSize: "100% 200%", backgroundPositionY: positionY } : {}),
      }}
      className={`relative ${className}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background: light, opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0"
      />
      <div className="relative">{children}</div>
    </motion.section>
  );
};

export default Spotlight;
