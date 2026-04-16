import { ContentPage } from "@/components/ContentPage";

const Ethos = () => (
  <ContentPage
    title="Our ethos"
    metaDescription="The ethos of Holy Cross N.S., Firoda — a Catholic primary school where children of all faiths and none are equally welcome."
    eyebrow="Our School"
    description="A relaxed, nurturing school where every child is known and supported."
    breadcrumb={[
      { name: "Our School", href: "/our-school" },
      { name: "Ethos", href: "/our-school/ethos" },
    ]}
    variant="warm"
  >
    <p className="lead">
      Holy Cross N.S. is a Catholic primary school under the patronage of the
      Diocese of Ossory. Our ethos is rooted in the values of the Gospel, but
      lived out in a quiet, practical, everyday way.
    </p>

    <h2>What we believe</h2>
    <p>
      We believe that children learn best when they feel safe, known and
      respected. That belief shapes everything we do — from the way the day
      starts in the yard, to how we speak to one another in the corridor, to
      how we sit beside a child who is finding something hard.
    </p>

    <h2>An inclusive welcome</h2>
    <p>
      Children of all faiths and of none are equally welcome at Holy Cross.
      Religious instruction takes place as part of the school day, and parents
      who wish their child to opt out of that time are warmly accommodated.
    </p>

    <h2>How this looks on a normal Tuesday</h2>
    <ul>
      <li>Small classes where every child is known by name.</li>
      <li>Older pupils helping younger pupils as part of school life.</li>
      <li>A calm classroom atmosphere, with structure and gentle expectations.</li>
      <li>Outdoor play in all reasonable weathers.</li>
      <li>Sport, music and art treated as essential, not extras.</li>
    </ul>

    <h2>Care for one another</h2>
    <p>
      Our anti-bullying policy follows the Department of Education's{" "}
      <a href="/parents/bi-cinealta">Bí Cineálta</a> framework. We take small
      issues seriously so they do not become big ones, and we work with parents
      as partners in that.
    </p>
  </ContentPage>
);

export default Ethos;
