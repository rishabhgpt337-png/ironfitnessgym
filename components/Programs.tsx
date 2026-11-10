import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { ContentIcon } from "@/components/ContentIcon";
import { copy, programs } from "@/data/gym";
import { cn, focusRing } from "@/lib/utils";

export default function Programs() {
  return (
    <section id="programs" className="relative section-pad border-b border-border/70 bg-surface/30">
      <div className="container-edge">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={copy.sections.programs.eyebrow}
              heading={copy.sections.programs.heading}
              accent={copy.sections.programs.accent}
              intro={copy.sections.programs.intro}
            />
            <p className="hidden max-w-[180px] border-l border-border pl-4 font-label text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted md:block">
              {copy.sections.programs.aside.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <Reveal key={program.id} delay={index * 0.05}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-bg/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-glow-sm sm:p-7">
                <span className="absolute left-0 top-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />

                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-4xl leading-none text-white/[0.09] transition-colors duration-300 group-hover:text-accent/25">
                    {program.number}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-sharp border border-border bg-elevated text-text/70 transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent">
                    <ContentIcon name={program.icon} className="h-5 w-5" />
                  </span>
                </div>

                <h3 className="mt-8 font-display text-2xl uppercase leading-none tracking-wide text-text">
                  {program.title}
                </h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">
                  {program.description}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-2">
                  {program.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sharp border border-border/80 px-2.5 py-1 font-label text-[9px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 group-hover:border-accent/25 group-hover:text-text/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
            <p className="text-sm text-muted">{copy.sections.programs.footerNote}</p>
            <a
              href="#enquire"
              className={cn(
                focusRing,
                "group inline-flex items-center gap-2 font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-accent transition-colors hover:text-accentHover",
              )}
            >
              {copy.sections.programs.footerCta}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
