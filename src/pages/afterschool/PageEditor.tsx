import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Upload, ImageOff, ExternalLink, ArrowUp, ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { FasLayout, RequireFasOwner } from "./FasLayout";
import {
  fetchPageContent,
  savePageContent,
  getPagePublicUrl,
  FAS_PAGE_BUCKET,
  type FasPageContent,
} from "@/lib/fasPageContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FasPageEditor() {
  return (
    <RequireFasOwner>
      <FasLayout>
        <PageEditorContent />
      </FasLayout>
    </RequireFasOwner>
  );
}

function PageEditorContent() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["fas_page_content"], queryFn: fetchPageContent });
  const [draft, setDraft] = useState<FasPageContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (q.data) setDraft(q.data);
  }, [q.data]);

  if (q.isLoading || !draft) return <p className="text-foreground/60">Loading…</p>;

  const update = <K extends keyof FasPageContent>(section: K, patch: Partial<FasPageContent[K]>) =>
    setDraft({ ...draft, [section]: { ...draft[section], ...patch } });

  const save = async () => {
    setSaving(true);
    try {
      await savePageContent(draft);
      toast.success("Website content saved.");
      qc.invalidateQueries({ queryKey: ["fas_page_content"] });
    } catch (e: any) {
      toast.error(e?.message ?? "Couldn't save content.");
    } finally {
      setSaving(false);
    }
  };

  const resetSection = (key: keyof FasPageContent) => {
    if (!q.data) return;
    setDraft({ ...draft, [key]: q.data[key] });
    toast.info("Reverted unsaved changes in this section.");
  };

  const uploadHero = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `hero/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from(FAS_PAGE_BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      update("hero", { image_path: path });
      toast.success("Hero photo uploaded. Don't forget to save.");
    } catch (e: any) {
      toast.error(e?.message ?? "Couldn't upload photo.");
    } finally {
      setUploading(false);
    }
  };

  const heroUrl = getPagePublicUrl(draft.hero.image_path);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl">Website content</h1>
          <p className="text-sm text-foreground/60 mt-1">
            Edit the public After School page. Changes go live as soon as you save.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <a href="/after-school" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-1.5" /> View live page
            </a>
          </Button>
          <Button onClick={save} disabled={saving} variant="forest">
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["hero"]} className="space-y-3">
        {/* HERO */}
        <Section value="hero" title="Hero (top of page)" onReset={() => resetSection("hero")}>
          <Field label="Eyebrow (small text above headline)">
            <Input value={draft.hero.eyebrow} onChange={(e) => update("hero", { eyebrow: e.target.value })} />
          </Field>
          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="Headline – before italic">
              <Input value={draft.hero.headline_lead} onChange={(e) => update("hero", { headline_lead: e.target.value })} placeholder="(optional)" />
            </Field>
            <Field label="Headline – italic part">
              <Input value={draft.hero.headline_italic} onChange={(e) => update("hero", { headline_italic: e.target.value })} />
            </Field>
            <Field label="Headline – after italic">
              <Input value={draft.hero.headline_tail} onChange={(e) => update("hero", { headline_tail: e.target.value })} />
            </Field>
          </div>
          <Field label="Intro paragraph">
            <Textarea rows={3} value={draft.hero.intro} onChange={(e) => update("hero", { intro: e.target.value })} />
          </Field>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Primary button label">
              <Input value={draft.hero.primary_cta_label} onChange={(e) => update("hero", { primary_cta_label: e.target.value })} />
            </Field>
            <Field label="Secondary button label">
              <Input value={draft.hero.secondary_cta_label} onChange={(e) => update("hero", { secondary_cta_label: e.target.value })} />
            </Field>
          </div>

          <div className="rounded-lg border border-foreground/10 bg-cream-warm/40 p-4 space-y-3">
            <Label>Hero photo</Label>
            {heroUrl ? (
              <img src={heroUrl} alt="" className="w-full max-w-md rounded-lg border border-foreground/10" />
            ) : (
              <p className="text-sm text-foreground/60 flex items-center gap-2">
                <ImageOff className="w-4 h-4" /> Using the default illustration. Upload a photo to replace it.
              </p>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              <label className="inline-flex">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadHero(f);
                    e.currentTarget.value = "";
                  }}
                />
                <Button asChild variant="outline" size="sm" disabled={uploading}>
                  <span><Upload className="w-4 h-4 mr-1.5" />{uploading ? "Uploading…" : (heroUrl ? "Replace photo" : "Upload photo")}</span>
                </Button>
              </label>
              {heroUrl && (
                <Button variant="ghost" size="sm" onClick={() => update("hero", { image_path: null })}>
                  <Trash2 className="w-4 h-4 mr-1.5" /> Use default illustration
                </Button>
              )}
            </div>
          </div>
        </Section>

        {/* OFFER */}
        <Section value="offer" title="What we offer" onReset={() => resetSection("offer")}>
          <HeadingFields
            eyebrow={draft.offer.eyebrow}
            lead={draft.offer.heading_lead}
            italic={draft.offer.heading_italic}
            tail={draft.offer.heading_tail}
            intro={draft.offer.intro}
            onChange={(p) => update("offer", p as any)}
          />
          <RepeatableList
            label="Offerings"
            items={draft.offer.items}
            onChange={(items) => update("offer", { items })}
            empty={{ title: "", desc: "" }}
            renderFields={(item, on) => (
              <>
                <Field label="Title"><Input value={item.title} onChange={(e) => on({ title: e.target.value })} /></Field>
                <Field label="Description"><Textarea rows={2} value={item.desc} onChange={(e) => on({ desc: e.target.value })} /></Field>
              </>
            )}
          />
        </Section>

        {/* TIMELINE */}
        <Section value="timeline" title="A typical afternoon" onReset={() => resetSection("timeline")}>
          <HeadingFields
            eyebrow={draft.timeline.eyebrow}
            lead={draft.timeline.heading_lead}
            italic={draft.timeline.heading_italic}
            intro={draft.timeline.intro}
            onChange={(p) => update("timeline", p as any)}
          />
          <RepeatableList
            label="Schedule entries"
            items={draft.timeline.items}
            onChange={(items) => update("timeline", { items })}
            empty={{ time: "", body: "" }}
            renderFields={(item, on) => (
              <div className="grid sm:grid-cols-4 gap-3">
                <Field label="Time"><Input value={item.time} onChange={(e) => on({ time: e.target.value })} /></Field>
                <div className="sm:col-span-3">
                  <Field label="What happens"><Textarea rows={2} value={item.body} onChange={(e) => on({ body: e.target.value })} /></Field>
                </div>
              </div>
            )}
          />
        </Section>

        {/* WHY */}
        <Section value="why" title="Why families choose us" onReset={() => resetSection("why")}>
          <HeadingFields
            eyebrow={draft.why.eyebrow}
            lead={draft.why.heading_lead}
            italic={draft.why.heading_italic}
            tail={draft.why.heading_tail}
            onChange={(p) => update("why", p as any)}
          />
          <RepeatableList
            label="Reasons"
            items={draft.why.items}
            onChange={(items) => update("why", { items })}
            empty={{ title: "", body: "" }}
            renderFields={(item, on) => (
              <>
                <Field label="Title"><Input value={item.title} onChange={(e) => on({ title: e.target.value })} /></Field>
                <Field label="Body"><Textarea rows={2} value={item.body} onChange={(e) => on({ body: e.target.value })} /></Field>
              </>
            )}
          />
        </Section>

        {/* PRACTICALITIES */}
        <Section value="practicalities" title="Practical details" onReset={() => resetSection("practicalities")}>
          <Field label="Eyebrow"><Input value={draft.practicalities.eyebrow} onChange={(e) => update("practicalities", { eyebrow: e.target.value })} /></Field>
          <Field label="Heading"><Input value={draft.practicalities.heading} onChange={(e) => update("practicalities", { heading: e.target.value })} /></Field>
          <Field label="Intro"><Textarea rows={2} value={draft.practicalities.intro} onChange={(e) => update("practicalities", { intro: e.target.value })} /></Field>
          <RepeatableList
            label="Detail rows"
            items={draft.practicalities.items}
            onChange={(items) => update("practicalities", { items })}
            empty={{ label: "", value: "" }}
            renderFields={(item, on) => (
              <div className="grid sm:grid-cols-3 gap-3">
                <Field label="Label"><Input value={item.label} onChange={(e) => on({ label: e.target.value })} /></Field>
                <div className="sm:col-span-2">
                  <Field label="Value"><Input value={item.value} onChange={(e) => on({ value: e.target.value })} /></Field>
                </div>
              </div>
            )}
          />
        </Section>

        {/* FAQ */}
        <Section value="faqs" title="Frequently asked questions" onReset={() => resetSection("faqs")}>
          <HeadingFields
            eyebrow={draft.faqs.eyebrow}
            lead={draft.faqs.heading_lead}
            italic={draft.faqs.heading_italic}
            intro={draft.faqs.intro}
            onChange={(p) => update("faqs", p as any)}
          />
          <RepeatableList
            label="Questions"
            items={draft.faqs.items}
            onChange={(items) => update("faqs", { items })}
            empty={{ q: "", a: "" }}
            renderFields={(item, on) => (
              <>
                <Field label="Question"><Input value={item.q} onChange={(e) => on({ q: e.target.value })} /></Field>
                <Field label="Answer"><Textarea rows={3} value={item.a} onChange={(e) => on({ a: e.target.value })} /></Field>
              </>
            )}
          />
        </Section>

        {/* GALLERY HEADING */}
        <Section value="gallery" title="Photo gallery (text only)" onReset={() => resetSection("gallery")}>
          <p className="text-sm text-foreground/60">
            The photos themselves are managed on the <a href="/afterschool-admin/gallery" className="underline hover:text-accent">Photo gallery</a> page.
            Edit the section heading here.
          </p>
          <HeadingFields
            eyebrow={draft.gallery.eyebrow}
            lead={draft.gallery.heading_lead}
            italic={draft.gallery.heading_italic}
            intro={draft.gallery.intro}
            onChange={(p) => update("gallery", p as any)}
          />
        </Section>

        {/* CLOSING */}
        <Section value="closing" title="Closing call-to-action" onReset={() => resetSection("closing")}>
          <Field label="Eyebrow"><Input value={draft.closing.eyebrow} onChange={(e) => update("closing", { eyebrow: e.target.value })} /></Field>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Heading – lead"><Input value={draft.closing.heading_lead} onChange={(e) => update("closing", { heading_lead: e.target.value })} /></Field>
            <Field label="Heading – italic"><Input value={draft.closing.heading_italic} onChange={(e) => update("closing", { heading_italic: e.target.value })} /></Field>
          </div>
          <Field label="Intro"><Textarea rows={2} value={draft.closing.intro} onChange={(e) => update("closing", { intro: e.target.value })} /></Field>
          <Field label="Button label"><Input value={draft.closing.cta_label} onChange={(e) => update("closing", { cta_label: e.target.value })} /></Field>
        </Section>
      </Accordion>

      <div className="flex justify-end pt-4 border-t border-foreground/10">
        <Button onClick={save} disabled={saving} variant="forest" size="lg">
          {saving ? "Saving…" : "Save all changes"}
        </Button>
      </div>
    </div>
  );
}

function Section({ value, title, onReset, children }: { value: string; title: string; onReset: () => void; children: React.ReactNode }) {
  return (
    <AccordionItem value={value} className="border border-foreground/10 rounded-xl bg-background px-5">
      <AccordionTrigger className="font-heading text-lg hover:no-underline py-4">{title}</AccordionTrigger>
      <AccordionContent className="space-y-4 pb-5">
        {children}
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={onReset} className="text-foreground/50">Revert unsaved changes in this section</Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wide text-foreground/60">{label}</Label>
      {children}
    </div>
  );
}

function HeadingFields({
  eyebrow,
  lead,
  italic,
  tail,
  intro,
  onChange,
}: {
  eyebrow?: string;
  lead?: string;
  italic?: string;
  tail?: string;
  intro?: string;
  onChange: (p: Record<string, string>) => void;
}) {
  return (
    <>
      {eyebrow !== undefined && (
        <Field label="Eyebrow"><Input value={eyebrow} onChange={(e) => onChange({ eyebrow: e.target.value })} /></Field>
      )}
      <div className={`grid gap-3 ${tail !== undefined ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {lead !== undefined && (
          <Field label="Heading – before italic"><Input value={lead} onChange={(e) => onChange({ heading_lead: e.target.value })} placeholder="(optional)" /></Field>
        )}
        {italic !== undefined && (
          <Field label="Heading – italic part"><Input value={italic} onChange={(e) => onChange({ heading_italic: e.target.value })} /></Field>
        )}
        {tail !== undefined && (
          <Field label="Heading – after italic"><Input value={tail} onChange={(e) => onChange({ heading_tail: e.target.value })} placeholder="(optional)" /></Field>
        )}
      </div>
      {intro !== undefined && (
        <Field label="Intro"><Textarea rows={2} value={intro} onChange={(e) => onChange({ intro: e.target.value })} /></Field>
      )}
    </>
  );
}

function RepeatableList<T>({
  label,
  items,
  empty,
  onChange,
  renderFields,
}: {
  label: string;
  items: T[];
  empty: T;
  onChange: (items: T[]) => void;
  renderFields: (item: T, onPatch: (p: Partial<T>) => void) => React.ReactNode;
}) {
  const set = (i: number, patch: Partial<T>) => {
    const next = items.slice();
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = items.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm">{label}</Label>
        <Button variant="outline" size="sm" onClick={() => onChange([...items, { ...empty }])}>
          <Plus className="w-4 h-4 mr-1.5" /> Add
        </Button>
      </div>
      {items.length === 0 && (
        <p className="text-sm text-foreground/50 italic">None yet — click Add.</p>
      )}
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-foreground/10 bg-cream-warm/30 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground/50">#{i + 1}</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-3.5 h-3.5" /></Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => move(i, 1)} disabled={i === items.length - 1}><ArrowDown className="w-3.5 h-3.5" /></Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => remove(i)}><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
          </div>
          {renderFields(item, (p) => set(i, p))}
        </div>
      ))}
    </div>
  );
}
