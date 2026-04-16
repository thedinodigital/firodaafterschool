// Static placeholder data — clearly representative of a small Irish primary school.
// Schools should replace this with real content via the future admin.

export type NewsCategory = "School Events" | "Sport" | "Creative School" | "Community" | "Sacrament";

export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: NewsCategory;
  date: string; // ISO
  feature?: boolean;
  illustration?: "books" | "field" | "music" | "community" | "art";
}

export const newsItems: NewsItem[] = [
  {
    slug: "junior-infants-2026-applications-open",
    title: "Junior Infants 2026–27 — applications now open",
    excerpt:
      "Application forms for next September's Junior Infants intake are available from the school office and on the Admissions page.",
    body:
      "We're delighted to welcome enquiries from families considering Holy Cross for their child. The closing date for applications is Friday, 30 January 2026. Visits to the school can be arranged by phoning the office on 056 444 1384.",
    category: "School Events",
    date: "2025-10-28",
    feature: true,
    illustration: "books",
  },
  {
    slug: "active-flag-renewed",
    title: "Active Flag renewed for another year",
    excerpt:
      "Following a busy year of GAA, athletics and yoga, our Active Flag has been formally renewed by the Active School Flag committee.",
    body:
      "The school community is very proud of the Active Flag. A particular thanks to the parents who supported our walk-to-school week and to Ms. Brennan for organising the inter-school athletics blitz in May.",
    category: "Sport",
    date: "2025-10-12",
    illustration: "field",
  },
  {
    slug: "harvest-art-exhibition",
    title: "Harvest art exhibition fills the corridor",
    excerpt:
      "Children from every class contributed to a beautiful harvest-themed display now on view in the main corridor.",
    body:
      "From 5th and 6th class's autumn landscapes to the Junior Infants' painted apples, the harvest exhibition is a real highlight. Parents are welcome to drop in and see the work at collection time.",
    category: "Creative School",
    date: "2025-10-04",
    illustration: "art",
  },
  {
    slug: "grandparents-day-2025",
    title: "A morning of memories on Grandparents' Day",
    excerpt:
      "Tea, scones, songs and a packed school hall — Grandparents' Day was, as always, a community highlight.",
    body:
      "We were so pleased to welcome over a hundred grandparents and special friends to the school for our annual Grandparents' Day. Thank you to all the families who baked, helped to set up and made the morning so special.",
    category: "Community",
    date: "2025-09-28",
    illustration: "community",
  },
  {
    slug: "first-confession-and-communion-dates",
    title: "First Confession and First Holy Communion dates announced",
    excerpt:
      "The 2nd-class sacramental dates for the year ahead have now been confirmed with the parish.",
    body:
      "First Confession will take place on Tuesday, 24 February 2026 at 7pm. First Holy Communion is scheduled for Saturday, 16 May 2026 at 11am in Holy Cross Church. More information will be sent home with the children in the coming weeks.",
    category: "Sacrament",
    date: "2025-09-18",
    illustration: "community",
  },
  {
    slug: "music-classes-tin-whistle",
    title: "Tin whistle classes return for 3rd & 4th class",
    excerpt:
      "Our weekly tin whistle programme is back, with a small concert planned for parents at Christmas.",
    body:
      "Mr. O'Reilly will once again lead the tin whistle programme on Thursday afternoons. Children are asked to bring their whistle to school each Thursday in their schoolbag.",
    category: "Creative School",
    date: "2025-09-10",
    illustration: "music",
  },
  {
    slug: "school-reopens-september",
    title: "School reopens — a warm welcome back",
    excerpt:
      "The school reopened on Wednesday, 27 August. Thank you to everyone for the smooth start to the year.",
    body:
      "It was lovely to see all the children back in the yard last week. A particularly warm welcome to our 14 new Junior Infants and to two new families who have joined us this term.",
    category: "School Events",
    date: "2025-08-29",
    illustration: "books",
  },
];

export interface EventItem {
  date: string; // ISO
  title: string;
  description: string;
  category: string;
}

export const upcomingEvents: EventItem[] = [
  {
    date: "2025-12-19",
    title: "Christmas concert & nativity",
    description: "Junior end of school day | All families welcome",
    category: "Celebration",
  },
  {
    date: "2026-01-30",
    title: "Junior Infants applications close",
    description: "Forms to be returned to the office",
    category: "Enrolment",
  },
  {
    date: "2026-02-24",
    title: "First Confession",
    description: "7pm, Holy Cross Church | 2nd Class",
    category: "Sacrament",
  },
  {
    date: "2026-03-12",
    title: "Active Flag walk-to-school week begins",
    description: "Daily walking buses from Castlecomer & Ballinakill",
    category: "Active Flag",
  },
];

export const facilities = [
  {
    title: "GAA grounds",
    description:
      "Adjoining grass pitches used daily for PE, training and matches — at the heart of our long hurling tradition.",
    icon: "field",
  },
  {
    title: "Hurling pitches",
    description:
      "Outdoor playing surfaces for skills practice, training and inter-school games throughout the year.",
    icon: "hurl",
  },
  {
    title: "Indoor sports facilities",
    description:
      "An indoor space for PE, wet-day training, after-school activities and community events.",
    icon: "indoor",
  },
  {
    title: "Classrooms & learning spaces",
    description:
      "Bright, modern classrooms set up for primary teaching, with quiet corners for small-group work.",
    icon: "classroom",
  },
  {
    title: "School yard & play areas",
    description:
      "A large, well-supervised yard with room to run, climb and just be a child for a while.",
    icon: "yard",
  },
  {
    title: "A rural setting",
    description:
      "Surrounded by countryside between Castlecomer and Ballinakill — a safe, calm environment for learning.",
    icon: "rural",
  },
];

export const homeFaqs = [
  {
    q: "What are the school hours?",
    a: "The school day runs from 9.10am to 2.50pm for all classes, with Junior and Senior Infants finishing at 1.50pm. Doors open from 9.00am.",
  },
  {
    q: "When do I need to apply for Junior Infants?",
    a: "Applications for the 2026–27 school year are open now and close on Friday, 30 January 2026. We're happy to arrange a visit to the school first — just call the office.",
  },
  {
    q: "Is there a uniform, and where do I buy it?",
    a: "Yes — a navy school jumper with the Holy Cross crest, grey trousers/skirt and a pale blue polo shirt. Crested items are available from Tony's Schoolwear in Kilkenny. Full details are on our Uniform page.",
  },
  {
    q: "How big are the classes?",
    a: "We are a small rural school of approximately 80 pupils, organised across multi-grade classrooms. Class sizes are small, which means every child is genuinely known by their teacher. [school to confirm exact numbers]",
  },
  {
    q: "What after-school options are available?",
    a: "Firoda After School operates an independent, family-run after-school service on the school grounds, from 2.30pm to 6pm. See the After School page for details.",
  },
  {
    q: "How do we get to the school — is there a bus route?",
    a: "Most families travel by car. The school is signposted from the R694 between Castlecomer and Ballinakill. There is currently no Bus Éireann school transport route to Firoda. [school to confirm]",
  },
  {
    q: "What's the school's approach to special educational needs?",
    a: "We have a dedicated Special Education Teacher who works in close partnership with class teachers and parents. Support is tailored to each child and provided in a calm, inclusive way as part of the school day.",
  },
  {
    q: "Can I visit before I decide?",
    a: "Absolutely — we'd love to show you around. Please ring the office on 056 444 1384 to arrange a time that suits you.",
  },
  {
    q: "What religious ethos does the school follow?",
    a: "Holy Cross is a Catholic primary school under the patronage of the Diocese of Ossory. Children of all faiths and none are equally welcome and supported.",
  },
];

export const lifeAtSchool = [
  {
    icon: "active",
    title: "Sport & Active Flag",
    body: "GAA, soccer, athletics and yoga, with hurling at the heart of the school. Our Active Flag is renewed every year through the work of pupils, staff and parents together.",
  },
  {
    icon: "music",
    title: "Music & performance",
    body: "Tin whistle from 3rd class, our school choir, class concerts and the much-loved Christmas nativity — every child takes part each year.",
  },
  {
    icon: "community",
    title: "Community days",
    body: "Grandparents' Day, the Student Council, sacramental celebrations and visits to the local community make the school feel like part of the village it is.",
  },
];

export const achievements = [
  {
    name: "Active School Flag",
    note: "For sport, movement and play across the school day.",
    icon: "active",
  },
  {
    name: "Amber Flag",
    note: "For our work on positive mental health and wellbeing.",
    icon: "amber",
  },
  {
    name: "Creative School",
    note: "Working with the Arts Council on art, music and creativity.",
    icon: "creative",
  },
];
