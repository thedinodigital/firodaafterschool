import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import {
  NEWS_CATEGORIES,
  NEWS_ILLUSTRATIONS,
  NewsCategory,
  NewsIllustration,
  fetchPostByIdAdmin,
  slugify,
} from "@/lib/news";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Seo } from "@/components/Seo";

const today = () => new Date().toISOString().slice(0, 10);

export default function NewsEditor() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { user } = useAuth();

  const { data: existing, isLoading } = useQuery({
    queryKey: ["admin", "news", "edit", id],
    queryFn: () => fetchPostByIdAdmin(id!),
    enabled: isEdit,
  });

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [date, setDate] = useState(today());
  const [category, setCategory] = useState<NewsCategory>("School Events");
  const [illustration, setIllustration] = useState<NewsIllustration | "none">("none");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [feature, setFeature] = useState(false);
  const [published, setPublished] = useState(true);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setSlug(existing.slug);
      setSlugTouched(true);
      setDate(existing.date);
      setCategory(existing.category);
      setIllustration((existing.illustration ?? "none") as NewsIllustration | "none");
      setExcerpt(existing.excerpt);
      setBody(existing.body);
      setFeature(existing.feature);
      setPublished(existing.published);
    }
  }, [existing]);

  useEffect(() => {
    if (!slugTouched && !isEdit) setSlug(slugify(title));
  }, [title, slugTouched, isEdit]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSlugError(null);
    setBusy(true);

    // Uniqueness check
    const { data: clash } = await supabase
      .from("news_posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (clash && clash.id !== id) {
      setSlugError("That slug is already used by another post.");
      setBusy(false);
      return;
    }

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      date,
      category,
      illustration: illustration === "none" ? null : illustration,
      excerpt: excerpt.trim(),
      body: body.trim(),
      feature,
      published,
      updated_by: user?.id ?? null,
    };

    const { error } = isEdit
      ? await supabase.from("news_posts").update(payload).eq("id", id!)
      : await supabase.from("news_posts").insert(payload);

    setBusy(false);

    if (error) {
      toast({ title: "Couldn't save", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Saved." });
    qc.invalidateQueries({ queryKey: ["admin", "news"] });
    qc.invalidateQueries({ queryKey: ["news"] });
    navigate("/admin/news");
  };

  if (isEdit && isLoading) {
    return (
      <AdminLayout>
        <p className="text-foreground/60">Loading…</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Seo title={`${isEdit ? "Edit" : "New"} news post — Staff portal`} description="Edit news post" />
      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-8">
          {isEdit ? "Edit post" : "New post"}
        </h1>

        <form onSubmit={onSubmit} className="space-y-6">
          <Field label="Title" htmlFor="title">
            <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>

          <Field label="Slug" htmlFor="slug" hint="Used in the URL. Auto-generated from title.">
            <Input
              id="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
            />
            {slugError && <p className="text-sm text-destructive mt-1">{slugError}</p>}
          </Field>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Date" htmlFor="date">
              <Input
                id="date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field>
            <Field label="Category" htmlFor="category">
              <Select value={category} onValueChange={(v) => setCategory(v as NewsCategory)}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NEWS_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Illustration" htmlFor="illustration">
            <Select
              value={illustration}
              onValueChange={(v) => setIllustration(v as NewsIllustration | "none")}
            >
              <SelectTrigger id="illustration">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {NEWS_ILLUSTRATIONS.map((i) => (
                  <SelectItem key={i} value={i}>
                    {i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Excerpt" htmlFor="excerpt" hint="1–3 sentences shown in news listings.">
            <Textarea
              id="excerpt"
              required
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </Field>

          <Field label="Body" htmlFor="body" hint="Use blank lines for paragraph breaks.">
            <Textarea
              id="body"
              required
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Field>

          <div className="flex items-center gap-3">
            <Checkbox
              id="feature"
              checked={feature}
              onCheckedChange={(v) => setFeature(v === true)}
            />
            <Label htmlFor="feature" className="cursor-pointer">
              Featured on homepage
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <Switch id="published" checked={published} onCheckedChange={setPublished} />
            <Label htmlFor="published" className="cursor-pointer">
              Published {published ? "" : "(draft)"}
            </Label>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button type="submit" variant="forest" disabled={busy}>
              {busy ? "Saving…" : "Save"}
            </Button>
            <Link to="/admin/news" className="text-sm text-foreground/65 hover:text-foreground">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-foreground/55">{hint}</p>}
    </div>
  );
}
