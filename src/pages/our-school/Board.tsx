import { ContentPage } from "@/components/ContentPage";

const Board = () => (
  <ContentPage
    title="Board of Management"
    metaDescription="The Board of Management of Holy Cross National School, Firoda."
    eyebrow="Our School"
    description="The current Board of Management and a short note on the role they play in the life of the school."
    breadcrumb={[
      { name: "Our School", href: "/our-school" },
      { name: "Board of Management", href: "/our-school/board" },
    ]}
    variant="warm"
  >
    <p className="lead">
      The Board of Management is the governing body of the school. Boards in
      Catholic primary schools are appointed for a four-year term and include
      patron nominees, parent representatives, teacher representatives and
      community representatives.
    </p>

    <h2>Current Board</h2>
    <ul>
      <li>[Chairperson — Patron's nominee]</li>
      <li>[Patron's nominee]</li>
      <li>The Principal</li>
      <li>[Teachers' representative]</li>
      <li>[Parents' representative — mother]</li>
      <li>[Parents' representative — father]</li>
      <li>[Community representative]</li>
      <li>[Community representative]</li>
    </ul>
    <p className="text-sm italic">
      Names to be confirmed by the school.
    </p>

    <h2>The role of the Board</h2>
    <p>
      The Board has responsibility for the management of the school under the
      Education Act 1998. Its duties include support for the Principal in the
      day-to-day running of the school, oversight of school policies, financial
      governance, and ensuring the school meets the requirements of the
      Department of Education and the patron.
    </p>

    <h2>Get in touch with the Board</h2>
    <p>
      Correspondence for the Board of Management can be sent through the
      school office, marked for the attention of the Chairperson. The office
      will pass it on promptly.
    </p>
  </ContentPage>
);

export default Board;
