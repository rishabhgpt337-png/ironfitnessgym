"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import StarRating from "@/components/StarRating";
import { brand, contact, copy, rating } from "@/data/gym";
import { useGymStatus } from "@/lib/use-gym-status";
import { cn, focusRing } from "@/lib/utils";
import { scrollToId } from "@/lib/enquiry";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden border-b border-border/70"
    >
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={reduceMotion ? undefined : { y: parallaxY }}
          className="absolute inset-0 scale-[1.12]"
        >
          <SmartImage
            src="/images/hero.webp"
            alt={copy.hero.imageAlt}
            priority
            sizes="100vw"
            variant="hero"
            className="h-full w-full"
            imageClassName="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/60" />
        <div className="absolute inset-0 bg-grid-lines bg-grid opacity-40" />
        <div className="noise-overlay" />
      </div>

      <div className="container-edge relative flex flex-1 flex-col justify-center pb-14 pt-32 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-40">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_300px]">
          <div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="eyebrow eyebrow-line"
            >
              {copy.hero.eyebrow}
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[clamp(2.75rem,8.6vw,6rem)] uppercase leading-[0.88] tracking-[-0.02em]"
            >
              <span className="block text-text">{copy.hero.headlineTop}</span>
              <span className="block text-accent">{copy.hero.headlineAccent}</span>
              <span className="block text-outline">{copy.hero.headlineBottom}</span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
              className="mt-6 max-w-lg text-pretty text-[15px] leading-relaxed text-muted sm:text-lg"
            >
              {copy.hero.subtext}
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <button
                type="button"
                onClick={() => scrollToId("enquire")}
                className={cn("btn-primary w-full sm:w-auto", focusRing)}
              >
                {copy.hero.primaryCta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollToId("timings")}
                className={cn("btn-secondary w-full bg-bg/20 sm:w-auto", focusRing)}
              >
                {copy.hero.secondaryCta}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>

            <div className="mt-7 flex flex-wrap items-center gap-3 lg:hidden">
              <LiveStatusChip />
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sharp border border-white/10 bg-black/35 px-3.5 py-2 backdrop-blur-md transition-colors hover:border-gold/40"
              >
                <StarRating value={rating.value} label={`${rating.value} out of 5 on Google`} />
                <span className="font-label text-xs font-medium text-text">{rating.value}</span>
                <span className="font-label text-[9px] uppercase tracking-[0.18em] text-muted">
                  {rating.reviewCount} reviews
                </span>
              </a>
            </div>
          </div>

          <div className="hidden border-l border-white/15 pl-6 lg:block">
            <div className="space-y-6">
              <div>
                <p className="font-label text-[9px] uppercase tracking-[0.28em] text-muted">
                  Member rated
                </p>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block rounded-sharp transition-opacity hover:opacity-80"
                >
                  <span className="flex items-baseline gap-2">
                    <span className="font-display text-3xl text-text">{rating.value}</span>
                    <StarRating value={rating.value} label={`${rating.value} out of 5 on Google`} />
                  </span>
                  <span className="mt-1 block font-label text-[10px] uppercase tracking-[0.16em] text-muted">
                    {rating.reviewCount} {copy.hero.ratingSuffix}
                  </span>
                </a>
              </div>

              <div className="h-px w-full bg-white/10" />

              <div>
                <p className="font-label text-[9px] uppercase tracking-[0.28em] text-muted">
                  Right now
                </p>
                <div className="mt-2">
                  <LiveStatusPanel />
                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              <div>
                <p className="font-label text-[9px] uppercase tracking-[0.28em] text-muted">
                  Find us
                </p>
                <p className="mt-2 flex items-start gap-2 text-sm text-text/85">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {brand.city}, {brand.region}
                </p>
                <p className="mt-1.5 font-label text-[10px] uppercase tracking-[0.16em] text-muted">
                  {contact.coordinates.lat.toFixed(4)}° N · {contact.coordinates.lng.toFixed(4)}° E
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-white/10 bg-black/35 backdrop-blur-sm">
        <div className="flex w-max animate-ticker items-center gap-8 py-3.5 will-change-transform motion-reduce:animate-none">
          {[...copy.hero.ticker, ...copy.hero.ticker].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-8 font-label text-[10px] uppercase tracking-[0.28em] text-text/55"
            >
              {item}
              <span className="h-1 w-1 rotate-45 bg-accent" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveStatusChip() {
  const status = useGymStatus();

  return (
    <div className="inline-flex items-center gap-2 rounded-sharp border border-white/10 bg-black/35 px-3.5 py-2 backdrop-blur-md">
      <span
        className={cn(
          "relative flex h-2 w-2",
          status?.isOpen ? "text-[#4ADE80]" : status ? "text-[#FF6B57]" : "text-muted",
        )}
        aria-hidden="true"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
      </span>
      <span className="font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-text">
        {status ? (status.isOpen ? copy.hero.openLabel : copy.hero.closedLabel) : copy.hero.checkingLabel}
      </span>
      <span className="font-label text-[10px] uppercase tracking-[0.12em] text-muted">
        {status?.message ?? "Asia/Kolkata"}
      </span>
    </div>
  );
}

function LiveStatusPanel() {
  const status = useGymStatus();

  return (
    <div aria-live="polite">
      <span className="flex items-center gap-2">
        <span
          className={cn(
            "relative flex h-2.5 w-2.5",
            status?.isOpen ? "text-[#4ADE80]" : status ? "text-[#FF6B57]" : "text-muted",
          )}
          aria-hidden="true"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-current" />
        </span>
        <span className="font-display text-xl uppercase tracking-wide text-text">
          {status ? (status.isOpen ? copy.hero.openLabel : copy.hero.closedLabel) : copy.hero.checkingLabel}
        </span>
      </span>
      <p className="mt-1.5 font-label text-[11px] uppercase tracking-[0.14em] text-muted">
        {status?.message ?? "Asia/Kolkata · IST"}
      </p>
    </div>
  );
}
