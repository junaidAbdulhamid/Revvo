"use client";

import { useRef } from "react";
import { motion, useScroll, type MotionValue } from "motion/react";
import { SplitText, useRange } from "../ui/motion";
import { PAIN_POINTS } from "@/content/site";

// Where each pill sits around the centre (percent of the stage); clamped so pills never leave narrow screens
const SPOTS = [
  { left: "50%", top: "24%" },
  { left: "17%", top: "38%" },
  { left: "82%", top: "36%" },
  { left: "30%", top: "72%" },
  { left: "78%", top: "66%" },
];

function Ring({ id, size, progress, speed, dash }: { id: string; size: string; progress: MotionValue<number>; speed: number; dash: string }) {
  const rotate = useRange(progress, [0, 1], [0, 360 * speed]);
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size, rotate }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="49.6" fill="none" stroke={`url(#${id})`} strokeWidth="0.15" strokeDasharray={dash} />
    </motion.svg>
  );
}

function Pill({ label, index, progress }: { label: string; index: number; progress: MotionValue<number> }) {
  const start = 0.08 + index * 0.1;
  const opacity = useRange(progress, [start, start + 0.06], [0, 1]);
  const scale = useRange(progress, [start, start + 0.08], [0.5, 1]);
  const y = useRange(progress, [0, 1], [30, -30 - index * 8]);
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `clamp(108px, ${SPOTS[index].left}, calc(100% - 108px))`, top: SPOTS[index].top, opacity, scale, y }}
    >
      <div className="flex items-center gap-3 whitespace-nowrap rounded-lg border border-line bg-surface px-3 py-2.5 text-[14px] tracking-[-0.03em] shadow-[0_10px_40px_rgba(0,0,0,0.6)] md:text-[18px]">
        <span className="h-1.5 w-1.5 rounded-[1px] bg-white/30" />
        {label}
      </div>
    </motion.div>
  );
}

export default function PainPoints() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stageScale = useRange(scrollYProgress, [0, 1], [0.92, 1.12]);
  const outro = useRange(scrollYProgress, [0.62, 0.72], [0, 1]);
  const outroY = useRange(scrollYProgress, [0.62, 0.72], [16, 0]);

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: stageScale }}>
          <Ring id="ring-a" size="min(78vw, 820px)" progress={scrollYProgress} speed={0.6} dash="60 18" />
          <Ring id="ring-b" size="min(115vw, 1180px)" progress={scrollYProgress} speed={-0.35} dash="90 30" />
          <Ring id="ring-c" size="min(150vw, 1500px)" progress={scrollYProgress} speed={0.2} dash="140 40" />
          {PAIN_POINTS.map((p, i) => (
            <Pill key={p} label={p} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-5 text-center">
          <SplitText lines={["The Hidden Cost", "of Missed Opportunities"]} className="h-section" />
          <motion.p
            className="max-w-[440px] text-[18px] leading-[1.4] tracking-[-0.04em] text-muted"
            style={{ opacity: outro, y: outroY }}
          >
            Every unanswered call, unasked review, and forgotten lead is revenue walking out the door.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
