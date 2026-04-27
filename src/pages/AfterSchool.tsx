import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  MapPin,
  Phone,
  Coffee,
  BookOpen,
  Apple,
  Trees,
  Home,
  Palette,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AfterSchoolSceneSVG } from "@/components/illustrations/SchoolhouseSVG";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const offerings = [
  {
    icon: Users,
    title: "Supervised care from 2.30",
    desc: "Children come straight to us when the school bell rings — no gap, no rush.",
  },
  {
    icon: BookOpen,
    title: "Homework help",
    desc: "A quiet, focused space, with a hand to help when it's needed.",
  },
  {
    icon: Apple,
    title: "A healthy snack",
    desc: "A simple, wholesome snack provided each afternoon.",
  },
  {
    icon: Trees,
    title: "Outdoor play",
    desc: "Time in the school yard to run around and burn off the day.",
  },
  {
    icon: Home,
    title: "Wet-day activities",
    desc: "Indoor games, group play and quiet corners for the soggy days.",
  },
  {
    icon: Palette,
    title: "Arts, crafts & reading",
    desc: "Drawing, painting, building and the simple pleasure of a good book.",
  },
];

const timeline = [
  { time: "2.30", body: "School ends. Children come straight to After School." },
  { time: "2.45", body: "Settle in, snack, a bit of catch-up time." },
  { time: "3.15", body: "Homework support, for those who want it." },
  { time: "4.00", body: "Outdoor play in the yard, or indoor activities on wet days." },
  { time: "5.00", body: "Quiet time — reading, drawing, free play." },
  { time: "6.00", body: "Last collection." },
];

const practicalities = [
  { label: "Hours", value: "2.30pm – 6.00pm, term time only" },
  { label: "Days", value: "Monday to Friday — full or selected days" },
  { label: "Pricing", value: "[to be confirmed]" },
  { label: "Booking", value: "In advance, via the form below" },
  { label: "Payment", value: "[to be confirmed]" },
  { label: "First day", value: "A short orientation visit beforehand is welcome" },
];

const afterSchoolFaqs = [
  {
    q: "How do children get from school to After School?",
    a: "They walk straight in. We're in the same building — children come from their classroom to the After School room with our staff at 2.30 (or 1.50 for Junior and Senior Infants). No transfer, no second drop-off.",
  },
  {
    q: "What if my child has homework — will it get done?",
    a: "Yes. We set aside a quiet, focused window every afternoon for homework, with a member of staff on hand to help. Some parents prefer to do homework themselves at home, which is also fine — just let us know.",
  },
  {
    q: "Is a snack provided?",
    a: "Yes — a simple, healthy snack every afternoon. If your child has allergies or particular dietary needs, please flag them on the booking form and we'll work around them.",
  },
  {
    q: "Can I book just two or three days a week?",
    a: "Yes, absolutely. Many of our families book selected days only. Choose the days that suit you on the enquiry form.",
  },
  {
    q: "What happens during school holidays?",
    a: "Firoda After School operates during term time only. We do not run during the school holidays.",
  },
  {
    q: "What's the latest I can collect my child?",
    a: "Last collection is 6.00pm sharp. If you're running late, please give us a quick ring so we know.",
  },
  {
    q: "Is there a waiting list?",
    a: "Numbers are kept manageable so every child is known. If we're full when you enquire, we'll add you to a short waiting list and contact you the moment a place opens.",
  },
  {
    q: "How do I cancel or change days?",
    a: "Just give us as much notice as you can — by phone, text or email. We'll do our best to accommodate changes mid-term.",
  },
];

const AfterSchool = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Enquiry received",
      description: "Thanks — we'll be in touch within a few days.",
    });
  };

  return (
    <Layout>
      <Seo
        title="Firoda After School — on-site at Holy Cross N.S., Firoda"
        description="Firoda After School is a warm, well-run after-school programme operating on-site at Holy Cross N.S., Firoda. 2.30pm – 6pm, term time. Junior Infants to 6th Class."
      />

      {/* HERO — warmer, more domestic feel */}
      <section className="relative overflow-hidden bg-cream-warm grain-overlay">
        <div
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at top right, hsl(var(--gold-soft) / 0.55), transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="container relative pt-14 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
              <p className="label-eyebrow">At Holy Cross N.S., Firoda</p>

              <h1 className="font-heading text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.75rem] font-medium tracking-tight text-balance">
                <span className="italic text-accent">Firoda After School</span> — a warm
                welcome that lasts past 2.30.
              </h1>

              <p className="text-lg md:text-xl text-foreground/75 max-w-xl leading-relaxed">
                On-site at Holy Cross National School, our after-school programme gives
                children a calm, fun and well-supervised place to be while parents finish
                the working day.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild variant="forest" size="lg">
                  <a href="#enquire">
                    Enquire about a place <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#offer">
                    What we offer <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 animate-fade-in-right" style={{ animationDelay: "0.15s" }}>
              <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-elevated">
                <AfterSchoolSceneSVG className="w-full h-auto block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AT-A-GLANCE BAR */}
      <section className="bg-cream border-y border-foreground/10">
        <div className="container py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {[
              { label: "Hours", value: "2.30pm – 6pm", sub: "School days", Icon: Clock },
              { label: "Ages", value: "Junior Infants → 6th", sub: "All primary years", Icon: Users },
              { label: "Location", value: "On-site", sub: "At Holy Cross N.S.", Icon: MapPin },
              { label: "Contact", value: "Get in touch", sub: "via the form below", Icon: Phone },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <c.Icon className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-heading italic text-sm text-foreground/60">{c.label}</p>
                  <p className="font-heading text-lg font-medium leading-tight mt-0.5">{c.value}</p>
                  <p className="text-xs text-foreground/55 mt-1">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S OFFERED */}
      <section id="offer" className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="max-w-2xl mb-12">
            <p className="label-eyebrow mb-4">What we offer</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
              A <span className="italic text-accent">gentle</span> end to the school day.
            </h2>
            <p className="mt-5 text-lg text-foreground/70 leading-relaxed">
              The afternoon is a balance of supervision, play, food and a little quiet —
              shaped around what the children actually need after a full day of school.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((o) => (
              <div
                key={o.title}
                className="rounded-2xl border border-foreground/10 bg-cream-warm/50 p-7 hover:bg-cream-warm transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-background border border-foreground/10 flex items-center justify-center mb-5">
                  <o.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-medium mb-2">{o.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPICAL AFTERNOON */}
      <section className="bg-cream-warm">
        <div className="container py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="label-eyebrow mb-4">A typical afternoon</p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                What an afternoon{" "}
                <span className="italic text-accent">looks like</span>.
              </h2>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                Things shift gently from day to day — but here's the rhythm most
                afternoons follow.
              </p>
            </div>

            <div className="lg:col-span-8">
              <ol className="relative border-l border-foreground/15 ml-3">
                {timeline.map((t) => (
                  <li key={t.time} className="pl-8 pb-8 relative last:pb-0">
                    <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-cream-warm" />
                    <p className="font-heading italic text-2xl font-medium text-accent leading-none">
                      {t.time}
                    </p>
                    <p className="mt-2 text-foreground/80 leading-relaxed">{t.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FAMILIES CHOOSE US — DARK */}
      <section className="bg-forest-deep grain-overlay">
        <div className="container py-20 lg:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="label-eyebrow-cream mb-4">Why families choose us</p>
            <h2 className="font-heading text-background text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
              <span className="italic text-accent-soft">Familiar</span> faces,{" "}
              <span className="italic text-accent-soft">familiar</span> place.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {[
              {
                title: "Right here at the school",
                body:
                  "No second pickup, no rush across town. Children walk straight in to the same building they spent their day in.",
                Icon: MapPin,
              },
              {
                title: "A small, settled group",
                body:
                  "We keep numbers manageable so every child is known by name — not just supervised in a crowd.",
                Icon: Users,
              },
              {
                title: "Calm and unhurried",
                body:
                  "After a full school day, children need space to decompress — not another structured timetable. We keep it gentle.",
                Icon: Coffee,
              },
            ].map((c) => (
              <div key={c.title} className="text-center md:text-left">
                <div className="w-14 h-14 rounded-full border border-background/30 flex items-center justify-center mx-auto md:mx-0 mb-5">
                  <c.Icon className="w-6 h-6 text-accent-soft" />
                </div>
                <h3 className="font-heading text-background text-xl font-medium mb-3">
                  {c.title}
                </h3>
                <p className="text-background/75 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICALITIES */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="label-eyebrow mb-4">Practical details</p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                <span className="italic text-accent">The practical stuff.</span>
              </h2>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                The bits parents tend to want up-front. Anything missing? Drop us a line.
              </p>
            </div>

            <div className="lg:col-span-8">
              <dl className="divide-y divide-foreground/10 border-y border-foreground/10">
                {practicalities.map((p) => (
                  <div key={p.label} className="py-5 grid sm:grid-cols-3 gap-4">
                    <dt className="font-heading italic text-foreground/60">{p.label}</dt>
                    <dd className="sm:col-span-2 text-foreground/85">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section id="enquire" className="bg-cream-warm">
        <div className="container py-20 lg:py-24">
          <div className="max-w-2xl mx-auto">
            <p className="label-eyebrow mb-4 text-center">Get in touch</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance text-center">
              <span className="italic text-accent">Enquire</span> about a place.
            </h2>
            <p className="mt-5 text-lg text-foreground/70 leading-relaxed text-center max-w-xl mx-auto">
              Drop your details below and we'll get back to you with availability — usually within a few days.
            </p>

            <div className="mt-10">
              {submitted ? (
                <div className="rounded-2xl bg-background border border-foreground/10 p-10 text-center shadow-soft">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-medium">
                    Thanks — we'll be in touch within a few days.
                  </h3>
                  <p className="text-foreground/70 mt-3">
                    If it's urgent, do feel free to ring the school office and they'll
                    pass a message on.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 bg-background rounded-2xl border border-foreground/10 p-6 lg:p-8 shadow-soft"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="parent">Parent / guardian name</Label>
                      <Input id="parent" required maxLength={100} className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required maxLength={255} className="mt-2" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" required maxLength={30} className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="child">Child's name</Label>
                      <Input id="child" required maxLength={100} className="mt-2" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Child's age</Label>
                      <Select>
                        <SelectTrigger id="age" className="mt-2">
                          <SelectValue placeholder="Select age" />
                        </SelectTrigger>
                        <SelectContent>
                          {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((a) => (
                            <SelectItem key={a} value={String(a)}>{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="start">Preferred start date</Label>
                      <Input id="start" type="date" className="mt-2" />
                    </div>
                  </div>

                  <div>
                    <Label>Days required</Label>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {days.map((d) => (
                        <label
                          key={d}
                          className="flex items-center gap-2 text-sm border border-foreground/15 rounded-lg px-3 py-2 cursor-pointer hover:bg-cream-warm/60"
                        >
                          <Checkbox /> {d}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes / questions</Label>
                    <Textarea id="notes" rows={4} maxLength={1000} className="mt-2" placeholder="Allergies, collection arrangements, anything else we should know…" />
                  </div>

                  <Button type="submit" variant="forest" size="lg" className="w-full sm:w-auto">
                    Send enquiry <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="label-eyebrow mb-4">After School FAQ</p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                The questions{" "}
                <span className="italic text-accent">parents ask</span>.
              </h2>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                Still have a question?{" "}
                <a href="#enquire" className="text-accent underline-offset-4 hover:underline">
                  Drop us a line →
                </a>
              </p>
            </div>

            <div className="lg:col-span-8">
              <Accordion type="single" collapsible defaultValue="item-0" className="space-y-2">
                {afterSchoolFaqs.map((f, i) => (
                  <AccordionItem
                    key={f.q}
                    value={`item-${i}`}
                    className="border border-foreground/10 rounded-xl bg-cream-warm/40 px-5"
                  >
                    <AccordionTrigger className="font-heading text-left text-base md:text-lg font-medium hover:no-underline py-5">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/75 leading-relaxed pb-5">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-cream-warm">
        <div className="container py-24 lg:py-28 text-center">
          <p className="label-eyebrow mb-5 divider-dot inline-block">Have a look around</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] max-w-3xl mx-auto text-balance">
            Questions?{" "}
            <span className="italic text-accent">Come and have a look.</span>
          </h2>
          <p className="mt-6 text-lg text-foreground/70 max-w-xl mx-auto leading-relaxed">
            We're happy to show you around — get in touch and we'll arrange a visit.
          </p>
          <div className="mt-9">
            <Button asChild variant="forest" size="lg">
              <a href="#enquire">
                Enquire now <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* PAGE FOOTER NOTE — single, quiet disclosure */}
      <section className="bg-cream">
        <div className="container py-10 text-center max-w-2xl">
          <p className="text-xs text-foreground/55 leading-relaxed">
            Firoda After School is operated as a separate business at Holy Cross N.S.,
            Firoda. For school enquiries, please visit the{" "}
            <Link to="/" className="underline underline-offset-2 hover:text-accent">
              school home page
            </Link>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AfterSchool;
