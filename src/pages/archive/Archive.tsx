import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";

export const archiveList = [
  { slug: "1916", name: "1916 Commemoration", desc: "The school's project marking the centenary of the Easter Rising." },
  { slug: "museum", name: "Museum", desc: "A small school museum of objects gathered from the local community." },
  { slug: "castlecomer", name: "Castlecomer", desc: "Notes on the nearby town of Castlecomer and its long history." },
  { slug: "gaa-grounds", name: "GAA Grounds", desc: "The pitches beside the school and their place in parish life." },
  { slug: "demesne", name: "The Demesne", desc: "The Castlecomer Demesne — once an estate, now a much-loved local park." },
  { slug: "golf-course", name: "Golf Course", desc: "Castlecomer Golf Club, on the edge of the Demesne." },
  { slug: "coal-mining", name: "Coal Mining", desc: "Castlecomer's coal-mining past, and the lives shaped by it." },
  { slug: "bracelet", name: "The Bracelet", desc: "A local artefact, and the story behind it." },
];

const Archive = () => (
  <Layout>
    <Seo title="School archive — Local history project | Holy Cross N.S., Firoda" description="A local history archive maintained by Holy Cross N.S., Firoda — Castlecomer, the Demesne, the GAA grounds, coal mining and more." />
    <PageHero
      eyebrow="Local history"
      title={<>The school <span className="italic text-accent">archive</span>.</>}
      description="A small living history of Firoda, Castlecomer and the wider parish — researched and looked after by the school community."
      breadcrumb={[{ name: "Archive", href: "/archive" }]}
      variant="warm"
    />
    <section className="bg-cream">
      <div className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {archiveList.map(a => (
            <Link key={a.slug} to={`/archive/${a.slug}`} className="group block rounded-2xl border border-foreground/10 bg-cream-warm/50 p-7 hover:bg-cream-warm transition-colors">
              <p className="label-eyebrow mb-3">Chapter</p>
              <h2 className="font-heading text-xl font-medium italic">{a.name}</h2>
              <p className="text-foreground/70 mt-2 leading-relaxed text-sm">{a.desc}</p>
              <ArrowRight className="w-4 h-4 mt-4 text-foreground/50 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);
export default Archive;
