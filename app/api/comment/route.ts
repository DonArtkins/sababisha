import { NextRequest, NextResponse } from "next/server";
import {
  EMAIL_PATTERN,
  getArticleCommentSourceLabel,
  getCommentArticleBySlug,
  normalizeLongText,
  normalizeText,
} from "@/lib/form-utils";
import { getMailSettings, sendEmailWithResend } from "@/lib/email";
import {
  getBrandEmailAttachments,
  renderArticleCommentEmail,
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

function getSiteUrl() {
  return (process.env.SITE_URL?.trim() || "https://sababisha.com").replace(
    /\/$/,
    "",
  );
}

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse(400, {
      ok: false,
      message: "We could not read the comment details. Please refresh and try again.",
    });
  }

  if (!isRecord(payload)) {
    return jsonResponse(400, {
      ok: false,
      message: "Invalid comment details. Please refresh and try again.",
    });
  }

  const website = normalizeText(payload.website, 120);
  if (website) {
    return jsonResponse(200, {
      ok: true,
      message: "Thanks. Your comment has been received.",
    });
  }

  const name = normalizeText(payload.name, 80);
  const email = normalizeText(payload.email, 120).toLowerCase();
  const message = normalizeLongText(payload.message);
  const articleSlug = normalizeText(payload.articleSlug, 200);
  const article = getCommentArticleBySlug(payload.source, articleSlug);
  const errors: FieldErrors = {};

  if (name.length < 2) errors.name = "Enter your full name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
  if (message.length < 10) errors.message = "Add at least 10 characters to your comment.";
  if (!article) errors.articleSlug = "We could not identify this article. Please refresh and try again.";

  if (Object.keys(errors).length > 0) {
    return jsonResponse(422, {
      ok: false,
      message: "Please correct the highlighted fields.",
      errors,
    });
  }

  const safeArticle = article!;
  const sourceLabel = getArticleCommentSourceLabel(safeArticle.source);
  const articleUrl = `${getSiteUrl()}${safeArticle.slug}`;
  const { from, to } = getMailSettings();
  const emailSubject = `New ${sourceLabel} comment: ${safeArticle.title}`;
  const plainText = [
    `New ${sourceLabel} comment from sababisha.com`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Article details:",
    `Title: ${safeArticle.title}`,
    `Type: ${sourceLabel}`,
    `Category: ${safeArticle.category}`,
    `Author: ${safeArticle.author}`,
    `Date: ${safeArticle.date}`,
    `URL: ${articleUrl}`,
    "",
    "Excerpt:",
    safeArticle.excerpt,
    "",
    "Comment:",
    message,
  ].join("\n");

  const html = renderArticleCommentEmail({
    name,
    email,
    message,
    sourceLabel,
    articleTitle: safeArticle.title,
    articleCategory: safeArticle.category,
    articleAuthor: safeArticle.author,
    articleDate: safeArticle.date,
    articleExcerpt: safeArticle.excerpt,
    articleUrl,
  });

  const result = await sendEmailWithResend({
    from,
    to: [to],
    reply_to: [email],
    subject: emailSubject,
    html,
    text: plainText,
    attachments: getBrandEmailAttachments(),
    tags: [
      { name: "source", value: "article_comment" },
      { name: "article_type", value: safeArticle.source },
    ],
  });

  if (!result.ok) {
    return jsonResponse(502, {
      ok: false,
      message: result.message || "We could not send your comment. Please try again.",
    });
  }

  return jsonResponse(200, {
    ok: true,
    message: "Thanks. Your comment has been sent to Sababisha Solutions.",
    id: result.id,
  });
}
