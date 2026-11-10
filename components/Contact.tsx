import { ArrowUpRight, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { contact, copy, hoursNote } from "@/data/gym";
import { getGroupedHours } from "@/lib/hours";
import { telHref, whatsappHref } from "@/lib/utils";

export default function Contact() {
  const groupedHours = getGroupedHours();

  return (
    <section id="visit" className="section-pad border-t border-border">
      <div className="container-edge">
        <SectionHeading
          index={copy.sections.visit.index}
          eyebrow={copy.sections.visit.eyebrow}
          heading={copy.sections.visit.heading}
          accent={copy.sections.visit.accent}
          intro={copy.sections.visit.intro}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="border-t border-border pt-5">
                <p className="index-label">Address</p>
                <address className="mt-3 not-italic">
                  <p className="text-[17px] leading-relaxed text-text">
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </address>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line mt-4"
                >
                  {copy.sections.visit.directionsCta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.04}>
              <div className="mt-8 border-t border-border pt-5">
                <p className="index-label">Contact</p>
                <div className="mt-3 space-y-3">
                  <a
                    href={telHref()}
                    className="flex items-center gap-3 text-[15px] text-text transition-colors hover:text-accent"
                  >
                    <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                    {contact.phone}
                  </a>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[15px] text-text transition-colors hover:text-accent"
                  >
                    <Instagram className="h-4 w-4 text-accent" aria-hidden="true" />
                    {contact.instagramHandle}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-8 border-t border-border pt-5">
                <p className="index-label">Opening hours</p>
                <dl className="mt-3">
                  {groupedHours.map((group) => (
                    <div
                      key={group.label}
                      className="flex items-baseline justify-between gap-4 border-b border-border/60 py-2.5"
                    >
                      <dt className="text-[13px] text-muted">{group.label}</dt>
                      <dd className="text-right font-label text-[11px] tracking-[0.08em] text-text/85">
                        {group.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-[11px] leading-relaxed text-muted/80">{hoursNote}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={whatsappHref("Hi Iron Temple Gym, I'd like to book a free trial.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {copy.common.whatsapp}
                </a>
                <a href="#enquire" className="btn-secondary flex-1">
                  Free trial
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.04}>
              <figure className="relative">
                <SmartImage
                  src="/images/gym-exterior.webp"
                  alt="Iron Temple Gym signage at HS Pearl, Mulund East"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="aspect-[16/10] w-full"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/80">
                    HS Pearl · Mulund East
                  </span>
                  <span className="hidden font-label text-[9px] uppercase tracking-[0.16em] text-white/50 sm:block">
                    {contact.coordinates.lat.toFixed(4)}° N, {contact.coordinates.lng.toFixed(4)}° E
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="map-frame relative mt-3 aspect-[16/9] w-full overflow-hidden border border-border bg-elevated">
                <iframe
                  src={contact.mapEmbedUrl}
                  title="Map showing Iron Temple Gym in Mulund East, Mumbai"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
