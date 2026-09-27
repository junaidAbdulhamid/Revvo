"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "../ui/Button";
import { Container, Icon, SectionHeading } from "../ui/common";
import { Reveal } from "../ui/motion";
import { BOOKING_URL, PRICING } from "@/content/site";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <section id="pricing" className="py-[100px]">
      <Container>
        <SectionHeading tag="PRICING" lines={["Simple Plans That", "Pay for Themselves"]} />

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <div className="relative flex rounded-xl border border-line bg-surface p-1.5">
            {[
              { label: "Monthly", value: false },
              { label: "Yearly", value: true },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => setYearly(opt.value)}
                className={`relative z-10 flex items-center gap-2 rounded-lg px-10 py-2.5 text-[16px] tracking-[-0.02em] transition-colors ${
                  yearly === opt.value ? "text-ink" : "text-muted"
                }`}
              >
                {yearly === opt.value && (
                  <motion.span layoutId="billing-pill" className="absolute inset-0 -z-10 rounded-lg bg-white" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                )}
                {opt.label}
                {opt.value && <span className="mono-label rounded bg-raised px-1.5 py-0.5 text-[11px] text-white">-20%</span>}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {PRICING.map((p, i) => {
            const price = yearly ? p.yearly : p.monthly;
            return (
              <Reveal key={p.name} delay={i * 0.1} y={40}>
                <article
                  className={`flex h-full flex-col rounded-xl p-6 ${p.popular ? "border border-line bg-surface" : "border border-transparent"}`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raised">
                    <Icon name={p.icon as "star"} className="h-5 w-5" />
                  </span>
                  <div className="mt-5 flex items-center gap-2">
                    <h3 className="text-[24px] tracking-[-0.05em]">{p.name}</h3>
                    {p.popular && <span className="mono-label rounded bg-raised px-2 py-0.5 text-[11px]">Popular</span>}
                  </div>
                  <p className="mt-1 text-[14px] tracking-[-0.02em] text-muted">{p.description}</p>

                  <div className="mt-10 flex items-end">
                    <span className="text-[56px] leading-none tracking-[-0.06em]">$</span>
                    <span className="relative inline-flex h-[56px] overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={price}
                          className="text-[56px] leading-none tracking-[-0.06em]"
                          initial={{ y: 40, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -40, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {price.toLocaleString()}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="mb-1 ml-1 text-[18px] tracking-[-0.03em] text-muted">/mo</span>
                  </div>
                  <p className="mono-label mt-2 h-4 text-muted">{yearly ? "Billed yearly" : "Billed monthly"}</p>

                  <Button href={BOOKING_URL} variant={p.popular ? "primary" : "secondary"} arrow={false} className="mt-8 w-full">
                    {p.cta}
                  </Button>
                  <p className="mt-4 flex items-center justify-center gap-2 text-[14px] text-white/80">
                    <Icon name="shield" className="h-4 w-4" /> No long-term contract
                  </p>

                  <ul className="mt-6 flex flex-col gap-4 border-t border-line pt-6">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[16px] tracking-[-0.02em]">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
