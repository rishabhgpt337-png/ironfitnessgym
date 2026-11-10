"use client";

import Image from "next/image";
import { useState } from "react";
import { Circle, Dumbbell, User, Waves, Weight } from "lucide-react";
import { cn } from "@/lib/utils";

export type FallbackVariant =
  | "dumbbell"
  | "kettlebell"
  | "barbell"
  | "plates"
  | "rope"
  | "portrait"
  | "hero";

const icons = {
  dumbbell: Dumbbell,
  kettlebell: Weight,
  barbell: Dumbbell,
  plates: Circle,
  rope: Waves,
  portrait: User,
  hero: Dumbbell,
};

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  variant?: FallbackVariant;
  quality?: number;
};

/**
 * Renders the real photo from /public/images when it exists, otherwise a
 * designed industrial fallback. Drop a real file at the same path to swap it in.
 */
export default function SmartImage({
  src,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  priority = false,
  variant = "dumbbell",
  quality = 82,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      {!showFallback ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={cn("object-cover", imageClassName)}
          onError={() => setFailed(true)}
        />
      ) : (
        <FallbackArt alt={alt} variant={variant} />
      )}
    </div>
  );
}

function FallbackArt({ alt, variant }: { alt: string; variant: FallbackVariant }) {
  const Icon = icons[variant];
  const isPortrait = variant === "portrait";
  const isHero = variant === "hero";

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "absolute inset-0 overflow-hidden steel-texture",
        isHero && "bg-[radial-gradient(ellipse_at_60%_35%,rgba(255,77,0,0.22),transparent_55%)]",
      )}
    >
      <div className="absolute inset-0 bg-steel-lines opacity-70" />
      <div
        className={cn(
          "absolute inset-0",
          isPortrait
            ? "bg-[radial-gradient(ellipse_at_50%_28%,rgba(255,255,255,0.13),transparent_52%)]"
            : "bg-[radial-gradient(ellipse_at_65%_25%,rgba(255,77,0,0.16),transparent_58%)]",
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />

      <Icon
        aria-hidden="true"
        strokeWidth={isPortrait ? 0.55 : 0.8}
        className={cn(
          "absolute text-white/[0.06]",
          isPortrait
            ? "-bottom-10 left-1/2 h-[78%] w-[78%] -translate-x-1/2"
            : "-bottom-[12%] -right-[6%] h-[78%] w-[78%] rotate-[-12deg]",
          isHero && "-bottom-[18%] -right-[4%] h-[95%] w-[95%] rotate-[-18deg]",
        )}
      />

      <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-7 sm:top-7">
        <span className="block h-px w-8 bg-accent" />
        <span className="font-label text-[9px] uppercase tracking-[0.32em] text-white/45">
          Iron Temple
        </span>
      </div>

      <div className="absolute bottom-5 right-5 h-6 w-6 border-b border-r border-white/20 sm:bottom-7 sm:right-7" />
      <div className="absolute left-5 top-14 h-6 w-6 border-l border-t border-accent/40 sm:left-7" />

      <div className="noise-overlay" />
    </div>
  );
}
