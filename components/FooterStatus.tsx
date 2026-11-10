"use client";

import { copy } from "@/data/gym";
import { useGymStatus } from "@/lib/use-gym-status";
import { cn } from "@/lib/utils";

/** Live open/closed state for the footer, rendered after hydration only. */
export default function FooterStatus() {
  const status = useGymStatus();

  return (
    <div className="mt-3 flex items-start gap-3">
      <span
        aria-hidden="true"
        className={cn(
          "mt-2 h-2 w-2 shrink-0 rounded-full",
          status?.isOpen ? "bg-[#5EDC8E]" : status ? "bg-[#FF6B57]" : "bg-muted",
        )}
      />
      <div>
        <p className="font-display text-2xl uppercase leading-none tracking-wide text-text">
          {status ? (status.isOpen ? copy.hero.openLabel : copy.hero.closedLabel) : copy.hero.checkingLabel}
        </p>
        <p className="mt-1.5 font-label text-[10px] uppercase tracking-[0.16em] text-muted">
          {status?.message ?? "Asia/Kolkata · IST"}
        </p>
      </div>
    </div>
  );
}
