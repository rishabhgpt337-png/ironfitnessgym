import {
  ArrowUp,
  ArrowUpRight,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import Logo from "@/components/Logo";
import FooterStatus from "@/components/FooterStatus";
import { brand, contact, copy, navLinks } from "@/data/gym";
import { getGroupedHours } from "@/lib/hours";
import { telHref, whatsappHref } from "@/lib/utils";

export default function Footer() {
  const groupedHours = getGroupedHours();
  const year = new Date().getFullYear();

  return (
    <footer id="visit" className="relative scroll-mt-24 border-t border-border bg-bg">
      <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-accent/70 via-border to-transparent" />

      <div className="container-edge">
        {/* Welcome */}
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-7">
            <p className="index-label flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {copy.footer.welcomeEyebrow}
            </p>
            <h2 className="mt-5 font-display text-display-section uppercase text-text">
              <span className="block">{copy.footer.welcomeHeading[0]}</span>
              <span className="block text-accent">{copy.footer.welcomeHeading[1]}</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-muted">
              {copy.footer.welcomeBody}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#enquire" className="btn-primary w-full sm:w-auto">
                {copy.footer.welcomePrimary}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={whatsappHref("Hi Iron Temple Gym, I'd like to book a free trial.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {copy.common.whatsapp}
              </a>
            </div>

            <p className="mt-4 flex items-center gap-2 font-label text-[9.5px] uppercase tracking-[0.18em] text-muted/80">
              <Phone className="h-3 w-3 text-accent" aria-hidden="true" />
              Or call the front desk on{" "}
              <a href={telHref()} className="text-text/80 underline-offset-4 transition-colors hover:text-accent hover:underline">
                {contact.phone}
              </a>
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="h-full border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="index-label">Right now</p>
              <FooterStatus />

              <div className="mt-8 border-t border-border pt-5">
                <p className="index-label">The address</p>
                <address className="mt-3 not-italic text-[14px] leading-relaxed text-text/85">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line mt-4"
                >
                  Get directions
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Directory */}
        <div className="grid gap-10 border-t border-border py-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.1fr_0.9fr] lg:gap-12">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-muted">
              {copy.footer.blurb}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${brand.name} on Instagram`}
                className="grid h-10 w-10 place-items-center border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${brand.name} on Google Maps`}
                className="grid h-10 w-10 place-items-center border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={telHref()}
                aria-label={`Call ${brand.name}`}
                className="grid h-10 w-10 place-items-center border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <p className="index-label text-text">{copy.footer.quickLinksLabel}</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[12.5px] text-muted transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#enquire" className="text-[12.5px] text-muted transition-colors hover:text-accent">
                  Free trial
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="index-label text-text">{copy.footer.contactLabel}</p>
            <ul className="mt-4 space-y-3 text-[12.5px] leading-relaxed text-muted">
              <li>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 transition-colors hover:text-accent"
                >
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </a>
              </li>
              <li>
                <a href={telHref()} className="flex items-center gap-2 transition-colors hover:text-accent">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Instagram className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  {contact.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="index-label text-text">{copy.footer.hoursLabel}</p>
            <dl className="mt-4 space-y-2.5">
              {groupedHours.map((group) => (
                <div key={group.label}>
                  <dt className="font-label text-[9px] uppercase tracking-[0.16em] text-muted">
                    {group.label}
                  </dt>
                  <dd className="text-[12px] tabular-nums text-text/80">{group.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[10.5px] leading-relaxed text-muted/70">
              {copy.footer.hoursNote}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pb-24 pt-6 sm:flex-row sm:items-center sm:justify-between md:pb-8">
          <p className="font-label text-[9px] uppercase tracking-[0.16em] text-muted">
            © {year} {brand.name}. {copy.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <p className="max-w-md text-[10px] leading-relaxed text-muted/60">
              {copy.footer.photoCredit}
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 font-label text-[9px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
            >
              {copy.footer.backToTop}
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
