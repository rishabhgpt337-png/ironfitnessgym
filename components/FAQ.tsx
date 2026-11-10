"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { copy, faqs } from "@/data/gym";
import { cn, focusRing, whatsappHref } from "@/lib/utils";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="section-pad border-t border-border">
      <div className="container-edge">
        <SectionHeading
          index={copy.sections.faq.index}
          eyebrow={copy.sections.faq.eyebrow}
          heading={copy.sections.faq.heading}
          accent={copy.sections.faq.accent}
          intro={copy.sections.faq.intro}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="border border-border p-5">
                <p className="index-label">Still unsure?</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-text/80">
                  Message the front desk and a real person will answer.
                </p>
                <a
                  href={whatsappHref("Hi Iron Temple Gym, I have a question about the gym.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("btn-secondary mt-4 w-full", focusRing)}
                >
                  <MessageCircle className="h-4 w-4 text-[#5EDC8E]" aria-hidden="true" />
                  {copy.common.whatsapp}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.04}>
              <div>
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  const panelId = `faq-panel-${index}`;
                  const buttonId = `faq-button-${index}`;

                  return (
                    <div key={faq.question} className="border-t border-border last:border-b">
                      <h3>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          className={cn(
                            focusRing,
                            "group flex w-full items-start justify-between gap-5 py-5 text-left",
                          )}
                        >
                          <span className="flex items-start gap-4">
                            <span className="mt-1 font-label text-[9px] tracking-[0.18em] text-muted/70">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={cn(
                                "font-display text-[1.25rem] uppercase leading-snug tracking-[-0.01em] transition-colors sm:text-[1.4rem]",
                                isOpen ? "text-accent" : "text-text group-hover:text-accent",
                              )}
                            >
                              {faq.question}
                            </span>
                          </span>
                          <span
                            className={cn(
                              "mt-0.5 grid h-6 w-6 shrink-0 place-items-center border transition-all duration-300",
                              isOpen
                                ? "rotate-45 border-accent bg-accent text-black"
                                : "border-border text-muted group-hover:border-accent group-hover:text-accent",
                            )}
                            aria-hidden="true"
                          >
                            <Plus className="h-3 w-3" />
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
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-xl pb-6 pl-8 pr-8 text-[13.5px] leading-relaxed text-muted">
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
      </div>
    </section>
  );
}
