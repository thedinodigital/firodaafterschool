import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";

const sub = [
  { name: "Ethos", href: "/our-school/ethos", desc: "What we believe and how that shapes the school day." },
  { name: "History", href: "/our-school/history", desc: "From a small two-roomed school in 1962 to today." },
  { name: "Staff", href: "/our-school/staff", desc: "Meet the teachers and support staff of Holy Cross." },
  { name: "Board of Management", href: "/our-school/board", desc: "Our current board and the work they do." },
];

const OurSchool = () => (
  <Layout>
    <Seo
      title="Our School — Holy Cross N.S., Firoda"
      description="Learn about Holy Cross National School, Firoda — our ethos, history, teaching staff and Board of Management."
    />
    <PageHero
      eyebrow="Our School"
      title={<>About <span className="italic text-accent">Holy Cross</span>.</>}
      description="A small Catholic primary school under the patronage of the Diocese of Ossory, serving Firoda and the surrounding parishes since 1962."
      breadcrumb={[{ name: "Our School", href: "/our-school" }]}
    />
    <section className="bg-cream">
      <div className="container py-16">
        <div className="grid sm:grid-cols-2 gap-5">
          {sub.map((s) => (
            <Link key={s.href} to={s.href} className="group block rounded-2xl border border-foreground/10 bg-cream-warm/50 p-7 hover:bg-cream-warm transition-colors">
              <h2 className="font-heading text-2xl font-medium">{s.name}</h2>
              <p className="text-foreground/70 mt-2 leading-relaxed">{s.desc}</p>
              <ArrowRight className="w-4 h-4 mt-4 text-foreground/50 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default OurSchool;
