import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { brand } from "@/data/gym";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="#top"
      aria-label={`${brand.name} — back to top`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sharp border border-accent/40 bg-accent/10 text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
        <Dumbbell className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[20px] uppercase tracking-[0.02em] text-text">
          {brand.wordmark.join(" ")}
        </span>
        <span className="mt-1 block font-label text-[9px] uppercase tracking-[0.34em] text-muted">
          Gym · {brand.city}
        </span>
      </span>
    </Link>
  );
}
