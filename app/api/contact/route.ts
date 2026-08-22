import { NextRequest, NextResponse } from "next/server";
import {
  EMAIL_PATTERN,
  PHONE_PATTERN,
  getContactServiceBySlug,
  normalizeLongText,
  normalizeText,
} from "@/lib/form-utils";
import { getMailSettings, sendEmailWithResend } from "@/lib/email";
import {
  getBrandEmailAttachments,
  renderContactInquiryEmail,
} from "@/lib/email-templates";

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
  const message = normalizeLongText(payload.message);
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

  const html = renderContactInquiryEmail({
    name,
    email,
    phone,
    company,
    serviceTitle: safeService.title,
    serviceCategory: safeService.category,
    serviceDesc: safeService.desc,
    message,
  });

  const result = await sendEmailWithResend({
    from,
    to: [to],
    reply_to: [email],
    subject: emailSubject,
    html,
    text: plainText,
    attachments: getBrandEmailAttachments(),
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
