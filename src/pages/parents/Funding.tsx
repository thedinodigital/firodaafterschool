import { ContentPage } from "@/components/ContentPage";

const Funding = () => (
  <ContentPage
    title="NRRP funding"
    metaDescription="Information about NRRP (National Recovery and Resilience Plan) funding at Holy Cross National School, Firoda."
    eyebrow="For parents"
    description="The school receives funding under the National Recovery and Resilience Plan (NRRP). Here's a short note on what that means."
    breadcrumb={[
      { name: "Parents", href: "/parents" },
      { name: "Funding (NRRP)", href: "/parents/funding" },
    ]}
    variant="warm"
  >
    <p className="lead">
      Holy Cross N.S. is in receipt of funding under the National Recovery and
      Resilience Plan (NRRP), part of Ireland's response to the EU's NextGenerationEU
      programme.
    </p>

    <h2>What this funding supports</h2>
    <p>
      NRRP funding in primary schools supports investment in digital learning,
      teaching and curriculum delivery — for example through equipment,
      software and training that helps every child engage fully with their
      learning. [school to confirm exact use of funds at Holy Cross]
    </p>

    <h2>Transparency</h2>
    <p>
      As a school in receipt of NRRP funds, we are required to acknowledge the
      source of this funding to our school community. Detailed information on
      the National Recovery and Resilience Plan is available on{" "}
      <a href="https://www.gov.ie/" target="_blank" rel="noopener noreferrer">gov.ie</a>.
    </p>
  </ContentPage>
);

export default Funding;
