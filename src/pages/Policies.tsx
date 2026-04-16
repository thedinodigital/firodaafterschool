import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { FileText, Download } from "lucide-react";

const groups = [
  { title: "Safeguarding", items: ["Child Safeguarding Statement", "Risk Assessment", "Code of Conduct"] },
  { title: "Curriculum", items: ["SPHE Policy", "RSE Policy", "Assessment Policy", "Homework Policy"] },
  { title: "Admissions", items: ["Admissions Policy", "Annual Admission Statement"] },
  { title: "Behaviour & Wellbeing", items: ["Bí Cineálta (Anti-Bullying) Policy", "Code of Behaviour", "Wellbeing Policy"] },
  { title: "Operational", items: ["Acceptable Use Policy", "Mobile Phone Policy", "Critical Incident Plan", "Healthy Eating Policy"] },
];

const Policies = () => (
  <Layout>
    <Seo title="School policies — Holy Cross N.S., Firoda" description="School policies of Holy Cross National School, Firoda — available to download." />
    <PageHero
      eyebrow="Our School"
      title={<>School <span className="italic text-accent">policies</span>.</>}
      description="All current school policies are listed below. Please contact the office if you would like a printed copy of any policy."
      breadcrumb={[{ name: "Policies", href: "/policies" }]}
      variant="warm"
    />
    <section className="bg-cream">
      <div className="container py-16 max-w-3xl space-y-12">
        {groups.map(g => (
          <div key={g.title}>
            <h2 className="font-heading text-2xl font-medium mb-5 italic">{g.title}</h2>
            <ul className="space-y-3">
              {g.items.map(i => (
                <li key={i}>
                  <a href="#" className="flex items-center gap-4 rounded-xl border border-foreground/10 bg-cream-warm/40 p-4 hover:bg-cream-warm transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-background border border-foreground/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{i}</p>
                      <p className="text-xs text-foreground/55 mt-0.5">PDF · last updated [school to confirm]</p>
                    </div>
                    <Download className="w-4 h-4 text-foreground/50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);
export default Policies;
