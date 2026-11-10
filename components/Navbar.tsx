"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { navLinks } from "@/data/gym";
import { cn, focusRing } from "@/lib/utils";
import { scrollToId } from "@/lib/enquiry";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((link) => link.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-42% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 120) {
        setActive("#contact");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.classList.add("drawer-open");
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const root = drawerRef.current;
      if (!root) return;

      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;

      if (event.shiftKey) {
        if (current === first || !root.contains(current)) {
          event.preventDefault();
          last.focus();
        }
      } else if (current === last || !root.contains(current)) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("drawer-open");
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  const handleNav = (href: string) => {
    setActive(href);
    setOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || open
            ? "border-b border-border/70 bg-bg/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-edge flex h-[72px] items-center justify-between gap-5 sm:h-20">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-7">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNav(link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    focusRing,
                    "group relative py-2 font-label text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-200",
                    isActive ? "text-text" : "text-muted hover:text-text",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("enquire")}
              className="btn-primary hidden min-h-[42px] px-5 py-2.5 text-[11px] sm:inline-flex"
            >
              Join Now
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
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
                "grid h-11 w-11 place-items-center rounded-sharp border border-border/80 text-text transition-colors hover:border-accent hover:text-accent lg:hidden",
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
              className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: "100%" }}
              transition={{ type: "tween", duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col border-l border-border bg-surface shadow-2xl"
            >
              <div className="flex h-[72px] items-center justify-between border-b border-border/70 px-5 sm:h-20">
                <Logo />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className={cn(
                    focusRing,
                    "grid h-11 w-11 place-items-center rounded-sharp border border-border text-text transition-colors hover:border-accent hover:text-accent",
                  )}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => {
                    const isActive = active === link.href;
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={() => handleNav(link.href)}
                          aria-current={isActive ? "true" : undefined}
                          className={cn(
                            focusRing,
                            "group flex items-center justify-between border-b border-border/50 py-3.5 font-display text-2xl uppercase tracking-wide transition-colors",
                            isActive ? "text-accent" : "text-text hover:text-accent",
                          )}
                        >
                          <span className="flex items-baseline gap-3">
                            <span className="font-label text-[10px] tracking-[0.2em] text-muted">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {link.label}
                          </span>
                          <ArrowUpRight
                            className="h-4 w-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-border/70 p-5 safe-bottom">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    scrollToId("enquire");
                  }}
                  className="btn-primary w-full"
                >
                  Book a Free Trial
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="mt-3 text-center font-label text-[10px] uppercase tracking-[0.24em] text-muted">
                  Mumbai · Seven days a week
                </p>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
