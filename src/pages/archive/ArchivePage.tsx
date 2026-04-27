import { useParams, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
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
      <PageHero
        eyebrow="School archive"
        title={<span className="italic text-accent">{a.name}</span>}
        description={a.desc}
        breadcrumb={[{ name: "Archive", href: "/archive" }, { name: a.name, href: `/archive/${a.slug}` }]}
        variant="warm"
      />

      {content ? (
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
                        <span className="font-heading italic text-accent text-base mr-3 align-middle">
                          {romanize(i + 1)}.
                        </span>
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

                <p className="text-xs text-foreground/50 italic pt-6 border-t border-foreground/10">
                  Drawn from the school's local-history work with help from parents,
                  grandparents and the local historical society. Corrections and
                  additions are always welcome — please get in touch.
                </p>
              </article>

              <aside className="lg:col-span-4 space-y-8">
                {content.facts && (
                  <div className="rounded-2xl bg-cream-warm/60 border border-foreground/10 p-6">
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
                    A small living history of Firoda, Castlecomer and the parish — kept
                    by the school community.
                  </p>
                  <Link
                    to="/archive"
                    className="inline-flex items-center gap-2 text-sm text-accent-soft hover:text-background"
                  >
                    All chapters <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </aside>
            </div>

            <div className="mt-16 pt-8 border-t border-foreground/10">
              <Link
                to="/archive"
                className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" /> Back to archive
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-cream">
          <div className="container py-16 max-w-2xl">
            <div className="prose prose-lg max-w-none prose-p:text-foreground/80 prose-headings:font-heading">
              <p className="lead drop-cap">
                {a.desc} The full chapter on {a.name.toLowerCase()} will be added here,
                drawn from the school's local-history project.{" "}
                <span className="text-foreground/50">[school to add full content]</span>
              </p>
              <p>
                Each chapter of the archive includes a short introduction, the historical
                account itself, and a gallery of photographs and documents gathered from
                local families.
              </p>
            </div>
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
            <Link
              to="/archive"
              className="inline-flex items-center gap-2 mt-12 text-sm text-foreground/60 hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" /> Back to archive
            </Link>
          </div>
        </section>
      )}
    </Layout>
  );
};

function romanize(n: number) {
  const map: [number, string][] = [
    [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"],
  ];
  let out = "";
  for (const [v, s] of map) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
}

export default ArchivePage;
