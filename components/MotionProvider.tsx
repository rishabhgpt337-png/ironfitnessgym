"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Lets Framer Motion honour the visitor's reduced-motion preference at runtime.
 * Doing this here keeps server and client markup identical, because components
 * no longer branch on `useReducedMotion()` during render.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
