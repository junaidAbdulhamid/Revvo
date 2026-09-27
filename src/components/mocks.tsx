"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Icon, RidgeArt } from "./ui/common";
import { EASE_OUT } from "./ui/motion";

/** Advances a step counter on an interval while visible, looping back to 0. */
function useSequence(steps: number, interval: number, holdAtEnd = 2) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % (steps + holdAtEnd)), interval);
    return () => clearInterval(id);
  }, [inView, steps, interval, holdAtEnd]);
  return { ref, step: Math.min(step, steps) };
}

const bubble = {
  initial: { opacity: 0, y: 12, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: EASE_OUT },
};

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative flex h-full min-h-[380px] w-full items-center justify-center overflow-hidden bg-[#0b0b0d] p-6">
      <RidgeArt glow={0.55} />
      <p className="mono-label absolute left-5 top-5 text-white/50">{label}</p>
      <div className="relative w-full max-w-[360px]">{children}</div>
    </div>
  );
}

function Typing() {
  return (
    <motion.div {...bubble} className="flex w-fit gap-1 rounded-2xl rounded-bl-sm bg-raised px-3 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/60"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );
}

export function ReviewMock() {
  const { ref, step } = useSequence(6, 1300);
  return (
    <div ref={ref} className="h-full">
      <Frame label="SMS · Job completed">
        <div className="flex flex-col gap-2.5 rounded-[22px] border border-line bg-ink/80 p-4 text-[14px] leading-[1.35] tracking-[-0.02em] backdrop-blur-md">
          <div className="mb-1 flex items-center justify-between border-b border-line pb-3">
            <span className="text-white/90">Apex Plumbing</span>
            <span className="mono-label text-white/40">now</span>
          </div>
          <AnimatePresence>
            {step >= 1 && (
              <motion.div key="a" {...bubble} className="max-w-[85%] rounded-2xl rounded-bl-sm bg-raised px-3 py-2">
                Hi Sarah, thanks for choosing Apex today! How would you rate your service from 1-5?
              </motion.div>
            )}
            {step >= 2 && (
              <motion.div key="b" {...bubble} className="ml-auto rounded-2xl rounded-br-sm bg-white px-3 py-2 text-ink">
                5! Mike was great 🙌
              </motion.div>
            )}
            {step === 3 && <Typing key="t" />}
            {step >= 4 && (
              <motion.div key="c" {...bubble} className="max-w-[85%] rounded-2xl rounded-bl-sm bg-raised px-3 py-2">
                Amazing! Would you share that on Google? It takes 20 seconds ⭐
              </motion.div>
            )}
            {step >= 5 && (
              <motion.div key="d" {...bubble} className="mt-1 rounded-xl border border-line bg-surface p-3">
                <div className="flex items-center justify-between">
                  <span className="mono-label text-white/60">New Google review</span>
                  <span className="flex gap-0.5 text-white">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                        <Icon name="star" className="h-3.5 w-3.5 fill-white" />
                      </motion.span>
                    ))}
                  </span>
                </div>
                <p className="mt-2 text-white/70">&ldquo;Fast, friendly and fixed it first time.&rdquo;</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Frame>
    </div>
  );
}

const TRANSCRIPT = [
  { who: "Caller", text: "Hi, my AC stopped working. Can someone come out today?" },
  { who: "Revvo AI", text: "Sorry to hear that! I have a 3:30pm opening today. Shall I book it?" },
  { who: "Caller", text: "Yes please, that works." },
];

export function ReceptionistMock() {
  const { ref, step } = useSequence(5, 1500);
  return (
    <div ref={ref} className="h-full">
      <Frame label="Inbound call · 9:42 PM">
        <div className="rounded-[22px] border border-line bg-ink/80 p-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink">
              <span className="absolute inset-0 rounded-full border border-white" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
              <Icon name="phone" className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-[15px] tracking-[-0.03em]">(555) 213-8890</p>
              <p className="mono-label text-white/50">AI receptionist · live</p>
            </div>
            <div className="flex h-6 items-center gap-[3px]">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-white/70"
                  animate={{ height: [4, 8 + ((i * 7) % 14), 4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.07 }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 text-[14px] leading-[1.35] tracking-[-0.02em]">
            <AnimatePresence>
              {TRANSCRIPT.slice(0, Math.min(step, 3)).map((l) => (
                <motion.div key={l.text} {...bubble}>
                  <p className="mono-label mb-1 text-white/40">{l.who}</p>
                  <p className={l.who === "Caller" ? "text-white/70" : "text-white"}>{l.text}</p>
                </motion.div>
              ))}
              {step >= 4 && (
                <motion.div key="booked" {...bubble} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 text-ink">
                  <Icon name="check" className="h-4 w-4" />
                  <span className="text-[14px] font-medium">Booked · Today, 3:30 PM</span>
                  <span className="mono-label ml-auto text-ink/50">Calendar</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Frame>
    </div>
  );
}

const LEADS = [
  { name: "Mike Thompson", note: "Quote · Mar 2025" },
  { name: "Dana Reyes", note: "Past customer · 2024" },
  { name: "Chris Olsen", note: "Quote · Nov 2024" },
  { name: "Priya Shah", note: "Web form · Jan 2025" },
];
const STATUS = ["Cold", "Texted", "Replied", "Booked"];

export function ReactivationMock() {
  const { ref, step } = useSequence(7, 900);
  // Each lead progresses at its own pace; not everyone books
  const statusFor = (i: number) => {
    const caps = [3, 2, 3, 1];
    return Math.max(0, Math.min(caps[i], step - i));
  };
  const booked = LEADS.filter((_, i) => statusFor(i) === 3).length;
  return (
    <div ref={ref} className="h-full">
      <Frame label="Campaign · Old leads">
        <div className="rounded-[22px] border border-line bg-ink/80 p-4 backdrop-blur-md">
          <div className="flex items-end justify-between border-b border-line pb-3">
            <div>
              <p className="mono-label text-white/50">Reactivated</p>
              <p className="text-[32px] leading-none tracking-[-0.05em]">
                {booked}
                <span className="text-white/40">/{LEADS.length}</span>
              </p>
            </div>
            <span className="mono-label rounded border border-line px-2 py-1 text-white/70">SMS · Running</span>
          </div>
          <ul className="mt-2">
            {LEADS.map((l, i) => {
              const s = statusFor(i);
              return (
                <li key={l.name} className="flex items-center justify-between border-b border-line py-2.5 last:border-0">
                  <div>
                    <p className="text-[14px] tracking-[-0.02em]">{l.name}</p>
                    <p className="mono-label text-[10px] text-white/40">{l.note}</p>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className={`mono-label rounded px-2 py-1 text-[10px] ${
                        s === 3 ? "bg-white text-ink" : s === 0 ? "bg-surface text-white/40" : "bg-raised text-white/80"
                      }`}
                    >
                      {STATUS[s]}
                    </motion.span>
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Frame>
    </div>
  );
}

export const AUTOMATION_MOCKS = {
  reviews: ReviewMock,
  receptionist: ReceptionistMock,
  reactivation: ReactivationMock,
};
