import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { copy, facilities, facilityImages } from "@/data/gym";

export default function Facilities() {
  return (
    <section id="facilities" className="section-pad border-t border-border">
      <div className="container-edge">
        <SectionHeading
          index={copy.sections.facilities.index}
          eyebrow={copy.sections.facilities.eyebrow}
          heading={copy.sections.facilities.heading}
          accent={copy.sections.facilities.accent}
          intro={copy.sections.facilities.intro}
          aside={
            <p className="max-w-[210px] border-l border-border pl-5 font-label text-[9.5px] uppercase leading-relaxed tracking-[0.16em] text-muted">
              {copy.facilities.imageNote}
            </p>
          }
        />

        <div className="mt-12 grid gap-3 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <figure className="relative">
              <SmartImage
                src={facilityImages[0].src}
                alt={facilityImages[0].alt}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="aspect-[4/3] w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 font-label text-[10px] uppercase tracking-[0.2em] text-white/80">
                {facilityImages[0].label}
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-3 lg:col-span-5">
            {facilityImages.slice(1).map((image, index) => (
              <Reveal key={image.src} delay={0.05 + index * 0.05}>
                <figure className="relative">
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="aspect-[16/10] w-full"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 font-label text-[9.5px] uppercase tracking-[0.2em] text-white/80">
                    {image.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <p className="index-label">{copy.facilities.listLabel}</p>
          <dl className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, index) => (
              <Reveal key={facility.id} delay={index * 0.03}>
                <div className="flex items-baseline justify-between gap-4 border-t border-border py-4">
                  <dt className="font-display text-[1.15rem] uppercase leading-none tracking-[-0.01em] text-text">
                    {facility.title}
                  </dt>
                  <dd className="max-w-[55%] text-right text-[11.5px] leading-snug text-muted">
                    {facility.description}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
