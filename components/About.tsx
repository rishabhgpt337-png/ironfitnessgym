import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { copy } from "@/data/gym";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-edge">
        <SectionHeading
          index={copy.sections.about.index}
          eyebrow={copy.sections.about.eyebrow}
          heading={copy.sections.about.heading}
          accent={copy.sections.about.accent}
          intro={copy.sections.about.intro}
          aside={
            <p className="max-w-[230px] border-l border-border pl-5 text-[12px] leading-relaxed text-muted">
              Podium level at HS Pearl, Mulund East. Open seven days a week.
            </p>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <figure className="relative">
              <SmartImage
                src="/images/about.webp"
                alt={copy.about.imageAlt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] w-full"
                imageClassName="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/75">
                  {copy.about.imageCaption}
                </span>
                <span className="h-8 w-8 border-b border-r border-accent" aria-hidden="true" />
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <Reveal>
              <div className="space-y-6">
                {copy.about.story.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="text-pretty text-[15px] leading-[1.75] text-muted sm:text-[16px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <blockquote className="mt-10 border-l border-accent pl-5">
                <p className="font-display text-[1.6rem] uppercase leading-[1.05] tracking-[-0.01em] text-text sm:text-[2rem]">
                  {copy.about.quote}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.1}>
              <a href="#enquire" className="link-line mt-10">
                {copy.about.ctaLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
