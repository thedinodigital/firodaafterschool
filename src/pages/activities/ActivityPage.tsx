import { useParams, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { activitiesList } from "./Activities";
import { activityContent } from "@/data/longform";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ActivityPage = () => {
  const { slug } = useParams();
  const a = activitiesList.find((x) => x.slug === slug);
  if (!a) return <Navigate to="/activities" replace />;
  const content = slug ? activityContent[slug] : undefined;

  return (
    <Layout>
      <Seo title={`${a.name} — Holy Cross N.S., Firoda`} description={a.desc} />
      <PageHero
        eyebrow="Activities"
        title={a.name}
        description={a.desc}
        breadcrumb={[{ name: "Activities", href: "/activities" }, { name: a.name, href: `/activities/${a.slug}` }]}
        variant="warm"
      />

      {content ? (
        <>
          <section className="bg-cream">
            <div className="container py-16 lg:py-20">
              <div className="grid lg:grid-cols-12 gap-12">
                <article className="lg:col-span-8 space-y-10">
                  <p className="font-heading text-2xl md:text-3xl leading-snug text-foreground/85 italic text-balance drop-cap">
                    {content.intro}
                  </p>

                  {content.sections.map((s, i) => (
                    <div key={i} className="space-y-4">
                      {s.heading && (
                        <h2 className="font-heading text-2xl md:text-3xl font-medium leading-snug">
                          {s.heading}
                        </h2>
                      )}
                      {s.body.split("\n\n").map((p, j) => (
                        <p key={j} className="text-foreground/80 leading-relaxed text-lg">
                          {p}
                        </p>
                      ))}
                    </div>
                  ))}

                  {content.pullQuote && (
                    <blockquote className="border-l-2 border-accent pl-6 py-2 my-10">
                      <p className="font-heading italic text-2xl md:text-3xl leading-snug text-foreground/90 text-balance">
                        "{content.pullQuote.text}"
                      </p>
                      {content.pullQuote.attribution && (
                        <footer className="mt-3 text-sm text-foreground/60">
                          — {content.pullQuote.attribution}
                        </footer>
                      )}
                    </blockquote>
                  )}
                </article>

                <aside className="lg:col-span-4 space-y-8">
                  {content.facts && (
                    <div className="rounded-2xl bg-cream-warm/60 border border-foreground/10 p-6">
                      <p className="label-eyebrow mb-4">At a glance</p>
                      <dl className="space-y-4">
                        {content.facts.map((f) => (
                          <div key={f.label}>
                            <dt className="font-heading italic text-sm text-foreground/60">
                              {f.label}
                            </dt>
                            <dd className="text-foreground/85 mt-0.5">{f.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  <div className="rounded-2xl bg-forest-deep p-6 text-background">
                    <p className="label-eyebrow-cream mb-3">More activities</p>
                    <p className="text-background/80 text-sm leading-relaxed mb-4">
                      Explore the wider life of the school — sport, music, art, community
                      and everything in between.
                    </p>
                    <Link
                      to="/activities"
                      className="inline-flex items-center gap-2 text-sm text-accent-soft hover:text-background"
                    >
                      All activities <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </aside>
              </div>

              <div className="mt-16 pt-8 border-t border-foreground/10">
                <Link
                  to="/activities"
                  className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to all activities
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-cream">
          <div className="container py-16 max-w-3xl">
            <div className="prose prose-lg max-w-none prose-p:text-foreground/80 prose-headings:font-heading">
              <p className="lead italic">{a.desc}</p>
              <p className="text-foreground/65">
                A fuller description of {a.name.toLowerCase()} at Holy Cross will be
                added here, along with a photo gallery from the school year.{" "}
                <span className="text-foreground/50">[school to add content]</span>
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-cream-warm border border-foreground/10 flex items-center justify-center text-xs text-foreground/40 italic"
                >
                  Photo {i + 1}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};
export default ActivityPage;
