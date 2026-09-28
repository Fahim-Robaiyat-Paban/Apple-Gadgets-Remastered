"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import { EASE } from "@/lib/utils/motion";

const FOCUSABLE =
  "a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";

const Drawer = ({ open, onClose, title, children }) => {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const lenis = useLenis();

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll lock (Lenis), Escape to close, focus trap and focus restore while open.
  useEffect(() => {
    if (!open) return undefined;

    lenis?.stop();
    const previouslyFocused = document.activeElement;
    const focusFrame = requestAnimationFrame(() => {
      panelRef.current?.querySelector(FOCUSABLE)?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(FOCUSABLE);
      if (focusable.length === 0) return;
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      lenis?.start();
      previouslyFocused?.focus?.();
    };
  }, [open, lenis]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="drawer"
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-ink/50" onClick={onClose} aria-hidden="true" />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="absolute right-0 top-0 flex h-full w-[min(360px,88vw)] flex-col border-l-4 border-sticker bg-paper"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-ink/15 bg-linear-to-r from-deep to-brand px-5 py-3 text-paper">
              <p className="text-lg font-bold">{title}</p>
              <button
                type="button"
                onClick={onClose}
                aria-label={`Close ${title.toLowerCase()}`}
                className="grid size-11 place-items-center focus-visible:outline-2 focus-visible:outline-brand"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>
            <div data-lenis-prevent className="flex-1 overflow-y-auto px-5 py-6">
              {children}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Drawer;
