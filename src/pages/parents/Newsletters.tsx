import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { FileText, Download } from "lucide-react";

const newsletters = [
  { date: "October 2025", title: "October newsletter — Halloween, Active Flag & a busy month" },
  { date: "September 2025", title: "September newsletter — A warm welcome back" },
  { date: "June 2025", title: "End-of-year newsletter — Summer 2025" },
  { date: "May 2025", title: "May newsletter — First Holy Communion & sports day" },
  { date: "April 2025", title: "April newsletter — Easter & spring activities" },
  { date: "March 2025", title: "March newsletter — Seachtain na Gaeilge & St. Patrick's Day" },
  { date: "February 2025", title: "February newsletter — Confirmation prep & half-term" },
  { date: "January 2025", title: "January newsletter — A fresh start to the new year" },
];

const Newsletters = () => (
  <Layout>
    <Seo title="Newsletters — Holy Cross N.S., Firoda" description="Monthly newsletters from Holy Cross National School, Firoda — most recent at the top." />
    <PageHero
      eyebrow="For parents"
      title={<>Monthly <span className="italic text-accent">newsletters</span>.</>}
      description="The newsletter goes out to families on the last Friday of each month. Click any entry below to download the PDF."
      breadcrumb={[
        { name: "Parents", href: "/parents" },
        { name: "Newsletters", href: "/parents/newsletters" },
      ]}
      variant="warm"
    />
    <section className="bg-cream">
      <div className="container py-16 max-w-3xl">
        <ul className="space-y-3">
          {newsletters.map((n) => (
            <li key={n.title}>
              <a href="#" className="flex items-start gap-4 rounded-xl border border-foreground/10 bg-cream-warm/40 p-5 hover:bg-cream-warm transition-colors">
                <div className="w-10 h-10 rounded-lg bg-background border border-foreground/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="label-eyebrow mb-1.5">{n.date}</p>
                  <p className="font-heading text-base font-medium leading-snug">{n.title}</p>
                </div>
                <Download className="w-4 h-4 text-foreground/50 mt-3" />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs italic text-foreground/55 mt-10">
          PDFs are placeholders to be replaced by the school office.
        </p>
      </div>
    </section>
  </Layout>
);

export default Newsletters;
