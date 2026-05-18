import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Check, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FasLayout, RequireFasOwner } from "./FasLayout";
import {
  FasChild,
  FasCollector,
  fetchActiveChildren,
  fetchActiveStaff,
  fetchAttendanceForDate,
  fetchCollectorsFor,
  fetchSettings,
  fetchShiftsForDate,
  ratioStatus,
  todayISO,
  weekdayFromISO,
  YEAR_GROUP_LABELS,
  YEAR_GROUP_ORDER,
} from "@/lib/fas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function FasRegister() {
  return (
    <RequireFasOwner>
      <FasLayout>
        <RegisterContent />
      </FasLayout>
    </RequireFasOwner>
  );
}

type FilterMode = "all" | "present" | "expected" | "collected";

function RegisterContent() {
  const [date, setDate] = useState(todayISO());
  const [filter, setFilter] = useState<FilterMode>("all");
  const qc = useQueryClient();

  const childrenQ = useQuery({ queryKey: ["fas_children_active"], queryFn: fetchActiveChildren });
  const staffQ = useQuery({ queryKey: ["fas_staff_active"], queryFn: fetchActiveStaff });
  const attendanceQ = useQuery({ queryKey: ["fas_attendance", date], queryFn: () => fetchAttendanceForDate(date) });
  const shiftsQ = useQuery({ queryKey: ["fas_shifts", date], queryFn: () => fetchShiftsForDate(date) });
  const settingsQ = useQuery({ queryKey: ["fas_settings"], queryFn: fetchSettings });

  const [breachStartedAt, setBreachStartedAt] = useState<string | null>(null);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["fas_attendance", date] });
    qc.invalidateQueries({ queryKey: ["fas_shifts", date] });
  };

  const children = childrenQ.data ?? [];
  const staff = staffQ.data ?? [];
  const attendance = attendanceQ.data ?? [];
  const shifts = shiftsQ.data ?? [];
  const settings = settingsQ.data;

  const presentNow = attendance.filter((a) => a.arrived_at && !a.collected_at);
  const staffOnShift = shifts.filter((s) => !s.end_at);
  const status = settings ? ratioStatus(presentNow.length, staffOnShift.length, settings.max_ratio) : null;

  // Log ratio breach when crossing into red
  useEffect(() => {
    if (!status || !settings) return;
    if (status.status === "red" && !breachStartedAt) {
      setBreachStartedAt(new Date().toISOString());
      void supabase.from("fas_ratio_breach_events" as never).insert({
        occurred_on: date,
        occurred_at: new Date().toISOString(),
        children_present: presentNow.length,
        staff_present: staffOnShift.length,
        ratio_limit: settings.max_ratio,
        notes: "Auto-logged from register screen.",
      } as never);
    } else if (status.status !== "red" && breachStartedAt) {
      setBreachStartedAt(null);
    }
  }, [status?.status]);

  const sorted = useMemo(
    () =>
      [...children].sort((a, b) => {
        const yo = YEAR_GROUP_ORDER[a.school_year_group] - YEAR_GROUP_ORDER[b.school_year_group];
        if (yo !== 0) return yo;
        return a.last_name.localeCompare(b.last_name);
      }),
    [children]
  );

  const filtered = sorted.filter((c) => {
    const a = attendance.find((x) => x.child_id === c.id);
    const state = !a || !a.arrived_at ? "expected" : a.collected_at ? "collected" : "present";
    if (filter === "all") return true;
    return state === filter;
  });

  if (childrenQ.isLoading || staffQ.isLoading || settingsQ.isLoading) {
    return <p className="text-foreground/60">Loading the register…</p>;
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl">Register</h1>
          <p className="text-sm text-foreground/60 mt-1">Tap to sign children in and out. Staff sign-in is at the top.</p>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-[0.14em] text-foreground/55 mb-1">Date</label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-44" />
        </div>
      </div>

      {/* Staff strip */}
      <section>
        <p className="text-xs uppercase tracking-[0.14em] text-foreground/55 mb-2">Staff on shift</p>
        <div className="flex flex-wrap gap-2">
          {staff.map((s) => {
            const onShift = shifts.find((sh) => sh.staff_id === s.id && !sh.end_at);
            return (
              <button
                key={s.id}
                onClick={async () => {
                  if (onShift) {
                    const { error } = await supabase
                      .from("fas_staff_shifts" as never)
                      .update({ end_at: new Date().toISOString() } as never)
                      .eq("id", onShift.id);
                    if (error) toast.error("Couldn't end shift.");
                    else toast.success(`${s.first_name} signed out.`);
                  } else {
                    const { error } = await supabase
                      .from("fas_staff_shifts" as never)
                      .insert({ staff_id: s.id, shift_date: date, start_at: new Date().toISOString() } as never);
                    if (error) toast.error("Couldn't start shift.");
                    else toast.success(`${s.first_name} signed in.`);
                  }
                  refresh();
                }}
                className={cn(
                  "px-4 py-3 rounded-xl border text-left min-w-[140px] min-h-[44px] transition-all",
                  onShift
                    ? "bg-emerald-50 border-emerald-300"
                    : "bg-background border-foreground/15 hover:border-accent/40"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn("w-2.5 h-2.5 rounded-full", onShift ? "bg-emerald-500" : "bg-foreground/20")} />
                  <span className="font-medium text-sm">{s.first_name} {s.last_name}</span>
                </div>
                <p className="text-xs text-foreground/60 mt-0.5">{s.role_title}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Ratio meter */}
      {status && settings && (
        <RatioMeter children={presentNow.length} staff={staffOnShift.length} max={settings.max_ratio} statusLabel={status.status} explanation={status.explanation} />
      )}

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {(["all", "present", "expected", "collected"] as FilterMode[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm capitalize border",
              filter === f
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-background border-foreground/15 hover:border-foreground/30"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Child rows */}
      <section className="bg-background border border-foreground/10 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <p className="p-6 text-sm text-foreground/55">No children match this filter.</p>
        ) : (
          <ul className="divide-y divide-foreground/10">
            {filtered.map((c) => (
              <ChildRow key={c.id} child={c} date={date} attendance={attendance.find((a) => a.child_id === c.id)} onChange={refresh} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function RatioMeter({
  children,
  staff,
  max,
  statusLabel,
  explanation,
}: {
  children: number;
  staff: number;
  max: number;
  statusLabel: "green" | "amber" | "red";
  explanation: string;
}) {
  const cap = Math.max(1, staff) * max;
  const pct = Math.min(100, (children / cap) * 100);

  return (
    <div className="bg-background border border-foreground/10 rounded-xl p-4 md:p-5">
      <div className="flex items-end justify-between mb-2">
        <p className="text-sm font-medium">
          {children} children · {staff} staff · capacity {cap}
        </p>
        <p className="text-xs text-foreground/55">1:{max} target</p>
      </div>
      <div className="h-3 rounded-full bg-foreground/10 overflow-hidden relative">
        <div
          className={cn(
            "h-full transition-all",
            statusLabel === "red" ? "bg-red-500" : statusLabel === "amber" ? "bg-amber-500" : "bg-emerald-500"
          )}
          style={{ width: `${pct}%` }}
        />
        <div className="absolute inset-y-0 right-0 border-l-2 border-foreground/40" style={{ marginRight: "0%" }} />
      </div>
      {statusLabel === "red" && (
        <div className="mt-3 flex items-start gap-2 p-3 rounded-md bg-red-50 border border-red-200 text-red-900 text-sm">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>You're now over the 1:{max} ratio. Add another staff member to continue safely.</p>
        </div>
      )}
      <p className="text-xs text-foreground/60 mt-2">{explanation}</p>
    </div>
  );
}

function ChildRow({
  child,
  date,
  attendance,
  onChange,
}: {
  child: FasChild;
  date: string;
  attendance: { id: string; arrived_at: string | null; collected_at: string | null; collected_by_name: string | null } | undefined;
  onChange: () => void;
}) {
  const [collectOpen, setCollectOpen] = useState(false);

  const markArrived = async () => {
    const now = new Date().toISOString();
    if (attendance) {
      const { error } = await supabase
        .from("fas_attendance_days" as never)
        .update({ arrived_at: now } as never)
        .eq("id", attendance.id);
      if (error) toast.error("Couldn't update arrival.");
    } else {
      const { error } = await supabase
        .from("fas_attendance_days" as never)
        .insert({ child_id: child.id, attendance_date: date, arrived_at: now } as never);
      if (error) toast.error("Couldn't sign in.");
    }
    toast.success(`${child.first_name} signed in.`);
    onChange();
  };

  const state = !attendance?.arrived_at ? "expected" : attendance.collected_at ? "collected" : "present";

  return (
    <li className="flex flex-col sm:flex-row sm:items-center gap-3 p-4">
      <div className="flex-1 min-w-0">
        <p className="font-medium">
          {child.first_name} {child.last_name}
        </p>
        <p className="text-xs text-foreground/60">
          {YEAR_GROUP_LABELS[child.school_year_group]}
          {child.allergies_and_medical && (
            <span className="ml-2 text-red-700">⚠ {child.allergies_and_medical}</span>
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={markArrived}
          disabled={!!attendance?.arrived_at}
          variant={attendance?.arrived_at ? "ghost" : "outline"}
          className="min-h-[44px] min-w-[110px]"
        >
          {attendance?.arrived_at ? (
            <>
              <Check className="w-4 h-4 mr-1.5 text-emerald-600" />
              {new Date(attendance.arrived_at).toLocaleTimeString("en-IE", { hour: "2-digit", minute: "2-digit" })}
            </>
          ) : (
            "Arrived"
          )}
        </Button>

        <Button
          onClick={() => setCollectOpen(true)}
          disabled={!attendance?.arrived_at || !!attendance?.collected_at}
          variant={attendance?.collected_at ? "ghost" : "outline"}
          className="min-h-[44px] min-w-[110px]"
        >
          {attendance?.collected_at ? (
            <>
              <Check className="w-4 h-4 mr-1.5 text-emerald-600" />
              {new Date(attendance.collected_at).toLocaleTimeString("en-IE", { hour: "2-digit", minute: "2-digit" })}
            </>
          ) : (
            "Collected"
          )}
        </Button>

        <span
          className={cn(
            "text-xs px-2.5 py-1 rounded-full border w-24 text-center",
            state === "present"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : state === "collected"
              ? "bg-foreground/5 border-foreground/15 text-foreground/60"
              : "bg-background border-foreground/15 text-foreground/60"
          )}
        >
          {state === "present" ? "Present" : state === "collected" ? "Collected" : "Expected"}
        </span>
      </div>

      {collectOpen && (
        <CollectorPicker
          child={child}
          attendanceId={attendance?.id ?? null}
          date={date}
          onClose={() => setCollectOpen(false)}
          onDone={() => {
            setCollectOpen(false);
            onChange();
          }}
        />
      )}
    </li>
  );
}

function CollectorPicker({
  child,
  attendanceId,
  date,
  onClose,
  onDone,
}: {
  child: FasChild;
  attendanceId: string | null;
  date: string;
  onClose: () => void;
  onDone: () => void;
}) {
  const collectorsQ = useQuery({
    queryKey: ["fas_collectors", child.id],
    queryFn: () => fetchCollectorsFor(child.id),
  });
  const [picked, setPicked] = useState<FasCollector | null>(null);
  const [unauthName, setUnauthName] = useState("");
  const [unauthNote, setUnauthNote] = useState("");

  const collectors = (collectorsQ.data ?? []).filter((c) => c.active);

  const commit = async (collectorId: string | null, name: string, note?: string) => {
    const now = new Date().toISOString();
    const payload: Record<string, unknown> = {
      collected_at: now,
      collected_by_id: collectorId,
      collected_by_name: name,
      notes: note ?? null,
    };
    if (attendanceId) {
      const { error } = await supabase.from("fas_attendance_days" as never).update(payload as never).eq("id", attendanceId);
      if (error) {
        toast.error("Couldn't record collection.");
        return;
      }
    } else {
      const { error } = await supabase.from("fas_attendance_days" as never).insert({
        child_id: child.id,
        attendance_date: date,
        arrived_at: now,
        ...payload,
      } as never);
      if (error) {
        toast.error("Couldn't record collection.");
        return;
      }
    }
    toast.success(`${child.first_name} collected by ${name}.`);
    onDone();
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Collect {child.first_name}</DialogTitle>
          <DialogDescription>Tap the person collecting today.</DialogDescription>
        </DialogHeader>

        {collectorsQ.isLoading ? (
          <p className="text-sm text-foreground/60">Loading authorised collectors…</p>
        ) : (
          <div className="space-y-2">
            {collectors.map((c) => (
              <button
                key={c.id}
                onClick={() => commit(c.id, c.full_name)}
                className="w-full text-left p-3 rounded-md border border-foreground/15 hover:border-accent/50 hover:bg-accent/5 transition"
              >
                <p className="font-medium text-sm">{c.full_name}</p>
                <p className="text-xs text-foreground/60">{c.relationship}{c.notes ? ` · ${c.notes}` : ""}</p>
              </button>
            ))}

            <details className="mt-3 pt-3 border-t border-foreground/10">
              <summary className="text-sm text-foreground/70 cursor-pointer">Someone else is collecting</summary>
              <div className="mt-3 p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-900 space-y-3">
                <p className="font-medium">
                  ⚠ This person isn't on {child.first_name}'s authorised collector list. Phone the primary guardian to verify before releasing.
                </p>
                <Input placeholder="Collector's full name" value={unauthName} onChange={(e) => setUnauthName(e.target.value)} />
                <Textarea rows={2} placeholder="Verification note (e.g. 'Confirmed by Mary McGrath on phone at 17.10')" value={unauthNote} onChange={(e) => setUnauthNote(e.target.value)} />
                <Button
                  onClick={() => commit(null, unauthName, `UNAUTHORISED COLLECTOR — ${unauthNote || "no verification note recorded"}`)}
                  disabled={!unauthName.trim()}
                  variant="outline"
                  className="w-full"
                >
                  Record and release
                </Button>
              </div>
            </details>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
