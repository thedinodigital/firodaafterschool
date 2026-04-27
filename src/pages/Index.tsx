import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Clock,
  Pencil,
  Music2,
  Users,
  Trophy,
  ChevronRight,
  Trees,
  Shield,
  GraduationCap,
  Building2,
  HandHeart,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SchoolhouseSVG, AfterSchoolSceneSVG } from "@/components/illustrations/SchoolhouseSVG";
import { newsItems, upcomingEvents, facilities, homeFaqs, lifeAtSchool, achievements } from "@/data/content";

const achievementIcon = (key: string) => {
  if (key === "active") return Zap;
  if (key === "amber") return Clock;
  return Pencil;
};

const lifeIcon = (key: string) => {
  if (key === "active") return Trophy;
  if (key === "music") return Music2;
  return Users;
};

const facilityIcon = (key: string) => {
  if (key === "field" || key === "hurl") return Trophy;
  if (key === "indoor") return Building2;
  if (key === "classroom") return GraduationCap;
  if (key === "yard") return HandHeart;
  if (key === "rural") return Trees;
  return Shield;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });
};

const eventBadge = (iso: string) => {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString("en-IE", { day: "2-digit" }),
    month: d.toLocaleDateString("en-IE", { month: "short" }),
  };
};

const NewsThumb = ({ kind }: { kind?: string }) => {
  // Brand-coloured illustrative thumbnails — no stock photos
  const palette = {
    books: { bg: "#ebe2d0", a: "#2d4a3a", b: "#c67b5c" },
    field: { bg: "#1e3428", a: "#d4a853", b: "#e8c4b0" },
    music: { bg: "#e8c4b0", a: "#1e3428", b: "#2d4a3a" },
    community: { bg: "#ebe2d0", a: "#1e3428", b: "#c67b5c" },
    art: { bg: "#f4efe4", a: "#c67b5c", b: "#2d4a3a" },
  } as const;
  const k = (kind || "books") as keyof typeof palette;
  const p = palette[k];
  return (
    <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block" aria-hidden="true">
      <rect width="400" height="240" fill={p.bg} />
      {k === "books" && (
        <>
          <rect x="80" y="120" width="40" height="80" fill={p.a} />
          <rect x="124" y="100" width="40" height="100" fill={p.b} />
          <rect x="168" y="115" width="40" height="85" fill={p.a} opacity="0.8" />
          <rect x="212" y="95" width="40" height="105" fill={p.b} opacity="0.85" />
          <rect x="60" y="200" width="280" height="6" fill={p.a} opacity="0.4" />
        </>
      )}
      {k === "field" && (
        <>
          <path d="M0 180 Q200 150 400 180 L400 240 L0 240 Z" fill={p.a} opacity="0.4" />
          <circle cx="200" cy="100" r="40" fill={p.a} opacity="0.9" />
          <path d="M170 100 L230 100 M200 70 L200 130" stroke={p.b} strokeWidth="3" />
        </>
      )}
      {k === "music" && (
        <>
          <circle cx="140" cy="160" r="22" fill={p.a} />
          <rect x="160" y="80" width="4" height="80" fill={p.a} />
          <circle cx="240" cy="170" r="20" fill={p.a} />
          <rect x="258" y="90" width="4" height="80" fill={p.a} />
          <path d="M164 80 Q220 60 262 90" stroke={p.a} strokeWidth="4" fill="none" />
        </>
      )}
      {k === "community" && (
        <>
          <circle cx="130" cy="130" r="28" fill={p.a} />
          <circle cx="200" cy="130" r="28" fill={p.b} />
          <circle cx="270" cy="130" r="28" fill={p.a} opacity="0.85" />
          <path d="M70 200 Q200 170 330 200" stroke={p.a} strokeWidth="6" fill="none" opacity="0.5" />
        </>
      )}
      {k === "art" && (
        <>
          <rect x="80" y="60" width="240" height="140" fill="#f4efe4" stroke={p.b} strokeWidth="3" />
          <circle cx="140" cy="120" r="20" fill={p.a} />
          <rect x="180" y="95" width="50" height="50" fill={p.b} />
          <path d="M250 150 L280 110 L300 150 Z" fill={p.a} opacity="0.8" />
        </>
      )}
    </svg>
  );
};

const Index = () => {
  const featured = newsItems.find((n) => n.feature) ?? newsItems[0];
  const others = newsItems.filter((n) => n.slug !== featured.slug).slice(0, 2);

  const schoolJsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    name: "Holy Cross National School",
    description:
      "A small rural Catholic primary school serving the community between Castlecomer and Ballinakill since 1962.",
    foundingDate: "1962",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Firoda",
      addressLocality: "Castlecomer",
      addressRegion: "Co. Kilkenny",
      postalCode: "R95 E22N",
      addressCountry: "IE",
    },
    telephone: "+353-56-444-1384",
    url: typeof window !== "undefined" ? window.location.origin : "",
  };

  return (
    <Layout>
      <Seo
        title="Holy Cross National School, Firoda | A small rural school with a big heart"
        description="Holy Cross National School, Firoda — a small Catholic primary school between Castlecomer and Ballinakill in Co. Kilkenny. Serving our community since 1962. Junior Infants 2026–27 enrolment open now."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd) }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-cream grain-overlay">
        <div className="container pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-7 animate-fade-in-up">
              <div className="inline-flex items-center gap-3 text-xs">
                <span className="relative inline-flex w-2 h-2 rounded-full bg-accent pulse-dot" aria-hidden="true" />
                <span className="label-eyebrow">Now enrolling · Junior Infants 2026–27</span>
              </div>

              <h1 className="font-heading text-[2.75rem] leading-[1.02] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium tracking-tight text-balance">
                A small rural school with a{" "}
                <span className="italic text-accent">big heart</span>, since 1962.
              </h1>

              <p className="text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed text-pretty">
                Holy Cross National School sits between Castlecomer and Ballinakill — a
                warm, inclusive primary school where every child is known, encouraged,
                and helped to find their feet.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild variant="forest" size="lg">
                  <Link to="/parents/admissions">
                    Enrol your child <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">
                    Visit the school <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative animate-fade-in-right" style={{ animationDelay: "0.15s" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-foreground/10">
                <SchoolhouseSVG className="w-full h-auto block" />
              </div>
              {/* Floating stat */}
              <div className="hidden md:block absolute -top-5 -left-5 bg-background border border-foreground/10 rounded-xl shadow-float px-5 py-4 max-w-[180px] animate-float">
                <p className="label-eyebrow mb-1">Pupils</p>
                <p className="font-heading text-2xl font-medium">~80 children</p>
                <p className="text-xs text-foreground/60 mt-1">Multi-grade, small classes</p>
              </div>
              {/* Floating location */}
              <div className="hidden md:block absolute -bottom-6 -right-4 bg-background border border-foreground/10 rounded-xl shadow-float px-5 py-4 max-w-[240px]">
                <p className="label-eyebrow mb-1">Where we are</p>
                <p className="font-heading text-base">
                  Firoda, <span className="italic">Co. Kilkenny</span>
                </p>
                <p className="text-xs text-foreground/60 mt-1">
                  Between Castlecomer and Ballinakill
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS BAR */}
      <section className="bg-forest-deep grain-overlay">
        <div className="container py-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-3">
              <p className="label-eyebrow-cream mb-2">Proudly awarded</p>
              <p className="font-heading text-background text-lg leading-snug">
                Recognised for what we <span className="italic text-accent-soft">do</span>.
              </p>
            </div>
            <div className="lg:col-span-9 grid sm:grid-cols-3 gap-6">
              {achievements.map((a) => {
                const Icon = achievementIcon(a.icon);
                const ring =
                  a.icon === "active" ? "bg-primary" : a.icon === "amber" ? "bg-gold" : "bg-accent";
                return (
                  <div key={a.name} className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-full ${ring} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-background" />
                    </div>
                    <div>
                      <p className="font-heading text-background font-medium">{a.name}</p>
                      <p className="text-xs text-background/70 leading-relaxed mt-1">{a.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPAL'S WELCOME */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
              <p className="label-eyebrow mb-4">A welcome from the Principal</p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                A warm hello from our{" "}
                <span className="italic text-accent">school family</span>.
              </h2>
              <div className="hairline-rule mt-10 mb-8" />
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-heading italic text-3xl font-medium text-accent">64yrs</p>
                  <p className="text-xs text-foreground/60 mt-2 leading-relaxed">
                    Serving the community since 1962
                  </p>
                </div>
                <div>
                  <p className="font-heading italic text-3xl font-medium text-accent">5</p>
                  <p className="text-xs text-foreground/60 mt-2 leading-relaxed">
                    Dedicated teaching staff
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                <p className="drop-cap">
                  Welcome to Holy Cross National School. Tucked into the countryside between
                  Castlecomer and Ballinakill, our small rural school has been part of life
                  in Firoda since 1962 — and the great joy of working here is that, in many
                  classes, we now teach the grandchildren of our first pupils.
                </p>
                <p>
                  Our ethos is straightforward: a relaxed, nurturing environment in which
                  every child is known, encouraged and supported. We're a Catholic primary
                  school, but children of all faiths and none are equally welcome. The
                  school day balances solid learning with sport, music, art and the
                  ordinary, important business of growing up alongside good friends.
                </p>
                <p>
                  If you're considering Holy Cross for your child, the very best thing to
                  do is come and see us. Phone the office on 056 444 1384 and we'll happily
                  arrange a time that suits — there is no substitute for walking through
                  the gate yourself.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-4 pt-6 border-t border-foreground/10">
                <div className="w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center font-heading italic">
                  P
                </div>
                <div>
                  <p className="font-heading text-base">[Principal's name]</p>
                  <p className="text-xs text-foreground/60">Principal, Holy Cross N.S.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARENTS QUICK LINKS */}
      <section className="bg-cream-warm">
        <div className="container py-20 lg:py-24">
          <div className="max-w-2xl mb-12">
            <p className="label-eyebrow mb-4">For parents</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
              For parents, <span className="italic text-accent">at a glance</span>.
            </h2>
            <p className="mt-5 text-lg text-foreground/70 max-w-xl">
              The things you come looking for, where you'd expect to find them.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { roman: "i.", title: "Enrol your child", desc: "Junior Infants 2026–27 applications are open now.", href: "/parents/admissions" },
              { roman: "ii.", title: "School calendar", desc: "Term dates, school holidays and the year ahead.", href: "/parents/calendar" },
              { roman: "iii.", title: "Newsletters", desc: "Monthly updates from the office, in PDF form.", href: "/parents/newsletters" },
              { roman: "iv.", title: "Uniform & booklists", desc: "What you'll need for each class, year by year.", href: "/parents/uniform" },
            ].map((card) => (
              <Link
                key={card.href}
                to={card.href}
                className="group block rounded-2xl border border-foreground/10 bg-background p-7 hover:bg-primary-deep transition-colors duration-300 min-h-[220px]"
              >
                <p className="font-heading italic text-base text-accent group-hover:text-accent-soft transition-colors">
                  {card.roman}
                </p>
                <h3 className="font-heading text-xl font-medium mt-3 group-hover:text-background transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-foreground/65 mt-2 leading-relaxed group-hover:text-background/75 transition-colors">
                  {card.desc}
                </p>
                <ArrowRight className="w-4 h-4 mt-6 text-foreground/40 group-hover:text-background group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label-eyebrow mb-4">Latest news</p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05]">
                Latest from the <span className="italic text-accent">yard</span>.
              </h2>
            </div>
            <Link to="/news" className="hidden sm:inline-flex items-center gap-1 text-sm font-heading italic text-foreground/70 hover:text-foreground">
              See all news <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Featured */}
            <Link to={`/news/${featured.slug}`} className="lg:col-span-2 group block rounded-2xl overflow-hidden bg-background border border-foreground/10 shadow-soft hover:shadow-card transition-all">
              <div className="aspect-[16/9] overflow-hidden">
                <NewsThumb kind={featured.illustration} />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 text-xs">
                  <span className="label-eyebrow">{featured.category}</span>
                  <span className="text-foreground/40">·</span>
                  <span className="text-foreground/60">{formatDate(featured.date)}</span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-medium mt-4 leading-tight group-hover:text-accent transition-colors text-balance">
                  {featured.title}
                </h3>
                <p className="text-foreground/70 mt-3 leading-relaxed">{featured.excerpt}</p>
              </div>
            </Link>

            <div className="grid gap-6 lg:gap-8">
              {others.map((n) => (
                <Link key={n.slug} to={`/news/${n.slug}`} className="group block rounded-2xl overflow-hidden bg-background border border-foreground/10 hover:shadow-card transition-all">
                  <div className="aspect-[16/9] overflow-hidden">
                    <NewsThumb kind={n.illustration} />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="label-eyebrow">{n.category}</span>
                      <span className="text-foreground/40">·</span>
                      <span className="text-foreground/60">{formatDate(n.date)}</span>
                    </div>
                    <h3 className="font-heading text-lg font-medium mt-3 leading-snug group-hover:text-accent transition-colors">
                      {n.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 sm:hidden">
            <Link to="/news" className="inline-flex items-center gap-1 text-sm font-heading italic text-foreground/70 hover:text-foreground">
              See all news <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* LIFE AT HOLY CROSS — DARK */}
      <section className="bg-forest-deep grain-overlay">
        <div className="container py-20 lg:py-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="label-eyebrow-cream mb-4">Life at Holy Cross</p>
            <h2 className="font-heading text-background text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
              More than <span className="italic text-accent-soft">lessons</span>.
            </h2>
            <p className="mt-5 text-background/75 text-lg leading-relaxed">
              The school day is full of small, ordinary things that add up to a happy childhood.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
            {lifeAtSchool.map((item) => {
              const Icon = lifeIcon(item.icon);
              return (
                <div key={item.title} className="text-center md:text-left">
                  <div className="w-14 h-14 rounded-full border border-background/30 flex items-center justify-center mx-auto md:mx-0 mb-5">
                    <Icon className="w-6 h-6 text-accent-soft" />
                  </div>
                  <h3 className="font-heading text-background text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-background/75 leading-relaxed">{item.body}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <Button asChild variant="outlineCream">
              <Link to="/activities">
                Explore all activities <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AFTER SCHOOL FEATURE — framed as a benefit of choosing Holy Cross */}
      <section className="bg-cream-warm">
        <div className="container py-20 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <p className="label-eyebrow mb-4">A benefit of choosing Holy Cross</p>

              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                <span className="italic text-accent">Stay a little longer.</span>{" "}
                Firoda After School is on-site too.
              </h2>

              <p className="mt-6 text-lg text-foreground/75 leading-relaxed max-w-xl">
                Working parents need flexibility. Families who choose Holy Cross also have
                access to Firoda After School — a friendly, well-run after-school programme
                operating right here in the school building, until 6pm.
              </p>

              <ul className="mt-8 space-y-3 text-sm">
                {[
                  "On-site at the school — no second pickup, no second drop-off",
                  "Open until 6pm on school days",
                  "Familiar building, familiar faces",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground/85">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <Button asChild variant="forest">
                  <Link to="/after-school">
                    Learn more about After School <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <p className="mt-8 text-xs text-foreground/55 leading-relaxed max-w-md">
                Firoda After School is run as a separate business — see the After School
                page for full details.
              </p>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-card">
                <AfterSchoolSceneSVG className="w-full h-auto block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="max-w-2xl mb-12">
            <p className="label-eyebrow mb-4">Our facilities</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
              Room to run, learn, and <span className="italic text-accent">grow</span>.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f) => {
              const Icon = facilityIcon(f.icon);
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-foreground/10 bg-cream-warm/50 p-7 hover:bg-cream-warm transition-colors"
                >
                  <div className="w-11 h-11 rounded-full bg-background border border-foreground/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-medium mb-2">{f.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-warm">
        <div className="container py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="label-eyebrow mb-4">Frequently asked</p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                The questions we get asked <span className="italic text-accent">most often</span>.
              </h2>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                Still have a question?{" "}
                <Link to="/contact" className="text-accent underline-offset-4 hover:underline">
                  Get in touch →
                </Link>
              </p>
            </div>

            <div className="lg:col-span-8">
              <Accordion type="single" collapsible defaultValue="item-0" className="space-y-2">
                {homeFaqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`item-${i}`} className="border border-foreground/10 rounded-xl bg-background px-5">
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

      {/* EVENTS */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="label-eyebrow mb-4">Upcoming events</p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
                The <span className="italic text-accent">diary</span>.
              </h2>
              <p className="mt-5 text-foreground/70 leading-relaxed max-w-sm">
                A few of the dates coming up at Holy Cross. The full school calendar is online
                and updated through the year.
              </p>
              <Button asChild variant="outline" className="mt-7">
                <Link to="/parents/calendar">
                  Full calendar <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="lg:col-span-8">
              <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
                {upcomingEvents.map((e) => {
                  const b = eventBadge(e.date);
                  return (
                    <li key={e.title} className="py-5 grid grid-cols-[64px_1fr_auto] gap-5 items-center">
                      <div className="text-center bg-cream-warm border border-foreground/10 rounded-lg py-2">
                        <p className="font-heading italic text-2xl font-medium leading-none text-accent">{b.day}</p>
                        <p className="text-[10px] uppercase tracking-widest text-foreground/60 mt-1">{b.month}</p>
                      </div>
                      <div>
                        <p className="font-heading text-lg font-medium leading-snug">{e.title}</p>
                        <p className="text-sm text-foreground/65 mt-1">{e.description}</p>
                      </div>
                      <span className="hidden sm:inline-flex text-[10px] uppercase tracking-widest text-foreground/55 border border-foreground/15 rounded-full px-3 py-1">
                        {e.category}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-cream-warm">
        <div className="container py-24 lg:py-32 text-center">
          <p className="label-eyebrow mb-5 divider-dot inline-block">Come and see us</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] max-w-3xl mx-auto text-balance">
            Thinking about Holy Cross for your{" "}
            <span className="italic text-accent">child</span>?
          </h2>
          <p className="mt-6 text-lg text-foreground/70 max-w-xl mx-auto leading-relaxed">
            The best way to get a feel for our school is to come for a visit. We'd love to
            show you the classrooms, the yard and the hurling pitches — and to answer any
            questions you have.
          </p>
          <div className="mt-9">
            <Button asChild variant="forest" size="lg">
              <Link to="/contact">
                Arrange a visit <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
