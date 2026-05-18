import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FasLayout, RequireFasOwner } from "./FasLayout";
import {
  YEAR_GROUPS,
  YEAR_GROUP_LABELS,
  FasYearGroup,
  FasChild,
  FasGuardian,
  FasCollector,
  FasBilling,
  fetchGuardiansFor,
  fetchCollectorsFor,
  fetchBillingFor,
  ageInYears,
  fromCents,
  toCents,
  formatMoney,
} from "@/lib/fas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function FasChildEditor() {
  return (
    <RequireFasOwner>
      <FasLayout>
        <ChildEditorContent />
      </FasLayout>
    </RequireFasOwner>
  );
}

function ChildEditorContent() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const childQ = useQuery({
    queryKey: ["fas_child", id],
    enabled: !isNew,
    queryFn: async () => {
      const { data, error } = await supabase.from("fas_children" as never).select("*").eq("id", id!).maybeSingle();
      if (error) throw error;
      return data as unknown as FasChild | null;
    },
  });

  const [draft, setDraft] = useState<Partial<FasChild>>({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    school_year_group: "junior_infants",
    allergies_and_medical: "",
    active: true,
  });
  const [savingChild, setSavingChild] = useState(false);

  useEffect(() => {
    if (childQ.data) {
      setDraft({
        first_name: childQ.data.first_name,
        last_name: childQ.data.last_name,
        date_of_birth: childQ.data.date_of_birth,
        school_year_group: childQ.data.school_year_group,
        allergies_and_medical: childQ.data.allergies_and_medical ?? "",
        active: childQ.data.active,
      });
    }
  }, [childQ.data]);

  // Quick first-guardian capture for new child flow
  const [g1, setG1] = useState({ full_name: "", relationship: "Mother", phone_primary: "" });

  const saveChild = async () => {
    if (!draft.first_name?.trim() || !draft.last_name?.trim() || !draft.date_of_birth || !draft.school_year_group) {
      toast.error("Name, date of birth and year group are required.");
      return;
    }
    setSavingChild(true);
    if (isNew) {
      if (!g1.full_name.trim() || !g1.phone_primary.trim()) {
        setSavingChild(false);
        toast.error("Add at least one guardian name and phone.");
        return;
      }
      const { data, error } = await supabase
        .from("fas_children" as never)
        .insert(draft as never)
        .select()
        .single();
      if (error || !data) {
        setSavingChild(false);
        toast.error("Couldn't enrol child. Try again.");
        return;
      }
      const newId = (data as { id: string }).id;
      await supabase.from("fas_guardians" as never).insert({
        child_id: newId,
        full_name: g1.full_name,
        relationship: g1.relationship,
        phone_primary: g1.phone_primary,
        is_billing_contact: true,
        is_emergency_contact: true,
      } as never);
      await supabase.from("fas_collectors" as never).insert({
        child_id: newId,
        full_name: g1.full_name,
        relationship: g1.relationship,
      } as never);
      setSavingChild(false);
      toast.success(`${draft.first_name} is now enrolled.`);
      navigate(`/afterschool-admin/children/${newId}`);
    } else {
      const { error } = await supabase.from("fas_children" as never).update(draft as never).eq("id", id!);
      setSavingChild(false);
      if (error) toast.error("Couldn't save changes.");
      else {
        toast.success("Changes saved.");
        qc.invalidateQueries({ queryKey: ["fas_child", id] });
        qc.invalidateQueries({ queryKey: ["fas_children_all"] });
        qc.invalidateQueries({ queryKey: ["fas_children_active"] });
      }
    }
  };

  const setInactive = async () => {
    await supabase.from("fas_children" as never).update({ active: false } as never).eq("id", id!);
    toast.success("Marked as inactive. Records are retained.");
    navigate("/afterschool-admin/children");
  };

  if (!isNew && childQ.isLoading) return <p className="text-foreground/60">Loading…</p>;

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <Link to="/afterschool-admin/children" className="text-sm text-foreground/60 hover:text-foreground inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to children
        </Link>
        <h1 className="font-heading text-3xl mt-2">
          {isNew ? "Add a child" : `${draft.first_name} ${draft.last_name}`}
          {!isNew && draft.date_of_birth && (
            <span className="ml-3 text-base text-foreground/55">age {ageInYears(draft.date_of_birth)}</span>
          )}
        </h1>
      </div>

      {/* Basic */}
      <Card title="Basic info">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="First name">
            <Input value={draft.first_name ?? ""} onChange={(e) => setDraft({ ...draft, first_name: e.target.value })} />
          </Field>
          <Field label="Last name">
            <Input value={draft.last_name ?? ""} onChange={(e) => setDraft({ ...draft, last_name: e.target.value })} />
          </Field>
          <Field label="Date of birth">
            <Input type="date" value={draft.date_of_birth ?? ""} onChange={(e) => setDraft({ ...draft, date_of_birth: e.target.value })} />
          </Field>
          <Field label="Year group">
            <Select value={draft.school_year_group} onValueChange={(v) => setDraft({ ...draft, school_year_group: v as FasYearGroup })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {YEAR_GROUPS.map((y) => <SelectItem key={y} value={y}>{YEAR_GROUP_LABELS[y]}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Card>

      {/* Allergies */}
      <Card title="Allergies & medical needs" tone={draft.allergies_and_medical ? "warn" : "default"}>
        <Textarea
          rows={3}
          placeholder="Allergies, asthma, EpiPen location, etc. Leave blank if none."
          value={draft.allergies_and_medical ?? ""}
          onChange={(e) => setDraft({ ...draft, allergies_and_medical: e.target.value })}
        />
      </Card>

      {/* First guardian (only when creating) */}
      {isNew && (
        <Card title="Primary guardian (required)">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name">
              <Input value={g1.full_name} onChange={(e) => setG1({ ...g1, full_name: e.target.value })} />
            </Field>
            <Field label="Relationship">
              <Input value={g1.relationship} onChange={(e) => setG1({ ...g1, relationship: e.target.value })} />
            </Field>
            <Field label="Primary phone">
              <Input value={g1.phone_primary} onChange={(e) => setG1({ ...g1, phone_primary: e.target.value })} />
            </Field>
          </div>
          <p className="text-xs text-foreground/55 mt-3">You can add more guardians, collectors and billing once enrolled.</p>
        </Card>
      )}

      <div className="flex items-center gap-3">
        <Button onClick={saveChild} disabled={savingChild} className="bg-accent text-accent-foreground hover:bg-accent/90">
          {savingChild ? "Saving…" : isNew ? "Enrol child" : "Save changes"}
        </Button>
        {!isNew && draft.active && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="text-red-700">Mark as inactive</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Mark {draft.first_name} as inactive?</AlertDialogTitle>
                <AlertDialogDescription>
                  Records are kept for the legal retention period. You can reverse this later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={setInactive}>Mark inactive</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {!isNew && id && (
        <>
          <GuardiansSection childId={id} />
          <CollectorsSection childId={id} />
          <BillingSection childId={id} />
          <AttendancePreview childId={id} />
          <InvoicePreview childId={id} />
        </>
      )}
    </div>
  );
}

function Card({ title, children, tone }: { title: string; children: React.ReactNode; tone?: "default" | "warn" }) {
  return (
    <section className={`bg-background border rounded-xl p-5 ${tone === "warn" ? "border-red-300" : "border-foreground/10"}`}>
      <h2 className="font-heading text-lg mb-4">{title}</h2>
      {children}
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

function GuardiansSection({ childId }: { childId: string }) {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["fas_guardians", childId], queryFn: () => fetchGuardiansFor(childId) });
  const [showAdd, setShowAdd] = useState(false);
  const refresh = () => qc.invalidateQueries({ queryKey: ["fas_guardians", childId] });

  return (
    <Card title="Guardians">
      {q.isLoading ? <p className="text-sm text-foreground/55">Loading…</p> : (
        <ul className="divide-y divide-foreground/10 -mx-2">
          {(q.data ?? []).map((g) => (
            <li key={g.id} className="flex items-start justify-between gap-3 px-2 py-3">
              <div>
                <p className="font-medium text-sm">{g.full_name} <span className="text-foreground/55 font-normal">— {g.relationship}</span></p>
                <p className="text-xs text-foreground/65">{g.phone_primary}{g.email ? ` · ${g.email}` : ""}</p>
                <div className="flex gap-2 mt-1">
                  {g.is_billing_contact && <span className="text-[10px] uppercase tracking-wider text-accent">Billing</span>}
                  {g.is_emergency_contact && <span className="text-[10px] uppercase tracking-wider text-foreground/50">Emergency</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={async () => {
                  await supabase.from("fas_collectors" as never).insert({ child_id: childId, full_name: g.full_name, relationship: g.relationship, phone: g.phone_primary } as never);
                  toast.success("Added as collector.");
                  qc.invalidateQueries({ queryKey: ["fas_collectors", childId] });
                }}>+ Collector</Button>
                <Button size="sm" variant="ghost" className="text-red-700" onClick={async () => {
                  await supabase.from("fas_guardians" as never).delete().eq("id", g.id);
                  refresh();
                }}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showAdd ? (
        <AddGuardianForm childId={childId} onDone={() => { setShowAdd(false); refresh(); }} />
      ) : (
        <Button variant="ghost" size="sm" onClick={() => setShowAdd(true)} className="mt-2"><Plus className="w-4 h-4 mr-1" />Add guardian</Button>
      )}
    </Card>
  );
}

function AddGuardianForm({ childId, onDone }: { childId: string; onDone: () => void }) {
  const [g, setG] = useState({ full_name: "", relationship: "Mother", phone_primary: "", email: "", is_billing_contact: false });
  return (
    <div className="mt-4 grid sm:grid-cols-2 gap-3 p-3 rounded-md bg-cream-warm">
      <Input placeholder="Full name" value={g.full_name} onChange={(e) => setG({ ...g, full_name: e.target.value })} />
      <Input placeholder="Relationship" value={g.relationship} onChange={(e) => setG({ ...g, relationship: e.target.value })} />
      <Input placeholder="Phone" value={g.phone_primary} onChange={(e) => setG({ ...g, phone_primary: e.target.value })} />
      <Input placeholder="Email (optional)" value={g.email} onChange={(e) => setG({ ...g, email: e.target.value })} />
      <label className="flex items-center gap-2 text-sm sm:col-span-2">
        <input type="checkbox" checked={g.is_billing_contact} onChange={(e) => setG({ ...g, is_billing_contact: e.target.checked })} />
        Mark as billing contact
      </label>
      <div className="sm:col-span-2 flex gap-2">
        <Button size="sm" onClick={async () => {
          if (!g.full_name || !g.phone_primary) return toast.error("Name and phone required.");
          await supabase.from("fas_guardians" as never).insert({ child_id: childId, ...g, email: g.email || null } as never);
          onDone();
        }}>Add</Button>
        <Button size="sm" variant="ghost" onClick={onDone}>Cancel</Button>
      </div>
    </div>
  );
}

function CollectorsSection({ childId }: { childId: string }) {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["fas_collectors", childId], queryFn: () => fetchCollectorsFor(childId) });
  const [showAdd, setShowAdd] = useState(false);
  const refresh = () => qc.invalidateQueries({ queryKey: ["fas_collectors", childId] });
  const [draft, setDraft] = useState({ full_name: "", relationship: "", phone: "", notes: "" });

  return (
    <Card title="Authorised collectors">
      {q.isLoading ? <p className="text-sm text-foreground/55">Loading…</p> : (
        <ul className="divide-y divide-foreground/10 -mx-2">
          {(q.data ?? []).map((c) => (
            <li key={c.id} className="flex justify-between gap-3 px-2 py-3">
              <div>
                <p className="font-medium text-sm">{c.full_name} <span className="text-foreground/55 font-normal">— {c.relationship}</span></p>
                {(c.phone || c.notes) && <p className="text-xs text-foreground/65">{[c.phone, c.notes].filter(Boolean).join(" · ")}</p>}
              </div>
              <Button size="sm" variant="ghost" className="text-red-700" onClick={async () => {
                await supabase.from("fas_collectors" as never).delete().eq("id", c.id);
                refresh();
              }}><Trash2 className="w-4 h-4" /></Button>
            </li>
          ))}
        </ul>
      )}
      {showAdd ? (
        <div className="mt-4 grid sm:grid-cols-2 gap-3 p-3 rounded-md bg-cream-warm">
          <Input placeholder="Full name" value={draft.full_name} onChange={(e) => setDraft({ ...draft, full_name: e.target.value })} />
          <Input placeholder="Relationship" value={draft.relationship} onChange={(e) => setDraft({ ...draft, relationship: e.target.value })} />
          <Input placeholder="Phone (optional)" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
          <Input placeholder="Notes (optional)" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
          <div className="sm:col-span-2 flex gap-2">
            <Button size="sm" onClick={async () => {
              if (!draft.full_name || !draft.relationship) return toast.error("Name and relationship required.");
              await supabase.from("fas_collectors" as never).insert({ child_id: childId, ...draft, phone: draft.phone || null, notes: draft.notes || null } as never);
              setDraft({ full_name: "", relationship: "", phone: "", notes: "" });
              setShowAdd(false);
              refresh();
            }}>Add</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <Button variant="ghost" size="sm" onClick={() => setShowAdd(true)} className="mt-2"><Plus className="w-4 h-4 mr-1" />Add collector</Button>
      )}
    </Card>
  );
}

function BillingSection({ childId }: { childId: string }) {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["fas_billing", childId], queryFn: () => fetchBillingFor(childId) });
  const [showNew, setShowNew] = useState(false);
  const [draft, setDraft] = useState<{ billing_type: FasBilling["billing_type"]; amount_euros: string; notes: string }>({
    billing_type: "weekly_flat",
    amount_euros: "",
    notes: "",
  });

  const current = (q.data ?? []).find((b) => b.active);

  return (
    <Card title="Billing">
      {q.isLoading ? <p className="text-sm text-foreground/55">Loading…</p> : current ? (
        <p className="text-sm">
          <strong>{current.billing_type.replace("_", " ")}</strong> — {formatMoney(current.amount_cents)} {current.billing_type === "weekly_flat" ? "per week" : current.billing_type === "daily_rate" ? "per day" : "per session"}
          {current.notes && <span className="block text-xs text-foreground/55 mt-1">{current.notes}</span>}
        </p>
      ) : <p className="text-sm text-foreground/55 italic">No billing set yet.</p>}

      {showNew ? (
        <div className="mt-4 grid sm:grid-cols-3 gap-3 p-3 rounded-md bg-cream-warm">
          <Select value={draft.billing_type} onValueChange={(v) => setDraft({ ...draft, billing_type: v as FasBilling["billing_type"] })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly_flat">Weekly flat</SelectItem>
              <SelectItem value="daily_rate">Daily rate</SelectItem>
              <SelectItem value="per_session">Per session</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Amount in €" type="number" step="0.01" value={draft.amount_euros} onChange={(e) => setDraft({ ...draft, amount_euros: e.target.value })} />
          <Input placeholder="Notes (optional)" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
          <div className="sm:col-span-3 flex gap-2">
            <Button size="sm" onClick={async () => {
              const euros = parseFloat(draft.amount_euros);
              if (!euros || euros < 0) return toast.error("Enter a valid amount.");
              if (current) await supabase.from("fas_billing_arrangements" as never).update({ active: false } as never).eq("id", current.id);
              await supabase.from("fas_billing_arrangements" as never).insert({
                child_id: childId,
                billing_type: draft.billing_type,
                amount_cents: toCents(euros),
                notes: draft.notes || null,
                active: true,
              } as never);
              setShowNew(false);
              qc.invalidateQueries({ queryKey: ["fas_billing", childId] });
              toast.success("Billing updated.");
            }}>Save</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <Button variant="ghost" size="sm" onClick={() => setShowNew(true)} className="mt-3">Change arrangement</Button>
      )}
    </Card>
  );
}

function AttendancePreview({ childId }: { childId: string }) {
  const q = useQuery({
    queryKey: ["fas_att_for_child", childId],
    queryFn: async () => {
      const since = new Date();
      since.setDate(since.getDate() - 30);
      const { data } = await supabase
        .from("fas_attendance_days" as never)
        .select("*")
        .eq("child_id", childId)
        .gte("attendance_date", since.toISOString().slice(0, 10))
        .order("attendance_date", { ascending: false });
      return (data ?? []) as Array<{ id: string; attendance_date: string; arrived_at: string | null; collected_at: string | null; collected_by_name: string | null }>;
    },
  });
  return (
    <Card title="Recent attendance (last 30 days)">
      {q.isLoading ? <p className="text-sm text-foreground/55">Loading…</p> :
        (q.data ?? []).length === 0 ? <p className="text-sm text-foreground/55 italic">No attendance recorded yet.</p> : (
          <ul className="text-sm divide-y divide-foreground/10 -mx-2">
            {q.data!.map((a) => (
              <li key={a.id} className="px-2 py-2 flex justify-between">
                <span className="text-foreground/75">{new Date(a.attendance_date).toLocaleDateString("en-IE")}</span>
                <span className="text-foreground/60 text-xs">
                  {a.arrived_at ? new Date(a.arrived_at).toLocaleTimeString("en-IE", { hour: "2-digit", minute: "2-digit" }) : "—"}
                  {" → "}
                  {a.collected_at ? new Date(a.collected_at).toLocaleTimeString("en-IE", { hour: "2-digit", minute: "2-digit" }) : "—"}
                  {a.collected_by_name && <span className="ml-2 italic">· {a.collected_by_name}</span>}
                </span>
              </li>
            ))}
          </ul>
        )}
    </Card>
  );
}

function InvoicePreview({ childId }: { childId: string }) {
  const q = useQuery({
    queryKey: ["fas_inv_for_child", childId],
    queryFn: async () => {
      const { data } = await supabase
        .from("fas_invoices" as never)
        .select("*")
        .eq("child_id", childId)
        .order("created_at", { ascending: false });
      return (data ?? []) as Array<{ id: string; invoice_number: string; amount_cents: number; status: string; period_start: string; period_end: string }>;
    },
  });
  return (
    <Card title="Invoices">
      {q.isLoading ? <p className="text-sm text-foreground/55">Loading…</p> :
        (q.data ?? []).length === 0 ? <p className="text-sm text-foreground/55 italic">No invoices yet.</p> : (
          <ul className="text-sm divide-y divide-foreground/10 -mx-2">
            {q.data!.map((i) => (
              <li key={i.id} className="px-2 py-2 flex justify-between">
                <Link to={`/afterschool-admin/invoices/${i.id}`} className="hover:text-accent">{i.invoice_number}</Link>
                <span className="text-foreground/60 text-xs">
                  {formatMoney(i.amount_cents)} · {i.status}
                </span>
              </li>
            ))}
          </ul>
        )}
    </Card>
  );
}
