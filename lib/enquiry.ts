/** Scrolls smoothly to a section by id. */
export function scrollToId(id: string): void {
  if (typeof window === "undefined") return;
  const target = document.getElementById(id);
  target?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
}
