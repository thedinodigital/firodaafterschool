import { ContentPage } from "@/components/ContentPage";

const History = () => (
  <ContentPage
    title="A short history of the school"
    metaDescription="Holy Cross National School, Firoda — a short history of our small rural school since 1962."
    eyebrow="Our School"
    description="From a two-roomed school in 1962 to a small modern primary school today — a brief history of Holy Cross, Firoda."
    breadcrumb={[
      { name: "Our School", href: "/our-school" },
      { name: "History", href: "/our-school/history" },
    ]}
    variant="warm"
  >
    <p className="lead">
      Holy Cross National School opened its doors in Firoda in 1962, replacing
      the older school buildings that had served the community in earlier
      generations. Six decades later, in many of our classrooms we now teach
      the grandchildren of those first pupils.
    </p>

    <h2>The 1960s — a new school for a small parish</h2>
    <p>
      The school was built to serve the families of Firoda, Skehana and the
      surrounding townlands. Its location, between Castlecomer and Ballinakill,
      placed it at the heart of a community shaped by farming, mining and a
      proud GAA tradition. [school to confirm dates and names]
    </p>

    <h2>Decades of steady growth</h2>
    <p>
      The school grew through the 1970s and 1980s as families settled in the
      area. Extensions were added, classrooms were modernised, and the GAA
      pitches beside the school became — and remain — central to school life.
      Hurling in particular has been part of the Holy Cross story from the
      very beginning.
    </p>

    <h2>Today</h2>
    <p>
      Today, Holy Cross is a small multi-grade primary school of approximately
      80 pupils. We are a Catholic school under the patronage of the Diocese
      of Ossory, with a five-strong teaching team, a Special Education Teacher
      and dedicated support staff. We hold the Active School Flag, the Amber
      Flag for wellbeing, and Creative Schools status.
    </p>

    <p>
      The community has changed in many ways since 1962. The school's
      commitment to its pupils — to know them, support them, and send them
      out into the next stage of their lives prepared and confident — has not.
    </p>
  </ContentPage>
);

export default History;
