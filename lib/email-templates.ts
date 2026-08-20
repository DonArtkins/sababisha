import { readFileSync } from "node:fs";
import { join } from "node:path";
import { escapeHtml } from "@/lib/form-utils";

const BRAND = {
  bg: "#EFEFEF",
  card: "#FFFFFF",
  ink: "#111111",
  muted: "#666666",
  accent: "#FF5A36",
  border: "#EEEEEE",
  soft: "#FAFAFA",
} as const;

const FONT_SANS =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const FONT_DISPLAY = "'DM Serif Display', Georgia, 'Times New Roman', serif";

/** Inline CID refs — images are attached by Resend, not loaded from the public web. */
export const EMAIL_CID = {
  logo: "sababisha-logo",
  swervy: "sababisha-swervy",
} as const;

export type EmailInlineAttachment = {
  content: string;
  filename: string;
  content_type: string;
  content_id: string;
};

function getSiteUrl() {
  return (process.env.SITE_URL?.trim() || "https://sababisha.com").replace(
    /\/$/,
    "",
  );
}

function readPublicPngBase64(relativePath: string) {
  const absolute = join(process.cwd(), "public", relativePath);
  return readFileSync(absolute).toString("base64");
}

/** Brand images embedded in every branded notification email. */
export function getBrandEmailAttachments(): EmailInlineAttachment[] {
  return [
    {
      content: readPublicPngBase64("logo.png"),
      filename: "logo.png",
      content_type: "image/png",
      content_id: EMAIL_CID.logo,
    },
    {
      content: readPublicPngBase64("email/swervy-underline.png"),
      filename: "swervy-underline.png",
      content_type: "image/png",
      content_id: EMAIL_CID.swervy,
    },
  ];
}

function swervyUnderline(width = 140) {
  return `
    <img
      src="cid:${EMAIL_CID.swervy}"
      width="${width}"
      height="10"
      alt=""
      style="display: block; width: ${width}px; max-width: 100%; height: 10px; border: 0; outline: none; margin: 0; padding: 0;"
    />
  `;
}

/** Accent-colored text with the brand swervy snug underneath — like the site headings. */
function accentWithSwervy(
  text: string,
  options: {
    fontFamily: string;
    fontSize: string;
    fontWeight?: string;
    fontStyle?: string;
    letterSpacing?: string;
    textTransform?: string;
    lineHeight?: string;
    underlineWidth: number;
  },
) {
  const {
    fontFamily,
    fontSize,
    fontWeight = "400",
    fontStyle = "normal",
    letterSpacing = "normal",
    textTransform = "none",
    lineHeight = "1.05",
    underlineWidth,
  } = options;

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display: inline-table; vertical-align: baseline;">
      <tr>
        <td align="left" style="padding: 0; margin: 0; font-family: ${fontFamily}; font-size: ${fontSize}; line-height: ${lineHeight}; letter-spacing: ${letterSpacing}; text-transform: ${textTransform}; color: ${BRAND.accent}; font-weight: ${fontWeight}; font-style: ${fontStyle};">
          ${escapeHtml(text)}
        </td>
      </tr>
      <tr>
        <td align="left" style="padding: 1px 0 0; margin: 0; line-height: 0; font-size: 0;">
          ${swervyUnderline(underlineWidth)}
        </td>
      </tr>
    </table>
  `;
}

function estimateUnderlineWidth(
  text: string,
  fontSizePx: number,
  options?: { tracked?: boolean },
) {
  // Approximate glyph width so the stroke tracks the accent word only
  const factor = options?.tracked ? 0.78 : 0.55;
  return Math.min(220, Math.max(40, Math.round(text.length * fontSizePx * factor)));
}

function brandedHeader() {
  // Matches navbar: w-14 h-14 circle, white bg, shadow-md, ring-2 ring-foreground/10, logo p-1
  const logoSize = 56;
  const logoPad = 4;
  const logoInner = logoSize - logoPad * 2;
  const slogan = "We make it happen";

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 28px;">
      <tr>
        <td align="left">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="left" style="padding-bottom: 12px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate;">
                  <tr>
                    <td
                      align="center"
                      valign="middle"
                      width="${logoSize}"
                      height="${logoSize}"
                      style="width: ${logoSize}px; height: ${logoSize}px; background: #ffffff; border-radius: 999px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1); border: 2px solid rgba(17,17,17,0.1); padding: ${logoPad}px;"
                    >
                      <img
                        src="cid:${EMAIL_CID.logo}"
                        width="${logoInner}"
                        height="${logoInner}"
                        alt="Sababisha Solutions Logo"
                        style="display: block; width: ${logoInner}px; height: ${logoInner}px; border: 0; border-radius: 999px; object-fit: contain;"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="left" style="padding-bottom: 4px;">
                <p style="margin: 0; font-family: ${FONT_DISPLAY}; font-size: 24px; line-height: 1; letter-spacing: -0.025em; color: #111111; font-weight: 700;">
                  Sababisha Solutions
                </p>
              </td>
            </tr>
            <tr>
              <td align="left">
                ${accentWithSwervy(slogan, {
                  fontFamily: FONT_SANS,
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  lineHeight: "1",
                  underlineWidth: estimateUnderlineWidth(slogan, 10, { tracked: true }),
                })}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

function brandedFooter(note: string) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 32px;">
      <tr>
        <td style="padding-top: 24px; border-top: 1px solid ${BRAND.border};">
          <p style="margin: 0 0 8px; font-family: ${FONT_SANS}; font-size: 12px; line-height: 1.5; color: ${BRAND.muted};">
            ${escapeHtml(note)}
          </p>
          <p style="margin: 0; font-family: ${FONT_SANS}; font-size: 12px; line-height: 1.5; color: ${BRAND.muted};">
            <a href="${getSiteUrl()}" style="color: ${BRAND.accent}; text-decoration: none; font-weight: 700;">sababisha.com</a>
            &nbsp;·&nbsp; Sababisha Solutions Limited
          </p>
        </td>
      </tr>
    </table>
  `;
}

function sectionCard(title: string, bodyHtml: string) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 16px;">
      <tr>
        <td style="background: ${BRAND.soft}; border: 1px solid ${BRAND.border}; border-radius: 18px; padding: 18px 20px;">
          <p style="margin: 0 0 8px; font-family: ${FONT_SANS}; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: ${BRAND.accent}; font-weight: 700;">
            ${escapeHtml(title)}
          </p>
          <div style="font-family: ${FONT_SANS}; font-size: 15px; line-height: 1.65; color: ${BRAND.ink};">
            ${bodyHtml}
          </div>
        </td>
      </tr>
    </table>
  `;
}

function detailRow(label: string, valueHtml: string, isLast = false) {
  return `
    <tr>
      <td style="padding: 12px 0; ${isLast ? "" : `border-bottom: 1px solid ${BRAND.border};`} width: 34%; vertical-align: top; font-family: ${FONT_SANS}; font-size: 13px; color: ${BRAND.muted};">
        ${escapeHtml(label)}
      </td>
      <td style="padding: 12px 0; ${isLast ? "" : `border-bottom: 1px solid ${BRAND.border};`} vertical-align: top; font-family: ${FONT_SANS}; font-size: 15px; color: ${BRAND.ink}; font-weight: 700;">
        ${valueHtml}
      </td>
    </tr>
  `;
}

export function renderBrandedEmailShell(options: {
  preheader: string;
  eyebrow: string;
  title: string;
  accentWord?: string;
  bodyHtml: string;
  footerNote: string;
}) {
  const { preheader, eyebrow, title, accentWord, bodyHtml, footerNote } =
    options;

  const titleHtml = accentWord
    ? (() => {
        const idx = title.toLowerCase().indexOf(accentWord.toLowerCase());
        if (idx === -1) {
          return `<span style="color: ${BRAND.ink};">${escapeHtml(title)}</span>`;
        }
        const before = title.slice(0, idx);
        const match = title.slice(idx, idx + accentWord.length);
        const after = title.slice(idx + accentWord.length);
        // Accent word only gets the swervy — matches site section headings
        return `
          <span style="color: ${BRAND.ink};">${escapeHtml(before)}</span>${accentWithSwervy(match, {
            fontFamily: FONT_DISPLAY,
            fontSize: "32px",
            fontStyle: "italic",
            fontWeight: "400",
            lineHeight: "1.15",
            underlineWidth: estimateUnderlineWidth(match, 32),
          })}<span style="color: ${BRAND.ink};">${escapeHtml(after)}</span>
        `;
      })()
    : `<span style="color: ${BRAND.ink};">${escapeHtml(title)}</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(title)}</title>
  <!--[if !mso]><!-->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <!--<![endif]-->
</head>
<body style="margin: 0; padding: 0; background: ${BRAND.bg};">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; mso-hide: all;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: ${BRAND.bg}; margin: 0; padding: 0;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background: ${BRAND.card}; border-radius: 28px; border: 1px solid ${BRAND.border}; box-shadow: 0 18px 40px rgba(17,17,17,0.06); overflow: hidden;">
          <tr>
            <td style="padding: 36px 32px 40px; font-family: ${FONT_SANS}; color: ${BRAND.ink};">
              ${brandedHeader()}
              <p style="margin: 0 0 14px; font-family: ${FONT_SANS}; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: ${BRAND.accent}; font-weight: 700;">
                ${escapeHtml(eyebrow)}
              </p>
              <h1 style="margin: 0 0 28px; font-family: ${FONT_DISPLAY}; font-size: 32px; line-height: 1.15; font-weight: 400; letter-spacing: -0.02em;">
                ${titleHtml}
              </h1>
              ${bodyHtml}
              ${brandedFooter(footerNote)}
            </td>
          </tr>
        </table>
        <p style="margin: 20px 0 0; font-family: ${FONT_SANS}; font-size: 11px; color: ${BRAND.muted};">
          Fintech software · Enterprise systems · Digital transformation
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderContactInquiryEmail(input: {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceTitle: string;
  serviceCategory: string;
  serviceDesc: string;
  message: string;
}) {
  const {
    name,
    email,
    phone,
    company,
    serviceTitle,
    serviceCategory,
    serviceDesc,
    message,
  } = input;

  const details = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 24px;">
      <tbody>
        ${detailRow("Name", escapeHtml(name))}
        ${detailRow(
          "Email",
          `<a href="mailto:${escapeHtml(email)}" style="color: ${BRAND.accent}; text-decoration: none;">${escapeHtml(email)}</a>`,
        )}
        ${detailRow("Phone", escapeHtml(phone || "Not provided"))}
        ${detailRow("Company", escapeHtml(company || "Not provided"))}
        ${detailRow("Category", escapeHtml(serviceCategory), true)}
      </tbody>
    </table>
    ${sectionCard("Service summary", `<p style="margin: 0;">${escapeHtml(serviceDesc)}</p>`)}
    ${sectionCard(
      "Message",
      `<p style="margin: 0; white-space: pre-line;">${escapeHtml(message)}</p>`,
    )}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top: 8px;">
      <tr>
        <td style="border-radius: 999px; background: ${BRAND.accent};">
          <a href="mailto:${escapeHtml(email)}" style="display: inline-block; padding: 14px 22px; font-family: ${FONT_SANS}; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none;">
            Reply to ${escapeHtml(name.split(" ")[0] || "lead")}
          </a>
        </td>
      </tr>
    </table>
  `;

  return renderBrandedEmailShell({
    preheader: `New inquiry from ${name} · ${serviceTitle}`,
    eyebrow: "Sababisha website inquiry",
    title: serviceTitle,
    accentWord: serviceTitle.split(" ").slice(-1)[0],
    bodyHtml: details,
    footerNote:
      "This notification was sent from the contact form on sababisha.com. Reply to this email to reach the visitor directly.",
  });
}

export function renderNewsletterSignupEmail(input: { email: string }) {
  const { email } = input;

  const body = `
    <p style="margin: 0 0 22px; font-family: ${FONT_SANS}; font-size: 16px; line-height: 1.6; color: ${BRAND.muted};">
      A new reader joined the Sababisha newsletter from the website footer.
    </p>
    ${sectionCard(
      "Subscriber",
      `<p style="margin: 0; font-size: 18px; font-weight: 700;">
        <a href="mailto:${escapeHtml(email)}" style="color: ${BRAND.accent}; text-decoration: none;">${escapeHtml(email)}</a>
      </p>
      <p style="margin: 10px 0 0; color: ${BRAND.muted}; font-size: 14px;">Source: Website footer</p>`,
    )}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top: 8px;">
      <tr>
        <td style="border-radius: 999px; background: ${BRAND.ink};">
          <a href="mailto:${escapeHtml(email)}" style="display: inline-block; padding: 14px 22px; font-family: ${FONT_SANS}; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none;">
            Email subscriber
          </a>
        </td>
      </tr>
    </table>
  `;

  return renderBrandedEmailShell({
    preheader: `${email} subscribed from the website footer`,
    eyebrow: "Newsletter signup",
    title: "New subscriber",
    accentWord: "subscriber",
    bodyHtml: body,
    footerNote:
      "This notification was sent from the newsletter form on sababisha.com.",
  });
}
