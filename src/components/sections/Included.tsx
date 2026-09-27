"use client";

import Button from "../ui/Button";
import { Container, Icon, RidgeArt } from "../ui/common";
import { Reveal, SplitText, Tag } from "../ui/motion";
import { INCLUDED } from "@/content/site";

const ICONS = ["star", "phone", "refresh", "wrench"] as const;

export default function Included() {
  return (
    <section className="py-[100px]">
      <Container className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div>
          <div className="flex flex-col items-start gap-4 md:sticky md:top-[120px]">
            <Tag>SERVICES</Tag>
            <SplitText lines={["Everything You Need", "to Capture More Jobs"]} className="h-section" />
            <Reveal delay={0.2}>
              <p className="max-w-[420px] text-[18px] leading-[1.4] tracking-[-0.04em] text-muted">
                Each automation is custom-built around your business, written in your brand voice, and managed by our team.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-2">
              <Button href="/#book" variant="primary">
                Book Free Consultation
              </Button>
            </Reveal>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {INCLUDED.map((s, i) => (
            <Reveal key={s.title} y={40} blur scale={0.97}>
              <article className="grid overflow-hidden rounded-xl border border-line bg-surface p-3 sm:grid-cols-[1fr_minmax(0,0.8fr)]">
                <div className="flex flex-col p-4">
                  <p className="mono-label text-muted">/ {s.index}</p>
                  <h3 className="h-card mt-2">{s.title}</h3>
                  <p className="mt-2 text-[17px] tracking-[-0.03em] text-muted">{s.blurb}</p>
                  <ul className="mt-8">
                    {s.features.map((f) => (
                      <li key={f} className="mono-label border-b border-line py-3 text-white/70 last:border-0">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative hidden min-h-[240px] items-center justify-center overflow-hidden rounded-lg bg-[#0b0b0d] sm:flex">
                  <RidgeArt glow={0.35 + i * 0.08} />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-b from-[#3a3a40] to-[#0b0b0d] shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.25)]">
                    <Icon name={ICONS[i]} className="h-10 w-10" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
