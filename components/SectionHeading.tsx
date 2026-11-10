import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  heading: string;
  accent: string;
  intro?: string;
  aside?: ReactNode;
  className?: string;
};

export default function SectionHeading({
  index,
  eyebrow,
  heading,
  accent,
  intro,
  aside,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("grid gap-8 border-t border-border pt-5 md:grid-cols-12 md:gap-10", className)}>
      <div className="md:col-span-8">
        <p className="index-label flex items-center gap-3">
          {index ? <span className="text-accent">{index}</span> : null}
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          <span>{eyebrow}</span>
        </p>
        <h2 className="display mt-5">
          <span className="block">{heading}</span>
          <span className="block text-accent">{accent}</span>
        </h2>
        {intro ? (
          <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-muted">{intro}</p>
        ) : null}
      </div>
      {aside ? <div className="md:col-span-4 md:self-end md:justify-self-end">{aside}</div> : null}
    </header>
  );
}
