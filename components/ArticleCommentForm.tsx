"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { CyberText } from "@/components/CyberText";
import { FormStatusModal } from "@/components/FormStatusModal";
import { EMAIL_PATTERN } from "@/lib/form-utils";
import { cn } from "@/lib/utils";

export type ArticleCommentSource = "rd-blog" | "ai-topic";

export type ArticleCommentMeta = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  slug: string;
};

type CommentFormData = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type CommentErrors = Partial<Record<keyof CommentFormData, string>>;

type ModalState = {
  status: "success" | "error";
  title: string;
  message: string;
};

const emptyForm: CommentFormData = {
  name: "",
  email: "",
  message: "",
  website: "",
};

function validateCommentForm(data: CommentFormData): CommentErrors {
  const errors: CommentErrors = {};

  if (data.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!EMAIL_PATTERN.test(data.email.trim())) errors.email = "Enter a valid email address.";
  if (data.message.trim().length < 10) {
    errors.message = "Add at least 10 characters to your comment.";
  }

  return errors;
}

interface ArticleCommentFormProps {
  source: ArticleCommentSource;
  article: ArticleCommentMeta;
}

export function ArticleCommentForm({ source, article }: ArticleCommentFormProps) {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const messageProgressRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<CommentFormData>(emptyForm);
  const [errors, setErrors] = useState<CommentErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);

  const updateMessageScrollProgress = () => {
    const textarea = messageRef.current;
    const progress = messageProgressRef.current;
    if (!textarea || !progress) return;

    const maxScroll = textarea.scrollHeight - textarea.clientHeight;
    const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, textarea.scrollTop / maxScroll)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
  };

  useEffect(() => {
    updateMessageScrollProgress();
  }, [formData.message]);

  const clearError = (field: keyof CommentFormData) => {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const updateField = (field: keyof CommentFormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
    clearError(field);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateCommentForm(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setModal({
        status: "error",
        title: "Check the form details",
        message: "Some fields need attention before we can send your comment.",
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source,
          articleSlug: article.slug,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        if (result?.errors && typeof result.errors === "object") {
          setErrors(result.errors);
        }
        setModal({
          status: "error",
          title: "Comment not sent",
          message:
            typeof result?.message === "string"
              ? result.message
              : "We could not send your comment. Please try again.",
        });
        return;
      }

      setFormData(emptyForm);
      setModal({
        status: "success",
        title: "Comment sent",
        message:
          "Your comment has been sent to Sababisha Solutions. Our team will review it and get back to you.",
      });
    } catch {
      setModal({
        status: "error",
        title: "Connection failed",
        message:
          "We could not reach the email service. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = (hasError?: boolean) =>
    cn(
      "w-full h-14 bg-gray-50 border rounded-2xl px-5 text-[#111111] placeholder:text-gray-400 outline-none transition-all interactive cursor-none",
      "focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)]",
      hasError ? "border-[#FF5A36] bg-[#FF5A36]/5" : "border-gray-200",
    );

  return (
    <div className="mt-16 pt-12 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-6 h-6 text-[#FF5A36]" />
        <h3 className="font-display text-3xl text-[#111111]">Leave a comment</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="article-comment-name" className="text-sm font-sans font-bold text-[#111111] ml-2">
              Name
            </label>
            <input
              id="article-comment-name"
              type="text"
              name="name"
              autoComplete="name"
              maxLength={9999}
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "article-comment-name-error" : undefined}
              className={inputClassName(Boolean(errors.name))}
            />
            {errors.name ? (
              <p id="article-comment-name-error" className="ml-2 text-xs font-semibold text-[#FF5A36]">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="article-comment-email" className="text-sm font-sans font-bold text-[#111111] ml-2">
              Email
            </label>
            <input
              id="article-comment-email"
              type="email"
              name="email"
              autoComplete="email"
              maxLength={9999}
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="your@email.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "article-comment-email-error" : undefined}
              className={inputClassName(Boolean(errors.email))}
            />
            {errors.email ? (
              <p id="article-comment-email-error" className="ml-2 text-xs font-semibold text-[#FF5A36]">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="article-comment-message" className="text-sm font-sans font-bold text-[#111111] ml-2">
            Message
          </label>
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border bg-gray-50 transition-all",
              "focus-within:border-[#FF5A36] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(255,90,54,0.1)]",
              errors.message ? "border-[#FF5A36] bg-[#FF5A36]/5" : "border-gray-200",
            )}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] bg-transparent">
              <div
                ref={messageProgressRef}
                className="h-full w-full origin-left bg-[#FF5A36]"
                style={{ transform: "scaleX(0)", willChange: "transform" }}
                aria-hidden="true"
              />
            </div>
            <textarea
              ref={messageRef}
              id="article-comment-message"
              name="message"
              rows={7}
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              onScroll={updateMessageScrollProgress}
              placeholder="Type your message here..."
              data-lenis-prevent
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "article-comment-message-error" : undefined}
              className={cn(
                "contact-message-scroll w-full resize-none border-0 bg-transparent p-5 text-[#111111] placeholder:text-gray-400 outline-none interactive cursor-none",
                )}
            />
          </div>
          {errors.message ? (
            <p id="article-comment-message-error" className="ml-2 text-xs font-semibold text-[#FF5A36]">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(event) => updateField("website", event.target.value)}
            />
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center justify-center gap-2 bg-[#FF5A36] text-white px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide uppercase hover:bg-[#E84E2D] hover:shadow-lg hover:shadow-[#FF5A36]/20 transition-all interactive cursor-none disabled:opacity-60 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <CyberText text="Submit Comment" speed={20} />
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>

      <FormStatusModal
        open={Boolean(modal)}
        status={modal?.status || "success"}
        title={modal?.title || ""}
        message={modal?.message || ""}
        actionLabel={modal?.status === "success" ? "Done" : "Review"}
        onClose={() => setModal(null)}
      />
    </div>
  );
}
