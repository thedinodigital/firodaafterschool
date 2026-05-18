import { FormEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FasLogin() {
  const { session, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session && profile?.role === "fas_owner") {
      navigate("/afterschool-admin", { replace: true });
    }
  }, [session, profile, navigate]);

  if (loading) return null;
  if (session && profile?.role === "fas_owner") {
    return <Navigate to="/afterschool-admin" replace />;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setBusy(false);
      setError("That email and password didn't match. Try again, or text Marie if you're stuck.");
      return;
    }
    // Verify role after signing in
    const { data: u } = await supabase.auth.getUser();
    if (u.user) {
      const { data: p } = await supabase
        .from("staff_profiles")
        .select("role")
        .eq("id", u.user.id)
        .maybeSingle();
      if (!p || (p as { role: string }).role !== "fas_owner") {
        await supabase.auth.signOut();
        setBusy(false);
        setError("This account doesn't have access to Firoda After School.");
        return;
      }
    }
    setBusy(false);
    navigate("/afterschool-admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm bg-background border border-foreground/10 rounded-2xl p-8 shadow-soft">
        <div className="flex flex-col items-center text-center mb-6">
          <img src="/firoda-crest.png" alt="" aria-hidden="true" className="w-16 h-auto mb-3" />
          <p className="text-xs uppercase tracking-[0.18em] text-accent mb-1">Firoda After School</p>
          <h1 className="font-heading text-2xl">Owner sign in</h1>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        <p className="text-xs text-foreground/55 leading-relaxed mt-6 text-center">
          Forgot your password? Reach out to your administrator to reset it.
        </p>
      </div>
    </div>
  );
}
