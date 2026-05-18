import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FasLayout, RequireFasOwner } from "./FasLayout";
import { fetchActiveChildren, fetchSettings, formatMoney, FasChild } from "@/lib/fas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FasInvoiceNew() {
  return (
    <RequireFasOwner>
      <FasLayout>
        <NewInvoiceContent />
      </FasLayout>
    </RequireFasOwner>
  );
}

function lastCompletedWeek() {
  const today = new Date();
  // Find last Monday-Friday
  const dow = today.getDay() || 7;
  const lastFri = new Date(today);
  lastFri.setDate(today.getDate() - dow - 2);
  const lastMon = new Date(lastFri);
  lastMon.setDate(lastFri.getDate() - 4);
  return { start: lastMon.toISOString().slice(0, 10), end: lastFri.toISOString().slice(0, 10) };
}

function NewInvoiceContent() {
  const navigate = useNavigate();
  const childrenQ = useQuery({ queryKey: ["fas_children_active"], queryFn: fetchActiveChildren });
  const settingsQ = useQuery({ queryKey: ["fas_settings"], queryFn: fetchSettings });

  const week = lastCompletedWeek();
  const [childId, setChildId] = useState<string>("ALL");
  const [periodStart, setPeriodStart] = useState(week.start);
  const [periodEnd, setPeriodEnd] = useState(week.end);
  const [busy, setBusy] = useState(false);

  async function generateForChild(child: FasChild) {
    // attendance count
    const { data: att } = await supabase
      .from("fas_attendance_days" as never)
      .select("id, attendance_date, arrived_at")
      .eq("child_id", child.id)
      .gte("attendance_date", periodStart)
      .lte("attendance_date", periodEnd);
    const days = ((att ?? []) as Array<{ arrived_at: string | null }>).filter((a) => a.arrived_at).length;

    // billing
    const { data: bill } = await supabase
      .from("fas_billing_arrangements" as never)
      .select("*")
      .eq("child_id", child.id)
      .eq("active", true)
      .maybeSingle();
    if (!bill) {
      toast.error(`${child.first_name} has no active billing — skipped.`);
      return null;
    }
    const b = bill as { billing_type: string; amount_cents: number };
    const amount =
      b.billing_type === "weekly_flat" ? b.amount_cents : b.billing_type === "daily_rate" ? b.amount_cents * days : b.amount_cents * days;

    // billing contact
    const { data: g } = await supabase
      .from("fas_guardians" as never)
      .select("full_name, email")
      .eq("child_id", child.id)
      .eq("is_billing_contact", true)
      .maybeSingle();
    const billing = (g as { full_name: string; email: string | null } | null) ?? { full_name: `${child.first_name}'s guardian`, email: null };

    // invoice number
    const year = new Date().getFullYear();
    const settings = settingsQ.data!;
    const prefix = settings.invoice_prefix || "FAS";
    const { data: existing } = await supabase
      .from("fas_invoices" as never)
      .select("invoice_number")
      .ilike("invoice_number", `${prefix}-${year}-%`);
    const nextNum = (existing?.length ?? 0) + 1;
    const invoiceNumber = `${prefix}-${year}-${String(nextNum).padStart(3, "0")}`;

    const { data: inv, error } = await supabase
      .from("fas_invoices" as never)
      .insert({
        invoice_number: invoiceNumber,
        child_id: child.id,
        billing_contact_name: billing.full_name,
        billing_contact_email: billing.email,
        period_start: periodStart,
        period_end: periodEnd,
        attendance_days: days,
        amount_cents: amount,
        status: "draft",
      } as never)
      .select()
      .single();
    if (error) {
      toast.error(`Couldn't create invoice for ${child.first_name}.`);
      return null;
    }
    return inv as { id: string };
  }

  const generate = async () => {
    if (!childrenQ.data || !settingsQ.data) return;
    setBusy(true);
    if (childId === "ALL") {
      const results = await Promise.all(childrenQ.data.map(generateForChild));
      setBusy(false);
      const made = results.filter(Boolean).length;
      toast.success(`${made} draft invoice${made === 1 ? "" : "s"} created.`);
      navigate("/afterschool-admin/invoices");
    } else {
      const child = childrenQ.data.find((c) => c.id === childId);
      if (!child) return;
      const inv = await generateForChild(child);
      setBusy(false);
      if (inv) navigate(`/afterschool-admin/invoices/${inv.id}`);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link to="/afterschool-admin/invoices" className="text-sm text-foreground/60 hover:text-foreground inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to invoices
        </Link>
        <h1 className="font-heading text-3xl mt-2">New invoice</h1>
        <p className="text-sm text-foreground/65 mt-1">
          Defaults to last completed Mon–Fri week. Pick "all active children" to batch-generate one draft per child.
        </p>
      </div>

      <section className="bg-background border border-foreground/10 rounded-xl p-6 space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-[0.14em] text-foreground/55">Child</Label>
          <Select value={childId} onValueChange={setChildId}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All active children (batch)</SelectItem>
              {(childrenQ.data ?? []).map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.first_name} {c.last_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-[0.14em] text-foreground/55">Period start</Label>
            <Input type="date" value={periodStart} onChange={(e) => setPeriodStart(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-[0.14em] text-foreground/55">Period end</Label>
            <Input type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} />
          </div>
        </div>
        <Button onClick={generate} disabled={busy} className="bg-accent text-accent-foreground hover:bg-accent/90">
          {busy ? "Generating…" : childId === "ALL" ? "Generate drafts for all" : "Generate draft"}
        </Button>
      </section>
    </div>
  );
}
