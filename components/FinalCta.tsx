import { ArrowUpRight, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { contact, copy } from "@/data/gym";
import { telHref } from "@/lib/utils";

export default function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border">
      <div className="absolute inset-0 -z-10">
        <SmartImage
          src="/images/facility-wall.webp"
          alt="The Iron Temple flame mural and training floor"
          sizes="100vw"
          className="h-full w-full"
          imageClassName="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-transparent to-bg/40" />
        <div className="noise" />
      </div>

      <div className="container-edge relative py-20 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          <Reveal>
            <p className="index-label flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {copy.finalCta.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-display-section uppercase text-text">
              {copy.finalCta.lines.map((line, index) => (
                <span
                  key={line}
                  className={`block ${index === copy.finalCta.lines.length - 1 ? "text-accent" : ""}`}
                >
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-muted">
              {copy.finalCta.body}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#enquire" className="btn-primary w-full sm:w-auto">
                {copy.finalCta.primary}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={telHref()}
                className="btn-secondary w-full border-white/25 sm:w-auto"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
