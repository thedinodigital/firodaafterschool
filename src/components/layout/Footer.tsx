import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Mail, Phone, MapPin, Twitter } from "lucide-react";

const cols = [
  {
    title: "Our School",
    links: [
      { name: "Ethos", href: "/our-school/ethos" },
      { name: "History", href: "/our-school/history" },
      { name: "Staff", href: "/our-school/staff" },
      { name: "Board of Management", href: "/our-school/board" },
      { name: "Policies", href: "/policies" },
    ],
  },
  {
    title: "For Parents",
    links: [
      { name: "Admissions", href: "/parents/admissions" },
      { name: "Calendar", href: "/parents/calendar" },
      { name: "Newsletters", href: "/parents/newsletters" },
      { name: "Uniform & Booklists", href: "/parents/uniform" },
      { name: "Bí Cineálta", href: "/parents/bi-cinealta" },
    ],
  },
  {
    title: "More",
    links: [
      { name: "News & Events", href: "/news" },
      { name: "Activities", href: "/activities" },
      { name: "After School", href: "/after-school" },
      { name: "Archive", href: "/archive" },
      { name: "Policies", href: "/policies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground mt-24">
      <div className="container py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="lg:col-span-1 space-y-5">
            <Logo variant="cream" />
            <p className="text-sm text-footer-foreground/75 leading-relaxed max-w-xs">
              A small rural primary school serving the community between Castlecomer
              and Ballinakill since 1962.
            </p>
            <address className="not-italic text-sm text-footer-foreground/70 leading-relaxed">
              Holy Cross National School<br />
              Firoda, Castlecomer<br />
              Co. Kilkenny, R95 E22N<br />
              Ireland
            </address>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="label-eyebrow-cream mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-sm text-footer-foreground/80 hover:text-background transition-colors"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="label-eyebrow-cream mb-5">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:0564441384" className="flex items-start gap-3 text-footer-foreground/80 hover:text-background transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-soft" />
                  056 444 1384
                </a>
              </li>
              <li>
                <a href="mailto:office@holycrossfiroda.ie" className="flex items-start gap-3 text-footer-foreground/80 hover:text-background transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-soft" />
                  office@holycrossfiroda.ie
                </a>
              </li>
              <li>
                <Link to="/contact" className="flex items-start gap-3 text-footer-foreground/80 hover:text-background transition-colors">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-soft" />
                  Directions
                </Link>
              </li>
              <li>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-footer-foreground/80 hover:text-background transition-colors">
                  <Twitter className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-soft" />
                  Follow us on X
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-5 border-t border-footer-foreground/10">
              <p className="text-xs text-footer-muted leading-relaxed">
                <span className="block font-semibold text-footer-foreground/90 mb-1">After School enquiries</span>
                <Link to="/after-school" className="hover:text-background underline-offset-2 hover:underline">
                  Visit Firoda After School →
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-footer-foreground/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-footer-muted">
          <p>© {new Date().getFullYear()} Holy Cross National School, Firoda. All rights reserved.</p>
          <p>Designed by <span className="text-footer-foreground/80">Dino Digital</span></p>
        </div>
      </div>
    </footer>
  );
}
