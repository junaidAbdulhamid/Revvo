"use client";

import { Container } from "../ui/common";
import { Reveal, Scramble } from "../ui/motion";
import { INDUSTRIES } from "@/content/site";

export default function Industries() {
  return (
    <section className="py-[100px]">
      <Container className="flex flex-col items-center gap-6">
        <p className="mono-label text-white/80">
          <Scramble text="BUILT FOR BUSINESSES THAT RUN ON THE PHONE" />
        </p>
        <div className="grid w-full grid-cols-2 border-l border-t border-line md:grid-cols-5">
          {INDUSTRIES.map((name, i) => (
            <Reveal key={name} delay={(i % 5) * 0.06} y={12}>
              <div className="group flex h-[90px] items-center justify-center border-b border-r border-line md:h-[110px]">
                <span className="text-[20px] tracking-[-0.05em] text-muted transition-colors duration-400 group-hover:text-white md:text-[24px]">
                  {name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
