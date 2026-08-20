import { NextRequest, NextResponse } from "next/server";
import { EMAIL_PATTERN, normalizeText } from "@/lib/form-utils";
import { getMailSettings, sendEmailWithResend } from "@/lib/email";
import {
  getBrandEmailAttachments,
  renderNewsletterSignupEmail,
} from "@/lib/email-templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
      message: "We could not read the subscription details. Please try again.",
    });
  }

  if (!isRecord(payload)) {
    return jsonResponse(400, {
      ok: false,
      message: "Invalid subscription details. Please try again.",
    });
  }

  const website = normalizeText(payload.website, 120);
  if (website) {
    return jsonResponse(200, {
      ok: true,
      message: "Thanks. Your subscription has been received.",
    });
  }

  const email = normalizeText(payload.email, 120).toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    return jsonResponse(422, {
      ok: false,
      message: "Enter a valid email address.",
      errors: {
        email: "Enter a valid email address.",
      },
    });
  }

  const { from, to } = getMailSettings();
  const plainText = [
    "New Sababisha newsletter subscriber",
    "",
    `Email: ${email}`,
    `Source: Website footer`,
  ].join("\n");

  const html = renderNewsletterSignupEmail({ email });

  const result = await sendEmailWithResend({
    from,
    to: [to],
    reply_to: [email],
    subject: "New Sababisha newsletter subscriber",
    html,
    text: plainText,
    attachments: getBrandEmailAttachments(),
    tags: [{ name: "source", value: "newsletter_footer" }],
  });

  if (!result.ok) {
    return jsonResponse(502, {
      ok: false,
      message: result.message || "We could not complete the subscription. Please try again.",
    });
  }

  return jsonResponse(200, {
    ok: true,
    message: "Thanks. Your newsletter subscription has been sent.",
    id: result.id,
  });
}
