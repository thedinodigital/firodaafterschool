import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Upload, Trash2, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { FasLayout, RequireFasOwner } from "./FasLayout";
import { fetchGalleryImages, getPagePublicUrl, FAS_PAGE_BUCKET, type FasGalleryImage } from "@/lib/fasPageContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FasGallery() {
  return (
    <RequireFasOwner>
      <FasLayout>
        <GalleryContent />
      </FasLayout>
    </RequireFasOwner>
  );
}

function GalleryContent() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["fas_gallery"], queryFn: fetchGalleryImages });
  const [uploading, setUploading] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: ["fas_gallery"] });

  const uploadFiles = async (files: FileList) => {
    setUploading(true);
    try {
      const startOrder = (q.data?.length ?? 0);
      let i = 0;
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() || "jpg";
        const path = `gallery/${Date.now()}-${i}.${ext}`;
        const { error: upErr } = await supabase.storage.from(FAS_PAGE_BUCKET).upload(path, file, { upsert: false });
        if (upErr) throw upErr;
        const { error: insErr } = await supabase
          .from("fas_gallery_images" as never)
          .insert({ file_path: path, sort_order: startOrder + i } as never);
        if (insErr) throw insErr;
        i++;
      }
      toast.success(`${files.length} photo${files.length === 1 ? "" : "s"} uploaded.`);
      refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Couldn't upload.");
    } finally {
      setUploading(false);
    }
  };

  const updateCaption = async (img: FasGalleryImage, caption: string) => {
    const { error } = await supabase.from("fas_gallery_images" as never).update({ caption } as never).eq("id", img.id);
    if (error) toast.error("Couldn't update caption.");
    else refresh();
  };

  const remove = async (img: FasGalleryImage) => {
    if (!confirm("Remove this photo?")) return;
    await supabase.storage.from(FAS_PAGE_BUCKET).remove([img.file_path]);
    const { error } = await supabase.from("fas_gallery_images" as never).delete().eq("id", img.id);
    if (error) toast.error("Couldn't delete record.");
    else {
      toast.success("Photo removed.");
      refresh();
    }
  };

  const move = async (img: FasGalleryImage, dir: -1 | 1) => {
    const items = (q.data ?? []).slice();
    const i = items.findIndex((x) => x.id === img.id);
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const a = items[i], b = items[j];
    await supabase.from("fas_gallery_images" as never).update({ sort_order: b.sort_order } as never).eq("id", a.id);
    await supabase.from("fas_gallery_images" as never).update({ sort_order: a.sort_order } as never).eq("id", b.id);
    refresh();
  };

  const images = q.data ?? [];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl">Photo gallery</h1>
          <p className="text-sm text-foreground/60 mt-1">
            Photos that appear in the gallery section of the public After School page.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <a href="/after-school" target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4 mr-1.5" /> View live page</a>
          </Button>
          <label className="inline-flex">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                if (e.target.files?.length) uploadFiles(e.target.files);
                e.currentTarget.value = "";
              }}
            />
            <Button asChild variant="forest" disabled={uploading}>
              <span><Upload className="w-4 h-4 mr-1.5" />{uploading ? "Uploading…" : "Upload photos"}</span>
            </Button>
          </label>
        </div>
      </div>

      {q.isLoading ? (
        <p className="text-foreground/60">Loading…</p>
      ) : images.length === 0 ? (
        <div className="rounded-xl border border-dashed border-foreground/20 p-12 text-center bg-cream-warm/30">
          <p className="text-foreground/60">No photos yet. Upload the first one to start your gallery.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => {
            const url = getPagePublicUrl(img.file_path);
            return (
              <div key={img.id} className="rounded-xl border border-foreground/10 bg-background overflow-hidden">
                {url && <img src={url} alt={img.caption ?? ""} className="w-full aspect-[4/3] object-cover" />}
                <div className="p-3 space-y-2">
                  <Input
                    placeholder="Caption (optional)"
                    defaultValue={img.caption ?? ""}
                    onBlur={(e) => {
                      if ((e.target.value || null) !== (img.caption || null)) {
                        updateCaption(img, e.target.value);
                      }
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => move(img, -1)} disabled={i === 0}><ArrowUp className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => move(img, 1)} disabled={i === images.length - 1}><ArrowDown className="w-4 h-4" /></Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => remove(img)}>
                      <Trash2 className="w-4 h-4 mr-1.5" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
