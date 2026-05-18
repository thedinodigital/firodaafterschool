import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <img
          src="/firoda-crest.png"
          alt=""
          aria-hidden="true"
          className="w-16 h-auto opacity-80 motion-safe:animate-pulse"
        />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  // FAS owners are blocked from the school portal — strictly separate systems.
  if (profile?.role === "fas_owner") {
    return <Navigate to="/afterschool-admin" replace />;
  }

  return <>{children}</>;
}
