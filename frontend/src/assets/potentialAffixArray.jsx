const potentialAffixArray = [
  {
    affixName: "bodyPartAffix",
    affixDescription: "derives terms for body parts",
  },
  {
    affixName: "adjToCausativeVerbAffix",
    affixDescription: "derives causative verbs from adjectives",
  },
  {
    affixName: "NtoADJPrototypicalAffix",
    affixDescription:
      "derives adjectives describing the prototypical state of the noun",
    originWords: [
      { adv_meaning: "like" },
      { adj_meaning: "similar" },
      { noun_meaning: "way" },
    ],
  },
  {
    affixName: "phobia",
    affixDescription: "-phobia",
    originWords: [{ noun_meaning: "fear" }, { noun_meaning: "terror" }],
  },
  {
    affixName: "work",
    affixDescription: "the product of a craft or trade",
    originWords: [
      { noun_meaning: "work" },
      { noun_meaning: "craft" },
      { noun_meaning: "result" },
      { noun_meaning: "product" },
      { verb_meaning: "make" },
    ],
  },
  {
    affixName: "bound",
    affixDescription: "bound by, bound for, bound in or on",
    originWords: [
      { noun_meaning: "lock" },
      { noun_meaning: "chain" },
      { noun_meaning: "knot" },
      { noun_meaning: "bond" },
      { verb_meaning: "tie" },
      { verb_meaning: "capture" },
      { verb_meaning: "grab" },
      { verb_meaning: "take" },
    ],
  },

  {
    affixName: "dynastic",
    affixDescription:
      "derives terms for a dynasty from the name of the common ancestor",
      originWords: [
      { noun_meaning: "line" },
      { noun_meaning: "blood" },
      { noun_meaning: "family" },
      { adp_meaning: "from" },
      { adp_meaning: "of" },
      { adv_meaning: "down" },
      { noun_meaning: "descendant" },
      { noun_meaning: "grandson" },
      { noun_meaning: "dynasty" },
    ],
  },
  {
    affixName: "verbToInanimateAgentAffix",
    affixDescription: "derives terms for inanimate objects from  verbs",
    originWords: [
      { num_meaning: "one" },
      { noun_meaning: "thing" },
      { noun_meaning: "object" },
    ]
  },
  {
    affixName: "intra",
    affixDescription: "intra-, within",
    originWords: [
      { adp_meaning: "with" },
      { adp_meaning: "inside" },
      { adp_meaning: "within" },
      { adp_meaning: "in" },
    ]
  },
  {
    affixName: "wise",
    affixDescription: "-wise",
    originWords: [
      { adj_meaning: "wise" },
      { adj_meaning: "skilled" },
      { adj_meaning: "knowledgeable" },
      { adp_meaning: "regarding" },
      { adp_meaning: "about" },
      { adp_meaning: "on" },
      { noun_meaning: "direction" },
      { noun_meaning: "way" },
      { noun_meaning: "manner" },
      { noun_meaning: "arrangement" },
    ]
  },
  {
    affixName: "tri",
    affixDescription: "tri-, three",
    originWords: [{ num_meaning: "three" }],
  },
  {
    affixName: "ever",
    affixDescription: "ever-",
    originWords: [{ adv_meaning: "ever" }, { adv_meaning: "always" }],
  },
  {
    affixName: "half",
    affixDescription: "half-",
    originWords: [
      { noun_meaning: "half" },
      { adj_meaning: "half" },
      { verb_meaning: "cut" },
      { verb_meaning: "slice" },
      { noun_meaning: "slice" },
      { verb_meaning: "cleave" },
      { verb_meaning: "split" },
    ],
  },
  {
    affixName: "pre",
    affixDescription:
      "pre-, derives verbs for actions done before another action or done by an agent before another could",
      originWords: [
      { noun_meaning: "front" },
      { adp_meaning: "before" },
      { adv_meaning: "before" },
      { noun_meaning: "face" }
    ],
      
  },

  {
    affixName: "appurtenance",
    affixDescription:
      "derives nouns with the sense of appurtenance or collection",
      originWords: [
      { adv_meaning: "together" },
      { verb_meaning: "gather" },
      { noun_meaning: "collection" },
      { verb_meaning: "show" }
    ],
  },
  {
    affixName: "result",
    affixDescription: "derives nouns indicating an action, process, or result",
    originWords: [
      { verb_meaning: "happen" },
      { noun_meaning: "result" },
      { verb_meaning: "show" }
    ],
  },
  {
    affixName: "abstract state",
    affixDescription: "derives nouns of a relationship or state.",
    originWords: [
      {noun_meaning: "way"},
      {noun_meaning: "state"},
      {verb_meaning: "stand"},
      {verb_meaning: "be"},
    ]
  },
  {
    affixName: "fee",
    affixDescription: "derives nouns indicating a charge, fee, or toll",
    originWords: [
      { noun_meaning: "cost" },
      { verb_meaning: "pay" },
      { noun_meaning: "fee" },
    ],
  },
  {
    affixName: "up/on/out verb",
    affixDescription: "derives verbs with the sense away, up, on, out",
     originWords: [
      { adp_meaning: "away" },
      { adp_meaning: "up" },
      { adp_meaning: "on" },
      { adp_meaning: "out" },
    ],
  },
  {
    affixName: "rate",
    affixDescription: "derives nouns indicating a rate",
    originWords: [
      { noun_meaning: "rate" },
      { noun_meaning: "amount" },
      { noun_meaning: "number" },
      { noun_meaning: "count" },
      { verb_meaning: "count" },
      { verb_meaning: "measure" },
    ]
  },
  {
    affixName: "measure",
    affixDescription: "derives nouns of a unit of measure",
     originWords: [
      { noun_meaning: "rate" },
      { noun_meaning: "amount" },
      { noun_meaning: "number" },
      { noun_meaning: "count" },
      { verb_meaning: "count" },
      { verb_meaning: "measure" },
    ]
  },

  {
    affixName: "transVerbToABleAdjectiveAffix",
    affixDescription:
      "derives adjectives of ability from transitive verbs, -able",
       originWords: [
      { adj_meaning: "able" },
      { verb_meaning: "see" },
      { verb_meaning: "make" },
      
    ]
  },
  {
    affixName: "abstract quality",
    affixDescription: "derives abstract nouns relating to quality",
    originWords: [
      { noun_meaning: "state" },
      { noun_meaning: "condition" },
      { noun_meaning: "power" },
      { noun_meaning: "authority" },
      { noun_meaning: "property" },
      { noun_meaning: "right" },
      { noun_meaning: "office" },
      { noun_meaning: "quality" },  
      { noun_meaning: "manner" },  
      { noun_meaning: "way" },  
      { noun_meaning: "personality" },  
      { noun_meaning: "character" },  
      { noun_meaning: "appearance" },  
      { noun_meaning: "aspect" },  
      { noun_meaning: "rank" },  
      { noun_meaning: "degree" },  
      { noun_meaning: "status" },  
      { noun_meaning: "kind" },  
      { noun_meaning: "sort" },  
      { noun_meaning: "gender" },  
      { noun_meaning: "mist" },  
      { noun_meaning: "cloud" },
      { noun_meaning: "air" }, 
      { verb_meaning: "make" },  
      { verb_meaning: "sculpt" },  
      { verb_meaning: "make" },    
    ]
  },

  {
    affixName: "administered",
    affixDescription:
      "derives terms for a region that is administered by a given role",
      originWord: [
        {verb_meaning: "administer"},
        {verb_meaning: "govern"},
        {verb_meaning: "rule"},
        {verb_meaning: "regulate"},
        {verb_meaning: "manage"},
        {verb_meaning: "oversee"},
        {verb_meaning: "direct"},
        {verb_meaning: "control"},
        {verb_meaning: "supervise"},
        {verb_meaning: "conduct"},
        {verb_meaning: "lead"},
      ]
  },

  {
    affixName: "ability",
    affixDescription: "derives noun of ability from transitive verbs, -ability",
    originWord: [
        {verb_meaning: "make"},
        {verb_meaning: "see"},
        {verb_meaning: "be able"},
        {noun_meaning: "deed"},
    ]
  },
  {
    affixName: "borne",
    affixDescription: "originating from or bein spread by",
    originWord: [
        {adp_meaning: "from"},
        {noun_meaning: "origin"},
        {noun_meaning: "start"},
        {verb_meaning: "carry"},
        {verb_meaning: "bring"},
    ]
  },
  {
    affixName: "philia",
    affixDescription: "-philia",
    originWord: [
        {noun_meaning: "preference"},
        {verb_meaning: "like"},
        {verb_meaning: "prefer"},
        {verb_meaning: "lean"},
        {verb_meaning: "love"},
    ]
  },
  {
    affixName: "serving for",
    affixDescription: `derives adjectives from nouns and verbs to mean "of", "pertaining to", or "serving for"`,
    originWord: [
        {verb_meaning: "serve"},
        {verb_meaning: "concern"},
        {verb_meaning: "worry"},
        {adp_meaning: "about"},
        {adp_meaning: "regarding"},
        {adp_meaning: "on"},
    ]
  },
  {
    affixName: "anti",
    affixDescription: `anti-, against, opposed to, opposite of`,
    originWord: [
        {verb_meaning: "oppose"},
        {adp_meaning: "against"},
        {adj_meaning: "opposite"},
        {noun_meaning: "enemy"},
    ]
  },
  {
    affixName: "inter",
    affixDescription: `inter-, between, amongst`,
     originWord: [
        {adp_meaning: "between"},
        {adp_meaning: "amongst"},
    ]
  },
  {
    affixName: "hydro",
    affixDescription: `relating to water`,
    originWord: [
        {adj_meaning: "wet"},
        {noun_meaning: "water"},
    ]
  },
  {
    affixName: "proneAffix",
    affixDescription:
      "derives adjectives from verbs describing the state of the agent of the action",
      originWord: [
        {adj_meaning: "prone"},
        {verb_meaning: "do"},
    ]
  },

  {
    affixName: "manager",
    affixDescription: "derives terms for proprietors or managers of a thing",
    originWord: [
        {noun_meaning: "head"},
        {noun_meaning: "leader"},
        {adj_meaning: "big"},
        {verb_meaning: "control"},
        {verb_meaning: "hold"},
    ]
  },

  {
    affixName: "acquire",
    affixDescription: "derives verbs meaning 'to acquire X",
    originWord: [
        {verb_meaning: "acquire"},
        {verb_meaning: "hold"},
        {verb_meaning: "have"},
        {verb_meaning: "find"},
        {verb_meaning: "reach"},
        {verb_meaning: "obtain"},
    ]
  },
  {
    affixName: "wear",
    affixDescription: "derives terms for categories of clothing",
    originWord: [
        {verb_meaning: "wear"},
        {verb_meaning: "adorn"},
        {noun_meaning: "robe"},
        {noun_meaning: "shirt"},
        {verb_meaning: "weave"},
        {verb_meaning: "sew"},
    ]
  },
  {
    affixName: "use",
    affixDescription: "derives verbs meaning 'to use X' or 'to act like X'",
    originWord: [
        {verb_meaning: "use"},
        {verb_meaning: "utilise"},
    ]
  },
  {
    affixName: "madeOf",
    affixDescription: "made of X",
    originWord: [
        {adp_meaning: "of"},
        {adp_meaning: "from"},
        {noun_meaning: "material"},
        {noun_meaning: "substance"},
    ]
  },
  {
    affixName: "intransToTransVerbAffix",
    affixDescription: "derives transitive verbs from intransitive verbs",
  },
  {
    affixName: "meal",
    affixDescription: "denotes a fixed number, measure, or amount at a time",
    originWord: [
        {noun_meaning: "number"},
        {noun_meaning: "measure"},
        {noun_meaning: "amount"},
        {noun_meaning: "step"},
    ]
  },
  {
    affixName: "adverbAffix",
    affixDescription: "derives adverbs",
    originWord: [
        {noun_meaning: "body"},
        {noun_meaning: "law"},
        {noun_meaning: "custom"},
        {noun_meaning: "manner"},
        {noun_meaning: "way"},
        {noun_meaning: "path"},
        {noun_meaning: "road"},
        {noun_meaning: "mind"},
        {noun_meaning: "heart"},
        {noun_meaning: "soul"},
        {noun_meaning: "thought"},
        {conj_meaning: "thus"},
    ]
  },
  {
    affixName: "aire",
    affixDescription: "rich in, possessing great amounts of",
    originWord: [
        {verb_meaning: "have"},
        {verb_meaning: "possess"},
        {noun_meaning: "wealth"},
        {adj_meaning: "rich"},
        {noun_meaning: "bounty"},
        {noun_meaning: "multitude"},
    ]
  },
  {
    affixName: "place",
    affixDescription: "derives terms for nouns relating to places",
     originWord: [
        {verb_meaning: "stand"},
        {verb_meaning: "sit"},
        {noun_meaning: "place"},
        {pron_meaning: "where"},
        {pron_meaning: "there"},
    ]
  },
  {
    affixName: "VerbToObjectAffix",
    affixDescription:
      "derives nouns referring to the typical object of an action",
      originWord: [
        {num_meaning: "one"},
        {noun_meaning: "thing"},
    ]
  },
  {
    affixName: "kind",
    affixDescription: "kind, race of, a genre or grouping",
     originWord: [
        {noun_meaning: "blood"},
        {noun_meaning: "race"},
        {noun_meaning: "kind"},
        {noun_meaning: "family"},
        {noun_meaning: "people"},
        {noun_meaning: "type"},
        {noun_meaning: "DNA"},
        {adj_meaning: "genetic"},
    ]
  },
  {
    affixName: "verbToSubjectAdj",
    affixDescription:
      "derives adjectives from verbs that describe the subject of such actions",
       originWord: [
        {verb_meaning: "make"},
        {verb_meaning: "do"},
    ]
  },
  {
    affixName: "verbToObjectAdj",
    affixDescription:
      "derives adjectives from verbs that describe the object of such actions",
  },
  {
    affixName: "durativeAffix",
    affixDescription:
      "derives verbs with no specific endgoal and ongoing actions",
  },
  {
    affixName: "facient",
    affixDescription:
      "derives adjectives to describe that which makes or does an action",
  },
  {
    affixName: "rank",
    affixDescription:
      "forms nouns denoting rank, office, domain of, charge of, control under",
  },
  {
    affixName: "paternal",
    affixDescription: "paternal",
  },
  {
    affixName: "reflexiveAffix",
    affixDescription:
      "derives verbs for actions performed by the subject to itself",
  },
  {
    affixName: "changeStateAffix",
    affixDescription: "derives intransitive verbs denoting a change of state",
  },
  {
    affixName: "stativeAffix",
    affixDescription: "derives stative verbs from adjectives",
  },
  {
    affixName: "adjToNoun",
    affixDescription: "derives nouns from adjectives",
  },
  {
    affixName: "happy",
    affixDescription: "fond of doing or using something",
  },
  {
    affixName: "resultive",
    affixDescription: "derives verbs that result in a given thing or state",
  },
  {
    affixName: "causative",
    affixDescription: "derives causative verbs",
  },
  {
    affixName: "sorted data",
    affixDescription:
      "division of a sorted data set split into a specified number of equally sized groups",
  },
  {
    affixName: "makerOf",
    affixDescription: "derives nouns for people who manufacture things",
  },
  {
    affixName: "similar",
    affixDescription:
      "derives nouns that are similar to, or relate to, a given noun",
  },
  {
    affixName: "after",
    affixDescription: "after, post",
  },
  {
    affixName: "were",
    affixDescription: "an anthropomorphic creature",
  },
  {
    affixName: "pejorative",
    affixDescription: "derives pejorative and derogratory terms",
  },
  {
    affixName: "reversive",
    affixDescription:
      "derives verbs of reversing actions or of removing objects or states",
  },
  {
    affixName: "tangibleNoun",
    affixDescription:
      "derives terms for tangible nouns relating to a state, object or action",
  },
  {
    affixName: "augmentative",
    affixDescription: "augmentative affix",
  },
  {
    affixName: "matri",
    affixDescription: "maternal",
  },
  {
    affixName: "diminutive",
    affixDescription: "diminutive affix",
  },
  {
    affixName: "taboo",
    affixDescription: "derives terms for taboo concepts",
  },
  {
    affixName: "skill",
    affixDescription:
      "derives terms for someone skilled at an action or skilled at using an item",
  },
  {
    affixName: "cast",
    affixDescription: "dispersel of, emittance of, spread of",
  },
  {
    affixName: "chaotic",
    affixDescription: "chaotic/out-of-control affix",
  },
  {
    affixName: "immoral",
    affixDescription: "derives terms for immorally associated concepts",
  },
  {
    affixName: "all",
    affixDescription: "pan-, onmi, encompassing of all",
  },
  {
    affixName: "wide",
    affixDescription: "the width of a place",
  },
  {
    affixName: "shire",
    affixDescription: "derives names for subregions of a territory",
  },
  {
    affixName: "failed",
    affixDescription: "derives terms for actions that failed to complete",
  },
  {
    affixName: "associative",
    affixDescription: `of, related to, or associated with the thing specified`,
  },
  {
    affixName: "improper",
    affixDescription: "derives terms for actions done improperly",
  },
  {
    affixName: "lacking",
    affixDescription: "-less, lacking X",
  },
  {
    affixName: "co",
    affixDescription: "co-, with",
  },
  {
    affixName: "dead",
    affixDescription: "derives terms relating to death",
  },
  {
    affixName: "equi",
    affixDescription: "same, equal",
  },
  {
    affixName: "spiritual",
    affixDescription: "derives terms relating to divinity",
  },
  {
    affixName: "afflicted",
    affixDescription:
      "derives terms for people affected by a disease or condition",
  },
  {
    affixName: "animal",
    affixDescription: "derives animal names",
    themes: ["real world animals"]
  },
  {
    affixName: "down",
    affixDescription: "of a lesser nature, in a downward direction",
  },
  {
    affixName: "bird",
    affixDescription: "derives bird names",
    themes: ["real world animals"]
  },
  {
    affixName: "fish",
    affixDescription: "derives fish names",
    themes: ["real world animals"]
  },
  {
    affixName: "nonHumanDiminutive",
    affixDescription: "derives diminutives for non-human referrants",
  },
  {
    affixName: "maleDiminutive",
    affixDescription:
      "derives diminutives for male referrants or male-reated items",
  },
  {
    affixName: "femaleDiminutive",
    affixDescription:
      "derives diminutives for female referrants or female-reated items",
  },
  {
    affixName: "childDiminutive",
    affixDescription:
      "derives diminutives for child referrants or child-reated items",
  },
  {
    affixName: "direction",
    affixDescription: "derives adpositional terms for directions, -wards",
  },
  {
    affixName: "re",
    affixDescription: "re-",
  },
  {
    affixName: "former",
    affixDescription: "ex-, former-",
  },
  {
    affixName: "timeOf",
    affixDescription:
      "derives terms for the time for doing or of doing an act, or when something occurs",
  },
  {
    affixName: "collective",
    affixDescription: "derives terms for groups or collections of people",
  },
  {
    affixName: "phobic",
    affixDescription: "-phobic",
  },
  {
    affixName: "methodTool",
    affixDescription: "derives tool names from verbs",
  },
  {
    affixName: "yester",
    affixDescription:
      "yester-, derives terms for previous iterations of something",
  },
  {
    affixName: "fore",
    affixDescription:
      "fore-, pre-, derives terms for something that spatially or temporally occurs before something else",
  },
  {
    affixName: "ware",
    affixDescription:
      "derives  terms for tools, gear and equitment relating to a craft or topic",
  },
  {
    affixName: "notPerformed",
    affixDescription:
      "derives nouns from verbs describing people who have not done said action",
  },
  {
    affixName: "resembleNegative",
    affixDescription:
      "derives terms for something tht resembles something else, often with a negative or derogotory description",
  },
  {
    affixName: "illusion",
    affixDescription: "illusion, deception",
  },
  {
    affixName: "destruction",
    affixDescription: "breaking of, destruction of, wearing down of",
  },
  {
    affixName: "resemble",
    affixDescription: "looks like X",
  },
  {
    affixName: "organic",
    affixDescription: "organic, natural, caused by nature",
  },
  {
    affixName: "boutOf",
    affixDescription: "an outburst of, bout of, rapid or numerous occurance of",
  },
  {
    affixName: "greatest",
    affixDescription: "best of, greatest",
  },
  {
    affixName: "ritual",
    affixDescription: "derives terms for rituals",
  },
  {
    affixName: "phile",
    affixDescription: "-phile",
  },
  {
    affixName: "phobe",
    affixDescription: "-phobe",
  },
  {
    affixName: "collection",
    affixDescription: "collection of",
  },
  {
    affixName: "wild",
    affixDescription: "derives terms for wild things",
  },
  {
    affixName: "eaterOf",
    affixDescription: "eater of, -vore, -phage",
  },

  {
    affixName: "emergesFrom",
    affixDescription: "that which emerges from, that which is from",
  },
  {
    affixName: "devotion",
    affixDescription: "devotion to",
  },
  {
    affixName: "craft",
    affixDescription: "derives terms for crafts and trades",
  },
  {
    affixName: "fullOf",
    affixDescription: "full of X",
  },
  {
    affixName: "characteristic",
    affixDescription: "derives nouns for people with a characteristic",
  },
  {
    affixName: "manmade",
    affixDescription: "derives nouns for manmade items",
  },

  {
    affixName: "plant",
    affixDescription: "derives plant names",
  },
  {
    affixName: "realm",
    affixDescription: "realm of, domain of, territory of",
  },
  {
    affixName: "subset",
    affixDescription: "subset of",
  },
  {
    affixName: "locationAdj",
    affixDescription: "derives adjectives from topographic terms",
  },
  {
    affixName: "coveredIn",
    affixDescription: "covered in X",
  },
  {
    affixName: "possessing",
    affixDescription:
      "derives adjectives describing an object that bears, possesses or is adorned with a given noun or has a certain state",
  },
  {
    affixName: "relating to birds",
    affixDescription: "avi-, relating to birds",
  },
  {
    affixName: "para",
    affixDescription: "next to, beside, adjacent, related to, beyond",
  },
  {
    affixName: "approximate",
    affixDescription: "derives adjectives of an approximate quality",
  },
  {
    affixName: "trans",
    affixDescription: "trans-, across, over",
  },
  {
    affixName: "up",
    affixDescription: "up-",
  },

  {
    affixName: "opposite",
    affixDescription: "derives terms of opposite meanings",
  },

  {
    affixName: "affinity",
    affixDescription: "has an affinity for X",
  },
  {
    affixName: "verbToAbstract",
    affixDescription:
      "derives abstract nouns from verbs, with the connocation of an action or process involving the action, -ation",
  },
  {
    affixName: "ideology",
    affixDescription: "derives terms for ideologyies, -ism",
  },
  {
    affixName: "venitive",
    affixDescription: "motion towards",
  },
  {
    affixName: "andative",
    affixDescription: "motion away from",
  },
  {
    affixName: "allow",
    affixDescription: "allow to happen, let",
  },
  {
    affixName: "frequentive",
    affixDescription: "derives frequentive verbs",
  },
  {
    affixName: "weaker",
    affixDescription: "derives terms of weaker intensity",
  },
  {
    affixName: "stronger",
    affixDescription: "derives terms of stronger intensity",
  },
  {
    affixName: "utilise",
    affixDescription: "to utilise X, make use of X",
  },
  {
    affixName: "dish",
    affixDescription: "derives names for dishes and recipes",
  },
  {
    affixName: "fruitjuice",
    affixDescription:
      "derives terms from fruit indicating the juice from the fruit",
  },
  {
    affixName: "verbToPatient",
    affixDescription: "derives nouns denoting the patient of an action",
  },
  {
    affixName: "action done in response to another",
    affixDescription: "action done in response to another",
  },
  {
    affixName: "performingAction",
    affixDescription:
      "derives nouns from verbs denoting an action, or a person that performs said action",
  },
  {
    affixName: "reciprocal",
    affixDescription: "derives reciprocal verbs",
  },
  {
    affixName: "mono-",
    affixDescription: "mono-, uni-, solo, relating to one of",
  },
  {
    affixName: "adjToVerb",
    affixDescription: "derives adjectives from verbs",
  },
  {
    affixName: "advToNoun",
    affixDescription:
      "derives nouns from adverbs meaning 'that which acts in a ADV manner'",
  },

  {
    affixName: "advToVerb",
    affixDescription:
      "derives verbs from adverbs meaning 'to act in a ADV manner'",
  },

  {
    affixName: "verbToNoun",
    affixDescription:
      "derives nouns or noun-like words (or elements of noun phrases) from verbs, denoting the act of doing something, an action, or the embodiment of an action.",
  },

  {
    affixName: "ist",
    affixDescription: "adherant to an ideology, studier of a topic",
  },
  {
    affixName: "poly",
    affixDescription: "many, multiple",
  },
  {
    affixName: "ia",
    affixDescription: "-ia, derives proper nouns for places",
  },
  {
    affixName: "land",
    affixDescription:
      "-land, place of, derives both nouns and proper nouns for places",
  },
  {
    affixName: "macro",
    affixDescription: "macro-",
  },
  {
    affixName: "dis",
    affixDescription: "dis-",
  },
  {
    affixName: "worthy",
    affixDescription:
      "-worthy, derives adjectives from verbs describing objects worthy of the action",
  },
  {
    affixName: "bi-",
    affixDescription: "bi-, dual, dia-, two",
  },
  {
    affixName: "mid",
    affixDescription: "mid-",
  },
  {
    affixName: "ess",
    affixDescription: "-ess, she-, female version of",
  },
  {
    affixName: "circum",
    affixDescription: "around, circum-",
  },
  {
    affixName: "cross",
    affixDescription: "cross, across, intersecting",
  },
  {
    affixName: "over",
    affixDescription:
      "derives verbs whose actions are done too much, derives adjectives of too great an intensity, derives nouns of an exageratted quality",
  },
  {
    affixName: "under",
    affixDescription:
      "derives verbs whose actions are done to an unsatisfactory degree, derives adjectives of a weaker intensity, derives nouns of an downgraded rank or quality",
  },

  //****************THEMATIC AFFIXES

  //********ADVANCED MEDICINE */
  {
    affixName: "lympho",
    affixDescription: "lympho",
    themes: ["advanced medicine"],
  },
  {
    affixName: "neuro",
    affixDescription: "relating to the brain",
    themes: ["advanced medicine"],
  },
  {
    affixName: "haemo",
    affixDescription: "relating to blood",
    themes: ["advanced medicine"],
  },
  {
    affixName: "osseo",
    affixDescription: "relating to bones",
    themes: ["advanced medicine"],
  },
  {
    affixName: "arterio",
    affixDescription: "relating to arteries",
    themes: ["advanced medicine"],
  },
  {
    affixName: "abdomino",
    affixDescription: "derives terms relating to the abdomen",
    themes: ["advanced medicine"],
  },
  {
    affixName: "genito",
    affixDescription: "derives terms relating to the genitals",
    themes: ["advanced medicine"],
  },
  {
    affixName: "velo",
    affixDescription: "pertaining to a velum,",
    themes: ["advanced medicine"],
  },
  {
    affixName: "itis",
    affixDescription: "derives terms for conditions and afflictions",
    themes: ["advanced medicine"],
  },
  {
    affixName: "linguo",
    affixDescription: "relating to the tongue",
    themes: ["advanced medicine"],
  },
  {
    affixName: "labio",
    affixDescription: "relating to the lips",
    themes: ["advanced medicine"],
  },

  {
    affixName: "dento",
    affixDescription: "relating to the teeth",
    themes: ["advanced medicine"],
  },

  //************LEARNING */
  {
    affixName: "bio",
    affixDescription: "relating to life, organic",
    themes: ["biology"],
  },
  {
    affixName: "auto",
    affixDescription: "auto-",
    themes: ["computers"],
  },
  {
    affixName: "ane",
    affixDescription: "-ane",
    themes: ["chemistry"],
  },
  {
    affixName: "eu",
    affixDescription: "eu-",
    themes: ["chemistry"],
  },
  {
    affixName: "prot",
    affixDescription: "prot-",
    themes: ["chemistry", "linguistics", "advanced medicine"],
  },
  {
    affixName: "aceto",
    affixDescription: "aceto-",
    themes: ["chemistry"],
  },
  {
    affixName: "pyro",
    affixDescription: "pyro-",
    themes: ["chemistry", "physics"],
  },
  {
    affixName: "plex",
    affixDescription: "-plex",
    themes: ["mathematics", "physics"],
  },
  {
    affixName: "allo",
    affixDescription: "allo-",
    themes: ["chemistry", "biology", "genetics"],
  },
  {
    affixName: "astheno",
    affixDescription: "astheno-",
    themes: ["advanced medicine"],
  },
  {
    affixName: "ol",
    affixDescription: "-ol",
    themes: ["chemistry"],
  },
  {
    affixName: "one",
    affixDescription: "-one",
    themes: ["chemistry"],
  },
  {
    affixName: "tele",
    affixDescription: "tele-",
    themes: ["chemistry", "physics", "radios", "phones", "television"],
  },
  {
    affixName: "metry",
    affixDescription: "-metry",
    themes: ["mathematics"],
  },
  {
    affixName: "epi",
    affixDescription: "epi-, in top of, secondary, upper segment",
    themes: ["chemistry", "physics", "genetics", "advanced medicine"],
  },
  {
    affixName: "yl",
    affixDescription: "yl",
    themes: ["chemistry"],
  },
  {
    affixName: "osis",
    affixDescription: "-osis",
    themes: ["advanced medicine"],
  },

  {
    affixName: "retro",
    affixDescription: "retro-",
  },
  {
    affixName: "econo",
    affixDescription: "econo-",
  },

  {
    affixName: "ase",
    affixDescription: "-ase",
    themes: ["chemistry"],
  },
  {
    affixName: "glyco",
    affixDescription: "glyco-",
    themes: ["chemistry", "advanced medicine"],
  },
  {
    affixName: "lytic",
    affixDescription: "-lytic",
  },
  {
    affixName: "helio",
    affixDescription: "helio-",
  },
  {
    affixName: "thermo",
    affixDescription: "thermo-",
  },
  {
    affixName: "thio",
    affixDescription: "thio",
  },
  {
    affixName: "athero",
    affixDescription: "athero-",
  },
  {
    affixName: "graphy",
    affixDescription: "graphy-",
  },
  {
    affixName: "centi",
    affixDescription: "centi-",
  },

  {
    affixName: "ultra",
    affixDescription: "ultra-",
  },
  {
    affixName: "ics",
    affixDescription: "-ics",
  },
  {
    affixName: "tron",
    affixDescription: "-tron",
  },
  {
    affixName: "and",
    affixDescription: "-and",
  },
  {
    affixName: "ortho",
    affixDescription: "ortho-",
  },
  {
    affixName: "scope",
    affixDescription: "scope",
  },
  {
    affixName: "nitro",
    affixDescription: "nitro",
  },
  {
    affixName: "penia",
    affixDescription: "penia",
  },
  {
    affixName: "oxy",
    affixDescription: "oxy",
  },
  {
    affixName: "cis",
    affixDescription: "cis-",
  },
  {
    affixName: "neo",
    affixDescription: "neo-",
  },
  {
    affixName: "noto",
    affixDescription: "noto-",
  },
  {
    affixName: "chemo",
    affixDescription: "chemo-",
  },
  {
    affixName: "on",
    affixDescription: "on",
  },
  {
    affixName: "ium",
    affixDescription: "ium",
  },
  {
    affixName: "pico",
    affixDescription: "pico-",
  },
  {
    affixName: "ome",
    affixDescription: "-ome",
  },
  {
    affixName: "archaeo",
    affixDescription: "archaeo-",
  },
  {
    affixName: "deca",
    affixDescription: "deca-",
  },
  {
    affixName: "hexadeca",
    affixDescription: "hexadeca-",
  },
  {
    affixName: "ide",
    affixDescription: "group of several elements",
  },
  {
    affixName: "kilo",
    affixDescription: "kilo-",
  },
  {
    affixName: "xero",
    affixDescription: "xero-",
  },
  {
    affixName: "atto",
    affixDescription: "atto-",
  },
  {
    affixName: "zepto",
    affixDescription: "zepto-",
  },
  {
    affixName: "oo-",
    affixDescription: "relating to eggs or ova",
  },
  {
    affixName: "yocto",
    affixDescription: "yocto-",
  },
  {
    affixName: "hexa",
    affixDescription: "hexa-",
  },
  {
    affixName: "quadri",
    affixDescription: "quadri-",
  },
  {
    affixName: "per",
    affixDescription: "per-",
  },
  {
    affixName: "meter",
    affixDescription: "-meter",
  },
  {
    affixName: "micro",
    affixDescription: "micro-",
  },

  {
    affixName: "cyto",
    affixDescription: "cyto",
  },
  {
    affixName: "psycho",
    affixDescription: "psycho-",
  },
  {
    affixName: "ole",
    affixDescription: "-ole",
  },
  {
    affixName: "gram",
    affixDescription: "gram",
  },
  {
    affixName: "vermi",
    affixDescription: "vermi",
  },
  {
    affixName: "paleo",
    affixDescription: "paleo-, old, archaic",
  },
  {
    affixName: "hecto",
    affixDescription: "hecto-",
  },
  {
    affixName: "aero",
    affixDescription: "aero-",
  },
  {
    affixName: "milli-",
    affixDescription: "relating to a thousand or a thousandth",
  },

  {
    affixName: "ology",
    affixDescription: "-ology, study of",
  },
  {
    affixName: "tetra",
    affixDescription: "tetra-",
  },
  {
    affixName: "nano",
    affixDescription: "nano-",
  },
  {
    affixName: "meta",
    affixDescription: "meta-",
  },
  {
    affixName: "pro",
    affixDescription: "pro-",
  },
  {
    affixName: "eco",
    affixDescription: "eco-",
  },
  {
    affixName: "pathy",
    affixDescription: "-pathy",
  },
  {
    affixName: "geno",
    affixDescription: "geno-",
  },
  {
    affixName: "stereo",
    affixDescription: "stereo-",
  },
  {
    affixName: "homo",
    affixDescription: "homo-, same",
  },
  {
    affixName: "hetero",
    affixDescription: "hetero-, different",
  },
  {
    affixName: "apo",
    affixDescription: "apo",
  },
  {
    affixName: "peri",
    affixDescription: "peri",
  },
  {
    affixName: "dys",
    affixDescription: "dys-",
  },
  {
    affixName: "cata",
    affixDescription: "cata",
  },
  {
    affixName: "sphygm",
    affixDescription: "sphygm-",
  },
  {
    affixName: "petro",
    affixDescription: "relating to rock",
  },
  {
    affixName: "ose",
    affixDescription: "-ose",
  },
  {
    affixName: "cyclo",
    affixDescription: "cyclo",
  },
  {
    affixName: "phyto",
    affixDescription: "phyto-",
  },
  {
    affixName: "radio",
    affixDescription: "radio-",
  },
  {
    affixName: "crypto",
    affixDescription: "crypto-",
  },
  {
    affixName: "phone",
    affixDescription: "phone-",
  },
  {
    affixName: "oligo",
    affixDescription: "oligo-",
  },
  {
    affixName: "phyto",
    affixDescription: "phyto-",
  },
  {
    affixName: "phylo",
    affixDescription: "phylo-",
  },
  {
    affixName: "infra",
    affixDescription: "infra-",
  },
  {
    affixName: "physico",
    affixDescription: "physico-",
  },
  {
    affixName: "clino",
    affixDescription: "clino-",
  },
  {
    affixName: "video",
    affixDescription: "video-",
  },
  {
    affixName: "otic",
    affixDescription: "otic",
  },
  {
    affixName: "mobile",
    affixDescription: "mobile-",
  },
  {
    affixName: "mechano",
    affixDescription: "mechano-",
  },
  {
    affixName: "geo",
    affixDescription: "relating to the land",
  },
  {
    affixName: "eme",
    affixDescription: "-eme",
  },
  {
    affixName: "zetta",
    affixDescription: "zetta-",
  },
  {
    affixName: "itol",
    affixDescription: "-itol",
  },
  {
    affixName: "proof",
    affixDescription: "immune from being affected or damaged by",
  },
  {
    affixName: "exa",
    affixDescription: "exa-",
  },
  {
    affixName: "peta",
    affixDescription: "peta-",
  },
  {
    affixName: "hypo",
    affixDescription: "hypo-",
  },
  {
    affixName: "hypno",
    affixDescription: "hypno-",
  },

  {
    affixName: "tera",
    affixDescription: "tera-",
  },
  {
    affixName: "mon",
    affixDescription: "mon-",
  },
  {
    affixName: "ana",
    affixDescription: "ana-",
  },
  {
    affixName: "arc",
    affixDescription: "arc-",
  },
  {
    affixName: "immuno",
    affixDescription: "immuno-",
  },
  {
    affixName: "femto",
    affixDescription: "femto-",
  },
  {
    affixName: "iso",
    affixDescription: "iso-",
    themes: ["chemistry"]
  },
  {
    affixName: "photo",
    affixDescription: "photo-",
  },
  {
    affixName: "levo",
    affixDescription: "levo-",
  },
  {
    affixName: "pari",
    affixDescription: "pari-",
  },

  {
    affixName: "dextro",
    affixDescription: "dextro-",
  },
  {
    affixName: "vaso",
    affixDescription: "vaso-",
  },
  {
    affixName: "syn",
    affixDescription: "syn-",
  },
  {
    affixName: "acro",
    affixDescription: "acro-",
  },
  {
    affixName: "sesqui",
    affixDescription: "increased by 50%",
  },

  {
    affixName: "physio",
    affixDescription: "physio-",
  },
  {
    affixName: "ob",
    affixDescription: "ob-",
  },
  {
    affixName: "amine",
    affixDescription: "amine-",
  },
  {
    affixName: "nocti",
    affixDescription: "nocti-",
  },
  {
    affixName: "narco",
    affixDescription: "narco-",
  },
  {
    affixName: "uria",
    affixDescription: "uria",
  },
  {
    affixName: "myria",
    affixDescription: "myria-",
  },
  {
    affixName: "audio",
    affixDescription: "audio",
  },
  {
    affixName: "lalia",
    affixDescription: "lalia",
  },
  {
    affixName: "ter",
    affixDescription: "ter",
  },
  {
    affixName: "bryo",
    affixDescription: "bryo",
  },
  {
    affixName: "tessara",
    affixDescription: "tessara",
  },

  {
    affixName: "penta",
    affixDescription: "penta",
  },
  {
    affixName: "ectomy",
    affixDescription: "ectomy",
  },
  {
    affixName: "oxalo",
    affixDescription: "oxalo",
  },
  {
    affixName: "octa",
    affixDescription: "octa",
  },
  {
    affixName: "centesis",
    affixDescription: "centesis",
  },
  {
    affixName: "tastic",
    affixDescription: "tastic",
  },
  {
    affixName: "mebi",
    affixDescription: "mebi",
  },
  {
    affixName: "kibi",
    affixDescription: "kibi",
  },
  {
    affixName: "spiro",
    affixDescription: "spiro",
  },
  {
    affixName: "cha",
    affixDescription: "cha",
  },
  {
    affixName: "bot",
    affixDescription: "bot",
  },
  {
    affixName: "socio",
    affixDescription: "socio",
  },
  {
    affixName: "astro",
    affixDescription: "astro",
  },
  {
    affixName: "duo",
    affixDescription: "duo",
  },
  {
    affixName: "gyro",
    affixDescription: "gyro",
  },
  {
    affixName: "iferous",
    affixDescription: "iferous",
  },
  {
    affixName: "morpho",
    affixDescription: "morpho",
  },
  {
    affixName: "icosa",
    affixDescription: "icosa",
  },
  {
    affixName: "nucleo",
    affixDescription: "nucleo",
  },
  {
    affixName: "eury",
    affixDescription: "eury",
  },
  {
    affixName: "onym",
    affixDescription: "onym",
  },
  {
    affixName: "deoxy",
    affixDescription: "deoxy",
  },
  {
    affixName: "lipo",
    affixDescription: "lipo",
  },
  {
    affixName: "wither",
    affixDescription: "wither",
  },
  {
    affixName: "bathy",
    affixDescription: "bathy",
  },
  {
    affixName: "supra",
    affixDescription: "supra",
  },
  {
    affixName: "endo",
    affixDescription: "endo",
  },
  {
    affixName: "adeno",
    affixDescription: "adeno",
  },
  {
    affixName: "iasis",
    affixDescription: "iasis",
  },
  {
    affixName: "back",
    affixDescription: "back",
  },
  {
    affixName: "nap",
    affixDescription: "nap",
  },
  {
    affixName: "deipno",
    affixDescription: "deipno",
  },
  {
    affixName: "quad",
    affixDescription: "quad",
  },
  {
    affixName: "ass",
    affixDescription: "ass",
  },
  {
    affixName: "eaterOf",
    affixDescription: "eaterOf",
  },
  {
    affixName: "pneumo",
    affixDescription: "pneumo",
  },
  {
    affixName: "side",
    affixDescription: "side",
  },
  {
    affixName: "techno",
    affixDescription: "techno",
  },
  {
    affixName: "uro",
    affixDescription: "uro",
  },
  {
    affixName: "eroo",
    affixDescription: "eroo",
  },
  {
    affixName: "iform",
    affixDescription: "iform",
  },
  {
    affixName: "opistho",
    affixDescription: "opistho",
  },
  {
    affixName: "graph",
    affixDescription: "graph",
  },
  {
    affixName: "genesis",
    affixDescription: "genesis",
  },
  {
    affixName: "ecto",
    affixDescription: "ecto",
  },
  {
    affixName: "ento",
    affixDescription: "ento",
  },
  {
    affixName: "ka",
    affixDescription: "ka",
  },
  {
    affixName: "fest",
    affixDescription: "fest",
  },
  {
    affixName: "gameto",
    affixDescription: "gameto",
  },
  {
    affixName: "neur",
    affixDescription: "neur",
  },
  {
    affixName: "angio",
    affixDescription: "angio",
  },
  {
    affixName: "urgy",
    affixDescription: "urgy",
  },
  {
    affixName: "cardio",
    affixDescription: "cardio",
  },
  {
    affixName: "pene",
    affixDescription: "pene",
  },
  {
    affixName: "meth",
    affixDescription: "meth",
  },
  {
    affixName: "mania",
    affixDescription: "mania",
  },
  {
    affixName: "phyte",
    affixDescription: "phyte",
  },
  {
    affixName: "hepta",
    affixDescription: "hepta",
  },
  {
    affixName: "theo",
    affixDescription: "theo",
  },
  {
    affixName: "ferro",
    affixDescription: "ferro",
  },
  {
    affixName: "ville",
    affixDescription: "ville",
  },
  {
    affixName: "tebi",
    affixDescription: "tebi",
  },
  {
    affixName: "end",
    affixDescription: "end",
  },
  {
    affixName: "gastro",
    affixDescription: "gastro",
  },
  {
    affixName: "osteo",
    affixDescription: "osteo",
  },
  {
    affixName: "isation",
    affixDescription: "isation",
  },
  {
    affixName: "rix",
    affixDescription: "rix",
  },
  {
    affixName: "burger",
    affixDescription: "burger",
  },
  {
    affixName: "chrono",
    affixDescription: "chrono",
  },
  {
    affixName: "ribo",
    affixDescription: "ribo",
  },
  {
    affixName: "twi",
    affixDescription: "twi",
  },
  {
    affixName: "icity",
    affixDescription: "icity",
  },
  {
    affixName: "palaeo",
    affixDescription: "palaeo",
  },
  {
    affixName: "oon",
    affixDescription: "oon",
  },
  {
    affixName: "extro",
    affixDescription: "extro",
  },
  {
    affixName: "fast",
    affixDescription: "fast",
  },
  {
    affixName: "escent",
    affixDescription: "escent",
  },
  {
    affixName: "piezo",
    affixDescription: "piezo",
  },
  {
    affixName: "amphi",
    affixDescription: "amphi",
  },
  {
    affixName: "azo",
    affixDescription: "azo",
  },
  {
    affixName: "cosmo",
    affixDescription: "cosmo",
  },
  {
    affixName: "alumino",
    affixDescription: "alumino",
  },
  {
    affixName: "boro",
    affixDescription: "boro",
  },
  {
    affixName: "organo",
    affixDescription: "organo",
  },
  {
    affixName: "cyano",
    affixDescription: "cyano",
  },
  {
    affixName: "dendro",
    affixDescription: "dendro",
  },
  {
    affixName: "ferri",
    affixDescription: "ferri",
  },
  {
    affixName: "myo",
    affixDescription: "myo",
  },
  {
    affixName: "cryo",
    affixDescription: "cryo",
  },
  {
    affixName: "morph",
    affixDescription: "morph",
  },
  {
    affixName: "repro",
    affixDescription: "repro",
  },
  {
    affixName: "metallo",
    affixDescription: "metallo",
  },
  {
    affixName: "zygo",
    affixDescription: "zygo",
  },
  {
    affixName: "zoö",
    affixDescription: "zoö",
  },
  {
    affixName: "gen",
    affixDescription: "gen",
  },
  {
    affixName: "oma",
    affixDescription: "oma",
  },
  {
    affixName: "cysto",
    affixDescription: "cysto",
  },
  {
    affixName: "anthropo",
    affixDescription: "anthropo",
  },
  {
    affixName: "licious",
    affixDescription: "licious",
  },
  {
    affixName: "Finno",
    affixDescription: "Finno",
  },
  {
    affixName: "encephalo",
    affixDescription: "encephalo",
  },
  {
    affixName: "histo",
    affixDescription: "histo",
  },
  {
    affixName: "atrio",
    affixDescription: "atrio",
  },
  {
    affixName: "ventriculo",
    affixDescription: "ventriculo",
  },
  {
    affixName: "logo",
    affixDescription: "logo",
  },
  {
    affixName: "chemi",
    affixDescription: "chemi",
  },
  {
    affixName: "ated",
    affixDescription: "ated",
  },
  {
    affixName: "ergic",
    affixDescription: "ergic",
  },
  {
    affixName: "palæo",
    affixDescription: "palæo",
  },
  {
    affixName: "latry",
    affixDescription: "latry",
  },
  {
    affixName: "acious",
    affixDescription: "acious",
  },
  {
    affixName: "derma",
    affixDescription: "derma",
  },
  {
    affixName: "amelo",
    affixDescription: "amelo",
  },
  {
    affixName: "spectro",
    affixDescription: "spectro",
  },
  {
    affixName: "eka",
    affixDescription: "eka",
  },
  {
    affixName: "Syro",
    affixDescription: "Syro",
  },
  {
    affixName: "mytho",
    affixDescription: "mytho",
  },
  {
    affixName: "maniac",
    affixDescription: "maniac",
  },
  {
    affixName: "sperma",
    affixDescription: "sperma",
  },
  {
    affixName: "ismus",
    affixDescription: "ismus",
  },
  {
    affixName: "quin",
    affixDescription: "quin",
  },
  {
    affixName: "viginti",
    affixDescription: "viginti",
  },
  {
    affixName: "hyp",
    affixDescription: "hyp",
  },
  {
    affixName: "ovo",
    affixDescription: "ovo",
  },
  {
    affixName: "nor",
    affixDescription: "nor",
  },
  {
    affixName: "antho",
    affixDescription: "antho",
  },
  {
    affixName: "patho",
    affixDescription: "patho",
  },
  {
    affixName: "emia",
    affixDescription: "emia",
  },
  {
    affixName: "magnet",
    affixDescription: "magnet",
  },
  {
    affixName: "magneto",
    affixDescription: "magneto",
  },
  {
    affixName: "metric",
    affixDescription: "metric",
  },
  {
    affixName: "religio",
    affixDescription: "religio",
  },
  {
    affixName: "dar",
    affixDescription: "dar",
  },
  {
    affixName: "com",
    affixDescription: "com",
  },
  {
    affixName: "quasi",
    affixDescription: "quasi",
  },
  {
    affixName: "astic",
    affixDescription: "astic",
  },
  {
    affixName: "sion",
    affixDescription: "sion",
  },
  {
    affixName: "dolicho",
    affixDescription: "dolicho",
  },
  {
    affixName: "cyte",
    affixDescription: "cyte",
  },
  {
    affixName: "xanth",
    affixDescription: "xanth",
  },
  {
    affixName: "leuco",
    affixDescription: "leuco",
  },
  {
    affixName: "setter",
    affixDescription: "setter",
  },
  {
    affixName: "muco",
    affixDescription: "muco",
  },
  {
    affixName: "phil",
    affixDescription: "phil",
  },
  {
    affixName: "adic",
    affixDescription: "adic",
  },
  {
    affixName: "turbo",
    affixDescription: "turbo",
  },
  {
    affixName: "visco",
    affixDescription: "visco",
  },
  {
    affixName: "long",
    affixDescription: "long",
  },
  {
    affixName: "ipsi",
    affixDescription: "ipsi",
  },
  {
    affixName: "stat",
    affixDescription: "stat",
  },
  {
    affixName: "arachno",
    affixDescription: "arachno",
  },
  {
    affixName: "ator",
    affixDescription: "ator",
  },
  {
    affixName: "nomino",
    affixDescription: "nomino",
  },
  {
    affixName: "verse",
    affixDescription: "verse",
  },
  {
    affixName: "race",
    affixDescription: "race",
  },
  {
    affixName: "plasty",
    affixDescription: "plasty",
  },
  {
    affixName: "gono",
    affixDescription: "gono",
  },
  {
    affixName: "dermato",
    affixDescription: "dermato",
  },
  {
    affixName: "xylo",
    affixDescription: "xylo",
  },
  {
    affixName: "xiphidio",
    affixDescription: "xiphidio",
  },
  {
    affixName: "quarter",
    affixDescription: "quarter",
  },
  {
    affixName: "germano",
    affixDescription: "germano",
  },
  {
    affixName: "phyllo",
    affixDescription: "phyllo",
  },
  {
    affixName: "enantio",
    affixDescription: "enantio",
  },
  {
    affixName: "Greco",
    affixDescription: "Greco",
  },
  {
    affixName: "strato",
    affixDescription: "strato",
  },
  {
    affixName: "ichno",
    affixDescription: "ichno",
  },
  {
    affixName: "illion",
    affixDescription: "illion",
  },
  {
    affixName: "meio",
    affixDescription: "meio",
  },
  {
    affixName: "aqua",
    affixDescription: "aqua",
  },
  {
    affixName: "xipho",
    affixDescription: "xipho",
  },
  {
    affixName: "porta",
    affixDescription: "porta",
  },
  {
    affixName: "steno",
    affixDescription: "steno",
  },
  {
    affixName: "aholic",
    affixDescription: "aholic",
  },
  {
    affixName: "Hiberno",
    affixDescription: "Hiberno",
  },
  {
    affixName: "hemo",
    affixDescription: "hemo",
  },
  {
    affixName: "silvo",
    affixDescription: "silvo",
  },
  {
    affixName: "ola",
    affixDescription: "ola",
  },
  {
    affixName: "parvo",
    affixDescription: "parvo",
  },
  {
    affixName: "phospho",
    affixDescription: "phospho",
  },
  {
    affixName: "sie",
    affixDescription: "sie",
  },
  {
    affixName: "benzo",
    affixDescription: "benzo",
  },
  {
    affixName: "hippo",
    affixDescription: "hippo",
  },
  {
    affixName: "lyso",
    affixDescription: "lyso",
  },
  {
    affixName: "cortico",
    affixDescription: "cortico",
  },
  {
    affixName: "anthra",
    affixDescription: "anthra",
  },
  {
    affixName: "pheno",
    affixDescription: "pheno",
  },
  {
    affixName: "butyro",
    affixDescription: "butyro",
  },
  {
    affixName: "plasto",
    affixDescription: "plasto",
  },
  {
    affixName: "gluco",
    affixDescription: "gluco",
  },
  {
    affixName: "octo",
    affixDescription: "octo",
  },
  {
    affixName: "cero",
    affixDescription: "cero",
  },
  {
    affixName: "astragalo",
    affixDescription: "astragalo",
  },
  {
    affixName: "auro",
    affixDescription: "auro",
  },
  {
    affixName: "athon",
    affixDescription: "athon",
  },
  {
    affixName: "amino",
    affixDescription: "amino",
  },
  {
    affixName: "heli",
    affixDescription: "heli",
  },
  {
    affixName: "landia",
    affixDescription: "landia",
  },
  {
    affixName: "ways",
    affixDescription: "ways",
  },
  {
    affixName: "taut",
    affixDescription: "taut",
  },
  {
    affixName: "hydroxy",
    affixDescription: "hydroxy",
  },
  {
    affixName: "phlebo",
    affixDescription: "phlebo",
  },
  {
    affixName: "chiro",
    affixDescription: "chiro",
  },
  {
    affixName: "flavo",
    affixDescription: "flavo",
  },
  {
    affixName: "keto",
    affixDescription: "keto",
  },
  {
    affixName: "ethno",
    affixDescription: "ethno",
  },
  {
    affixName: "myco",
    affixDescription: "myco",
  },
  {
    affixName: "oholic",
    affixDescription: "oholic",
  },
  {
    affixName: "lysis",
    affixDescription: "lysis",
  },
  {
    affixName: "arium",
    affixDescription: "arium",
  },
  {
    affixName: "carbo",
    affixDescription: "carbo",
  },
  {
    affixName: "oxo",
    affixDescription: "oxo",
  },
  {
    affixName: "sulfo",
    affixDescription: "sulfo",
  },
  {
    affixName: "bis",
    affixDescription: "bis",
  },
  {
    affixName: "bromo",
    affixDescription: "bromo",
  },
  {
    affixName: "scape",
    affixDescription: "scape",
  },
  {
    affixName: "dehydro",
    affixDescription: "dehydro",
  },
  {
    affixName: "ista",
    affixDescription: "ista",
  },
  {
    affixName: "fluoro",
    affixDescription: "fluoro",
  },
  {
    affixName: "onco",
    affixDescription: "onco",
  },
  {
    affixName: "glycosamino",
    affixDescription: "glycosamino",
  },
  {
    affixName: "antero",
    affixDescription: "antero",
  },
  {
    affixName: "escence",
    affixDescription: "escence",
  },
  {
    affixName: "aemia",
    affixDescription: "aemia",
  },
  {
    affixName: "seleno",
    affixDescription: "seleno",
  },
  {
    affixName: "hepato",
    affixDescription: "hepato",
  },
  {
    affixName: "tricho",
    affixDescription: "tricho",
  },
  {
    affixName: "ino",
    affixDescription: "ino",
  },
  {
    affixName: "sulpho",
    affixDescription: "sulpho",
  },
  {
    affixName: "brachy",
    affixDescription: "brachy",
  },
  {
    affixName: "ers",
    affixDescription: "ers",
  },
  {
    affixName: "perma",
    affixDescription: "perma",
  },
  {
    affixName: "polis",
    affixDescription: "polis",
  },
  {
    affixName: "chloro",
    affixDescription: "chloro",
  },
  {
    affixName: "halo",
    affixDescription: "halo",
  },
  {
    affixName: "kerato",
    affixDescription: "kerato",
  },
  {
    affixName: "phono",
    affixDescription: "phono",
  },
  {
    affixName: "hex",
    affixDescription: "hex",
  },
  {
    affixName: "oct",
    affixDescription: "oct",
  },
  {
    affixName: "hystero",
    affixDescription: "hystero",
  },
  {
    affixName: "ific",
    affixDescription: "ific",
  },
  {
    affixName: "pluri",
    affixDescription: "pluri",
  },
  {
    affixName: "iatro",
    affixDescription: "iatro",
  },
  {
    affixName: "floxacin",
    affixDescription: "floxacin",
  },
  {
    affixName: "blepharo",
    affixDescription: "blepharo",
  },
  {
    affixName: "bary",
    affixDescription: "bary",
  },
  {
    affixName: "actino",
    affixDescription: "actino",
  },
  {
    affixName: "psychro",
    affixDescription: "psychro",
  },
  {
    affixName: "psychoto",
    affixDescription: "psychoto",
  },
  {
    affixName: "brevi",
    affixDescription: "brevi",
  },
  {
    affixName: "burg",
    affixDescription: "burg",
  },
  {
    affixName: "esce",
    affixDescription: "esce",
  },
  {
    affixName: "ptilo",
    affixDescription: "ptilo",
  },
  {
    affixName: "he",
    affixDescription: "he",
  },
  {
    affixName: "gerous",
    affixDescription: "gerous",
  },
  {
    affixName: "tic",
    affixDescription: "tic",
  },
  {
    affixName: "hemato",
    affixDescription: "hemato",
  },
  {
    affixName: "lev",
    affixDescription: "lev",
  },
  {
    affixName: "plano",
    affixDescription: "plano",
  },
  {
    affixName: "morphic",
    affixDescription: "morphic",
  },
  {
    affixName: "melo",
    affixDescription: "melo",
  },
  {
    affixName: "dactylo",
    affixDescription: "dactylo",
  },
  {
    affixName: "x",
    affixDescription: "x",
  },
  {
    affixName: "musculo",
    affixDescription: "musculo",
  },
  {
    affixName: "normo",
    affixDescription: "normo",
  },
  {
    affixName: "cranio",
    affixDescription: "cranio",
  },
  {
    affixName: "cephalo",
    affixDescription: "cephalo",
  },
  {
    affixName: "form",
    affixDescription: "form",
  },
  {
    affixName: "centric",
    affixDescription: "centric",
  },
  {
    affixName: "rhizo",
    affixDescription: "rhizo",
  },
  {
    affixName: "aldo",
    affixDescription: "aldo",
  },
  {
    affixName: "ologist",
    affixDescription: "ologist",
  },
  {
    affixName: "gate",
    affixDescription: "gate",
  },
  {
    affixName: "servo",
    affixDescription: "servo",
  },
  {
    affixName: "preneur",
    affixDescription: "preneur",
  },
  {
    affixName: "chion",
    affixDescription: "chion",
  },
  {
    affixName: "salpingo",
    affixDescription: "salpingo",
  },
  {
    affixName: "sono",
    affixDescription: "sono",
  },
  {
    affixName: "opto",
    affixDescription: "opto",
  },
  {
    affixName: "broncho",
    affixDescription: "broncho",
  },
  {
    affixName: "osity",
    affixDescription: "osity",
  },
  {
    affixName: "opia",
    affixDescription: "opia",
  },
  {
    affixName: "necro",
    affixDescription: "necro",
  },
  {
    affixName: "vorous",
    affixDescription: "vorous",
  },
  {
    affixName: "rheo",
    affixDescription: "rheo",
  },
  {
    affixName: "alpha",
    affixDescription: "alpha",
  },
  {
    affixName: "oro",
    affixDescription: "oro",
  },
  {
    affixName: "omics",
    affixDescription: "omics",
  },
  {
    affixName: "izer",
    affixDescription: "izer",
  },
  {
    affixName: "nether",
    affixDescription: "nether",
  },
  {
    affixName: "ergo",
    affixDescription: "ergo",
  },
  {
    affixName: "chole",
    affixDescription: "chole",
  },
  {
    affixName: "sito",
    affixDescription: "sito",
  },
  {
    affixName: "telo",
    affixDescription: "telo",
  },
  {
    affixName: "oleo",
    affixDescription: "oleo",
  },
  {
    affixName: "thyro",
    affixDescription: "thyro",
  },
  {
    affixName: "gamo",
    affixDescription: "gamo",
  },
  {
    affixName: "dorsi",
    affixDescription: "dorsi",
  },
  {
    affixName: "genous",
    affixDescription: "genous",
  },
  {
    affixName: "cidal",
    affixDescription: "cidal",
  },
  {
    affixName: "Fitz",
    affixDescription: "Fitz",
  },
  {
    affixName: "U",
    affixDescription: "U",
  },
  {
    affixName: "cerebro",
    affixDescription: "cerebro",
  },
  {
    affixName: "myelo",
    affixDescription: "myelo",
  },
  {
    affixName: "pharmaco",
    affixDescription: "pharmaco",
  },
  {
    affixName: "hylo",
    affixDescription: "hylo",
  },
  {
    affixName: "robo",
    affixDescription: "robo",
  },
  {
    affixName: "sacro",
    affixDescription: "sacro",
  },
  {
    affixName: "ilio",
    affixDescription: "ilio",
  },
  {
    affixName: "retino",
    affixDescription: "retino",
  },
  {
    affixName: "entero",
    affixDescription: "entero",
  },
  {
    affixName: "gravito",
    affixDescription: "gravito",
  },
  {
    affixName: "Ibero",
    affixDescription: "Ibero",
  },
  {
    affixName: "haem",
    affixDescription: "haem",
  },
  {
    affixName: "naso",
    affixDescription: "naso",
  },
  {
    affixName: "otomy",
    affixDescription: "otomy",
  },
  {
    affixName: "etio",
    affixDescription: "etio",
  },
  {
    affixName: "gyno",
    affixDescription: "gyno",
  },
  {
    affixName: "ridden",
    affixDescription: "ridden",
  },
  {
    affixName: "parous",
    affixDescription: "parous",
  },
  {
    affixName: "adreno",
    affixDescription: "adreno",
  },
  {
    affixName: "vibro",
    affixDescription: "vibro",
  },
  {
    affixName: "crat",
    affixDescription: "crat",
  },
  {
    affixName: "adipo",
    affixDescription: "adipo",
  },
  {
    affixName: "even",
    affixDescription: "even",
  },
  {
    affixName: "Arcado",
    affixDescription: "Arcado",
  },
  {
    affixName: "nephro",
    affixDescription: "nephro",
  },
  {
    affixName: "Judeo",
    affixDescription: "Judeo",
  },
  {
    affixName: "'d",
    affixDescription: "'d",
  },
  {
    affixName: "anarcho",
    affixDescription: "anarcho",
  },
  {
    affixName: "bacterio",
    affixDescription: "bacterio",
  },
  {
    affixName: "acousto",
    affixDescription: "acousto",
  },
  {
    affixName: "onium",
    affixDescription: "onium",
  },
  {
    affixName: "benz",
    affixDescription: "benz",
  },
  {
    affixName: "Sino",
    affixDescription: "Sino",
  },
  {
    affixName: "Franco",
    affixDescription: "Franco",
  },
  {
    affixName: "Russo",
    affixDescription: "Russo",
  },
  {
    affixName: "Luso",
    affixDescription: "Luso",
  },
  {
    affixName: "scapulo",
    affixDescription: "scapulo",
  },
  {
    affixName: "log",
    affixDescription: "log",
  },
  {
    affixName: "therm",
    affixDescription: "therm",
  },
  {
    affixName: "caine",
    affixDescription: "caine",
  },
  {
    affixName: "tomy",
    affixDescription: "tomy",
  },
  {
    affixName: "semio",
    affixDescription: "semio",
  },
  {
    affixName: "arseno",
    affixDescription: "arseno",
  },
  {
    affixName: "hapto",
    affixDescription: "hapto",
  },
  {
    affixName: "dodeca",
    affixDescription: "dodeca",
  },
  {
    affixName: "panto",
    affixDescription: "panto",
  },
  {
    affixName: "sero",
    affixDescription: "sero",
  },
  {
    affixName: "nonadeca",
    affixDescription: "nonadeca",
  },
  {
    affixName: "ocracy",
    affixDescription: "ocracy",
  },
  {
    affixName: "phallo",
    affixDescription: "phallo",
  },
  {
    affixName: "ambi",
    affixDescription: "ambi",
  },
  {
    affixName: "wash",
    affixDescription: "wash",
  },
  {
    affixName: "cupro",
    affixDescription: "cupro",
  },
  {
    affixName: "mangano",
    affixDescription: "mangano",
  },
  {
    affixName: "terato",
    affixDescription: "terato",
  },
  {
    affixName: "pleuro",
    affixDescription: "pleuro",
  },
  {
    affixName: "tracheo",
    affixDescription: "tracheo",
  },
  {
    affixName: "andro",
    affixDescription: "andro",
  },
  {
    affixName: "magnesio",
    affixDescription: "magnesio",
  },
  {
    affixName: "mero",
    affixDescription: "mero",
  },
  {
    affixName: "rhino",
    affixDescription: "rhino",
  },
  {
    affixName: "haemato",
    affixDescription: "haemato",
  },
  {
    affixName: "insta",
    affixDescription: "insta",
  },
  {
    affixName: "cholecysto",
    affixDescription: "cholecysto",
  },
  {
    affixName: "lexico",
    affixDescription: "lexico",
  },
  {
    affixName: "desoxy",
    affixDescription: "desoxy",
  },
  {
    affixName: "toxico",
    affixDescription: "toxico",
  },
  {
    affixName: "Edward",
    affixDescription: "Edward",
  },
  {
    affixName: "bin",
    affixDescription: "bin",
  },
  {
    affixName: "homeo",
    affixDescription: "homeo",
  },
  {
    affixName: "telluro",
    affixDescription: "telluro",
  },
  {
    affixName: "haplo",
    affixDescription: "haplo",
  },
  {
    affixName: "plani",
    affixDescription: "plani",
  },
  {
    affixName: "pedo",
    affixDescription: "pedo",
  },
  {
    affixName: "paedo",
    affixDescription: "paedo",
  },
  {
    affixName: "biblio",
    affixDescription: "biblio",
  },
  {
    affixName: "blast",
    affixDescription: "blast",
  },
  {
    affixName: "emics",
    affixDescription: "emics",
  },
  {
    affixName: "regio",
    affixDescription: "regio",
  },
  {
    affixName: "pachy",
    affixDescription: "pachy",
  },
  {
    affixName: "phage",
    affixDescription: "phage",
  },
  {
    affixName: "mandibulo",
    affixDescription: "mandibulo",
  },
  {
    affixName: "amylo",
    affixDescription: "amylo",
  },
  {
    affixName: "viscero",
    affixDescription: "viscero",
  },
  {
    affixName: "amundo",
    affixDescription: "amundo",
  },
  {
    affixName: "silico",
    affixDescription: "silico",
  },
  {
    affixName: "platino",
    affixDescription: "platino",
  },
  {
    affixName: "oside",
    affixDescription: "oside",
  },
  {
    affixName: "ina",
    affixDescription: "ina",
  },
  {
    affixName: "La",
    affixDescription: "La",
  },
  {
    affixName: "archy",
    affixDescription: "archy",
  },
  {
    affixName: "fos",
    affixDescription: "fos",
  },
  {
    affixName: "navir",
    affixDescription: "navir",
  },
  {
    affixName: "poiesis",
    affixDescription: "poiesis",
  },
  {
    affixName: "ligno",
    affixDescription: "ligno",
  },
  {
    affixName: "Latino",
    affixDescription: "Latino",
  },
  {
    affixName: "topo",
    affixDescription: "topo",
  },
  {
    affixName: "osmo",
    affixDescription: "osmo",
  },
  {
    affixName: "chromo",
    affixDescription: "chromo",
  },
  {
    affixName: "methyl",
    affixDescription: "methyl",
  },
  {
    affixName: "holo",
    affixDescription: "holo",
  },
  {
    affixName: "core",
    affixDescription: "core",
  },
  {
    affixName: "notho",
    affixDescription: "notho",
  },
  {
    affixName: "thrombo",
    affixDescription: "thrombo",
  },
  {
    affixName: "vacci",
    affixDescription: "vacci",
  },
  {
    affixName: "mancy",
    affixDescription: "mancy",
  },
  {
    affixName: "leuko",
    affixDescription: "leuko",
  },
  {
    affixName: "seismo",
    affixDescription: "seismo",
  },
  {
    affixName: "spatio",
    affixDescription: "spatio",
  },
  {
    affixName: "sclero",
    affixDescription: "sclero",
  },
  {
    affixName: "sex",
    affixDescription: "sex",
  },
  {
    affixName: "synchro",
    affixDescription: "synchro",
  },
  {
    affixName: "aza",
    affixDescription: "aza",
  },
  {
    affixName: "trito",
    affixDescription: "trito",
  },
  {
    affixName: "nym",
    affixDescription: "nym",
  },
  {
    affixName: "olan",
    affixDescription: "olan",
  },
  {
    affixName: "chlor",
    affixDescription: "chlor",
  },
  {
    affixName: "sies",
    affixDescription: "sies",
  },
  {
    affixName: "allelo",
    affixDescription: "allelo",
  },
  {
    affixName: "oyl",
    affixDescription: "oyl",
  },
  {
    affixName: "pubo",
    affixDescription: "pubo",
  },
  {
    affixName: "kins",
    affixDescription: "kins",
  },
  {
    affixName: "ano",
    affixDescription: "ano",
  },
  {
    affixName: "somato",
    affixDescription: "somato",
  },
  {
    affixName: "Daco",
    affixDescription: "Daco",
  },
  {
    affixName: "hyalo",
    affixDescription: "hyalo",
  },
  {
    affixName: "colo",
    affixDescription: "colo",
  },
  {
    affixName: "Istro",
    affixDescription: "Istro",
  },
  {
    affixName: "Macedo",
    affixDescription: "Macedo",
  },
  {
    affixName: "baculo",
    affixDescription: "baculo",
  },
  {
    affixName: "deutero",
    affixDescription: "deutero",
  },
  {
    affixName: "Christo",
    affixDescription: "Christo",
  },
  {
    affixName: "blasto",
    affixDescription: "blasto",
  },
  {
    affixName: "orial",
    affixDescription: "orial",
  },
  {
    affixName: "tribo",
    affixDescription: "tribo",
  },
  {
    affixName: "mo",
    affixDescription: "mo",
  },
  {
    affixName: "chondro",
    affixDescription: "chondro",
  },
  {
    affixName: "nomics",
    affixDescription: "nomics",
  },
  {
    affixName: "hygro",
    affixDescription: "hygro",
  },
  {
    affixName: "formo",
    affixDescription: "formo",
  },
  {
    affixName: "cock",
    affixDescription: "cock",
  },
  {
    affixName: "war",
    affixDescription: "war",
  },
  {
    affixName: "feto",
    affixDescription: "feto",
  },
  {
    affixName: "cholangio",
    affixDescription: "cholangio",
  },
  {
    affixName: "rhabdo",
    affixDescription: "rhabdo",
  },
  {
    affixName: "leio",
    affixDescription: "leio",
  },
  {
    affixName: "gero",
    affixDescription: "gero",
  },
  {
    affixName: "lings",
    affixDescription: "lings",
  },
  {
    affixName: "tomo",
    affixDescription: "tomo",
  },
  {
    affixName: "dino",
    affixDescription: "dino",
  },
  {
    affixName: "trigemino",
    affixDescription: "trigemino",
  },
  {
    affixName: "teno",
    affixDescription: "teno",
  },
  {
    affixName: "stan",
    affixDescription: "stan",
  },
  {
    affixName: "aniso",
    affixDescription: "aniso",
  },
  {
    affixName: "preter",
    affixDescription: "preter",
  },
  {
    affixName: "lacto",
    affixDescription: "lacto",
  },
  {
    affixName: "lith",
    affixDescription: "lith",
  },
  {
    affixName: "postero",
    affixDescription: "postero",
  },
  {
    affixName: "phaeo",
    affixDescription: "phaeo",
  },
  {
    affixName: "idio",
    affixDescription: "idio",
  },
  {
    affixName: "tous",
    affixDescription: "tous",
  },
  {
    affixName: "wick",
    affixDescription: "wick",
  },
  {
    affixName: "colous",
    affixDescription: "colous",
  },
  {
    affixName: "glio",
    affixDescription: "glio",
  },
  {
    affixName: "procto",
    affixDescription: "procto",
  },
  {
    affixName: "thia",
    affixDescription: "thia",
  },
  {
    affixName: "juxta",
    affixDescription: "juxta",
  },
  {
    affixName: "basidio",
    affixDescription: "basidio",
  },
  {
    affixName: "pebi",
    affixDescription: "pebi",
  },
  {
    affixName: "myringo",
    affixDescription: "myringo",
  },
  {
    affixName: "lact",
    affixDescription: "lact",
  },
  {
    affixName: "schizo",
    affixDescription: "schizo",
  },
  {
    affixName: "choano",
    affixDescription: "choano",
  },
  {
    affixName: "sexuo",
    affixDescription: "sexuo",
  },
  {
    affixName: "grapher",
    affixDescription: "grapher",
  },
  {
    affixName: "chylo",
    affixDescription: "chylo",
  },
  {
    affixName: "excito",
    affixDescription: "excito",
  },
  {
    affixName: "axo",
    affixDescription: "axo",
  },
  {
    affixName: "galacto",
    affixDescription: "galacto",
  },
  {
    affixName: "gluta",
    affixDescription: "gluta",
  },
  {
    affixName: "iodo",
    affixDescription: "iodo",
  },
  {
    affixName: "proteo",
    affixDescription: "proteo",
  },
  {
    affixName: "scapho",
    affixDescription: "scapho",
  },
  {
    affixName: "nona",
    affixDescription: "nona",
  },
  {
    affixName: "undeca",
    affixDescription: "undeca",
  },
  {
    affixName: "sploitation",
    affixDescription: "sploitation",
  },
  {
    affixName: "ski",
    affixDescription: "ski",
  },
  {
    affixName: "orphine",
    affixDescription: "orphine",
  },
  {
    affixName: "eridine",
    affixDescription: "eridine",
  },
  {
    affixName: "ethidine",
    affixDescription: "ethidine",
  },
  {
    affixName: "azocine",
    affixDescription: "azocine",
  },
  {
    affixName: "fentanil",
    affixDescription: "fentanil",
  },
  {
    affixName: "peptido",
    affixDescription: "peptido",
  },
  {
    affixName: "methoxy",
    affixDescription: "methoxy",
  },
  {
    affixName: "glacio",
    affixDescription: "glacio",
  },
  {
    affixName: "gon",
    affixDescription: "gon",
  },
  {
    affixName: "lepto",
    affixDescription: "lepto",
  },
  {
    affixName: "spino",
    affixDescription: "spino",
  },
  {
    affixName: "oxa",
    affixDescription: "oxa",
  },
  {
    affixName: "sym",
    affixDescription: "sym",
  },
  {
    affixName: "aut",
    affixDescription: "aut",
  },
  {
    affixName: "epoxy",
    affixDescription: "epoxy",
  },
  {
    affixName: "idine",
    affixDescription: "idine",
  },
  {
    affixName: "thromb",
    affixDescription: "thromb",
  },
  {
    affixName: "anhydro",
    affixDescription: "anhydro",
  },
  {
    affixName: "erythro",
    affixDescription: "erythro",
  },
  {
    affixName: "fructo",
    affixDescription: "fructo",
  },
  {
    affixName: "fuco",
    affixDescription: "fuco",
  },
  {
    affixName: "hepto",
    affixDescription: "hepto",
  },
  {
    affixName: "manno",
    affixDescription: "manno",
  },
  {
    affixName: "hexo",
    affixDescription: "hexo",
  },
  {
    affixName: "pento",
    affixDescription: "pento",
  },
  {
    affixName: "rhamno",
    affixDescription: "rhamno",
  },
  {
    affixName: "malto",
    affixDescription: "malto",
  },
  {
    affixName: "clinico",
    affixDescription: "clinico",
  },
  {
    affixName: "glycero",
    affixDescription: "glycero",
  },
  {
    affixName: "carp",
    affixDescription: "carp",
  },
  {
    affixName: "glutar",
    affixDescription: "glutar",
  },
  {
    affixName: "batho",
    affixDescription: "batho",
  },
  {
    affixName: "hypso",
    affixDescription: "hypso",
  },
  {
    affixName: "centro",
    affixDescription: "centro",
  },
  {
    affixName: "baso",
    affixDescription: "baso",
  },
  {
    affixName: "pauci",
    affixDescription: "pauci",
  },
  {
    affixName: "tropic",
    affixDescription: "tropic",
  },
  {
    affixName: "ideo",
    affixDescription: "ideo",
  },
  {
    affixName: "laryngo",
    affixDescription: "laryngo",
  },
  {
    affixName: "my",
    affixDescription: "my",
  },
  {
    affixName: "pisci",
    affixDescription: "pisci",
  },
  {
    affixName: "sympatho",
    affixDescription: "sympatho",
  },
  {
    affixName: "copro",
    affixDescription: "copro",
  },
  {
    affixName: "melano",
    affixDescription: "melano",
  },
  {
    affixName: "through",
    affixDescription: "through",
  },
  {
    affixName: "calci",
    affixDescription: "calci",
  },
  {
    affixName: "litho",
    affixDescription: "litho",
  },
  {
    affixName: "gnatho",
    affixDescription: "gnatho",
  },
  {
    affixName: "vertebro",
    affixDescription: "vertebro",
  },
  {
    affixName: "fibro",
    affixDescription: "fibro",
  },
  {
    affixName: "elasto",
    affixDescription: "elasto",
  },
  {
    affixName: "Croato",
    affixDescription: "Croato",
  },
  {
    affixName: "Balto",
    affixDescription: "Balto",
  },
  {
    affixName: "kini",
    affixDescription: "kini",
  },
  {
    affixName: "mans",
    affixDescription: "mans",
  },
  {
    affixName: "orbito",
    affixDescription: "orbito",
  },
  {
    affixName: "brachio",
    affixDescription: "brachio",
  },
  {
    affixName: "atropo",
    affixDescription: "atropo",
  },
  {
    affixName: "arabine",
    affixDescription: "arabine",
  },
  {
    affixName: "mustine",
    affixDescription: "mustine",
  },
  {
    affixName: "mercapto",
    affixDescription: "mercapto",
  },
  {
    affixName: "mito",
    affixDescription: "mito",
  },
  {
    affixName: "rubicin",
    affixDescription: "rubicin",
  },
  {
    affixName: "trophy",
    affixDescription: "trophy",
  },
  {
    affixName: "archi",
    affixDescription: "archi",
  },
  {
    affixName: "parieto",
    affixDescription: "parieto",
  },
  {
    affixName: "of",
    affixDescription: "of",
  },
  {
    affixName: "deuter",
    affixDescription: "deuter",
  },
  {
    affixName: "pent",
    affixDescription: "pent",
  },
  {
    affixName: "hept",
    affixDescription: "hept",
  },
  {
    affixName: "unfeigned",
    affixDescription: "unfeigned",
  },
  {
    affixName: "sterno",
    affixDescription: "sterno",
  },
  {
    affixName: "twin",
    affixDescription: "twin",
  },
  {
    affixName: "nemat",
    affixDescription: "nemat",
  },
  {
    affixName: "spoligo",
    affixDescription: "spoligo",
  },
  {
    affixName: "materno",
    affixDescription: "materno",
  },
  {
    affixName: "tono",
    affixDescription: "tono",
  },
  {
    affixName: "phago",
    affixDescription: "phago",
  },
  {
    affixName: "tropism",
    affixDescription: "tropism",
  },
  {
    affixName: "mnemo",
    affixDescription: "mnemo",
  },
  {
    affixName: "brady",
    affixDescription: "brady",
  },
  {
    affixName: "magno",
    affixDescription: "magno",
  },
  {
    affixName: "az",
    affixDescription: "az",
  },
  {
    affixName: "chito",
    affixDescription: "chito",
  },
  {
    affixName: "viro",
    affixDescription: "viro",
  },
  {
    affixName: "visuo",
    affixDescription: "visuo",
  },
  {
    affixName: "platy",
    affixDescription: "platy",
  },
  {
    affixName: "reticulo",
    affixDescription: "reticulo",
  },
  {
    affixName: "bie",
    affixDescription: "bie",
  },
  {
    affixName: "myxo",
    affixDescription: "myxo",
  },
  {
    affixName: "culturo",
    affixDescription: "culturo",
  },
  {
    affixName: "stauro",
    affixDescription: "stauro",
  },
  {
    affixName: "titano",
    affixDescription: "titano",
  },
  {
    affixName: "iana",
    affixDescription: "iana",
  },
  {
    affixName: "yobi",
    affixDescription: "yobi",
  },
  {
    affixName: "zebi",
    affixDescription: "zebi",
  },
  {
    affixName: "wave",
    affixDescription: "wave",
  },
  {
    affixName: "actuo",
    affixDescription: "actuo",
  },
  {
    affixName: "zinco",
    affixDescription: "zinco",
  },
  {
    affixName: "digi",
    affixDescription: "digi",
  },
  {
    affixName: "acaro",
    affixDescription: "acaro",
  },
  {
    affixName: "sarco",
    affixDescription: "sarco",
  },
  {
    affixName: "azido",
    affixDescription: "azido",
  },
  {
    affixName: "teleo",
    affixDescription: "teleo",
  },
  {
    affixName: "recto",
    affixDescription: "recto",
  },
  {
    affixName: "angusti",
    affixDescription: "angusti",
  },
  {
    affixName: "hipp",
    affixDescription: "hipp",
  },
  {
    affixName: "onic",
    affixDescription: "onic",
  },
  {
    affixName: "quadrato",
    affixDescription: "quadrato",
  },
  {
    affixName: "cheilo",
    affixDescription: "cheilo",
  },
  {
    affixName: "meister",
    affixDescription: "meister",
  },
  {
    affixName: "anth",
    affixDescription: "anth",
  },
  {
    affixName: "Uto",
    affixDescription: "Uto",
  },
  {
    affixName: "ji",
    affixDescription: "ji",
  },
  {
    affixName: "chorio",
    affixDescription: "chorio",
  },
  {
    affixName: "sphero",
    affixDescription: "sphero",
  },
  {
    affixName: "picro",
    affixDescription: "picro",
  },
  {
    affixName: "supero",
    affixDescription: "supero",
  },
  {
    affixName: "ischio",
    affixDescription: "ischio",
  },
  {
    affixName: "dorso",
    affixDescription: "dorso",
  },
  {
    affixName: "mela",
    affixDescription: "mela",
  },
  {
    affixName: "cavo",
    affixDescription: "cavo",
  },
  {
    affixName: "lyze",
    affixDescription: "lyze",
  },
  {
    affixName: "gravi",
    affixDescription: "gravi",
  },
  {
    affixName: "hadro",
    affixDescription: "hadro",
  },
  {
    affixName: "lumbo",
    affixDescription: "lumbo",
  },
  {
    affixName: "deaza",
    affixDescription: "deaza",
  },
  {
    affixName: "sino",
    affixDescription: "sino",
  },
  {
    affixName: "tauto",
    affixDescription: "tauto",
  },
  {
    affixName: "asco",
    affixDescription: "asco",
  },
  {
    affixName: "cine",
    affixDescription: "cine",
  },
  {
    affixName: "eroto",
    affixDescription: "eroto",
  },
  {
    affixName: "phosphoro",
    affixDescription: "phosphoro",
  },
  {
    affixName: "palato",
    affixDescription: "palato",
  },
  {
    affixName: "calcio",
    affixDescription: "calcio",
  },
  {
    affixName: "z",
    affixDescription: "z",
  },
  {
    affixName: "sidero",
    affixDescription: "sidero",
  },
  {
    affixName: "quinque",
    affixDescription: "quinque",
  },
  {
    affixName: "front",
    affixDescription: "front",
  },
  {
    affixName: "ptero",
    affixDescription: "ptero",
  },
  {
    affixName: "arte",
    affixDescription: "arte",
  },
  {
    affixName: "typo",
    affixDescription: "typo",
  },
  {
    affixName: "utero",
    affixDescription: "utero",
  },
  {
    affixName: "grapho",
    affixDescription: "grapho",
  },
  {
    affixName: "genin",
    affixDescription: "genin",
  },
  {
    affixName: "ventri",
    affixDescription: "ventri",
  },
  {
    affixName: "orium",
    affixDescription: "orium",
  },
  {
    affixName: "basi",
    affixDescription: "basi",
  },
  {
    affixName: "tachy",
    affixDescription: "tachy",
  },
  {
    affixName: "qu",
    affixDescription: "qu",
  },
  {
    affixName: "bronchio",
    affixDescription: "bronchio",
  },
  {
    affixName: "caudo",
    affixDescription: "caudo",
  },
  {
    affixName: "maxillo",
    affixDescription: "maxillo",
  },
  {
    affixName: "ified",
    affixDescription: "ified",
  },
  {
    affixName: "hedron",
    affixDescription: "hedron",
  },
  {
    affixName: "klepto",
    affixDescription: "klepto",
  },
  {
    affixName: "entomo",
    affixDescription: "entomo",
  },
  {
    affixName: "ethmo",
    affixDescription: "ethmo",
  },
  {
    affixName: "glosso",
    affixDescription: "glosso",
  },
  {
    affixName: "acanth",
    affixDescription: "acanth",
  },
  {
    affixName: "mate",
    affixDescription: "mate",
  },
  {
    affixName: "ophthalmo",
    affixDescription: "ophthalmo",
  },
  {
    affixName: "naphtho",
    affixDescription: "naphtho",
  },
  {
    affixName: "nido",
    affixDescription: "nido",
  },
  {
    affixName: "palyno",
    affixDescription: "palyno",
  },
  {
    affixName: "fronto",
    affixDescription: "fronto",
  },
  {
    affixName: "thon",
    affixDescription: "thon",
  },
  {
    affixName: "choledocho",
    affixDescription: "choledocho",
  },
  {
    affixName: "buterol",
    affixDescription: "buterol",
  },
  {
    affixName: "water",
    affixDescription: "water",
  },
  {
    affixName: "imibe",
    affixDescription: "imibe",
  },
  {
    affixName: "vastatin",
    affixDescription: "vastatin",
  },
  {
    affixName: "coxib",
    affixDescription: "coxib",
  },
  {
    affixName: "ur",
    affixDescription: "ur",
  },
  {
    affixName: "thanato",
    affixDescription: "thanato",
  },
  {
    affixName: "bucco",
    affixDescription: "bucco",
  },
  {
    affixName: "galvano",
    affixDescription: "galvano",
  },
  {
    affixName: "infero",
    affixDescription: "infero",
  },
  {
    affixName: "Malayo",
    affixDescription: "Malayo",
  },
  {
    affixName: "proximo",
    affixDescription: "proximo",
  },
  {
    affixName: "baryto",
    affixDescription: "baryto",
  },
  {
    affixName: "fluor",
    affixDescription: "fluor",
  },
  {
    affixName: "ized",
    affixDescription: "ized",
  },
  {
    affixName: "poro",
    affixDescription: "poro",
  },
  {
    affixName: "bactam",
    affixDescription: "bactam",
  },
  {
    affixName: "sialo",
    affixDescription: "sialo",
  },
  {
    affixName: "lite",
    affixDescription: "lite",
  },
  {
    affixName: "philic",
    affixDescription: "philic",
  },
  {
    affixName: "bamate",
    affixDescription: "bamate",
  },
  {
    affixName: "crete",
    affixDescription: "crete",
  },
  {
    affixName: "thalamo",
    affixDescription: "thalamo",
  },
  {
    affixName: "scoto",
    affixDescription: "scoto",
  },
  {
    affixName: "ventro",
    affixDescription: "ventro",
  },
  {
    affixName: "men",
    affixDescription: "men",
  },
  {
    affixName: "vesico",
    affixDescription: "vesico",
  },
  {
    affixName: "delto",
    affixDescription: "delto",
  },
  {
    affixName: "exbi",
    affixDescription: "exbi",
  },
  {
    affixName: "rostro",
    affixDescription: "rostro",
  },
  {
    affixName: "tert",
    affixDescription: "tert",
  },
  {
    affixName: "info",
    affixDescription: "info",
  },
  {
    affixName: "mesio",
    affixDescription: "mesio",
  },
  {
    affixName: "ciclovir",
    affixDescription: "ciclovir",
  },
  {
    affixName: "traline",
    affixDescription: "traline",
  },
  {
    affixName: "oto",
    affixDescription: "oto",
  },
  {
    affixName: "sulfa",
    affixDescription: "sulfa",
  },
  {
    affixName: "masso",
    affixDescription: "masso",
  },
  {
    affixName: "masto",
    affixDescription: "masto",
  },
  {
    affixName: "reno",
    affixDescription: "reno",
  },
  {
    affixName: "ileo",
    affixDescription: "ileo",
  },
  {
    affixName: "dilol",
    affixDescription: "dilol",
  },
  {
    affixName: "infundibulo",
    affixDescription: "infundibulo",
  },
  {
    affixName: "cillin",
    affixDescription: "cillin",
  },
  {
    affixName: "oesophago",
    affixDescription: "oesophago",
  },
  {
    affixName: "thoraco",
    affixDescription: "thoraco",
  },
  {
    affixName: "stylo",
    affixDescription: "stylo",
  },
  {
    affixName: "papillo",
    affixDescription: "papillo",
  },
  {
    affixName: "spleno",
    affixDescription: "spleno",
  },
  {
    affixName: "geddon",
    affixDescription: "geddon",
  },
  {
    affixName: "meco",
    affixDescription: "meco",
  },
  {
    affixName: "cen",
    affixDescription: "cen",
  },
  {
    affixName: "tubulo",
    affixDescription: "tubulo",
  },
  {
    affixName: "xantho",
    affixDescription: "xantho",
  },
  {
    affixName: "cholyl",
    affixDescription: "cholyl",
  },
  {
    affixName: "ode",
    affixDescription: "ode",
  },
  {
    affixName: "sky",
    affixDescription: "sky",
  },
  {
    affixName: "fu",
    affixDescription: "fu",
  },
  {
    affixName: "medico",
    affixDescription: "medico",
  },
  {
    affixName: "aesthesio",
    affixDescription: "aesthesio",
  },
  {
    affixName: "assed",
    affixDescription: "assed",
  },
  {
    affixName: "enviro",
    affixDescription: "enviro",
  },
  {
    affixName: "kerauno",
    affixDescription: "kerauno",
  },
  {
    affixName: "uveo",
    affixDescription: "uveo",
  },
  {
    affixName: "dex",
    affixDescription: "dex",
  },
  {
    affixName: "vestibulo",
    affixDescription: "vestibulo",
  },
  {
    affixName: "peridol",
    affixDescription: "peridol",
  },
  {
    affixName: "asparto",
    affixDescription: "asparto",
  },
  {
    affixName: "pilo",
    affixDescription: "pilo",
  },
  {
    affixName: "ot",
    affixDescription: "ot",
  },
  {
    affixName: "mab",
    affixDescription: "mab",
  },
  {
    affixName: "conazole",
    affixDescription: "conazole",
  },
  {
    affixName: "onycho",
    affixDescription: "onycho",
  },
  {
    affixName: "flurane",
    affixDescription: "flurane",
  },
  {
    affixName: "rinone",
    affixDescription: "rinone",
  },
  {
    affixName: "phragmo",
    affixDescription: "phragmo",
  },
  {
    affixName: "ven",
    affixDescription: "ven",
  },
  {
    affixName: "perineo",
    affixDescription: "perineo",
  },
  {
    affixName: "uric",
    affixDescription: "uric",
  },
  {
    affixName: "cin",
    affixDescription: "cin",
  },
  {
    affixName: "staphylo",
    affixDescription: "staphylo",
  },
  {
    affixName: "carcino",
    affixDescription: "carcino",
  },
  {
    affixName: "propy",
    affixDescription: "propy",
  },
  {
    affixName: "tizolam",
    affixDescription: "tizolam",
  },
  {
    affixName: "rolimus",
    affixDescription: "rolimus",
  },
  {
    affixName: "dichloro",
    affixDescription: "dichloro",
  },
  {
    affixName: "strepto",
    affixDescription: "strepto",
  },
  {
    affixName: "cervico",
    affixDescription: "cervico",
  },
  {
    affixName: "amido",
    affixDescription: "amido",
  },
  {
    affixName: "tubero",
    affixDescription: "tubero",
  },
  {
    affixName: "giline",
    affixDescription: "giline",
  },
  {
    affixName: "quine",
    affixDescription: "quine",
  },
  {
    affixName: "formin",
    affixDescription: "formin",
  },
  {
    affixName: "carpo",
    affixDescription: "carpo",
  },
  {
    affixName: "sol",
    affixDescription: "sol",
  },
  {
    affixName: "sal",
    affixDescription: "sal",
  },
  {
    affixName: "ec",
    affixDescription: "ec",
  },
  {
    affixName: "tidine",
    affixDescription: "tidine",
  },
  {
    affixName: "irido",
    affixDescription: "irido",
  },
  {
    affixName: "pterygo",
    affixDescription: "pterygo",
  },
  {
    affixName: "prostil",
    affixDescription: "prostil",
  },
  {
    affixName: "oxanide",
    affixDescription: "oxanide",
  },
  {
    affixName: "olivo",
    affixDescription: "olivo",
  },
  {
    affixName: "pyelo",
    affixDescription: "pyelo",
  },
  {
    affixName: "homœ",
    affixDescription: "homœ",
  },
  {
    affixName: "thalasso",
    affixDescription: "thalasso",
  },
  {
    affixName: "hem",
    affixDescription: "hem",
  },
  {
    affixName: "algia",
    affixDescription: "algia",
  },
  {
    affixName: "peg",
    affixDescription: "peg",
  },
  {
    affixName: "baro",
    affixDescription: "baro",
  },
  {
    affixName: "phony",
    affixDescription: "phony",
  },
  {
    affixName: "Gallo",
    affixDescription: "Gallo",
  },
  {
    affixName: "trypano",
    affixDescription: "trypano",
  },
  {
    affixName: "cumulo",
    affixDescription: "cumulo",
  },
  {
    affixName: "milna",
    affixDescription: "milna",
  },
  {
    affixName: "roto",
    affixDescription: "roto",
  },
  {
    affixName: "eno",
    affixDescription: "eno",
  },
  {
    affixName: "spirone",
    affixDescription: "spirone",
  },
  {
    affixName: "amnio",
    affixDescription: "amnio",
  },
  {
    affixName: "clidine",
    affixDescription: "clidine",
  },
  {
    affixName: "atlanto",
    affixDescription: "atlanto",
  },
  {
    affixName: "zymo",
    affixDescription: "zymo",
  },
  {
    affixName: "nifur",
    affixDescription: "nifur",
  },
  {
    affixName: "azosin",
    affixDescription: "azosin",
  },
  {
    affixName: "vulvo",
    affixDescription: "vulvo",
  },
  {
    affixName: "glomerulo",
    affixDescription: "glomerulo",
  },
  {
    affixName: "mere",
    affixDescription: "mere",
  },
  {
    affixName: "tecto",
    affixDescription: "tecto",
  },
  {
    affixName: "Judaeo",
    affixDescription: "Judaeo",
  },
  {
    affixName: "radiation",
    affixDescription: "radiation",
  },
  {
    affixName: "gonio",
    affixDescription: "gonio",
  },
  {
    affixName: "karyo",
    affixDescription: "karyo",
  },
  {
    affixName: "foeto",
    affixDescription: "foeto",
  },
  {
    affixName: "trophic",
    affixDescription: "trophic",
  },
  {
    affixName: "repa",
    affixDescription: "repa",
  },
  {
    affixName: "nate",
    affixDescription: "nate",
  },
  {
    affixName: "occipito",
    affixDescription: "occipito",
  },
  {
    affixName: "astero",
    affixDescription: "astero",
  },
  {
    affixName: "antiferro",
    affixDescription: "antiferro",
  },
  {
    affixName: "balneo",
    affixDescription: "balneo",
  },
  {
    affixName: "perfluoro",
    affixDescription: "perfluoro",
  },
  {
    affixName: "oculo",
    affixDescription: "oculo",
  },
  {
    affixName: "pycno",
    affixDescription: "pycno",
  },
  {
    affixName: "flexo",
    affixDescription: "flexo",
  },
  {
    affixName: "humero",
    affixDescription: "humero",
  },
  {
    affixName: "tropho",
    affixDescription: "tropho",
  },
  {
    affixName: "molybdo",
    affixDescription: "molybdo",
  },
  {
    affixName: "pentakis",
    affixDescription: "pentakis",
  },
  {
    affixName: "mageddon",
    affixDescription: "mageddon",
  },
  {
    affixName: "itan",
    affixDescription: "itan",
  },
  {
    affixName: "palladation",
    affixDescription: "palladation",
  },
  {
    affixName: "boration",
    affixDescription: "boration",
  },
  {
    affixName: "carba",
    affixDescription: "carba",
  },
  {
    affixName: "curonium",
    affixDescription: "curonium",
  },
  {
    affixName: "azepam",
    affixDescription: "azepam",
  },
  {
    affixName: "stanno",
    affixDescription: "stanno",
  },
  {
    affixName: "sexi",
    affixDescription: "sexi",
  },
  {
    affixName: "partite",
    affixDescription: "partite",
  },
  {
    affixName: "kinesis",
    affixDescription: "kinesis",
  },
  {
    affixName: "rutheno",
    affixDescription: "rutheno",
  },
  {
    affixName: "argento",
    affixDescription: "argento",
  },
  {
    affixName: "auxo",
    affixDescription: "auxo",
  },
  {
    affixName: "ella",
    affixDescription: "ella",
  },
  {
    affixName: "hendeca",
    affixDescription: "hendeca",
  },
  {
    affixName: "opamine",
    affixDescription: "opamine",
  },
  {
    affixName: "tronics",
    affixDescription: "tronics",
  },
  {
    affixName: "techni",
    affixDescription: "techni",
  },
  {
    affixName: "cuneo",
    affixDescription: "cuneo",
  },
  {
    affixName: "vir",
    affixDescription: "vir",
  },
  {
    affixName: "abad",
    affixDescription: "abad",
  },
  {
    affixName: "oö",
    affixDescription: "oö",
  },
  {
    affixName: "equ",
    affixDescription: "equ",
  },
  {
    affixName: "temporo",
    affixDescription: "temporo",
  },
  {
    affixName: "tarso",
    affixDescription: "tarso",
  },
  {
    affixName: "gravo",
    affixDescription: "gravo",
  },
  {
    affixName: "diplo",
    affixDescription: "diplo",
  },
  {
    affixName: "creno",
    affixDescription: "creno",
  },
  {
    affixName: "ibility",
    affixDescription: "ibility",
  },
  {
    affixName: "K",
    affixDescription: "K",
  },
  {
    affixName: "sporo",
    affixDescription: "sporo",
  },
  {
    affixName: "semper",
    affixDescription: "semper",
  },
  {
    affixName: "zo",
    affixDescription: "zo",
  },
  {
    affixName: "herpeto",
    affixDescription: "herpeto",
  },
  {
    affixName: "nesse",
    affixDescription: "nesse",
  },
  {
    affixName: "onomics",
    affixDescription: "onomics",
  },
  {
    affixName: "oan",
    affixDescription: "oan",
  },
  {
    affixName: "cerio",
    affixDescription: "cerio",
  },
  {
    affixName: "pyrano",
    affixDescription: "pyrano",
  },
  {
    affixName: "cleido",
    affixDescription: "cleido",
  },
  {
    affixName: "baryo",
    affixDescription: "baryo",
  },
  {
    affixName: "hexakis",
    affixDescription: "hexakis",
  },
  {
    affixName: "perchloro",
    affixDescription: "perchloro",
  },
  {
    affixName: "pudlian",
    affixDescription: "pudlian",
  },
  {
    affixName: "ïng",
    affixDescription: "ïng",
  },
  {
    affixName: "stygo",
    affixDescription: "stygo",
  },
  {
    affixName: "vasculo",
    affixDescription: "vasculo",
  },
  {
    affixName: "saccharo",
    affixDescription: "saccharo",
  },
  {
    affixName: "contro",
    affixDescription: "contro",
  },
  {
    affixName: "tetrakis",
    affixDescription: "tetrakis",
  },
  {
    affixName: "megalo",
    affixDescription: "megalo",
  },
  {
    affixName: "peno",
    affixDescription: "peno",
  },
  {
    affixName: "derm",
    affixDescription: "derm",
  },
  {
    affixName: "esophago",
    affixDescription: "esophago",
  },
  {
    affixName: "steato",
    affixDescription: "steato",
  },
  {
    affixName: "urethro",
    affixDescription: "urethro",
  },
  {
    affixName: "petal",
    affixDescription: "petal",
  },
  {
    affixName: "aetio",
    affixDescription: "aetio",
  },
  {
    affixName: "gli",
    affixDescription: "gli",
  },
  {
    affixName: "inguino",
    affixDescription: "inguino",
  },
  {
    affixName: "papulo",
    affixDescription: "papulo",
  },
  {
    affixName: "tectono",
    affixDescription: "tectono",
  },
  {
    affixName: "acromio",
    affixDescription: "acromio",
  },
  {
    affixName: "octavo",
    affixDescription: "octavo",
  },
  {
    affixName: "malaco",
    affixDescription: "malaco",
  },
  {
    affixName: "spondylo",
    affixDescription: "spondylo",
  },
  {
    affixName: "teplase",
    affixDescription: "teplase",
  },
  {
    affixName: "pristin",
    affixDescription: "pristin",
  },
  {
    affixName: "pramine",
    affixDescription: "pramine",
  },
  {
    affixName: "ali",
    affixDescription: "ali",
  },
  {
    affixName: "coeno",
    affixDescription: "coeno",
  },
  {
    affixName: "gleno",
    affixDescription: "gleno",
  },
  {
    affixName: "patello",
    affixDescription: "patello",
  },
  {
    affixName: "tibio",
    affixDescription: "tibio",
  },
  {
    affixName: "squamo",
    affixDescription: "squamo",
  },
  {
    affixName: "stomato",
    affixDescription: "stomato",
  },
  {
    affixName: "trit",
    affixDescription: "trit",
  },
  {
    affixName: "vari",
    affixDescription: "vari",
  },
  {
    affixName: "striato",
    affixDescription: "striato",
  },
  {
    affixName: "auri",
    affixDescription: "auri",
  },
  {
    affixName: "anthro",
    affixDescription: "anthro",
  },
  {
    affixName: "nutri",
    affixDescription: "nutri",
  },
  {
    affixName: "bulbo",
    affixDescription: "bulbo",
  },
  {
    affixName: "optico",
    affixDescription: "optico",
  },
  {
    affixName: "holism",
    affixDescription: "holism",
  },
  {
    affixName: "pride",
    affixDescription: "pride",
  },
  {
    affixName: "denti",
    affixDescription: "denti",
  },
  {
    affixName: "pause",
    affixDescription: "pause",
  },
  {
    affixName: "urano",
    affixDescription: "urano",
  },
  {
    affixName: "cerebello",
    affixDescription: "cerebello",
  },
  {
    affixName: "ponto",
    affixDescription: "ponto",
  },
  {
    affixName: "centri",
    affixDescription: "centri",
  },
  {
    affixName: "iono",
    affixDescription: "iono",
  },
  {
    affixName: "fluvio",
    affixDescription: "fluvio",
  },
  {
    affixName: "drome",
    affixDescription: "drome",
  },
  {
    affixName: "stato",
    affixDescription: "stato",
  },
  {
    affixName: "at",
    affixDescription: "at",
  },
  {
    affixName: "metre",
    affixDescription: "metre",
  },
  {
    affixName: "cule",
    affixDescription: "cule",
  },
  {
    affixName: "thigmo",
    affixDescription: "thigmo",
  },
  {
    affixName: "hoplo",
    affixDescription: "hoplo",
  },
  {
    affixName: "myrmeco",
    affixDescription: "myrmeco",
  },
  {
    affixName: "algo",
    affixDescription: "algo",
  },
  {
    affixName: "Tibeto",
    affixDescription: "Tibeto",
  },
  {
    affixName: "natro",
    affixDescription: "natro",
  },
  {
    affixName: "magni",
    affixDescription: "magni",
  },
  {
    affixName: "deka",
    affixDescription: "deka",
  },
  {
    affixName: "centrism",
    affixDescription: "centrism",
  },
  {
    affixName: "archeo",
    affixDescription: "archeo",
  },
  {
    affixName: "Nilo",
    affixDescription: "Nilo",
  },
  {
    affixName: "alia",
    affixDescription: "alia",
  },
  {
    affixName: "forth",
    affixDescription: "forth",
  },
  {
    affixName: "logist",
    affixDescription: "logist",
  },
  {
    affixName: "potentio",
    affixDescription: "potentio",
  },
  {
    affixName: "enna",
    affixDescription: "enna",
  },
  {
    affixName: "fluo",
    affixDescription: "fluo",
  },
  {
    affixName: "Celto",
    affixDescription: "Celto",
  },
  {
    affixName: "urino",
    affixDescription: "urino",
  },
  {
    affixName: "thorough",
    affixDescription: "thorough",
  },
  {
    affixName: "sinistr",
    affixDescription: "sinistr",
  },
  {
    affixName: "gynæco",
    affixDescription: "gynæco",
  },
  {
    affixName: "coen",
    affixDescription: "coen",
  },
  {
    affixName: "clado",
    affixDescription: "clado",
  },
  {
    affixName: "again",
    affixDescription: "again",
  },
  {
    affixName: "sicle",
    affixDescription: "sicle",
  },
  {
    affixName: "itive",
    affixDescription: "itive",
  },
  {
    affixName: "eus",
    affixDescription: "eus",
  },
  {
    affixName: "palae",
    affixDescription: "palae",
  },
  {
    affixName: "skeleto",
    affixDescription: "skeleto",
  },
  {
    affixName: "psammo",
    affixDescription: "psammo",
  },
  {
    affixName: "pæd",
    affixDescription: "pæd",
  },
  {
    affixName: "yttro",
    affixDescription: "yttro",
  },
  {
    affixName: "chalco",
    affixDescription: "chalco",
  },
  {
    affixName: "schm",
    affixDescription: "schm",
  },
  {
    affixName: "pædo",
    affixDescription: "pædo",
  },
  {
    affixName: "lect",
    affixDescription: "lect",
  },
  {
    affixName: "istics",
    affixDescription: "istics",
  },
  {
    affixName: "dacryo",
    affixDescription: "dacryo",
  },
  {
    affixName: "logue",
    affixDescription: "logue",
  },
  {
    affixName: "fag",
    affixDescription: "fag",
  },
  {
    affixName: "nidazole",
    affixDescription: "nidazole",
  },
  {
    affixName: "maxi",
    affixDescription: "maxi",
  },
  {
    affixName: "costo",
    affixDescription: "costo",
  },
  {
    affixName: "il",
    affixDescription: "il",
  },
  {
    affixName: "xyr",
    affixDescription: "xyr",
  },
  {
    affixName: "xyl",
    affixDescription: "xyl",
  },
  {
    affixName: "sauce",
    affixDescription: "sauce",
  },
  {
    affixName: "zirco",
    affixDescription: "zirco",
  },
  {
    affixName: "type",
    affixDescription: "type",
  },
  {
    affixName: "ichthyo",
    affixDescription: "ichthyo",
  },
  {
    affixName: "here",
    affixDescription: "here",
  },
  {
    affixName: "strontio",
    affixDescription: "strontio",
  },
  {
    affixName: "bario",
    affixDescription: "bario",
  },
  {
    affixName: "clitoro",
    affixDescription: "clitoro",
  },
  {
    affixName: "ampho",
    affixDescription: "ampho",
  },
  {
    affixName: "dihydro",
    affixDescription: "dihydro",
  },
  {
    affixName: "full",
    affixDescription: "full",
  },
  {
    affixName: "Cambro",
    affixDescription: "Cambro",
  },
  {
    affixName: "pallado",
    affixDescription: "pallado",
  },
  {
    affixName: "uran",
    affixDescription: "uran",
  },
  {
    affixName: "ammonio",
    affixDescription: "ammonio",
  },
  {
    affixName: "vanado",
    affixDescription: "vanado",
  },
  {
    affixName: "vanadio",
    affixDescription: "vanadio",
  },
  {
    affixName: "bismuto",
    affixDescription: "bismuto",
  },
  {
    affixName: "lithio",
    affixDescription: "lithio",
  },
  {
    affixName: "stibio",
    affixDescription: "stibio",
  },
  {
    affixName: "sterone",
    affixDescription: "sterone",
  },
  {
    affixName: "niobo",
    affixDescription: "niobo",
  },
  {
    affixName: "plumbo",
    affixDescription: "plumbo",
  },
  {
    affixName: "rhodo",
    affixDescription: "rhodo",
  },
  {
    affixName: "scandio",
    affixDescription: "scandio",
  },
  {
    affixName: "kineto",
    affixDescription: "kineto",
  },
  {
    affixName: "jejuno",
    affixDescription: "jejuno",
  },
  {
    affixName: "vitreo",
    affixDescription: "vitreo",
  },
  {
    affixName: "cor",
    affixDescription: "cor",
  },
  {
    affixName: "sulf",
    affixDescription: "sulf",
  },
  {
    affixName: "typho",
    affixDescription: "typho",
  },
  {
    affixName: "kine",
    affixDescription: "kine",
  },
  {
    affixName: "chryso",
    affixDescription: "chryso",
  },
  {
    affixName: "protero",
    affixDescription: "protero",
  },
  {
    affixName: "ick",
    affixDescription: "ick",
  },
  {
    affixName: "ress",
    affixDescription: "ress",
  },
  {
    affixName: "luteo",
    affixDescription: "luteo",
  },
  {
    affixName: "politico",
    affixDescription: "politico",
  },
  {
    affixName: "lagnia",
    affixDescription: "lagnia",
  },
  {
    affixName: "nervo",
    affixDescription: "nervo",
  },
  {
    affixName: "spermato",
    affixDescription: "spermato",
  },
  {
    affixName: "tartro",
    affixDescription: "tartro",
  },
  {
    affixName: "izzle",
    affixDescription: "izzle",
  },
  {
    affixName: "enter",
    affixDescription: "enter",
  },
  {
    affixName: "gony",
    affixDescription: "gony",
  },
  {
    affixName: "tome",
    affixDescription: "tome",
  },
  {
    affixName: "caco",
    affixDescription: "caco",
  },
  {
    affixName: "lins",
    affixDescription: "lins",
  },
  {
    affixName: "gymno",
    affixDescription: "gymno",
  },
  {
    affixName: "recti",
    affixDescription: "recti",
  },
  {
    affixName: "dermo",
    affixDescription: "dermo",
  },
  {
    affixName: "deuto",
    affixDescription: "deuto",
  },
  {
    affixName: "ast",
    affixDescription: "ast",
  },
  {
    affixName: "gloss",
    affixDescription: "gloss",
  },
  {
    affixName: "uple",
    affixDescription: "uple",
  },
  {
    affixName: "hyo",
    affixDescription: "hyo",
  },
  {
    affixName: "mechanico",
    affixDescription: "mechanico",
  },
  {
    affixName: "pyo",
    affixDescription: "pyo",
  },
  {
    affixName: "tropo",
    affixDescription: "tropo",
  },
  {
    affixName: "ornitho",
    affixDescription: "ornitho",
  },
  {
    affixName: "omphalo",
    affixDescription: "omphalo",
  },
  {
    affixName: "purpureo",
    affixDescription: "purpureo",
  },
  {
    affixName: "sacculo",
    affixDescription: "sacculo",
  },
  {
    affixName: "calcareo",
    affixDescription: "calcareo",
  },
  {
    affixName: "pneumato",
    affixDescription: "pneumato",
  },
  {
    affixName: "crico",
    affixDescription: "crico",
  },
  {
    affixName: "lieno",
    affixDescription: "lieno",
  },
  {
    affixName: "sept",
    affixDescription: "sept",
  },
  {
    affixName: "sporous",
    affixDescription: "sporous",
  },
  {
    affixName: "cardia",
    affixDescription: "cardia",
  },
  {
    affixName: "jugulo",
    affixDescription: "jugulo",
  },
  {
    affixName: "carb",
    affixDescription: "carb",
  },
  {
    affixName: "amide",
    affixDescription: "amide",
  },
  {
    affixName: "gab",
    affixDescription: "gab",
  },
  {
    affixName: "piprazole",
    affixDescription: "piprazole",
  },
  {
    affixName: "acetyl",
    affixDescription: "acetyl",
  },
  {
    affixName: "podo",
    affixDescription: "podo",
  },
  {
    affixName: "hiero",
    affixDescription: "hiero",
  },
  {
    affixName: "cele",
    affixDescription: "cele",
  },
  {
    affixName: "acino",
    affixDescription: "acino",
  },
  {
    affixName: "septi",
    affixDescription: "septi",
  },
  {
    affixName: "tympano",
    affixDescription: "tympano",
  },
  {
    affixName: "uret",
    affixDescription: "uret",
  },
  {
    affixName: "plagio",
    affixDescription: "plagio",
  },
  {
    affixName: "anine",
    affixDescription: "anine",
  },
  {
    affixName: "pharyngo",
    affixDescription: "pharyngo",
  },
  {
    affixName: "axono",
    affixDescription: "axono",
  },
  {
    affixName: "sulph",
    affixDescription: "sulph",
  },
  {
    affixName: "praseo",
    affixDescription: "praseo",
  },
  {
    affixName: "trocho",
    affixDescription: "trocho",
  },
  {
    affixName: "auriculo",
    affixDescription: "auriculo",
  },
  {
    affixName: "ureo",
    affixDescription: "ureo",
  },
  {
    affixName: "anatomico",
    affixDescription: "anatomico",
  },
  {
    affixName: "pluto",
    affixDescription: "pluto",
  },
  {
    affixName: "zygomatico",
    affixDescription: "zygomatico",
  },
  {
    affixName: "valent",
    affixDescription: "valent",
  },
  {
    affixName: "stomy",
    affixDescription: "stomy",
  },
  {
    affixName: "mane",
    affixDescription: "mane",
  },
  {
    affixName: "0r",
    affixDescription: "0r",
  },
  {
    affixName: "spermo",
    affixDescription: "spermo",
  },
  {
    affixName: "ties",
    affixDescription: "ties",
  },
  {
    affixName: "soleno",
    affixDescription: "soleno",
  },
  {
    affixName: "cono",
    affixDescription: "cono",
  },
  {
    affixName: "tris",
    affixDescription: "tris",
  },
  {
    affixName: "tude",
    affixDescription: "tude",
  },
  {
    affixName: "septa",
    affixDescription: "septa",
  },
  {
    affixName: "spondyl",
    affixDescription: "spondyl",
  },
  {
    affixName: "membrano",
    affixDescription: "membrano",
  },
  {
    affixName: "succin",
    affixDescription: "succin",
  },
  {
    affixName: "septo",
    affixDescription: "septo",
  },
  {
    affixName: "uretero",
    affixDescription: "uretero",
  },
  {
    affixName: "tungsto",
    affixDescription: "tungsto",
  },
  {
    affixName: "opsono",
    affixDescription: "opsono",
  },
  {
    affixName: "perone",
    affixDescription: "perone",
  },
  {
    affixName: "intro",
    affixDescription: "intro",
  },
  {
    affixName: "nemato",
    affixDescription: "nemato",
  },
  {
    affixName: "omo",
    affixDescription: "omo",
  },
  {
    affixName: "spheno",
    affixDescription: "spheno",
  },
  {
    affixName: "haema",
    affixDescription: "haema",
  },
  {
    affixName: "latero",
    affixDescription: "latero",
  },
  {
    affixName: "laevo",
    affixDescription: "laevo",
  },
  {
    affixName: "phore",
    affixDescription: "phore",
  },
  {
    affixName: "aorto",
    affixDescription: "aorto",
  },
  {
    affixName: "phreno",
    affixDescription: "phreno",
  },
  {
    affixName: "phonic",
    affixDescription: "phonic",
  },
  {
    affixName: "cerato",
    affixDescription: "cerato",
  },
  {
    affixName: "sexa",
    affixDescription: "sexa",
  },
  {
    affixName: "mento",
    affixDescription: "mento",
  },
  {
    affixName: "met",
    affixDescription: "met",
  },
  {
    affixName: "meno",
    affixDescription: "meno",
  },
  {
    affixName: "enchyma",
    affixDescription: "enchyma",
  },
  {
    affixName: "cheiro",
    affixDescription: "cheiro",
  },
  {
    affixName: "vesiculo",
    affixDescription: "vesiculo",
  },
  {
    affixName: "Moeso",
    affixDescription: "Moeso",
  },
  {
    affixName: "setron",
    affixDescription: "setron",
  },
  {
    affixName: "splain",
    affixDescription: "splain",
  },
  {
    affixName: "optene",
    affixDescription: "optene",
  },
  {
    affixName: "gingivo",
    affixDescription: "gingivo",
  },
  {
    affixName: "prae",
    affixDescription: "prae",
  },
  {
    affixName: "phrenia",
    affixDescription: "phrenia",
  },
  {
    affixName: "pharma",
    affixDescription: "pharma",
  },
  {
    affixName: "phyco",
    affixDescription: "phyco",
  },
  {
    affixName: "vagino",
    affixDescription: "vagino",
  },
  {
    affixName: "pheo",
    affixDescription: "pheo",
  },
  {
    affixName: "oneiro",
    affixDescription: "oneiro",
  },
  {
    affixName: "eum",
    affixDescription: "eum",
  },
  {
    affixName: "zza",
    affixDescription: "zza",
  },
  {
    affixName: "heptadeca",
    affixDescription: "heptadeca",
  },
  {
    affixName: "sursum",
    affixDescription: "sursum",
  },
  {
    affixName: "deorsum",
    affixDescription: "deorsum",
  },
  {
    affixName: "ballisto",
    affixDescription: "ballisto",
  },
  {
    affixName: "disto",
    affixDescription: "disto",
  },
  {
    affixName: "arthro",
    affixDescription: "arthro",
  },
  {
    affixName: "chlamydo",
    affixDescription: "chlamydo",
  },
  {
    affixName: "decidual",
    affixDescription: "decidual",
  },
  {
    affixName: "rrhaphy",
    affixDescription: "rrhaphy",
  },
  {
    affixName: "vin",
    affixDescription: "vin",
  },
  {
    affixName: "olone",
    affixDescription: "olone",
  },
  {
    affixName: "relin",
    affixDescription: "relin",
  },
  {
    affixName: "io",
    affixDescription: "io",
  },
  {
    affixName: "brom",
    affixDescription: "brom",
  },
  {
    affixName: "iod",
    affixDescription: "iod",
  },
  {
    affixName: "epta",
    affixDescription: "epta",
  },
  {
    affixName: "verine",
    affixDescription: "verine",
  },
  {
    affixName: "cef",
    affixDescription: "cef",
  },
  {
    affixName: "drine",
    affixDescription: "drine",
  },
  {
    affixName: "glitazone",
    affixDescription: "glitazone",
  },
  {
    affixName: "boreo",
    affixDescription: "boreo",
  },
  {
    affixName: "frine",
    affixDescription: "frine",
  },
  {
    affixName: "nicline",
    affixDescription: "nicline",
  },
  {
    affixName: "dalt",
    affixDescription: "dalt",
  },
  {
    affixName: "metho",
    affixDescription: "metho",
  },
  {
    affixName: "mestane",
    affixDescription: "mestane",
  },
  {
    affixName: "lukast",
    affixDescription: "lukast",
  },
  {
    affixName: "prenaline",
    affixDescription: "prenaline",
  },
  {
    affixName: "Italo",
    affixDescription: "Italo",
  },
  {
    affixName: "Thraco",
    affixDescription: "Thraco",
  },
  {
    affixName: "Graeco",
    affixDescription: "Graeco",
  },
  {
    affixName: "Helleno",
    affixDescription: "Helleno",
  },
  {
    affixName: "poikilo",
    affixDescription: "poikilo",
  },
  {
    affixName: "Fenno",
    affixDescription: "Fenno",
  },
  {
    affixName: "condylo",
    affixDescription: "condylo",
  },
  {
    affixName: "geronto",
    affixDescription: "geronto",
  },
  {
    affixName: "ritide",
    affixDescription: "ritide",
  },
  {
    affixName: "cycline",
    affixDescription: "cycline",
  },
  {
    affixName: "scopic",
    affixDescription: "scopic",
  },
  {
    affixName: "scopy",
    affixDescription: "scopy",
  },
  {
    affixName: "fosine",
    affixDescription: "fosine",
  },
  {
    affixName: "orphone",
    affixDescription: "orphone",
  },
  {
    affixName: "terol",
    affixDescription: "terol",
  },
  {
    affixName: "tirelin",
    affixDescription: "tirelin",
  },
  {
    affixName: "tepine",
    affixDescription: "tepine",
  },
  {
    affixName: "thi",
    affixDescription: "thi",
  },
  {
    affixName: "fiban",
    affixDescription: "fiban",
  },
  {
    affixName: "bentho",
    affixDescription: "bentho",
  },
  {
    affixName: "oryzo",
    affixDescription: "oryzo",
  },
  {
    affixName: "salazo",
    affixDescription: "salazo",
  },
  {
    affixName: "orex",
    affixDescription: "orex",
  },
  {
    affixName: "prazole",
    affixDescription: "prazole",
  },
  {
    affixName: "nitr",
    affixDescription: "nitr",
  },
  {
    affixName: "oxacin",
    affixDescription: "oxacin",
  },
  {
    affixName: "adol",
    affixDescription: "adol",
  },
  {
    affixName: "kacin",
    affixDescription: "kacin",
  },
  {
    affixName: "fosfamide",
    affixDescription: "fosfamide",
  },
  {
    affixName: "fungin",
    affixDescription: "fungin",
  },
  {
    affixName: "citabine",
    affixDescription: "citabine",
  },
  {
    affixName: "cyan",
    affixDescription: "cyan",
  },
  {
    affixName: "arotene",
    affixDescription: "arotene",
  },
  {
    affixName: "platin",
    affixDescription: "platin",
  },
  {
    affixName: "meningo",
    affixDescription: "meningo",
  },
  {
    affixName: "metatarso",
    affixDescription: "metatarso",
  },
  {
    affixName: "trideca",
    affixDescription: "trideca",
  },
  {
    affixName: "porto",
    affixDescription: "porto",
  },
  {
    affixName: "calori",
    affixDescription: "calori",
  },
  {
    affixName: "corneo",
    affixDescription: "corneo",
  },
  {
    affixName: "micto",
    affixDescription: "micto",
  },
  {
    affixName: "femoro",
    affixDescription: "femoro",
  },
  {
    affixName: "cantho",
    affixDescription: "cantho",
  },
  {
    affixName: "ganglio",
    affixDescription: "ganglio",
  },
  {
    affixName: "talo",
    affixDescription: "talo",
  },
  {
    affixName: "saur",
    affixDescription: "saur",
  },
  {
    affixName: "plesio",
    affixDescription: "plesio",
  },
  {
    affixName: "rumino",
    affixDescription: "rumino",
  },
  {
    affixName: "hagio",
    affixDescription: "hagio",
  },
  {
    affixName: "saurus",
    affixDescription: "saurus",
  },
  {
    affixName: "medullo",
    affixDescription: "medullo",
  },
  {
    affixName: "metro",
    affixDescription: "metro",
  },
  {
    affixName: "musico",
    affixDescription: "musico",
  },
  {
    affixName: "pancreatico",
    affixDescription: "pancreatico",
  },
  {
    affixName: "phaco",
    affixDescription: "phaco",
  },
  {
    affixName: "odynia",
    affixDescription: "odynia",
  },
  {
    affixName: "pyloro",
    affixDescription: "pyloro",
  },
  {
    affixName: "acantho",
    affixDescription: "acantho",
  },
  {
    affixName: "skoto",
    affixDescription: "skoto",
  },
  {
    affixName: "cilio",
    affixDescription: "cilio",
  },
  {
    affixName: "gamy",
    affixDescription: "gamy",
  },
  {
    affixName: "gamous",
    affixDescription: "gamous",
  },
  {
    affixName: "genio",
    affixDescription: "genio",
  },
  {
    affixName: "historico",
    affixDescription: "historico",
  },
  {
    affixName: "quadro",
    affixDescription: "quadro",
  },
  {
    affixName: "noso",
    affixDescription: "noso",
  },
  {
    affixName: "vegeto",
    affixDescription: "vegeto",
  },
  {
    affixName: "apeiro",
    affixDescription: "apeiro",
  },
  {
    affixName: "physi",
    affixDescription: "physi",
  },
  {
    affixName: "pancreato",
    affixDescription: "pancreato",
  },
  {
    affixName: "zono",
    affixDescription: "zono",
  },
  {
    affixName: "udi",
    affixDescription: "udi",
  },
  {
    affixName: "speleo",
    affixDescription: "speleo",
  },
  {
    affixName: "konio",
    affixDescription: "konio",
  },
  {
    affixName: "imido",
    affixDescription: "imido",
  },
  {
    affixName: "calcaneo",
    affixDescription: "calcaneo",
  },
  {
    affixName: "hypothalamo",
    affixDescription: "hypothalamo",
  },
  {
    affixName: "ostomy",
    affixDescription: "ostomy",
  },
  {
    affixName: "onto",
    affixDescription: "onto",
  },
  {
    affixName: "axillo",
    affixDescription: "axillo",
  },
  {
    affixName: "cubo",
    affixDescription: "cubo",
  },
  {
    affixName: "the",
    affixDescription: "the",
  },
  {
    affixName: "pants",
    affixDescription: "pants",
  },
  {
    affixName: "porno",
    affixDescription: "porno",
  },
  {
    affixName: "ʟ",
    affixDescription: "ʟ",
  },
  {
    affixName: "demo",
    affixDescription: "demo",
  },
  {
    affixName: "picto",
    affixDescription: "picto",
  },
  {
    affixName: "splanchno",
    affixDescription: "splanchno",
  },
  {
    affixName: "facio",
    affixDescription: "facio",
  },
  {
    affixName: "conico",
    affixDescription: "conico",
  },
  {
    affixName: "sinistro",
    affixDescription: "sinistro",
  },
  {
    affixName: "cylindro",
    affixDescription: "cylindro",
  },
  {
    affixName: "magico",
    affixDescription: "magico",
  },
  {
    affixName: "phrenico",
    affixDescription: "phrenico",
  },
  {
    affixName: "duodeno",
    affixDescription: "duodeno",
  },
  {
    affixName: "bilio",
    affixDescription: "bilio",
  },
  {
    affixName: "muci",
    affixDescription: "muci",
  },
  {
    affixName: "ovi",
    affixDescription: "ovi",
  },
  {
    affixName: "closed",
    affixDescription: "closed",
  },
  {
    affixName: "rufo",
    affixDescription: "rufo",
  },
  {
    affixName: "transitive",
    affixDescription: "transitive",
  },
  {
    affixName: "pocalypse",
    affixDescription: "pocalypse",
  },
  {
    affixName: "bronto",
    affixDescription: "bronto",
  },
  {
    affixName: "worth",
    affixDescription: "worth",
  },
  {
    affixName: "bury",
    affixDescription: "bury",
  },
  {
    affixName: "logical",
    affixDescription: "logical",
  },
  {
    affixName: "desmo",
    affixDescription: "desmo",
  },
  {
    affixName: "apico",
    affixDescription: "apico",
  },
  {
    affixName: "moto",
    affixDescription: "moto",
  },
  {
    affixName: "olfacto",
    affixDescription: "olfacto",
  },
  {
    affixName: "psych",
    affixDescription: "psych",
  },
  {
    affixName: "frigo",
    affixDescription: "frigo",
  },
  {
    affixName: "odonto",
    affixDescription: "odonto",
  },
  {
    affixName: "über",
    affixDescription: "über",
  },
  {
    affixName: "epithelio",
    affixDescription: "epithelio",
  },
  {
    affixName: "ulno",
    affixDescription: "ulno",
  },
  {
    affixName: "coraco",
    affixDescription: "coraco",
  },
  {
    affixName: "thallo",
    affixDescription: "thallo",
  },
  {
    affixName: "cratic",
    affixDescription: "cratic",
  },
  {
    affixName: "rhyncho",
    affixDescription: "rhyncho",
  },
  {
    affixName: "hect",
    affixDescription: "hect",
  },
  {
    affixName: "oidea",
    affixDescription: "oidea",
  },
  {
    affixName: "Zio",
    affixDescription: "Zio",
  },
  {
    affixName: "μ",
    affixDescription: "μ",
  },
  {
    affixName: "bacter",
    affixDescription: "bacter",
  },
  {
    affixName: "tephro",
    affixDescription: "tephro",
  },
  {
    affixName: "nevo",
    affixDescription: "nevo",
  },
  {
    affixName: "centralo",
    affixDescription: "centralo",
  },
  {
    affixName: "choroido",
    affixDescription: "choroido",
  },
  {
    affixName: "distalo",
    affixDescription: "distalo",
  },
  {
    affixName: "naviculo",
    affixDescription: "naviculo",
  },
  {
    affixName: "aortico",
    affixDescription: "aortico",
  },
  {
    affixName: "ily",
    affixDescription: "ily",
  },
  {
    affixName: "choro",
    affixDescription: "choro",
  },
  {
    affixName: "Spaghetti",
    affixDescription: "Spaghetti",
  },
  {
    affixName: "lingua",
    affixDescription: "lingua",
  },
  {
    affixName: "ampelo",
    affixDescription: "ampelo",
  },
  {
    affixName: "oeno",
    affixDescription: "oeno",
  },
  {
    affixName: "ovulo",
    affixDescription: "ovulo",
  },
  {
    affixName: "bel",
    affixDescription: "bel",
  },
  {
    affixName: "ometer",
    affixDescription: "ometer",
  },
  {
    affixName: "athlon",
    affixDescription: "athlon",
  },
  {
    affixName: "Yugo",
    affixDescription: "Yugo",
  },
  {
    affixName: "conservo",
    affixDescription: "conservo",
  },
  {
    affixName: "Palaeo",
    affixDescription: "Palaeo",
  },
  {
    affixName: "helico",
    affixDescription: "helico",
  },
  {
    affixName: "kinesi",
    affixDescription: "kinesi",
  },
  {
    affixName: "cobalto",
    affixDescription: "cobalto",
  },
  {
    affixName: "coelo",
    affixDescription: "coelo",
  },
  {
    affixName: "emic",
    affixDescription: "emic",
  },
  {
    affixName: "dideoxy",
    affixDescription: "dideoxy",
  },
  {
    affixName: "hydr",
    affixDescription: "hydr",
  },
  {
    affixName: "grammatico",
    affixDescription: "grammatico",
  },
  {
    affixName: "orama",
    affixDescription: "orama",
  },
  {
    affixName: "alco",
    affixDescription: "alco",
  },
  {
    affixName: "decentralise",
    affixDescription: "decentralise",
  },
  {
    affixName: "Brito",
    affixDescription: "Brito",
  },
  {
    affixName: "gyne",
    affixDescription: "gyne",
  },
  {
    affixName: "equina",
    affixDescription: "equina",
  },
  {
    affixName: "alveolo",
    affixDescription: "alveolo",
  },
  {
    affixName: "parvi",
    affixDescription: "parvi",
  },
  {
    affixName: "lutamide",
    affixDescription: "lutamide",
  },
  {
    affixName: "climato",
    affixDescription: "climato",
  },
  {
    affixName: "cochleo",
    affixDescription: "cochleo",
  },
  {
    affixName: "giganto",
    affixDescription: "giganto",
  },
  {
    affixName: "pulso",
    affixDescription: "pulso",
  },
  {
    affixName: "anemo",
    affixDescription: "anemo",
  },
  {
    affixName: "thymo",
    affixDescription: "thymo",
  },
  {
    affixName: "gonado",
    affixDescription: "gonado",
  },
  {
    affixName: "analgo",
    affixDescription: "analgo",
  },
  {
    affixName: "sapheno",
    affixDescription: "sapheno",
  },
  {
    affixName: "oxaza",
    affixDescription: "oxaza",
  },
  {
    affixName: "pelvi",
    affixDescription: "pelvi",
  },
  {
    affixName: "amygdalo",
    affixDescription: "amygdalo",
  },
  {
    affixName: "hepatico",
    affixDescription: "hepatico",
  },
  {
    affixName: "accelero",
    affixDescription: "accelero",
  },
  {
    affixName: "sexual",
    affixDescription: "sexual",
  },
  {
    affixName: "vago",
    affixDescription: "vago",
  },
  {
    affixName: "un#Etymology_2",
    affixDescription: "un#Etymology_2",
  },
  {
    affixName: "granulo",
    affixDescription: "granulo",
  },
  {
    affixName: "veno",
    affixDescription: "veno",
  },
  {
    affixName: "vitello",
    affixDescription: "vitello",
  },
  {
    affixName: "heredo",
    affixDescription: "heredo",
  },
  {
    affixName: "tapeto",
    affixDescription: "tapeto",
  },
  {
    affixName: "tendino",
    affixDescription: "tendino",
  },
  {
    affixName: "cline",
    affixDescription: "cline",
  },
  {
    affixName: "yne",
    affixDescription: "yne",
  },
  {
    affixName: "fibrino",
    affixDescription: "fibrino",
  },
  {
    affixName: "histio",
    affixDescription: "histio",
  },
  {
    affixName: "vomero",
    affixDescription: "vomero",
  },
  {
    affixName: "nulli",
    affixDescription: "nulli",
  },
  {
    affixName: "lign",
    affixDescription: "lign",
  },
  {
    affixName: "spongio",
    affixDescription: "spongio",
  },
  {
    affixName: "diphthero",
    affixDescription: "diphthero",
  },
  {
    affixName: "embryo",
    affixDescription: "embryo",
  },
  {
    affixName: "steel",
    affixDescription: "steel",
  },
  {
    affixName: "longi",
    affixDescription: "longi",
  },
  {
    affixName: "stromo",
    affixDescription: "stromo",
  },
  {
    affixName: "limno",
    affixDescription: "limno",
  },
  {
    affixName: "echo",
    affixDescription: "echo",
  },
  {
    affixName: "aristo",
    affixDescription: "aristo",
  },
  {
    affixName: "tonsillo",
    affixDescription: "tonsillo",
  },
  {
    affixName: "lymphatico",
    affixDescription: "lymphatico",
  },
  {
    affixName: "chromato",
    affixDescription: "chromato",
  },
  {
    affixName: "malario",
    affixDescription: "malario",
  },
  {
    affixName: "rific",
    affixDescription: "rific",
  },
  {
    affixName: "synapto",
    affixDescription: "synapto",
  },
  {
    affixName: "sympathico",
    affixDescription: "sympathico",
  },
  {
    affixName: "sis",
    affixDescription: "sis",
  },
  {
    affixName: "scuto",
    affixDescription: "scuto",
  },
  {
    affixName: "anthraco",
    affixDescription: "anthraco",
  },
  {
    affixName: "geniculo",
    affixDescription: "geniculo",
  },
  {
    affixName: "perio",
    affixDescription: "perio",
  },
  {
    affixName: "antro",
    affixDescription: "antro",
  },
  {
    affixName: "nega",
    affixDescription: "nega",
  },
  {
    affixName: "sian",
    affixDescription: "sian",
  },
  {
    affixName: "crystallo",
    affixDescription: "crystallo",
  },
  {
    affixName: "ennea",
    affixDescription: "ennea",
  },
  {
    affixName: "sapro",
    affixDescription: "sapro",
  },
  {
    affixName: "menisco",
    affixDescription: "menisco",
  },
  {
    affixName: "rama",
    affixDescription: "rama",
  },
  {
    affixName: "valvo",
    affixDescription: "valvo",
  },
  {
    affixName: "ribine",
    affixDescription: "ribine",
  },
  {
    affixName: "echino",
    affixDescription: "echino",
  },
  {
    affixName: "Hispano",
    affixDescription: "Hispano",
  },
  {
    affixName: "periodonto",
    affixDescription: "periodonto",
  },
  {
    affixName: "metabo",
    affixDescription: "metabo",
  },
  {
    affixName: "ceptive",
    affixDescription: "ceptive",
  },
  {
    affixName: "lenticulo",
    affixDescription: "lenticulo",
  },
  {
    affixName: "ulcero",
    affixDescription: "ulcero",
  },
  {
    affixName: "phoro",
    affixDescription: "phoro",
  },
  {
    affixName: "borough",
    affixDescription: "borough",
  },
  {
    affixName: "dictyo",
    affixDescription: "dictyo",
  },
  {
    affixName: "oxifene",
    affixDescription: "oxifene",
  },
  {
    affixName: "semanto",
    affixDescription: "semanto",
  },
  {
    affixName: "kerat",
    affixDescription: "kerat",
  },
  {
    affixName: "dynamo",
    affixDescription: "dynamo",
  },
  {
    affixName: "colliculo",
    affixDescription: "colliculo",
  },
  {
    affixName: "utriculo",
    affixDescription: "utriculo",
  },
  {
    affixName: "posterio",
    affixDescription: "posterio",
  },
  {
    affixName: "pleo",
    affixDescription: "pleo",
  },
  {
    affixName: "monarcho",
    affixDescription: "monarcho",
  },
  {
    affixName: "countertextual",
    affixDescription: "countertextual",
  },
  {
    affixName: "tress",
    affixDescription: "tress",
  },
  {
    affixName: "obliquo",
    affixDescription: "obliquo",
  },
  {
    affixName: "ossi",
    affixDescription: "ossi",
  },
  {
    affixName: "fissi",
    affixDescription: "fissi",
  },
  {
    affixName: "phagy",
    affixDescription: "phagy",
  },
  {
    affixName: "plumo",
    affixDescription: "plumo",
  },
  {
    affixName: "phorous",
    affixDescription: "phorous",
  },
  {
    affixName: "etho",
    affixDescription: "etho",
  },
  {
    affixName: "Klux",
    affixDescription: "Klux",
  },
  {
    affixName: "colpo",
    affixDescription: "colpo",
  },
  {
    affixName: "Dano",
    affixDescription: "Dano",
  },
  {
    affixName: "pallido",
    affixDescription: "pallido",
  },
  {
    affixName: "mesangio",
    affixDescription: "mesangio",
  },
  {
    affixName: "diathermo",
    affixDescription: "diathermo",
  },
  {
    affixName: "fascio",
    affixDescription: "fascio",
  },
  {
    affixName: "octadeca",
    affixDescription: "octadeca",
  },
  {
    affixName: "operculo",
    affixDescription: "operculo",
  },
  {
    affixName: "cholo",
    affixDescription: "cholo",
  },
  {
    affixName: "miso",
    affixDescription: "miso",
  },
  {
    affixName: "pyrrolo",
    affixDescription: "pyrrolo",
  },
  {
    affixName: "capsulo",
    affixDescription: "capsulo",
  },
  {
    affixName: "diffeo",
    affixDescription: "diffeo",
  },
  {
    affixName: "fungi",
    affixDescription: "fungi",
  },
  {
    affixName: "cingulo",
    affixDescription: "cingulo",
  },
  {
    affixName: "epididymo",
    affixDescription: "epididymo",
  },
  {
    affixName: "colono",
    affixDescription: "colono",
  },
  {
    affixName: "metalla",
    affixDescription: "metalla",
  },
  {
    affixName: "metabolo",
    affixDescription: "metabolo",
  },
  {
    affixName: "photoelectro",
    affixDescription: "photoelectro",
  },
  {
    affixName: "mycin",
    affixDescription: "mycin",
  },
  {
    affixName: "cc",
    affixDescription: "cc",
  },
  {
    affixName: "biont",
    affixDescription: "biont",
  },
  {
    affixName: "ois",
    affixDescription: "ois",
  },
  {
    affixName: "ostreo",
    affixDescription: "ostreo",
  },
  {
    affixName: "bora",
    affixDescription: "bora",
  },
  {
    affixName: "kata",
    affixDescription: "kata",
  },
  {
    affixName: "hectokilo",
    affixDescription: "hectokilo",
  },
  {
    affixName: "m",
    affixDescription: "m",
  },
  {
    affixName: "fer",
    affixDescription: "fer",
  },
  {
    affixName: "adenia",
    affixDescription: "adenia",
  },
  {
    affixName: "contacto",
    affixDescription: "contacto",
  },
  {
    affixName: "vitro",
    affixDescription: "vitro",
  },
  {
    affixName: "ego",
    affixDescription: "ego",
  },
  {
    affixName: "graphic",
    affixDescription: "graphic",
  },
  {
    affixName: "therio",
    affixDescription: "therio",
  },
  {
    affixName: "capitulo",
    affixDescription: "capitulo",
  },
  {
    affixName: "areo",
    affixDescription: "areo",
  },
  {
    affixName: "lacrimo",
    affixDescription: "lacrimo",
  },
  {
    affixName: "Hurro",
    affixDescription: "Hurro",
  },
  {
    affixName: "historio",
    affixDescription: "historio",
  },
  {
    affixName: "Park",
    affixDescription: "Park",
  },
  {
    affixName: "clito",
    affixDescription: "clito",
  },
  {
    affixName: "ephebo",
    affixDescription: "ephebo",
  },
  {
    affixName: "ern",
    affixDescription: "ern",
  },
  {
    affixName: "hyps",
    affixDescription: "hyps",
  },
  {
    affixName: "amato",
    affixDescription: "amato",
  },
  {
    affixName: "nodo",
    affixDescription: "nodo",
  },
  {
    affixName: "fasciculo",
    affixDescription: "fasciculo",
  },
  {
    affixName: "furter",
    affixDescription: "furter",
  },
  {
    affixName: "Illyro",
    affixDescription: "Illyro",
  },
  {
    affixName: "cutaneo",
    affixDescription: "cutaneo",
  },
  {
    affixName: "pinko",
    affixDescription: "pinko",
  },
  {
    affixName: "ica",
    affixDescription: "ica",
  },
  {
    affixName: "ometry",
    affixDescription: "ometry",
  },
  {
    affixName: "intestino",
    affixDescription: "intestino",
  },
  {
    affixName: "sona",
    affixDescription: "sona",
  },
  {
    affixName: "hind",
    affixDescription: "hind",
  },
  {
    affixName: "gluteo",
    affixDescription: "gluteo",
  },
  {
    affixName: "mont",
    affixDescription: "mont",
  },
  {
    affixName: "ophio",
    affixDescription: "ophio",
  },
  {
    affixName: "potamo",
    affixDescription: "potamo",
  },
  {
    affixName: "Bat",
    affixDescription: "Bat",
  },
  {
    affixName: "anxio",
    affixDescription: "anxio",
  },
  {
    affixName: "seco",
    affixDescription: "seco",
  },
  {
    affixName: "philiac",
    affixDescription: "philiac",
  },
  {
    affixName: "seismi",
    affixDescription: "seismi",
  },
  {
    affixName: "biontic",
    affixDescription: "biontic",
  },
  {
    affixName: "ula",
    affixDescription: "ula",
  },
  {
    affixName: "hockey",
    affixDescription: "hockey",
  },
  {
    affixName: "acr",
    affixDescription: "acr",
  },
  {
    affixName: "chrome",
    affixDescription: "chrome",
  },
  {
    affixName: "affecto",
    affixDescription: "affecto",
  },
  {
    affixName: "allanto",
    affixDescription: "allanto",
  },
  {
    affixName: "alveo",
    affixDescription: "alveo",
  },
  {
    affixName: "ankylo",
    affixDescription: "ankylo",
  },
  {
    affixName: "annulo",
    affixDescription: "annulo",
  },
  {
    affixName: "appendico",
    affixDescription: "appendico",
  },
  {
    affixName: "arteriolo",
    affixDescription: "arteriolo",
  },
  {
    affixName: "skiing",
    affixDescription: "skiing",
  },
  {
    affixName: "Romano",
    affixDescription: "Romano",
  },
  {
    affixName: "pexy",
    affixDescription: "pexy",
  },
  {
    affixName: "atlo",
    affixDescription: "atlo",
  },
  {
    affixName: "axio",
    affixDescription: "axio",
  },
  {
    affixName: "maker",
    affixDescription: "maker",
  },
  {
    affixName: "calco",
    affixDescription: "calco",
  },
  {
    affixName: "calloso",
    affixDescription: "calloso",
  },
  {
    affixName: "carotico",
    affixDescription: "carotico",
  },
  {
    affixName: "cemento",
    affixDescription: "cemento",
  },
  {
    affixName: "chemico",
    affixDescription: "chemico",
  },
  {
    affixName: "clavi",
    affixDescription: "clavi",
  },
  {
    affixName: "conjunctivo",
    affixDescription: "conjunctivo",
  },
  {
    affixName: "coxo",
    affixDescription: "coxo",
  },
  {
    affixName: "ocrat",
    affixDescription: "ocrat",
  },
  {
    affixName: "dentino",
    affixDescription: "dentino",
  },
  {
    affixName: "disco",
    affixDescription: "disco",
  },
  {
    affixName: "elastico",
    affixDescription: "elastico",
  },
  {
    affixName: "embolo",
    affixDescription: "embolo",
  },
  {
    affixName: "pathic",
    affixDescription: "pathic",
  },
  {
    affixName: "tactic",
    affixDescription: "tactic",
  },
  {
    affixName: "taxis",
    affixDescription: "taxis",
  },
  {
    affixName: "erythemato",
    affixDescription: "erythemato",
  },
  {
    affixName: "extero",
    affixDescription: "extero",
  },
  {
    affixName: "tetrahydro",
    affixDescription: "tetrahydro",
  },
  {
    affixName: "primo",
    affixDescription: "primo",
  },
  {
    affixName: "anterio",
    affixDescription: "anterio",
  },
  {
    affixName: "allato",
    affixDescription: "allato",
  },
  {
    affixName: "poietic",
    affixDescription: "poietic",
  },
  {
    affixName: "prefronto",
    affixDescription: "prefronto",
  },
  {
    affixName: "prepro",
    affixDescription: "prepro",
  },
  {
    affixName: "tuberculo",
    affixDescription: "tuberculo",
  },
  {
    affixName: "Strait",
    affixDescription: "Strait",
  },
  {
    affixName: "folliculo",
    affixDescription: "folliculo",
  },
  {
    affixName: "valvulo",
    affixDescription: "valvulo",
  },
  {
    affixName: "acido",
    affixDescription: "acido",
  },
  {
    affixName: "laeo",
    affixDescription: "laeo",
  },
  {
    affixName: "palmaro",
    affixDescription: "palmaro",
  },
  {
    affixName: "primi",
    affixDescription: "primi",
  },
  {
    affixName: "entorhino",
    affixDescription: "entorhino",
  },
  {
    affixName: "balano",
    affixDescription: "balano",
  },
  {
    affixName: "anatomo",
    affixDescription: "anatomo",
  },
  {
    affixName: "cruro",
    affixDescription: "cruro",
  },
  {
    affixName: "ceco",
    affixDescription: "ceco",
  },
  {
    affixName: "intermedio",
    affixDescription: "intermedio",
  },
  {
    affixName: "pineo",
    affixDescription: "pineo",
  },
  {
    affixName: "chezia",
    affixDescription: "chezia",
  },
  {
    affixName: "sialia",
    affixDescription: "sialia",
  },
  {
    affixName: "sphingo",
    affixDescription: "sphingo",
  },
  {
    affixName: "omic",
    affixDescription: "omic",
  },
  {
    affixName: "bracteo",
    affixDescription: "bracteo",
  },
  {
    affixName: "phytic",
    affixDescription: "phytic",
  },
  {
    affixName: "mamillo",
    affixDescription: "mamillo",
  },
  {
    affixName: "lyo",
    affixDescription: "lyo",
  },
  {
    affixName: "diencephalo",
    affixDescription: "diencephalo",
  },
  {
    affixName: "mammilo",
    affixDescription: "mammilo",
  },
  {
    affixName: "imino",
    affixDescription: "imino",
  },
  {
    affixName: "rubro",
    affixDescription: "rubro",
  },
  {
    affixName: "antenno",
    affixDescription: "antenno",
  },
  {
    affixName: "germo",
    affixDescription: "germo",
  },
  {
    affixName: "mammo",
    affixDescription: "mammo",
  },
  {
    affixName: "radiculo",
    affixDescription: "radiculo",
  },
  {
    affixName: "sialyl",
    affixDescription: "sialyl",
  },
  {
    affixName: "static",
    affixDescription: "static",
  },
  {
    affixName: "estro",
    affixDescription: "estro",
  },
  {
    affixName: "morphy",
    affixDescription: "morphy",
  },
  {
    affixName: "mammillo",
    affixDescription: "mammillo",
  },
  {
    affixName: "corn",
    affixDescription: "corn",
  },
  {
    affixName: "proprio",
    affixDescription: "proprio",
  },
  {
    affixName: "squamoso",
    affixDescription: "squamoso",
  },
  {
    affixName: "circa",
    affixDescription: "circa",
  },
  {
    affixName: "pentadeca",
    affixDescription: "pentadeca",
  },
  {
    affixName: "tetr",
    affixDescription: "tetr",
  },
  {
    affixName: "docosa",
    affixDescription: "docosa",
  },
  {
    affixName: "tetradeca",
    affixDescription: "tetradeca",
  },
  {
    affixName: "umbilico",
    affixDescription: "umbilico",
  },
  {
    affixName: "allergo",
    affixDescription: "allergo",
  },
  {
    affixName: "ergia",
    affixDescription: "ergia",
  },
  {
    affixName: "agno",
    affixDescription: "agno",
  },
  {
    affixName: "cello",
    affixDescription: "cello",
  },
  {
    affixName: "angulo",
    affixDescription: "angulo",
  },
  {
    affixName: "fumi",
    affixDescription: "fumi",
  },
  {
    affixName: "attico",
    affixDescription: "attico",
  },
  {
    affixName: "branchio",
    affixDescription: "branchio",
  },
  {
    affixName: "supre",
    affixDescription: "supre",
  },
  {
    affixName: "arcto",
    affixDescription: "arcto",
  },
  {
    affixName: "presby",
    affixDescription: "presby",
  },
  {
    affixName: "pseud",
    affixDescription: "pseud",
  },
  {
    affixName: "juridico",
    affixDescription: "juridico",
  },
  {
    affixName: "lepido",
    affixDescription: "lepido",
  },
  {
    affixName: "naturo",
    affixDescription: "naturo",
  },
  {
    affixName: "dentalo",
    affixDescription: "dentalo",
  },
  {
    affixName: "iliaco",
    affixDescription: "iliaco",
  },
  {
    affixName: "carboxy",
    affixDescription: "carboxy",
  },
  {
    affixName: "gyneco",
    affixDescription: "gyneco",
  },
  {
    affixName: "logico",
    affixDescription: "logico",
  },
  {
    affixName: "sensori",
    affixDescription: "sensori",
  },
  {
    affixName: "arabino",
    affixDescription: "arabino",
  },
  {
    affixName: "caseo",
    affixDescription: "caseo",
  },
  {
    affixName: "oophoro",
    affixDescription: "oophoro",
  },
  {
    affixName: "ifuge",
    affixDescription: "ifuge",
  },
  {
    affixName: "ombro",
    affixDescription: "ombro",
  },
  {
    affixName: "pericardio",
    affixDescription: "pericardio",
  },
  {
    affixName: "planto",
    affixDescription: "planto",
  },
  {
    affixName: "low",
    affixDescription: "low",
  },
  {
    affixName: "celiaco",
    affixDescription: "celiaco",
  },
  {
    affixName: "ona",
    affixDescription: "ona",
  },
  {
    affixName: "clono",
    affixDescription: "clono",
  },
  {
    affixName: "patro",
    affixDescription: "patro",
  },
  {
    affixName: "stoichio",
    affixDescription: "stoichio",
  },
  {
    affixName: "syllecto",
    affixDescription: "syllecto",
  },
  {
    affixName: "chimero",
    affixDescription: "chimero",
  },
  {
    affixName: "cyrto",
    affixDescription: "cyrto",
  },
  {
    affixName: "eicosa",
    affixDescription: "eicosa",
  },
  {
    affixName: "haptico",
    affixDescription: "haptico",
  },
  {
    affixName: "teleio",
    affixDescription: "teleio",
  },
  {
    affixName: "nekto",
    affixDescription: "nekto",
  },
  {
    affixName: "dendrito",
    affixDescription: "dendrito",
  },
  {
    affixName: "ellipto",
    affixDescription: "ellipto",
  },
  {
    affixName: "ferto",
    affixDescription: "ferto",
  },
  {
    affixName: "reni",
    affixDescription: "reni",
  },
  {
    affixName: "articulo",
    affixDescription: "articulo",
  },
  {
    affixName: "coeruleo",
    affixDescription: "coeruleo",
  },
  {
    affixName: "corono",
    affixDescription: "corono",
  },
  {
    affixName: "phobo",
    affixDescription: "phobo",
  },
  {
    affixName: "galvo",
    affixDescription: "galvo",
  },
  {
    affixName: "iad",
    affixDescription: "iad",
  },
  {
    affixName: "dromo",
    affixDescription: "dromo",
  },
  {
    affixName: "lamino",
    affixDescription: "lamino",
  },
  {
    affixName: "ludo",
    affixDescription: "ludo",
  },
  {
    affixName: "occluso",
    affixDescription: "occluso",
  },
  {
    affixName: "crio",
    affixDescription: "crio",
  },
  {
    affixName: "toxo",
    affixDescription: "toxo",
  },
  {
    affixName: "trabeculo",
    affixDescription: "trabeculo",
  },
  {
    affixName: "farado",
    affixDescription: "farado",
  },
  {
    affixName: "phagous",
    affixDescription: "phagous",
  },
  {
    affixName: "foveo",
    affixDescription: "foveo",
  },
  {
    affixName: "chory",
    affixDescription: "chory",
  },
  {
    affixName: "penic",
    affixDescription: "penic",
  },
  {
    affixName: "intesto",
    affixDescription: "intesto",
  },
  {
    affixName: "respiro",
    affixDescription: "respiro",
  },
  {
    affixName: "ictero",
    affixDescription: "ictero",
  },
  {
    affixName: "oxido",
    affixDescription: "oxido",
  },
  {
    affixName: "tendo",
    affixDescription: "tendo",
  },
  {
    affixName: "inflammo",
    affixDescription: "inflammo",
  },
  {
    affixName: "maculo",
    affixDescription: "maculo",
  },
  {
    affixName: "peroxy",
    affixDescription: "peroxy",
  },
  {
    affixName: "capno",
    affixDescription: "capno",
  },
  {
    affixName: "furano",
    affixDescription: "furano",
  },
  {
    affixName: "pleni",
    affixDescription: "pleni",
  },
  {
    affixName: "indeno",
    affixDescription: "indeno",
  },
  {
    affixName: "api",
    affixDescription: "api",
  },
  {
    affixName: "laparo",
    affixDescription: "laparo",
  },
  {
    affixName: "otico",
    affixDescription: "otico",
  },
  {
    affixName: "acu",
    affixDescription: "acu",
  },
  {
    affixName: "capito",
    affixDescription: "capito",
  },
  {
    affixName: "pudendo",
    affixDescription: "pudendo",
  },
  {
    affixName: "duodeca",
    affixDescription: "duodeca",
  },
  {
    affixName: "cario",
    affixDescription: "cario",
  },
  {
    affixName: "pluvio",
    affixDescription: "pluvio",
  },
  {
    affixName: "ostio",
    affixDescription: "ostio",
  },
  {
    affixName: "plexo",
    affixDescription: "plexo",
  },
  {
    affixName: "asialo",
    affixDescription: "asialo",
  },
  {
    affixName: "troph",
    affixDescription: "troph",
  },
  {
    affixName: "zygoto",
    affixDescription: "zygoto",
  },
  {
    affixName: "spermia",
    affixDescription: "spermia",
  },
  {
    affixName: "methano",
    affixDescription: "methano",
  },
  {
    affixName: "wich",
    affixDescription: "wich",
  },
  {
    affixName: "silvi",
    affixDescription: "silvi",
  },
  {
    affixName: "sinu",
    affixDescription: "sinu",
  },
  {
    affixName: "bacillo",
    affixDescription: "bacillo",
  },
  {
    affixName: "eleuthero",
    affixDescription: "eleuthero",
  },
  {
    affixName: "palmo",
    affixDescription: "palmo",
  },
  {
    affixName: "hydrido",
    affixDescription: "hydrido",
  },
  {
    affixName: "incudo",
    affixDescription: "incudo",
  },
  {
    affixName: "goer",
    affixDescription: "goer",
  },
  {
    affixName: "stathmo",
    affixDescription: "stathmo",
  },
  {
    affixName: "hippocampo",
    affixDescription: "hippocampo",
  },
  {
    affixName: "grano",
    affixDescription: "grano",
  },
  {
    affixName: "lumino",
    affixDescription: "lumino",
  },
  {
    affixName: "stasis",
    affixDescription: "stasis",
  },
  {
    affixName: "ramo",
    affixDescription: "ramo",
  },
  {
    affixName: "chordo",
    affixDescription: "chordo",
  },
  {
    affixName: "popliteo",
    affixDescription: "popliteo",
  },
  {
    affixName: "ribonucleo",
    affixDescription: "ribonucleo",
  },
  {
    affixName: "tycho",
    affixDescription: "tycho",
  },
  {
    affixName: "campylo",
    affixDescription: "campylo",
  },
  {
    affixName: "caulo",
    affixDescription: "caulo",
  },
  {
    affixName: "loco",
    affixDescription: "loco",
  },
  {
    affixName: "evapo",
    affixDescription: "evapo",
  },
  {
    affixName: "tyro",
    affixDescription: "tyro",
  },
  {
    affixName: "pensioner",
    affixDescription: "pensioner",
  },
  {
    affixName: "rifa",
    affixDescription: "rifa",
  },
  {
    affixName: "chao",
    affixDescription: "chao",
  },
  {
    affixName: "hodo",
    affixDescription: "hodo",
  },
  {
    affixName: "ocello",
    affixDescription: "ocello",
  },
  {
    affixName: "cancero",
    affixDescription: "cancero",
  },
  {
    affixName: "dieto",
    affixDescription: "dieto",
  },
  {
    affixName: "areolo",
    affixDescription: "areolo",
  },
  {
    affixName: "rugulo",
    affixDescription: "rugulo",
  },
  {
    affixName: "meteoro",
    affixDescription: "meteoro",
  },
  {
    affixName: "tapho",
    affixDescription: "tapho",
  },
  {
    affixName: "tergo",
    affixDescription: "tergo",
  },
  {
    affixName: "archae",
    affixDescription: "archae",
  },
  {
    affixName: "prostato",
    affixDescription: "prostato",
  },
  {
    affixName: "rugo",
    affixDescription: "rugo",
  },
  {
    affixName: "solvo",
    affixDescription: "solvo",
  },
  {
    affixName: "climo",
    affixDescription: "climo",
  },
  {
    affixName: "ducto",
    affixDescription: "ducto",
  },
  {
    affixName: "proso",
    affixDescription: "proso",
  },
  {
    affixName: "oscillo",
    affixDescription: "oscillo",
  },
  {
    affixName: "trapezio",
    affixDescription: "trapezio",
  },
  {
    affixName: "itic",
    affixDescription: "itic",
  },
  {
    affixName: "histolo",
    affixDescription: "histolo",
  },
  {
    affixName: "nitroso",
    affixDescription: "nitroso",
  },
  {
    affixName: "neutro",
    affixDescription: "neutro",
  },
  {
    affixName: "volcano",
    affixDescription: "volcano",
  },
  {
    affixName: "canalo",
    affixDescription: "canalo",
  },
  {
    affixName: "externo",
    affixDescription: "externo",
  },
  {
    affixName: "ato",
    affixDescription: "ato",
  },
  {
    affixName: "triplo",
    affixDescription: "triplo",
  },
  {
    affixName: "plantaro",
    affixDescription: "plantaro",
  },
  {
    affixName: "uvulo",
    affixDescription: "uvulo",
  },
  {
    affixName: "ense",
    affixDescription: "ense",
  },
  {
    affixName: "fem",
    affixDescription: "fem",
  },
  {
    affixName: "aft",
    affixDescription: "aft",
  },
  {
    affixName: "limbo",
    affixDescription: "limbo",
  },
  {
    affixName: "stibo",
    affixDescription: "stibo",
  },
  {
    affixName: "densito",
    affixDescription: "densito",
  },
  {
    affixName: "ography",
    affixDescription: "ography",
  },
  {
    affixName: "acetabulo",
    affixDescription: "acetabulo",
  },
  {
    affixName: "mixo",
    affixDescription: "mixo",
  },
  {
    affixName: "curvi",
    affixDescription: "curvi",
  },
  {
    affixName: "pelago",
    affixDescription: "pelago",
  },
  {
    affixName: "tubo",
    affixDescription: "tubo",
  },
  {
    affixName: "causto",
    affixDescription: "causto",
  },
  {
    affixName: "synovio",
    affixDescription: "synovio",
  },
  {
    affixName: "tany",
    affixDescription: "tany",
  },
  {
    affixName: "altero",
    affixDescription: "altero",
  },
  {
    affixName: "cribro",
    affixDescription: "cribro",
  },
  {
    affixName: "pesca",
    affixDescription: "pesca",
  },
  {
    affixName: "archæo",
    affixDescription: "archæo",
  },
  {
    affixName: "pulpo",
    affixDescription: "pulpo",
  },
  {
    affixName: "basio",
    affixDescription: "basio",
  },
  {
    affixName: "ophidio",
    affixDescription: "ophidio",
  },
  {
    affixName: "insulo",
    affixDescription: "insulo",
  },
  {
    affixName: "labro",
    affixDescription: "labro",
  },
  {
    affixName: "staturo",
    affixDescription: "staturo",
  },
  {
    affixName: "epilepto",
    affixDescription: "epilepto",
  },
  {
    affixName: "interio",
    affixDescription: "interio",
  },
  {
    affixName: "phanero",
    affixDescription: "phanero",
  },
  {
    affixName: "taxono",
    affixDescription: "taxono",
  },
  {
    affixName: "quadra",
    affixDescription: "quadra",
  },
  {
    affixName: "septico",
    affixDescription: "septico",
  },
  {
    affixName: "sexo",
    affixDescription: "sexo",
  },
  {
    affixName: "parotideo",
    affixDescription: "parotideo",
  },
  {
    affixName: "meteo",
    affixDescription: "meteo",
  },
  {
    affixName: "tetracosa",
    affixDescription: "tetracosa",
  },
  {
    affixName: "midi",
    affixDescription: "midi",
  },
  {
    affixName: "rhombi",
    affixDescription: "rhombi",
  },
  {
    affixName: "taxo",
    affixDescription: "taxo",
  },
  {
    affixName: "ception",
    affixDescription: "ception",
  },
  {
    affixName: "person",
    affixDescription: "person",
  },
  {
    affixName: "lachrymo",
    affixDescription: "lachrymo",
  },
  {
    affixName: "zoon",
    affixDescription: "zoon",
  },
  {
    affixName: "Cypro",
    affixDescription: "Cypro",
  },
  {
    affixName: "misia",
    affixDescription: "misia",
  },
  {
    affixName: "flux",
    affixDescription: "flux",
  },
  {
    affixName: "plasmo",
    affixDescription: "plasmo",
  },
  {
    affixName: "pepto",
    affixDescription: "pepto",
  },
  {
    affixName: "hella",
    affixDescription: "hella",
  },
  {
    affixName: "glucosyl",
    affixDescription: "glucosyl",
  },
  {
    affixName: "kino",
    affixDescription: "kino",
  },
  {
    affixName: "nigro",
    affixDescription: "nigro",
  },
  {
    affixName: "pelagi",
    affixDescription: "pelagi",
  },
  {
    affixName: "adelpho",
    affixDescription: "adelpho",
  },
  {
    affixName: "ennium",
    affixDescription: "ennium",
  },
  {
    affixName: "loki",
    affixDescription: "loki",
  },
  {
    affixName: "intradermo",
    affixDescription: "intradermo",
  },
  {
    affixName: "phagic",
    affixDescription: "phagic",
  },
  {
    affixName: "endocrino",
    affixDescription: "endocrino",
  },
  {
    affixName: "erie",
    affixDescription: "erie",
  },
  {
    affixName: "tango",
    affixDescription: "tango",
  },
  {
    affixName: "fabello",
    affixDescription: "fabello",
  },
  {
    affixName: "tant",
    affixDescription: "tant",
  },
  {
    affixName: "acoustico",
    affixDescription: "acoustico",
  },
  {
    affixName: "carto",
    affixDescription: "carto",
  },
  {
    affixName: "R",
    affixDescription: "R",
  },
  {
    affixName: "phospha",
    affixDescription: "phospha",
  },
  {
    affixName: "nomo",
    affixDescription: "nomo",
  },
  {
    affixName: "interno",
    affixDescription: "interno",
  },
  {
    affixName: "pulmo",
    affixDescription: "pulmo",
  },
  {
    affixName: "sinuso",
    affixDescription: "sinuso",
  },
  {
    affixName: "kalo",
    affixDescription: "kalo",
  },
  {
    affixName: "genu",
    affixDescription: "genu",
  },
  {
    affixName: "gephyro",
    affixDescription: "gephyro",
  },
  {
    affixName: "sulco",
    affixDescription: "sulco",
  },
  {
    affixName: "viri",
    affixDescription: "viri",
  },
  {
    affixName: "coli",
    affixDescription: "coli",
  },
  {
    affixName: "omento",
    affixDescription: "omento",
  },
  {
    affixName: "mamma",
    affixDescription: "mamma",
  },
  {
    affixName: "coronaro",
    affixDescription: "coronaro",
  },
  {
    affixName: "seno",
    affixDescription: "seno",
  },
  {
    affixName: "flexi",
    affixDescription: "flexi",
    originWords: [{adj_meaning: "flexible"}]
  },
  {
    affixName: "pupillo",
    affixDescription: "pupillo",
    originWords: [{noun_meaning: "pupil"}]
  },
  {
    affixName: "inlaw",
    affixDescription: "inlaw",
  },
  {
    affixName: "nycto",
    affixDescription: "nycto-",
    themes: ["botony", "advanced medicine"]
  },

  //***COMPUTER */
  {
    affixName: "cyber",
    affixDescription: "derives terms relating to electronics or computers",
    themes: ["computers"],
    originWords: [
      { noun_meaning: "computer" },
      { adj_meaning: "electric" },
      { noun_meaning: "electricity" },
      { noun_meaning: "lightning" },
    ],
  },
  {
    affixName: "gibi",
    affixDescription: "gibi-",
    themes: ["computers"],
  },

  //MATHEMATICS
  {
    affixName: "eigen",
    affixDescription:
      "derives terms pertaining to or related to eigenvectors, eigenvalues; especially for naming mathematical objects which are not affected by a given linear transformation except for by scalar multiplication.",
    themes: ["mathematics"],
  },

  //SPACE FARING
  {
    affixName: "xeno",
    affixDescription: "xeno-, relating to aliens",
    themes: ["space faring"],
    originWords: [{ noun_meaning: "alien" }, { adj_meaning: "alien" }],
  },
  {
    affixName: "astro",
    affixDescription: "astro-, aster-, relating to stars",
    themes: ["space faring"],
    originWords: [
      { noun_meaning: "star" },
      { noun_meaning: "sun" },
      { noun_meaning: "cosmos" },
      { adj_meaning: "cosmic" },
      { noun_meaning: "space" },
    ],
  },

  //linguistics
  {
    affixName: "glotto",
    affixDescription: "glotto-",
    themes: ["linguistics"],
  },

  //agricultural
  {
    affixName: "agri",
    affixDescription: "relating to agriculture",
    themes: ["agricultural"],
    originWords: [
      { noun_meaning: "field" },
      { noun_meaning: "farm" },
      { noun_meaning: "farmer" },
      { noun_meaning: "crop" },
      { noun_meaning: "grain" },
    ],
  },

  //SEA FARING
  {
    affixName: "naut",
    affixDescription: "relating to sea travel",
    themes: ["sea faring"],
    originWords: [
      { noun_meaning: "sea" },
      { noun_meaning: "boat" },
      { noun_meaning: "sail" },
    ],
  },

  //MONARCHY
  {
    affixName: "vice",
    affixDescription: "vice-",
    themes: ["monarchy"],
  },
];

export default potentialAffixArray;
