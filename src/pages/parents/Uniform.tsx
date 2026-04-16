import { ContentPage } from "@/components/ContentPage";

const Uniform = () => (
  <ContentPage
    title="School uniform"
    metaDescription="School uniform information for Holy Cross National School, Firoda — what to wear, where to buy it."
    eyebrow="For parents"
    description="What to wear and where to buy it. Crested items only need to be bought from one supplier; the rest can be from any school-uniform shop."
    breadcrumb={[
      { name: "Parents", href: "/parents" },
      { name: "Uniform", href: "/parents/uniform" },
    ]}
    variant="warm"
  >
    <h2>Everyday uniform</h2>
    <ul>
      <li>Navy crested school jumper or cardigan</li>
      <li>Pale blue polo shirt</li>
      <li>Grey trousers, skirt, pinafore or shorts (in summer)</li>
      <li>Plain black or navy shoes</li>
      <li>Navy school coat (any plain navy coat is fine)</li>
    </ul>

    <h2>PE uniform</h2>
    <ul>
      <li>Navy school tracksuit (crested top)</li>
      <li>Pale blue polo shirt</li>
      <li>Runners suitable for outdoor PE</li>
    </ul>
    <p>
      Children wear the PE uniform on PE days only. Each class will be told their PE day at the start of term.
    </p>

    <h2>Where to buy crested items</h2>
    <p>
      Crested jumpers and tracksuit tops are available from <strong>Tony's Schoolwear, Kilkenny</strong> [school to confirm supplier]. Non-crested items can be bought from any school-uniform shop or supermarket.
    </p>

    <h2>Practical notes</h2>
    <ul>
      <li>Please label every item — it makes lost property much easier.</li>
      <li>Children should bring a coat in suitable weather; we go out in all but the heaviest rain.</li>
      <li>Long hair should be tied back.</li>
      <li>Stud earrings only, please. No necklaces or rings.</li>
    </ul>

    <h2>Help with the cost of school</h2>
    <p>
      The Back to School Clothing and Footwear Allowance is available to many families through the
      Department of Social Protection — please ask in the office if you would like a hand applying.
    </p>
  </ContentPage>
);

export default Uniform;
