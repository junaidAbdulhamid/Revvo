"use client";

import Script from "next/script";
import { useRef } from "react";
import { CALENDLY_URL, CONTACT } from "@/content/site";

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void };
  }
}

// Colour params only apply on paid Calendly plans; they are ignored otherwise.
const EMBED_URL = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=1a1a1d&text_color=ffffff&primary_color=ffffff`;

export default function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null);

  // onReady runs on first load and on every later mount, so client-side navigation re-renders the widget
  const init = () => {
    if (!ref.current || !window.Calendly) return;
    ref.current.innerHTML = "";
    window.Calendly.initInlineWidget({ url: EMBED_URL, parentElement: ref.current });
  };

  if (!CALENDLY_URL) {
    return (
      <div className="flex h-[420px] flex-col items-center justify-center gap-4 rounded-xl px-6 text-center">
        <p className="h-card">Book your free consultation</p>
        <p className="max-w-[380px] text-[17px] tracking-[-0.03em] text-muted">
          Email us and we&apos;ll send you a time that works within one business day.
        </p>
        <a href={`mailto:${CONTACT.email}`} className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-ink">
          {CONTACT.email}
        </a>
      </div>
    );
  }

  return (
    <div className="relative h-[700px] w-full overflow-hidden rounded-xl" data-lenis-prevent>
      <p className="mono-label absolute inset-0 flex items-center justify-center text-muted">Loading calendar…</p>
      <div ref={ref} className="relative h-full w-full" />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" onReady={init} />
    </div>
  );
}
