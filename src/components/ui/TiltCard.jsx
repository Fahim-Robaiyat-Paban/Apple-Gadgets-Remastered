"use client";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

// Tilts toward the pointer in 3D and slides a light across its face.
// `className` goes on the moving face, so shapes like clip-path stay attached to it.
const TiltCard = ({ children, className = "", max = 6 }) => {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 200, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 18 });
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const shineOpacity = useSpring(0, { stiffness: 200, damping: 25 });
  const shine = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.55), transparent 60%)`;

  if (reduceMotion) {
    return <div className={`h-full ${className}`}>{children}</div>;
  }

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 2 * max);
    rotateX.set(-(py - 0.5) * 2 * max);
    shineX.set(px * 100);
    shineY.set(py * 100);
    shineOpacity.set(1);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    shineOpacity.set(0);
  };

  return (
    <div
      className="h-full [perspective:800px]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div style={{ rotateX, rotateY }} className={`relative h-full ${className}`}>
        {children}
        <motion.div
          aria-hidden="true"
          style={{ background: shine, opacity: shineOpacity }}
          className="pointer-events-none absolute inset-0"
        />
      </motion.div>
    </div>
  );
};

export default TiltCard;
