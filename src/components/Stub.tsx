import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";

export default function Stub({ title, description, breadcrumb }: { title: string; description: string; breadcrumb: { name: string; href: string }[] }) {
  return (
    <Layout>
      <Seo title={`${title} — Holy Cross N.S., Firoda`} description={description} />
      <PageHero
        eyebrow="Coming soon"
        title={<>{title}</>}
        description={description}
        breadcrumb={breadcrumb}
        variant="warm"
      />
      <section className="bg-cream">
        <div className="container py-16 max-w-2xl text-foreground/70">
          <p className="italic">This page is being prepared. Please check back shortly, or contact the school office on 056 444 1384.</p>
        </div>
      </section>
    </Layout>
  );
}
