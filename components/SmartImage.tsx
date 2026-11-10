"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
};

/**
 * Renders a local photograph and degrades to a quiet branded placeholder
 * if the file is missing, instead of a fake illustration.
 */
export default function SmartImage({
  src,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  priority = false,
  quality = 80,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-elevated", className)}>
      {!failed ? (
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
        <div className="absolute inset-0 grid place-items-center bg-elevated">
          <span className="font-label text-[10px] uppercase tracking-[0.24em] text-muted/60">
            Iron Temple Gym
          </span>
        </div>
      )}
    </div>
  );
}
