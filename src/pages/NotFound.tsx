import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6 py-20 text-center">
      <img
        src="/firoda-crest.png"
        alt=""
        aria-hidden="true"
        className="w-[120px] h-auto mb-10 motion-safe:animate-fade-in"
      />
      <h1 className="font-heading text-3xl md:text-5xl font-medium leading-tight text-balance max-w-2xl">
        This corridor doesn't <span className="italic text-accent">lead anywhere</span>.
      </h1>
      <p className="mt-6 max-w-lg text-foreground/70 leading-relaxed">
        You might have followed an out-of-date link, or we might have moved a page.
        Either way, sorry for the bother.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Button asChild variant="forest" size="lg">
          <Link to="/">Back to the homepage</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="tel:0564441384">Call the school</a>
        </Button>
      </div>
      <p className="mt-12 text-xs text-foreground/50 leading-relaxed">
        Holy Cross National School · Firoda, Castlecomer, Co. Kilkenny · 056 444 1384
      </p>
    </div>
  );
};

export default NotFound;
