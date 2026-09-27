"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container, Icon, RidgeArt, SectionHeading } from "../ui/common";
import { Reveal } from "../ui/motion";
import { PROCESS } from "@/content/site";

function AuditVisual() {
  const items = ["Calls missed after 5pm", "No review follow-up", "Old quotes never chased"];
  return (
    <div className="w-[78%] rounded-xl border border-white/15 bg-ink/60 p-4 backdrop-blur-md">
      <p className="text-[15px] tracking-[-0.03em]">Consultation Summary</p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((t, i) => (
          <motion.li
            key={t}
            className="flex items-center gap-2 text-[13px] text-white/70"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.25 }}
          >
            <Icon name="warn" className="h-3.5 w-3.5 shrink-0" /> {t}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function TypingVisual() {
  const text = "Connect receptionist to Google Calendar";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setN((v) => (v >= text.length + 25 ? 0 : v + 1)), 70);
    return () => clearInterval(id);
  }, [inView]);
  return (
    <div ref={ref} className="flex w-[84%] items-center gap-2 rounded-xl border border-white/15 bg-ink/60 px-4 py-3.5 text-[14px] backdrop-blur-md">
      <Icon name="bolt" className="h-4 w-4 shrink-0" />
      <span className="truncate">{text.slice(0, n)}</span>
      <span className="caret -ml-1.5">|</span>
    </div>
  );
}

function ChartVisual() {
  const bars = [30, 42, 38, 55, 50, 64, 60, 72, 70, 84, 80, 95];
  return (
    <div className="w-[84%] rounded-xl border border-white/15 bg-ink/60 p-4 backdrop-blur-md">
      <div className="flex gap-1.5">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <p className="mt-3 text-[18px] tracking-[-0.04em]">Booked Jobs</p>
      <p className="mono-label text-white/50">Monthly</p>
      <div className="mt-3 flex h-20 items-end gap-1.5 border-b border-white/10">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-t-[2px] bg-gradient-to-t from-white/20 to-white/80"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>
    </div>
  );
}

const VISUALS = [AuditVisual, TypingVisual, ChartVisual];

export default function Process() {
  return (
    <section id="process" className="py-[100px]">
      <Container>
        <SectionHeading
          tag="HOW IT WORKS"
          lines={["A Simple Path to", "Automated Growth"]}
          body="No tech skills needed. We handle the setup, the integrations, and the fine-tuning so you can stay focused on the work."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PROCESS.map((step, i) => {
            const Visual = VISUALS[i];
            return (
              <Reveal key={step.title} delay={i * 0.12} y={40} className={i === 1 ? "md:mt-3" : i === 2 ? "md:mt-6" : ""}>
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-line bg-[#0b0b0d]">
                  <RidgeArt glow={0.5} />
                  <div className="relative flex w-full justify-center">
                    <Visual />
                  </div>
                </div>
                <h3 className="mt-6 text-[24px] tracking-[-0.05em]">{step.title}</h3>
                <p className="mt-2 text-[16px] leading-[1.4] tracking-[-0.02em] text-muted">{step.body}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
