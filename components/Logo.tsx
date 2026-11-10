import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/gym";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="#top"
      aria-label={`${brand.name} — back to top`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="relative block h-9 w-9 shrink-0 overflow-hidden bg-black">
        <Image
          src="/images/brand-mark.webp"
          alt=""
          fill
          sizes="36px"
          className="object-cover transition-opacity duration-300 group-hover:opacity-85"
        />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[19px] uppercase leading-none tracking-[0.015em] text-text">
          {brand.wordmark.join(" ")}
        </span>
        <span className="mt-1 block font-label text-[8px] uppercase tracking-[0.28em] text-muted">
          Mulund East · Mumbai
        </span>
      </span>
    </Link>
  );
}
