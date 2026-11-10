import { NextResponse } from "next/server";
import { normalizeIndianMobile } from "@/lib/utils";

export const dynamic = "force-dynamic";

type InquiryBody = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  goal?: unknown;
  timing?: unknown;
  plan?: unknown;
  message?: unknown;
  website?: unknown;
};

const recentSubmissions = new Map<string, number>();
const SERVER_RATE_LIMIT_MS = 10_000;

function asText(value: unknown, maxLength = 600): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: InquiryBody;

  try {
    body = (await request.json()) as InquiryBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — accept silently so bots get no feedback.
  if (asText(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = asText(body.name, 120);
  const phone = normalizeIndianMobile(asText(body.phone, 30));
  const email = asText(body.email, 160);
  const goal = asText(body.goal, 80);
  const timing = asText(body.timing, 40);
  const plan = asText(body.plan, 80);
  const message = asText(body.message, 1200);

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please provide your name." }, { status: 400 });
  }

  if (!phone) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid Indian mobile number." },
      { status: 400 },
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email." }, { status: 400 });
  }

  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const clientIp = forwarded.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const lastSubmission = recentSubmissions.get(clientIp);

  if (lastSubmission && now - lastSubmission < SERVER_RATE_LIMIT_MS) {
    return NextResponse.json(
      { ok: false, error: "Please wait a few seconds before trying again." },
      { status: 429 },
    );
  }

  if (recentSubmissions.size > 500) {
    for (const [key, timestamp] of recentSubmissions) {
      if (now - timestamp > SERVER_RATE_LIMIT_MS) recentSubmissions.delete(key);
    }
  }

  const key = process.env.WEB3FORMS_KEY?.trim();

  const payload = {
    access_key: key,
    subject: `Free trial enquiry — ${name}`,
    from_name: "Iron Temple Gym Website",
    replyto: email || undefined,
    name,
    phone: `+91 ${phone}`,
    email: email || "Not provided",
    goal: goal || "Not specified",
    timing: timing || "Not specified",
    plan: plan || "Not sure yet",
    message: message || "No message provided",
    page: "Website — free trial form",
    botcheck: "",
  };

  if (!key) {
    // Demo mode: no Web3Forms key configured. Log so the submission is not lost
    // during local development, and return success so the UI can be tested.
    console.info("[inquiry] WEB3FORMS_KEY is not set. Submission payload:", payload);
    recentSubmissions.set(clientIp, now);
    return NextResponse.json({ ok: true, demo: true });
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = (await response.json().catch(() => null)) as
      | { success?: boolean; message?: string }
      | null;

    if (!response.ok || !result?.success) {
      console.error("[inquiry] Web3Forms rejected the submission:", result?.message ?? response.status);
      return NextResponse.json(
        { ok: false, error: "The enquiry could not be delivered. Please try WhatsApp." },
        { status: 502 },
      );
    }

    recentSubmissions.set(clientIp, now);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[inquiry] Web3Forms request failed:", error);
    return NextResponse.json(
      { ok: false, error: "The enquiry could not be delivered. Please try WhatsApp." },
      { status: 502 },
    );
  }
}
