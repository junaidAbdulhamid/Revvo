"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import BookingCard from "../BookingCard";
import { Reveal, SplitText, Tag } from "../ui/motion";
import { HERO } from "@/content/site";

const Scene = dynamic(() => import("../three/Scene"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[680px] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
      >
        <Scene variant="hero" className="absolute inset-0" />
      </motion.div>
      {/* Readability overlay: darker at top and bottom, fading into the page */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(1,0,4,0.55) 0%, rgba(1,0,4,0.15) 25%, rgba(1,0,4,0.15) 55%, rgba(1,0,4,0.55) 80%, #010004 100%)",
        }}
      />

      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pb-10 pt-[100px] md:px-[100px] md:pb-[80px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <ul className="flex flex-col gap-1.5">
            {HERO.services.map((s, i) => (
              <Reveal key={s} immediate delay={0.6 + i * 0.1} y={10}>
                <li className="mono-label text-white/90">/ {s}</li>
              </Reveal>
            ))}
          </ul>
          <Reveal immediate delay={0.9} y={10} className="max-w-[330px] self-end md:self-start">
            <p className="text-[18px] leading-[1.4] tracking-[-0.04em] [text-indent:1.5em]">{HERO.pitch}</p>
          </Reveal>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <Reveal immediate delay={1.1} y={10}>
              <Tag>{HERO.tag}</Tag>
            </Reveal>
            <SplitText as="h1" lines={HERO.headline} immediate delay={1.2} className="h-display" />
          </div>
          <Reveal immediate delay={1.6} blur>
            <BookingCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
