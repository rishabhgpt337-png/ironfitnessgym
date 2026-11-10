import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  accent: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  heading,
  accent,
  intro,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto flex flex-col items-center text-center",
        className,
      )}
    >
      <p className="eyebrow eyebrow-line">{eyebrow}</p>
      <h2 className="display-title mt-4 text-balance">
        {heading} <span className="text-accent">{accent}</span>
      </h2>
      {intro ? (
        <p className="mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
