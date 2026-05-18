import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Newspaper } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Seo } from "@/components/Seo";

const comingSoon = [
  "Events & Calendar",
  "Photo gallery",
  "Document library",
  "Board of Management portal",
  "Parent enquiries inbox",
  "Staff invitations",
];

export default function AdminDashboard() {
  const { profile, user } = useAuth();
  const first = (profile?.full_name ?? user?.email ?? "there").split(" ")[0];

  const { data: count } = useQuery({
    queryKey: ["admin", "news-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("news_posts")
        .select("*", { count: "exact", head: true })
        .eq("published", true);
      if (error) throw error;
      return count ?? 0;
    },
  });

  return (
    <AdminLayout>
      <Seo title="Dashboard — Staff portal" description="Holy Cross staff portal dashboard." />
      <div className="max-w-4xl">
        <h1 className="font-heading text-3xl md:text-4xl font-medium">
          Welcome back, <span className="italic text-accent">{first}</span>.
        </h1>
        <p className="text-foreground/65 mt-2">Manage the Holy Cross website.</p>

        <Link
          to="/admin/news"
          className="mt-10 block group rounded-2xl bg-background border border-foreground/10 p-8 hover:border-foreground/25 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Newspaper className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-medium">News &amp; Updates</h2>
                <p className="text-foreground/65 mt-1 text-sm">
                  {count ?? "—"} published {count === 1 ? "post" : "posts"} on the website
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-foreground/40 group-hover:text-foreground/80 transition-colors mt-2" />
          </div>
        </Link>

        <div className="mt-10">
          <p className="label-eyebrow mb-4">Coming soon</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comingSoon.map((m) => (
              <div
                key={m}
                className="rounded-xl border border-dashed border-foreground/15 bg-background/40 p-5 text-foreground/40 text-sm"
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
