"use client";

import dynamic from "next/dynamic";
import CalendlyEmbed from "../CalendlyEmbed";
import { Container, Icon } from "../ui/common";
import { Reveal, SplitText, Tag } from "../ui/motion";

const Scene = dynamic(() => import("../three/Scene"), { ssr: false });

const TAKEAWAYS = [
  "Where you're losing calls, reviews, and leads today",
  "Which automation will pay off fastest for you",
  "Exact pricing and a launch timeline",
];

export default function Book({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="book" className="relative">
      <div className="relative flex h-[620px] items-center justify-center overflow-hidden">
        <Scene variant="cta" className="absolute inset-0" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(#010004 0%, rgba(1,0,4,0.2) 30%, rgba(1,0,4,0.2) 65%, #010004 100%)" }}
        />
        <div className="relative flex flex-col items-center gap-4 px-5 text-center">
          <Tag>GET STARTED</Tag>
          <SplitText
            as={standalone ? "h1" : "h2"}
            immediate={standalone}
            lines={["Ready to Stop Losing", "Calls and Leads?"]}
            className="h-section"
          />
          <Reveal delay={0.25} immediate={standalone}>
            <p className="max-w-[440px] text-[18px] leading-[1.4] tracking-[-0.04em] text-white/85">
              Pick a time below for a free 30-minute consultation. No pressure, no obligation.
            </p>
          </Reveal>
        </div>
      </div>

      <Container className="relative -mt-24 grid gap-8 pb-[100px] md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <Reveal y={30} immediate={standalone} className="md:pt-24">
          <p className="mono-label text-muted">On the call you&apos;ll get</p>
          <ul className="mt-5 flex flex-col">
            {TAKEAWAYS.map((t) => (
              <li key={t} className="flex gap-3 border-b border-line py-4 text-[17px] leading-[1.35] tracking-[-0.03em]">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] tracking-[-0.02em] text-muted">
            Pick a time and you&apos;ll get a calendar invite with a video link straight away.
          </p>
        </Reveal>
        <Reveal y={40} delay={0.1} immediate={standalone}>
          <div className="rounded-xl border border-line bg-surface p-2">
            <CalendlyEmbed />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
