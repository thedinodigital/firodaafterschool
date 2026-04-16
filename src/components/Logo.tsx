import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "cream";
  showWordmark?: boolean;
}

export function Logo({ className, variant = "default", showWordmark = true }: LogoProps) {
  const isCream = variant === "cream";
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-3 group", className)}
      aria-label="Holy Cross National School, Firoda — Home"
    >
      <div className="relative">
        <span
          className={cn(
            "flex items-center justify-center w-11 h-11 rounded-full transition-transform group-hover:scale-105",
            isCream ? "bg-background text-primary" : "bg-primary text-background"
          )}
        >
          <span className="font-heading italic text-2xl font-medium leading-none -mt-0.5">H</span>
        </span>
        <span
          className={cn(
            "absolute inset-0 rounded-full border pointer-events-none",
            isCream ? "border-accent-soft/70" : "border-accent/70"
          )}
          style={{ transform: "scale(1.18)" }}
          aria-hidden="true"
        />
      </div>
      {showWordmark && (
        <div className="leading-tight">
          <div
            className={cn(
              "font-heading text-[17px] font-medium",
              isCream ? "text-background" : "text-foreground"
            )}
          >
            Holy <span className="italic">Cross</span>
          </div>
          <div
            className={cn(
              "uppercase text-[9px] tracking-[0.22em] font-semibold",
              isCream ? "text-background/70" : "text-primary"
            )}
          >
            Firoda · Est. 1962
          </div>
        </div>
      )}
    </Link>
  );
}
