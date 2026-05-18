import { supabase } from "@/integrations/supabase/client";

export type YearGroup =
  | "junior_infants"
  | "senior_infants"
  | "first"
  | "second"
  | "third"
  | "fourth"
  | "fifth"
  | "sixth";

export const YEAR_GROUPS: YearGroup[] = [
  "junior_infants",
  "senior_infants",
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
];

export const YEAR_GROUP_LABELS: Record<YearGroup, string> = {
  junior_infants: "Junior Infants",
  senior_infants: "Senior Infants",
  first: "First",
  second: "Second",
  third: "Third",
  fourth: "Fourth",
  fifth: "Fifth",
  sixth: "Sixth",
};

export interface EnrolmentSnapshot {
  id: string;
  academic_year: string;
  year_group: YearGroup;
  count: number;
  notes: string | null;
  is_current: boolean;
  updated_at: string;
  updated_by: string | null;
}

export interface Scenario {
  id: string;
  name: string;
  description: string | null;
  is_baseline: boolean;
  ji_intake: Record<string, number>;
  adjustments: Record<string, Partial<Record<YearGroup, number>>>;
  created_at: string;
  updated_at: string;
}

export interface StaffingThreshold {
  id: number;
  config_label: string;
  total_teachers: number;
  appointment_min: number;
  retention_min: number;
  school_type: string;
}

// Compute next academic year string e.g. "2025-26" -> "2026-27"
export function nextAcademicYear(ay: string): string {
  const [a, b] = ay.split("-").map((s) => parseInt(s, 10));
  const aNext = a + 1;
  const bNext = (b + 1) % 100;
  return `${aNext}-${bNext.toString().padStart(2, "0")}`;
}

export function futureAcademicYears(start: string, count: number): string[] {
  const out: string[] = [];
  let cur = start;
  for (let i = 0; i < count; i++) {
    cur = nextAcademicYear(cur);
    out.push(cur);
  }
  return out;
}

export interface ProjectionYear {
  academic_year: string;
  counts: Record<YearGroup, number>;
  total: number;
  band: StaffingThreshold | null;
}

export function computeProjection(
  current: Record<YearGroup, number>,
  currentYear: string,
  scenario: Scenario,
  thresholds: StaffingThreshold[],
  yearsAhead = 5
): ProjectionYear[] {
  const years: ProjectionYear[] = [];
  const sortedBands = [...thresholds].sort((a, b) => a.retention_min - b.retention_min);

  const bandFor = (total: number): StaffingThreshold | null => {
    let chosen: StaffingThreshold | null = null;
    for (const t of sortedBands) {
      if (total >= t.retention_min) chosen = t;
    }
    return chosen;
  };

  // Year 0 = current
  const cur0Total = YEAR_GROUPS.reduce((s, yg) => s + (current[yg] ?? 0), 0);
  years.push({
    academic_year: currentYear,
    counts: { ...current },
    total: cur0Total,
    band: bandFor(cur0Total),
  });

  let prev = { ...current };
  const futures = futureAcademicYears(currentYear, yearsAhead);
  for (const ay of futures) {
    const next: Record<YearGroup, number> = {
      junior_infants: scenario.ji_intake?.[ay] ?? 0,
      senior_infants: prev.junior_infants ?? 0,
      first: prev.senior_infants ?? 0,
      second: prev.first ?? 0,
      third: prev.second ?? 0,
      fourth: prev.third ?? 0,
      fifth: prev.fourth ?? 0,
      sixth: prev.fifth ?? 0,
    };
    const adj = scenario.adjustments?.[ay] ?? {};
    for (const yg of YEAR_GROUPS) {
      const delta = adj[yg] ?? 0;
      next[yg] = Math.max(0, (next[yg] ?? 0) + delta);
    }
    const total = YEAR_GROUPS.reduce((s, yg) => s + next[yg], 0);
    years.push({ academic_year: ay, counts: next, total, band: bandFor(total) });
    prev = next;
  }

  return years;
}

export type RiskLevel = "green" | "amber" | "red";

export function riskFor(total: number, band: StaffingThreshold | null, thresholds: StaffingThreshold[]): RiskLevel {
  if (!band) return "red";
  // Next higher band's retention threshold defines what would be lost if we drop
  const sorted = [...thresholds].sort((a, b) => a.retention_min - b.retention_min);
  const idx = sorted.findIndex((t) => t.config_label === band.config_label);
  const currentRetention = sorted[idx].retention_min;
  if (total < currentRetention) return "red";
  if (total - currentRetention <= 5) return "amber";
  return "green";
}

export async function fetchCurrentSnapshots() {
  const { data, error } = await supabase
    .from("enrolment_snapshots")
    .select("*")
    .eq("is_current", true);
  if (error) throw error;
  return (data ?? []) as EnrolmentSnapshot[];
}

export async function fetchScenarios() {
  const { data, error } = await supabase
    .from("projection_scenarios")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as Scenario[];
}

export async function fetchThresholds() {
  const { data, error } = await supabase
    .from("staffing_thresholds")
    .select("*")
    .order("retention_min", { ascending: true });
  if (error) throw error;
  return (data ?? []) as StaffingThreshold[];
}
