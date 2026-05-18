import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Printer, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AdminLayout } from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  YEAR_GROUPS,
  YEAR_GROUP_LABELS,
  YearGroup,
  fetchCurrentSnapshots,
  fetchScenarios,
  fetchThresholds,
  computeProjection,
} from "@/lib/planning";

const STORAGE_KEY = "firoda.appeal.evidence";

export default function PlanningAppeal() {
  const { profile, loading } = useAuth();

  if (loading) return null;

  if (profile?.role !== "admin") {
    return (
      <AdminLayout>
        <div className="max-w-xl mx-auto mt-20 text-center">
          <h1 className="font-heading text-2xl mb-3">Admins only</h1>
          <p className="text-foreground/70">
            The appeals summary is restricted to admin users.
          </p>
        </div>
      </AdminLayout>
    );
  }

  return <AppealContent />;
}

function AppealContent() {
  const snapshotsQ = useQuery({ queryKey: ["enrolment_snapshots"], queryFn: fetchCurrentSnapshots });
  const scenariosQ = useQuery({ queryKey: ["projection_scenarios"], queryFn: fetchScenarios });
  const thresholdsQ = useQuery({ queryKey: ["staffing_thresholds"], queryFn: fetchThresholds });

  const [evidence, setEvidence] = useState("");
  useEffect(() => {
    setEvidence(localStorage.getItem(STORAGE_KEY) ?? "");
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, evidence);
  }, [evidence]);

  if (snapshotsQ.isLoading || scenariosQ.isLoading || thresholdsQ.isLoading) {
    return (
      <AdminLayout>
        <p className="text-foreground/60">Loading…</p>
      </AdminLayout>
    );
  }

  const snapshots = snapshotsQ.data ?? [];
  const scenarios = scenariosQ.data ?? [];
  const thresholds = thresholdsQ.data ?? [];

  const currentYear = snapshots[0]?.academic_year ?? "2025-26";
  const currentCounts: Record<YearGroup, number> = Object.fromEntries(
    YEAR_GROUPS.map((yg) => [yg, snapshots.find((s) => s.year_group === yg)?.count ?? 0])
  ) as Record<YearGroup, number>;
  const total = YEAR_GROUPS.reduce((s, yg) => s + currentCounts[yg], 0);

  const baseline = scenarios.find((s) => s.is_baseline) ?? scenarios[0];
  const projection = baseline ? computeProjection(currentCounts, currentYear, baseline, thresholds, 5) : [];
  const nextYear = projection[1];
  const sortedBands = [...thresholds].sort((a, b) => a.retention_min - b.retention_min);
  const relevantThreshold = nextYear
    ? sortedBands.find((b) => b.config_label === nextYear.band?.config_label)
    : null;

  // Adjustments line items for next year
  const nextAcademicYear = nextYear?.academic_year ?? "";
  const adjustments = (baseline?.adjustments?.[nextAcademicYear] ?? {}) as Partial<Record<YearGroup, number>>;
  const adjustmentLines = Object.entries(adjustments).filter(([, v]) => v && v !== 0);

  return (
    <>
      {/* Screen chrome */}
      <div className="print:hidden">
        <AdminLayout>
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <Link to="/admin/planning" className="text-sm text-foreground/70 hover:text-foreground inline-flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back to planner
              </Link>
              <Button onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" /> Print
              </Button>
            </div>
            <AppealDocument
              currentYear={currentYear}
              currentCounts={currentCounts}
              total={total}
              projection={projection}
              baseline={baseline}
              relevantThreshold={relevantThreshold}
              adjustmentLines={adjustmentLines}
              evidence={evidence}
              setEvidence={setEvidence}
              editable
            />
          </div>
        </AdminLayout>
      </div>

      {/* Print version */}
      <div className="hidden print:block bg-white text-black p-10 max-w-3xl mx-auto">
        <AppealDocument
          currentYear={currentYear}
          currentCounts={currentCounts}
          total={total}
          projection={projection}
          baseline={baseline}
          relevantThreshold={relevantThreshold}
          adjustmentLines={adjustmentLines}
          evidence={evidence}
          setEvidence={setEvidence}
          editable={false}
        />
      </div>
    </>
  );
}

function AppealDocument({
  currentYear,
  currentCounts,
  total,
  projection,
  baseline,
  relevantThreshold,
  adjustmentLines,
  evidence,
  setEvidence,
  editable,
}: {
  currentYear: string;
  currentCounts: Record<YearGroup, number>;
  total: number;
  projection: ReturnType<typeof computeProjection>;
  baseline: ReturnType<typeof Object.values> extends infer T ? any : any;
  relevantThreshold: ReturnType<typeof Array.prototype.find> | null | undefined;
  adjustmentLines: Array<[string, number | undefined]>;
  evidence: string;
  setEvidence: (v: string) => void;
  editable: boolean;
}) {
  const nextYear = projection[1];
  const today = new Date().toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article className="space-y-6 font-body">
      <header className="flex items-start gap-4 border-b pb-4">
        <img src="/firoda-crest.png" alt="" className="w-16 h-auto" />
        <div>
          <h1 className="font-heading text-xl leading-tight">Holy Cross National School</h1>
          <p className="text-sm">Firoda, Castlecomer, Co. Kilkenny, R95 XXXX</p>
          <p className="text-sm">Roll Number: 17890A</p>
        </div>
      </header>

      <div>
        <h2 className="font-heading text-2xl">Projected Enrolment — Staffing Appeal Summary</h2>
        <p className="text-sm text-foreground/70 print:text-black">Generated {today}</p>
      </div>

      <section>
        <h3 className="font-heading text-lg mb-2">1. Current enrolment ({currentYear.replace("-", "–")})</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-1.5">Year group</th>
              <th className="text-right py-1.5">Pupils</th>
            </tr>
          </thead>
          <tbody>
            {YEAR_GROUPS.map((yg) => (
              <tr key={yg} className="border-b border-foreground/10">
                <td className="py-1.5">{YEAR_GROUP_LABELS[yg]}</td>
                <td className="py-1.5 text-right tabular-nums">{currentCounts[yg]}</td>
              </tr>
            ))}
            <tr className="font-semibold">
              <td className="py-1.5">Total</td>
              <td className="py-1.5 text-right tabular-nums">{total}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {nextYear && (
        <section>
          <h3 className="font-heading text-lg mb-2">
            2. Projected enrolment ({nextYear.academic_year.replace("-", "–")})
          </h3>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1.5">Year group</th>
                <th className="text-right py-1.5">Projected pupils</th>
              </tr>
            </thead>
            <tbody>
              {YEAR_GROUPS.map((yg) => (
                <tr key={yg} className="border-b border-foreground/10">
                  <td className="py-1.5">{YEAR_GROUP_LABELS[yg]}</td>
                  <td className="py-1.5 text-right tabular-nums">{nextYear.counts[yg]}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-1.5">Total</td>
                <td className="py-1.5 text-right tabular-nums">{nextYear.total}</td>
              </tr>
            </tbody>
          </table>
          {relevantThreshold && (
            <p className="text-sm mt-3 p-3 bg-cream-warm print:bg-transparent print:border print:border-black/30 rounded">
              <strong>Relevant retention threshold:</strong> {relevantThreshold.config_label} requires {relevantThreshold.retention_min} pupils to retain the {relevantThreshold.total_teachers}th teacher post.
            </p>
          )}
        </section>
      )}

      <section>
        <h3 className="font-heading text-lg mb-2">3. Basis for the projection</h3>
        {baseline ? (
          <>
            <p className="text-sm mb-2"><strong>Scenario:</strong> {baseline.name}</p>
            {baseline.description && <p className="text-sm mb-3 italic">{baseline.description}</p>}
            {adjustmentLines.length > 0 && (
              <ul className="text-sm list-disc pl-5 space-y-1">
                {adjustmentLines.map(([yg, delta]) => (
                  <li key={yg}>
                    Adjustment: {delta && delta > 0 ? "+" : ""}{delta} to {YEAR_GROUP_LABELS[yg as YearGroup]}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="text-sm italic">No baseline scenario configured.</p>
        )}
      </section>

      <section>
        <h3 className="font-heading text-lg mb-2">4. Supporting evidence</h3>
        {editable ? (
          <Textarea
            rows={8}
            placeholder="Birth-rate data, transfer confirmations, local population trends, enrolment enquiries received…"
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
          />
        ) : (
          <div className="text-sm whitespace-pre-wrap border border-foreground/20 print:border-black/40 rounded p-3 min-h-[8rem]">
            {evidence || "—"}
          </div>
        )}
      </section>

      <footer className="pt-10 mt-12 border-t">
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <div className="border-b border-foreground/40 print:border-black h-10 mb-1" />
            <p>Principal signature</p>
          </div>
          <div>
            <div className="border-b border-foreground/40 print:border-black h-10 mb-1" />
            <p>Date</p>
          </div>
        </div>
      </footer>
    </article>
  );
}
