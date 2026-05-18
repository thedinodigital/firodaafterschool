import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FasLayout, RequireFasOwner } from "./FasLayout";
import { fetchSettings, FasSettings } from "@/lib/fas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FasSettings() {
  return (
    <RequireFasOwner>
      <FasLayout>
        <SettingsContent />
      </FasLayout>
    </RequireFasOwner>
  );
}

function SettingsContent() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["fas_settings"], queryFn: fetchSettings });
  const [draft, setDraft] = useState<FasSettings | null>(null);

  useEffect(() => {
    if (q.data) setDraft(q.data);
  }, [q.data]);

  const save = async () => {
    if (!draft) return;
    const { error } = await supabase.from("fas_settings" as never).update({
      service_name: draft.service_name,
      opening_time: draft.opening_time,
      closing_time: draft.closing_time,
      max_ratio: draft.max_ratio,
      tusla_registration: draft.tusla_registration,
      bank_details: draft.bank_details,
      invoice_prefix: draft.invoice_prefix,
      invoice_notes: draft.invoice_notes,
    } as never).eq("id", 1);
    if (error) toast.error("Couldn't save settings.");
    else {
      toast.success("Settings saved.");
      qc.invalidateQueries({ queryKey: ["fas_settings"] });
    }
  };

  if (q.isLoading || !draft) return <p className="text-foreground/60">Loading…</p>;

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="font-heading text-3xl">Settings</h1>

      <section className="bg-background border border-foreground/10 rounded-xl p-6 space-y-4">
        <h2 className="font-heading text-lg">Service</h2>
        <Field label="Service name"><Input value={draft.service_name} onChange={(e) => setDraft({ ...draft, service_name: e.target.value })} /></Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Opening time"><Input type="time" value={draft.opening_time?.slice(0, 5)} onChange={(e) => setDraft({ ...draft, opening_time: e.target.value })} /></Field>
          <Field label="Closing time"><Input type="time" value={draft.closing_time?.slice(0, 5)} onChange={(e) => setDraft({ ...draft, closing_time: e.target.value })} /></Field>
        </div>
        <Field label="Maximum ratio (1 : N)">
          <Input type="number" min={1} max={20} value={draft.max_ratio} onChange={(e) => setDraft({ ...draft, max_ratio: parseInt(e.target.value || "12", 10) })} />
        </Field>
        <Field label="Tusla registration number"><Input value={draft.tusla_registration ?? ""} onChange={(e) => setDraft({ ...draft, tusla_registration: e.target.value })} /></Field>
      </section>

      <section className="bg-background border border-foreground/10 rounded-xl p-6 space-y-4">
        <h2 className="font-heading text-lg">Invoicing</h2>
        <Field label="Invoice number prefix"><Input value={draft.invoice_prefix} onChange={(e) => setDraft({ ...draft, invoice_prefix: e.target.value })} /></Field>
        <Field label="Bank details (shown on invoice)">
          <Textarea rows={4} value={draft.bank_details ?? ""} onChange={(e) => setDraft({ ...draft, bank_details: e.target.value })} placeholder="Bank: AIB&#10;Account name: ...&#10;IBAN: ..." />
        </Field>
        <Field label="Invoice notes / payment terms">
          <Textarea rows={3} value={draft.invoice_notes ?? ""} onChange={(e) => setDraft({ ...draft, invoice_notes: e.target.value })} />
        </Field>
      </section>

      <div>
        <Button onClick={save} className="bg-accent text-accent-foreground hover:bg-accent/90">Save settings</Button>
      </div>

      <DataExport />
    </div>
  );
}

function DataExport() {
  const [busy, setBusy] = useState(false);

  const exportTable = async (table: string, filename: string) => {
    const { data, error } = await supabase.from(table as never).select("*");
    if (error || !data) {
      toast.error(`Couldn't export ${table}.`);
      return;
    }
    const rows = data as Record<string, unknown>[];
    if (rows.length === 0) {
      toast.error(`No rows in ${table}.`);
      return;
    }
    const headers = Object.keys(rows[0]);
    const csv =
      headers.join(",") +
      "\n" +
      rows
        .map((r) =>
          headers
            .map((h) => {
              const v = r[h];
              const s = v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
              return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
            })
            .join(",")
        )
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAll = async () => {
    setBusy(true);
    await exportTable("fas_children", "fas_children.csv");
    await exportTable("fas_guardians", "fas_guardians.csv");
    await exportTable("fas_collectors", "fas_collectors.csv");
    await exportTable("fas_attendance_days", "fas_attendance.csv");
    await exportTable("fas_invoices", "fas_invoices.csv");
    setBusy(false);
    toast.success("All CSVs downloaded.");
  };

  return (
    <section className="bg-background border border-foreground/10 rounded-xl p-6 space-y-3">
      <h2 className="font-heading text-lg">Your data</h2>
      <p className="text-sm text-foreground/65">You can take your records out of this system at any time.</p>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={exportAll} disabled={busy}>
          <Download className="w-4 h-4 mr-1.5" /> Export all data as CSV
        </Button>
        <Button variant="outline" onClick={() => window.print()}>
          <FileText className="w-4 h-4 mr-1.5" /> Print attendance log
        </Button>
      </div>
      <p className="text-xs text-foreground/55">
        For Tusla inspections, open the Register page on the dates of interest and use the print button.
      </p>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-[0.14em] text-foreground/55">{label}</Label>
      {children}
    </div>
  );
}
