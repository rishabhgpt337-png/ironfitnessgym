"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import StarRating from "@/components/StarRating";
import { contact, copy, rating, testimonials } from "@/data/gym";
import { cn, focusRing } from "@/lib/utils";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);
  const active = testimonials[index];

  const goTo = (nextIndex: number, dir: number) => {
    setDirection(dir);
    setIndex((nextIndex + testimonials.length) % testimonials.length);
  };

  const next = () => goTo(index + 1, 1);
  const previous = () => goTo(index - 1, -1);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setTimeout(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % testimonials.length);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [index, paused, reduceMotion]);

  const variants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
        center: { opacity: 1, x: 0 },
        exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
      };

  return (
    <section
      id="testimonials"
      className="section-pad border-b border-border/70 bg-surface/30"
      aria-roledescription="carousel"
      aria-label="Member testimonials"
    >
      <div className="container-edge">
        <Reveal>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={copy.sections.testimonials.eyebrow}
              heading={copy.sections.testimonials.heading}
              accent={copy.sections.testimonials.accent}
              intro={copy.sections.testimonials.intro}
            />

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={previous}
                aria-label="Previous testimonial"
                className={cn(
                  focusRing,
                  "grid h-10 w-10 place-items-center rounded-sharp border border-border text-text transition-colors hover:border-accent hover:text-accent",
                )}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={paused ? copy.testimonials.playLabel : copy.testimonials.pauseLabel}
                className={cn(
                  focusRing,
                  "grid h-10 w-10 place-items-center rounded-sharp border border-border text-text transition-colors hover:border-accent hover:text-accent",
                )}
              >
                {paused ? (
                  <Play className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className={cn(
                  focusRing,
                  "grid h-10 w-10 place-items-center rounded-sharp border border-border text-text transition-colors hover:border-accent hover:text-accent",
                )}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="mt-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
              if (Math.abs(delta) > 48) {
                if (delta < 0) next();
                else previous();
              }
              touchStartX.current = null;
            }}
          >
            <div className="relative overflow-hidden rounded-card border border-border bg-bg/70">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-10 font-display text-[220px] leading-none text-white/[0.03] sm:text-[300px]"
              >
                &rdquo;
              </span>

              <div aria-live="polite" className="sr-only">
                Review {index + 1} of {testimonials.length}
              </div>

              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.figure
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: resolveDuration(reduceMotion), ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid gap-7 p-6 sm:p-9 md:grid-cols-[180px_1fr] md:gap-10 md:p-10"
                >
                  <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-0">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-sharp border border-accent/30 bg-accent/10 font-display text-xl text-accent">
                      {active.initials}
                    </span>
                    <figcaption className="md:mt-5">
                      <p className="font-display text-xl uppercase leading-none tracking-wide text-text">
                        {active.name}
                      </p>
                      <p className="mt-1.5 font-label text-[9.5px] uppercase tracking-[0.18em] text-muted">
                        {active.meta}
                      </p>
                      <StarRating
                        value={active.rating}
                        className="mt-3"
                        label={`${active.rating} out of 5 stars`}
                      />
                    </figcaption>
                  </div>

                  <div className="min-w-0">
                    <p className="text-pretty text-[16px] leading-relaxed text-text/90 sm:text-[19px] sm:leading-8">
                      &ldquo;{active.quote}&rdquo;
                    </p>
                    <p className="mt-5 font-label text-[9px] uppercase tracking-[0.2em] text-muted/60">
                      Member · Google review
                    </p>
                  </div>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2" role="group" aria-label="Choose testimonial">
                {testimonials.map((testimonial, dotIndex) => (
                  <button
                    key={testimonial.name + dotIndex}
                    type="button"
                    aria-pressed={dotIndex === index}
                    aria-label={`Show review from ${testimonial.name}`}
                    onClick={() => goTo(dotIndex, dotIndex > index ? 1 : -1)}
                    className={cn(
                      focusRing,
                      "h-1 rounded-sharp transition-all duration-300",
                      dotIndex === index
                        ? "w-10 bg-accent"
                        : "w-5 bg-border hover:bg-muted/60",
                    )}
                  />
                ))}
                <span className="ml-2 font-label text-[10px] tabular-nums tracking-[0.16em] text-muted">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>

              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
              >
                <StarRating value={rating.value} starClassName="h-3 w-3" />
                {copy.testimonials.googleCta}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function resolveDuration(reduceMotion: boolean | null): number {
  return reduceMotion ? 0 : 0.35;
}
