import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Zap, Clock, Pencil } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { JsonLd, SITE_URL } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { upcomingEvents, achievements, thisWeek } from "@/data/content";
import { fetchPublishedNews } from "@/lib/news";
import { archiveList } from "./archive/Archive";
import heroChildren from "@/assets/hero-children.jpg";
import schoolExterior from "@/assets/school-exterior.jpg";

const achievementIcon = (key: string) => {
  if (key === "active") return Zap;
  if (key === "amber") return Clock;
  return Pencil;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });

const Index = () => {
  const { data: recentNews = [], isLoading: newsLoading, isError: newsError } = useQuery({
    queryKey: ["news", "recent"],
    queryFn: () => fetchPublishedNews(5),
  });

  const schoolJsonLd = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "School"],
    name: "Holy Cross National School",
    alternateName: "Holy Cross N.S., Firoda",
    description:
      "A small rural Catholic primary school serving the community between Castlecomer and Ballinakill, Co. Kilkenny, since 1962.",
    foundingDate: "1962",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Firoda",
      addressLocality: "Castlecomer",
      addressRegion: "Co. Kilkenny",
      postalCode: "R95 E22N",
      addressCountry: "IE",
    },
    telephone: "+353-56-444-1384",
    email: "office@holycrossfiroda.ie",
    sameAs: ["https://twitter.com/SchoolFiroda"],
    areaServed: { "@type": "Place", name: "North Co. Kilkenny, Ireland" },
  };

  const eventsJsonLd = upcomingEvents.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.description,
    startDate: e.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Holy Cross National School",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Firoda",
        addressLocality: "Castlecomer",
        addressRegion: "Co. Kilkenny",
        postalCode: "R95 E22N",
        addressCountry: "IE",
      },
    },
    organizer: {
      "@type": "EducationalOrganization",
      name: "Holy Cross National School",
      url: SITE_URL,
    },
  }));

  const anchors = [
    {
      title: "Our ethos",
      body:
        "A relaxed, nurturing school where every child is known and supported. Children of all faiths and of none are equally welcome.",
      href: "/our-school/ethos",
    },
    {
      title: "A broad curriculum",
      body:
        "Reading, writing and maths sit alongside sport, music, art and the outdoors. Children leave Holy Cross with skills they can name, and confidence they can carry.",
      href: "/our-school",
    },
    {
      title: "Life outside the classroom",
      body:
        "GAA, athletics, tin whistle, choir, art, the school garden, the school mural. There is always something on, and every child finds something they belong to.",
      href: "/activities",
    },
  ];

  return (
    <Layout>
      <Seo
        title="Holy Cross National School, Firoda | A small rural school with a big heart"
        description="Holy Cross National School, Firoda — a small Catholic primary school between Castlecomer and Ballinakill in Co. Kilkenny. Serving our community since 1962. Junior Infants 2026–27 enrolment open now."
      />
      <JsonLd id="ld-school" data={schoolJsonLd} />
      <JsonLd id="ld-events" data={eventsJsonLd} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-cream grain-overlay">
        <div className="container pt-10 pb-14 lg:pt-16 lg:pb-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-7 animate-fade-in-up">
              <div className="inline-flex items-center gap-3 text-xs">
                <span className="relative inline-flex w-2 h-2 rounded-full bg-accent pulse-dot" aria-hidden="true" />
                <span className="label-eyebrow">Now enrolling · Junior Infants 2026–27</span>
              </div>

              <h1 className="font-heading text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl font-medium tracking-tight text-balance">
                Where every child is known{" "}
                <span className="italic text-accent">by name</span>.
              </h1>

              <p className="text-lg text-foreground/70 max-w-xl leading-relaxed text-pretty">
                Holy Cross National School, Firoda — a small primary school between Castlecomer and Ballinakill, in north Kilkenny. Since 1962.
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

            <div className="lg:col-span-6 animate-fade-in-right" style={{ animationDelay: "0.15s" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-foreground/10">
                <img
                  src={heroChildren}
                  alt="Children at Holy Cross National School, Firoda"
                  className="w-full h-auto block aspect-[4/3] object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-foreground/15 via-transparent to-transparent" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPAL'S WELCOME */}
      <section className="relative overflow-hidden bg-cream-warm">
        {/* crest watermark */}
        <img
          src="/firoda-crest.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] max-w-none opacity-[0.05] -z-0 motion-safe:animate-fade-in"
        />
        <div className="container py-20 lg:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="label-eyebrow mb-5">A welcome from the school</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium leading-[1.05] text-balance">
              Welcome to <span className="italic text-accent">Holy Cross.</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto mt-12 space-y-6 text-foreground/80 leading-[1.8] text-lg md:text-xl">
            <p>
              Holy Cross National School has been part of life in Firoda since 1962. We sit
              between Castlecomer and Ballinakill, a small rural school where every child is
              known by name, and where the community around us — parents, grandparents,
              neighbours — is woven into the school day.
            </p>
            <p>
              We aim to give children a calm, structured, kind place to grow. Sport, music,
              art and time outdoors are treated as essential, not as extras. Reading, writing
              and the everyday work of learning are taken seriously, but never at the cost of
              a child feeling safe and known.
            </p>
            <p>
              Please have a look around the website, and do call in or phone the office if
              you'd like to visit. We'd be glad to meet you.
            </p>
            <p className="italic text-foreground/65 pt-2">
              — The staff and Board of Management, Holy Cross N.S.
            </p>
          </div>
        </div>
      </section>

      {/* THIS WEEK AT FIRODA */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="label-eyebrow mb-4">This week</p>
              <h2 className="font-heading text-3xl md:text-4xl font-medium leading-[1.1] text-balance">
                What's on this week at <span className="italic text-accent">Firoda</span>.
              </h2>
              <p className="mt-5 text-foreground/70 leading-relaxed">
                A quick look at the week ahead — updated each Monday by the office.
              </p>
              <p className="mt-6 inline-flex items-center gap-2 text-xs text-foreground/55">
                <span className="w-2 h-2 rounded-full bg-primary-rich" aria-hidden="true" />
                Updated {thisWeek.lastUpdated}
              </p>
            </div>

            <div className="lg:col-span-8">
              <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
                {thisWeek.items.map((it) => (
                  <li key={it.day + it.title} className="py-5 flex items-start gap-6">
                    <div className="w-24 sm:w-28 flex-shrink-0">
                      <p className="font-heading text-xl text-foreground">{it.day}</p>
                      {it.date && (
                        <p className="label-eyebrow text-foreground/55 mt-1">{it.date}</p>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground leading-snug">{it.title}</p>
                      {it.note && (
                        <p className="text-sm text-foreground/65 leading-relaxed mt-1">
                          {it.note}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THREE EVERGREEN ANCHORS */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="max-w-2xl mb-12">
            <p className="label-eyebrow mb-4">What Holy Cross is about</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium leading-[1.1] text-balance">
              The everyday things that make our school <span className="italic text-accent">our school</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {anchors.map((a) => (
              <article
                key={a.href}
                className="rounded-2xl bg-cream-warm border border-foreground/10 p-8 flex flex-col"
              >
                <h3 className="font-heading text-2xl font-medium leading-snug">{a.title}</h3>
                <p className="mt-4 text-foreground/70 leading-relaxed flex-1">{a.body}</p>
                <Link
                  to={a.href}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-colors"
                >
                  Read more <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
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
                  a.icon === "active"
                    ? "bg-primary-rich"
                    : a.icon === "amber"
                    ? "bg-gold"
                    : "bg-primary-soft";
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

      {/* RECENT NEWS */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="max-w-2xl mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-medium leading-[1.1]">Recent news</h2>
            <p className="mt-3 text-foreground/65">From around the school this term.</p>
          </div>

          {newsLoading && (
            <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="py-6">
                  <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                    <div className="sm:col-span-3 h-4 rounded bg-cream-warm motion-safe:animate-pulse" />
                    <div className="sm:col-span-9 space-y-2">
                      <div className="h-5 w-3/4 rounded bg-cream-warm motion-safe:animate-pulse" />
                      <div className="h-4 w-full rounded bg-cream-warm motion-safe:animate-pulse" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {newsError && (
            <p className="text-foreground/65">News couldn't be loaded — please try again later.</p>
          )}
          {!newsLoading && !newsError && (
            <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
              {recentNews.map((n) => (
                <li key={n.slug} className="py-6">
                  <Link
                    to={`/news/${n.slug}`}
                    className="group grid sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                  >
                    <div className="sm:col-span-3 text-xs text-foreground/55 uppercase tracking-wider">
                      <time dateTime={n.date}>{formatDate(n.date)}</time>
                      <span className="mx-2">·</span>
                      <span>{n.category}</span>
                    </div>
                    <div className="sm:col-span-9">
                      <h3 className="font-heading text-xl font-medium leading-snug group-hover:text-accent transition-colors">
                        {n.title}
                      </h3>
                      <p className="mt-1 text-foreground/65 text-sm leading-relaxed">{n.excerpt}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            <Link
              to="/news"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-colors"
            >
              See all news <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AFTER SCHOOL CROSS-REFERENCE */}
      <section className="bg-cream-warm">
        <div className="container py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-soft">
                <img
                  src={schoolExterior}
                  alt="Holy Cross National School building, Firoda"
                  className="w-full h-auto block aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="label-eyebrow mb-4">On-site after care</p>
              <h2 className="font-heading text-3xl md:text-4xl font-medium leading-[1.1] text-balance">
                Firoda <span className="italic text-accent">After School</span>.
              </h2>
              <p className="mt-5 text-lg text-foreground/75 leading-relaxed max-w-xl">
                An independent on-site after-school service for Holy Cross families. Open
                every school day from 2.30 until 6.00, with homework help, a healthy snack,
                and time to play.
              </p>
              <Link
                to="/after-school"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                Find out more <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FROM THE ARCHIVE — featured */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="max-w-2xl mb-12">
            <p className="label-eyebrow mb-4">From the archive</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium leading-[1.1] text-balance">
              A long memory of this corner of <span className="italic text-accent">Kilkenny</span>.
            </h2>
            <p className="mt-5 text-foreground/70 leading-relaxed">
              Castlecomer's coal-mining past, the Bronze Age bracelet found in a field at
              Firoda, the GAA grounds, the 1916 commemoration — we keep them all. Have a
              look around.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["coal-mining", "bracelet", "gaa-grounds"].map((slug) => {
              const a = archiveList.find((x) => x.slug === slug)!;
              return (
                <Link
                  key={slug}
                  to={`/archive/${slug}`}
                  className="group flex flex-col rounded-2xl border border-foreground/10 bg-cream-warm overflow-hidden hover:shadow-soft transition-shadow"
                >
                  <div className="aspect-[5/4] bg-cream border-b border-foreground/10" aria-hidden="true" />
                  <div className="p-6 flex flex-col flex-1">
                    <span className="label-eyebrow text-accent mb-2">{a.date}</span>
                    <h3 className="font-heading italic text-2xl text-foreground leading-tight">
                      {a.name}
                    </h3>
                    <p className="mt-3 text-foreground/70 text-sm leading-relaxed flex-1">
                      {a.desc}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                      Read <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10">
            <Link
              to="/archive"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-colors"
            >
              Explore the whole archive <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRACTICAL SCHOOL INFO */}
      <section className="bg-cream">
        <div className="container py-20 lg:py-24">
          <div className="max-w-2xl mb-12">
            <p className="label-eyebrow mb-4">At a glance</p>
            <h2 className="font-heading text-3xl md:text-4xl font-medium leading-[1.1]">
              School information.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-4xl">
            <dl className="space-y-4">
              {[
                ["School name", "Holy Cross National School"],
                ["Address", "Firoda, Castlecomer, Co. Kilkenny"],
                /* TODO: confirm Roll Number with school */
                ["Roll Number", "[placeholder — to be confirmed]"],
                /* TODO: confirm Principal's name with school */
                ["Principal", "[placeholder — to be confirmed]"],
                ["Phone", "056 444 1384"],
                ["Email", "office@holycrossfiroda.ie"],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-3 gap-4 border-b border-foreground/10 pb-3">
                  <dt className="text-sm font-semibold text-primary">{label}</dt>
                  <dd className="col-span-2 text-foreground/80">{value}</dd>
                </div>
              ))}
            </dl>
            <dl className="space-y-4">
              {[
                ["Patron", "Diocese of Ossory"],
                ["Established", "1962"],
                ["School day", "9.00 – 2.30 (1.30 for Junior & Senior Infants)"],
                ["Twitter", "@SchoolFiroda"],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-3 gap-4 border-b border-foreground/10 pb-3">
                  <dt className="text-sm font-semibold text-primary">{label}</dt>
                  <dd className="col-span-2 text-foreground/80">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FINAL CTA STRIP */}
      <section className="relative overflow-hidden bg-forest-deep">
        <img
          src="/firoda-crest.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[320px] max-w-none opacity-[0.08]"
        />
        <div className="container py-12 lg:py-14 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="font-heading text-background text-2xl md:text-3xl font-medium leading-snug max-w-2xl text-balance">
              Considering Holy Cross for your child?{" "}
              <span className="italic text-accent-soft">Come and visit.</span>
            </p>
            <Button asChild variant="accent" size="lg">
              <Link to="/contact">
                Arrange a visit <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
