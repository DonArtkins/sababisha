"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { X } from "lucide-react";
import { Button } from "./Button";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

interface LiveSiteUnavailableModalProps {
  open: boolean;
  itemName?: string;
  onClose: () => void;
}

export function LiveSiteUnavailableModal({
  open,
  itemName,
  onClose,
}: LiveSiteUnavailableModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
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
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const lenis = (window as any).__lenis;
    const html = document.documentElement;
    const body = document.body;
    const savedScrollY = window.scrollY;
    const previousStyles = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    if (lenis) lenis.stop();
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.width = "100%";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      html.style.overflow = previousStyles.htmlOverflow;
      body.style.overflow = previousStyles.bodyOverflow;
      body.style.position = previousStyles.bodyPosition;
      body.style.top = previousStyles.bodyTop;
      body.style.width = previousStyles.bodyWidth;
      body.style.paddingRight = previousStyles.bodyPaddingRight;
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

  const label = itemName ? `"${itemName}"` : "this solution";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex h-[100dvh] w-screen items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="live-site-unavailable-title"
    >
      <div
        ref={modalBackdropRef}
        className="absolute inset-0 bg-[#111111]/45 backdrop-blur-sm"
        onClick={closeModal}
      />

      <div
        ref={modalContentRef}
        className="relative z-10 w-full max-w-md rounded-[2rem] border border-gray-100 bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-colors hover:bg-gray-200 hover:text-[#111111] interactive cursor-none"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto mb-2 w-full max-w-[280px]">
          <Player
            autoplay
            keepLastFrame
            loop
            src="/lottie/site-unavailable.json"
            style={{ height: "140px", width: "100%" }}
          />
        </div>

        <h2
          id="live-site-unavailable-title"
          className="text-center font-display text-2xl leading-tight text-[#111111] sm:text-3xl"
        >
          Live site not yet available
        </h2>
        <p className="mt-3 text-center font-sans text-sm leading-relaxed text-gray-600 sm:text-base">
          The live site for {label} is not yet available for public view. Contact
          Sababisha Solutions if you need similar services for your organization.
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" size="sm" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" size="sm" href="/en/contact">
            Contact Sababisha
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
