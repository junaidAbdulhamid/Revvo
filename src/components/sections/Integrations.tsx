"use client";

import { Container, SectionHeading } from "../ui/common";
import { INTEGRATIONS } from "@/content/site";

function Tile({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <div className="flex h-[88px] shrink-0 items-center gap-3 rounded-xl border border-line bg-gradient-to-b from-[#1f1f23] to-[#121214] px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-raised font-mono text-[13px] text-white/80">{initials}</span>
      <span className="whitespace-nowrap text-[17px] tracking-[-0.03em] text-white/70">{name}</span>
    </div>
  );
}

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // Duplicate the list so the -50% translate loops seamlessly
  return (
    <div className="fade-x overflow-hidden">
      <div className={`marquee flex w-max gap-4 pr-4 ${reverse ? "marquee-reverse" : ""}`}>
        {[...items, ...items].map((n, i) => (
          <Tile key={i} name={n} />
        ))}
      </div>
    </div>
  );
}

export default function Integrations() {
  const half = Math.ceil(INTEGRATIONS.length / 2);
  return (
    <section className="py-[100px]">
      <div className="mx-auto flex max-w-[900px] flex-col gap-4">
        <Row items={INTEGRATIONS.slice(0, half)} />
        <Row items={INTEGRATIONS.slice(half)} reverse />
      </div>
      <Container className="mt-14">
        <SectionHeading
          tag="INTEGRATIONS"
          lines={["Works With the Tools", "You Already Use"]}
          body="Your phone line, calendar, CRM, and job software, connected into one system that runs itself. No switching platforms."
        />
      </Container>
    </section>
  );
}
