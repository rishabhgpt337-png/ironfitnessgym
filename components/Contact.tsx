import { ArrowUpRight, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { contact, copy } from "@/data/gym";
import { getGroupedHours } from "@/lib/hours";
import { telHref, whatsappHref } from "@/lib/utils";

export default function Contact() {
  const groupedHours = getGroupedHours();

  return (
    <section id="contact" className="section-pad border-b border-border/70 bg-surface/30">
      <div className="container-edge">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow={copy.sections.contact.eyebrow}
                heading={copy.sections.contact.heading}
                accent={copy.sections.contact.accent}
                intro={copy.sections.contact.intro}
              />
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-8 divide-y divide-border border-y border-border">
                <div className="flex gap-4 py-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sharp border border-border bg-elevated text-accent">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-label text-[9.5px] uppercase tracking-[0.2em] text-muted">
                      Address
                    </p>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-text">
                      {contact.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 py-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sharp border border-border bg-elevated text-accent">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-label text-[9.5px] uppercase tracking-[0.2em] text-muted">
                      Call
                    </p>
                    <a
                      href={telHref()}
                      className="mt-1.5 block text-[14px] text-text transition-colors hover:text-accent"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 py-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sharp border border-border bg-elevated text-accent">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-label text-[9.5px] uppercase tracking-[0.2em] text-muted">
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-1.5 block break-all text-[14px] text-text transition-colors hover:text-accent"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 py-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sharp border border-border bg-elevated text-accent">
                    <Instagram className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-label text-[9.5px] uppercase tracking-[0.2em] text-muted">
                      Instagram
                    </p>
                    <a
                      href={contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 block text-[14px] text-text transition-colors hover:text-accent"
                    >
                      {contact.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={whatsappHref("Hi Iron Temple Gym, I'd like to book a free trial.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {copy.common.whatsapp}
                </a>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1"
                >
                  {copy.sections.contact.directionsCta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-8">
                <p className="font-label text-[9.5px] uppercase tracking-[0.22em] text-muted">
                  Opening hours
                </p>
                <dl className="mt-3 space-y-2.5">
                  {groupedHours.map((group) => (
                    <div
                      key={group.label}
                      className="flex items-baseline justify-between gap-4 border-b border-border/50 pb-2.5"
                    >
                      <dt className="text-[12.5px] text-muted">{group.label}</dt>
                      <dd className="text-right font-label text-[11px] tracking-[0.08em] text-text/85">
                        {group.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.06}>
            <div className="relative h-full min-h-[440px] overflow-hidden rounded-card border border-border bg-elevated lg:min-h-[620px]">
              <div className="map-frame absolute inset-0">
                <iframe
                  src={contact.mapEmbedUrl}
                  title="Map showing Iron Temple Gym in Mumbai"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg/80 to-transparent" />

              <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5">
                <div className="flex flex-col gap-4 rounded-card border border-border bg-bg/90 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div>
                    <p className="font-display text-lg uppercase leading-none tracking-wide text-text">
                      {copy.sections.contact.mapLabel}
                    </p>
                    <p className="mt-1.5 font-label text-[9.5px] uppercase tracking-[0.16em] text-muted">
                      {contact.coordinates.lat.toFixed(6)}, {contact.coordinates.lng.toFixed(6)}
                    </p>
                  </div>
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary min-h-[44px] shrink-0 px-4 py-2.5 text-[11px]"
                  >
                    {copy.sections.contact.directionsCta}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
