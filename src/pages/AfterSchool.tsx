import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Clock, Users, Heart } from "lucide-react";
import { AfterSchoolSceneSVG } from "@/components/illustrations/SchoolhouseSVG";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const AfterSchool = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Enquiry received", description: "We'll be in touch shortly." });
  };

  return (
    <Layout>
      <Seo title="Firoda After School — a warm, safe space after the school bell" description="Firoda After School: an independent, family-run after-school service operating on the grounds of Holy Cross N.S., Firoda. 2.30pm – 6pm." />

      {/* Distinct hero — accent-led */}
      <section className="bg-cream-warm grain-overlay">
        <div className="container pt-14 lg:pt-20 pb-14 lg:pb-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-foreground/10 text-[11px] font-semibold text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                An independent, family-run service based at Holy Cross N.S., Firoda
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.75rem] font-medium leading-[1.05] text-balance">
                Firoda <span className="italic text-accent">After School</span> — a warm, safe space for your child after the school bell.
              </h1>
              <p className="text-lg text-foreground/75 max-w-xl leading-relaxed">
                Run on the school grounds, with the same warmth and care families expect from Holy Cross — but as a separate after-school service, with its own team and its own routine.
              </p>
              <div className="flex gap-3">
                <Button asChild variant="forest"><a href="#enquire">Enquire about a place</a></Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-card">
                <AfterSchoolSceneSVG className="w-full h-auto block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="bg-cream">
        <div className="container py-12 grid sm:grid-cols-3 gap-6">
          {[
            { icon: Clock, title: "Hours", body: "2.30pm – 6.00pm, school days" },
            { icon: Users, title: "Age range", body: "Junior Infants – 6th Class" },
            { icon: Heart, title: "Pricing", body: "[to be confirmed]" },
          ].map(c => (
            <div key={c.title} className="rounded-2xl border border-foreground/10 bg-cream-warm/50 p-6">
              <c.icon className="w-5 h-5 text-primary mb-3" />
              <p className="font-heading text-lg font-medium">{c.title}</p>
              <p className="text-sm text-foreground/70 mt-1">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's offered */}
      <section className="bg-cream">
        <div className="container py-12 max-w-3xl">
          <h2 className="font-heading text-3xl font-medium mb-6">What's offered each day</h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-foreground/80">
            {[
              "Supervised care from 2.30pm",
              "Homework help",
              "Healthy snack provided",
              "Outdoor & indoor play",
              "Arts, crafts & quiet reading",
              "Pick-up flexible until 6pm",
            ].map(i => (
              <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />{i}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquire" className="bg-cream-warm">
        <div className="container py-16 max-w-2xl">
          <h2 className="font-heading text-3xl font-medium mb-2">Booking enquiry</h2>
          <p className="text-foreground/70 mb-8">Tell us a little about your child and we'll get back to you with availability.</p>
          {submitted ? (
            <div className="rounded-xl bg-background border border-foreground/10 p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-medium">Thanks — your enquiry has been received.</h3>
              <p className="text-foreground/70 mt-2">We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-background rounded-2xl border border-foreground/10 p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label htmlFor="parent">Parent name</Label><Input id="parent" required maxLength={100} className="mt-2" /></div>
                <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required maxLength={255} className="mt-2" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label htmlFor="child">Child's name</Label><Input id="child" required maxLength={100} className="mt-2" /></div>
                <div><Label htmlFor="age">Child's age</Label><Input id="age" required maxLength={20} className="mt-2" /></div>
              </div>
              <div><Label htmlFor="start">Preferred start date</Label><Input id="start" type="date" className="mt-2" /></div>
              <div>
                <Label>Days required</Label>
                <div className="flex flex-wrap gap-4 mt-3">
                  {days.map(d => (
                    <label key={d} className="flex items-center gap-2 text-sm"><Checkbox /> {d}</label>
                  ))}
                </div>
              </div>
              <div><Label htmlFor="notes">Notes (optional)</Label><Textarea id="notes" rows={4} maxLength={1000} className="mt-2" /></div>
              <Button type="submit" variant="forest">Send enquiry</Button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};
export default AfterSchool;
