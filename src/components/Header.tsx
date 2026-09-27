"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Logo from "./Logo";
import Button from "./ui/Button";
import { NAV } from "@/content/site";

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
    setSolid(y > 80);
  });

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid || open ? "border-line bg-ink/70 backdrop-blur-xl" : "border-white/15 bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-5 md:px-[100px]">
        <Link href="/" aria-label="Revvo home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-[16px] tracking-[-0.02em] text-white/90 transition-colors hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/#book" arrow={false}>
            Book Free Consultation
          </Button>
        </div>
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-line bg-surface md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`h-px w-4 bg-white transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-4 bg-white transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="flex flex-col gap-1 border-t border-line px-5 pb-6 pt-3 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 text-2xl tracking-[-0.04em]">
                {n.label}
              </Link>
            ))}
            <Link href="/#book" onClick={() => setOpen(false)} className="mt-3 rounded-lg bg-white py-3 text-center text-sm font-medium text-ink">
              Book Free Consultation
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
