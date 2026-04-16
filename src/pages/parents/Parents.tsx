import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";

const sub = [
  { name: "Admissions", href: "/parents/admissions", desc: "Junior Infants 2026–27 applications and the school's admissions policy." },
  { name: "Calendar", href: "/parents/calendar", desc: "Term dates, school holidays and the year ahead." },
  { name: "Newsletters", href: "/parents/newsletters", desc: "The monthly newsletter from the office, in PDF form." },
  { name: "Uniform", href: "/parents/uniform", desc: "What you'll need and where to buy it." },
  { name: "Booklists", href: "/parents/booklists", desc: "Booklist per class year, downloadable each summer." },
  { name: "Bí Cineálta", href: "/parents/bi-cinealta", desc: "Our anti-bullying approach, following the 2024 Bí Cineálta framework." },
  { name: "Funding (NRRP)", href: "/parents/funding", desc: "Information about the National Reform and Resilience Plan funding." },
];

const Parents = () => (
  <Layout>
    <Seo
      title="Parents — Holy Cross N.S., Firoda"
      description="Information for parents of Holy Cross National School, Firoda — admissions, calendar, newsletters, uniform, booklists and policies."
    />
    <PageHero
      eyebrow="For parents"
      title={<>The <span className="italic text-accent">parents'</span> area.</>}
      description="Everything you should need in one place. If anything is missing or unclear, please get in touch with the office."
      breadcrumb={[{ name: "Parents", href: "/parents" }]}
    />
    <section className="bg-cream">
      <div className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sub.map((s) => (
            <Link key={s.href} to={s.href} className="group block rounded-2xl border border-foreground/10 bg-cream-warm/50 p-7 hover:bg-cream-warm transition-colors">
              <h2 className="font-heading text-xl font-medium">{s.name}</h2>
              <p className="text-foreground/70 mt-2 leading-relaxed text-sm">{s.desc}</p>
              <ArrowRight className="w-4 h-4 mt-4 text-foreground/50 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Parents;
