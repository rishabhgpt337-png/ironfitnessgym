"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import {
  contact,
  copy,
  inquiryGoals,
  inquiryTimings,
  plans,
} from "@/data/gym";
import { ENQUIRY_PLAN_EVENT, type EnquiryPlanDetail } from "@/lib/enquiry";
import {
  cn,
  focusRing,
  normalizeIndianMobile,
  telHref,
  whatsappHref,
} from "@/lib/utils";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  goal: string;
  timing: string;
  planId: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  goal: "",
  timing: "",
  planId: "",
  message: "",
  website: "",
};

const RATE_LIMIT_KEY = "iron-temple:last-inquiry";
const RATE_LIMIT_MS = 30_000;

const inputIds = {
  name: "name",
  phone: "phone",
  email: "email",
  goal: "goal",
  timing: "timing",
  planId: "plan",
  message: "message",
} as const;

export default function InquiryForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formError, setFormError] = useState("");
  const [planPrefilled, setPlanPrefilled] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onPlanSelected = (event: Event) => {
      const detail = (event as CustomEvent<EnquiryPlanDetail>).detail;
      if (!detail?.planId) return;
      setValues((current) => ({ ...current, planId: detail.planId ?? "" }));
      setPlanPrefilled(true);
    };

    window.addEventListener(ENQUIRY_PLAN_EVENT, onPlanSelected);
    return () => window.removeEventListener(ENQUIRY_PLAN_EVENT, onPlanSelected);
  }, []);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (formError) setFormError("");
  };

  const validate = (): boolean => {
    const next: FormErrors = {};

    if (values.name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }

    if (!normalizeIndianMobile(values.phone)) {
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (
      values.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())
    ) {
      next.email = "Enter a valid email address, or leave it blank.";
    }

    if (values.message.length > 600) {
      next.message = "Please keep it under 600 characters.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const plan = plans.find((item) => item.id === values.planId)?.name;
    const lines = [
      "Hi Iron Temple Gym, I'd like to book a free trial.",
      values.name.trim() ? `Name: ${values.name.trim()}` : "",
      values.phone.trim() ? `Phone: ${values.phone.trim()}` : "",
      values.goal ? `Goal: ${values.goal}` : "",
      values.timing ? `Preferred timing: ${values.timing}` : "",
      plan ? `Plan interest: ${plan}` : "",
      values.message.trim() ? `Message: ${values.message.trim()}` : "",
    ].filter(Boolean);

    return lines.join("\n");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    // Honeypot: silently accept so bots do not learn the trap.
    if (values.website.trim()) {
      setStatus("success");
      return;
    }

    if (!validate()) {
      window.setTimeout(() => {
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      }, 0);
      return;
    }

    try {
      const last = Number(window.localStorage.getItem(RATE_LIMIT_KEY) ?? 0);
      if (last && Date.now() - last < RATE_LIMIT_MS) {
        setFormError(copy.inquiry.rateLimitError);
        return;
      }
    } catch {
      // localStorage can be unavailable in private mode; fail open.
    }

    setStatus("submitting");

    const plan = plans.find((item) => item.id === values.planId)?.name ?? "";
    const payload = {
      name: values.name.trim(),
      phone: normalizeIndianMobile(values.phone) ?? values.phone.trim(),
      email: values.email.trim(),
      goal: values.goal,
      timing: values.timing,
      plan,
      message: values.message.trim(),
      website: values.website.trim(),
      page: "Iron Temple Gym — free trial form",
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      try {
        window.localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
      } catch {
        // Non-critical.
      }

      setStatus("success");
    } catch {
      setStatus("idle");
      setFormError(copy.inquiry.errorBanner);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setFormError("");
    setPlanPrefilled(false);
    setStatus("idle");
  };

  return (
    <section
      id="enquire"
      className="relative section-pad border-b border-border/70 bg-surface/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(255,77,0,0.06),transparent_55%)]"
      />
      <div className="container-edge relative">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionHeading
                eyebrow={copy.sections.inquiry.eyebrow}
                heading={copy.sections.inquiry.heading}
                accent={copy.sections.inquiry.accent}
                intro={copy.sections.inquiry.intro}
              />
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 space-y-3.5">
                {copy.sections.inquiry.bulletPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[14px] text-text/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-sharp border border-accent/30 bg-accent/10 text-accent">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8 rounded-card border border-border bg-bg/50 p-5">
                <p className="font-label text-[10px] uppercase tracking-[0.22em] text-muted">
                  {copy.inquiry.callLabel}
                </p>
                <div className="mt-3 space-y-2">
                  <a
                    href={telHref()}
                    className="group flex items-center gap-2.5 text-sm text-text transition-colors hover:text-accent"
                  >
                    <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                    {contact.phone}
                  </a>
                  <a
                    href={whatsappHref("Hi Iron Temple Gym, I'd like to know more about membership.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-sm text-text transition-colors hover:text-accent"
                  >
                    <MessageCircle className="h-4 w-4 text-accent" aria-hidden="true" />
                    {copy.common.whatsapp}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="group flex items-center gap-2.5 break-all text-sm text-text transition-colors hover:text-accent"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {contact.email}
                  </a>
                </div>
                <p className="mt-3 flex items-center gap-2 text-[11px] text-muted">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {copy.sections.inquiry.responseNote}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16} className="hidden lg:block">
              <div className="relative mt-5 overflow-hidden rounded-card border border-border">
                <SmartImage
                  src="/images/inquiry.webp"
                  alt="Empty barbell waiting on the gym floor"
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  variant="barbell"
                  className="aspect-[16/9] w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-4 font-display text-lg uppercase leading-tight tracking-wide text-white">
                  {copy.sections.inquiry.imageCaption}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <div className="relative overflow-hidden rounded-card border border-border bg-bg/80 shadow-lift">
              <div className="h-[3px] w-full bg-gradient-to-r from-accent via-accent to-transparent" />

              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    ref={successRef}
                    tabIndex={-1}
                    role="status"
                    aria-live="polite"
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[560px] flex-col items-center justify-center px-6 py-14 text-center sm:px-10"
                  >
                    <motion.span
                      initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.12, type: "spring", stiffness: 220, damping: 16 }}
                      className="relative grid h-20 w-20 place-items-center rounded-full border border-accent/40 bg-accent/10"
                    >
                      <span className="absolute inset-0 animate-ping rounded-full border border-accent/20 motion-reduce:animate-none" />
                      <Check className="h-9 w-9 text-accent" strokeWidth={2.5} aria-hidden="true" />
                    </motion.span>

                    <h3 className="mt-7 font-display text-3xl uppercase leading-none tracking-wide text-text sm:text-4xl">
                      {copy.inquiry.successTitle}
                    </h3>
                    <p className="mt-4 max-w-sm text-pretty text-[14px] leading-relaxed text-muted">
                      {values.name.trim()
                        ? `Thanks, ${values.name.trim().split(" ")[0]}. ${copy.inquiry.successBody}`
                        : copy.inquiry.successBody}
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {values.goal ? (
                        <span className="rounded-sharp border border-border px-2.5 py-1 font-label text-[9px] uppercase tracking-[0.16em] text-muted">
                          {values.goal}
                        </span>
                      ) : null}
                      {values.planId ? (
                        <span className="rounded-sharp border border-border px-2.5 py-1 font-label text-[9px] uppercase tracking-[0.16em] text-muted">
                          {plans.find((plan) => plan.id === values.planId)?.name}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-8 flex w-full max-w-xs flex-col gap-2.5">
                      <a
                        href={whatsappHref(buildWhatsAppMessage())}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn("btn-primary w-full", focusRing)}
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        {copy.inquiry.successWhatsapp}
                      </a>
                      <button
                        type="button"
                        onClick={resetForm}
                        className={cn("btn-secondary w-full", focusRing)}
                      >
                        {copy.inquiry.successAgain}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 sm:p-8"
                  >
                    <div className="mb-7 flex flex-col gap-1.5 border-b border-border/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
                      <h3 className="font-display text-2xl uppercase leading-none tracking-wide text-text sm:text-[28px]">
                        {copy.inquiry.formTitle}
                      </h3>
                      <p className="font-label text-[9px] uppercase tracking-[0.18em] text-muted">
                        {copy.inquiry.formNote}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                      {/* Honeypot */}
                      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input
                          id="website"
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={values.website}
                          onChange={(event) => update("website", event.target.value)}
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          id={inputIds.name}
                          label={copy.inquiry.nameLabel}
                          error={errors.name}
                          required
                        >
                          <input
                            id={inputIds.name}
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Your full name"
                            className="field"
                            value={values.name}
                            onChange={(event) => update("name", event.target.value)}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            required
                          />
                        </Field>

                        <Field
                          id={inputIds.phone}
                          label={copy.inquiry.phoneLabel}
                          error={errors.phone}
                          hint={copy.inquiry.phoneHint}
                          required
                        >
                          <input
                            id={inputIds.phone}
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="98765 43210"
                            className="field"
                            value={values.phone}
                            onChange={(event) => update("phone", event.target.value)}
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
                            required
                          />
                        </Field>

                        <Field
                          id={inputIds.email}
                          label={copy.inquiry.emailLabel}
                          optionalLabel={copy.inquiry.emailOptional}
                          error={errors.email}
                        >
                          <input
                            id={inputIds.email}
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="field"
                            value={values.email}
                            onChange={(event) => update("email", event.target.value)}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "email-error" : undefined}
                          />
                        </Field>

                        <Field id={inputIds.goal} label={copy.inquiry.goalLabel}>
                          <SelectShell>
                            <select
                              id={inputIds.goal}
                              name="goal"
                              className="field appearance-none pr-10"
                              value={values.goal}
                              onChange={(event) => update("goal", event.target.value)}
                            >
                              <option value="">{copy.inquiry.selectPlaceholder}</option>
                              {inquiryGoals.map((goal) => (
                                <option key={goal} value={goal}>
                                  {goal}
                                </option>
                              ))}
                            </select>
                          </SelectShell>
                        </Field>

                        <Field id={inputIds.timing} label={copy.inquiry.timingLabel}>
                          <SelectShell>
                            <select
                              id={inputIds.timing}
                              name="timing"
                              className="field appearance-none pr-10"
                              value={values.timing}
                              onChange={(event) => update("timing", event.target.value)}
                            >
                              <option value="">{copy.inquiry.selectPlaceholder}</option>
                              {inquiryTimings.map((timing) => (
                                <option key={timing} value={timing}>
                                  {timing}
                                </option>
                              ))}
                            </select>
                          </SelectShell>
                        </Field>

                        <Field
                          id={inputIds.planId}
                          label={copy.inquiry.planLabel}
                          hint={planPrefilled ? "Pre-selected from your chosen plan" : undefined}
                        >
                          <SelectShell accent={planPrefilled}>
                            <select
                              id={inputIds.planId}
                              name="plan"
                              className={cn(
                                "field appearance-none pr-10",
                                planPrefilled && "border-accent/60",
                              )}
                              value={values.planId}
                              onChange={(event) => {
                                update("planId", event.target.value);
                                setPlanPrefilled(false);
                              }}
                            >
                              <option value="">{copy.inquiry.planPlaceholder}</option>
                              {plans.map((plan) => (
                                <option key={plan.id} value={plan.id}>
                                  {plan.name} — {plan.tagline}
                                </option>
                              ))}
                            </select>
                          </SelectShell>
                        </Field>
                      </div>

                      <div className="mt-5">
                        <Field
                          id={inputIds.message}
                          label={copy.inquiry.messageLabel}
                          optionalLabel={copy.inquiry.messageOptional}
                          error={errors.message}
                        >
                          <textarea
                            id={inputIds.message}
                            name="message"
                            rows={4}
                            maxLength={600}
                            placeholder="Training history, injuries, or anything else we should know."
                            className="field resize-y"
                            value={values.message}
                            onChange={(event) => update("message", event.target.value)}
                            aria-invalid={Boolean(errors.message)}
                            aria-describedby={errors.message ? "message-error" : undefined}
                          />
                          <p className="mt-1.5 text-right font-label text-[9px] tabular-nums tracking-[0.14em] text-muted/60">
                            {values.message.length} / 600
                          </p>
                        </Field>
                      </div>

                      {formError ? (
                        <p
                          role="alert"
                          className="mt-5 flex items-start gap-2 rounded-sharp border border-[#ff7a5c]/40 bg-[#ff7a5c]/10 px-3.5 py-3 text-[12px] leading-relaxed text-[#FFB4A6]"
                        >
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                          {formError}
                        </p>
                      ) : null}

                      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className={cn("btn-primary flex-1", focusRing)}
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                              {copy.inquiry.submittingLabel}
                            </>
                          ) : (
                            <>
                              {copy.inquiry.submitLabel}
                              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </>
                          )}
                        </button>

                        <a
                          href={whatsappHref(buildWhatsAppMessage())}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn("btn-secondary sm:w-auto", focusRing)}
                        >
                          <MessageCircle className="h-4 w-4 text-[#4ADE80]" aria-hidden="true" />
                          {copy.inquiry.whatsappLabel}
                        </a>
                      </div>

                      <p className="mt-4 text-center text-[10.5px] leading-relaxed text-muted/70 sm:text-left">
                        {copy.inquiry.privacyNote}
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  optionalLabel,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  optionalLabel?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        <span>
          {label}
          {required ? <span className="ml-1 text-accent">*</span> : null}
        </span>
        {optionalLabel ? <span className="text-[9px] text-muted/60">{optionalLabel}</span> : null}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-[11.5px] text-[#FFB4A6]"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[10.5px] text-muted/70">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function SelectShell({ children, accent }: { children: ReactNode; accent?: boolean }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2",
          accent ? "text-accent" : "text-muted",
        )}
      />
    </div>
  );
}
