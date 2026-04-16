import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => (
  <Layout>
    <Seo title="Contact — Holy Cross N.S., Firoda" description="Contact Holy Cross National School, Firoda — phone, email, directions and contact form." />
    <PageHero
      eyebrow="Contact"
      title={<>Get in <span className="italic text-accent">touch</span>.</>}
      description="The office is happy to take your call between 9am and 2pm on school days. For anything else, please use the form below."
      breadcrumb={[{ name: "Contact", href: "/contact" }]}
    />
    <section className="bg-cream">
      <div className="container py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-foreground/10 bg-cream-warm/50 p-7 space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="label-eyebrow">Phone</p>
                  <a href="tel:0564441384" className="font-heading text-lg hover:text-accent">056 444 1384</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="label-eyebrow">Email</p>
                  <a href="mailto:office@holycrossfiroda.ie" className="font-heading text-lg hover:text-accent">office@holycrossfiroda.ie</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="label-eyebrow">Address</p>
                  <address className="not-italic font-heading text-base leading-relaxed">
                    Holy Cross National School<br />Firoda, Castlecomer<br />Co. Kilkenny, R95 E22N
                  </address>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="label-eyebrow">Office hours</p>
                  <p>Monday – Friday, 9am – 2pm (school days)</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-foreground/10">
              <iframe
                title="Holy Cross N.S., Firoda location"
                src="https://www.google.com/maps?q=Castlecomer,+Co.+Kilkenny,+Ireland&output=embed"
                className="w-full h-72 border-0"
                loading="lazy"
              />
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-cream-warm/50 p-6 text-sm text-foreground/75 space-y-3">
              <h3 className="font-heading text-lg font-medium text-foreground">Directions</h3>
              <p><strong className="text-foreground">From Castlecomer:</strong> Take the R694 south toward Ballinakill. The school is signposted on the right after approximately 4km.</p>
              <p><strong className="text-foreground">From Ballinakill:</strong> Take the R694 north toward Castlecomer. The school is signposted on the left.</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-heading text-3xl font-medium mb-2">Send a message</h2>
            <p className="text-foreground/70 mb-8">We aim to respond within 1–2 school days.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </Layout>
);
export default Contact;
