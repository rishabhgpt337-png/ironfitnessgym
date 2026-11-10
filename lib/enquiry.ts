export const ENQUIRY_PLAN_EVENT = "iron-temple:enquiry-plan";

export type EnquiryPlanDetail = { planId?: string };

/** Scrolls to the inquiry form and, optionally, pre-selects a plan. */
export function openEnquiry(planId?: string): void {
  if (typeof window === "undefined") return;

  if (planId) {
    window.dispatchEvent(
      new CustomEvent<EnquiryPlanDetail>(ENQUIRY_PLAN_EVENT, { detail: { planId } }),
    );
  }

  const target = document.getElementById("enquire");
  target?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
}

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
