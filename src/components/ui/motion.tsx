"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useTransform, type MotionValue, type Variants } from "motion/react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Clamped linear mapping of a scroll value. Uses the function form of useTransform on purpose:
 * Motion 13's hardware-accelerated range form does not hold values outside the range.
 */
export function useRange(value: MotionValue<number>, [a, b]: [number, number], [c, d]: [number, number]) {
  return useTransform(value, (v) => c + (d - c) * Math.min(1, Math.max(0, (v - a) / (b - a))));
}

const MOTION_TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p };

/**
 * Splits text into characters that rise and fade in when scrolled into view.
 * Each line starts ~100ms after the previous one; characters inside a line ripple slightly.
 */
export function SplitText({
  lines,
  as = "h2",
  className = "",
  delay = 0,
  immediate = false,
}: {
  lines: string[];
  as?: keyof typeof MOTION_TAGS;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const char: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
  };
  const line: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.012 } },
  };
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
  };
  const MotionTag = MOTION_TAGS[as];
  return (
    <MotionTag
      className={className}
      aria-label={lines.join(" ")}
      variants={container}
      initial="hidden"
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.4 } })}
    >
      {lines.map((l, li) => (
        <motion.span key={li} variants={line} className="block" aria-hidden="true">
          {l.split(" ").map((word, wi, arr) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {[...word].map((c, ci) => (
                <motion.span key={ci} variants={char} className="inline-block">
                  {c}
                </motion.span>
              ))}
              {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </motion.span>
      ))}
    </MotionTag>
  );
}

const GLYPHS = "!<>-_\\/[]{}=+*^?#%@$;|";

/** Text that decodes from random glyphs into the real label when it enters the viewport. */
export function Scramble({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [out, setOut] = useState(text);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    let raf = 0;
    const total = 28;
    const t = setTimeout(() => {
      setStarted(true);
      const tick = () => {
        frame++;
        const revealed = Math.floor((frame / total) * text.length);
        setOut(
          [...text]
            .map((c, i) => (i < revealed || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(""),
        );
        if (frame < total) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [inView, text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text} style={{ opacity: started ? 1 : 0 }}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/** Small mono section label on a dark chip with a white bar on the left. */
export function Tag({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`mono-label inline-flex border-l-2 border-white bg-surface px-2.5 py-1 text-white ${className}`}>
      <Scramble text={children} />
    </span>
  );
}

/** Fade + rise (optionally from a blur) when scrolled into view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  blur = false,
  scale = 1,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  scale?: number;
  immediate?: boolean;
}) {
  const hidden = { opacity: 0, y, scale, ...(blur ? { filter: "blur(8px)" } : {}) };
  const shown = { opacity: 1, y: 0, scale: 1, ...(blur ? { filter: "blur(0px)" } : {}) };
  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(immediate ? { animate: shown } : { whileInView: shown, viewport: { once: true, amount: 0.25 } })}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Number that counts up from zero once visible. */
export function CountUp({ value, className = "" }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE_OUT,
      onUpdate: (v) => (node.textContent = Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
