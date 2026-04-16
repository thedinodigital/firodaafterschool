import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  reason: z.string().min(1, "Please pick a reason"),
  message: z.string().trim().min(5, "Please tell us a little more").max(2000),
});

interface ContactFormProps {
  reasons?: { value: string; label: string }[];
  defaultReason?: string;
  showReason?: boolean;
}

const defaultReasons = [
  { value: "general", label: "General enquiry" },
  { value: "enrolment", label: "Enrolment" },
  { value: "after-school", label: "After School" },
  { value: "other", label: "Other" },
];

export function ContactForm({
  reasons = defaultReasons,
  defaultReason = "general",
  showReason = true,
}: ContactFormProps) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reason, setReason] = useState(defaultReason);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      reason,
      message: String(fd.get("message") || ""),
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      const flat: Record<string, string> = {};
      for (const issue of result.error.issues) {
        flat[String(issue.path[0])] = issue.message;
      }
      setErrors(flat);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Simulated submit (admin/backend not enabled this round)
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSubmitted(true);
    toast({
      title: "Message received",
      description: "Thanks — we'll be in touch shortly.",
    });
  };

  if (submitted) {
    return (
      <div className="rounded-xl bg-cream-warm border border-foreground/10 p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-medium mb-2">
          Thank you, your message is on its way.
        </h3>
        <p className="text-foreground/70">
          A member of the office team will be in touch within 1–2 school days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" required maxLength={100} className="mt-2" />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required maxLength={255} className="mt-2" />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" name="phone" type="tel" maxLength={40} className="mt-2" />
        </div>
        {showReason && (
          <div>
            <Label htmlFor="reason">Reason</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((r) => (
                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required rows={6} maxLength={2000} className="mt-2" />
        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-foreground/55">
          We aim to reply within 1–2 school days.
        </p>
        <Button type="submit" variant="forest" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
