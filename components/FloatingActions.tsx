import { ArrowUpRight, Phone } from "lucide-react";
import { copy, contact } from "@/data/gym";
import { telHref, whatsappHref } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 448 512"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

export default function FloatingActions() {
  return (
    <aside aria-label="Quick contact">
      <a
        href={whatsappHref("Hi Iron Temple Gym, I'd like to book a free trial.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.floating.whatsappLabel}
        className="group fixed bottom-[calc(76px+env(safe-area-inset-bottom))] right-4 z-40 md:bottom-6 md:right-6"
      >
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-sharp border border-border bg-surface px-3 py-1.5 font-label text-[9px] uppercase tracking-[0.16em] text-text opacity-0 shadow-lift transition-opacity duration-200 group-hover:opacity-100 md:block">
          WhatsApp us
        </span>
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-black shadow-[0_12px_36px_-8px_rgba(37,211,102,0.5)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-[#25D366]/40 motion-safe:animate-[pulse-dot_3s_ease-in-out_infinite]"
          />
          <WhatsAppIcon className="h-7 w-7" />
        </span>
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur-xl safe-bottom md:hidden">
        <div className="grid grid-cols-2 gap-px bg-border">
          <a
            href={telHref()}
            aria-label={`Call ${contact.phone}`}
            className="flex min-h-[58px] items-center justify-center gap-2 bg-bg font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-text transition-colors active:bg-elevated"
          >
            <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
            {copy.floating.callLabel}
          </a>
          <a
            href="#enquire"
            className="flex min-h-[58px] items-center justify-center gap-2 bg-accent font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition-colors active:bg-accentHover"
          >
            {copy.floating.enquireLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </aside>
  );
}
