import { ReactNode, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, Newspaper } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const comingSoon = ["Events", "Gallery", "Calendar", "Documents", "Board portal", "Enquiries"];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { profile, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  const displayName = profile?.full_name ?? user?.email ?? "Staff";

  return (
    <div className="min-h-screen bg-cream-warm">
      {/* Top bar */}
      <header className="bg-background border-b border-foreground/10 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 lg:px-8 h-14">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/admin" className="flex items-center gap-2.5">
              <img src="/firoda-crest.png" alt="" aria-hidden="true" className="h-8 w-auto" />
              <span className="font-heading text-sm leading-tight">
                Holy <span className="italic">Cross</span>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-foreground/55">
                  Staff portal
                </span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-foreground/70">{displayName}</span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-background border-r border-foreground/10 w-64 flex-shrink-0",
            "fixed lg:sticky inset-y-0 top-14 lg:top-14 z-20 h-[calc(100vh-3.5rem)]",
            "transition-transform lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <nav className="p-4 space-y-1">
            <NavItem to="/admin" end icon={LayoutDashboard} label="Dashboard" onNav={() => setOpen(false)} />
            <NavItem to="/admin/news" icon={Newspaper} label="News" onNav={() => setOpen(false)} />
          </nav>
          <div className="px-4 mt-6">
            <p className="text-[10px] uppercase tracking-[0.18em] text-foreground/45 mb-2">
              Coming soon
            </p>
            <ul className="space-y-1.5 text-sm text-foreground/45">
              {comingSoon.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </aside>

        {open && (
          <button
            className="lg:hidden fixed inset-0 top-14 bg-black/30 z-10"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-10 min-w-0">{children}</main>
      </div>
    </div>
  );
}

function NavItem({
  to,
  icon: Icon,
  label,
  end,
  onNav,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  end?: boolean;
  onNav?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNav}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
          isActive
            ? "bg-primary text-background"
            : "text-foreground/75 hover:bg-cream-warm hover:text-foreground"
        )
      }
    >
      <Icon className="w-4 h-4" />
      {label}
    </NavLink>
  );
}
