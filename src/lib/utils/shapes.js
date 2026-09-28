// The store's signature shape is the retail tag: chamfered corners, punched holes and a
// perforated tear edge. These helpers keep that one idea consistent across every page.

const NOTCH = 9;
const PITCH = 30;

const bites = `radial-gradient(circle at 50% 100%, transparent ${NOTCH - 0.5}px, #000 ${NOTCH}px)`;
const body = "linear-gradient(#000, #000)";

// Mask only: a row of half-circle bites along the bottom edge, like a ticket perforation.
export const notchMask = {
  WebkitMaskImage: `${bites}, ${body}`,
  maskImage: `${bites}, ${body}`,
  WebkitMaskSize: `${PITCH}px ${NOTCH}px, 100% calc(100% - ${NOTCH}px)`,
  maskSize: `${PITCH}px ${NOTCH}px, 100% calc(100% - ${NOTCH}px)`,
  WebkitMaskPosition: "left bottom, left top",
  maskPosition: "left bottom, left top",
  WebkitMaskRepeat: "repeat-x, no-repeat",
  maskRepeat: "repeat-x, no-repeat",
};

// For a full-width band: the bites also overlap the next section so it shows through them.
export const notchedBottom = {
  ...notchMask,
  position: "relative",
  zIndex: 1,
  marginBottom: -NOTCH,
};

// Tailwind class strings for the tag chamfers (written out in full so Tailwind can see them).
export const chamferTopRight = "[clip-path:polygon(0_0,calc(100%_-_22px)_0,100%_22px,100%_100%,0_100%)]";
export const chamferBottomLeft = "[clip-path:polygon(0_0,100%_0,100%_100%,22px_100%,0_calc(100%_-_22px))]";
