"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { copy, gallery } from "@/data/gym";
import { cn, focusRing } from "@/lib/utils";

const aspectClasses: Record<string, string> = {
  wide: "aspect-[4/3]",
  tall: "aspect-[3/4]",
  normal: "aspect-square",
};

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [previousFocus, setPreviousFocus] = useState<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const isOpen = openIndex !== null;
  const activeItem = openIndex !== null ? gallery[openIndex] : null;

  const open = (index: number) => {
    setPreviousFocus(document.activeElement as HTMLElement | null);
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
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("drawer-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, step]);

  useEffect(() => {
    if (!isOpen && previousFocus) {
      previousFocus.focus();
    }
  }, [isOpen, previousFocus]);

  return (
    <section id="gallery" className="section-pad border-b border-border/70">
      <div className="container-edge">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={copy.sections.gallery.eyebrow}
              heading={copy.sections.gallery.heading}
              accent={copy.sections.gallery.accent}
              intro={copy.sections.gallery.intro}
            />
            <p className="hidden font-label text-[10px] uppercase tracking-[0.22em] text-muted sm:block">
              {String(gallery.length).padStart(2, "0")} frames · Tap to expand
            </p>
          </div>
        </Reveal>

        <div className="mt-10 columns-1 gap-3 sm:columns-2 lg:columns-3">
          {gallery.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => open(index)}
              aria-label={`${copy.gallery.openLabel}: ${item.caption}`}
              className={cn(
                focusRing,
                "group relative mb-3 block w-full overflow-hidden rounded-card border border-border bg-surface text-left",
              )}
            >
              <SmartImage
                src={item.src}
                alt={item.alt}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                variant={index % 3 === 0 ? "barbell" : index % 3 === 1 ? "kettlebell" : "plates"}
                className={cn("w-full", aspectClasses[item.span] ?? "aspect-square")}
                imageClassName="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-sharp border border-white/20 bg-black/35 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-4">
                <span className="block font-label text-[9px] uppercase tracking-[0.22em] text-white/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block font-display text-lg uppercase tracking-wide text-white">
                  {item.caption}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && activeItem ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22 }}
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
              className="absolute inset-0 h-full w-full cursor-default bg-black/90 backdrop-blur-md"
            />

            <motion.div
              ref={panelRef}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-card border border-border bg-surface shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-border/80 px-4 py-3 sm:px-5">
                <p className="font-label text-[10px] uppercase tracking-[0.22em] text-muted">
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
                    "grid h-9 w-9 place-items-center rounded-sharp border border-border text-text transition-colors hover:border-accent hover:text-accent",
                  )}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div
                className="relative h-[58vh] max-h-[680px] w-full bg-black sm:h-[68vh]"
                onTouchStart={(event) => {
                  touchStartX.current = event.touches[0]?.clientX ?? null;
                }}
                onTouchEnd={(event) => {
                  if (touchStartX.current === null) return;
                  const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
                  if (Math.abs(delta) > 48) step(delta < 0 ? 1 : -1);
                  touchStartX.current = null;
                }}
              >
                <SmartImage
                  src={activeItem.src}
                  alt={activeItem.alt}
                  sizes="90vw"
                  variant="barbell"
                  className="h-full w-full"
                  imageClassName="object-contain"
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border/80 px-4 py-4 sm:px-5">
                <div className="min-w-0">
                  <p className="font-display text-lg uppercase tracking-wide text-text">
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
                      "grid h-10 w-10 place-items-center rounded-sharp border border-border text-text transition-colors hover:border-accent hover:text-accent",
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
                      "grid h-10 w-10 place-items-center rounded-sharp border border-border text-text transition-colors hover:border-accent hover:text-accent",
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
