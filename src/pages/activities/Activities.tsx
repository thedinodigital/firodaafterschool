import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/PageHero";

export const activitiesList = [
  { slug: "school-mural", name: "School Mural", desc: "A community-painted mural at the heart of the school grounds." },
  { slug: "school-garden", name: "School Garden", desc: "Raised beds, herbs and seasonal planting tended by every class." },
  { slug: "creative-school", name: "Creative School", desc: "Working with the Arts Council on a year-long programme of creativity." },
  { slug: "amber-flag", name: "Amber Flag", desc: "Our work on positive mental health and wellbeing across the school." },
  { slug: "active-flag", name: "Active Flag", desc: "Sport, movement and play built into every day." },
  { slug: "student-council", name: "Student Council", desc: "Pupils with a real voice in the running of the school." },
  { slug: "grandparents-day", name: "Grandparents' Day", desc: "Our annual community morning of tea, songs and shared memories." },
  { slug: "sport", name: "Sport", desc: "GAA, soccer, athletics — and a proud hurling tradition." },
  { slug: "music", name: "Music", desc: "Tin whistle, choir, the Christmas concert and class performances." },
  { slug: "special-occasions", name: "Special Occasions", desc: "Sacraments, school masses and the moments worth marking." },
  { slug: "art-work", name: "Our Art Work", desc: "A gallery of children's work from across the year." },
];

const Activities = () => (
  <Layout>
    <Seo title="Activities — Holy Cross N.S., Firoda" description="Sport, music, creativity and community activities at Holy Cross National School, Firoda." />
    <PageHero
      eyebrow="Activities"
      title={<>Beyond the <span className="italic text-accent">classroom</span>.</>}
      description="The fuller picture of school life at Holy Cross — sport, art, music, community and everything in between."
      breadcrumb={[{ name: "Activities", href: "/activities" }]}
    />
    <section className="bg-cream">
      <div className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activitiesList.map(a => (
            <Link key={a.slug} to={`/activities/${a.slug}`} className="group block rounded-2xl border border-foreground/10 bg-cream-warm/50 p-7 hover:bg-cream-warm transition-colors">
              <h2 className="font-heading text-xl font-medium">{a.name}</h2>
              <p className="text-foreground/70 mt-2 leading-relaxed text-sm">{a.desc}</p>
              <ArrowRight className="w-4 h-4 mt-4 text-foreground/50 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);
export default Activities;
