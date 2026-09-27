import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

/** Opens absolute (off-site) links, like the Calendly booking page, in a new tab. */
export const linkTarget = (href: string) =>
  /^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

const styles: Record<Variant, string> = {
  primary: "bg-white text-ink hover:bg-[#e6e6e6]",
  secondary: "bg-surface text-white border border-line hover:bg-raised",
};

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
      <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Button whose label rolls up to a second copy on hover. */
export default function Button({
  href,
  children,
  variant = "secondary",
  arrow = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      {...linkTarget(href)}
      className={`group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium tracking-[-0.02em] transition-colors duration-400 ${styles[variant]} ${className}`}
    >
      <span className="relative block h-[1.1em] overflow-hidden leading-[1.1em]">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span aria-hidden="true" className="absolute inset-x-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
      </span>
      {arrow && <Chevron />}
    </Link>
  );
}
