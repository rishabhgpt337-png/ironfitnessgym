"use client";

import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { copy, hours, hoursNote } from "@/data/gym";
import { useGymStatus } from "@/lib/use-gym-status";
import {
  formatRange,
  getGroupedHours,
  WEEKDAYS,
  WEEKDAY_LABELS,
  WEEKDAY_SHORT,
} from "@/lib/hours";
import { cn, focusRing } from "@/lib/utils";
import { scrollToId } from "@/lib/enquiry";

export default function Timings() {
  const status = useGymStatus();
  const grouped = getGroupedHours();

  return (
    <section id="timings" className="section-pad border-b border-border/70">
      <div className="container-edge">
        <Reveal>
          <SectionHeading
            eyebrow={copy.sections.timings.eyebrow}
            heading={copy.sections.timings.heading}
            accent={copy.sections.timings.accent}
            intro={copy.sections.timings.intro}
          />
        </Reveal>

        <div className="mt-11 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <Reveal>
            <div className="overflow-hidden rounded-card border border-border bg-surface/60">
              <div className="flex items-center justify-between border-b border-border/80 px-5 py-4 sm:px-6">
                <p className="font-label text-[10px] uppercase tracking-[0.24em] text-muted">
                  Weekly schedule
                </p>
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-muted/70">
                  Asia/Kolkata · IST
                </p>
              </div>

              <table className="w-full text-left">
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Opening hours</th>
                  </tr>
                </thead>
                <tbody>
                  {WEEKDAYS.map((day) => {
                    const isToday = status?.weekday === day;
                    return (
                      <tr
                        key={day}
                        aria-current={isToday ? "date" : undefined}
                        className={cn(
                          "group border-b border-border/50 transition-colors last:border-b-0",
                          isToday ? "bg-accent text-black" : "hover:bg-elevated/60",
                        )}
                      >
                        <th
                          scope="row"
                          className={cn(
                            "px-5 py-4 text-left font-label text-[12px] font-medium uppercase tracking-[0.16em] sm:px-6",
                            isToday ? "text-black" : "text-text",
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="hidden w-9 text-[10px] text-muted sm:inline" aria-hidden="true">
                              <span className={isToday ? "text-black/60" : ""}>
                                {WEEKDAY_SHORT[day]}
                              </span>
                            </span>
                            {WEEKDAY_LABELS[day]}
                            {isToday ? (
                              <span className="rounded-sharp bg-black/90 px-2 py-0.5 font-label text-[8.5px] uppercase tracking-[0.18em] text-accent">
                                {copy.common.today}
                              </span>
                            ) : null}
                          </span>
                        </th>
                        <td
                          className={cn(
                            "px-5 py-4 text-right font-sans text-[13px] tabular-nums sm:px-6 sm:text-sm",
                            isToday ? "font-medium text-black" : "text-muted",
                          )}
                        >
                          {formatRange(hours[day])}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <p className="border-t border-border/80 px-5 py-4 text-[11.5px] leading-relaxed text-muted/80 sm:px-6">
                {hoursNote}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-card border border-border bg-elevated/50 p-6 sm:p-7">
              <div aria-live="polite">
                <p className="font-label text-[10px] uppercase tracking-[0.24em] text-muted">
                  Live status
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    className={cn(
                      "relative flex h-3 w-3",
                      status?.isOpen ? "text-[#4ADE80]" : status ? "text-[#FF6B57]" : "text-muted",
                    )}
                    aria-hidden="true"
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-current" />
                  </span>
                  <p className="font-display text-2xl uppercase leading-none tracking-wide text-text">
                    {status
                      ? status.isOpen
                        ? copy.common.openNow
                        : copy.common.closed
                      : copy.hero.checkingLabel}
                  </p>
                </div>
                <p className="mt-3 font-label text-[11px] uppercase tracking-[0.16em] text-muted">
                  {status?.message ?? "Asia/Kolkata · IST"}
                </p>
              </div>

              <div className="my-6 h-px w-full bg-border" />

              <dl className="space-y-3">
                {grouped.map((group) => (
                  <div key={group.label} className="flex items-baseline justify-between gap-4">
                    <dt className="font-label text-[10px] uppercase tracking-[0.16em] text-muted">
                      {group.label}
                    </dt>
                    <dd className="text-right text-[12.5px] tabular-nums text-text/85">
                      {group.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto pt-7">
                <button
                  type="button"
                  onClick={() => scrollToId("enquire")}
                  className={cn("btn-secondary w-full", focusRing)}
                >
                  Book a free trial
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
