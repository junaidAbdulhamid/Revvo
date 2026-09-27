// The Revvo mark: two stacked upward chevrons ("rev up"), echoing the double V in reVVo.
// Points are shared with the 3D hero scene so the mark and the object always match.
export const CHEVRON_TOP: [number, number][] = [
  [4, 15], [16, 3], [28, 15], [28, 21], [16, 9], [4, 21],
];
export const CHEVRON_BOTTOM: [number, number][] = CHEVRON_TOP.map(([x, y]) => [x, y + 11]);

const toPoints = (pts: [number, number][]) => pts.map((p) => p.join(",")).join(" ");

export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 35" className={className} aria-hidden="true">
      <polygon points={toPoints(CHEVRON_TOP)} fill="#fff" />
      <polygon points={toPoints(CHEVRON_BOTTOM)} fill="none" stroke="#fff" strokeWidth="1.4" strokeLinejoin="miter" opacity="0.7" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-[25px] font-medium leading-none tracking-[-0.06em]">revvo</span>
    </span>
  );
}
