import { ArrowUp, ArrowUpRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { brand, contact, copy, navLinks } from "@/data/gym";
import { getGroupedHours } from "@/lib/hours";
import { telHref } from "@/lib/utils";

export default function Footer() {
  const groupedHours = getGroupedHours();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg">
      <div className="container-edge pb-28 pt-16 md:pb-10 lg:pt-20">
        <div className="grid gap-11 md:grid-cols-2 lg:grid-cols-[1.35fr_0.7fr_1fr_0.9fr]">
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
                className="grid h-10 w-10 place-items-center rounded-sharp border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${brand.name} on Google Maps`}
                className="grid h-10 w-10 place-items-center rounded-sharp border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={telHref()}
                aria-label={`Call ${brand.name}`}
                className="grid h-10 w-10 place-items-center rounded-sharp border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-label text-[9.5px] font-semibold uppercase tracking-[0.24em] text-text">
              {copy.footer.quickLinksLabel}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="link-underline font-label text-[10.5px] uppercase tracking-[0.12em]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#enquire"
                  className="link-underline font-label text-[10.5px] uppercase tracking-[0.12em]"
                >
                  Free Trial
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-label text-[9.5px] font-semibold uppercase tracking-[0.24em] text-text">
              {copy.footer.contactLabel}
            </p>
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
                <a
                  href={telHref()}
                  className="flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 break-all transition-colors hover:text-accent"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
            </ul>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-1.5 font-label text-[9.5px] font-semibold uppercase tracking-[0.16em] text-accent"
            >
              Get directions
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <div>
            <p className="font-label text-[9.5px] font-semibold uppercase tracking-[0.24em] text-text">
              {copy.footer.hoursLabel}
            </p>
            <dl className="mt-4 space-y-2.5">
              {groupedHours.map((group) => (
                <div key={group.label} className="flex flex-col gap-0.5">
                  <dt className="font-label text-[9px] uppercase tracking-[0.16em] text-muted">
                    {group.label}
                  </dt>
                  <dd className="text-[12px] tabular-nums text-text/80">{group.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href="#timings"
              className="mt-3 inline-block font-label text-[9px] uppercase tracking-[0.16em] text-muted underline decoration-border underline-offset-4 transition-colors hover:text-accent"
            >
              Full timetable
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-label text-[9px] uppercase tracking-[0.16em] text-muted">
            © {year} {brand.name}. {copy.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <p className="font-label text-[9px] uppercase tracking-[0.16em] text-muted">
              {brand.city} · {brand.region} · {brand.country}
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 font-label text-[9px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
            >
              {copy.footer.backToTop}
              <ArrowUp
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none h-16 overflow-hidden border-t border-border/40 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_26px)] md:h-24"
      >
        <div className="h-full bg-[linear-gradient(to_right,rgba(255,90,31,0.10),transparent_55%)]" />
      </div>
    </footer>
  );
}
