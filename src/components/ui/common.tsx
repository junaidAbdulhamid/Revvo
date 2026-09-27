import type { ReactNode } from "react";
import { Reveal, SplitText, Tag } from "./motion";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 md:px-[100px] ${className}`}>{children}</div>;
}

export function SectionHeading({
  tag,
  lines,
  body,
  align = "center",
  as = "h2",
}: {
  tag: string;
  lines: string[];
  body?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${center ? "items-center text-center" : "items-start"}`}>
      <Tag>{tag}</Tag>
      <SplitText as={as} lines={lines} className="h-section" />
      {body && (
        <Reveal delay={0.25} className={`max-w-[580px] text-[18px] leading-[1.4] tracking-[-0.04em] text-muted ${center ? "mx-auto" : ""}`}>
          <p>{body}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Layered mountain silhouettes on a misty glow; stands in for Sanjaya's rock photography. */
export function RidgeArt({ className = "", glow = 0.5 }: { className?: string; glow?: number }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 70% at 50% 100%, rgba(120,120,128,${glow}) 0%, rgba(40,40,44,${glow * 0.6}) 35%, transparent 70%)`,
        }}
      />
      <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[70%] w-full">
        <defs>
          <linearGradient id="r1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5a5a60" />
            <stop offset="1" stopColor="#1a1a1d" />
          </linearGradient>
          <linearGradient id="r2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2e2e33" />
            <stop offset="1" stopColor="#050507" />
          </linearGradient>
        </defs>
        <path
          d="M0 120 L30 100 L55 110 L90 70 L120 95 L150 80 L185 40 L215 75 L240 65 L275 95 L300 80 L340 105 L370 90 L400 110 L400 200 L0 200Z"
          fill="url(#r1)"
          opacity="0.55"
        />
        <path
          d="M0 150 L25 130 L60 145 L85 120 L115 140 L160 125 L200 150 L240 130 L280 145 L310 120 L345 140 L380 125 L400 135 L400 200 L0 200Z"
          fill="url(#r2)"
        />
      </svg>
    </div>
  );
}

type IconName = "star" | "phone" | "refresh" | "wrench" | "check" | "warn" | "x" | "bolt" | "shield" | "plus";

export function Icon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<IconName, ReactNode> = {
    star: <path {...p} d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
    phone: <path {...p} d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
    refresh: <path {...p} d="M20 11A8 8 0 0 0 5.3 7M4 13a8 8 0 0 0 14.7 4M5 3v4h4M19 21v-4h-4" />,
    wrench: <path {...p} d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3zM14.7 6.3 17 4a4 4 0 0 1 3 3l-2.3 2.3" />,
    check: <path {...p} d="m5 12.5 4.5 4.5L19 7.5" />,
    warn: <path {...p} d="M12 4 2.5 20h19zM12 10v4.5M12 17.5v.01" />,
    x: <path {...p} d="M6 6l12 12M18 6 6 18" />,
    bolt: <path {...p} d="M13 3 5 13.5h6L10 21l8-10.5h-6z" />,
    shield: <path {...p} d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6zM9 12l2 2 4-4" />,
    plus: <path {...p} d="M12 5v14M5 12h14" />,
  };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
