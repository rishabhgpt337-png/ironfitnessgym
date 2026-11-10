"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { billingCycles, copy, plans, pricePlaceholder, type BillingCycleId } from "@/data/gym";
import { cn, focusRing, formatInr } from "@/lib/utils";
import { openEnquiry } from "@/lib/enquiry";

export default function Plans() {
  const [cycle, setCycle] = useState<BillingCycleId>("monthly");
  const reduceMotion = useReducedMotion();
  const activeCycle = billingCycles.find((item) => item.id === cycle) ?? billingCycles[0];

  return (
    <section id="plans" className="relative section-pad border-b border-border/70 bg-surface/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,77,0,0.07),transparent_55%)]"
      />
      <div className="container-edge relative">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow={copy.sections.plans.eyebrow}
              heading={copy.sections.plans.heading}
              accent={copy.sections.plans.accent}
              intro={copy.sections.plans.intro}
            />

            <div
              role="group"
              aria-label={copy.plans.cycleLabel}
              className="grid grid-cols-2 gap-1 self-start rounded-sharp border border-border bg-bg/60 p-1 sm:inline-flex sm:grid-cols-4 lg:self-end"
            >
              {billingCycles.map((option) => {
                const selected = cycle === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setCycle(option.id)}
                    className={cn(
                      focusRing,
                      "relative rounded-sharp px-4 py-2.5 font-label text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200",
                      selected ? "text-black" : "text-muted hover:text-text",
                    )}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="plan-cycle-pill"
                        className="absolute inset-0 rounded-sharp bg-accent"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 34 }
                        }
                      />
                    ) : null}
                    <span className="relative z-10">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan, index) => {
            const price = plan.prices[cycle];
            const popular = plan.popular;

            return (
              <Reveal key={plan.id} delay={index * 0.07} className="h-full">
                <article
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-card border p-6 pt-8 sm:p-8 sm:pt-10",
                    popular
                      ? "border-accent/60 bg-elevated shadow-[0_30px_80px_-50px_rgba(255,77,0,0.6)] lg:-mt-4 lg:mb-[-4px]"
                      : "border-border bg-bg/60 transition-colors duration-300 hover:border-[#3b3b41]",
                  )}
                >
                  {popular ? (
                    <>
                      <span className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden="true" />
                      <span className="absolute right-5 top-5 rounded-sharp bg-accent px-2.5 py-1 font-label text-[8.5px] font-bold uppercase tracking-[0.2em] text-black sm:right-6">
                        {copy.plans.popularLabel}
                      </span>
                    </>
                  ) : null}

                  <p className="font-label text-[10px] uppercase tracking-[0.24em] text-muted">
                    {String(index + 1).padStart(2, "0")} / Plan
                  </p>
                  <h3 className="mt-3 font-display text-3xl uppercase leading-none tracking-wide text-text">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-[13px] text-muted">{plan.tagline}</p>

                  <div className="mt-7 border-y border-border/80 py-6">
                    {price !== null ? (
                      <p className="font-display text-4xl leading-none text-text">
                        {formatInr(price)}
                      </p>
                    ) : (
                      <p className="font-display text-[26px] uppercase leading-none tracking-wide text-text">
                        {pricePlaceholder}
                      </p>
                    )}
                    <p className="mt-2 font-label text-[9.5px] uppercase tracking-[0.18em] text-muted">
                      {activeCycle.note}
                    </p>
                  </div>

                  <p className="mt-5 text-[13px] leading-relaxed text-muted">{plan.description}</p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[13px] text-text/85">
                        <Check
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            popular ? "text-accent" : "text-accent/80",
                          )}
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => openEnquiry(plan.id)}
                    className={cn(
                      "mt-8 w-full",
                      popular ? "btn-primary" : "btn-secondary",
                      focusRing,
                    )}
                  >
                    {copy.plans.enquireCta}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-col items-start justify-between gap-4 border-t border-border pt-5 sm:flex-row sm:items-center">
            <p className="flex items-start gap-2 text-[12px] leading-relaxed text-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {copy.plans.priceNote}
            </p>
            <p className="text-[12px] text-muted/80">{copy.plans.enquiryNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
