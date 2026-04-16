import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";

const term1 = [
  { d: "Wed 27 Aug 2025", t: "School reopens" },
  { d: "Mon 27 Oct – Fri 31 Oct 2025", t: "Mid-term break" },
  { d: "Fri 19 Dec 2025", t: "School closes for Christmas (12 noon)" },
];
const term2 = [
  { d: "Mon 5 Jan 2026", t: "School reopens" },
  { d: "Mon 16 – Fri 20 Feb 2026", t: "Mid-term break" },
  { d: "Tue 17 March 2026", t: "St. Patrick's Day" },
  { d: "Fri 27 Mar 2026", t: "School closes for Easter (12 noon)" },
];
const term3 = [
  { d: "Mon 13 Apr 2026", t: "School reopens" },
  { d: "Mon 4 May 2026", t: "May bank holiday" },
  { d: "Mon 1 – Fri 5 June 2026", t: "June bank holiday & school closure" },
  { d: "Wed 24 June 2026", t: "School closes for summer (12 noon)" },
];

const Term = ({ title, items }: { title: string; items: { d: string; t: string }[] }) => (
  <div>
    <h3 className="font-heading text-xl font-medium mb-4 italic">{title}</h3>
    <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
      {items.map((i) => (
        <li key={i.d} className="py-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <span className="text-sm text-foreground/60">{i.d}</span>
          <span className="font-medium">{i.t}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Calendar = () => (
  <Layout>
    <Seo title="School calendar — Holy Cross N.S., Firoda" description="Term dates, school holidays and key events for Holy Cross N.S., Firoda — 2025–26 school year." />
    <PageHero
      eyebrow="For parents"
      title={<>The school <span className="italic text-accent">calendar</span>.</>}
      description="Term dates and key closures for the 2025–26 school year. Times in brackets indicate finishing time on that day."
      breadcrumb={[
        { name: "Parents", href: "/parents" },
        { name: "Calendar", href: "/parents/calendar" },
      ]}
      variant="warm"
    />
    <section className="bg-cream">
      <div className="container py-16 max-w-4xl space-y-12">
        <Term title="Autumn term" items={term1} />
        <Term title="Spring term" items={term2} />
        <Term title="Summer term" items={term3} />
        <p className="text-xs italic text-foreground/55">
          Calendar is subject to confirmation each year by the Department of Education.
        </p>
      </div>
    </section>
  </Layout>
);

export default Calendar;
