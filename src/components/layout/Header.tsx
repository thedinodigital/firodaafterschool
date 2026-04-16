import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
}

const navigation: NavItem[] = [
  {
    name: "Our School",
    href: "/our-school",
    children: [
      { name: "Ethos", href: "/our-school/ethos" },
      { name: "History", href: "/our-school/history" },
      { name: "Staff", href: "/our-school/staff" },
      { name: "Board of Management", href: "/our-school/board" },
    ],
  },
  {
    name: "Parents",
    href: "/parents",
    children: [
      { name: "Admissions", href: "/parents/admissions" },
      { name: "Calendar", href: "/parents/calendar" },
      { name: "Newsletters", href: "/parents/newsletters" },
      { name: "Uniform", href: "/parents/uniform" },
      { name: "Booklists", href: "/parents/booklists" },
      { name: "Bí Cineálta", href: "/parents/bi-cinealta" },
      { name: "Funding (NRRP)", href: "/parents/funding" },
    ],
  },
  { name: "News & Events", href: "/news" },
  {
    name: "Activities",
    href: "/activities",
    children: [
      { name: "Creative School", href: "/activities/creative-school" },
      { name: "Amber Flag", href: "/activities/amber-flag" },
      { name: "Active Flag", href: "/activities/active-flag" },
      { name: "Student Council", href: "/activities/student-council" },
      { name: "Grandparents' Day", href: "/activities/grandparents-day" },
      { name: "Sport", href: "/activities/sport" },
      { name: "Music", href: "/activities/music" },
      { name: "Special Occasions", href: "/activities/special-occasions" },
      { name: "Our Art Work", href: "/activities/art-work" },
    ],
  },
  { name: "After School", href: "/after-school" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setOpenMobileGroup(null);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "bg-background/85 backdrop-blur-md",
        scrolled ? "border-b border-foreground/10 shadow-soft" : "border-b border-transparent"
      )}
    >
      <nav className="container flex items-center justify-between py-4">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1",
                    "text-foreground/75 hover:text-foreground",
                    (isActive || location.pathname.startsWith(item.href + "/")) && "text-foreground"
                  )
                }
              >
                {item.name}
                {item.children && <ChevronDown className="w-3 h-3 opacity-60" />}
              </NavLink>
              {item.children && (
                <div className="absolute left-0 top-full pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 min-w-[220px]">
                  <div className="bg-background border border-foreground/10 rounded-lg shadow-card py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center">
          <Button asChild variant="accent" size="sm" className="px-5">
            <Link to="/parents/admissions">Enrol 2026–27</Link>
          </Button>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-foreground/10 bg-background animate-fade-in">
          <div className="container py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name}>
                <div className="flex items-center">
                  <Link
                    to={item.href}
                    className={cn(
                      "flex-1 px-3 py-3 text-sm font-medium",
                      location.pathname === item.href ? "text-foreground" : "text-foreground/80"
                    )}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() => setOpenMobileGroup(openMobileGroup === item.name ? null : item.name)}
                      className="p-3 text-foreground/60"
                      aria-label={`Toggle ${item.name} submenu`}
                    >
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          openMobileGroup === item.name && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                </div>
                {item.children && openMobileGroup === item.name && (
                  <div className="pl-6 pb-2 space-y-0.5">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        to={c.href}
                        className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3">
              <Button asChild variant="accent" className="w-full">
                <Link to="/parents/admissions">Enrol 2026–27</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
