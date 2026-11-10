import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { copy, programs } from "@/data/gym";

export default function Programs() {
  return (
    <section id="programs" className="section-pad">
      <div className="container-edge">
        <SectionHeading
          index={copy.sections.programs.index}
          eyebrow={copy.sections.programs.eyebrow}
          heading={copy.sections.programs.heading}
          accent={copy.sections.programs.accent}
          intro={copy.sections.programs.intro}
          aside={
            <p className="max-w-[210px] border-l border-border pl-5 font-label text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted">
              Every programme starts with a conversation.
            </p>
          }
        />

        <div className="mt-12">
          {programs.map((program, index) => (
            <Reveal key={program.id} delay={index * 0.03}>
              <article className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-3 border-t border-border py-6 transition-colors duration-300 hover:bg-surface/60 sm:gap-x-6 sm:py-8 last:border-b">
                <span className="col-span-2 font-label text-[10px] tracking-[0.18em] text-muted transition-colors group-hover:text-accent sm:col-span-1">
                  {program.number}
                </span>
                <h3 className="col-span-10 font-display text-[1.6rem] uppercase leading-none tracking-[-0.01em] text-text transition-transform duration-300 group-hover:translate-x-1 sm:col-span-4 sm:text-[2rem]">
                  {program.title}
                </h3>
                <p className="col-span-12 max-w-md text-[13.5px] leading-relaxed text-muted sm:col-span-5">
                  {program.description}
                </p>
                <div className="col-span-12 flex flex-wrap items-center gap-x-4 gap-y-2 sm:col-span-2 sm:justify-end">
                  {program.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-label text-[9px] uppercase tracking-[0.16em] text-muted/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.06}>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-[13.5px] text-muted">
              Not sure where to start? That is what the trial is for.
            </p>
            <a href="#enquire" className="link-line">
              Talk to a coach
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
