"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { copy, gallery } from "@/data/gym";
import { cn, focusRing } from "@/lib/utils";

const layout = [
  "md:col-span-7 h-[260px] sm:h-[340px] md:h-[460px]",
  "md:col-span-5 h-[260px] sm:h-[340px] md:h-[460px]",
  "md:col-span-4 h-[240px] sm:h-[300px]",
  "md:col-span-4 h-[240px] sm:h-[300px]",
  "md:col-span-4 h-[240px] sm:h-[300px]",
  "md:col-span-5 h-[260px] sm:h-[340px]",
  "md:col-span-7 h-[260px] sm:h-[340px]",
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const isOpen = openIndex !== null;
  const activeItem = openIndex !== null ? gallery[openIndex] : null;

  const open = (index: number) => {
    previousFocus.current = document.activeElement as HTMLElement | null;
    setOpenIndex(index);
  };

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback((direction: number) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + direction + gallery.length) % gallery.length;
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("drawer-open");
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("drawer-open");
      window.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus();
    };
  }, [isOpen, close, step]);

  return (
    <section id="gallery" className="section-pad border-t border-border">
      <div className="container-edge">
        <SectionHeading
          index={copy.sections.gallery.index}
          eyebrow={copy.sections.gallery.eyebrow}
          heading={copy.sections.gallery.heading}
          accent={copy.sections.gallery.accent}
          intro={copy.sections.gallery.intro}
          aside={
            <p className="font-label text-[9.5px] uppercase tracking-[0.2em] text-muted">
              {String(gallery.length).padStart(2, "0")} frames · Tap to expand
            </p>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-12">
          {gallery.map((item, index) => (
            <Reveal key={item.src} delay={index * 0.03} className={cn("group", layout[index])}>
              <button
                type="button"
                onClick={() => open(index)}
                aria-label={`${copy.gallery.openLabel}: ${item.caption}`}
                className={cn(
                  focusRing,
                  "relative block h-full w-full overflow-hidden bg-elevated text-left",
                )}
              >
                <SmartImage
                  src={item.src}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full"
                  imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <span>
                    <span className="block font-label text-[9px] uppercase tracking-[0.2em] text-white/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block font-display text-[1.05rem] uppercase leading-none tracking-wide text-white">
                      {item.caption}
                    </span>
                  </span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center border border-white/25 text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && activeItem ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${copy.gallery.openLabel} — ${activeItem.caption}`}
          >
            <button
              type="button"
              aria-label={copy.gallery.closeLabel}
              tabIndex={-1}
              onClick={close}
              className="absolute inset-0 h-full w-full cursor-default bg-black/92 backdrop-blur-sm"
            />

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-5xl border border-border bg-surface"
            >
              <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted">
                  {String((openIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                  {String(gallery.length).padStart(2, "0")}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label={copy.gallery.closeLabel}
                  className={cn(
                    focusRing,
                    "grid h-9 w-9 place-items-center border border-border text-text transition-colors hover:border-accent hover:text-accent",
                  )}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="relative h-[58vh] max-h-[680px] w-full bg-black sm:h-[66vh]">
                <SmartImage
                  src={activeItem.src}
                  alt={activeItem.alt}
                  sizes="90vw"
                  className="h-full w-full"
                  imageClassName="object-contain"
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-4">
                <div className="min-w-0">
                  <p className="font-display text-[1.1rem] uppercase tracking-wide text-text">
                    {activeItem.caption}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-muted">{activeItem.alt}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={copy.gallery.previousLabel}
                    className={cn(
                      focusRing,
                      "grid h-10 w-10 place-items-center border border-border text-text transition-colors hover:border-accent hover:text-accent",
                    )}
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={copy.gallery.nextLabel}
                    className={cn(
                      focusRing,
                      "grid h-10 w-10 place-items-center border border-border text-text transition-colors hover:border-accent hover:text-accent",
                    )}
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
