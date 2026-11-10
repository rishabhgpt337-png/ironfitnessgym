import { ArrowUp, ArrowUpRight, Instagram, MapPin, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { brand, contact, copy, navLinks } from "@/data/gym";
import { getGroupedHours } from "@/lib/hours";
import { telHref } from "@/lib/utils";

export default function Footer() {
  const groupedHours = getGroupedHours();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <div className="container-edge pb-28 pt-16 md:pb-12 lg:pt-20">
        <div className="grid gap-11 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1.1fr_0.9fr]">
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

          <div>
            <p className="index-label text-text">{copy.footer.hoursLabel}</p>
            <dl className="mt-4 space-y-2">
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
              Holiday hours can differ.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
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
