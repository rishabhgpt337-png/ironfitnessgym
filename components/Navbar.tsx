"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/Logo";
import { contact, navLinks } from "@/data/gym";
import { cn, focusRing, telHref } from "@/lib/utils";
import { scrollToId } from "@/lib/enquiry";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.replace("#", "")))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.classList.add("drawer-open");
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("drawer-open");
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled || open
            ? "border-b border-border bg-bg/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-edge flex h-[72px] items-center justify-between gap-6 lg:h-20">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    focusRing,
                    "relative py-2 font-label text-[10.5px] font-medium uppercase tracking-[0.18em] transition-colors duration-200",
                    isActive ? "text-text" : "text-muted hover:text-text",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300",
                      isActive ? "w-full" : "w-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={telHref()}
              className="hidden items-center gap-2 font-label text-[10.5px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-text xl:flex"
            >
              <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {contact.phone}
            </a>

            <button
              type="button"
              onClick={() => scrollToId("enquire")}
              className="btn-primary hidden min-h-[42px] px-5 py-2.5 text-[10px] sm:inline-flex"
            >
              Free trial
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={cn(
                focusRing,
                "grid h-10 w-10 place-items-center border border-border text-text transition-colors hover:border-accent hover:text-accent lg:hidden",
              )}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-black/80"
            />
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col border-l border-border bg-bg"
            >
              <div className="flex h-[72px] items-center justify-between border-b border-border px-5">
                <Logo />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className={cn(
                    focusRing,
                    "grid h-10 w-10 place-items-center border border-border text-text transition-colors hover:border-accent hover:text-accent",
                  )}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
                <ul>
                  {navLinks.map((link, index) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          focusRing,
                          "group flex items-baseline justify-between border-b border-border py-4",
                        )}
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-label text-[9px] tracking-[0.2em] text-muted">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-[1.9rem] uppercase leading-none text-text transition-colors group-hover:text-accent">
                            {link.label}
                          </span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-border p-5 safe-bottom">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    scrollToId("enquire");
                  }}
                  className="btn-primary w-full"
                >
                  Book a free trial
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <a
                  href={telHref()}
                  className="mt-3 flex items-center justify-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-muted"
                >
                  <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {contact.phone}
                </a>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
