import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Check } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllNewsAdmin } from "@/lib/news";
import { toast } from "@/hooks/use-toast";
import { Seo } from "@/components/Seo";
import { cn } from "@/lib/utils";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric" });

export default function AdminNewsList() {
  const qc = useQueryClient();
  const [toDelete, setToDelete] = useState<{ id: string; title: string } | null>(null);

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["admin", "news", "all"],
    queryFn: fetchAllNewsAdmin,
  });

  const handleDelete = async () => {
    if (!toDelete) return;
    const { error } = await supabase.from("news_posts").delete().eq("id", toDelete.id);
    if (error) {
      toast({ title: "Couldn't delete", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted." });
      qc.invalidateQueries({ queryKey: ["admin", "news", "all"] });
      qc.invalidateQueries({ queryKey: ["news"] });
    }
    setToDelete(null);
  };

  return (
    <AdminLayout>
      <Seo title="News & Updates — Staff portal" description="Manage news posts." />
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8 gap-4">
          <h1 className="font-heading text-3xl md:text-4xl font-medium">News &amp; Updates</h1>
          <Button asChild variant="forest">
            <Link to="/admin/news/new">
              <Plus className="w-4 h-4" /> New post
            </Link>
          </Button>
        </div>

        {isLoading && <p className="text-foreground/60">Loading…</p>}
        {isError && (
          <p className="text-destructive">Couldn't load posts. Try refreshing the page.</p>
        )}

        {posts && (
          <div className="bg-background border border-foreground/10 rounded-xl overflow-hidden">
            <ul className="divide-y divide-foreground/10">
              {posts.map((p) => (
                <li
                  key={p.id}
                  className={cn(
                    "flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-5 py-4",
                    !p.published && "border-l-4 border-l-gold"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium leading-snug truncate">{p.title}</p>
                    <p className="text-xs text-foreground/55 mt-1">
                      {p.category} · {formatDate(p.date)}
                      {p.feature && (
                        <span className="inline-flex items-center gap-1 ml-2 text-accent">
                          <Check className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full",
                        p.published
                          ? "bg-primary/10 text-primary"
                          : "bg-gold/15 text-foreground"
                      )}
                    >
                      {p.published ? "Published" : "Draft"}
                    </span>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/admin/news/${p.id}/edit`} aria-label={`Edit ${p.title}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setToDelete({ id: p.id, title: p.title })}
                      aria-label={`Delete ${p.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </li>
              ))}
              {posts.length === 0 && (
                <li className="px-5 py-12 text-center text-foreground/55">No posts yet.</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              "{toDelete?.title}" will be permanently removed from the website. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
