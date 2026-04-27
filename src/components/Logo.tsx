import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import crest from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  variant?: "default" | "cream";
  showWordmark?: boolean;
}

/**
 * Site logo: the Holy Cross Firoda crest + wordmark.
 * Mobile shows the crest only; from sm: upward, the wordmark sits beside it.
 */
export function Logo({ className, variant = "default", showWordmark = true }: LogoProps) {
  const isCream = variant === "cream";
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-3 group", className)}
      aria-label="Holy Cross National School, Firoda — Home"
    >
      <img
        src={crest}
        alt=""
        aria-hidden="true"
        className={cn(
          "h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105",
          isCream && "opacity-90"
        )}
      />
      {showWordmark && (
        <div className="leading-tight hidden sm:block pl-1">
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
