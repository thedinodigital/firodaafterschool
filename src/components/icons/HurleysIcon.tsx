import { cn } from "@/lib/utils";

interface HurleysIconProps {
  className?: string;
  /** Stroke colour: defaults to currentColor so it inherits text colour. */
  color?: string;
  strokeWidth?: number;
  /** Whether to draw a thin circle around the motif (matches our other icon style). */
  ringed?: boolean;
}

/**
 * Two crossed hurleys with a sliotar at the centre — drawn from the school crest.
 * Use sparingly: only for sport / hurling-related items.
 */
export function HurleysIcon({
  className,
  color = "currentColor",
  strokeWidth = 1.6,
  ringed = false,
}: HurleysIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-5 h-5", className)}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Crossed hurleys with a sliotar"
    >
      {ringed && <circle cx="12" cy="12" r="10.5" opacity="0.5" />}
      {/* Left hurley: handle from top-right meeting at centre, head flares bottom-left */}
      <line x1="17" y1="3.5" x2="12" y2="12" />
      <path d="M12 12 L8 18 Q5.5 19.6 5 22 L8.6 22 Q9.4 19.4 11.6 17.6 L12 17" />
      {/* Right hurley: handle from top-left meeting at centre, head flares bottom-right */}
      <line x1="7" y1="3.5" x2="12" y2="12" />
      <path d="M12 12 L16 18 Q18.5 19.6 19 22 L15.4 22 Q14.6 19.4 12.4 17.6 L12 17" />
      {/* Sliotar */}
      <circle cx="12" cy="12" r="2" fill={color} stroke="none" />
      <path d="M10.4 11.4 Q12 12 13.6 11.4" stroke={color === "currentColor" ? "#ffffff" : "#ffffff"} strokeWidth="0.6" opacity="0.55" />
    </svg>
  );
}
