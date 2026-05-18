import { Fragment, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, FileText, Upload, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FasLayout, RequireFasOwner } from "./FasLayout";
import { fetchAllStaff, fetchShiftsForDate, fetchVettingFor, todayISO, FasStaff, FasVettingRecord } from "@/lib/fas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const [vettingOpenFor, setVettingOpenFor] = useState<string | null>(null);

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
                const isOpen = vettingOpenFor === s.id;
                return (
                  <Fragment key={s.id}>
                    <tr className={cn(!s.active && "opacity-50")}>
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
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Button size="sm" variant="ghost" onClick={() => setVettingOpenFor(isOpen ? null : s.id)}>
                          <FileText className="w-4 h-4 mr-1" />{isOpen ? "Close" : "Records"}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => { setEditing(s); setShowAdd(false); }}>Edit</Button>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr>
                        <td colSpan={5} className="px-4 py-4 bg-foreground/[0.02]">
                          <VettingPanel staffId={s.id} staffName={`${s.first_name} ${s.last_name}`} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
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

function VettingPanel({ staffId, staffName }: { staffId: string; staffName: string }) {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["fas_vetting", staffId], queryFn: () => fetchVettingFor(staffId) });
  const refresh = () => qc.invalidateQueries({ queryKey: ["fas_vetting", staffId] });
  const [showAdd, setShowAdd] = useState(false);
  const empty = { document_type: "Garda vetting disclosure", issue_date: "", expiry_date: "", notes: "", file: null as File | null };
  const [draft, setDraft] = useState(empty);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (!draft.document_type.trim()) return toast.error("Document type required.");
    setBusy(true);
    let file_path: string | null = null;
    let file_name: string | null = null;
    if (draft.file) {
      const safe = draft.file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${staffId}/${Date.now()}-${safe}`;
      const up = await supabase.storage.from("fas-vetting").upload(path, draft.file, { upsert: false });
      if (up.error) {
        setBusy(false);
        return toast.error("File upload failed.");
      }
      file_path = path;
      file_name = draft.file.name;
    }
    const { error } = await supabase.from("fas_garda_vetting_records" as never).insert({
      staff_id: staffId,
      document_type: draft.document_type.trim(),
      issue_date: draft.issue_date || null,
      expiry_date: draft.expiry_date || null,
      notes: draft.notes.trim() || null,
      file_path,
      file_name,
    } as never);
    setBusy(false);
    if (error) return toast.error("Couldn't save record.");
    toast.success("Record saved.");
    setDraft(empty);
    setShowAdd(false);
    refresh();
  };

  const remove = async (r: FasVettingRecord) => {
    if (r.file_path) await supabase.storage.from("fas-vetting").remove([r.file_path]);
    await supabase.from("fas_garda_vetting_records" as never).delete().eq("id", r.id);
    refresh();
  };

  const openFile = async (r: FasVettingRecord) => {
    if (!r.file_path) return;
    const { data, error } = await supabase.storage.from("fas-vetting").createSignedUrl(r.file_path, 60);
    if (error || !data) return toast.error("Couldn't open file.");
    window.open(data.signedUrl, "_blank");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base">{staffName} — vetting & compliance records</h3>
        {!showAdd && (
          <Button size="sm" variant="ghost" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4 mr-1" />Add record</Button>
        )}
      </div>

      {q.isLoading ? <p className="text-xs text-foreground/55">Loading…</p> :
        (q.data ?? []).length === 0 ? <p className="text-xs text-foreground/55 italic">No records on file yet.</p> : (
          <ul className="divide-y divide-foreground/10 border border-foreground/10 rounded-md bg-background">
            {q.data!.map((r) => {
              const expiry = r.expiry_date ? new Date(r.expiry_date) : null;
              const expired = expiry && expiry.getTime() < Date.now();
              return (
                <li key={r.id} className="px-3 py-2 flex items-start justify-between gap-3">
                  <div className="text-sm">
                    <p className="font-medium">{r.document_type}</p>
                    <p className="text-xs text-foreground/60">
                      {r.issue_date && <>Issued {new Date(r.issue_date).toLocaleDateString("en-IE")} · </>}
                      {expiry && <span className={expired ? "text-red-700" : ""}>Expires {expiry.toLocaleDateString("en-IE")}{expired ? " (expired)" : ""}</span>}
                      {!r.issue_date && !expiry && "No dates recorded"}
                    </p>
                    {r.notes && <p className="text-xs text-foreground/65 mt-1">{r.notes}</p>}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {r.file_path && (
                      <Button size="sm" variant="ghost" onClick={() => openFile(r)} title={r.file_name ?? "file"}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-red-700" onClick={() => remove(r)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

      {showAdd && (
        <div className="grid sm:grid-cols-2 gap-3 p-3 border border-foreground/10 rounded-md bg-background">
          <div className="sm:col-span-2 space-y-1.5">
            <Label className="text-xs uppercase tracking-[0.14em] text-foreground/55">Document type</Label>
            <Input value={draft.document_type} onChange={(e) => setDraft({ ...draft, document_type: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-[0.14em] text-foreground/55">Issue date</Label>
            <Input type="date" value={draft.issue_date} onChange={(e) => setDraft({ ...draft, issue_date: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-[0.14em] text-foreground/55">Expiry date</Label>
            <Input type="date" value={draft.expiry_date} onChange={(e) => setDraft({ ...draft, expiry_date: e.target.value })} />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label className="text-xs uppercase tracking-[0.14em] text-foreground/55">Notes (optional)</Label>
            <Textarea rows={2} value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label className="text-xs uppercase tracking-[0.14em] text-foreground/55">Attach file (PDF, image)</Label>
            <div className="flex items-center gap-2">
              <Input type="file" accept="application/pdf,image/*" onChange={(e) => setDraft({ ...draft, file: e.target.files?.[0] ?? null })} />
              {draft.file && <Upload className="w-4 h-4 text-foreground/55" />}
            </div>
          </div>
          <div className="sm:col-span-2 flex gap-2">
            <Button size="sm" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save record"}</Button>
            <Button size="sm" variant="ghost" onClick={() => { setShowAdd(false); setDraft(empty); }}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}
