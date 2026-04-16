import { ContentPage } from "@/components/ContentPage";

const BiCinealta = () => (
  <ContentPage
    title="Bí Cineálta — our anti-bullying approach"
    metaDescription="The Bí Cineálta anti-bullying policy at Holy Cross National School, Firoda — following the Department of Education's 2024 framework."
    eyebrow="For parents"
    description="Holy Cross N.S. follows the Department of Education's 2024 Bí Cineálta framework — a positive, preventative approach to bullying behaviour in primary schools."
    breadcrumb={[
      { name: "Parents", href: "/parents" },
      { name: "Bí Cineálta", href: "/parents/bi-cinealta" },
    ]}
    variant="warm"
  >
    <p className="lead">
      Bí Cineálta — meaning "be kind" — is the Department of Education's national
      framework for preventing and addressing bullying behaviour in primary
      schools. Holy Cross N.S. has adopted Bí Cineálta as the basis of our
      anti-bullying policy from the 2024–25 school year.
    </p>

    <h2>What Bí Cineálta means at Holy Cross</h2>
    <p>
      We aim to create a school culture where kindness is the everyday norm,
      where pupils are confident to speak up if something is wrong, and where
      adults respond promptly and proportionately when they do.
    </p>

    <h2>Our approach is built on four things</h2>
    <ul>
      <li><strong>Prevention.</strong> Lessons in empathy, friendship and respectful behaviour are part of the SPHE programme from Junior Infants up.</li>
      <li><strong>Listening.</strong> Pupils know which adults to go to in school. Concerns raised are taken seriously, written down and acted on.</li>
      <li><strong>Working with parents.</strong> Where there is a concern about behaviour — by another child or by your own — we want to hear about it early.</li>
      <li><strong>Restoring relationships.</strong> Where bullying behaviour does occur, our response is firm, fair, and aimed at restoring relationships rather than escalating conflict.</li>
    </ul>

    <h2>If you are worried about your child</h2>
    <p>
      Please contact the class teacher in the first instance, or the Principal
      if you would prefer. The school office can arrange a meeting at a time
      that suits.
    </p>

    <h2>Read the policy</h2>
    <p>
      The full Bí Cineálta policy is available on our <a href="/policies">Policies</a> page,
      or from the school office on request.
    </p>
  </ContentPage>
);

export default BiCinealta;
