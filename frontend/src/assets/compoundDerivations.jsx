const compoundDerivations = [
  [
    { meaning: ["throw"], pos: "verb_meaning" },
    { meaning: ["water"], pos: "noun_meaning" },
    { meaning: ["sprinke", "spray"], pos: "verb_meaning" },
  ],

  [
    { meaning: ["take"], pos: "verb_meaning" },
    { meaning: ["water"], pos: "noun_meaning" },
    { meaning: ["drain"], pos: "verb_meaning" },
  ],
  [
    {
      meaning: ["with"],
      pos: "adp_meaning",
    },
    {
      meaning: ["away"],
      pos: "adv_meaning",
    },
    {
      meaning: ["but", "except"],
      pos: "conj_meaning",
      themes: [],
    },
  ],

  [
    { meaning: ["kill"], pos: "verb_meaning" },
    { meaning: ["deer"], pos: "noun_meaning" },
    { meaning: ["hunt"], pos: "verb_meaning" },
  ],
  [
    { meaning: ["to", "toward", "at"], pos: "adp_meaning" },
    { meaning: ["foot"], pos: "noun_meaning" },
    {
      meaning: ["underneath", "to under", "under"],
      pos: "adv_meaning",
    },
  ],
  [
    { meaning: ["fish"], pos: "noun_meaning" },
    { meaning: ["catch"], pos: "verb_meaning" },
    {
      meaning: ["fish"],
      pos: "verb_meaning",
    },
  ],
  [
    { meaning: ["bird"], pos: "noun_meaning" },
    { meaning: ["move"], pos: "verb_meaning" },
    {
      meaning: ["fly"],
      pos: "verb_meaning",
    },
  ],
  [
    { meaning: ["not"], pos: "part_meaning" },
    { meaning: ["or"], pos: "conj_meaning" },
    {
      meaning: ["nor", "not either", "but not"],
      pos: "conj_meaning",
    },
  ],
  [
    { meaning: ["to", "toward", "at"], pos: "adp_meaning" },
    { meaning: ["land", "ground", "earth", "soil"], pos: "noun_meaning" },
    {
      meaning: ["downwards"],
      pos: "adv_meaning",
    },
  ],

  [
    { meaning: ["heat up"], pos: "verb_meaning" },
    { meaning: ["water"], pos: "noun_meaning" },
    {
      meaning: ["boil"],
      pos: "noun_meaning",
    },
  ],
  [
    { meaning: ["in"], pos: "adp_meaning" },
    { meaning: ["hand"], pos: "noun_meaning" },
    {
      meaning: ["with"],
      pos: "adp_meaning",
    },
  ],

  [
    {
      meaning: ["gather", "collect", "find", "make", "create"],
      pos: "verb_meaning",
    },
    { meaning: ["music"], pos: "noun_meaning" },
    {
      meaning: ["sing", "make music"],
      pos: "verb_meaning",
    },
  ],

  [
    { meaning: ["press"], pos: "verb_meaning" },
    { meaning: ["fire"], pos: "noun_meaning" },
    { meaning: ["brand"], pos: "verb_meaning" },
  ],

  [
    { meaning: ["cut"], pos: "verb_meaning" },
    { meaning: ["testicle"], pos: "noun_meaning" },
    { meaning: ["castrate"], pos: "verb_meaning" },
  ],

  [
    { meaning: ["bring"], pos: "verb_meaning" },
    { meaning: ["place"], pos: "noun_meaning" },
    { meaning: ["navigate", "direct"], pos: "verb_meaning" },
  ],

  [
    { meaning: ["small", "short"], pos: "adj_meaning" },
    { meaning: ["man", "person"], pos: "noun_meaning" },
    { meaning: ["dwarf"], pos: "noun_meaning" },
  ],

  [
    { meaning: ["forest", "moon"], pos: "noun_meaning" },
    { meaning: ["dog", "hound"], pos: "noun_meaning" },
    { meaning: ["wolf"], pos: "noun_meaning" },
  ],

  [
    { meaning: ["old"], pos: "adj_meaning" },
    { meaning: ["old"], pos: "adj_meaning" },
    { meaning: ["ancient"], pos: "adj_meaning" },
  ],

  [
    {
      meaning: ["still", "stone", "grey", "hard", "rigid"],
      pos: "adj_meaning",
    },
    { meaning: ["man", "person"], pos: "noun _meaning" },
    { meaning: ["statue"], pos: "noun_meaning" },
  ],

  [
    { meaning: ["kill"], pos: "verb_meaning" },
    { meaning: ["man", "person"], pos: "noun _meaning" },
    { meaning: ["killer", "enemy", "enemy soldier"], pos: "noun_meaning" },
  ],

  [
    { meaning: ["pull", "haul", "work"], pos: "verb_meaning" },
    { meaning: ["animal", "beast"], pos: "noun _meaning" },
    { meaning: ["ox", "beast of burden"], pos: "noun_meaning" },
  ],

  [
    { meaning: ["cure", "mend", "heal", "aid"], pos: "verb_meaning" },
    { meaning: ["man", "person"], pos: "noun _meaning" },
    { meaning: ["doctor"], pos: "noun_meaning" },
  ],

  [
    { meaning: ["bake", "knead"], pos: "verb_meaning" },
    { meaning: ["man", "person"], pos: "noun _meaning" },
    { meaning: ["baker"], pos: "noun_meaning" },
  ],

  [
    { meaning: ["sing"], pos: "verb_meaning" },
    { meaning: ["man", "person"], pos: "noun _meaning" },
    { meaning: ["singer"], pos: "noun_meaning" },
  ],

  [
    { meaning: ["draw", "paint", "depict"], pos: "verb_meaning" },
    { meaning: ["man", "person"], pos: "noun _meaning" },
    { meaning: ["artist", "painter"], pos: "noun_meaning" },
  ],

  [
    { meaning: ["carve", "chisel", "sculpt"], pos: "verb_meaning" },
    { meaning: ["man", "person"], pos: "noun _meaning" },
    { meaning: ["mason", "carver", "sculptor"], pos: "noun_meaning" },
  ],

  [
    { meaning: ["rock", "stone", "earth"], pos: "noun_meaning" },
    { meaning: ["man", "person"], pos: "noun_meaning" },
    { meaning: ["statue"], pos: "noun_meaning" },
  ],

  [
    { meaning: ["big"], pos: "adj_meaning" },
    { meaning: ["big"], pos: "adj_meaning" },
    { meaning: ["huge", "massive", "monumental"], pos: "adj_meaning" },
  ],

  [
    {
      meaning: ["wild", "dangerous", "evil", "big", "lunar"],
      pos: "adj_meaning",
    },
    { meaning: ["dog", "hound"], pos: "noun_meaning" },
    { meaning: ["wolf"], pos: "noun_meaning" },
  ],

  [
    { meaning: ["take"], pos: "verb_meaning" },
    { meaning: ["life"], pos: "noun_meaning" },
    { meaning: ["kill", "slaughter", "murder", "slay"], pos: "verb_meaning" },
  ],

  [
    { meaning: ["hold"], pos: "verb_meaning" },
    { meaning: ["down"], pos: "noun_meaning" },
    { meaning: ["weigh", "press", "apply pressure"], pos: "verb_meaning" },
  ],

  [
    { meaning: ["take"], pos: "verb_meaning" },
    { meaning: ["blood"], pos: "noun_meaning" },
    { meaning: ["bleed"], pos: "verb_meaning" },
  ],

  [
    { meaning: ["take"], pos: "verb_meaning" },
    { meaning: ["milk"], pos: "noun_meaning" },
    { meaning: ["milk"], pos: "verb_meaning" },
  ],

  [
    { meaning: ["sun"], pos: "noun_meaning" },
    { meaning: ["moon"], pos: "noun_meaning" },
    { meaning: ["time", "cosmos", "day"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["world"], pos: "noun_meaning" },
    { meaning: ["wind"], pos: "noun_meaning" },
    { meaning: ["weather"], pos: "noun_meaning" },
    "merism compound",
  ],
  [
    { meaning: ["mountain"], pos: "noun_meaning" },
    { meaning: ["steppe"], pos: "noun_meaning" },
    { meaning: ["landscape"], pos: "noun_meaning" },
    "merism compound",
  ],
  [
    { meaning: ["wheel"], pos: "noun_meaning" },
    { meaning: ["man"], pos: "noun_meaning" },
    { meaning: ["chariot"], pos: "noun_meaning" },
    "merism compound",
  ],
  [
    { meaning: ["husband"], pos: "noun_meaning" },
    { meaning: ["wife"], pos: "noun_meaning" },
    { meaning: ["married couple"], pos: "noun_meaning" },
    "merism compound",
  ],
  [
    { meaning: ["milk"], pos: "noun_meaning" },
    { meaning: ["bread"], pos: "noun_meaning" },
    { meaning: ["food", "meal", "sustainence"], pos: "noun_meaning" },
    "merism compound",
  ],
  [
    { meaning: ["life"], pos: "noun_meaning" },
    { meaning: ["death"], pos: "noun_meaning" },
    { meaning: ["existence", "fate", "ultimatum"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["body"], pos: "noun_meaning" },
    { meaning: ["soul", "spirit"], pos: "noun_meaning" },
    { meaning: ["person", "individual"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["earth"], pos: "noun_meaning" },
    { meaning: ["sky", "heaven", "cosmos"], pos: "noun_meaning" },
    { meaning: ["universe", "world"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["day"], pos: "noun_meaning" },
    { meaning: ["night"], pos: "noun_meaning" },
    { meaning: ["continiously", "at all times"], pos: "adv_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["summer"], pos: "noun_meaning" },
    { meaning: ["winter"], pos: "noun_meaning" },
    { meaning: ["year"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["summer"], pos: "noun_meaning" },
    { meaning: ["winter"], pos: "noun_meaning" },
    { meaning: ["all year round", "yearly", "annualy"], pos: "adv_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["high"], pos: "adj_meaning" },
    { meaning: ["low"], pos: "adj_meaning" },
    { meaning: ["everyone", "everywhere"], pos: "pron_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["high"], pos: "adj_meaning" },
    { meaning: ["low"], pos: "adj_meaning" },
    { meaning: ["of all ranks"], pos: "adj_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["far"], pos: "adj_meaning" },
    { meaning: ["wide"], pos: "adj_meaning" },
    { meaning: ["everywhere"], pos: "adv_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["black"], pos: "adj_meaning" },
    { meaning: ["white"], pos: "adj_meaning" },
    { meaning: ["contrasting", "simple", "stark"], pos: "adj_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["flesh"], pos: "noun_meaning" },
    { meaning: ["blood"], pos: "noun_meaning" },
    { meaning: ["person", "human", "relative"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["skin"], pos: "noun_meaning" },
    { meaning: ["bone"], pos: "noun_meaning" },
    { meaning: ["emaciated"], pos: "adj_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["head"], pos: "noun_meaning" },
    { meaning: ["toe", "foot"], pos: "noun_meaning" },
    { meaning: ["all over ones body"], pos: "adv_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["give"], pos: "verb_meaning" },
    { meaning: ["take", "recieve"], pos: "verb_meaning" },
    {
      meaning: ["exchange", "reciprocity", "mutual comprimise"],
      pos: "noun_meaning",
    },
    "merism compound",
  ],

  [
    { meaning: ["up"], pos: "adp_meaning" },
    { meaning: ["down"], pos: "adp_meaning" },
    { meaning: ["good and the bad"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["song"], pos: "noun_meaning" },
    { meaning: ["dance"], pos: "noun_meaning" },
    { meaning: ["performance"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["wear"], pos: "verb_meaning" },
    { meaning: ["tear"], pos: "verb_meaning" },
    { meaning: ["gradual damage through use"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["bow"], pos: "verb_meaning" },
    { meaning: ["scrape"], pos: "verb_meaning" },
    { meaning: ["excessive deference"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["bread"], pos: "noun_meaning" },
    { meaning: ["butter"], pos: "noun_meaning" },
    { meaning: ["basic means of livelihood"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["here"], pos: "pron_meaning" },
    { meaning: ["there"], pos: "pron_meaning" },
    { meaning: ["in scattered places", "everywhere"], pos: "adv_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["hand"], pos: "noun_meaning" },
    { meaning: ["hand"], pos: "noun_meaning" },
    {
      meaning: ["together", "in conjunction", "alongside", "with each other"],
      pos: "adv_meaning",
    },
    "merism compound",
  ],

  [
    { meaning: ["law"], pos: "noun_meaning" },
    { meaning: ["order"], pos: "noun_meaning" },
    { meaning: ["social stability", "law enforcement"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["peace"], pos: "noun_meaning" },
    { meaning: ["quiet"], pos: "adj_meaning" },
    { meaning: ["calm", "tranquility"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["rise"], pos: "verb_meaning" },
    { meaning: ["fall"], pos: "verb_meaning" },
    { meaning: ["alternation of success and decline"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["right"], pos: "adj_meaning" },
    { meaning: ["wrong"], pos: "adj_meaning" },
    { meaning: ["moral totality"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["come"], pos: "verb_meaning" },
    { meaning: ["go"], pos: "verb_meaning" },
    { meaning: ["come and depart repeatedly"], pos: "verb_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["tide"], pos: "noun_meaning" },
    { meaning: ["flow"], pos: "noun_meaning" },
    { meaning: ["cyclical movement", "rhythm"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["start"], pos: "noun_meaning" },
    { meaning: ["end"], pos: "noun_meaning" },
    { meaning: ["duration"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["wind"], pos: "noun_meaning" },
    { meaning: ["wave"], pos: "noun_meaning" },
    { meaning: ["sea"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["hand"], pos: "noun_meaning" },
    { meaning: ["heart"], pos: "noun_meaning" },
    { meaning: ["devotion"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["wind"], pos: "noun_meaning" },
    { meaning: ["rain"], pos: "noun_meaning" },
    { meaning: ["stormy weather"], pos: "noun_meaning" },
    "merism compound",
  ],

  [
    { meaning: ["oath"], pos: "noun_meaning" },
    { meaning: ["brother"], pos: "noun_meaning" },
    { meaning: ["man with whom one has sworn an oath"], pos: "noun_meaning" },
    "endocentric compound",
  ],
  [
    { meaning: ["out"], pos: "adp_meaning" },
    { meaning: ["take"], pos: "verb_meaning" },
    {
      meaning: ["remove", "extract", "take out", "draw out"],
      pos: "verb_meaning",
    },
    "endocentric compound",
  ],
  [
    { meaning: ["in"], pos: "adp_meaning" },
    { meaning: ["take"], pos: "verb_meaning" },
    { meaning: ["ingest", "infect", "assimilate"], pos: "verb_meaning" },
    "endocentric compound",
  ],
  [
    { meaning: ["light"], pos: "noun_meaning" },
    { meaning: ["shaft", "beam"], pos: "noun_meaning" },
    { meaning: ["beam of light"], pos: "noun_meaning" },
    "endocentric compound",
  ],
  [
    { meaning: ["bee"], pos: "noun_meaning" },
    { meaning: ["home", "house", "place"], pos: "noun_meaning" },
    { meaning: ["beehive"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["stomach"], pos: "noun_meaning" },
    { meaning: ["ache", "pain"], pos: "noun_meaning" },
    { meaning: ["stomach ache", "sore stomach"], pos: "noun_meaning" },
    "endocentric compound",
  ],
  [
    { meaning: ["debt"], pos: "noun_meaning" },
    { meaning: ["person", "man"], pos: "noun_meaning" },
    { meaning: ["denitor", "debtor"], pos: "noun_meaning" },
    "endocentric compound",
  ],
  [
    { meaning: ["big"], pos: "adj_meaning" },
    { meaning: ["man"], pos: "noun_meaning" },
    { meaning: ["boss", "chief", "leader"], pos: "noun_meaning" },
    "endocentric compound",
  ],
  [
    { meaning: ["person", "woman", "wife", "mother"], pos: "noun_meaning" },
    { meaning: ["milk"], pos: "noun_meaning" },
    { meaning: ["breatsmilk"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["top", "roof"], pos: "noun_meaning" },
    { meaning: ["mouth"], pos: "noun_meaning" },
    { meaning: ["palate", "roof of the mouth"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    {
      meaning: ["eye", "hole", "gap", "mouth", "Opening"],
      pos: "noun_meaning",
    },
    { meaning: ["mouth"], pos: "noun_meaning" },
    { meaning: ["nostril"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["plough"], pos: "noun_meaning" },
    { meaning: ["horse"], pos: "noun_meaning" },
    { meaning: ["work horse"], pos: "noun_meaning" },
    "endocentric compound",
  ],
  [
    { meaning: ["mouth"], pos: "noun_meaning" },
    { meaning: ["person"], pos: "noun_meaning" },
    {
      meaning: ["one skilled at talking deceptively or persuasively"],
      pos: "noun_meaning",
    },
    "endocentric compound",
  ],

  [
    { meaning: ["soldier", "war", "warrior"], pos: "noun_meaning" },
    { meaning: ["horse"], pos: "noun_meaning" },
    { meaning: ["war horse"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["horse"], pos: "noun_meaning" },
    { meaning: ["soldier", "warrior"], pos: "noun_meaning" },
    { meaning: ["mounted soldier", "knight", "nobleman"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["cloud"], pos: "noun_meaning" },
    { meaning: ["cage"], pos: "noun_meaning" },
    { meaning: ["storm"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["fish"], pos: "noun_meaning" },
    { meaning: ["horse"], pos: "noun_meaning" },
    { meaning: ["dolphin"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["snow"], pos: "noun_meaning" },
    { meaning: ["ball"], pos: "noun_meaning" },
    { meaning: ["snowball"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["tooth", "mouth"], pos: "noun_meaning" },
    { meaning: ["brush"], pos: "noun_meaning" },
    { meaning: ["toothbrush"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["rain", "cloud", "sky"], pos: "noun_meaning" },
    { meaning: ["water"], pos: "noun_meaning" },
    { meaning: ["rainwater"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["king"], pos: "noun_meaning" },
    { meaning: ["son"], pos: "noun_meaning" },
    { meaning: ["prince"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["king"], pos: "noun_meaning" },
    { meaning: ["daughter"], pos: "noun_meaning" },
    { meaning: ["princess"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["wheel"], pos: "noun_meaning" },
    { meaning: ["chair"], pos: "noun_meaning" },
    { meaning: ["wheelchair"], pos: "noun_meaning" },
    "endocentric compound",
  ],

  [
    { meaning: ["hungry", "angry", "violent"], pos: "adj_meaning" },
    { meaning: ["sea"], pos: "noun_meaning" },
    { meaning: ["stormy sea"], pos: "noun_meaning" },
    "exocentric compound",
  ],

  [
    { meaning: ["moon"], pos: "noun_meaning" },
    { meaning: ["death"], pos: "noun_meaning" },
    { meaning: ["lunar eclipse"], pos: "noun_meaning" },
    "exocentric compound",
  ],

  [
    { meaning: ["lunar"], pos: "adj_meaning" },
    { meaning: ["death"], pos: "noun_meaning" },
    { meaning: ["lunar eclipse"], pos: "noun_meaning" },
    "exocentric compound",
  ],

  [
    { meaning: ["self", "same"], pos: "adj_meaning" },
    { meaning: ["eat"], pos: "noun_meaning" },
    { meaning: ["cannibal"], pos: "noun_meaning" },
    "exocentric compound",
  ],

  [
    { meaning: ["dark"], pos: "adj_meaning" },
    { meaning: ["man"], pos: "noun_meaning" },
    { meaning: ["evil man", "degenerate"], pos: "noun_meaning" },
    "exocentric compound",
  ],

  [
    { meaning: ["alone", "lonely"], pos: "adj_meaning" },
    { meaning: ["man"], pos: "noun_meaning" },
    { meaning: ["hermit", "recluse"], pos: "noun_meaning" },
    "exocentric compound",
  ],
  [
    { meaning: ["mouth"], pos: "noun_meaning" },
    { meaning: ["tooth"], pos: "noun_meaning" },
    { meaning: ["lip"], pos: "noun_meaning" },
    "exocentric compound",
  ],

  [
    { meaning: ["long"], pos: "adj_meaning" },
    { meaning: ["arm"], pos: "noun_meaning" },
    { meaning: ["as long as an arm"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["long"], pos: "adj_meaning" },
    { meaning: ["belt"], pos: "noun_meaning" },
    { meaning: ["as long as a belt"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["long"], pos: "adj_meaning" },
    { meaning: ["javelin"], pos: "noun_meaning" },
    { meaning: ["as long as a javelin"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["long"], pos: "adj_meaning" },
    { meaning: ["river"], pos: "noun_meaning" },
    { meaning: ["as long as a river"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["long"], pos: "adj_meaning" },
    { meaning: ["year"], pos: "noun_meaning" },
    { meaning: ["yearlong"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["able"], pos: "adj_meaning" },
    { meaning: ["craftsman"], pos: "noun_meaning" },
    {
      meaning: ["as able as a craftsman", "crafty", "cunning"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["able"], pos: "adj_meaning" },
    { meaning: ["horse"], pos: "noun_meaning" },
    { meaning: ["as able as a horse", "strong"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["able"], pos: "adj_meaning" },
    { meaning: ["ox"], pos: "noun_meaning" },
    { meaning: ["as able as a ox", "strong"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["angry"], pos: "adj_meaning" },
    { meaning: ["wolf"], pos: "noun_meaning" },
    {
      meaning: ["as angry as a wolf", "beserk", "raging mad"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["beautiful"], pos: "adj_meaning" },
    { meaning: ["flower"], pos: "noun_meaning" },
    { meaning: ["as beautiful as a flower", "pretty"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["beautiful"], pos: "adj_meaning" },
    { meaning: ["butterfly"], pos: "noun_meaning" },
    { meaning: ["as beautiful as a butterly", "pretty"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["beautiful"], pos: "adj_meaning" },
    { meaning: ["star"], pos: "noun_meaning" },
    { meaning: ["as beautiful as a butterly", "pretty"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["beautiful"], pos: "adj_meaning" },
    { meaning: ["crown"], pos: "noun_meaning" },
    { meaning: ["as beautiful as a crown", "pretty"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["beautiful"], pos: "adj_meaning" },
    { meaning: ["spring"], pos: "noun_meaning" },
    { meaning: ["as beautiful as spring", "pretty"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["blind"], pos: "adj_meaning" },
    { meaning: ["night"], pos: "noun_meaning" },
    { meaning: ["very blind", "completely blind"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["blind"], pos: "adj_meaning" },
    { meaning: ["boulder"], pos: "noun_meaning" },
    { meaning: ["very blind", "completely blind"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["dark"], pos: "adj_meaning" },
    { meaning: ["night"], pos: "noun_meaning" },
    { meaning: ["as dark as night", "pitch black"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["dark"], pos: "adj_meaning" },
    { meaning: ["shadow"], pos: "noun_meaning" },
    { meaning: ["as dark as a shadow", "pitch black"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["bright"], pos: "adj_meaning" },
    { meaning: ["sun"], pos: "noun_meaning" },
    { meaning: ["as bright as the sun"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["bright"], pos: "adj_meaning" },
    { meaning: ["day"], pos: "noun_meaning" },
    { meaning: ["as bright as day"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["bright"], pos: "adj_meaning" },
    { meaning: ["fire"], pos: "noun_meaning" },
    { meaning: ["as bright as fire"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["bright"], pos: "adj_meaning" },
    { meaning: ["sky"], pos: "noun_meaning" },
    { meaning: ["as bright as the sky"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["fast"], pos: "adj_meaning" },
    { meaning: ["horse"], pos: "noun_meaning" },
    { meaning: ["as fast as a horse"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["fast"], pos: "adj_meaning" },
    { meaning: ["hare"], pos: "noun_meaning" },
    { meaning: ["as fast as a hare"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["fast"], pos: "adj_meaning" },
    { meaning: ["leopard"], pos: "noun_meaning" },
    { meaning: ["as fast as a leopard"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["fast"], pos: "adj_meaning" },
    { meaning: ["wind"], pos: "noun_meaning" },
    { meaning: ["as fast as wind"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["fast"], pos: "adj_meaning" },
    { meaning: ["light"], pos: "noun_meaning" },
    { meaning: ["as fast as light"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["evil"], pos: "adj_meaning" },
    { meaning: ["crime"], pos: "noun_meaning" },
    { meaning: ["as evil as crime", "downright evil"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["evil"], pos: "adj_meaning" },
    { meaning: ["criminal"], pos: "noun_meaning" },
    {
      meaning: ["as evil as a criminal", "downright evil"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["evil"], pos: "adj_meaning" },
    { meaning: ["evil"], pos: "noun_meaning" },
    { meaning: ["as evil as evil", "downright evil"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["good"], pos: "adj_meaning" },
    { meaning: ["dog"], pos: "noun_meaning" },
    { meaning: ["as good as a dog", "trustworthy"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["good"], pos: "adj_meaning" },
    { meaning: ["friend"], pos: "noun_meaning" },
    { meaning: ["as good as a friend", "trustworthy"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["good"], pos: "adj_meaning" },
    { meaning: ["tree"], pos: "noun_meaning" },
    { meaning: ["as good as a tree", "trustworthy"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["green"], pos: "adj_meaning" },
    { meaning: ["grass"], pos: "noun_meaning" },
    { meaning: ["as green as grass"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["intelligent"], pos: "adj_meaning" },
    { meaning: ["crow"], pos: "noun_meaning" },
    {
      meaning: ["cunning", "mentally sharp", "witty", "smart", "clever"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["intelligent"], pos: "adj_meaning" },
    { meaning: ["raven"], pos: "noun_meaning" },
    {
      meaning: ["cunning", "mentally sharp", "witty", "smart", "clever"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["intelligent"], pos: "adj_meaning" },
    { meaning: ["fire"], pos: "noun_meaning" },
    { meaning: ["witty", "frightfully intelligent"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["divine", "holy"], pos: "adj_meaning" },
    { meaning: ["god"], pos: "noun_meaning" },
    { meaning: ["as divine as a god"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["hostile"], pos: "adj_meaning" },
    { meaning: ["enemy"], pos: "noun_meaning" },
    { meaning: ["as hostile as an enemy", "antagonistic"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["hostile"], pos: "adj_meaning" },
    { meaning: ["foreigner"], pos: "noun_meaning" },
    {
      meaning: ["as hostile as an foreigner", "antagonistic"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["hostile"], pos: "adj_meaning" },
    { meaning: ["stranger"], pos: "noun_meaning" },
    {
      meaning: ["as hostile as an stranger", "antagonistic"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["healthy"], pos: "adj_meaning" },
    { meaning: ["cow"], pos: "noun_meaning" },
    {
      meaning: ["as healthy as a cow", "beeming with health"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["healthy"], pos: "adj_meaning" },
    { meaning: ["bull"], pos: "noun_meaning" },
    {
      meaning: ["as healthy as a bull", "beeming with health"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["healthy"], pos: "adj_meaning" },
    { meaning: ["boar"], pos: "noun_meaning" },
    {
      meaning: ["as healthy as a boar", "beeming with health"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["hot"], pos: "adj_meaning" },
    { meaning: ["sun"], pos: "noun_meaning" },
    {
      meaning: ["as hot as the sun", "red hot", "scorching hot", "piping hot"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["hot"], pos: "adj_meaning" },
    { meaning: ["fire"], pos: "noun_meaning" },
    {
      meaning: ["as hot as a fire", "red hot", "scorching hot", "piping hot"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["hot"], pos: "adj_meaning" },
    { meaning: ["furnace"], pos: "noun_meaning" },
    {
      meaning: [
        "as hot as a furnace",
        "red hot",
        "scorching hot",
        "piping hot",
      ],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["strong", "powerful"], pos: "adj_meaning" },
    { meaning: ["fort"], pos: "noun_meaning" },
    {
      meaning: ["as strong as a fort", "consolidated", "defensible"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["strong", "powerful"], pos: "adj_meaning" },
    { meaning: ["fort"], pos: "noun_meaning" },
    {
      meaning: ["as strong as a fort", "consolidated", "defensible"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["strong", "powerful"], pos: "adj_meaning" },
    { meaning: ["stallion"], pos: "noun_meaning" },
    { meaning: ["as strong as a stallion", "muscular"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["strong", "powerful"], pos: "adj_meaning" },
    { meaning: ["bear"], pos: "noun_meaning" },
    { meaning: ["as strong as a bear", "muscular"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["strong", "powerful"], pos: "adj_meaning" },
    { meaning: ["ox"], pos: "noun_meaning" },
    { meaning: ["as strong as an ox", "muscular"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["strong", "powerful"], pos: "adj_meaning" },
    { meaning: ["hammer"], pos: "noun_meaning" },
    { meaning: ["as strong as a hammer", "durable"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["strong", "powerful"], pos: "adj_meaning" },
    { meaning: ["dragon"], pos: "noun_meaning" },
    { meaning: ["as strong as a dragon", "rampant"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["strong", "powerful"], pos: "adj_meaning" },
    { meaning: ["boar"], pos: "noun_meaning" },
    { meaning: ["as strong as a boar", "rampant"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["strong", "powerful"], pos: "adj_meaning" },
    { meaning: ["bull"], pos: "noun_meaning" },
    { meaning: ["as strong as a bull", "rampant"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["strong", "powerful"], pos: "adj_meaning" },
    { meaning: ["mammoth"], pos: "noun_meaning" },
    { meaning: ["as strong as a mammoth", "rampant"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["hungry"], pos: "adj_meaning" },
    { meaning: ["wolf"], pos: "noun_meaning" },
    {
      meaning: ["as hungry as a wolf", "famished", "ravenous", "starving"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["hungry"], pos: "adj_meaning" },
    { meaning: ["cow"], pos: "noun_meaning" },
    {
      meaning: ["as hungry as a cow", "famished", "ravenous", "starving"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["hungry"], pos: "adj_meaning" },
    { meaning: ["dragon"], pos: "noun_meaning" },
    {
      meaning: ["as hungry as a dragon", "famished", "ravenous", "starving"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["new"], pos: "adj_meaning" },
    { meaning: ["lamb", "kitten", "puppy"], pos: "noun_meaning" },
    { meaning: ["brand new", "recent"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["noble"], pos: "adj_meaning" },
    {
      meaning: [
        "lord",
        "honour",
        "king",
        "oath",
        "stag",
        "tree",
        "wolf",
        "crown",
        "eagle",
      ],
      pos: "noun_meaning",
    },
    { meaning: ["deeply noble", "very noble"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["painful"], pos: "adj_meaning" },
    { meaning: ["wound"], pos: "noun_meaning" },
    { meaning: ["deeply painful", "biting"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["old"], pos: "adj_meaning" },
    { meaning: ["tree", "forest", "stone", "sun"], pos: "noun_meaning" },
    {
      meaning: ["ancient", "arcane", "primordial", "archaic"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["pure"], pos: "adj_meaning" },
    { meaning: ["honour", "oath", "star"], pos: "noun_meaning" },
    {
      meaning: ["beautifully pure", "immaculate", "unspoiled"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["quiet"], pos: "adj_meaning" },
    { meaning: ["leaf", "owl", "tree"], pos: "noun_meaning" },
    {
      meaning: ["beautifully pure", "immaculate", "unspoiled"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["blunt"], pos: "adj_meaning" },
    { meaning: ["club"], pos: "noun_meaning" },
    { meaning: ["dumb", "stupid", "retarded"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["down"], pos: "adv_meaning" },
    { meaning: ["go"], pos: "verb_meaning" },
    { meaning: ["collapse", "descend", "go down"], pos: "adj_meaning" },
    null,
  ],

  [
    { meaning: ["sharp"], pos: "adj_meaning" },
    {
      meaning: ["arrow", "axe", "blade", "knife", "razor", "thorn"],
      pos: "noun_meaning",
    },
    {
      meaning: ["razor-sharp", "cunning", "mentally acute"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["slow"], pos: "adj_meaning" },
    { meaning: ["snail", "slug"], pos: "noun_meaning" },
    {
      meaning: ["painfully slow", "extremely slow", "sluggish"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["soft"], pos: "adj_meaning" },
    { meaning: ["cloud", "sheep"], pos: "noun_meaning" },
    { meaning: ["as soft as a cloud", "fluffy"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["stuff"], pos: "adj_meaning" },
    { meaning: ["beam", "bolt", "book", "broom", "oar"], pos: "noun_meaning" },
    { meaning: ["rock hard", "stiff as a board"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["tall"], pos: "adj_meaning" },
    { meaning: ["crane", "cliff", "mountain", "door"], pos: "noun_meaning" },
    { meaning: ["lanky", "looming"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["violent"], pos: "adj_meaning" },
    { meaning: ["wolf", "storm"], pos: "noun_meaning" },
    {
      meaning: ["crazy", "wolf-crazy", "stark-mad", "beserk"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["loud"], pos: "adj_meaning" },
    { meaning: ["dog", "storm", "rooster"], pos: "noun_meaning" },
    {
      meaning: ["as loud as a storm", "booming", "deafening", "extremely loud"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["small"], pos: "adj_meaning" },
    {
      meaning: [
        "ant",
        "bee",
        "gnat",
        "grain",
        "louse",
        "larva",
        "maggot",
        "mouse",
        "pea",
        "pebble",
      ],
      pos: "noun_meaning",
    },
    { meaning: ["tiny", "atomic", "granular"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["thin"], pos: "adj_meaning" },
    { meaning: ["reed"], pos: "noun_meaning" },
    { meaning: ["very skinny", "rail thin", "very thin"], pos: "adj_meaning" },
    "comparison compound",
  ],

  [
    { meaning: ["over", "across", "through"], pos: "adv_meaning" },
    { meaning: ["go"], pos: "verb_meaning" },
    {
      meaning: [
        "traverse",
        "cross",
        "pass through",
        "trascend",
        "pass",
        "elapse",
      ],
      pos: "verb_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["deep"], pos: "adj_meaning" },
    { meaning: ["ocean"], pos: "noun_meaning" },
    {
      meaning: ["as deep as the ocean", "vast", "bottomless"],
      pos: "adj_meaning",
    },
    "comparison compound",
  ],

  [
    { meaning: ["put"], pos: "verb_meaning" },
    { meaning: ["together"], pos: "adv_meaning" },
    {
      meaning: ["syntax"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["shape"], pos: "noun_meaning" },
    { meaning: ["study"], pos: "noun_meaning" },
    {
      meaning: ["morphology"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["morphology"], pos: "noun_meaning" },
    { meaning: ["syntax"], pos: "noun_meaning" },
    {
      meaning: ["morphosyntax"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["morphological"], pos: "adj_meaning" },
    { meaning: ["dictionary"], pos: "noun_meaning" },
    {
      meaning: ["morphological dictionary"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["under", "after"], pos: "adp_meaning" },
    { meaning: ["put", "attach", "fix"], pos: "verb_meaning" },
    {
      meaning: ["suffix"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["above", "before"], pos: "adp_meaning" },
    { meaning: ["put", "attach", "fix"], pos: "verb_meaning" },
    {
      meaning: ["prefix"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["empty"], pos: "adj_meaning" },
    { meaning: ["prefix"], pos: "noun_meaning" },
    {
      meaning: ["zero prefix"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["fake"], pos: "adj_meaning" },
    { meaning: ["prefix"], pos: "noun_meaning" },
    {
      meaning: ["pseudoprefix"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["seperable", "detachable", "removable"], pos: "adj_meaning" },
    { meaning: ["prefix"], pos: "noun_meaning" },
    {
      meaning: ["seperable prefix"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["seperable", "detachable", "removable"], pos: "adj_meaning" },
    { meaning: ["suffix"], pos: "noun_meaning" },
    {
      meaning: ["seperable suffix"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["fake"], pos: "adj_meaning" },
    { meaning: ["suffix"], pos: "noun_meaning" },
    {
      meaning: ["pseudosuffix"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["empty"], pos: "adj_meaning" },
    { meaning: ["suffix"], pos: "noun_meaning" },
    {
      meaning: ["zero suffix"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["substantial"], pos: "adj_meaning" },
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["substantive"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["name", "thing"], pos: "noun_meaning" },
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["noun"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["describe"], pos: "verb_meaning" },
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["adjective"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["state"], pos: "noun_meaning" },
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["adjective"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["how"], pos: "pron_meaning" },
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["adjective"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["what"], pos: "pron_meaning" },
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["noun"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["do", "act"], pos: "verb_meaning" },
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["verb"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["transitive"], pos: "adj_meaning" },
    { meaning: ["verb"], pos: "noun_meaning" },
    {
      meaning: ["transitive verb"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["intransitive"], pos: "adj_meaning" },
    { meaning: ["verb"], pos: "noun_meaning" },
    {
      meaning: ["intransitive verb"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sound"], pos: "noun_meaning" },
    {
      meaning: ["consonant"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["own"], pos: "adj_meaning" },
    { meaning: ["sound"], pos: "noun_meaning" },
    {
      meaning: ["vowel"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["same"], pos: "adj_meaning" },
    { meaning: ["meaning"], pos: "noun_meaning" },
    {
      meaning: ["synonym"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["different", "opposite"], pos: "adj_meaning" },
    { meaning: ["meaning"], pos: "noun_meaning" },
    {
      meaning: ["synonym"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["same"], pos: "adj_meaning" },
    { meaning: ["sound"], pos: "noun_meaning" },
    {
      meaning: ["homophone"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["subset"], pos: "noun_meaning" },
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["hyonym"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["false", "fake", "deceptive"], pos: "noun_meaning" },
    { meaning: ["friend", "cognate"], pos: "noun_meaning" },
    {
      meaning: ["false friend"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["origin", "start", "beginning", "birth", "story", "history"],
      pos: "noun_meaning",
    },
    {
      meaning: ["etymology"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["sound"], pos: "noun_meaning" },
    { meaning: ["study"], pos: "noun_meaning" },
    {
      meaning: ["phonology"],
      pos: "noun_meaning",
    },
  ],

  [
    { meaning: ["way"], pos: "noun_meaning" },
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["adverb"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["place"], pos: "noun_meaning" },
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["adposition"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["where"], pos: "pron_meaning" },
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["adposition"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["before"], pos: "adv_meaning" },
    { meaning: ["adposition"], pos: "noun_meaning" },
    {
      meaning: ["preposition"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],

  [
    { meaning: ["after"], pos: "adv_meaning" },
    { meaning: ["adposition"], pos: "noun_meaning" },
    {
      meaning: ["postposition"],
      pos: "noun_meaning",
      themes: ["linguistics"],
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hood"], pos: "noun_meaning" },
    {
      meaning: ["hooded"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["happiness"], pos: "noun_meaning" },
    {
      meaning: ["happy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sadness"], pos: "noun_meaning" },
    {
      meaning: ["sad"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["death"], pos: "noun_meaning" },
    {
      meaning: ["dead"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["beard"], pos: "noun_meaning" },
    {
      meaning: ["bearded"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["weapon"], pos: "noun_meaning" },
    {
      meaning: ["armed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["child"], pos: "noun_meaning" },
    {
      meaning: ["pregnant"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["food"], pos: "noun_meaning" },
    {
      meaning: ["fed", "satiated"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["water"], pos: "noun_meaning" },
    {
      meaning: ["quenched"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["spouse"], pos: "noun_meaning" },
    {
      meaning: ["married"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["without"], pos: "adp_meaning" },
    { meaning: ["eye", "sight", "vision"], pos: "noun_meaning" },
    {
      meaning: ["blind", "one-eyed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["without"], pos: "adp_meaning" },
    { meaning: ["clothes", "clothing", "robe"], pos: "noun_meaning" },
    {
      meaning: ["naked", "unclothed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["without"], pos: "adp_meaning" },
    { meaning: ["weapon"], pos: "noun_meaning" },
    {
      meaning: ["unarmed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["water"], pos: "noun_meaning" },
    {
      meaning: ["quenched"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["snow"], pos: "noun_meaning" },
    {
      meaning: ["snowy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sand"], pos: "noun_meaning" },
    {
      meaning: ["sandy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["mud"], pos: "noun_meaning" },
    {
      meaning: ["muddy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["dirt"], pos: "noun_meaning" },
    {
      meaning: ["dirty"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fear", "terror"], pos: "noun_meaning" },
    {
      meaning: ["afraid", "scared"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["affliction"], pos: "noun_meaning" },
    {
      meaning: ["afflicted", "diseased", "infected"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["disability"], pos: "noun_meaning" },
    {
      meaning: ["disabled", "crippled", "lame"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["defect"], pos: "noun_meaning" },
    {
      meaning: ["defective", "faulty", "broken", "impaired"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["scratch"], pos: "noun_meaning" },
    {
      meaning: ["scratched"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["dent"], pos: "noun_meaning" },
    {
      meaning: ["dented"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["imperfection"], pos: "noun_meaning" },
    {
      meaning: ["imperfect"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["agreement"], pos: "noun_meaning" },
    {
      meaning: ["in agreement"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["attack"], pos: "noun_meaning" },
    {
      meaning: ["attacked", "injured in a fight"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["barrow"], pos: "noun_meaning" },
    {
      meaning: ["buried in a barrow"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bead"], pos: "noun_meaning" },
    {
      meaning: ["beaded"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bed"], pos: "noun_meaning" },
    {
      meaning: ["sleeping", "asleep"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["belt"], pos: "noun_meaning" },
    {
      meaning: ["belted"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["blister"], pos: "noun_meaning" },
    {
      meaning: ["blistered", "covered in blisters"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["border"], pos: "noun_meaning" },
    {
      meaning: ["bordered"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["brain"], pos: "noun_meaning" },
    {
      meaning: ["smart", "intelligent", "clever", "cunning"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["letter"], pos: "noun_meaning" },
    {
      meaning: [
        "literate",
        "written",
        "put to paper",
        "written down",
        "recorded",
      ],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bone"], pos: "noun_meaning" },
    {
      meaning: ["boney"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["boot"], pos: "noun_meaning" },
    {
      meaning: ["wearing boots"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bowstring"], pos: "noun_meaning" },
    {
      meaning: ["strung"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["branch"], pos: "noun_meaning" },
    {
      meaning: ["branching", "diverging", "divergant", "secondary"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["breath"], pos: "noun_meaning" },
    {
      meaning: ["alive", "breathing", "extant"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bristle"], pos: "noun_meaning" },
    {
      meaning: ["bristled", "bristly"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["brother"], pos: "noun_meaning" },
    {
      meaning: ["fraternal"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["culture"], pos: "noun_meaning" },
    {
      meaning: ["cultural", "cultured"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["building"], pos: "noun_meaning" },
    {
      meaning: ["built on", "built up"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bush"], pos: "noun_meaning" },
    {
      meaning: ["bushy", "(of land), covered in vegetation"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["cage"], pos: "noun_meaning" },
    {
      meaning: ["caged", "imprisoned", "captive"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["chair"], pos: "noun_meaning" },
    {
      meaning: ["sitting down", "seated"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["horse"], pos: "noun_meaning" },
    {
      meaning: ["on a horse", "mounted on a horse"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["horse"], pos: "noun_meaning" },
    {
      meaning: ["on horseback"],
      pos: "adv_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["circle"], pos: "noun_meaning" },
    {
      meaning: ["circled", "surrounded"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["cheer"], pos: "noun_meaning" },
    {
      meaning: ["cheery", "giddy", "excited"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["clan"], pos: "noun_meaning" },
    {
      meaning: ["being a member of a clan"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["clan"], pos: "noun_meaning" },
    {
      meaning: ["being a member of a clan"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["cow"], pos: "noun_meaning" },
    {
      meaning: ["owning cattle"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["pain"], pos: "noun_meaning" },
    {
      meaning: ["in pain", "hurting", "suffering"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["confession"], pos: "noun_meaning" },
    {
      meaning: ["ready to confess", "having a confession"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["coma"], pos: "noun_meaning" },
    {
      meaning: ["in a coma", "comatose"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["cradle"], pos: "noun_meaning" },
    {
      meaning: ["infantile", "baby-like", "pertaining to babies"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["crack"], pos: "noun_meaning" },
    {
      meaning: ["cracked", "shattered"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["crease"], pos: "noun_meaning" },
    {
      meaning: ["creased"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["mind"], pos: "noun_meaning" },
    {
      meaning: ["mental", "mindful", "thoughtful"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["crime", "criminal"], pos: "noun_meaning" },
    {
      meaning: ["criminal"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["crowd"], pos: "noun_meaning" },
    {
      meaning: ["crowded"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["crown"], pos: "noun_meaning" },
    {
      meaning: ["royal", "regal"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["cup"], pos: "noun_meaning" },
    {
      meaning: ["(of drinks), served"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["curve"], pos: "noun_meaning" },
    {
      meaning: ["curvy", "curved"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["dawn"], pos: "noun_meaning" },
    {
      meaning: ["at dawn", "in the morning"],
      pos: "adv_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["day"], pos: "noun_meaning" },
    {
      meaning: ["at day", "during the day"],
      pos: "adv_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["dinner"], pos: "noun_meaning" },
    {
      meaning: ["at dinner", "during dinner"],
      pos: "adv_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["shepherd"], pos: "noun_meaning" },
    {
      meaning: ["under a shepehrd's watch"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sunstroke"], pos: "noun_meaning" },
    {
      meaning: ["suffering from suntroke"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["calf"], pos: "noun_meaning" },
    {
      meaning: ["(of cows), pregnant"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["udder"], pos: "noun_meaning" },
    {
      meaning: ["(of calves), unweaned"],
      pos: "adj_meaning",
    },
  ],

  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["emptiness"], pos: "noun_meaning" },
    {
      meaning: ["empty"],
      pos: "adj_meaning",
    },
  ],

  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["desolation"], pos: "noun_meaning" },
    {
      meaning: ["desolate"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["solitude"], pos: "noun_meaning" },
    {
      meaning: ["alone", "lone", "lonely", "solitary"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["donkey"], pos: "noun_meaning" },
    {
      meaning: ["by donkey", "on a donkey's back"],
      pos: "adv_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["dream"], pos: "noun_meaning" },
    {
      meaning: ["dreaming", "alseep", "sleeping"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["emotion"], pos: "noun_meaning" },
    {
      meaning: ["emotional", "emotive"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["enemy"], pos: "noun_meaning" },
    {
      meaning: ["having enemies", "in a conflict", "at war"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["favour"], pos: "noun_meaning" },
    {
      meaning: ["favourable", "favoured"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fence"], pos: "noun_meaning" },
    {
      meaning: ["fenced in", "fenced off"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["festival"], pos: "noun_meaning" },
    {
      meaning: ["festive", "celebrating"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["field"], pos: "noun_meaning" },
    {
      meaning: ["absent", "gone", "away", "(of farmers), owning land"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fish hook"], pos: "noun_meaning" },
    {
      meaning: ["(of fish), caught on hook"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fist"], pos: "noun_meaning" },
    {
      meaning: ["clenching ones fist", "angry", "ready to fight"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["flower"], pos: "noun_meaning" },
    {
      meaning: ["blossiming"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["flow"], pos: "noun_meaning" },
    {
      meaning: ["flowing"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["horse-reigns"], pos: "noun_meaning" },
    {
      meaning: ["(of horses), weiring reigns"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fold"], pos: "noun_meaning" },
    {
      meaning: ["folded"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sugar"], pos: "noun_meaning" },
    {
      meaning: ["sugary", "sweet"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["coast"], pos: "noun_meaning" },
    {
      meaning: ["coastal", "by the coast"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["moss"], pos: "noun_meaning" },
    {
      meaning: ["mossy", "covered in moss"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["friend"], pos: "noun_meaning" },
    {
      meaning: [
        "having friends",
        "accompanied by friends",
        "not alone",
        "in good company",
      ],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["gate"], pos: "noun_meaning" },
    {
      meaning: ["gated off", "secured", "exclusive"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fortification"], pos: "noun_meaning" },
    {
      meaning: ["fortified"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["gift"], pos: "noun_meaning" },
    {
      meaning: ["bearing gifts"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fruit"], pos: "noun_meaning" },
    {
      meaning: ["fruit"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["glove"], pos: "noun_meaning" },
    {
      meaning: ["gloved"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["liquid"], pos: "noun_meaning" },
    {
      meaning: ["liquid", "wet", "saturated", "soaked"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["god"], pos: "noun_meaning" },
    {
      meaning: ["divine", "holy", "godly", "sacred"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["group"], pos: "noun_meaning" },
    {
      meaning: ["not alone", "accompanied"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hand"], pos: "noun_meaning" },
    {
      meaning: ["helpful", "of help", "assisting", "of use", "useful"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["handle"], pos: "noun_meaning" },
    {
      meaning: ["having a handle"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fool"], pos: "noun_meaning" },
    {
      meaning: ["stupid", "silly"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hat"], pos: "noun_meaning" },
    {
      meaning: ["wearing a hat"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["heart"], pos: "noun_meaning" },
    {
      meaning: ["dear", "lovely", "heartfelt", "romantic", "truly", "honestly"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["height"], pos: "noun_meaning" },
    {
      meaning: ["tall"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["helmet"], pos: "noun_meaning" },
    {
      meaning: ["wearing a helmet"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hill"], pos: "noun_meaning" },
    {
      meaning: ["hilly", "on a hill", "near a hill"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hole"], pos: "noun_meaning" },
    {
      meaning: ["covered in holes", "punctured", "pierced", "stabbed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["home"], pos: "noun_meaning" },
    {
      meaning: ["at home", "in home", "familiar", "homely"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hoof"], pos: "noun_meaning" },
    {
      meaning: ["hoofed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["honour"], pos: "noun_meaning" },
    {
      meaning: ["honourable"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["horn"], pos: "noun_meaning" },
    {
      meaning: ["horned"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hostage"], pos: "noun_meaning" },
    {
      meaning: ["having hostages"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["house"], pos: "noun_meaning" },
    {
      meaning: ["having a house", "owning a house"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hug"], pos: "noun_meaning" },
    {
      meaning: ["hugged"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["husband"], pos: "noun_meaning" },
    {
      meaning: ["(of women), married"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["island"], pos: "noun_meaning" },
    {
      meaning: ["insular", "on an island"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["jewel"], pos: "noun_meaning" },
    {
      meaning: ["bejewelled", "covered in jewels", "adorned with jewels"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["journey"], pos: "noun_meaning" },
    {
      meaning: ["on a journey", "en route"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["king"], pos: "noun_meaning" },
    {
      meaning: ["monarchial", "having a king"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["knife"], pos: "noun_meaning" },
    {
      meaning: ["armed with a knife"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["lamb"], pos: "noun_meaning" },
    {
      meaning: ["(of sheep), pregnant", "lambing"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["land"], pos: "noun_meaning" },
    {
      meaning: ["on land", "owning land", "landed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["language"], pos: "noun_meaning" },
    {
      meaning: ["lingual"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["laugh"], pos: "noun_meaning" },
    {
      meaning: ["laughing", "funny", "humorous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["leaf"], pos: "noun_meaning" },
    {
      meaning: ["bearing leaves"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["louse"], pos: "noun_meaning" },
    {
      meaning: ["infested with lice"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["maggot"], pos: "noun_meaning" },
    {
      meaning: ["dead", "rotting", "decomposing", "decaying"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["lichen"], pos: "noun_meaning" },
    {
      meaning: ["covered in lichen"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bog"], pos: "noun_meaning" },
    {
      meaning: ["boggy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["river"], pos: "noun_meaning" },
    {
      meaning: ["(of land), having a river flowing through"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["stream"], pos: "noun_meaning" },
    {
      meaning: ["(of land), having a stream flowing through"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["mountain"], pos: "noun_meaning" },
    {
      meaning: ["mountainous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["forest"], pos: "noun_meaning" },
    {
      meaning: ["forested"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["ice"], pos: "noun_meaning" },
    {
      meaning: ["icy", "covered in ice", "frozen", "frozen over"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["oak"], pos: "noun_meaning" },
    {
      meaning: ["oaken", "(of forests), having oak trees"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["man"], pos: "noun_meaning" },
    {
      meaning: ["accompanied"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["worm"], pos: "noun_meaning" },
    {
      meaning: ["(of fish hooks), baited"],
      pos: "adj_meaning",
      themes: ["fishing"],
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fish"], pos: "noun_meaning" },
    {
      meaning: ["(of fish hooks and traps), having caught a fish"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["weevil"], pos: "noun_meaning" },
    {
      meaning: ["(of granaries), infested"],
      pos: "adj_meaning",
      themes: ["agricultural"],
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["marsh"], pos: "noun_meaning" },
    {
      meaning: ["marshy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["master"], pos: "noun_meaning" },
    {
      meaning: ["in servitude", "subject", "serving another"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["memory"], pos: "noun_meaning" },
    {
      meaning: ["remembering"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["meteor"], pos: "noun_meaning" },
    {
      meaning: ["about to be struck with a meteor"],
      pos: "adj_meaning",
      themes: ["space-faring"],
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["mirror"], pos: "noun_meaning" },
    {
      meaning: ["reflective"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["crag"], pos: "noun_meaning" },
    {
      meaning: ["craggy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bluff"], pos: "noun_meaning" },
    {
      meaning: ["bluffing", "lying"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["glacier"], pos: "noun_meaning" },
    {
      meaning: ["(of land), covered in glaciers"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["crow", "raven"], pos: "noun_meaning" },
    {
      meaning: ["dead", "dying"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["muscle"], pos: "noun_meaning" },
    {
      meaning: ["strong", "muscular"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["mouse", "rat", "vermin", "rodent"], pos: "noun_meaning" },
    {
      meaning: ["infested with mice"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["mouth"], pos: "noun_meaning" },
    {
      meaning: ["oral"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sea", "ocean", "shark"], pos: "noun_meaning" },
    {
      meaning: ["dead at sea"],
      pos: "adj_meaning",
      themes: ["sea-faring"],
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["tide"], pos: "noun_meaning" },
    {
      meaning: ["tidal"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["barnacle"], pos: "noun_meaning" },
    {
      meaning: ["covered in barnacles"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["nail"], pos: "noun_meaning" },
    {
      meaning: ["nailed", "nailed down", "covered in nails"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["name"], pos: "noun_meaning" },
    {
      meaning: [
        "named",
        "known",
        "labelled",
        "recognised",
        "identified",
        "categorised",
        "considered",
      ],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["neighbour"], pos: "noun_meaning" },
    {
      meaning: ["having neighbours"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["noon"], pos: "noun_meaning" },
    {
      meaning: ["at noon"],
      pos: "adv_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["notch"], pos: "noun_meaning" },
    {
      meaning: ["notched"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["oath"], pos: "noun_meaning" },
    {
      meaning: ["under oath"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["pebble"], pos: "noun_meaning" },
    {
      meaning: ["covered in pebbles"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["acid"], pos: "noun_meaning" },
    {
      meaning: ["acidic"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["path"], pos: "noun_meaning" },
    {
      meaning: ["directed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["penis"], pos: "noun_meaning" },
    {
      meaning: ["male"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["pin"], pos: "noun_meaning" },
    {
      meaning: ["pinned", "covered in pins"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["place"], pos: "noun_meaning" },
    {
      meaning: ["located", "situated"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["plank"], pos: "noun_meaning" },
    {
      meaning: ["boaarded up", "made of planks", "(of buildings), wooden"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["poem"], pos: "noun_meaning" },
    {
      meaning: ["poetic"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["point"], pos: "noun_meaning" },
    {
      meaning: ["pointed", "sharp"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["prayer"], pos: "noun_meaning" },
    {
      meaning: ["praying", "in someone's prayers"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["pot"], pos: "noun_meaning" },
    {
      meaning: ["cooking", "relating to kitchens"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["priest"], pos: "noun_meaning" },
    {
      meaning: ["priestly", "in the direction of a priest"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["price"], pos: "noun_meaning" },
    {
      meaning: ["for sale"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["prize"], pos: "noun_meaning" },
    {
      meaning: ["prized", "victorious", "winning"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["prblem"], pos: "noun_meaning" },
    {
      meaning: ["problematic", "worrisome"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["projection"], pos: "noun_meaning" },
    {
      meaning: ["projected", "peojected onto"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["proverb"], pos: "noun_meaning" },
    {
      meaning: ["proverbial", "knowing many proverbs", "wise"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["puppy"], pos: "noun_meaning" },
    {
      meaning: ["(of dogs), pregnant"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["purchase"], pos: "noun_meaning" },
    {
      meaning: ["purchased", "for sale"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["horse-bit"], pos: "noun_meaning" },
    {
      meaning: ["(of horses), wearing a horse-bit"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["realm"], pos: "noun_meaning" },
    {
      meaning: ["(of leaders), ruling", "in power"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["relation"], pos: "noun_meaning" },
    {
      meaning: ["related"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["egg"], pos: "noun_meaning" },
    {
      meaning: ["egg-laden", "gravid"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["silt"], pos: "noun_meaning" },
    {
      meaning: ["silty"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["room"], pos: "noun_meaning" },
    {
      meaning: ["roomy", "vacant"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["debt"], pos: "noun_meaning" },
    {
      meaning: ["in debt"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["rule"], pos: "noun_meaning" },
    {
      meaning: ["having rules", "legal", "lawful", "law-abiding"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["map", "chart"], pos: "noun_meaning" },
    {
      meaning: ["mapped", "charted", "having a map", "knowing where one is"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["without"], pos: "adp_meaning" },
    { meaning: ["map", "chart"], pos: "noun_meaning" },
    {
      meaning: ["unmapped", "uncharted", "not having a map", "lost"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["cargo"], pos: "noun_meaning" },
    {
      meaning: ["bearing cargo"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["scent"], pos: "noun_meaning" },
    {
      meaning: ["smelly", "scented", "odourous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["book", "pen", "quill"], pos: "noun_meaning" },
    {
      meaning: [
        "literate",
        "owning books",
        "recorded",
        "historical",
        "official",
        "clerical",
        "proper",
        "factual",
        "correct",
        "(of libraries, bookshelves), stocked",
      ],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["ink", "pen", "quill"], pos: "noun_meaning" },
    {
      meaning: ["inky", "covered in ink", "drawn", "written down", "sketched"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["story"], pos: "noun_meaning" },
    {
      meaning: ["having many stories to tell", "excusable", "explainable"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["graph"], pos: "noun_meaning" },
    {
      meaning: ["graphical", "adorned with graphs"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["word"], pos: "noun_meaning" },
    {
      meaning: ["verbal", "speaking", "talkative", "literal", "by word"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["calligraphy"], pos: "noun_meaning" },
    {
      meaning: ["calligraphic"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["literature"], pos: "noun_meaning" },
    {
      meaning: ["literate", "having a rich literature"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["inscription"], pos: "noun_meaning" },
    {
      meaning: ["inscribed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["alphabet"], pos: "noun_meaning" },
    {
      meaning: ["alphabetic"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["margin"], pos: "noun_meaning" },
    {
      meaning: ["marginal", "in the margins"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["archive"], pos: "noun_meaning" },
    {
      meaning: ["archived", "having an archive"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["record"], pos: "noun_meaning" },
    {
      meaning: ["on record"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["saliva"], pos: "noun_meaning" },
    {
      meaning: ["drooling", "salivating"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sweat"], pos: "noun_meaning" },
    {
      meaning: ["sweaty", "soaked in sweat"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hormone"], pos: "noun_meaning" },
    {
      meaning: ["hormonal"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["palate"], pos: "noun_meaning" },
    {
      meaning: ["palatal"],
      pos: "adj_meaning",
      themes: ["linguistics"],
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hair"], pos: "noun_meaning" },
    {
      meaning: ["hairy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["skin"], pos: "noun_meaning" },
    {
      meaning: ["(of slain animals), unskinned"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["tooth"], pos: "noun_meaning" },
    {
      meaning: ["toothed", "having teeth", "baring teeth", "snarling"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["blood"], pos: "noun_meaning" },
    {
      meaning: [
        "blooded",
        "alive",
        "covered in blood",
        "having killed a man",
        "experienced in combat",
        "brutal",
        "violent",
      ],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["shadow"], pos: "noun_meaning" },
    {
      meaning: ["shadow-casting", "shaded"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sea"], pos: "noun_meaning" },
    {
      meaning: ["at sea", "maritime"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["seed"], pos: "noun_meaning" },
    {
      meaning: ["seeded"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sheath"], pos: "noun_meaning" },
    {
      meaning: ["sheathed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["shield"], pos: "noun_meaning" },
    {
      meaning: ["shielded", "protected"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["shoe"], pos: "noun_meaning" },
    {
      meaning: ["wearing shoes", "shod"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["shroud"], pos: "noun_meaning" },
    {
      meaning: ["shrouded", "obscure", "niche", "unknown"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["slit", "slot"], pos: "noun_meaning" },
    {
      meaning: ["slit", "sliced"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["song"], pos: "noun_meaning" },
    {
      meaning: ["musical", "melodic", "able to sing"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sound"], pos: "noun_meaning" },
    {
      meaning: ["noisy", "loud"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["peat"], pos: "noun_meaning" },
    {
      meaning: ["peaty"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["spell"], pos: "noun_meaning" },
    {
      meaning: ["under a spell", "enchanted"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["spirit"], pos: "noun_meaning" },
    {
      meaning: [
        "alive",
        "lively",
        "eager",
        "willing",
        "spirited",
        "fierce",
        "excited",
        "dynamic",
      ],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["spike"], pos: "noun_meaning" },
    {
      meaning: ["spiked", "spikey"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["ability"], pos: "noun_meaning" },
    {
      meaning: ["able, apt"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["abundance"], pos: "noun_meaning" },
    {
      meaning: ["abundant"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["accident"], pos: "noun_meaning" },
    {
      meaning: ["accidental"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["activity"], pos: "noun_meaning" },
    {
      meaning: ["active"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["advantage"], pos: "noun_meaning" },
    {
      meaning: ["advantageous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["advice"], pos: "noun_meaning" },
    {
      meaning: ["advised"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["afterworld"], pos: "noun_meaning" },
    {
      meaning: ["dead", "deceased"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["age"], pos: "noun_meaning" },
    {
      meaning: ["old", "elderly"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["agitation"], pos: "noun_meaning" },
    {
      meaning: ["agitated"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["alloy"], pos: "noun_meaning" },
    {
      meaning: ["made of alloy"],
      pos: "noun_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["annotation"], pos: "noun_meaning" },
    {
      meaning: ["annotated"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["appetite"], pos: "noun_meaning" },
    {
      meaning: ["hungry"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["arrogance"], pos: "noun_meaning" },
    {
      meaning: ["arrogant"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["assistant"], pos: "noun_meaning" },
    {
      meaning: ["assisted"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["battle"], pos: "noun_meaning" },
    {
      meaning: ["warlike", "battle-hardy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["beak"], pos: "noun_meaning" },
    {
      meaning: ["beaked"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bedbug"], pos: "noun_meaning" },
    {
      meaning: ["infested with bedbugs"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["beer"], pos: "noun_meaning" },
    {
      meaning: ["drunk"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["birth"], pos: "noun_meaning" },
    {
      meaning: ["born"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["body"], pos: "noun_meaning" },
    {
      meaning: ["corporeal"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bolt"], pos: "noun_meaning" },
    {
      meaning: ["bolted", "locked"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bottle"], pos: "noun_meaning" },
    {
      meaning: ["bottled"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bread"], pos: "noun_meaning" },
    {
      meaning: ["satiated"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bridge"], pos: "noun_meaning" },
    {
      meaning: ["bridged", "forded"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["bully"], pos: "noun_meaning" },
    {
      meaning: ["bullied"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["burden"], pos: "noun_meaning" },
    {
      meaning: ["burdened"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["butter"], pos: "noun_meaning" },
    {
      meaning: ["buttered"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["captivity"], pos: "noun_meaning" },
    {
      meaning: ["captive", "in captivity"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["cash"], pos: "noun_meaning" },
    {
      meaning: ["rich", "wealthy", "well off"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["cause"], pos: "noun_meaning" },
    {
      meaning: ["excused", "prompted", "forced", "caused"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["childbirth"], pos: "noun_meaning" },
    {
      meaning: ["in labour", "giving birth"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["clock", "time", "hour"], pos: "noun_meaning" },
    {
      meaning: ["on time", "timely"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["cloud"], pos: "noun_meaning" },
    {
      meaning: ["cloudy", "clouded"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["confusion"], pos: "noun_meaning" },
    {
      meaning: ["confused"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["corpse"], pos: "noun_meaning" },
    {
      meaning: ["dead"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["danger"], pos: "noun_meaning" },
    {
      meaning: ["dangerous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["daydream"], pos: "noun_meaning" },
    {
      meaning: ["daydreaming", "distracted", "deluded", "delusional"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["deceit"], pos: "noun_meaning" },
    {
      meaning: ["deceitful", "deceptive"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["deed"], pos: "noun_meaning" },
    {
      meaning: ["done", "completed", "experienced"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["dependant"], pos: "noun_meaning" },
    {
      meaning: ["responsible for someone"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["designation"], pos: "noun_meaning" },
    {
      meaning: ["designated"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["desolation"], pos: "noun_meaning" },
    {
      meaning: ["desolated", "barren"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["destiny"], pos: "noun_meaning" },
    {
      meaning: ["destined", "fated", "glorious"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["dew"], pos: "noun_meaning" },
    {
      meaning: ["covered in dew"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["diabetes"], pos: "noun_meaning" },
    {
      meaning: ["diabetic"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["dictionary"], pos: "noun_meaning" },
    {
      meaning: ["verbose", "well-spoken", "eloquent"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["dignity"], pos: "noun_meaning" },
    {
      meaning: ["dignified", "noble"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["disaster"], pos: "noun_meaning" },
    {
      meaning: ["disastrous", "awful", "bad"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["disgrace"], pos: "noun_meaning" },
    {
      meaning: ["disgraced", "disgraceful", "shameful"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["dispute"], pos: "noun_meaning" },
    {
      meaning: ["in dispute", "in conflict", "conflicted"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["drama"], pos: "noun_meaning" },
    {
      meaning: ["dramatic", "over the top", "exagerated"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["dream"], pos: "noun_meaning" },
    {
      meaning: ["dreamy", "unreal", "psychodelic", "confusing"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["dust"], pos: "noun_meaning" },
    {
      meaning: ["dusty", "covered in dust"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["education"], pos: "noun_meaning" },
    {
      meaning: [
        "educated",
        "educational",
        "learned",
        "scholarly",
        "in education",
      ],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["electricity"], pos: "noun_meaning" },
    {
      meaning: ["electric"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["encyclopedia"], pos: "noun_meaning" },
    {
      meaning: ["bookish", "smart", "knowledgable", "well-read", "well-versed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["end"], pos: "noun_meaning" },
    {
      meaning: ["finite"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["envy"], pos: "noun_meaning" },
    {
      meaning: ["envious", "jealous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["epilepsy"], pos: "noun_meaning" },
    {
      meaning: ["epileptic"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["error"], pos: "noun_meaning" },
    {
      meaning: ["erronious", "wrong", "incorrect", "mistaken"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["eruption"], pos: "noun_meaning" },
    {
      meaning: ["explosive"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["evening"], pos: "noun_meaning" },
    {
      meaning: ["in the evening"],
      pos: "adv_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["evil"], pos: "noun_meaning" },
    {
      meaning: ["evil", "bad"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["excitement"], pos: "noun_meaning" },
    {
      meaning: ["excited", "giddy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["expectation"], pos: "noun_meaning" },
    {
      meaning: ["expectant"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["family"], pos: "noun_meaning" },
    {
      meaning: ["having a family", "familial"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fang"], pos: "noun_meaning" },
    {
      meaning: ["fanged"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["feather"], pos: "noun_meaning" },
    {
      meaning: ["feathered", "downy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fertilizer"], pos: "noun_meaning" },
    {
      meaning: ["fertilized"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fibre"], pos: "noun_meaning" },
    {
      meaning: ["fibrous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fin"], pos: "noun_meaning" },
    {
      meaning: ["finned"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fire"], pos: "noun_meaning" },
    {
      meaning: ["on fire", "burning", "hot", "ablaze"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["firearm"], pos: "noun_meaning" },
    {
      meaning: ["armed with a gun"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["first"], pos: "noun_meaning" },
    {
      meaning: ["primary"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["flattery"], pos: "noun_meaning" },
    {
      meaning: [
        "charming",
        "suave",
        "flattering",
        "complementive",
        "sweet-talking",
      ],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["flank"], pos: "noun_meaning" },
    {
      meaning: ["flanked"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["flea"], pos: "noun_meaning" },
    {
      meaning: ["flea-ridden", "infested with fleas", "plagued"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["flood"], pos: "noun_meaning" },
    {
      meaning: [
        "flooded",
        "underwater",
        "(of bodies of water)",
        "having burst banks",
      ],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["floor"], pos: "noun_meaning" },
    {
      meaning: ["foundational", "grounded", "based"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fly"], pos: "noun_meaning" },
    {
      meaning: ["infested with flies", "rotten", "dead", "poor in quality"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["foal"], pos: "noun_meaning" },
    {
      meaning: ["(of deer)", "pregnant"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fog"], pos: "noun_meaning" },
    {
      meaning: ["foggy", "obscured by fog"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["food"], pos: "noun_meaning" },
    {
      meaning: [
        "well fed",
        "(of stomachs)",
        "full",
        "(of pantries)",
        "stocked up",
      ],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["food ready to be eaten"], pos: "noun_meaning" },
    {
      meaning: ["having been served with food"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["food stores"], pos: "noun_meaning" },
    {
      meaning: ["stocked up on food"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["footprint"], pos: "noun_meaning" },
    {
      meaning: ["evidenced", "deduced"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fork"], pos: "noun_meaning" },
    {
      meaning: ["forked", "divergant"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["freckle"], pos: "noun_meaning" },
    {
      meaning: ["freckled"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fraud"], pos: "noun_meaning" },
    {
      meaning: ["fraudulent", "fake", "false"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fur"], pos: "noun_meaning" },
    {
      meaning: ["furry", "draped in furs"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["fuel"], pos: "noun_meaning" },
    {
      meaning: ["fuelled up"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["game"], pos: "noun_meaning" },
    {
      meaning: ["playful", "puzzling", "confusing"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["ghost"], pos: "noun_meaning" },
    {
      meaning: ["ghostly", "supernatural", "haunted"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["girth"], pos: "noun_meaning" },
    {
      meaning: ["girthy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["glue"], pos: "noun_meaning" },
    {
      meaning: ["covered in glue", "bound by glue"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["gold"], pos: "noun_meaning" },
    {
      meaning: ["golden", "gilden", "shimmering", "glistening", "yellow"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["grace"], pos: "noun_meaning" },
    {
      meaning: ["graceful"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["grave"], pos: "noun_meaning" },
    {
      meaning: ["dead", "buried", "macabre"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["grief"], pos: "noun_meaning" },
    {
      meaning: ["in grief", "grieving", "mournful", "grevious"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["groove"], pos: "noun_meaning" },
    {
      meaning: ["grooved", "groovy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["guest"], pos: "noun_meaning" },
    {
      meaning: ["hosting a guest", "hospitible"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hardship"], pos: "noun_meaning" },
    {
      meaning: ["poor", "depraved", "troubled", "worn down", "impoverished"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["health"], pos: "noun_meaning" },
    {
      meaning: ["healthy", "in good health"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["heat"], pos: "noun_meaning" },
    {
      meaning: ["hot"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["herald"], pos: "noun_meaning" },
    {
      meaning: ["heralded"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hinge"], pos: "noun_meaning" },
    {
      meaning: ["hinged"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["history"], pos: "noun_meaning" },
    {
      meaning: ["historic", "rich in history"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["honey"], pos: "noun_meaning" },
    {
      meaning: ["sweet", "lovely", "nice"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["horizon"], pos: "noun_meaning" },
    {
      meaning: ["on the horizon", "distant", "far away"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["host"], pos: "noun_meaning" },
    {
      meaning: ["recieving hospitality", "welcomed", "recieved"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["hostility"], pos: "noun_meaning" },
    {
      meaning: ["hostile", "agressive"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["idea"], pos: "noun_meaning" },
    {
      meaning: ["inspired", "having an idea"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["idiot"], pos: "noun_meaning" },
    {
      meaning: ["idiotic", "stupid", "foolish", "silly"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["intellect", "intelligence"], pos: "noun_meaning" },
    {
      meaning: ["smart", "clever", "intelligent"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["intention"], pos: "noun_meaning" },
    {
      meaning: ["intent", "purposeful", "driven", "motivated"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["intrigue"], pos: "noun_meaning" },
    {
      meaning: ["intriguing", "interesting", "captivating"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["joke"], pos: "noun_meaning" },
    {
      meaning: ["funny", "unserious", "humerous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["juice"], pos: "noun_meaning" },
    {
      meaning: ["juicy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["knife"], pos: "noun_meaning" },
    {
      meaning: ["armed with  knife"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["knot"], pos: "noun_meaning" },
    {
      meaning: ["knotted"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["lard"], pos: "noun_meaning" },
    {
      meaning: ["fatty", "rich in fat", "greasy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["laziness"], pos: "noun_meaning" },
    {
      meaning: ["lazy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["lid"], pos: "noun_meaning" },
    {
      meaning: ["covered", "sealed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["life"], pos: "noun_meaning" },
    {
      meaning: ["alive", "living", "extant"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["light"], pos: "noun_meaning" },
    {
      meaning: ["bright", "illuminated", "enlightened", "lit up"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["lightning"], pos: "noun_meaning" },
    {
      meaning: ["stormy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["likeness"], pos: "noun_meaning" },
    {
      meaning: ["similar"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["literacy"], pos: "noun_meaning" },
    {
      meaning: ["literate"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["liver"], pos: "noun_meaning" },
    {
      meaning: ["courageous", "healthy", "alive"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["luck"], pos: "noun_meaning" },
    {
      meaning: ["lucky", "fortunate"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["magic"], pos: "noun_meaning" },
    {
      meaning: ["magic", "magical", "supernatural", "wonderful", "amazing"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["magnet"], pos: "noun_meaning" },
    {
      meaning: ["magnetic"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["marriage"], pos: "noun_meaning" },
    {
      meaning: ["married"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["material"], pos: "noun_meaning" },
    {
      meaning: ["real", "material"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["meander"], pos: "noun_meaning" },
    {
      meaning: ["meandering", "wavy", "flexible", "bendy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["meaning"], pos: "noun_meaning" },
    {
      meaning: ["meaningful", "intent"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["measles"], pos: "noun_meaning" },
    {
      meaning: ["infected with measels"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["meat"], pos: "noun_meaning" },
    {
      meaning: ["meaty", "muscular", "fleshy", "substantial"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["medicine"], pos: "noun_meaning" },
    {
      meaning: ["taking medicine"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["melancholy"], pos: "noun_meaning" },
    {
      meaning: ["melancholic"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["melody"], pos: "noun_meaning" },
    {
      meaning: ["melodic"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["method"], pos: "noun_meaning" },
    {
      meaning: ["methodical", "planned", "intentional"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["menstruation"], pos: "noun_meaning" },
    {
      meaning: ["menstruating", "one ones period"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["miracle"], pos: "noun_meaning" },
    {
      meaning: ["miraculuous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["misfortune"], pos: "noun_meaning" },
    {
      meaning: ["misfortunate", "unlucky", "down on ones luck"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["mistress"], pos: "noun_meaning" },
    {
      meaning: ["having an affair", "adulterous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["mold"], pos: "noun_meaning" },
    {
      meaning: ["cast in a mould"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["moon"], pos: "noun_meaning" },
    {
      meaning: ["lunar"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["moustache"], pos: "noun_meaning" },
    {
      meaning: ["having a moustache"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["mucus"], pos: "noun_meaning" },
    {
      meaning: ["covered in mucus"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["nation"], pos: "noun_meaning" },
    {
      meaning: ["national"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["nausea"], pos: "noun_meaning" },
    {
      meaning: ["nauseous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["nature"], pos: "noun_meaning" },
    {
      meaning: ["natural"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["nerve"], pos: "noun_meaning" },
    {
      meaning: ["nervous", "sensitive", "anxious", "perceptive"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["nest"], pos: "noun_meaning" },
    {
      meaning: ["nesting", "brooding", "maternal"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["news"], pos: "noun_meaning" },
    {
      meaning: ["bearing news"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["noise"], pos: "noun_meaning" },
    {
      meaning: ["noisy", "loud", "jarring"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["nonsense"], pos: "noun_meaning" },
    {
      meaning: ["nonsensical", "stupid", "silly", "dumb", "unserious"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["offspring"], pos: "noun_meaning" },
    {
      meaning: ["ancestral"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["oil"], pos: "noun_meaning" },
    {
      meaning: ["oily", "greasy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["ointment"], pos: "noun_meaning" },
    {
      meaning: ["smeared in ointment", "annointed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["omen"], pos: "noun_meaning" },
    {
      meaning: ["omenous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["orbit"], pos: "noun_meaning" },
    {
      meaning: ["in orbit"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["order"], pos: "noun_meaning" },
    {
      meaning: ["orderly", "ordered", "in order"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["outcome"], pos: "noun_meaning" },
    {
      meaning: ["resulting", "concluded"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["owner"], pos: "noun_meaning" },
    {
      meaning: ["owned"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["pair"], pos: "noun_meaning" },
    {
      meaning: ["in pairs", "two-by-two", "in twos"],
      pos: "adv_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["paradise"], pos: "noun_meaning" },
    {
      meaning: ["serene", "paradisical", "heavenly"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["parasite"], pos: "noun_meaning" },
    {
      meaning: ["infested with parasites", "parasite-ridden"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["parliament"], pos: "noun_meaning" },
    {
      meaning: ["parliamentary"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["part"], pos: "noun_meaning" },
    {
      meaning: ["partial", "partially equipt", "not fully"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["partner"], pos: "noun_meaning" },
    {
      meaning: ["partnered up", "accompanied"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["passion"], pos: "noun_meaning" },
    {
      meaning: ["passionate"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["patience"], pos: "noun_meaning" },
    {
      meaning: ["patient"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["payment"], pos: "noun_meaning" },
    {
      meaning: ["paid", "in receipt", "employed", "hired"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["peer"], pos: "noun_meaning" },
    {
      meaning: ["equal", "matched", "amongst peers"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["penalty"], pos: "noun_meaning" },
    {
      meaning: ["punished"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["perception"], pos: "noun_meaning" },
    {
      meaning: ["perceptive", "percieved", "noticed", "noticable"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["perfume"], pos: "noun_meaning" },
    {
      meaning: ["perfumed", "scented", "pleasant smelling"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["periphery"], pos: "noun_meaning" },
    {
      meaning: ["peripheral"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["picture"], pos: "noun_meaning" },
    {
      meaning: ["pictured", "painted", "photographed", "recorded", "imaged"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["pike"], pos: "noun_meaning" },
    {
      meaning: ["skewered", "impaled"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["pillow"], pos: "noun_meaning" },
    {
      meaning: ["asleep", "sleeping", "resting", "restful", "at rest"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["plastic"], pos: "noun_meaning" },
    {
      meaning: ["plastic", "made of plastic"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["pleasure"], pos: "noun_meaning" },
    {
      meaning: ["pleasant", "nice", "enjoyable", "nice"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["plough"], pos: "noun_meaning" },
    {
      meaning: ["ploughed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["poison"], pos: "noun_meaning" },
    {
      meaning: ["poisoned", "dangerous", "sickening", "disgusting"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["porridge"], pos: "noun_meaning" },
    {
      meaning: ["fed", "served with food"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["powder"], pos: "noun_meaning" },
    {
      meaning: ["powdered", "dusted", "covered in powder"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["power"], pos: "noun_meaning" },
    {
      meaning: ["strong", "powerful"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["profit"], pos: "noun_meaning" },
    {
      meaning: ["profitable", "making profit"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["provisions"], pos: "noun_meaning" },
    {
      meaning: ["supplied", "well stock", "in stock"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["purchase"], pos: "noun_meaning" },
    {
      meaning: ["having bought something", "having sold something"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["pus"], pos: "noun_meaning" },
    {
      meaning: ["(of wounds)", "infected", "full of pus"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["quantity"], pos: "noun_meaning" },
    {
      meaning: ["numerous", "great in number"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["rabies"], pos: "noun_meaning" },
    {
      meaning: ["rabid"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["rake"], pos: "noun_meaning" },
    {
      meaning: ["raked", "cleared", "scraped"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["reason"], pos: "noun_meaning" },
    {
      meaning: ["reasonable", "in reason", "explainable", "for a good reason"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["regulations"], pos: "noun_meaning" },
    {
      meaning: ["regulated"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["result"], pos: "noun_meaning" },
    {
      meaning: ["resulting"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["revenge"], pos: "noun_meaning" },
    {
      meaning: ["vengeful", "desiring for revenge"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["revolution"], pos: "noun_meaning" },
    {
      meaning: ["revolutionary"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["rhythm"], pos: "noun_meaning" },
    {
      meaning: ["rhythmic", "rhyming"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["rib"], pos: "noun_meaning" },
    {
      meaning: ["ribbed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["riddle"], pos: "noun_meaning" },
    {
      meaning: ["confusing", "puzzling", "cryptic", "mysterious"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["rim"], pos: "noun_meaning" },
    {
      meaning: ["rimmed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["roof"], pos: "noun_meaning" },
    {
      meaning: ["roofed", "having a top"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["rubber"], pos: "noun_meaning" },
    {
      meaning: ["rubbery", "made of rubber"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["rue"], pos: "noun_meaning" },
    {
      meaning: ["regretful"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["rumour"], pos: "noun_meaning" },
    {
      meaning: ["rumoured", "talked about"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sadness"], pos: "noun_meaning" },
    {
      meaning: ["sad"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["safety"], pos: "noun_meaning" },
    {
      meaning: ["safe", "secure"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["salary"], pos: "noun_meaning" },
    {
      meaning: ["salaried"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["salt"], pos: "noun_meaning" },
    {
      meaning: ["salty", "salted", "high in salt"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sauce"], pos: "noun_meaning" },
    {
      meaning: ["saucy", "covered in sauce"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["scar"], pos: "noun_meaning" },
    {
      meaning: ["scarred", "mutilated", "scuffed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["scent"], pos: "noun_meaning" },
    {
      meaning: ["scented", "perfumed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["seal"], pos: "noun_meaning" },
    {
      meaning: ["sealed", "stamped", "authorized"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["season"], pos: "noun_meaning" },
    {
      meaning: ["in season", "seasonal"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["secret"], pos: "noun_meaning" },
    {
      meaning: ["secret", "secretive"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sense"], pos: "noun_meaning" },
    {
      meaning: [
        "wise",
        "perceptive",
        "sensible",
        "careful",
        "keen",
        "attentive",
      ],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sheet"], pos: "noun_meaning" },
    {
      meaning: ["fitted with sheets"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["ship"], pos: "noun_meaning" },
    {
      meaning: ["on a ship", "at sea"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["side"], pos: "noun_meaning" },
    {
      meaning: ["lateral"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["signature"], pos: "noun_meaning" },
    {
      meaning: ["signed", "authenticated"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["silver"], pos: "noun_meaning" },
    {
      meaning: ["made of silver"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sin"], pos: "noun_meaning" },
    {
      meaning: ["sinful", "immoral", "evil", "bad", "corrupt"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["smell"], pos: "noun_meaning" },
    {
      meaning: ["stinky", "smelly", "bad-smelling", "odourous", "scented"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["smallpox"], pos: "noun_meaning" },
    {
      meaning: ["marked with pox", "pocked"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sorcery"], pos: "noun_meaning" },
    {
      meaning: ["magic", "supernatural", "mysterious", "bearing great magic"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["soul"], pos: "noun_meaning" },
    {
      meaning: ["alive", "soulful", "bearing a soul", "sentient", "conscious"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sound"], pos: "noun_meaning" },
    {
      meaning: ["in hearing distance", "noisy", "loud", "noticable"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["source"], pos: "noun_meaning" },
    {
      meaning: ["sourced", "having a source"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["speed"], pos: "noun_meaning" },
    {
      meaning: ["fast", "swift"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sperm"], pos: "noun_meaning" },
    {
      meaning: ["virile", "(of males)", "fertile"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["spice"], pos: "noun_meaning" },
    {
      meaning: ["spiced", "seasoned"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["spoke"], pos: "noun_meaning" },
    {
      meaning: ["spoked"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["spot"], pos: "noun_meaning" },
    {
      meaning: ["spotted", "freckled", "vagriated"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["stage"], pos: "noun_meaning" },
    {
      meaning: ["staged", "on stage", "having an audience", "public"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["stain"], pos: "noun_meaning" },
    {
      meaning: ["stained", "dirty"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["state of mind"], pos: "noun_meaning" },
    {
      meaning: ["compoused", "mentally sound", "resolved", "focused"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["steam"], pos: "noun_meaning" },
    {
      meaning: ["steamy"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["stature"], pos: "noun_meaning" },
    {
      meaning: ["large", "big", "strong", "well built"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["steel"], pos: "noun_meaning" },
    {
      meaning: ["made of steel"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["stick"], pos: "noun_meaning" },
    {
      meaning: ["armed", "bearing a stick"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["stock"], pos: "noun_meaning" },
    {
      meaning: ["owning stock", "stock owning"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["stranger"], pos: "noun_meaning" },
    {
      meaning: ["in unfamiliar company", "amongst strangers", "lost"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["strength"], pos: "noun_meaning" },
    {
      meaning: ["strong", "sturdy", "robust"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["street"], pos: "noun_meaning" },
    {
      meaning: ["on the street", "public"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["stress"], pos: "noun_meaning" },
    {
      meaning: ["stressful", "stressed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["stripe"], pos: "noun_meaning" },
    {
      meaning: ["striped"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["stump"], pos: "noun_meaning" },
    {
      meaning: ["amputated", "stumped", "stunted"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["substance"], pos: "noun_meaning" },
    {
      meaning: ["substantial", "real", "large", "massive"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sunrise"], pos: "noun_meaning" },
    {
      meaning: ["at sunrise", "in the morning"],
      pos: "adv_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["sunset"], pos: "noun_meaning" },
    {
      meaning: ["at sunset", "in the evening"],
      pos: "adv_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["supervision"], pos: "noun_meaning" },
    {
      meaning: ["under supervision", "supervised"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["surveillance"], pos: "noun_meaning" },
    {
      meaning: ["under surveillance", "surveilled"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["syllable"], pos: "noun_meaning" },
    {
      meaning: ["syllabic"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["talent"], pos: "noun_meaning" },
    {
      meaning: ["talented", "skilled"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["tapeworm"], pos: "noun_meaning" },
    {
      meaning: ["infested with tapeworm"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["tax"], pos: "noun_meaning" },
    {
      meaning: ["taxed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["temptation"], pos: "noun_meaning" },
    {
      meaning: ["tempted", "tempting", "alluring"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["texture"], pos: "noun_meaning" },
    {
      meaning: ["textured"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["thirst"], pos: "noun_meaning" },
    {
      meaning: ["thirsty"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["thought"], pos: "noun_meaning" },
    {
      meaning: ["thoughtful", "pensive", "thinking", "mindful"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["thread"], pos: "noun_meaning" },
    {
      meaning: ["threaded", "sewn", "woven"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["threat"], pos: "noun_meaning" },
    {
      meaning: ["threatening", "at threat", "threatened"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["tick"], pos: "noun_meaning" },
    {
      meaning: ["infested with ticks"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["tile"], pos: "noun_meaning" },
    {
      meaning: ["tiled", "adorned with tiles"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["tin"], pos: "noun_meaning" },
    {
      meaning: ["made of tin"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["title"], pos: "noun_meaning" },
    {
      meaning: ["titled", "noble", "aristocratic", "authorised", "permitted"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["tool"], pos: "noun_meaning" },
    {
      meaning: ["equipt", "ready", "prepared"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["toy"], pos: "noun_meaning" },
    {
      meaning: ["entertained", "distracted", "playing", "playful"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["transformation"], pos: "noun_meaning" },
    {
      meaning: ["transformative", "changing", "dynamic", "shifting"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["treasure"], pos: "noun_meaning" },
    {
      meaning: ["rich", "wealthy", "lucky", "fortunate", "endowed"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["treaty"], pos: "noun_meaning" },
    {
      meaning: ["in agreement", "treatised"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["tribe"], pos: "noun_meaning" },
    {
      meaning: ["tribal", "part of a tribe"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["trick"], pos: "noun_meaning" },
    {
      meaning: ["deceptive"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["tumor"], pos: "noun_meaning" },
    {
      meaning: ["cancerous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["tumult"], pos: "noun_meaning" },
    {
      meaning: ["tumultuous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["tune"], pos: "noun_meaning" },
    {
      meaning: ["in tune", "harmonious", "in sync"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["turmoil"], pos: "noun_meaning" },
    {
      meaning: ["suffering", "in misery"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["twin"], pos: "noun_meaning" },
    {
      meaning: ["twinned"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["urine"], pos: "noun_meaning" },
    {
      meaning: ["having to pee"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["vacancy"], pos: "noun_meaning" },
    {
      meaning: ["vacant"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["veil"], pos: "noun_meaning" },
    {
      meaning: ["veiled", "hidden", "unknown", "unseen", "invisible"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["velocity"], pos: "noun_meaning" },
    {
      meaning: ["fast", "swift"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["veil"], pos: "noun_meaning" },
    {
      meaning: ["veiny"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["victory"], pos: "noun_meaning" },
    {
      meaning: ["victorious"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["vigour"], pos: "noun_meaning" },
    {
      meaning: ["vigouruous", "potent", "strong", "willful"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["vinegar"], pos: "noun_meaning" },
    {
      meaning: ["pickled"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["violence"], pos: "noun_meaning" },
    {
      meaning: ["violent"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["virtue"], pos: "noun_meaning" },
    {
      meaning: ["virtuous"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["wealth"], pos: "noun_meaning" },
    {
      meaning: ["wealthy", "rich"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["weather"], pos: "noun_meaning" },
    {
      meaning: ["weathered", "eroded", "worn down"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["wheel"], pos: "noun_meaning" },
    {
      meaning: ["wheeled", "on wheels"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["wife"], pos: "noun_meaning" },
    {
      meaning: ["(of men)", "married"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["wing"], pos: "noun_meaning" },
    {
      meaning: ["winged"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["wolf"], pos: "noun_meaning" },
    {
      meaning: ["crazed", "beserk", "wild"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["wool"], pos: "noun_meaning" },
    {
      meaning: ["woolen", "wearing wool"],
      pos: "adj_meaning",
    },
  ],
  [
    { meaning: ["with"], pos: "adp_meaning" },
    { meaning: ["world"], pos: "noun_meaning" },
    {
      meaning: ["real", "true"],
      pos: "adj_meaning",
    },
  ],
  [
    {
      meaning: ["pinchnip"],
      pos: "verb_meaning",
    },
    {
      meaning: ["fist"],
      pos: "noun_meaning",
    },
    {
      meaning: ["tweezers", "pincer"],
      pos: "noun_meaning",
      themes: [],
    },
  ],
];

export default compoundDerivations;
