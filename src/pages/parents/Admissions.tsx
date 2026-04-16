import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Download, FileText } from "lucide-react";

const Admissions = () => (
  <Layout>
    <Seo
      title="Admissions — Junior Infants 2026–27 | Holy Cross N.S., Firoda"
      description="Junior Infants applications for the 2026–27 school year are open at Holy Cross National School, Firoda. Closing date: Friday, 30 January 2026."
    />
    <PageHero
      eyebrow="For parents"
      title={<>Enrol your <span className="italic text-accent">child</span>.</>}
      description="Applications for Junior Infants in September 2026 are open now. Closing date: Friday, 30 January 2026."
      breadcrumb={[
        { name: "Parents", href: "/parents" },
        { name: "Admissions", href: "/parents/admissions" },
      ]}
      variant="warm"
    />

    <section className="bg-cream">
      <div className="container py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium">How to apply</h2>
              <ol className="list-decimal list-inside space-y-2 text-foreground/80 leading-relaxed">
                <li>Download the application form below, or collect one from the school office.</li>
                <li>Return the completed form to the office by Friday, 30 January 2026.</li>
                <li>You'll receive written confirmation of receipt within ten school days.</li>
                <li>Offers will issue in February 2026, in line with our Admissions Policy.</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h2 className="font-heading text-3xl font-medium">Documents</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "Application Form 2026–27", href: "#", size: "PDF · 240 KB" },
                  { name: "Admissions Policy", href: "#", size: "PDF · 380 KB" },
                  { name: "Admission Notice 2026–27", href: "#", size: "PDF · 120 KB" },
                  { name: "Annual Admission Statement", href: "#", size: "PDF · 95 KB" },
                ].map((d) => (
                  <a key={d.name} href={d.href} className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-cream-warm/40 p-4 hover:bg-cream-warm transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-background border border-foreground/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{d.name}</p>
                      <p className="text-xs text-foreground/55 mt-0.5">{d.size}</p>
                    </div>
                    <Download className="w-4 h-4 text-foreground/50" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-medium">Visit before you decide</h2>
              <p className="text-foreground/80 leading-relaxed">
                The best way to make this decision is to come and see us. Phone the office
                on <a href="tel:0564441384" className="text-accent hover:underline">056 444 1384</a> and we'll arrange
                a time that suits.
              </p>
              <Button asChild variant="forest">
                <a href="tel:0564441384">Call the office</a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 rounded-2xl border border-foreground/10 bg-cream-warm/50 p-7">
              <h3 className="font-heading text-xl font-medium mb-2">Or get in touch online</h3>
              <p className="text-sm text-foreground/65 mb-6">
                If you'd rather not download a form, send us a quick note and we'll respond
                with everything you need.
              </p>
              <ContactForm defaultReason="enrolment" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Admissions;
