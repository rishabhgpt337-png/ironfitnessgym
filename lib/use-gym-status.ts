"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type GymStatus } from "@/lib/hours";

/**
 * Returns the live gym status, recomputed every 30 seconds.
 * Starts as null so server and client markup match on first paint.
 */
export function useGymStatus(): GymStatus | null {
  const [status, setStatus] = useState<GymStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return status;
}
