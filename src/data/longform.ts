// Long-form content for activity and archive sub-pages.
// Realistic placeholder copy that the school can edit later — clearly written
// in the school's voice, but not claiming to be definitive history.

export interface LongFormSection {
  heading?: string;
  body: string; // paragraphs split by \n\n
}

export interface LongFormContent {
  intro: string; // pull-quote / lead paragraph
  sections: LongFormSection[];
  pullQuote?: { text: string; attribution?: string };
  facts?: { label: string; value: string }[];
}

// ─────────────────────────────────────────────
// ACTIVITIES
// ─────────────────────────────────────────────

export const activityContent: Record<string, LongFormContent> = {
  sport: {
    intro:
      "Sport at Holy Cross is woven into the ordinary week — but hurling, in particular, is part of who we are. Generations of Firoda children have learned to lift, strike and pull a sliotar in the field beside the school.",
    facts: [
      { label: "Codes played", value: "Hurling, camogie, Gaelic football, soccer, athletics" },
      { label: "Pitches", value: "Two grass pitches adjoining the school" },
      { label: "Active Flag", value: "Renewed annually" },
      { label: "Inter-school", value: "Cumann na mBunscol, Allianz Cumann na mBunscol blitzes" },
    ],
    sections: [
      {
        heading: "Hurling first, always",
        body:
          "From Junior Infants up, every child gets a hurl in their hand. The youngest classes work on grip, lift and the basic strike with sponge sliotars in the yard; from 2nd class on, it moves out to the pitch. Coaching is shared between the class teachers and visiting coaches from the local GAA club, and parents help out at training and on match days.\n\nWe take part in the county Cumann na mBunscol competitions every spring, with both hurling and camogie teams. Some years we win; most years we don't. We do, however, always travel — and the bus journey home is, arguably, the better half of any school sports day.",
      },
      {
        heading: "Beyond hurling",
        body:
          "Soccer takes over for a few weeks in the autumn term, with small-sided games on the back pitch. We've a long-standing tradition of inter-class soccer leagues, refereed (with great seriousness) by 6th class.\n\nAthletics season comes in May with our annual sports day — sprints, relays, the obstacle course, and the parents' race that nobody officially organises but somehow always happens. The 1km cross-country also sends a small team to the county championships each year.",
      },
      {
        heading: "Active Flag — earned, not given",
        body:
          "We've held the Active School Flag for several years now and renew it annually. Holding the flag means that every child gets at least 60 minutes of moderate-to-vigorous physical activity built into the school day — through PE, yard games, walk-to-school weeks, and structured movement breaks in the classroom.\n\nThe Active Flag committee is led by 5th and 6th class pupils, who plan our walk-to-school week, the daily mile, and the annual sports week.",
      },
      {
        heading: "Yoga and movement",
        body:
          "Once a week, every class has a guided yoga or mindful-movement session. It's not a replacement for sport — it's a complement to it. Children settle, breathe, stretch, and head back to their work calmer than they left it. Parents tell us it carries over at home, too.",
      },
    ],
    pullQuote: {
      text: "There's a particular sound a hurl makes against a sliotar on a still autumn afternoon, and you'll hear it most weeks here.",
    },
  },

  music: {
    intro:
      "Music at Holy Cross runs from the tin whistle in 3rd class right through to the choir, the Christmas concert, and the small, important moments of singing together at school masses.",
    facts: [
      { label: "Tin whistle", value: "Weekly classes from 3rd class up" },
      { label: "School choir", value: "Open to all from 3rd class" },
      { label: "Performances", value: "Christmas concert, sacrament masses, Grandparents' Day" },
      { label: "Visiting tutors", value: "Local musicians and parents" },
    ],
    sections: [
      {
        heading: "The tin whistle programme",
        body:
          "Every child from 3rd class up takes part in our weekly tin whistle programme. We start with the basics — D, E, F# — and build up over the year to a small repertoire of traditional tunes, hymns and a few seasonal pieces for the Christmas concert.\n\nChildren bring their own whistle (a basic Generation D whistle is fine — available from any music shop in Kilkenny for a few euro). Sheet music and tab go home in copybooks, so children can practise at the kitchen table.",
      },
      {
        heading: "The school choir",
        body:
          "The choir meets at lunchtime on Fridays and is open to anyone from 3rd class up who wants to sing. There's no audition. We sing for the Christmas concert, the sacrament masses, Grandparents' Day, and the end-of-year ceremony for our 6th class leavers.",
      },
      {
        heading: "Singing as part of the day",
        body:
          "Music isn't a once-a-week class — there's singing in some shape or other most days. The infants sing the days of the week and the weather every morning. Older classes sing as part of religion lessons, history projects, and Irish.",
      },
      {
        heading: "Class concerts and the Christmas show",
        body:
          "Each class puts on at least one performance for parents during the year — sometimes a small reading, sometimes a full play. The Christmas concert is the big one, with every class taking part, and the hall packed to the doors. We try to keep it short enough that the youngest performers don't melt down and the youngest audience members don't either.",
      },
    ],
    pullQuote: {
      text: "If we're doing it right, every child leaves Holy Cross able to play three or four tunes on a tin whistle and unselfconscious about singing in a group.",
    },
  },

  "active-flag": {
    intro:
      "The Active School Flag is a Department of Education recognition for schools that build sport, movement and play into the ordinary fabric of the school day. We've held the flag for several years now and renew it annually.",
    facts: [
      { label: "Daily activity", value: "Minimum 60 minutes per child" },
      { label: "PE per week", value: "1 hour minimum, taught by class teacher" },
      { label: "Yard games", value: "Structured options every break" },
      { label: "Walk-to-school week", value: "Annually, March" },
    ],
    sections: [
      {
        heading: "What the flag actually means",
        body:
          "The flag isn't a one-off award — it's an ongoing commitment. To hold it, we have to show that every child gets at least 60 minutes of moderate-to-vigorous activity every school day, through a mix of PE, yard play, structured breaks, and active classroom time.\n\nAn external assessor visits every few years, talks to children and staff, and looks at the actual evidence of activity across the school week — not just the policy on paper.",
      },
      {
        heading: "How we make the time",
        body:
          "Yard games are organised, not free-for-all — older pupils run rotations of skipping, hopscotch, parachute games and small-sided football for the younger ones. A 'daily mile' loop runs around the perimeter of the back pitch and is used most days, weather permitting. Active homework — counting steps, family walks, a kick-around — is set in some weeks instead of written tasks.",
      },
      {
        heading: "The Active Flag committee",
        body:
          "The committee is pupil-led — 5th and 6th class representatives meet fortnightly with a teacher, and they're the ones who plan walk-to-school week, the daily mile timetable, and our annual sports day.",
      },
    ],
  },

  "creative-school": {
    intro:
      "We are a designated Creative School, working with the Arts Council of Ireland on a multi-year programme of creativity in the classroom — visual art, music, drama, dance, writing and the kind of projects that don't fit neatly under any one heading.",
    facts: [
      { label: "Programme", value: "Creative Schools, Arts Council of Ireland" },
      { label: "Creative Associate", value: "Visiting artist working alongside teachers" },
      { label: "Focus", value: "Pupil-led, project-based creative work" },
    ],
    sections: [
      {
        heading: "What it looks like in practice",
        body:
          "A Creative Associate — usually a working artist — is attached to the school for a block of weeks. They come in regularly, work alongside the class teachers, and help us develop a project that runs for the term.\n\nPast projects have included a soundscape of the school day made by 5th class, a stop-motion animation of local folk tales by 4th class, and a large textile piece that hangs in the corridor, made jointly by 1st and 2nd class.",
      },
      {
        heading: "Pupil-led, by design",
        body:
          "The point of the Creative Schools programme is that the children steer the work. We start by asking them what they want to explore, and the project grows from there. It's slower than a normal art lesson, and the outcome is rarely tidy — but the work the children make is genuinely theirs.",
      },
    ],
    pullQuote: {
      text: "The best Creative Schools projects look, at first, like nothing in particular is happening. Then a few weeks in, you realise the children have made something none of us would have thought of.",
    },
  },

  "grandparents-day": {
    intro:
      "Grandparents' Day is one of the warmest mornings of our school year. Tea, scones, songs, and a hall packed with three generations of the same families — many of whom went through these same classrooms themselves.",
    facts: [
      { label: "When", value: "Late September, annually" },
      { label: "Who's invited", value: "Grandparents and special friends of all pupils" },
      { label: "What happens", value: "Mass, performance, tea & scones" },
    ],
    sections: [
      {
        heading: "The morning",
        body:
          "We start with a short Mass in the school hall, celebrated by the parish priest. The children sing — every class contributes something — and a few pupils read prayers they've written themselves.\n\nAfterwards, the hall becomes a tearoom. Parents bake the night before, the older children serve, and the grandparents are made to sit down whether they want to or not. There are usually one or two photographs from the parish archives on a slideshow at the back of the room — and at least one grandparent who recognises themselves as a child in one of them.",
      },
      {
        heading: "Why we do it",
        body:
          "It's not a fundraiser and it's not a marketing event. It's a thank-you. So many of our families have grandparents who collect children from the school gate, mind them on holidays, ferry them to training, and quietly hold things together. Grandparents' Day is the one morning of the year we get to say so out loud.",
      },
    ],
    pullQuote: {
      text: "Some of our grandparents sat in these same desks. The school knows who they are — and so do they.",
    },
  },
};

// ─────────────────────────────────────────────
// ARCHIVE
// ─────────────────────────────────────────────

export const archiveContent: Record<string, LongFormContent> = {
  castlecomer: {
    intro:
      "Castlecomer is the nearest market town to the school — about four kilometres north on the R694. Its history is older and stranger than its quiet appearance suggests, and much of the parish's life has long revolved around it.",
    facts: [
      { label: "Distance from school", value: "~4 km north" },
      { label: "Founded", value: "Plantation town, early 1600s" },
      { label: "Old name", value: "Caisleán an Chomair — 'castle of the confluence'" },
      { label: "Famous for", value: "Coal mining, the Wandesforde estate, hurling" },
    ],
    sections: [
      {
        heading: "Origins",
        body:
          "The Irish name, Caisleán an Chomair, means the castle of the confluence — the meeting of the rivers Deen, Cloghogue and Brockagh. There has been a settlement here for far longer than the town's official founding, but the Castlecomer most people recognise was laid out in the early 1600s by the Wandesforde family, who came over from Yorkshire as part of the Plantation of Leinster.\n\nThe town was planned around a wide square, with the estate house and demesne to the south. Much of that original layout is still legible if you walk the streets today.",
      },
      {
        heading: "The Wandesforde estate",
        body:
          "For more than three centuries, the Wandesfordes were the largest landowners in the area. They built the estate house in the demesne, opened the coal mines, and shaped much of the daily life of the surrounding parishes — including, indirectly, the establishment of schools like ours.\n\nThe estate was finally broken up in the twentieth century, but its mark is still everywhere — in field boundaries, road alignments, and the layout of the demesne itself.",
      },
      {
        heading: "Coal, and what it built",
        body:
          "Castlecomer was Ireland's most significant coal-mining town for over two hundred years. The anthracite coal seams beneath the parish were among the richest in the country, and at its peak the industry employed thousands of men from the surrounding villages — including many from Firoda.\n\nThe coal is mostly worked out now, and the mines closed in the 1960s. But the houses the miners lived in, the chapels they built, and the schools their children attended are all part of the story of how this corner of Kilkenny came to look the way it does.",
      },
      {
        heading: "Today",
        body:
          "Modern Castlecomer is a quiet country town of about 1,500 people, with a primary and secondary school, a strong GAA club, and a growing weekend trade thanks to the Discovery Park in the demesne. Most of our school families do their weekly shop, their banking and their parish business there.",
      },
    ],
    pullQuote: {
      text: "Almost every family in our school has a grandfather, great-grandfather or great-uncle who worked underground at one of the Castlecomer pits. The town's history is, in a real sense, our history too.",
    },
  },

  demesne: {
    intro:
      "The Castlecomer Demesne is the old Wandesforde estate — once a private deer park, now an eighty-acre public amenity at the edge of the town. For our school, it's the obvious destination for any walking trip and a familiar setting for cross-country, picnics and end-of-year days out.",
    facts: [
      { label: "Size", value: "~80 acres" },
      { label: "Original use", value: "Private estate of the Wandesforde family" },
      { label: "Now", value: "Public park, lakes, woodland, Discovery Park" },
      { label: "From the school", value: "10 minutes by car, signposted in Castlecomer" },
    ],
    sections: [
      {
        heading: "An estate, and then a park",
        body:
          "The demesne was laid out in the eighteenth century as the private grounds of Castlecomer House, the seat of the Wandesforde family. At its peak it included formal gardens, a chain of ornamental lakes, woodland walks, a deer park and a model farm.\n\nThe house itself was demolished in the twentieth century, but most of the landscape survived. In the 2000s, after years of community campaigning, the demesne was developed as a public park — and is now one of the most-visited green spaces in north Kilkenny.",
      },
      {
        heading: "The Discovery Park",
        body:
          "The Discovery Park sits within the demesne and includes the Coal Mining Museum, an adventure playground, a tree-top walk, woodland trails, the lakes, and a café. Our 5th and 6th classes visit the mining museum every couple of years as part of their local-history work.",
      },
      {
        heading: "Why it matters to us",
        body:
          "For most of our pupils, the demesne is the first place outside the school where they walk a real woodland trail, see a heron lift off a lake, or read a memorial stone for someone who lived in their townland a century ago. It's where local history stops being something in a book and becomes something underfoot.",
      },
    ],
  },

  "coal-mining": {
    intro:
      "Coal mining defined this parish for two hundred years. The seams beneath Firoda, Castlecomer and the surrounding townlands were among the richest in Ireland — and the lives, livelihoods and losses of mining shaped families that are still part of our school today.",
    facts: [
      { label: "Coal type", value: "Anthracite (low-smoke, high-carbon)" },
      { label: "Active period", value: "Early 1700s – 1969" },
      { label: "Peak workforce", value: "~1,000 men, mostly local" },
      { label: "Last working pit", value: "Deerpark Colliery, closed 1969" },
    ],
    sections: [
      {
        heading: "The seams",
        body:
          "The Castlecomer coalfield is part of the Leinster coalfield and produced almost all of Ireland's commercially mined anthracite. It runs in a broad band beneath Castlecomer, Moneenroe, Clogh and the parishes around Firoda. The coal is hard, low in smoke and high in carbon — prized for domestic heating and, historically, for industrial use.\n\nThe seams here are thin and steeply pitched, which made the mining unusually difficult. Men worked lying on their sides in narrow seams, often for ten- or twelve-hour shifts, by candlelight for much of the industry's history.",
      },
      {
        heading: "The work",
        body:
          "At the peak of the industry in the late 1800s, around a thousand men were employed across the various pits. Most were local — fathers, sons and brothers from the same townlands working the same seams.\n\nWages were low, conditions hard, and accidents common. The community memory of the pits is shaped as much by the men who didn't come home as by those who did. Many of the older graveyards in the parish carry stones for miners killed underground.",
      },
      {
        heading: "The end",
        body:
          "By the mid-twentieth century the easy seams were worked out, and cheaper imported coal made the remaining seams uneconomic. The last pit, the Deerpark Colliery, closed in 1969. Within a generation, an industry that had defined the area for two centuries was gone.",
      },
      {
        heading: "What's left",
        body:
          "The Coal Mining Museum in the Castlecomer Demesne preserves much of the physical history — tools, photographs, oral histories, and a small reconstruction of an underground working. Many of our pupils visit it as part of 5th and 6th class local-history projects.\n\nAnd in the families themselves, the memory remains. Grandfathers and great-grandfathers of children currently in our school went down those pits.",
      },
    ],
    pullQuote: {
      text: "When the men came up at the end of a shift, you could tell where they'd been working by the colour of the coal dust on their faces. That's the kind of detail you only get from someone whose father did it.",
    },
  },

  "gaa-grounds": {
    intro:
      "The GAA grounds adjoining the school are not just a sports facility — they are the social heart of the parish. For generations they have been the place where children first learned to hold a hurl, where teenagers played their first county games, and where the whole community gathered on Sunday afternoons.",
    facts: [
      { label: "Location", value: "Adjacent to the school grounds" },
      { label: "Codes", value: "Hurling, camogie, Gaelic football" },
      { label: "Used by", value: "Local GAA club, the school, community groups" },
    ],
    sections: [
      {
        heading: "A shared field",
        body:
          "The pitches sit immediately beside the school. For most of the school week they are our PE field, our hurling pitch, our cross-country loop and our sports-day venue. In the evenings and at weekends they belong to the GAA club, with under-age training most weeknights and matches on Sundays.\n\nThe shared use is not an accident — when the grounds were laid out, the school and the club worked together to ensure that children could walk straight from class to training without crossing a road.",
      },
      {
        heading: "The club",
        body:
          "The local GAA club is one of the oldest in the county and has produced county-level players in both hurling and camogie. Many of our current parents were members themselves, and many of our pupils are now coming up through the club's juvenile structures.",
      },
      {
        heading: "Sunday afternoons",
        body:
          "On a championship Sunday, the field is the busiest place in the parish. Cars line the road, the clubhouse pours tea, the children of the school sell programmes and run errands, and three generations of the same family stand on the same sideline. It is the ordinary, unspoken ritual that holds a small rural community together.",
      },
    ],
  },

  "1916": {
    intro:
      "In 2016, to mark the centenary of the Easter Rising, every school in Ireland was invited to take part in the national 1916 commemoration. Our project — pupil-led, year-long and rooted in the local — became one of the proudest pieces of work the school has produced.",
    facts: [
      { label: "Year", value: "2016 — centenary of the Rising" },
      { label: "Led by", value: "5th and 6th class, with the whole school" },
      { label: "Outcomes", value: "Wall display, parents' evening, ceremonial flag-raising" },
    ],
    sections: [
      {
        heading: "Brief, then ours",
        body:
          "Schools were given a national framework — the Proclamation, the events of Easter Week, the long road to independence — but were free to make the project their own. Our 5th and 6th classes decided early that the most interesting story was not Dublin in 1916 but Kilkenny in 1916: what was happening here, in this parish, while the events of the Rising were unfolding.",
      },
      {
        heading: "What the children found",
        body:
          "Working with parents, grandparents and the local historical society, the children pieced together a picture of a parish where most people were going about an ordinary working week — coal still being mined, harvests being brought in, children walking to a much smaller version of this school. They found the names of three local men who fought in 1916 or in the War of Independence that followed, and added their stories to the wall display.\n\nThey also looked at what the parish records showed about life expectancy, family size, literacy and emigration in 1916 — the slower historical context that the Rising sat inside.",
      },
      {
        heading: "The flag-raising",
        body:
          "On Proclamation Day, every primary school in the country raised the tricolour at the same hour, and 6th class read the Proclamation aloud. We held a short ceremony in the yard, with parents, grandparents and members of the local GAA and Tidy Towns committees. It rained, of course. Nobody minded.",
      },
    ],
  },
};
