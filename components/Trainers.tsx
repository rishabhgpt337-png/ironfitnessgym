import { Instagram } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { copy, trainers } from "@/data/gym";

export default function Trainers() {
  return (
    <section id="trainers" className="section-pad border-b border-border/70 bg-surface/30">
      <div className="container-edge">
        <Reveal>
          <SectionHeading
            eyebrow={copy.sections.trainers.eyebrow}
            heading={copy.sections.trainers.heading}
            accent={copy.sections.trainers.accent}
            intro={copy.sections.trainers.intro}
          />
        </Reveal>

        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer, index) => (
            <Reveal key={`${trainer.name}-${index}`} delay={index * 0.07}>
              <article className="group h-full overflow-hidden rounded-card border border-border bg-bg/60 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <div className="relative">
                  <SmartImage
                    src={trainer.image}
                    alt={`${trainer.name}, ${trainer.speciality} coach at Iron Temple Gym`}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    variant="portrait"
                    className="aspect-[4/5] w-full"
                    imageClassName="grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 font-label text-[10px] uppercase tracking-[0.24em] text-white/50">
                    Coach {String(index + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={trainer.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${trainer.name} on Instagram`}
                    className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-sharp border border-white/20 bg-black/40 text-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-black"
                  >
                    <Instagram className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>

                <div className="border-t border-border/80 p-5 sm:p-6">
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-accent">
                    {trainer.speciality}
                  </p>
                  <h3 className="mt-2 font-display text-2xl uppercase leading-none tracking-wide text-text">
                    {trainer.name}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">{trainer.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
