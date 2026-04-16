import { useParams, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { activitiesList } from "./Activities";

const ActivityPage = () => {
  const { slug } = useParams();
  const a = activitiesList.find(x => x.slug === slug);
  if (!a) return <Navigate to="/activities" replace />;
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
      <section className="bg-cream">
        <div className="container py-16 max-w-3xl">
          <div className="prose prose-lg max-w-none prose-p:text-foreground/80 prose-headings:font-heading">
            <p className="lead">{a.desc}</p>
            <p>
              A fuller description of {a.name.toLowerCase()} at Holy Cross will be added here, along with a photo gallery from the school year. [school to add content]
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-cream-warm border border-foreground/10 flex items-center justify-center text-xs text-foreground/40 italic">
                Photo {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default ActivityPage;
