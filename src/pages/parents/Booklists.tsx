import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { FileText, Download } from "lucide-react";

const classes = [
  "Junior Infants",
  "Senior Infants",
  "1st Class",
  "2nd Class",
  "3rd Class",
  "4th Class",
  "5th Class",
  "6th Class",
];

const Booklists = () => (
  <Layout>
    <Seo title="Booklists — Holy Cross N.S., Firoda" description="Booklists for each class at Holy Cross National School, Firoda." />
    <PageHero
      eyebrow="For parents"
      title={<>Class <span className="italic text-accent">booklists</span>.</>}
      description="Booklists are issued in June each year for the September following. PDFs are uploaded here as soon as they're ready."
      breadcrumb={[
        { name: "Parents", href: "/parents" },
        { name: "Booklists", href: "/parents/booklists" },
      ]}
      variant="warm"
    />
    <section className="bg-cream">
      <div className="container py-16 max-w-3xl">
        <div className="grid sm:grid-cols-2 gap-4">
          {classes.map((c) => (
            <a key={c} href="#" className="flex items-center gap-4 rounded-xl border border-foreground/10 bg-cream-warm/40 p-5 hover:bg-cream-warm transition-colors">
              <div className="w-10 h-10 rounded-lg bg-background border border-foreground/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-base font-medium">{c}</p>
                <p className="text-xs text-foreground/55">2025–26 booklist · PDF</p>
              </div>
              <Download className="w-4 h-4 text-foreground/50" />
            </a>
          ))}
        </div>
        <p className="text-xs italic text-foreground/55 mt-10">
          Booklists are placeholders to be uploaded by the school office.
        </p>
      </div>
    </section>
  </Layout>
);

export default Booklists;
