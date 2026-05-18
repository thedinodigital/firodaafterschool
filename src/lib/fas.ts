import { supabase } from "@/integrations/supabase/client";

export const YEAR_GROUPS = [
  "junior_infants",
  "senior_infants",
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
] as const;
export type FasYearGroup = (typeof YEAR_GROUPS)[number];

export const YEAR_GROUP_LABELS: Record<FasYearGroup, string> = {
  junior_infants: "Junior Infants",
  senior_infants: "Senior Infants",
  first: "First",
  second: "Second",
  third: "Third",
  fourth: "Fourth",
  fifth: "Fifth",
  sixth: "Sixth",
};

export const YEAR_GROUP_ORDER: Record<FasYearGroup, number> = {
  junior_infants: 0,
  senior_infants: 1,
  first: 2,
  second: 3,
  third: 4,
  fourth: 5,
  fifth: 6,
  sixth: 7,
};

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri";
export const WEEKDAYS: Weekday[] = ["mon", "tue", "wed", "thu", "fri"];
export const WEEKDAY_LABELS: Record<Weekday, string> = {
  mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri",
};
// JS getDay(): Sun=0, Mon=1, ... Sat=6
export function weekdayFromISO(iso: string): Weekday | null {
  const d = new Date(iso + "T12:00:00").getDay();
  return ([null, "mon", "tue", "wed", "thu", "fri", null] as (Weekday | null)[])[d];
}

export interface FasChild {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  school_year_group: FasYearGroup;
  allergies_and_medical: string | null;
  active: boolean;
  enrolled_at: string;
  notes: string | null;
  expected_days: Weekday[];
}

export interface FasGuardian {
  id: string;
  child_id: string;
  full_name: string;
  relationship: string;
  phone_primary: string;
  phone_secondary: string | null;
  email: string | null;
  is_billing_contact: boolean;
  is_emergency_contact: boolean;
}

export interface FasCollector {
  id: string;
  child_id: string;
  full_name: string;
  relationship: string;
  phone: string | null;
  notes: string | null;
  active: boolean;
}

export interface FasStaff {
  id: string;
  first_name: string;
  last_name: string;
  role_title: string;
  active: boolean;
  garda_vetting_renewal_date: string | null;
}

export interface FasAttendanceDay {
  id: string;
  child_id: string;
  attendance_date: string;
  arrived_at: string | null;
  collected_at: string | null;
  collected_by_id: string | null;
  collected_by_name: string | null;
  notes: string | null;
}

export interface FasShift {
  id: string;
  staff_id: string;
  shift_date: string;
  start_at: string;
  end_at: string | null;
}

export interface FasBilling {
  id: string;
  child_id: string;
  billing_type: "weekly_flat" | "daily_rate" | "per_session";
  amount_cents: number;
  notes: string | null;
  active: boolean;
  effective_from: string;
}

export interface FasInvoice {
  id: string;
  invoice_number: string;
  child_id: string;
  billing_contact_name: string;
  billing_contact_email: string | null;
  period_start: string;
  period_end: string;
  attendance_days: number;
  amount_cents: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  issued_at: string | null;
  paid_at: string | null;
  paid_method: string | null;
  notes: string | null;
}

export interface FasSettings {
  id: number;
  service_name: string;
  opening_time: string;
  closing_time: string;
  max_ratio: number;
  tusla_registration: string | null;
  bank_details: string | null;
  invoice_prefix: string;
  invoice_notes: string | null;
}

export interface FasVettingRecord {
  id: string;
  staff_id: string;
  document_type: string;
  issue_date: string | null;
  expiry_date: string | null;
  file_path: string | null;
  file_name: string | null;
  notes: string | null;
  created_at: string;
}

export interface FasIncident {
  id: string;
  child_id: string;
  occurred_at: string;
  category: "minor" | "moderate" | "serious" | "behaviour" | "medical";
  summary: string;
  action_taken: string | null;
  reported_by: string | null;
  parent_notified: boolean;
  notes: string | null;
  created_at: string;
}

export async function fetchVettingFor(staffId: string) {
  const { data, error } = await supabase
    .from("fas_garda_vetting_records" as never)
    .select("*")
    .eq("staff_id", staffId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as FasVettingRecord[];
}

export async function fetchIncidentsFor(childId: string) {
  const { data, error } = await supabase
    .from("fas_incidents" as never)
    .select("*")
    .eq("child_id", childId)
    .order("occurred_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as FasIncident[];
}

// ---------- helpers ----------

export const toCents = (euros: number) => Math.round(euros * 100);
export const fromCents = (cents: number) => cents / 100;
export const formatMoney = (cents: number) =>
  `€${(cents / 100).toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const ageInYears = (dob: string) => {
  const d = new Date(dob);
  const now = new Date();
  let a = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a--;
  return a;
};

export type RatioStatus = "green" | "amber" | "red";

export function ratioStatus(children: number, staff: number, maxRatio = 12): {
  status: RatioStatus;
  needed: number;
  explanation: string;
} {
  if (staff === 0 && children === 0) {
    return { status: "green", needed: 0, explanation: "No children present yet — no staff required." };
  }
  const needed = Math.max(1, Math.ceil(children / maxRatio));
  if (staff < needed) {
    return {
      status: "red",
      needed,
      explanation: `${children} children with ${staff} staff member${staff === 1 ? "" : "s"} — you need ${needed} staff for ${children} children. Consider adding a relief staff shift.`,
    };
  }
  // amber when within 2 children of next threshold
  const headroom = staff * maxRatio - children;
  if (headroom <= 2) {
    return {
      status: "amber",
      needed,
      explanation: `You're getting close to the 1:${maxRatio} line — ${headroom <= 0 ? "no" : headroom} child${headroom === 1 ? "" : "ren"} of headroom before you'd need another staff member.`,
    };
  }
  return {
    status: "green",
    needed,
    explanation: `${children} children with ${staff} staff member${staff === 1 ? "" : "s"} — comfortably within ratio.`,
  };
}

// ---------- queries ----------

export async function fetchActiveChildren() {
  const { data, error } = await supabase
    .from("fas_children" as never)
    .select("*")
    .eq("active", true)
    .order("last_name");
  if (error) throw error;
  return (data ?? []) as unknown as FasChild[];
}

export async function fetchAllChildren() {
  const { data, error } = await supabase
    .from("fas_children" as never)
    .select("*")
    .order("last_name");
  if (error) throw error;
  return (data ?? []) as unknown as FasChild[];
}

export async function fetchActiveStaff() {
  const { data, error } = await supabase
    .from("fas_staff" as never)
    .select("*")
    .eq("active", true)
    .order("last_name");
  if (error) throw error;
  return (data ?? []) as unknown as FasStaff[];
}

export async function fetchAllStaff() {
  const { data, error } = await supabase
    .from("fas_staff" as never)
    .select("*")
    .order("last_name");
  if (error) throw error;
  return (data ?? []) as unknown as FasStaff[];
}

export async function fetchAttendanceForDate(date: string) {
  const { data, error } = await supabase
    .from("fas_attendance_days" as never)
    .select("*")
    .eq("attendance_date", date);
  if (error) throw error;
  return (data ?? []) as unknown as FasAttendanceDay[];
}

export async function fetchShiftsForDate(date: string) {
  const { data, error } = await supabase
    .from("fas_staff_shifts" as never)
    .select("*")
    .eq("shift_date", date);
  if (error) throw error;
  return (data ?? []) as unknown as FasShift[];
}

export async function fetchSettings(): Promise<FasSettings> {
  const { data, error } = await supabase
    .from("fas_settings" as never)
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as FasSettings) ?? {
    id: 1,
    service_name: "Firoda After School",
    opening_time: "14:00",
    closing_time: "18:00",
    max_ratio: 12,
    tusla_registration: null,
    bank_details: null,
    invoice_prefix: "FAS",
    invoice_notes: null,
  };
}

export async function fetchGuardiansFor(childId: string) {
  const { data, error } = await supabase
    .from("fas_guardians" as never)
    .select("*")
    .eq("child_id", childId)
    .order("is_billing_contact", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as FasGuardian[];
}

export async function fetchCollectorsFor(childId: string) {
  const { data, error } = await supabase
    .from("fas_collectors" as never)
    .select("*")
    .eq("child_id", childId)
    .order("full_name");
  if (error) throw error;
  return (data ?? []) as unknown as FasCollector[];
}

export async function fetchBillingFor(childId: string) {
  const { data, error } = await supabase
    .from("fas_billing_arrangements" as never)
    .select("*")
    .eq("child_id", childId)
    .order("effective_from", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as FasBilling[];
}

export async function fetchInvoices() {
  const { data, error } = await supabase
    .from("fas_invoices" as never)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as FasInvoice[];
}
