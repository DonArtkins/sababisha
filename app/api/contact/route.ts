import { NextRequest, NextResponse } from "next/server";
import {
  EMAIL_PATTERN,
  PHONE_PATTERN,
  escapeHtml,
  getContactServiceBySlug,
  normalizeLongText,
  normalizeText,
} from "@/lib/form-utils";
import { getMailSettings, sendEmailWithResend } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type FieldErrors = Record<string, string>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function jsonResponse(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse(400, {
      ok: false,
      message: "We could not read the form details. Please refresh and try again.",
    });
  }

  if (!isRecord(payload)) {
    return jsonResponse(400, {
      ok: false,
      message: "Invalid form details. Please refresh and try again.",
    });
  }

  const website = normalizeText(payload.website, 120);
  if (website) {
    return jsonResponse(200, {
      ok: true,
      message: "Thanks. Your inquiry has been received.",
    });
  }

  const name = normalizeText(payload.name, 80);
  const email = normalizeText(payload.email, 120).toLowerCase();
  const phone = normalizeText(payload.phone, 32);
  const company = normalizeText(payload.company, 120);
  const serviceSlug = normalizeText(payload.serviceSlug, 80);
  const message = normalizeLongText(payload.message, 1600);
  const service = getContactServiceBySlug(serviceSlug);
  const errors: FieldErrors = {};

  if (name.length < 2) errors.name = "Enter your full name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
  if (phone && !PHONE_PATTERN.test(phone)) errors.phone = "Enter a valid phone number.";
  if (!service) errors.serviceSlug = "Choose a service or select other.";
  if (message.length < 20) errors.message = "Add at least 20 characters about your inquiry.";

  if (Object.keys(errors).length > 0) {
    return jsonResponse(422, {
      ok: false,
      message: "Please correct the highlighted fields.",
      errors,
    });
  }

  const { from, to } = getMailSettings();
  const safeService = service!;
  const emailSubject = `New service inquiry: ${safeService.title}`;
  const plainText = [
    "New service inquiry from sababisha.com",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Company: ${company || "Not provided"}`,
    `Service: ${safeService.title}`,
    `Category: ${safeService.category}`,
    "",
    "Service summary:",
    safeService.desc,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111111; line-height: 1.6;">
      <p style="margin: 0 0 16px; color: #ff5a36; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px;">Sababisha website inquiry</p>
      <h1 style="margin: 0 0 20px; font-size: 28px;">${escapeHtml(safeService.title)}</h1>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tbody>
          <tr><td style="padding: 8px 0; color: #666666;">Name</td><td style="padding: 8px 0; font-weight: 700;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #666666;">Email</td><td style="padding: 8px 0; font-weight: 700;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding: 8px 0; color: #666666;">Phone</td><td style="padding: 8px 0; font-weight: 700;">${escapeHtml(phone || "Not provided")}</td></tr>
          <tr><td style="padding: 8px 0; color: #666666;">Company</td><td style="padding: 8px 0; font-weight: 700;">${escapeHtml(company || "Not provided")}</td></tr>
          <tr><td style="padding: 8px 0; color: #666666;">Category</td><td style="padding: 8px 0; font-weight: 700;">${escapeHtml(safeService.category)}</td></tr>
        </tbody>
      </table>
      <div style="border: 1px solid #eeeeee; border-radius: 18px; padding: 18px; margin-bottom: 18px; background: #fafafa;">
        <h2 style="font-size: 16px; margin: 0 0 8px;">Service summary</h2>
        <p style="margin: 0;">${escapeHtml(safeService.desc)}</p>
      </div>
      <div style="border: 1px solid #eeeeee; border-radius: 18px; padding: 18px;">
        <h2 style="font-size: 16px; margin: 0 0 8px;">Message</h2>
        <p style="white-space: pre-line; margin: 0;">${escapeHtml(message)}</p>
      </div>
    </div>
  `;

  const result = await sendEmailWithResend({
    from,
    to: [to],
    reply_to: [email],
    subject: emailSubject,
    html,
    text: plainText,
    tags: [{ name: "source", value: "contact_form" }],
  });

  if (!result.ok) {
    return jsonResponse(502, {
      ok: false,
      message: result.message || "We could not send your inquiry. Please try again.",
    });
  }

  return jsonResponse(200, {
    ok: true,
    message: "Thanks. Your inquiry has been sent to Sababisha Solutions.",
    id: result.id,
  });
}
