import Link from "next/link";
import Logo, { LogoMark } from "./Logo";
import Button from "./ui/Button";
import { CONTACT, NAV } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:px-[100px]">
        <div className="flex flex-col gap-8">
          <Logo />
          <p className="h-section">
            Answer. Review.
            <br />
            Revive.
          </p>
          <div className="relative flex h-[200px] max-w-[320px] items-center justify-center overflow-hidden rounded-xl border border-line bg-[radial-gradient(circle_at_50%_60%,#2a2a2e,#010004_70%)]">
            <LogoMark className="h-24 w-24 drop-shadow-[0_20px_40px_rgba(255,255,255,0.15)]" />
          </div>
        </div>

        <div>
          <p className="mono-label text-muted">Navigation</p>
          <ul className="mt-6 flex flex-col gap-4 text-[17px] tracking-[-0.03em]">
            <li>
              <Link href="/" className="transition-colors hover:text-muted">Home</Link>
            </li>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-muted">{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="transition-colors hover:text-muted">Book a Consultation</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <p className="mono-label text-muted">Email</p>
            <a href={`mailto:${CONTACT.email}`} className="mt-3 block break-all text-[22px] tracking-[-0.05em] transition-colors hover:text-muted lg:text-[26px]">
              {CONTACT.email}
            </a>
          </div>
          <div>
            <p className="mono-label text-muted">Phone</p>
            <a href={`tel:+1${CONTACT.phone.replace(/\D/g, "")}`} className="mt-3 block text-[18px] tracking-[-0.03em] transition-colors hover:text-muted">
              {CONTACT.phone}
            </a>
          </div>
          <div>
            <p className="mono-label text-muted">Ready when you are</p>
            <Button href="/#book" variant="primary" className="mt-3">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 border-t border-line px-5 py-6 md:flex-row md:px-[100px]">
        <p className="mono-label text-muted">© {new Date().getFullYear()} Revvo. All rights reserved.</p>
        <p className="mono-label text-muted">AI automations for service businesses</p>
      </div>
    </footer>
  );
}
