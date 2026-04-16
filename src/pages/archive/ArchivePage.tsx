import { useParams, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { archiveList } from "./Archive";
import { ArrowLeft } from "lucide-react";

const ArchivePage = () => {
  const { slug } = useParams();
  const a = archiveList.find(x => x.slug === slug);
  if (!a) return <Navigate to="/archive" replace />;
  return (
    <Layout>
      <Seo title={`${a.name} — School archive | Holy Cross N.S., Firoda`} description={a.desc} />
      <PageHero
        eyebrow="School archive"
        title={<><span className="italic text-accent">{a.name}</span></>}
        description={a.desc}
        breadcrumb={[{ name: "Archive", href: "/archive" }, { name: a.name, href: `/archive/${a.slug}` }]}
        variant="warm"
      />
      <section className="bg-cream">
        <div className="container py-16 max-w-2xl">
          <div className="prose prose-lg max-w-none prose-p:text-foreground/80 prose-headings:font-heading">
            <p className="lead drop-cap">
              {a.desc} The full chapter on {a.name.toLowerCase()} will be added here, drawn from the school's local-history project. [school to add full content]
            </p>
            <p>
              Each chapter of the archive includes a short introduction, the historical
              account itself, and a gallery of photographs and documents gathered from
              local families.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-cream-warm border border-foreground/10 flex items-center justify-center text-xs italic text-foreground/40">Photo {i + 1}</div>
            ))}
          </div>
          <Link to="/archive" className="inline-flex items-center gap-2 mt-12 text-sm text-foreground/60 hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to archive
          </Link>
        </div>
      </section>
    </Layout>
  );
};
export default ArchivePage;
