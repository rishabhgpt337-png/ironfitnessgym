import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import StarRating from "@/components/StarRating";
import { contact, copy, rating, testimonials } from "@/data/gym";

export default function Testimonials() {
  return (
    <section id="reviews" className="section-pad border-t border-border bg-surface">
      <div className="container-edge">
        <SectionHeading
          index={copy.sections.reviews.index}
          eyebrow={copy.sections.reviews.eyebrow}
          heading={copy.sections.reviews.heading}
          accent={copy.sections.reviews.accent}
          intro={copy.sections.reviews.intro}
          aside={
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-l border-border pl-5 transition-opacity hover:opacity-80"
            >
              <span className="font-display text-4xl leading-none text-text">{rating.value}</span>
              <span>
                <StarRating value={rating.value} label={`${rating.value} out of 5 on Google`} />
                <span className="mt-1 block font-label text-[9px] uppercase tracking-[0.16em] text-muted">
                  {rating.reviewCount} Google reviews
                </span>
              </span>
            </a>
          }
        />

        <div className="mt-12 grid gap-x-10 gap-y-0 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.04}>
              <figure className="border-t border-border py-8 md:py-10">
                <div className="flex items-center justify-between gap-4">
                  <StarRating value={item.rating} label={`${item.rating} out of 5 stars`} />
                  <span className="font-label text-[9px] uppercase tracking-[0.18em] text-muted/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <blockquote className="mt-5">
                  <p className="text-pretty text-[15px] leading-[1.7] text-text/90">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center border border-border font-label text-[10px] tracking-[0.08em] text-accent">
                    {item.initials}
                  </span>
                  <span>
                    <span className="block font-label text-[11px] font-semibold uppercase tracking-[0.14em] text-text">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-[10.5px] text-muted">{item.meta}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05}>
          <a
            href={contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line mt-4"
          >
            {copy.testimonials.googleCta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
