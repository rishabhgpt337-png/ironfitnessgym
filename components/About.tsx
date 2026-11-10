import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { ContentIcon } from "@/components/ContentIcon";
import { aboutFeatures, copy } from "@/data/gym";

export default function About() {
  return (
    <section id="about" className="relative section-pad border-b border-border/70">
      <div className="container-edge">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionHeading
                eyebrow={copy.sections.about.eyebrow}
                heading={copy.sections.about.heading}
                accent={copy.sections.about.accent}
                intro={copy.sections.about.intro}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="group relative mt-9 overflow-hidden rounded-card border border-border">
                <SmartImage
                  src="/images/about.webp"
                  alt={copy.about.imageAlt}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  variant="plates"
                  className="aspect-[4/3] w-full"
                  imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <p className="font-label text-[10px] uppercase tracking-[0.22em] text-text/75">
                    {copy.about.imageCaption}
                  </p>
                  <span className="h-8 w-8 shrink-0 border-b border-r border-accent/60" aria-hidden="true" />
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <div className="space-y-5">
                {copy.about.story.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-pretty text-[15px] leading-relaxed text-muted sm:text-[17px] sm:leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <blockquote className="mt-9 border-l-2 border-accent pl-5 sm:pl-6">
                <p className="font-display text-xl uppercase leading-tight tracking-wide text-text sm:text-2xl">
                  {copy.about.quote}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="eyebrow mt-10">{copy.about.featuresLabel}</p>
            </Reveal>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {aboutFeatures.map((feature, index) => (
                <Reveal key={feature.title} delay={0.08 + index * 0.06}>
                  <article className="group h-full rounded-card border border-border/80 bg-surface/50 p-5 transition-colors duration-300 hover:border-accent/50 hover:bg-surface">
                    <span className="grid h-10 w-10 place-items-center rounded-sharp border border-border bg-elevated text-accent transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-black">
                      <ContentIcon name={feature.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-label text-[12px] font-semibold uppercase tracking-[0.18em] text-text">
                      {feature.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
                      {feature.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.14}>
              <a
                href="#enquire"
                className="group mt-8 inline-flex items-center gap-2 font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-text transition-colors hover:text-accent"
              >
                {copy.about.ctaLabel}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
