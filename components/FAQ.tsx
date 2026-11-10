"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { contact, copy, faqs } from "@/data/gym";
import { cn, focusRing, whatsappHref } from "@/lib/utils";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="section-pad border-b border-border/70">
      <div className="container-edge">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionHeading
                eyebrow={copy.sections.faq.eyebrow}
                heading={copy.sections.faq.heading}
                accent={copy.sections.faq.accent}
                intro={copy.sections.faq.intro}
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 rounded-card border border-border bg-surface/50 p-5">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted">
                  Still unsure?
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-text/80">
                  Message the front desk and a real person will answer.
                </p>
                <a
                  href={whatsappHref("Hi Iron Temple Gym, I have a question about the gym.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("btn-secondary mt-4 w-full", focusRing)}
                >
                  <MessageCircle className="h-4 w-4 text-[#4ADE80]" aria-hidden="true" />
                  {copy.common.whatsapp}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-3 block break-all text-center text-[11px] text-muted transition-colors hover:text-accent"
                >
                  {contact.email}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <div className="divide-y divide-border border-y border-border">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const panelId = `faq-panel-${index}`;
                const buttonId = `faq-button-${index}`;

                return (
                  <div key={faq.question}>
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className={cn(
                          focusRing,
                          "group flex w-full items-start justify-between gap-5 py-5 text-left transition-colors",
                        )}
                      >
                        <span className="flex items-start gap-4">
                          <span className="mt-0.5 font-label text-[10px] tabular-nums tracking-[0.16em] text-muted/70">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "font-display text-lg uppercase leading-snug tracking-wide transition-colors sm:text-xl",
                              isOpen ? "text-accent" : "text-text group-hover:text-accent",
                            )}
                          >
                            {faq.question}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-sharp border transition-all duration-300",
                            isOpen
                              ? "rotate-45 border-accent bg-accent text-black"
                              : "border-border text-muted group-hover:border-accent group-hover:text-accent",
                          )}
                          aria-hidden="true"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pl-8 pr-10 text-[13.5px] leading-relaxed text-muted sm:pl-9 sm:text-sm">
                            {faq.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
