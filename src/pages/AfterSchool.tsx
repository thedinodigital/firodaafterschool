import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  MapPin,
  Phone,
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
import {
  fetchPageContent,
  fetchGalleryImages,
  getPagePublicUrl,
  DEFAULT_PAGE_CONTENT,
} from "@/lib/fasPageContent";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// TODO[school]: replace with the real number
const PHONE_DISPLAY = "[phone number]";
const PHONE_TEL = "tel:[phone number]";

const safetyPoints = [
  { title: "Garda-vetted staff", body: "Every member of our team is Garda vetted." },
  { title: "Tusla registered", body: "A registered school-age service with Tusla (reg. [XXXX])." },
  {
    title: "First-aid trained",
    body: "Staff are first-aid trained, with [name] as our designated child-protection lead.",
  },
  { title: "Small groups", body: "A [X]:1 child-to-staff ratio, so every child is known by name." },
];

// TODO[school]: swap the placeholders below for real photographs
const photoSlots = [
  { label: "The after-school room", alt: "The Firoda After School room, set up for the afternoon" },
  { label: "The yard & outdoor space", alt: "Children playing in the yard at Holy Cross N.S., Firoda" },
  { label: "Snack & activity time", alt: "Children at snack and activity time in Firoda After School" },
];

const AfterSchool = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const contentQ = useQuery({ queryKey: ["fas_page_content"], queryFn: fetchPageContent });
  const galleryQ = useQuery({ queryKey: ["fas_gallery"], queryFn: fetchGalleryImages });
  const c = contentQ.data ?? DEFAULT_PAGE_CONTENT;
  const gallery = galleryQ.data ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Enquiry received",
      description: "Thanks — we'll be in touch within a few days.",
    });
  };

  const heroUrl = getPagePublicUrl(c.hero.image_path);

  return (
    <Layout>
      <Seo
        title="Firoda After School — on-site at Holy Cross N.S., Firoda"
        description="Firoda After School is a warm, well-run after-school programme operating on-site at Holy Cross N.S., Firoda. 2.30pm – 6pm, term time. Junior Infants to 6th Class."
      />

      {/* HERO */}
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
              {c.hero.eyebrow && <p className="label-eyebrow">{c.hero.eyebrow}</p>}

              <h1 className="font-heading text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.75rem] font-medium tracking-tight text-balance">
                {c.hero.headline_lead}
                {c.hero.headline_italic && (
                  <span className="italic text-accent">{c.hero.headline_italic}</span>
                )}
                {c.hero.headline_tail}
              </h1>

              {c.hero.intro && (
                <p className="text-lg md:text-xl text-foreground/75 max-w-xl leading-relaxed">
                  {c.hero.intro}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {c.hero.primary_cta_label && (
                  <Button asChild variant="forest" size="lg">
                    <a href="#enquire">
                      {c.hero.primary_cta_label} <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {c.hero.secondary_cta_label && (
                  <Button asChild variant="outline" size="lg">
                    <a href="#offer">
                      {c.hero.secondary_cta_label} <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg">
                  <a href={PHONE_TEL}>
                    <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
              <p className="text-sm text-foreground/60">
                Or ring us directly on{" "}
                <a href={PHONE_TEL} className="font-heading italic text-accent underline underline-offset-2">
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>

            <div className="lg:col-span-5 animate-fade-in-right" style={{ animationDelay: "0.15s" }}>
              <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-elevated bg-cream-warm">
                {heroUrl ? (
                  <img src={heroUrl} alt="Firoda After School" className="w-full h-auto block aspect-[4/3] object-cover" />
                ) : (
                  <AfterSchoolSceneSVG className="w-full h-auto block" />
                )}
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
              { label: "Contact", value: PHONE_DISPLAY, sub: "Tap to call", Icon: Phone, href: PHONE_TEL },
            ].map((card) => (
              <div key={card.label} className="flex items-start gap-4">
                <card.Icon className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-heading italic text-sm text-foreground/60">{card.label}</p>
                  <p className="font-heading text-lg font-medium leading-tight mt-0.5">
                    {card.href ? (
                      <a href={card.href} className="hover:text-accent underline-offset-2 hover:underline">
                        {card.value}
                      </a>
                    ) : (
                      card.value
                    )}
                  </p>
                  <p className="text-xs text-foreground/55 mt-1">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY & PEACE OF MIND */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-20">
          <div className="max-w-2xl mb-10">
            <p className="label-eyebrow mb-4">Safety &amp; peace of mind</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium leading-[1.1] text-balance">
              Cared for by people you can <span className="italic text-accent">trust</span>.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-foreground/10 bg-cream-warm/50 p-7 hover:bg-cream-warm transition-colors"
              >
                <h3 className="font-heading text-xl font-medium mb-2">{p.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* WHAT'S OFFERED */}
      <section id="offer" className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="max-w-2xl mb-12">
            {c.offer.eyebrow && <p className="label-eyebrow mb-4">{c.offer.eyebrow}</p>}
            <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
              {c.offer.heading_lead}
              {c.offer.heading_italic && <span className="italic text-accent">{c.offer.heading_italic}</span>}
              {c.offer.heading_tail}
            </h2>
            {c.offer.intro && (
              <p className="mt-5 text-lg text-foreground/70 leading-relaxed">{c.offer.intro}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.offer.items.map((o, i) => (
              <div
                key={i}
                className="rounded-2xl border border-foreground/10 bg-cream-warm/50 p-7 hover:bg-cream-warm transition-colors"
              >
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
              {c.timeline.eyebrow && <p className="label-eyebrow mb-4">{c.timeline.eyebrow}</p>}
              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                {c.timeline.heading_lead}
                {c.timeline.heading_italic && <span className="italic text-accent">{c.timeline.heading_italic}</span>}.
              </h2>
              {c.timeline.intro && (
                <p className="mt-6 text-foreground/70 leading-relaxed">{c.timeline.intro}</p>
              )}
            </div>

            <div className="lg:col-span-8">
              <ol className="relative border-l border-foreground/15 ml-3">
                {c.timeline.items.map((t, i) => (
                  <li key={i} className="pl-8 pb-8 relative last:pb-0">
                    <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-cream-warm" />
                    <p className="font-heading italic text-2xl font-medium text-accent leading-none">{t.time}</p>
                    <p className="mt-2 text-foreground/80 leading-relaxed">{t.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FAMILIES CHOOSE US */}
      <section className="bg-forest-deep grain-overlay">
        <div className="container py-20 lg:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            {c.why.eyebrow && <p className="label-eyebrow-cream mb-4">{c.why.eyebrow}</p>}
            <h2 className="font-heading text-background text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
              {c.why.heading_lead}
              {c.why.heading_italic && <span className="italic text-accent-soft">{c.why.heading_italic}</span>}
              {c.why.heading_tail}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {c.why.items.map((card, i) => (
              <div key={i} className="text-center md:text-left">
                <h3 className="font-heading text-background text-xl font-medium mb-3">{card.title}</h3>
                <p className="text-background/75 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section className="bg-cream-warm">
          <div className="container py-20 lg:py-24">
            <div className="max-w-2xl mb-12">
              {c.gallery.eyebrow && <p className="label-eyebrow mb-4">{c.gallery.eyebrow}</p>}
              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                {c.gallery.heading_lead}
                {c.gallery.heading_italic && <span className="italic text-accent">{c.gallery.heading_italic}</span>}.
              </h2>
              {c.gallery.intro && (
                <p className="mt-5 text-lg text-foreground/70 leading-relaxed">{c.gallery.intro}</p>
              )}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((img) => {
                const url = getPagePublicUrl(img.file_path);
                if (!url) return null;
                return (
                  <figure key={img.id} className="rounded-2xl overflow-hidden border border-foreground/10 bg-background">
                    <img src={url} alt={img.caption ?? ""} loading="lazy" className="w-full aspect-[4/3] object-cover" />
                    {img.caption && (
                      <figcaption className="px-4 py-3 text-sm text-foreground/70 italic">{img.caption}</figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PRACTICALITIES */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              {c.practicalities.eyebrow && <p className="label-eyebrow mb-4">{c.practicalities.eyebrow}</p>}
              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                <span className="italic text-accent">{c.practicalities.heading}</span>
              </h2>
              {c.practicalities.intro && (
                <p className="mt-6 text-foreground/70 leading-relaxed">{c.practicalities.intro}</p>
              )}
            </div>

            <div className="lg:col-span-8">
              <dl className="divide-y divide-foreground/10 border-y border-foreground/10">
                {c.practicalities.items.map((p, i) => (
                  <div key={i} className="py-5 grid sm:grid-cols-3 gap-4">
                    <dt className="font-heading italic text-foreground/60">{p.label}</dt>
                    <dd className="sm:col-span-2 text-foreground/85">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* WHO LOOKS AFTER YOUR CHILD */}
      <section className="bg-cream-warm border-t border-foreground/10">
        <div className="container py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              {/* TODO[school]: replace with a real photo of the team */}
              <div className="rounded-2xl overflow-hidden border border-foreground/10 bg-cream aspect-[4/3] flex items-center justify-center text-center p-6">
                <p className="font-heading italic text-sm text-foreground/50">
                  [Photo of the After School team]
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="label-eyebrow mb-4">Our team</p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                Who looks after <span className="italic text-accent">your child</span>.
              </h2>
              <p className="mt-5 text-lg text-foreground/75 leading-relaxed">
                Firoda After School is led by [Name], [qualification], part of the Holy Cross
                community since [year].
              </p>
              <div className="mt-6 space-y-3">
                {/* TODO[school]: add 1–2 more named staff here */}
                <p className="text-foreground/70">
                  <span className="font-heading font-medium text-foreground">[Staff name]</span> — [role / qualification].
                </p>
                <p className="text-foreground/70">
                  <span className="font-heading font-medium text-foreground">[Staff name]</span> — [role / qualification].
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO SLOTS */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="max-w-2xl mb-12">
            <p className="label-eyebrow mb-4">A look around</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
              Where the afternoon <span className="italic text-accent">happens</span>.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoSlots.map((slot) => (
              <figure
                key={slot.label}
                className="rounded-2xl overflow-hidden border border-foreground/10 bg-cream-warm/60"
              >
                {/* TODO[school]: swap this block for <img src="..." alt={slot.alt} loading="lazy" className="w-full aspect-[4/3] object-cover" /> */}
                <div className="aspect-[4/3] flex items-center justify-center">
                  <AfterSchoolSceneSVG className="w-full h-full object-cover opacity-80" />
                </div>
                <figcaption className="px-4 py-3 text-sm text-foreground/70 italic">
                  [Photo: {slot.label}] — alt text: “{slot.alt}”
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-cream border-y border-foreground/10">
        <div className="container py-16 lg:py-20">
          <blockquote className="max-w-3xl mx-auto text-center">
            <p className="font-heading text-2xl md:text-3xl font-medium leading-snug text-balance">
              “<span className="italic text-accent">[Parent or principal quote]</span>”
            </p>
            <footer className="mt-5 text-sm text-foreground/60">
              — [Name], [parent of / principal]
            </footer>
          </blockquote>
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
                    If it's urgent, do feel free to ring the school office and they'll pass a message on.
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
              {c.faqs.eyebrow && <p className="label-eyebrow mb-4">{c.faqs.eyebrow}</p>}
              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                {c.faqs.heading_lead}
                {c.faqs.heading_italic && <span className="italic text-accent">{c.faqs.heading_italic}</span>}.
              </h2>
              {c.faqs.intro && (
                <p className="mt-6 text-foreground/70 leading-relaxed">{c.faqs.intro}</p>
              )}
            </div>

            <div className="lg:col-span-8">
              <Accordion type="single" collapsible defaultValue="item-0" className="space-y-2">
                {c.faqs.items.map((f, i) => (
                  <AccordionItem
                    key={i}
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
          {c.closing.eyebrow && (
            <p className="label-eyebrow mb-5 divider-dot inline-block">{c.closing.eyebrow}</p>
          )}
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] max-w-3xl mx-auto text-balance">
            {c.closing.heading_lead}
            {c.closing.heading_italic && <span className="italic text-accent">{c.closing.heading_italic}</span>}
          </h2>
          {c.closing.intro && (
            <p className="mt-6 text-lg text-foreground/70 max-w-xl mx-auto leading-relaxed">{c.closing.intro}</p>
          )}
          {c.closing.cta_label && (
            <div className="mt-9">
              <Button asChild variant="forest" size="lg">
                <a href="#enquire">
                  {c.closing.cta_label} <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* PAGE FOOTER NOTE */}
      <section className="bg-cream">
        <div className="container py-10 text-center max-w-2xl">
          <p className="text-sm text-foreground/70">
            Prefer to talk it through?{" "}
            <a href={PHONE_TEL} className="font-heading italic text-accent underline underline-offset-2">
              {PHONE_DISPLAY}
            </a>
          </p>
          <p className="mt-4 text-xs text-foreground/55 leading-relaxed">
            Firoda After School is operated as a separate business at Holy Cross N.S.,
            Firoda. For school enquiries, please visit the{" "}
            <Link to="/" className="underline underline-offset-2 hover:text-accent">
              school home page
            </Link>
            .
          </p>
          <p className="mt-3 text-xs text-foreground/40">
            <Link to="/afterschool-admin/login" className="hover:text-accent underline-offset-2 hover:underline">
              Staff sign in
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AfterSchool;
