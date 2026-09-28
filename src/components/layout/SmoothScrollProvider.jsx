"use client";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

const SmoothScrollProvider = ({ children }) => <ReactLenis root>{children}</ReactLenis>;

export default SmoothScrollProvider;
