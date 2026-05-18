import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Printer, Mail } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FasLayout, RequireFasOwner } from "./FasLayout";
import { fetchSettings, formatMoney, FasInvoice } from "@/lib/fas";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FasInvoiceDetail() {
  return (
    <RequireFasOwner>
      <FasLayout>
        <Detail />
      </FasLayout>
    </RequireFasOwner>
  );
}

function Detail() {
  const { id } = useParams();
  const qc = useQueryClient();

  const invQ = useQuery({
    queryKey: ["fas_invoice", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("fas_invoices" as never).select("*").eq("id", id!).maybeSingle();
      if (error) throw error;
      return data as unknown as FasInvoice | null;
    },
  });
  const settingsQ = useQuery({ queryKey: ["fas_settings"], queryFn: fetchSettings });
  const childQ = useQuery({
    queryKey: ["fas_child_for_invoice", invQ.data?.child_id],
    enabled: !!invQ.data?.child_id,
    queryFn: async () => {
      const { data } = await supabase.from("fas_children" as never).select("first_name, last_name").eq("id", invQ.data!.child_id).maybeSingle();
      return data as unknown as { first_name: string; last_name: string } | null;
    },
  });

  if (invQ.isLoading || settingsQ.isLoading) return <p className="text-foreground/60">Loading…</p>;
  const invoice = invQ.data;
  if (!invoice) return <p className="text-foreground/60">Invoice not found.</p>;
  const settings = settingsQ.data!;
  const childName = childQ.data ? `${childQ.data.first_name} ${childQ.data.last_name}` : "—";

  const updateStatus = async (status: FasInvoice["status"]) => {
    const patch: Record<string, unknown> = { status };
    if (status === "sent" && !invoice.issued_at) patch.issued_at = new Date().toISOString();
    if (status === "paid") patch.paid_at = new Date().toISOString();
    const { error } = await supabase.from("fas_invoices" as never).update(patch as never).eq("id", invoice.id);
    if (error) toast.error("Couldn't update status.");
    else {
      toast.success(`Marked as ${status}.`);
      qc.invalidateQueries({ queryKey: ["fas_invoice", id] });
      qc.invalidateQueries({ queryKey: ["fas_invoices"] });
    }
  };

  const mailto = `mailto:${invoice.billing_contact_email ?? ""}?subject=${encodeURIComponent(
    `Invoice ${invoice.invoice_number} — Firoda After School`
  )}&body=${encodeURIComponent(
    `Hi ${invoice.billing_contact_name},\n\nPlease find attached invoice ${invoice.invoice_number} for ${childName} covering ${invoice.period_start} to ${invoice.period_end}.\n\nTotal: ${formatMoney(invoice.amount_cents)}\n\nThanks,\nMarie`
  )}`;

  return (
    <div className="space-y-6">
      {/* Toolbar (screen only) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-3 max-w-3xl">
        <Link to="/afterschool-admin/invoices" className="text-sm text-foreground/60 hover:text-foreground inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to invoices
        </Link>
        <div className="flex items-center gap-2">
          <Select value={invoice.status} onValueChange={(v) => updateStatus(v as FasInvoice["status"])}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => window.open(mailto)}>
            <Mail className="w-4 h-4 mr-1.5" /> Email
          </Button>
          <Button onClick={() => window.print()} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Printer className="w-4 h-4 mr-1.5" /> Print
          </Button>
        </div>
      </div>

      {/* Invoice — A4 printable */}
      <article className="bg-background border border-foreground/10 rounded-xl p-8 md:p-12 max-w-3xl mx-auto print:border-0 print:shadow-none print:rounded-none print:p-0 print:max-w-none">
        <header className="flex items-start justify-between gap-6 border-b border-foreground/15 pb-6 mb-6">
          <div>
            <img src="/firoda-crest.png" alt="" className="w-16 h-auto mb-3" />
            <h1 className="font-heading text-2xl">{settings.service_name}</h1>
            <p className="text-sm text-foreground/65">Firoda, Castlecomer, Co. Kilkenny</p>
            {settings.tusla_registration && <p className="text-xs text-foreground/55 mt-1">Tusla Reg: {settings.tusla_registration}</p>}
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/55">Invoice</p>
            <p className="font-heading text-xl">{invoice.invoice_number}</p>
            <p className="text-xs text-foreground/60 mt-2">Issued {invoice.issued_at ? new Date(invoice.issued_at).toLocaleDateString("en-IE") : "—"}</p>
            <p className="text-xs text-foreground/60 capitalize">Status: {invoice.status}</p>
          </div>
        </header>

        <div className="grid sm:grid-cols-2 gap-6 mb-8 text-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-foreground/55 mb-1">Billed to</p>
            <p className="font-medium">{invoice.billing_contact_name}</p>
            {invoice.billing_contact_email && <p className="text-foreground/65">{invoice.billing_contact_email}</p>}
            <p className="text-foreground/65 mt-1">For: {childName}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-foreground/55 mb-1">Period</p>
            <p>{new Date(invoice.period_start).toLocaleDateString("en-IE")} – {new Date(invoice.period_end).toLocaleDateString("en-IE")}</p>
            <p className="text-foreground/65 mt-1">{invoice.attendance_days} attendance day{invoice.attendance_days === 1 ? "" : "s"}</p>
          </div>
        </div>

        <table className="w-full text-sm border-collapse mb-8">
          <thead>
            <tr className="border-b border-foreground/20 text-left">
              <th className="py-2">Description</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-foreground/10">
              <td className="py-3">After-school care · {childName} · {invoice.attendance_days} day{invoice.attendance_days === 1 ? "" : "s"}</td>
              <td className="py-3 text-right tabular-nums">{formatMoney(invoice.amount_cents)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td className="py-3">Total</td>
              <td className="py-3 text-right tabular-nums">{formatMoney(invoice.amount_cents)}</td>
            </tr>
          </tfoot>
        </table>

        {(settings.bank_details || settings.invoice_notes) && (
          <div className="text-sm space-y-3 border-t border-foreground/15 pt-6">
            {settings.bank_details && (
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-foreground/55 mb-1">Payment details</p>
                <pre className="whitespace-pre-wrap font-body text-foreground/75">{settings.bank_details}</pre>
              </div>
            )}
            {settings.invoice_notes && <p className="text-foreground/65">{settings.invoice_notes}</p>}
          </div>
        )}
      </article>
    </div>
  );
}
