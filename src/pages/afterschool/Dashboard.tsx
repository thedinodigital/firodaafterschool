import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, ClipboardList } from "lucide-react";
import { FasLayout, RequireFasOwner } from "./FasLayout";
import {
  fetchActiveChildren,
  fetchAttendanceForDate,
  fetchCollectorsFor,
  fetchInvoices,
  fetchSettings,
  fetchShiftsForDate,
  fetchActiveStaff,
  formatMoney,
  ratioStatus,
  todayISO,
} from "@/lib/fas";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export default function FasDashboard() {
  return (
    <RequireFasOwner>
      <FasLayout>
        <DashboardContent />
      </FasLayout>
    </RequireFasOwner>
  );
}

function DashboardContent() {
  const today = todayISO();

  const childrenQ = useQuery({ queryKey: ["fas_children_active"], queryFn: fetchActiveChildren });
  const staffQ = useQuery({ queryKey: ["fas_staff_active"], queryFn: fetchActiveStaff });
  const attendanceQ = useQuery({ queryKey: ["fas_attendance", today], queryFn: () => fetchAttendanceForDate(today) });
  const shiftsQ = useQuery({ queryKey: ["fas_shifts", today], queryFn: () => fetchShiftsForDate(today) });
  const settingsQ = useQuery({ queryKey: ["fas_settings"], queryFn: fetchSettings });
  const invoicesQ = useQuery({ queryKey: ["fas_invoices"], queryFn: fetchInvoices });
  const breachesQ = useQuery({
    queryKey: ["fas_breach_week"],
    queryFn: async () => {
      const start = new Date();
      start.setDate(start.getDate() - 7);
      const { data, error } = await supabase
        .from("fas_ratio_breach_events" as never)
        .select("*")
        .gte("occurred_on", start.toISOString().slice(0, 10));
      if (error) throw error;
      return (data ?? []) as unknown as Array<{ id: string; occurred_at: string; children_present: number; staff_present: number }>;
    },
  });

  const loading = childrenQ.isLoading || staffQ.isLoading || attendanceQ.isLoading || shiftsQ.isLoading || settingsQ.isLoading;
  if (loading) return <p className="text-foreground/60">Loading today's view…</p>;

  const children = childrenQ.data ?? [];
  const attendance = attendanceQ.data ?? [];
  const shifts = shiftsQ.data ?? [];
  const settings = settingsQ.data!;
  const invoices = invoicesQ.data ?? [];

  const presentNow = attendance.filter((a) => a.arrived_at && !a.collected_at);
  const expected = children.filter((c) => !attendance.find((a) => a.child_id === c.id && a.arrived_at));
  const toCollect = presentNow;

  const staffOnShift = shifts.filter((s) => !s.end_at).length;
  const status = ratioStatus(presentNow.length, staffOnShift, settings.max_ratio);

  const draftCount = invoices.filter((i) => i.status === "draft").length;
  const overdue = invoices.filter((i) => i.status === "overdue");
  const overdueTotal = overdue.reduce((s, i) => s + i.amount_cents, 0);
  const breaches = breachesQ.data ?? [];

  const pillClass =
    status.status === "red"
      ? "bg-red-100 text-red-900 border-red-200"
      : status.status === "amber"
      ? "bg-amber-100 text-amber-900 border-amber-200"
      : "bg-emerald-100 text-emerald-900 border-emerald-200";

  const cardBorder =
    status.status === "red" ? "border-red-300" : status.status === "amber" ? "border-amber-300" : "border-emerald-200";

  const formatDate = new Date(today).toLocaleDateString("en-IE", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="space-y-8 max-w-5xl">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-accent">{formatDate}</p>
        <h1 className="font-heading text-3xl md:text-4xl mt-1">Today at Firoda After School</h1>
      </header>

      {/* Section A — ratio card */}
      <section className={cn("bg-background border-2 rounded-2xl p-6 md:p-8", cardBorder)}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-foreground/55 mb-2">Children present now</p>
            <p className="font-heading text-6xl md:text-7xl tabular-nums">{presentNow.length}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-foreground/55 mb-2">Staff on shift</p>
            <p className="font-heading text-6xl md:text-7xl tabular-nums">{staffOnShift}</p>
          </div>
        </div>
        <div className="mt-6">
          <span className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium", pillClass)}>
            {status.status === "red" && <AlertTriangle className="w-4 h-4" />}
            {status.status === "red"
              ? "OVER RATIO — action required"
              : status.status === "amber"
              ? "Watch — approaching ratio limit"
              : "Within ratio"}
          </span>
          <p className="text-sm text-foreground/70 mt-3">{status.explanation}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/afterschool-admin/register">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <ClipboardList className="w-4 h-4 mr-2" />
              Open today's register
            </Button>
          </Link>
        </div>
      </section>

      {/* Section B — quick stats */}
      <section className="grid sm:grid-cols-3 gap-4">
        <QuickStat
          label="Present today"
          value={presentNow.length}
          detail={presentNow.length === 0 ? "Nobody arrived yet." : presentNow.map((a) => children.find((c) => c.id === a.child_id)?.first_name).filter(Boolean).join(", ")}
        />
        <QuickStat
          label="Not yet arrived"
          value={expected.length}
          detail={expected.length === 0 ? "Everyone's signed in." : expected.slice(0, 6).map((c) => c.first_name).join(", ") + (expected.length > 6 ? "…" : "")}
        />
        <QuickStat
          label="Still to be collected"
          value={toCollect.length}
          detail={toCollect.length === 0 ? "All collections complete." : "See register for collector details."}
        />
      </section>

      {/* Section C — week ahead */}
      <section>
        <h2 className="font-heading text-2xl mb-3">Looking ahead this week</h2>
        <p className="text-sm text-foreground/60 mb-4">
          Based on currently enrolled children. Add staff shifts in advance to spot ratio risks early.
        </p>
        <div className="bg-background border border-foreground/10 rounded-xl divide-y divide-foreground/10">
          {nextWeekdays(5).map((d) => {
            const projected = children.length;
            const projectedStaff = 1; // baseline assumption
            const s = ratioStatus(projected, projectedStaff, settings.max_ratio);
            return (
              <div key={d.iso} className="p-4 flex items-center gap-4">
                <div className="w-32 shrink-0">
                  <p className="font-medium text-sm">{d.label}</p>
                  <p className="text-xs text-foreground/55">{d.dateLabel}</p>
                </div>
                <div className="flex-1 text-sm text-foreground/70">
                  {projected} children enrolled · {projectedStaff} staff currently rostered
                </div>
                <span
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-full border",
                    s.status === "red"
                      ? "bg-red-50 text-red-800 border-red-200"
                      : s.status === "amber"
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  )}
                >
                  {s.status === "red" ? "At risk" : s.status === "amber" ? "Watch" : "OK"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section D — week headlines */}
      <section className="grid sm:grid-cols-3 gap-4">
        <HeadlineCard label="Invoices to send" value={String(draftCount)} link="/afterschool-admin/invoices" />
        <HeadlineCard
          label="Overdue invoices"
          value={overdue.length === 0 ? "None" : `${overdue.length} · ${formatMoney(overdueTotal)}`}
          link="/afterschool-admin/invoices"
          tone={overdue.length > 0 ? "warn" : "ok"}
        />
        <HeadlineCard
          label="Ratio breaches this week"
          value={breaches.length === 0 ? "None — good week" : String(breaches.length)}
          tone={breaches.length > 0 ? "warn" : "ok"}
        />
      </section>
    </div>
  );
}

function QuickStat({ label, value, detail }: { label: string; value: number; detail: string }) {
  return (
    <div className="bg-background border border-foreground/10 rounded-xl p-5">
      <p className="text-xs uppercase tracking-[0.14em] text-foreground/55 mb-1.5">{label}</p>
      <p className="font-heading text-3xl tabular-nums mb-1.5">{value}</p>
      <p className="text-xs text-foreground/65 leading-relaxed">{detail}</p>
    </div>
  );
}

function HeadlineCard({ label, value, link, tone }: { label: string; value: string; link?: string; tone?: "ok" | "warn" }) {
  const body = (
    <div
      className={cn(
        "bg-background border rounded-xl p-5 transition-colors",
        tone === "warn" ? "border-amber-300" : "border-foreground/10",
        link && "hover:border-accent/40"
      )}
    >
      <p className="text-xs uppercase tracking-[0.14em] text-foreground/55 mb-1.5">{label}</p>
      <p className="font-heading text-xl">{value}</p>
      {link && (
        <p className="text-xs text-accent mt-2 inline-flex items-center gap-1">
          View <ArrowRight className="w-3 h-3" />
        </p>
      )}
    </div>
  );
  return link ? <Link to={link}>{body}</Link> : body;
}

function nextWeekdays(n: number) {
  const out: Array<{ iso: string; label: string; dateLabel: string }> = [];
  const d = new Date();
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    out.push({
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-IE", { weekday: "long" }),
      dateLabel: d.toLocaleDateString("en-IE", { day: "numeric", month: "short" }),
    });
  }
  return out;
}
