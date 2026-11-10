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
  MessageCircle,
  Phone,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { contact, copy, inquiryGoals, inquiryTimings } from "@/data/gym";
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
  message: "",
  website: "",
};

const RATE_LIMIT_KEY = "iron-temple:last-inquiry";
const RATE_LIMIT_MS = 30_000;

export default function InquiryForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formError, setFormError] = useState("");
  const successRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const section = copy.sections.enquiry;

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (formError) setFormError("");
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!normalizeIndianMobile(values.phone)) {
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = "Enter a valid email address, or leave it blank.";
    }
    if (values.message.length > 600) next.message = "Please keep it under 600 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      "Hi Iron Temple Gym, I'd like to book a free trial.",
      values.name.trim() ? `Name: ${values.name.trim()}` : "",
      values.phone.trim() ? `Phone: ${values.phone.trim()}` : "",
      values.goal ? `Goal: ${values.goal}` : "",
      values.timing ? `Preferred timing: ${values.timing}` : "",
      values.message.trim() ? `Message: ${values.message.trim()}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

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
        setFormError(copy.enquiry.rateLimitError);
        return;
      }
    } catch {
      // localStorage can be unavailable in private mode; fail open.
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: normalizeIndianMobile(values.phone) ?? values.phone.trim(),
          email: values.email.trim(),
          goal: values.goal,
          timing: values.timing,
          message: values.message.trim(),
          website: values.website.trim(),
          page: "Iron Temple Gym — free trial form",
        }),
      });

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      try {
        window.localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
      } catch {
        // Non-critical.
      }
      setStatus("success");
    } catch {
      setStatus("idle");
      setFormError(copy.enquiry.errorBanner);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setFormError("");
    setStatus("idle");
  };

  return (
    <section id="enquire" className="section-pad border-t border-border bg-surface">
      <div className="container-edge">
        <header className="grid gap-8 border-t border-border pt-5 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <p className="index-label flex items-center gap-3">
              <span className="text-accent">{section.index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-border" />
              <span>{section.eyebrow}</span>
            </p>
            <h2 className="display mt-5">
              <span className="block">{section.heading}</span>
              <span className="block text-accent">{section.accent}</span>
            </h2>
          </div>
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-pretty text-[15px] leading-relaxed text-muted">
                {section.intro}
              </p>
              <ul className="mt-8 space-y-4">
                {section.bulletPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[14px] text-text/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 border-t border-border pt-6">
                <p className="index-label">{copy.enquiry.callLabel}</p>
                <div className="mt-4 space-y-3">
                  <a
                    href={telHref()}
                    className="flex items-center gap-3 text-[14px] text-text transition-colors hover:text-accent"
                  >
                    <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                    {contact.phone}
                  </a>
                  <a
                    href={whatsappHref("Hi Iron Temple Gym, I'd like to know more about membership.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[14px] text-text transition-colors hover:text-accent"
                  >
                    <MessageCircle className="h-4 w-4 text-accent" aria-hidden="true" />
                    {copy.common.whatsapp}
                  </a>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[14px] text-text transition-colors hover:text-accent"
                  >
                    <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden="true" />
                    {contact.instagramHandle}
                  </a>
                </div>
                <p className="mt-5 flex items-center gap-2 text-[11px] text-muted">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {section.responseNote}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.04} className="lg:col-span-7">
            <div className="border border-border bg-bg">
              <div className="h-[2px] w-full bg-accent" />

              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    ref={successRef}
                    tabIndex={-1}
                    role="status"
                    aria-live="polite"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex min-h-[520px] flex-col items-start justify-center px-6 py-14 sm:px-10"
                  >
                    <span className="grid h-12 w-12 place-items-center border border-accent/40 bg-accent/10">
                      <Check className="h-6 w-6 text-accent" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-[2rem] uppercase leading-none text-text">
                      {copy.enquiry.successTitle}
                    </h3>
                    <p className="mt-4 max-w-sm text-pretty text-[14px] leading-relaxed text-muted">
                      {values.name.trim()
                        ? `Thanks, ${values.name.trim().split(" ")[0]}. `
                        : ""}
                      {copy.enquiry.successBody}
                    </p>
                    <div className="mt-8 flex w-full max-w-xs flex-col gap-2.5">
                      <a
                        href={whatsappHref(buildWhatsAppMessage())}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn("btn-primary w-full", focusRing)}
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        {copy.enquiry.successWhatsapp}
                      </a>
                      <button
                        type="button"
                        onClick={resetForm}
                        className={cn("btn-secondary w-full", focusRing)}
                      >
                        {copy.enquiry.successAgain}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 sm:p-8"
                  >
                    <div className="mb-6 flex flex-col gap-1 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
                      <h3 className="font-display text-[1.7rem] uppercase leading-none text-text">
                        {copy.enquiry.formTitle}
                      </h3>
                      <p className="font-label text-[9px] uppercase tracking-[0.18em] text-muted">
                        {copy.enquiry.formNote}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
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
                        <Field id="name" label={copy.enquiry.nameLabel} error={errors.name} required>
                          <input
                            id="name"
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
                          id="phone"
                          label={copy.enquiry.phoneLabel}
                          error={errors.phone}
                          hint={copy.enquiry.phoneHint}
                          required
                        >
                          <input
                            id="phone"
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
                          id="email"
                          label={copy.enquiry.emailLabel}
                          optionalLabel={copy.enquiry.emailOptional}
                          error={errors.email}
                        >
                          <input
                            id="email"
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

                        <Field id="goal" label={copy.enquiry.goalLabel}>
                          <SelectShell>
                            <select
                              id="goal"
                              name="goal"
                              className="field appearance-none pr-10"
                              value={values.goal}
                              onChange={(event) => update("goal", event.target.value)}
                            >
                              <option value="">{copy.enquiry.selectPlaceholder}</option>
                              {inquiryGoals.map((goal) => (
                                <option key={goal} value={goal}>
                                  {goal}
                                </option>
                              ))}
                            </select>
                          </SelectShell>
                        </Field>

                        <Field id="timing" label={copy.enquiry.timingLabel}>
                          <SelectShell>
                            <select
                              id="timing"
                              name="timing"
                              className="field appearance-none pr-10"
                              value={values.timing}
                              onChange={(event) => update("timing", event.target.value)}
                            >
                              <option value="">{copy.enquiry.selectPlaceholder}</option>
                              {inquiryTimings.map((timing) => (
                                <option key={timing} value={timing}>
                                  {timing}
                                </option>
                              ))}
                            </select>
                          </SelectShell>
                        </Field>
                      </div>

                      <div className="mt-5">
                        <Field
                          id="message"
                          label={copy.enquiry.messageLabel}
                          optionalLabel={copy.enquiry.messageOptional}
                          error={errors.message}
                        >
                          <textarea
                            id="message"
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
                        </Field>
                      </div>

                      {formError ? (
                        <p
                          role="alert"
                          className="mt-5 flex items-start gap-2 border border-[#ff7a5c]/40 bg-[#ff7a5c]/10 px-3.5 py-3 text-[12px] leading-relaxed text-[#FFB4A6]"
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
                              {copy.enquiry.submittingLabel}
                            </>
                          ) : (
                            <>
                              {copy.enquiry.submitLabel}
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
                          <MessageCircle className="h-4 w-4 text-[#5EDC8E]" aria-hidden="true" />
                          {copy.enquiry.whatsappLabel}
                        </a>
                      </div>

                      <p className="mt-4 text-[10.5px] leading-relaxed text-muted/70">
                        {copy.enquiry.privacyNote}
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
        <p id={`${id}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[11.5px] text-[#FFB4A6]">
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

function SelectShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      />
    </div>
  );
}
