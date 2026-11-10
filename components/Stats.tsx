"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/data/gym";

function formatValue(value: number, decimals: number): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function Counter({
  value,
  decimals,
  play,
}: {
  value: number;
  decimals: number;
  play: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!play) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1500;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play, value, reduceMotion]);

  return <>{formatValue(reduceMotion && play ? value : display, decimals)}</>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section aria-label="Gym at a glance" className="border-b border-border/70 bg-bg">
      <div ref={ref} className="container-edge">
        <div className="grid grid-cols-2 divide-x divide-border/60 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-4 py-8 sm:px-7 sm:py-10 ${
                index < 2 ? "border-b border-border/60 md:border-b-0" : ""
              }`}
            >
              <p className="font-label text-[10px] uppercase tracking-[0.24em] text-muted">
                {stat.label}
              </p>
              <p className="mt-3 font-display text-4xl leading-none text-text sm:text-5xl">
                <span aria-hidden="true">
                  <Counter value={stat.value} decimals={stat.decimals} play={inView} />
                  <span className="text-accent">{stat.suffix}</span>
                </span>
                <span className="sr-only">
                  {formatValue(stat.value, stat.decimals)}
                  {stat.suffix}
                </span>
              </p>
              <p className="mt-2.5 text-[11px] lowercase tracking-wide text-muted/80 first-letter:uppercase">
                {stat.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
