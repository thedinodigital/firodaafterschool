import { useParams, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { archiveList } from "./Archive";
import { archiveContent } from "@/data/longform";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ArchivePage = () => {
  const { slug } = useParams();
  const a = archiveList.find((x) => x.slug === slug);
  if (!a) return <Navigate to="/archive" replace />;
  const content = slug ? archiveContent[slug] : undefined;

  return (
    <Layout>
      <Seo
        title={`${a.name} — School archive | Holy Cross N.S., Firoda`}
        description={a.desc}
      />

      {/* HEADER */}
      <section className="bg-cream-warm">
        <div className="container py-20 lg:py-28">
          <Link
            to="/archive"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-primary hover:text-accent transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to the archive
          </Link>

          <span className="inline-block label-eyebrow text-accent mb-5">{a.date}</span>
          <h1 className="font-heading italic text-5xl md:text-7xl font-medium leading-[1.02] tracking-tight text-balance max-w-4xl">
            {a.name}
          </h1>
        </div>
      </section>

      {content ? (
        <>
          <section className="bg-cream">
            <div className="container py-16 lg:py-24">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                <article className="lg:col-span-8 space-y-12">
                  <p
                    className="font-body text-xl md:text-2xl leading-[1.7] text-foreground/85 text-pretty"
                    style={{ textIndent: 0 }}
                  >
                    <span
                      className="font-heading italic text-accent float-left mr-3 mt-1"
                      style={{ fontSize: "6rem", lineHeight: "0.85" }}
                    >
                      {content.intro.charAt(0)}
                    </span>
                    {content.intro.slice(1)}
                  </p>

                  {content.sections.map((s, i) => (
                    <div key={i} className="space-y-4">
                      {s.heading && (
                        <h2 className="font-heading text-2xl md:text-3xl font-medium leading-snug">
                          {s.heading}
                        </h2>
                      )}
                      {s.body.split("\n\n").map((p, j) => (
                        <p
                          key={j}
                          className="text-foreground/80 text-lg md:text-xl leading-[1.8]"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  ))}

                  <p className="text-xs text-foreground/50 italic pt-6 border-t border-foreground/10">
                    Drawn from the school's local-history work with help from parents,
                    grandparents and the local historical society. Corrections and
                    additions are always welcome — please get in touch.
                  </p>
                </article>

                <aside className="lg:col-span-4">
                  <div className="lg:sticky lg:top-24 space-y-6">
                    {content.facts && (
                      <div className="rounded-2xl bg-cream-warm border border-foreground/10 p-6">
                        <p className="label-eyebrow mb-4">In brief</p>
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
                      <p className="label-eyebrow-cream mb-3">The wider archive</p>
                      <p className="text-background/80 text-sm leading-relaxed mb-4">
                        A small living history of Firoda, Castlecomer and the parish.
                      </p>
                      <Link
                        to="/archive"
                        className="inline-flex items-center gap-2 text-sm text-accent-soft hover:text-background transition-colors"
                      >
                        All chapters <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {content.pullQuote && (
            <section className="bg-forest-deep grain-overlay">
              <div className="container py-20 lg:py-28">
                <blockquote className="max-w-4xl mx-auto text-center">
                  <p className="font-heading italic text-background text-3xl md:text-5xl leading-[1.15] text-balance">
                    "{content.pullQuote.text}"
                  </p>
                  {content.pullQuote.attribution && (
                    <footer className="mt-6 text-sm text-background/70">
                      — {content.pullQuote.attribution}
                    </footer>
                  )}
                </blockquote>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="bg-cream">
          <div className="container py-16 max-w-2xl">
            <p className="text-lg text-foreground/75 leading-relaxed drop-cap">
              {a.desc} The full chapter on {a.name.toLowerCase()} will be added here,
              drawn from the school's local-history project.{" "}
              <span className="text-foreground/50">[school to add full content]</span>
            </p>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-cream-warm border border-foreground/10 flex items-center justify-center text-xs italic text-foreground/40"
                >
                  Photo {i + 1}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-cream border-t border-foreground/10">
        <div className="container py-10">
          <Link
            to="/archive"
            className="inline-flex items-center gap-2 text-sm text-foreground/65 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to the archive
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ArchivePage;
