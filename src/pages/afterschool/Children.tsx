import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { FasLayout, RequireFasOwner } from "./FasLayout";
import { fetchAllChildren, ageInYears, YEAR_GROUP_LABELS } from "@/lib/fas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FasChildren() {
  return (
    <RequireFasOwner>
      <FasLayout>
        <ChildrenContent />
      </FasLayout>
    </RequireFasOwner>
  );
}

function ChildrenContent() {
  const [q, setQ] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const childrenQ = useQuery({ queryKey: ["fas_children_all"], queryFn: fetchAllChildren });

  const filtered = useMemo(() => {
    const list = (childrenQ.data ?? []).filter((c) => (showInactive ? true : c.active));
    if (!q.trim()) return list;
    const t = q.toLowerCase();
    return list.filter((c) => `${c.first_name} ${c.last_name}`.toLowerCase().includes(t));
  }, [childrenQ.data, q, showInactive]);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl">Children</h1>
          <p className="text-sm text-foreground/60 mt-1">{filtered.length} {showInactive ? "total" : "currently enrolled"}.</p>
        </div>
        <Link to="/afterschool-admin/children/new">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="w-4 h-4 mr-1.5" /> Add child
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name…" className="pl-9" />
        </div>
        <label className="flex items-center gap-2 text-sm text-foreground/70">
          <input type="checkbox" checked={showInactive} onChange={(e) => setShowInactive(e.target.checked)} />
          Show inactive
        </label>
      </div>

      <div className="bg-background border border-foreground/10 rounded-xl overflow-hidden">
        {childrenQ.isLoading ? (
          <p className="p-6 text-sm text-foreground/60">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-sm text-foreground/55">No children to show.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-foreground/55 border-b border-foreground/10">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Status</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/5">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-foreground/[0.02]">
                  <td className="px-4 py-3 font-medium">
                    <Link to={`/afterschool-admin/children/${c.id}`} className="hover:text-accent">
                      {c.first_name} {c.last_name}
                    </Link>
                    {c.allergies_and_medical && <span className="ml-2 text-xs text-red-700">⚠</span>}
                  </td>
                  <td className="px-4 py-3 text-foreground/70">{YEAR_GROUP_LABELS[c.school_year_group]}</td>
                  <td className="px-4 py-3 text-foreground/70 tabular-nums">{ageInYears(c.date_of_birth)}</td>
                  <td className="px-4 py-3">
                    <span className={c.active ? "text-emerald-700 text-xs" : "text-foreground/40 text-xs"}>
                      {c.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/afterschool-admin/children/${c.id}`} className="text-xs text-accent hover:underline">
                      Open →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
