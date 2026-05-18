import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { FasLayout, RequireFasOwner } from "./FasLayout";
import { fetchInvoices, fetchAllChildren, formatMoney, FasInvoice } from "@/lib/fas";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FasInvoices() {
  return (
    <RequireFasOwner>
      <FasLayout>
        <InvoicesContent />
      </FasLayout>
    </RequireFasOwner>
  );
}

const STATUS_FILTERS = ["all", "draft", "sent", "paid", "overdue", "cancelled"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

function InvoicesContent() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const invoicesQ = useQuery({ queryKey: ["fas_invoices"], queryFn: fetchInvoices });
  const childrenQ = useQuery({ queryKey: ["fas_children_all"], queryFn: fetchAllChildren });

  const childMap = useMemo(() => {
    const m = new Map<string, string>();
    (childrenQ.data ?? []).forEach((c) => m.set(c.id, `${c.first_name} ${c.last_name}`));
    return m;
  }, [childrenQ.data]);

  const filtered = (invoicesQ.data ?? []).filter((i) => (status === "all" ? true : i.status === status));

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-3xl">Invoices</h1>
        <Link to="/afterschool-admin/invoices/new">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus className="w-4 h-4 mr-1.5" /> New invoice</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm capitalize border",
              status === s ? "bg-accent text-accent-foreground border-accent" : "bg-background border-foreground/15"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-background border border-foreground/10 rounded-xl overflow-hidden">
        {invoicesQ.isLoading ? <p className="p-6 text-sm text-foreground/60">Loading…</p> :
          filtered.length === 0 ? <p className="p-6 text-sm text-foreground/55">No invoices match.</p> : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-foreground/55 border-b border-foreground/10">
                <tr>
                  <th className="px-4 py-3">Number</th>
                  <th className="px-4 py-3">Child</th>
                  <th className="px-4 py-3">Period</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/5">
                {filtered.map((i) => <InvoiceRow key={i.id} invoice={i} childName={childMap.get(i.child_id) ?? "—"} />)}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}

function InvoiceRow({ invoice, childName }: { invoice: FasInvoice; childName: string }) {
  const statusClass: Record<string, string> = {
    draft: "bg-foreground/5 text-foreground/70",
    sent: "bg-blue-50 text-blue-800",
    paid: "bg-emerald-50 text-emerald-800",
    overdue: "bg-red-50 text-red-800",
    cancelled: "bg-foreground/5 text-foreground/50 line-through",
  };
  return (
    <tr className="hover:bg-foreground/[0.02]">
      <td className="px-4 py-3 font-medium">
        <Link to={`/afterschool-admin/invoices/${invoice.id}`} className="hover:text-accent">{invoice.invoice_number}</Link>
      </td>
      <td className="px-4 py-3 text-foreground/75">{childName}</td>
      <td className="px-4 py-3 text-foreground/60 text-xs">
        {new Date(invoice.period_start).toLocaleDateString("en-IE")} – {new Date(invoice.period_end).toLocaleDateString("en-IE")}
      </td>
      <td className="px-4 py-3 text-right tabular-nums">{formatMoney(invoice.amount_cents)}</td>
      <td className="px-4 py-3">
        <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusClass[invoice.status]}`}>{invoice.status}</span>
      </td>
    </tr>
  );
}
