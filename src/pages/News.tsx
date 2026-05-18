import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { fetchPublishedNews, NEWS_CATEGORIES, NewsCategory } from "@/lib/news";
import { cn } from "@/lib/utils";

const categories: ("All" | NewsCategory)[] = ["All", ...NEWS_CATEGORIES];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });

const News = () => {
  const [filter, setFilter] = useState<"All" | NewsCategory>("All");
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["news", "all"],
    queryFn: () => fetchPublishedNews(),
  });
  const items = useMemo(
    () => (!posts ? [] : filter === "All" ? posts : posts.filter((n) => n.category === filter)),
    [posts, filter]
  );

  return (
    <Layout>
      <Seo title="News & Events — Holy Cross N.S., Firoda" description="The latest news from Holy Cross National School, Firoda." />
      <PageHero
        eyebrow="News & Events"
        title={<>News from the <span className="italic text-accent">school</span>.</>}
        description="A running record of the year — events, sport, art, music and community."
        breadcrumb={[{ name: "News", href: "/news" }]}
      />
      <section className="bg-cream">
        <div className="container py-12">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition-colors",
                  filter === c
                    ? "bg-primary text-background border-primary"
                    : "border-foreground/20 text-foreground/70 hover:border-foreground/50"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-cream-warm/50 border border-foreground/10 p-6 h-44 motion-safe:animate-pulse" />
              ))}
            </div>
          )}

          {isError && (
            <p className="text-foreground/65">News couldn't be loaded — please try again later.</p>
          )}

          {!isLoading && !isError && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((n) => (
                <Link
                  key={n.slug}
                  to={`/news/${n.slug}`}
                  className="group block rounded-2xl bg-cream-warm/50 border border-foreground/10 p-6 hover:bg-cream-warm transition-colors"
                >
                  <p className="label-eyebrow">{n.category} · {formatDate(n.date)}</p>
                  <h3 className="font-heading text-xl font-medium mt-3 leading-snug group-hover:text-accent transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-foreground/70 mt-2 text-sm leading-relaxed">{n.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};
export default News;
