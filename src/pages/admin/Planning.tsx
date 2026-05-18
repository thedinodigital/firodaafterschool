import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AlertTriangle, ChevronDown, ChevronRight, Star, Plus, Info, Trash2, Printer } from "lucide-react";
import { toast } from "sonner";
import {
  LineChart as RChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

import { AdminLayout } from "./AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { cn } from "@/lib/utils";
import {
  YEAR_GROUPS,
  YEAR_GROUP_LABELS,
  YearGroup,
  EnrolmentSnapshot,
  Scenario,
  StaffingThreshold,
  fetchCurrentSnapshots,
  fetchScenarios,
  fetchThresholds,
  computeProjection,
  riskFor,
  futureAcademicYears,
} from "@/lib/planning";

export default function Planning() {
  const { profile, user, loading } = useAuth();

  if (loading) return null;

  if (profile?.role !== "admin") {
    return (
      <AdminLayout>
        <div className="max-w-xl mx-auto mt-20 text-center">
          <h1 className="font-heading text-2xl mb-3">Admins only</h1>
          <p className="text-foreground/70">
            The class size & enrolment planner is restricted to admin users. If you think you should have access, ask the principal to update your role.
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PlanningContent userName={profile.full_name ?? user?.email ?? "you"} />
    </AdminLayout>
  );
}

function PlanningContent({ userName }: { userName: string }) {
  const qc = useQueryClient();

  const snapshotsQ = useQuery({ queryKey: ["enrolment_snapshots"], queryFn: fetchCurrentSnapshots });
  const scenariosQ = useQuery({ queryKey: ["projection_scenarios"], queryFn: fetchScenarios });
  const thresholdsQ = useQuery({ queryKey: ["staffing_thresholds"], queryFn: fetchThresholds });

  const [editingSnapshot, setEditingSnapshot] = useState(false);
  const [editingScenario, setEditingScenario] = useState(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeScenarioId && scenariosQ.data?.length) {
      const baseline = scenariosQ.data.find((s) => s.is_baseline);
      setActiveScenarioId((baseline ?? scenariosQ.data[0]).id);
    }
  }, [scenariosQ.data, activeScenarioId]);

  if (snapshotsQ.isLoading || scenariosQ.isLoading || thresholdsQ.isLoading) {
    return <p className="text-foreground/60">Loading the planner…</p>;
  }

  if (snapshotsQ.error || scenariosQ.error || thresholdsQ.error) {
    return (
      <p className="text-foreground/70">
        Couldn't load the projection — please refresh, or contact the office if it keeps happening.
      </p>
    );
  }

  const snapshots = snapshotsQ.data ?? [];
  const scenarios = scenariosQ.data ?? [];
  const thresholds = thresholdsQ.data ?? [];

  const currentYear = snapshots[0]?.academic_year ?? "2025-26";
  const currentCounts: Record<YearGroup, number> = Object.fromEntries(
    YEAR_GROUPS.map((yg) => [yg, snapshots.find((s) => s.year_group === yg)?.count ?? 0])
  ) as Record<YearGroup, number>;

  const currentSnapshotMap = Object.fromEntries(snapshots.map((s) => [s.year_group, s]));
  const total = YEAR_GROUPS.reduce((s, yg) => s + currentCounts[yg], 0);

  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) ?? scenarios[0];

  const projection = activeScenario
    ? computeProjection(currentCounts, currentYear, activeScenario, thresholds, 5)
    : [];

  const currentRow = projection[0];
  const currentRisk = currentRow ? riskFor(currentRow.total, currentRow.band, thresholds) : "green";

  const sortedDates = snapshots.map((s) => s.updated_at).sort();
  const lastUpdated = sortedDates[sortedDates.length - 1];

  const isSeedData = snapshots.every((s) => !s.updated_by);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Section A: header */}
      <header>
        <h1 className="font-heading text-3xl md:text-4xl mb-2">Class size & enrolment planning</h1>
        <p className="text-foreground/70 max-w-2xl">
          Model future enrolment, see staffing risk early, and build the case for an appeal if you need one.
        </p>
      </header>

      {isSeedData && (
        <div className="bg-cream-warm border border-foreground/10 rounded-lg p-4 text-sm text-foreground/75">
          These are placeholder numbers to get you started. Hit <strong>Edit current numbers</strong> to enter the real headcount when you have a moment.
        </div>
      )}

      <SnapshotCard
        academicYear={currentYear}
        total={total}
        band={currentRow?.band ?? null}
        risk={currentRisk}
        lastUpdated={lastUpdated}
        onEdit={() => setEditingSnapshot((v) => !v)}
        editing={editingSnapshot}
      />

      {editingSnapshot && (
        <SnapshotEditor
          snapshots={currentSnapshotMap as Record<YearGroup, EnrolmentSnapshot | undefined>}
          academicYear={currentYear}
          onSaved={() => {
            setEditingSnapshot(false);
            qc.invalidateQueries({ queryKey: ["enrolment_snapshots"] });
          }}
        />
      )}

      {/* Section C: scenarios */}
      {activeScenario && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-heading text-2xl">Projection</h2>
            <NewScenarioButton onCreated={(id) => setActiveScenarioId(id)} />
          </div>

          <Tabs value={activeScenarioId ?? undefined} onValueChange={(v) => { setActiveScenarioId(v); setEditingScenario(false); }}>
            <TabsList className="flex flex-wrap h-auto gap-1">
              {scenarios.map((s) => (
                <TabsTrigger key={s.id} value={s.id} className="gap-1.5">
                  {s.name}
                  {s.is_baseline && <Star className="w-3 h-3 fill-current" aria-label="Baseline" />}
                </TabsTrigger>
              ))}
            </TabsList>

            {scenarios.map((s) => (
              <TabsContent key={s.id} value={s.id} className="space-y-6 mt-6">
                <ProjectionGrid
                  current={currentCounts}
                  currentYear={currentYear}
                  scenario={s}
                  thresholds={thresholds}
                />
                <ProjectionChart
                  current={currentCounts}
                  currentYear={currentYear}
                  scenario={s}
                  thresholds={thresholds}
                />
                <div>
                  <Button variant="ghost" onClick={() => setEditingScenario((v) => !v)}>
                    {editingScenario ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                    Edit scenario assumptions
                  </Button>
                </div>
                {editingScenario && (
                  <ScenarioEditor
                    scenario={s}
                    currentYear={currentYear}
                    hasOtherBaseline={scenarios.some((x) => x.is_baseline && x.id !== s.id)}
                    onSaved={() => setEditingScenario(false)}
                  />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </section>
      )}

      {/* Section E: derived figures */}
      {activeScenario && (
        <DerivedFigures
          scenarios={scenarios}
          currentCounts={currentCounts}
          currentYear={currentYear}
          thresholds={thresholds}
        />
      )}

      <div className="pt-4 border-t border-foreground/10">
        <Link to="/admin/planning/appeal">
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Generate appeal summary
          </Button>
        </Link>
      </div>
    </div>
  );
}

/* ===================== Snapshot card ===================== */

function SnapshotCard({
  academicYear,
  total,
  band,
  risk,
  lastUpdated,
  onEdit,
  editing,
}: {
  academicYear: string;
  total: number;
  band: StaffingThreshold | null;
  risk: "green" | "amber" | "red";
  lastUpdated?: string;
  onEdit: () => void;
  editing: boolean;
}) {
  const colorClass =
    risk === "red"
      ? "bg-red-50 border-red-300 text-red-900"
      : risk === "amber"
      ? "bg-amber-50 border-amber-300 text-amber-900"
      : "bg-emerald-50 border-emerald-300 text-emerald-900";

  return (
    <section className="bg-background border border-foreground/10 rounded-xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/55 mb-1">This year</p>
          <p className="font-heading text-2xl">{academicYear.replace("-", "–")}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onEdit}>
          {editing ? "Close" : "Edit current numbers"} {editing ? null : "→"}
        </Button>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6 items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/55 mb-1">Total pupils</p>
          <p className="font-heading text-6xl">{total}</p>
        </div>
        <div className={cn("rounded-lg border px-4 py-3", colorClass)}>
          <p className="text-xs uppercase tracking-[0.18em] opacity-70 mb-1">Current staffing band</p>
          <p className="font-medium">
            {band ? `${band.config_label} — Principal + ${band.total_teachers - 1} class teachers` : "Below minimum staffing"}
          </p>
        </div>
      </div>
      {lastUpdated && (
        <p className="text-xs text-foreground/50 mt-4">
          Last updated {new Date(lastUpdated).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      )}
    </section>
  );
}

/* ===================== Snapshot editor ===================== */

function SnapshotEditor({
  snapshots,
  academicYear,
  onSaved,
}: {
  snapshots: Record<YearGroup, EnrolmentSnapshot | undefined>;
  academicYear: string;
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState<Record<YearGroup, { count: number; notes: string }>>(
    () =>
      Object.fromEntries(
        YEAR_GROUPS.map((yg) => [
          yg,
          { count: snapshots[yg]?.count ?? 0, notes: snapshots[yg]?.notes ?? "" },
        ])
      ) as Record<YearGroup, { count: number; notes: string }>
  );

  const qc = useQueryClient();
  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: async () => {
      const rows = YEAR_GROUPS.map((yg) => ({
        academic_year: academicYear,
        year_group: yg,
        count: draft[yg].count,
        notes: draft[yg].notes || null,
        is_current: true,
        updated_at: new Date().toISOString(),
        updated_by: user?.id ?? null,
      }));
      const { error } = await supabase
        .from("enrolment_snapshots")
        .upsert(rows, { onConflict: "academic_year,year_group" });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Headcount updated");
      qc.invalidateQueries({ queryKey: ["enrolment_snapshots"] });
      onSaved();
    },
    onError: () => toast.error("Couldn't save — please try again."),
  });

  return (
    <section className="bg-background border border-foreground/10 rounded-xl p-6">
      <h3 className="font-heading text-lg mb-4">Edit current numbers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {YEAR_GROUPS.map((yg) => (
          <div key={yg} className="space-y-1.5">
            <label className="text-xs uppercase tracking-[0.14em] text-foreground/60">
              {YEAR_GROUP_LABELS[yg]}
            </label>
            <Input
              type="number"
              min={0}
              value={draft[yg].count}
              onChange={(e) =>
                setDraft((d) => ({ ...d, [yg]: { ...d[yg], count: parseInt(e.target.value || "0", 10) } }))
              }
            />
            <Input
              type="text"
              placeholder="Notes (optional)"
              className="text-xs italic"
              value={draft[yg].notes}
              onChange={(e) => setDraft((d) => ({ ...d, [yg]: { ...d[yg], notes: e.target.value } }))}
            />
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          {mutation.isPending ? "Saving…" : "Save"}
        </Button>
      </div>
    </section>
  );
}

/* ===================== Projection grid ===================== */

function ProjectionGrid({
  current,
  currentYear,
  scenario,
  thresholds,
}: {
  current: Record<YearGroup, number>;
  currentYear: string;
  scenario: Scenario;
  thresholds: StaffingThreshold[];
}) {
  const projection = computeProjection(current, currentYear, scenario, thresholds, 5);

  const cellClass = (risk: "green" | "amber" | "red") =>
    risk === "red"
      ? "bg-red-50 text-red-900"
      : risk === "amber"
      ? "bg-amber-50 text-amber-900"
      : "bg-emerald-50 text-emerald-900";

  return (
    <div className="overflow-x-auto -mx-6 md:mx-0">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-foreground/15">
            <th className="text-left py-2 px-3 font-medium text-foreground/70">Year group</th>
            {projection.map((p) => (
              <th key={p.academic_year} className="text-center py-2 px-3 font-medium text-foreground/70 whitespace-nowrap">
                {p.academic_year.replace("-", "–")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {YEAR_GROUPS.map((yg) => (
            <tr key={yg} className="border-b border-foreground/5">
              <td className="py-2 px-3">{YEAR_GROUP_LABELS[yg]}</td>
              {projection.map((p) => (
                <td key={p.academic_year} className="text-center py-2 px-3 tabular-nums">
                  {p.counts[yg]}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t-2 border-foreground/20 font-medium">
            <td className="py-2 px-3">Total</td>
            {projection.map((p) => {
              const risk = riskFor(p.total, p.band, thresholds);
              return (
                <td key={p.academic_year} className={cn("text-center py-2 px-3 tabular-nums", cellClass(risk))}>
                  {p.total}
                </td>
              );
            })}
          </tr>
          <tr className="border-b border-foreground/10">
            <td className="py-2 px-3 text-foreground/70">Staffing band</td>
            {projection.map((p) => {
              const risk = riskFor(p.total, p.band, thresholds);
              return (
                <td key={p.academic_year} className={cn("text-center py-2 px-3", cellClass(risk))}>
                  <span className="inline-flex items-center gap-1">
                    {p.band?.config_label ?? "—"}
                    {risk !== "green" && <AlertTriangle className="w-3.5 h-3.5" />}
                  </span>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ===================== Chart ===================== */

function ProjectionChart({
  current,
  currentYear,
  scenario,
  thresholds,
}: {
  current: Record<YearGroup, number>;
  currentYear: string;
  scenario: Scenario;
  thresholds: StaffingThreshold[];
}) {
  const projection = computeProjection(current, currentYear, scenario, thresholds, 5);
  const data = projection.map((p) => ({ year: p.academic_year.replace("-", "–"), total: p.total }));
  const currentBand = projection[0]?.band;

  const referenceLines = [
    { y: 45, label: "P+2 retain (45)" },
    { y: 75, label: "P+3 retain (75)" },
    { y: 104, label: "P+4 retain (104)" },
  ];

  return (
    <div className="bg-background border border-foreground/10 rounded-xl p-4 md:p-6">
      <h3 className="font-heading text-lg mb-4">Total enrolment projection</h3>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RChart data={data} margin={{ top: 10, right: 24, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foreground) / 0.1)" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[0, "dataMax + 20"]} />
            <Tooltip />
            {currentBand && (
              <ReferenceArea
                y1={currentBand.retention_min}
                y2={currentBand.retention_min + 30}
                fill="hsl(var(--primary))"
                fillOpacity={0.05}
              />
            )}
            {referenceLines.map((r) => (
              <ReferenceLine
                key={r.y}
                y={r.y}
                stroke={currentBand && r.y === currentBand.retention_min ? "hsl(var(--accent))" : "hsl(var(--foreground) / 0.3)"}
                strokeDasharray="4 4"
                label={{ value: r.label, position: "right", fontSize: 10, fill: "hsl(var(--foreground) / 0.6)" }}
              />
            ))}
            <Line
              type="monotone"
              dataKey="total"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "hsl(var(--primary))" }}
            />
          </RChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ===================== Scenario editor ===================== */

function NewScenarioButton({ onCreated }: { onCreated: (id: string) => void }) {
  const qc = useQueryClient();
  const { user } = useAuth();
  const mutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("projection_scenarios")
        .insert({
          name: "New scenario",
          description: "",
          ji_intake: {},
          adjustments: {},
          updated_by: user?.id ?? null,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["projection_scenarios"] });
      if (data) onCreated((data as { id: string }).id);
      toast.success("Scenario created");
    },
    onError: () => toast.error("Couldn't create scenario."),
  });
  return (
    <Button variant="outline" size="sm" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      <Plus className="w-4 h-4 mr-1" /> New scenario
    </Button>
  );
}

function ScenarioEditor({
  scenario,
  currentYear,
  hasOtherBaseline,
  onSaved,
}: {
  scenario: Scenario;
  currentYear: string;
  hasOtherBaseline: boolean;
  onSaved: () => void;
}) {
  const qc = useQueryClient();
  const { user } = useAuth();
  const futureYears = futureAcademicYears(currentYear, 5);

  const [name, setName] = useState(scenario.name);
  const [description, setDescription] = useState(scenario.description ?? "");
  const [intake, setIntake] = useState<Record<string, number>>(() => {
    const obj: Record<string, number> = {};
    for (const y of futureYears) obj[y] = scenario.ji_intake?.[y] ?? 0;
    return obj;
  });
  const [adjustments, setAdjustments] = useState<Array<{ year: string; yg: YearGroup; delta: number }>>(() => {
    const out: Array<{ year: string; yg: YearGroup; delta: number }> = [];
    for (const [y, m] of Object.entries(scenario.adjustments ?? {})) {
      for (const [yg, d] of Object.entries(m as Record<string, number>)) {
        out.push({ year: y, yg: yg as YearGroup, delta: d });
      }
    }
    return out;
  });
  const [makeBaseline, setMakeBaseline] = useState(scenario.is_baseline);

  const save = useMutation({
    mutationFn: async () => {
      const adjMap: Record<string, Partial<Record<YearGroup, number>>> = {};
      for (const a of adjustments) {
        if (!a.delta) continue;
        adjMap[a.year] = { ...(adjMap[a.year] ?? {}), [a.yg]: a.delta };
      }
      const { error } = await supabase
        .from("projection_scenarios")
        .update({
          name,
          description,
          ji_intake: intake,
          adjustments: adjMap,
          is_baseline: makeBaseline,
          updated_at: new Date().toISOString(),
          updated_by: user?.id ?? null,
        })
        .eq("id", scenario.id);
      if (error) throw error;
      if (makeBaseline && !scenario.is_baseline) {
        // unset others
        const { error: e2 } = await supabase
          .from("projection_scenarios")
          .update({ is_baseline: false })
          .neq("id", scenario.id);
        if (e2) throw e2;
      }
    },
    onSuccess: () => {
      toast.success("Scenario saved");
      qc.invalidateQueries({ queryKey: ["projection_scenarios"] });
      onSaved();
    },
    onError: () => toast.error("Couldn't save scenario."),
  });

  const del = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("projection_scenarios").delete().eq("id", scenario.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Scenario deleted");
      qc.invalidateQueries({ queryKey: ["projection_scenarios"] });
    },
    onError: () => toast.error("Couldn't delete scenario."),
  });

  return (
    <section className="bg-cream-warm border border-foreground/10 rounded-xl p-6 space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 block mb-1.5">
            Name {scenario.is_baseline && <span className="ml-1 text-accent">★ Baseline</span>}
          </label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.14em] text-foreground/60 block mb-1.5">Description</label>
          <Textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-foreground/60 mb-2">Junior Infants intake (projected)</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {futureYears.map((y) => (
            <div key={y}>
              <label className="text-xs text-foreground/60 block mb-1">{y.replace("-", "–")}</label>
              <Input
                type="number"
                min={0}
                value={intake[y] ?? 0}
                onChange={(e) => setIntake((p) => ({ ...p, [y]: parseInt(e.target.value || "0", 10) }))}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs uppercase tracking-[0.14em] text-foreground/60">Known adjustments (transfers in/out)</p>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() =>
              setAdjustments((p) => [...p, { year: futureYears[0], yg: "first" as YearGroup, delta: 0 }])
            }
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add
          </Button>
        </div>
        {adjustments.length === 0 ? (
          <p className="text-sm text-foreground/55 italic">No adjustments — use this for confirmed mid-stream transfers.</p>
        ) : (
          <div className="space-y-2">
            {adjustments.map((a, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <select
                  className="col-span-4 h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={a.year}
                  onChange={(e) =>
                    setAdjustments((p) => p.map((x, j) => (j === i ? { ...x, year: e.target.value } : x)))
                  }
                >
                  {futureYears.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <select
                  className="col-span-4 h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={a.yg}
                  onChange={(e) =>
                    setAdjustments((p) => p.map((x, j) => (j === i ? { ...x, yg: e.target.value as YearGroup } : x)))
                  }
                >
                  {YEAR_GROUPS.map((yg) => (
                    <option key={yg} value={yg}>{YEAR_GROUP_LABELS[yg]}</option>
                  ))}
                </select>
                <Input
                  className="col-span-3"
                  type="number"
                  value={a.delta}
                  onChange={(e) =>
                    setAdjustments((p) => p.map((x, j) => (j === i ? { ...x, delta: parseInt(e.target.value || "0", 10) } : x)))
                  }
                />
                <button
                  type="button"
                  className="col-span-1 text-foreground/50 hover:text-foreground"
                  onClick={() => setAdjustments((p) => p.filter((_, j) => j !== i))}
                  aria-label="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {!scenario.is_baseline && (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={makeBaseline} onChange={(e) => setMakeBaseline(e.target.checked)} />
          Make this the baseline scenario
        </label>
      )}

      <div className="flex flex-wrap justify-between items-center gap-2 pt-2 border-t border-foreground/10">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              disabled={scenario.is_baseline}
              title={scenario.is_baseline ? "The baseline scenario can't be deleted" : ""}
              className="text-red-700 hover:text-red-800 disabled:opacity-40"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete scenario
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete "{scenario.name}"?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove the scenario and its assumptions.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => del.mutate()}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onSaved}>Cancel</Button>
          <Button onClick={() => save.mutate()} disabled={save.isPending}>
            {save.isPending ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ===================== Derived figures ===================== */

function DerivedFigures({
  scenarios,
  currentCounts,
  currentYear,
  thresholds,
}: {
  scenarios: Scenario[];
  currentCounts: Record<YearGroup, number>;
  currentYear: string;
  thresholds: StaffingThreshold[];
}) {
  const baseline = scenarios.find((s) => s.is_baseline) ?? scenarios[0];
  const projection = useMemo(
    () => computeProjection(currentCounts, currentYear, baseline, thresholds, 5),
    [currentCounts, currentYear, baseline, thresholds]
  );
  const nextYear = projection[1];
  if (!nextYear) return null;
  const capitation = nextYear.total * 183;
  const meetsDeputy = nextYear.total >= 178;

  return (
    <section>
      <h2 className="font-heading text-2xl mb-3">At a glance — next year (baseline)</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <FigureCard
          headline={`€${capitation.toLocaleString("en-IE")}`}
          label="Capitation grant estimate"
          note="Based on €183 per pupil (2025/26 standard primary rate). Confirm with the current circular each budget year."
          showInfo
        />
        <FigureCard
          headline="37 days"
          label="Principal Release Days"
          note="+4 if the school has a special class."
        />
        <FigureCard
          headline={meetsDeputy ? "Eligible" : "Not eligible"}
          label="Deputy Principal post"
          note={`Threshold currently 178 pupils. Firoda ${meetsDeputy ? "would meet" : "would not meet"} this at projected enrolment (${nextYear.total}). See Appendix B of the staffing circular.`}
        />
      </div>
    </section>
  );
}

function FigureCard({
  headline,
  label,
  note,
  showInfo,
}: {
  headline: string;
  label: string;
  note: string;
  showInfo?: boolean;
}) {
  return (
    <div className="bg-cream-warm border border-foreground/10 rounded-xl p-5">
      <p className="text-xs uppercase tracking-[0.14em] text-foreground/55 mb-1 flex items-center gap-1">
        {label}
        {showInfo && <Info className="w-3 h-3" />}
      </p>
      <p className="font-heading text-2xl mb-1.5">{headline}</p>
      <p className="text-xs text-foreground/60 leading-relaxed">{note}</p>
    </div>
  );
}
