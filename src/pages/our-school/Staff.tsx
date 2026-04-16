import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";

const staff = [
  { name: "[Principal's name]", role: "Principal & class teacher", initials: "P" },
  { name: "Ms. Brennan", role: "Senior Infants & 1st Class teacher", initials: "B" },
  { name: "Mr. O'Reilly", role: "3rd & 4th Class teacher", initials: "OR" },
  { name: "Ms. Walsh", role: "5th & 6th Class teacher", initials: "W" },
  { name: "Ms. Murphy", role: "Special Education Teacher", initials: "M" },
  { name: "Ms. Doyle", role: "Special Needs Assistant", initials: "D" },
  { name: "Mr. Phelan", role: "Caretaker", initials: "P" },
  { name: "Ms. Kavanagh", role: "Secretary", initials: "K" },
];

const Staff = () => (
  <Layout>
    <Seo title="Our staff — Holy Cross N.S., Firoda" description="Meet the teaching and support staff of Holy Cross National School, Firoda." />
    <PageHero
      eyebrow="Our School"
      title={<>Our <span className="italic text-accent">staff</span>.</>}
      description="A small, dedicated team. Photos and full bios will be added as the school year progresses."
      breadcrumb={[
        { name: "Our School", href: "/our-school" },
        { name: "Staff", href: "/our-school/staff" },
      ]}
      variant="warm"
    />
    <section className="bg-cream">
      <div className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((s) => (
            <div key={s.name} className="rounded-2xl border border-foreground/10 bg-cream-warm/50 p-6 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-primary text-background flex items-center justify-center font-heading italic text-xl">
                {s.initials}
              </div>
              <div>
                <p className="font-heading text-lg font-medium leading-tight">{s.name}</p>
                <p className="text-sm text-foreground/65 mt-1">{s.role}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-foreground/55 mt-10 italic">
          Names and roles shown above are placeholders to be confirmed by the school.
        </p>
      </div>
    </section>
  </Layout>
);

export default Staff;
