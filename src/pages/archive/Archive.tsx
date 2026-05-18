import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Landmark, MapPin, Trophy, Trees, Flag, Hammer, Gem } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";

export interface ArchiveItem {
  slug: string;
  name: string;
  desc: string;
  date: string;
}

export const archiveList: ArchiveItem[] = [
  { slug: "1916", name: "1916 Commemoration", desc: "The school's project marking the centenary of the Easter Rising.", date: "2016 — centenary project" },
  { slug: "museum", name: "Museum", desc: "A small school museum of objects gathered from the local community.", date: "Ongoing" },
  { slug: "castlecomer", name: "Castlecomer", desc: "Notes on the nearby town of Castlecomer and its long history.", date: "c. 1170 → today" },
  { slug: "gaa-grounds", name: "GAA Grounds", desc: "The pitches beside the school and their place in parish life.", date: "1884 → today" },
  { slug: "demesne", name: "The Demesne", desc: "The Castlecomer Demesne — once an estate, now a much-loved local park.", date: "1635 → today" },
  { slug: "golf-course", name: "Golf Course", desc: "Castlecomer Golf Club, on the edge of the Demesne.", date: "1935 → today" },
  { slug: "coal-mining", name: "Coal Mining", desc: "Castlecomer's coal-mining past, and the lives shaped by it.", date: "1640 – 1969" },
  { slug: "bracelet", name: "The Bracelet", desc: "A local artefact, and the story behind it.", date: "Bronze Age, found 1973" },
];

const iconFor = (slug: string) => {
  switch (slug) {
    case "1916": return Flag;
    case "museum": return Landmark;
    case "castlecomer": return MapPin;
    case "gaa-grounds": return Trophy;
    case "demesne": return Trees;
    case "golf-course": return Flag;
    case "coal-mining": return Hammer;
    case "bracelet": return Gem;
    default: return BookOpen;
  }
};

const Archive = () => (
  <Layout>
    <Seo
      title="School archive — Local history project | Holy Cross N.S., Firoda"
      description="A local history archive maintained by Holy Cross N.S., Firoda — Castlecomer, the Demesne, the GAA grounds, coal mining and more."
    />

    {/* HERO */}
    <section className="bg-cream-warm">
      <div className="container py-28 lg:py-36">
        <div className="max-w-4xl">
          <p className="label-eyebrow mb-6">A local history archive — kept by the school</p>
          <h1 className="font-heading text-5xl md:text-7xl font-medium leading-[1.02] tracking-tight text-balance">
            Firoda has a <span className="italic text-accent">long memory</span>.
          </h1>
          <div className="mt-10 max-w-2xl space-y-6 text-lg md:text-xl leading-[1.75] text-foreground/75">
            <p>
              The school has, for many years, been a small gathering point for the history
              of this corner of north Kilkenny. Children, teachers, neighbours and grandparents
              have brought us objects, photographs, names, and stories — about Castlecomer,
              the Demesne, the GAA grounds, the coal mines, and the 1916 commemoration we ran
              in 2016. This page is where we keep what we've gathered.
            </p>
            <p>
              It is not a complete history. It is a working one — added to as we find more,
              corrected when we get something wrong, and kept here for anyone in the parish
              who wants a look.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* TIMELINE */}
    <section className="bg-cream">
      <div className="container py-20 lg:py-28">
        <div className="max-w-2xl mb-16">
          <p className="label-eyebrow mb-4">The chapters</p>
          <h2 className="font-heading text-3xl md:text-4xl font-medium leading-[1.1]">
            What's in the <span className="italic text-accent">archive</span>.
          </h2>
        </div>

        <div className="relative">
          {/* centre/left line */}
          <div className="absolute top-0 bottom-0 left-4 lg:left-1/2 w-px bg-foreground/15 -translate-x-px" aria-hidden="true" />

          <ol className="space-y-16 lg:space-y-24">
            {archiveList.map((a, i) => {
              const Icon = iconFor(a.slug);
              const isLeft = i % 2 === 0;
              return (
                <li key={a.slug} className="relative">
                  {/* node */}
                  <span
                    className="absolute top-6 left-4 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-cream"
                    aria-hidden="true"
                  />

                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 pl-12 lg:pl-0">
                    {/* text */}
                    <div
                      className={
                        isLeft
                          ? "lg:col-start-1 lg:row-start-1 lg:pr-12 lg:text-right"
                          : "lg:col-start-2 lg:row-start-1 lg:pl-12"
                      }
                    >
                      <span className="inline-block label-eyebrow text-accent mb-3">{a.date}</span>
                      <h3 className="font-heading italic text-3xl md:text-4xl text-foreground leading-tight">
                        {a.name}
                      </h3>
                      <p className="mt-4 text-foreground/75 leading-relaxed text-base md:text-lg">
                        {a.desc}
                      </p>
                      <Link
                        to={`/archive/${a.slug}`}
                        className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-colors ${
                          isLeft ? "lg:flex-row-reverse" : ""
                        }`}
                      >
                        Read the chapter <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* image placeholder */}
                    <div
                      className={
                        isLeft
                          ? "lg:col-start-2 lg:row-start-1 lg:pl-12"
                          : "lg:col-start-1 lg:row-start-1 lg:pr-12"
                      }
                    >
                      <div className="aspect-[5/4] rounded-2xl bg-cream-warm border border-foreground/10 flex items-center justify-center">
                        <Icon className="w-14 h-14 text-foreground/25" strokeWidth={1.25} aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>

    {/* PULL-QUOTE BAND */}
    <section className="bg-forest-deep grain-overlay">
      <div className="container py-24 lg:py-32">
        <blockquote className="max-w-4xl mx-auto text-center">
          <p className="font-heading italic text-background text-3xl md:text-5xl leading-[1.15] text-balance">
            "A village is not a village without a memory of itself.
            Schools are good places to keep one."
          </p>
          <footer className="mt-8 text-sm text-background/70">
            — from the introduction to the 2016 commemoration booklet
          </footer>
        </blockquote>
      </div>
    </section>

    {/* HOW IT'S KEPT */}
    <section className="bg-cream">
      <div className="container py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="label-eyebrow mb-4">Behind the scenes</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium leading-[1.1]">
              How the archive is <span className="italic text-accent">kept</span>.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-lg leading-[1.8] text-foreground/80">
            <p>
              Each year, a different class takes on a small piece of the archive as part
              of their history work — researching a topic, gathering photographs, and
              writing it up in their own words.
            </p>
            <p>
              Older relatives — grandparents and great-grandparents — sit with children
              to be interviewed. Their stories, taken down and gently edited, are some
              of the most valuable things we have.
            </p>
            <p>
              The archive is added to each year, corrected when we get something wrong,
              and kept here so that anyone in the parish can dip in and out of it.
              Corrections and additions are warmly welcome — please get in touch via
              the school office.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
            >
              Contribute to the archive <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Archive;
