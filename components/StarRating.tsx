import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  value: number;
  className?: string;
  starClassName?: string;
  label?: string;
};

export default function StarRating({
  value,
  className,
  starClassName,
  label,
}: StarRatingProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={label ?? `${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn("h-3.5 w-3.5 fill-gold text-gold", starClassName)}
        />
      ))}
    </span>
  );
}
