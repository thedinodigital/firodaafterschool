import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: { name: string; href: string }[];
  variant?: "cream" | "warm" | "forest";
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  variant = "cream",
  children,
}: PageHeroProps) {
  const bg = variant === "forest" ? "bg-forest-deep" : variant === "warm" ? "bg-cream-warm" : "bg-cream";
  const isForest = variant === "forest";
  return (
    <section className={cn("relative overflow-hidden grain-overlay", bg)}>
      <div className="container pt-12 lg:pt-16 pb-12 lg:pb-20">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className={cn("mb-8 text-xs", isForest ? "text-background/60" : "text-foreground/55")}>
            <ol className="flex items-center flex-wrap gap-1">
              <li>
                <Link to="/" className="hover:underline underline-offset-4">Home</Link>
              </li>
              {breadcrumb.map((b, i) => (
                <li key={b.href} className="flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 opacity-60" />
                  {i === breadcrumb.length - 1 ? (
                    <span className={cn(isForest ? "text-background" : "text-foreground")}>{b.name}</span>
                  ) : (
                    <Link to={b.href} className="hover:underline underline-offset-4">{b.name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl animate-fade-in-up">
          {eyebrow && (
            <p className={cn("mb-5", isForest ? "label-eyebrow-cream" : "label-eyebrow")}>{eyebrow}</p>
          )}
          <h1
            className={cn(
              "font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-balance leading-[1.05]",
              isForest ? "text-background" : "text-foreground"
            )}
          >
            {title}
          </h1>
          {description && (
            <div
              className={cn(
                "mt-6 text-lg md:text-xl leading-relaxed max-w-2xl text-pretty",
                isForest ? "text-background/80" : "text-foreground/70"
              )}
            >
              {description}
            </div>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
