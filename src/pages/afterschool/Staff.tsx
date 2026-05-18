import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FasLayout, RequireFasOwner } from "./FasLayout";
import { fetchAllStaff, fetchShiftsForDate, todayISO, FasStaff } from "@/lib/fas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function FasStaffPage() {
  return (
    <RequireFasOwner>
      <FasLayout>
        <StaffContent />
      </FasLayout>
    </RequireFasOwner>
  );
}

function StaffContent() {
  const qc = useQueryClient();
  const today = todayISO();
  const staffQ = useQuery({ queryKey: ["fas_staff_all"], queryFn: fetchAllStaff });
  const shiftsQ = useQuery({ queryKey: ["fas_shifts", today], queryFn: () => fetchShiftsForDate(today) });
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<FasStaff | null>(null);

  const refresh = () => qc.invalidateQueries({ queryKey: ["fas_staff_all"] });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-3xl">Staff</h1>
        <Button onClick={() => { setShowAdd(true); setEditing(null); }} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="w-4 h-4 mr-1.5" /> Add staff member
        </Button>
      </div>

      {(showAdd || editing) && (
        <StaffForm
          existing={editing}
          onCancel={() => { setShowAdd(false); setEditing(null); }}
          onDone={() => { setShowAdd(false); setEditing(null); refresh(); }}
        />
      )}

      <div className="bg-background border border-foreground/10 rounded-xl overflow-hidden">
        {staffQ.isLoading ? <p className="p-6 text-sm text-foreground/60">Loading…</p> : (
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-foreground/55 border-b border-foreground/10">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Garda vetting</th>
                <th className="px-4 py-3">Today</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5">
              {(staffQ.data ?? []).map((s) => {
                const shift = (shiftsQ.data ?? []).find((sh) => sh.staff_id === s.id);
                const vetting = s.garda_vetting_renewal_date ? new Date(s.garda_vetting_renewal_date) : null;
                const daysToRenewal = vetting ? Math.ceil((vetting.getTime() - Date.now()) / (24 * 3600 * 1000)) : null;
                const vettingClass = daysToRenewal === null ? "text-foreground/40" : daysToRenewal < 0 ? "text-red-700" : daysToRenewal < 60 ? "text-amber-700" : "text-foreground/65";
                return (
                  <tr key={s.id} className={cn(!s.active && "opacity-50")}>
                    <td className="px-4 py-3 font-medium">{s.first_name} {s.last_name}</td>
                    <td className="px-4 py-3 text-foreground/70">{s.role_title}</td>
                    <td className={cn("px-4 py-3 text-xs", vettingClass)}>
                      {vetting ? vetting.toLocaleDateString("en-IE") : "—"}
                      {daysToRenewal !== null && daysToRenewal < 0 && " (past due)"}
                      {daysToRenewal !== null && daysToRenewal >= 0 && daysToRenewal < 60 && ` (${daysToRenewal}d)`}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {shift ? (shift.end_at ? `In and out` : `On shift since ${new Date(shift.start_at).toLocaleTimeString("en-IE", { hour: "2-digit", minute: "2-digit" })}`) : <span className="text-foreground/40">Not in</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" onClick={() => { setEditing(s); setShowAdd(false); }}>Edit</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StaffForm({ existing, onCancel, onDone }: { existing: FasStaff | null; onCancel: () => void; onDone: () => void }) {
  const [draft, setDraft] = useState<Partial<FasStaff>>(existing ?? { first_name: "", last_name: "", role_title: "Assistant", active: true });
  return (
    <section className="bg-background border border-foreground/10 rounded-xl p-5">
      <h2 className="font-heading text-lg mb-4">{existing ? "Edit staff member" : "Add staff member"}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="First name"><Input value={draft.first_name ?? ""} onChange={(e) => setDraft({ ...draft, first_name: e.target.value })} /></Field>
        <Field label="Last name"><Input value={draft.last_name ?? ""} onChange={(e) => setDraft({ ...draft, last_name: e.target.value })} /></Field>
        <Field label="Role title"><Input value={draft.role_title ?? ""} onChange={(e) => setDraft({ ...draft, role_title: e.target.value })} /></Field>
        <Field label="Garda vetting renewal">
          <Input type="date" value={draft.garda_vetting_renewal_date ?? ""} onChange={(e) => setDraft({ ...draft, garda_vetting_renewal_date: e.target.value || null })} />
        </Field>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" checked={draft.active ?? true} onChange={(e) => setDraft({ ...draft, active: e.target.checked })} />
          Active
        </label>
      </div>
      <div className="mt-4 flex gap-2">
        <Button onClick={async () => {
          if (!draft.first_name || !draft.last_name || !draft.role_title) return toast.error("Fill name and role.");
          if (existing) {
            await supabase.from("fas_staff" as never).update(draft as never).eq("id", existing.id);
          } else {
            await supabase.from("fas_staff" as never).insert(draft as never);
          }
          toast.success("Saved.");
          onDone();
        }}>Save</Button>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
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
