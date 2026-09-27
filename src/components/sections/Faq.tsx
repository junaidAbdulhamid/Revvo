"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import BookingCard from "../BookingCard";
import { Container, Icon } from "../ui/common";
import { Reveal, SplitText, Tag } from "../ui/motion";
import { FAQ } from "@/content/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-[100px]">
      <Container className="grid max-w-[1200px] gap-12 md:grid-cols-[1fr_1.25fr]">
        <div className="flex flex-col items-start justify-between gap-10">
          <div className="flex flex-col items-start gap-4">
            <Tag>FAQ</Tag>
            <SplitText lines={["Have Questions?", "Check Out the FAQs"]} className="h-section" />
          </div>
          <Reveal delay={0.2} blur className="hidden md:block">
            <BookingCard />
          </Reveal>
        </div>
        <div className="flex flex-col gap-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05} y={16}>
                <div className="rounded-lg border border-line bg-surface">
                  <button
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-[18px] tracking-[-0.04em]"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.q}
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
                      <Icon name="plus" className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-[16px] leading-[1.45] tracking-[-0.02em] text-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
