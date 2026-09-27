import { LogoMark } from "./Logo";
import Button from "./ui/Button";

/** The "Talk with …" card from the reference, pointing at the consultation booking section. */
export default function BookingCard({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full max-w-[300px] gap-4 rounded-xl border border-line bg-surface/80 p-2 backdrop-blur-md ${className}`}>
      <div className="relative flex aspect-[4/5] w-[96px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#3a3a40] to-[#0b0b0d]">
        <span className="absolute h-10 w-10 rounded-full border border-white/40" style={{ animation: "pulse-ring 2.4s ease-out infinite" }} />
        <span className="absolute h-10 w-10 rounded-full border border-white/40" style={{ animation: "pulse-ring 2.4s ease-out 1.2s infinite" }} />
        <LogoMark className="relative h-10 w-10" />
      </div>
      <div className="flex min-w-0 flex-col justify-between py-2 pr-2">
        <div>
          <p className="text-[18px] tracking-[-0.04em]">Talk with Revvo</p>
          <p className="mono-label mt-1 text-muted">Free 30-min call</p>
        </div>
        <Button href="/#book" variant="primary" className="mt-3 !px-3 !py-2.5">
          Book consultation
        </Button>
      </div>
    </div>
  );
}
