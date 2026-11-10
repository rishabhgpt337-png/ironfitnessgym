"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import StarRating from "@/components/StarRating";
import { contact, copy, rating } from "@/data/gym";
import { useGymStatus } from "@/lib/use-gym-status";
import { cn, focusRing } from "@/lib/utils";
import { scrollToId } from "@/lib/enquiry";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden border-b border-border"
    >
      <div className="absolute inset-0 -z-10">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0 lg:left-[22%]">
          <SmartImage
            src="/images/hero.webp"
            alt={copy.hero.imageAlt}
            priority
            sizes="100vw"
            className="h-full w-full"
            imageClassName="object-cover object-[56%_45%] brightness-110 lg:object-center"
            quality={85}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/20 lg:via-bg/70 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/70" />
        <div className="noise" />
      </div>

      <div className="container-edge relative flex min-h-0 flex-1 flex-col justify-end pb-10 pt-28 sm:pt-32 lg:justify-center lg:pb-16 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3"
            >
              <LiveDot />
              <p className="font-label text-[9.5px] font-medium uppercase tracking-[0.24em] text-text/70 sm:text-[10px]">
                {copy.hero.eyebrow}
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-display-hero uppercase text-text"
            >
              <span className="block">{copy.hero.headline[0]}</span>
              <span className="block">{copy.hero.headline[1]}</span>
              <span className="block text-accent">{copy.hero.headline[2]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
              className="mt-7 max-w-[30rem] text-pretty text-[14.5px] leading-relaxed text-muted sm:text-[15.5px]"
            >
              {copy.hero.subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease: "easeOut" }}
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
                onClick={() => scrollToId("facilities")}
                className={cn("btn-secondary w-full sm:w-auto", focusRing)}
              >
                {copy.hero.secondaryCta}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 lg:hidden">
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.16em] text-text/80"
              >
                <StarRating value={rating.value} starClassName="h-3 w-3" />
                {rating.value} · {rating.reviewCount} reviews
              </a>
              <LiveStatus />
            </div>
          </div>

          <aside className="hidden border-l border-white/15 pl-6 lg:col-span-4 lg:col-start-9 lg:block xl:col-start-10">
            <div className="space-y-5">
              <div>
                <p className="index-label">Google rating</p>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-baseline gap-2 transition-opacity hover:opacity-80"
                >
                  <span className="font-display text-4xl leading-none text-text">{rating.value}</span>
                  <StarRating value={rating.value} label={`${rating.value} out of 5 on Google`} />
                </a>
                <p className="mt-1.5 font-label text-[9.5px] uppercase tracking-[0.16em] text-muted">
                  {rating.reviewCount} {copy.hero.ratingSuffix}
                </p>
              </div>

              <div className="h-px w-full bg-white/10" />

              <div aria-live="polite">
                <p className="index-label">Right now</p>
                <div className="mt-2">
                  <LiveStatusPanel />
                </div>
              </div>

              <div className="h-px w-full bg-white/10" />

              <div>
                <p className="index-label">Find us</p>
                <p className="mt-2 text-[13px] leading-relaxed text-text/85">
                  Podium 3, HS Pearl
                  <br />
                  V.B. Phadake Rd, Mulund East
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/25 backdrop-blur-sm">
        <div className="container-edge flex items-center justify-between gap-6 py-3">
          <p className="font-label text-[9px] uppercase tracking-[0.24em] text-muted">
            Strength · Conditioning · Coaching
          </p>
          <button
            type="button"
            onClick={() => scrollToId("about")}
            className="group flex items-center gap-2 font-label text-[9px] uppercase tracking-[0.24em] text-text/60 transition-colors hover:text-accent"
          >
            {copy.hero.scrollLabel}
            <ArrowDown className="h-3.5 w-3.5 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function LiveDot() {
  const status = useGymStatus();

  return (
    <span
      className={cn(
        "relative flex h-1.5 w-1.5",
        status?.isOpen ? "text-[#5EDC8E]" : status ? "text-[#FF6B57]" : "text-muted",
      )}
      aria-hidden="true"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40 motion-reduce:animate-none" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
    </span>
  );
}

function LiveStatus() {
  const status = useGymStatus();
  return (
    <span className="font-label text-[10px] uppercase tracking-[0.16em] text-text/80">
      {status ? (status.isOpen ? copy.hero.openLabel : copy.hero.closedLabel) : copy.hero.checkingLabel}
      <span className="ml-2 text-muted">{status?.message}</span>
    </span>
  );
}

function LiveStatusPanel() {
  const status = useGymStatus();
  return (
    <>
      <p className="flex items-center gap-2 font-display text-xl uppercase tracking-wide text-text">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            status?.isOpen ? "bg-[#5EDC8E]" : status ? "bg-[#FF6B57]" : "bg-muted",
          )}
          aria-hidden="true"
        />
        {status ? (status.isOpen ? copy.hero.openLabel : copy.hero.closedLabel) : copy.hero.checkingLabel}
      </p>
      <p className="mt-1.5 font-label text-[10px] uppercase tracking-[0.14em] text-muted">
        {status?.message ?? "Asia/Kolkata · IST"}
      </p>
    </>
  );
}
