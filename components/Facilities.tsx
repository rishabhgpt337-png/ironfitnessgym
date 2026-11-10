import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { copy, facilities } from "@/data/gym";
import { cn } from "@/lib/utils";

const layoutClasses = [
  "sm:col-span-2 lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export default function Facilities() {
  return (
    <section id="facilities" className="section-pad border-b border-border/70">
      <div className="container-edge">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={copy.sections.facilities.eyebrow}
              heading={copy.sections.facilities.heading}
              accent={copy.sections.facilities.accent}
              intro={copy.sections.facilities.intro}
            />
            <p className="font-label text-[10px] uppercase tracking-[0.22em] text-muted">
              Mumbai · Seven days a week
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:auto-rows-[210px] lg:grid-cols-12">
          {facilities.map((facility, index) => (
            <Reveal
              key={facility.id}
              delay={index * 0.04}
              className={cn("group relative", layoutClasses[index])}
            >
              <article className="relative h-full min-h-[220px] overflow-hidden rounded-card border border-border">
                <SmartImage
                  src={facility.image}
                  alt={`${facility.title} at Iron Temple Gym`}
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  variant={index % 2 === 0 ? "barbell" : "dumbbell"}
                  className="absolute inset-0 h-full w-full"
                  imageClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />
                <div className="absolute inset-0 bg-grid-lines bg-grid opacity-[0.12]" />

                <span className="absolute right-4 top-4 font-display text-2xl leading-none text-white/25 sm:right-5 sm:top-5">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <h3 className="font-display text-xl uppercase leading-none tracking-wide text-text sm:text-2xl">
                      {facility.title}
                    </h3>
                    <p className="mt-2 text-[12px] text-white/60">{facility.description}</p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-sharp border border-white/15 bg-black/30 text-white/70 backdrop-blur-sm transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
