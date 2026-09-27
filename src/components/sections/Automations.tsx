"use client";

import { useRef } from "react";
import { motion, useScroll, type MotionValue } from "motion/react";
import { AUTOMATION_MOCKS } from "../mocks";
import Button from "../ui/Button";
import { useRange } from "../ui/motion";
import { Container, Icon, SectionHeading } from "../ui/common";
import { AUTOMATIONS, BOOKING_URL, type Automation } from "@/content/site";

function Card({ a, i, total, progress }: { a: Automation; i: number; total: number; progress: MotionValue<number> }) {
  // As later cards slide over this one, it shrinks and dims into a deck
  const start = i / total;
  const scale = useRange(progress, [start, 1], [1, 1 - (total - 1 - i) * 0.05]);
  const dim = useRange(progress, [start, 1], [0, (total - 1 - i) * 0.25]);
  const Mock = AUTOMATION_MOCKS[a.id];
  const icon = ({ reviews: "star", receptionist: "phone", reactivation: "refresh" } as const)[a.id];
  return (
    <div className="relative md:sticky md:h-[calc(100svh-140px)] md:max-h-[680px]" style={{ top: `calc(100px + ${i * 24}px)` }}>
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className="relative grid h-full overflow-hidden rounded-xl border border-line bg-surface md:grid-cols-2"
      >
        <div className="relative min-h-[380px] border-b border-line md:border-b-0 md:border-r">
          <Mock />
        </div>
        <div className="flex flex-col p-6 md:p-8">
          <p className="mono-label flex items-center gap-2 border-b border-line pb-3 text-muted">
            {a.index} <span className="h-1 w-1 rounded-full bg-muted" /> <span className="text-white">{a.category}</span>
          </p>
          <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-lg border border-line bg-raised">
            <Icon name={icon} className="h-6 w-6" />
          </span>
          <div className="mt-8 flex flex-1 flex-col justify-end gap-4">
            <h3 className="h-card">{a.title}</h3>
            <p className="max-w-[480px] text-[17px] leading-[1.45] tracking-[-0.03em] text-muted">{a.description}</p>
            <div>
              <Button href={BOOKING_URL}>See it for your business</Button>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
            {a.stats.map((s) => (
              <div key={s.label}>
                <p className="text-[38px] leading-none tracking-[-0.05em]">{s.value}</p>
                <p className="mono-label mt-3 text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <motion.div className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}

export default function Automations() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="automations" className="py-[100px]">
      <Container>
        <SectionHeading
          tag="OUR AUTOMATIONS"
          lines={["Three Systems.", "Zero Missed Revenue."]}
          body="Plug-and-play AI that works alongside your team, answering, following up, and filling your calendar while you're on the job."
        />
        <div ref={ref} className="mt-16 flex flex-col gap-8 md:gap-[20vh]">
          {AUTOMATIONS.map((a, i) => (
            <Card key={a.id} a={a} i={i} total={AUTOMATIONS.length} progress={scrollYProgress} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button href="/#pricing">Compare Plans</Button>
        </div>
      </Container>
    </section>
  );
}
