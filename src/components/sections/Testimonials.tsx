"use client";

import { useRef, useState } from "react";
import { animate } from "motion/react";
import { Container, RidgeArt } from "../ui/common";
import { CountUp, Reveal, SplitText, Tag } from "../ui/motion";
import { STATS, TESTIMONIALS } from "@/content/site";

function Arrow({ dir, onClick, disabled }: { dir: "prev" | "next"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className="flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-surface transition-colors hover:bg-raised disabled:opacity-40"
    >
      <svg viewBox="0 0 16 16" className={`h-4 w-4 ${dir === "prev" ? "rotate-180" : ""}`} aria-hidden="true">
        <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}

export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const last = TESTIMONIALS.length - 1;
  const go = (next: number) => {
    const i = Math.max(0, Math.min(last, next));
    setIndex(i);
    const el = track.current?.children[i] as HTMLElement | undefined;
    if (track.current && el) animate(track.current, { x: -el.offsetLeft }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
  };

  return (
    <section className="overflow-hidden py-[100px]">
      <Container>
        {TESTIMONIALS.length > 0 && (
          <>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="flex flex-col items-start gap-4">
                <Tag>TESTIMONIALS</Tag>
                <SplitText lines={["Hear From Our Clients"]} className="h-section" />
              </div>
              <div className="flex gap-2">
                <Arrow dir="prev" onClick={() => go(index - 1)} disabled={index === 0} />
                <Arrow dir="next" onClick={() => go(index + 1)} disabled={index === last} />
              </div>
            </div>

            <Reveal y={40} className="mt-12">
              <div ref={track} className="flex gap-6">
                {TESTIMONIALS.map((t, i) => (
                  <article
                    key={i}
                    className="grid w-[min(712px,88vw)] shrink-0 gap-3 rounded-xl border border-line bg-surface p-3 sm:grid-cols-[1.1fr_0.9fr]"
                  >
                    <div className="flex flex-col justify-between gap-10 p-6">
                      <p className="text-[22px] leading-[1.3] tracking-[-0.04em] md:text-[24px]">&ldquo;{t.quote}&rdquo;</p>
                      <div>
                        <p className="text-[17px] tracking-[-0.03em]">{t.name}</p>
                        <p className="mono-label mt-1 text-muted">{t.role}</p>
                      </div>
                    </div>
                    <div className="relative hidden min-h-[320px] items-center justify-center overflow-hidden rounded-lg bg-[#0b0b0d] sm:flex">
                      <RidgeArt glow={0.4} />
                      <span className="relative text-[96px] tracking-[-0.08em] text-white/80">{t.initials}</span>
                    </div>
                  </article>
                ))}
              </div>
            </Reveal>
          </>
        )}

        <div className="mt-12 grid grid-cols-2 border-l border-t border-line md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} y={16}>
              <div className="flex h-full items-center gap-4 border-b border-r border-line px-6 py-7 md:px-10">
                <span className="text-[44px] leading-none tracking-[-0.05em] md:text-[56px]">
                  <CountUp value={s.value} />
                </span>
                <span className="flex flex-col">
                  <span className="text-[22px] leading-none tracking-[-0.04em]">{s.suffix}</span>
                  <span className="mono-label mt-2 text-muted">{s.label}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
