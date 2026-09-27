"use client";

import { motion } from "motion/react";
import Logo from "../Logo";
import { Container, Icon, RidgeArt, SectionHeading } from "../ui/common";
import { COMPARISON } from "@/content/site";

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden py-[100px]">
      <RidgeArt glow={0.35} className="opacity-70" />
      <Container className="relative">
        <SectionHeading
          tag="WHY REVVO"
          lines={["Built to Win You", "More Jobs"]}
          body="Hiring costs a fortune and software sits unused. Revvo gives you a done-for-you system that works every hour of every day."
        />
        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-[16px] tracking-[-0.02em]">
            <thead>
              <tr>
                <th className="w-[18%] border border-line bg-ink/40 p-6" />
                {COMPARISON.columns.map((c, i) => (
                  <th key={c} className={`border border-line p-6 font-normal ${i === 0 ? "bg-white/10" : "bg-ink/40"}`}>
                    {i === 0 ? <Logo /> : <span className="text-[18px]">{c}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row, r) => (
                <motion.tr
                  key={row.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: r * 0.08 }}
                >
                  <td className="border border-line bg-ink/40 px-6 py-5">{row.label}</td>
                  {row.values.map(([kind, text], i) => (
                    <td key={i} className={`border border-line px-6 py-5 ${i === 0 ? "bg-white/10" : "bg-ink/40 text-white/80"}`}>
                      <span className="flex items-center gap-3">
                        <Icon name={kind === "ok" ? "check" : kind} className={`h-5 w-5 shrink-0 ${kind === "ok" ? "" : "text-white/70"}`} />
                        {text}
                      </span>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
