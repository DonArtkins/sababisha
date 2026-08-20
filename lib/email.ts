interface ResendEmailPayload {
  from: string;
  to: string[];
  reply_to?: string[];
  subject: string;
  html: string;
  text: string;
  tags?: Array<{
    name: string;
    value: string;
  }>;
  attachments?: Array<{
    content: string;
    filename: string;
    content_type?: string;
    content_id?: string;
  }>;
}

interface SendEmailResult {
  ok: boolean;
  id?: string;
  message?: string;
}

const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_FROM_EMAIL = "Sababisha Website <onboarding@resend.dev>";
const DEFAULT_TO_EMAIL = "support@sababisha.com";
const USER_AGENT = "sababisha-website/1.0";

export function getMailSettings() {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim() || "",
    from: process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO_EMAIL,
  };
}

export async function sendEmailWithResend(
  payload: ResendEmailPayload,
): Promise<SendEmailResult> {
  const { apiKey } = getMailSettings();

  if (!apiKey) {
    return {
      ok: false,
      message:
        "Email delivery is not configured. Add RESEND_API_KEY in Vercel environment variables.",
    };
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        typeof data?.message === "string"
          ? data.message
          : typeof data?.error?.message === "string"
            ? data.error.message
            : "Resend could not deliver the email.";

      return {
        ok: false,
        message,
      };
    }

    return {
      ok: true,
      id: typeof data?.id === "string" ? data.id : undefined,
    };
  } catch (error) {
    console.error("Resend delivery failed", error);
    return {
      ok: false,
      message: "The email service could not be reached. Please try again.",
    };
  }
}
