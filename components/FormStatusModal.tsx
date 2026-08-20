"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { Button } from "./Button";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

type ModalStatus = "success" | "error";

interface FormStatusModalProps {
  open: boolean;
  status: ModalStatus;
  title: string;
  message: string;
  actionLabel?: string;
  onClose: () => void;
}

const animationSrc: Record<ModalStatus, string> = {
  success: "/lottie/form-success.json",
  error: "/lottie/form-error.json",
};

export function FormStatusModal({
  open,
  status,
  title,
  message,
  actionLabel = "Close",
  onClose,
}: FormStatusModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const closeModal = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    gsap.to(modalContentRef.current, {
      y: 16,
      opacity: 0,
      scale: 0.98,
      duration: 0.25,
      ease: "power3.in",
    });
    gsap.to(modalBackdropRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: () => {
        isClosingRef.current = false;
        onClose();
      },
    });
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    isClosingRef.current = false;

    gsap.fromTo(
      modalContentRef.current,
      { y: 24, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" },
    );
    gsap.fromTo(
      modalBackdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
    );
  }, [open, status]);

  useEffect(() => {
    if (!open) return;

    const lenis = (window as any).__lenis;
    const html = document.documentElement;
    const body = document.body;
    const savedScrollY = window.scrollY;
    const previousStyles = {
      htmlOverflow: html.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const blockWheel = (event: WheelEvent) => {
      const target = event.target as Node | null;
      const modalBody = modalScrollRef.current;

      if (!modalBody || !target || !modalBody.contains(target)) {
        event.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = modalBody;
      const delta = event.deltaY;
      if (delta > 0 && scrollTop + clientHeight >= scrollHeight - 1) {
        event.preventDefault();
      } else if (delta < 0 && scrollTop <= 0) {
        event.preventDefault();
      }
    };

    const blockTouchMove = (event: TouchEvent) => {
      const target = event.target as Node | null;
      const modalBody = modalScrollRef.current;
      if (!modalBody || !target || !modalBody.contains(target)) {
        event.preventDefault();
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    if (lenis) lenis.stop();

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    window.addEventListener("wheel", blockWheel, { passive: false, capture: true });
    window.addEventListener("touchmove", blockTouchMove, { passive: false, capture: true });
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      html.style.overflow = previousStyles.htmlOverflow;
      html.style.overscrollBehavior = previousStyles.htmlOverscrollBehavior;
      body.style.overflow = previousStyles.bodyOverflow;
      body.style.overscrollBehavior = previousStyles.bodyOverscrollBehavior;
      body.style.position = previousStyles.bodyPosition;
      body.style.top = previousStyles.bodyTop;
      body.style.left = previousStyles.bodyLeft;
      body.style.right = previousStyles.bodyRight;
      body.style.width = previousStyles.bodyWidth;
      body.style.paddingRight = previousStyles.bodyPaddingRight;

      window.removeEventListener("wheel", blockWheel, { capture: true });
      window.removeEventListener("touchmove", blockTouchMove, { capture: true });
      window.removeEventListener("keydown", closeOnEscape);
      window.scrollTo(0, savedScrollY);

      if (lenis) {
        if (typeof lenis.scrollTo === "function") {
          lenis.scrollTo(savedScrollY, { immediate: true, force: true });
        }
        lenis.start();
      }
    };
  }, [closeModal, open]);

  if (!isMounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex h-[100dvh] min-h-[100dvh] w-screen items-stretch justify-center overflow-hidden p-0 sm:items-center sm:p-6"
      style={{ isolation: "isolate" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-status-modal-title"
    >
      <div
        ref={modalBackdropRef}
        className="absolute inset-0 bg-[#111111]/50 backdrop-blur-sm dark:bg-black/65"
        onClick={closeModal}
      ></div>

      <div className="relative z-10 flex h-full min-h-0 w-full items-stretch justify-center sm:items-center">
        <div
          ref={modalContentRef}
          tabIndex={-1}
          className="relative flex h-full min-h-0 w-full max-w-lg flex-col border border-gray-100 bg-white shadow-2xl sm:h-auto sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2rem] lg:rounded-[2.5rem] dark:border-border dark:bg-card"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-7 sm:py-5 dark:border-border">
            <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-gray-500">
              {status === "success" ? (
                <CheckCircle2 className="h-4 w-4 text-accent" />
              ) : (
                <AlertCircle className="h-4 w-4 text-accent" />
              )}
              {status === "success" ? "Request sent" : "Request failed"}
            </div>

            <button
              type="button"
              onClick={closeModal}
              aria-label="Close status modal"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-colors hover:bg-gray-200 hover:text-[#111111] interactive cursor-none sm:h-10 sm:w-10 dark:bg-background dark:text-muted dark:hover:bg-white/10 dark:hover:text-foreground"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          <div
            ref={modalScrollRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-5 text-center font-sans touch-pan-y sm:px-8 sm:pb-8"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="mx-auto mb-2 w-full max-w-[220px]">
              <Player
                autoplay
                keepLastFrame
                loop={false}
                src={animationSrc[status]}
                style={{ height: "180px", width: "100%" }}
              />
            </div>

            <h2 id="form-status-modal-title" className="font-display text-3xl leading-tight text-[#111111] sm:text-4xl dark:text-foreground">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-gray-600 sm:text-base dark:text-muted">
              {message}
            </p>
          </div>

          <div className="flex shrink-0 justify-center border-t border-gray-100 bg-gray-50/50 p-5 sm:rounded-b-[2rem] sm:p-7 lg:rounded-b-[2.5rem] dark:border-border dark:bg-background/70">
            <Button
              type="button"
              variant={status === "success" ? "secondary" : "primary"}
              size="md"
              onClick={closeModal}
              className="w-full sm:w-auto"
            >
              {actionLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
