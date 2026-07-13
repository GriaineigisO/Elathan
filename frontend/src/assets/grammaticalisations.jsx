const grammaticalisationPatterns = [
  {
    originalWord: {
      verb_meaning: [
        "obtain",
        "be able",
        "be capable",
        "manage",
        "get",
        "recieve",
      ],
    },
    grammaticalised: ["permissive marker", "possibility marker"],
    may_be_particle: true,
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      adj_meaning: ["all"],
    },
    grammaticalised: ["plural marker", "superlative"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      adp_meaning: ["from", "away from"],
    },
    grammaticalised: [
      "by (instrumental)",
      "than",
      "of (material)",
      "of (partitive)",
      "possession marker",
      "since",
    ],
    type: "adp",
  },
  {
    originalWord: {
      adp_meaning: ["from", "away from"],
    },
    grammaticalised: ["near past marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      adp_meaning: ["to", "at"],
    },
    grammaticalised: [
      "indirect object marker",
      "infinitive marker",
      "object marker",
      "purpose marker",
      "temporal adposition",
      "until",
    ],
    type: "adp",
  },

  {
    originalWord: {
      adp_meaning: ["also", "aswell"],
    },
    grammaticalised: ["and"],
    type: "conj",
  },
  {
    originalWord: {
      verb_meaning: ["arrive", "reach"],
    },
    grammaticalised: ["to", "at"],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: ["back", "spine"],
    },
    grammaticalised: ["after", "behind", "up"],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: ["buttocks", "foot", "footprint"],
    },
    grammaticalised: ["after", "behind", "down", "below"],
    type: "adp",
  },
  {
    originalWord: {
      verb_meaning: ["become"],
    },
    grammaticalised: ["future tense marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      noun_meaning: ["middle", "centre", "core", "midst"],
    },
    grammaticalised: ["between", "in", "within"],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: ["child"],
    },
    grammaticalised: ["diminutive", "partitive"],
    type: "affix",
  },
  {
    originalWord: {
      noun_meaning: ["circle", "ring", "disk", "wheel"],
    },
    grammaticalised: ["around", "on both sides of"],
    type: "adv",
  },
  {
    originalWord: {
      noun_meaning: ["circle", "ring", "disk", "wheel"],
    },
    grammaticalised: ["around", "on both sides of"],
    type: "adp",
  },
  {
    originalWord: {
      verb_meaning: ["beat", "hit", "smack", "thud", "slap"],
    },
    grammaticalised: ["derives verbs"],
    type: "affix",
  },
  {
    originalWord: {
      verb_meaning: ["come"],
    },
    grammaticalised: ["progressive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["come"],
    },
    grammaticalised: ["venitive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["come"],
    },
    grammaticalised: ["hither", "to here", "then", "almost"],
    type: "adv",
  },

  {
    originalWord: {
      verb_meaning: ["come"],
    },
    grammaticalised: [
      "for",
      "using",
      "with",
      "manner adposition",
      "temporal adposition",
    ],
    type: "adp",
  },
  {
    originalWord: {
      adp_meaning: ["with"],
    },
    grammaticalised: ["marks agents in passive constructions"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      adp_meaning: ["with"],
    },
    grammaticalised: ["continious aspect marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      adp_meaning: ["with"],
    },
    grammaticalised: ["passive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      noun_meaning: [
        "friend",
        "neighbour",
        "society",
        "nation",
        "kin",
        "comrade",
        "relative",
        "peer",
        "fellow",
        "companion",
      ],
    },
    grammaticalised: ["with"],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: [
        "friend",
        "neighbour",
        "society",
        "nation",
        "kin",
        "comrade",
        "relative",
        "peer",
        "fellow",
        "companion",
      ],
    },
    grammaticalised: ["each other", "reciprocal pronoun"],
    type: "pron",
  },
  {
    originalWord: {
      pron_meaning: ["that"],
    },
    grammaticalised: ["subordination pronoun of purpose clauses"],
    type: "pron",
  },
  {
    originalWord: {
      verb_meaning: ["with"],
    },
    grammaticalised: ["existential marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["with"],
    },
    grammaticalised: ["and"],
    type: "conj",
  },
  {
    originalWord: {
      verb_meaning: ["come"],
    },
    grammaticalised: ["subordinating conjunction of purpose clauses"],
    type: "conj",
  },
  {
    originalWord: {
      verb_meaning: ["come"],
    },
    grammaticalised: ["future tense marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["come from", "come out", "emerge"],
    },
    grammaticalised: ["from"],
    type: "adp",
  },
  {
    originalWord: {
      verb_meaning: ["come from", "come out", "emerge"],
    },
    grammaticalised: ["near past marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["come"],
    },
    grammaticalised: ["hortative interection", "come on"],
    type: "interj",
  },
  {
    originalWord: {
      verb_meaning: ["begin", "start", "commence"],
    },
    grammaticalised: ["first"],
    type: "adj",
  },
  {
    originalWord: {
      noun_meaning: ["back", "spine"],
    },
    grammaticalised: ["earlier", "ago", "then", "beforehand"],
    type: "adv",
  },
  {
    originalWord: {
      adp_meaning: ["after", "behind"],
    },
    grammaticalised: ["because of"],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: [
        "belly",
        "stomach",
        "abdomen",
        "gut",
        "intestine",
        "bowels",
      ],
    },
    grammaticalised: ["inside"],
    type: "adp",
  },
  {
    originalWord: {
      adp_meaning: ["for"],
    },
    grammaticalised: [
      "indirect object marker",
      "possession marker",
      "purpose marker",
    ],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      noun_meaning: ["body", "torso", "head"],
    },
    grammaticalised: ["reflexive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      noun_meaning: ["branch", "twig", "limb"],
    },
    grammaticalised: ["in front of", "near"],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: ["body", "torso"],
    },
    grammaticalised: ["one another"],
    type: "adv",
  },
  {
    originalWord: {
      noun_meaning: ["bottom", "side"],
    },
    grammaticalised: ["down", "under", "beneath"],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: ["bottom", "side"],
    },
    grammaticalised: ["down", "under", "beneath"],
    type: "adv",
  },
  {
    originalWord: {
      noun_meaning: ["boundry", "border", "line", "mark"],
    },
    grammaticalised: ["until"],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: ["body", "torso", "head"],
    },
    grammaticalised: ["middle voice marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      adp_meaning: ["after", "behind"],
    },
    grammaticalised: ["then"],
    type: "adv",
  },
  {
    originalWord: {
      adp_meaning: ["body"],
    },
    grammaticalised: ["reflexive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      adj_meaning: [
        "bad",
        "terrible",
        "dread",
        "dreadful",
        "alarming",
        "bad",
        "awful",
        "fearsome",
        "direful",
        "terrible",
        "horrific",
        "dastardly",
        "horrendous",
        "frightful",
        "caitiff",
        "fainthearted",
        "dreaded",
        "frightening",
        "funky",
        "coward",
        "dire",
        "fearful",
        "scary",
        "dread",
        "atrocious",
        "alarming",
        "bad",
        "awful",
        "unpleasant",
        "fearsome",
        "direful",
        "abominable",
        "fearful",
        "terrible",
        "painful",
        "horrific",
        "horrendous",
        "dreaded",
        "frightening",
        "unspeakable",
        "dire",
        "dreadful",
        "hard",
      ],
    },
    grammaticalised: ["very", "really", "incredibly"],
    type: "adv",
  },
  {
    originalWord: {
      conj_meaning: ["if"],
    },
    grammaticalised: ["concessive marker"],
    type: "conj",
  },
  {
    originalWord: {
      verb_meaning: ["cross"],
    },
    grammaticalised: ["across", "through", "over"],
    type: "adp",
  },
  {
    originalWord: {
      adp_meaning: ["to", "for", "at", "in", "to", "with", "on", "up", "alongside"],
    },
    grammaticalised: ["than"],
    type: "conj",
  },
  {
    originalWord: {
      adp_meaning: ["to", "for"],
    },
    grammaticalised: ["possession marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      pron_meaning: ["that"],
    },
    grammaticalised: ["complementiser"],
    type: "pron",
  },
  {
    originalWord: {
      pron_meaning: ["that", "this"],
    },
    grammaticalised: ["and"],
    type: "conj",
  },
  {
    originalWord: {
      pron_meaning: ["that", "this"],
    },
    grammaticalised: ["be"],
    type: "verb",
  },
  {
    originalWord: {
      pron_meaning: ["that", "this"],
    },
    grammaticalised: ["the", "it", "relative pronoun", "subordinating pronoun"],
    type: "pron",
  },
  {
    originalWord: {
      pron_meaning: ["that", "this"],
    },
    grammaticalised: ["focus marker", "emphatic marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["descend", "go down", "fall", "dip", "decline"],
    },
    grammaticalised: ["down"],
    type: "adv",
  },
  {
    originalWord: {
      verb_meaning: ["do", "make"],
    },
    grammaticalised: ["causitive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["do", "make", "go"],
    },
    grammaticalised: ["continuous marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["do", "make"],
    },
    grammaticalised: ["emphasis marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      num_meaning: ["two"],
    },
    grammaticalised: ["and"],
    type: "conj",
  },
  {
    originalWord: {
      noun_meaning: ["ear"],
    },
    grammaticalised: [
      "at the edge of",
      "toward",
      "at",
      "to",
      "around",
      "nearby",
    ],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: [
        "earth",
        "soil",
        "land",
        "ground",
        "landscape",
        "floor",
        "country",
        "world",
      ],
    },
    grammaticalised: ["down", "under", "beneath", "below"],
    type: "adp",
  },
  {
    originalWord: {
      verb_meaning: ["eat", "consume", "devour"],
    },
    grammaticalised: ["passive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      noun_meaning: ["edge", "border", "boundry", "end"],
    },
    grammaticalised: [
      "near",
      "beside",
      "by",
      "next to",
      "at",
      "infront of",
      "around",
    ],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: ["vicinity", "whereabouts", "place", "location"],
    },
    grammaticalised: ["around"],
    type: "adp",
  },
  {
    originalWord: {
      verb_meaning: ["exceed", "defeat", "surpass", "overtake"],
    },
    grammaticalised: ["comparative marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["exceed", "defeat", "surpass", "overtake"],
    },
    grammaticalised: ["too much"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["exist", "remain", "stand"],
    },
    grammaticalised: ["progressive aspect marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["exist", "remain", "stand"],
    },
    grammaticalised: ["possession marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      noun_meaning: ["eye", "face"],
    },
    grammaticalised: ["before", "in fron of"],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: ["eye", "face", "forehead", "front"],
    },
    grammaticalised: ["before", "in front of"],
    type: "adv",
  },
  {
    originalWord: {
      noun_meaning: ["eye", "face", "head"],
    },
    grammaticalised: ["up", "on", "on top of", "above"],
    type: "adp",
  },
  {
    originalWord: {
      verb_meaning: ["fail", "lack", "miss", "sin", "err"],
    },
    grammaticalised: ["avertive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["fail", "lack", "miss", "sin", "err"],
    },
    grammaticalised: ["passive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      noun_meaning: ["father"],
    },
    grammaticalised: ["derives nouns for males of a species"],
    type: "affix",
  },
  {
    originalWord: {
      noun_meaning: ["field"],
    },
    grammaticalised: ["outside", "out", "through", "since"],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: ["field"],
    },
    grammaticalised: ["besides", "except"],
    type: "conj",
  },
  {
    originalWord: {
      verb_meaning: ["finish", "complete", "end", "conclude"],
    },
    grammaticalised: ["after"],
    type: "adp",
  },
  {
    originalWord: {
      verb_meaning: ["finish", "complete", "end", "conclude"],
    },
    grammaticalised: ["already"],
    type: "adv",
  },
  {
    originalWord: {
      verb_meaning: ["finish", "complete", "end", "conclude"],
    },
    grammaticalised: ["completive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["finish", "complete", "end", "conclude"],
    },
    grammaticalised: ["perspective marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["finish", "complete", "end", "conclude"],
    },
    grammaticalised: ["then"],
    type: "conj",
  },
  {
    originalWord: {
      adv_meaning: ["first", "at first", "to begin with"],
    },
    grammaticalised: ["before", "earlier"],
    type: "adv",
  },
  {
    originalWord: {
      noun_meaning: ["flank", "side", "arm"],
    },
    grammaticalised: ["beside", "next to", "near"],
    type: "adp",
  },
  {
    originalWord: {
      verb_meaning: ["follow"],
    },
    grammaticalised: ["according to", "after", "along", "behind"],
    type: "adp",
  },
  {
    originalWord: {
      verb_meaning: ["follow"],
    },
    grammaticalised: ["behind"],
    type: "adv",
  },
  {
    originalWord: {
      verb_meaning: ["follow"],
    },
    grammaticalised: ["with"],
    type: "adp",
  },
  {
    originalWord: {
      noun_meaning: ["front"],
    },
    grammaticalised: ["later", "ahead", "tomorrow", "the following day"],
    type: "adv",
  },
  {
    originalWord: {
      part_meaning: ["future marker"],
    },
    grammaticalised: ["epistemic modality marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["get", "recieve", "obtain"],
    },
    grammaticalised: ["derives change of state verbs"],
    type: "affix",
  },
  {
    originalWord: {
      verb_meaning: ["get", "recieve", "obtain"],
    },
    grammaticalised: ["passive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
   {
    originalWord: {
      verb_meaning: ["get", "recieve", "obtain"],
    },
    grammaticalised: ["past tense marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
   {
    originalWord: {
      verb_meaning: ["get", "recieve", "obtain"],
    },
    grammaticalised: ["permissive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["get", "recieve", "obtain"],
    },
    grammaticalised: ["possibility marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["give"],
    },
    grammaticalised: ["for"],
    type: "adp"
  },
  {
    originalWord: {
      verb_meaning: ["give"],
    },
    grammaticalised: ["dative marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["give"],
    },
    grammaticalised: ["marker of concern"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["give"],
    },
    grammaticalised: ["resultive conjunction", "thus", "so that"],
    type: "conj"
  },
  {
    originalWord: {
      verb_meaning: ["give"],
    },
    grammaticalised: ["because of", "to", "towards"],
    type: "conj"
  },
  {
    originalWord: {
      verb_meaning: ["go"],
    },
    grammaticalised: ["to", "towards", "at"],
    type: "adp"
  },
  {
    originalWord: {
      verb_meaning: ["go"],
    },
    grammaticalised: ["andative affix"],
    type: "affix"
  },
  {
    originalWord: {
      verb_meaning: ["go"],
    },
    grammaticalised: ["change of state marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["go"],
    },
    grammaticalised: ["future tense marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["go"],
    },
    grammaticalised: ["new event marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["go"],
    },
    grammaticalised: ["imperative marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
   {
    originalWord: {
      verb_meaning: ["go"],
    },
    grammaticalised: ["distant demonstrative pronoun"],
    type: "pron"
  },
   {
    originalWord: {
      verb_meaning: ["go"],
    },
    grammaticalised: ["and"],
    type: "conj"
  },
  {
    originalWord: {
    noun_meaning: ["hand"],
    },
    grammaticalised: ["through", "by", "marker of agents in passive constructions"],
    type: "adp"
  },
   {
    originalWord: {
      noun_meaning: ["hand"],
    },
    grammaticalised: ["five"],
    type: "num"
  },
  {
    originalWord: {
      noun_meaning: ["hand"],
    },
    grammaticalised: ["have"],
    type: "verb"
  },
  {
    originalWord: {
      noun_meaning: ["hand"],
    },
    grammaticalised: ["into", "in", "in the possession of"],
    type: "adp"
  },
  {
    originalWord: {
      noun_meaning: ["heart"],
    },
    grammaticalised: ["into", "in"],
    type: "adp"
  },
  {
    originalWord: {
      noun_meaning: ["head"],
    },
    grammaticalised: ["front"],
    type: "adp"
  },
  {
    originalWord: {
      noun_meaning: ["head"],
    },
    grammaticalised: ["in front", "ahead"],
    type: "adv"
  },
  {
    originalWord: {
      adv_meaning: ["here"],
    },
    grammaticalised: ["because"],
    type: "conj"
  },
  {
    originalWord: {
      adv_meaning: ["here"],
    },
    grammaticalised: ["this", "that"],
    type: "pron"
  },
  {
    originalWord: {
      adv_meaning: ["there"],
    },
    grammaticalised: ["this", "that"],
    type: "pron"
  },
  {
    originalWord: {
      adv_meaning: ["here"],
    },
    grammaticalised: ["first person singular pronoun", "first person plural pronoun"],
    type: "pron"
  },
  {
    originalWord: {
      adv_meaning: ["there"],
    },
    grammaticalised: ["second person singular pronoun","second person plural pronoun"],
    type: "pron"
  },
  {
    originalWord: {
      adv_meaning: ["here"],
    },
    grammaticalised: ["relative pronoun"],
    type: "pron"
  },
  {
    originalWord: {
      noun_meaning: ["home", "house"],
    },
    grammaticalised: ["at", "to", "toward", "with", "next to"],
    type: "adp"
  },
  {
    originalWord: {
      noun_meaning: ["home"],
    },
    grammaticalised: ["genitive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      noun_meaning: ["hour"],
    },
    grammaticalised: ["during", "temporal adposition"],
    type: "adp"
  },
   {
    originalWord: {
      noun_meaning: ["hour"],
    },
    grammaticalised: ["now"],
    type: "adp"
  },
  {
    originalWord: {
      pron_meaning: ["how"],
    },
    grammaticalised: ["comparative conjunction", "than"],
    type: "conj"
  },
   {
    originalWord: {
      adp_meaning: ["in"],
    },
    grammaticalised: ["continuous aspect marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
   {
    originalWord: {
      adp_meaning: ["by", "with"],
    },
    grammaticalised: ["manner adposition"],
    type: "adp"
  },
  {
    originalWord: {
      pron_meaning: ["self", "reflexive pronoun"],
    },
    grammaticalised: ["emphatic marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      pron_meaning: ["self", "reflexive pronoun"],
    },
    grammaticalised: ["even"],
    type: "adv"
  },
  {
    originalWord: {
      noun_meaning: ["interior", "centre", "center", "middle", "inner side"],
    },
    grammaticalised: ["in", "within", "temporal adposition"],
    type: "adp"
  },
  {
    originalWord: {
      adv_meaning: ["again"],
    },
    grammaticalised: ["habitual marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["keep", "hold"],
    },
    grammaticalised: ["continuous marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["know", "live", "be alive", "stay"],
    },
    grammaticalised: ["habitual marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["lack", "miss", "lose", "fail", "leave", "let be", "abandon", "exit"],
    },
    grammaticalised: ["negation marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["leave", "let be", "abandon"],
    },
    grammaticalised: ["from", "away from"],
    type: "adp",
  },
  {
    originalWord: {
      verb_meaning: ["leave", "let be", "abandon"],
    },
    grammaticalised: ["completive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["leave", "let be", "abandon", "exit"],
    },
    grammaticalised: ["egressive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["leave", "let be", "abandon", "exit"],
    },
    grammaticalised: ["hortative marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["leave", "let be", "abandon", "exit"],
    },
    grammaticalised: ["permissive marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      verb_meaning: ["lie", "lay down", "lie on the ground", "lie down", "live", "be alive", "stay"],
    },
    grammaticalised: ["continuous marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      noun_meaning: ["limit", "border", "boundary"],
    },
    grammaticalised: ["until"],
    type: "adp"
  },
  {
    originalWord: {
      noun_meaning: ["lip", "edge"],
    },
    grammaticalised: ["in", "within", "into", "out of"],
    type: "adp"
  },
 
  {
    originalWord: {
      verb_meaning: ["live", "be alive", "stay", "wait", "dwell"],
    },
    grammaticalised: ["be"],
    type: "verb"
  },
  {
    originalWord: {
      verb_meaning: ["live", "be alive", "stay", "wait", "dwell"],
    },
    grammaticalised: ["existential marker"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },
  {
    originalWord: {
      adp_meaning: ["at", "in", "to", "with"],
    },
    grammaticalised: ["agent marker in passive constructions"],
    type: Math.floor(Math.random() * 3) !== 1 ? "particle" : "affix",
  },

 
  
];

export default grammaticalisationPatterns;
