import { ReactNode } from "react";
import { Link, NavLink, Navigate, useLocation } from "react-router-dom";
import { Home, ClipboardList, Users, UserCog, FileText, Settings, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/afterschool-admin", label: "Today", icon: Home, end: true },
  { to: "/afterschool-admin/register", label: "Register", icon: ClipboardList },
  { to: "/afterschool-admin/children", label: "Children", icon: Users },
  { to: "/afterschool-admin/staff", label: "Staff", icon: UserCog },
  { to: "/afterschool-admin/invoices", label: "Invoices", icon: FileText },
  { to: "/afterschool-admin/settings", label: "Settings", icon: Settings },
];

export function RequireFasOwner({ children }: { children: ReactNode }) {
  const { session, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="font-heading text-accent opacity-70 motion-safe:animate-pulse">Firoda After School</p>
      </div>
    );
  }
  if (!session) {
    return <Navigate to="/afterschool-admin/login" replace state={{ from: location }} />;
  }
  if (profile && profile.role !== "fas_owner") {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="max-w-md text-center bg-background border border-foreground/10 rounded-xl p-8">
          <h1 className="font-heading text-2xl mb-3">Different account needed</h1>
          <p className="text-sm text-foreground/70 mb-5">
            This area is just for the Firoda After School owner. You're signed in to a school staff account.
          </p>
          <Link to="/admin" className="text-sm underline underline-offset-2 hover:text-accent">
            Go to school portal →
          </Link>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
              isActive
                ? "bg-accent/15 text-accent font-medium"
                : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            )
          }
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export function FasLayout({ children }: { children: ReactNode }) {
  const { profile, user, signOut } = useAuth();
  const displayName = profile?.full_name ?? user?.email ?? "Owner";

  return (
    <div className="min-h-screen bg-cream flex flex-col print:bg-white">
      {/* Top bar */}
      <header className="bg-background border-b border-foreground/10 print:hidden">
        <div className="flex items-center gap-3 px-4 sm:px-6 h-14">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden -ml-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4 bg-background">
              <div className="mb-6">
                <p className="font-heading text-lg text-accent">Firoda After School</p>
              </div>
              <NavList />
            </SheetContent>
          </Sheet>

          <Link to="/afterschool-admin" className="flex items-center gap-2.5">
            <img src="/firoda-crest.png" alt="" className="w-8 h-auto" aria-hidden="true" />
            <span className="font-heading text-base sm:text-lg">
              <span className="text-accent">Firoda</span> After School
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-3 text-sm">
            <span className="text-foreground/60 hidden sm:inline">{displayName}</span>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-foreground/70">
              <LogOut className="w-4 h-4 mr-1.5" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block w-56 shrink-0 border-r border-foreground/10 bg-background/50 p-4 print:hidden">
          <NavList />
        </aside>

        {/* Main */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1400px]">{children}</main>
      </div>
    </div>
  );
}
