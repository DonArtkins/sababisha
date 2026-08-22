"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { CheckCircle2, ChevronDown, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { FormStatusModal } from "@/components/FormStatusModal";
import {
  CONTACT_SERVICE_OPTIONS,
  EMAIL_PATTERN,
  PHONE_PATTERN,
  createServiceInquiryMessage,
  getContactServiceBySlug,
} from "@/lib/form-utils";
import { cn } from "@/lib/utils";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceSlug: string;
  message: string;
  website: string;
};

type ContactErrors = Partial<Record<keyof ContactFormData, string>>;

type ModalState = {
  status: "success" | "error";
  title: string;
  message: string;
};

const emptyForm: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  serviceSlug: "",
  message: "",
  website: "",
};

function validateContactForm(data: ContactFormData): ContactErrors {
  const errors: ContactErrors = {};
  const service = getContactServiceBySlug(data.serviceSlug);

  if (data.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!EMAIL_PATTERN.test(data.email.trim())) errors.email = "Enter a valid email address.";
  if (data.phone.trim() && !PHONE_PATTERN.test(data.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!service) errors.serviceSlug = "Choose a service or select other.";
  if (data.message.trim().length < 20) {
    errors.message = "Add at least 20 characters about your inquiry.";
  }

  return errors;
}

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const messageProgressRef = useRef<HTMLDivElement>(null);
  const prefilledMessageRef = useRef("");
  const [formData, setFormData] = useState<ContactFormData>(emptyForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);

  const updateMessageScrollProgress = () => {
    const textarea = messageRef.current;
    const progress = messageProgressRef.current;
    if (!textarea || !progress) return;

    const maxScroll = textarea.scrollHeight - textarea.clientHeight;
    const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, textarea.scrollTop / maxScroll)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
  };

  const selectedService = useMemo(
    () => getContactServiceBySlug(formData.serviceSlug),
    [formData.serviceSlug],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      );

      gsap.fromTo(
        rightColRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = getContactServiceBySlug(params.get("service"));
    if (!service) return;

    const prefilledMessage = createServiceInquiryMessage(service);
    prefilledMessageRef.current = prefilledMessage;
    setFormData((current) => ({
      ...current,
      serviceSlug: service.slug,
      message: current.message.trim() ? current.message : prefilledMessage,
    }));
  }, []);

  useEffect(() => {
    if (!isServiceOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && !dropdownRef.current?.contains(target)) {
        setIsServiceOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsServiceOpen(false);
    };

    window.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isServiceOpen]);

  useEffect(() => {
    updateMessageScrollProgress();
  }, [formData.message]);

  const clearError = (field: keyof ContactFormData) => {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
    clearError(field);
  };

  const handleServiceSelect = (serviceSlug: string) => {
    const service = getContactServiceBySlug(serviceSlug);
    if (!service) return;

    const nextPrefill = service.slug === "other" ? "" : createServiceInquiryMessage(service);
    const previousPrefill = prefilledMessageRef.current;

    setFormData((current) => ({
      ...current,
      serviceSlug: service.slug,
      message:
        !current.message.trim() || current.message === previousPrefill
          ? nextPrefill
          : current.message,
    }));
    prefilledMessageRef.current = nextPrefill;
    clearError("serviceSlug");
    setIsServiceOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setModal({
        status: "error",
        title: "Check the form details",
        message: "Some fields need attention before we can send your inquiry.",
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        if (result?.errors && typeof result.errors === "object") {
          setErrors(result.errors);
        }
        setModal({
          status: "error",
          title: "Inquiry not sent",
          message:
            typeof result?.message === "string"
              ? result.message
              : "We could not send your inquiry. Please try again.",
        });
        return;
      }

      setFormData(emptyForm);
      prefilledMessageRef.current = "";
      setModal({
        status: "success",
        title: "Inquiry sent",
        message: "Your message has been sent to Sababisha Solutions. Our team will review it and get back to you.",
      });
    } catch {
      setModal({
        status: "error",
        title: "Connection failed",
        message: "We could not reach the email service. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = (hasError?: boolean) =>
    cn(
      "w-full h-14 rounded-2xl border bg-gray-50 px-5 text-[#111111] placeholder:text-gray-400 outline-none transition-all interactive cursor-none dark:bg-background dark:text-foreground dark:placeholder:text-muted",
      "focus:border-[#FF5A36] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] dark:focus:bg-card",
      hasError ? "border-[#FF5A36] bg-[#FF5A36]/5 dark:bg-[#FF5A36]/10" : "border-gray-200 dark:border-border",
    );

  const errorText = (field: keyof ContactFormData) =>
    errors[field] ? (
      <p id={`${field}-error`} className="ml-2 text-xs font-semibold text-[#FF5A36]">
        {errors[field]}
      </p>
    ) : null;

  return (
    <main className="bg-[#EFEFEF] min-h-screen">
      <section ref={containerRef} className="pt-32 pb-20 px-4 sm:px-6 md:px-12 md:pt-40 md:pb-24 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div ref={leftColRef} className="w-full lg:w-[40%] flex flex-col">
          <div className="inline-flex items-center gap-2 mb-6 bg-white rounded-full px-4 py-1.5 shadow-sm border border-gray-200 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#FF5A36]"></span>
            <span className="uppercase font-sans tracking-widest text-[10px] text-gray-600 font-bold">
              Get In Touch
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-[#111111] leading-[1.05] tracking-tight mb-6">
            Let's build <br />
            something <span className="text-accent relative inline-block">
              great.<svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-gray-600 font-sans text-base sm:text-lg md:text-xl leading-relaxed mb-10 md:mb-12 max-w-md">
            Have a project in mind, need expert technology consultancy, or want to explore fintech, enterprise software, AI automation, integrations, analytics, or support solutions? Reach out and our team will help clarify your goals, scope, timeline, and best path forward.
          </p>

          <div className="flex flex-col gap-8 md:gap-10 mt-auto">
            <div className="flex gap-5 group">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[#FF5A36] group-hover:text-[#FF5A36] transition-colors shadow-sm">
                <Mail className="w-5 h-5 text-[#111111] group-hover:text-[#FF5A36] transition-colors" />
              </div>
              <div>
                <h3 className="text-[#111111] font-display text-xl mb-1">Email Us</h3>
                <p className="text-gray-600 font-sans text-sm mb-1">For project discovery, product demos, implementation support, and partnership inquiries</p>
                <Link href="mailto:support@sababisha.com" className="text-[#111111] font-sans font-semibold text-sm hover:text-[#FF5A36] transition-colors interactive cursor-none">
                  support@sababisha.com
                </Link>
              </div>
            </div>

            <div className="flex gap-5 group">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[#FF5A36] transition-colors shadow-sm">
                <Phone className="w-5 h-5 text-[#111111] group-hover:text-[#FF5A36] transition-colors" />
              </div>
              <div>
                <h3 className="text-[#111111] font-display text-xl mb-1">Call Us</h3>
                <p className="text-gray-600 font-sans text-sm mb-1">Speak with us about software requirements, integrations, timelines, and support needs</p>
                <Link href="tel:+254751101532" className="text-[#111111] font-sans font-semibold text-sm hover:text-[#FF5A36] transition-colors interactive cursor-none">
                  0751101532 / 0715088150
                </Link>
              </div>
            </div>

            <div className="flex gap-5 group">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[#FF5A36] transition-colors shadow-sm">
                <MapPin className="w-5 h-5 text-[#111111] group-hover:text-[#FF5A36] transition-colors" />
              </div>
              <div>
                <h3 className="text-[#111111] font-display text-xl mb-1">Physical Presence</h3>
                <p className="text-gray-600 font-sans text-sm mb-1">Visit our Nairobi team for consultations, onboarding sessions, and implementation meetings</p>
                <p className="text-[#111111] font-sans font-semibold text-sm">
                  Ngong, Nairobi,<br />Zambia Road,<br />Along Wakaba Close,<br />Mega-Hill Court, Suite B3.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div ref={rightColRef} className="w-full lg:w-[60%] mt-4 lg:mt-0">
          <form onSubmit={handleSubmit} noValidate className="bg-white p-5 sm:p-8 md:p-12 rounded-[1.75rem] sm:rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col gap-6 dark:bg-card dark:border-border">
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(event) => updateField("website", event.target.value)}
                />
              </label>
            </div>

            {selectedService && selectedService.slug !== "other" ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5 dark:border-border dark:bg-background">
                <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-widest text-[#FF5A36]">Selected service</p>
                <h2 className="font-display text-2xl leading-tight text-[#111111]">{selectedService.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{selectedService.desc}</p>
              </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-sm font-sans font-bold text-[#111111] ml-2">Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="John Doe"
                  autoComplete="name"
                  maxLength={9999}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={inputClassName(Boolean(errors.name))}
                />
                {errorText("name")}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-sm font-sans font-bold text-[#111111] ml-2">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="john@company.com"
                  autoComplete="email"
                  maxLength={9999}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={inputClassName(Boolean(errors.email))}
                />
                {errorText("email")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-phone" className="text-sm font-sans font-bold text-[#111111] ml-2">Phone Number</label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="+254 712 345 678"
                  autoComplete="tel"
                  maxLength={9999}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={inputClassName(Boolean(errors.phone))}
                />
                {errorText("phone")}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-company" className="text-sm font-sans font-bold text-[#111111] ml-2">Company / Organization</label>
                <input
                  id="contact-company"
                  type="text"
                  value={formData.company}
                  onChange={(event) => updateField("company", event.target.value)}
                  placeholder="Your organization"
                  autoComplete="organization"
                  maxLength={9999}
                  className={inputClassName()}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label id="service-label" className="text-sm font-sans font-bold text-[#111111] ml-2">Service / Solution</label>
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isServiceOpen}
                  aria-labelledby="service-label"
                  aria-invalid={Boolean(errors.serviceSlug)}
                  aria-describedby={errors.serviceSlug ? "serviceSlug-error" : undefined}
                  onClick={() => setIsServiceOpen((open) => !open)}
                  className={cn(
                    inputClassName(Boolean(errors.serviceSlug)),
                    "flex items-center justify-between gap-4 text-left",
                    !selectedService && "text-gray-400",
                  )}
                >
                  <span className="min-w-0 truncate">
                    {selectedService ? selectedService.title : "Select a service or solution"}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", isServiceOpen && "rotate-180")} />
                </button>

                {isServiceOpen ? (
                  <div
                    role="listbox"
                    aria-labelledby="service-label"
                    className="absolute left-0 right-0 z-30 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-border dark:bg-card"
                  >
                    {CONTACT_SERVICE_OPTIONS.map((service) => (
                      <button
                        key={service.slug}
                        type="button"
                        role="option"
                        aria-selected={formData.serviceSlug === service.slug}
                        onClick={() => handleServiceSelect(service.slug)}
                        className={cn(
                          "flex w-full items-start justify-between gap-3 rounded-xl px-4 py-3 text-left font-sans transition-colors interactive cursor-none hover:bg-gray-50 dark:hover:bg-white/5",
                          formData.serviceSlug === service.slug && "bg-[#FF5A36]/10 text-[#111111] dark:bg-[#FF5A36]/15",
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-[#111111]">{service.title}</span>
                          <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-widest text-gray-500">{service.category}</span>
                        </span>
                        {formData.serviceSlug === service.slug ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FF5A36]" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              {errorText("serviceSlug")}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-sm font-sans font-bold text-[#111111] ml-2">Message</label>
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl border bg-gray-50 transition-all dark:bg-background",
                  "focus-within:border-[#FF5A36] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(255,90,54,0.1)] dark:focus-within:bg-card",
                  errors.message ? "border-[#FF5A36] bg-[#FF5A36]/5 dark:bg-[#FF5A36]/10" : "border-gray-200 dark:border-border",
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
                  id="contact-message"
                  rows={7}
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  onScroll={updateMessageScrollProgress}
                  placeholder="Tell us about your project, goals, timeline, and budget range."
                  data-lenis-prevent
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(
                    "contact-message-scroll w-full resize-none border-0 bg-transparent p-5 text-[#111111] placeholder:text-gray-400 outline-none interactive cursor-none dark:text-foreground dark:placeholder:text-muted",
                  )}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                {errorText("message")}
              </div>
            </div>

            <div className="pt-2 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending
                  </span>
                ) : (
                  "Submit Inquiry"
                )}
              </Button>
              <p className="font-sans text-xs text-gray-500 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                We usually respond within one business day.
              </p>
            </div>
          </form>
        </div>
      </section>

      <FormStatusModal
        open={Boolean(modal)}
        status={modal?.status || "success"}
        title={modal?.title || ""}
        message={modal?.message || ""}
        actionLabel={modal?.status === "success" ? "Done" : "Review Form"}
        onClose={() => setModal(null)}
      />
    </main>
  );
}

export default Contact;
