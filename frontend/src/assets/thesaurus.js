let allWordsInThesaurus = [
    ["ignore", "disregard", "tune out", "neglect"],
    ["exhaust", "tire out"],
    ["fat", "oil", "grease"],
    ["dot", "speck", "fleck"],
    ["search", "seek", "find"],
    ["fluid", "liquid"],
    ["thin", "scant", "narrow", "(of colour), light", "delicate", "fragile", "weak", "pale", "faded"],
["pull", "tow", "drag", "draw out", "extract", "remove"],
    ["last", "final"],
    ["beam", "ray"],
["signifigant", "important", "central", "pivotal"],
    ["deceased", "dead"],
    ["base", "bottom", "foundation"],
    ["bulky", "hefty"],
    ["corpse", "dead body"],
    ["twelve", "dozen"],
    ["break", "destroy"],
    ["wizard", "sorceror"],
    ["giant", "huge", "massive", "enormous"],
    ["place", "area", "location", "region"],
    ["sweet", "delectible", "tasty"],
    ["different", "distinct"],
    ["sick", "unwell"],
    ["fret", "worry", "be anxious"],
    ["palate", "roof of the mouth"],
    ["wriggle", "writhe around"],
    ["skill", "talent", "intelligence", "Mind"],
    ["gourd", "bottle"],
    ["until", "up to"],
    ["gulp", "guzzle"],
    ["circle", "ringlet", "ring", "hoop", "bangle"],
    ["on fire", "ablaze", "burning"],
    ["ripen up", "become ripe", "light up", "catch fire","switch on or off", "toggle"],
    ["squirt", "pour from a small opening"],
    ["bubble", "gurgle", "bellow", "roar"],
    ["tide", "ebb"],
    ["alive", "extant", "living", "viable", "vital", "active", "alert"],
    ["dog", "hound", "canid"],
    ["mouth", "opening", "entrance", "estuary", "spout", "burrow", "den", "lair", "hole", "muzzle of a weapon"],
    ["enemy", "opponent", "demon", "foe", "antagonist"],
    ["genocide", "annihilation", "ethnic cleansing"],
    ["violent", "aggressive", "dangerous", "extreme", "vehement", "rampant", "boisterous", "vicious", "abrupt"],
    ["jewel", "gem", "ornament", "diamond", "crystal", "pearl", "beautiful woman"],
    ["new", "fresh", "recent", "novel", "unknown", "original", "unique", "unprecedented"],
    ["mouse", "rodent", "pest", "scoundrel", "rat", "nuissance"],
    ["affliction", "disease", "blemish", "vice", "negative trait", "curse", "scourge", "virus", "poison", "venom", "arsenic", "plague", "demon"],
    ["belch", "burp", "rudely interject"],
    ["pain", "ache"],
    ["move", "wriggle", "stir, drift", "wander"],
    ["jump", "leap", "hop, drift", "skip", "suddenly change", "bound", "lunge", "pounce", "dance"],
    ["stand", "remain", "exist", "wait"],
    ["fight", "quarrel", "battle", "wage war", "resist", "injure", "harm", "come inconflict"],
    ["employ", "use", "make use of"],
    ["rich", "affluent", "wealthy", "abundant", "luxurious", "good", "well off", "well favoured", "luscious", "exquisite", "(of colour) vivd, intense"],
    ["empty", "absent", "not present", "clear", "transparent", "omitted", "void", "blank", "invalid", "hollow", "deserted", "vacant", "drained", "useless"],
    ["membrane", "film", "thin layer", "scum", "coating"],
    ["oath", "promise", "law", "declaration", "word", "affirmation", "pledge"],
    ["land", "ground", "earth", "estate", "territory", "area", "region"],
    ["finger", "probe", "probing stick"],
    ["cross", "intersect"],
    ["happy", "cheerful", "upbeat", "positive", "delightful", "fun", "glad", "fortunate", "lucky", "smiling", "pleased", "satisfied", "at ease", "comfortable"],
    ["brown", "muddy", "smeared", "dull", "dim"],
    ["head", "chief", "leader", "lord", "master", "ruler"],
    ["disperse", "scatter"],
    ["moon", "month"],
    ["foreigner", "stranger", "outsider", "alien"],
    ["bald", "bare", "exposed", "uncovered", "roofless", "unclad", "naked"],
    ["pitch", "set up", "establish", "bring forth", "found (a group, a society)"],
    ["stream", "brook", "small river", "tributary", "tap", "shower", "outflow"],
    ["normal", "typical", "usual", "ordinary", "expected", "regular", "consistent"],
    ["dark", "black", "evil", "unknown", "bad", "wicked", "obscure", "hard see", "shaded", "blind", "joyless", "insidious", "hateful", "monstrous", "dim", "dull", "lack-luster", "dingy", "bleak", "miserable", "dirty", "(of the sky) overcast", "looming"],
    ["holy", "divine", "sacred", "godly", "fateful", "hallowed", "celestial", "heavenly", "supreme"],
    ["raven", "corvid", "clever person", "coniving person"],
    ["hunt", "seek out", "prowl", "stalk", "track down", "chase ", "kill", "slaughter", "pursue"],
    ["weak", "feeble", "brittle", "pathetic", "pitiful", "unconvincing", "lame", "(of water) still, stagnant, slow-flowing", "languid", "lethargic", "impotent", "sterile", "infertile", "barren", "flaccid", "half-hearted", "asthenic", "powerless", "soft", "infirm", "faint", "(of colour) bleached faded", "effeminate", "flimsy"],
    ["prefer", "like", "choose", "adopt", "embrace", "accept"],
    ["hollow", "unpromising", "unsubstantial", "ungrounded", "immiterial", "vague", "tenuous", "meagre", "lame", "crude", "depressed", "concave", "cavernous", "spacious", "silent"],
    ["small", "tiny", "puny", "slight", "weeny", "scant", "simple", "mere", "paltry"],
    ["yellow", "sallow", "golden"],
    ["glass", "lense"],
    ["tear", "rip", "seperate", "segregate", "isolate", "rescind", "bluster", "claw at", "riot", "ravage"],
    ["flat", "simple", "mundane", "level", "equal", "horizontal", "supine"],
    ["reward", "enrich", "pay", "compensate", "embuse", "give tribute"],
    ["air", "gas", "vapour", "fume", "ether"],
    ["stiff", "stubborn", "rigid", "firm", "inflexible"],
    ["padded", "fluffy", "soft"],
    ["long", "tall"],
    ["suck", "draw in"],
    ["lineage", "ancestry", "descent"],
    ["race", "kin", "family", "species", "type", "gender"],
    ["deem", "judge", "reckon", "determine", "count", "consider"],
    ["hole", "gap", "chasm", "void", "dot", "point", "puncture", "orrifice"],
    ["short", "brief", "curt", "compact", "small", "stubby", "shorn", "stocky", "concise", "inferior"],
    ["able", "powerful", "competent", "capable", "potent"],
    ["abundant", "great", "lush", "considerable", "extravagant", "massive", "ample", "enough", "suitable", "vast"],
    ["afraid", "scared", "frightened", "fearful", "timid", "nervous", "faint-hearted", "cowardly", "fidgety", "anxious"],
    ["grace", "favour", "elegance", "purity", "distinction", "aristocracy", "nobility", "ease", "beauty", "loveliness", "fairness", "splendour", "radiance"],
    ["prose", "poetry", "lyric", "spell", "verbosity", "verbal magic", "wordiness"],
    ["revenge", "reciprocity"],
    ["cloud", "sky", "cosmos", "heavens", "mist", "fog", "vapour", "spray", "haze", "dream"],
    ["shroud", "blanket", "sheet", "cloak", "cover"],
    ["grandson", "male descendant"],
    ["granddaughter", "female descendant"],
    ["grandfather", "male ancestor"],
    ["granddaughter", "female ancestor"],
    ["thorn", "spike"],
    ["realm", "domain", "world", "kingdom", "territory", "land"],
    ["memory", "thought", "reminder", "souvenir", "relic", "retention", "hint", "clue", "token of rememberance", "suggestion", "lore", "fame", "name", "tag", "label", "glory", "honour"],
    ["board", "table", "platform", "wooden door", "barn door", "wooden chest", "plank"],
    ["shin", "lower leg"],
    ["soldier", "warrior"],
    ["warrior", "champion"],
    ["bowl", "pestle", "concave"],
    ["elbow", "crag"],
    ["edge", "border", "ridge", "brink", "verge", "brow", "margin", "brim", "confines", "rim", "coast", "shore", "threshhold", "doorway", "fringe", "dock", "cliff"],
    ["point", "dot", "spot", "focus", "spec", "atom", "iota", "place", "degree", "extent", "grade", "small thing", "topic", "opinion", "intention", "reason", "meaning"],
    ["vagina", "vulva", "pussy", "twat", "cunt"],
    ["birth", "origin", "beginning", "lineage", "bloodline"],
    ["count", "calculate", "take inaccount", "respect"],
    ["find", "discover", "consider", "have an opinion"],
    ["as long as ariver", "endless", "infinite", "very long"],
    ["as angry as a wolf", "very angry", "furious", "enraged"],
    ["as beautiful as a flower", "very beautiful", "gorgeous", "enraged"],
    ["as beautiful as a butterfly", "very beautiful", "gorgeous", "enraged"],
    ["as beautiful as a star", "very beautiful", "gorgeous", "enraged"],
    ["as beautiful as a crown", "very beautiful", "gorgeous", "enraged"],
    ["as beautiful as spring", "very beautiful", "gorgeous", "enraged"],
    ["as blind as night", "very blind", "ignorant", "clueless", "oblivious"],
    ["as blind as a boulder", "very blind", "ignorant", "clueless", "oblivious"],
    ["as dark as night", "very dark", "pitch black"],
    ["as dark as a shadow", "very dark", "pitch black"],
    ["as bright as day", "very bright", "luminous"],
    ["as bright as the sun", "very bright", "luminous"],
    ["as bright as fire", "very bright", "luminous"],
    ["as bright as noon", "very bright", "luminous"],
    ["as bright as the sky", "very bright", "luminous"],
    ["as bright as wind", "very fast", "rapid"],
    ["as bright as a horse", "very fast", "rapid"],
    ["as bright as a hare", "very fast", "rapid"],
    ["as evil as crime", "very evil"],
    ["as evil as a criminal", "very evil"],
    ["as evil as a monster", "very evil"],
    ["as good as a dog", "benevolent", "good-natured"],
    ["as good as a friend", "benevolent", "good-natured"],
    ["as good as a tree", "benevolent", "good-natured"],
    ["as green as grass", "very green", "lush", "vibrant"],
    ["as intelligent as a crow", "very intelligent", "very clever"],
    ["as intelligent as fire", "very intelligent", "very clever"],
    ["as intelligent as a raven", "very intelligent", "very clever"],
    ["as hot as fire", "very hot", "blisteringly-hot"],
    ["as hoty as the sun", "very hot", "blisteringly-hot"],
    ["as hot as a furnace", "very hot", "blisteringly-hot"],
    ["as hungry as a wolf", "very hungry", "ravenous", "famine"],
    ["as hungry as a cow", "very hungry", "ravenous", "famine"],
    ["as hungry as a dragon", "very hungry", "ravenous", "famine"],
    ["as new as a lamb", "very new", "brand-new"],
    ["as new as a kitten", "very new", "brand-new"],
    ["as new as a puppy", "very new", "brand-new"],
    ["as painful as a wound", "very sore", "agonising"],
    ["unexpressive", "stolid", "unemotional"],
    [
  [
    "ax",
    "axe"
  ],
  [
    "anti",
    "counteractive",
    "pismire",
    "emmet",
    "ant"
  ],
  [
    "arse",
    "arsehole",
    "anus"
  ],
  [
    "patronizing",
    "head",
    "condescending",
    "curve",
    "patronising",
    "top",
    "archway",
    "arc",
    "boss",
    "chief",
    "superior",
    "arch"
  ],
  [
    "malus pumila",
    "orchard apple tree",
    "apple"
  ],
  [
    "acorn"
  ],
  [
    "polarbear"
  ],
  [
    "adamsapple"
  ],
  [
    "affliction"
  ],
  [
    "besotted",
    "rigid",
    "strong",
    "hard",
    "wet",
    "cadaver",
    "inebriated",
    "plastered",
    "intoxicated",
    "tight",
    "soused",
    "corpse",
    "pixilated",
    "loaded",
    "sloshed",
    "blotto",
    "potty",
    "soaked",
    "pissed",
    "formal",
    "blind",
    "inflexible",
    "sozzled",
    "remains",
    "clay",
    "smashed",
    "crocked",
    "squiffy",
    "buckram",
    "immobile",
    "tipsy",
    "blind drunk",
    "tiddley",
    "stiffly",
    "tiddly",
    "fuddled",
    "starchy",
    "stand-up",
    "slopped",
    "drunk",
    "uphill",
    "stiff"
  ],
  [
    "alder tree",
    "alder"
  ],
  [
    "tender",
    "light",
    "close",
    "direct",
    "dead",
    "inadequate",
    "deficient",
    "irascible",
    "scant",
    "abruptly",
    "truncate",
    "brief",
    "choleric",
    "fleeting",
    "little",
    "fugitive",
    "insufficient",
    "snub",
    "truncated",
    "poor",
    "squab",
    "runty",
    "impatient",
    "curtly",
    "improvident",
    "suddenly",
    "momentary",
    "ill-natured",
    "brusk",
    "curtal",
    "abbreviated",
    "squat",
    "clipped",
    "shortly",
    "hotheaded",
    "chunky",
    "squatty",
    "unforbearing",
    "shortsighted",
    "short-tempered",
    "momentaneous",
    "dumpy",
    "hot-tempered",
    "short circuit",
    "stumpy",
    "forgetful",
    "unawares",
    "quick-tempered",
    "sawed-off",
    "short-term",
    "shortstop",
    "unstressed",
    "half-length",
    "squabby",
    "short-change",
    "unaccented",
    "unretentive",
    "unforesightful",
    "stubby",
    "short-circuit",
    "shortish",
    "short-range",
    "pint-size",
    "telescoped",
    "shortened",
    "short-dated",
    "shortest",
    "pint-sized",
    "low-set",
    "brusque",
    "curt",
    "short-run",
    "short"
  ],
  [
    "competent",
    "fit",
    "capable",
    "healthy",
    "able-bodied",
    "able"
  ],
  [
    "exuberant",
    "ample",
    "lush",
    "copious",
    "extensive",
    "rife",
    "rich",
    "thick",
    "riotous",
    "easy",
    "rank",
    "long",
    "luxuriant",
    "teeming",
    "torrential",
    "profuse",
    "plethoric",
    "plenteous",
    "plentiful",
    "swarming",
    "abounding",
    "bumper",
    "superabundant",
    "overabundant",
    "abundant"
  ],
  [
    "concerned",
    "disinclined",
    "afraid"
  ],
  [
    "intimate",
    "subjective",
    "private",
    "physical",
    "individualized",
    "personalized",
    "face-to-face",
    "person-to-person",
    "of her own",
    "of his own",
    "of our own",
    "of their own",
    "ain",
    "of your own",
    "personal"
  ],
  [
    "large",
    "big",
    "bulky"
  ],
  [
    "spirited",
    "active",
    "live",
    "animated",
    "enlivened",
    "awake",
    "revived",
    "reanimated",
    "full of life",
    "alert",
    "lively",
    "vital",
    "alive"
  ],
  [
    "saccharine",
    "dulcet",
    "gratifying",
    "mellifluous",
    "cloying",
    "seraphic",
    "fresh",
    "treacly",
    "mellisonant",
    "pleasing",
    "fragrant",
    "melodious",
    "cherubic",
    "odorous",
    "honeyed",
    "lovable",
    "tasteful",
    "melodic",
    "syrupy",
    "confection",
    "odoriferous",
    "musical",
    "angelic",
    "sweetly",
    "confectionery",
    "sugary",
    "sweet-smelling",
    "scented",
    "sweetened",
    "sugared",
    "sweetness",
    "sweetish",
    "perfumed",
    "unsalty",
    "sugariness",
    "unfermented",
    "unsoured",
    "dessert",
    "sweet-scented",
    "angelical",
    "sweet"
  ],
  [
    "solitary",
    "unique",
    "unparalleled",
    "only",
    "unaccompanied",
    "lonely",
    "solely",
    "lone",
    "entirely",
    "exclusively",
    "unequaled",
    "unequalled",
    "alone"
  ],
  [
    "signigifant"
  ],
  [
    "indignant",
    "wild",
    "livid",
    "irate",
    "aggravated",
    "incensed",
    "umbrageous",
    "black",
    "ireful",
    "irascible",
    "tempestuous",
    "choleric",
    "sore",
    "enraged",
    "mad",
    "provoked",
    "smoldering",
    "maddened",
    "furious",
    "unhealthy",
    "raging",
    "infuriated",
    "wroth",
    "angered",
    "wrothful",
    "wrathful",
    "outraged",
    "huffy",
    "smouldering",
    "stormy",
    "angry"
  ],
  [
    "arouse",
    "awaken",
    "wake",
    "alive",
    "waken",
    "wake up",
    "come alive",
    "alert",
    "awake"
  ],
  [
    "intense",
    "atrocious",
    "deplorable",
    "evil",
    "wicked",
    "severe",
    "pitiful",
    "lamentable",
    "dreadful",
    "hard",
    "sad",
    "fine",
    "sorry",
    "inferior",
    "tough",
    "hopeless",
    "immoral",
    "incompetent",
    "stale",
    "harmful",
    "big",
    "awful",
    "mischievous",
    "counterfeit",
    "naughty",
    "pretty",
    "abominable",
    "fearful",
    "defective",
    "terrible",
    "horrid",
    "ill",
    "unsuitable",
    "painful",
    "poor",
    "invalid",
    "uncomfortable",
    "frightful",
    "lousy",
    "insecure",
    "distressing",
    "unhappy",
    "unfavorable",
    "unhealthy",
    "speculative",
    "risky",
    "mediocre",
    "imitative",
    "unskilled",
    "unsatisfactory",
    "badly",
    "unsound",
    "rotten",
    "unfit",
    "unspeakable",
    "crappy",
    "malfunctioning",
    "rubber",
    "forged",
    "nonfunctional",
    "corked",
    "icky",
    "spoiled",
    "spoilt",
    "stinking",
    "swingeing",
    "badness",
    "nonstandard",
    "stinky",
    "no-good",
    "uncollectible",
    "high-risk",
    "corky",
    "negative",
    "bad"
  ],
  [
    "close",
    "endure",
    "high",
    "terminus",
    "terminal",
    "ultimate",
    "utmost",
    "death",
    "conclusion",
    "penultimate",
    "live",
    "net",
    "modern",
    "end",
    "up-to-date",
    "finis",
    "finish",
    "finale",
    "closing",
    "latest",
    "finally",
    "hold up",
    "concluding",
    "later",
    "survive",
    "hold out",
    "in conclusion",
    "parting",
    "antepenultimate",
    "final",
    "latter",
    "unlikely",
    "lastly",
    "unalterable",
    "worst",
    "inalterable",
    "endmost",
    "live on",
    "newest",
    "next-to-last",
    "stopping point",
    "go",
    "lowest",
    "subterminal",
    "fourth-year",
    "last-place",
    "most recently",
    "parthian",
    "last"
  ],
  [
    "impassive",
    "deadpan",
    "expressionless",
    "poker-faced",
    "uncommunicative",
    "incommunicative",
    "unexpressive"
  ],
  [
    "aspect",
    "look",
    "manifestation",
    "reflection",
    "face",
    "facial expression",
    "locution",
    "construction",
    "reflexion",
    "formulation",
    "formula",
    "saying",
    "expression"
  ],
  [
    "overt",
    "bare",
    "open",
    "barefaced",
    "uncovered",
    "denuded",
    "hairless",
    "denudate",
    "bald-headed",
    "bald-pated",
    "bald"
  ],
  [
    "desolate",
    "bleak",
    "stark",
    "barren",
    "simple",
    "air",
    "marginal",
    "naked",
    "spare",
    "empty",
    "strip",
    "scanty",
    "inhospitable",
    "nude",
    "uncovered",
    "stripped",
    "unclothed",
    "denude",
    "au naturel",
    "denuded",
    "publicize",
    "bald",
    "unfinished",
    "denudate",
    "unsheathed",
    "leafless",
    "grassless",
    "publicise",
    "unpainted",
    "mere",
    "bare"
  ],
  [
    "pulchritudinous",
    "exquisite",
    "comely",
    "glorious",
    "resplendent",
    "ravishing",
    "fine",
    "fair",
    "pleasant",
    "lovely",
    "picturesque",
    "splendiferous",
    "stunning",
    "pretty",
    "aesthetic",
    "beauteous",
    "splendid",
    "handsome",
    "gorgeous",
    "scenic",
    "esthetic",
    "well-favoured",
    "sightly",
    "esthetical",
    "dishy",
    "aesthetical",
    "good-looking",
    "well-favored",
    "pretty-pretty",
    "fine-looking",
    "better-looking",
    "bonnie",
    "bonny",
    "beautiful"
  ],
  [
    "conspicuous",
    "prodigious",
    "intense",
    "ample",
    "important",
    "prominent",
    "heavy",
    "broad",
    "great",
    "extensive",
    "magnanimous",
    "colossal",
    "high",
    "obvious",
    "momentous",
    "deep",
    "bad",
    "enceinte",
    "immense",
    "large",
    "braggart",
    "monolithic",
    "massive",
    "gravid",
    "extended",
    "monstrous",
    "generous",
    "capacious",
    "cosmic",
    "heroic",
    "monumental",
    "handsome",
    "bountiful",
    "mature",
    "cock-a-hoop",
    "epic",
    "expectant",
    "double",
    "enormous",
    "elder",
    "loud",
    "astronomical",
    "boastful",
    "bulky",
    "mammoth",
    "bounteous",
    "giving",
    "huge",
    "openhanded",
    "larger-than-life",
    "adult",
    "bouffant",
    "crowing",
    "banner",
    "greatest",
    "boastfully",
    "enlarged",
    "oversized",
    "of import",
    "jumbo",
    "gigantic",
    "humongous",
    "mountainous",
    "larger",
    "grown",
    "full-grown",
    "biggest",
    "outsized",
    "hulking",
    "astronomic",
    "full-size",
    "plumping",
    "bighearted",
    "hulky",
    "older",
    "outsize",
    "king-size",
    "large-scale",
    "man-sized",
    "biggish",
    "freehanded",
    "king-sized",
    "life-sized",
    "braggy",
    "largish",
    "oversize",
    "life-size",
    "bragging",
    "overlarge",
    "fully grown",
    "grownup",
    "blown-up",
    "bigger",
    "elephantine",
    "galactic",
    "gargantuan",
    "giant",
    "largest",
    "liberal",
    "macro",
    "big"
  ],
  [
    "acerbic",
    "caustic",
    "virulent",
    "acrid",
    "vitriolic",
    "sorrowful",
    "venomous",
    "unpleasant",
    "resentful",
    "acerb",
    "hostile",
    "acrimonious",
    "sulfurous",
    "intolerable",
    "painful",
    "tasteful",
    "bitterness",
    "blistering",
    "sulphurous",
    "acid",
    "biting",
    "bitterly",
    "bitingly",
    "piercingly",
    "bitter"
  ],
  [
    "besotted",
    "subterfuge",
    "stiff",
    "dim",
    "wet",
    "imprudent",
    "inebriated",
    "plastered",
    "intoxicated",
    "tight",
    "soused",
    "pixilated",
    "purblind",
    "irrational",
    "loaded",
    "sloshed",
    "blotto",
    "potty",
    "soaked",
    "pissed",
    "unreasonable",
    "screen",
    "sozzled",
    "invisible",
    "smashed",
    "crocked",
    "squiffy",
    "dazzled",
    "blindfold",
    "dim-sighted",
    "unseeable",
    "excecate",
    "closed",
    "tipsy",
    "blind drunk",
    "tiddley",
    "sand-blind",
    "tiddly",
    "undetectable",
    "unperceiving",
    "blinded",
    "fuddled",
    "unreasoning",
    "snow-blind",
    "stone-blind",
    "deuteranopic",
    "unperceptive",
    "eyeless",
    "sightless",
    "visually impaired",
    "slopped",
    "protanopic",
    "visually challenged",
    "color-blind",
    "blindfolded",
    "unseeing",
    "unsighted",
    "colour-blind",
    "tritanopic",
    "green-blind",
    "snow-blinded",
    "near-blind",
    "red-blind",
    "blue-blind",
    "drunk",
    "blind"
  ],
  [
    "conspicuous",
    "audacious",
    "positive",
    "intrepid",
    "obvious",
    "cocksure",
    "confident",
    "rash",
    "brave",
    "bluff",
    "dauntless",
    "enterprising",
    "heroic",
    "foolhardy",
    "nervy",
    "steep",
    "fearless",
    "temerarious",
    "venturesome",
    "emboldened",
    "vaulting",
    "overconfident",
    "daredevil",
    "overvaliant",
    "overreaching",
    "heroical",
    "unfearing",
    "brash",
    "reckless",
    "sheer",
    "bold"
  ],
  [
    "audacious",
    "intrepid",
    "spirited",
    "endure",
    "gay",
    "desperate",
    "bold",
    "venture",
    "valiant",
    "spunky",
    "dauntless",
    "gritty",
    "heroic",
    "game",
    "courageous",
    "gamy",
    "fearless",
    "mettlesome",
    "valorous",
    "gamey",
    "undaunted",
    "stouthearted",
    "weather",
    "colorful",
    "lionhearted",
    "braw",
    "brave out",
    "unfearing",
    "gallant",
    "stalwart",
    "brave"
  ],
  [
    "elephant"
  ],
  [
    "rough",
    "rugged",
    "confused",
    "low",
    "impoverished",
    "ground",
    "split",
    "upset",
    "humble",
    "humiliated",
    "impaired",
    "shattered",
    "destroyed",
    "fractured",
    "humbled",
    "imperfect",
    "cracked",
    "disordered",
    "crushed",
    "disorganized",
    "fragmented",
    "damaged",
    "tamed",
    "distributed",
    "smashed",
    "fitful",
    "dashed",
    "dissolved",
    "splintered",
    "breached",
    "busted",
    "dotted",
    "incomplete",
    "chipped",
    "halting",
    "broken in",
    "unkept",
    "unsmooth",
    "interrupted",
    "wiped out",
    "crumbled",
    "uncomplete",
    "broken-field",
    "tame",
    "broken"
  ],
  [
    "ardent",
    "lurid",
    "lucent",
    "light",
    "auspicious",
    "lustrous",
    "glorious",
    "clear",
    "lambent",
    "luminous",
    "vivid",
    "nitid",
    "intelligent",
    "dazzling",
    "fulgent",
    "scintillating",
    "fulgid",
    "brilliant",
    "iridescent",
    "radiant",
    "blazing",
    "happy",
    "reverberant",
    "beaming",
    "refulgent",
    "effulgent",
    "nacreous",
    "smart",
    "silver",
    "polished",
    "gleaming",
    "opaline",
    "glaring",
    "promising",
    "glary",
    "burnished",
    "pearlescent",
    "scintillant",
    "noctilucent",
    "opalescent",
    "glistering",
    "ringing",
    "shining",
    "silvern",
    "glowing",
    "glistening",
    "sunshiny",
    "blinding",
    "glossy",
    "shiny",
    "colorful",
    "glittering",
    "glimmering",
    "sparkly",
    "agleam",
    "buttony",
    "flashing",
    "beamy",
    "glittery",
    "brilliantly",
    "glinting",
    "shimmery",
    "glimmery",
    "colourful",
    "beady",
    "brightly",
    "undimmed",
    "beadlike",
    "blinking",
    "buttonlike",
    "sheeny",
    "silvery",
    "sunny",
    "bright"
  ],
  [
    "light",
    "giddy",
    "cast",
    "delirious",
    "faint",
    "scrofulous",
    "infirm",
    "cat",
    "stricken",
    "mad",
    "upset",
    "disgorge",
    "unhinged",
    "demented",
    "disturbed",
    "dyspeptic",
    "vertiginous",
    "ailing",
    "ill",
    "queasy",
    "afflicted",
    "insane",
    "crazy",
    "indisposed",
    "sickly",
    "funny",
    "spastic",
    "bilious",
    "convalescent",
    "disgusted",
    "brainsick",
    "vomit",
    "regurgitate",
    "woozy",
    "unwell",
    "consumptive",
    "spue",
    "retch",
    "feverish",
    "regorge",
    "livery",
    "fed up",
    "liverish",
    "upchuck",
    "barf",
    "distracted",
    "feverous",
    "bedrid",
    "honk",
    "dizzy",
    "unbalanced",
    "throw up",
    "nauseated",
    "light-headed",
    "menstruating",
    "bedfast",
    "tubercular",
    "seasick",
    "sickish",
    "carsick",
    "aguish",
    "hallucinating",
    "airsick",
    "gouty",
    "tuberculous",
    "recovering",
    "swooning",
    "bronchitic",
    "sneezy",
    "vomit up",
    "tired of",
    "diabetic",
    "bedridden",
    "unhealed",
    "be sick",
    "sick of",
    "sick-abed",
    "chuck",
    "puke",
    "spew",
    "sick"
  ],
  [
    "chromatic",
    "brownish",
    "brownness",
    "dark-brown",
    "colored",
    "brown"
  ],
  [
    "gelid",
    "bleak",
    "frigid",
    "intense",
    "insensate",
    "cool",
    "crisp",
    "dead",
    "frore",
    "raw",
    "stale",
    "old",
    "algid",
    "unconscious",
    "perfect",
    "polar",
    "frigorific",
    "inhuman",
    "nippy",
    "inhumane",
    "wintry",
    "nipping",
    "emotionless",
    "parky",
    "acold",
    "cutting",
    "unenthusiastic",
    "snappy",
    "arctic",
    "shivering",
    "shivery",
    "freezing",
    "chilled",
    "ice-cold",
    "rimy",
    "frozen",
    "cold-blooded",
    "passionless",
    "heatless",
    "rimed",
    "common cold",
    "refrigerant",
    "coldness",
    "unloving",
    "frosted",
    "iced",
    "stone-cold",
    "refrigerating",
    "unheated",
    "unwarmed",
    "far",
    "frosty",
    "glacial",
    "icy",
    "low temperature",
    "refrigerated",
    "cold"
  ],
  [
    "onfire"
  ],
  [
    "positive",
    "cocksure",
    "bold",
    "assured",
    "self-assured",
    "capable",
    "reassured",
    "surefooted",
    "overconfident",
    "convinced",
    "self-confident",
    "confident"
  ],
  [
    "mellow",
    "good",
    "right",
    "opportune",
    "mature",
    "advanced",
    "late",
    "mellowed",
    "aged",
    "overripe",
    "ripened",
    "ripe"
  ],
  [
    "proper",
    "right",
    "discipline",
    "chastise",
    "precise",
    "castigate",
    "exact",
    "redress",
    "chasten",
    "objurgate",
    "compensate",
    "straight",
    "accurate",
    "sort out",
    "right-minded",
    "chastize",
    "letter-perfect",
    "word-perfect",
    "correct"
  ],
  [
    "wry",
    "unscrupulous",
    "corrupt",
    "contorted",
    "tortuous",
    "irregular",
    "distorted",
    "bent",
    "twisted",
    "anfractuous",
    "warped",
    "askew",
    "hooked",
    "wonky",
    "gnarly",
    "sneaky",
    "underhanded",
    "writhen",
    "asymmetrical",
    "aquiline",
    "underhand",
    "writhed",
    "twisting",
    "knotted",
    "zigzag",
    "knotty",
    "dishonest",
    "gnarled",
    "lopsided",
    "stooped",
    "windblown",
    "hunched",
    "unerect",
    "round-shouldered",
    "twisty",
    "stooping",
    "cockeyed",
    "knobbed",
    "deflective",
    "malposed",
    "refractive",
    "squiggly",
    "round-backed",
    "bending",
    "winding",
    "crooked"
  ],
  [
    "candid",
    "wild",
    "spurious",
    "visceral",
    "intuitive",
    "primitive",
    "spontaneous",
    "raw",
    "misbegotten",
    "connatural",
    "normal",
    "physical",
    "organic",
    "biological",
    "instinctive",
    "misbegot",
    "rude",
    "elemental",
    "unaffected",
    "instinctual",
    "native",
    "inbred",
    "earthy",
    "glandular",
    "unprocessed",
    "inborn",
    "unmannered",
    "bastardly",
    "uncontrived",
    "lifelike",
    "unselfconscious",
    "cancel",
    "unstudied",
    "unstilted",
    "unbleached",
    "uncolored",
    "unplanted",
    "undyed",
    "nonsynthetic",
    "natural"
  ],
  [
    "dull",
    "break",
    "wet",
    "mute",
    "moist",
    "muffle",
    "tone down",
    "weaken",
    "soften",
    "dampen",
    "deaden",
    "dampness",
    "moistness",
    "dampish",
    "damp"
  ],
  [
    "obscure",
    "sullen",
    "dour",
    "grim",
    "subdued",
    "morose",
    "caliginous",
    "dismal",
    "evil",
    "wicked",
    "iniquity",
    "sinister",
    "blue",
    "crepuscular",
    "gloomy",
    "black",
    "dim",
    "disconsolate",
    "incomprehensible",
    "tenebrous",
    "glum",
    "benighted",
    "aphotic",
    "darkling",
    "twilit",
    "acherontic",
    "glowering",
    "dusky",
    "tenebrious",
    "sour",
    "tenebrific",
    "moody",
    "concealed",
    "dispiriting",
    "night",
    "glooming",
    "depressing",
    "inactive",
    "wickedness",
    "ill-natured",
    "brunette",
    "uncomprehensible",
    "cheerless",
    "pitch-black",
    "darkening",
    "nighttime",
    "dark-skinned",
    "uncheerful",
    "gloomful",
    "pitch-dark",
    "lightless",
    "unlit",
    "unenlightened",
    "darkened",
    "darkish",
    "unlighted",
    "unilluminated",
    "acheronian",
    "brunet",
    "cimmerian",
    "colored",
    "coloured",
    "darkness",
    "saturnine",
    "shadow",
    "stygian",
    "dark"
  ],
  [
    "complete",
    "wholly",
    "totally",
    "altogether",
    "whole",
    "entirely",
    "completely",
    "all of",
    "all"
  ],
  [
    "cold",
    "short",
    "barren",
    "abruptly",
    "precise",
    "stagnant",
    "defunct",
    "beat",
    "absolutely",
    "numb",
    "utterly",
    "doomed",
    "drained",
    "deathly",
    "inactive",
    "lifeless",
    "insensitive",
    "suddenly",
    "inanimate",
    "exanimate",
    "executed",
    "breathless",
    "inoperative",
    "extinguished",
    "malfunctioning",
    "deceased",
    "extinct",
    "bloodless",
    "departed",
    "unanimated",
    "nonfunctional",
    "bushed",
    "slain",
    "deathlike",
    "noncurrent",
    "all in",
    "murdered",
    "deadened",
    "nonliving",
    "unreverberant",
    "gone",
    "stillborn",
    "fallen",
    "inelastic",
    "perfectly",
    "assassinated",
    "pulseless",
    "stone-dead",
    "nonextant",
    "nonresonant",
    "unprofitable",
    "brain dead",
    "uncharged",
    "nonviable",
    "nonconscious",
    "idle",
    "quenched",
    "utter",
    "dead"
  ],
  [
    "marital",
    "matrimonial",
    "ringed",
    "wedded",
    "mated",
    "joined",
    "united",
    "wed",
    "married"
  ],
  [
    "indifferent",
    "inattentive",
    "unheeding",
    "tone-deaf",
    "deafen",
    "deaf-mute",
    "stone-deaf",
    "hearing-impaired",
    "deaf as a post",
    "deafened",
    "deaf-and-dumb",
    "hard-of-hearing",
    "profoundly deaf",
    "unhearing",
    "deaf"
  ],
  [
    "earnest",
    "good",
    "close",
    "love",
    "beloved",
    "devout",
    "heartfelt",
    "honey",
    "near",
    "lamb",
    "loved",
    "loved one",
    "dearly",
    "dearest",
    "affectionately",
    "costly",
    "pricy",
    "high-priced",
    "darling",
    "pricey",
    "sincere",
    "dear"
  ],
  [
    "beloved",
    "pet",
    "dearie",
    "favourite",
    "loved",
    "favorite",
    "ducky",
    "deary",
    "darling river",
    "dear",
    "darling"
  ],
  [
    "esoteric",
    "profound",
    "inscrutable",
    "intense",
    "artful",
    "cryptic",
    "heavy",
    "broad",
    "recondite",
    "rich",
    "thick",
    "incomprehensible",
    "inexplicable",
    "abstruse",
    "abysmal",
    "mystifying",
    "low",
    "large",
    "distant",
    "sound",
    "big",
    "mysterious",
    "abyssal",
    "deeply",
    "bass",
    "unfathomed",
    "cryptical",
    "wide",
    "bottomless",
    "colorful",
    "late",
    "low-pitched",
    "unplumbed",
    "wakeless",
    "oceanic abyss",
    "colourful",
    "unsounded",
    "deep-water",
    "deep"
  ],
  [
    "arduous",
    "delicate",
    "vexed",
    "fractious",
    "serious",
    "challenging",
    "ambitious",
    "hard",
    "rough",
    "rugged",
    "tough",
    "stubborn",
    "nasty",
    "effortful",
    "problematic",
    "tight",
    "awkward",
    "tricky",
    "herculean",
    "baffling",
    "troublesome",
    "thorny",
    "embarrassing",
    "unenviable",
    "trying",
    "sticky",
    "rocky",
    "problematical",
    "knotty",
    "catchy",
    "hard-fought",
    "ticklish",
    "difficult"
  ],
  [
    "distinct",
    "disparate",
    "contrary",
    "diverse",
    "antithetical",
    "unusual",
    "various",
    "antithetic",
    "contrasting",
    "contrastive",
    "diametric",
    "divergent",
    "assorted",
    "polar",
    "opposite",
    "other",
    "distinguishable",
    "variant",
    "allo",
    "diametrical",
    "another",
    "dissimilar",
    "unlike",
    "different"
  ],
  [
    "wry",
    "plain",
    "unemotional",
    "arid",
    "solid",
    "desiccated",
    "scorched",
    "humorous",
    "ironic",
    "parched",
    "withered",
    "thirsty",
    "adust",
    "unproductive",
    "humourous",
    "teetotal",
    "brut",
    "waterless",
    "juiceless",
    "shriveled",
    "sunbaked",
    "dried",
    "baked",
    "dry out",
    "dry-shod",
    "semiarid",
    "unexciting",
    "unstimulating",
    "sec",
    "prohibitionist",
    "ironical",
    "dry-eyed",
    "tearless",
    "shrivelled",
    "milkless",
    "rainless",
    "unsweet",
    "dried-up",
    "dried-out",
    "alcoholic",
    "sear",
    "sere",
    "sober",
    "dry"
  ],
  [
    "dull",
    "obtuse",
    "dim",
    "dense",
    "stupid",
    "mute",
    "slow",
    "inarticulate",
    "silent",
    "unarticulate",
    "speechless",
    "dumb"
  ],
  [
    "crude",
    "archaic",
    "inchoate",
    "primitive",
    "precocious",
    "incipient",
    "old",
    "primeval",
    "immature",
    "primordial",
    "primal",
    "new",
    "other",
    "former",
    "baby",
    "future",
    "rude",
    "untimely",
    "primaeval",
    "matutinal",
    "young",
    "premature",
    "embryonic",
    "wee",
    "betimes",
    "proterozoic",
    "earlier",
    "in embryo",
    "archaean",
    "earliest",
    "early on",
    "embryotic",
    "too soon",
    "earlyish",
    "aboriginal",
    "ahead of time",
    "archaeozoic",
    "archean",
    "archeozoic",
    "azoic",
    "early"
  ],
  [
    "vacuous",
    "hollow",
    "void",
    "discharge",
    "bare",
    "open",
    "white",
    "clean",
    "eliminate",
    "vacant",
    "abandon",
    "drained",
    "meaningless",
    "glazed",
    "blank",
    "hungry",
    "glassy",
    "lifeless",
    "vacate",
    "pillaged",
    "evacuate",
    "stripped",
    "unfilled",
    "looted",
    "ransacked",
    "plundered",
    "empty-handed",
    "emptied",
    "empty-bellied",
    "empty"
  ],
  [
    "otiose",
    "indolent",
    "slothful",
    "faineant",
    "slow",
    "work-shy",
    "idle",
    "lazy"
  ],
  [
    "malevolent",
    "grievous",
    "malign",
    "atrocious",
    "wicked",
    "iniquity",
    "depraved",
    "sinister",
    "flagitious",
    "heinous",
    "black",
    "dark",
    "infernal",
    "vicious",
    "vile",
    "bad",
    "immoral",
    "harmful",
    "malefic",
    "despicable",
    "mephistophelean",
    "monstrous",
    "diabolical",
    "ugly",
    "fiendish",
    "maleficent",
    "injurious",
    "devilish",
    "wickedness",
    "perversive",
    "hellish",
    "demonic",
    "immorality",
    "unholy",
    "diabolic",
    "corruptive",
    "unworthy",
    "evil-minded",
    "evilness",
    "mephistophelian",
    "satanic",
    "evil"
  ],
  [
    "profligate",
    "prompt",
    "libertine",
    "hot",
    "degenerate",
    "riotous",
    "vivace",
    "true",
    "immoral",
    "firm",
    "tight",
    "smooth",
    "rapid",
    "dissolute",
    "alacritous",
    "barred",
    "debauched",
    "swift",
    "dissipated",
    "degraded",
    "blistering",
    "immediate",
    "fixed",
    "fleet",
    "faithful",
    "speedy",
    "bolted",
    "accelerated",
    "hurried",
    "accelerating",
    "quick",
    "red-hot",
    "allegro",
    "straightaway",
    "tinted",
    "immobile",
    "speeding",
    "meteoric",
    "fastened",
    "scurrying",
    "flying",
    "instantaneous",
    "locked",
    "winged",
    "secured",
    "andantino",
    "fasting",
    "dyed",
    "high-speed",
    "hastening",
    "latched",
    "allegretto",
    "hurrying",
    "double-quick",
    "colorfast",
    "prestissimo",
    "jet-propelled",
    "loyal",
    "presto",
    "fast"
  ],
  [
    "heavy",
    "stout",
    "plump",
    "rich",
    "thick",
    "corpulent",
    "compact",
    "buxom",
    "stocky",
    "zaftig",
    "weighty",
    "rotund",
    "gross",
    "blubber",
    "productive",
    "oleaginous",
    "fruitful",
    "zoftig",
    "chubby",
    "portly",
    "embonpoint",
    "pudgy",
    "heavyset",
    "buttery",
    "oily",
    "juicy",
    "tubby",
    "porcine",
    "rounded",
    "profitable",
    "greasy",
    "overweight",
    "sebaceous",
    "podgy",
    "fill out",
    "paunchy",
    "pyknic",
    "flesh out",
    "adipose",
    "fatty",
    "fleshy",
    "dumpy",
    "thickset",
    "blubbery",
    "obese",
    "avoirdupois",
    "fatten",
    "potbellied",
    "suety",
    "jowly",
    "adipose tissue",
    "abdominous",
    "fattish",
    "fatten up",
    "fatness",
    "endomorphic",
    "superfatted",
    "double-chinned",
    "plump out",
    "fatten out",
    "loose-jowled",
    "fatty tissue",
    "fertile",
    "fat"
  ],
  [
    "rich",
    "rank",
    "fecund",
    "prolific",
    "productive",
    "fat",
    "fruitful",
    "conceptive",
    "fertilized",
    "impregnated",
    "inseminated",
    "fertilizable",
    "fertilised",
    "fertile"
  ],
  [
    "steadfast",
    "crisp",
    "strong",
    "secure",
    "hard",
    "unwavering",
    "established",
    "fresh",
    "steady",
    "solid",
    "fast",
    "unfaltering",
    "settled",
    "forceful",
    "stable",
    "steadfastly",
    "house",
    "fixed",
    "firmly",
    "healthy",
    "faithful",
    "tauten",
    "unshakable",
    "immobile",
    "truehearted",
    "unwaveringly",
    "unbendable",
    "unfluctuating",
    "business firm",
    "crunchy",
    "loyal",
    "resolute",
    "firm"
  ],
  [
    "dull",
    "insipid",
    "vapid",
    "level",
    "prostrate",
    "even",
    "thin",
    "fixed",
    "tasteless",
    "multidimensional",
    "mat",
    "plane",
    "straight",
    "regressive",
    "matt",
    "planar",
    "deflated",
    "matte",
    "directly",
    "compressed",
    "underdeveloped",
    "unconditional",
    "categorical",
    "unqualified",
    "horizontal",
    "apartment",
    "flavorless",
    "unexciting",
    "unfolded",
    "unstimulating",
    "unerect",
    "flatcar",
    "savorless",
    "unshaded",
    "noneffervescent",
    "unpleated",
    "matted",
    "two-dimensional",
    "unleavened",
    "categoric",
    "flat tire",
    "flavourless",
    "unraised",
    "bland",
    "flat"
  ],
  [
    "wicked",
    "dirty",
    "vile",
    "loathsome",
    "fetid",
    "nasty",
    "smutty",
    "malodorous",
    "putrid",
    "maculate",
    "defile",
    "revolting",
    "offensive",
    "soiled",
    "tangled",
    "illegible",
    "distasteful",
    "inclement",
    "foetid",
    "back up",
    "loathly",
    "noisome",
    "repellent",
    "disgusting",
    "repellant",
    "choke",
    "unjust",
    "filthy",
    "unfair",
    "yucky",
    "befoul",
    "disgustful",
    "clog",
    "contaminate",
    "funky",
    "cheating",
    "pollute",
    "foul-smelling",
    "stinking",
    "unclean",
    "smelly",
    "fouled",
    "unsporting",
    "congest",
    "clog up",
    "marked-up",
    "choke off",
    "unsportsmanlike",
    "afoul",
    "foul ball",
    "out-of-bounds",
    "foul"
  ],
  [
    "mark",
    "fret",
    "chafe",
    "fray",
    "scrape",
    "scrawl",
    "abrasion",
    "excoriation",
    "incision",
    "scraping",
    "notch",
    "rub",
    "scratching",
    "scar",
    "dent",
    "cacography",
    "scribble",
    "chicken feed",
    "scratch up",
    "itch",
    "slit",
    "scratch"
  ],
  [
    "gouge",
    "notch",
    "chip",
    "dent",
    "snick",
    "nick"
  ],
  [
    "nick",
    "scratch",
    "gouge",
    "incision",
    "notch",
    "indent",
    "slit",
    "dent"
  ],
  [
    "blemish",
    "shortcoming",
    "desert",
    "flaw",
    "fault",
    "defect"
  ],
  [
    "impairment",
    "handicap",
    "disablement",
    "disability"
  ],
  [
    "imperfectness",
    "imperfection"
  ],
  [
    "gratuitous",
    "clear",
    "relinquish",
    "discharge",
    "detached",
    "unfettered",
    "open",
    "autonomous",
    "original",
    "exempt",
    "absolve",
    "release",
    "independent",
    "relieve",
    "loose",
    "spare",
    "unrestricted",
    "complimentary",
    "unconstrained",
    "liberate",
    "unconfined",
    "unfixed",
    "available",
    "justify",
    "dislodge",
    "unbound",
    "give up",
    "liberated",
    "voluntary",
    "emancipated",
    "gratis",
    "unobstructed",
    "disengage",
    "inexact",
    "unblock",
    "disembarrass",
    "unhampered",
    "unshackled",
    "uncommitted",
    "escaped",
    "unoccupied",
    "freed",
    "extricated",
    "footloose",
    "unloose",
    "atrip",
    "unchained",
    "unpaid",
    "aweigh",
    "freehand",
    "discharged",
    "self-governing",
    "unfreeze",
    "freehanded",
    "slaveless",
    "costless",
    "released",
    "untied",
    "disentangled",
    "free people",
    "out-of-school",
    "unimprisoned",
    "free-soil",
    "freeborn",
    "liberal",
    "rid",
    "sovereign",
    "free"
  ],
  [
    "pool",
    "pond"
  ],
  [
    "impudent",
    "good",
    "sweet",
    "crisp",
    "brisk",
    "warm",
    "strong",
    "novel",
    "hot",
    "impertinent",
    "wet",
    "invigorating",
    "pure",
    "original",
    "firm",
    "saucy",
    "tonic",
    "forward",
    "clean",
    "smart",
    "new",
    "recently",
    "invigorated",
    "refreshing",
    "overbold",
    "bracing",
    "reinvigorated",
    "unprocessed",
    "caller",
    "freshwater",
    "newly",
    "energizing",
    "freshly",
    "rested",
    "refreshed",
    "unspoiled",
    "unspoilt",
    "unsalty",
    "refreshful",
    "unsoured",
    "unused",
    "lactating",
    "uncured",
    "new-made",
    "fresh-cut",
    "crunchy",
    "fresh"
  ],
  [
    "community",
    "topical",
    "native",
    "localized",
    "homegrown",
    "local anesthetic",
    "local anaesthetic",
    "topical anaesthetic",
    "district",
    "topical anesthetic",
    "local"
  ],
  [
    "ample",
    "good",
    "sonorous",
    "heavy",
    "broad",
    "inundated",
    "rich",
    "replete",
    "complete",
    "round",
    "pregnant",
    "rotund",
    "loaded",
    "laden",
    "brimming",
    "orotund",
    "rumbling",
    "grumbling",
    "total",
    "overladen",
    "ladened",
    "stentorian",
    "flooded",
    "riddled",
    "whole",
    "stuffed",
    "wax",
    "wide",
    "fully",
    "plangent",
    "filled",
    "engorged",
    "swarming",
    "entire",
    "congested",
    "booming",
    "brimful",
    "sounding",
    "nourished",
    "overflowing",
    "weighed down",
    "chockful",
    "undivided",
    "untouched",
    "glutted",
    "brimfull",
    "overloaded",
    "overfull",
    "chock-full",
    "untasted",
    "choke-full",
    "chuck-full",
    "to the full",
    "cram full",
    "well-lined",
    "wide-cut",
    "full"
  ],
  [
    "merriment",
    "play",
    "amusing",
    "sport",
    "diverting",
    "amusive",
    "playfulness",
    "fun"
  ],
  [
    "peculiar",
    "strange",
    "unusual",
    "mirthful",
    "curious",
    "queer",
    "risible",
    "sick",
    "singular",
    "comical",
    "amusing",
    "ill",
    "rummy",
    "humorous",
    "suspicious",
    "shady",
    "questionable",
    "odd",
    "comic",
    "strangely",
    "rum",
    "laughable",
    "oddly",
    "humourous",
    "queerly",
    "comically",
    "fishy",
    "funnily",
    "suspect",
    "funny"
  ],
  [
    "benevolent",
    "keen",
    "adept",
    "virtuous",
    "proficient",
    "gracious",
    "ample",
    "cool",
    "close",
    "beneficial",
    "great",
    "kind",
    "secure",
    "serious",
    "hot",
    "fine",
    "operative",
    "right",
    "skilled",
    "suitable",
    "nice",
    "swell",
    "just",
    "complete",
    "full",
    "advantageous",
    "sound",
    "expert",
    "fresh",
    "dandy",
    "superb",
    "reputable",
    "solid",
    "effective",
    "beatific",
    "bully",
    "genuine",
    "righteous",
    "nifty",
    "pleasing",
    "estimable",
    "intellectual",
    "well",
    "upright",
    "opportune",
    "beneficent",
    "dependable",
    "salutary",
    "satisfactory",
    "respectable",
    "fortunate",
    "near",
    "skillful",
    "ripe",
    "neat",
    "best",
    "goodness",
    "acceptable",
    "practiced",
    "thoroughly",
    "good-hearted",
    "healthy",
    "kindly",
    "discriminating",
    "groovy",
    "skilful",
    "angelic",
    "soundly",
    "in effect",
    "well-behaved",
    "healthful",
    "sainted",
    "redemptive",
    "corking",
    "saintlike",
    "well behaved",
    "slap-up",
    "cracking",
    "bang-up",
    "unspoiled",
    "in force",
    "openhearted",
    "unspoilt",
    "go-to-meeting",
    "smashing",
    "goody-goody",
    "peachy",
    "goodish",
    "saintly",
    "good enough",
    "angelical",
    "dear",
    "honorable",
    "safe",
    "sunday",
    "sunday-go-to-meeting",
    "superior",
    "good"
  ],
  [
    "tender",
    "exquisite",
    "ethereal",
    "refined",
    "soft",
    "frail",
    "gossamer",
    "dainty",
    "hard",
    "difficult",
    "fine",
    "skilled",
    "sensitive",
    "subtle",
    "fragile",
    "finespun",
    "light-handed",
    "breakable",
    "pastel",
    "ticklish",
    "overdelicate",
    "untoughened",
    "half-hardy",
    "delicate"
  ],
  [
    "benevolent",
    "good",
    "refined",
    "courteous",
    "propitious",
    "elegant",
    "kind",
    "nice",
    "benignant",
    "beneficent",
    "graceful",
    "merciful",
    "urbane",
    "polite",
    "gracious"
  ],
  [
    "monster",
    "large",
    "big",
    "behemoth",
    "goliath",
    "colossus",
    "hulk",
    "whale",
    "heavyweight",
    "jumbo",
    "giant star",
    "elephantine",
    "gargantuan",
    "titan",
    "giant"
  ],
  [
    "vast",
    "immense",
    "large",
    "big",
    "huge"
  ],
  [
    "heavy",
    "large",
    "big",
    "monolithic",
    "solid",
    "monumental",
    "massive"
  ],
  [
    "dull",
    "hoary",
    "achromatic",
    "old",
    "leaden",
    "intermediate",
    "cloudy",
    "grey",
    "colorless",
    "white-haired",
    "grayish",
    "greyish",
    "gray-headed",
    "grayness",
    "greyness",
    "gray-haired",
    "grey-haired",
    "grey-headed",
    "hoar",
    "southern",
    "gray"
  ],
  [
    "chromatic",
    "naive",
    "naif",
    "common",
    "raw",
    "viridity",
    "immature",
    "gullible",
    "new",
    "inexperienced",
    "wet behind the ears",
    "park",
    "fleeceable",
    "commons",
    "greenness",
    "unseasoned",
    "unripe",
    "greens",
    "putting green",
    "uncured",
    "unripened",
    "dark-green",
    "light-green",
    "unaged",
    "colored",
    "green river",
    "greenish",
    "leafy vegetable",
    "green"
  ],
  [
    "one-half",
    "half"
  ],
  [
    "halcyon",
    "content",
    "bright",
    "felicitous",
    "riant",
    "expansive",
    "elysian",
    "joyful",
    "pleased",
    "euphoric",
    "joyous",
    "prosperous",
    "blissful",
    "blessed",
    "golden",
    "glad",
    "fortunate",
    "euphoriant",
    "paradisal",
    "paradisiac",
    "contented",
    "paradisaical",
    "paradisial",
    "paradisiacal",
    "well-chosen",
    "paradisaic",
    "happy"
  ],
  [
    "arduous",
    "shrewd",
    "delicate",
    "vexed",
    "heavy",
    "severe",
    "set",
    "fractious",
    "strong",
    "serious",
    "challenging",
    "stiff",
    "ambitious",
    "rough",
    "difficult",
    "rigorous",
    "horny",
    "rugged",
    "bad",
    "brutal",
    "tough",
    "stubborn",
    "grueling",
    "stale",
    "conniving",
    "firm",
    "harsh",
    "nasty",
    "tumid",
    "effortful",
    "solid",
    "problematic",
    "gruelling",
    "tight",
    "erect",
    "awkward",
    "tricky",
    "hardened",
    "laborious",
    "corneous",
    "cruel",
    "herculean",
    "stony",
    "scheming",
    "baffling",
    "adamantine",
    "troublesome",
    "firmly",
    "thorny",
    "embarrassing",
    "unenviable",
    "knockout",
    "calculating",
    "unkind",
    "trying",
    "heavily",
    "marmoreal",
    "toilsome",
    "sticky",
    "rocky",
    "petrified",
    "petrous",
    "granitic",
    "intemperately",
    "problematical",
    "knotty",
    "catchy",
    "punishing",
    "severely",
    "marmorean",
    "velar",
    "ossified",
    "hard-fought",
    "plosive",
    "hard-boiled",
    "fermented",
    "calculative",
    "ticklish",
    "slaty",
    "soured",
    "case-hardened",
    "labourious",
    "woody",
    "slatey",
    "granitelike",
    "backbreaking",
    "rocklike",
    "hornlike",
    "semihard",
    "stonelike",
    "unpadded",
    "alcoholic",
    "lignified",
    "steely",
    "uphill",
    "hard"
  ],
  [
    "good",
    "sensible",
    "sanguine",
    "hearty",
    "intelligent",
    "fit",
    "ruddy",
    "sound",
    "firm",
    "lusty",
    "reasonable",
    "rubicund",
    "red-blooded",
    "flourishing",
    "levelheaded",
    "blooming",
    "salubrious",
    "thriving",
    "whole",
    "bouncing",
    "flushed",
    "rosy",
    "wholesome",
    "conditioned",
    "growing",
    "full-blooded",
    "able-bodied",
    "rosy-cheeked",
    "well-preserved",
    "good for you",
    "rose-cheeked",
    "able",
    "hale",
    "healthy"
  ],
  [
    "eminent",
    "mellow",
    "sharp",
    "elated",
    "shrill",
    "heavy",
    "great",
    "lofty",
    "exalted",
    "big",
    "favorable",
    "inebriated",
    "malodorous",
    "peak",
    "utmost",
    "intoxicated",
    "tenor",
    "favourable",
    "treble",
    "commanding",
    "last",
    "flood",
    "secondary",
    "steep",
    "piercing",
    "towering",
    "gamy",
    "rising",
    "gamey",
    "advanced",
    "soaring",
    "pinched",
    "piping",
    "dominating",
    "altitudinous",
    "falsetto",
    "screechy",
    "advancing",
    "flooding",
    "high spirits",
    "swollen",
    "overflowing",
    "screaky",
    "upper",
    "high-pitched",
    "altissimo",
    "spiky",
    "adenoidal",
    "squeaky",
    "overlooking",
    "high pressure",
    "climactic",
    "countertenor",
    "high-level",
    "squealing",
    "luxuriously",
    "sopranino",
    "nasal",
    "richly",
    "postgraduate",
    "high school",
    "peaky",
    "senior high school",
    "high up",
    "high gear",
    "squeaking",
    "high-top",
    "high-stepping",
    "highschool",
    "high-stepped",
    "in high spirits",
    "senior high",
    "high-topped",
    "climactical",
    "alto",
    "drunk",
    "heights",
    "soprano",
    "superior",
    "high"
  ],
  [
    "large",
    "big",
    "tumid",
    "unhealthy",
    "puffing",
    "tumescent",
    "huffing",
    "bloated",
    "bouffant",
    "breathing",
    "swollen",
    "distended",
    "puffed",
    "puffy"
  ],
  [
    "vacuous",
    "holler",
    "insincere",
    "reverberant",
    "hole",
    "dig",
    "empty",
    "meaningless",
    "false",
    "excavate",
    "ringing",
    "cavernous",
    "sunken",
    "cannular",
    "fistulous",
    "fistular",
    "deep-set",
    "hollowed",
    "recessed",
    "hollow out",
    "core out",
    "tubular",
    "fistulate",
    "hollow"
  ],
  [
    "sacred",
    "sanctified",
    "hallowed",
    "sanctum",
    "blessed",
    "consecrated",
    "beatified",
    "holy place",
    "holy"
  ],
  [
    "glorious",
    "sacred",
    "elysian",
    "almighty",
    "lord",
    "godhead",
    "inspired",
    "providential",
    "ecclesiastic",
    "cleric",
    "godly",
    "superhuman",
    "churchman",
    "creator",
    "god almighty",
    "godlike",
    "heavenly",
    "jehovah",
    "divine"
  ],
  [
    "eminent",
    "profound",
    "significant",
    "portentous",
    "prodigious",
    "cardinal",
    "crucial",
    "grievous",
    "critical",
    "essential",
    "remarkable",
    "fundamental",
    "pivotal",
    "heavy",
    "noteworthy",
    "great",
    "serious",
    "consequential",
    "operative",
    "valuable",
    "momentous",
    "epochal",
    "key",
    "decisive",
    "distinguished",
    "large",
    "big",
    "useful",
    "weighty",
    "primal",
    "polar",
    "influential",
    "monumental",
    "authoritative",
    "historic",
    "evidentiary",
    "immodest",
    "strategic",
    "evidential",
    "eventful",
    "of import",
    "measurable",
    "earthshaking",
    "world-shaking",
    "epoch-making",
    "world-shattering",
    "most-valuable",
    "of value",
    "alpha",
    "central",
    "copernican",
    "grave",
    "important"
  ],
  [
    "belligerent",
    "truculent",
    "dirty",
    "aggressive",
    "antagonistic",
    "bitter",
    "ill",
    "uncongenial",
    "unfavorable",
    "inimical",
    "opponent",
    "inhospitable",
    "antipathetic",
    "opposing",
    "unfavourable",
    "unfriendly",
    "head-on",
    "at loggerheads",
    "antipathetical",
    "unreconcilable",
    "irreconcilable",
    "hostile"
  ],
  [
    "torrid",
    "fervid",
    "fervent",
    "sultry",
    "good",
    "sexy",
    "close",
    "sensual",
    "warm",
    "skilled",
    "active",
    "fresh",
    "fiery",
    "unpleasant",
    "stifling",
    "sweltering",
    "pungent",
    "scorching",
    "white",
    "fast",
    "violent",
    "sulfurous",
    "live",
    "new",
    "charged",
    "scalding",
    "near",
    "spicy",
    "blistering",
    "igneous",
    "raging",
    "sizzling",
    "sweltry",
    "flaming",
    "sulphurous",
    "tropical",
    "popular",
    "red-hot",
    "het",
    "wanted",
    "lucky",
    "boiling",
    "calefacient",
    "blistery",
    "radioactive",
    "heated",
    "white-hot",
    "calefactory",
    "illegal",
    "peppery",
    "heating",
    "gingery",
    "het up",
    "calorific",
    "calorifacient",
    "calefactive",
    "heated up",
    "baking hot",
    "baking",
    "warming",
    "overheated",
    "heatable",
    "eager",
    "thermal",
    "tropic",
    "hot"
  ],
  [
    "esurient",
    "ravenous",
    "athirst",
    "empty",
    "sharp-set",
    "famished",
    "starved",
    "peckish",
    "thirsty",
    "supperless",
    "empty-bellied",
    "hungry"
  ],
  [
    "dirty",
    "maculate",
    "composite",
    "debased",
    "dingy",
    "muddy",
    "contaminated",
    "defiled",
    "alloyed",
    "adulterate",
    "unclean",
    "untouchable",
    "adulterated",
    "muddied",
    "terefah",
    "polluted",
    "tref",
    "bastardized",
    "unpurified",
    "nonkosher",
    "impure"
  ],
  [
    "conceited",
    "high",
    "proud",
    "tumid",
    "egotistical",
    "unhealthy",
    "puffy",
    "tumescent",
    "self-conceited",
    "expanded",
    "bloated",
    "flooding",
    "distended",
    "overflowing",
    "puffed",
    "egotistic",
    "swollen-headed",
    "in flood",
    "vain",
    "swollen"
  ],
  [
    "keen",
    "sharp",
    "incisive",
    "sensible",
    "bright",
    "clever",
    "rational",
    "sophisticated",
    "trenchant",
    "scintillating",
    "brilliant",
    "nimble",
    "sound",
    "reasonable",
    "prehensile",
    "smart",
    "levelheaded",
    "ready",
    "reasoning",
    "searching",
    "healthy",
    "quick",
    "thinking",
    "brainy",
    "well-informed",
    "smart as a whip",
    "agile",
    "alert",
    "apt",
    "intelligent"
  ],
  [
    "profound",
    "vehement",
    "keen",
    "exquisite",
    "sharp",
    "wild",
    "cold",
    "acute",
    "wicked",
    "severe",
    "fierce",
    "aggravated",
    "vivid",
    "strong",
    "thick",
    "deep",
    "bad",
    "pure",
    "big",
    "unabated",
    "saturated",
    "concentrated",
    "overwhelming",
    "terrible",
    "terrific",
    "violent",
    "consuming",
    "intensive",
    "raging",
    "extreme",
    "tearing",
    "intensified",
    "blood-and-guts",
    "intense"
  ],
  [
    "benevolent",
    "genial",
    "gracious",
    "good",
    "benign",
    "sympathetic",
    "thoughtful",
    "form",
    "benignant",
    "charitable",
    "considerate",
    "hospitable",
    "variety",
    "generous",
    "tolerant",
    "kindhearted",
    "humane",
    "helpful",
    "good-hearted",
    "sort",
    "merciful",
    "kindly",
    "forgiving",
    "openhearted",
    "gentle",
    "kind"
  ],
  [
    "inclination",
    "haggard",
    "deficient",
    "slender",
    "run",
    "tilt",
    "lank",
    "gangly",
    "lanky",
    "thin",
    "trim",
    "incline",
    "emaciated",
    "insufficient",
    "cadaverous",
    "scraggy",
    "spare",
    "scrawny",
    "spindly",
    "tip",
    "wispy",
    "wasted",
    "wiry",
    "tend",
    "pinched",
    "withered",
    "wizened",
    "angle",
    "wizen",
    "skeletal",
    "weedy",
    "gangling",
    "bony",
    "leaning",
    "spindle-shanked",
    "wisplike",
    "stringy",
    "skimpy",
    "rawboned",
    "anorexic",
    "anorectic",
    "shriveled",
    "underweight",
    "wasp-waisted",
    "shrunken",
    "twiggy",
    "shrivelled",
    "hollow-eyed",
    "scarecrowish",
    "twiglike",
    "unprofitable",
    "spindle-legged",
    "deep-eyed",
    "slender-waisted",
    "slim-waisted",
    "sunken-eyed",
    "gaunt",
    "list",
    "reedy",
    "skinny",
    "slight",
    "slim",
    "lean"
  ],
  [
    "ofweightlight"
  ],
  [
    "poignant",
    "tender",
    "harrowing",
    "atrocious",
    "dreadful",
    "bad",
    "agonizing",
    "sensitive",
    "awful",
    "unpleasant",
    "sore",
    "excruciating",
    "bitter",
    "abominable",
    "terrible",
    "prickling",
    "burning",
    "torturous",
    "uncomfortable",
    "irritating",
    "agonized",
    "smarting",
    "unspeakable",
    "tingling",
    "afflictive",
    "chafed",
    "traumatic",
    "achy",
    "torturing",
    "biting",
    "stinging",
    "wrenching",
    "torturesome",
    "racking",
    "aching",
    "galled",
    "saddle-sore",
    "painful"
  ],
  [
    "tenacious",
    "perennial",
    "languish",
    "abundant",
    "prolonged",
    "protracted",
    "ache",
    "lank",
    "provident",
    "interminable",
    "eternal",
    "extended",
    "pine",
    "elongated",
    "yearn",
    "retentive",
    "sesquipedalian",
    "lasting",
    "durable",
    "drawn-out",
    "endless",
    "lengthy",
    "stressed",
    "unsound",
    "overnight",
    "tall",
    "oblong",
    "lifelong",
    "long-lasting",
    "longitudinal",
    "elongate",
    "hanker",
    "foresighted",
    "agelong",
    "long-term",
    "long-lived",
    "bimestrial",
    "nightlong",
    "longstanding",
    "farsighted",
    "longer",
    "longish",
    "polysyllabic",
    "long-range",
    "yearlong",
    "foresightful",
    "lengthened",
    "semipermanent",
    "longsighted",
    "extendible",
    "farseeing",
    "long-distance",
    "daylong",
    "extendable",
    "long-acting",
    "long-dated",
    "womb-to-tomb",
    "far",
    "long-run",
    "longest",
    "yen",
    "long"
  ],
  [
    "wanton",
    "light",
    "free",
    "slack",
    "coarse",
    "open",
    "easy",
    "release",
    "sluttish",
    "promiscuous",
    "regular",
    "informal",
    "insecure",
    "relax",
    "liberate",
    "shifting",
    "unbound",
    "unchaste",
    "friable",
    "irresponsible",
    "uncontrolled",
    "unleash",
    "inexact",
    "flyaway",
    "let loose",
    "unofficial",
    "escaped",
    "silty",
    "unfirm",
    "loosen",
    "baggy",
    "unloose",
    "at liberty",
    "unaffixed",
    "at large",
    "on the loose",
    "loose-fitting",
    "phlegmy",
    "unconsolidated",
    "unpackaged",
    "unconstipated",
    "idle",
    "lax",
    "liberal",
    "sandy",
    "loose"
  ],
  [
    "modest",
    "balmy",
    "moderate",
    "humble",
    "temperate",
    "mild-mannered",
    "clement",
    "gentle",
    "meek",
    "mild"
  ],
  [
    "wanton",
    "facile",
    "light",
    "soft",
    "abundant",
    "rich",
    "lenient",
    "leisurely",
    "casual",
    "tardily",
    "easygoing",
    "simple",
    "comfortable",
    "prosperous",
    "uncomplicated",
    "sluttish",
    "promiscuous",
    "smooth",
    "pleasing",
    "loose",
    "elementary",
    "slow",
    "cushy",
    "gradual",
    "unhurried",
    "available",
    "slowly",
    "unchaste",
    "simplified",
    "effortless",
    "comfy",
    "easily",
    "at ease",
    "undemanding",
    "well-fixed",
    "well-heeled",
    "well-off",
    "well-to-do",
    "painless",
    "unproblematic",
    "hands-down",
    "well-situated",
    "gentle",
    "easy"
  ],
  [
    "weird",
    "eldritch",
    "supernatural",
    "unco",
    "unearthly",
    "unnatural",
    "uncanny"
  ],
  [
    "conventional",
    "direct",
    "guileless",
    "right",
    "reliable",
    "true",
    "flat",
    "square",
    "even",
    "erect",
    "upright",
    "dependable",
    "consecutive",
    "straightforward",
    "correct",
    "aligned",
    "neat",
    "honest",
    "tidy",
    "transparent",
    "continuous",
    "accurate",
    "undiluted",
    "heterosexual",
    "straightaway",
    "uninterrupted",
    "directly",
    "vertical",
    "unbowed",
    "aboveboard",
    "unwound",
    "trabeated",
    "unbent",
    "trabeate",
    "uncoiled",
    "untwisted",
    "uncurled",
    "full-strength",
    "uncurved",
    "straight person",
    "unpermed",
    "heterosexual person",
    "uncurving",
    "honorable",
    "straight"
  ],
  [
    "wet",
    "damp",
    "dampish",
    "moist"
  ],
  [
    "overt",
    "bare",
    "open",
    "raw",
    "nude",
    "defenseless",
    "unclothed",
    "unprotected",
    "au naturel",
    "unaided",
    "unassisted",
    "naked"
  ],
  [
    "slender",
    "dogmatic",
    "petty",
    "contract",
    "marginal",
    "little",
    "thin",
    "small",
    "careful",
    "minute",
    "specify",
    "constrict",
    "intolerant",
    "limited",
    "tapered",
    "constrictive",
    "opinionated",
    "narrow-minded",
    "constringe",
    "nail down",
    "illiberal",
    "narrowed",
    "pin down",
    "narrow down",
    "closed-minded",
    "tapering",
    "narrowing",
    "small-minded",
    "constricting",
    "close-minded",
    "dogmatical",
    "specialize",
    "self-opinionated",
    "peg down",
    "opinionative",
    "strait",
    "narrow"
  ],
  [
    "good",
    "close",
    "warm",
    "approach",
    "hot",
    "adjacent",
    "unreal",
    "artificial",
    "virtually",
    "about",
    "stingy",
    "ungenerous",
    "well-nigh",
    "nearly",
    "all but",
    "just about",
    "almost",
    "nearer",
    "draw near",
    "neighbor",
    "come on",
    "come near",
    "approximate",
    "most",
    "nearby",
    "neighbour",
    "go up",
    "closer",
    "cheeseparing",
    "penny-pinching",
    "nearest",
    "nighest",
    "dear",
    "nigh",
    "near"
  ],
  [
    "radical",
    "novel",
    "hot",
    "parvenu",
    "raw",
    "original",
    "fresh",
    "unprecedented",
    "newfound",
    "modern",
    "inexperienced",
    "wet behind the ears",
    "virgin",
    "rising",
    "baby",
    "newfangled",
    "recently",
    "early",
    "refreshing",
    "red-hot",
    "spick-and-span",
    "late",
    "young",
    "untried",
    "newly",
    "unaccustomed",
    "brand-new",
    "unexampled",
    "untested",
    "freshly",
    "bran-new",
    "spic-and-span",
    "parvenue",
    "unused",
    "unworn",
    "new to",
    "newly arisen",
    "green",
    "newborn",
    "recent",
    "revolutionary",
    "new"
  ],
  [
    "blue",
    "magnanimous",
    "impressive",
    "lofty",
    "exalted",
    "stately",
    "regal",
    "lord",
    "imposing",
    "solid",
    "majestic",
    "rarefied",
    "grand",
    "blue-blooded",
    "purple",
    "rarified",
    "highborn",
    "royal",
    "baronial",
    "high-minded",
    "upstanding",
    "idealistic",
    "aristocratic",
    "aristocratical",
    "nobleman",
    "unreactive",
    "ennobling",
    "kingly",
    "high-flown",
    "princely",
    "titled",
    "monarchical",
    "monarchal",
    "coroneted",
    "greathearted",
    "queenly",
    "dignifying",
    "queenlike",
    "noble-minded",
    "kinglike",
    "august",
    "gentle",
    "honorable",
    "honourable",
    "imperial",
    "lordly",
    "patrician",
    "worthy",
    "noble"
  ],
  [
    "convention",
    "natural",
    "regular",
    "typical",
    "pattern",
    "rule",
    "average",
    "perpendicular",
    "formula",
    "normal"
  ],
  [
    "wholesome",
    "alimentation",
    "nutrient",
    "feeding",
    "alimentary",
    "nutritive",
    "nutritious",
    "nourishing"
  ],
  [
    "conspicuous",
    "salient",
    "manifest",
    "flagrant",
    "tangible",
    "egregious",
    "prominent",
    "overt",
    "axiomatic",
    "plain",
    "evident",
    "palpable",
    "apparent",
    "open",
    "bold",
    "large",
    "big",
    "outstanding",
    "rank",
    "striking",
    "perceptible",
    "spectacular",
    "gross",
    "glaring",
    "patent",
    "transparent",
    "marked",
    "self-explanatory",
    "eye-catching",
    "visible",
    "self-evident",
    "featured",
    "writ large",
    "demonstrable",
    "exhibitionistic",
    "provable",
    "in evidence",
    "attention-getting",
    "under your nose",
    "frank",
    "under her nose",
    "under his nose",
    "under my nose",
    "under our noses",
    "obvious"
  ],
  [
    "cold",
    "archaic",
    "hoary",
    "antiquated",
    "antique",
    "stale",
    "antediluvian",
    "senile",
    "ancient",
    "experienced",
    "senescent",
    "sexagenarian",
    "emeritus",
    "gaga",
    "previous",
    "anile",
    "grey",
    "past",
    "early",
    "doddering",
    "elderly",
    "centenarian",
    "superannuated",
    "age-old",
    "aging",
    "sunset",
    "rusty",
    "octogenarian",
    "nonagenarian",
    "hand-me-down",
    "secondhand",
    "unoriginal",
    "doddery",
    "aged",
    "used",
    "overage",
    "honest-to-goodness",
    "oldish",
    "moth-eaten",
    "white-haired",
    "overaged",
    "retired",
    "middle-aged",
    "patched",
    "older",
    "darkened",
    "gray-headed",
    "sure-enough",
    "ageing",
    "yellowed",
    "long-ago",
    "gray-haired",
    "grey-haired",
    "grey-headed",
    "hand-down",
    "auld",
    "gray",
    "hoar",
    "honest-to-god",
    "senior",
    "venerable",
    "yellow",
    "old"
  ],
  [
    "strange",
    "unusual",
    "different",
    "additional",
    "extra",
    "opposite",
    "former",
    "early",
    "remaining",
    "other than",
    "some other",
    "else",
    "other"
  ],
  [
    "soft",
    "cushiony",
    "cushioned",
    "padded"
  ],
  [
    "pallid",
    "light",
    "weak",
    "thin",
    "blench",
    "picket",
    "colorless",
    "colourless",
    "blanch",
    "wan",
    "pale"
  ],
  [
    "contaminated",
    "impure",
    "polluted"
  ],
  [
    "potent",
    "cogent",
    "puissant",
    "compelling",
    "brawny",
    "strong",
    "right",
    "almighty",
    "regnant",
    "herculean",
    "coercive",
    "influential",
    "muscular",
    "mighty",
    "reigning",
    "ruling",
    "superhuman",
    "powered",
    "all-powerful",
    "knock-down",
    "hefty",
    "omnipotent",
    "powerful"
  ],
  [
    "virtuous",
    "stark",
    "light",
    "intense",
    "refined",
    "clear",
    "vivid",
    "plain",
    "fine",
    "consummate",
    "complete",
    "everlasting",
    "harmonious",
    "simple",
    "fresh",
    "chaste",
    "pristine",
    "saturated",
    "perfect",
    "white",
    "immaculate",
    "clean",
    "theoretical",
    "sublimate",
    "gross",
    "vestal",
    "virgin",
    "unadulterated",
    "undiluted",
    "undefiled",
    "native",
    "virginal",
    "thoroughgoing",
    "sodding",
    "axenic",
    "double-dyed",
    "purified",
    "unclouded",
    "uncontaminated",
    "unalloyed",
    "unmixed",
    "unmingled",
    "unpolluted",
    "absolute",
    "arrant",
    "sheer",
    "staring",
    "utter",
    "pure"
  ],
  [
    "unhappiness",
    "sorrowfulness",
    "sorrow",
    "sadness"
  ],
  [
    "repose",
    "subdued",
    "tranquil",
    "soft",
    "quiescent",
    "lull",
    "tranquility",
    "restrained",
    "muted",
    "calm",
    "unpretentious",
    "dreamy",
    "hushed",
    "placidity",
    "hush",
    "unruffled",
    "quiesce",
    "stilly",
    "reposeful",
    "quieten",
    "silence",
    "silent",
    "quietly",
    "slumbrous",
    "untroubled",
    "soundless",
    "tranquillize",
    "tranquilize",
    "slumberous",
    "relaxing",
    "unostentatious",
    "noiseless",
    "uneventful",
    "catlike",
    "pipe down",
    "calm down",
    "quiet down",
    "placid",
    "restful",
    "serenity",
    "still",
    "tiptoe",
    "tranquillity",
    "quiet"
  ],
  [
    "crude",
    "bleak",
    "cold",
    "overt",
    "open",
    "buff",
    "natural",
    "sore",
    "naked",
    "rare",
    "new",
    "in the raw",
    "inexperienced",
    "wet behind the ears",
    "unhealthy",
    "cutting",
    "injured",
    "rude",
    "altogether",
    "unjust",
    "half-baked",
    "unfair",
    "peeled",
    "unclothed",
    "unpolished",
    "stark naked",
    "underdone",
    "birthday suit",
    "naked as a jaybird",
    "untreated",
    "in the buff",
    "uncooked",
    "in the altogether",
    "bare-assed",
    "unanalyzed",
    "bare-ass",
    "unsanded",
    "untoasted",
    "green",
    "raw"
  ],
  [
    "prompt",
    "set",
    "intelligent",
    "set up",
    "make",
    "prepare",
    "in order",
    "fix",
    "prepared",
    "quick",
    "willing",
    "gear up",
    "waiting",
    "cook",
    "ready"
  ],
  [
    "substantial",
    "tangible",
    "serious",
    "veridical",
    "true",
    "concrete",
    "genuine",
    "rattling",
    "existent",
    "realistic",
    "material",
    "actual",
    "really",
    "factual",
    "very",
    "historical",
    "literal",
    "real number",
    "real"
  ],
  [
    "robust",
    "ample",
    "lush",
    "gilded",
    "flush",
    "lavish",
    "copious",
    "opulent",
    "fancy",
    "abundant",
    "affluent",
    "valuable",
    "deep",
    "full",
    "easy",
    "comfortable",
    "prosperous",
    "sumptuous",
    "plush",
    "tasteful",
    "loaded",
    "luxurious",
    "productive",
    "fat",
    "fruitful",
    "plenteous",
    "plentiful",
    "deluxe",
    "colorful",
    "princely",
    "plushy",
    "combustible",
    "well-fixed",
    "moneyed",
    "well-heeled",
    "well-off",
    "well-to-do",
    "colourful",
    "full-bodied",
    "well-situated",
    "fertile",
    "lucullan",
    "wealthy",
    "rich"
  ],
  [
    "corresponding",
    "like",
    "equivalent",
    "comparable",
    "self",
    "duplicate",
    "indistinguishable",
    "identical",
    "assonant",
    "equal",
    "synoptical",
    "synoptic",
    "same"
  ],
  [
    "good",
    "powerful",
    "proper",
    "suitable",
    "appropriate",
    "moral",
    "precise",
    "decent",
    "exact",
    "opportune",
    "satisfactory",
    "flop",
    "mighty",
    "correct",
    "redress",
    "ripe",
    "compensate",
    "straight",
    "ethical",
    "accurate",
    "reactionary",
    "perpendicular",
    "properly",
    "aright",
    "right-minded",
    "justly",
    "starboard",
    "correctly",
    "letter-perfect",
    "right-hand",
    "right on",
    "rightfulness",
    "word-perfect",
    "right hand",
    "right wing",
    "rightist",
    "decently",
    "reactionist",
    "right-wing",
    "rightish",
    "far-right",
    "rightfield",
    "in good order",
    "conservative",
    "far",
    "honorable",
    "honourable",
    "the right way",
    "right"
  ],
  [
    "crude",
    "boisterous",
    "abrasive",
    "scabrous",
    "fierce",
    "hard",
    "difficult",
    "rugged",
    "aggressive",
    "grating",
    "draft",
    "outline",
    "pugnacious",
    "jarring",
    "harsh",
    "gravelly",
    "raspy",
    "craggy",
    "pique",
    "rasping",
    "cacophonous",
    "cacophonic",
    "lacerate",
    "erose",
    "broken",
    "cracked",
    "gravel",
    "jagged",
    "shagged",
    "crushed",
    "jolting",
    "rugose",
    "fringed",
    "serrulate",
    "serrated",
    "imbricate",
    "rocky",
    "serrate",
    "chapped",
    "roughly",
    "corded",
    "pockmarked",
    "ribbed",
    "inexact",
    "cragged",
    "nubbly",
    "mountainous",
    "imbricated",
    "approximate",
    "scaly",
    "bullate",
    "bumpy",
    "fimbriate",
    "notched",
    "pocked",
    "potholed",
    "dentate",
    "pectinate",
    "emarginate",
    "lined",
    "scratchy",
    "bidentate",
    "scurfy",
    "angulate",
    "scalloped",
    "lepidote",
    "jolty",
    "crenate",
    "crenulate",
    "scabby",
    "hilly",
    "ciliate",
    "seamed",
    "costate",
    "ciliated",
    "jaggy",
    "approximative",
    "leprose",
    "saw-toothed",
    "nubby",
    "bouldery",
    "crenulated",
    "puckered",
    "rough in",
    "alligatored",
    "denticulate",
    "runcinate",
    "barky",
    "biserrate",
    "crispate",
    "roughish",
    "rough out",
    "roughened",
    "sandpapery",
    "bouldered",
    "rough-textured",
    "lacinate",
    "rough"
  ],
  [
    "crude",
    "primitive",
    "raw",
    "natural",
    "unrefined",
    "early",
    "ill-mannered",
    "impolite",
    "uncivil",
    "lowbred",
    "unmannered",
    "yokelish",
    "underbred",
    "bounderish",
    "ill-bred",
    "unmannerly",
    "rude"
  ],
  [
    "frightened",
    "scared"
  ],
  [
    "shrewd",
    "keen",
    "acerbic",
    "astute",
    "intense",
    "perceptive",
    "distinct",
    "incisive",
    "acute",
    "shrill",
    "crisp",
    "tart",
    "intelligent",
    "high",
    "acuate",
    "unpleasant",
    "acerb",
    "precipitous",
    "abrupt",
    "sour",
    "pointed",
    "smart",
    "forceful",
    "steep",
    "sudden",
    "sharply",
    "piercing",
    "stabbing",
    "astringent",
    "cutting",
    "penetrating",
    "discriminating",
    "salt",
    "edged",
    "penetrative",
    "knifelike",
    "scratching",
    "carnassial",
    "sharpened",
    "high-pitched",
    "fulgurating",
    "sharp-worded",
    "sharp"
  ],
  [
    "lean",
    "poop",
    "thin",
    "scraggy",
    "scrawny",
    "weedy",
    "low-down",
    "dope",
    "underweight",
    "skinny"
  ],
  [
    "lubricious",
    "slick",
    "tricky",
    "slithery",
    "slipping",
    "sliding",
    "untrustworthy",
    "slimy",
    "slippy",
    "slimed",
    "slithering",
    "untrusty",
    "nonstick",
    "slippery"
  ],
  [
    "dull",
    "obtuse",
    "slack",
    "dim",
    "tedious",
    "laggard",
    "dense",
    "irksome",
    "tardily",
    "stupid",
    "easy",
    "sluggish",
    "retard",
    "dilatory",
    "wearisome",
    "drawn-out",
    "dumb",
    "inactive",
    "behind",
    "andante",
    "tiresome",
    "slowly",
    "larghissimo",
    "decelerate",
    "uninteresting",
    "lazy",
    "slacken",
    "ho-hum",
    "deadening",
    "dawdling",
    "slow down",
    "pokey",
    "crawling",
    "poky",
    "drawling",
    "slow up",
    "dragging",
    "larghetto",
    "lentissimo",
    "slow-moving",
    "moderato",
    "bumper-to-bumper",
    "long-playing",
    "long-play",
    "adagio",
    "boring",
    "largo",
    "lento",
    "slow"
  ],
  [
    "mean",
    "diminutive",
    "modest",
    "soft",
    "moderate",
    "fine",
    "bantam",
    "slender",
    "insignificant",
    "puny",
    "inferior",
    "petty",
    "low",
    "diminished",
    "little",
    "humble",
    "infinitesimal",
    "lowly",
    "miserly",
    "tight",
    "immature",
    "minor",
    "minute",
    "minuscule",
    "elfin",
    "narrow",
    "belittled",
    "stingy",
    "runty",
    "bittie",
    "limited",
    "ungenerous",
    "midget",
    "mingy",
    "miniature",
    "reduced",
    "dinky",
    "miniscule",
    "atomic",
    "narrow-minded",
    "micro",
    "young",
    "weeny",
    "elflike",
    "teeny",
    "bitty",
    "teensy",
    "wee",
    "dwarfish",
    "decreased",
    "microscopic",
    "lesser",
    "small-minded",
    "smaller",
    "undersize",
    "gnomish",
    "subgross",
    "peanut",
    "subatomic",
    "undersized",
    "lowercase",
    "small-scale",
    "shrimpy",
    "teensy-weensy",
    "least",
    "smallish",
    "microscopical",
    "littlest",
    "smallest",
    "weensy",
    "half-size",
    "teentsy",
    "atomlike",
    "dwarf",
    "lilliputian",
    "littler",
    "petite",
    "slim",
    "tiny",
    "small"
  ],
  [
    "sleek",
    "suave",
    "undulate",
    "easy",
    "velvety",
    "fast",
    "slick",
    "fluent",
    "diplomatic",
    "velvet",
    "shine",
    "sinuate",
    "fluid",
    "politic",
    "graceful",
    "silken",
    "polish",
    "glassy",
    "silky",
    "glossy",
    "flowing",
    "marmoreal",
    "entire",
    "ceraceous",
    "seamless",
    "marmorean",
    "legato",
    "liquid",
    "satiny",
    "repand",
    "smoothen",
    "uncrannied",
    "hairless",
    "unseamed",
    "untoothed",
    "waxy",
    "unlined",
    "silklike",
    "smooth out",
    "unfurrowed",
    "creaseless",
    "waxlike",
    "diplomatical",
    "unwrinkled",
    "uncreased",
    "unnotched",
    "smooth"
  ],
  [
    "tender",
    "delicate",
    "mellow",
    "subdued",
    "light",
    "dull",
    "compliant",
    "emollient",
    "indulgent",
    "lenient",
    "muted",
    "murmuring",
    "flaccid",
    "weak",
    "easy",
    "low",
    "demulcent",
    "velvety",
    "hushed",
    "little",
    "quiet",
    "small",
    "permissive",
    "muffled",
    "velvet",
    "cushy",
    "euphonious",
    "sibilant",
    "effeminate",
    "brushed",
    "flocculent",
    "soft-spoken",
    "susurrant",
    "soughing",
    "downy",
    "pampered",
    "piano",
    "woolly",
    "flabby",
    "spirant",
    "murmurous",
    "mellowing",
    "coddled",
    "squishy",
    "softened",
    "susurrous",
    "fricative",
    "palatal",
    "rustling",
    "fluffy",
    "wooly",
    "cushiony",
    "mushy",
    "fleecy",
    "spoiled",
    "compressible",
    "diffused",
    "liquid",
    "spongy",
    "squashy",
    "flossy",
    "pianissimo",
    "softening",
    "squeezable",
    "untoughened",
    "downlike",
    "whispering",
    "padded",
    "cottony",
    "napped",
    "overstuffed",
    "salving",
    "palatalized",
    "cushioned",
    "softish",
    "nonalcoholic",
    "semisoft",
    "low-toned",
    "soft-footed",
    "cheeselike",
    "pianissimo assai",
    "gentle",
    "lax",
    "yielding",
    "soft"
  ],
  [
    "sullen",
    "dour",
    "morose",
    "sharp",
    "acerbic",
    "dark",
    "tart",
    "glum",
    "malodorous",
    "acerb",
    "glowering",
    "turn",
    "moody",
    "tasteful",
    "false",
    "astringent",
    "ill-natured",
    "acidulous",
    "tangy",
    "off",
    "rancid",
    "ferment",
    "acetous",
    "turned",
    "acidulent",
    "acidify",
    "acidity",
    "acidic",
    "vinegary",
    "acidulate",
    "off-key",
    "soured",
    "lemony",
    "unharmonious",
    "acetify",
    "sourness",
    "subacid",
    "tartness",
    "acetose",
    "sourish",
    "inharmonious",
    "acidulated",
    "lemonlike",
    "saturnine",
    "sour"
  ],
  [
    "bad",
    "corrupt",
    "putrid",
    "lousy",
    "putrescent",
    "tainted",
    "moldering",
    "unsound",
    "crappy",
    "decayed",
    "mouldering",
    "icky",
    "putrefied",
    "stinking",
    "rotted",
    "rotting",
    "stinky",
    "mouldered",
    "putrified",
    "decomposed",
    "decomposing",
    "moldered",
    "rotten"
  ],
  [
    "offset",
    "initiate",
    "part",
    "jump",
    "commence",
    "startle",
    "commencement",
    "get",
    "depart",
    "begin",
    "first",
    "beginning",
    "outset",
    "set off",
    "kickoff",
    "set about",
    "originate",
    "set out",
    "set forth",
    "starting",
    "take off",
    "take up",
    "get going",
    "embark on",
    "start up",
    "start out",
    "go",
    "lead off",
    "starting line",
    "starting time",
    "starting signal",
    "head start",
    "start"
  ],
  [
    "dotted",
    "stippled",
    "patterned",
    "flecked",
    "specked",
    "speckled"
  ],
  [
    "austere",
    "desolate",
    "crude",
    "bleak",
    "severe",
    "blunt",
    "plain",
    "bare",
    "consummate",
    "complete",
    "barren",
    "pure",
    "everlasting",
    "perfect",
    "gross",
    "immoderate",
    "inhospitable",
    "thoroughgoing",
    "sodding",
    "double-dyed",
    "arrant",
    "staring",
    "utter",
    "stark"
  ],
  [
    "bad",
    "lousy",
    "rotten",
    "crappy",
    "icky",
    "stinking",
    "stinky"
  ],
  [
    "robust",
    "vehement",
    "substantial",
    "potent",
    "intense",
    "heavy",
    "severe",
    "virile",
    "warm",
    "brawny",
    "powerful",
    "secure",
    "stiff",
    "hard",
    "inviolable",
    "sound",
    "firm",
    "fresh",
    "effectual",
    "solid",
    "impregnable",
    "irregular",
    "unassailable",
    "forceful",
    "muscular",
    "equipotent",
    "noticeable",
    "invulnerable",
    "stressed",
    "reinforced",
    "knockout",
    "strengthened",
    "accented",
    "well-knit",
    "bullocky",
    "unattackable",
    "well-set",
    "ironlike",
    "hobnail",
    "hobnailed",
    "bullnecked",
    "beefed-up",
    "alcoholic",
    "hefty",
    "strong"
  ],
  [
    "good",
    "proper",
    "right",
    "fit",
    "appropriate",
    "desirable",
    "eligible",
    "suited",
    "worthy",
    "suitable"
  ],
  [
    "candid",
    "crude",
    "stark",
    "dull",
    "forthright",
    "direct",
    "pointless",
    "numb",
    "outspoken",
    "benumb",
    "unconditional",
    "deaden",
    "point-blank",
    "plainspoken",
    "free-spoken",
    "unpointed",
    "frank",
    "blunt"
  ],
  [
    "secure",
    "reliable",
    "true",
    "steady",
    "certainly",
    "careful",
    "dependable",
    "doomed",
    "indisputable",
    "surely",
    "trustworthy",
    "destined",
    "trusty",
    "foreordained",
    "predestinate",
    "fated",
    "sure enough",
    "sure as shooting",
    "trusted",
    "for sure",
    "for certain",
    "certain",
    "predestined",
    "sure"
  ],
  [
    "marvelous",
    "stately",
    "grandiloquent",
    "gangly",
    "lanky",
    "rangy",
    "statuesque",
    "long",
    "rhetorical",
    "improbable",
    "magniloquent",
    "marvellous",
    "gangling",
    "leggy",
    "long-legged",
    "full-length",
    "tallish",
    "tall-growing",
    "long-shanked",
    "tall"
  ],
  [
    "dainty",
    "tasteful",
    "appetizing",
    "savoury",
    "mouth-watering",
    "savory",
    "tasty"
  ],
  [
    "athirst",
    "dry",
    "hungry",
    "absorbent",
    "absorptive",
    "thirsty"
  ],
  [
    "intense",
    "heavy",
    "broad",
    "abundant",
    "dense",
    "deep",
    "compact",
    "stupid",
    "stocky",
    "viscous",
    "concentrated",
    "unintelligible",
    "chummy",
    "syrupy",
    "fat",
    "coagulate",
    "midst",
    "impenetrable",
    "clotted",
    "coagulated",
    "heavyset",
    "wide",
    "grumous",
    "loggerheaded",
    "stringy",
    "thready",
    "slurred",
    "thick-skulled",
    "boneheaded",
    "gelatinous",
    "thickset",
    "ropy",
    "clogged",
    "grumose",
    "curdled",
    "soupy",
    "thickly",
    "ropey",
    "blockheaded",
    "thickened",
    "fatheaded",
    "wooden-headed",
    "creamy",
    "two-ply",
    "quilted",
    "three-ply",
    "coagulable",
    "thickheaded",
    "jellylike",
    "four-ply",
    "gelatinlike",
    "thick"
  ],
  [
    "light",
    "tenuous",
    "haggard",
    "gossamer",
    "lean",
    "diaphanous",
    "fine",
    "slender",
    "sleazy",
    "weak",
    "sparse",
    "flimsy",
    "flat",
    "reduce",
    "lank",
    "gangly",
    "vaporous",
    "lanky",
    "trim",
    "emaciated",
    "cadaverous",
    "scraggy",
    "rare",
    "spare",
    "narrow",
    "scrawny",
    "rarefied",
    "spindly",
    "cut",
    "pale",
    "wispy",
    "transparent",
    "rarified",
    "wasted",
    "wiry",
    "chiffon",
    "gauzy",
    "pinched",
    "withered",
    "wizened",
    "dilute",
    "wizen",
    "skeletal",
    "weedy",
    "spiritless",
    "depressed",
    "distributed",
    "gangling",
    "bony",
    "compressed",
    "spindle-shanked",
    "wisplike",
    "stringy",
    "filmy",
    "thready",
    "rawboned",
    "capillary",
    "anorexic",
    "see-through",
    "anorectic",
    "bladed",
    "shriveled",
    "underweight",
    "filamentous",
    "slenderize",
    "hyperfine",
    "wasp-waisted",
    "shrunken",
    "papery",
    "thinly",
    "twiggy",
    "shrivelled",
    "cobwebby",
    "hollow-eyed",
    "ribbony",
    "threadlike",
    "ribbonlike",
    "scarecrowish",
    "twiglike",
    "filamentlike",
    "lose weight",
    "slim down",
    "spindle-legged",
    "hairlike",
    "thin out",
    "deep-eyed",
    "melt off",
    "slender-waisted",
    "slim-waisted",
    "sunken-eyed",
    "gaunt",
    "reedy",
    "sheer",
    "skinny",
    "slight",
    "slim",
    "thin"
  ],
  [
    "banal",
    "bleary",
    "haggard",
    "weary",
    "trite",
    "stock",
    "jaded",
    "exhausted",
    "raddled",
    "ragged",
    "hackneyed",
    "fatigued",
    "drawn",
    "aweary",
    "blear",
    "threadbare",
    "commonplace",
    "washed-out",
    "careworn",
    "timeworn",
    "flagging",
    "bleary-eyed",
    "wearied",
    "worn",
    "fagged",
    "spent",
    "bored",
    "well-worn",
    "whacked",
    "shopworn",
    "played out",
    "world-weary",
    "unoriginal",
    "drooping",
    "footsore",
    "burnt-out",
    "unrefreshed",
    "burned-out",
    "blear-eyed",
    "unrested",
    "travel-worn",
    "tired"
  ],
  [
    "hard",
    "difficult",
    "rugged",
    "bad",
    "pugnacious",
    "goon",
    "punk",
    "bully",
    "hardened",
    "violent",
    "ruffian",
    "hoodlum",
    "sinewy",
    "uncomfortable",
    "rowdy",
    "hooligan",
    "yobbo",
    "inured",
    "hood",
    "gristly",
    "roughneck",
    "calloused",
    "toughie",
    "coriaceous",
    "stringy",
    "ruffianly",
    "fibrous",
    "yob",
    "hard-boiled",
    "tough-minded",
    "toughened",
    "chewy",
    "hard-bitten",
    "cartilaginous",
    "rubbery",
    "weather-beaten",
    "hempen",
    "thickened",
    "enured",
    "unsentimental",
    "leathery",
    "leathered",
    "street fighter",
    "leatherlike",
    "unchewable",
    "sturdy",
    "thug",
    "yobo",
    "tough"
  ],
  [
    "veracious",
    "reliable",
    "harmonious",
    "constant",
    "even",
    "typical",
    "fast",
    "genuine",
    "sure",
    "dependable",
    "honest",
    "apodeictic",
    "actual",
    "apodictic",
    "real",
    "straight",
    "faithful",
    "factual",
    "accurate",
    "truthful",
    "avowedly",
    "literal",
    "confessedly",
    "lawful",
    "admittedly",
    "rightful",
    "unfeigned",
    "on-key",
    "true to",
    "true up",
    "dead on target",
    "loyal",
    "true"
  ],
  [
    "sallow",
    "bad",
    "raw",
    "infirm",
    "mental",
    "morbid",
    "tumid",
    "sore",
    "mortified",
    "debilitated",
    "angry",
    "jaundiced",
    "sickly",
    "seedy",
    "enfeebled",
    "puffy",
    "tumescent",
    "unsound",
    "unfit",
    "insalubrious",
    "bloated",
    "foamy",
    "inflamed",
    "wheezing",
    "pathological",
    "inflammatory",
    "gangrenous",
    "creaky",
    "dehydrated",
    "cankerous",
    "blistery",
    "enlarged",
    "swollen",
    "asthmatic",
    "bloodshot",
    "carious",
    "distended",
    "chilblained",
    "rheumatic",
    "unwholesome",
    "unhealthful",
    "diseased",
    "gassy",
    "pathologic",
    "frothing",
    "blebby",
    "flatulent",
    "membranous",
    "foaming",
    "ulcerous",
    "arthritic",
    "puffed",
    "colicky",
    "wheezy",
    "carbuncled",
    "varicose",
    "caseous",
    "ingrowing",
    "ulcerated",
    "ingrown",
    "sunburned",
    "rheumatoid",
    "carbuncular",
    "edematous",
    "dropsical",
    "sunburnt",
    "sore-eyed",
    "membrane-forming",
    "yellow",
    "unhealthy"
  ],
  [
    "dour",
    "grim",
    "sharp",
    "acerbic",
    "caustic",
    "virulent",
    "acrid",
    "vitriolic",
    "dreadful",
    "hot",
    "rough",
    "tart",
    "forbidding",
    "harsh",
    "awful",
    "nasty",
    "venomous",
    "acerb",
    "sore",
    "bitter",
    "mortifying",
    "sulfurous",
    "offensive",
    "painful",
    "blistering",
    "obnoxious",
    "unhappy",
    "repellent",
    "embarrassing",
    "repellant",
    "rebarbative",
    "hellish",
    "beastly",
    "sulphurous",
    "afflictive",
    "acid",
    "objectionable",
    "ungrateful",
    "unlovely",
    "sharp-worded",
    "unpleasant"
  ],
  [
    "important",
    "valuable",
    "practical",
    "functional",
    "utilitarian",
    "helpful",
    "utile",
    "utilizable",
    "of import",
    "serviceable",
    "usable",
    "recyclable",
    "useable",
    "multipurpose",
    "reclaimable",
    "reusable",
    "of value",
    "useful"
  ],
  [
    "peculiar",
    "grotesque",
    "eerie",
    "quaint",
    "strange",
    "unique",
    "antic",
    "curious",
    "queer",
    "different",
    "weird",
    "exotic",
    "singular",
    "freaky",
    "fantastic",
    "fantastical",
    "rummy",
    "uncommon",
    "crazy",
    "other",
    "funny",
    "eery",
    "odd",
    "rum",
    "gothic",
    "unaccustomed",
    "out-of-the-way",
    "unusual"
  ],
  [
    "lurid",
    "vehement",
    "intense",
    "wild",
    "fierce",
    "hot",
    "ferocious",
    "tough",
    "crimson",
    "convulsive",
    "furious",
    "bloody",
    "raging",
    "rampageous",
    "unnatural",
    "tearing",
    "lashing",
    "ruffianly",
    "knockdown-dragout",
    "knock-down-and-drag-out",
    "red",
    "savage",
    "terrorist",
    "violent"
  ],
  [
    "conspicuous",
    "overt",
    "apparent",
    "obvious",
    "open",
    "panoptic",
    "ocular",
    "visual",
    "telescopic",
    "in sight",
    "circumpolar",
    "on hand",
    "seeable",
    "panoptical",
    "in view",
    "visible"
  ],
  [
    "pallid",
    "light",
    "soft",
    "tenuous",
    "feeble",
    "impotent",
    "inundated",
    "slack",
    "frail",
    "sapless",
    "decrepit",
    "enervated",
    "flaccid",
    "puny",
    "faint",
    "flimsy",
    "incapacitated",
    "shoddy",
    "infirm",
    "fallible",
    "vulnerable",
    "fragile",
    "thin",
    "regular",
    "overcome",
    "engulfed",
    "adynamic",
    "debilitated",
    "limp",
    "powerless",
    "pale",
    "effeminate",
    "swamped",
    "imperfect",
    "asthenic",
    "flooded",
    "diluted",
    "lame",
    "helpless",
    "washy",
    "overwhelmed",
    "dilute",
    "spineless",
    "namby-pamby",
    "wimpy",
    "watery",
    "wishy-washy",
    "overpowered",
    "anemic",
    "weakly",
    "breakaway",
    "weakened",
    "jerry-built",
    "anaemic",
    "nerveless",
    "unstressed",
    "unaccented",
    "forceless",
    "wimpish",
    "unforceful",
    "human",
    "lax",
    "slight",
    "wan",
    "weak"
  ],
  [
    "uncanny",
    "strange",
    "unusual",
    "eldritch",
    "supernatural",
    "unearthly",
    "wyrd",
    "weird"
  ],
  [
    "besotted",
    "sodden",
    "stiff",
    "inebriated",
    "fresh",
    "saturated",
    "plastered",
    "intoxicated",
    "tight",
    "soused",
    "damp",
    "pixilated",
    "loaded",
    "dewy",
    "sopping",
    "sloshed",
    "blotto",
    "tacky",
    "potty",
    "soaked",
    "perspiring",
    "pissed",
    "drenched",
    "blind",
    "moist",
    "waterlogged",
    "boggy",
    "miry",
    "humid",
    "muggy",
    "muddy",
    "soppy",
    "sozzled",
    "bedewed",
    "soggy",
    "steamy",
    "sticky",
    "clammy",
    "smashed",
    "swampy",
    "crocked",
    "squiffy",
    "moisture",
    "watery",
    "soaking",
    "sloughy",
    "dank",
    "tipsy",
    "marshy",
    "mucky",
    "blind drunk",
    "tiddley",
    "drippy",
    "drizzly",
    "reeking",
    "tiddly",
    "sweating",
    "fuddled",
    "besprent",
    "dripping",
    "showery",
    "dampish",
    "sprinkled",
    "slopped",
    "rainy",
    "steaming",
    "washed",
    "lactating",
    "undried",
    "dunked",
    "alcoholic",
    "drunk",
    "misty",
    "quaggy",
    "sweaty",
    "wet"
  ],
  [
    "light",
    "good",
    "livid",
    "hot",
    "achromatic",
    "pure",
    "ashen",
    "clad",
    "clean",
    "empty",
    "gabardine",
    "blanched",
    "blank",
    "tweed",
    "segregated",
    "diluted",
    "covered",
    "lily-white",
    "dilute",
    "flannel",
    "bloodless",
    "colorless",
    "colourless",
    "clothed",
    "white-hot",
    "caucasian",
    "whiteness",
    "snowy",
    "unintegrated",
    "whitened",
    "light-skinned",
    "caucasoid",
    "white person",
    "white river",
    "whiten",
    "white"
  ],
  [
    "comprehensive",
    "ample",
    "heavy",
    "broad",
    "extensive",
    "thick",
    "open",
    "panoptic",
    "considerable",
    "deep",
    "full",
    "large",
    "comfortable",
    "big",
    "extended",
    "encompassing",
    "all-encompassing",
    "sweeping",
    "all-embracing",
    "spacious",
    "blanket",
    "spreading",
    "panoramic",
    "all-inclusive",
    "covering",
    "inaccurate",
    "beamy",
    "overspreading",
    "astray",
    "widely",
    "nationwide",
    "overhanging",
    "wide of the mark",
    "statewide",
    "wide-spreading",
    "opened",
    "across-the-board",
    "citywide",
    "countrywide",
    "fanlike",
    "round-eyed",
    "countywide",
    "wide-cut",
    "wide"
  ],
  [
    "intense",
    "frantic",
    "delirious",
    "frenzied",
    "passionate",
    "spontaneous",
    "excited",
    "chaotic",
    "tempestuous",
    "feral",
    "disorderly",
    "natural",
    "unrestrained",
    "mad",
    "nature",
    "desert",
    "violent",
    "insane",
    "angry",
    "barbarian",
    "waste",
    "furious",
    "barbaric",
    "raving",
    "raging",
    "inhospitable",
    "untamed",
    "uncivilized",
    "uncontrolled",
    "rampantly",
    "state of nature",
    "unbroken",
    "undomesticated",
    "noncivilized",
    "raving mad",
    "unplanted",
    "godforsaken",
    "manic",
    "natural state",
    "savage",
    "stormy",
    "wilderness",
    "wild"
  ],
  [
    "unsettling"
  ],
  [
    "extraordinary",
    "tremendous",
    "marvelous",
    "wondrous",
    "fantastic",
    "rattling",
    "terrific",
    "howling",
    "wonderful"
  ],
  [
    "chromatic",
    "old",
    "lily-livered",
    "fearful",
    "irrational",
    "jaundiced",
    "unhealthy",
    "dishonorable",
    "chicken",
    "white-livered",
    "yellow-bellied",
    "cowardly",
    "scandalmongering",
    "yellowish",
    "dishonourable",
    "chickenhearted",
    "sensationalistic",
    "yellowness",
    "yellowed",
    "colored",
    "yellow"
  ],
  [
    "tender",
    "vulnerable",
    "little",
    "teen",
    "immature",
    "childlike",
    "small",
    "adolescent",
    "new",
    "infantile",
    "formative",
    "baby",
    "offspring",
    "youth",
    "early",
    "youthful",
    "junior",
    "teenage",
    "puppyish",
    "boyish",
    "childly",
    "girlish",
    "youngish",
    "teenaged",
    "boylike",
    "schoolboyish",
    "schoolgirlish",
    "puppylike",
    "newborn",
    "vernal",
    "young"
  ],
  [
    "light",
    "adroit",
    "clear",
    "just",
    "complete",
    "fair",
    "pure",
    "fresh",
    "moral",
    "pristine",
    "perfect",
    "white",
    "immaculate",
    "empty",
    "fairly",
    "plumb",
    "pick",
    "neat",
    "strip",
    "blank",
    "plum",
    "unblemished",
    "legible",
    "unsullied",
    "antiseptic",
    "sporting",
    "cleanse",
    "spick-and-span",
    "scavenge",
    "spick",
    "cosher",
    "speckless",
    "kosher",
    "spotless",
    "unqualified",
    "cleanly",
    "scrubbed",
    "sportsmanlike",
    "unclouded",
    "unstained",
    "unsoiled",
    "spic-and-span",
    "unarmed",
    "cleaned",
    "unspotted",
    "unobjectionable",
    "uninfected",
    "clean house",
    "dry-cleaned",
    "make clean",
    "unused",
    "washed",
    "clean and jerk",
    "cleanable",
    "clean-living",
    "cleansed",
    "houseclean",
    "unaddicted",
    "water-washed",
    "uncontaminating",
    "clean"
  ],
  [
    "elucidate",
    "light",
    "distinct",
    "pellucid",
    "free",
    "bright",
    "broad",
    "discerning",
    "discharge",
    "vivid",
    "trenchant",
    "open",
    "pass",
    "limpid",
    "fair",
    "pure",
    "luculent",
    "illuminate",
    "clarify",
    "perspicuous",
    "realize",
    "translucent",
    "percipient",
    "top",
    "perfect",
    "make",
    "vindicated",
    "innocent",
    "clean",
    "acquit",
    "exonerate",
    "enlighten",
    "net",
    "assoil",
    "take in",
    "shed light on",
    "sack",
    "transparent",
    "crystalline",
    "well-defined",
    "earn",
    "crystallize",
    "untroubled",
    "absolved",
    "exculpate",
    "clearly",
    "shining",
    "pull in",
    "unblemished",
    "crystal clear",
    "exonerated",
    "prima facie",
    "hyaline",
    "legible",
    "guiltless",
    "sort out",
    "sunshiny",
    "shiny",
    "light up",
    "straighten out",
    "nett",
    "unobstructed",
    "clear up",
    "exculpated",
    "unqualified",
    "unmistakable",
    "semitransparent",
    "decipherable",
    "liquid",
    "clear-cut",
    "cloudless",
    "unencumbered",
    "bring in",
    "authorize",
    "brighten",
    "readable",
    "unclouded",
    "unsubtle",
    "clean-handed",
    "clean-cut",
    "cleared",
    "all the way",
    "sack up",
    "clear-thinking",
    "authorise",
    "clearheaded",
    "unclutter",
    "unmortgaged",
    "unfrosted",
    "gain",
    "lucid",
    "serene",
    "sunny",
    "clear"
  ],
  [
    "garish",
    "tawdry",
    "brassy",
    "meretricious",
    "gaudy",
    "big",
    "gimcrack",
    "flashy",
    "thunderous",
    "blaring",
    "yelled",
    "shouted",
    "tacky",
    "tasteless",
    "earsplitting",
    "roaring",
    "deafening",
    "tatty",
    "cheap",
    "trashy",
    "fortissimo",
    "fortemente",
    "vocal",
    "aloud",
    "thundery",
    "earthshaking",
    "shattering",
    "blasting",
    "loudly",
    "loud-mouthed",
    "loud-voiced",
    "flash",
    "forte",
    "loud"
  ],
  [
    "play",
    "flirt",
    "dally",
    "diddle",
    "miniature",
    "plaything",
    "fiddle",
    "toy dog",
    "toy"
  ],
  [
    "accord",
    "understanding",
    "arrangement",
    "correspondence",
    "concord",
    "agreement"
  ],
  [
    "fortify",
    "subdivision",
    "gird",
    "sleeve",
    "weapon",
    "build up",
    "branch",
    "weapon system",
    "arm"
  ],
  [
    "regular army",
    "army"
  ],
  [
    "pointer",
    "arrow"
  ],
  [
    "approach",
    "onslaught",
    "assail",
    "assault",
    "blast",
    "snipe",
    "onset",
    "round",
    "fire",
    "attempt",
    "flak",
    "aggress",
    "lash out",
    "onrush",
    "set on",
    "plan of attack",
    "tone-beginning",
    "attack"
  ],
  [
    "interview",
    "hearing",
    "consultation",
    "audience"
  ],
  [
    "gimlet",
    "wimble",
    "screw auger",
    "snake",
    "auger"
  ],
  [
    "fall",
    "autumn"
  ],
  [
    "support",
    "endorse",
    "substantiate",
    "cover",
    "spine",
    "gage",
    "game",
    "punt",
    "stake",
    "rear",
    "back up",
    "backbone",
    "dorsum",
    "binding",
    "second",
    "backward",
    "hind",
    "indorse",
    "rearward",
    "backrest",
    "vertebral column",
    "plump for",
    "book binding",
    "in reply",
    "spinal column",
    "backwards",
    "rearwards",
    "bet on",
    "plunk for",
    "hinder",
    "back"
  ],
  [
    "tease",
    "bug",
    "harass",
    "pester",
    "beleaguer",
    "badger"
  ],
  [
    "base",
    "grip",
    "bulge",
    "purse",
    "dish",
    "handbag",
    "pocket",
    "udder",
    "pocketbook",
    "suitcase",
    "bagful",
    "cup of tea",
    "traveling bag",
    "old bag",
    "bag"
  ],
  [
    "clump",
    "clod",
    "nut",
    "lump",
    "globe",
    "gonad",
    "bollock",
    "testicle",
    "glob",
    "ballock",
    "testis",
    "musket ball",
    "chunk",
    "egg",
    "orb",
    "ball"
  ],
  [
    "set",
    "ring",
    "circle",
    "stria",
    "stripe",
    "lot",
    "striation",
    "banding",
    "dance orchestra",
    "dance band",
    "frequency band",
    "band"
  ],
  [
    "junket",
    "feast",
    "banquet"
  ],
  [
    "block",
    "measure",
    "relegate",
    "cake",
    "saloon",
    "exclude",
    "banish",
    "blockade",
    "prevention",
    "taproom",
    "barricade",
    "barroom",
    "block up",
    "block off",
    "legal profession",
    "ginmill",
    "legal community",
    "debar",
    "bar"
  ],
  [
    "tumulus",
    "wheelbarrow",
    "burial mound",
    "barrowful",
    "grave mound",
    "garden cart",
    "lawn cart",
    "barrow"
  ],
  [
    "trough",
    "bowl",
    "river basin",
    "basinful",
    "basin"
  ],
  [
    "hoop",
    "basketful",
    "handbasket",
    "field goal",
    "basketball hoop",
    "basket"
  ],
  [
    "drop",
    "pearl",
    "astragal",
    "beading",
    "beadwork",
    "bead"
  ],
  [
    "peck",
    "pick",
    "snout",
    "honker",
    "nib",
    "neb",
    "schnozzle",
    "snoot",
    "bill",
    "nozzle",
    "hooter",
    "beak"
  ],
  [
    "glow",
    "air",
    "transmit",
    "radiate",
    "shine",
    "ray of light",
    "broadcast",
    "send",
    "ray",
    "balance beam",
    "light beam",
    "beam of light",
    "shaft of light",
    "radio beam",
    "shaft",
    "beam"
  ],
  [
    "noodle",
    "noggin",
    "attic",
    "bean plant",
    "edible bean",
    "bean"
  ],
  [
    "yield",
    "abide",
    "conduct",
    "hold",
    "endure",
    "carry",
    "deliver",
    "have",
    "accept",
    "stand",
    "contain",
    "acquit",
    "assume",
    "comport",
    "gestate",
    "wear",
    "stomach",
    "suffer",
    "tolerate",
    "take over",
    "birth",
    "expect",
    "behave",
    "give birth",
    "put up",
    "turn out",
    "deport",
    "birthe",
    "pay",
    "brook",
    "bear"
  ],
  [
    "byssus",
    "whiskers",
    "face fungus",
    "beard"
  ],
  [
    "castor",
    "topper",
    "beaver away",
    "top hat",
    "high hat",
    "opera hat",
    "silk hat",
    "dress hat",
    "stovepipe",
    "beaver"
  ],
  [
    "bang",
    "love",
    "bottom",
    "hump",
    "make out",
    "screw",
    "know",
    "bonk",
    "jazz",
    "sleep with",
    "seam",
    "get it on",
    "have it off",
    "lie with",
    "do it",
    "have intercourse",
    "have it away",
    "be intimate",
    "have a go at it",
    "bed"
  ],
  [
    "bedchamber",
    "sleeping room",
    "chamber",
    "bedroom"
  ],
  [
    "bee"
  ],
  [
    "hive",
    "beehive"
  ],
  [
    "beehive",
    "hive"
  ],
  [
    "beech tree",
    "beechwood",
    "beech"
  ],
  [
    "bang",
    "smash",
    "rap",
    "knock",
    "bash",
    "whang",
    "belt out",
    "swath",
    "whack",
    "belt"
  ],
  [
    "berry"
  ],
  [
    "snort",
    "wench",
    "dame",
    "hiss",
    "skirt",
    "doll",
    "fowl",
    "hoot",
    "chick",
    "boo",
    "razzing",
    "birdie",
    "shuttlecock",
    "raspberry",
    "shuttle",
    "birdwatch",
    "bronx cheer",
    "bird"
  ],
  [
    "call",
    "song",
    "birdcall",
    "birdsong"
  ],
  [
    "deliver",
    "have",
    "nascence",
    "nascency",
    "parturition",
    "parentage",
    "give birth",
    "birthing",
    "birthe",
    "giving birth",
    "bear",
    "nativity",
    "birth"
  ],
  [
    "bison"
  ],
  [
    "ouzel",
    "ousel",
    "merl",
    "european blackbird",
    "merle",
    "new world blackbird",
    "turdus merula",
    "blackbird"
  ],
  [
    "vesica",
    "bladder"
  ],
  [
    "brand",
    "steel",
    "sword",
    "leaf blade",
    "vane",
    "blade"
  ],
  [
    "whip",
    "bleb",
    "bulla",
    "blister"
  ],
  [
    "puff",
    "drift",
    "bluster",
    "blast",
    "blunder",
    "tout",
    "swash",
    "float",
    "shock",
    "boast",
    "setback",
    "vaunt",
    "squander",
    "muff",
    "fellate",
    "waste",
    "bollix",
    "reverse",
    "spoil",
    "bobble",
    "bollocks",
    "fluff",
    "botch",
    "fumble",
    "mess up",
    "brag",
    "bungle",
    "reversal",
    "gas",
    "flub",
    "mishandle",
    "burn out",
    "muck up",
    "go down on",
    "screw up",
    "blow out",
    "foul up",
    "shove off",
    "ball up",
    "be adrift",
    "louse up",
    "botch up",
    "bollix up",
    "shoot a line",
    "bollocks up",
    "shove along",
    "bump",
    "gasconade",
    "gust",
    "blow"
  ],
  [
    "wild boar",
    "sus scrofa",
    "boar"
  ],
  [
    "room",
    "table",
    "panel",
    "card",
    "plank",
    "get on",
    "control panel",
    "instrument panel",
    "gameboard",
    "circuit board",
    "dining table",
    "control board",
    "display panel",
    "circuit card",
    "display board",
    "board"
  ],
  [
    "gravy boat",
    "sauceboat",
    "boat"
  ],
  [
    "personify",
    "consistency",
    "trunk",
    "consistence",
    "torso",
    "dead body",
    "organic structure",
    "physical structure",
    "body"
  ],
  [
    "bang",
    "dash",
    "abscond",
    "slapdash",
    "absquatulate",
    "gobble",
    "rigidly",
    "slap",
    "run out",
    "go off",
    "stiffly",
    "run off",
    "deadbolt",
    "bolt of lightning",
    "bolt out",
    "decamp",
    "smack",
    "thunderbolt",
    "bolt"
  ],
  [
    "aquiesce"
  ],
  [
    "set",
    "secure",
    "pose",
    "muddle",
    "determine",
    "hole",
    "make",
    "mend",
    "posit",
    "location",
    "reparation",
    "prepare",
    "specify",
    "jam",
    "get",
    "repair",
    "mess",
    "restore",
    "pickle",
    "ready",
    "doctor",
    "fixate",
    "deposit",
    "bushel",
    "situate",
    "touch on",
    "pay back",
    "fixing",
    "fasten",
    "mending",
    "kettle of fish",
    "sterilize",
    "unsex",
    "desexualize",
    "locating",
    "furbish up",
    "localization",
    "pay off",
    "desex",
    "localisation",
    "cook",
    "fix"
  ],
  [
    "cram",
    "pearl",
    "swot",
    "drum",
    "os",
    "get up",
    "bone up",
    "debone",
    "osseous tissue",
    "mug up",
    "grind away",
    "swot up",
    "ivory",
    "off-white",
    "bone"
  ],
  [
    "kick",
    "trunk",
    "bring up",
    "kicking",
    "luggage compartment",
    "reboot",
    "iron boot",
    "iron heel",
    "boot"
  ],
  [
    "bottleful",
    "bottle"
  ],
  [
    "butt",
    "edge",
    "frame",
    "margin",
    "skirt",
    "perimeter",
    "surround",
    "borderline",
    "adjoin",
    "abut",
    "molding",
    "delimitation",
    "boundary line",
    "moulding",
    "frame in",
    "butt against",
    "butt on",
    "bound",
    "border"
  ],
  [
    "stern",
    "butt",
    "ass",
    "bum",
    "prat",
    "fathom",
    "tail",
    "penetrate",
    "arse",
    "minimal",
    "fundament",
    "keister",
    "rear",
    "derriere",
    "bed",
    "rump",
    "backside",
    "behind",
    "tush",
    "posterior",
    "seat",
    "minimum",
    "buttocks",
    "fanny",
    "buns",
    "tail end",
    "rear end",
    "worst",
    "freighter",
    "underside",
    "hindquarters",
    "bottomland",
    "undersurface",
    "tooshie",
    "hind end",
    "merchantman",
    "lowest",
    "merchant ship",
    "poorest",
    "bottom of the inning",
    "can",
    "bottom"
  ],
  [
    "bowlder",
    "boulder"
  ],
  [
    "accede",
    "stoop",
    "defer",
    "stem",
    "bend",
    "submit",
    "fore",
    "give in",
    "obeisance",
    "bowknot",
    "bow down",
    "bowing",
    "curtain call",
    "arc",
    "crouch",
    "prow",
    "bow"
  ],
  [
    "trough",
    "stadium",
    "bowlful",
    "pipe bowl",
    "arena",
    "basin",
    "bowl"
  ],
  [
    "bowstring"
  ],
  [
    "child",
    "male child",
    "son",
    "boy"
  ],
  [
    "bangle",
    "wristband",
    "watchstrap",
    "watchband",
    "watch bracelet",
    "bracelet"
  ],
  [
    "head",
    "nous",
    "mind",
    "genius",
    "mentality",
    "brainpower",
    "encephalon",
    "mastermind",
    "learning ability",
    "mental capacity",
    "psyche",
    "wit",
    "brain"
  ],
  [
    "bowel",
    "gut",
    "intestine"
  ],
  [
    "missive",
    "varsity letter",
    "alphabetic character",
    "letter of the alphabet",
    "letter"
  ],
  [
    "offset",
    "separate",
    "outgrowth",
    "fork",
    "arm",
    "subdivision",
    "offshoot",
    "ramify",
    "leg",
    "branch"
  ],
  [
    "bosom",
    "front",
    "boob",
    "knocker",
    "white meat",
    "breast"
  ],
  [
    "adept",
    "maven",
    "virtuoso",
    "charming",
    "sensation",
    "ace",
    "genius",
    "sorcerer",
    "magic",
    "magical",
    "whiz",
    "necromancer",
    "sorcerous",
    "whizz",
    "star",
    "wiz",
    "magician",
    "hotshot",
    "witching",
    "wizardly",
    "wizard"
  ],
  [
    "intimation",
    "hint",
    "breathing spell",
    "breather",
    "breathing space",
    "breathing time",
    "breathing place",
    "breath"
  ],
  [
    "burst",
    "abound",
    "bristle"
  ],
  [
    "sweep",
    "heather",
    "ling",
    "calluna vulgaris",
    "scots heather",
    "broom"
  ],
  [
    "fellow",
    "comrade",
    "crony",
    "buddy",
    "chum",
    "sidekick",
    "sister",
    "blood brother",
    "pal",
    "brother"
  ],
  [
    "eyebrow",
    "supercilium",
    "forehead",
    "hilltop",
    "brow"
  ],
  [
    "jerk",
    "subordinate",
    "charge",
    "hitch",
    "shoot",
    "clam",
    "horse",
    "tear",
    "sawhorse",
    "low-level",
    "sawbuck",
    "go against",
    "dollar",
    "bucked",
    "shoot down",
    "vaulting horse",
    "dollar bill",
    "long horse",
    "one dollar bill",
    "buck"
  ],
  [
    "pail",
    "bucketful",
    "bucket"
  ],
  [
    "acculturation",
    "culture"
  ],
  [
    "buff",
    "batter",
    "knock about",
    "sideboard",
    "snack bar",
    "snack counter",
    "counter",
    "buffet"
  ],
  [
    "edifice",
    "increasing",
    "construction",
    "augmenting",
    "augmentative",
    "heightening",
    "building"
  ],
  [
    "break",
    "encounter",
    "chance",
    "hit",
    "bulge",
    "prominence",
    "hump",
    "relegate",
    "find",
    "knock",
    "displace",
    "dislodge",
    "happen",
    "excrescence",
    "protrusion",
    "protuberance",
    "extrusion",
    "gibbosity",
    "demote",
    "gibbousness",
    "kick downstairs",
    "blow",
    "jut",
    "bump"
  ],
  [
    "essence",
    "charge",
    "core",
    "effect",
    "onus",
    "encumbrance",
    "load",
    "saddle",
    "incumbrance",
    "weight",
    "burthen",
    "loading",
    "weight down",
    "gist",
    "burden"
  ],
  [
    "scrub",
    "chaparral",
    "george bush",
    "pubic hair",
    "george herbert walker bush",
    "shrub",
    "bush"
  ],
  [
    "butterfly stroke",
    "butterfly"
  ],
  [
    "stern",
    "ass",
    "edge",
    "bum",
    "prat",
    "bottom",
    "tail",
    "border",
    "stub",
    "arse",
    "stooge",
    "fundament",
    "keister",
    "rear",
    "derriere",
    "rump",
    "backside",
    "behind",
    "tush",
    "posterior",
    "adjoin",
    "seat",
    "goat",
    "abut",
    "buttocks",
    "fag",
    "fanny",
    "buns",
    "laughingstock",
    "coffin nail",
    "tail end",
    "rear end",
    "cigaret",
    "hindquarters",
    "bunt",
    "butt end",
    "tooshie",
    "hind end",
    "cigarette",
    "butt joint",
    "butt against",
    "butt on",
    "can",
    "target",
    "butt"
  ],
  [
    "cabin"
  ],
  [
    "coop",
    "batting cage",
    "cage in",
    "cage"
  ],
  [
    "cavil",
    "chicane",
    "carp"
  ],
  [
    "cultivated carrot",
    "daucus carota sativa",
    "carrot"
  ],
  [
    "cast",
    "sick",
    "disgorge",
    "vomit",
    "regurgitate",
    "spue",
    "guy",
    "retch",
    "regorge",
    "upchuck",
    "barf",
    "honk",
    "throw up",
    "ct",
    "hombre",
    "big cat",
    "computed axial tomography",
    "vomit up",
    "caterpillar",
    "computed tomography",
    "computerized axial tomography",
    "be sick",
    "true cat",
    "chuck",
    "puke",
    "spew",
    "cat"
  ],
  [
    "cat",
    "tracked",
    "caterpillar-tracked",
    "caterpillar"
  ],
  [
    "caldron",
    "cauldron"
  ],
  [
    "undermine",
    "spelunk",
    "cave"
  ],
  [
    "stalactite"
  ],
  [
    "stalagmite"
  ],
  [
    "speleothem"
  ],
  [
    "tower",
    "pillar",
    "editorial",
    "chromatography column",
    "newspaper column",
    "column"
  ],
  [
    "flowstone"
  ],
  [
    "cavepool"
  ],
  [
    "grot",
    "grotto"
  ],
  [
    "swallow hole",
    "sinkhole"
  ],
  [
    "cavern out",
    "cavern"
  ],
  [
    "lavatube"
  ],
  [
    "karst"
  ],
  [
    "icecave"
  ],
  [
    "moonmilk"
  ],
  [
    "sodastraw"
  ],
  [
    "helictite"
  ],
  [
    "cavewall"
  ],
  [
    "caveceiling"
  ],
  [
    "cavefloor"
  ],
  [
    "caveentrance"
  ],
  [
    "undergroundstream"
  ],
  [
    "stalactiteforest"
  ],
  [
    "dripstone"
  ],
  [
    "cavebear"
  ],
  [
    "flutter",
    "lumber",
    "lick",
    "thrash",
    "drub",
    "clobber",
    "chiropteran",
    "cricket bat",
    "at-bat",
    "baseball bat",
    "squash racket",
    "squash racquet",
    "bat"
  ],
  [
    "troglobite"
  ],
  [
    "cavecricket"
  ],
  [
    "cavespider"
  ],
  [
    "cavesalamander"
  ],
  [
    "blindfish"
  ],
  [
    "cavefungus"
  ],
  [
    "stalactitecurtain"
  ],
  [
    "cavesediment"
  ],
  [
    "cavepainting"
  ],
  [
    "spelunker",
    "potholer",
    "spelaeologist",
    "speleologist"
  ],
  [
    "cavesystem"
  ],
  [
    "cavechamber"
  ],
  [
    "cavepassage"
  ],
  [
    "stalagmitetower"
  ],
  [
    "cavepooldeposit"
  ],
  [
    "cavemicroclimate"
  ],
  [
    "cavestalactitedrip"
  ],
  [
    "speleothemformation"
  ],
  [
    "cavebiodiversity"
  ],
  [
    "subterraneanriver"
  ],
  [
    "karstwindow"
  ],
  [
    "cavum",
    "caries",
    "bodily cavity",
    "tooth decay",
    "dental caries",
    "enclosed space",
    "pit",
    "cavity"
  ],
  [
    "cedarwood",
    "cedar tree",
    "true cedar",
    "cedar"
  ],
  [
    "africanpencilcedar"
  ],
  [
    "cubicle",
    "prison cell",
    "electric cell",
    "jail cell",
    "cadre",
    "cell"
  ],
  [
    "shift",
    "alter",
    "convert",
    "variety",
    "transfer",
    "alteration",
    "interchange",
    "exchange",
    "commute",
    "switch",
    "modification",
    "deepen",
    "vary",
    "change"
  ],
  [
    "lead",
    "moderate",
    "chairman",
    "president",
    "preside",
    "chairperson",
    "chairwoman",
    "hot seat",
    "electric chair",
    "professorship",
    "death chair",
    "chair"
  ],
  [
    "chariot"
  ],
  [
    "chromatic",
    "carmine",
    "ruddy",
    "crimson",
    "scarlet",
    "ruby",
    "blood-red",
    "ruby-red",
    "cherry-red",
    "cherry red",
    "cerise",
    "cherry tree",
    "colored",
    "red",
    "reddish",
    "cherry"
  ],
  [
    "lily-livered",
    "fearful",
    "wimp",
    "white-livered",
    "yellow-bellied",
    "cowardly",
    "crybaby",
    "volaille",
    "gallus gallus",
    "chickenhearted",
    "poulet",
    "yellow",
    "chicken"
  ],
  [
    "repast",
    "meal"
  ],
  [
    "garbanzo",
    "cicer arietinum",
    "chickpea plant",
    "egyptian pea",
    "chickpea"
  ],
  [
    "tyke",
    "minor",
    "girl",
    "baby",
    "nestling",
    "fry",
    "tike",
    "kid",
    "tiddler",
    "little girl",
    "shaver",
    "small fry",
    "youngster",
    "male child",
    "female child",
    "boy",
    "nipper",
    "child"
  ],
  [
    "mentum",
    "chin up",
    "kuki",
    "kuki-chin",
    "chin"
  ],
  [
    "readyingforharvest"
  ],
  [
    "tallvarietyofmaize"
  ],
  [
    "clump",
    "clod",
    "lump",
    "ball",
    "glob",
    "collocate",
    "chunk"
  ],
  [
    "set",
    "ring",
    "lap",
    "band",
    "round",
    "environ",
    "circuit",
    "surround",
    "encircle",
    "circulate",
    "lot",
    "rotary",
    "roundabout",
    "dress circle",
    "traffic circle",
    "circle"
  ],
  [
    "urge",
    "exhort",
    "barrack",
    "inspire",
    "jolly along",
    "cheerfulness",
    "urge on",
    "embolden",
    "hearten",
    "chirk up",
    "pep up",
    "jolly up",
    "recreate",
    "cheer up",
    "cheer"
  ],
  [
    "kin",
    "tribe",
    "kin group",
    "kindred",
    "kinship group",
    "clan"
  ],
  [
    "constitute",
    "set",
    "establish",
    "institute",
    "embed",
    "engraft",
    "found",
    "imbed",
    "implant",
    "works",
    "industrial plant",
    "flora",
    "plant life",
    "plant"
  ],
  [
    "africanelephant"
  ],
  [
    "king of beasts",
    "panthera leo",
    "social lion",
    "lion"
  ],
  [
    "chetah",
    "acinonyx jubatus",
    "cheetah"
  ],
  [
    "panthera pardus",
    "leopard"
  ],
  [
    "africanbuffalo"
  ],
  [
    "camelopard",
    "giraffa camelopardalis",
    "giraffe"
  ],
  [
    "zebra"
  ],
  [
    "gnu",
    "wildebeest"
  ],
  [
    "aepyceros melampus",
    "impala"
  ],
  [
    "koodoo",
    "koudou",
    "kudu"
  ],
  [
    "struthio camelus",
    "ostrich"
  ],
  [
    "mierkat",
    "meerkat"
  ],
  [
    "africanwilddog"
  ],
  [
    "hyaena",
    "hyena"
  ],
  [
    "sassaby",
    "topee",
    "pith helmet",
    "damaliscus lunatus",
    "pith hat",
    "sun helmet",
    "topi"
  ],
  [
    "hartebeest"
  ],
  [
    "maraboustork"
  ],
  [
    "groundhornbill"
  ],
  [
    "secretarybird"
  ],
  [
    "spottedhyena"
  ],
  [
    "blackbackedjackal"
  ],
  [
    "galago",
    "bush baby",
    "bushbaby"
  ],
  [
    "africanhare"
  ],
  [
    "anteater",
    "ant bear",
    "orycteropus afer",
    "aardvark"
  ],
  [
    "proteles cristata",
    "aardwolf"
  ],
  [
    "mouse deer",
    "chevrotain"
  ],
  [
    "guib",
    "tragelaphus scriptus",
    "bushbuck"
  ],
  [
    "reedbuck"
  ],
  [
    "steinbok",
    "raphicerus campestris",
    "steenbok"
  ],
  [
    "duiker"
  ],
  [
    "mongoose"
  ],
  [
    "batearedfox"
  ],
  [
    "honeybadger"
  ],
  [
    "civet cat",
    "civet"
  ],
  [
    "africanrockpython"
  ],
  [
    "nilemonitor"
  ],
  [
    "savannahmonitorlizard"
  ],
  [
    "puffadder"
  ],
  [
    "blackmamba"
  ],
  [
    "greenmamba"
  ],
  [
    "rhinoceros",
    "rhino"
  ],
  [
    "whiterhinoceros"
  ],
  [
    "blackrhinoceros"
  ],
  [
    "hippo",
    "river horse",
    "hippopotamus amphibius",
    "hippopotamus"
  ],
  [
    "africanskimmer"
  ],
  [
    "africanfisheagle"
  ],
  [
    "flamingo"
  ],
  [
    "marauder",
    "predator",
    "vulture"
  ],
  [
    "maraboustork"
  ],
  [
    "koribustard"
  ],
  [
    "savannahsparrow"
  ],
  [
    "africangreyhornbill"
  ],
  [
    "white ant",
    "termite"
  ],
  [
    "armyant"
  ],
  [
    "grasshopper"
  ],
  [
    "cacoethes",
    "love",
    "rage",
    "heat",
    "warmth",
    "passionateness",
    "mania",
    "passion"
  ],
  [
    "locust tree",
    "locust"
  ],
  [
    "sisalplant"
  ],
  [
    "acaciatree"
  ],
  [
    "baobabtree"
  ],
  [
    "savannahoak"
  ],
  [
    "marulatree"
  ],
  [
    "candelabratree"
  ],
  [
    "camelthorn"
  ],
  [
    "sableantelope"
  ],
  [
    "eland"
  ],
  [
    "gemsbuck",
    "oryx gazella",
    "gemsbok"
  ],
  [
    "pasang",
    "oryx"
  ],
  [
    "bathawk"
  ],
  [
    "bushshrike"
  ],
  [
    "crownedcrane"
  ],
  [
    "flapneckedchameleon"
  ],
  [
    "rockmonitor"
  ],
  [
    "savannahhornedviper"
  ],
  [
    "boomslang"
  ],
  [
    "veldrat"
  ],
  [
    "africanstripedweasel"
  ],
  [
    "stripedpolecat"
  ],
  [
    "springhare"
  ],
  [
    "suni"
  ],
  [
    "oribi"
  ],
  [
    "klipspringer"
  ],
  [
    "felis serval",
    "serval"
  ],
  [
    "desert lynx",
    "lynx caracal",
    "caracal"
  ],
  [
    "batearedfox"
  ],
  [
    "africancivet"
  ],
  [
    "smallspottedgenet"
  ],
  [
    "yellowmongoose"
  ],
  [
    "slendermongoose"
  ],
  [
    "rockhyrax"
  ],
  [
    "treehyrax"
  ],
  [
    "africanrockpython"
  ],
  [
    "watermonitor"
  ],
  [
    "puffadder"
  ],
  [
    "rhinocerosviper"
  ],
  [
    "snoutedcobra"
  ],
  [
    "filesnake"
  ],
  [
    "savannahchameleon"
  ],
  [
    "treeagama"
  ],
  [
    "namibsandgecko"
  ],
  [
    "grasslizard"
  ],
  [
    "groundagama"
  ],
  [
    "redbilledquelea"
  ],
  [
    "longtailedwidowbird"
  ],
  [
    "yellowbilledhornbill"
  ],
  [
    "piedcrow"
  ],
  [
    "africanjacana"
  ],
  [
    "blackwingedlapwing"
  ],
  [
    "redbilledhornbill"
  ],
  [
    "groundthrush"
  ],
  [
    "whitebelliedsunbird"
  ],
  [
    "yellowthroatedbushsparrow"
  ],
  [
    "africanskink"
  ],
  [
    "spottedbushsnake"
  ],
  [
    "tawnyeagle"
  ],
  [
    "lannerfalcon"
  ],
  [
    "augurbuzzard"
  ],
  [
    "gabargoshawk"
  ],
  [
    "africanharrierhawk"
  ],
  [
    "blackcrownednightheron"
  ],
  [
    "hammerkop"
  ],
  [
    "africanjacana"
  ],
  [
    "longleggedbuzzard"
  ],
  [
    "honeyguide"
  ],
  [
    "cattleegret"
  ],
  [
    "littleegret"
  ],
  [
    "bluecheekedbeeeater"
  ],
  [
    "brownsnakeeagle"
  ],
  [
    "martiniquegrasshopper"
  ],
  [
    "desertlocust"
  ],
  [
    "termitemound"
  ],
  [
    "speargrass"
  ],
  [
    "redoatgrass"
  ],
  [
    "feathergrass"
  ],
  [
    "thatchinggrass"
  ],
  [
    "veldgrass"
  ],
  [
    "melons"
  ],
  [
    "pumpkinvine"
  ],
  [
    "wildpear"
  ],
  [
    "wildfig"
  ],
  [
    "leadwoodtree"
  ],
  [
    "hookthorn"
  ],
  [
    "wildolive"
  ],
  [
    "reedfrog"
  ],
  [
    "savannahmonitorlizard"
  ],
  [
    "thornydevillizard"
  ],
  [
    "sisalplant"
  ],
  [
    "yellowwhiteeyezosteropssenegalensis"
  ],
  [
    "drop-off",
    "cliff"
  ],
  [
    "mask",
    "dissemble",
    "cloak"
  ],
  [
    "gum",
    "paste",
    "mucilage",
    "glue"
  ],
  [
    "foodreadytobeeaten"
  ],
  [
    "overeating",
    "gula",
    "gluttony"
  ],
  [
    "obscure",
    "overcast",
    "mist",
    "corrupt",
    "taint",
    "defile",
    "fog",
    "dapple",
    "mottle",
    "befog",
    "becloud",
    "haze over",
    "sully",
    "cloud"
  ],
  [
    "order",
    "society",
    "gild",
    "bludgeon",
    "nine",
    "clubhouse",
    "baseball club",
    "ball club",
    "golfclub",
    "guild",
    "lodge",
    "club"
  ],
  [
    "clump",
    "bunch",
    "constellate",
    "bundle",
    "flock",
    "bunch up",
    "cluster"
  ],
  [
    "strike",
    "mint",
    "coin"
  ],
  [
    "ransack",
    "disentangle",
    "cockscomb",
    "coxcomb",
    "combing",
    "comb out",
    "comb"
  ],
  [
    "hurt",
    "trouble",
    "ail",
    "annoyance",
    "nuisance",
    "afflict",
    "botheration",
    "bother",
    "pain in the neck",
    "hurting",
    "painfulness",
    "pain in the ass",
    "painful sensation",
    "anguish",
    "pain"
  ],
  [
    "confession"
  ],
  [
    "concourse",
    "conflux",
    "meeting",
    "merging",
    "junction",
    "confluence"
  ],
  [
    "comatoseness",
    "coma"
  ],
  [
    "coot"
  ],
  [
    "nook",
    "recession",
    "quoin",
    "turning point",
    "box",
    "street corner",
    "niche",
    "recess",
    "corner"
  ],
  [
    "council"
  ],
  [
    "overawe",
    "moo-cow",
    "cow"
  ],
  [
    "cowpoke",
    "puncher",
    "cowboy",
    "cattleman",
    "cowhand",
    "cowpuncher",
    "cowman",
    "cowherd"
  ],
  [
    "crab louse",
    "crabmeat",
    "pubic louse",
    "phthirius pubis",
    "crabby person",
    "crab"
  ],
  [
    "provenance",
    "birthplace",
    "place of origin",
    "rock",
    "cradle"
  ],
  [
    "artisan",
    "artificer",
    "journeyman",
    "crafter",
    "craftsman"
  ],
  [
    "snap",
    "break",
    "quip",
    "pass",
    "fling",
    "ace",
    "check",
    "fissure",
    "collapse",
    "crevice",
    "cleft",
    "whirl",
    "sally",
    "fracture",
    "gap",
    "first-rate",
    "offer",
    "shot",
    "scissure",
    "break up",
    "chip",
    "cranny",
    "topnotch",
    "super",
    "wisecrack",
    "crack up",
    "cracking",
    "break through",
    "crock up",
    "tops",
    "tiptop",
    "a-one",
    "go",
    "chap",
    "superior",
    "crack"
  ],
  [
    "stretch out",
    "crane"
  ],
  [
    "crisp",
    "furrow",
    "line",
    "graze",
    "bend",
    "crimp",
    "fold",
    "crinkle",
    "crumple",
    "plication",
    "scrunch",
    "scrunch up",
    "seam",
    "wrinkle",
    "flexure",
    "rake",
    "ruckle",
    "rumple",
    "crease"
  ],
  [
    "brute",
    "beast",
    "tool",
    "animal",
    "puppet",
    "animate being",
    "fauna",
    "wight",
    "creature"
  ],
  [
    "idea",
    "head",
    "nous",
    "judgment",
    "heed",
    "worry",
    "brain",
    "intellect",
    "judgement",
    "listen",
    "thinker",
    "take care",
    "beware",
    "bear in mind",
    "psyche",
    "mind"
  ],
  [
    "law-breaking",
    "crime"
  ],
  [
    "deplorable",
    "malefactor",
    "felon",
    "wrong",
    "guilty",
    "crook",
    "reprehensible",
    "condemnable",
    "outlaw",
    "felonious",
    "illegal",
    "criminal"
  ],
  [
    "gloat",
    "brag",
    "crowing",
    "vaporing",
    "bragging",
    "line-shooting",
    "corvus",
    "triumph",
    "crow"
  ],
  [
    "push",
    "bunch",
    "gang",
    "crew",
    "crowd together",
    "draw together",
    "herd",
    "crowd"
  ],
  [
    "crest",
    "peak",
    "diadem",
    "top",
    "tip",
    "capitulum",
    "coronate",
    "poll",
    "treetop",
    "pate",
    "pennant",
    "summit",
    "crown"
  ],
  [
    "zany",
    "jackass",
    "goof",
    "goose",
    "fathead",
    "cuckoo"
  ],
  [
    "transfuse",
    "cupful",
    "loving cup",
    "cup"
  ],
  [
    "slew",
    "slue",
    "swerve",
    "bend",
    "veer",
    "cut",
    "curl",
    "crook",
    "wind",
    "bender",
    "curvature",
    "curve ball",
    "breaking ball",
    "curved shape",
    "arc",
    "arch",
    "kink",
    "sheer",
    "trend",
    "curve"
  ],
  [
    "curvedbeam"
  ],
  [
    "bespoke",
    "tailored",
    "tradition",
    "usage",
    "tailor-made",
    "custom-made",
    "bespoken",
    "customs",
    "impost",
    "made-to-order",
    "customs duty",
    "custom"
  ],
  [
    "girl",
    "daughter"
  ],
  [
    "penetrate",
    "dayspring",
    "click",
    "sunrise",
    "dawning",
    "first light",
    "morning",
    "cockcrow",
    "get through",
    "get across",
    "sink in",
    "break of day",
    "sunup",
    "fall into place",
    "come home",
    "break of the day",
    "aurora",
    "daybreak",
    "dawn"
  ],
  [
    "daylight",
    "daytime",
    "sidereal day",
    "mean solar day",
    "solar day",
    "twenty-four hours",
    "day"
  ],
  [
    "die",
    "cube",
    "dice"
  ],
  [
    "dinner party",
    "dinner"
  ],
  [
    "inclination",
    "dim",
    "plunge",
    "souse",
    "sink",
    "cutpurse",
    "dunk",
    "pickpocket",
    "magnetic dip",
    "angle of dip",
    "douse",
    "duck",
    "magnetic inclination",
    "dip"
  ],
  [
    "charge",
    "counsel",
    "guidance",
    "commission",
    "management",
    "way",
    "instruction",
    "managing",
    "steering",
    "counseling",
    "direction"
  ],
  [
    "trench",
    "chuck",
    "ditch"
  ],
  [
    "cad",
    "track",
    "heel",
    "tail",
    "blackguard",
    "trail",
    "hound",
    "click",
    "tag",
    "pawl",
    "chase",
    "andiron",
    "frump",
    "bounder",
    "detent",
    "chase after",
    "firedog",
    "go after",
    "canis familiaris",
    "domestic dog",
    "dogiron",
    "dog"
  ],
  [
    "dolphinfish",
    "mahimahi",
    "dolphin"
  ],
  [
    "sheepherder",
    "sheepman",
    "shepherd"
  ],
  [
    "range",
    "crop",
    "crease",
    "grazing",
    "pasture",
    "browse",
    "rake",
    "graze"
  ],
  [
    "ruck",
    "crowd",
    "herd"
  ],
  [
    "fleece",
    "shear"
  ],
  [
    "whitish",
    "milk river",
    "milklike",
    "milky",
    "milk"
  ],
  [
    "mark",
    "post",
    "denounce",
    "make",
    "stigma",
    "steel",
    "label",
    "firebrand",
    "blade",
    "stain",
    "marque",
    "sword",
    "stigmatize",
    "trade name",
    "brand"
  ],
  [
    "driveherd"
  ],
  [
    "foldsheep"
  ],
  [
    "waterlivestock"
  ],
  [
    "buildcorral"
  ],
  [
    "constructpaddock"
  ],
  [
    "movecamp"
  ],
  [
    "roundup"
  ],
  [
    "tendanimals"
  ],
  [
    "protectaherd"
  ],
  [
    "leadaflock"
  ],
  [
    "monitorapasture"
  ],
  [
    "supplementfeed"
  ],
  [
    "rotategrazing"
  ],
  [
    "vaccinatelivestock"
  ],
  [
    "repairafence"
  ],
  [
    "preparefodder"
  ],
  [
    "drivecattletomarket"
  ],
  [
    "superviseherders"
  ],
  [
    "roundupstrays"
  ],
  [
    "trackanimals"
  ],
  [
    "countlivestock"
  ],
  [
    "idyllic",
    "bucolic",
    "pleasant",
    "rustic",
    "idyll",
    "rural",
    "pastorale",
    "arcadian",
    "pastoral"
  ],
  [
    "social",
    "swarming",
    "herding"
  ],
  [
    "graze",
    "skimming",
    "shaving",
    "grazing"
  ],
  [
    "livestockoriented"
  ],
  [
    "unsettled",
    "roving",
    "wandering",
    "mobile",
    "peregrine",
    "nomadic"
  ],
  [
    "seminomadic"
  ],
  [
    "cattledriven"
  ],
  [
    "sheeprearing"
  ],
  [
    "goatrearing"
  ],
  [
    "versatile",
    "ambulatory",
    "rangy",
    "unsettled",
    "moving",
    "fluid",
    "nomadic",
    "roving",
    "floating",
    "wandering",
    "motile",
    "changeable",
    "perambulating",
    "flying",
    "airborne",
    "changeful",
    "ambulant",
    "waterborne",
    "movable",
    "transferable",
    "mechanized",
    "seaborne",
    "transportable",
    "transferrable",
    "moveable",
    "maneuverable",
    "motorized",
    "manoeuvrable",
    "raisable",
    "transplantable",
    "rotatable",
    "mobile river",
    "raiseable",
    "peregrine",
    "mobile"
  ],
  [
    "subsistence"
  ],
  [
    "bucolic",
    "pastoral",
    "rustic",
    "agrarian",
    "agrestic",
    "homespun",
    "agricultural",
    "campestral",
    "countrified",
    "folksy",
    "cracker-barrel",
    "hobnailed",
    "countryfied",
    "country-bred",
    "country-style",
    "arcadian",
    "hick",
    "rural"
  ],
  [
    "distant",
    "inaccessible",
    "outside",
    "removed",
    "backwoods",
    "unlikely",
    "outback",
    "unaccessible",
    "far",
    "remote control",
    "remote"
  ],
  [
    "pasturerich"
  ],
  [
    "animaldependent"
  ],
  [
    "independent",
    "self-sustaining",
    "self-sufficing",
    "selfsufficient"
  ],
  [
    "weatherexposed"
  ],
  [
    "landintensive"
  ],
  [
    "herdprotective"
  ],
  [
    "seasonal"
  ],
  [
    "drover",
    "herdsman",
    "herder"
  ],
  [
    "slew",
    "cluster",
    "clump",
    "spate",
    "mass",
    "pile",
    "deal",
    "mint",
    "batch",
    "peck",
    "sight",
    "mess",
    "constellate",
    "heap",
    "wad",
    "pot",
    "troop",
    "stack",
    "lot",
    "raft",
    "plenty",
    "great deal",
    "whole slew",
    "good deal",
    "whole lot",
    "hatful",
    "quite a little",
    "tidy sum",
    "mickle",
    "muckle",
    "flock"
  ],
  [
    "stock",
    "farm animal",
    "livestock"
  ],
  [
    "kine",
    "oxen",
    "cows",
    "bos taurus",
    "cattle"
  ],
  [
    "sheep"
  ],
  [
    "butt",
    "stooge",
    "laughingstock",
    "caprine animal",
    "goat"
  ],
  [
    "camel"
  ],
  [
    "haven",
    "oasis"
  ],
  [
    "sirocco",
    "dust storm",
    "sandstorm"
  ],
  [
    "mirage"
  ],
  [
    "desolate",
    "wild",
    "lurch",
    "forsake",
    "defect",
    "abandon",
    "waste",
    "inhospitable",
    "godforsaken",
    "desert"
  ],
  [
    "quicksand"
  ],
  [
    "sandduneridge"
  ],
  [
    "saltflat"
  ],
  [
    "desertscrub"
  ],
  [
    "thornbush"
  ],
  [
    "viper"
  ],
  [
    "jerboa"
  ],
  [
    "sandcat"
  ],
  [
    "gilamonster"
  ],
  [
    "arroyo"
  ],
  [
    "scorched",
    "dry",
    "cooked",
    "adust",
    "sunbaked",
    "baked",
    "parched"
  ],
  [
    "sunbaked"
  ],
  [
    "desolate",
    "bleak",
    "stark",
    "dead",
    "bare",
    "sterile",
    "waste",
    "inhospitable",
    "wasteland",
    "unfruitful",
    "infertile",
    "unfertile",
    "childless",
    "barren"
  ],
  [
    "dirty",
    "soiled",
    "unclean",
    "dust-covered",
    "dusty"
  ],
  [
    "windscorched"
  ],
  [
    "acerbic",
    "caustic",
    "virulent",
    "acrid",
    "vitriolic",
    "hot",
    "venomous",
    "unpleasant",
    "acerb",
    "bitter",
    "fast",
    "sulfurous",
    "sulphurous",
    "red-hot",
    "blistery",
    "acid",
    "blistering"
  ],
  [
    "light",
    "coarse",
    "loose",
    "gritty",
    "flaxen",
    "friable",
    "blonde",
    "farinaceous",
    "grainy",
    "granular",
    "arenaceous",
    "coarse-grained",
    "granulose",
    "beachlike",
    "light-haired",
    "sandlike",
    "beachy",
    "blond",
    "mealy",
    "sandy"
  ],
  [
    "hard",
    "rough",
    "difficult",
    "unstable",
    "stony",
    "unsmooth",
    "bouldery",
    "bouldered",
    "rocky"
  ],
  [
    "abrasive",
    "heavy",
    "hard",
    "rough",
    "rigorous",
    "brutal",
    "unpleasant",
    "cruel",
    "disagreeable",
    "unkind",
    "harsh"
  ],
  [
    "trudgethroughsand"
  ],
  [
    "wanderaimlesslyinthedesert"
  ],
  [
    "char",
    "singe",
    "parch",
    "blacken",
    "swinge",
    "sear",
    "scorch"
  ],
  [
    "bakeunderthesun"
  ],
  [
    "ofsanddrift"
  ],
  [
    "winderosionerode"
  ],
  [
    "searchforwater"
  ],
  [
    "burrowintosand"
  ],
  [
    "shadeoneself"
  ],
  [
    "dryout"
  ],
  [
    "insolation",
    "siriasis",
    "thermic fever",
    "sunstroke"
  ],
  [
    "heathaze"
  ],
  [
    "dustcloud"
  ],
  [
    "drywell"
  ],
  [
    "rockspire"
  ],
  [
    "sandstonebluff"
  ],
  [
    "thornlizard"
  ],
  [
    "european wolf spider",
    "lycosa tarentula",
    "tarantula"
  ],
  [
    "desertcricket"
  ],
  [
    "sandfoxden"
  ],
  [
    "rockcrevice"
  ],
  [
    "drycanyon"
  ],
  [
    "erodedarch"
  ],
  [
    "cactusgrove"
  ],
  [
    "lush",
    "juicy",
    "succulent"
  ],
  [
    "sandplateau"
  ],
  [
    "basaltfield"
  ],
  [
    "ancientriverbed"
  ],
  [
    "drywash"
  ],
  [
    "rockoutcrop"
  ],
  [
    "sunshelf"
  ],
  [
    "stand",
    "kiosk",
    "conk",
    "cubicle",
    "booth",
    "carrell",
    "procrastinate",
    "dilly-dally",
    "sales booth",
    "carrel",
    "stalling",
    "stall"
  ],
  [
    "range",
    "graze",
    "crop",
    "forage",
    "grass",
    "browse",
    "pasturage",
    "pastureland",
    "eatage",
    "grazing land",
    "lea",
    "ley",
    "pasture"
  ],
  [
    "rangeland"
  ],
  [
    "herdingdog"
  ],
  [
    "shearingshed"
  ],
  [
    "milking"
  ],
  [
    "cow pen",
    "cattle pen",
    "corral"
  ],
  [
    "barn"
  ],
  [
    "wateringhole"
  ],
  [
    "shepherd dog",
    "sheep dog",
    "sheepdog"
  ],
  [
    "cattletrack"
  ],
  [
    "stockyard"
  ],
  [
    "herdboy"
  ],
  [
    "paddock"
  ],
  [
    "livestockpen"
  ],
  [
    "fold",
    "sheepcote",
    "sheep pen",
    "sheepfold"
  ],
  [
    "swarm",
    "horde",
    "drove chisel",
    "drove"
  ],
  [
    "cattledrive"
  ],
  [
    "order",
    "cast",
    "ambit",
    "drift",
    "ramble",
    "vagabond",
    "scope",
    "reach",
    "run",
    "graze",
    "rank",
    "rove",
    "array",
    "crop",
    "roam",
    "stray",
    "compass",
    "rate",
    "orbit",
    "pasture",
    "straddle",
    "grade",
    "lay out",
    "chain",
    "browse",
    "set out",
    "stove",
    "mountain range",
    "mountain chain",
    "kitchen range",
    "cooking stove",
    "kitchen stove",
    "chain of mountains",
    "range of mountains",
    "grasp",
    "place",
    "swan",
    "wander",
    "range"
  ],
  [
    "stock farmer",
    "stock raiser",
    "stockman"
  ],
  [
    "cowpoke",
    "puncher",
    "cattleman",
    "cowhand",
    "cowpuncher",
    "rodeo rider",
    "cowherd",
    "cowman",
    "cowboy"
  ],
  [
    "shearing"
  ],
  [
    "dairy farm",
    "dairy"
  ],
  [
    "cattle ranch",
    "cattle farm",
    "spread",
    "ranch"
  ],
  [
    "livestockmarket"
  ],
  [
    "calfskin",
    "sura",
    "calf"
  ],
  [
    "heifer"
  ],
  [
    "crap",
    "fake",
    "bunk",
    "hogwash",
    "guff",
    "bunkum",
    "buncombe",
    "pig",
    "fuzz",
    "copper",
    "rot",
    "strapper",
    "cop",
    "bull through",
    "irish bull",
    "waffle",
    "bull"
  ],
  [
    "lead",
    "direct",
    "head",
    "point",
    "maneuver",
    "hint",
    "tip",
    "wind",
    "bullock",
    "confidential information",
    "manouevre",
    "guide",
    "steer"
  ],
  [
    "tot",
    "toddler",
    "bambino",
    "yearling"
  ],
  [
    "impost",
    "springing cow",
    "springer"
  ],
  [
    "dairycow"
  ],
  [
    "beefcow"
  ],
  [
    "steer",
    "bullock"
  ],
  [
    "rancher"
  ],
  [
    "trough",
    "manger"
  ],
  [
    "feedlot"
  ],
  [
    "calvingpen"
  ],
  [
    "bag",
    "udder"
  ],
  [
    "pap",
    "nipple",
    "mamilla",
    "mammilla",
    "teat"
  ],
  [
    "cut",
    "altered",
    "gelded",
    "unsexed",
    "spayed",
    "emasculated",
    "neutered",
    "castrated"
  ],
  [
    "whole",
    "inviolate",
    "entire",
    "uncastrated",
    "uninjured",
    "undamaged",
    "unimpaired",
    "integral",
    "intact"
  ],
  [
    "wet",
    "fresh",
    "lactating"
  ],
  [
    "significant",
    "fraught",
    "full",
    "enceinte",
    "meaningful",
    "gravid",
    "meaning",
    "expectant",
    "pregnant"
  ],
  [
    "weaned"
  ],
  [
    "unweaned"
  ],
  [
    "milkproducing"
  ],
  [
    "meattype"
  ],
  [
    "drafttype"
  ],
  [
    "horny",
    "bicorn",
    "antlered",
    "bicornuous",
    "bicornuate",
    "bicornate",
    "bicorned",
    "crescent",
    "horned"
  ],
  [
    "polled"
  ],
  [
    "big",
    "mature",
    "grown",
    "full-grown",
    "fully grown",
    "grownup",
    "adult"
  ],
  [
    "vigorous",
    "stout",
    "strong",
    "rich",
    "rugged",
    "unrefined",
    "beefy",
    "tasteful",
    "chesty",
    "hardy",
    "burly",
    "strapping",
    "buirdly",
    "iron",
    "big-boned",
    "big-shouldered",
    "full-bodied",
    "broad-shouldered",
    "cast-iron",
    "square-shouldered",
    "heavy-armed",
    "square-built",
    "big-chested",
    "husky",
    "stalwart",
    "sturdy",
    "robust"
  ],
  [
    "break up",
    "have young",
    "calve"
  ],
  [
    "wean"
  ],
  [
    "eunuch",
    "emasculate",
    "demasculinize",
    "castrate"
  ],
  [
    "give",
    "prey",
    "provender",
    "grub",
    "fertilize",
    "eat",
    "feed in",
    "feast",
    "feed"
  ],
  [
    "suck",
    "nurse",
    "wet-nurse",
    "lactate",
    "breastfeed",
    "give suck",
    "suckle"
  ],
  [
    "hooftrim"
  ],
  [
    "inoculate",
    "innoculate",
    "immunize",
    "vaccinate"
  ],
  [
    "consider",
    "press",
    "count",
    "matter",
    "weigh"
  ],
  [
    "ecstasy",
    "delight",
    "exaltation",
    "channel",
    "carry",
    "transfer",
    "transmit",
    "conveyance",
    "enthrall",
    "ravish",
    "enrapture",
    "send",
    "enchant",
    "enthral",
    "ship",
    "transportation",
    "channelize",
    "shipping",
    "tape drive",
    "rapture",
    "tape transport",
    "transport"
  ],
  [
    "carnage",
    "debacle",
    "butchery",
    "butcher",
    "thrashing",
    "whipping",
    "massacre",
    "walloping",
    "drubbing",
    "trouncing",
    "mow down",
    "slaughter"
  ],
  [
    "selectbreed"
  ],
  [
    "ofsunlightblinding"
  ],
  [
    "ofdirtcracked"
  ],
  [
    "hot",
    "boiling",
    "scalding"
  ],
  [
    "dull",
    "arid",
    "dry",
    "preserved",
    "desiccate",
    "dehydrated",
    "dried",
    "dried-out",
    "desiccated"
  ],
  [
    "dead",
    "empty",
    "exanimate",
    "unanimated",
    "lifeless"
  ],
  [
    "windcarved"
  ],
  [
    "salacious",
    "obscene",
    "sordid",
    "scabrous",
    "blue",
    "lewd",
    "profane",
    "black",
    "feculent",
    "foul",
    "awful",
    "corrupt",
    "nasty",
    "smutty",
    "bedraggled",
    "maculate",
    "hostile",
    "soil",
    "bawdy",
    "begrimed",
    "soiled",
    "illegible",
    "lousy",
    "grimy",
    "dingy",
    "grubby",
    "off-color",
    "colly",
    "draggled",
    "ribald",
    "unjust",
    "muddy",
    "grungy",
    "bemire",
    "oily",
    "filthy",
    "squalid",
    "unfair",
    "blasphemous",
    "contaminated",
    "flyblown",
    "scummy",
    "greasy",
    "impure",
    "snotty",
    "cheating",
    "smeared",
    "fecal",
    "mucky",
    "infected",
    "spattered",
    "smudgy",
    "ill-gotten",
    "smudged",
    "snot-nosed",
    "illegal",
    "buggy",
    "dusty",
    "unclean",
    "fouled",
    "splashed",
    "unsporting",
    "scatological",
    "foul-mouthed",
    "muddied",
    "bespattered",
    "befouled",
    "marked-up",
    "smirched",
    "unsportsmanlike",
    "unswept",
    "unwashed",
    "begrime",
    "contaminating",
    "foul-spoken",
    "dirty-minded",
    "travel-soiled",
    "travel-stained",
    "dust-covered",
    "besplashed",
    "grime",
    "septic",
    "stormy",
    "dirty"
  ],
  [
    "bone dry",
    "bonedry"
  ],
  [
    "sandchoked"
  ],
  [
    "scorchedbrown"
  ],
  [
    "sunglared"
  ],
  [
    "cooked",
    "hardbaked"
  ],
  [
    "lean",
    "thin",
    "dry",
    "wizened",
    "wizen",
    "shriveled",
    "shrunken",
    "shrivelled",
    "dried-up",
    "sear",
    "sere",
    "withered"
  ],
  [
    "shadeless"
  ],
  [
    "ofheatandhotwindfierce"
  ],
  [
    "ofsandabrasive"
  ],
  [
    "overheat"
  ],
  [
    "dull",
    "arid",
    "desiccated",
    "desiccate"
  ],
  [
    "blisterfromthesun"
  ],
  [
    "siftthroughsand"
  ],
  [
    "ofthewindlashsand"
  ],
  [
    "ofsandbatter"
  ],
  [
    "collapsefromheat"
  ],
  [
    "seekshade"
  ],
  [
    "leavetracksinthesane"
  ],
  [
    "digforwater"
  ],
  [
    "scamper",
    "skitter",
    "opening",
    "hatchway",
    "coal scuttle",
    "scurry",
    "scuttle"
  ],
  [
    "burrowdownward"
  ],
  [
    "ofhotairshimmer"
  ],
  [
    "bleachsunbleachingbones"
  ],
  [
    "ofrockerosionweather"
  ],
  [
    "train",
    "wagon train",
    "van",
    "caravan"
  ],
  [
    "oasisroute"
  ],
  [
    "dunepath"
  ],
  [
    "sandstormmarker"
  ],
  [
    "watercache"
  ],
  [
    "mirageguide"
  ],
  [
    "navigatedunes"
  ],
  [
    "traverseplateau"
  ],
  [
    "crosswash"
  ],
  [
    "welltraveled"
  ],
  [
    "deserthardened"
  ],
  [
    "camelcavalry"
  ],
  [
    "sandambush"
  ],
  [
    "desertfortress"
  ],
  [
    "desertscout"
  ],
  [
    "siegerampart"
  ],
  [
    "raidanoasis"
  ],
  [
    "skirmishindunes"
  ],
  [
    "invisible",
    "unseeable",
    "camouflaged"
  ],
  [
    "sandblinded"
  ],
  [
    "heatfatigued"
  ],
  [
    "datepalm"
  ],
  [
    "aloe"
  ],
  [
    "desertrat"
  ],
  [
    "fennecfox"
  ],
  [
    "deserthare"
  ],
  [
    "kalaharilion"
  ],
  [
    "saharaant"
  ],
  [
    "sanddunelizard"
  ],
  [
    "desertcactusflower"
  ],
  [
    "ephemeralpool"
  ],
  [
    "mesquitebush"
  ],
  [
    "xeric",
    "xerophytic"
  ],
  [
    "nighttime",
    "nocturnal"
  ],
  [
    "droughtresistant"
  ],
  [
    "dieofthirst"
  ],
  [
    "void",
    "vanity",
    "vacancy",
    "emptiness"
  ],
  [
    "devastation",
    "ruin",
    "forlornness",
    "loneliness",
    "bleakness",
    "desolation"
  ],
  [
    "loneliness",
    "aloneness",
    "purdah",
    "lonesomeness",
    "solitude"
  ],
  [
    "desolate",
    "stark",
    "cold",
    "black",
    "dim",
    "bare",
    "barren",
    "hopeless",
    "raw",
    "cutting",
    "inhospitable",
    "bleak"
  ],
  [
    "ofthedesertsunandlandscapeunforgiving"
  ],
  [
    "wasteaway"
  ],
  [
    "wanderaimlessly"
  ],
  [
    "gag",
    "smother",
    "choke",
    "asphyxiate",
    "suffocate"
  ],
  [
    "sand dune",
    "dune"
  ],
  [
    "saltpan"
  ],
  [
    "table",
    "mesa"
  ],
  [
    "butte"
  ],
  [
    "wadi"
  ],
  [
    "alluvialfan"
  ],
  [
    "rockvarnish"
  ],
  [
    "desertpavement"
  ],
  [
    "windswept"
  ],
  [
    "saltencrusted"
  ],
  [
    "dull",
    "desiccated",
    "dry",
    "desiccate",
    "waterless",
    "arid"
  ],
  [
    "fret",
    "gnaw",
    "eat away",
    "wear away",
    "gnaw at",
    "eat at",
    "erode"
  ],
  [
    "scourthroughsand"
  ],
  [
    "equus asinus",
    "domestic ass",
    "donkey"
  ],
  [
    "threshold",
    "doorway",
    "room access",
    "door"
  ],
  [
    "doorjam"
  ],
  [
    "dormouse"
  ],
  [
    "dorsalfin"
  ],
  [
    "tartar",
    "firedrake",
    "flying dragon",
    "flying lizard",
    "dragon"
  ],
  [
    "ambition",
    "aspiration",
    "daydream",
    "pipe dream",
    "woolgather",
    "stargaze",
    "dreaming",
    "dream"
  ],
  [
    "cast",
    "degenerate",
    "neglect",
    "dismiss",
    "overlook",
    "throw",
    "miss",
    "fall",
    "deteriorate",
    "omit",
    "pearl",
    "shed",
    "swing",
    "expend",
    "cast off",
    "cut down",
    "bead",
    "flatten",
    "put down",
    "driblet",
    "sink",
    "spend",
    "unload",
    "dangle",
    "falling",
    "leave out",
    "throw off",
    "strike down",
    "set down",
    "knock off",
    "throw away",
    "overleap",
    "drop down",
    "drop cloth",
    "drop curtain",
    "shake off",
    "send away",
    "send packing",
    "fell",
    "drop"
  ],
  [
    "elude",
    "circumvent",
    "evade",
    "dodge",
    "skirt",
    "dip",
    "hedge",
    "fudge",
    "sidestep",
    "put off",
    "douse",
    "parry",
    "duck"
  ],
  [
    "pirogue",
    "dugout canoe",
    "bunker",
    "dugout"
  ],
  [
    "wild",
    "existence",
    "macrocosm",
    "world",
    "creation",
    "cosmos",
    "state of nature",
    "natural phenomenon",
    "natural state",
    "universe",
    "nature"
  ],
  [
    "vipera berus",
    "common viper",
    "adder"
  ],
  [
    "bitisarietans"
  ],
  [
    "bird of jove",
    "eagle"
  ],
  [
    "auricle",
    "pinna",
    "capitulum",
    "spike",
    "ear"
  ],
  [
    "butt",
    "marginal",
    "margin",
    "boundary",
    "border",
    "fringe",
    "adjoin",
    "abut",
    "inch",
    "fringy",
    "butt against",
    "butt on",
    "bound",
    "sharpness",
    "edge"
  ],
  [
    "eel"
  ],
  [
    "nut",
    "ball",
    "gonad",
    "bollock",
    "testicle",
    "ballock",
    "testis",
    "eggs",
    "egg"
  ],
  [
    "cubitus",
    "elbow joint",
    "articulatio cubiti",
    "cubital joint",
    "elbow"
  ],
  [
    "alces alces",
    "european elk",
    "moose",
    "elk"
  ],
  [
    "elm tree",
    "elmwood",
    "elm"
  ],
  [
    "bosom",
    "comprehend",
    "encompass",
    "cover",
    "squeeze",
    "espouse",
    "adapt",
    "hug",
    "embracing",
    "sweep up",
    "embrace"
  ],
  [
    "emotion"
  ],
  [
    "enveloping",
    "envelopment",
    "enclosing",
    "inclosure",
    "natural enclosure",
    "enclosure"
  ],
  [
    "opposition",
    "opponent",
    "foeman",
    "foe",
    "enemy"
  ],
  [
    "estuary"
  ],
  [
    "ewe"
  ],
  [
    "convert",
    "change",
    "interchange",
    "commute",
    "switch",
    "substitution",
    "telephone exchange",
    "switch over",
    "central",
    "exchange"
  ],
  [
    "heart",
    "oculus",
    "peeper",
    "centre",
    "optic",
    "eyeball",
    "middle",
    "center",
    "eye"
  ],
  [
    "brow",
    "supercilium",
    "eyebrow"
  ],
  [
    "grimace",
    "aspect",
    "present",
    "look",
    "front",
    "expression",
    "brass",
    "overlook",
    "facial expression",
    "side",
    "confront",
    "cheek",
    "nerve",
    "effrontery",
    "boldness",
    "fount",
    "facing",
    "face up",
    "typeface",
    "look out on",
    "look across",
    "look out over",
    "font",
    "human face",
    "face"
  ],
  [
    "falcon"
  ],
  [
    "fellowship",
    "home",
    "class",
    "kin",
    "menage",
    "phratry",
    "house",
    "kinfolk",
    "category",
    "family line",
    "kinsfolk",
    "kinsperson",
    "family unit",
    "folk",
    "household",
    "sept",
    "family"
  ],
  [
    "engender",
    "generate",
    "sire",
    "beget",
    "get",
    "founder",
    "beginner",
    "mother",
    "bring forth",
    "forefather",
    "begetter",
    "male parent",
    "padre",
    "father-god",
    "church father",
    "founding father",
    "father"
  ],
  [
    "fatherinlaw"
  ],
  [
    "privilege",
    "prefer",
    "favor",
    "grace",
    "honor",
    "honour",
    "favour"
  ],
  [
    "fete",
    "junket",
    "banquet",
    "feed",
    "festival",
    "fiesta",
    "feast"
  ],
  [
    "gossamer",
    "cobweb"
  ],
  [
    "lesserkudu"
  ],
  [
    "greaterkudu"
  ],
  [
    "cliffchat"
  ],
  [
    "contend",
    "palisade",
    "debate",
    "surround",
    "wall",
    "fence in",
    "fencing",
    "argue",
    "fence"
  ],
  [
    "fete",
    "fiesta",
    "feast",
    "festival"
  ],
  [
    "demise",
    "last",
    "end",
    "destruction",
    "dying",
    "decease",
    "death"
  ],
  [
    "subject",
    "plain",
    "domain",
    "discipline",
    "area",
    "study",
    "sphere",
    "orbit",
    "field of study",
    "battlefield",
    "battleground",
    "airfield",
    "subject field",
    "subject area",
    "field of view",
    "playing field",
    "force field",
    "landing field",
    "field of force",
    "flying field",
    "line of business",
    "field of battle",
    "playing area",
    "field of operation",
    "athletic field",
    "arena",
    "branch of knowledge",
    "champaign",
    "field"
  ],
  [
    "feel",
    "thumb",
    "digit",
    "fingerbreadth",
    "finger"
  ],
  [
    "finch"
  ],
  [
    "fir tree",
    "true fir",
    "fir"
  ],
  [
    "ardor",
    "fervor",
    "elicit",
    "evoke",
    "discharge",
    "provoke",
    "blast",
    "dismiss",
    "arouse",
    "fervour",
    "raise",
    "ardour",
    "terminate",
    "fervency",
    "flame",
    "attack",
    "flak",
    "burn",
    "sack",
    "enkindle",
    "fervidness",
    "flaming",
    "fuel",
    "go off",
    "open fire",
    "firing",
    "burn down",
    "force out",
    "give notice",
    "give the axe",
    "send away",
    "can",
    "kindle",
    "fire"
  ],
  [
    "mark",
    "fool",
    "sucker",
    "chump",
    "patsy",
    "angle",
    "gull",
    "soft touch",
    "shlemiel",
    "mug",
    "fall guy",
    "schlemiel",
    "go fish",
    "fish"
  ],
  [
    "fishhook"
  ],
  [
    "clenched fist",
    "fist"
  ],
  [
    "sea",
    "ocean"
  ],
  [
    "base",
    "level",
    "shock",
    "stun",
    "story",
    "deck",
    "dump",
    "take aback",
    "blow out of the water",
    "flooring",
    "coldcock",
    "knock down",
    "ball over",
    "storey",
    "floor"
  ],
  [
    "flush",
    "prime",
    "efflorescence",
    "blossom",
    "peak",
    "heyday",
    "bloom",
    "flower"
  ],
  [
    "run",
    "fall",
    "course",
    "stream",
    "period",
    "hang",
    "flowing",
    "catamenia",
    "menses",
    "menstruation",
    "menstruate",
    "flow rate",
    "rate of flow",
    "current",
    "flow"
  ],
  [
    "flee",
    "pilot",
    "vanish",
    "wing",
    "aviate",
    "take flight",
    "fly sheet",
    "tent-fly",
    "fly ball",
    "fly front",
    "tent flap",
    "alert",
    "fell",
    "fly"
  ],
  [
    "horsereigns"
  ],
  [
    "close",
    "congregation",
    "bend",
    "crimp",
    "crease",
    "faithful",
    "plication",
    "multiple",
    "shut down",
    "flexure",
    "plica",
    "sheepfold",
    "folding",
    "turn up",
    "close down",
    "fold up",
    "sheepcote",
    "pen up",
    "sheep pen",
    "fold"
  ],
  [
    "saccharide",
    "carbohydrate",
    "refined sugar",
    "saccarify",
    "sugar"
  ],
  [
    "augarbuzzard"
  ],
  [
    "base",
    "foundation",
    "pick",
    "fundament",
    "groundwork",
    "substructure",
    "infantry",
    "hoof",
    "leg it",
    "understructure",
    "hoof it",
    "metrical foot",
    "animal foot",
    "human foot",
    "metrical unit",
    "invertebrate foot",
    "ft",
    "foot"
  ],
  [
    "seashore",
    "seacoast",
    "coast"
  ],
  [
    "step",
    "footmark",
    "footprint"
  ],
  [
    "forearm"
  ],
  [
    "languish",
    "ache",
    "long",
    "yearn",
    "pine tree",
    "true pine",
    "yen",
    "pine"
  ],
  [
    "rakish",
    "dapper",
    "stylish",
    "smart",
    "dashing",
    "raffish",
    "natty",
    "snappy",
    "fashionable",
    "titivate",
    "spruce up",
    "smarten up",
    "tittivate",
    "spiff up",
    "slick up",
    "jaunty",
    "spruce"
  ],
  [
    "larch tree",
    "larch"
  ],
  [
    "poison hemlock",
    "hemlock tree",
    "poison parsley",
    "california fern",
    "nebraska fern",
    "winter fern",
    "conium maculatum",
    "hemlock"
  ],
  [
    "retem",
    "juniper bush",
    "raetam",
    "retama raetam",
    "genista raetam",
    "juniper"
  ],
  [
    "cypress tree",
    "cypress"
  ],
  [
    "yew"
  ],
  [
    "conoid",
    "strobilus",
    "strobile",
    "cone cell",
    "retinal cone",
    "cone shape",
    "cone"
  ],
  [
    "goad",
    "nettle",
    "phonograph needle",
    "acerate leaf",
    "needle"
  ],
  [
    "pineresin"
  ],
  [
    "undergrowth",
    "underwood",
    "underbrush"
  ],
  [
    "moss"
  ],
  [
    "lichen"
  ],
  [
    "skin",
    "barque",
    "bark"
  ],
  [
    "pineneedlelitter"
  ],
  [
    "fool",
    "saphead",
    "drain",
    "exhaust",
    "tomfool",
    "cosh",
    "blackjack",
    "muggins",
    "tire",
    "run down",
    "use up",
    "sap"
  ],
  [
    "forestfloor"
  ],
  [
    "pinecone"
  ],
  [
    "obscure",
    "flurry",
    "confound",
    "throw",
    "disconcert",
    "blur",
    "jumble",
    "fox",
    "mistake",
    "fuddle",
    "befuddle",
    "bedevil",
    "discombobulate",
    "put off",
    "mix up",
    "consternate",
    "confuse"
  ],
  [
    "tumble",
    "sprig",
    "branchlet",
    "catch on",
    "get onto",
    "cotton on",
    "get it",
    "latch on",
    "twig"
  ],
  [
    "seasick"
  ],
  [
    "pineforestglade"
  ],
  [
    "coniferous",
    "cone-bearing",
    "evergreen plant",
    "evergreen"
  ],
  [
    "pinegrove"
  ],
  [
    "forestcanopy"
  ],
  [
    "pinesapling"
  ],
  [
    "forestunderstory"
  ],
  [
    "pinestump"
  ],
  [
    "fallenlog"
  ],
  [
    "pineneedlebed"
  ],
  [
    "pinepollen"
  ],
  [
    "conebearingtree"
  ],
  [
    "pineresintrail"
  ],
  [
    "forestpath"
  ],
  [
    "foreststream"
  ],
  [
    "forestmosscarpet"
  ],
  [
    "forestwildlife"
  ],
  [
    "pinebeetle"
  ],
  [
    "squirrel"
  ],
  [
    "brute",
    "beast",
    "skirt chaser",
    "wildcat",
    "wolf down",
    "masher",
    "woman chaser",
    "savage",
    "wolf"
  ],
  [
    "catamount",
    "lynx"
  ],
  [
    "bird of minerva",
    "bird of night",
    "owl"
  ],
  [
    "woodpecker"
  ],
  [
    "pinemarten"
  ],
  [
    "forestmushroom"
  ],
  [
    "brow",
    "frontal bone",
    "os frontale",
    "forehead"
  ],
  [
    "outlander",
    "outsider",
    "noncitizen",
    "alien",
    "foreigner"
  ],
  [
    "timber",
    "woods",
    "afforest",
    "timberland",
    "wood",
    "woodland",
    "forest"
  ],
  [
    "separate",
    "crotch",
    "ramification",
    "ramify",
    "branching",
    "leg",
    "forking",
    "branch",
    "pitchfork",
    "fork"
  ],
  [
    "fortify",
    "fortress",
    "fort up",
    "garrison",
    "fort"
  ],
  [
    "munition",
    "strengthening",
    "fortification"
  ],
  [
    "freewoman",
    "freeman"
  ],
  [
    "champion",
    "acquaintance",
    "ally",
    "supporter",
    "protagonist",
    "quaker",
    "booster",
    "admirer",
    "confederate",
    "friend"
  ],
  [
    "thorax",
    "dresser",
    "pectus",
    "chest of drawers",
    "bureau",
    "chest"
  ],
  [
    "chromatic",
    "chestnut tree",
    "colored",
    "chestnut"
  ],
  [
    "anuran",
    "salientian",
    "batrachian",
    "frogs",
    "gaul",
    "toad",
    "toadfrog",
    "frog"
  ],
  [
    "furnace"
  ],
  [
    "line",
    "rut",
    "groove",
    "crinkle",
    "crease",
    "chase",
    "chamfer",
    "seam",
    "wrinkle",
    "furrow"
  ],
  [
    "gate"
  ],
  [
    "race murder",
    "racial extermination",
    "genocide"
  ],
  [
    "present",
    "give",
    "endow",
    "empower",
    "endowment",
    "endue",
    "talent",
    "indue",
    "invest",
    "giving",
    "natural endowment",
    "gift"
  ],
  [
    "miss",
    "child",
    "girlfriend",
    "daughter",
    "little girl",
    "lady friend",
    "missy",
    "young lady",
    "female child",
    "fille",
    "young woman",
    "girl"
  ],
  [
    "clear",
    "crest",
    "head",
    "pass",
    "cover",
    "pinnacle",
    "crown",
    "superlative",
    "transcend",
    "peak",
    "pinch",
    "elevation",
    "tip",
    "first",
    "exceed",
    "maximum",
    "overstep",
    "upside",
    "maximal",
    "greatest",
    "whirligig",
    "teetotum",
    "big top",
    "spinning top",
    "round top",
    "circus tent",
    "go past",
    "top side",
    "upper side",
    "top of the inning",
    "acme",
    "arch",
    "boss",
    "chief",
    "foremost",
    "height",
    "summit",
    "top"
  ],
  [
    "yield",
    "fruit"
  ],
  [
    "secretory organ",
    "gland"
  ],
  [
    "pussy",
    "kitty",
    "nooky",
    "pussycat",
    "kitty-cat",
    "slit",
    "puss"
  ],
  [
    "amnioticfluid"
  ],
  [
    "mitt",
    "gloves",
    "boxing glove",
    "baseball glove",
    "baseball mitt",
    "glove"
  ],
  [
    "gnat"
  ],
  [
    "soft",
    "clear",
    "limpid",
    "smooth",
    "fluent",
    "tearful",
    "fluid",
    "graceful",
    "musical",
    "flowing",
    "disposable",
    "dissolved",
    "watery",
    "molten",
    "melted",
    "liquidity",
    "fusible",
    "semiliquid",
    "thawed",
    "swimming",
    "liquified",
    "runny",
    "liquidness",
    "liquefied",
    "liquefiable",
    "liquifiable",
    "liquid"
  ],
  [
    "deity",
    "divinity",
    "idol",
    "supreme being",
    "immortal",
    "graven image",
    "god"
  ],
  [
    "gooddeed"
  ],
  [
    "zany",
    "jackass",
    "cuckoo",
    "goof",
    "fathead",
    "goose"
  ],
  [
    "gosling"
  ],
  [
    "granddaughter"
  ],
  [
    "granddad",
    "granddaddy",
    "gramps",
    "grandad",
    "grandpa",
    "grandfather"
  ],
  [
    "granny",
    "grannie",
    "grandma",
    "grandmother"
  ],
  [
    "grandson"
  ],
  [
    "solemn",
    "grievous",
    "critical",
    "important",
    "heavy",
    "severe",
    "sedate",
    "serious",
    "dangerous",
    "weighty",
    "tomb",
    "inscribe",
    "sculpture",
    "of import",
    "engrave",
    "sculpt",
    "grave accent",
    "sober",
    "grave"
  ],
  [
    "rough",
    "trounce",
    "grating",
    "gravelly",
    "raspy",
    "beat",
    "rasping",
    "cacophonous",
    "cacophonic",
    "get",
    "nettle",
    "vex",
    "perplex",
    "nark",
    "amaze",
    "bother",
    "bewilder",
    "nonplus",
    "baffle",
    "irritate",
    "annoy",
    "rile",
    "flummox",
    "stupefy",
    "dumbfound",
    "dirt",
    "puzzle",
    "stupify",
    "mystify",
    "get to",
    "graveled",
    "unpaved",
    "get at",
    "crushed rock",
    "devil",
    "rag",
    "gravel"
  ],
  [
    "furrow",
    "rout",
    "rut",
    "gouge",
    "groove"
  ],
  [
    "radical",
    "communal",
    "aggroup",
    "grouping",
    "mathematical group",
    "group"
  ],
  [
    "grunt"
  ],
  [
    "client",
    "invitee",
    "visiting",
    "node",
    "guest"
  ],
  [
    "guitar"
  ],
  [
    "mark",
    "cod",
    "fool",
    "sucker",
    "dupe",
    "take in",
    "slang",
    "chump",
    "patsy",
    "put on",
    "soft touch",
    "shlemiel",
    "mug",
    "fall guy",
    "schlemiel",
    "befool",
    "put one across",
    "put one over",
    "fish",
    "sea gull",
    "seagull",
    "gull"
  ],
  [
    "catgut",
    "bowel",
    "intestine",
    "gut"
  ],
  [
    "gorge",
    "esophagus",
    "oesophagus",
    "gullet"
  ],
  [
    "gulley"
  ],
  [
    "mumble",
    "mucilage",
    "glue",
    "chewing gum",
    "gingiva",
    "gum tree",
    "gumwood",
    "gum"
  ],
  [
    "vestibule",
    "foyer",
    "anteroom",
    "antechamber",
    "manse",
    "residence",
    "lobby",
    "mansion",
    "dormitory",
    "entrance hall",
    "dorm",
    "hallway",
    "residence hall",
    "mansion house",
    "student residence",
    "manor hall",
    "hall"
  ],
  [
    "forge",
    "pound",
    "pounding",
    "malleus",
    "gavel",
    "hammering",
    "power hammer",
    "hammer throw",
    "hammer"
  ],
  [
    "give",
    "pass",
    "reach",
    "deal",
    "hook",
    "script",
    "paw",
    "pass on",
    "mitt",
    "turn over",
    "mauler",
    "handwriting",
    "hired hand",
    "helping hand",
    "hired man",
    "bridge player",
    "manus",
    "hand"
  ],
  [
    "address",
    "work",
    "hold",
    "manage",
    "cover",
    "grip",
    "deal",
    "treat",
    "palm",
    "plow",
    "handgrip",
    "do by",
    "care",
    "wield",
    "handle"
  ],
  [
    "rabbit",
    "hare"
  ],
  [
    "character",
    "fiber",
    "vulcanized fiber",
    "fibre"
  ],
  [
    "anserine",
    "mark",
    "zany",
    "silly",
    "cod",
    "sap",
    "foolish",
    "sappy",
    "dissipate",
    "goofy",
    "sucker",
    "shoot",
    "dupe",
    "wacky",
    "cockamamy",
    "cockamamie",
    "take in",
    "dopey",
    "saphead",
    "unreasonable",
    "slang",
    "chump",
    "jester",
    "patsy",
    "gull",
    "fritter",
    "put on",
    "soft touch",
    "shlemiel",
    "mug",
    "fall guy",
    "schlemiel",
    "tomfool",
    "dopy",
    "muggins",
    "goosey",
    "gooselike",
    "befool",
    "fritter away",
    "arse around",
    "fool around",
    "horse around",
    "fool away",
    "goosy",
    "put one across",
    "frivol away",
    "put one over",
    "fish",
    "fool"
  ],
  [
    "stern",
    "butt",
    "ass",
    "dismiss",
    "bum",
    "privy",
    "prat",
    "terminate",
    "fire",
    "bottom",
    "tail",
    "facility",
    "get",
    "arse",
    "might",
    "potty",
    "fundament",
    "keister",
    "rear",
    "sack",
    "derriere",
    "pot",
    "john",
    "rump",
    "lavatory",
    "backside",
    "behind",
    "tush",
    "tin",
    "posterior",
    "seat",
    "throne",
    "stool",
    "buttocks",
    "fanny",
    "commode",
    "buns",
    "lav",
    "tail end",
    "put up",
    "bathroom",
    "rear end",
    "crapper",
    "can buoy",
    "toilet",
    "hindquarters",
    "tin can",
    "force out",
    "tooshie",
    "give notice",
    "hind end",
    "give the axe",
    "send away",
    "canful",
    "may",
    "can"
  ],
  [
    "need",
    "have",
    "ought",
    "should",
    "have got",
    "must"
  ],
  [
    "imbecile",
    "cretin",
    "retard",
    "changeling",
    "half-wit",
    "moron",
    "idiot"
  ],
  [
    "dwell",
    "harmonica",
    "mouth organ",
    "mouth harp",
    "harp"
  ],
  [
    "chapeau",
    "lid",
    "hat"
  ],
  [
    "pitch",
    "monger",
    "huckster",
    "peddle",
    "war hawk",
    "clear the throat",
    "hawk and spit",
    "vend",
    "hawk"
  ],
  [
    "haw",
    "hawthorn"
  ],
  [
    "chromatic",
    "hazelnut",
    "hazelnut tree",
    "colored",
    "hazel tree",
    "pomaderris apetala",
    "hazel"
  ],
  [
    "lead",
    "direct",
    "point",
    "nous",
    "pass",
    "maneuver",
    "principal",
    "mind",
    "top",
    "steer",
    "question",
    "brain",
    "headway",
    "forefront",
    "oral sex",
    "caput",
    "capitulum",
    "top dog",
    "fountainhead",
    "drumhead",
    "heading",
    "headspring",
    "manouevre",
    "head up",
    "head teacher",
    "head word",
    "arch",
    "boss",
    "chief",
    "guide",
    "psyche",
    "school principal",
    "straits",
    "head"
  ],
  [
    "essence",
    "core",
    "affection",
    "spirit",
    "bosom",
    "pith",
    "substance",
    "mettle",
    "marrow",
    "fondness",
    "spunk",
    "tenderness",
    "eye",
    "pump",
    "nerve",
    "meat",
    "centre",
    "kernel",
    "ticker",
    "nub",
    "middle",
    "nitty-gritty",
    "inwardness",
    "warmheartedness",
    "affectionateness",
    "center",
    "gist",
    "sum",
    "heart"
  ],
  [
    "fireplace",
    "open fireplace",
    "fireside",
    "hearth"
  ],
  [
    "porcupine",
    "erinaceus europaeus",
    "erinaceus europeaeus",
    "hedgehog"
  ],
  [
    "pinnacle",
    "superlative",
    "peak",
    "top",
    "stature",
    "elevation",
    "altitude",
    "tallness",
    "acme",
    "summit",
    "height"
  ],
  [
    "helmet"
  ],
  [
    "black henbane",
    "hyoscyamus niger",
    "stinking nightshade",
    "henbane"
  ],
  [
    "mound",
    "hill"
  ],
  [
    "informed",
    "pelvis",
    "hep",
    "coxa",
    "hip joint",
    "pelvic girdle",
    "pelvic arch",
    "articulatio coxae",
    "hip to",
    "hip"
  ],
  [
    "hollow",
    "trap",
    "muddle",
    "jam",
    "mess",
    "pickle",
    "fix",
    "maw",
    "yap",
    "kettle of fish",
    "hole out",
    "hole"
  ],
  [
    "base",
    "abode",
    "domicile",
    "menage",
    "dwelling",
    "house",
    "family",
    "plate",
    "internal",
    "habitation",
    "nursing home",
    "rest home",
    "home plate",
    "dwelling house",
    "central",
    "household",
    "interior",
    "national",
    "place",
    "home"
  ],
  [
    "accolade",
    "observe",
    "respect",
    "abide by",
    "reward",
    "award",
    "laurels",
    "favour",
    "favor",
    "grace",
    "honor",
    "purity",
    "honour"
  ],
  [
    "tough",
    "goon",
    "punk",
    "hoodlum",
    "cowl",
    "bonnet",
    "toughie",
    "cowling",
    "thug",
    "hood"
  ],
  [
    "foot",
    "leg it",
    "hoof it",
    "hoof"
  ],
  [
    "abstract",
    "plume",
    "draw",
    "sneak",
    "lift",
    "fleece",
    "pinch",
    "purloin",
    "bait",
    "hand",
    "claw",
    "pluck",
    "pilfer",
    "paw",
    "lure",
    "gazump",
    "nobble",
    "crotchet",
    "filch",
    "glom",
    "swipe",
    "mitt",
    "snarf",
    "snitch",
    "surcharge",
    "thieve",
    "rob",
    "overcharge",
    "cop",
    "sweetener",
    "knock off",
    "come-on",
    "mauler",
    "addict",
    "hook shot",
    "cabbage",
    "crochet",
    "manus",
    "soak",
    "hook"
  ],
  [
    "tusk",
    "trumpet",
    "cornet",
    "motor horn",
    "automobile horn",
    "car horn",
    "french horn",
    "horn"
  ],
  [
    "hornet"
  ],
  [
    "knight",
    "scag",
    "junk",
    "cavalry",
    "heroin",
    "sawhorse",
    "sawbuck",
    "equus caballus",
    "buck",
    "diacetyl morphine",
    "h",
    "horse cavalry",
    "smack",
    "horse"
  ],
  [
    "cleg",
    "clegg",
    "horse fly",
    "horse tick",
    "hippobosca equina",
    "horsefly"
  ],
  [
    "surety",
    "hostage"
  ],
  [
    "firm",
    "home",
    "menage",
    "sign",
    "theater",
    "family",
    "mansion",
    "theatre",
    "put up",
    "sign of the zodiac",
    "business firm",
    "planetary house",
    "household",
    "house"
  ],
  [
    "wail",
    "ululate",
    "ululation",
    "roar",
    "howling",
    "yammer",
    "yawl",
    "yowl",
    "wrawl",
    "howl"
  ],
  [
    "bosom",
    "embrace",
    "squeeze",
    "clinch",
    "hug"
  ],
  [
    "frail",
    "soul",
    "weak",
    "individual",
    "fallible",
    "mortal",
    "man",
    "anthropomorphic",
    "imperfect",
    "hominid",
    "homo",
    "anthropoid",
    "somebody",
    "anthropomorphous",
    "manlike",
    "hominine",
    "someone",
    "human being",
    "hominal",
    "earthborn",
    "hominian",
    "humanlike",
    "person",
    "human"
  ],
  [
    "conserve",
    "hubby",
    "economize",
    "married man",
    "economise",
    "husband"
  ],
  [
    "icicle"
  ],
  [
    "louse",
    "worm",
    "dirt ball",
    "insect"
  ],
  [
    "island"
  ],
  [
    "javelin"
  ],
  [
    "rebuke",
    "reprimand",
    "chide",
    "berate",
    "scold",
    "check",
    "remonstrate",
    "lecture",
    "chatter",
    "confabulate",
    "reproof",
    "lambaste",
    "lambast",
    "confab",
    "manducate",
    "visit",
    "masticate",
    "have words",
    "chat",
    "gossip",
    "natter",
    "chaffer",
    "chew out",
    "bawl out",
    "jaws",
    "chitchat",
    "dress down",
    "chew up",
    "yack",
    "rattle on",
    "yack away",
    "yap away",
    "chew",
    "claver",
    "rag",
    "jaw"
  ],
  [
    "jay"
  ],
  [
    "gem",
    "precious stone",
    "jewel"
  ],
  [
    "travel",
    "journeying",
    "journey"
  ],
  [
    "essence",
    "core",
    "pith",
    "substance",
    "marrow",
    "heart",
    "meat",
    "nub",
    "nitty-gritty",
    "inwardness",
    "center",
    "gist",
    "sum",
    "kernel"
  ],
  [
    "kidney"
  ],
  [
    "power",
    "magnate",
    "mogul",
    "baron",
    "world-beater",
    "top executive",
    "male monarch",
    "martin luther king",
    "big businessman",
    "business leader",
    "tycoon",
    "king"
  ],
  [
    "brush",
    "osculate",
    "osculation",
    "buss",
    "kiss"
  ],
  [
    "kitty",
    "kitten"
  ],
  [
    "stifle",
    "knee joint",
    "genu",
    "articulatio genus",
    "knee"
  ],
  [
    "tongue",
    "stab",
    "knife"
  ],
  [
    "knuckle joint",
    "metacarpophalangeal joint",
    "knuckle"
  ],
  [
    "lake"
  ],
  [
    "dear",
    "lamb"
  ],
  [
    "state",
    "domain",
    "realm",
    "demesne",
    "ground",
    "estate",
    "soil",
    "terra firma",
    "down",
    "earth",
    "bring",
    "res publica",
    "nation",
    "kingdom",
    "put down",
    "bring down",
    "farming",
    "country",
    "acres",
    "nationality",
    "set down",
    "body politic",
    "dry land",
    "shoot down",
    "landed estate",
    "set ashore",
    "a people",
    "commonwealth",
    "shore",
    "solid ground",
    "terrestrial",
    "land"
  ],
  [
    "speech",
    "nomenclature",
    "terminology",
    "words",
    "linguistic communication",
    "spoken language",
    "linguistic process",
    "lyric",
    "oral communication",
    "language"
  ],
  [
    "larva"
  ],
  [
    "jape",
    "wheeze",
    "gag",
    "jest",
    "joke",
    "express mirth",
    "express joy",
    "laughter",
    "yak",
    "laugh"
  ],
  [
    "foliage",
    "riffle",
    "folio",
    "flick",
    "riff",
    "thumb",
    "leafage",
    "flip",
    "leaf"
  ],
  [
    "parasite",
    "bleed",
    "minion",
    "sponge",
    "bloodsucker",
    "hirudinean",
    "phlebotomize",
    "leech"
  ],
  [
    "stage",
    "peg",
    "fork",
    "wooden leg",
    "pegleg",
    "branch",
    "leg"
  ],
  [
    "prise",
    "prize",
    "jimmy",
    "lever tumbler",
    "pry",
    "lever"
  ],
  [
    "libation"
  ],
  [
    "limb"
  ],
  [
    "line",
    "stock",
    "descent",
    "pedigree",
    "filiation",
    "ancestry",
    "parentage",
    "derivation",
    "bloodline",
    "linage",
    "blood line",
    "line of descent",
    "blood",
    "origin",
    "lineage"
  ],
  [
    "mouth",
    "sass",
    "rim",
    "brim",
    "backtalk",
    "sassing",
    "lip"
  ],
  [
    "liver"
  ],
  [
    "lumber",
    "corduroy",
    "backlog",
    "logarithm",
    "log"
  ],
  [
    "noble",
    "almighty",
    "master",
    "overlord",
    "godhead",
    "nobleman",
    "creator",
    "divine",
    "god almighty",
    "jehovah",
    "lord"
  ],
  [
    "insect",
    "worm",
    "dirt ball",
    "plant louse",
    "bird louse",
    "sucking louse",
    "biting louse",
    "louse"
  ],
  [
    "lung"
  ],
  [
    "garden"
  ],
  [
    "pace",
    "thou",
    "grand",
    "grounds",
    "chiliad",
    "g",
    "k",
    "thousand",
    "cubic yard",
    "1000",
    "one thousand",
    "m",
    "railway yard",
    "yard"
  ],
  [
    "macer",
    "macebearer",
    "mace"
  ],
  [
    "maggot"
  ],
  [
    "scavenger",
    "pack rat",
    "magpie"
  ],
  [
    "mallet"
  ],
  [
    "large",
    "big",
    "gigantic",
    "mammoth"
  ],
  [
    "greenland caribou",
    "caribou",
    "rangifer tarandus",
    "reindeer"
  ],
  [
    "reindeer",
    "greenland caribou",
    "rangifer tarandus",
    "caribou"
  ],
  [
    "arcticfox"
  ],
  [
    "snowyowl"
  ],
  [
    "polarbear"
  ],
  [
    "lemming"
  ],
  [
    "muskox"
  ],
  [
    "arctichare"
  ],
  [
    "ptarmigan"
  ],
  [
    "tundrawolf"
  ],
  [
    "arctictern"
  ],
  [
    "snowbuntings"
  ],
  [
    "lichens"
  ],
  [
    "lowshrubs"
  ],
  [
    "willow tree",
    "willow"
  ],
  [
    "woody",
    "birch rod",
    "birchen",
    "birken",
    "birch tree",
    "birch"
  ],
  [
    "permafrost"
  ],
  [
    "tundrapond"
  ],
  [
    "snowdrifts"
  ],
  [
    "icesheet"
  ],
  [
    "tundrahare"
  ],
  [
    "arcticwillow"
  ],
  [
    "groundsquirrel"
  ],
  [
    "arcticpoppy"
  ],
  [
    "tuftedsaxifrage"
  ],
  [
    "cottongrass"
  ],
  [
    "tundragrasses"
  ],
  [
    "lichensmats"
  ],
  [
    "icewedge"
  ],
  [
    "rockyoutcrop"
  ],
  [
    "arcticwolf"
  ],
  [
    "snowhare"
  ],
  [
    "arcticfoxden"
  ],
  [
    "permafrostsoil"
  ],
  [
    "frostflower"
  ],
  [
    "lichencoveredrocks"
  ],
  [
    "peat bog",
    "bog down",
    "bog"
  ],
  [
    "tundrastream"
  ],
  [
    "snowharetrack"
  ],
  [
    "wolftrack"
  ],
  [
    "reindeertrack"
  ],
  [
    "tundrainsect"
  ],
  [
    "arcticbeetle"
  ],
  [
    "tundrafly"
  ],
  [
    "tundraspider"
  ],
  [
    "snowflea"
  ],
  [
    "arcticbumblebee"
  ],
  [
    "tundrabutterfly"
  ],
  [
    "migratorybird"
  ],
  [
    "nestingsite"
  ],
  [
    "arcticwillowdwarf"
  ],
  [
    "polarwillow"
  ],
  [
    "dwarfbirch"
  ],
  [
    "mountainavens"
  ],
  [
    "arcticbellflower"
  ],
  [
    "arcticpoppyseed"
  ],
  [
    "arcticcottongrass"
  ],
  [
    "tundracottongrasstufts"
  ],
  [
    "arcticmosscarpet"
  ],
  [
    "rockptarmiganchick"
  ],
  [
    "arcticternnest"
  ],
  [
    "snowbuntingflock"
  ],
  [
    "arcticwillowcatkin"
  ],
  [
    "tundralichencrust"
  ],
  [
    "groundfrost"
  ],
  [
    "tundrapondice"
  ],
  [
    "glacialmoraine"
  ],
  [
    "tundrahummock"
  ],
  [
    "arcticheather"
  ],
  [
    "dwarfshrub"
  ],
  [
    "alpinebistort"
  ],
  [
    "arcticbellheather"
  ],
  [
    "tundraviolet"
  ],
  [
    "mountainsaxifrage"
  ],
  [
    "tundrasedge"
  ],
  [
    "arcticcotton"
  ],
  [
    "arcticwillowstem"
  ],
  [
    "rocklichen"
  ],
  [
    "arcticmosscushion"
  ],
  [
    "permafrostmound"
  ],
  [
    "solifluctionlobe"
  ],
  [
    "tundrascree"
  ],
  [
    "tundrarockfield"
  ],
  [
    "arcticriver"
  ],
  [
    "arcticstream"
  ],
  [
    "tundrapondedge"
  ],
  [
    "arcticpool"
  ],
  [
    "snowpatch"
  ],
  [
    "frostheave"
  ],
  [
    "tundrarockcrevice"
  ],
  [
    "tundragravelpatch"
  ],
  [
    "arcticgroundlouse"
  ],
  [
    "tundraspringtail"
  ],
  [
    "arcticbeetlelarva"
  ],
  [
    "tundramosquito"
  ],
  [
    "arcticdragonfly"
  ],
  [
    "tundramoth"
  ],
  [
    "arcticbutterflylarva"
  ],
  [
    "tundraflylarva"
  ],
  [
    "arcticcaterpillar"
  ],
  [
    "tundrapollinator"
  ],
  [
    "arcticinsectnest"
  ],
  [
    "tundraburrow"
  ],
  [
    "permafrostcrack"
  ],
  [
    "icepatch"
  ],
  [
    "windblownridge"
  ],
  [
    "tundrasnowdrifthollow"
  ],
  [
    "world",
    "piece",
    "valet",
    "humanity",
    "gentleman",
    "homo",
    "humankind",
    "serviceman",
    "human being",
    "human beings",
    "adult male",
    "military personnel",
    "human race",
    "valet de chambre",
    "human",
    "humans",
    "isle of man",
    "mankind",
    "military man",
    "man"
  ],
  [
    "head of hair",
    "mane"
  ],
  [
    "represent",
    "correspondence",
    "mapping",
    "map out",
    "map"
  ],
  [
    "maple"
  ],
  [
    "oaken",
    "woody",
    "oak tree",
    "oak"
  ],
  [
    "ash tree",
    "ash"
  ],
  [
    "hickory tree",
    "hickory"
  ],
  [
    "plane tree",
    "platan",
    "lacewood",
    "acer pseudoplatanus",
    "mulberry fig",
    "ficus sycomorus",
    "great maple",
    "scottish maple",
    "sycamore fig",
    "sycamore"
  ],
  [
    "lime",
    "basswood",
    "lime tree",
    "linden tree",
    "linden"
  ],
  [
    "hornbeam"
  ],
  [
    "wildcherry"
  ],
  [
    "cornel",
    "dogwood tree",
    "dogwood"
  ],
  [
    "sassafras tree",
    "sassafras albidum",
    "sassafras"
  ],
  [
    "tuliptree"
  ],
  [
    "blackwalnut"
  ],
  [
    "cercis canadenis",
    "redbud"
  ],
  [
    "blueberrybush"
  ],
  [
    "witchhazel"
  ],
  [
    "wake-robin",
    "wood lily",
    "trillium"
  ],
  [
    "podophyllum peltatum",
    "wild mandrake",
    "may apple",
    "mayapple"
  ],
  [
    "cervid",
    "deer"
  ],
  [
    "confound",
    "throw",
    "trick",
    "confuse",
    "fuddle",
    "befuddle",
    "slyboots",
    "bedevil",
    "discombobulate",
    "dodger",
    "george fox",
    "fob",
    "fox"
  ],
  [
    "racoon",
    "raccoon"
  ],
  [
    "blackbear"
  ],
  [
    "poker",
    "fire hook",
    "stove poker",
    "salamander"
  ],
  [
    "chipmunk"
  ],
  [
    "joker",
    "dud",
    "ocellated turkey",
    "meleagris gallopavo",
    "agriocharis ocellata",
    "bomb",
    "turkey"
  ],
  [
    "escargot",
    "snail"
  ],
  [
    "nightwalker",
    "wiggler",
    "angleworm",
    "dew worm",
    "fishworm",
    "red worm",
    "fishing worm",
    "nightcrawler",
    "earthworm"
  ],
  [
    "mushroom cloud",
    "mushroom-shaped cloud",
    "mushroom"
  ],
  [
    "anuran",
    "salientian",
    "batrachian",
    "frog",
    "toadfrog",
    "toad"
  ],
  [
    "field mouse",
    "vole"
  ],
  [
    "creep",
    "sneak",
    "pussyfoot",
    "steal",
    "mouse"
  ],
  [
    "pinemarten"
  ],
  [
    "capercailzie",
    "horse of the wood",
    "tetrao urogallus",
    "capercaillie"
  ],
  [
    "poplar tree",
    "poplar"
  ],
  [
    "sorbus aucuparia",
    "european mountain ash",
    "rowan tree",
    "rowan"
  ],
  [
    "bourtree",
    "european elder",
    "black elder",
    "common elder",
    "sambucus nigra",
    "elderberry"
  ],
  [
    "meeting house",
    "aquilegia canadensis",
    "banksia integrifolia",
    "coast banksia",
    "ausralian honeysuckle",
    "honeysuckle"
  ],
  [
    "clematis"
  ],
  [
    "english ivy",
    "common ivy",
    "hedera helix",
    "ivy"
  ],
  [
    "goad",
    "vex",
    "nark",
    "gravel",
    "bother",
    "irritate",
    "annoy",
    "rile",
    "needle",
    "get to",
    "get at",
    "devil",
    "rag",
    "nettle"
  ],
  [
    "harebell",
    "wild hyacinth",
    "wood hyacinth",
    "campanula rotundifolia",
    "eustoma grandiflorum",
    "hyacinthoides nonscripta",
    "scilla nonscripta",
    "tulip gentian",
    "prairie gentian",
    "bluebell"
  ],
  [
    "aquilegia",
    "aquilege",
    "columbine"
  ],
  [
    "trumpetvine"
  ],
  [
    "groundivy"
  ],
  [
    "campanula",
    "bellflower"
  ],
  [
    "trailing arbutus",
    "epigaea repens",
    "mayflower"
  ],
  [
    "cuckoopint",
    "wake-robin",
    "lords-and-ladies",
    "arum maculatum",
    "arisaema atrorubens",
    "arisaema triphyllum",
    "indian turnip",
    "jackinthepulpit"
  ],
  [
    "tetterwort",
    "puccoon",
    "redroot",
    "sanguinaria canadensis",
    "bloodroot"
  ],
  [
    "springbeauty"
  ],
  [
    "trilliumgrandiflorum"
  ],
  [
    "solomonsseal"
  ],
  [
    "papaw",
    "papaya",
    "carica papaya",
    "melon tree",
    "papaia",
    "papaw tree",
    "papaya tree",
    "asimina triloba",
    "pawpaw"
  ],
  [
    "wildginger"
  ],
  [
    "jackpine"
  ],
  [
    "fallowdeer"
  ],
  [
    "reddeer"
  ],
  [
    "roedeer"
  ],
  [
    "weasel"
  ],
  [
    "stoat"
  ],
  [
    "pinemarten"
  ],
  [
    "shorttail weasel",
    "mustela erminea",
    "ermine"
  ],
  [
    "shrewmouse",
    "termagant",
    "shrew"
  ],
  [
    "fieldmouse"
  ],
  [
    "redsquirrel"
  ],
  [
    "greysquirrel"
  ],
  [
    "hare",
    "cony",
    "coney",
    "lapin",
    "rabbit"
  ],
  [
    "pheasant"
  ],
  [
    "tinamou",
    "bobwhite quail",
    "bobwhite",
    "ruffed grouse",
    "bonasa umbellus",
    "partridge"
  ],
  [
    "woodcock"
  ],
  [
    "assail",
    "assault",
    "round",
    "attack",
    "lash out",
    "sharpshoot",
    "snipe"
  ],
  [
    "tawnyowl"
  ],
  [
    "barnowl"
  ],
  [
    "longearedowl"
  ],
  [
    "shortearedowl"
  ],
  [
    "nutcracker",
    "nuthatch"
  ],
  [
    "treecreeper"
  ],
  [
    "guttle",
    "prey",
    "devour",
    "gulp",
    "pig",
    "corvus corax",
    "raven"
  ],
  [
    "tawnyfrogmouth"
  ],
  [
    "triton",
    "newt"
  ],
  [
    "earthnut",
    "chocolate truffle",
    "earth-ball",
    "truffle"
  ],
  [
    "fern"
  ],
  [
    "centipede"
  ],
  [
    "millepede",
    "milliped",
    "millipede"
  ],
  [
    "spider"
  ],
  [
    "overhang",
    "protrusive",
    "beetling",
    "beetle"
  ],
  [
    "ladybird",
    "ladybeetle",
    "lady beetle",
    "ladybird beetle",
    "ladybug"
  ],
  [
    "weevil"
  ],
  [
    "moth"
  ],
  [
    "slog",
    "swig",
    "bullet",
    "sluggard",
    "slug"
  ],
  [
    "white anglo-saxon protestant",
    "wasp"
  ],
  [
    "hummingbird"
  ],
  [
    "slater",
    "woodlouse"
  ],
  [
    "may beetle",
    "may bug",
    "melolontha melolontha",
    "cockchafer"
  ],
  [
    "earthstarfungus"
  ],
  [
    "chantarelle",
    "cantharellus cibarius",
    "chanterelle"
  ],
  [
    "genus boletus",
    "boletus"
  ],
  [
    "flyagaric"
  ],
  [
    "shaggyinkcap"
  ],
  [
    "female horse",
    "maria",
    "mare"
  ],
  [
    "marketplace",
    "grocery",
    "grocery store",
    "commercialize",
    "securities industry",
    "market"
  ],
  [
    "marriedcouple"
  ],
  [
    "fen",
    "marshland",
    "marsh"
  ],
  [
    "marten cat",
    "marten"
  ],
  [
    "slaughter",
    "mow down",
    "mass murder",
    "massacre"
  ],
  [
    "control",
    "subdue",
    "surmount",
    "original",
    "maestro",
    "lord",
    "overcome",
    "overlord",
    "dominate",
    "professional",
    "headmaster",
    "get over",
    "skipper",
    "master copy",
    "swim",
    "schoolmaster",
    "sea captain",
    "get the hang",
    "captain",
    "superior",
    "victor",
    "master"
  ],
  [
    "snarl",
    "dull",
    "flat",
    "tangle",
    "matt",
    "matte",
    "entangle",
    "flatness",
    "felt up",
    "lusterlessness",
    "matted",
    "matting",
    "place mat",
    "master of arts in teaching",
    "mat up",
    "felt",
    "mat"
  ],
  [
    "maternalkinsman"
  ],
  [
    "hayfield",
    "meadow"
  ],
  [
    "trefoil",
    "clover"
  ],
  [
    "blowball",
    "dandelion"
  ],
  [
    "crowfoot",
    "kingcup",
    "goldcup",
    "butterflower",
    "buttercup"
  ],
  [
    "chromatic",
    "purple",
    "purplish",
    "reddish blue",
    "colored",
    "violet"
  ],
  [
    "orchidaceous plant",
    "orchid"
  ],
  [
    "digitalis",
    "foxglove"
  ],
  [
    "timothygrass"
  ],
  [
    "meadow fescue",
    "fescue grass",
    "festuca elatior",
    "fescue"
  ],
  [
    "bromegrass"
  ],
  [
    "meadowfoxtail"
  ],
  [
    "rye grass",
    "ryegrass"
  ],
  [
    "wildcarrot"
  ],
  [
    "queenanneslace"
  ],
  [
    "milfoil",
    "achillea millefolium",
    "yarrow"
  ],
  [
    "plantain tree",
    "musa paradisiaca",
    "plantain"
  ],
  [
    "ragweed",
    "butterweed",
    "benweed",
    "senecio glabellus",
    "senecio jacobaea",
    "tansy ragwort",
    "ragwort"
  ],
  [
    "thistle"
  ],
  [
    "mallow"
  ],
  [
    "wildstrawberry"
  ],
  [
    "heathbedstraw"
  ],
  [
    "horsetail"
  ],
  [
    "mouse ear",
    "clammy chickweed",
    "mouse eared chickweed",
    "mouse-ear chickweed",
    "chickweed"
  ],
  [
    "larkspur"
  ],
  [
    "meadowsaxifrage"
  ],
  [
    "meadowrue"
  ],
  [
    "meadowbuttercup"
  ],
  [
    "fieldscabious"
  ],
  [
    "knapweed"
  ],
  [
    "bluebottle",
    "strawflower",
    "centaurea cyanus",
    "uvularia grandiflora",
    "cornflower"
  ],
  [
    "poppy"
  ],
  [
    "meadowvetchling"
  ],
  [
    "lucerne",
    "medicago sativa",
    "alfalfa"
  ],
  [
    "redclover"
  ],
  [
    "whiteclover"
  ],
  [
    "meadowbrownbutterfly"
  ],
  [
    "skipperbutterfly"
  ],
  [
    "commonbluebutterfly"
  ],
  [
    "paintedladybutterfly"
  ],
  [
    "meadowgrasshopper"
  ],
  [
    "fieldcricket"
  ],
  [
    "hoverfly"
  ],
  [
    "darning needle",
    "mosquito hawk",
    "snake doctor",
    "sewing needle",
    "snake feeder",
    "skeeter hawk",
    "dragonfly"
  ],
  [
    "damselfly"
  ],
  [
    "bulwark",
    "jetty",
    "groin",
    "breakwater",
    "groyne",
    "seawall",
    "mol",
    "gram molecule",
    "counterspy",
    "mole"
  ],
  [
    "fieldmouse"
  ],
  [
    "lurch",
    "bum",
    "gage",
    "rat",
    "pot",
    "weed",
    "rotter",
    "grass",
    "sess",
    "crumb",
    "so-and-so",
    "dope",
    "cannabis",
    "lowlife",
    "mary jane",
    "polecat",
    "stinker",
    "ganja",
    "scum bag",
    "marijuana",
    "marihuana",
    "wood pussy",
    "mary-jane",
    "cannabis sativa",
    "puke",
    "sens",
    "smoke",
    "skunk"
  ],
  [
    "true sparrow",
    "hedge sparrow",
    "dunnock",
    "prunella modularis",
    "sparrow"
  ],
  [
    "frolic",
    "escapade",
    "disport",
    "cavort",
    "romp",
    "sport",
    "frisk",
    "gambol",
    "rollick",
    "skylark",
    "run around",
    "pipit",
    "meadowlark",
    "titlark",
    "lark about",
    "lark"
  ],
  [
    "yellowbird",
    "carduelis carduelis",
    "new world goldfinch",
    "spinus tristis",
    "goldfinch"
  ],
  [
    "fringilla coelebs",
    "chaffinch"
  ],
  [
    "meadowpipit"
  ],
  [
    "frolic",
    "disport",
    "cavort",
    "romp",
    "sport",
    "lark",
    "frisk",
    "gambol",
    "rollick",
    "run around",
    "lark about",
    "alauda arvensis",
    "skylark"
  ],
  [
    "reedbunting"
  ],
  [
    "meadowant"
  ],
  [
    "cricket"
  ],
  [
    "fieldgrasshopper"
  ],
  [
    "butterflybush"
  ],
  [
    "silkweed",
    "sonchus oleraceus",
    "milkweed"
  ],
  [
    "parsimony",
    "parsimoniousness",
    "penny-pinching",
    "thrift"
  ],
  [
    "meadowsaffron"
  ],
  [
    "meadowrue"
  ],
  [
    "meadowfoam"
  ],
  [
    "fieldpansy"
  ],
  [
    "meadowvetch"
  ],
  [
    "birdsfoottrefoil"
  ],
  [
    "toadflax",
    "linaria vulgaris",
    "wild snapdragon",
    "butterandeggs"
  ],
  [
    "meadowbuttercup"
  ],
  [
    "marshmarigold"
  ],
  [
    "alderbuckthorn"
  ],
  [
    "arrowhead"
  ],
  [
    "autumnhawkbit"
  ],
  [
    "bedstraw"
  ],
  [
    "birdsfoot"
  ],
  [
    "blackmedick"
  ],
  [
    "blueeyedgrass"
  ],
  [
    "petasites hybridus",
    "petasites vulgaris",
    "bog rhubarb",
    "butterbur"
  ],
  [
    "catsear"
  ],
  [
    "commonknapweed"
  ],
  [
    "commonsorrel"
  ],
  [
    "creepingthistle"
  ],
  [
    "cowwheat"
  ],
  [
    "paigle",
    "meadow bright",
    "kingcup",
    "marsh marigold",
    "caltha palustris",
    "water dragon",
    "primula veris",
    "may blob",
    "cowslip"
  ],
  [
    "cranesbill"
  ],
  [
    "diceplant"
  ],
  [
    "eveningprimrose"
  ],
  [
    "fieldbindweed"
  ],
  [
    "fieldpennycress"
  ],
  [
    "fieldscabious"
  ],
  [
    "fieldspeedwell"
  ],
  [
    "fiddleheadfern"
  ],
  [
    "atomic number 31",
    "ga",
    "gallium"
  ],
  [
    "goatsbeard"
  ],
  [
    "bluebell",
    "wild hyacinth",
    "wood hyacinth",
    "campanula rotundifolia",
    "hyacinthoides nonscripta",
    "scilla nonscripta",
    "harebell"
  ],
  [
    "hawkweed"
  ],
  [
    "herbrobert"
  ],
  [
    "hoptrefoil"
  ],
  [
    "ladysmantle"
  ],
  [
    "meadowanemone"
  ],
  [
    "meadowclary"
  ],
  [
    "meadowcranesbill"
  ],
  [
    "meadowfescue"
  ],
  [
    "meadowgrasshopper"
  ],
  [
    "meadowhawkweed"
  ],
  [
    "meadowvipersgrass"
  ],
  [
    "meadowviolet"
  ],
  [
    "aconitum napellus",
    "helmetflower",
    "helmet flower",
    "monkshood"
  ],
  [
    "mountainmelick"
  ],
  [
    "mountainpansy"
  ],
  [
    "mountainsorrel"
  ],
  [
    "oxeyedaisy"
  ],
  [
    "black hickory",
    "carya glabra",
    "brown hickory",
    "pignut hickory",
    "pignut"
  ],
  [
    "plantainleavedsedge"
  ],
  [
    "redclover"
  ],
  [
    "reedcanarygrass"
  ],
  [
    "ribwortplantain"
  ],
  [
    "rosemaryleavedsage"
  ],
  [
    "roughhawkbit"
  ],
  [
    "scarletpimpernel"
  ],
  [
    "heal all",
    "prunella vulgaris",
    "selfheal"
  ],
  [
    "sheepsbit"
  ],
  [
    "slenderclover"
  ],
  [
    "chromatic",
    "dock",
    "common sorrel",
    "oxalis",
    "wood sorrel",
    "sour grass",
    "red sorrel",
    "rozelle",
    "jamaica sorrel",
    "hibiscus sabdariffa",
    "brownish-orange",
    "colored",
    "roselle",
    "sorrel"
  ],
  [
    "veronica",
    "speedwell"
  ],
  [
    "sweetvernalgrass"
  ],
  [
    "tallfescue"
  ],
  [
    "teazel",
    "teasle",
    "teasel"
  ],
  [
    "tuftedvetch"
  ],
  [
    "yellowrattle"
  ],
  [
    "adderstonguefern"
  ],
  [
    "blackknapweed"
  ],
  [
    "cowsliporchid"
  ],
  [
    "commonmilkwort"
  ],
  [
    "corncockle"
  ],
  [
    "creepingcinquefoil"
  ],
  [
    "dogsmercury"
  ],
  [
    "eyebright"
  ],
  [
    "fieldforgetmenot"
  ],
  [
    "fieldgentian"
  ],
  [
    "fieldmustard"
  ],
  [
    "fieldscabious"
  ],
  [
    "groundivy"
  ],
  [
    "heathbedstraw"
  ],
  [
    "ladyssmock"
  ],
  [
    "meadowbarley"
  ],
  [
    "meadowbuttercup"
  ],
  [
    "meadowclary"
  ],
  [
    "meadowcranesbill"
  ],
  [
    "meadowfescue"
  ],
  [
    "meadowfoxtail"
  ],
  [
    "meadowhawkweed"
  ],
  [
    "meadowvetch"
  ],
  [
    "meadowsweet"
  ],
  [
    "meadowsaffron"
  ],
  [
    "confluence",
    "encounter",
    "get together",
    "merging",
    "coming together",
    "junction",
    "meeting"
  ],
  [
    "tissue layer",
    "membrane"
  ],
  [
    "retention",
    "storage",
    "store",
    "remembering",
    "retentiveness",
    "memory board",
    "memory"
  ],
  [
    "grind",
    "mill about",
    "factory",
    "mill around",
    "pulverization",
    "manufacturing plant",
    "manufactory",
    "pulverisation",
    "grinder",
    "mill"
  ],
  [
    "mirror"
  ],
  [
    "kept woman",
    "fancy woman",
    "schoolmistress",
    "schoolmarm",
    "mistress"
  ],
  [
    "daydream",
    "lunation",
    "synodic month",
    "moonlight",
    "moonshine",
    "lunar month",
    "moon on",
    "moon around",
    "moon"
  ],
  [
    "dayspring",
    "sunrise",
    "dawning",
    "first light",
    "forenoon",
    "cockcrow",
    "break of day",
    "good morning",
    "sunup",
    "morn",
    "morning time",
    "break of the day",
    "aurora",
    "dawn",
    "daybreak",
    "morning"
  ],
  [
    "engender",
    "generate",
    "sire",
    "beget",
    "fuss",
    "get",
    "father",
    "bring forth",
    "overprotect",
    "female parent",
    "mother"
  ],
  [
    "mount",
    "mountain"
  ],
  [
    "flush",
    "crest",
    "point",
    "prime",
    "high",
    "efflorescence",
    "pinnacle",
    "crown",
    "vertex",
    "blossom",
    "superlative",
    "top",
    "elevation",
    "tip",
    "heyday",
    "vizor",
    "extremum",
    "bill",
    "flower",
    "highest",
    "climactic",
    "eyeshade",
    "climactical",
    "reach a peak",
    "acme",
    "apex",
    "bloom",
    "height",
    "summit",
    "visor",
    "peak"
  ],
  [
    "rooftree",
    "ridgepole",
    "ridge"
  ],
  [
    "talus",
    "scree"
  ],
  [
    "scree",
    "astragal",
    "astragalus",
    "anklebone",
    "talus"
  ],
  [
    "crest",
    "pinnacle",
    "crown",
    "superlative",
    "peak",
    "top",
    "elevation",
    "tip",
    "acme",
    "height",
    "summit meeting",
    "summit"
  ],
  [
    "cairn terrier",
    "cairn"
  ],
  [
    "crag"
  ],
  [
    "direct",
    "bold",
    "steep",
    "four flush",
    "bluff out",
    "sheer",
    "bluff"
  ],
  [
    "alpinemeadow"
  ],
  [
    "mountainpine"
  ],
  [
    "leontopodium alpinum",
    "edelweiss"
  ],
  [
    "capra ibex",
    "ibex"
  ],
  [
    "mountaingoat"
  ],
  [
    "snowleopard"
  ],
  [
    "shammy",
    "chamois leather",
    "chammy",
    "shammy leather",
    "rupicapra rupicapra",
    "chammy leather",
    "chamois"
  ],
  [
    "marmot"
  ],
  [
    "cackle",
    "jape",
    "wheeze",
    "gag",
    "jest",
    "joke",
    "chatter",
    "laugh",
    "yack",
    "yakety-yak",
    "bos grunniens",
    "yak"
  ],
  [
    "alpineibex"
  ],
  [
    "glacier"
  ],
  [
    "snowfield"
  ],
  [
    "mountainhare"
  ],
  [
    "mountainash"
  ],
  [
    "mountainstream"
  ],
  [
    "pinemarten"
  ],
  [
    "rockptarmigan"
  ],
  [
    "mountainbirch"
  ],
  [
    "alpinecushionplant"
  ],
  [
    "granite"
  ],
  [
    "limestone"
  ],
  [
    "basalt"
  ],
  [
    "mountainpinebeetle"
  ],
  [
    "snowcap"
  ],
  [
    "foothill"
  ],
  [
    "glen"
  ],
  [
    "alpinetundra"
  ],
  [
    "mountainlaurel"
  ],
  [
    "cony",
    "coney",
    "rock rabbit",
    "mouse hare",
    "pika"
  ],
  [
    "mountainlion"
  ],
  [
    "rockhyrax"
  ],
  [
    "mountainbellflower"
  ],
  [
    "mountainash"
  ],
  [
    "snowvole"
  ],
  [
    "mountainbluebird"
  ],
  [
    "alp"
  ],
  [
    "alpinepoppy"
  ],
  [
    "mountainpinevole"
  ],
  [
    "rockcrevice"
  ],
  [
    "mountainchickadee"
  ],
  [
    "snowmeltstream"
  ],
  [
    "crystalspring"
  ],
  [
    "alpinesalamander"
  ],
  [
    "mountainashbutterfly"
  ],
  [
    "mountainheather"
  ],
  [
    "alpinegentian"
  ],
  [
    "mountainmahogany"
  ],
  [
    "rockwren"
  ],
  [
    "glaciallake"
  ],
  [
    "alpineibexkid"
  ],
  [
    "mountainhareleveret"
  ],
  [
    "rocklizard"
  ],
  [
    "mountainmoss"
  ],
  [
    "alpineclover"
  ],
  [
    "mountainsaffron"
  ],
  [
    "pikaburrow"
  ],
  [
    "rockyplateau"
  ],
  [
    "mountaingoatkid"
  ],
  [
    "alpineboulder"
  ],
  [
    "mountainpinemartenden"
  ],
  [
    "glacialmoraine"
  ],
  [
    "mountainfox"
  ],
  [
    "snowleopardcub"
  ],
  [
    "alpinewillow"
  ],
  [
    "mountainbirchsapling"
  ],
  [
    "rockrabbit"
  ],
  [
    "mountainstreaminsect"
  ],
  [
    "highlandviper"
  ],
  [
    "mountainpinecone"
  ],
  [
    "glacialicepatch"
  ],
  [
    "alpineviolet"
  ],
  [
    "mountainpineseedling"
  ],
  [
    "rockhyraxden"
  ],
  [
    "mountainstreamtrout"
  ],
  [
    "alpinehawk"
  ],
  [
    "mountainpinebarkbeetle"
  ],
  [
    "mountainashsapling"
  ],
  [
    "mountainpinenut"
  ],
  [
    "alpinechough"
  ],
  [
    "mountainquail"
  ],
  [
    "snowfieldhare"
  ],
  [
    "glacialerratic"
  ],
  [
    "rockyoutcrop"
  ],
  [
    "mountaintundra"
  ],
  [
    "alpinemeadowbutterfly"
  ],
  [
    "mountainbluebell"
  ],
  [
    "mountainlichen"
  ],
  [
    "rockhyraxyoung"
  ],
  [
    "mountainashblossom"
  ],
  [
    "glacialmeltwaterstream"
  ],
  [
    "mountaincrow"
  ],
  [
    "alpinehare"
  ],
  [
    "rockwrennest"
  ],
  [
    "mountainstonecrop"
  ],
  [
    "snowvoleburrow"
  ],
  [
    "mountainalder"
  ],
  [
    "rockypass"
  ],
  [
    "mountainmeadowvole"
  ],
  [
    "mountainpinesapling"
  ],
  [
    "highaltitudebee"
  ],
  [
    "alpineinsect"
  ],
  [
    "glacialmeltpond"
  ],
  [
    "mountainstreammayfly"
  ],
  [
    "rockptarmiganchick"
  ],
  [
    "mountainpinemartenkit"
  ],
  [
    "alpinesedge"
  ],
  [
    "mountainashmoth"
  ],
  [
    "mountainsorrel"
  ],
  [
    "mountainhawkeagle"
  ],
  [
    "rockpartridge"
  ],
  [
    "mountainpoppy"
  ],
  [
    "mountainpineweevil"
  ],
  [
    "glacialicecave"
  ],
  [
    "rockhyrax"
  ],
  [
    "sinew",
    "musculus",
    "muscular tissue",
    "brawn",
    "muscle"
  ],
  [
    "sass",
    "speak",
    "backtalk",
    "mouthpiece",
    "oral cavity",
    "lip",
    "talk",
    "verbalize",
    "sassing",
    "utter",
    "mouth"
  ],
  [
    "mussel"
  ],
  [
    "chromatic",
    "red coral",
    "precious coral",
    "colored",
    "coral"
  ],
  [
    "kelp"
  ],
  [
    "seaanemone"
  ],
  [
    "seaurchin"
  ],
  [
    "sea star",
    "starfish"
  ],
  [
    "cerriped",
    "barnacle goose",
    "branta leucopsis",
    "cerripede",
    "barnacle"
  ],
  [
    "dollar",
    "dollar bill",
    "one dollar bill",
    "buck",
    "clam"
  ],
  [
    "huitre",
    "oyster"
  ],
  [
    "runt",
    "peewee",
    "prawn",
    "half-pint",
    "shrimp"
  ],
  [
    "lobster"
  ],
  [
    "bum",
    "parasite",
    "cadge",
    "minion",
    "grub",
    "mooch",
    "poriferan",
    "parazoan",
    "leech",
    "sponge"
  ],
  [
    "man-of-war",
    "medusa",
    "medusan",
    "portuguese man-of-war",
    "jellyfish"
  ],
  [
    "seacucumber"
  ],
  [
    "urchinspine"
  ],
  [
    "seaweed"
  ],
  [
    "tidepool"
  ],
  [
    "mantaray"
  ],
  [
    "usurer",
    "loan shark",
    "moneylender",
    "shark"
  ],
  [
    "hulk",
    "heavyweight",
    "giant",
    "whale"
  ],
  [
    "calamary",
    "calamari",
    "squid"
  ],
  [
    "devilfish",
    "octopus"
  ],
  [
    "argonauta argo",
    "paper nautilus",
    "chambered nautilus",
    "pearly nautilus",
    "nuclear-powered submarine",
    "nautilus"
  ],
  [
    "mollusc",
    "shellfish",
    "mollusk"
  ],
  [
    "crustacean"
  ],
  [
    "seasnake"
  ],
  [
    "cachet",
    "stamp",
    "varnish",
    "sealskin",
    "sealing wax",
    "seal of approval",
    "seal off",
    "seal"
  ],
  [
    "trichechus manatus",
    "manatee"
  ],
  [
    "sealion"
  ],
  [
    "sailfish"
  ],
  [
    "tunny",
    "opuntia tuna",
    "tuna fish",
    "anguilla sucklandii",
    "tuna"
  ],
  [
    "anchovy"
  ],
  [
    "pilchard",
    "sard",
    "sardius",
    "sardina pilchardus",
    "sardine"
  ],
  [
    "clupea harangus",
    "herring"
  ],
  [
    "mackerel"
  ],
  [
    "angler",
    "monkfish",
    "lotte",
    "goosefish",
    "allmouth",
    "angler fish",
    "lophius americanus",
    "anglerfish"
  ],
  [
    "lionfish"
  ],
  [
    "coralreef"
  ],
  [
    "kelpforest"
  ],
  [
    "seagrassmeadow"
  ],
  [
    "plankton"
  ],
  [
    "zooplankton"
  ],
  [
    "phytoplankton"
  ],
  [
    "seaurchinlarva"
  ],
  [
    "tidalflat"
  ],
  [
    "rockyshore"
  ],
  [
    "sand bar",
    "sandbar"
  ],
  [
    "reeffish"
  ],
  [
    "clambed"
  ],
  [
    "molluskshell"
  ],
  [
    "coralpolyp"
  ],
  [
    "seaspongecolony"
  ],
  [
    "marineworm"
  ],
  [
    "seaotter"
  ],
  [
    "krill"
  ],
  [
    "cuttle",
    "cuttlefish"
  ],
  [
    "seastarlarva"
  ],
  [
    "seafoam"
  ],
  [
    "surge",
    "lunar time period",
    "tide"
  ],
  [
    "oceancurrent"
  ],
  [
    "estuaries"
  ],
  [
    "seamount"
  ],
  [
    "abyssalplain"
  ],
  [
    "deepseavent"
  ],
  [
    "copepod crustacean",
    "copepod"
  ],
  [
    "krilllarva"
  ],
  [
    "diatom"
  ],
  [
    "radiolarian"
  ],
  [
    "foram",
    "foraminifer"
  ],
  [
    "phyllosoma"
  ],
  [
    "amphipod"
  ],
  [
    "isopod"
  ],
  [
    "polychaeteworm"
  ],
  [
    "urochordate",
    "urochord",
    "tunicate"
  ],
  [
    "salpa",
    "salp"
  ],
  [
    "larvacean"
  ],
  [
    "hydroid",
    "hydrozoan"
  ],
  [
    "scyphozoan"
  ],
  [
    "cubozoan"
  ],
  [
    "combjelly"
  ],
  [
    "seapen"
  ],
  [
    "softcoral"
  ],
  [
    "gorgonian coral",
    "gorgonian"
  ],
  [
    "blackcoral"
  ],
  [
    "stonycoral"
  ],
  [
    "tubeworm"
  ],
  [
    "bristleworm"
  ],
  [
    "pearloyster"
  ],
  [
    "giantclam"
  ],
  [
    "whelk"
  ],
  [
    "limpet"
  ],
  [
    "murex"
  ],
  [
    "whelkshell"
  ],
  [
    "seacucumberlarva"
  ],
  [
    "sealily"
  ],
  [
    "featherstar"
  ],
  [
    "brittlestar"
  ],
  [
    "seaurchinspinelarva"
  ],
  [
    "urchintest"
  ],
  [
    "seaspider"
  ],
  [
    "sea spider",
    "pycnogonid"
  ],
  [
    "barnaclelarva"
  ],
  [
    "lancelet",
    "amphioxus"
  ],
  [
    "amphioxus",
    "lancelet"
  ],
  [
    "hag",
    "slime eels",
    "hagfish"
  ],
  [
    "lamper eel",
    "lamprey eel",
    "lamprey"
  ],
  [
    "hagfishslime"
  ],
  [
    "oceanicwhitetipshark"
  ],
  [
    "greatwhiteshark"
  ],
  [
    "hammerheadshark"
  ],
  [
    "baskingshark"
  ],
  [
    "whaleshark"
  ],
  [
    "porpoise"
  ],
  [
    "narwal",
    "narwhale",
    "monodon monoceros",
    "narwhal"
  ],
  [
    "belugawhale"
  ],
  [
    "bluewhale"
  ],
  [
    "spermwhale"
  ],
  [
    "killer",
    "grampus",
    "sea wolf",
    "killer whale",
    "orcinus orca",
    "orca"
  ],
  [
    "minkewhale"
  ],
  [
    "seaotterpup"
  ],
  [
    "sealionpup"
  ],
  [
    "sealpup"
  ],
  [
    "manateecalf"
  ],
  [
    "dolphincalf"
  ],
  [
    "pilotwhale"
  ],
  [
    "narwhalcalf"
  ],
  [
    "seaice"
  ],
  [
    "brinepool"
  ],
  [
    "underwatervolcano"
  ],
  [
    "submarinecanyon"
  ],
  [
    "hydrothermalvent"
  ],
  [
    "coldseep"
  ],
  [
    "abyssopelagiczone"
  ],
  [
    "bathypelagiczone"
  ],
  [
    "mesopelagiczone"
  ],
  [
    "epipelagiczone"
  ],
  [
    "neriticzone"
  ],
  [
    "intertidalzone"
  ],
  [
    "continentalshelf"
  ],
  [
    "abyssaltrench"
  ],
  [
    "submarineridge"
  ],
  [
    "atoll"
  ],
  [
    "lagune",
    "laguna",
    "lagoon"
  ],
  [
    "seagrassbed"
  ],
  [
    "rockyreef"
  ],
  [
    "kelpbed"
  ],
  [
    "floatingalgaemat"
  ],
  [
    "oceangyre"
  ],
  [
    "thermocline"
  ],
  [
    "halocline"
  ],
  [
    "upwelling"
  ],
  [
    "marinesnow"
  ],
  [
    "debris",
    "junk",
    "rubble",
    "dust",
    "detritus"
  ],
  [
    "planktonbloom"
  ],
  [
    "gulfweed",
    "sargassum bacciferum",
    "sargasso",
    "sargassum"
  ],
  [
    "redalgae"
  ],
  [
    "greenalgae"
  ],
  [
    "brownalgae"
  ],
  [
    "macroalgae"
  ],
  [
    "microalgae"
  ],
  [
    "sealettuce"
  ],
  [
    "tease",
    "fool",
    "twit",
    "rally",
    "ride",
    "dupe",
    "take in",
    "bait",
    "collect",
    "tantalize",
    "slang",
    "due",
    "gull",
    "put on",
    "pod",
    "owed",
    "befool",
    "codfish",
    "cash on delivery",
    "seedcase",
    "put one across",
    "put one over",
    "rag",
    "taunt",
    "cod"
  ],
  [
    "melanogrammus aeglefinus",
    "haddock"
  ],
  [
    "pollachius pollachius",
    "pollack",
    "pollock"
  ],
  [
    "holibut",
    "halibut"
  ],
  [
    "stagger",
    "flounder"
  ],
  [
    "solitary",
    "exclusive",
    "only",
    "lone",
    "lonesome",
    "resole",
    "fillet of sole",
    "sole"
  ],
  [
    "grouper"
  ],
  [
    "common snapping turtle",
    "chelydra serpentina",
    "cracker bonbon",
    "chrysophrys auratus",
    "cracker",
    "snapper"
  ],
  [
    "morayeel"
  ],
  [
    "needlefish",
    "pipefish"
  ],
  [
    "walrus",
    "sea horse",
    "seahorse"
  ],
  [
    "flyingfish"
  ],
  [
    "anglerfishlarva"
  ],
  [
    "lionfishjuvenile"
  ],
  [
    "blast",
    "pass",
    "complete",
    "apprehend",
    "arrest",
    "smash",
    "collar",
    "boom",
    "peg",
    "nail down",
    "nab",
    "make it",
    "cop",
    "pick up",
    "nail"
  ],
  ["be covered, be closed, be stopped up, close, heal, be stuffy, be close, choke, suffocate, be asphyxiated"],
  ["become, change, change into, happen, occur, take place, arrive, pass, be, exist, constitute, represent, able, be possible, suitable, fitting, succeed, be successful, ripen, mature, become cooked, become immune, comply with, yield, acquiesce in, obey"],
  [
    "epithet",
    "constitute",
    "call",
    "key",
    "identify",
    "figure",
    "make",
    "render",
    "regard",
    "count as",
    "describe",
    "advert",
    "distinguish",
    "refer",
    "appoint",
    "cite",
    "mention",
    "bring up",
    "nominate",
    "key out",
    "diagnose",
    "discover",
    "gens",
    "list",
    "name"
  ],
  [
    "omphalos",
    "umbilicus",
    "omphalus",
    "bellybutton",
    "navel point",
    "navel"
  ],
  [
    "cervix",
    "make out",
    "neck"
  ],
  [
    "necklace"
  ],
  [
    "close",
    "near",
    "neighboring",
    "neighbor",
    "neighbouring",
    "neighbour"
  ],
  [
    "nest"
  ],
  [
    "clear",
    "ultimate",
    "last",
    "sack",
    "lucre",
    "network",
    "mesh",
    "nett",
    "final",
    "profits",
    "earnings",
    "reticulation",
    "meshwork",
    "net income",
    "net profit",
    "sack up",
    "take-home",
    "profit",
    "web",
    "net"
  ],
  [
    "dark",
    "nighttime",
    "nox",
    "night"
  ],
  [
    "pap",
    "teat",
    "mamilla",
    "mammilla",
    "nipple"
  ],
  [
    "noontide",
    "high noon",
    "midday",
    "noonday",
    "twelve noon",
    "noon"
  ],
  [
    "scent",
    "poke",
    "nuzzle",
    "wind",
    "nozzle",
    "olfactory organ",
    "pry",
    "nose"
  ],
  [
    "pass",
    "nick",
    "scratch",
    "incision",
    "dent",
    "mountain pass",
    "slit",
    "snick",
    "notch"
  ],
  [
    "crank",
    "ball",
    "gonad",
    "bollock",
    "testicle",
    "fruitcake",
    "screwball",
    "ballock",
    "testis",
    "nutcase",
    "crackpot",
    "egg",
    "en",
    "nut"
  ],
  [
    "oar"
  ],
  [
    "curse",
    "expletive",
    "cuss",
    "vow",
    "swearword",
    "curse word",
    "swearing",
    "oath"
  ],
  [
    "allium cepa",
    "onion plant",
    "onion"
  ],
  [
    "line",
    "stock",
    "source",
    "root",
    "inception",
    "descent",
    "pedigree",
    "extraction",
    "origination",
    "lineage",
    "beginning",
    "ancestry",
    "parentage",
    "bloodline",
    "blood line",
    "line of descent",
    "blood",
    "genesis",
    "origin"
  ],
  [
    "orphaned",
    "parentless",
    "unparented",
    "orphan"
  ],
  [
    "otter"
  ],
  [
    "oven"
  ],
  [
    "wild ox",
    "ox"
  ],
  [
    "varlet",
    "pageboy",
    "page"
  ],
  [
    "handle",
    "ribbon",
    "medallion",
    "laurel wreath",
    "decoration",
    "palm tree",
    "medal",
    "palm"
  ],
  [
    "paternalkinsman"
  ],
  [
    "track",
    "course",
    "route",
    "way",
    "way of life",
    "path"
  ],
  [
    "hook",
    "hand",
    "mitt",
    "mauler",
    "manus",
    "paw"
  ],
  [
    "pea plant",
    "pea"
  ],
  [
    "pebble"
  ],
  [
    "stick",
    "nail",
    "pin",
    "nail down",
    "oarlock",
    "leg",
    "wooden leg",
    "peg down",
    "rowlock",
    "pegleg",
    "tholepin",
    "nog",
    "thole",
    "peg"
  ],
  [
    "superficial",
    "open",
    "rise",
    "show up",
    "grade",
    "come on",
    "come out",
    "skin-deep",
    "come up",
    "surficial",
    "airfoil",
    "aerofoil",
    "turn up",
    "aboveground",
    "rise up",
    "opencast",
    "control surface",
    "opencut",
    "grade-constructed",
    "ground-level",
    "coat",
    "surface"
  ],
  [
    "acerbic",
    "caustic",
    "virulent",
    "acrid",
    "vitriolic",
    "venomous",
    "unpleasant",
    "acerb",
    "bitter",
    "sulfurous",
    "blistering",
    "sulphurous",
    "acidic",
    "lysergic acid diethylamide",
    "lsd",
    "acid"
  ],
  [
    "supported",
    "pendent",
    "dangling",
    "hanging",
    "chandelier",
    "suspended",
    "pendant"
  ],
  [
    "member",
    "phallus",
    "penis"
  ],
  [
    "light",
    "rest",
    "alight",
    "roost",
    "pole",
    "rod",
    "perch"
  ],
  [
    "soul",
    "individual",
    "mortal",
    "somebody",
    "someone",
    "human",
    "person"
  ],
  [
    "specter",
    "apparition",
    "spectre",
    "unreal",
    "shadow",
    "phantom"
  ],
  [
    "piece",
    "cream",
    "choice",
    "clean",
    "peck",
    "plunk",
    "pluck",
    "foot",
    "selection",
    "cull",
    "woof",
    "break up",
    "nibble",
    "blame",
    "beak",
    "weft",
    "filling",
    "plectron",
    "picking",
    "find fault",
    "plectrum",
    "pickaxe",
    "pickax",
    "pick"
  ],
  [
    "guttle",
    "devour",
    "raven",
    "gulp",
    "bull",
    "fuzz",
    "hog",
    "slob",
    "copper",
    "sloven",
    "cop",
    "slovenly person",
    "pig bed",
    "sus scrofa",
    "pig it",
    "farrow",
    "pig"
  ],
  ["adopt", "foster", "rear", "raise", "cultivate"],
  ["hold", "grasp", "grip", "take", "seize", "catch", "arrest", "harbor feelings", "keep a vow", "build", "construct", "set up", "establish", "steer", "drive", "control", "rule", "present", "offer", "submit", "shape", "model", "mold", "make", "take", "grasp", "get hold of", "receive", "obtain", "gain", "procure", "acquire", "collect", "buy", "absorb", "draw in", "adopt", "conceive"],
  ["becalm", "soothe", "cheer up", "relieve"],
  ["rest", "relax", "feel contentment", "feel joy", "be relieved"],
  ["hear", "listen", "obey", "yield to advice", "defer"],
  ["come to a boil", "bubble up"],
  ["become saturated", "be filled", "satiate oneself", "eat one’s fill", "maturate", "ripen"],
  ["melt", "thaw", "change", "be corrected", "be instructed", "convert"],
  ["rise", "stand up", "revolt", "rise in arms", "flee", "desert", "become a revenant"],
  ["die", "be wasted", "be squandered", "be destroyed", "be exterminated", "perish", "be ruined", "wither"],
  ["lose, let go, drop, lose control of, do something by mistake or by accident, make a slip"],
  ["gather", "accumulate", "assemble", "pile up", "build up"],
  ["suffer", "worry", "grieve", "be tortured", "be tormented", "be in trouble"],
  [
    "shoat",
    "piggy",
    "piglet"
  ],
  ["go about", "circle", "surround", "encompass", "circumvent", "detour", "circumabulate", "tour", "roll"],
  [
    "throughway",
    "freeway",
    "motorway",
    "thruway",
    "expressway",
    "superhighway",
    "state highway",
    "pike"
  ],
  [
    "tower",
    "mainstay",
    "column",
    "pillar"
  ],
  [
    "ankle joint",
    "mortise joint",
    "articulatio talocruralis",
    "ankle"
  ],
  [
    "trap",
    "pivot",
    "fall",
    "stick",
    "peg",
    "flag",
    "immobilize",
    "oarlock",
    "pin down",
    "pin up",
    "rowlock",
    "tholepin",
    "bowling pin",
    "thole",
    "pin"
  ],
  [
    "mark",
    "quarry",
    "cavity",
    "stone",
    "oppose",
    "fossa",
    "match",
    "pitfall",
    "scar",
    "pock",
    "colliery",
    "orchestra pit",
    "stone pit",
    "pit"
  ],
  [
    "base",
    "order",
    "set",
    "direct",
    "point",
    "range",
    "position",
    "pose",
    "berth",
    "space",
    "identify",
    "rank",
    "post",
    "office",
    "home",
    "spot",
    "station",
    "situation",
    "lay",
    "put",
    "commit",
    "rate",
    "slot",
    "lieu",
    "invest",
    "send",
    "site",
    "grade",
    "seat",
    "locate",
    "come out",
    "come in",
    "localize",
    "shoes",
    "blank space",
    "topographic point",
    "aim",
    "piazza",
    "plaza",
    "property",
    "stead",
    "target",
    "place"
  ],
  [
    "plump",
    "plop",
    "plunk",
    "flump",
    "board",
    "plonk",
    "plunk down",
    "plump down",
    "plank over",
    "plank"
  ],
  [
    "turn",
    "plow",
    "dipper",
    "big dipper",
    "plough"
  ],
  [
    "verse form",
    "poem"
  ],
  [
    "versifier",
    "poet"
  ],
  [
    "charge",
    "indicate",
    "show",
    "direct",
    "head",
    "level",
    "bespeak",
    "maneuver",
    "stage",
    "peak",
    "steer",
    "period",
    "spot",
    "taper",
    "betoken",
    "tip",
    "item",
    "signal",
    "stop",
    "detail",
    "dot",
    "sharpen",
    "point in time",
    "manouevre",
    "pointedness",
    "luff",
    "full stop",
    "gunpoint",
    "power point",
    "compass point",
    "repoint",
    "full point",
    "distributor point",
    "aim",
    "breaker point",
    "degree",
    "guide",
    "orient",
    "place",
    "target",
    "point"
  ],
  [
    "terminal",
    "perch",
    "punt",
    "celestial pole",
    "magnetic pole",
    "rod",
    "pole"
  ],
  [
    "fitch",
    "foulmart",
    "foumart",
    "wood pussy",
    "mustela putorius",
    "skunk",
    "polecat"
  ],
  [
    "consortium",
    "syndicate",
    "kitty",
    "puddle",
    "pocket billiards",
    "combine",
    "pond",
    "pool"
  ],
  [
    "base",
    "position",
    "berth",
    "office",
    "brand",
    "spot",
    "station",
    "situation",
    "stake",
    "slot",
    "send",
    "mail",
    "put up",
    "postal service",
    "military post",
    "place",
    "post"
  ],
  [
    "slew",
    "spate",
    "mass",
    "pile",
    "deal",
    "mint",
    "batch",
    "peck",
    "sight",
    "gage",
    "mess",
    "potty",
    "heap",
    "corporation",
    "wad",
    "flock",
    "weed",
    "stack",
    "lot",
    "grass",
    "raft",
    "plenty",
    "kitty",
    "bay window",
    "sess",
    "throne",
    "stool",
    "commode",
    "dope",
    "cannabis",
    "mary jane",
    "tummy",
    "crapper",
    "great deal",
    "whole slew",
    "toilet",
    "ganja",
    "flowerpot",
    "good deal",
    "whole lot",
    "marijuana",
    "potbelly",
    "potentiometer",
    "potful",
    "marihuana",
    "hatful",
    "quite a little",
    "tidy sum",
    "mary-jane",
    "can",
    "cannabis sativa",
    "jackpot",
    "mickle",
    "muckle",
    "sens",
    "skunk",
    "smoke",
    "pot"
  ],
  [
    "tater",
    "murphy",
    "white potato",
    "white potato vine",
    "irish potato",
    "solanum tuberosum",
    "spud",
    "potato"
  ],
  [
    "supplication",
    "orison",
    "appeal",
    "petition",
    "entreaty",
    "supplicant",
    "communion",
    "prayer"
  ],
  [
    "non-christian priest",
    "priest"
  ],
  [
    "damage",
    "terms",
    "cost",
    "monetary value",
    "toll",
    "price"
  ],
  [
    "esteem",
    "fine",
    "prime",
    "value",
    "quality",
    "appreciate",
    "respect",
    "choice",
    "plunder",
    "swag",
    "trophy",
    "prise",
    "booty",
    "treasure",
    "loot",
    "award",
    "lever",
    "pillage",
    "jimmy",
    "pry",
    "select",
    "superior",
    "prize"
  ],
  [
    "trouble",
    "job",
    "problem"
  ],
  [
    "project",
    "expulsion",
    "jutting",
    "protrusion",
    "protuberance",
    "ejection",
    "forcing out",
    "jut",
    "projection"
  ],
  [
    "adage",
    "byword",
    "saw",
    "proverb"
  ],
  [
    "pup",
    "puppy"
  ],
  [
    "leverage",
    "buy",
    "purchase"
  ],
  [
    "run",
    "rush",
    "hie",
    "wash",
    "slipstream",
    "backwash",
    "speed",
    "hotfoot",
    "airstream",
    "pelt along",
    "subspecies",
    "raceway",
    "belt along",
    "bucket along",
    "cannonball along",
    "rush along",
    "hasten",
    "race"
  ],
  [
    "horsebit"
  ],
  [
    "rebuke",
    "reprimand",
    "chide",
    "torment",
    "berate",
    "scold",
    "cod",
    "check",
    "tease",
    "twit",
    "remonstrate",
    "rally",
    "lecture",
    "ride",
    "nettle",
    "vex",
    "reproof",
    "bait",
    "tantalize",
    "lambaste",
    "nark",
    "lambast",
    "tag",
    "gravel",
    "shred",
    "bother",
    "frustrate",
    "jaw",
    "irritate",
    "annoy",
    "rile",
    "have words",
    "dun",
    "sheet",
    "tabloid",
    "crucify",
    "bedevil",
    "chew out",
    "bawl out",
    "dress down",
    "tatter",
    "get to",
    "chew up",
    "ragtime",
    "get at",
    "tag end",
    "devil",
    "taunt",
    "rag"
  ],
  [
    "drive",
    "run",
    "cram",
    "pound",
    "crash",
    "jam",
    "wad",
    "pack",
    "tup",
    "random access memory",
    "random-access memory",
    "jampack",
    "chock up",
    "ram down",
    "random memory",
    "force",
    "ram"
  ],
  [
    "ravine"
  ],
  [
    "razor"
  ],
  [
    "domain",
    "land",
    "region",
    "kingdom",
    "realm"
  ],
  [
    "beating-reed instrument",
    "walter reed",
    "reed"
  ],
  [
    "peat"
  ],
  [
    "sphagnummoss"
  ],
  [
    "carnivorousplant"
  ],
  [
    "pitcherplant"
  ],
  [
    "daily dew",
    "sundew plant",
    "sundew"
  ],
  [
    "bladderwort"
  ],
  [
    "bogrosemary"
  ],
  [
    "cottongrass"
  ],
  [
    "cranberry"
  ],
  [
    "bogorchid"
  ],
  [
    "buckbean",
    "bog myrtle",
    "marsh trefoil",
    "water shamrock",
    "menyanthes trifoliata",
    "bogbean"
  ],
  [
    "marshfern"
  ],
  [
    "bogturtle"
  ],
  [
    "elk",
    "alces alces",
    "european elk",
    "moose"
  ],
  [
    "bittern"
  ],
  [
    "mosquito"
  ],
  [
    "cranefly"
  ],
  [
    "morass",
    "quagmire",
    "muck up",
    "entangle",
    "bog down",
    "get stuck",
    "muck",
    "mud",
    "mire"
  ],
  [
    "marshland",
    "marsh",
    "fen"
  ],
  [
    "quakingbog"
  ],
  [
    "bogpool"
  ],
  [
    "peatland"
  ],
  [
    "cattail"
  ],
  [
    "induce",
    "surge",
    "flush",
    "charge",
    "bang",
    "thrill",
    "stimulate",
    "spate",
    "race",
    "upsurge",
    "kick",
    "rushed",
    "hurry",
    "hie",
    "speed",
    "hotfoot",
    "unreserved",
    "rushing",
    "look sharp",
    "pelt along",
    "belt along",
    "bucket along",
    "cannonball along",
    "rush along",
    "first-come-first-serve",
    "haste",
    "hasten",
    "rush"
  ],
  [
    "sedges"
  ],
  [
    "sedgewarbler"
  ],
  [
    "marshmarigold"
  ],
  [
    "fenorchid"
  ],
  [
    "bogfritillary"
  ],
  [
    "boghoverfly"
  ],
  [
    "bogant"
  ],
  [
    "bogspider"
  ],
  [
    "chamaedaphne calyculata",
    "coast polypody",
    "leathery polypody",
    "polypodium scouleri",
    "leatherleaf"
  ],
  [
    "boglaurel"
  ],
  [
    "cranberrybog"
  ],
  [
    "bogasphodel"
  ],
  [
    "peatmoss"
  ],
  [
    "bogcotton"
  ],
  [
    "fenland"
  ],
  [
    "flood",
    "inundate",
    "drench",
    "deluge",
    "swamp"
  ],
  [
    "waterrail"
  ],
  [
    "bitternreed"
  ],
  [
    "bogtoad"
  ],
  [
    "moorfrog"
  ],
  [
    "boglichen"
  ],
  [
    "relative",
    "coitus",
    "copulation",
    "sexual intercourse",
    "coition",
    "recounting",
    "sexual congress",
    "sexual relation",
    "telling",
    "sex act",
    "carnal knowledge",
    "congress",
    "intercourse",
    "relation"
  ],
  [
    "kinship",
    "family relationship",
    "human relationship",
    "relationship"
  ],
  [
    "round",
    "beat",
    "cycle",
    "calendar method",
    "rhythm method",
    "speech rhythm",
    "musical rhythm",
    "regular recurrence",
    "rhythm method of birth control",
    "calendar method of birth control",
    "rhythm"
  ],
  [
    "ridicule",
    "blackguard",
    "guy",
    "laugh at",
    "poke fun",
    "jest at",
    "make fun",
    "costa",
    "rib"
  ],
  [
    "resound",
    "echo",
    "call",
    "reverberate",
    "band",
    "peal",
    "round",
    "environ",
    "circle",
    "annulus",
    "surround",
    "encircle",
    "gang",
    "ringing",
    "pack",
    "hoop",
    "tintinnabulation",
    "doughnut",
    "anulus",
    "phone",
    "call up",
    "anchor ring",
    "telephone",
    "closed chain",
    "halo",
    "knell",
    "mob",
    "ring"
  ],
  [
    "river"
  ],
  [
    "riverside",
    "riverbank"
  ],
  [
    "flow",
    "pelt",
    "swarm",
    "pour",
    "watercourse",
    "rain buckets",
    "rain cats and dogs",
    "well out",
    "current",
    "stream"
  ],
  [
    "abide",
    "endure",
    "stand",
    "stomach",
    "suffer",
    "tolerate",
    "creek",
    "put up",
    "bear",
    "brook"
  ],
  [
    "brook",
    "creek"
  ],
  [
    "affluent",
    "secondary",
    "feeder",
    "tributary"
  ],
  [
    "delta"
  ],
  [
    "rapids"
  ],
  [
    "cascade",
    "cataract",
    "falls",
    "waterfall"
  ],
  [
    "undulate",
    "ruffle",
    "ripple",
    "flick",
    "cockle",
    "riff",
    "thumb",
    "wavelet",
    "leaf",
    "rippling",
    "flip",
    "riffle"
  ],
  [
    "oxbowlake"
  ],
  [
    "floodplain"
  ],
  [
    "divide",
    "water parting",
    "watershed"
  ],
  [
    "riparianzone"
  ],
  [
    "alluvialsoil"
  ],
  [
    "beaverdam"
  ],
  [
    "watervole"
  ],
  [
    "kingfisher"
  ],
  [
    "heron"
  ],
  [
    "trout"
  ],
  [
    "salmon river",
    "salmon"
  ],
  [
    "mudcat",
    "wolffish",
    "wolf fish",
    "siluriform fish",
    "catfish"
  ],
  [
    "crawfish",
    "ecrevisse",
    "crawdad",
    "spiny lobster",
    "langouste",
    "rock lobster",
    "crawdaddy",
    "sea crawfish",
    "crayfish"
  ],
  [
    "freshwatermussel"
  ],
  [
    "waterlily"
  ],
  [
    "reeds"
  ],
  [
    "alga",
    "algae"
  ],
  [
    "hitch",
    "rub",
    "hang-up",
    "snag"
  ],
  [
    "bankerosion"
  ],
  [
    "high",
    "torrent",
    "swamp",
    "inundate",
    "overflow",
    "floodlight",
    "outpouring",
    "oversupply",
    "photoflood",
    "flood lamp",
    "deluge",
    "inundation",
    "flood"
  ],
  [
    "silt up",
    "silt"
  ],
  [
    "gravelbar"
  ],
  [
    "thread",
    "weave",
    "wind",
    "meander"
  ],
  [
    "recoil",
    "give",
    "form",
    "rebound",
    "bounce",
    "jump",
    "leap",
    "ricochet",
    "take form",
    "outpouring",
    "take shape",
    "springtime",
    "outflow",
    "springiness",
    "leaping",
    "take a hop",
    "bound",
    "fountain",
    "natural spring",
    "spring"
  ],
  [
    "aquaticinsect"
  ],
  [
    "dragonflylarva"
  ],
  [
    "dayfly",
    "shadfly",
    "mayfly"
  ],
  [
    "caddis fly",
    "caddice fly",
    "caddicefly",
    "caddisfly"
  ],
  [
    "waterstrider"
  ],
  [
    "freshwatershrimp"
  ],
  [
    "floatinglog"
  ],
  [
    "ripariantree"
  ],
  [
    "white basswood",
    "tilia heterophylla",
    "cottonwood"
  ],
  [
    "moving",
    "route",
    "traveling",
    "touring",
    "itinerant",
    "road"
  ],
  [
    "careen",
    "tilt",
    "stone",
    "cradle",
    "shake",
    "rock and roll",
    "rock candy",
    "rock music",
    "sway",
    "rock"
  ],
  [
    "perch",
    "gat",
    "rod cell",
    "retinal rod",
    "pole",
    "rod"
  ],
  [
    "cast",
    "seethe",
    "undulate",
    "wrap",
    "peal",
    "coil",
    "hustle",
    "whorl",
    "gyre",
    "curl",
    "pluck",
    "wind",
    "scroll",
    "revolve",
    "curlicue",
    "gyration",
    "rotation",
    "roller",
    "ringlet",
    "roster",
    "rolling",
    "roll out",
    "turn over",
    "pealing",
    "wheel",
    "paradiddle",
    "bankroll",
    "drum roll",
    "rolling wave",
    "bun",
    "revolution",
    "roll"
  ],
  [
    "roof"
  ],
  [
    "cant",
    "trust",
    "deposit",
    "swear",
    "money box",
    "rely",
    "banking company",
    "savings bank",
    "depository financial institution",
    "bank building",
    "banking concern",
    "camber",
    "coin bank",
    "bank"
  ],
  [
    "debt"
  ],
  [
    "way",
    "board",
    "elbow room",
    "room"
  ],
  [
    "rooster"
  ],
  [
    "base",
    "radical",
    "rout",
    "source",
    "stem",
    "basic",
    "theme",
    "solution",
    "side",
    "beginning",
    "rootle",
    "tooth root",
    "root word",
    "origin",
    "root"
  ],
  [
    "path",
    "road",
    "route"
  ],
  [
    "course",
    "wrangle",
    "quarrel",
    "dustup",
    "words",
    "rowing",
    "run-in",
    "row"
  ],
  [
    "carpet",
    "carpeting",
    "rug"
  ],
  [
    "principle",
    "convention",
    "prevail",
    "pattern",
    "dominate",
    "decree",
    "harness",
    "reign",
    "normal",
    "predominate",
    "regulation",
    "find",
    "prescript",
    "govern",
    "formula",
    "ruler",
    "linguistic rule",
    "dominion",
    "rein",
    "rule"
  ],
  [
    "sweep",
    "voyage",
    "canvas",
    "navigate",
    "sheet",
    "canvass",
    "cruise",
    "sail"
  ],
  [
    "skimmer",
    "boater",
    "crewman",
    "straw hat",
    "panama",
    "leghorn",
    "bluejacket",
    "sailor boy",
    "navy man",
    "sailor"
  ],
  [
    "transport",
    "send",
    "ship"
  ],
  [
    "mast"
  ],
  [
    "rudder"
  ],
  [
    "ground",
    "linchpin",
    "lynchpin",
    "backbone",
    "mainstay",
    "cast anchor",
    "anchorman",
    "anchorperson",
    "ground tackle",
    "drop anchor",
    "anchor"
  ],
  [
    "helm"
  ],
  [
    "embellish",
    "adorn",
    "floor",
    "dump",
    "decorate",
    "beautify",
    "bedight",
    "coldcock",
    "knock down",
    "bedeck",
    "deck of cards",
    "pack of cards",
    "grace",
    "deck"
  ],
  [
    "hull"
  ],
  [
    "austere",
    "inexorable",
    "grim",
    "relentless",
    "butt",
    "ass",
    "exacting",
    "implacable",
    "bum",
    "prat",
    "poop",
    "unrelenting",
    "bottom",
    "demanding",
    "tail",
    "strict",
    "arse",
    "unforgiving",
    "quarter",
    "fundament",
    "keister",
    "rear",
    "derriere",
    "rump",
    "backside",
    "behind",
    "tush",
    "unappeasable",
    "posterior",
    "seat",
    "buttocks",
    "nonindulgent",
    "fanny",
    "buns",
    "tail end",
    "rear end",
    "hindquarters",
    "tooshie",
    "hind end",
    "after part",
    "can",
    "stern"
  ],
  [
    "interface",
    "left",
    "embrasure",
    "porthole",
    "larboard",
    "port wine",
    "port"
  ],
  [
    "right",
    "starboard"
  ],
  [
    "crowsnest"
  ],
  [
    "tackle",
    "rig",
    "rigging"
  ],
  [
    "capstan"
  ],
  [
    "front",
    "straw man",
    "front man",
    "nominal head",
    "figurehead"
  ],
  [
    "ambit",
    "comprehend",
    "range",
    "scope",
    "reach",
    "apprehend",
    "savvy",
    "dig",
    "orbit",
    "circumnavigate",
    "get the picture",
    "grasp",
    "compass"
  ],
  [
    "sextant"
  ],
  [
    "logbook"
  ],
  [
    "load",
    "freight",
    "consignment",
    "payload",
    "lading",
    "shipment",
    "loading",
    "cargo"
  ],
  [
    "bunch",
    "crowd",
    "gang",
    "work party",
    "crew"
  ],
  [
    "sailing master",
    "navigator"
  ],
  [
    "portolanchart"
  ],
  [
    "shipwright"
  ],
  [
    "bilge water",
    "take in water",
    "bilge"
  ],
  [
    "lurch",
    "stagger",
    "careen",
    "swag",
    "reel",
    "keel"
  ],
  [
    "bow",
    "stem",
    "fore",
    "prow"
  ],
  [
    "crowsnest"
  ],
  [
    "schooner"
  ],
  [
    "brig"
  ],
  [
    "guided missile frigate",
    "frigate"
  ],
  [
    "galleon"
  ],
  [
    "longboat"
  ],
  [
    "crowsnest"
  ],
  [
    "voyage",
    "pilot",
    "sail",
    "navigate"
  ],
  [
    "bob",
    "tail",
    "wharf",
    "bobtail",
    "wharfage",
    "dockage",
    "sour grass",
    "docking facility",
    "sorrel",
    "dock"
  ],
  [
    "establish",
    "mount",
    "set up",
    "plunge",
    "found",
    "set in motion",
    "launching",
    "launch"
  ],
  [
    "berth",
    "moorland",
    "moor"
  ],
  [
    "trimsails"
  ],
  [
    "shroud",
    "sheet",
    "saddlery",
    "tacking",
    "stable gear",
    "mainsheet",
    "wear ship",
    "weather sheet",
    "tack"
  ],
  [
    "fit",
    "check",
    "dig",
    "slam",
    "barb",
    "match",
    "tally",
    "shot",
    "gybe",
    "correspond",
    "agree",
    "jib",
    "change course",
    "gibe",
    "shaft",
    "jibe"
  ],
  [
    "weighanchor"
  ],
  [
    "bark",
    "barque"
  ],
  [
    "clippers",
    "limiter",
    "clipper ship",
    "clipper"
  ],
  [
    "carver",
    "cutlery",
    "cutting tool",
    "stone cutter",
    "cutter"
  ],
  [
    "dhow"
  ],
  [
    "racing yacht",
    "yacht"
  ],
  [
    "ketch"
  ],
  [
    "sloop"
  ],
  [
    "detritus",
    "debris",
    "horse",
    "scag",
    "rubble",
    "dust",
    "heroin",
    "diacetyl morphine",
    "h",
    "scrap",
    "smack",
    "trash",
    "junk"
  ],
  [
    "ferrying",
    "ferryboat",
    "ferry"
  ],
  [
    "skiff"
  ],
  [
    "flourish",
    "expand",
    "blast",
    "smash",
    "thunder",
    "roar",
    "nail",
    "thrive",
    "roaring",
    "bonanza",
    "get ahead",
    "goldmine",
    "manna from heaven",
    "boom out",
    "microphone boom",
    "din",
    "prosper",
    "boom"
  ],
  [
    "cleat"
  ],
  [
    "hawse",
    "hawsehole",
    "hawsepipe"
  ],
  [
    "bitts"
  ],
  [
    "focsle"
  ],
  [
    "poopdeck"
  ],
  [
    "forecastle"
  ],
  [
    "stool",
    "cultivator",
    "tiller"
  ],
  [
    "iron",
    "chain",
    "irons",
    "chains"
  ],
  [
    "set",
    "set up",
    "carriage",
    "manipulate",
    "outfit",
    "equipage",
    "getup",
    "rigging",
    "rig"
  ],
  [
    "spars"
  ],
  [
    "shrouds"
  ],
  [
    "spinnaker"
  ],
  [
    "jibe",
    "baulk",
    "resist",
    "gybe",
    "change course",
    "balk",
    "jib"
  ],
  [
    "mainsail"
  ],
  [
    "topsail"
  ],
  [
    "staysail"
  ],
  [
    "reef"
  ],
  [
    "halliard",
    "halyard"
  ],
  [
    "shroud",
    "tack",
    "plane",
    "canvas",
    "sail",
    "canvass",
    "tabloid",
    "bed sheet",
    "sheet of paper",
    "mainsheet",
    "piece of paper",
    "weather sheet",
    "flat solid",
    "rag",
    "sheet"
  ],
  [
    "delineate",
    "trace",
    "strain",
    "draw",
    "furrow",
    "demarcation",
    "outline",
    "channel",
    "stock",
    "air",
    "contrast",
    "course",
    "describe",
    "descent",
    "pedigree",
    "note",
    "crinkle",
    "crease",
    "lineage",
    "ancestry",
    "tune",
    "parentage",
    "business",
    "cable",
    "pipeline",
    "occupation",
    "seam",
    "wrinkle",
    "bloodline",
    "argumentation",
    "line of work",
    "agate line",
    "melodic line",
    "melodic phrase",
    "assembly line",
    "dividing line",
    "run along",
    "transmission line",
    "phone line",
    "line of credit",
    "credit line",
    "production line",
    "product line",
    "bank line",
    "railway line",
    "telephone line",
    "blood line",
    "line of business",
    "line of descent",
    "rail line",
    "business line",
    "communication channel",
    "electrical cable",
    "line of reasoning",
    "logical argument",
    "personal line of credit",
    "short letter",
    "line of merchandise",
    "line of products",
    "personal credit line",
    "blood",
    "melody",
    "origin",
    "line"
  ],
  [
    "leash",
    "rope"
  ],
  [
    "master",
    "chieftain",
    "skipper",
    "sea captain",
    "police chief",
    "police captain",
    "senior pilot",
    "head waiter",
    "captain"
  ],
  [
    "firstmate"
  ],
  [
    "bosun",
    "boatswain"
  ],
  [
    "roustabout",
    "deckhand"
  ],
  [
    "steersman",
    "helmsman"
  ],
  [
    "quartermaster"
  ],
  [
    "sentry",
    "scout",
    "picket",
    "outlook",
    "watch",
    "observatory",
    "observation post",
    "lookout man",
    "observation tower",
    "lookout station",
    "sentinel",
    "lookout"
  ],
  [
    "midshipman"
  ],
  [
    "cabinboy"
  ],
  [
    "boatswainsmate"
  ],
  [
    "astrolabe"
  ],
  [
    "chronometer"
  ],
  [
    "right angle",
    "quarter-circle",
    "quadrant"
  ],
  [
    "compassrose"
  ],
  [
    "chart"
  ],
  [
    "binocular",
    "opera glasses",
    "field glasses",
    "binoculars"
  ],
  [
    "scope",
    "telescope"
  ],
  [
    "signalflag"
  ],
  [
    "waterskin"
  ],
  [
    "shadeshelter"
  ],
  [
    "foragingtool"
  ],
  [
    "signalfire"
  ],
  [
    "sunhat"
  ],
  [
    "hydrated"
  ],
  [
    "sunprotected"
  ],
  [
    "secure",
    "protected",
    "sheltered"
  ],
  [
    "digforwater"
  ],
  [
    "collectdew"
  ],
  [
    "seekshade"
  ],
  [
    "signalforhelp"
  ],
  [
    "puff",
    "surge",
    "gasp",
    "gag",
    "raise",
    "lift",
    "heaving",
    "warp",
    "elevation",
    "buckle",
    "heft",
    "heave up",
    "heft up",
    "billow",
    "pant",
    "heave"
  ],
  [
    "plain",
    "lean",
    "reduce",
    "thin",
    "crop",
    "spare",
    "clip",
    "garnish",
    "cut",
    "tidy",
    "tailored",
    "dress",
    "snip",
    "prune",
    "cut down",
    "trig",
    "bring down",
    "groomed",
    "kempt",
    "clipping",
    "shave",
    "cut back",
    "well-kept",
    "lop",
    "trimming",
    "manicure",
    "shipshape",
    "passementerie",
    "clean-cut",
    "trimness",
    "trim down",
    "trim back",
    "pare",
    "trim"
  ],
  [
    "slew",
    "slue",
    "curve",
    "swerve",
    "cut",
    "sheer",
    "trend",
    "veer"
  ],
  [
    "weighanchor"
  ],
  [
    "castoff"
  ],
  [
    "makesail"
  ],
  [
    "trounce",
    "whip",
    "strap",
    "flog",
    "slash",
    "lather",
    "welt",
    "whiplash",
    "thong",
    "lash"
  ],
  [
    "splicing",
    "lap joint",
    "splice"
  ],
  [
    "sustain",
    "support",
    "control",
    "clutch",
    "retain",
    "accommodate",
    "give",
    "moderate",
    "clench",
    "clasp",
    "declare",
    "apply",
    "carry",
    "prevail",
    "check",
    "grip",
    "obtain",
    "handle",
    "have",
    "take",
    "throw",
    "arrest",
    "appreciation",
    "admit",
    "make",
    "defy",
    "oblige",
    "keep",
    "restrain",
    "curb",
    "contain",
    "book",
    "bind",
    "maintain",
    "defend",
    "clutches",
    "withstand",
    "confine",
    "nurse",
    "hold back",
    "detention",
    "entertain",
    "hold up",
    "time lag",
    "custody",
    "postponement",
    "adjudge",
    "keep back",
    "go for",
    "have got",
    "handgrip",
    "hold in",
    "take for",
    "take hold",
    "cargo area",
    "storage area",
    "view as",
    "cargo deck",
    "bear",
    "deem",
    "delay",
    "grasp",
    "guard",
    "halt",
    "harbor",
    "harbour",
    "reserve",
    "wait",
    "hold"
  ],
  [
    "provender",
    "victuals",
    "viands",
    "commissariat",
    "supplies",
    "stores",
    "provisions"
  ],
  [
    "watercask"
  ],
  [
    "foodstores"
  ],
  [
    "cargonet"
  ],
  [
    "cask",
    "drum",
    "gun barrel",
    "barrelful",
    "bbl",
    "barrel"
  ],
  [
    "crateful",
    "crate"
  ],
  [
    "fiend",
    "demon",
    "freak",
    "lusus naturae",
    "behemoth",
    "goliath",
    "colossus",
    "monstrosity",
    "devil",
    "giant",
    "ogre",
    "monster"
  ],
  [
    "seaurchin"
  ],
  [
    "expression",
    "locution",
    "saying"
  ],
  [
    "aroma",
    "fragrance",
    "odor",
    "wind",
    "smell",
    "nose",
    "perfume",
    "odour",
    "odorize",
    "olfactory property",
    "scent"
  ],
  [
    "mark",
    "thwart",
    "queer",
    "sweep",
    "cover",
    "track",
    "span",
    "foil",
    "grumpy",
    "grouchy",
    "bilk",
    "crabby",
    "spoil",
    "frustrate",
    "ill-natured",
    "baffle",
    "transversal",
    "crisscross",
    "crabbed",
    "get over",
    "transverse",
    "pass over",
    "cut across",
    "ill-tempered",
    "get across",
    "thwartwise",
    "hybridization",
    "intersect",
    "bad-tempered",
    "cut through",
    "crown of thorns",
    "interbreeding",
    "crossbreeding",
    "hybridisation",
    "hybridizing",
    "crossing",
    "fussy",
    "scotch",
    "traverse",
    "cross"
  ],
  [
    "coil",
    "whorl",
    "roll",
    "gyre",
    "curl",
    "curlicue",
    "ringlet",
    "scroll"
  ],
  [
    "hold",
    "leger",
    "script",
    "volume",
    "daybook",
    "playscript",
    "account book",
    "book of account",
    "ledger",
    "record",
    "recordbook",
    "reserve",
    "book"
  ],
  [
    "holograph",
    "ms",
    "manuscript"
  ],
  [
    "codex"
  ],
  [
    "pad",
    "pill",
    "lozenge",
    "pad of paper",
    "tablet"
  ],
  [
    "cyperus papyrus",
    "paper rush",
    "egyptian paper reed",
    "papyrus"
  ],
  [
    "ink"
  ],
  [
    "compose",
    "indite",
    "penitentiary",
    "write",
    "playpen",
    "pen"
  ],
  [
    "quill feather",
    "quill pen",
    "flight feather",
    "calamus",
    "pinion",
    "shaft",
    "quill"
  ],
  [
    "pencil"
  ],
  [
    "achromatic",
    "colorless",
    "fusain",
    "oxford gray",
    "charcoal gray",
    "wood coal",
    "charcoal-gray",
    "charcoal grey",
    "charcoal-grey",
    "oxford grey",
    "charcoal"
  ],
  [
    "composition",
    "report",
    "theme",
    "wallpaper",
    "newspaper",
    "newspaper publisher",
    "paper"
  ],
  [
    "typewriter"
  ],
  [
    "printingpress"
  ],
  [
    "textbook",
    "schoolbook",
    "text edition",
    "school text",
    "textual matter",
    "text"
  ],
  [
    "narrative",
    "level",
    "chronicle",
    "report",
    "account",
    "recital",
    "yarn",
    "tale",
    "history",
    "tarradiddle",
    "floor",
    "narration",
    "fib",
    "taradiddle",
    "write up",
    "news report",
    "storey",
    "story"
  ],
  [
    "original",
    "fresh",
    "new",
    "refreshing",
    "novel"
  ],
  [
    "assay",
    "examine",
    "attempt",
    "seek",
    "prove",
    "test",
    "try",
    "try out",
    "essay"
  ],
  [
    "paragraph"
  ],
  [
    "conviction",
    "condemn",
    "doom",
    "time",
    "judgment of conviction",
    "prison term",
    "sentence"
  ],
  [
    "articulate",
    "formulate",
    "discussion",
    "intelligence",
    "phrase",
    "news",
    "scripture",
    "tidings",
    "holy writ",
    "parole",
    "bible",
    "password",
    "watchword",
    "give-and-take",
    "good book",
    "countersign",
    "word of honor",
    "holy scripture",
    "logos",
    "son",
    "word of god",
    "word"
  ],
  [
    "letterform"
  ],
  [
    "glyph"
  ],
  [
    "penmanship",
    "calligraphy"
  ],
  [
    "scribbler",
    "copyist",
    "penman",
    "scrivener",
    "scribe"
  ],
  [
    "depository library",
    "program library",
    "library"
  ],
  [
    "archives",
    "file away",
    "archive"
  ],
  [
    "lexicon",
    "dictionary"
  ],
  [
    "encyclopaedia",
    "cyclopedia",
    "cyclopaedia",
    "encyclopedia"
  ],
  [
    "literature"
  ],
  [
    "interpretation",
    "recital",
    "version",
    "recitation",
    "meter reading",
    "reading"
  ],
  [
    "composition",
    "authorship",
    "written material",
    "penning",
    "symbolic representation",
    "writing"
  ],
  [
    "note",
    "annotation",
    "notational system",
    "notation"
  ],
  [
    "lettering",
    "inscription"
  ],
  [
    "epistle"
  ],
  [
    "manuscriptorium"
  ],
  [
    "leaf",
    "pagination",
    "page number",
    "folio"
  ],
  [
    "book",
    "hand",
    "playscript",
    "handwriting",
    "script"
  ],
  [
    "edition"
  ],
  [
    "book lover",
    "booklover",
    "bibliophile"
  ],
  [
    "proofreader"
  ],
  [
    "sheepskin",
    "lambskin",
    "parchment"
  ],
  [
    "inkwell"
  ],
  [
    "student",
    "learner",
    "scholarly person",
    "scholar"
  ],
  [
    "alphabet"
  ],
  [
    "scrollcase"
  ],
  [
    "chapter"
  ],
  [
    "edge",
    "tolerance",
    "border",
    "perimeter",
    "allowance",
    "leeway",
    "gross profit",
    "security deposit",
    "gross profit margin",
    "margin"
  ],
  [
    "note",
    "notation",
    "annotating",
    "annotation"
  ],
  [
    "show",
    "register",
    "book",
    "read",
    "commemorate",
    "put down",
    "disc",
    "disk",
    "memorialize",
    "tape",
    "platter",
    "immortalize",
    "criminal record",
    "phonograph record",
    "phonograph recording",
    "enter",
    "recordbook",
    "record"
  ],
  [
    "tome"
  ],
  [
    "compose",
    "indite",
    "spell",
    "pen",
    "publish",
    "drop a line",
    "write"
  ],
  [
    "show",
    "understand",
    "take",
    "study",
    "interpret",
    "register",
    "translate",
    "scan",
    "say",
    "learn",
    "record",
    "read"
  ],
  [
    "cipher",
    "enroll",
    "cypher",
    "recruit",
    "engrave",
    "enrol",
    "encrypt",
    "autograph",
    "encipher",
    "write in code",
    "code",
    "encode",
    "enter",
    "grave",
    "inscribe"
  ],
  [
    "emulate",
    "imitate",
    "transcript",
    "simulate",
    "re-create",
    "written matter",
    "ape",
    "copy"
  ],
  [
    "understand",
    "transform",
    "interpret",
    "read",
    "translate"
  ],
  [
    "tell",
    "recount",
    "declaim",
    "spin",
    "narrate",
    "retell",
    "recite"
  ],
  [
    "outline",
    "frame",
    "indite",
    "compile",
    "pen",
    "draw up",
    "write",
    "compose"
  ],
  [
    "ofmanuscriptsilluminate"
  ],
  [
    "educated",
    "belletristic",
    "literary",
    "lettered",
    "literate person",
    "well-written",
    "literate"
  ],
  [
    "erudite",
    "pedantic",
    "academic",
    "studious",
    "donnish",
    "bookish",
    "learned",
    "scholarly"
  ],
  [
    "engrossed",
    "inscribed",
    "graphic",
    "scripted",
    "transcribed",
    "codified",
    "print",
    "backhand",
    "scrawled",
    "shorthand",
    "longhand",
    "graphical",
    "cursive",
    "holographic",
    "handwritten",
    "scrivened",
    "printed",
    "typed",
    "typewritten",
    "left-slanting",
    "written"
  ],
  [
    "transcribed",
    "listed",
    "registered",
    "canned",
    "taped",
    "prerecorded",
    "filmed",
    "tape-recorded",
    "on the books",
    "recorded"
  ],
  [
    "written",
    "scripted"
  ],
  [
    "skull"
  ],
  [
    "spur",
    "back",
    "backbone",
    "prickle",
    "vertebral column",
    "spinal column",
    "thorn",
    "spine"
  ],
  [
    "vertebra"
  ],
  [
    "hip",
    "renal pelvis",
    "pelvic girdle",
    "pelvic arch",
    "pelvis"
  ],
  [
    "breastbone",
    "sternum"
  ],
  [
    "arteriola",
    "capillary artery",
    "arteriole"
  ],
  [
    "thin",
    "capillary tube",
    "hairlike",
    "capillary tubing",
    "capillary"
  ],
  [
    "plasm",
    "serum",
    "plasma"
  ],
  [
    "thrombocyte",
    "blood platelet",
    "platelet"
  ],
  [
    "lymph"
  ],
  [
    "lymphnode"
  ],
  [
    "thymus gland",
    "genus thymus",
    "thymus"
  ],
  [
    "pancreas"
  ],
  [
    "gallbladder"
  ],
  [
    "bile"
  ],
  [
    "gorge",
    "gullet",
    "oesophagus",
    "esophagus"
  ],
  [
    "duodenum"
  ],
  [
    "el salvadoran colon",
    "costa rican colon",
    "colon"
  ],
  [
    "rectum"
  ],
  [
    "urethra"
  ],
  [
    "ureter"
  ],
  [
    "fistula",
    "venous sinus",
    "sinus"
  ],
  [
    "tonsil"
  ],
  [
    "pharyngeal tonsil",
    "adenoid"
  ],
  [
    "scalp"
  ],
  [
    "epidermis",
    "cuticle"
  ],
  [
    "cuticle",
    "epidermis"
  ],
  [
    "corium",
    "derma",
    "dermis"
  ],
  [
    "cornea"
  ],
  [
    "crystalline lens",
    "electron lens",
    "genus lens",
    "lens system",
    "lens"
  ],
  [
    "retina"
  ],
  [
    "opticnerve"
  ],
  [
    "cochlea"
  ],
  [
    "innerear"
  ],
  [
    "middleear"
  ],
  [
    "stop",
    "pessary",
    "midriff",
    "contraceptive diaphragm",
    "diaphragm"
  ],
  [
    "bronchial tube",
    "bronchus"
  ],
  [
    "bronchiole"
  ],
  [
    "air sac",
    "air cell",
    "tooth socket",
    "alveolus"
  ],
  [
    "throat",
    "pharynx"
  ],
  [
    "voice box",
    "larynx"
  ],
  [
    "epiglottis"
  ],
  [
    "aorta"
  ],
  [
    "venacava"
  ],
  [
    "atrium"
  ],
  [
    "heart ventricle",
    "ventricle"
  ],
  [
    "jowl",
    "jawbone",
    "lower jaw",
    "submaxilla",
    "mandibula",
    "mandible"
  ],
  [
    "upper jaw",
    "upper jawbone",
    "maxilla"
  ],
  [
    "collarbone",
    "clavicle"
  ],
  [
    "shoulder blade",
    "shoulder bone",
    "scapula"
  ],
  [
    "humerus"
  ],
  [
    "spoke",
    "r",
    "radius"
  ],
  [
    "ulna"
  ],
  [
    "thighbone",
    "femoris",
    "femur"
  ],
  [
    "shin",
    "shinbone",
    "tibia"
  ],
  [
    "calf bone",
    "fibula"
  ],
  [
    "kneecap",
    "kneepan",
    "genus patella",
    "patella"
  ],
  [
    "metacarpal bone",
    "metacarpal"
  ],
  [
    "phalange"
  ],
  [
    "metatarsal"
  ],
  [
    "tarsus"
  ],
  [
    "bonemarrow"
  ],
  [
    "synovialfluid"
  ],
  [
    "bursa"
  ],
  [
    "pituitarygland"
  ],
  [
    "thyroid gland",
    "thyroidal",
    "thyroid"
  ],
  [
    "adrenalgland"
  ],
  [
    "ovary"
  ],
  [
    "uterus",
    "womb"
  ],
  [
    "neck",
    "uterine cervix",
    "cervix"
  ],
  [
    "vulva"
  ],
  [
    "nut",
    "ball",
    "gonad",
    "bollock",
    "ballock",
    "testis",
    "egg",
    "testicle"
  ],
  [
    "scrotum"
  ],
  [
    "prostate gland",
    "prostatic",
    "prostate"
  ],
  [
    "spit",
    "spittle",
    "saliva"
  ],
  [
    "sudor",
    "fret",
    "travail",
    "exertion",
    "effort",
    "water",
    "swither",
    "lather",
    "diaphoresis",
    "stew",
    "perspiration",
    "perspire",
    "hidrosis",
    "elbow grease",
    "sweat"
  ],
  [
    "sebum"
  ],
  [
    "internal secretion",
    "hormone"
  ],
  [
    "nerve cell",
    "neuron"
  ],
  [
    "axone",
    "axon"
  ],
  [
    "synapse"
  ],
  [
    "tail bone",
    "coccyx"
  ],
  [
    "sacrum"
  ],
  [
    "troy",
    "ilion",
    "ilium"
  ],
  [
    "softpalate"
  ],
  [
    "uvula"
  ],
  [
    "irismuscle"
  ],
  [
    "tearduct"
  ],
  [
    "lien",
    "irascibility",
    "short temper",
    "quick temper",
    "spleen"
  ],
  [
    "brass",
    "face",
    "mettle",
    "spunk",
    "steel",
    "heart",
    "cheek",
    "effrontery",
    "boldness",
    "nervus",
    "nerve"
  ],
  [
    "spinalcord"
  ],
  [
    "sinew",
    "tendon"
  ],
  [
    "ligament"
  ],
  [
    "gristle",
    "cartilage"
  ],
  [
    "scramble",
    "clamber",
    "struggle",
    "pelt",
    "sputter",
    "abrade",
    "scrape",
    "stub",
    "hide",
    "shin",
    "bark",
    "peel",
    "tegument",
    "rind",
    "shinny",
    "cutis",
    "pare",
    "skin"
  ],
  [
    "tomentum",
    "fuzz",
    "hairbreadth",
    "haircloth",
    "hair"
  ],
  [
    "flag",
    "sword lily",
    "iris diaphragm",
    "fleur-de-lis",
    "iris"
  ],
  [
    "student",
    "educatee",
    "schoolchild",
    "pupil"
  ],
  [
    "lid",
    "eyelid"
  ],
  [
    "cilium",
    "eyelash"
  ],
  [
    "tympanum",
    "tympanic membrane",
    "eardrum"
  ],
  [
    "nostril"
  ],
  [
    "clapper",
    "glossa",
    "spit",
    "knife",
    "lingua",
    "natural language",
    "tongue"
  ],
  [
    "tooth"
  ],
  [
    "pharynx",
    "throat"
  ],
  [
    "shoulder joint",
    "articulatio humeri",
    "shoulder"
  ],
  [
    "carpus",
    "wrist joint",
    "articulatio radiocarpea",
    "radiocarpal joint",
    "wrist"
  ],
  [
    "riffle",
    "hitch",
    "flick",
    "finger",
    "riff",
    "leaf",
    "pollex",
    "hitchhike",
    "flip",
    "thumb"
  ],
  [
    "stomach",
    "belly",
    "venter",
    "abdomen"
  ],
  [
    "second joint",
    "thigh"
  ],
  [
    "cad",
    "blackguard",
    "dog",
    "hound",
    "bounder",
    "reheel",
    "counter",
    "heel"
  ],
  [
    "square-toed",
    "toed",
    "pointy-toed",
    "pointed-toe",
    "squared-toe",
    "toe"
  ],
  [
    "arteria",
    "artery"
  ],
  [
    "nervure",
    "mineral vein",
    "vena",
    "vein"
  ],
  [
    "profligate",
    "line",
    "stock",
    "gore",
    "bloodshed",
    "rip",
    "descent",
    "roue",
    "pedigree",
    "lineage",
    "ancestry",
    "parentage",
    "bloodline",
    "blood line",
    "line of descent",
    "origin",
    "rake",
    "blood"
  ],
  [
    "weave",
    "tissue paper",
    "tissue"
  ],
  [
    "harmonium",
    "reed organ",
    "pipe organ",
    "electric organ",
    "electronic organ",
    "hammond organ",
    "organ"
  ],
  [
    "voicebox"
  ],
  [
    "trachea",
    "windpipe"
  ],
  [
    "scythe"
  ],
  [
    "ocean",
    "sea"
  ],
  [
    "temper",
    "flavor",
    "time of year",
    "flavour",
    "harden",
    "season"
  ],
  [
    "stern",
    "butt",
    "ass",
    "bum",
    "prat",
    "induct",
    "bottom",
    "tail",
    "arse",
    "fundament",
    "keister",
    "rear",
    "derriere",
    "rump",
    "invest",
    "backside",
    "behind",
    "tush",
    "posterior",
    "buttocks",
    "fanny",
    "buns",
    "tail end",
    "sit",
    "rear end",
    "sit down",
    "hindquarters",
    "tooshie",
    "hind end",
    "can",
    "place",
    "seat"
  ],
  [
    "source",
    "ejaculate",
    "sow",
    "seminal fluid",
    "seeded player",
    "germ",
    "semen",
    "sough",
    "seed"
  ],
  [
    "ophidian",
    "snake",
    "serpent"
  ],
  [
    "tinea",
    "roundworm",
    "ringworm"
  ],
  [
    "retainer",
    "handmaid",
    "handmaiden",
    "servant"
  ],
  [
    "vestige",
    "trace",
    "phantom",
    "dark",
    "apparition",
    "tail",
    "overshadow",
    "shade off",
    "darkness",
    "dwarf",
    "shade",
    "shadow"
  ],
  [
    "beam",
    "tool",
    "jibe",
    "dig",
    "slam",
    "chicane",
    "barb",
    "dick",
    "screw",
    "spear",
    "pecker",
    "chouse",
    "ray of light",
    "lance",
    "shot",
    "peter",
    "ray",
    "quill",
    "cheat",
    "jockey",
    "diaphysis",
    "light beam",
    "beam of light",
    "rotating shaft",
    "shaft of light",
    "calamus",
    "gibe",
    "shaft"
  ],
  [
    "case",
    "cocktail dress",
    "sheath"
  ],
  [
    "ledge",
    "shelf"
  ],
  [
    "case",
    "blast",
    "scale",
    "carapace",
    "plate",
    "pod",
    "strafe",
    "casing",
    "eggshell",
    "shelled",
    "racing shell",
    "shell"
  ],
  [
    "screen",
    "buckler",
    "harbor",
    "harbour",
    "shield"
  ],
  [
    "scramble",
    "clamber",
    "struggle",
    "sputter",
    "skin",
    "shinny",
    "tibia",
    "shinbone",
    "shin"
  ],
  [
    "horseshoe",
    "brake shoe",
    "provide with shoes",
    "u-shaped plate",
    "shoe"
  ],
  [
    "digger",
    "excavator",
    "spadeful",
    "shovelful",
    "power shovel",
    "shovel"
  ],
  [
    "pall",
    "cover",
    "enshroud",
    "hide",
    "tack",
    "cerement",
    "sheet",
    "mainsheet",
    "winding-sheet",
    "weather sheet",
    "winding-clothes",
    "shroud"
  ],
  [
    "strain",
    "sort",
    "screen",
    "sift",
    "screen out",
    "sieve"
  ],
  [
    "mark",
    "contract",
    "augury",
    "house",
    "signal",
    "polarity",
    "mansion",
    "ratify",
    "sign up",
    "fee",
    "subscribe",
    "bless",
    "signalize",
    "sign on",
    "gestural",
    "signed",
    "sign of the zodiac",
    "signaling",
    "signboard",
    "planetary house",
    "sign-language",
    "sign"
  ],
  [
    "muscle",
    "tendon",
    "brawn",
    "sinew"
  ],
  [
    "pitch",
    "toss",
    "flip",
    "sky"
  ],
  [
    "slab"
  ],
  [
    "piece",
    "gash",
    "cut",
    "fade",
    "slash",
    "slice up",
    "slit",
    "slice"
  ],
  [
    "abdomen",
    "stomach",
    "paunch",
    "belly out",
    "venter",
    "belly"
  ],
  [
    "pussy",
    "cut",
    "scratch",
    "puss",
    "injured",
    "incision",
    "notch",
    "slice",
    "nooky",
    "dent",
    "slitted",
    "slit"
  ],
  [
    "position",
    "berth",
    "post",
    "office",
    "spot",
    "situation",
    "time slot",
    "expansion slot",
    "one-armed bandit",
    "place",
    "slot"
  ],
  [
    "anelid"
  ],
  [
    "tubifexworm"
  ],
  [
    "ophidian",
    "auger",
    "snake in the grass",
    "hydra",
    "serpent",
    "snake river",
    "snake"
  ],
  [
    "trap",
    "ensnare",
    "entrap",
    "noose",
    "snare drum",
    "side drum",
    "gin",
    "trammel",
    "snare"
  ],
  [
    "whiff",
    "snuff",
    "sniffle",
    "sniff"
  ],
  [
    "bonk",
    "bash",
    "drogue",
    "bop",
    "whap",
    "whop",
    "windsock",
    "wind sleeve",
    "sock"
  ],
  [
    "seperate"
  ],
  [
    "take",
    "hit",
    "transfer",
    "dispatch",
    "absent",
    "get rid of",
    "murder",
    "bump off",
    "take out",
    "take away",
    "move out",
    "polish off",
    "slay",
    "remove"
  ],
  [
    "come away",
    "come off",
    "detach"
  ],
  [
    "soldier"
  ],
  [
    "word",
    "boy",
    "logos",
    "son"
  ],
  [
    "strain",
    "call",
    "birdcall",
    "birdsong",
    "song"
  ],
  [
    "profound",
    "substantial",
    "good",
    "sensible",
    "heavy",
    "strong",
    "secure",
    "intelligent",
    "deep",
    "complete",
    "channel",
    "solid",
    "fathom",
    "reasonable",
    "righteous",
    "dependable",
    "levelheaded",
    "stable",
    "valid",
    "vocalize",
    "healthy",
    "soundly",
    "audio",
    "reasoned",
    "well-grounded",
    "wakeless",
    "legal",
    "talking",
    "phone",
    "auditory sensation",
    "go",
    "safe",
    "speech sound",
    "voice",
    "sound"
  ],
  [
    "figure",
    "common fig",
    "ficus carica",
    "common fig tree",
    "fig"
  ],
  [
    "lance",
    "fizgig",
    "gig",
    "fishgig",
    "spear up",
    "shaft",
    "spear"
  ],
  [
    "spearhead"
  ],
  [
    "charm",
    "piece",
    "enchantment",
    "turn",
    "while",
    "import",
    "magic spell",
    "tour",
    "write",
    "go",
    "trance",
    "spell"
  ],
  [
    "look",
    "feeling",
    "tone",
    "life",
    "feel",
    "purport",
    "heart",
    "flavor",
    "intent",
    "smell",
    "inspirit",
    "liveliness",
    "sprightliness",
    "emotional state",
    "spirit up",
    "spirit"
  ],
  [
    "fortify",
    "lace",
    "ear",
    "capitulum",
    "transfix",
    "impale",
    "empale",
    "spike out",
    "spike"
  ],
  [
    "splint"
  ],
  [
    "shell",
    "home",
    "scale",
    "catcher",
    "home plate",
    "plateful",
    "collection plate",
    "photographic plate",
    "plate"
  ],
  [
    "splutter",
    "sputter",
    "swash",
    "spatter",
    "dab",
    "plash",
    "splash",
    "slop",
    "spill",
    "splosh",
    "spattering",
    "splattering",
    "sputtering",
    "splatter"
  ],
  [
    "sliver",
    "secede",
    "break away",
    "flinders",
    "splinter"
  ],
  [
    "snog",
    "smooch",
    "spoonful",
    "spoon"
  ],
  [
    "rung",
    "radius",
    "rundle",
    "spoke"
  ],
  [
    "mate",
    "partner",
    "married person",
    "consort",
    "spouse"
  ],
  [
    "spurt",
    "spirt",
    "jabber",
    "rant",
    "gush",
    "rave",
    "mouth off",
    "rabbit on",
    "spout"
  ],
  [
    "static",
    "sound",
    "firm",
    "steady",
    "lasting",
    "unchanging",
    "unreactive",
    "unchangeable",
    "balanced",
    "stabilized",
    "unfluctuating",
    "horse barn",
    "stabile",
    "stalls",
    "stable"
  ],
  [
    "faculty",
    "stave",
    "staff"
  ],
  [
    "peach",
    "denounce",
    "rat",
    "betray",
    "snoop",
    "grass",
    "spy",
    "give away",
    "shop",
    "snitch",
    "tell on",
    "hart",
    "stag"
  ],
  [
    "venture",
    "interest",
    "post",
    "jeopardize",
    "back",
    "adventure",
    "gage",
    "game",
    "punt",
    "impale",
    "stakes",
    "bet on",
    "bet",
    "hazard",
    "wager",
    "stake"
  ],
  [
    "stem",
    "husk",
    "chaff",
    "shuck",
    "straw",
    "stalking",
    "stubble",
    "angry walk",
    "still hunt",
    "haunt",
    "stalk"
  ],
  [
    "adept",
    "stellar",
    "maven",
    "lead",
    "virtuoso",
    "sensation",
    "ace",
    "principal",
    "genius",
    "wizard",
    "asterisk",
    "whiz",
    "leading",
    "whizz",
    "wiz",
    "hotshot",
    "prima",
    "headliner",
    "starring",
    "star"
  ],
  [
    "starling"
  ],
  [
    "steed"
  ],
  [
    "steppe"
  ],
  [
    "joint",
    "adhere",
    "sting",
    "bind",
    "wedge",
    "cohere",
    "stay",
    "truncheon",
    "peg",
    "cling",
    "pin",
    "deposit",
    "put forward",
    "reefer",
    "nightstick",
    "joystick",
    "billy",
    "stick around",
    "stick to",
    "stay put",
    "control stick",
    "hold fast",
    "billystick",
    "bond",
    "lodge",
    "marijuana cigarette",
    "stick"
  ],
  [
    "cut",
    "stinger"
  ],
  [
    "abide",
    "endure",
    "stand",
    "abdomen",
    "suffer",
    "tolerate",
    "belly",
    "put up",
    "tummy",
    "breadbasket",
    "tum",
    "bear",
    "brook",
    "venter",
    "stomach"
  ],
  [
    "chromatic",
    "gem",
    "lapidate",
    "gemstone",
    "colored",
    "hailstone",
    "pit",
    "rock",
    "stone"
  ],
  [
    "rage",
    "ramp",
    "violent storm",
    "force",
    "surprise",
    "tempest",
    "storm"
  ],
  [
    "stowage",
    "storage room",
    "storeroom"
  ],
  [
    "unknown",
    "alien",
    "stranger"
  ],
  [
    "trounce",
    "lash",
    "whip",
    "flog",
    "slash",
    "lather",
    "welt",
    "shoulder strap",
    "strap"
  ],
  [
    "street"
  ],
  [
    "contemplate",
    "subject",
    "work",
    "examine",
    "consider",
    "analyze",
    "discipline",
    "field",
    "take",
    "report",
    "survey",
    "sketch",
    "read",
    "meditate",
    "analyse",
    "cogitation",
    "field of study",
    "subject field",
    "subject area",
    "branch of knowledge",
    "learn",
    "study"
  ],
  [
    "bang",
    "affect",
    "impress",
    "hit",
    "fall",
    "expunge",
    "flick",
    "smash",
    "mint",
    "rap",
    "move",
    "shine",
    "excise",
    "come across",
    "impinge on",
    "coin",
    "come to",
    "happen upon",
    "collide with",
    "come upon",
    "light upon",
    "walk out",
    "run into",
    "ten-strike",
    "chance on",
    "work stoppage",
    "chance upon",
    "discover",
    "tap",
    "strike"
  ],
  [
    "slip",
    "bare",
    "foray",
    "plunder",
    "clean",
    "dismantle",
    "reave",
    "divest",
    "loot",
    "ransack",
    "leach",
    "pillage",
    "despoil",
    "denude",
    "rifle",
    "deprive",
    "disrobe",
    "dispossess",
    "undress",
    "denudate",
    "discase",
    "striptease",
    "landing strip",
    "strip down",
    "airstrip",
    "comic strip",
    "unclothe",
    "opencast",
    "uncase",
    "cartoon strip",
    "flight strip",
    "opencut",
    "strip"
  ],
  [
    "sturgeon"
  ],
  [
    "summertime",
    "summer"
  ],
  [
    "domain",
    "realm",
    "part",
    "area",
    "neighborhood",
    "region"
  ],
  [
    "axilla",
    "axillary fossa",
    "axillary cavity",
    "armpit"
  ],
  [
    "corridor"
  ],
  [
    "sunlight",
    "sunshine",
    "sunbathe",
    "sunday",
    "sun"
  ],
  [
    "lament",
    "bemoan",
    "repent",
    "deplore",
    "bewail",
    "ruefulness",
    "rue",
    "sorrow",
    "regret"
  ],
  [
    "supper"
  ],
  [
    "storm",
    "surprising",
    "surprisal",
    "surprise"
  ],
  [
    "switch",
    "trade",
    "quid pro quo",
    "barter",
    "swop",
    "swap"
  ],
  [
    "assert",
    "affirm",
    "cast",
    "drift",
    "ramble",
    "vagabond",
    "range",
    "aver",
    "rove",
    "roam",
    "stray",
    "avow",
    "swear",
    "wander",
    "swan"
  ],
  [
    "brand",
    "steel",
    "blade",
    "sword"
  ],
  [
    "defer",
    "remit",
    "board",
    "postpone",
    "put off",
    "set back",
    "put over",
    "hold over",
    "tabular array",
    "mesa",
    "shelve",
    "table"
  ],
  [
    "squad",
    "team up",
    "team"
  ],
  [
    "beable"
  ],
  [
    "temple"
  ],
  [
    "collapsible shelter",
    "tent"
  ],
  [
    "texture"
  ],
  [
    "spine",
    "prickle",
    "irritant",
    "thorn"
  ],
  [
    "idea",
    "cerebration",
    "sentiment",
    "mentation",
    "view",
    "intellection",
    "opinion",
    "thinking",
    "persuasion",
    "thought"
  ],
  [
    "yarn",
    "weave",
    "string",
    "wind",
    "ribbon",
    "train of thought",
    "screw thread",
    "meander",
    "thread"
  ],
  [
    "scourge",
    "menace",
    "terror",
    "threat"
  ],
  [
    "beat",
    "click",
    "ticking",
    "ticktack",
    "ticktock",
    "retick",
    "tick"
  ],
  [
    "roofing tile",
    "tile"
  ],
  [
    "clip",
    "meter",
    "clock",
    "sentence",
    "fourth dimension",
    "clock time",
    "prison term",
    "time"
  ],
  [
    "affair",
    "matter",
    "thing"
  ],
  [
    "flashlight",
    "blowlamp",
    "blowtorch",
    "great mullein",
    "common mullein",
    "flannel mullein",
    "woolly mullein",
    "verbascum thapsus",
    "torch"
  ],
  [
    "tortoise"
  ],
  [
    "trace",
    "impact",
    "concern",
    "affect",
    "reach",
    "stir",
    "feeling",
    "allude",
    "tinge",
    "spot",
    "contact",
    "pinch",
    "advert",
    "pertain",
    "meet",
    "hint",
    "tinct",
    "match",
    "tint",
    "refer",
    "relate",
    "partake",
    "speck",
    "soupcon",
    "rival",
    "disturb",
    "adjoin",
    "mite",
    "equal",
    "touching",
    "touch on",
    "jot",
    "signature",
    "come to",
    "bear on",
    "bepaint",
    "bear upon",
    "tactile sensation",
    "touch sensation",
    "extend to",
    "tactual sensation",
    "skin senses",
    "touch modality",
    "cutaneous senses",
    "ghost",
    "sense of touch",
    "touch"
  ],
  [
    "loom",
    "pillar",
    "hulk",
    "column",
    "tower"
  ],
  [
    "township",
    "townsfolk",
    "townspeople",
    "town"
  ],
  [
    "craft",
    "patronage",
    "deal",
    "switch",
    "quid pro quo",
    "sell",
    "barter",
    "merchandise",
    "swop",
    "trade in",
    "business deal",
    "trade wind",
    "swap",
    "trade"
  ],
  [
    "shift",
    "transmutation",
    "translation",
    "transformation"
  ],
  [
    "conversion",
    "modulation",
    "changeover",
    "passage",
    "transition"
  ],
  [
    "hole",
    "ambuscade",
    "snare",
    "ensnare",
    "ambush",
    "pin",
    "maw",
    "yap",
    "entrap",
    "immobilize",
    "sand trap",
    "lying in wait",
    "bunker",
    "trammel",
    "trap"
  ],
  [
    "tree diagram",
    "tree"
  ],
  [
    "kin",
    "clan",
    "kin group",
    "federation of tribes",
    "folk",
    "kindred",
    "kinship group",
    "tribe"
  ],
  [
    "promenade",
    "parade",
    "flock",
    "scout group",
    "scout troop",
    "troop"
  ],
  [
    "trouserleg"
  ],
  [
    "body",
    "boot",
    "torso",
    "proboscis",
    "tree trunk",
    "luggage compartment",
    "bole",
    "trunk"
  ],
  [
    "pipe",
    "tubing",
    "subway",
    "vacuum tube",
    "electron tube",
    "thermionic tube",
    "thermionic valve",
    "thermionic vacuum tube",
    "tube-shaped structure",
    "metro",
    "underground",
    "tube"
  ],
  [
    "strain",
    "line",
    "air",
    "tune up",
    "melodic line",
    "melodic phrase",
    "melody",
    "tune"
  ],
  [
    "brassica rapa",
    "white turnip",
    "turnip"
  ],
  [
    "gloaming",
    "dusk",
    "twilit",
    "fall",
    "dusky",
    "nightfall",
    "evenfall",
    "twilight"
  ],
  [
    "mate",
    "parallel",
    "similar",
    "match",
    "duplicate",
    "couple",
    "similitude",
    "pair",
    "counterpart",
    "matching",
    "twinned",
    "siamese",
    "twin falls",
    "twin"
  ],
  [
    "ulceration",
    "ulcer"
  ],
  [
    "fortuity",
    "chance event",
    "accident"
  ],
  [
    "uncle"
  ],
  [
    "baccy",
    "tobacco"
  ],
  [
    "paternaluncle"
  ],
  [
    "maternaluncle"
  ],
  [
    "unusedland"
  ],
  [
    "vagina"
  ],
  [
    "vale",
    "valley"
  ],
  [
    "vegetal",
    "vegetative",
    "vegetational",
    "veggie",
    "vegetable"
  ],
  [
    "hamlet",
    "settlement",
    "small town",
    "greenwich village",
    "village"
  ],
  [
    "fiddle",
    "violin"
  ],
  [
    "sound",
    "representative",
    "part",
    "articulation",
    "vocalize",
    "interpreter",
    "spokesperson",
    "vocalization",
    "voice"
  ],
  [
    "waggon",
    "beach wagon",
    "police van",
    "station wagon",
    "black maria",
    "patrol wagon",
    "police wagon",
    "beach waggon",
    "coaster wagon",
    "station waggon",
    "paddy wagon",
    "wagon"
  ],
  [
    "pass",
    "paseo",
    "walkway",
    "walk of life",
    "base on balls",
    "walking",
    "manner of walking",
    "walk"
  ],
  [
    "bulwark",
    "rampart",
    "palisade",
    "fence",
    "surround",
    "fence in",
    "paries",
    "wall"
  ],
  [
    "warrior"
  ],
  [
    "verruca",
    "wart"
  ],
  [
    "flourish",
    "undulate",
    "flap",
    "undulation",
    "beckon",
    "curl",
    "brandish",
    "wafture",
    "waving",
    "moving ridge",
    "wave"
  ],
  [
    "agency",
    "path",
    "style",
    "room",
    "mode",
    "direction",
    "fashion",
    "ways",
    "way of life",
    "elbow room",
    "right smart",
    "manner",
    "means",
    "way"
  ],
  [
    "artillery",
    "arm",
    "weapon system",
    "weapon"
  ],
  [
    "lust",
    "crave",
    "thirst",
    "starve",
    "hungriness",
    "hunger"
  ],
  [
    "nuptials",
    "wedding party",
    "marriage ceremony",
    "marriage",
    "wedding ceremony",
    "wedding"
  ],
  [
    "squeeze",
    "stick",
    "deposit",
    "torpedo",
    "submarine",
    "chock",
    "sub",
    "bomber",
    "hoagie",
    "poor boy",
    "cuneus",
    "hero sandwich",
    "hacek",
    "hoagy",
    "submarine sandwich",
    "wedge heel",
    "wedge shape",
    "cuban sandwich",
    "force",
    "grinder",
    "hero",
    "italian sandwich",
    "lodge",
    "zep",
    "wedge"
  ],
  [
    "good",
    "fine",
    "swell",
    "substantially",
    "considerably",
    "all right",
    "easily",
    "intimately",
    "wellspring",
    "fountainhead",
    "cured",
    "comfortably",
    "recovered",
    "asymptomatic",
    "advantageously",
    "symptomless",
    "healed",
    "well"
  ],
  [
    "rack",
    "roll",
    "cycle",
    "bicycle",
    "pedal",
    "bike",
    "steering wheel",
    "roulette wheel",
    "wheel around",
    "wheel"
  ],
  [
    "whetstone"
  ],
  [
    "trounce",
    "lash",
    "strap",
    "blister",
    "flog",
    "slash",
    "lather",
    "pip",
    "whisk",
    "welt",
    "whiplash",
    "worst",
    "party whip",
    "mop up",
    "rack up",
    "whip"
  ],
  [
    "widow woman",
    "widow"
  ],
  [
    "minion",
    "sponge",
    "leech",
    "parasite"
  ],
  [
    "married woman",
    "wife"
  ],
  [
    "wigging",
    "wig"
  ],
  [
    "windowpane",
    "window"
  ],
  [
    "annex",
    "fly",
    "flank",
    "extension",
    "fender",
    "backstage",
    "offstage",
    "annexe",
    "wing"
  ],
  [
    "wintertime",
    "winter"
  ],
  [
    "glamour",
    "hex",
    "bewitch",
    "beldam",
    "jinx",
    "beldame",
    "enchantress",
    "hag",
    "enchant",
    "crone",
    "witch"
  ],
  [
    "char",
    "womanhood",
    "charwoman",
    "cleaning woman",
    "adult female",
    "cleaning lady",
    "woman"
  ],
  [
    "existence",
    "domain",
    "macrocosm",
    "populace",
    "creation",
    "cosmos",
    "nature",
    "man",
    "earth",
    "globe",
    "humanity",
    "humankind",
    "global",
    "public",
    "planetary",
    "worldwide",
    "human beings",
    "earthly concern",
    "human race",
    "worldly concern",
    "humans",
    "mankind",
    "reality",
    "universe",
    "world"
  ],
  [
    "wriggle",
    "twist",
    "writhe",
    "wrestle",
    "louse",
    "wreathe",
    "squirm",
    "insect",
    "dirt ball",
    "worm"
  ],
  [
    "cestode",
    "tapeworm"
  ],
  [
    "wort"
  ],
  [
    "spite",
    "hurt",
    "lesion",
    "coiled",
    "injury",
    "offend",
    "injure",
    "wounding",
    "combat injury",
    "wound"
  ],
  [
    "class",
    "twelvemonth",
    "yr",
    "year"
  ],
  [
    "yap",
    "yip",
    "yelping",
    "yelp"
  ],
  [
    "burble",
    "ripple",
    "babble",
    "gurgle",
    "belch",
    "guggle",
    "burp",
    "eruct",
    "bubble"
  ],
  [
    "stiff",
    "cadaver",
    "remains",
    "clay",
    "corpse"
  ],
  [
    "medulla",
    "medulla oblongata",
    "light bulb",
    "electric light",
    "incandescent lamp",
    "lightbulb",
    "electric-light bulb",
    "bulb"
  ],
  [
    "link",
    "span",
    "brace",
    "dyad",
    "couple",
    "pair",
    "twosome",
    "coupling",
    "duad",
    "couplet",
    "distich",
    "doubleton",
    "duet",
    "duo",
    "twain",
    "yoke"
  ],
  [
    "granule"
  ],
  [
    "nebula"
  ],
  [
    "ravel",
    "gnarl",
    "tangle",
    "burl",
    "grayback",
    "nautical mile",
    "slub",
    "air mile",
    "calidris canutus",
    "naut mi",
    "international nautical mile",
    "mi",
    "mile",
    "knot"
  ],
  [
    "clean",
    "plumb",
    "plum tree",
    "plum"
  ],
  [
    "amygdalus communis",
    "sweet almond",
    "prunus amygdalus",
    "prunus dulcis",
    "almond"
  ],
  [
    "scorpion"
  ],
  [
    "entire",
    "stallion"
  ],
  [
    "hollowtree"
  ],
  [
    "vigor",
    "energy",
    "vim",
    "vigour"
  ],
  [
    "esteem",
    "appreciation",
    "wonderment",
    "wonder",
    "admiration"
  ],
  [
    "adulation",
    "latria",
    "idolization",
    "idolisation",
    "worship",
    "adoration"
  ],
  [
    "zephyr",
    "strain",
    "beam",
    "line",
    "bare",
    "open",
    "transmit",
    "atmosphere",
    "breeze",
    "broadcast",
    "send",
    "tune",
    "gentle wind",
    "aviation",
    "air out",
    "open air",
    "publicize",
    "ventilate",
    "airing",
    "melodic line",
    "melodic phrase",
    "out-of-doors",
    "publicise",
    "airwave",
    "outdoors",
    "air travel",
    "aura",
    "melody",
    "vent",
    "air"
  ],
  [
    "suds",
    "beer"
  ],
  [
    "note",
    "bill",
    "greenback",
    "bank note",
    "bank bill",
    "government note",
    "federal reserve note",
    "banknote"
  ],
  [
    "exchequer",
    "treasury department",
    "first lord of the treasury",
    "department of the treasury",
    "treasury"
  ],
  [
    "peach",
    "denounce",
    "stag",
    "patronize",
    "frequent",
    "rat",
    "betray",
    "sponsor",
    "grass",
    "workshop",
    "store",
    "give away",
    "browse",
    "snitch",
    "tell on",
    "shop at",
    "buy at",
    "shop"
  ],
  [
    "merchandiser",
    "merchant"
  ],
  [
    "monger",
    "dealer",
    "bargainer",
    "trader"
  ],
  [
    "benefit",
    "net",
    "lucre",
    "profits",
    "earnings",
    "net income",
    "net profit",
    "gain",
    "profit"
  ],
  [
    "release",
    "deprivation",
    "exit",
    "departure",
    "passing",
    "expiration",
    "personnel casualty",
    "going",
    "loss"
  ],
  [
    "assess",
    "task",
    "taxation",
    "revenue enhancement",
    "tax"
  ],
  [
    "concern",
    "worry",
    "occupy",
    "stake",
    "involvement",
    "sake",
    "pastime",
    "interest group",
    "interestingness",
    "matter to",
    "interest"
  ],
  [
    "lend",
    "loanword",
    "loan"
  ],
  [
    "recognition",
    "reference",
    "accredit",
    "mention",
    "quotation",
    "citation",
    "deferred payment",
    "course credit",
    "credit entry",
    "credit"
  ],
  [
    "bargain",
    "trade",
    "quid pro quo",
    "swop",
    "swap",
    "barter"
  ],
  [
    "corrupt",
    "bargain",
    "purchase",
    "steal",
    "bribe",
    "buy"
  ],
  [
    "deal",
    "betray",
    "trade",
    "sell"
  ],
  [
    "endow",
    "empower",
    "induct",
    "adorn",
    "endue",
    "put",
    "commit",
    "gift",
    "indue",
    "seat",
    "vest",
    "enthrone",
    "clothe",
    "place",
    "invest"
  ],
  [
    "impart",
    "bestow",
    "contribute",
    "bring",
    "add",
    "loan",
    "lend"
  ],
  [
    "adopt",
    "take over",
    "take up",
    "borrow"
  ],
  [
    "flush",
    "affluent",
    "rich",
    "loaded",
    "moneyed",
    "wealthy"
  ],
  [
    "mean",
    "hapless",
    "wretched",
    "destitute",
    "pitiful",
    "inadequate",
    "deficient",
    "piteous",
    "short",
    "bad",
    "inferior",
    "pathetic",
    "low",
    "impoverished",
    "indigent",
    "unfortunate",
    "miserable",
    "needy",
    "penurious",
    "insufficient",
    "pitiable",
    "impecunious",
    "bust",
    "mediocre",
    "pinched",
    "misfortunate",
    "second-rate",
    "necessitous",
    "unfruitful",
    "poverty-stricken",
    "skint",
    "broke",
    "hardscrabble",
    "beggarly",
    "hard up",
    "resourceless",
    "slummy",
    "penniless",
    "stone-broke",
    "moneyless",
    "stony-broke",
    "poor"
  ],
  [
    "flush",
    "rich",
    "loaded",
    "tributary",
    "feeder",
    "moneyed",
    "wealthy",
    "affluent"
  ],
  [
    "poor",
    "bust",
    "skint",
    "stone-broke",
    "stony-broke",
    "broke"
  ],
  [
    "advantageous",
    "productive",
    "lucrative",
    "fat",
    "fruitful",
    "rewarding",
    "juicy",
    "economic",
    "remunerative",
    "gainful",
    "paid",
    "bankable",
    "moneymaking",
    "paying",
    "profitable"
  ],
  [
    "break",
    "ruin",
    "insolvent",
    "bankrupt"
  ],
  [
    "book",
    "leger",
    "daybook",
    "account book",
    "book of account",
    "ledger"
  ],
  [
    "teller",
    "bank clerk",
    "cashier"
  ],
  [
    "cashier",
    "bank clerk",
    "vote counter",
    "teller"
  ],
  [
    "good",
    "innocuous",
    "secure",
    "sound",
    "dependable",
    "prophylactic",
    "safety",
    "harmless",
    "rubber",
    "condom",
    "riskless",
    "unadventurous",
    "safe and sound",
    "fail-safe",
    "unhurt",
    "unhazardous",
    "risk-free",
    "safe"
  ],
  [
    "overleap",
    "bank vault",
    "burial vault",
    "hurdle",
    "vault"
  ],
  [
    "value",
    "appreciate",
    "gem",
    "prize",
    "care for",
    "hold dear",
    "hoarded wealth",
    "cherish",
    "treasure"
  ],
  [
    "great",
    "cap",
    "majuscule",
    "chapiter",
    "working capital",
    "upper case",
    "uppercase",
    "upper-case letter",
    "capital"
  ],
  [
    "stock",
    "store",
    "investment company",
    "investment trust",
    "investment firm",
    "monetary fund",
    "fund"
  ],
  [
    "dividend"
  ],
  [
    "banal",
    "standard",
    "strain",
    "line",
    "trite",
    "carry",
    "hackneyed",
    "variety",
    "regular",
    "descent",
    "pedigree",
    "threadbare",
    "tired",
    "breed",
    "inventory",
    "commonplace",
    "lineage",
    "ancestry",
    "parentage",
    "timeworn",
    "livestock",
    "store",
    "fund",
    "stockpile",
    "well-worn",
    "shopworn",
    "bloodline",
    "broth",
    "caudex",
    "gunstock",
    "farm animal",
    "buy in",
    "stock certificate",
    "gillyflower",
    "neckcloth",
    "blood line",
    "line of descent",
    "malcolm stock",
    "blood",
    "origin",
    "stock"
  ],
  [
    "enthralled",
    "attachment",
    "adhere",
    "bind",
    "stick",
    "adherence",
    "bail",
    "hamper",
    "tie",
    "adhesion",
    "shackle",
    "enslaved",
    "bring together",
    "adhesiveness",
    "chemical bond",
    "stick to",
    "hold fast",
    "in bondage",
    "bail bond",
    "bond paper",
    "draw together",
    "trammels",
    "bond certificate",
    "alliance",
    "trammel",
    "bond"
  ],
  [
    "vogue",
    "currentness",
    "up-to-dateness",
    "currency"
  ],
  [
    "wealthiness",
    "riches",
    "wealth"
  ],
  [
    "charge",
    "account",
    "peak",
    "measure",
    "note",
    "placard",
    "notice",
    "flyer",
    "card",
    "beak",
    "nib",
    "poster",
    "neb",
    "vizor",
    "circular",
    "throwaway",
    "invoice",
    "greenback",
    "broadside",
    "flier",
    "bank note",
    "banknote",
    "billhook",
    "bank bill",
    "handbill",
    "broadsheet",
    "eyeshade",
    "government note",
    "federal reserve note",
    "visor",
    "bill"
  ],
  [
    "acknowledge",
    "reception",
    "receiving",
    "receipt"
  ],
  [
    "account",
    "bill",
    "invoice"
  ],
  [
    "repository",
    "pose",
    "posit",
    "bank",
    "stick",
    "wedge",
    "fix",
    "sediment",
    "situate",
    "depository",
    "sedimentation",
    "alluviation",
    "down payment",
    "bank deposit",
    "deposition",
    "lodge",
    "deposit"
  ],
  [
    "draw",
    "recall",
    "retreat",
    "sequester",
    "recede",
    "swallow",
    "adjourn",
    "disengage",
    "crawfish",
    "bow out",
    "retire",
    "take out",
    "seclude",
    "pull back",
    "back away",
    "pull away",
    "take back",
    "call back",
    "draw back",
    "back out",
    "crawfish out",
    "call in",
    "sequestrate",
    "move back",
    "unsay",
    "withdraw"
  ],
  [
    "finance"
  ],
  [
    "ruminate",
    "conjecture",
    "contemplate",
    "mull",
    "reflect",
    "job",
    "mull over",
    "suppose",
    "meditate",
    "hypothesize",
    "theorize",
    "chew over",
    "think over",
    "hypothecate",
    "theorise",
    "muse",
    "ponder",
    "speculate"
  ],
  [
    "vendue",
    "auctioneer",
    "auction bridge",
    "auction off",
    "auction sale",
    "auction"
  ],
  [
    "cod",
    "collate",
    "take in",
    "gather",
    "amass",
    "congregate",
    "compile",
    "accumulate",
    "call for",
    "due",
    "pull in",
    "owed",
    "pile up",
    "gather up",
    "pick up",
    "pull together",
    "garner",
    "hoard",
    "collect"
  ],
  [
    "flush",
    "bang",
    "point",
    "thrill",
    "bearing",
    "rouse",
    "level",
    "rush",
    "agitate",
    "load",
    "file",
    "commission",
    "shoot",
    "mission",
    "tutelage",
    "kick",
    "tear",
    "commit",
    "saddle",
    "direction",
    "commove",
    "appoint",
    "send",
    "excite",
    "consign",
    "complaint",
    "blame",
    "guardianship",
    "cathexis",
    "charge up",
    "accusation",
    "bill",
    "bear down",
    "accuse",
    "armorial bearing",
    "institutionalize",
    "burster",
    "shoot down",
    "electric charge",
    "bursting charge",
    "explosive charge",
    "heraldic bearing",
    "billing",
    "buck",
    "burden",
    "care",
    "lodge",
    "charge"
  ],
  [
    "yield",
    "give",
    "make up",
    "compensate",
    "remuneration",
    "devote",
    "wage",
    "salary",
    "earnings",
    "pay off",
    "ante up",
    "pay up",
    "bear",
    "pay"
  ],
  [
    "indebted"
  ],
  [
    "halcyon",
    "auspicious",
    "propitious",
    "rich",
    "easy",
    "comfortable",
    "favorable",
    "happy",
    "favourable",
    "golden",
    "encouraging",
    "flourishing",
    "successful",
    "thriving",
    "roaring",
    "booming",
    "lucky",
    "prospering",
    "palmy",
    "well-fixed",
    "well-heeled",
    "well-off",
    "well-to-do",
    "well-situated",
    "prosperous"
  ],
  [
    "thinner",
    "resolvent",
    "dissolvent",
    "dissolver",
    "dilutant",
    "dissolving agent",
    "solvent"
  ],
  [
    "overdrawn"
  ],
  [
    "collectadebt"
  ],
  [
    "brim",
    "flange",
    "lip",
    "rim"
  ],
  [
    "civic center",
    "municipal center",
    "down town",
    "hub"
  ],
  [
    "axle"
  ],
  [
    "axlepin"
  ],
  [
    "felloe",
    "felly"
  ],
  [
    "weary",
    "pall",
    "jade",
    "sap",
    "fatigue",
    "bore",
    "wear",
    "exhaust",
    "fag",
    "run down",
    "outwear",
    "tire out",
    "wear out",
    "wear down",
    "fag out",
    "use up",
    "wear upon",
    "tyre",
    "tire"
  ],
  [
    "rimstrip"
  ],
  [
    "wheelgrease"
  ],
  [
    "silver dollar",
    "cartwheel"
  ],
  [
    "wagonwheel"
  ],
  [
    "grindstone"
  ],
  [
    "potterswheel"
  ],
  [
    "barrow",
    "garden cart",
    "lawn cart",
    "wheelbarrow"
  ],
  [
    "cart",
    "pushcart",
    "go-cart",
    "handcart"
  ],
  [
    "bearing",
    "posture",
    "coach",
    "equipage",
    "rig",
    "passenger car",
    "carriage"
  ],
  [
    "millwheel"
  ],
  [
    "water wheel",
    "waterwheel"
  ],
  [
    "paddlewheel"
  ],
  [
    "gearwheel"
  ],
  [
    "sprocket",
    "cog"
  ],
  [
    "gear wheel",
    "gear",
    "cogwheel"
  ],
  [
    "charge",
    "presence",
    "posture",
    "comportment",
    "carriage",
    "productive",
    "heading",
    "armorial bearing",
    "heraldic bearing",
    "aim",
    "mien",
    "bearing"
  ],
  [
    "cylindrical lining",
    "bushing"
  ],
  [
    "pteridium aquilinum",
    "pasture brake",
    "bracken",
    "brake"
  ],
  [
    "brakeshoe"
  ],
  [
    "wheelchock"
  ],
  [
    "lazy susan",
    "turntable"
  ],
  [
    "flywheel"
  ],
  [
    "hubcap"
  ],
  [
    "lugnut"
  ],
  [
    "valvestem"
  ],
  [
    "rimwrench"
  ],
  [
    "wheeliron"
  ],
  [
    "greasepot"
  ],
  [
    "rotarymotion"
  ],
  [
    "torsion",
    "torque"
  ],
  [
    "frictionring"
  ],
  [
    "loot",
    "lucre",
    "kale",
    "pelf",
    "gelt",
    "staff of life",
    "dough",
    "dinero",
    "breadstuff",
    "moolah",
    "shekels",
    "cabbage",
    "bread"
  ],
  [
    "candlewax"
  ],
  [
    "poop",
    "soil",
    "crap",
    "filth",
    "gravel",
    "stain",
    "grease",
    "turd",
    "unimproved",
    "graveled",
    "malicious gossip",
    "unpaved",
    "ungraded",
    "grime",
    "scandal",
    "dirt"
  ],
  [
    "detritus",
    "disperse",
    "debris",
    "sprinkle",
    "junk",
    "rubble",
    "dot",
    "scatter",
    "dust"
  ],
  [
    "incarceration",
    "imprisonment",
    "immurement",
    "enslavement",
    "captivity"
  ],
  [
    "chalk"
  ],
  [
    "produce",
    "raise",
    "grow",
    "farm"
  ],
  [
    "farmplace",
    "farmstead"
  ],
  [
    "wheat berry",
    "corn",
    "wheat"
  ],
  [
    "barleycorn",
    "barley"
  ],
  [
    "rye whiskey",
    "rye whisky",
    "secale cereale",
    "rye"
  ],
  [
    "oats"
  ],
  [
    "broomcorn millet",
    "hog millet",
    "panicum miliaceum",
    "millet"
  ],
  [
    "sorghum molasses",
    "sorghum"
  ],
  [
    "address",
    "work",
    "cover",
    "handle",
    "deal",
    "turn",
    "treat",
    "plough",
    "plow"
  ],
  [
    "seed",
    "inseminate",
    "sow in",
    "sough",
    "sow"
  ],
  [
    "toss",
    "thrash",
    "convulse",
    "slash",
    "lam",
    "flail",
    "thrash about",
    "thresh about",
    "thresh"
  ],
  [
    "water",
    "irrigate"
  ],
  [
    "inseminate",
    "feed",
    "fertilize"
  ],
  [
    "work",
    "train",
    "crop",
    "school",
    "educate",
    "naturalize",
    "domesticate",
    "civilize",
    "cultivate"
  ],
  [
    "trough",
    "money box",
    "cashbox",
    "boulder clay",
    "public treasury",
    "till"
  ],
  [
    "trim",
    "crop",
    "clip",
    "cut",
    "dress",
    "snip",
    "rationalize",
    "cut back",
    "lop",
    "prune"
  ],
  [
    "hack",
    "chop up",
    "chop shot",
    "chopper",
    "chop"
  ],
  [
    "sudor",
    "piddle",
    "diaphoresis",
    "body of water",
    "perspiration",
    "hidrosis",
    "sweat",
    "irrigate",
    "lachrymal secretion",
    "urine",
    "piss",
    "weewee",
    "water supply",
    "pee",
    "h2o",
    "lacrimal secretion",
    "water system",
    "water"
  ],
  [
    "glean",
    "crop",
    "reap",
    "harvesting",
    "harvest home",
    "harvest time",
    "harvest"
  ],
  [
    "draw",
    "glean",
    "harvest",
    "reap"
  ],
  [
    "fan",
    "winnowing",
    "sifting",
    "winnow"
  ],
  [
    "gage",
    "pot",
    "grass",
    "sess",
    "dope",
    "cannabis",
    "mary jane",
    "ganja",
    "marijuana",
    "marihuana",
    "mary-jane",
    "cannabis sativa",
    "sens",
    "skunk",
    "smoke",
    "weed"
  ],
  [
    "engraft",
    "bribery",
    "transplant",
    "grafting",
    "ingraft",
    "graft"
  ],
  [
    "pout",
    "cut down",
    "mop",
    "hayloft",
    "mow"
  ],
  [
    "hold",
    "adhere",
    "oblige",
    "stick",
    "tie",
    "bandage",
    "tie up",
    "stick to",
    "hold fast",
    "constipate",
    "tie down",
    "bond",
    "truss",
    "bind"
  ],
  [
    "slew",
    "stagger",
    "spate",
    "mass",
    "pile",
    "deal",
    "mint",
    "batch",
    "peck",
    "sight",
    "mess",
    "heap",
    "wad",
    "pot",
    "flock",
    "distribute",
    "lot",
    "raft",
    "plenty",
    "great deal",
    "whole slew",
    "good deal",
    "whole lot",
    "hatful",
    "quite a little",
    "push-down list",
    "push-down storage",
    "push-down stack",
    "push-down store",
    "tidy sum",
    "mickle",
    "muckle",
    "smokestack",
    "stack"
  ],
  [
    "teach",
    "edward thatch",
    "edward teach",
    "blackbeard",
    "thatched roof",
    "thatch"
  ],
  [
    "disk",
    "harrow"
  ],
  [
    "daub",
    "poultice",
    "cataplasm",
    "stick on",
    "sticking plaster",
    "plaster over",
    "adhesive plaster",
    "plaster of paris",
    "plaster"
  ],
  [
    "reaping hook",
    "reap hook",
    "sickle"
  ],
  [
    "disperse",
    "dissipate",
    "sprinkle",
    "spread out",
    "break up",
    "dust",
    "dispel",
    "dot",
    "scattering",
    "strewing",
    "spread",
    "scatter"
  ],
  [
    "poke",
    "prise",
    "prize",
    "lever",
    "nose",
    "jimmy",
    "crowbar",
    "wrecking bar",
    "pry bar",
    "pry"
  ],
  [
    "stock",
    "depot",
    "storage",
    "reposition",
    "entrepot",
    "shop",
    "fund",
    "stow",
    "put in",
    "salt away",
    "storehouse",
    "lay in",
    "warehousing",
    "repositing",
    "stash away",
    "boughten",
    "store-bought",
    "storing",
    "factory-made",
    "memory board",
    "hive away",
    "stack away",
    "garner",
    "memory",
    "store"
  ],
  [
    "travail",
    "dig",
    "drudge",
    "mash",
    "mill",
    "grate",
    "nerd",
    "swot",
    "plodding",
    "drudgery",
    "labor",
    "craunch",
    "fag",
    "crunch",
    "wonk",
    "comminute",
    "pulverization",
    "donkeywork",
    "cranch",
    "pulverisation",
    "bray",
    "labour",
    "moil",
    "toil",
    "grind"
  ],
  [
    "squelch",
    "crush",
    "squeeze",
    "grind",
    "flirt",
    "coquette",
    "dally",
    "philander",
    "chat up",
    "crunch",
    "squash",
    "comminute",
    "bray",
    "coquet",
    "romance",
    "mash"
  ],
  [
    "agitation",
    "sour",
    "turn",
    "unrest",
    "fermentation",
    "fermenting",
    "zymosis",
    "zymolysis",
    "ferment"
  ],
  [
    "entreat",
    "urge",
    "compact",
    "push",
    "adjure",
    "beseech",
    "crush",
    "contract",
    "squeeze",
    "exhort",
    "bid",
    "jam",
    "pressing",
    "constrict",
    "pressure",
    "compress",
    "insistence",
    "closet",
    "wardrobe",
    "urge on",
    "fourth estate",
    "imperativeness",
    "insistency",
    "weigh",
    "printing press",
    "press out",
    "military press",
    "weightlift",
    "public press",
    "press"
  ],
  [
    "disregard",
    "slew",
    "issue",
    "reduce",
    "hack",
    "contract",
    "slue",
    "split",
    "curve",
    "thin",
    "swerve",
    "trim",
    "gash",
    "ignore",
    "down",
    "snub",
    "hewn",
    "abbreviate",
    "style",
    "veer",
    "make out",
    "tailor",
    "perforate",
    "swing",
    "cutting",
    "slash",
    "injured",
    "diluted",
    "prune",
    "rationalize",
    "cut off",
    "reduced",
    "incised",
    "cut up",
    "dilute",
    "perforated",
    "abridged",
    "cut down",
    "slice",
    "clipped",
    "slashed",
    "bring down",
    "gashed",
    "cold shoulder",
    "pierced",
    "sliced",
    "shredded",
    "stinger",
    "cut back",
    "deletion",
    "severed",
    "edit",
    "foreshorten",
    "punctured",
    "felled",
    "weakened",
    "decreased",
    "slitted",
    "turn off",
    "turn out",
    "chopped",
    "mown",
    "cut out",
    "switch off",
    "write out",
    "castrated",
    "thinned",
    "gelded",
    "edit out",
    "unsexed",
    "crosscut",
    "sheared",
    "trimmed",
    "downed",
    "emasculated",
    "shortened",
    "trim down",
    "cutting off",
    "thin out",
    "baseball swing",
    "trim back",
    "cut of meat",
    "hand-hewn",
    "abridge",
    "sheer",
    "shorten",
    "skip",
    "slit",
    "trend",
    "cut"
  ],
  [
    "infer",
    "understand",
    "conglomerate",
    "assemble",
    "meet",
    "gathering",
    "collect",
    "amass",
    "congregate",
    "accumulate",
    "cumulate",
    "get together",
    "tuck",
    "forgather",
    "pucker",
    "foregather",
    "pile up",
    "pull together",
    "garner",
    "gather"
  ],
  [
    "lift",
    "wind",
    "run up",
    "hoist"
  ],
  [
    "draw",
    "drag",
    "catch",
    "cart",
    "haulage",
    "haul"
  ],
  [
    "convey",
    "conduct",
    "hold",
    "express",
    "run",
    "channel",
    "stock",
    "execute",
    "take",
    "transmit",
    "extend",
    "persuade",
    "contain",
    "dribble",
    "acquit",
    "comport",
    "gestate",
    "transport",
    "pack",
    "expect",
    "behave",
    "stockpile",
    "deport",
    "bear",
    "sway",
    "carry"
  ],
  [
    "reject",
    "pick",
    "pluck",
    "cull"
  ],
  [
    "strain",
    "stock",
    "cover",
    "engender",
    "variety",
    "multiply",
    "half-breed",
    "spawn",
    "breed"
  ],
  [
    "reaping"
  ],
  [
    "threshing"
  ],
  [
    "winnow",
    "sifting",
    "winnowing"
  ],
  [
    "hoe"
  ],
  [
    "fork",
    "pitchfork"
  ],
  [
    "profligate",
    "pitch",
    "graze",
    "skim",
    "rip",
    "roue",
    "crease",
    "scan",
    "glance over",
    "run down",
    "blood",
    "rake"
  ],
  [
    "spade"
  ],
  [
    "sapling"
  ],
  [
    "cultivate",
    "work",
    "range",
    "graze",
    "trim",
    "harvest",
    "clip",
    "dress",
    "snip",
    "prune",
    "pasture",
    "browse",
    "cut back",
    "lop",
    "cut short",
    "craw",
    "crop"
  ],
  [
    "planting"
  ],
  [
    "irrigation"
  ],
  [
    "channel",
    "duct",
    "canalize",
    "canal"
  ],
  [
    "cisterna",
    "water tank",
    "cistern"
  ],
  [
    "woodlet",
    "grove",
    "orchard"
  ],
  [
    "vinery",
    "vineyard"
  ],
  [
    "hay"
  ],
  [
    "rick",
    "hayrick",
    "haystack"
  ],
  [
    "thatchedroof"
  ],
  [
    "garner",
    "granary"
  ],
  [
    "silo"
  ],
  [
    "byre"
  ],
  [
    "oxteam"
  ],
  [
    "drafthorse"
  ],
  [
    "compost"
  ],
  [
    "muck",
    "manure"
  ],
  [
    "fertilizer"
  ],
  [
    "share",
    "plowshare",
    "ploughshare"
  ],
  [
    "albatross",
    "millstone"
  ],
  [
    "grainmill"
  ],
  [
    "bundle",
    "sheaf"
  ],
  [
    "bundle of stalks"
  ],
  [
    "furrow ridge"
  ],
  [
    "tilled earth"
  ],
  [
    "shoot",
    "germinate",
    "pullulate",
    "bourgeon",
    "burgeon forth",
    "spud",
    "sprout"
  ],
  [
    "seedling"
  ],
  [
    "rootvegetable"
  ],
  [
    "lentil plant",
    "lens culinaris",
    "lentil"
  ],
  [
    "seedbag"
  ],
  [
    "handmill"
  ],
  [
    "thrash",
    "thresh",
    "lam",
    "flail"
  ],
  [
    "granger",
    "husbandman",
    "sodbuster",
    "farmer"
  ],
  [
    "threshingfloor"
  ],
  [
    "ingrain",
    "caryopsis",
    "granulate",
    "food grain",
    "metric grain",
    "cereal",
    "grain"
  ],
  [
    "fallowland"
  ],
  [
    "stiff",
    "cadaver",
    "corpse",
    "remains",
    "mud",
    "clay"
  ],
  [
    "material",
    "fabric",
    "textile",
    "cloth"
  ],
  [
    "layer"
  ],
  [
    "emollient",
    "skim",
    "pick",
    "ointment",
    "skim off",
    "soupy",
    "creamy",
    "cream off",
    "cream"
  ],
  [
    "disarray",
    "confounding",
    "discombobulation",
    "mix-up",
    "mental confusion",
    "confusion"
  ],
  [
    "legerdemain",
    "illusion",
    "deceit",
    "magic",
    "misrepresentation",
    "trick",
    "dissimulation",
    "dissembling",
    "magic trick",
    "conjuring trick",
    "deception"
  ],
  [
    "flint"
  ],
  [
    "flour"
  ],
  [
    "frogspawn"
  ],
  [
    "obscure",
    "haze",
    "daze",
    "mist",
    "murk",
    "befog",
    "cloud",
    "becloud",
    "murkiness",
    "haze over",
    "fogginess",
    "fog"
  ],
  [
    "nutrient",
    "food"
  ],
  [
    "ail",
    "allium sativum",
    "garlic"
  ],
  [
    "glaze",
    "spyglass",
    "glaze over",
    "looking glass",
    "glassful",
    "field glass",
    "drinking glass",
    "glass in",
    "glass over",
    "glass"
  ],
  [
    "aureate",
    "chromatic",
    "gilded",
    "amber",
    "gilt",
    "golden",
    "metallic",
    "atomic number 79",
    "au",
    "colored",
    "gold"
  ],
  [
    "embellish",
    "blessing",
    "adorn",
    "ornament",
    "deck",
    "decorate",
    "beautify",
    "gracility",
    "thanksgiving",
    "favour",
    "good will",
    "seemliness",
    "state of grace",
    "favor",
    "goodwill",
    "honor",
    "honour",
    "grace"
  ],
  [
    "peach",
    "denounce",
    "stag",
    "gage",
    "rat",
    "betray",
    "forage",
    "pot",
    "weed",
    "pasture",
    "sess",
    "give away",
    "shop",
    "snitch",
    "dope",
    "cannabis",
    "pasturage",
    "mary jane",
    "ganja",
    "eatage",
    "marijuana",
    "tell on",
    "marihuana",
    "grass over",
    "mary-jane",
    "cannabis sativa",
    "sens",
    "skunk",
    "smoke",
    "grass"
  ],
  [
    "acclaim",
    "come",
    "herald",
    "hail"
  ],
  [
    "hate",
    "hatred"
  ],
  [
    "chromatic",
    "love",
    "beloved",
    "loved one",
    "dearest",
    "colored",
    "dear",
    "honey"
  ],
  [
    "enmity",
    "aggression",
    "antagonism",
    "belligerency",
    "ill will",
    "hostility"
  ],
  [
    "frost",
    "frappe",
    "water ice",
    "ice rink",
    "icing",
    "frosting",
    "ice-skating rink",
    "ice"
  ],
  [
    "outrage",
    "exasperate",
    "cense",
    "infuriate",
    "thurify",
    "enfuriate",
    "incense"
  ],
  [
    "robust",
    "chain",
    "chains",
    "iron out",
    "branding iron",
    "irons",
    "cast-iron",
    "smoothing iron",
    "atomic number 26",
    "fe",
    "iron"
  ],
  [
    "impede",
    "muddle",
    "crush",
    "throng",
    "obstruct",
    "block",
    "hole",
    "press",
    "pile",
    "cram",
    "ram",
    "mess",
    "stuff",
    "wad",
    "pickle",
    "fix",
    "pack",
    "fill up",
    "fill",
    "occlude",
    "kettle of fish",
    "close up",
    "jamming",
    "jampack",
    "chock up",
    "electronic jamming",
    "mob",
    "jam"
  ],
  [
    "drive",
    "travail",
    "push",
    "grind",
    "dig",
    "drudge",
    "confinement",
    "tug",
    "labor",
    "proletariat",
    "parturiency",
    "fag",
    "working class",
    "childbed",
    "lying-in",
    "labor party",
    "labour party",
    "moil",
    "toil",
    "labour"
  ],
  [
    "leather"
  ],
  [
    "passion",
    "beloved",
    "lovemaking",
    "enjoy",
    "honey",
    "making love",
    "loved one",
    "dearest",
    "dear",
    "sexual love",
    "love"
  ],
  [
    "essence",
    "core",
    "pith",
    "substance",
    "heart",
    "meat",
    "kernel",
    "nub",
    "nitty-gritty",
    "inwardness",
    "bone marrow",
    "vegetable marrow",
    "marrow squash",
    "center",
    "gist",
    "sum",
    "marrow"
  ],
  [
    "existence",
    "macrocosm",
    "world",
    "creation",
    "nature",
    "universe",
    "cosmos"
  ],
  [
    "bloomrawiron"
  ],
  [
    "dross",
    "scoria",
    "slag"
  ],
  [
    "blower",
    "bellows"
  ],
  [
    "anvilstone"
  ],
  [
    "pair of tongs",
    "tongs"
  ],
  [
    "ore"
  ],
  [
    "orevein"
  ],
  [
    "metal bar",
    "block of metal",
    "ingot"
  ],
  [
    "ironhoard"
  ],
  [
    "metalworker",
    "smith"
  ],
  [
    "maillink"
  ],
  [
    "focus",
    "stud",
    "concentrate",
    "centre",
    "pore",
    "boss",
    "center",
    "rivet"
  ],
  [
    "smelt"
  ],
  [
    "contrive",
    "shape",
    "spurt",
    "form",
    "devise",
    "counterfeit",
    "mold",
    "formulate",
    "fake",
    "spirt",
    "hammer",
    "excogitate",
    "invent",
    "fashion",
    "mould",
    "smithy",
    "forge"
  ],
  [
    "assuage",
    "allay",
    "slake",
    "quench"
  ],
  [
    "hammershape"
  ],
  [
    "refineabloom"
  ],
  [
    "stokeafurnace"
  ],
  [
    "gatherore"
  ],
  [
    "forgeweld"
  ],
  [
    "moderate",
    "irritation",
    "pique",
    "chasten",
    "mood",
    "season",
    "humour",
    "anneal",
    "humor",
    "irritability",
    "toughness",
    "peevishness",
    "surliness",
    "pettishness",
    "snappishness",
    "biliousness",
    "harden",
    "temper"
  ],
  [
    "temper",
    "anneal"
  ],
  [
    "ofmetalcast"
  ],
  [
    "blacksmith"
  ],
  [
    "chromatic",
    "metallic",
    "tan",
    "bronzy",
    "colored",
    "bronze"
  ],
  [
    "bull",
    "pig",
    "fuzz",
    "cop",
    "copper color",
    "cu",
    "atomic number 29",
    "copper"
  ],
  [
    "canister",
    "put up",
    "tin can",
    "cannister",
    "atomic number 50",
    "can",
    "sn",
    "tin"
  ],
  [
    "debase",
    "admixture",
    "alloy"
  ],
  [
    "melting pot",
    "crucible"
  ],
  [
    "cast",
    "model",
    "shape",
    "form",
    "forge",
    "stamp",
    "molding",
    "mildew",
    "modeling",
    "moulding",
    "clay sculpture",
    "mould",
    "mold"
  ],
  [
    "castingpit"
  ],
  [
    "smeltinghearth"
  ],
  [
    "bronzeingot"
  ],
  [
    "oxhideingot"
  ],
  [
    "bronzesmith"
  ],
  [
    "castor",
    "caster"
  ],
  [
    "chisel"
  ],
  [
    "adz",
    "adze"
  ],
  [
    "bronzeaxe"
  ],
  [
    "bronzeknife"
  ],
  [
    "obelisk",
    "dagger"
  ],
  [
    "bronzemirror"
  ],
  [
    "embellish",
    "adorn",
    "ornamentation",
    "decorate",
    "beautify",
    "decoration",
    "grace",
    "ornament"
  ],
  [
    "ritualvessel"
  ],
  [
    "rivetingpin"
  ],
  [
    "castingsprue"
  ],
  [
    "chime",
    "gong",
    "buzzer",
    "doorbell",
    "alexander bell",
    "bell shape",
    "alexander graham bell",
    "campana",
    "bell"
  ],
  [
    "castbronze"
  ],
  [
    "smeltcopper"
  ],
  [
    "pourmoltenmetal"
  ],
  [
    "scrapeamold"
  ],
  [
    "hammerfinish"
  ],
  [
    "polishbronze"
  ],
  [
    "breakamold"
  ],
  [
    "trimacasting"
  ],
  [
    "rivetplates"
  ],
  [
    "coolacasting"
  ],
  [
    "reedboat"
  ],
  [
    "plankbuiltboat"
  ],
  [
    "keelbeam"
  ],
  [
    "peg",
    "pin",
    "rowlock",
    "tholepin",
    "thole",
    "oarlock"
  ],
  [
    "steeringoar"
  ],
  [
    "caulkingfiber"
  ],
  [
    "tarpitch"
  ],
  [
    "plaitedrope"
  ],
  [
    "bronzeboatnail"
  ],
  [
    "cargocrate"
  ],
  [
    "maststep"
  ],
  [
    "caulkavessel"
  ],
  [
    "layplanks"
  ],
  [
    "sealwithpitch"
  ],
  [
    "bindwithrope"
  ],
  [
    "loadcargo"
  ],
  [
    "packanimal"
  ],
  [
    "tradeweight"
  ],
  [
    "merchantseal"
  ],
  [
    "sealedtablet"
  ],
  [
    "protection",
    "testimonial",
    "tribute"
  ],
  [
    "marketstall"
  ],
  [
    "spice bundle"
  ],
  [
    "ingotstack"
  ],
  [
    "weighingbeam"
  ],
  [
    "weighgoods"
  ],
  [
    "sealatablet"
  ],
  [
    "collecttribute"
  ],
  [
    "packacaravan"
  ],
  [
    "bronzeidol"
  ],
  [
    "libationbowl"
  ],
  [
    "ritualladle"
  ],
  [
    "incenseburner"
  ],
  [
    "sacredstandard"
  ],
  [
    "ritualmask"
  ],
  [
    "processionalgong"
  ],
  [
    "sacrificialblade"
  ],
  [
    "purificationsprinkle"
  ],
  [
    "offeringplate"
  ],
  [
    "bronzecuirass"
  ],
  [
    "scalearmor"
  ],
  [
    "warchariot"
  ],
  [
    "chariotwheel"
  ],
  [
    "slingbullet"
  ],
  [
    "compositebow"
  ],
  [
    "bronzesword"
  ],
  [
    "towershield"
  ],
  [
    "axebladesocket"
  ],
  [
    "warplume"
  ],
  [
    "fitasocketedblade"
  ],
  [
    "stringacompositebow"
  ],
  [
    "driveawarchariot"
  ],
  [
    "castspearheads"
  ],
  [
    "raiseawarplume"
  ],
  [
    "mead"
  ],
  [
    "essence",
    "core",
    "pith",
    "substance",
    "marrow",
    "heart",
    "kernel",
    "nub",
    "nitty-gritty",
    "inwardness",
    "center",
    "gist",
    "sum",
    "meat"
  ],
  [
    "money"
  ],
  [
    "clay",
    "muck up",
    "mire",
    "muck",
    "mud"
  ],
  [
    "euphony",
    "medicine",
    "sheet music",
    "music"
  ],
  [
    "mustard greens",
    "leaf mustard",
    "table mustard",
    "indian mustard",
    "mustard"
  ],
  [
    "anele",
    "anoint",
    "lube",
    "oil color",
    "lubricate",
    "ambrocate",
    "oil"
  ],
  [
    "envenom",
    "poison"
  ],
  [
    "porridge"
  ],
  [
    "prose"
  ],
  [
    "pelting",
    "rainfall",
    "rain down",
    "rainwater",
    "rain"
  ],
  [
    "retaliation",
    "avenge",
    "retaliate",
    "revenge"
  ],
  [
    "bitisgabonica"
  ],
  [
    "sharp",
    "tasteful",
    "brackish",
    "briny",
    "saliferous",
    "salt-cured",
    "salinity",
    "salted",
    "table salt",
    "common salt",
    "saltiness",
    "saline",
    "salty",
    "salt"
  ],
  [
    "grit",
    "gumption",
    "backbone",
    "guts",
    "sandpaper",
    "sand"
  ],
  [
    "auntie",
    "aunty",
    "aunt"
  ],
  [
    "paternalaunt"
  ],
  [
    "maternalaunt"
  ],
  [
    "sauce"
  ],
  [
    "slew",
    "view",
    "spate",
    "mass",
    "pile",
    "survey",
    "deal",
    "mint",
    "vision",
    "batch",
    "peck",
    "mess",
    "heap",
    "wad",
    "pot",
    "flock",
    "stack",
    "lot",
    "raft",
    "plenty",
    "great deal",
    "whole slew",
    "good deal",
    "visual sense",
    "whole lot",
    "hatful",
    "quite a little",
    "tidy sum",
    "visual modality",
    "mickle",
    "muckle",
    "sight"
  ],
  [
    "gage",
    "fume",
    "hummer",
    "pot",
    "weed",
    "grass",
    "sess",
    "bullet",
    "dope",
    "smoking",
    "cannabis",
    "mary jane",
    "fastball",
    "heater",
    "ganja",
    "marijuana",
    "marihuana",
    "roll of tobacco",
    "sens",
    "skunk",
    "smoke"
  ],
  [
    "smokedmeat"
  ],
  [
    "coke",
    "hoodwink",
    "lead by the nose",
    "bamboozle",
    "snowfall",
    "cocain",
    "play false",
    "cocaine",
    "c",
    "snow"
  ],
  [
    "soup"
  ],
  [
    "steam clean",
    "steam"
  ],
  [
    "skyrocket",
    "arugula",
    "roquette",
    "rocket engine",
    "rocket salad",
    "eruca sativa",
    "eruca vesicaria sativa",
    "garden rocket",
    "rocket"
  ],
  [
    "spaceship"
  ],
  [
    "solarsystem"
  ],
  [
    "beetleweed",
    "galax urceolata",
    "extragalactic nebula",
    "wandflower",
    "galax",
    "galaxy"
  ],
  [
    "interstellartravel"
  ],
  [
    "exitorbit"
  ],
  [
    "enterorbit"
  ],
  [
    "ambit",
    "domain",
    "range",
    "scope",
    "reach",
    "field",
    "area",
    "sphere",
    "compass",
    "revolve",
    "orbital cavity",
    "eye socket",
    "arena",
    "orbit"
  ],
  [
    "satellite",
    "planet"
  ],
  [
    "uninhabitedplanet"
  ],
  [
    "inhabitedplanet"
  ],
  [
    "blackhole"
  ],
  [
    "solarradiation"
  ],
  [
    "spacestation"
  ],
  [
    "planetinhabitedbyintelligentlife"
  ],
  [
    "chromatic",
    "stalk",
    "husk",
    "chaff",
    "shuck",
    "strew",
    "stubble",
    "colored",
    "straw"
  ],
  [
    "train",
    "thread",
    "twine",
    "chain",
    "drawstring",
    "string up",
    "string along",
    "bowed stringed instrument",
    "linguistic string",
    "string of words",
    "word string",
    "strand",
    "string"
  ],
  [
    "word",
    "news",
    "tidings",
    "intelligence activity",
    "intelligence operation",
    "intelligence"
  ],
  [
    "direct",
    "reckon",
    "figure",
    "account",
    "cipher",
    "forecast",
    "cypher",
    "estimate",
    "compute",
    "count on",
    "aim",
    "calculate"
  ],
  [
    "consider",
    "reckon",
    "enumeration",
    "tally",
    "reckoning",
    "enumerate",
    "number",
    "weigh",
    "counting",
    "numeration",
    "matter",
    "count"
  ],
  [
    "regard",
    "consider",
    "see",
    "view",
    "figure",
    "cipher",
    "think",
    "forecast",
    "count",
    "suppose",
    "cypher",
    "estimate",
    "calculate",
    "imagine",
    "guess",
    "compute",
    "count on",
    "reckon"
  ],
  [
    "figureout"
  ],
  [
    "infer",
    "derive",
    "deduct",
    "deduce"
  ],
  [
    "repose",
    "ataraxis",
    "peacefulness",
    "heartsease",
    "peace of mind",
    "peace treaty",
    "public security",
    "serenity",
    "peace"
  ],
  [
    "chicanery",
    "skulduggery",
    "jiggery-pokery",
    "hocus-pocus",
    "shenanigan",
    "hanky panky",
    "skullduggery",
    "slickness",
    "guile",
    "wile",
    "trickery"
  ],
  [
    "accuracy",
    "true statement",
    "verity",
    "truth"
  ],
  [
    "genus tuber",
    "tuber"
  ],
  [
    "vine"
  ],
  [
    "vinespeciesfoundgrowingonrockyoutcroppingsandwhoseleavesarecrushedsoakedinwaterandappliedtotheskintotreatacneandrashes"
  ],
  [
    "vinespecieswhosetuberousrootsarepeeledandeatenraworroastedandwhosebeanlikeseedsarecookedandeaten"
  ],
  [
    "shrubspecieswhoseredoryellowberriesareeatenrawandwhosestemsaremadeintoarrowsspearsandwalkingsticksandareusedtobuildhouses"
  ],
  [
    "vinegar"
  ],
  [
    "lead",
    "hoist",
    "twist",
    "wrap",
    "curve",
    "steer",
    "lift",
    "thread",
    "scent",
    "hint",
    "roll",
    "tip",
    "weave",
    "flatus",
    "nothingness",
    "wreathe",
    "jazz",
    "wind up",
    "nose",
    "fart",
    "farting",
    "breaking wind",
    "confidential information",
    "wind instrument",
    "idle words",
    "meander",
    "winding",
    "wind"
  ],
  [
    "acquisition",
    "accomplishment",
    "attainment",
    "science",
    "acquirement",
    "skill"
  ],
  [
    "vino",
    "wine-colored",
    "wine"
  ],
  [
    "forest",
    "woods",
    "wooden",
    "woodwind",
    "woodwind instrument",
    "wood"
  ],
  [
    "cultivate",
    "address",
    "process",
    "function",
    "run",
    "cover",
    "play",
    "handle",
    "act",
    "study",
    "operate",
    "oeuvre",
    "deal",
    "crop",
    "job",
    "treat",
    "lick",
    "follow",
    "exercise",
    "employment",
    "bring",
    "plow",
    "wreak",
    "airt",
    "knead",
    "solve",
    "figure out",
    "work on",
    "workplace",
    "piece of work",
    "puzzle out",
    "body of work",
    "make for",
    "do work",
    "go",
    "put to work",
    "be",
    "work"
  ],
  [
    "roof of the mouth",
    "palate"
  ],
  [
    "barm",
    "yeast"
  ],
  [
    "butter"
  ],
  [
    "objective",
    "direct",
    "point",
    "drive",
    "bearing",
    "purpose",
    "take",
    "object",
    "train",
    "purport",
    "intention",
    "design",
    "get",
    "propose",
    "intent",
    "aspire",
    "calculate",
    "heading",
    "take aim",
    "shoot for",
    "place",
    "target",
    "aim"
  ],
  [
    "look",
    "seem",
    "come out",
    "come along",
    "appear"
  ],
  [
    "inquire",
    "necessitate",
    "demand",
    "pose",
    "need",
    "take",
    "involve",
    "enquire",
    "require",
    "call for",
    "expect",
    "ask"
  ],
  [
    "peach",
    "burble",
    "ripple",
    "gurgle",
    "blather",
    "tattle",
    "babbling",
    "blab",
    "sing",
    "smatter",
    "talk",
    "blether",
    "guggle",
    "blither",
    "blab out",
    "babble out",
    "bubble",
    "babble"
  ],
  [
    "erupt",
    "eructation",
    "belching",
    "burp",
    "eruct",
    "burping",
    "bubble",
    "belch"
  ],
  [
    "break",
    "crack",
    "give",
    "burst",
    "tumble",
    "crash",
    "founder",
    "flop",
    "crumple",
    "break down",
    "break up",
    "cave in",
    "give way",
    "crack up",
    "crock up",
    "fall in",
    "crumble",
    "collapse"
  ],
  [
    "welfare",
    "do good",
    "gain",
    "profit",
    "benefit"
  ],
  [
    "blate",
    "blat",
    "baa",
    "bleat"
  ],
  [
    "flush",
    "prime",
    "efflorescence",
    "blossom",
    "peak",
    "blush",
    "blooming",
    "heyday",
    "rosiness",
    "flower",
    "bloom of youth",
    "bloom"
  ],
  [
    "hold",
    "stay",
    "detain",
    "detention",
    "hold up",
    "time lag",
    "postponement",
    "holdup",
    "wait",
    "delay"
  ],
  [
    "flush",
    "prime",
    "efflorescence",
    "peak",
    "blossom out",
    "heyday",
    "unfold",
    "flower",
    "blossom forth",
    "bloom",
    "blossom"
  ],
  [
    "seethe",
    "hum",
    "bombinate",
    "bombilate",
    "buzz"
  ],
  [
    "chatter",
    "yack",
    "yakety-yak",
    "yak",
    "cackle"
  ],
  [
    "point",
    "disperse",
    "stud",
    "sprinkle",
    "constellate",
    "dust",
    "scatter",
    "dit",
    "dot"
  ],
  [
    "derive",
    "fall",
    "fare",
    "get",
    "follow",
    "descend",
    "occur",
    "make out",
    "total",
    "hail",
    "do",
    "amount",
    "arrive",
    "add up",
    "come up",
    "number",
    "come in",
    "get along",
    "issue forth",
    "come"
  ],
  [
    "plain",
    "kvetch",
    "quetch",
    "kick",
    "sound off",
    "complain"
  ],
  [
    "creep",
    "fawn",
    "cringe",
    "grovel",
    "cower",
    "creeping",
    "crawling",
    "front crawl",
    "australian crawl",
    "crawl"
  ],
  [
    "oftermitesemergeandfeedatnight"
  ],
  [
    "impart",
    "break",
    "divulge",
    "hold",
    "reveal",
    "expose",
    "disclose",
    "announce",
    "bring out",
    "give away",
    "let out",
    "adjudge",
    "let on",
    "discover",
    "declare"
  ],
  [
    "break",
    "pall",
    "exit",
    "expire",
    "fail",
    "break down",
    "dice",
    "decease",
    "give way",
    "perish",
    "give out",
    "die out",
    "conk out",
    "go",
    "pass away",
    "become flat",
    "die"
  ],
  [
    "plunge",
    "plunk",
    "diving",
    "honkytonk",
    "nose dive",
    "dive"
  ],
  [
    "dribble",
    "trickle",
    "drip"
  ],
  [
    "laggard",
    "monotone",
    "droning",
    "dawdler",
    "drone on",
    "drone pipe",
    "pilotless aircraft",
    "radio-controlled aircraft",
    "bourdon",
    "drone"
  ],
  [
    "break",
    "neglect",
    "die",
    "betray",
    "break down",
    "run out",
    "give way",
    "flunk",
    "go wrong",
    "give out",
    "miscarry",
    "conk out",
    "go",
    "flush it",
    "bomb",
    "fail"
  ],
  [
    "light",
    "diminish",
    "strike",
    "twilight",
    "gloaming",
    "dusk",
    "decline",
    "flow",
    "pass",
    "return",
    "surrender",
    "drop",
    "capitulation",
    "tumble",
    "nightfall",
    "descent",
    "evenfall",
    "accrue",
    "shine",
    "come",
    "descend",
    "hang",
    "precipitate",
    "downfall",
    "decrease",
    "pin",
    "spill",
    "devolve",
    "downslope",
    "autumn",
    "falling",
    "lessen",
    "go down",
    "declivity",
    "come down",
    "fall"
  ],
  [
    "flatus",
    "wind",
    "farting",
    "breaking wind",
    "break wind",
    "fart"
  ],
  [
    "fly",
    "take flight",
    "flee"
  ],
  [
    "drift",
    "swim",
    "be adrift",
    "ice-cream soda",
    "ice-cream float",
    "blow",
    "float"
  ],
  [
    "slew",
    "slip",
    "glide",
    "slue",
    "slither",
    "skid",
    "swoop",
    "chute",
    "lantern slide",
    "sloping trough",
    "slide"
  ],
  [
    "glint",
    "glimmer",
    "glow",
    "gleaming",
    "shine",
    "glisten",
    "lambency",
    "glitter",
    "gleam"
  ],
  [
    "gliding",
    "soaring",
    "sailing",
    "semivowel",
    "sailplaning",
    "slide",
    "glide"
  ],
  [
    "gleam",
    "beam",
    "radiate",
    "radiance",
    "gleaming",
    "shine",
    "luminescence",
    "incandescence",
    "burn",
    "lambency",
    "glowing",
    "freshness",
    "glow"
  ],
  [
    "over",
    "decussate",
    "crossed",
    "crosswise",
    "intersecting",
    "crossways",
    "intersectant",
    "across"
  ],
  [
    "finished",
    "done",
    "through and through",
    "through with",
    "through"
  ],
  [
    "complete",
    "concluded",
    "immoderate",
    "terminated",
    "across",
    "all over",
    "ended",
    "over"
  ],
  [
    "break",
    "crack",
    "work",
    "lead",
    "plump",
    "endure",
    "function",
    "pass",
    "fit",
    "run",
    "fling",
    "die",
    "sound",
    "operate",
    "extend",
    "whirl",
    "start",
    "move",
    "turn",
    "live",
    "last",
    "proceed",
    "get",
    "spell",
    "depart",
    "exit",
    "travel",
    "expire",
    "offer",
    "fail",
    "break down",
    "blend",
    "hold up",
    "become",
    "survive",
    "decease",
    "hold out",
    "give way",
    "tour",
    "rifle",
    "belong",
    "perish",
    "go away",
    "blend in",
    "get going",
    "locomote",
    "give out",
    "conk out",
    "live on",
    "pass away",
    "run low",
    "run short",
    "go game",
    "go"
  ],
  [
    "aggrieve",
    "sorrow",
    "grieve"
  ],
  [
    "produce",
    "develop",
    "acquire",
    "rise",
    "raise",
    "arise",
    "turn",
    "get",
    "mature",
    "farm",
    "originate",
    "spring up",
    "maturate",
    "grow"
  ],
  [
    "flow",
    "attend",
    "fall",
    "bent",
    "advert",
    "knack",
    "cling",
    "string up",
    "pay attention",
    "pay heed",
    "give ear",
    "hang up",
    "hang"
  ],
  [
    "slew",
    "slip",
    "slue",
    "sideslip",
    "slide",
    "skid"
  ],
  [
    "snort",
    "sibilate",
    "hoot",
    "siss",
    "boo",
    "razzing",
    "bird",
    "raspberry",
    "whoosh",
    "hissing",
    "sizz",
    "bronx cheer",
    "hiss"
  ],
  [
    "gall",
    "gag",
    "chafe",
    "fray",
    "niggle",
    "fuss",
    "scratch",
    "grate",
    "swither",
    "erode",
    "choke",
    "rub",
    "lather",
    "stew",
    "sweat",
    "rankle",
    "eat away",
    "eat into",
    "fret"
  ],
  [
    "rush",
    "speed",
    "rushing",
    "hastiness",
    "look sharp",
    "hurriedness",
    "travel rapidly",
    "haste",
    "hasten",
    "zip",
    "hurry"
  ],
  [
    "propel",
    "force",
    "impel"
  ],
  [
    "vexation",
    "distress",
    "brood",
    "concern",
    "trouble",
    "dwell",
    "mind",
    "interest",
    "occupy",
    "headache",
    "care",
    "worry"
  ],
  [
    "spring",
    "rise",
    "start",
    "startle",
    "leap",
    "alternate",
    "stand out",
    "jump out",
    "pass over",
    "climb up",
    "jumpstart",
    "derail",
    "jumping",
    "leap out",
    "skip over",
    "parachuting",
    "run off the rails",
    "bound",
    "skip",
    "jump"
  ],
  [
    "keen",
    "wail",
    "requiem",
    "bemoan",
    "elegy",
    "dirge",
    "regret",
    "lamentation",
    "deplore",
    "plaint",
    "threnody",
    "bewail",
    "coronach",
    "lament"
  ],
  [
    "endure",
    "hot",
    "experience",
    "subsist",
    "dwell",
    "resilient",
    "last",
    "charged",
    "smoldering",
    "loaded",
    "elastic",
    "inhabit",
    "know",
    "alive",
    "shack",
    "exist",
    "populate",
    "hold up",
    "smouldering",
    "living",
    "survive",
    "hold out",
    "people",
    "bouncy",
    "springy",
    "unrecorded",
    "whippy",
    "live on",
    "go",
    "unfilmed",
    "untaped",
    "be",
    "current",
    "lively",
    "reside",
    "live"
  ],
  [
    "spite",
    "hurt",
    "offend",
    "wound",
    "injure"
  ],
  [
    "base",
    "spiteful",
    "skilled",
    "ignoble",
    "entail",
    "awful",
    "nasty",
    "little",
    "miserly",
    "tight",
    "small",
    "think",
    "average",
    "poor",
    "signify",
    "stingy",
    "intend",
    "meanspirited",
    "hateful",
    "ungenerous",
    "mingy",
    "imply",
    "have in mind",
    "stand for",
    "think of",
    "beggarly",
    "mean"
  ],
  [
    "prompt",
    "incite",
    "strike",
    "propel",
    "affect",
    "run",
    "act",
    "impress",
    "movement",
    "proceed",
    "displace",
    "travel",
    "motivate",
    "locomote",
    "go",
    "be active",
    "make a motion",
    "motion",
    "move"
  ],
  [
    "nutation",
    "sway",
    "nod"
  ],
  [
    "flood",
    "outpouring",
    "overrun",
    "bubble over",
    "overflowing",
    "spill over",
    "runoff",
    "overspill",
    "brim over",
    "well over",
    "run over",
    "overflow"
  ],
  [
    "die",
    "exit",
    "expire",
    "decease",
    "go",
    "pass away",
    "perish"
  ],
  [
    "render",
    "work",
    "run",
    "caper",
    "maneuver",
    "frolic",
    "encounter",
    "represent",
    "act",
    "flirt",
    "dally",
    "trifle",
    "meet",
    "turn",
    "spiel",
    "bid",
    "romp",
    "toy",
    "sport",
    "take on",
    "gambol",
    "bring",
    "diddle",
    "shimmer",
    "fiddle",
    "wreak",
    "pretend",
    "fun",
    "manoeuvre",
    "make-believe",
    "playact",
    "gambling",
    "act as",
    "gaming",
    "free rein",
    "make for",
    "play on",
    "roleplay",
    "recreate",
    "looseness",
    "period of play",
    "drama",
    "playing period",
    "play"
  ],
  [
    "implore",
    "beg",
    "pray"
  ],
  [
    "realise"
  ],
  [
    "look",
    "seek",
    "explore",
    "research",
    "searching",
    "hunt",
    "hunting",
    "look for",
    "lookup",
    "search"
  ],
  [
    "wallow",
    "joy",
    "exult",
    "jubilate",
    "revel",
    "triumph",
    "rejoice"
  ],
  [
    "repose",
    "respite",
    "lie",
    "ease",
    "perch",
    "relief",
    "quietus",
    "roost",
    "residuum",
    "remain",
    "breathe",
    "stay",
    "sleep",
    "eternal sleep",
    "relaxation",
    "remainder",
    "residual",
    "residue",
    "eternal rest",
    "pillow",
    "rest period",
    "take a breather",
    "reside",
    "rest"
  ],
  [
    "crap",
    "putrefaction",
    "bunk",
    "hogwash",
    "guff",
    "waste",
    "bunkum",
    "buncombe",
    "bull",
    "decompose",
    "decomposition",
    "rotting",
    "irish bull",
    "molder",
    "moulder",
    "rot"
  ],
  [
    "impudent",
    "jerk",
    "pitch",
    "insolent",
    "pass",
    "riffle",
    "throw",
    "flick",
    "toss",
    "interchange",
    "switch",
    "alternate",
    "riff",
    "thumb",
    "twitch",
    "disrespectful",
    "sky",
    "leaf",
    "turn over",
    "flip-flop",
    "somersault",
    "snotty-nosed",
    "flip over",
    "somersaulting",
    "flip"
  ],
  [
    "plume",
    "imbue",
    "fleece",
    "sop",
    "pawn",
    "souse",
    "hook",
    "pluck",
    "hock",
    "drench",
    "gazump",
    "saturate",
    "soaking",
    "surcharge",
    "dowse",
    "rob",
    "overcharge",
    "inebriate",
    "intoxicate",
    "soakage",
    "hit it up",
    "douse",
    "soak"
  ],
  [
    "strike",
    "gleam",
    "glint",
    "beam",
    "glow",
    "fall",
    "reflect",
    "smooth",
    "radiate",
    "radiance",
    "glisten",
    "polish",
    "glitter",
    "effulgence",
    "refulgence",
    "radiancy",
    "smoothen",
    "refulgency",
    "shine"
  ],
  [
    "shit"
  ],
  [
    "model",
    "pose",
    "posture",
    "ride",
    "seat",
    "sit down",
    "baby-sit",
    "sit"
  ],
  [
    "spurt",
    "spirt",
    "eject",
    "small fry",
    "pip-squeak",
    "squeeze out",
    "force out",
    "jet",
    "squirt"
  ],
  [
    "quietus",
    "rest",
    "kip",
    "slumber",
    "eternal sleep",
    "nap",
    "eternal rest",
    "sleep"
  ],
  [
    "surreptitious",
    "abstract",
    "slip",
    "furtive",
    "creep",
    "lift",
    "pinch",
    "canary",
    "skulking",
    "lurking",
    "stealthy",
    "hook",
    "purloin",
    "pilfer",
    "sneaky",
    "nobble",
    "filch",
    "fink",
    "pussyfoot",
    "swipe",
    "steal",
    "snarf",
    "snitch",
    "prowler",
    "stoolie",
    "stoolpigeon",
    "cabbage",
    "mouse",
    "sneak"
  ],
  [
    "address",
    "mouth",
    "talk",
    "verbalize",
    "utter",
    "speak"
  ],
  [
    "falter",
    "stutter",
    "stammer"
  ],
  [
    "base",
    "support",
    "abide",
    "endure",
    "stall",
    "rack",
    "viewpoint",
    "resist",
    "stomach",
    "suffer",
    "tolerate",
    "standpoint",
    "stands",
    "pedestal",
    "standstill",
    "subscribe",
    "stand up",
    "put up",
    "point of view",
    "tie-up",
    "sales booth",
    "bandstand",
    "remain firm",
    "outdoor stage",
    "place upright",
    "bear",
    "brook",
    "stand"
  ],
  [
    "stride",
    "pace",
    "tread",
    "tone",
    "measure",
    "footfall",
    "gradation",
    "stair",
    "footstep",
    "footprint",
    "footmark",
    "whole step",
    "whole tone",
    "dance step",
    "step"
  ],
  [
    "fetor",
    "malodor",
    "stench",
    "reek",
    "malodour",
    "foetor",
    "stink"
  ],
  [
    "subjugate",
    "suppress",
    "surmount",
    "reduce",
    "master",
    "quash",
    "overcome",
    "curb",
    "inhibit",
    "mortify",
    "conquer",
    "chasten",
    "repress",
    "get over",
    "swim",
    "keep down",
    "stamp down",
    "tame",
    "subdue"
  ],
  [
    "sustain",
    "abide",
    "endure",
    "hurt",
    "ache",
    "have",
    "stand",
    "meet",
    "get",
    "stomach",
    "tolerate",
    "put up",
    "bear",
    "brook",
    "suffer"
  ],
  [
    "intimate",
    "evoke",
    "indicate",
    "advise",
    "hint",
    "propose",
    "paint a picture",
    "suggest"
  ],
  [
    "keen",
    "good",
    "cool",
    "great",
    "dandy",
    "beau",
    "bully",
    "nifty",
    "well",
    "neat",
    "groovy",
    "distend",
    "dude",
    "swell up",
    "corking",
    "sheik",
    "clotheshorse",
    "slap-up",
    "cracking",
    "bang-up",
    "puff up",
    "smashing",
    "peachy",
    "fashion plate",
    "not bad",
    "well up",
    "crestless wave",
    "fop",
    "gallant",
    "swell"
  ],
  [
    "subdued",
    "docile",
    "subdue",
    "cultivated",
    "domestic",
    "chasten",
    "broken",
    "tamed",
    "domesticated",
    "broken in",
    "unexciting",
    "gentle",
    "meek",
    "tame"
  ],
  [
    "puff",
    "draw",
    "sweep",
    "pull",
    "trail",
    "tangle",
    "haul",
    "cart",
    "embroil",
    "get behind",
    "scuff",
    "hang back",
    "drag on",
    "drag out",
    "drop behind",
    "sweep up",
    "retarding force",
    "drag in",
    "dredge",
    "drag"
  ],
  [
    "mean",
    "consider",
    "conceive",
    "cogitate",
    "reckon",
    "recall",
    "believe",
    "suppose",
    "intend",
    "retrieve",
    "cerebrate",
    "remember",
    "imagine",
    "call back",
    "guess",
    "remind",
    "call up",
    "recollect",
    "think"
  ],
  [
    "shake",
    "didder",
    "shiver",
    "tremble"
  ],
  [
    "infer",
    "see",
    "interpret",
    "realize",
    "sympathize",
    "empathize",
    "gather",
    "read",
    "translate",
    "understand"
  ],
  [
    "make",
    "micturate",
    "piddle",
    "puddle",
    "wee-wee",
    "spend a penny",
    "wee",
    "relieve oneself",
    "piss",
    "make water",
    "pee-pee",
    "take a leak",
    "pass water",
    "pee",
    "urinate"
  ],
  [
    "brave",
    "jeopardize",
    "adventure",
    "speculation",
    "stake",
    "embark",
    "guess",
    "hazard",
    "venture"
  ],
  [
    "wade"
  ],
  [
    "arouse",
    "awaken",
    "aftermath",
    "backwash",
    "waken",
    "awake",
    "viewing",
    "wake up",
    "come alive",
    "wake island",
    "wake"
  ],
  [
    "hold",
    "look",
    "await",
    "hold back",
    "expect",
    "time lag",
    "postponement",
    "waiting",
    "hold off",
    "delay",
    "wait"
  ],
  [
    "chargeofmoney"
  ],
  [
    "chargeat"
  ],
  [
    "cry",
    "weep"
  ],
  [
    "regard",
    "want",
    "like",
    "bid",
    "compliments",
    "wish well",
    "indirect request",
    "care",
    "will",
    "wishing",
    "wish"
  ],
  [
    "dash",
    "dart",
    "scud",
    "shoot",
    "flash",
    "scoot"
  ],
  [
    "gape",
    "yaw",
    "yawn"
  ],
  [
    "spring",
    "bounce",
    "jump",
    "leaping",
    "bound",
    "leap"
  ],
  [
    "have",
    "take",
    "admit",
    "consent",
    "assume",
    "swallow",
    "take on",
    "take over",
    "go for",
    "bear",
    "accept"
  ],
  [
    "deal",
    "allocate",
    "share",
    "divvy up",
    "portion out",
    "apportion"
  ],
  [
    "order",
    "set",
    "stage",
    "set up",
    "coif",
    "put",
    "dress",
    "coiffure",
    "do",
    "bring about",
    "format",
    "fix up",
    "coiffe",
    "arrange"
  ],
  [
    "reach",
    "accomplish",
    "hit",
    "make",
    "achieve",
    "arrive at",
    "gain",
    "attain"
  ],
  [
    "broil",
    "baking",
    "bake"
  ],
  [
    "removebarkfromatree"
  ],
  [
    "disregard",
    "overlook",
    "miss",
    "drop",
    "ignore",
    "omit",
    "negligence",
    "fail",
    "disuse",
    "carelessness",
    "leave out",
    "overleap",
    "nonperformance",
    "cold-shoulder",
    "neglectfulness",
    "slight",
    "neglect"
  ],
  [
    "disregard",
    "neglect",
    "dismiss",
    "snub",
    "cut",
    "brush off",
    "discount",
    "brush aside",
    "cold-shoulder",
    "push aside",
    "slight",
    "ignore"
  ],
  [
    "thrum",
    "scramble",
    "dead",
    "trounce",
    "thump",
    "circumvent",
    "crush",
    "round",
    "measure",
    "flap",
    "circuit",
    "pound",
    "get",
    "pulse",
    "perplex",
    "meter",
    "rhythm",
    "amaze",
    "gravel",
    "bewilder",
    "nonplus",
    "baffle",
    "vanquish",
    "flummox",
    "stupefy",
    "dumbfound",
    "puzzle",
    "exhaust",
    "stupify",
    "tick",
    "drum",
    "mystify",
    "beat up",
    "bushed",
    "pulsation",
    "rip off",
    "cheat",
    "heartbeat",
    "ticktack",
    "ticktock",
    "tucker",
    "overreach",
    "all in",
    "outsmart",
    "tucker out",
    "outwit",
    "outfox",
    "beat out",
    "sell short",
    "musical rhythm",
    "cadence",
    "beat"
  ],
  [
    "sap",
    "beat",
    "consume",
    "evacuate",
    "deplete",
    "run through",
    "eat",
    "tire",
    "wipe out",
    "fumes",
    "tucker",
    "run down",
    "tucker out",
    "eat up",
    "use up",
    "exhaust system",
    "exhaust fumes",
    "exhaust"
  ],
  [
    "holler",
    "bawl",
    "roar",
    "hollering",
    "yowl",
    "yowling",
    "roaring",
    "hollo",
    "bellowing",
    "holla",
    "holloa",
    "bellow"
  ],
  [
    "implore",
    "solicit",
    "pray",
    "tap",
    "beg"
  ],
  [
    "beach"
  ],
  [
    "bow",
    "twist",
    "stoop",
    "deflect",
    "curve",
    "inflection",
    "turn",
    "crimp",
    "fold",
    "crease",
    "crook",
    "plication",
    "flex",
    "deform",
    "flection",
    "flexion",
    "flexure",
    "turn away",
    "bend dexter",
    "bending",
    "crouch",
    "bend"
  ],
  [
    "impart",
    "contribute",
    "lend",
    "bring",
    "add",
    "confer",
    "bestow"
  ],
  [
    "towage",
    "tow"
  ],
  [
    "bit",
    "morsel",
    "sting",
    "collation",
    "burn",
    "nosh",
    "pungency",
    "chomp",
    "snack",
    "insect bite",
    "seize with teeth",
    "sharpness",
    "bite"
  ],
  [
    "charge",
    "infernal",
    "everlasting",
    "damn",
    "blessed",
    "rap",
    "curst",
    "blasted",
    "deuced",
    "fault",
    "pick",
    "cursed",
    "incrimination",
    "damned",
    "darned",
    "goddam",
    "goddamned",
    "inculpation",
    "find fault",
    "blamed",
    "goddamn",
    "blame"
  ],
  [
    "seethe",
    "churn",
    "roil",
    "boiling point",
    "furuncle",
    "moil",
    "boil"
  ],
  [
    "twist",
    "lace",
    "plait",
    "pleach",
    "braiding",
    "gold braid",
    "tress",
    "braid"
  ],
  [
    "impart",
    "respite",
    "divulge",
    "crack",
    "give",
    "develop",
    "reveal",
    "declare",
    "breach",
    "check",
    "die",
    "burst",
    "rift",
    "better",
    "expose",
    "part",
    "collapse",
    "rupture",
    "separate",
    "transgress",
    "split",
    "damp",
    "disclose",
    "infract",
    "disruption",
    "fracture",
    "founder",
    "ruin",
    "relegate",
    "gap",
    "fault",
    "bust",
    "erupt",
    "wear",
    "interrupt",
    "bring out",
    "stop",
    "fail",
    "intermission",
    "break down",
    "weaken",
    "break up",
    "break away",
    "discontinue",
    "soften",
    "offend",
    "violate",
    "get out",
    "dampen",
    "interruption",
    "cave in",
    "split up",
    "give away",
    "intermit",
    "fall apart",
    "give way",
    "bankrupt",
    "breakout",
    "breakage",
    "suspension",
    "break in",
    "let out",
    "go against",
    "breaking",
    "break out",
    "demote",
    "jailbreak",
    "hold on",
    "get around",
    "give out",
    "come apart",
    "fault line",
    "time out",
    "break off",
    "falling out",
    "wear out",
    "fall in",
    "conk out",
    "go",
    "good luck",
    "let on",
    "break dance",
    "break of serve",
    "gaolbreak",
    "break-dance",
    "snap off",
    "happy chance",
    "kick downstairs",
    "prison-breaking",
    "prisonbreak",
    "abrupt change",
    "bump",
    "discover",
    "geological fault",
    "open frame",
    "pause",
    "recess",
    "severance",
    "break"
  ],
  [
    "rest",
    "respire",
    "emit",
    "pass off",
    "give off",
    "take a breath",
    "take a breather",
    "breathe"
  ],
  [
    "infuse",
    "steep",
    "brewage",
    "brew"
  ],
  [
    "soma",
    "establish",
    "construct",
    "shape",
    "form",
    "physique",
    "frame",
    "figure",
    "flesh",
    "make",
    "chassis",
    "anatomy",
    "bod",
    "work up",
    "material body",
    "build up",
    "physical body",
    "body-build",
    "human body",
    "progress",
    "build"
  ],
  [
    "glow",
    "fire",
    "sting",
    "bite",
    "burning",
    "incinerate",
    "cauterize",
    "combust",
    "tan",
    "burn up",
    "burn off",
    "burn down",
    "burn mark",
    "sunburn",
    "suntan",
    "burn"
  ],
  [
    "tunnel",
    "burrow"
  ],
  [
    "cut up",
    "chip at",
    "carve"
  ],
  [
    "apprehension",
    "snap",
    "charm",
    "see",
    "beguile",
    "view",
    "entrance",
    "hitch",
    "arrest",
    "bewitch",
    "capture",
    "pinch",
    "captivate",
    "snatch",
    "enamor",
    "collar",
    "get",
    "match",
    "watch",
    "take in",
    "haul",
    "stop",
    "grab",
    "enamour",
    "fascinate",
    "enchant",
    "overtake",
    "becharm",
    "overhear",
    "trip up",
    "pick up",
    "catch up with",
    "take hold of",
    "taking into custody",
    "trance",
    "catch"
  ],
  [
    "plug",
    "quid",
    "wad",
    "manducate",
    "masticate",
    "jaw",
    "cud",
    "chaw",
    "mastication",
    "chewing",
    "chew"
  ],
  [
    "burble",
    "ripple",
    "babble",
    "guggle",
    "bubble",
    "gurgle"
  ],
  [
    "take",
    "prefer",
    "pick out",
    "opt for",
    "select",
    "choose"
  ],
  [
    "command",
    "oblige",
    "require",
    "obligate",
    "compel"
  ],
  [
    "right",
    "recompense",
    "correct",
    "redress",
    "make up",
    "counterbalance",
    "remunerate",
    "indemnify",
    "even out",
    "pay off",
    "even up",
    "pay",
    "even off",
    "compensate"
  ],
  [
    "make",
    "fake",
    "prepare",
    "wangle",
    "manipulate",
    "falsify",
    "ready",
    "fix",
    "fudge",
    "misrepresent",
    "cook"
  ],
  [
    "be",
    "monetary value",
    "price",
    "toll",
    "cost"
  ],
  [
    "shroud",
    "address",
    "work",
    "brood",
    "embrace",
    "comprehend",
    "encompass",
    "track",
    "handle",
    "report",
    "cross",
    "top",
    "deal",
    "extend",
    "enshroud",
    "back",
    "hide",
    "treat",
    "breed",
    "insure",
    "concealment",
    "hatch",
    "screen",
    "plow",
    "binding",
    "overlay",
    "incubate",
    "blanket",
    "get over",
    "screening",
    "wrap up",
    "pass over",
    "cut across",
    "covering",
    "masking",
    "cover up",
    "get across",
    "underwrite",
    "cut through",
    "covering fire",
    "book binding",
    "spread over",
    "natural covering",
    "covert",
    "traverse",
    "cover"
  ],
  [
    "turnover"
  ],
  [
    "cunning",
    "trade",
    "craftsmanship",
    "craftiness",
    "workmanship",
    "wiliness",
    "foxiness",
    "slyness",
    "guile",
    "craft"
  ],
  [
    "remedy",
    "curative",
    "heal",
    "cure"
  ],
  [
    "scourge",
    "condemnation",
    "bane",
    "torment",
    "maledict",
    "hex",
    "damn",
    "execration",
    "expletive",
    "oath",
    "cuss",
    "beshrew",
    "jinx",
    "imprecate",
    "bedamn",
    "blaspheme",
    "swearword",
    "swear",
    "excommunicate",
    "curse word",
    "anathemize",
    "swearing",
    "nemesis",
    "curse"
  ],
  [
    "hold",
    "take for",
    "view as",
    "deem"
  ],
  [
    "conduct",
    "direct",
    "head",
    "moderate",
    "pass",
    "run",
    "precede",
    "principal",
    "track",
    "take",
    "steer",
    "contribute",
    "extend",
    "result",
    "hint",
    "trail",
    "conduce",
    "tip",
    "wind",
    "leading",
    "star",
    "chair",
    "leash",
    "leave",
    "tether",
    "confidential information",
    "pb",
    "lead-in",
    "pencil lead",
    "spark advance",
    "go",
    "jumper cable",
    "lead story",
    "jumper lead",
    "atomic number 82",
    "guide",
    "lead"
  ],
  [
    "delude",
    "betray",
    "lead on",
    "lead astray",
    "cozen",
    "deceive"
  ],
  [
    "frustration",
    "overcome",
    "kill",
    "licking",
    "vote down",
    "vote out",
    "defeat"
  ],
  [
    "gorge",
    "foul",
    "corrupt",
    "taint",
    "maculate",
    "tarnish",
    "cloud",
    "befoul",
    "sully",
    "defile"
  ],
  [
    "nip",
    "sip"
  ],
  [
    "want",
    "trust",
    "hope",
    "desire"
  ],
  [
    "discourse",
    "talk about",
    "talk over",
    "discuss"
  ],
  [
    "ruin",
    "demolish",
    "destroy"
  ],
  [
    "hollow",
    "comprehend",
    "travail",
    "apprehend",
    "savvy",
    "grind",
    "jibe",
    "slam",
    "prod",
    "drudge",
    "barb",
    "poke",
    "stab",
    "compass",
    "shot",
    "excavate",
    "labor",
    "fag",
    "excavation",
    "digging",
    "turn over",
    "dig out",
    "get the picture",
    "cut into",
    "delve",
    "gibe",
    "grasp",
    "jab",
    "labour",
    "moil",
    "shaft",
    "toil",
    "dig"
  ],
  [
    "self-regard",
    "self-respect",
    "lordliness",
    "self-esteem",
    "dignity"
  ],
  [
    "disseminate",
    "stagger",
    "propagate",
    "disperse",
    "deal",
    "diffuse",
    "allot",
    "broadcast",
    "circulate",
    "stack",
    "lot",
    "dispense",
    "pass on",
    "dole out",
    "administer",
    "give away",
    "dish out",
    "parcel out",
    "circularise",
    "circularize",
    "give out",
    "mete out",
    "hand out",
    "shell out",
    "deal out",
    "pass around",
    "spread",
    "distribute"
  ],
  [
    "part",
    "separate",
    "split",
    "dissever",
    "disunite",
    "watershed",
    "split up",
    "water parting",
    "carve up",
    "fraction",
    "divide"
  ],
  [
    "disseminate",
    "propagate",
    "dissipate",
    "diffuse",
    "sprinkle",
    "broadcast",
    "spread out",
    "distribute",
    "circulate",
    "break up",
    "dust",
    "dispel",
    "dot",
    "scatter",
    "circularise",
    "circularize",
    "pass around",
    "spread",
    "disperse"
  ],
  [
    "set",
    "manage",
    "carry out",
    "execute",
    "act",
    "cause",
    "fare",
    "practice",
    "make",
    "brawl",
    "answer",
    "serve",
    "coif",
    "come",
    "perform",
    "make out",
    "exercise",
    "arrange",
    "dress",
    "coiffure",
    "bash",
    "suffice",
    "practise",
    "behave",
    "get along",
    "coiffe",
    "doctor of osteopathy",
    "doh",
    "ut",
    "do"
  ],
  [
    "imbibe",
    "pledge",
    "swallow",
    "crapulence",
    "booze",
    "toast",
    "salute",
    "inebriant",
    "tope",
    "fuddle",
    "deglutition",
    "intoxicant",
    "potable",
    "beverage",
    "drinkable",
    "alcohol",
    "boozing",
    "drink in",
    "drunkenness",
    "drinking",
    "alcoholic beverage",
    "drink"
  ],
  [
    "erode",
    "wear away",
    "gnaw at",
    "eat at",
    "gnaw"
  ],
  [
    "thrust",
    "run",
    "push",
    "cause",
    "tool",
    "effort",
    "movement",
    "ram",
    "ride",
    "campaign",
    "pull",
    "get",
    "repel",
    "tug",
    "repulse",
    "labor",
    "motor",
    "driving force",
    "driving",
    "push back",
    "driveway",
    "beat back",
    "force back",
    "private road",
    "aim",
    "crusade",
    "force",
    "labour",
    "parkway",
    "drive"
  ],
  [
    "driveout"
  ],
  [
    "drive",
    "revolt",
    "snub",
    "rebuff",
    "brush off",
    "repulse",
    "disgust",
    "drive off",
    "push back",
    "turn off",
    "fight off",
    "beat back",
    "force back",
    "drive back",
    "repel"
  ],
  [
    "indifferent",
    "uninterested",
    "spiritless",
    "apathetic"
  ],
  [
    "stateofmind"
  ],
  [
    "lilt",
    "sweep",
    "drop",
    "cut",
    "dangle",
    "jive",
    "swinging",
    "get around",
    "swing music",
    "swing out",
    "swing over",
    "baseball swing",
    "golf stroke",
    "golf shot",
    "sway",
    "swing"
  ],
  [
    "dyestuff",
    "dye"
  ],
  [
    "corrode",
    "consume",
    "rust",
    "exhaust",
    "deplete",
    "run through",
    "feed",
    "wipe out",
    "eat up",
    "use up",
    "eat on",
    "eat"
  ],
  [
    "block",
    "frost",
    "immobilize",
    "stop dead",
    "freezing",
    "suspend",
    "freeze out",
    "freeze down",
    "halt",
    "freeze"
  ],
  [
    "feedon"
  ],
  [
    "engage",
    "apply",
    "use",
    "utilize",
    "utilise",
    "employment",
    "hire",
    "employ"
  ],
  [
    "relish",
    "delight",
    "savor",
    "love",
    "bask",
    "savour",
    "revel",
    "enjoy"
  ],
  [
    "obliterate",
    "eradicate",
    "eliminate",
    "annihilate",
    "decimate",
    "wipe out",
    "snuff out",
    "carry off",
    "stub out",
    "press out",
    "crush out",
    "extinguish"
  ],
  [
    "spirit",
    "look",
    "experience",
    "sense",
    "feeling",
    "tone",
    "finger",
    "find",
    "flavor",
    "smell",
    "palpate",
    "tactile property",
    "feel"
  ],
  [
    "conflict",
    "struggle",
    "engagement",
    "push",
    "battle",
    "agitate",
    "oppose",
    "campaign",
    "combat",
    "defend",
    "competitiveness",
    "fight back",
    "fighting",
    "fight down",
    "bout",
    "crusade",
    "fight"
  ],
  [
    "flay"
  ],
  [
    "skin",
    "flake",
    "peel off",
    "flake off",
    "pare",
    "peel"
  ],
  [
    "trace",
    "observe",
    "work",
    "pursue",
    "comply",
    "accompany",
    "espouse",
    "survey",
    "succeed",
    "abide by",
    "adopt",
    "watch",
    "come",
    "keep up",
    "watch over",
    "keep an eye on",
    "conform to",
    "postdate",
    "stick to",
    "come after",
    "stick with",
    "keep abreast",
    "take after",
    "travel along",
    "be",
    "follow"
  ],
  [
    "fawn",
    "cringe",
    "sneak",
    "grovel",
    "cower",
    "weirdo",
    "crawl",
    "pussyfoot",
    "schmuck",
    "steal",
    "creeping",
    "crawling",
    "weirdy",
    "weirdie",
    "grow over",
    "mouse",
    "spook",
    "creep"
  ],
  [
    "block",
    "bury",
    "blank out",
    "leave",
    "draw a blank",
    "forget"
  ],
  [
    "fortify",
    "encircle",
    "girt",
    "arm",
    "girdle",
    "girth",
    "build up",
    "begird",
    "gird"
  ],
  [
    "yield",
    "render",
    "impart",
    "present",
    "break",
    "establish",
    "hold",
    "open",
    "spring",
    "pass",
    "reach",
    "apply",
    "collapse",
    "have",
    "return",
    "throw",
    "generate",
    "make",
    "contribute",
    "founder",
    "sacrifice",
    "abandon",
    "commit",
    "hand",
    "gift",
    "give up",
    "dedicate",
    "devote",
    "pass on",
    "grub",
    "afford",
    "cave in",
    "bring about",
    "feed",
    "leave",
    "give way",
    "ease up",
    "chip in",
    "kick in",
    "turn over",
    "fall in",
    "move over",
    "springiness",
    "pay",
    "grant",
    "give"
  ],
  [
    "clutch",
    "comprehend",
    "hold",
    "clench",
    "range",
    "clasp",
    "reach",
    "grip",
    "apprehend",
    "savvy",
    "appreciation",
    "dig",
    "compass",
    "clutches",
    "hold on",
    "get the picture",
    "grasp"
  ],
  [
    "clutch",
    "hold",
    "clench",
    "clasp",
    "handle",
    "grapple",
    "traction",
    "bag",
    "clutches",
    "fascinate",
    "transfix",
    "spellbind",
    "suitcase",
    "hold on",
    "handgrip",
    "traveling bag",
    "adhesive friction",
    "grasp",
    "grip"
  ],
  [
    "grumble",
    "rumble",
    "growling",
    "growl"
  ],
  [
    "hurt",
    "scathe",
    "trauma",
    "impairment",
    "damage",
    "injury",
    "harm"
  ],
  [
    "detest",
    "hatred",
    "hate"
  ],
  [
    "induce",
    "sustain",
    "hold",
    "experience",
    "give",
    "possess",
    "stimulate",
    "need",
    "deliver",
    "take",
    "cause",
    "throw",
    "make",
    "accept",
    "must",
    "feature",
    "get",
    "undergo",
    "take in",
    "receive",
    "suffer",
    "own",
    "ingest",
    "consume",
    "birth",
    "give birth",
    "let",
    "have got",
    "rich person",
    "birthe",
    "millionaire",
    "wealthy person",
    "bear",
    "have"
  ],
  [
    "see",
    "take heed",
    "try",
    "find out",
    "listen",
    "get wind",
    "get word",
    "pick up",
    "get a line",
    "discover",
    "learn",
    "hear"
  ],
  [
    "facilitate",
    "avail",
    "assist",
    "assistance",
    "serve",
    "supporter",
    "assistant",
    "helping",
    "help oneself",
    "aid",
    "helper",
    "service",
    "help"
  ],
  [
    "hew out",
    "hew"
  ],
  [
    "obscure",
    "shroud",
    "pelt",
    "obliterate",
    "cover",
    "enshroud",
    "conceal",
    "skin",
    "blot out",
    "hide out",
    "fell",
    "hide"
  ],
  [
    "strike",
    "attain",
    "bang",
    "stumble",
    "reach",
    "score",
    "encounter",
    "chance",
    "striking",
    "make",
    "dispatch",
    "smash",
    "shoot",
    "find",
    "remove",
    "tally",
    "happen",
    "pip",
    "murder",
    "collision",
    "bump off",
    "impinge on",
    "come to",
    "collide with",
    "hitting",
    "polish off",
    "rack up",
    "run into",
    "arrive at",
    "bump",
    "gain",
    "slay",
    "hit"
  ],
  [
    "thrum",
    "seethe",
    "buzz",
    "humming",
    "hum"
  ],
  [
    "trace",
    "run",
    "pursuit",
    "hound",
    "searching",
    "hunting",
    "hunt down",
    "track down",
    "hunt club",
    "quest",
    "search",
    "hunt"
  ],
  [
    "apprise",
    "apprize",
    "teach",
    "learn",
    "instruct"
  ],
  [
    "affront",
    "abuse",
    "revilement",
    "contumely",
    "insult"
  ],
  [
    "bid",
    "take in",
    "receive",
    "tempt",
    "call for",
    "ask for",
    "pay for",
    "ask in",
    "ask over",
    "ask round",
    "invite"
  ],
  [
    "conjure",
    "stir",
    "arouse",
    "raise",
    "appeal",
    "put forward",
    "bring up",
    "call forth",
    "conjure up",
    "call down",
    "invoke"
  ],
  [
    "joint",
    "link",
    "connect",
    "conjoin",
    "juncture",
    "articulation",
    "unite",
    "get together",
    "bring together",
    "fall in",
    "junction",
    "sum",
    "union",
    "join"
  ],
  [
    "sustain",
    "support",
    "observe",
    "hold",
    "retain",
    "preserve",
    "restrain",
    "sustenance",
    "prevent",
    "proceed",
    "maintain",
    "livelihood",
    "donjon",
    "hold back",
    "dungeon",
    "celebrate",
    "continue",
    "living",
    "bread and butter",
    "hold on",
    "go along",
    "keep back",
    "keep on",
    "keep open",
    "go on",
    "hold open",
    "stay fresh",
    "save",
    "keep"
  ],
  [
    "flush",
    "recoil",
    "charge",
    "bang",
    "plain",
    "thrill",
    "gripe",
    "kvetch",
    "rush",
    "quetch",
    "squawk",
    "boot",
    "beef",
    "complain",
    "sound off",
    "kicking",
    "kick back",
    "kick"
  ],
  [
    "bang",
    "experience",
    "recognize",
    "acknowledge",
    "love",
    "live",
    "hump",
    "make out",
    "screw",
    "bonk",
    "bed",
    "jazz",
    "cognize",
    "sleep with",
    "get it on",
    "have it off",
    "lie with",
    "do it",
    "have intercourse",
    "have it away",
    "be intimate",
    "have a go at it",
    "know"
  ],
  [
    "want",
    "deficiency",
    "miss",
    "lack"
  ],
  [
    "ascertain",
    "see",
    "check",
    "determine",
    "take",
    "study",
    "watch",
    "read",
    "con",
    "instruct",
    "find out",
    "hear",
    "get wind",
    "teach",
    "larn",
    "memorize",
    "get word",
    "pick up",
    "get a line",
    "discover",
    "learn"
  ],
  [
    "clear",
    "realize",
    "make",
    "take in",
    "pull in",
    "bring in",
    "gain",
    "garner",
    "earn"
  ],
  [
    "impart",
    "lead",
    "give",
    "bequeath",
    "allow",
    "result",
    "depart",
    "exit",
    "give up",
    "pass on",
    "quit",
    "entrust",
    "get out",
    "leave behind",
    "parting",
    "allow for",
    "let",
    "go away",
    "throw in",
    "go forth",
    "go out",
    "leave-taking",
    "provide for",
    "chuck up the sponge",
    "drop out",
    "leave of absence",
    "throw in the towel",
    "farewell",
    "forget",
    "will",
    "leave"
  ],
  [
    "work",
    "lap",
    "biff",
    "thrash",
    "poke",
    "drub",
    "clobber",
    "bat",
    "punch",
    "solve",
    "figure out",
    "puzzle out",
    "salt lick",
    "lick"
  ],
  [
    "corresponding",
    "equivalent",
    "comparable",
    "similar",
    "same",
    "alike",
    "suchlike",
    "equal",
    "like-minded",
    "care",
    "wish",
    "like"
  ],
  [
    "induce",
    "clear",
    "shuffle",
    "constitute",
    "attain",
    "establish",
    "construct",
    "draw",
    "hold",
    "give",
    "produce",
    "form",
    "create",
    "stimulate",
    "reach",
    "build",
    "score",
    "have",
    "take",
    "cause",
    "throw",
    "hit",
    "realize",
    "brand",
    "crap",
    "prepare",
    "name",
    "get",
    "seduce",
    "take in",
    "micturate",
    "make up",
    "ready",
    "earn",
    "do",
    "fix",
    "pull in",
    "shuffling",
    "piddle",
    "puddle",
    "wee-wee",
    "nominate",
    "spend a penny",
    "wee",
    "lay down",
    "bring in",
    "relieve oneself",
    "ca-ca",
    "piss",
    "defecate",
    "get to",
    "make water",
    "pee-pee",
    "urinate",
    "take a leak",
    "pass water",
    "pee",
    "arrive at",
    "take a crap",
    "progress to",
    "cook",
    "gain",
    "make"
  ],
  [
    "espouse",
    "conjoin",
    "tie",
    "get married",
    "hook up with",
    "get hitched with",
    "wed",
    "marry"
  ],
  [
    "touch",
    "just",
    "fit",
    "see",
    "play",
    "encounter",
    "converge",
    "assemble",
    "match",
    "gather",
    "receive",
    "take on",
    "satisfy",
    "suffer",
    "fulfill",
    "adjoin",
    "get together",
    "fill",
    "forgather",
    "run across",
    "foregather",
    "come across",
    "fulfil",
    "conform to",
    "ran into",
    "cope with",
    "sports meeting",
    "fitting",
    "meet"
  ],
  [
    "necessitate",
    "demand",
    "want",
    "motivation",
    "have",
    "penury",
    "take",
    "involve",
    "require",
    "motive",
    "must",
    "indigence",
    "ask",
    "call for",
    "ought",
    "pauperism",
    "should",
    "have got",
    "need"
  ],
  [
    "observe",
    "mark",
    "remark",
    "acknowledge",
    "note",
    "observation",
    "detect",
    "observance",
    "find",
    "point out",
    "placard",
    "comment",
    "notification",
    "card",
    "poster",
    "bill",
    "discover",
    "notice"
  ],
  [
    "rouge",
    "blusher",
    "paint"
  ],
  [
    "kudos",
    "congratulations",
    "praise"
  ],
  [
    "comprehend",
    "perceive"
  ],
  [
    "carry",
    "sway",
    "persuade"
  ],
  [
    "thrust",
    "franklin pierce",
    "pierce"
  ],
  [
    "shift",
    "lurch",
    "cant",
    "tilt",
    "set up",
    "incline",
    "toss",
    "monger",
    "huckster",
    "hawk",
    "tar",
    "delivery",
    "sky",
    "peddle",
    "gear",
    "pitching",
    "sales pitch",
    "pitch shot",
    "sales talk",
    "auction pitch",
    "cant over",
    "flip",
    "rake",
    "slope",
    "vend",
    "pitch"
  ],
  [
    "delight",
    "please"
  ],
  [
    "plume",
    "fleece",
    "pull",
    "hustle",
    "roll",
    "hook",
    "pick",
    "plunk",
    "tear",
    "tweak",
    "gazump",
    "cull",
    "deplume",
    "surcharge",
    "rob",
    "overcharge",
    "displume",
    "pluckiness",
    "gutsiness",
    "pull off",
    "pick off",
    "deplumate",
    "soak",
    "pluck"
  ],
  [
    "pelt",
    "stream",
    "swarm",
    "decant",
    "rain buckets",
    "pour out",
    "rain cats and dogs",
    "pour"
  ],
  [
    "choose",
    "favour",
    "opt for",
    "favor",
    "prefer"
  ],
  [
    "prompt",
    "incite",
    "impel",
    "move",
    "motivate",
    "propel"
  ],
  [
    "protect"
  ],
  [
    "puff",
    "draw",
    "drive",
    "drag",
    "twist",
    "fetch",
    "rip",
    "rend",
    "draw in",
    "tear",
    "commit",
    "pluck",
    "pull out",
    "pull in",
    "attract",
    "deplume",
    "perpetrate",
    "get out",
    "take out",
    "displume",
    "overstretch",
    "deplumate",
    "force",
    "pulling",
    "rive",
    "wrench",
    "pull"
  ],
  [
    "thrust",
    "promote",
    "drive",
    "energy",
    "press",
    "fight",
    "agitate",
    "campaign",
    "button",
    "crowd",
    "tug",
    "labor",
    "advertize",
    "pushing",
    "bear on",
    "push button",
    "get-up-and-go",
    "crusade",
    "force",
    "labour",
    "push"
  ],
  [
    "order",
    "cast",
    "set",
    "position",
    "pose",
    "frame",
    "set up",
    "assign",
    "lay",
    "commit",
    "arrange",
    "redact",
    "invest",
    "couch",
    "put option",
    "place",
    "put"
  ],
  [
    "review",
    "freshen",
    "brush up",
    "freshen up",
    "refreshen",
    "refresh"
  ],
  [
    "commend",
    "recall",
    "think",
    "reward",
    "retrieve",
    "commemorate",
    "think back",
    "call back",
    "think of",
    "remind",
    "call up",
    "recollect",
    "remember"
  ],
  [
    "regard",
    "observe",
    "esteem",
    "deference",
    "value",
    "abide by",
    "prise",
    "prize",
    "obedience",
    "respectfulness",
    "honor",
    "honour",
    "respect"
  ],
  [
    "reverent",
    "deferent",
    "deferential",
    "reverential",
    "venerating",
    "honorific",
    "regardful",
    "respectful"
  ],
  [
    "delight",
    "wallow",
    "racket",
    "rejoice",
    "enjoy",
    "revelry",
    "wassail",
    "whoop it up",
    "make merry",
    "make happy",
    "make whoopie",
    "triumph",
    "revel"
  ],
  [
    "reinforce",
    "reinforcement",
    "remember",
    "payoff",
    "pay back",
    "repay",
    "wages",
    "honor",
    "honour",
    "reward"
  ],
  [
    "drive",
    "cod",
    "tease",
    "mount",
    "twit",
    "rally",
    "bait",
    "tantalize",
    "sit",
    "rag",
    "taunt",
    "ride"
  ],
  [
    "joint",
    "knock",
    "cooked",
    "roasted",
    "roast"
  ],
  [
    "wail",
    "howl",
    "holler",
    "ululate",
    "boom",
    "thunder",
    "hollering",
    "yawl",
    "yowl",
    "yowling",
    "roaring",
    "hollo",
    "bellowing",
    "holla",
    "holloa",
    "bellow",
    "roar"
  ],
  [
    "issue",
    "come out",
    "come forth",
    "emerge"
  ],
  [
    "stamp",
    "pestle"
  ],
  [
    "apprarance"
  ],
  [
    "mala",
    "zygomatic bone",
    "malar bone",
    "jugal bone",
    "os zygomaticum",
    "cheekbone"
  ],
  [
    "holedugtotrapedibletermites"
  ],
  [
    "smallblackflyingantspeciesthatoftenappearsafterrainasasignofthecomingtemergenceofedibletermites"
  ],
  [
    "gourdplug"
  ],
  [
    "calabash",
    "gourd vine",
    "gourd"
  ],
  [
    "fret",
    "chafe",
    "snag",
    "fray",
    "hitch",
    "scratch",
    "wipe",
    "hang-up",
    "itch",
    "rub"
  ],
  [
    "work",
    "lead",
    "discharge",
    "endure",
    "flow",
    "lean",
    "range",
    "drive",
    "function",
    "ravel",
    "pass",
    "carry",
    "prevail",
    "play",
    "persist",
    "operate",
    "course",
    "extend",
    "incline",
    "rivulet",
    "ram",
    "move",
    "campaign",
    "trial",
    "race",
    "test",
    "running",
    "bunk",
    "scarper",
    "ply",
    "tally",
    "lam",
    "rill",
    "streak",
    "tend",
    "bleed",
    "hunt",
    "break away",
    "unravel",
    "outpouring",
    "melt",
    "hunt down",
    "runnel",
    "run away",
    "track down",
    "foot race",
    "ladder",
    "streamlet",
    "die hard",
    "melt down",
    "running game",
    "go",
    "black market",
    "turn tail",
    "footrace",
    "run for",
    "running play",
    "consort",
    "force",
    "guide",
    "run"
  ],
  [
    "give",
    "forfeit",
    "forfeiture",
    "ritual killing",
    "sacrifice"
  ],
  [
    "undermine",
    "subvert",
    "counteract",
    "countermine",
    "weaken",
    "sabotage"
  ],
  [
    "articulate",
    "state",
    "order",
    "enunciate",
    "aver",
    "enounce",
    "tell",
    "enjoin",
    "allege",
    "suppose",
    "pronounce",
    "read",
    "say"
  ],
  [
    "mark",
    "abrade",
    "stub",
    "abrasion",
    "excoriation",
    "skin",
    "scratch",
    "grate",
    "genuflect",
    "scraping",
    "scratching",
    "kowtow",
    "scar",
    "come up",
    "scrape up",
    "scratch up",
    "scrape"
  ],
  [
    "ascertain",
    "regard",
    "control",
    "assure",
    "fancy",
    "project",
    "consider",
    "look",
    "understand",
    "view",
    "check",
    "determine",
    "encounter",
    "reckon",
    "figure",
    "ensure",
    "attend",
    "realize",
    "image",
    "escort",
    "picture",
    "meet",
    "envision",
    "date",
    "watch",
    "find",
    "insure",
    "take in",
    "catch",
    "visit",
    "find out",
    "hear",
    "visualize",
    "forgather",
    "run across",
    "see to it",
    "get wind",
    "cf",
    "foregather",
    "come across",
    "take care",
    "go out",
    "go steady",
    "ran into",
    "get word",
    "pick up",
    "get a line",
    "confer",
    "discover",
    "learn",
    "see also",
    "witness",
    "see"
  ],
  [
    "draft",
    "guttle",
    "draught",
    "devour",
    "raven",
    "swig",
    "quaff",
    "pig",
    "gulping",
    "gulp"
  ],
  [
    "hum",
    "buzz",
    "roll",
    "boil",
    "foam",
    "seethe"
  ],
  [
    "billfold",
    "notecase",
    "wallet"
  ],
  [
    "bag",
    "handbag",
    "wrinkle",
    "pocketbook",
    "purse"
  ],
  [
    "distinct",
    "break",
    "detached",
    "individual",
    "tell",
    "part",
    "split",
    "class",
    "isolated",
    "distinguish",
    "disjunct",
    "abstracted",
    "single",
    "dissever",
    "sort",
    "differentiate",
    "secernate",
    "discrete",
    "divided",
    "apart",
    "segregated",
    "fork",
    "divide",
    "break up",
    "separated",
    "disunite",
    "secern",
    "sort out",
    "tell apart",
    "removed",
    "disjoint",
    "split up",
    "assort",
    "disjoined",
    "ramify",
    "fall apart",
    "unconnected",
    "classify",
    "freestanding",
    "come apart",
    "severalize",
    "discriminate",
    "carve up",
    "isolable",
    "single out",
    "unshared",
    "unintegrated",
    "reprint",
    "offprint",
    "set-apart",
    "branch",
    "separate"
  ],
  [
    "stimulate",
    "stir",
    "judder",
    "trill",
    "agitate",
    "wag",
    "waggle",
    "excite",
    "didder",
    "shingle",
    "throw off",
    "shake up",
    "milkshake",
    "handshake",
    "handclasp",
    "handshaking",
    "escape from",
    "milk shake",
    "shake off",
    "rock",
    "shiver",
    "sway",
    "tremble",
    "shake"
  ],
  [
    "ignominy",
    "disgrace",
    "attaint",
    "pity",
    "dishonor",
    "dishonour",
    "shame"
  ],
  [
    "trim",
    "plane",
    "knock off",
    "epilate",
    "shaving",
    "shave"
  ],
  [
    "exhibit",
    "display",
    "present",
    "demonstrate",
    "depict",
    "indicate",
    "establish",
    "point",
    "evince",
    "reveal",
    "express",
    "register",
    "evidence",
    "prove",
    "picture",
    "appearance",
    "read",
    "shew",
    "demo",
    "show up",
    "testify",
    "bear witness",
    "record",
    "usher",
    "show"
  ],
  [
    "peach",
    "babble",
    "tattle",
    "blab",
    "talk",
    "whistle",
    "blab out",
    "babble out",
    "sing"
  ],
  [
    "strike",
    "bang",
    "dash",
    "blast",
    "hit",
    "crash",
    "boom",
    "knock",
    "nail",
    "belt",
    "bash",
    "overhead",
    "collision",
    "bang up",
    "smash up",
    "smash-up",
    "smashingly",
    "smash"
  ],
  [
    "denigrate",
    "slander",
    "slur",
    "blot",
    "spot",
    "defame",
    "smirch",
    "daub",
    "blur",
    "besmirch",
    "stain",
    "smutch",
    "smudge",
    "asperse",
    "bedaub",
    "calumniate",
    "vilification",
    "malignment",
    "besmear",
    "sully",
    "smear"
  ],
  [
    "break",
    "burst",
    "part",
    "separate",
    "rip",
    "cleave",
    "schism",
    "rent",
    "cut",
    "tear",
    "broken",
    "disconnected",
    "dissever",
    "divided",
    "injured",
    "divide",
    "break up",
    "fragmented",
    "split up",
    "break open",
    "stock split",
    "carve up",
    "disunited",
    "rive",
    "split"
  ],
  [
    "patter",
    "disperse",
    "spatter",
    "splash",
    "dust",
    "spit",
    "pitter-patter",
    "splosh",
    "dot",
    "scatter",
    "scattering",
    "sprinkling",
    "besprinkle",
    "sprinkle"
  ],
  [
    "thrust",
    "twinge",
    "bosom",
    "embrace",
    "wring",
    "squelch",
    "compact",
    "vellicate",
    "crush",
    "contract",
    "press",
    "pinch",
    "shove",
    "mash",
    "wedge",
    "stuff",
    "constrict",
    "compress",
    "twitch",
    "hug",
    "squash",
    "squeeze play",
    "power play",
    "force",
    "nip",
    "tweet",
    "squeeze"
  ],
  [
    "thrust",
    "dig",
    "prod",
    "poke",
    "knife",
    "knife thrust",
    "jab",
    "stab"
  ],
  [
    "slip",
    "creep",
    "sneak",
    "bargain",
    "pussyfoot",
    "buy",
    "mouse",
    "steal"
  ],
  [
    "twinge",
    "bite",
    "stick",
    "hustle",
    "pang",
    "burn",
    "con",
    "bunco",
    "gyp",
    "bunko",
    "stinging",
    "flimflam",
    "con game",
    "confidence game",
    "insect bite",
    "bunko game",
    "bunco game",
    "sting"
  ],
  [
    "turmoil",
    "shift",
    "touch",
    "commotion",
    "conjure",
    "invoke",
    "stimulate",
    "arouse",
    "flurry",
    "raise",
    "agitate",
    "toss",
    "shake",
    "hustle",
    "fuss",
    "disruption",
    "disturbance",
    "excite",
    "bustle",
    "budge",
    "put forward",
    "bring up",
    "call forth",
    "shake up",
    "conjure up",
    "hurly burly",
    "to-do",
    "call down",
    "ado",
    "stir"
  ],
  [
    "draw",
    "imbibe",
    "absorb",
    "take in",
    "draw in",
    "suction",
    "suckle",
    "nurse",
    "sucking",
    "wet-nurse",
    "lactate",
    "take up",
    "suck up",
    "breastfeed",
    "soak up",
    "sop up",
    "give suck",
    "suck in",
    "suck"
  ],
  [
    "case",
    "accommodate",
    "fit",
    "cause",
    "courtship",
    "courting",
    "wooing",
    "beseem",
    "become",
    "befit",
    "causa",
    "lawsuit",
    "suing",
    "suit of clothes",
    "suit"
  ],
  [
    "sustain",
    "affirm",
    "corroborate",
    "hold",
    "bolster",
    "endorse",
    "substantiate",
    "patronage",
    "keep",
    "confirm",
    "patronize",
    "sustenance",
    "back",
    "stand",
    "livelihood",
    "underpin",
    "back up",
    "defend",
    "backing",
    "supporting",
    "reinforcement",
    "hold up",
    "documentation",
    "living",
    "subscribe",
    "funding",
    "accompaniment",
    "bear out",
    "bolster up",
    "bread and butter",
    "financial support",
    "reenforcement",
    "fend for",
    "see through",
    "plump for",
    "financial backing",
    "plunk for",
    "support"
  ],
  [
    "subdue",
    "master",
    "overcome",
    "surpass",
    "scale",
    "exceed",
    "outgo",
    "get over",
    "outstrip",
    "swim",
    "outdo",
    "outmatch",
    "surmount"
  ],
  [
    "pass",
    "surmount",
    "transcend",
    "exceed",
    "outgo",
    "stand out",
    "outstrip",
    "outdo",
    "pass by",
    "outmatch",
    "go by",
    "go past",
    "travel by",
    "excel",
    "surpass"
  ],
  [
    "ring",
    "circumvent",
    "environment",
    "palisade",
    "round",
    "environ",
    "circle",
    "border",
    "skirt",
    "fence",
    "smother",
    "beleaguer",
    "encircle",
    "surroundings",
    "wall",
    "besiege",
    "environs",
    "fence in",
    "hem in",
    "surround"
  ],
  [
    "withdraw",
    "accept",
    "engross",
    "immerse",
    "bury",
    "drink",
    "deglutition",
    "swallow up",
    "take back",
    "sup",
    "get down",
    "unsay",
    "eat up",
    "swallow"
  ],
  [
    "yield",
    "convey",
    "issue",
    "conduct",
    "engage",
    "necessitate",
    "lead",
    "consider",
    "direct",
    "hold",
    "demand",
    "acquire",
    "carry",
    "need",
    "have",
    "contract",
    "return",
    "study",
    "train",
    "admit",
    "make",
    "involve",
    "deal",
    "accept",
    "require",
    "submit",
    "contain",
    "exact",
    "shoot",
    "adopt",
    "rent",
    "get",
    "assume",
    "occupy",
    "undergo",
    "claim",
    "remove",
    "take in",
    "ask",
    "read",
    "take on",
    "call for",
    "bring",
    "pack",
    "ingest",
    "consume",
    "fill",
    "payoff",
    "look at",
    "film",
    "subscribe",
    "choose",
    "proceeds",
    "take up",
    "take away",
    "pick out",
    "get hold of",
    "take aim",
    "subscribe to",
    "takings",
    "use up",
    "aim",
    "charter",
    "guide",
    "hire",
    "learn",
    "lease",
    "select",
    "take"
  ],
  [
    "discernment",
    "savor",
    "predilection",
    "penchant",
    "appreciation",
    "savour",
    "preference",
    "gustation",
    "try",
    "perceptiveness",
    "try out",
    "sample",
    "mouthful",
    "gustatory modality",
    "tasting",
    "taste perception",
    "gustatory perception",
    "gustatory sensation",
    "taste sensation",
    "sense of taste",
    "smack",
    "taste"
  ],
  [
    "instruct",
    "thatch",
    "edward thatch",
    "edward teach",
    "blackbeard",
    "learn",
    "teach"
  ],
  [
    "snap",
    "charge",
    "rupture",
    "split",
    "rip",
    "pull",
    "shoot",
    "toot",
    "rent",
    "bust",
    "pluck",
    "bender",
    "deplume",
    "displume",
    "booze-up",
    "binge",
    "teardrop",
    "shoot down",
    "deplumate",
    "buck",
    "tear"
  ],
  [
    "give thanks",
    "thank"
  ],
  [
    "cast",
    "contrive",
    "project",
    "stroke",
    "hold",
    "give",
    "hurl",
    "confound",
    "have",
    "drop",
    "make",
    "shed",
    "switch",
    "bewilder",
    "confuse",
    "cast off",
    "bemuse",
    "fox",
    "fuddle",
    "befuddle",
    "bedevil",
    "discombobulate",
    "throw off",
    "throw away",
    "shake off",
    "cam stroke",
    "flip",
    "throw"
  ],
  [
    "thrill",
    "titillate",
    "tickling",
    "tickle"
  ],
  [
    "draw",
    "link",
    "association",
    "connect",
    "bind",
    "affiliation",
    "sleeper",
    "tie-in",
    "necktie",
    "standoff",
    "linkup",
    "tie-up",
    "crosstie",
    "marry",
    "tie beam",
    "railroad tie",
    "bond",
    "wed",
    "tie"
  ],
  [
    "desire",
    "confidence",
    "believe",
    "bank",
    "commit",
    "confide",
    "cartel",
    "reliance",
    "hope",
    "entrust",
    "swear",
    "intrust",
    "trustfulness",
    "rely",
    "trustingness",
    "combine",
    "faith",
    "trust"
  ],
  [
    "wriggle",
    "distort",
    "pervert",
    "writhe",
    "whirl",
    "bend",
    "turn",
    "pull",
    "convolute",
    "twirl",
    "wrestle",
    "sophisticate",
    "device",
    "wind",
    "construction",
    "squirm",
    "wrick",
    "plait",
    "spin",
    "gimmick",
    "twisting",
    "deform",
    "worm",
    "turn of events",
    "sprain",
    "rick",
    "twist around",
    "braid",
    "eddy",
    "kink",
    "tress",
    "winding",
    "wrench",
    "twist"
  ],
  [
    "employ",
    "function",
    "purpose",
    "apply",
    "utilize",
    "utilise",
    "practice",
    "habit",
    "enjoyment",
    "consumption",
    "utilization",
    "exercise",
    "role",
    "wont",
    "expend",
    "employment",
    "usage",
    "utilisation",
    "usance",
    "manipulation",
    "economic consumption",
    "use of goods and services",
    "use"
  ],
  [
    "twist",
    "writhe",
    "wrestle",
    "squirm",
    "wiggle",
    "worm",
    "wriggle"
  ],
  [
    "desire",
    "deficiency",
    "need",
    "privation",
    "deprivation",
    "require",
    "lack",
    "wish",
    "wishing",
    "want"
  ],
  [
    "break",
    "endure",
    "weary",
    "vesture",
    "apparel",
    "jade",
    "don",
    "fatigue",
    "assume",
    "bust",
    "put on",
    "fag",
    "hold out",
    "fall apart",
    "tire",
    "clothing",
    "outwear",
    "have on",
    "tire out",
    "wear thin",
    "clothes",
    "wear out",
    "wear down",
    "wear off",
    "get into",
    "fag out",
    "wearing apparel",
    "wear upon",
    "bear",
    "wearing",
    "wear"
  ],
  [
    "lave",
    "race",
    "slipstream",
    "backwash",
    "dampen",
    "rinse",
    "moisten",
    "airstream",
    "launder",
    "dry wash",
    "wash-off",
    "washing",
    "laundry",
    "wash drawing",
    "wash away",
    "washables",
    "wash"
  ],
  [
    "possess",
    "have",
    "ain",
    "own"
  ],
  [
    "thread",
    "wind",
    "interweave",
    "tissue",
    "meander",
    "waver",
    "weave"
  ],
  [
    "obliterate",
    "efface",
    "rub",
    "pass over",
    "wipe"
  ],
  [
    "ascertain",
    "observe",
    "see",
    "determine",
    "obtain",
    "encounter",
    "chance",
    "incur",
    "hit",
    "feel",
    "rule",
    "detect",
    "get",
    "recover",
    "discovery",
    "breakthrough",
    "receive",
    "retrieve",
    "notice",
    "happen",
    "find out",
    "uncovering",
    "line up",
    "come up",
    "regain",
    "get hold",
    "bump",
    "discover",
    "witness",
    "find"
  ],
  [
    "seize",
    "sequester",
    "confiscate",
    "impound",
    "attach"
  ],
  [
    "with"
  ],
  [
    "insteadof"
  ],
  [
    "stylish",
    "fashionable",
    "inward",
    "internal",
    "inch",
    "indium",
    "inwards",
    "atomic number 49",
    "in"
  ],
  [
    "connected",
    "happening",
    "along",
    "on duty",
    "on-duty",
    "on"
  ],
  [
    "nextto"
  ],
  [
    "togetherwith"
  ],
  [
    "from"
  ],
  [
    "stunned",
    "taboo",
    "prohibited",
    "proscribed",
    "tabu",
    "extinguished",
    "extinct",
    "away",
    "forbidden",
    "come out",
    "kayoed",
    "retired",
    "unfashionable",
    "knocked out",
    "unstylish",
    "out of fashion",
    "quenched",
    "out"
  ],
  [
    "supra",
    "higher up",
    "in a higher place",
    "to a higher place",
    "above"
  ],
  [
    "until"
  ],
  [
    "outside",
    "out",
    "aside",
    "off",
    "departed",
    "by",
    "inaccurate",
    "gone",
    "forth",
    "away"
  ],
  [
    "astatine",
    "atomic number 85",
    "at"
  ],
  [
    "side",
    "past",
    "aside",
    "bye",
    "away",
    "by"
  ],
  [
    "conjointly",
    "put together",
    "assembled",
    "jointly",
    "collectively",
    "in agreement",
    "unitedly",
    "unneurotic",
    "in concert",
    "in collaboration",
    "together"
  ],
  [
    "to"
  ],
  [
    "towards"
  ],
  [
    "onto"
  ],
  [
    "into"
  ],
  [
    "stern",
    "butt",
    "ass",
    "bum",
    "prat",
    "bottom",
    "tail",
    "slow",
    "arse",
    "fundament",
    "keister",
    "rear",
    "derriere",
    "rump",
    "backside",
    "tush",
    "posterior",
    "trailing",
    "seat",
    "buttocks",
    "fanny",
    "buns",
    "tail end",
    "rear end",
    "behindhand",
    "hindquarters",
    "in arrears",
    "tooshie",
    "hind end",
    "can",
    "behind"
  ],
  [
    "without"
  ],
  [
    "once again",
    "once more",
    "over again",
    "again"
  ],
  [
    "nonetheless",
    "nevertheless",
    "tranquil",
    "notwithstanding",
    "lull",
    "withal",
    "static",
    "allay",
    "however",
    "calm",
    "ease",
    "yet",
    "even",
    "hush",
    "unruffled",
    "quiet",
    "relieve",
    "quieten",
    "even so",
    "unmoving",
    "silence",
    "silent",
    "inactive",
    "stillness",
    "soundless",
    "stock-still",
    "motionless",
    "tranquillize",
    "all the same",
    "tranquilize",
    "nonmoving",
    "distillery",
    "hush up",
    "shut up",
    "calm down",
    "at rest",
    "noneffervescent",
    "placid",
    "still"
  ],
  [
    "during"
  ],
  [
    "outward",
    "outwards"
  ],
  [
    "up",
    "upwardly",
    "upward",
    "upwards"
  ],
  [
    "down",
    "downward",
    "downwardly",
    "downwards"
  ],
  [
    "toward"
  ],
  [
    "subsequently",
    "after",
    "later",
    "afterward",
    "later on",
    "afterwards"
  ],
  [
    "nevertheless",
    "notwithstanding",
    "withal",
    "however",
    "yet",
    "even so",
    "all the same",
    "still",
    "nonetheless"
  ],
  [
    "promptly",
    "cursorily",
    "apace",
    "rapidly",
    "quick",
    "speedily",
    "chop-chop",
    "quickly"
  ],
  [
    "rattling",
    "identical",
    "real",
    "really",
    "one and the same",
    "selfsame",
    "very"
  ],
  [
    "in earnest",
    "earnestly",
    "badly",
    "severely",
    "gravely",
    "seriously"
  ],
  [
    "ever",
    "forever",
    "always"
  ],
  [
    "fair",
    "clean",
    "middling",
    "moderately",
    "somewhat",
    "passably",
    "reasonably",
    "evenhandedly",
    "within reason",
    "without favoring one party",
    "fairly"
  ],
  [
    "quite a",
    "quite an",
    "rather",
    "quite"
  ],
  [
    "likewise",
    "besides",
    "excessively",
    "also",
    "as well",
    "overly",
    "too"
  ],
  [
    "few"
  ],
  [
    "same",
    "ego",
    "self"
  ],
  [
    "barelyany"
  ],
  [
    "various",
    "respective",
    "several"
  ],
  [
    "extraordinary",
    "about",
    "just about",
    "roughly",
    "around",
    "more or less",
    "approximately",
    "or so",
    "close to",
    "some"
  ],
  [
    "alotof"
  ],
  [
    "agreatamountof"
  ],
  [
    "adequate",
    "sufficient",
    "decent",
    "plenty",
    "sufficiency",
    "enough"
  ],
  [
    "toomuch"
  ],
  [
    "notenough"
  ],
  [
    "endure",
    "brave",
    "brave out",
    "upwind",
    "atmospheric condition",
    "weather condition",
    "weather"
  ],
  [
    "veracious",
    "guileless",
    "open",
    "reliable",
    "artless",
    "true",
    "unpretentious",
    "square",
    "dependable",
    "trustworthy",
    "straight",
    "truthful",
    "trusty",
    "downright",
    "honorable",
    "sincere",
    "honest"
  ],
  [
    "health"
  ],
  [
    "piquant",
    "sexy",
    "blue",
    "hot",
    "racy",
    "pungent",
    "naughty",
    "zesty",
    "tasteful",
    "gamy",
    "gamey",
    "risque",
    "juicy",
    "savoury",
    "peppery",
    "gingery",
    "savory",
    "spicy"
  ],
  [
    "adequate",
    "efficient",
    "effective",
    "capable",
    "qualified",
    "workmanlike",
    "able",
    "competent"
  ],
  [
    "southerly",
    "southbound",
    "southeasterly",
    "southeast",
    "southernmost",
    "southwesterly",
    "southeastern",
    "southwestern",
    "southeastward",
    "southwestward",
    "southmost",
    "due south",
    "south-central",
    "in the south",
    "to the south",
    "confederacy",
    "confederate states of america",
    "dixie",
    "dixieland",
    "s",
    "southern",
    "southland",
    "southward",
    "southwest",
    "south"
  ],
  [
    "meaningful",
    "accessible",
    "intelligible",
    "understandable",
    "comprehendible",
    "approachable",
    "apprehensible",
    "knowable",
    "cognizable",
    "perceivable",
    "graspable",
    "cognisable",
    "fathomable",
    "comprehensible"
  ],
  [
    "new",
    "modern",
    "past",
    "late",
    "recent"
  ],
  [
    "if"
  ],
  [
    "portion",
    "lot",
    "luck",
    "circumstances",
    "fate",
    "fortune",
    "destiny"
  ],
  [
    "semblance",
    "emblazon",
    "vividness",
    "color",
    "discolour",
    "coloring",
    "colouring",
    "panchromatic",
    "discolor",
    "color in",
    "people of color",
    "colour in",
    "people of colour",
    "colour"
  ],
  [
    "prompt",
    "warm",
    "intelligent",
    "promptly",
    "nimble",
    "active",
    "fast",
    "immediate",
    "ready",
    "speedy",
    "hurried",
    "quickly",
    "straightaway",
    "flying",
    "excitable",
    "agile",
    "spry",
    "quick"
  ],
  [
    "conceited",
    "arrogant",
    "gratifying",
    "glorious",
    "haughty",
    "supercilious",
    "illustrious",
    "impressive",
    "vainglorious",
    "lofty",
    "pleased",
    "disdainful",
    "big",
    "egotistical",
    "redoubtable",
    "dignified",
    "beaming",
    "prideful",
    "self-aggrandizing",
    "majestic",
    "swaggering",
    "sniffy",
    "cock-a-hoop",
    "chesty",
    "self-important",
    "boastful",
    "persnickety",
    "self-conceited",
    "stuck-up",
    "crowing",
    "snotty",
    "swelled",
    "swollen",
    "uppish",
    "snot-nosed",
    "respected",
    "self-respecting",
    "overproud",
    "bigheaded",
    "egotistic",
    "purse-proud",
    "braggy",
    "house-proud",
    "shabby-genteel",
    "swollen-headed",
    "self-respectful",
    "gallant",
    "lordly",
    "snooty",
    "vain",
    "proud"
  ],
  [
    "contrary",
    "obdurate",
    "perverse",
    "stubborn",
    "unrepentant",
    "wayward",
    "disobedient",
    "cussed",
    "unregenerate",
    "unreconstructed",
    "unregenerated",
    "obstinate"
  ],
  [
    "relentless",
    "continual",
    "unrelenting",
    "lasting",
    "haunting",
    "unforgettable",
    "persistent"
  ],
  [
    "offset",
    "source",
    "basal",
    "basic",
    "novice",
    "root",
    "primary",
    "start",
    "commencement",
    "first",
    "outset",
    "kickoff",
    "starting time",
    "abecedarian",
    "origin",
    "beginning"
  ],
  [
    "dew"
  ],
  [
    "articulate",
    "facile",
    "eloquent",
    "bright",
    "achromatic",
    "fluent",
    "metallic",
    "silver-tongued",
    "silvern",
    "colorless",
    "ag",
    "flatware",
    "smooth-spoken",
    "silverish",
    "ash gray",
    "silver grey",
    "silver gray",
    "ash grey",
    "atomic number 47",
    "argent",
    "silvery",
    "silver"
  ],
  [
    "audacious",
    "impudent",
    "brazen",
    "brassy",
    "bodacious",
    "barefaced",
    "unashamed",
    "disrespectful",
    "brazen-faced",
    "bold-faced",
    "snotty-nosed",
    "flip",
    "insolent"
  ],
  [
    "anxiousness",
    "anxiety"
  ],
  [
    "esurient",
    "avid",
    "avaricious",
    "covetous",
    "acquisitive",
    "desirous",
    "prehensile",
    "gluttonous",
    "grasping",
    "devouring",
    "grabby",
    "greedy"
  ],
  [
    "chance",
    "opportunity"
  ],
  [
    "cold",
    "passionless",
    "emotionless"
  ],
  [
    "shoulderblade"
  ],
  [
    "adept",
    "proficient",
    "good",
    "skilled",
    "expert",
    "skillful",
    "practiced",
    "skilful"
  ],
  [
    "adroit",
    "deft",
    "dextrous",
    "dexterous"
  ],
  [
    "gulf"
  ],
  [
    "fornicator",
    "adulterer"
  ],
  [
    "hollow",
    "mendacious",
    "specious",
    "faux",
    "sham",
    "counterfeit",
    "fictitious",
    "delusive",
    "insincere",
    "sour",
    "unreal",
    "artificial",
    "fake",
    "invalid",
    "fictive",
    "assumed",
    "wrong",
    "imitation",
    "simulated",
    "dishonorable",
    "imitative",
    "put on",
    "mistaken",
    "dishonest",
    "pretended",
    "untrue",
    "incorrect",
    "inconstant",
    "off-key",
    "treacherously",
    "unharmonious",
    "unrealistic",
    "inharmonious",
    "traitorously",
    "faithlessly",
    "treasonably",
    "false"
  ],
  [
    "base",
    "erroneous",
    "deplorable",
    "fallacious",
    "awry",
    "immoral",
    "improper",
    "misguided",
    "unsuitable",
    "inappropriate",
    "damage",
    "amiss",
    "false",
    "criminal",
    "unethical",
    "reprehensible",
    "dishonorable",
    "condemnable",
    "untimely",
    "inopportune",
    "mistaken",
    "ill-timed",
    "untrue",
    "haywire",
    "inside",
    "incorrect",
    "inaccurate",
    "dishonourable",
    "incorrectly",
    "wrongheaded",
    "wrongfulness",
    "mis",
    "unseasonable",
    "wrongly",
    "ill timed",
    "out of order",
    "the matter",
    "legal injury",
    "wrong"
  ],
  [
    "curse",
    "expletive",
    "oath",
    "cuss",
    "curse word",
    "swearing",
    "swearword"
  ],
  [
    "castrate",
    "eunuch"
  ],
  [
    "hebdomad",
    "calendar week",
    "workweek",
    "week"
  ],
  [
    "renown",
    "celebrity",
    "fame"
  ],
  [
    "report",
    "repute",
    "reputation"
  ],
  [
    "timid",
    "restrained",
    "gingerly",
    "moderate",
    "guarded",
    "chary",
    "cagey",
    "dilatory",
    "careful",
    "fabian",
    "cagy",
    "overcautious",
    "unadventurous",
    "conservative",
    "cautious"
  ],
  [
    "crotch",
    "genitals",
    "private parts",
    "privates",
    "genital organ",
    "genitalia"
  ],
  [
    "crocodile"
  ],
  [
    "wedge",
    "torpedo",
    "sub",
    "bomber",
    "subsurface",
    "hoagie",
    "poor boy",
    "hero sandwich",
    "pigboat",
    "hoagy",
    "undersea",
    "submarine sandwich",
    "cuban sandwich",
    "grinder",
    "hero",
    "italian sandwich",
    "u-boat",
    "zep",
    "submarine"
  ],
  [
    "dull",
    "tedious",
    "irksome",
    "wearisome",
    "slow",
    "tiresome",
    "uninteresting",
    "ho-hum",
    "deadening",
    "drilling",
    "oil production",
    "boring"
  ],
  [
    "lettuce"
  ],
  [
    "garish",
    "tawdry",
    "brassy",
    "meretricious",
    "gaudy",
    "sleazy",
    "inferior",
    "bum",
    "punk",
    "gimcrack",
    "bargain",
    "flashy",
    "tacky",
    "stingy",
    "chintzy",
    "tasteless",
    "ungenerous",
    "loud",
    "cheesy",
    "tatty",
    "trashy",
    "tinny",
    "crummy",
    "chinchy",
    "inexpensive",
    "cut-rate",
    "affordable",
    "sixpenny",
    "low-cost",
    "cut-price",
    "tuppeny",
    "dirt cheap",
    "twopenny",
    "threepenny",
    "low-priced",
    "twopenny-halfpenny",
    "bargain-priced",
    "two-a-penny",
    "flash",
    "cheap"
  ],
  [
    "harlot",
    "tart",
    "bawd",
    "trollop",
    "cocotte",
    "working girl",
    "prostitute",
    "fancy woman",
    "woman of the street",
    "lady of pleasure",
    "sporting lady",
    "cyprian",
    "whore"
  ],
  [
    "cackle",
    "prattle",
    "maunder",
    "palaver",
    "clack",
    "gabble",
    "confabulate",
    "prate",
    "blabber",
    "click",
    "confab",
    "visit",
    "twaddle",
    "piffle",
    "jaw",
    "tattle",
    "chattering",
    "chat",
    "gossip",
    "tittle-tattle",
    "natter",
    "chaffer",
    "chitchat",
    "gibber",
    "yack",
    "yakety-yak",
    "claver",
    "yak",
    "chatter"
  ],
  [
    "naive",
    "naif",
    "ignorant",
    "raw",
    "immature",
    "fledgling",
    "new",
    "unsophisticated",
    "untried",
    "uninitiate",
    "unfledged",
    "unseasoned",
    "untested",
    "unpracticed",
    "unpractised",
    "uninitiated",
    "callow",
    "green",
    "inexperienced"
  ],
  [
    "stupefied",
    "dull",
    "anserine",
    "obtuse",
    "dazed",
    "dim",
    "thick",
    "stunned",
    "imbecile",
    "dense",
    "witless",
    "foolish",
    "dolt",
    "gormless",
    "slow",
    "dopey",
    "senseless",
    "imbecilic",
    "dumb",
    "moronic",
    "feebleminded",
    "headless",
    "lumpish",
    "half-witted",
    "cloddish",
    "doltish",
    "dopy",
    "loggerheaded",
    "lumpen",
    "unintelligent",
    "thick-skulled",
    "boneheaded",
    "nitwitted",
    "brainless",
    "goosey",
    "gooselike",
    "unthinking",
    "gaumless",
    "stupid person",
    "slow-witted",
    "blockheaded",
    "fatheaded",
    "wooden-headed",
    "poor fish",
    "thickheaded",
    "goosy",
    "pudding head",
    "pudden-head",
    "soft-witted",
    "yokel-like",
    "dullard",
    "stupid"
  ],
  [
    "close",
    "adjacent",
    "succeeding",
    "future",
    "following",
    "incoming",
    "side by side",
    "next"
  ],
  [
    "light",
    "distress",
    "giddy",
    "delirious",
    "ominous",
    "bad",
    "trouble",
    "faint",
    "scrofulous",
    "harmful",
    "infirm",
    "stricken",
    "sick",
    "upset",
    "hostile",
    "dyspeptic",
    "vertiginous",
    "ailing",
    "queasy",
    "afflicted",
    "indisposed",
    "sickly",
    "funny",
    "spastic",
    "ailment",
    "bilious",
    "convalescent",
    "inauspicious",
    "woozy",
    "unwell",
    "consumptive",
    "feverish",
    "badly",
    "livery",
    "unpropitious",
    "complaint",
    "liverish",
    "feverous",
    "bedrid",
    "dizzy",
    "nauseated",
    "light-headed",
    "menstruating",
    "bedfast",
    "tubercular",
    "poorly",
    "seasick",
    "sickish",
    "carsick",
    "aguish",
    "hallucinating",
    "airsick",
    "gouty",
    "tuberculous",
    "recovering",
    "swooning",
    "bronchitic",
    "sneezy",
    "diabetic",
    "bedridden",
    "unhealed",
    "sick-abed",
    "ill"
  ],
  [
    "plume",
    "preen",
    "superbia",
    "congratulate",
    "pridefulness",
    "pride"
  ],
  [
    "soft",
    "amenable",
    "submissive",
    "acquiescent",
    "obedient",
    "willing",
    "spiritless",
    "obliging",
    "biddable",
    "nonresistant",
    "lamblike",
    "complying",
    "meek",
    "yielding",
    "compliant"
  ],
  [
    "pliant",
    "susceptible",
    "malleable",
    "flexible",
    "elastic",
    "adaptable",
    "tensile",
    "fictile",
    "flexile",
    "ductile",
    "tractile",
    "bendable",
    "pliable"
  ],
  [
    "core",
    "pith",
    "effect",
    "substance",
    "marrow",
    "heart",
    "meat",
    "kernel",
    "nub",
    "perfume",
    "nitty-gritty",
    "inwardness",
    "burden",
    "center",
    "gist",
    "sum",
    "essence"
  ],
  [
    "essence",
    "pith",
    "effect",
    "substance",
    "marrow",
    "heart",
    "meat",
    "kernel",
    "nucleus",
    "nub",
    "nitty-gritty",
    "inwardness",
    "core group",
    "burden",
    "center",
    "gist",
    "sum",
    "core"
  ],
  [
    "panthera tigris",
    "tiger"
  ],
  [
    "conceited",
    "futile",
    "proud",
    "egotistical",
    "fruitless",
    "self-conceited",
    "unproductive",
    "swollen",
    "sleeveless",
    "bootless",
    "egotistic",
    "swollen-headed",
    "vain"
  ],
  [
    "sharp",
    "acerbic",
    "acerb",
    "sour",
    "styptic",
    "hemostatic",
    "astringent drug",
    "astringent"
  ],
  [
    "sharp",
    "harlot",
    "whore",
    "bawd",
    "trollop",
    "unpleasant",
    "sour",
    "cocotte",
    "working girl",
    "prostitute",
    "tangy",
    "fancy woman",
    "woman of the street",
    "lemony",
    "lady of pleasure",
    "sporting lady",
    "sourish",
    "lemonlike",
    "sharp-worded",
    "cyprian",
    "tart"
  ],
  [
    "covetous",
    "desirous",
    "grudging",
    "jealous",
    "selfish",
    "begrudging",
    "envious"
  ],
  [
    "begrudge",
    "enviousness",
    "invidia",
    "the green-eyed monster",
    "envy"
  ],
  [
    "casket",
    "coffin"
  ],
  [
    "rainbow"
  ],
  [
    "destitute",
    "impoverished",
    "indigent",
    "poor",
    "necessitous",
    "poverty-stricken",
    "needy"
  ],
  [
    "keen",
    "good",
    "cool",
    "great",
    "swell",
    "tough",
    "dandy",
    "swagger",
    "nifty",
    "ruffian",
    "neat",
    "rowdy",
    "hector",
    "hooligan",
    "yobbo",
    "groovy",
    "roughneck",
    "bullyrag",
    "browbeat",
    "corking",
    "yob",
    "strong-arm",
    "slap-up",
    "cracking",
    "bang-up",
    "ballyrag",
    "smashing",
    "peachy",
    "not bad",
    "push around",
    "boss around",
    "yobo",
    "bully"
  ],
  [
    "wrath",
    "choler",
    "ira",
    "see red",
    "angriness",
    "ire",
    "anger"
  ],
  [
    "express",
    "tell",
    "land",
    "submit",
    "res publica",
    "nation",
    "put forward",
    "say",
    "country",
    "state of matter",
    "public",
    "body politic",
    "state-supported",
    "commonwealth",
    "department of state",
    "province",
    "state department",
    "state"
  ],
  [
    "rich",
    "sufficient",
    "easy",
    "prosperous",
    "snug",
    "homely",
    "soothing",
    "cozy",
    "wide",
    "comfy",
    "cosy",
    "homy",
    "homey",
    "well-fixed",
    "comforted",
    "well-heeled",
    "well-off",
    "well-to-do",
    "homelike",
    "well-situated",
    "comfortable"
  ],
  [
    "occult",
    "overshadow",
    "eclipse"
  ],
  [
    "deep",
    "low",
    "low-pitched",
    "basso",
    "sea bass",
    "bass voice",
    "bass part",
    "freshwater bass",
    "bass"
  ],
  [
    "phloem",
    "bast fiber",
    "bast"
  ],
  [
    "subject",
    "issue",
    "affair",
    "substance",
    "thing",
    "count",
    "material",
    "topic",
    "weigh",
    "matter"
  ],
  [
    "liaison",
    "intimacy",
    "amour",
    "thing",
    "occasion",
    "involvement",
    "affaire",
    "social occasion",
    "matter",
    "affair"
  ],
  [
    "timid",
    "dread",
    "timorous",
    "dreadful",
    "alarming",
    "craven",
    "trepid",
    "bad",
    "faint",
    "awful",
    "lily-livered",
    "fearsome",
    "direful",
    "terrible",
    "horrific",
    "recreant",
    "dastardly",
    "horrendous",
    "frightful",
    "caitiff",
    "fainthearted",
    "pusillanimous",
    "dreaded",
    "chicken",
    "frightening",
    "white-livered",
    "poltroon",
    "yellow-bellied",
    "funky",
    "cowardly",
    "unmanly",
    "poor-spirited",
    "chickenhearted",
    "coward",
    "dire",
    "yellow",
    "fearful"
  ],
  [
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
    "dreadful"
  ],
  [
    "ostentatious",
    "insipid",
    "garish",
    "tawdry",
    "brassy",
    "meretricious",
    "pretentious",
    "vapid",
    "gaudy",
    "flat",
    "gimcrack",
    "camp",
    "flashy",
    "kitsch",
    "tacky",
    "barbaric",
    "loud",
    "tatty",
    "cheap",
    "trashy",
    "indelicate",
    "unseasoned",
    "flavorless",
    "campy",
    "savorless",
    "inaesthetic",
    "unappetizing",
    "unsalted",
    "flavourless",
    "unaesthetic",
    "unflavored",
    "unflavoured",
    "nonflavored",
    "nonflavoured",
    "in poor taste",
    "bland",
    "flash",
    "tasteless"
  ],
  [
    "incantation"
  ],
  [
    "thief"
  ],
  [
    "cunning",
    "artful",
    "adroit",
    "intelligent",
    "ingenious",
    "cagey",
    "smart",
    "cagy",
    "apt",
    "canny",
    "clever"
  ],
  [
    "prudent",
    "sensible",
    "judicious",
    "sagacious",
    "sapient",
    "perspicacious",
    "diplomatic",
    "considered",
    "knowing",
    "method",
    "advised",
    "owlish",
    "all-knowing",
    "statesmanlike",
    "statesmanly",
    "well-advised",
    "wise to",
    "omniscient",
    "sage",
    "wise"
  ],
  [
    "close",
    "touch",
    "peer",
    "like",
    "even",
    "tight",
    "equivalent",
    "coordinate",
    "compeer",
    "same",
    "match",
    "rival",
    "coequal",
    "equilateral",
    "isometric",
    "isothermal",
    "balanced",
    "equidistant",
    "equalize",
    "isometrical",
    "quits",
    "fifty-fifty",
    "equalized",
    "equalised",
    "be",
    "equal"
  ],
  [
    "congruent",
    "same",
    "indistinguishable",
    "very",
    "one and the same",
    "selfsame",
    "superposable",
    "monovular",
    "isotropic",
    "isotropous",
    "identical"
  ],
  [
    "womb",
    "uterus"
  ],
  [
    "grim",
    "dejected",
    "dismal",
    "blue",
    "drab",
    "dark",
    "sad",
    "disconsolate",
    "sorry",
    "glum",
    "hopeless",
    "dreary",
    "drear",
    "dispiriting",
    "dingy",
    "glooming",
    "depressing",
    "cheerless",
    "saddening",
    "uncheerful",
    "gloomful",
    "depressive",
    "long-faced",
    "gloomy"
  ],
  [
    "dejected",
    "blue",
    "downcast",
    "dispirited",
    "low",
    "thin",
    "down",
    "concave",
    "downhearted",
    "indented",
    "low-spirited",
    "depressed"
  ],
  [
    "cardinal",
    "ace",
    "one",
    "single",
    "iodine",
    "1",
    "iodin",
    "atomic number 53",
    "ane",
    "unity",
    "i"
  ],
  [
    "gracious",
    "refined",
    "courteous",
    "genteel",
    "nice",
    "cultivated",
    "civilized",
    "mannerly",
    "well-mannered",
    "cultured",
    "civil",
    "polite"
  ],
  [
    "sardonic",
    "mordant",
    "grim",
    "wry",
    "black",
    "pungent",
    "barbed",
    "nipping",
    "satirical",
    "satiric",
    "biting",
    "saturnine",
    "sarcastic"
  ],
  [
    "delicate",
    "soft",
    "crisp",
    "warm",
    "affectionate",
    "fond",
    "short",
    "sensitive",
    "unstable",
    "vulnerable",
    "sentimental",
    "crank",
    "sore",
    "caring",
    "immature",
    "loving",
    "painful",
    "bid",
    "cranky",
    "flaky",
    "lovesome",
    "offer",
    "protective",
    "young",
    "pinnace",
    "legal tender",
    "untoughened",
    "chewable",
    "flakey",
    "tenderized",
    "tenderize",
    "tippy",
    "cuttable",
    "supply ship",
    "crispy",
    "tender"
  ],
  [
    "solemn",
    "sombre",
    "somber",
    "drab",
    "sedate",
    "serious",
    "dry",
    "unplayful",
    "colorless",
    "colourless",
    "teetotal",
    "sober up",
    "unintoxicated",
    "cold sober",
    "uninebriated",
    "stone-sober",
    "grave",
    "sober"
  ],
  [
    "flow",
    "period",
    "catamenia",
    "menses",
    "menstruation"
  ],
  [
    "principal",
    "independent",
    "primary",
    "briny",
    "chief",
    "main"
  ],
  [
    "stepladder"
  ],
  [
    "stride",
    "tread",
    "tempo",
    "step",
    "rate",
    "gait",
    "yard",
    "footstep",
    "pace"
  ],
  [
    "slug",
    "hummer",
    "fastball",
    "heater",
    "smoke",
    "bullet"
  ],
  [
    "knave",
    "jackass",
    "jackfruit",
    "jacklight",
    "jack up",
    "jak",
    "jack"
  ],
  [
    "propagation",
    "contemporaries",
    "coevals",
    "multiplication",
    "generation"
  ],
  [
    "frivolous",
    "clear",
    "bright",
    "livid",
    "deficient",
    "short",
    "luminescent",
    "casual",
    "scant",
    "insignificant",
    "pure",
    "faint",
    "shallow",
    "fluorescent",
    "flimsy",
    "easy",
    "illuminate",
    "incandescent",
    "perch",
    "airy",
    "sick",
    "candent",
    "fall",
    "illumination",
    "promiscuous",
    "ignite",
    "alight",
    "buoyant",
    "insufficient",
    "illume",
    "candescent",
    "clean",
    "loose",
    "ill",
    "illuminated",
    "luminance",
    "abstemious",
    "pale",
    "lightly",
    "phosphorescent",
    "illuminating",
    "illumine",
    "luminosity",
    "chiffon",
    "feathery",
    "friable",
    "lightweight",
    "light up",
    "floaty",
    "lightsome",
    "inflamed",
    "palish",
    "get off",
    "brightness",
    "lighter",
    "lite",
    "dismount",
    "light-headed",
    "bantamweight",
    "floodlit",
    "ignitor",
    "lamplit",
    "pastel",
    "lighting",
    "lightness",
    "flyweight",
    "leavened",
    "light-footed",
    "luminousness",
    "powdery",
    "featherweight",
    "get down",
    "lighted",
    "fooling",
    "igniter",
    "featherlike",
    "light source",
    "light within",
    "digestible",
    "fire up",
    "nonfat",
    "bioluminescent",
    "fat-free",
    "low-cal",
    "inner light",
    "light-armed",
    "reddened",
    "fatless",
    "light-duty",
    "floodlighted",
    "christ within",
    "lightly-armed",
    "diet",
    "gentle",
    "idle",
    "lit",
    "sandy",
    "light"
  ],
  [
    "bastard"
  ],
  [
    "appellation",
    "appointment",
    "denomination",
    "appellative",
    "assignment",
    "identification",
    "naming",
    "designation"
  ],
  [
    "mark",
    "scrape",
    "scratch",
    "cicatrice",
    "cicatrix",
    "pock",
    "pit",
    "scar"
  ],
  [
    "crude",
    "crude oil",
    "coal oil",
    "rock oil",
    "fossil oil",
    "petroleum"
  ],
  [
    "soft",
    "voluptuous",
    "gay",
    "effete",
    "lenient",
    "decadent",
    "favorable",
    "permissive",
    "favourable",
    "dissipated",
    "luxurious",
    "hedonistic",
    "hedonic",
    "intemperate",
    "voluptuary",
    "sporting",
    "gambling",
    "betting",
    "self-indulgent",
    "card-playing",
    "epicurean",
    "lax",
    "sybaritic",
    "indulgent"
  ],
  [
    "power",
    "ability"
  ],
  [
    "reverie",
    "dream",
    "moon",
    "castle in the air",
    "woolgather",
    "stargaze",
    "revery",
    "castle in spain",
    "air castle",
    "daydream"
  ],
  [
    "numerous",
    "umpteen",
    "umteen",
    "many"
  ],
  [
    "practically",
    "a good deal",
    "often",
    "a lot",
    "very much",
    "a great deal",
    "much"
  ],
  [
    "arduous",
    "profound",
    "sullen",
    "grievous",
    "dull",
    "important",
    "wicked",
    "sonorous",
    "broad",
    "great",
    "strong",
    "hard",
    "thick",
    "ponderous",
    "high",
    "onerous",
    "dense",
    "deep",
    "full",
    "compact",
    "enceinte",
    "grueling",
    "large",
    "sound",
    "big",
    "harsh",
    "leaden",
    "effortful",
    "massive",
    "oppressive",
    "gruelling",
    "gravid",
    "perturbing",
    "weighty",
    "laborious",
    "laboured",
    "disturbing",
    "lumbering",
    "steep",
    "worrisome",
    "distressing",
    "troubling",
    "cloudy",
    "expectant",
    "intemperate",
    "fat",
    "burdensome",
    "labored",
    "stressed",
    "threatening",
    "impenetrable",
    "wide",
    "heavily",
    "soggy",
    "toilsome",
    "accented",
    "heavyweight",
    "punishing",
    "lowering",
    "of import",
    "overweight",
    "taxing",
    "clayey",
    "distressful",
    "wakeless",
    "weighed down",
    "fleshy",
    "with child",
    "weighted",
    "cloggy",
    "heavy-footed",
    "labourious",
    "indigestible",
    "welterweight",
    "worrying",
    "doughy",
    "heavy-duty",
    "middleweight",
    "backbreaking",
    "grave",
    "hefty",
    "heavy"
  ],
  [
    "fresh",
    "new",
    "late",
    "lately",
    "newly",
    "latterly",
    "freshly",
    "of late",
    "recently"
  ],
  [
    "virtually",
    "near",
    "about",
    "well-nigh",
    "nearly",
    "all but",
    "just about",
    "most",
    "nigh",
    "almost"
  ],
  [
    "extraordinary",
    "raw",
    "thin",
    "uncommon",
    "rarefied",
    "rarified",
    "infrequent",
    "scarce",
    "rare"
  ],
  [
    "scornful",
    "scurrilous",
    "disdainful",
    "opprobrious",
    "contemptuous",
    "offensive",
    "abusive",
    "disrespectful",
    "insulting"
  ],
  [
    "obscene",
    "wicked",
    "abhorrent",
    "scornful",
    "vile",
    "loathsome",
    "sepulchral",
    "scurrilous",
    "repugnant",
    "foul",
    "charnel",
    "rank",
    "unpleasant",
    "opprobrious",
    "morbid",
    "ghastly",
    "hideous",
    "repulsive",
    "revolting",
    "horrid",
    "horrific",
    "outrageous",
    "distasteful",
    "obnoxious",
    "unsavory",
    "loathly",
    "noisome",
    "odoriferous",
    "repellent",
    "abusive",
    "disgusting",
    "ghoulish",
    "repellant",
    "nauseous",
    "marauding",
    "nauseating",
    "yucky",
    "offense",
    "offence",
    "predatory",
    "detestable",
    "disgustful",
    "scrimy",
    "verminous",
    "insulting",
    "sickening",
    "invasive",
    "objectionable",
    "offending",
    "unwholesome",
    "incursive",
    "assaultive",
    "unsavoury",
    "raiding",
    "violative",
    "hit-and-run",
    "antipersonnel",
    "invading",
    "dysphemistic",
    "tip-and-run",
    "offensive"
  ],
  [
    "arm",
    "sleeve"
  ],
  [
    "gum",
    "gingiva"
  ],
  [
    "dejection",
    "stool",
    "ordure",
    "feces",
    "fecal matter",
    "faecal matter",
    "bm",
    "faeces"
  ],
  [
    "lightning"
  ],
  [
    "benevolent",
    "good",
    "kind",
    "kindly",
    "openhearted",
    "goodhearted"
  ],
  [
    "minute",
    "hr",
    "time of day",
    "60 minutes",
    "hour"
  ],
  [
    "otiose",
    "indolent",
    "light",
    "frivolous",
    "lackadaisical",
    "dead",
    "unwarranted",
    "slothful",
    "loose",
    "faineant",
    "inactive",
    "baseless",
    "unfounded",
    "lazy",
    "irresponsible",
    "stagnate",
    "unemployed",
    "groundless",
    "work-shy",
    "bone-idle",
    "leisured",
    "unengaged",
    "jobless",
    "unsupported",
    "unused",
    "unprofitable",
    "bone-lazy",
    "laze",
    "out of work",
    "idle"
  ],
  [
    "end",
    "destination",
    "goal"
  ],
  [
    "mature",
    "get on",
    "maturate",
    "years",
    "long time",
    "old age",
    "age"
  ],
  [
    "hours"
  ],
  [
    "bang",
    "love",
    "bulge",
    "prominence",
    "make out",
    "screw",
    "know",
    "bonk",
    "bed",
    "jazz",
    "hunch",
    "excrescence",
    "protrusion",
    "sleep with",
    "protuberance",
    "get it on",
    "extrusion",
    "gibbosity",
    "have it off",
    "lie with",
    "do it",
    "have intercourse",
    "gibbousness",
    "hunch over",
    "hunch forward",
    "have it away",
    "be intimate",
    "have a go at it",
    "bump",
    "jut",
    "hump"
  ],
  [
    "vehicle"
  ],
  [
    "unforeseen",
    "sudden",
    "unanticipated",
    "unheralded",
    "surprising",
    "unpredicted",
    "forced",
    "unhoped-for",
    "unhoped",
    "unsuspected",
    "unplanned",
    "unannounced",
    "unthought",
    "unlooked-for",
    "unscheduled",
    "unthought-of",
    "unexpected"
  ],
  [
    "dais",
    "rostrum",
    "podium",
    "stomp",
    "stamp",
    "pulpit",
    "ambo",
    "mix up",
    "soapbox",
    "tree stump",
    "stump"
  ],
  [
    "beetroot",
    "beta vulgaris",
    "common beet",
    "beet"
  ],
  [
    "cucurbita pepo",
    "pumpkin vine",
    "autumn pumpkin",
    "pumpkin"
  ],
  [
    "melon vine",
    "melon"
  ],
  [
    "liquidator",
    "murderer"
  ],
  [
    "modest",
    "naive",
    "naif",
    "obtuse",
    "common",
    "elegant",
    "plain",
    "bare",
    "primitive",
    "ordinary",
    "pure",
    "easy",
    "original",
    "unpretentious",
    "ultimate",
    "homely",
    "uncomplicated",
    "primary",
    "childlike",
    "elementary",
    "simpleton",
    "retarded",
    "elliptic",
    "simple-minded",
    "unsophisticated",
    "underived",
    "simplified",
    "simplex",
    "elemental",
    "ovate",
    "acerose",
    "oversimplified",
    "oblong",
    "acuminate",
    "acicular",
    "half-witted",
    "caudate",
    "lyrate",
    "cordate",
    "elongate",
    "orbicular",
    "spatulate",
    "deltoid",
    "simplistic",
    "reniform",
    "ensiform",
    "kidney-shaped",
    "sagittiform",
    "unlobed",
    "lanceolate",
    "obovate",
    "peltate",
    "dolabriform",
    "acerate",
    "orbiculate",
    "dim-witted",
    "unproblematic",
    "dolabrate",
    "lancelike",
    "cuneate",
    "hastate",
    "apiculate",
    "perfoliate",
    "sagittate",
    "oblanceolate",
    "pandurate",
    "panduriform",
    "wedge-shaped",
    "sword-shaped",
    "unanalyzable",
    "fiddle-shaped",
    "swordlike",
    "undecomposable",
    "bladelike",
    "heart-shaped",
    "needle-shaped",
    "shield-shaped",
    "arrow-shaped",
    "unsubdivided",
    "spatula-shaped",
    "spearhead-shaped",
    "dewey-eyed",
    "linear",
    "mere",
    "simple"
  ],
  [
    "ahead",
    "in front",
    "earlier",
    "before"
  ],
  [
    "initiative",
    "scuttle",
    "maiden",
    "orifice",
    "inaugural",
    "gap",
    "first",
    "possibility",
    "initiatory",
    "introductory",
    "starting",
    "hatchway",
    "first step",
    "possible action",
    "opening night",
    "curtain raising",
    "opening move",
    "opening"
  ],
  [
    "headlamp",
    "headlight"
  ],
  [
    "point",
    "touch",
    "position",
    "berth",
    "bit",
    "post",
    "office",
    "slur",
    "blemish",
    "spotlight",
    "blot",
    "situation",
    "smirch",
    "smear",
    "daub",
    "patch",
    "slot",
    "descry",
    "dapple",
    "stain",
    "pip",
    "smudge",
    "spy",
    "maculation",
    "blob",
    "speckle",
    "topographic point",
    "espy",
    "fleck",
    "place",
    "spot"
  ],
  [
    "mark",
    "brand",
    "stigma",
    "soil",
    "blot",
    "spot",
    "smirch",
    "smear",
    "filth",
    "grease",
    "dirt",
    "blob",
    "discoloration",
    "discolouration",
    "fleck",
    "grime",
    "stain"
  ],
  [
    "hit",
    "spot",
    "shoot",
    "whip",
    "worst",
    "mop up",
    "rack up",
    "pip"
  ],
  [
    "specs",
    "eyeglasses",
    "glasses",
    "spectacles"
  ],
  [
    "coil",
    "circuit",
    "intertwine",
    "curl",
    "eyelet",
    "grommet",
    "cringle",
    "closed circuit",
    "loop"
  ],
  [
    "engage",
    "engagement",
    "operate",
    "net",
    "network",
    "interlock",
    "enmesh",
    "meshing",
    "reticulation",
    "interlocking",
    "meshwork",
    "ensnarl",
    "lock",
    "mesh"
  ],
  [
    "bud"
  ],
  [
    "spyhole",
    "peephole"
  ],
  [
    "spring",
    "fount",
    "outpouring",
    "outflow",
    "jet",
    "natural spring",
    "fountain"
  ],
  [
    "maelstrom",
    "purl",
    "vortex",
    "whirl",
    "swirl",
    "gurge",
    "eddy",
    "whirlpool"
  ],
  [
    "intermediate",
    "heart",
    "eye",
    "centre",
    "mediate",
    "midway",
    "intervening",
    "midriff",
    "midsection",
    "in-between",
    "center",
    "halfway",
    "middle"
  ],
  [
    "focus",
    "heart",
    "concentrate",
    "eye",
    "pore",
    "middle",
    "midpoint",
    "nerve center",
    "nerve centre",
    "center",
    "rivet",
    "centre"
  ],
  [
    "burner"
  ],
  [
    "sight",
    "imagination",
    "imaginativeness",
    "visual sense",
    "visual sensation",
    "visual modality",
    "vision"
  ],
  [
    "sentiment",
    "judgment",
    "view",
    "thought",
    "judgement",
    "vox populi",
    "ruling",
    "public opinion",
    "popular opinion",
    "persuasion",
    "opinion"
  ],
  [
    "oversight",
    "superintendence",
    "supervising",
    "supervision"
  ],
  [
    "beholder",
    "perceiver",
    "commentator",
    "observer"
  ],
  [
    "face",
    "grimace"
  ],
  [
    "gall",
    "impertinence",
    "insolence",
    "cheek",
    "crust",
    "freshness",
    "cheekiness",
    "impudence"
  ],
  [
    "tool",
    "pawn",
    "legal document",
    "instrumentate",
    "legal instrument",
    "official document",
    "instrument"
  ],
  [
    "drive",
    "creature",
    "dick",
    "instrument",
    "pecker",
    "peter",
    "puppet",
    "joyride",
    "tool around",
    "shaft",
    "tool"
  ],
  [
    "feeder",
    "devourer",
    "eater"
  ],
  [
    "harbinger",
    "acclaim",
    "precursor",
    "foretell",
    "announce",
    "annunciate",
    "hail",
    "forerunner",
    "herald"
  ],
  [
    "courier",
    "messenger"
  ],
  [
    "address",
    "lecture",
    "language",
    "delivery",
    "words",
    "spoken language",
    "talking to",
    "manner of speaking",
    "oral communication",
    "speech"
  ],
  [
    "ness",
    "mantle",
    "cape"
  ],
  [
    "gag",
    "gunpoint",
    "gun muzzle",
    "muzzle"
  ],
  [
    "rat",
    "betrayer",
    "squealer",
    "informer"
  ],
  [
    "prig",
    "snob",
    "snot"
  ],
  [
    "audience",
    "audition",
    "earshot",
    "earreach",
    "auditory modality",
    "listening",
    "auditory sense",
    "sense of hearing",
    "hearing"
  ],
  [
    "auditor",
    "hearer",
    "listener"
  ],
  [
    "passage",
    "passageway"
  ],
  [
    "headstream"
  ],
  [
    "litter",
    "bedclothes",
    "bed clothing",
    "bedding material",
    "bedding"
  ],
  [
    "tableland",
    "plateau"
  ],
  [
    "lust",
    "crave",
    "hunger",
    "starve",
    "thirst"
  ],
  [
    "close",
    "conventional",
    "stodgy",
    "airless",
    "unventilated",
    "unaired",
    "stuffy"
  ],
  [
    "good",
    "intimate",
    "warm",
    "familiar",
    "imminent",
    "restrained",
    "hot",
    "confined",
    "fine",
    "ambient",
    "adjacent",
    "short",
    "impending",
    "terminus",
    "snug",
    "contiguous",
    "tight",
    "conclusion",
    "careful",
    "proximate",
    "last",
    "chummy",
    "near",
    "private",
    "fold",
    "immediate",
    "stingy",
    "end",
    "ungenerous",
    "cozy",
    "finis",
    "finish",
    "confidential",
    "finale",
    "faithful",
    "next",
    "closing",
    "accurate",
    "airless",
    "juxtaposed",
    "fill up",
    "nestled",
    "fill",
    "equal",
    "stuffy",
    "secretive",
    "nearer",
    "shut",
    "neighbor",
    "closely",
    "shut down",
    "come together",
    "approximate",
    "uncommunicative",
    "close-fitting",
    "incommunicative",
    "snuggled",
    "tightlipped",
    "nearby",
    "neighbour",
    "confining",
    "close-hauled",
    "closelipped",
    "closer",
    "close-knit",
    "hand-to-hand",
    "cheeseparing",
    "close down",
    "closest",
    "adpressed",
    "stopping point",
    "ending",
    "appressed",
    "penny-pinching",
    "nearest",
    "closemouthed",
    "unventilated",
    "unaired",
    "nighest",
    "closely knit",
    "boon",
    "dear",
    "nigh",
    "close"
  ],
  [
    "fiend",
    "demon",
    "monster",
    "daemon",
    "daimon",
    "nettle",
    "vex",
    "nark",
    "gravel",
    "lucifer",
    "bother",
    "irritate",
    "annoy",
    "rile",
    "hellion",
    "get to",
    "get at",
    "beelzebub",
    "deuce",
    "dickens",
    "heller",
    "ogre",
    "old nick",
    "prince of darkness",
    "rag",
    "satan",
    "the devil",
    "the tempter",
    "devil"
  ],
  [
    "treacherous",
    "unfaithful",
    "punic",
    "perfidious"
  ],
  [
    "marriage broker",
    "matchmaker"
  ],
  [
    "case",
    "event"
  ],
  [
    "happening",
    "natural event",
    "occurrence"
  ],
  [
    "gruff",
    "cacophonous",
    "cacophonic",
    "husky",
    "hoarse"
  ],
  [
    "smattering",
    "fistful",
    "handful"
  ],
  [
    "cock"
  ],
  [
    "head",
    "principal",
    "top",
    "primary",
    "main",
    "gaffer",
    "foreman",
    "top dog",
    "honcho",
    "arch",
    "boss",
    "chief"
  ],
  [
    "head",
    "top",
    "stud",
    "gaffer",
    "stamp",
    "emboss",
    "foreman",
    "brag",
    "honcho",
    "party boss",
    "hirer",
    "political boss",
    "arch",
    "chief",
    "rivet",
    "superior",
    "boss"
  ],
  [
    "fang"
  ],
  [
    "hook",
    "unguis",
    "pincer",
    "chela",
    "nipper",
    "claw"
  ],
  [
    "content",
    "essence",
    "core",
    "pith",
    "sense",
    "marrow",
    "heart",
    "message",
    "meaning",
    "meat",
    "subject matter",
    "kernel",
    "nub",
    "nitty-gritty",
    "inwardness",
    "center",
    "gist",
    "matter",
    "means",
    "sum",
    "substance"
  ],
  [
    "substantial",
    "crucial",
    "tangible",
    "corporeal",
    "relevant",
    "incarnate",
    "corporal",
    "embodied",
    "stuff",
    "physical",
    "cloth",
    "real",
    "worldly",
    "fabric",
    "corporate",
    "textile",
    "reincarnate",
    "bodied",
    "touchable",
    "bodily",
    "matter",
    "material"
  ],
  [
    "firewood"
  ],
  [
    "timbre",
    "quality",
    "tone",
    "lumber",
    "forest",
    "timberland",
    "woodland",
    "timber"
  ],
  [
    "range",
    "string",
    "iron",
    "concatenation",
    "chains",
    "mountain range",
    "irons",
    "mountain chain",
    "chain of mountains",
    "chemical chain",
    "range of mountains",
    "strand",
    "chain"
  ],
  [
    "corrupt",
    "payoff",
    "buy",
    "bribe"
  ],
  [
    "others"
  ],
  [
    "earthball",
    "false truffle",
    "true puffball",
    "hard-skinned puffball",
    "puffball"
  ],
  [
    "sawdust"
  ],
  [
    "bran"
  ],
  [
    "bridget",
    "saint bride",
    "brigid",
    "saint bridget",
    "saint brigid",
    "bride"
  ],
  [
    "show",
    "appearing",
    "coming into court",
    "visual aspect",
    "appearance"
  ],
  [
    "bruit",
    "hearsay",
    "rumor",
    "rumour"
  ],
  [
    "rime",
    "hoarfrost",
    "freeze",
    "ice",
    "icing",
    "hoar",
    "robert frost",
    "robert lee frost",
    "frost"
  ],
  [
    "organization",
    "face",
    "governance",
    "cheek",
    "nerve",
    "effrontery",
    "boldness",
    "organisation",
    "plaque",
    "administration",
    "establishment",
    "memorial tablet",
    "brass"
  ],
  [
    "septentrion",
    "northerly",
    "northwest",
    "northernmost",
    "northwestern",
    "magnetic north",
    "northeasterly",
    "northeastern",
    "northwesterly",
    "northbound",
    "northwards",
    "northeastward",
    "northwestward",
    "northmost",
    "compass north",
    "north-central",
    "due north",
    "in the north",
    "to the north",
    "n",
    "northeast",
    "northern",
    "northland",
    "northward",
    "union",
    "north"
  ],
  [
    "danaus plexippus",
    "monarch butterfly",
    "milkweed butterfly",
    "crowned head",
    "sovereign",
    "monarch"
  ],
  [
    "trip the light fantastic",
    "dancing",
    "terpsichore",
    "dance"
  ],
  [
    "jape",
    "antic",
    "wheeze",
    "gag",
    "caper",
    "jest",
    "laugh",
    "trick",
    "jocularity",
    "prank",
    "yak",
    "joke"
  ],
  [
    "position",
    "face",
    "root",
    "incline",
    "bye",
    "by",
    "go with",
    "side of meat",
    "english",
    "slope",
    "side"
  ],
  [
    "thin",
    "distributed",
    "sparse"
  ],
  [
    "lush",
    "rich",
    "prodigal",
    "plush",
    "generous",
    "munificent",
    "shower",
    "unsparing",
    "plushy",
    "unstinting",
    "unstinted",
    "overgenerous",
    "too-generous",
    "lucullan",
    "lavish"
  ],
  [
    "benevolent",
    "ample",
    "lavish",
    "kind",
    "magnanimous",
    "large",
    "prodigal",
    "big",
    "handsome",
    "bountiful",
    "munificent",
    "bounteous",
    "giving",
    "openhanded",
    "unsparing",
    "freehearted",
    "unselfish",
    "unstinting",
    "bighearted",
    "freehanded",
    "ungrudging",
    "unstinted",
    "overgenerous",
    "too-generous",
    "liberal",
    "generous"
  ],
  [
    "engagement",
    "espousal",
    "troth",
    "betrothal"
  ],
  [
    "conflict",
    "battle",
    "fight",
    "date",
    "participation",
    "involvement",
    "mesh",
    "employment",
    "appointment",
    "betrothal",
    "meshing",
    "booking",
    "hiring",
    "interlocking",
    "hire",
    "troth",
    "engagement"
  ],
  [
    "long",
    "lasting",
    "imperishable",
    "perdurable",
    "long-lasting",
    "serviceable",
    "long-lived",
    "indestructible",
    "long-wearing",
    "undistroyable",
    "durable"
  ],
  [
    "set",
    "check",
    "score",
    "denounce",
    "cross",
    "brand",
    "stigma",
    "fool",
    "scrape",
    "note",
    "sucker",
    "distinguish",
    "sign",
    "label",
    "scratch",
    "punctuate",
    "differentiate",
    "commemorate",
    "tag",
    "notice",
    "stain",
    "chump",
    "nock",
    "patsy",
    "gull",
    "grade",
    "crisscross",
    "soft touch",
    "shlemiel",
    "marker",
    "mug",
    "fall guy",
    "schlemiel",
    "scar",
    "pock",
    "stigmatize",
    "tick off",
    "bell ringer",
    "strike out",
    "check off",
    "mark off",
    "marking",
    "cross out",
    "strike off",
    "cross off",
    "gospel according to mark",
    "deutsche mark",
    "deutschmark",
    "fish",
    "pit",
    "target",
    "mark"
  ],
  [
    "order",
    "mark",
    "range",
    "form",
    "level",
    "score",
    "rank",
    "improved",
    "class",
    "rate",
    "tier",
    "grad",
    "ground level",
    "ground-level",
    "degree",
    "place",
    "surface",
    "grade"
  ],
  [
    "cupola"
  ],
  [
    "domed stadium",
    "covered stadium",
    "dome"
  ],
  [
    "potency",
    "magnate",
    "office",
    "index",
    "mogul",
    "baron",
    "ability",
    "might",
    "exponent",
    "king",
    "superpower",
    "world power",
    "mightiness",
    "great power",
    "top executive",
    "powerfulness",
    "power-assisted",
    "major power",
    "big businessman",
    "business leader",
    "force",
    "tycoon",
    "power"
  ],
  [
    "sanction",
    "dominance",
    "agency",
    "confidence",
    "assurance",
    "office",
    "self-assurance",
    "authorization",
    "sureness",
    "say-so",
    "self-confidence",
    "government agency",
    "bureau",
    "authority"
  ],
  [
    "vehemence",
    "ferocity",
    "furiousness",
    "wildness",
    "fierceness",
    "force",
    "fury",
    "violence"
  ],
  [
    "temper",
    "modality",
    "mode",
    "climate",
    "humour",
    "humor",
    "mood"
  ],
  [
    "strain",
    "line",
    "air",
    "tune",
    "melodic line",
    "melodic phrase",
    "tonal pattern",
    "melody"
  ],
  [
    "short",
    "presently",
    "curtly",
    "soon",
    "concisely",
    "briefly",
    "in short",
    "before long",
    "in brief",
    "not long",
    "not far",
    "shortly"
  ],
  [
    "chapeau",
    "hat",
    "eyelid",
    "lid"
  ],
  [
    "papers",
    "text file",
    "written document",
    "document"
  ],
  [
    "severally",
    "singly",
    "individually",
    "one by one",
    "on an individual basis",
    "separately"
  ],
  [
    "use",
    "wont",
    "substance abuse",
    "drug abuse",
    "habit"
  ],
  [
    "subsequently",
    "last",
    "ulterior",
    "after",
    "future",
    "afterwards",
    "late",
    "latter",
    "by and by",
    "afterward",
    "later on",
    "later"
  ],
  [
    "hand",
    "script",
    "handwriting"
  ],
  [
    "big",
    "older",
    "elderberry bush",
    "senior",
    "elder"
  ],
  [
    "drawn",
    "tight",
    "enclosed",
    "restricted",
    "unsympathetic",
    "blind",
    "inactive",
    "shut",
    "compressed",
    "blocked",
    "shuttered",
    "folded",
    "squinting",
    "squinched",
    "winking",
    "unreceptive",
    "blinking",
    "stoppered",
    "closed in",
    "unopen",
    "closed"
  ],
  [
    "lump",
    "injured",
    "intumescence",
    "puffiness",
    "intumescency",
    "swelling"
  ],
  [
    "cheek",
    "buttock"
  ],
  [
    "costly",
    "overpriced",
    "pricy",
    "high-priced",
    "dearly-won",
    "pricey",
    "expensive"
  ],
  [
    "supplementary",
    "further",
    "extra",
    "other",
    "supplemental",
    "another",
    "added",
    "else",
    "more",
    "additional"
  ],
  [
    "style",
    "mode",
    "way",
    "fashion",
    "personal manner",
    "manner"
  ],
  [
    "wise",
    "method"
  ],
  [
    "wistful",
    "melancholy",
    "pensive",
    "yearning",
    "melancholic",
    "doleful",
    "wretched",
    "deplorable",
    "sorrowful",
    "gloomy",
    "pitiful",
    "lamentable",
    "sorry",
    "bad",
    "mournful",
    "bittersweet",
    "miserable",
    "lovesick",
    "suffering",
    "heavyhearted",
    "nostalgic",
    "tragic",
    "distressing",
    "unhappy",
    "depressing",
    "tragicomical",
    "tragical",
    "saddening",
    "depressive",
    "homesick",
    "tragicomic",
    "sadden",
    "sad"
  ],
  [
    "enigmatic",
    "obscure",
    "inscrutable",
    "cryptic",
    "opaque",
    "dark",
    "inexplicable",
    "deep",
    "lost",
    "mystifying",
    "mysterious",
    "indecipherable",
    "unintelligible",
    "paradoxical",
    "puzzling",
    "impenetrable",
    "cryptical",
    "enigmatical",
    "unaccountable",
    "uncomprehensible",
    "unexplainable",
    "unexplained",
    "missed",
    "self-contradictory",
    "incomprehensible"
  ],
  [
    "pleased",
    "cheerful",
    "happy",
    "grateful",
    "lief",
    "beaming",
    "willing",
    "gladsome",
    "thankful",
    "glad"
  ],
  [
    "crest",
    "lead",
    "point",
    "lean",
    "tilt",
    "crown",
    "peak",
    "top",
    "steer",
    "hint",
    "wind",
    "bung",
    "angle",
    "gratuity",
    "baksheesh",
    "confidential information",
    "bakshis",
    "backsheesh",
    "bakshish",
    "tippytoe",
    "summit",
    "tiptoe",
    "tip"
  ],
  [
    "eminent",
    "keen",
    "zealous",
    "avid",
    "good",
    "important",
    "cool",
    "extraordinary",
    "heavy",
    "enthusiastic",
    "high",
    "swell",
    "enceinte",
    "distinguished",
    "large",
    "big",
    "outstanding",
    "dandy",
    "capital",
    "major",
    "bully",
    "gravid",
    "nifty",
    "neat",
    "expectant",
    "groovy",
    "of import",
    "corking",
    "majuscule",
    "slap-up",
    "with child",
    "cracking",
    "bang-up",
    "smashing",
    "peachy",
    "not bad",
    "uppercase",
    "eager",
    "great"
  ],
  [
    "understanding",
    "mind",
    "intellectual",
    "reason",
    "intellect"
  ],
  [
    "mordant",
    "grim",
    "bleak",
    "evil",
    "wicked",
    "sinister",
    "dark",
    "dim",
    "dirty",
    "achromatic",
    "hopeless",
    "unfortunate",
    "sarcastic",
    "opprobrious",
    "clad",
    "ignominious",
    "calamitous",
    "inglorious",
    "shameful",
    "soiled",
    "angry",
    "fatal",
    "bootleg",
    "disgraceful",
    "dishonorable",
    "fateful",
    "undiluted",
    "colorful",
    "disastrous",
    "nigrify",
    "blacken",
    "pitch-black",
    "clothed",
    "black-market",
    "dark-skinned",
    "melanize",
    "contraband",
    "illegal",
    "unclean",
    "blackened",
    "pitch-dark",
    "dishonourable",
    "lightlessness",
    "total darkness",
    "smuggled",
    "black person",
    "african-american",
    "afro-american",
    "blackamoor",
    "blackness",
    "colored",
    "coloured",
    "covert",
    "negroid",
    "black"
  ],
  [
    "chromatic",
    "carmine",
    "ruddy",
    "crimson",
    "aflame",
    "violent",
    "cherry",
    "scarlet",
    "bloody",
    "bolshevik",
    "red-faced",
    "ruby",
    "flushed",
    "colorful",
    "blood-red",
    "ruby-red",
    "cherry-red",
    "redness",
    "reddened",
    "cerise",
    "colored",
    "coloured",
    "marxist",
    "pinko",
    "red river",
    "reddish",
    "red"
  ],
  [
    "baleful",
    "atrocious",
    "grotesque",
    "evil",
    "wicked",
    "sinister",
    "minatory",
    "surly",
    "ominous",
    "alarming",
    "minacious",
    "vile",
    "forbidding",
    "menacing",
    "scrofulous",
    "despicable",
    "hideous",
    "repulsive",
    "monstrous",
    "frightful",
    "unsightly",
    "horrible",
    "horrifying",
    "threatening",
    "ill-natured",
    "unnatural",
    "unworthy",
    "disfigured",
    "ill-favored",
    "ill-favoured",
    "unlovely",
    "unpicturesque",
    "inaesthetic",
    "unaesthetic",
    "ugly"
  ],
  [
    "substantial",
    "good",
    "opaque",
    "plain",
    "strong",
    "noble",
    "hearty",
    "hard",
    "sound",
    "concrete",
    "firm",
    "massive",
    "dry",
    "homogeneous",
    "satisfying",
    "unanimous",
    "congealed",
    "upstanding",
    "coagulated",
    "wholesome",
    "unvaried",
    "frozen",
    "solidness",
    "cubic",
    "unbroken",
    "semisolid",
    "undiversified",
    "three-dimensional",
    "jellied",
    "solid-state",
    "self-colored",
    "jelled",
    "unpatterned",
    "self-coloured",
    "unhollowed",
    "honorable",
    "honourable",
    "solidified",
    "worthy",
    "solid"
  ],
  [
    "discourteous",
    "rude",
    "ill-mannered",
    "unmannered",
    "bratty",
    "ungracious",
    "unmannerly",
    "unparliamentary",
    "brattish",
    "impolite"
  ],
  [
    "chromatic",
    "noble",
    "embellished",
    "regal",
    "majestic",
    "rhetorical",
    "violet",
    "royal",
    "purpurate",
    "colorful",
    "purplish",
    "empurple",
    "empurpled",
    "purpleness",
    "over-embellished",
    "colored",
    "coloured",
    "imperial",
    "purple"
  ],
  [
    "mean",
    "trivial",
    "diminutive",
    "soft",
    "fine",
    "short",
    "bantam",
    "slender",
    "insignificant",
    "puny",
    "petty",
    "brief",
    "picayune",
    "infinitesimal",
    "miserly",
    "tight",
    "immature",
    "small",
    "minor",
    "minute",
    "minuscule",
    "elfin",
    "narrow",
    "stingy",
    "piddling",
    "piffling",
    "runty",
    "bittie",
    "ungenerous",
    "midget",
    "niggling",
    "mingy",
    "miniature",
    "dinky",
    "fiddling",
    "unimportant",
    "miniscule",
    "narrow-minded",
    "footling",
    "micro",
    "young",
    "weeny",
    "elflike",
    "teeny",
    "bitty",
    "teensy",
    "wee",
    "dwarfish",
    "microscopic",
    "lesser",
    "small-minded",
    "smaller",
    "undersize",
    "gnomish",
    "peanut",
    "undersized",
    "lowercase",
    "small-scale",
    "shrimpy",
    "teensy-weensy",
    "least",
    "smallish",
    "younger",
    "littlest",
    "smallest",
    "weensy",
    "half-size",
    "teentsy",
    "dwarf",
    "lilliputian",
    "littler",
    "petite",
    "slim",
    "tiny",
    "little"
  ],
  [
    "brunette",
    "bronzed",
    "tanned",
    "browned",
    "brunet",
    "suntanned"
  ],
  [
    "warfare",
    "state of war",
    "war"
  ],
  [
    "leprosy"
  ],
  [
    "dispute",
    "wrangle",
    "row",
    "argufy",
    "altercate",
    "dustup",
    "words",
    "run-in",
    "quarrel"
  ],
  [
    "mend",
    "repair",
    "restore",
    "sophisticate",
    "fix",
    "bushel",
    "doc",
    "touch on",
    "medico",
    "physician",
    "adulterate",
    "furbish up",
    "doctor up",
    "doctor of the church",
    "md",
    "doctor"
  ],
  [
    "doctor",
    "doc",
    "medico",
    "md",
    "physician"
  ],
  [
    "yesterday"
  ],
  [
    "heartache",
    "heartbreak",
    "brokenheartedness",
    "sorrow",
    "grief"
  ],
  [
    "grief",
    "regret",
    "ruefulness",
    "sadness",
    "sorrowfulness",
    "grieve",
    "sorrow"
  ],
  [
    "calendar month",
    "month"
  ],
  [
    "scruples",
    "moral sense",
    "sense of right and wrong",
    "conscience"
  ],
  [
    "conscience",
    "moral sense",
    "sense of right and wrong",
    "scruples"
  ],
  [
    "exclusive",
    "wrong",
    "privileged",
    "within",
    "endo",
    "internal",
    "inner",
    "inwardly",
    "indoors",
    "indoor",
    "ento",
    "at heart",
    "deep down",
    "at bottom",
    "in spite of appearance",
    "interior",
    "inside"
  ],
  [
    "pyrexia",
    "febricity",
    "feverishness",
    "fever"
  ],
  [
    "torrid",
    "fervid",
    "ardent",
    "fervent",
    "wild",
    "aroused",
    "lustful",
    "ablaze",
    "fanatical",
    "perfervid",
    "choleric",
    "fiery",
    "lusty",
    "rabid",
    "aflame",
    "impassioned",
    "fanatic",
    "overzealous",
    "demon-ridden",
    "passionate"
  ],
  [
    "avid",
    "great",
    "enthusiastic",
    "eager",
    "zealous"
  ],
  [
    "austere",
    "grievous",
    "critical",
    "stark",
    "intense",
    "wicked",
    "plain",
    "strong",
    "serious",
    "hard",
    "bad",
    "dangerous",
    "terrible",
    "strict",
    "knockout",
    "nonindulgent",
    "grave",
    "spartan",
    "severe"
  ],
  [
    "vulgar",
    "common",
    "lowborn",
    "unwashed",
    "pleb",
    "plebeian"
  ],
  [
    "doorjamb",
    "doorpost"
  ],
  [
    "attribute",
    "prop",
    "dimension",
    "holding",
    "belongings",
    "material possession",
    "place",
    "property"
  ],
  [
    "possessions"
  ],
  [
    "base",
    "foundation",
    "cornerstone",
    "ground",
    "fundament",
    "groundwork",
    "footing",
    "basis"
  ],
  [
    "keen",
    "critical",
    "sharp",
    "intense",
    "perceptive",
    "incisive",
    "acuate",
    "pointed",
    "ague",
    "piercing",
    "penetrating",
    "discriminating",
    "penetrative",
    "knifelike",
    "subacute",
    "acute accent",
    "acute"
  ],
  [
    "affinity",
    "relationship",
    "family relationship",
    "kinship"
  ],
  [
    "riverbed"
  ],
  [
    "dejected",
    "modest",
    "soft",
    "abject",
    "blue",
    "downcast",
    "dispirited",
    "deficient",
    "deep",
    "inferior",
    "contemptible",
    "miserable",
    "unrefined",
    "forward",
    "humble",
    "lowly",
    "small",
    "insufficient",
    "humiliated",
    "down",
    "nether",
    "debased",
    "poor",
    "degraded",
    "baritone",
    "downhearted",
    "throaty",
    "broken",
    "first",
    "ebb",
    "humbled",
    "bass",
    "depleted",
    "reduced",
    "crushed",
    "receding",
    "squat",
    "under",
    "depressed",
    "scummy",
    "moo",
    "low-pitched",
    "low-down",
    "low-level",
    "scurvy",
    "devalued",
    "contrabass",
    "contralto",
    "low-spirited",
    "low-lying",
    "underslung",
    "low pressure",
    "low gear",
    "first gear",
    "rock-bottom",
    "double-bass",
    "low-toned",
    "alto",
    "depression",
    "low"
  ],
  [
    "cumbersome",
    "inept",
    "incompetent",
    "infelicitous",
    "gawky",
    "unwieldy",
    "awkward",
    "ungainly",
    "inapt",
    "unskilled",
    "bunglesome",
    "bungling",
    "clunky",
    "unmanageable",
    "fumbling",
    "ill-chosen",
    "clumsy"
  ],
  [
    "forthwith",
    "immediately",
    "instantly",
    "at once",
    "straightaway",
    "directly",
    "nowadays",
    "at present",
    "today",
    "right away",
    "in real time",
    "now"
  ],
  [
    "easternmost",
    "eastward",
    "eastbound",
    "eastmost",
    "due east",
    "e",
    "easterly",
    "eastern",
    "eastside",
    "orient",
    "east"
  ],
  [
    "brass",
    "face",
    "impertinence",
    "impudence",
    "nerve",
    "effrontery",
    "boldness",
    "buccal",
    "buttock",
    "cheek"
  ],
  [
    "pigpen",
    "pigsty",
    "stye",
    "hordeolum",
    "eye infection",
    "sty"
  ],
  [
    "chrysalis"
  ],
  [
    "notion",
    "impulse",
    "whimsy",
    "vagary",
    "whimsey",
    "caprice",
    "whim"
  ],
  [
    "natural",
    "begotten",
    "biologic",
    "biological"
  ],
  [
    "eccentric",
    "subject",
    "slip",
    "character",
    "showcase",
    "cause",
    "shell",
    "instance",
    "event",
    "type",
    "suit",
    "sheath",
    "example",
    "causa",
    "display case",
    "encase",
    "casing",
    "lawsuit",
    "caseful",
    "pillowcase",
    "pillow slip",
    "grammatical case",
    "guinea pig",
    "case"
  ],
  [
    "port",
    "odd",
    "remaining",
    "leftfield",
    "leftover",
    "larboard",
    "left over",
    "leftist",
    "unexpended",
    "left hand",
    "left wing",
    "left-hand",
    "left-wing",
    "leftish",
    "far left",
    "left-of-center",
    "liberal",
    "left"
  ],
  [
    "pushbutton"
  ],
  [
    "see",
    "engagement",
    "escort",
    "appointment",
    "go out",
    "go steady",
    "date stamp",
    "day of the month",
    "date"
  ],
  [
    "w",
    "westernmost",
    "westbound",
    "westmost",
    "westside",
    "due west",
    "occident",
    "westerly",
    "western",
    "westward",
    "west"
  ],
  [
    "dwell",
    "hoi polloi",
    "mass",
    "multitude",
    "live",
    "inhabit",
    "shack",
    "citizenry",
    "populate",
    "masses",
    "reside",
    "people"
  ],
  [
    "state",
    "land",
    "res publica",
    "country",
    "nationality",
    "body politic",
    "a people",
    "commonwealth",
    "nation"
  ],
  [
    "conflict",
    "struggle",
    "engagement",
    "fight",
    "combat",
    "battle"
  ],
  [
    "line up",
    "waiting line",
    "queue up",
    "queue"
  ],
  [
    "cable",
    "electrify",
    "conducting wire",
    "telegraph",
    "telegram",
    "wire"
  ],
  [
    "ardent",
    "tender",
    "cordial",
    "tepid",
    "close",
    "enthusiastic",
    "affectionate",
    "strong",
    "hearty",
    "hot",
    "fond",
    "fresh",
    "caring",
    "loving",
    "near",
    "uncomfortable",
    "lovesome",
    "lukewarm",
    "quick",
    "excitable",
    "warm up",
    "warmed",
    "warming",
    "lively",
    "warm"
  ],
  [
    "pigeon"
  ],
  [
    "saddle",
    "gable roof",
    "saddle roof",
    "saddleback roof",
    "saddleback"
  ],
  [
    "ament",
    "catkin"
  ],
  [
    "honeycomb"
  ],
  [
    "confined",
    "unfree",
    "prisoner",
    "imprisoned",
    "jailed",
    "captive"
  ],
  [
    "complection",
    "skin colour",
    "skin color",
    "skin condition",
    "complexion"
  ],
  [
    "molal",
    "grinder",
    "molar"
  ],
  [
    "state",
    "area",
    "land",
    "res publica",
    "nation",
    "nationality",
    "body politic",
    "rural area",
    "country-bred",
    "country-style",
    "a people",
    "commonwealth",
    "folk",
    "hillbilly",
    "western",
    "country"
  ],
  [
    "pewit",
    "peewit",
    "green plover",
    "lapwing"
  ],
  [
    "naive",
    "naif",
    "nescient",
    "unconscious",
    "innocent",
    "inexperienced",
    "unwitting",
    "illiterate",
    "unknowledgeable",
    "uninformed",
    "unknowing",
    "uneducated",
    "unversed",
    "unenlightened",
    "unlearned",
    "unlettered",
    "ignorant"
  ],
  [
    "substance",
    "sensation",
    "gumption",
    "feel",
    "sentience",
    "connotation",
    "horse sense",
    "good sense",
    "meaning",
    "intension",
    "sentiency",
    "common sense",
    "mother wit",
    "sensory faculty",
    "sense"
  ],
  [
    "percept",
    "perceptual experience",
    "perceiving",
    "sensing",
    "perception"
  ],
  [
    "wench",
    "dame",
    "skirt",
    "dolly",
    "chick",
    "bird",
    "doll"
  ],
  [
    "obligation",
    "responsibility",
    "tariff",
    "duty"
  ],
  [
    "obligation",
    "duty",
    "responsibleness",
    "province",
    "responsibility"
  ],
  [
    "peculiar",
    "uneasy",
    "grotesque",
    "eerie",
    "quaint",
    "unusual",
    "antic",
    "curious",
    "foreign",
    "queer",
    "weird",
    "exotic",
    "singular",
    "freaky",
    "fantastic",
    "fantastical",
    "unknown",
    "rummy",
    "crazy",
    "other",
    "funny",
    "unfamiliar",
    "eery",
    "odd",
    "rum",
    "gothic",
    "alien",
    "strange"
  ],
  [
    "spirit",
    "look",
    "feeling",
    "tone",
    "feel",
    "aroma",
    "scent",
    "odor",
    "flavor",
    "olfaction",
    "odour",
    "olfactory sensation",
    "smelling",
    "sense of smell",
    "olfactory property",
    "olfactory modality",
    "olfactory perception",
    "smell"
  ],
  [
    "splenic fever",
    "anthrax"
  ],
  [
    "ignominy",
    "demean",
    "attaint",
    "shame",
    "degrade",
    "discredit",
    "dishonor",
    "put down",
    "dishonour",
    "disgrace"
  ],
  [
    "spurge"
  ],
  [
    "soot",
    "lampblack",
    "carbon black",
    "smut fungus",
    "smut"
  ],
  [
    "crude",
    "vernacular",
    "common",
    "coarse",
    "uncouth",
    "plebeian",
    "unrefined",
    "gross",
    "informal",
    "indecent",
    "earthy",
    "lowborn",
    "unwashed",
    "vulgar"
  ],
  [
    "jellyfish",
    "medusan",
    "medusa"
  ],
  [
    "full",
    "smooth",
    "total",
    "intact",
    "whole",
    "uncastrated",
    "integral",
    "stallion",
    "entire"
  ],
  [
    "apathetic",
    "inert",
    "moderate",
    "ordinary",
    "fair",
    "inferior",
    "unconcerned",
    "immaterial",
    "impartial",
    "neutral",
    "uninterested",
    "unimportant",
    "passable",
    "unreactive",
    "unbiased",
    "tolerable",
    "so-so",
    "unbiassed",
    "deaf",
    "indifferent"
  ],
  [
    "refuse",
    "scraps",
    "food waste",
    "garbage"
  ],
  [
    "disease"
  ],
  [
    "orthopteron",
    "orthopterous insect",
    "orthopteran"
  ],
  [
    "polliwog",
    "pollywog",
    "tadpole"
  ],
  [
    "roach",
    "cockroach"
  ],
  [
    "piece",
    "act",
    "morsel",
    "spot",
    "minute",
    "turn",
    "bite",
    "routine",
    "flake",
    "injured",
    "chip",
    "second",
    "stung",
    "number",
    "bitten",
    "fleck",
    "moment",
    "scrap",
    "bit"
  ],
  [
    "stupid",
    "lumpish",
    "unthinking",
    "lumpen"
  ],
  [
    "wing",
    "flank"
  ],
  [
    "striver",
    "hard worker",
    "buckle down",
    "knuckle down",
    "slave"
  ],
  [
    "vesture",
    "apparel",
    "wear",
    "clothing",
    "wearing apparel",
    "clothes"
  ],
  [
    "grub",
    "black-footed ferret",
    "mustela nigripes",
    "ferret"
  ],
  [
    "daw",
    "corvus monedula",
    "jackdaw"
  ],
  [
    "resentment",
    "fret",
    "chafe",
    "rancor",
    "impertinence",
    "insolence",
    "bitterness",
    "impudence",
    "crust",
    "freshness",
    "saddle sore",
    "cheekiness",
    "irk",
    "rancour",
    "gall"
  ],
  [
    "quicksilver",
    "atomic number 80",
    "hg",
    "mercury"
  ],
  [
    "pliant",
    "versatile",
    "pliable",
    "elastic",
    "adaptable",
    "limber",
    "conciliatory",
    "compromising",
    "flexile",
    "negotiable",
    "stretched",
    "double-jointed",
    "bendable",
    "supple",
    "yielding",
    "flexible"
  ],
  [
    "grave",
    "tomb"
  ],
  [
    "diarrhoea",
    "looseness of the bowels",
    "diarrhea"
  ],
  [
    "sickness",
    "nausea"
  ],
  [
    "plume",
    "square",
    "plumage",
    "fledge",
    "feathering",
    "feather"
  ],
  [
    "pellucid",
    "clear",
    "gossamer",
    "diaphanous",
    "obvious",
    "guileless",
    "limpid",
    "vaporous",
    "thin",
    "crystalline",
    "gauzy",
    "straight",
    "crystal clear",
    "filmy",
    "see-through",
    "cobwebby",
    "lucid",
    "sheer",
    "transparent"
  ],
  [
    "contingent",
    "feasible",
    "latent",
    "viable",
    "potential",
    "practicable",
    "mathematical",
    "workable",
    "achievable",
    "conceivable",
    "attainable",
    "accomplishable",
    "attemptable",
    "doable",
    "allegeable",
    "come-at-able",
    "imaginable",
    "thinkable",
    "realizable",
    "gettable",
    "affirmable",
    "getable",
    "researchable",
    "assertable",
    "possible"
  ],
  [
    "chinch",
    "bed bug",
    "cimex lectularius",
    "bedbug"
  ],
  [
    "guilt trip",
    "guilty conscience",
    "guiltiness",
    "guilt feelings",
    "guilt"
  ],
  [
    "culpable",
    "condemned",
    "delinquent",
    "guilt-ridden",
    "criminal",
    "shamefaced",
    "convicted",
    "hangdog",
    "blameworthy",
    "indictable",
    "censurable",
    "shamed",
    "blameful",
    "chargeable",
    "blamable",
    "bloodguilty",
    "blameable",
    "finable",
    "at fault",
    "fineable",
    "punishable",
    "conscience-smitten",
    "guilty"
  ],
  [
    "feeble",
    "weak",
    "crippled",
    "spavined",
    "unfit",
    "cripple",
    "halting",
    "halt",
    "lame"
  ],
  [
    "shift",
    "clear",
    "discharge",
    "dismiss",
    "release",
    "terminate",
    "liberation",
    "chemise",
    "fire",
    "plunder",
    "net",
    "poke",
    "dismissal",
    "pouch",
    "pocket",
    "hammock",
    "carrier bag",
    "firing",
    "sacking",
    "sackful",
    "force out",
    "paper bag",
    "give notice",
    "sack up",
    "give the axe",
    "sacque",
    "send away",
    "can",
    "sac",
    "sack"
  ],
  [
    "bowels"
  ],
  [
    "droppings",
    "muck",
    "dung"
  ],
  [
    "whatever",
    "whatsoever",
    "any"
  ],
  [
    "tabby",
    "queen regnant",
    "female monarch",
    "queen"
  ],
  [
    "hustler",
    "hooker",
    "floozy",
    "floozie",
    "slovenly woman",
    "streetwalker",
    "street girl",
    "slattern"
  ],
  [
    "gourmand",
    "wolverine",
    "gulo gulo",
    "trencherman",
    "glutton"
  ],
  [
    "outrage",
    "dirt",
    "malicious gossip",
    "scandal"
  ],
  [
    "fearful",
    "cowardly",
    "coward"
  ],
  [
    "wild",
    "fierce",
    "ferocious",
    "tempestuous",
    "enraged",
    "violent",
    "angry",
    "maddened",
    "raging",
    "infuriated",
    "angered",
    "savage",
    "stormy",
    "furious"
  ],
  [
    "feather",
    "feathering"
  ],
  [
    "pelt",
    "fur"
  ],
  [
    "quintet",
    "louver",
    "pentad",
    "fivesome",
    "five",
    "quintuplet",
    "cinque",
    "v",
    "louvre",
    "break water",
    "little phoebe",
    "fins",
    "tail fin",
    "flippers",
    "tailfin",
    "5",
    "flipper",
    "phoebe",
    "quint",
    "fin"
  ],
  [
    "stapes",
    "stirrup iron",
    "stirrup"
  ],
  [
    "dissonance",
    "resound",
    "racket",
    "disturbance",
    "interference",
    "make noise",
    "noise"
  ],
  [
    "ribwort",
    "ribgrass",
    "english plantain",
    "plantago lanceolata",
    "narrow-leaved plantain",
    "ripple-grass",
    "buckthorn"
  ],
  [
    "nettlerash"
  ],
  [
    "loxia curvirostra",
    "crossbill"
  ],
  [
    "variola",
    "smallpox"
  ],
  [
    "catmint",
    "nepeta cataria",
    "catnip"
  ],
  [
    "windflower",
    "anemone"
  ],
  [
    "malevolent",
    "malicious",
    "vicious",
    "venomous",
    "toxic",
    "toxicant",
    "inedible",
    "uneatable",
    "poisonous"
  ],
  [
    "base",
    "chagrin",
    "modest",
    "mild",
    "inferior",
    "low",
    "lowly",
    "small",
    "humiliated",
    "menial",
    "mortify",
    "broken",
    "humbled",
    "abase",
    "unskilled",
    "crushed",
    "humiliate",
    "baseborn",
    "lowborn",
    "meek",
    "humble"
  ],
  [
    "lament",
    "exquisite",
    "sharp",
    "intense",
    "good",
    "perceptive",
    "incisive",
    "acute",
    "cool",
    "great",
    "intelligent",
    "swell",
    "dandy",
    "bully",
    "nifty",
    "neat",
    "piercing",
    "stabbing",
    "cutting",
    "penetrating",
    "discriminating",
    "groovy",
    "penetrative",
    "knifelike",
    "corking",
    "slap-up",
    "cracking",
    "bang-up",
    "smashing",
    "peachy",
    "not bad",
    "keen"
  ],
  [
    "penalty",
    "penalization",
    "punishment"
  ],
  [
    "sufferer",
    "martyrize",
    "martyr"
  ],
  [
    "piquant",
    "stimulating",
    "tasteful",
    "salt",
    "saline",
    "salty"
  ],
  [
    "daybook",
    "diary",
    "journal"
  ],
  [
    "clip",
    "mag",
    "cartridge clip",
    "powder magazine",
    "cartridge holder",
    "magazine publisher",
    "powder store",
    "cartridge",
    "magazine"
  ],
  [
    "rhino",
    "rhinoceros"
  ],
  [
    "assist",
    "assistance",
    "tending",
    "attention",
    "helping",
    "care",
    "help",
    "aid"
  ],
  [
    "austere",
    "stark",
    "manifest",
    "modest",
    "severe",
    "direct",
    "evident",
    "apparent",
    "obvious",
    "evidently",
    "field",
    "pure",
    "general",
    "simple",
    "unpretentious",
    "kvetch",
    "chaste",
    "homely",
    "obviously",
    "solid",
    "patently",
    "quetch",
    "trim",
    "apparently",
    "patent",
    "manifestly",
    "dry",
    "kick",
    "plainly",
    "tailored",
    "complain",
    "popular",
    "unvarnished",
    "unadorned",
    "literal",
    "sound off",
    "unattractive",
    "unembellished",
    "knit",
    "unelaborate",
    "unornamented",
    "unrhetorical",
    "inelaborate",
    "pure and simple",
    "featureless",
    "unmixed",
    "self-colored",
    "undecorated",
    "unpatterned",
    "unmingled",
    "self-coloured",
    "knit stitch",
    "plain stitch",
    "champaign",
    "sheer",
    "plain"
  ],
  [
    "light",
    "frivolous",
    "giddy",
    "silly",
    "faint",
    "sick",
    "ill",
    "featherbrained",
    "dizzy",
    "empty-headed",
    "airheaded",
    "swooning",
    "lightheaded"
  ],
  [
    "indifferent",
    "light",
    "trivial",
    "superficial",
    "insignificant",
    "petty",
    "picayune",
    "immaterial",
    "inconsequential",
    "little",
    "piddling",
    "potty",
    "piffling",
    "niggling",
    "fiddling",
    "lightweight",
    "colorless",
    "footling",
    "inconsequent",
    "inappreciable",
    "hole-and-corner",
    "nickel-and-dime",
    "small-time",
    "hole-in-corner",
    "lilliputian",
    "unimportant"
  ],
  [
    "disregard",
    "tenuous",
    "lean",
    "neglect",
    "slender",
    "weak",
    "flimsy",
    "thin",
    "ignore",
    "rebuff",
    "cold-shoulder",
    "slim",
    "slight"
  ],
  [
    "grim",
    "chromatic",
    "dejected",
    "dismal",
    "sexy",
    "profane",
    "gloomy",
    "dark",
    "noble",
    "downcast",
    "dispirited",
    "dirty",
    "disconsolate",
    "low",
    "racy",
    "naughty",
    "down",
    "dispiriting",
    "spicy",
    "downhearted",
    "gamy",
    "blue-blooded",
    "puritan",
    "depressing",
    "gamey",
    "risque",
    "aristocratic",
    "blue angel",
    "aristocratical",
    "juicy",
    "blasphemous",
    "colorful",
    "depressed",
    "amytal",
    "cheerless",
    "blue sky",
    "uncheerful",
    "bluing",
    "blueness",
    "low-spirited",
    "blueish",
    "amobarbital sodium",
    "blueing",
    "blue air",
    "wild blue yonder",
    "dark-blue",
    "light-blue",
    "bluish",
    "colored",
    "coloured",
    "gentle",
    "northern",
    "patrician",
    "puritanic",
    "puritanical",
    "blue"
  ],
  [
    "vas",
    "watercraft",
    "vessel"
  ],
  [
    "close",
    "terminate",
    "oddment",
    "death",
    "conclusion",
    "cease",
    "goal",
    "last",
    "remnant",
    "destruction",
    "finish",
    "closing",
    "remainder",
    "ending",
    "scrap",
    "end"
  ],
  [
    "holler",
    "grouse",
    "squawk",
    "kick",
    "beef",
    "bellyache",
    "gripe"
  ],
  [
    "blimp",
    "sausage balloon",
    "sausage"
  ],
  [
    "ard"
  ],
  [
    "ascertain",
    "observe",
    "sentry",
    "see",
    "view",
    "check",
    "determine",
    "scout",
    "picket",
    "follow",
    "take in",
    "catch",
    "find out",
    "lookout",
    "ticker",
    "watch over",
    "look out",
    "keep an eye on",
    "lookout man",
    "watch out",
    "look on",
    "learn",
    "sentinel",
    "vigil",
    "watch"
  ],
  [
    "time",
    "clock"
  ],
  [
    "hepatitis"
  ],
  [
    "avail",
    "serve",
    "overhaul",
    "serving",
    "servicing",
    "military service",
    "overhauling",
    "divine service",
    "service of process",
    "religious service",
    "armed service",
    "inspection and repair",
    "help",
    "table service",
    "service"
  ],
  [
    "significant",
    "significance",
    "sense",
    "substance",
    "pregnant",
    "import",
    "signification",
    "meaning"
  ],
  [
    "light",
    "superficial",
    "shoal",
    "wakeful",
    "knee-deep",
    "skin-deep",
    "fordable",
    "shelvy",
    "shoaly",
    "shelfy",
    "reefy",
    "ankle-deep",
    "shallow"
  ],
  [
    "head",
    "drift",
    "bearing",
    "gallery",
    "aim",
    "heading"
  ],
  [
    "claim",
    "deed",
    "entitle",
    "statute title",
    "deed of conveyance",
    "championship",
    "title"
  ],
  [
    "juncture",
    "hamlet",
    "critical point",
    "crossroads"
  ],
  [
    "demeanor",
    "conduct",
    "deportment",
    "demeanour",
    "behavior",
    "behaviour"
  ],
  [
    "spermatozoon",
    "sperm cell",
    "sperm"
  ],
  [
    "space",
    "aloofness",
    "outstrip",
    "outdistance",
    "length",
    "distance"
  ],
  [
    "bare",
    "meager",
    "meagre",
    "spare",
    "meagerly",
    "panty",
    "pantie",
    "step-in",
    "scanty"
  ],
  [
    "deficient",
    "just",
    "tight",
    "scarcely",
    "insufficient",
    "rare",
    "hardly",
    "barely",
    "scarce"
  ],
  [
    "chromatic",
    "corrode",
    "rusty",
    "eat",
    "rust fungus",
    "rusting",
    "colored",
    "rust"
  ],
  [
    "spades"
  ],
  [
    "clubs"
  ],
  [
    "dull",
    "hoary",
    "achromatic",
    "old",
    "leaden",
    "intermediate",
    "cloudy",
    "colorless",
    "white-haired",
    "grayish",
    "greyish",
    "gray-headed",
    "grayness",
    "greyness",
    "gray-haired",
    "grey-haired",
    "grey-headed",
    "gray",
    "hoar",
    "southern",
    "grey"
  ],
  [
    "pied",
    "colorful",
    "varicolored",
    "painted",
    "multicolor",
    "particoloured",
    "multicolored",
    "multicoloured",
    "particolored",
    "varicoloured",
    "colored",
    "coloured",
    "culticolour",
    "motley",
    "piebald"
  ],
  [
    "engage",
    "operate",
    "whorl",
    "curl",
    "lock in",
    "mesh",
    "interlace",
    "put away",
    "interlock",
    "ringlet",
    "lock away",
    "lock up",
    "shut up",
    "shut away",
    "lock chamber",
    "ignition lock",
    "lock"
  ],
  [
    "charger"
  ],
  [
    "fullstop"
  ],
  [
    "adept",
    "crack",
    "maven",
    "virtuoso",
    "sensation",
    "genius",
    "wizard",
    "one",
    "single",
    "whiz",
    "first-rate",
    "whizz",
    "star",
    "wiz",
    "hotshot",
    "topnotch",
    "super",
    "i",
    "tops",
    "tiptop",
    "sail through",
    "breeze through",
    "a-one",
    "1",
    "pass with flying colors",
    "sweep through",
    "pass easily",
    "superior",
    "unity",
    "ace"
  ],
  [
    "raise",
    "prove",
    "leavening",
    "leaven"
  ],
  [
    "accessory",
    "accessary",
    "accomplice"
  ],
  [
    "shank",
    "carom",
    "cannon"
  ],
  [
    "eccentric",
    "case",
    "persona",
    "quality",
    "part",
    "reference",
    "lineament",
    "type",
    "role",
    "grapheme",
    "fibre",
    "fiber",
    "theatrical role",
    "character reference",
    "fictional character",
    "graphic symbol",
    "fictitious character",
    "character"
  ],
  [
    "best",
    "scoop",
    "ruff",
    "outflank",
    "outdo",
    "trump card",
    "trump out",
    "trump"
  ],
  [
    "apprehension",
    "apprehend",
    "arrest",
    "pinch",
    "catch",
    "nail",
    "neckband",
    "choker",
    "dog collar",
    "nab",
    "cop",
    "pick up",
    "taking into custody",
    "collar"
  ],
  [
    "nephew"
  ],
  [
    "squander",
    "shirk",
    "waste",
    "consume",
    "ware"
  ],
  [
    "commodity",
    "goods"
  ],
  [
    "arrow",
    "cursor",
    "spanish pointer",
    "pointer"
  ],
  [
    "essence",
    "aroma",
    "scent",
    "fragrance",
    "aromatize",
    "perfume"
  ],
  [
    "close",
    "conclusion",
    "end",
    "termination",
    "closing",
    "suffix",
    "ending"
  ],
  [
    "efflorescence",
    "bold",
    "imprudent",
    "foolhardy",
    "eruption",
    "skin rash",
    "reckless",
    "skin eruption",
    "rash"
  ],
  [
    "bang",
    "blast",
    "efflorescence",
    "rash",
    "clap",
    "eructation",
    "blowup",
    "loud noise",
    "volcanic eruption",
    "skin rash",
    "skin eruption",
    "eruption"
  ],
  [
    "bang",
    "ass",
    "love",
    "shag",
    "chicane",
    "hump",
    "make out",
    "know",
    "bonk",
    "chouse",
    "bed",
    "jazz",
    "draw out",
    "gaoler",
    "sleep with",
    "get it on",
    "cheat",
    "jockey",
    "have it off",
    "lie with",
    "turnkey",
    "jailer",
    "do it",
    "prison guard",
    "have intercourse",
    "drive in",
    "screw propeller",
    "have it away",
    "be intimate",
    "have a go at it",
    "shaft",
    "screw"
  ],
  [
    "wraith",
    "specter",
    "trace",
    "touch",
    "spectre",
    "obsess",
    "ghostwriter",
    "ghostwrite",
    "haunt",
    "shade",
    "spook",
    "ghost"
  ],
  [
    "turmoil",
    "commotion",
    "ruckus",
    "uproar",
    "rumpus",
    "garboil",
    "ruction",
    "tumultuousness",
    "din",
    "tumult"
  ],
  [
    "tumult",
    "upheaval",
    "commotion",
    "stir",
    "excitement",
    "agitation",
    "disruption",
    "disturbance",
    "hullabaloo",
    "hurly burly",
    "to-do",
    "turmoil"
  ],
  [
    "defrayment",
    "defrayal",
    "paying",
    "payment"
  ],
  [
    "advance",
    "clear",
    "attain",
    "reach",
    "derive",
    "hit",
    "realize",
    "make",
    "benefit",
    "take in",
    "earn",
    "pull in",
    "put on",
    "addition",
    "win",
    "amplification",
    "bring in",
    "make headway",
    "get ahead",
    "gain ground",
    "arrive at",
    "increase",
    "profit",
    "gain"
  ],
  [
    "notebook"
  ],
  [
    "passionate",
    "fanatical",
    "fanatic",
    "overzealous",
    "rabid"
  ],
  [
    "strongman"
  ],
  [
    "concise",
    "short",
    "little",
    "abbreviated",
    "legal brief",
    "brief"
  ],
  [
    "garlic clove",
    "clove tree",
    "eugenia aromaticum",
    "eugenia caryophyllatum",
    "syzygium aromaticum",
    "clove"
  ],
  [
    "cod",
    "shell",
    "seedpod",
    "seedcase",
    "fuel pod",
    "pod"
  ],
  [
    "spirited",
    "spunky",
    "brave",
    "back",
    "gritty",
    "gage",
    "courageous",
    "punt",
    "stake",
    "gamy",
    "fearless",
    "mettlesome",
    "gamey",
    "biz",
    "bet on",
    "game"
  ],
  [
    "individual",
    "mortal",
    "somebody",
    "someone",
    "soulfulness",
    "human",
    "person",
    "psyche",
    "soul"
  ],
  [
    "already"
  ],
  [
    "feeler",
    "barbel"
  ],
  [
    "bitterling"
  ],
  [
    "imperative",
    "exigent",
    "insistent",
    "minute",
    "clamant",
    "second",
    "crying",
    "jiffy",
    "instantaneous",
    "blink of an eye",
    "twinkling",
    "inst",
    "split second",
    "flash",
    "moment",
    "new york minute",
    "trice",
    "wink",
    "instant"
  ],
  [
    "consequence",
    "bit",
    "minute",
    "instant",
    "import",
    "second",
    "present moment",
    "here and now",
    "moment"
  ],
  [
    "intense",
    "sodden",
    "vivid",
    "wet",
    "pure",
    "concentrated",
    "sopping",
    "soaked",
    "drenched",
    "soppy",
    "soaking",
    "supersaturated",
    "saturated"
  ],
  [
    "bullhead"
  ],
  [
    "talcum",
    "talc"
  ],
  [
    "golden-crested kinglet",
    "regulus regulus",
    "goldcrest"
  ],
  [
    "mellow",
    "besotted",
    "stiff",
    "high",
    "wet",
    "excited",
    "inebriated",
    "plastered",
    "intoxicated",
    "tight",
    "soused",
    "pixilated",
    "rummy",
    "loaded",
    "sloshed",
    "blotto",
    "potty",
    "soaked",
    "orgiastic",
    "pissed",
    "blind",
    "bibulous",
    "doped",
    "carousing",
    "sozzled",
    "smashed",
    "crocked",
    "squiffy",
    "stoned",
    "boozy",
    "sottish",
    "narcotized",
    "tipsy",
    "blind drunk",
    "tiddley",
    "inebriate",
    "tiddly",
    "drunkard",
    "bacchanalian",
    "drugged",
    "fuddled",
    "drunken",
    "slopped",
    "hopped-up",
    "half-seas-over",
    "bacchanal",
    "bacchic",
    "beery",
    "sot",
    "drunk"
  ],
  [
    "depict",
    "fancy",
    "project",
    "show",
    "see",
    "figure",
    "impression",
    "depiction",
    "image",
    "scene",
    "flick",
    "delineation",
    "envision",
    "visualize",
    "characterization",
    "ikon",
    "film",
    "painting",
    "movie",
    "motion picture",
    "moving picture",
    "picture show",
    "video",
    "word picture",
    "mental picture",
    "word-painting",
    "pictorial matter",
    "icon",
    "picture"
  ],
  [
    "pyrus communis",
    "pear tree",
    "pear"
  ],
  [
    "black",
    "hot",
    "dirty",
    "illicit",
    "bootleg",
    "criminal",
    "prohibited",
    "illegitimate",
    "unlawful",
    "felonious",
    "penal",
    "ineligible",
    "ill-gotten",
    "black-market",
    "contraband",
    "extralegal",
    "banned",
    "embezzled",
    "unratified",
    "mislabeled",
    "extrajudicial",
    "smuggled",
    "under-the-counter",
    "misbranded",
    "punishable",
    "outlawed",
    "nonlegal",
    "misappropriated",
    "amerciable",
    "illegal"
  ],
  [
    "brute",
    "sensual",
    "carnal",
    "beast",
    "creature",
    "fleshly",
    "animate being",
    "fishlike",
    "animallike",
    "fauna",
    "animal"
  ],
  [
    "woodlouse"
  ],
  [
    "contusion",
    "contuse",
    "bruise"
  ],
  [
    "dynamic",
    "brisk",
    "hot",
    "open",
    "nimble",
    "energetic",
    "bustling",
    "moving",
    "existent",
    "operational",
    "physical",
    "involved",
    "alive",
    "busy",
    "activist",
    "eruptive",
    "quick",
    "existing",
    "hyperactive",
    "dynamical",
    "activated",
    "overactive",
    "acrobatic",
    "practicing",
    "participating",
    "activistic",
    "fighting",
    "on the move",
    "dancing",
    "gymnastic",
    "surface-active",
    "active voice",
    "combat-ready",
    "active agent",
    "agile",
    "athletic",
    "lively",
    "progressive",
    "spry",
    "active"
  ],
  [
    "intelligent",
    "nimble",
    "active",
    "quick",
    "spry",
    "agile"
  ],
  [
    "turnstone"
  ],
  [
    "fungus"
  ],
  [
    "horsefly"
  ],
  [
    "relation",
    "comparative",
    "relational",
    "proportionate",
    "congener",
    "qualifying",
    "proportional",
    "congenator",
    "relative"
  ],
  [
    "scarf"
  ],
  [
    "kneecap"
  ],
  [
    "felicity",
    "happiness"
  ],
  [
    "chance",
    "portion",
    "lot",
    "circumstances",
    "destiny",
    "fate",
    "fortune",
    "hazard",
    "luck"
  ],
  [
    "bravery",
    "courageousness",
    "courage"
  ],
  [
    "wild",
    "frantic",
    "delirious",
    "excited",
    "sick",
    "sore",
    "unrestrained",
    "foolish",
    "unhinged",
    "demented",
    "disturbed",
    "insane",
    "crazy",
    "angry",
    "brainsick",
    "huffy",
    "harebrained",
    "distracted",
    "unbalanced",
    "mad"
  ],
  [
    "wild",
    "balmy",
    "unstable",
    "deranged",
    "sick",
    "mad",
    "foolish",
    "unhinged",
    "demented",
    "disturbed",
    "loony",
    "maniacal",
    "crazy",
    "wacky",
    "dotty",
    "berserk",
    "kooky",
    "lunatic",
    "fey",
    "barmy",
    "brainsick",
    "raving",
    "cracked",
    "paranoid",
    "moonstruck",
    "amok",
    "batty",
    "bonkers",
    "psychotic",
    "loopy",
    "unsound",
    "amuck",
    "demoniac",
    "crazed",
    "harebrained",
    "demoniacal",
    "distracted",
    "psychopathic",
    "idiotic",
    "crackbrained",
    "loco",
    "fruity",
    "nutty",
    "unbalanced",
    "haywire",
    "schizophrenic",
    "hebephrenic",
    "nuts",
    "buggy",
    "certified",
    "daft",
    "screwy",
    "psychopathological",
    "maniclike",
    "crackers",
    "mentally ill",
    "kookie",
    "raving mad",
    "bats",
    "certifiable",
    "manic-depressive",
    "psychopathologic",
    "half-crazed",
    "screw-loose",
    "insane"
  ],
  [
    "intense",
    "intensifier",
    "intensive"
  ],
  [
    "break",
    "component",
    "persona",
    "function",
    "character",
    "piece",
    "separate",
    "split",
    "office",
    "start",
    "region",
    "section",
    "contribution",
    "portion",
    "depart",
    "division",
    "role",
    "divide",
    "set off",
    "break up",
    "disunite",
    "share",
    "split up",
    "set out",
    "set forth",
    "percentage",
    "partly",
    "partially",
    "take off",
    "start out",
    "theatrical role",
    "component part",
    "voice",
    "part"
  ],
  [
    "dull",
    "obtuse",
    "heavy",
    "dim",
    "thick",
    "compact",
    "stupid",
    "concentrated",
    "slow",
    "dumb",
    "impenetrable",
    "dense"
  ],
  [
    "love",
    "honey",
    "loved",
    "loved one",
    "dearest",
    "darling",
    "dear",
    "beloved"
  ],
  [
    "vacation",
    "holiday"
  ],
  [
    "exhilaration",
    "turmoil",
    "upheaval",
    "agitation",
    "hullabaloo",
    "excitation",
    "excitement"
  ],
  [
    "turmoil",
    "upheaval",
    "excitement",
    "hullabaloo",
    "unrest",
    "ferment",
    "fermentation",
    "agitation"
  ],
  [
    "quality",
    "tone",
    "timber",
    "timbre"
  ],
  [
    "hard",
    "rigorous",
    "vicious",
    "brutal",
    "harsh",
    "heartless",
    "barbarous",
    "roughshod",
    "inhumane",
    "unkind",
    "fell",
    "savage",
    "cruel"
  ],
  [
    "bowstring"
  ],
  [
    "sanction",
    "fine",
    "satisfactory",
    "alright",
    "okay",
    "all right",
    "very well",
    "approve",
    "okey",
    "okeh",
    "all-right",
    "ok"
  ],
  [
    "humorless",
    "unhumorous",
    "unfunny"
  ],
  [
    "marksman",
    "crack shot",
    "sharpshooter"
  ],
  [
    "gills"
  ],
  [
    "diamonds"
  ],
  [
    "instrument",
    "hock",
    "pawning",
    "soak",
    "pawn"
  ],
  [
    "acedia",
    "indolence",
    "sloth",
    "laziness"
  ],
  [
    "steps",
    "staircase",
    "stairway",
    "stairs"
  ],
  [
    "ravel",
    "run",
    "ladder"
  ],
  [
    "comprehensive",
    "umbrella"
  ],
  [
    "imperative",
    "pressing",
    "urgent"
  ],
  [
    "sullen",
    "dull",
    "turbid",
    "opaque",
    "heavy",
    "indistinct",
    "nebulous",
    "overcast",
    "leaden",
    "vaporous",
    "murky",
    "brumous",
    "foggy",
    "nebulose",
    "grey",
    "hazy",
    "threatening",
    "miasmic",
    "mirky",
    "muddy",
    "sunless",
    "clouded",
    "lowering",
    "nebular",
    "miasmal",
    "smoggy",
    "cloudlike",
    "cloud-covered",
    "gray",
    "misty",
    "cloudy"
  ],
  [
    "unfit",
    "paralytic",
    "paralyzed"
  ],
  [
    "about",
    "some",
    "just about",
    "roughly",
    "around",
    "more or less",
    "or so",
    "close to",
    "approximately"
  ],
  [
    "acrid",
    "hot",
    "sarcastic",
    "spicy",
    "barbed",
    "nipping",
    "alliaceous",
    "biting",
    "peppery",
    "garlicky",
    "gingery",
    "pungent"
  ],
  [
    "rapt",
    "solicitous",
    "thoughtful",
    "engrossed",
    "heedful",
    "absorbed",
    "advertent",
    "intent",
    "wrapped",
    "enwrapped",
    "oversolicitous",
    "listening",
    "observant",
    "attentive"
  ],
  [
    "light",
    "trivial",
    "giddy",
    "silly",
    "flippant",
    "flighty",
    "featherbrained",
    "flyaway",
    "dizzy",
    "light-headed",
    "empty-headed",
    "airheaded",
    "light-minded",
    "idle",
    "frivolous"
  ],
  [
    "dulcet",
    "beautiful",
    "gratifying",
    "idyllic",
    "fine",
    "nice",
    "pastoral",
    "grateful",
    "pleasurable",
    "enjoyable",
    "pleasant"
  ],
  [
    "static",
    "unmoving",
    "inactive",
    "nonmoving",
    "at rest",
    "still",
    "motionless"
  ],
  [
    "indifferent",
    "trivial",
    "banal",
    "mundane",
    "common",
    "quotidian",
    "fair",
    "simple",
    "average",
    "routine",
    "middling",
    "commonplace",
    "unremarkable",
    "everyday",
    "mediocre",
    "passable",
    "nondescript",
    "tolerable",
    "unexceptional",
    "workaday",
    "characterless",
    "run-of-the-mill",
    "run-of-the-mine",
    "ordinary bicycle",
    "ordinary"
  ],
  [
    "barren",
    "sterile",
    "unfruitful",
    "sterilized",
    "unfertile",
    "unfertilized",
    "unimpregnated",
    "infertile"
  ],
  [
    "saint",
    "backer",
    "holy man",
    "holy person",
    "angel falls",
    "angel"
  ],
  [
    "compact",
    "reduce",
    "take",
    "shrink",
    "squeeze",
    "press",
    "undertake",
    "sign",
    "narrow",
    "concentrate",
    "abbreviate",
    "get",
    "cut",
    "constrict",
    "compress",
    "sign up",
    "fee",
    "condense",
    "foreshorten",
    "sign on",
    "contract bridge",
    "abridge",
    "shorten",
    "contract"
  ],
  [
    "accord",
    "pact",
    "treaty"
  ],
  [
    "lead",
    "cover",
    "cross",
    "course",
    "path",
    "tail",
    "dog",
    "rail",
    "trail",
    "running",
    "tag",
    "chase",
    "get over",
    "pass over",
    "cut across",
    "get across",
    "chase after",
    "cut through",
    "go after",
    "racetrack",
    "racecourse",
    "raceway",
    "cart track",
    "cartroad",
    "data track",
    "rails",
    "traverse",
    "track"
  ],
  [
    "foetus",
    "fetus"
  ],
  [
    "pollen"
  ],
  [
    "insidious",
    "grievous",
    "critical",
    "precarious",
    "perilous",
    "severe",
    "parlous",
    "serious",
    "desperate",
    "treacherous",
    "harmful",
    "venturous",
    "hazardous",
    "dicey",
    "dodgy",
    "venturesome",
    "suicidal",
    "risky",
    "unsafe",
    "unreliable",
    "self-destructive",
    "chancy",
    "breakneck",
    "touch-and-go",
    "chanceful",
    "grave",
    "dangerous"
  ],
  [
    "affable",
    "amiable",
    "cordial",
    "genial",
    "amicable",
    "intimate",
    "favorable",
    "chummy",
    "informal",
    "companionate",
    "social",
    "cozy",
    "well-disposed",
    "matey",
    "palsy-walsy",
    "couthy",
    "comradely",
    "couthie",
    "hail-fellow",
    "pally",
    "neighborly",
    "neighbourly",
    "hail-fellow-well-met",
    "friendly"
  ],
  [
    "friendly",
    "well-meaning",
    "unthreatening",
    "unhostile",
    "amicable"
  ],
  [
    "electrical energy",
    "electricity"
  ],
  [
    "bum",
    "loafer",
    "layabout",
    "do-nothing",
    "idler"
  ],
  [
    "bum",
    "idler",
    "layabout",
    "do-nothing",
    "loafer"
  ],
  [
    "land",
    "seashore",
    "set ashore",
    "shore"
  ],
  [
    "indulge",
    "new",
    "babe",
    "cosset",
    "infantile",
    "pamper",
    "child",
    "coddle",
    "mollycoddle",
    "spoil",
    "early",
    "young",
    "cocker",
    "featherbed",
    "sister",
    "infant",
    "baby"
  ],
  [
    "yolk"
  ],
  [
    "shallow",
    "school",
    "shelvy",
    "shoaly",
    "shelfy",
    "reefy",
    "shoal"
  ],
  [
    "tank car",
    "cooler",
    "tankful",
    "storage tank",
    "armored combat vehicle",
    "army tank",
    "tank"
  ],
  [
    "rummy",
    "inebriate",
    "drunk",
    "sot",
    "drunkard"
  ],
  [
    "significant",
    "intense",
    "fundamental",
    "intimate",
    "important",
    "heavy",
    "thoughtful",
    "deep",
    "sound",
    "unfathomed",
    "unplumbed",
    "wakeless",
    "unsounded",
    "profound"
  ],
  [
    "genus equisetum",
    "equisetum"
  ],
  [
    "lacuna",
    "space",
    "white",
    "clean",
    "empty",
    "dummy",
    "uncommunicative",
    "incommunicative",
    "unloaded",
    "blank shell",
    "blank"
  ],
  [
    "dead",
    "out",
    "inactive",
    "extinguished",
    "nonextant",
    "quenched",
    "extinct"
  ],
  [
    "pass",
    "narrow",
    "straits",
    "strait"
  ],
  [
    "weeping",
    "crying",
    "tears"
  ],
  [
    "creditor"
  ],
  [
    "debonair",
    "gay",
    "chipper",
    "optimistic",
    "lighthearted",
    "beaming",
    "buoyant",
    "upbeat",
    "blithesome",
    "glad",
    "pollyannaish",
    "debonaire",
    "perky",
    "chirpy",
    "lightsome",
    "cheery",
    "cheering",
    "twinkly",
    "beamish",
    "blithe",
    "jaunty",
    "sunny",
    "cheerful"
  ],
  [
    "sharp",
    "heavy",
    "exorbitant",
    "high",
    "bold",
    "absorb",
    "bluff",
    "infuse",
    "precipitous",
    "abrupt",
    "plunge",
    "engulf",
    "engross",
    "immerse",
    "outrageous",
    "immoderate",
    "extortionate",
    "usurious",
    "perpendicular",
    "unconscionable",
    "steepish",
    "brew",
    "sheer",
    "steep"
  ],
  [
    "joiner"
  ],
  [
    "cabinetmaker"
  ],
  [
    "tip",
    "baksheesh",
    "bakshis",
    "backsheesh",
    "bakshish",
    "gratuity"
  ],
  [
    "candid",
    "forthright",
    "blunt",
    "direct",
    "obvious",
    "outspoken",
    "weenie",
    "point-blank",
    "plainspoken",
    "free-spoken",
    "postmark",
    "hotdog",
    "wienerwurst",
    "frankfurter",
    "wiener",
    "frank"
  ],
  [
    "manifest",
    "plain",
    "apparent",
    "obvious",
    "discernible",
    "patent",
    "noticeable",
    "observable",
    "evident"
  ],
  [
    "groom",
    "bridegroom"
  ],
  [
    "part",
    "deal",
    "contribution",
    "portion",
    "parcel",
    "partake",
    "percentage",
    "apportion",
    "ploughshare",
    "divvy up",
    "portion out",
    "partake in",
    "plowshare",
    "share"
  ],
  [
    "ambiance",
    "atmosphere",
    "ambience"
  ],
  [
    "vibe"
  ],
  [
    "void",
    "emptiness",
    "vacancy"
  ],
  [
    "demarcation",
    "restrain",
    "boundary",
    "throttle",
    "confine",
    "circumscribe",
    "restrict",
    "limitation",
    "terminus ad quem",
    "limit point",
    "demarcation line",
    "terminal point",
    "point of accumulation",
    "bound",
    "bounds",
    "trammel",
    "limit"
  ],
  [
    "good",
    "true",
    "authentic",
    "bona fide",
    "attested",
    "actual",
    "veritable",
    "real",
    "unquestionable",
    "documented",
    "literal",
    "unfeigned",
    "honest-to-goodness",
    "authenticated",
    "honest-to-god",
    "sincere",
    "genuine"
  ],
  [
    "virtuous",
    "naive",
    "innocuous",
    "naif",
    "ingenuous",
    "clear",
    "ignorant",
    "unconscious",
    "vindicated",
    "impeccant",
    "harmless",
    "irreproachable",
    "absolved",
    "exonerated",
    "guiltless",
    "acquitted",
    "blameless",
    "exculpated",
    "inculpable",
    "unimpeachable",
    "sinless",
    "clean-handed",
    "inexperienced person",
    "cleared",
    "not guilty",
    "innocent"
  ],
  [
    "peril",
    "risk",
    "danger"
  ],
  [
    "lightning bug",
    "fire beetle",
    "pyrophorus noctiluca",
    "firefly"
  ],
  [
    "look",
    "presence",
    "face",
    "movement",
    "breast",
    "fore",
    "figurehead",
    "straw man",
    "forepart",
    "front man",
    "battlefront",
    "front end",
    "front line",
    "nominal head",
    "front"
  ],
  [
    "endowment",
    "gift",
    "natural endowment",
    "talent"
  ],
  [
    "induce",
    "case",
    "drive",
    "stimulate",
    "have",
    "effort",
    "make",
    "movement",
    "campaign",
    "get",
    "grounds",
    "do",
    "suit",
    "causa",
    "lawsuit",
    "causal agent",
    "causal agency",
    "crusade",
    "reason",
    "cause"
  ],
  [
    "understanding",
    "ground",
    "cause",
    "intellect",
    "conclude",
    "rationality",
    "grounds",
    "reasonableness",
    "reason out",
    "argue",
    "reason"
  ],
  [
    "esoteric",
    "surreptitious",
    "clandestine",
    "mystical",
    "occult",
    "privy",
    "mysterious",
    "secluded",
    "mystery",
    "concealed",
    "private",
    "arcanum",
    "cloak-and-dagger",
    "hugger-mugger",
    "confidential",
    "closet",
    "inward",
    "unacknowledged",
    "undercover",
    "closed book",
    "classified",
    "hush-hush",
    "unavowed",
    "hole-and-corner",
    "on the quiet",
    "covert",
    "enigma",
    "hidden",
    "mystic",
    "underground",
    "secret"
  ],
  [
    "present",
    "point",
    "level",
    "phase",
    "arrange",
    "bring about",
    "leg",
    "stagecoach",
    "microscope stage",
    "degree",
    "stage"
  ],
  [
    "parents"
  ],
  [
    "walleye"
  ],
  [
    "flush",
    "inflaming",
    "redness",
    "inflammation"
  ],
  [
    "piece",
    "small-arm",
    "firearm"
  ],
  [
    "beam",
    "radiate",
    "ray of light",
    "irradiate",
    "re",
    "light beam",
    "beam of light",
    "shaft of light",
    "shaft",
    "ray"
  ],
  [
    "trunk",
    "proboscis"
  ],
  [
    "lemon",
    "gamboge",
    "lemon yellow",
    "corn",
    "indian corn",
    "zea mays",
    "maize"
  ],
  [
    "oat"
  ],
  [
    "fagopyrum esculentum",
    "polygonum fagopyrum",
    "buckwheat"
  ],
  [
    "woody",
    "aspen"
  ],
  [
    "plane tree",
    "sycamore",
    "platan"
  ],
  [
    "dogwood",
    "dogwood tree",
    "cornel"
  ],
  [
    "sloe",
    "prunus spinosa",
    "pear haw",
    "pear hawthorn",
    "crataegus calpodendron",
    "crataegus tomentosa",
    "blackthorn"
  ],
  [
    "tamarisk"
  ],
  [
    "mespilus germanica",
    "medlar tree",
    "wild medlar",
    "wild medlar tree",
    "vangueria infausta",
    "medlar"
  ],
  [
    "gooseberry bush",
    "ribes uva-crispa",
    "ribes grossularia",
    "gooseberry"
  ],
  [
    "prison house",
    "prison"
  ],
  [
    "trap",
    "lurk",
    "ambuscade",
    "scupper",
    "waylay",
    "still-hunt",
    "bushwhack",
    "lie in wait",
    "lying in wait",
    "ambush"
  ],
  [
    "bucolic",
    "churl",
    "tyke",
    "barbarian",
    "boor",
    "provincial",
    "tike",
    "goth",
    "peasant"
  ],
  [
    "fort",
    "fortress"
  ],
  [
    "geometrid moth",
    "geometrid"
  ],
  [
    "disquiet",
    "disarray",
    "trouble",
    "upset",
    "perturb",
    "cark",
    "distract",
    "unhinge",
    "disorderliness",
    "disorder"
  ],
  [
    "slew",
    "muddle",
    "spate",
    "mass",
    "hole",
    "pile",
    "deal",
    "mint",
    "batch",
    "peck",
    "sight",
    "jam",
    "heap",
    "wad",
    "pickle",
    "pot",
    "flock",
    "fix",
    "stack",
    "lot",
    "raft",
    "plenty",
    "mess up",
    "muss",
    "kettle of fish",
    "messiness",
    "great deal",
    "whole slew",
    "good deal",
    "mussiness",
    "whole lot",
    "mess hall",
    "hatful",
    "quite a little",
    "tidy sum",
    "mickle",
    "muckle",
    "mess"
  ],
  [
    "soft roe",
    "milt"
  ],
  [
    "veil",
    "embryonic membrane",
    "greater omentum",
    "fetal membrane",
    "gastrocolic omentum",
    "caul"
  ],
  [
    "single",
    "divorced",
    "unwed",
    "unwedded",
    "mateless",
    "widowed",
    "unmarried"
  ],
  [
    "ace",
    "individual",
    "separate",
    "exclusive",
    "one",
    "undivided",
    "divorced",
    "i",
    "unwed",
    "unwedded",
    "unmarried",
    "mateless",
    "widowed",
    "1",
    "unity",
    "single"
  ],
  [
    "bach",
    "bachelor-at-arms",
    "unmarried man",
    "knight bachelor",
    "bachelor"
  ],
  [
    "stork"
  ],
  [
    "elaborate",
    "careful",
    "elaborated",
    "detailed"
  ],
  [
    "complete",
    "careful",
    "exhaustive",
    "thoroughgoing",
    "thorough"
  ],
  [
    "hapless",
    "wretched",
    "abject",
    "deplorable",
    "pitiful",
    "sad",
    "meager",
    "woeful",
    "paltry",
    "piteous",
    "inferior",
    "execrable",
    "pathetic",
    "low",
    "unfortunate",
    "contemptible",
    "meagre",
    "pitiable",
    "suffering",
    "measly",
    "poor",
    "uncomfortable",
    "unhappy",
    "misfortunate",
    "scummy",
    "low-down",
    "scurvy",
    "meagerly",
    "miserable"
  ],
  [
    "wretched",
    "sad",
    "sorry",
    "distressed",
    "bad",
    "unfortunate",
    "miserable",
    "unpleasant",
    "infelicitous",
    "lovesick",
    "suffering",
    "nostalgic",
    "dysphoric",
    "homesick",
    "unhappy"
  ],
  [
    "lounge lizard",
    "lizard"
  ],
  [
    "bum",
    "peach",
    "denounce",
    "stag",
    "betray",
    "rotter",
    "grass",
    "give away",
    "shop",
    "crumb",
    "snitch",
    "so-and-so",
    "informer",
    "lowlife",
    "stinker",
    "betrayer",
    "strikebreaker",
    "scum bag",
    "blackleg",
    "squealer",
    "tell on",
    "puke",
    "scab",
    "skunk",
    "rat"
  ],
  [
    "tranquil",
    "lull",
    "sedate",
    "composed",
    "equanimity",
    "composure",
    "steady",
    "unruffled",
    "quiet",
    "peaceful",
    "settled",
    "becalm",
    "quieten",
    "simmer down",
    "settle down",
    "tranquillize",
    "tranquilize",
    "windless",
    "undisturbed",
    "unagitated",
    "calmness",
    "cool off",
    "chill out",
    "cool it",
    "calm down",
    "placid",
    "serene",
    "still",
    "calm"
  ],
  [
    "descendent",
    "descendant"
  ],
  [
    "delineate",
    "depict",
    "trace",
    "draw",
    "line",
    "outline",
    "key",
    "identify",
    "report",
    "distinguish",
    "name",
    "key out",
    "discover",
    "describe"
  ],
  [
    "intermediary",
    "go-between",
    "intermediator",
    "mediator"
  ],
  [
    "headscarf"
  ],
  [
    "impressive",
    "awful",
    "awesome",
    "astonishing",
    "awe-inspiring",
    "surprising",
    "awing",
    "amazing"
  ],
  [
    "strange",
    "extraneous",
    "established",
    "extrinsic",
    "exotic",
    "external",
    "adventive",
    "tramontane",
    "overseas",
    "abroad",
    "adulterant",
    "naturalized",
    "adulterating",
    "foreign-born",
    "unnaturalized",
    "nonnative",
    "imported",
    "alien",
    "international",
    "foreign"
  ],
  [
    "wild",
    "feral",
    "unbroken",
    "undomesticated",
    "savage",
    "untamed"
  ],
  [
    "haughtiness",
    "lordliness",
    "arrogance"
  ],
  [
    "metallic",
    "metallic element",
    "metal"
  ],
  [
    "cardinal",
    "quintet",
    "fin",
    "pentad",
    "fivesome",
    "quintuplet",
    "cinque",
    "v",
    "little phoebe",
    "5",
    "basketball team",
    "phoebe",
    "quint",
    "five"
  ],
  [
    "wizard",
    "sorcerer",
    "conjurer",
    "necromancer",
    "prestidigitator",
    "illusionist",
    "conjuror",
    "magician"
  ],
  [
    "whitecaps"
  ],
  [
    "do drugs",
    "dose",
    "drug"
  ],
  [
    "music",
    "medication",
    "medicate",
    "medicament",
    "practice of medicine",
    "medicinal drug",
    "medicine"
  ],
  [
    "powder",
    "gunpowder"
  ],
  [
    "germanic",
    "german language",
    "high german",
    "teutonic",
    "german"
  ],
  [
    "loot",
    "lucre",
    "kale",
    "pelf",
    "gelt",
    "dinero",
    "moolah",
    "shekels",
    "bread",
    "cabbage",
    "dough"
  ],
  [
    "power",
    "authority",
    "position",
    "function",
    "berth",
    "agency",
    "part",
    "post",
    "spot",
    "situation",
    "slot",
    "role",
    "government agency",
    "office staff",
    "bureau",
    "place",
    "office"
  ],
  [
    "hummel"
  ],
  [
    "tribute",
    "auspices",
    "security",
    "shelter",
    "guarding",
    "protective covering",
    "trade protection",
    "aegis",
    "protecting",
    "protection"
  ],
  [
    "disdain",
    "support",
    "condescension",
    "patronize",
    "trade",
    "backing",
    "clientele",
    "business",
    "championship",
    "patronage"
  ],
  [
    "glaucoma"
  ],
  [
    "desk"
  ],
  [
    "mercantilism",
    "commercialism",
    "commerce department",
    "department of commerce",
    "commerce"
  ],
  [
    "concern",
    "line",
    "patronage",
    "mercantile",
    "clientele",
    "occupation",
    "line of work",
    "stage business",
    "business organization",
    "business sector",
    "business concern",
    "byplay",
    "business enterprise",
    "commercial enterprise",
    "business"
  ],
  [
    "diligent",
    "energetic",
    "enterprising",
    "hardworking",
    "tireless",
    "untiring",
    "gumptious",
    "up-and-coming",
    "industrious"
  ],
  [
    "material",
    "cloth",
    "fabric",
    "textile"
  ],
  [
    "regulations"
  ],
  [
    "nevus",
    "birthmark"
  ],
  [
    "bird",
    "birdie",
    "shuttlecock",
    "shuttle"
  ],
  [
    "presage",
    "augur",
    "portent",
    "portend",
    "foretell",
    "forecast",
    "auspicate",
    "betoken",
    "prefigure",
    "predict",
    "prognosticate",
    "prognostic",
    "foreshadow",
    "bode",
    "omen"
  ],
  [
    "tough",
    "bully",
    "ruffian",
    "rowdy",
    "yobbo",
    "roughneck",
    "yob",
    "yobo",
    "hooligan"
  ],
  [
    "seethe",
    "effervesce",
    "sparkle",
    "spume",
    "froth",
    "suds",
    "fizz",
    "foam"
  ],
  [
    "herbaceous plant",
    "herb"
  ],
  [
    "many",
    "numerous"
  ],
  [
    "faraway"
  ],
  [
    "lost",
    "absent",
    "wanting",
    "nonexistent",
    "lacking",
    "missing"
  ],
  [
    "retrograde",
    "regressive",
    "retrogressive",
    "unsatisfactory",
    "unsuccessful",
    "weakness",
    "declining",
    "failed",
    "deteriorating",
    "regressing",
    "failing"
  ],
  [
    "bit",
    "little",
    "infinitesimal",
    "small",
    "careful",
    "narrow",
    "instant",
    "second",
    "atomic",
    "microscopic",
    "hour",
    "microscopical",
    "minute of arc",
    "arcminute",
    "atomlike",
    "min",
    "moment",
    "minute"
  ],
  [
    "ragged",
    "irregular",
    "scraggy",
    "inconsistent",
    "jagged",
    "wavy",
    "unequal",
    "patchy",
    "untrue",
    "mismatched",
    "rippled",
    "spotty",
    "crinkly",
    "crinkled",
    "unparallel",
    "lumpy",
    "jaggy",
    "wavelike",
    "cross-grained",
    "out of true",
    "uneven"
  ],
  [
    "maiden",
    "amah",
    "maidservant",
    "housemaid",
    "maid"
  ],
  [
    "canis aureus",
    "jackal"
  ],
  [
    "corduroy",
    "electric cord",
    "cord"
  ],
  [
    "cue",
    "clue",
    "clew"
  ],
  [
    "artful",
    "adroit",
    "clever",
    "craft",
    "ingenious",
    "knavish",
    "attractive",
    "guileful",
    "wily",
    "sly",
    "cute",
    "slick",
    "tricky",
    "dodgy",
    "foxy",
    "crafty",
    "tricksy",
    "craftiness",
    "wiliness",
    "foxiness",
    "slyness",
    "guile",
    "cunning"
  ],
  [
    "cunning",
    "artful",
    "knavish",
    "guileful",
    "wily",
    "slick",
    "tricky",
    "dodgy",
    "foxy",
    "crafty",
    "tricksy",
    "sly"
  ],
  [
    "blackberry bush",
    "blackberry"
  ],
  [
    "chaste",
    "celibate",
    "continent"
  ],
  [
    "comprehensive",
    "clear",
    "heavy",
    "thick",
    "panoptic",
    "deep",
    "full",
    "general",
    "large",
    "big",
    "encompassing",
    "all-encompassing",
    "tolerant",
    "sweeping",
    "noticeable",
    "all-embracing",
    "wide",
    "spacious",
    "blanket",
    "spreading",
    "panoramic",
    "all-inclusive",
    "broad-minded",
    "covering",
    "beamy",
    "overspreading",
    "nationwide",
    "overhanging",
    "unsubtle",
    "statewide",
    "unspecific",
    "wide-spreading",
    "across-the-board",
    "citywide",
    "countrywide",
    "fanlike",
    "countywide",
    "liberal",
    "broad"
  ],
  [
    "twist",
    "lace",
    "braid",
    "pleat",
    "tress",
    "plait"
  ],
  [
    "awl"
  ],
  [
    "mustache",
    "moustache"
  ],
  [
    "dull",
    "damp",
    "inarticulate",
    "silent",
    "dumb",
    "muffle",
    "tone down",
    "dampen",
    "unspoken",
    "unarticulate",
    "wordless",
    "deaden",
    "deaf-mute",
    "tongueless",
    "walk-on",
    "nonspeaking",
    "deaf-and-dumb person",
    "mute"
  ],
  [
    "deep",
    "tardily",
    "new",
    "modern",
    "ripe",
    "posthumous",
    "former",
    "previous",
    "advanced",
    "recently",
    "lately",
    "later",
    "belated",
    "belatedly",
    "latterly",
    "latish",
    "of late",
    "after-hours",
    "unpunctual",
    "recent",
    "tardy",
    "late"
  ],
  [
    "freckle"
  ],
  [
    "lazar",
    "leper"
  ],
  [
    "essential",
    "indispensable",
    "requisite",
    "obligatory",
    "necessity",
    "required",
    "requirement",
    "needful",
    "needed",
    "inevitable",
    "necessary"
  ],
  [
    "torrent",
    "downpour",
    "cloudburst",
    "soaker",
    "deluge",
    "waterspout"
  ],
  [
    "case",
    "slip",
    "pillow slip",
    "pillowcase"
  ],
  [
    "issue",
    "lead",
    "consequence",
    "resolution",
    "effect",
    "outcome",
    "answer",
    "solution",
    "upshot",
    "ensue",
    "leave",
    "result"
  ],
  [
    "issue",
    "consequence",
    "effect",
    "result",
    "upshot",
    "outcome"
  ],
  [
    "yellowhammer"
  ],
  [
    "refined",
    "genteel",
    "civilized",
    "tamed",
    "cultured",
    "polite",
    "tame",
    "cultivated"
  ],
  [
    "present",
    "accolade",
    "prize",
    "laurels",
    "awarding",
    "bestow an award upon",
    "grant",
    "honor",
    "honour",
    "award"
  ],
  [
    "underclothes",
    "underclothing",
    "underwear"
  ],
  [
    "arbor",
    "mandrel",
    "mandril",
    "spindle"
  ],
  [
    "comet"
  ],
  [
    "sorceress"
  ],
  [
    "nailhead"
  ],
  [
    "aconite"
  ],
  [
    "hose down",
    "tights",
    "hosepipe",
    "hose"
  ],
  [
    "scheme",
    "connive",
    "fascinate",
    "machination",
    "intrigue"
  ],
  [
    "pox",
    "syph",
    "syphilis"
  ],
  [
    "good",
    "optimal",
    "champion",
    "better",
    "optimum",
    "trump",
    "first",
    "scoop",
    "finest",
    "greatest",
    "outflank",
    "unsurpassable",
    "top-grade",
    "outdo",
    "high-grade",
    "superfine",
    "unexcelled",
    "top-quality",
    "record-breaking",
    "unsurpassed",
    "unexceeded",
    "second-best",
    "prizewinning",
    "most advantageous",
    "most desirable",
    "foremost",
    "sunday",
    "best"
  ],
  [
    "celluloid",
    "film",
    "movie theater",
    "movie house",
    "picture palace",
    "movie theatre",
    "cinema"
  ],
  [
    "arterial"
  ],
  [
    "venous"
  ],
  [
    "renown",
    "famous person",
    "fame",
    "celebrity"
  ],
  [
    "pestilential",
    "pestilent",
    "plaguey",
    "epizootic",
    "epiphytotic",
    "plaguelike",
    "pandemic",
    "epidemic"
  ],
  [
    "chromatic",
    "carmine",
    "ruddy",
    "crimson",
    "cherry",
    "scarlet",
    "blood-red",
    "ruby-red",
    "cherry-red",
    "deep red",
    "cerise",
    "colored",
    "red",
    "reddish",
    "ruby"
  ],
  [
    "quinsy"
  ],
  [
    "potency",
    "intensity",
    "metier",
    "durability",
    "effectiveness",
    "specialty",
    "enduringness",
    "forcefulness",
    "speciality",
    "strong point",
    "persuasiveness",
    "long suit",
    "lastingness",
    "military capability",
    "force",
    "forte",
    "strength"
  ],
  [
    "soft",
    "indulgent",
    "easy",
    "permissive",
    "undemanding",
    "clement",
    "lax",
    "lenient"
  ],
  [
    "municipal",
    "native",
    "internal",
    "tamed",
    "husbandly",
    "domesticated",
    "housewifely",
    "domestic help",
    "home-loving",
    "house servant",
    "household",
    "national",
    "tame",
    "domestic"
  ],
  [
    "precipice"
  ],
  [
    "abysm",
    "abyss"
  ],
  [
    "sound",
    "legitimate",
    "logical",
    "binding",
    "reasoned",
    "validated",
    "well-grounded",
    "legal",
    "unexpired",
    "valid"
  ],
  [
    "pelican"
  ],
  [
    "endorse",
    "bit",
    "forward",
    "irregular",
    "back",
    "minute",
    "ordinal",
    "intermediate",
    "endorsement",
    "instant",
    "indorse",
    "arcsecond",
    "sec",
    "secondly",
    "2d",
    "second gear",
    "second base",
    "2nd",
    "moment",
    "s",
    "second"
  ],
  [
    "verse",
    "poesy",
    "poetry"
  ],
  [
    "solitary",
    "just",
    "exclusive",
    "merely",
    "solely",
    "but",
    "lone",
    "simply",
    "entirely",
    "exclusively",
    "alone",
    "lonesome",
    "only when",
    "only if",
    "sole",
    "only"
  ],
  [
    "just",
    "merely",
    "only",
    "simply",
    "but"
  ],
  [
    "nonetheless",
    "nevertheless",
    "notwithstanding",
    "withal",
    "yet",
    "even so",
    "all the same",
    "how",
    "still",
    "however"
  ],
  [
    "indifferent",
    "modest",
    "control",
    "lead",
    "restrained",
    "hold",
    "temper",
    "mild",
    "fair",
    "check",
    "medium",
    "cautious",
    "small",
    "reasonable",
    "curb",
    "contain",
    "intermediate",
    "temperate",
    "average",
    "mince",
    "chasten",
    "limited",
    "tone down",
    "chair",
    "soften",
    "fairish",
    "centrist",
    "hold in",
    "middle-of-the-road",
    "middle of the roader",
    "moderationist",
    "conservative",
    "moderate"
  ],
  [
    "grownup"
  ],
  [
    "low",
    "nether",
    "below",
    "under"
  ],
  [
    "subsequently",
    "afterwards",
    "later",
    "afterward",
    "later on",
    "after"
  ],
  [
    "solemn",
    "serious",
    "devout",
    "heartfelt",
    "purposeful",
    "in earnest",
    "businesslike",
    "dear",
    "sincere",
    "earnest"
  ],
  [
    "solemn",
    "earnest",
    "grievous",
    "critical",
    "good",
    "sensible",
    "important",
    "severe",
    "sedate",
    "hard",
    "difficult",
    "thoughtful",
    "dangerous",
    "intellectual",
    "sobering",
    "real",
    "unplayful",
    "of import",
    "overserious",
    "grave",
    "sincere",
    "sober",
    "serious"
  ],
  [
    "auger",
    "wimble",
    "screw auger",
    "gimlet"
  ],
  [
    "brass",
    "governance",
    "system",
    "arrangement",
    "formation",
    "organisation",
    "administration",
    "constitution",
    "establishment",
    "organization"
  ],
  [
    "miracle"
  ],
  [
    "see",
    "find",
    "watcher",
    "attestant",
    "informant",
    "spectator",
    "viewer",
    "witness"
  ],
  [
    "cardinal",
    "2",
    "deuce",
    "ii",
    "two"
  ],
  [
    "monastery"
  ],
  [
    "contrary",
    "inverse",
    "opposition",
    "different",
    "diametric",
    "polar",
    "other",
    "reverse",
    "opponent",
    "diametrical",
    "antonym",
    "face-to-face",
    "opposite word",
    "paired",
    "opposite"
  ],
  [
    "pubic region",
    "loin",
    "pubes",
    "loins"
  ],
  [
    "base",
    "staunch",
    "radical",
    "bow",
    "stalk",
    "shank",
    "theme",
    "root",
    "stanch",
    "fore",
    "root word",
    "halt",
    "prow",
    "stem"
  ],
  [
    "initiative",
    "offset",
    "low",
    "original",
    "premier",
    "maiden",
    "basic",
    "forward",
    "top",
    "ordinal",
    "start",
    "opening",
    "commencement",
    "inaugural",
    "best",
    "initial",
    "beginning",
    "outset",
    "kickoff",
    "premiere",
    "archetypal",
    "initiatory",
    "first off",
    "number one",
    "prototypical",
    "archetypical",
    "introductory",
    "firstborn",
    "first of all",
    "freshman",
    "eldest",
    "firstly",
    "prototypic",
    "1st",
    "first base",
    "prototypal",
    "oldest",
    "low gear",
    "first gear",
    "starting time",
    "first-year",
    "for the first time",
    "number 1",
    "first-class honours degree",
    "foremost",
    "first"
  ],
  [
    "bad luck",
    "ill luck",
    "misfortune"
  ],
  [
    "mark",
    "fool",
    "chump",
    "patsy",
    "gull",
    "soft touch",
    "shlemiel",
    "mug",
    "fall guy",
    "schlemiel",
    "lollipop",
    "sipper",
    "all-day sucker",
    "fish",
    "sucker"
  ],
  [
    "fascicule",
    "fasiculus",
    "fascicle"
  ],
  [
    "fool",
    "jester"
  ],
  [
    "heave",
    "distort",
    "falsify",
    "deflection",
    "garble",
    "buckle",
    "warping",
    "warp"
  ],
  [
    "puffin"
  ],
  [
    "pick",
    "pickax",
    "pickaxe"
  ],
  [
    "eyesocket"
  ],
  [
    "banana tree",
    "banana"
  ],
  [
    "forthwith",
    "instantly",
    "at once",
    "straightaway",
    "directly",
    "right away",
    "in real time",
    "now",
    "immediately"
  ],
  [
    "spirit",
    "aliveness",
    "animation",
    "liveliness",
    "living",
    "lifetime",
    "sprightliness",
    "biography",
    "lifespan",
    "life history",
    "life story",
    "life"
  ],
  [
    "sigh"
  ],
  [
    "forward",
    "leading",
    "before",
    "beforehand",
    "out front",
    "in front",
    "onward",
    "forrader",
    "forwards",
    "in advance",
    "onwards",
    "in the lead",
    "ahead"
  ],
  [
    "straight",
    "straight person",
    "heterosexual person",
    "heterosexual"
  ],
  [
    "black",
    "pure",
    "concentrated",
    "neat",
    "straight",
    "unmixed",
    "full-strength",
    "absolute",
    "undiluted"
  ],
  [
    "belike",
    "plausibly",
    "credibly",
    "in all probability",
    "believably",
    "in all likelihood",
    "likely",
    "probably"
  ],
  [
    "pandion haliaetus",
    "sea eagle",
    "fish hawk",
    "fish eagle",
    "osprey"
  ],
  [
    "bishop"
  ],
  [
    "horse",
    "dub",
    "knight"
  ],
  [
    "figuratively"
  ],
  [
    "free",
    "novel",
    "archetype",
    "innovative",
    "simple",
    "master",
    "fresh",
    "primary",
    "seminal",
    "daring",
    "new",
    "avant-garde",
    "pilot",
    "first",
    "newfangled",
    "underived",
    "master copy",
    "originative",
    "innovational",
    "freehand",
    "freehanded",
    "underivative",
    "germinal",
    "original"
  ],
  [
    "flea"
  ],
  [
    "fluting",
    "transverse flute",
    "champagne flute",
    "flute glass",
    "flute"
  ],
  [
    "barren",
    "antiseptic",
    "aseptic",
    "uninspired",
    "infertile",
    "uninventive",
    "unimaginative",
    "unfertile",
    "uncreative",
    "sterile"
  ],
  [
    "bush",
    "shrub"
  ],
  [
    "witchery",
    "witchcraft"
  ],
  [
    "black art",
    "black magic",
    "sorcery"
  ],
  [
    "upstream",
    "upriver"
  ],
  [
    "downstream",
    "downriver"
  ],
  [
    "tire",
    "tyre"
  ],
  [
    "glorious",
    "illustrious",
    "proud",
    "reputable",
    "redoubtable",
    "well-thought-of",
    "respected"
  ],
  [
    "revered",
    "old",
    "august",
    "honorable",
    "honourable",
    "venerable"
  ],
  [
    "conventional",
    "straightforward",
    "honest",
    "straight",
    "quadrate",
    "squarely",
    "public square",
    "squared",
    "foursquare",
    "square up",
    "squarish",
    "right-angled",
    "square toes",
    "second power",
    "feather",
    "honorable",
    "square"
  ],
  [
    "rheumatoid arthritis",
    "atrophic arthritis",
    "rheumatism"
  ],
  [
    "shank",
    "waistline",
    "waist"
  ],
  [
    "immature",
    "unready",
    "unripened",
    "unaged",
    "green",
    "unripe"
  ],
  [
    "stock",
    "broth"
  ],
  [
    "compeer",
    "match",
    "equal",
    "peer"
  ],
  [
    "antecedent",
    "ascendent",
    "ascendant",
    "ancestor"
  ],
  [
    "initiate",
    "tyro",
    "beginner",
    "beginning",
    "tiro",
    "novice"
  ],
  [
    "range",
    "tell",
    "society",
    "rank",
    "club",
    "set up",
    "enjoin",
    "edict",
    "decree",
    "dictate",
    "put",
    "arrange",
    "regulate",
    "consecrate",
    "rate",
    "ordain",
    "govern",
    "gild",
    "grade",
    "prescribe",
    "say",
    "rescript",
    "orderliness",
    "purchase order",
    "ordering",
    "regularize",
    "order of magnitude",
    "parliamentary law",
    "parliamentary procedure",
    "fiat",
    "guild",
    "lodge",
    "place",
    "rules of order",
    "order"
  ],
  [
    "break",
    "give",
    "collapse",
    "flop",
    "beginner",
    "father",
    "cave in",
    "give way",
    "fall in",
    "fall flat",
    "laminitis",
    "fall through",
    "founding father",
    "founder"
  ],
  [
    "protector",
    "guardian",
    "defender"
  ],
  [
    "proprietor",
    "possessor",
    "owner"
  ],
  [
    "instructor",
    "teacher"
  ],
  [
    "common",
    "familiar",
    "customary",
    "habitual",
    "regular",
    "accustomed",
    "usual"
  ],
  [
    "cant",
    "canted",
    "skew",
    "bent",
    "disposed",
    "prepared",
    "slanted",
    "atilt",
    "bowed",
    "sidelong",
    "leaning",
    "skewed",
    "low-pitched",
    "sloping",
    "high-pitched",
    "beveled",
    "tipped",
    "pitched",
    "aslant",
    "tilted",
    "unerect",
    "slanting",
    "aslope",
    "sloped",
    "bevel",
    "diagonal",
    "fain",
    "inclined"
  ],
  [
    "spawning"
  ],
  [
    "villain",
    "scoundrel"
  ],
  [
    "ineluctable",
    "necessary",
    "fatal",
    "inescapable",
    "unavoidable",
    "fateful",
    "predictable",
    "inevitable"
  ],
  [
    "span",
    "yoke",
    "mate",
    "brace",
    "match",
    "dyad",
    "copulate",
    "couple",
    "twin",
    "twosome",
    "duad",
    "couplet",
    "distich",
    "doubleton",
    "pair off",
    "partner off",
    "duet",
    "duo",
    "twain",
    "pair"
  ],
  [
    "soft",
    "weak",
    "sissy",
    "epicene",
    "emasculate",
    "unmanly",
    "sissified",
    "sissyish",
    "unmanlike",
    "unmanful",
    "cissy",
    "effeminate"
  ],
  [
    "protein"
  ],
  [
    "sclerotic coat",
    "sclera"
  ],
  [
    "intelligence",
    "word",
    "tidings",
    "newsworthiness",
    "news program",
    "news show",
    "news"
  ],
  [
    "banter",
    "stalk",
    "husk",
    "jolly",
    "shuck",
    "straw",
    "kid",
    "stubble",
    "chaff"
  ],
  [
    "website"
  ],
  [
    "adept",
    "proficient",
    "good",
    "skilled",
    "professional",
    "skillful",
    "practiced",
    "skilful",
    "expert"
  ],
  [
    "intimate",
    "initiate",
    "knowledgeable",
    "old",
    "seasoned",
    "practiced",
    "full-fledged",
    "initiated",
    "fully fledged",
    "older",
    "practised",
    "experienced"
  ],
  [
    "pacesetter",
    "pacer",
    "sinoatrial node",
    "artificial pacemaker",
    "cardiac pacemaker",
    "sa node",
    "pacemaker"
  ],
  [
    "successfulness",
    "prosperity"
  ],
  [
    "priest-doctor",
    "shaman"
  ],
  [
    "stepfather"
  ],
  [
    "niece"
  ],
  [
    "flutter",
    "tremor",
    "frisson",
    "thrill",
    "flitter",
    "shudder",
    "quivering",
    "flicker",
    "tingle",
    "trembling",
    "chill",
    "vibration",
    "palpitation",
    "shaking",
    "shakiness",
    "quake",
    "shiver",
    "waver",
    "quiver"
  ],
  [
    "spiderweb"
  ],
  [
    "wicked",
    "loathsome",
    "foul",
    "revolting",
    "offensive",
    "distasteful",
    "loathly",
    "repellent",
    "repellant",
    "yucky",
    "disgustful",
    "disgusting"
  ],
  [
    "bothering"
  ],
  [
    "mesentery"
  ],
  [
    "presently",
    "shortly",
    "before long",
    "soon"
  ],
  [
    "just",
    "incisively",
    "precisely",
    "on the nose",
    "on the dot",
    "on the button",
    "exactly"
  ],
  [
    "stern",
    "butt",
    "ass",
    "bob",
    "bum",
    "track",
    "prat",
    "poop",
    "bottom",
    "dog",
    "trail",
    "arse",
    "quarter",
    "fundament",
    "keister",
    "rear",
    "derriere",
    "tag",
    "rump",
    "chase",
    "backside",
    "behind",
    "tush",
    "dock",
    "posterior",
    "seat",
    "buttocks",
    "fanny",
    "buns",
    "empennage",
    "tail end",
    "rear end",
    "fag end",
    "chase after",
    "hindquarters",
    "go after",
    "tooshie",
    "hind end",
    "after part",
    "tail assembly",
    "can",
    "shadow",
    "tail"
  ],
  [
    "castle",
    "palace"
  ],
  [
    "solicit",
    "homage",
    "tribunal",
    "courtyard",
    "judicature",
    "woo",
    "courtroom",
    "motor hotel",
    "motel",
    "motor lodge",
    "motor inn",
    "tourist court",
    "romance",
    "court"
  ],
  [
    "need",
    "must",
    "ought",
    "had better",
    "should"
  ],
  [
    "elodea",
    "ditchmoss",
    "genus elodea",
    "pondweed"
  ],
  [
    "whirlwind"
  ],
  [
    "obscure",
    "fog",
    "befog",
    "cloud",
    "becloud",
    "haze over",
    "mist over",
    "mist"
  ],
  [
    "hoarfrost"
  ],
  [
    "sweetpotato"
  ],
  [
    "caste"
  ],
  [
    "snowstorm",
    "blizzard"
  ],
  [
    "stag",
    "spot",
    "descry",
    "snoop",
    "espy",
    "undercover agent",
    "spy"
  ],
  [
    "chronicle",
    "account",
    "story",
    "history"
  ],
  [
    "carum carvi",
    "caraway"
  ],
  [
    "issue",
    "progeny",
    "young",
    "materialization",
    "offspring"
  ],
  [
    "span",
    "nosepiece",
    "bridgework",
    "bridge deck",
    "bridge circuit",
    "bridge over",
    "bridge"
  ],
  [
    "beguiling",
    "duplicitous",
    "unscrupulous",
    "fallacious",
    "deceitful",
    "roguish",
    "crooked",
    "corrupt",
    "misleading",
    "fraudulent",
    "deceptive",
    "false",
    "rascally",
    "venal",
    "dishonorable",
    "double-dealing",
    "ambidextrous",
    "picaresque",
    "two-faced",
    "corruptible",
    "double-tongued",
    "thievish",
    "double-faced",
    "scoundrelly",
    "untruthful",
    "purchasable",
    "bribable",
    "blackguardly",
    "janus-faced",
    "dishonest"
  ],
  [
    "pleuronectes platessa",
    "plaice"
  ],
  [
    "poetry",
    "poesy",
    "rhyme",
    "versify",
    "poetize",
    "verse line",
    "verse"
  ],
  [
    "bedclothes"
  ],
  [
    "samphire",
    "saltwort",
    "kelpwort",
    "salsola kali",
    "salicornia europaea",
    "barilla",
    "kali",
    "salsola soda",
    "glasswort"
  ],
  [
    "erysipelas"
  ],
  [
    "quicksilver",
    "atomic number 80",
    "hg",
    "mercury"
  ],
  [
    "red planet",
    "mars"
  ],
  [
    "deposit",
    "sediment"
  ],
  [
    "appetence",
    "appetency",
    "appetite"
  ],
  [
    "shin",
    "tibia",
    "shinbone"
  ],
  [
    "ladybug",
    "ladybeetle",
    "lady beetle",
    "ladybird beetle",
    "ladybird"
  ],
  [
    "unsettled",
    "abandoned",
    "unoccupied",
    "untenanted",
    "unpeopled",
    "depopulated",
    "unpopulated",
    "uninhabited"
  ],
  [
    "timid",
    "diffident",
    "wary",
    "unsure",
    "unconfident",
    "shy"
  ],
  [
    "sacred lotus",
    "indian lotus",
    "nymphaea lotus",
    "white lotus",
    "genus lotus",
    "egyptian water lily",
    "nelumbo nucifera",
    "white lily",
    "lotus"
  ],
  [
    "marauder",
    "vulture",
    "predatory animal",
    "predator"
  ],
  [
    "electrical storm",
    "electric storm",
    "thunderstorm"
  ],
  [
    "chute",
    "sky dive",
    "parachute"
  ],
  [
    "helianthus",
    "sunflower"
  ],
  [
    "frame",
    "underframe",
    "skeleton"
  ],
  [
    "forthcoming",
    "prospective",
    "proximo",
    "ulterior",
    "succeeding",
    "hereafter",
    "approaching",
    "rising",
    "futurity",
    "emerging",
    "next",
    "early",
    "upcoming",
    "later",
    "future tense",
    "future day",
    "time to come",
    "prox",
    "future"
  ],
  [
    "bluster",
    "tout",
    "swash",
    "boast",
    "throttle",
    "vaunt",
    "gun",
    "brag",
    "accelerator",
    "flatulence",
    "gasoline",
    "petrol",
    "gasolene",
    "flatulency",
    "accelerator pedal",
    "natural gas",
    "gas pedal",
    "shoot a line",
    "blow",
    "gasconade",
    "gas"
  ],
  [
    "indulgent",
    "mirthful",
    "cheerful",
    "queer",
    "joyous",
    "brave",
    "jocund",
    "merry",
    "jolly",
    "homophile",
    "homosexual",
    "homo",
    "colorful",
    "festal",
    "cheery",
    "braw",
    "festive",
    "gala",
    "jovial",
    "sunny",
    "gay"
  ],
  [
    "impasse",
    "stalemate",
    "standstill",
    "deadlock"
  ],
  [
    "forgetful person",
    "scatterbrain"
  ],
  [
    "lepidium sativum",
    "clover fern",
    "common garden cress",
    "pepper grass",
    "garden pepper cress",
    "pepperwort"
  ],
  [
    "tease",
    "badger",
    "harass",
    "pester",
    "beleaguer",
    "intercept",
    "glitch",
    "hemipteran",
    "microbe",
    "wiretap",
    "hemipterous insect",
    "hemipteron",
    "germ",
    "tap",
    "bug"
  ],
  [
    "imploring",
    "appealing",
    "beseeching",
    "pleading",
    "importunate"
  ],
  [
    "strike",
    "slew",
    "spate",
    "mass",
    "pile",
    "deal",
    "batch",
    "peck",
    "sight",
    "mess",
    "heap",
    "wad",
    "pot",
    "flock",
    "stack",
    "lot",
    "raft",
    "plenty",
    "great deal",
    "whole slew",
    "coin",
    "good deal",
    "whole lot",
    "hatful",
    "quite a little",
    "mint candy",
    "tidy sum",
    "mickle",
    "muckle",
    "mint"
  ],
  [
    "valerian"
  ],
  [
    "marjoram",
    "wild marjoram",
    "pot marjoram",
    "origanum vulgare",
    "winter sweet",
    "oregano"
  ],
  [
    "belemnite"
  ],
  [
    "dowery",
    "dower",
    "dowry"
  ],
  [
    "engender",
    "breed",
    "spawn"
  ],
  [
    "hard roe",
    "roe"
  ],
  [
    "sparkplug"
  ],
  [
    "perpetual",
    "incessant",
    "constant",
    "continual",
    "unceasing",
    "consecutive",
    "endless",
    "ceaseless",
    "unremitting",
    "straight",
    "sustained",
    "uninterrupted",
    "persisting",
    "dogging",
    "never-ending",
    "nonstop",
    "round-the-clock",
    "around-the-clock",
    "day-and-night",
    "free burning",
    "continuous"
  ],
  [
    "slag",
    "dross",
    "scoria"
  ],
  [
    "fiend",
    "passionate",
    "fanatical",
    "rabid",
    "overzealous",
    "fanatic"
  ],
  [
    "sledge",
    "sled",
    "sleigh"
  ],
  [
    "apotheosis",
    "paragon",
    "nonpareil",
    "angel",
    "beatify",
    "enshrine",
    "nonesuch",
    "nonsuch",
    "canonize",
    "holy man",
    "holy person",
    "ideal",
    "saint"
  ],
  [
    "wire",
    "telegram"
  ],
  [
    "arbor",
    "spindle",
    "mandril",
    "mandrel"
  ],
  [
    "strawberry guava",
    "psidium guajava",
    "guava bush",
    "true guava",
    "yellow cattley guava",
    "psidium littorale",
    "guava"
  ],
  [
    "aubergine",
    "brinjal",
    "mad apple",
    "garden egg",
    "eggplant bush",
    "solanum melongena",
    "eggplant"
  ],
  [
    "doughnut",
    "sinker",
    "donut"
  ],
  [
    "suffrage",
    "balloting",
    "ballot",
    "voting",
    "voter turnout",
    "right to vote",
    "vote"
  ],
  [
    "byte"
  ],
  [
    "virtually",
    "near",
    "well-nigh",
    "some",
    "nearly",
    "all but",
    "just about",
    "almost",
    "roughly",
    "astir",
    "most",
    "around",
    "more or less",
    "approximately",
    "or so",
    "close to",
    "nigh",
    "about"
  ],
  [
    "vexation",
    "vexatious",
    "vexing",
    "galling",
    "teasing",
    "irritation",
    "annoyance",
    "nettlesome",
    "pesky",
    "pestiferous",
    "bothersome",
    "troubling",
    "disagreeable",
    "plaguy",
    "pestering",
    "irritating",
    "plaguey",
    "annoying"
  ],
  [
    "conflict",
    "challenge",
    "gainsay",
    "quarrel",
    "argufy",
    "difference",
    "contravention",
    "altercate",
    "difference of opinion",
    "dispute"
  ],
  [
    "discourse",
    "word",
    "treatment",
    "give-and-take",
    "discussion"
  ],
  [
    "mass",
    "intensity",
    "book",
    "bulk",
    "loudness",
    "volume"
  ],
  [
    "core",
    "core group",
    "cell nucleus",
    "nucleus"
  ],
  [
    "quite",
    "instead",
    "sort of",
    "kind of",
    "kinda",
    "sooner",
    "preferably",
    "rather"
  ],
  [
    "dimple"
  ],
  [
    "erratic",
    "uncertain",
    "treacherous",
    "fallible",
    "temperamental",
    "dangerous",
    "unsafe",
    "unsound",
    "irresponsible",
    "undependable",
    "untrustworthy",
    "untrusty",
    "unreliable"
  ],
  [
    "cecum",
    "blind gut",
    "caecum"
  ],
  [
    "line of longitude",
    "meridian",
    "longitude"
  ],
  [
    "parallel",
    "parallel of latitude",
    "line of latitude",
    "latitude"
  ],
  [
    "play",
    "dramatic event",
    "drama"
  ],
  [
    "heritage",
    "inheritance"
  ],
  [
    "aspic"
  ],
  [
    "wagtail"
  ],
  [
    "fraudster"
  ],
  [
    "charr"
  ],
  [
    "remuneration",
    "wage",
    "earnings",
    "pay",
    "salary"
  ],
  [
    "ar"
  ],
  [
    "bullroarer"
  ],
  [
    "volition",
    "bequeath",
    "shall",
    "testament",
    "leave",
    "wish",
    "will"
  ],
  [
    "inept",
    "maladroit",
    "impolitic",
    "undiplomatic",
    "untactful",
    "tactless"
  ],
  [
    "solitary",
    "remote",
    "deserted",
    "unreachable",
    "unprocurable",
    "unavailable",
    "untouchable",
    "unfrequented",
    "unobtainable",
    "unaccessible",
    "untrodden",
    "unapproachable",
    "untrod",
    "pathless",
    "trackless",
    "roadless",
    "unreached",
    "untracked",
    "un-come-at-able",
    "ungetatable",
    "inaccessible"
  ],
  [
    "foreleg"
  ],
  [
    "flat",
    "apartment"
  ],
  [
    "issue",
    "effect",
    "outcome",
    "result",
    "aftermath",
    "upshot",
    "import",
    "moment",
    "consequence"
  ],
  [
    "coil",
    "whorl",
    "gyrate",
    "coiled",
    "helix",
    "volute",
    "turbinate",
    "helical",
    "spiraling",
    "voluted",
    "coiling",
    "corkscrew",
    "whorled",
    "spiral"
  ],
  [
    "tendril"
  ],
  [
    "water",
    "piddle",
    "piss",
    "weewee",
    "pee",
    "urine"
  ],
  [
    "monastic",
    "monk"
  ],
  [
    "conundrum",
    "screen",
    "brain-teaser",
    "enigma",
    "riddle"
  ],
  [
    "tender",
    "delicate",
    "sensible",
    "sore",
    "erogenous",
    "painful",
    "touchy",
    "irritable",
    "reactive",
    "nociceptive",
    "huffy",
    "thin-skinned",
    "classified",
    "responsive",
    "excitable",
    "photosensitive",
    "oversensitive",
    "highly sensitive",
    "radiosensitive",
    "light-sensitive",
    "sensitive"
  ],
  [
    "black maria",
    "hearts"
  ],
  [
    "rhomb",
    "rhombus"
  ],
  [
    "barberry"
  ],
  [
    "kettle",
    "eardrum",
    "timpani",
    "kettledrum",
    "tympanic membrane",
    "tympani",
    "middle ear",
    "tympanic cavity",
    "tympanum"
  ],
  [
    "hemorrhoids"
  ],
  [
    "old",
    "sundown",
    "sunset"
  ],
  [
    "company",
    "political party",
    "party"
  ],
  [
    "soiree"
  ],
  [
    "indifferent",
    "torpid",
    "sluggish",
    "unmoving",
    "inactive",
    "neutral",
    "unreactive",
    "nonmoving",
    "inert"
  ],
  [
    "supine",
    "peaceful",
    "inactive",
    "resistless",
    "nonviolent",
    "unresisting",
    "passive voice",
    "passive"
  ],
  [
    "cap",
    "ceiling"
  ],
  [
    "yes"
  ],
  [
    "covetous",
    "desirous",
    "distrustful",
    "envious",
    "green-eyed",
    "overjealous",
    "jealous"
  ],
  [
    "avocation",
    "sideline",
    "hobbyhorse",
    "rocking horse",
    "cockhorse",
    "by-line",
    "spare-time activity",
    "stick horse",
    "falco subbuteo",
    "hobby"
  ],
  [
    "outbuilding"
  ],
  [
    "charming",
    "legerdemain",
    "deception",
    "illusion",
    "supernatural",
    "wizard",
    "magical",
    "trick",
    "sorcerous",
    "witching",
    "magic trick",
    "conjuring trick",
    "wizardly",
    "magic"
  ],
  [
    "tool",
    "creature",
    "marionette",
    "puppet"
  ],
  [
    "stingray"
  ],
  [
    "fancy",
    "soma",
    "project",
    "shape",
    "form",
    "physique",
    "see",
    "build",
    "frame",
    "reckon",
    "cipher",
    "flesh",
    "image",
    "pattern",
    "design",
    "picture",
    "chassis",
    "trope",
    "envision",
    "name",
    "forecast",
    "cypher",
    "figure of speech",
    "anatomy",
    "estimate",
    "fig",
    "calculate",
    "visualize",
    "bod",
    "number",
    "compute",
    "count on",
    "material body",
    "decimal digit",
    "physical body",
    "enter",
    "human body",
    "figure"
  ],
  [
    "height",
    "stature"
  ],
  [
    "base",
    "stand",
    "plinth",
    "footstall",
    "pedestal"
  ],
  [
    "powderlike"
  ],
  [
    "proud",
    "chesty",
    "self-important",
    "arrogant"
  ],
  [
    "chromatic",
    "orangish",
    "orangeness",
    "orange tree",
    "colored",
    "orange"
  ],
  [
    "harmonize",
    "chord"
  ],
  [
    "hypotenuse"
  ],
  [
    "kindergarten"
  ],
  [
    "mother country",
    "fatherland",
    "country of origin",
    "native land",
    "homeland",
    "motherland"
  ],
  [
    "grandchild"
  ],
  [
    "goddess"
  ],
  [
    "children"
  ],
  [
    "community",
    "professing",
    "profession"
  ],
  [
    "abstemious",
    "abstentious",
    "abstainer",
    "abstinent"
  ],
  [
    "grandparent"
  ],
  [
    "loss leader",
    "drawing card",
    "leader"
  ],
  [
    "prince"
  ],
  [
    "deity",
    "divinity",
    "idol",
    "supreme being",
    "immortal",
    "graven image",
    "god"
  ],
  [
    "princess"
  ],
  [
    "sib",
    "sibling"
  ],
  [
    "acedia",
    "slothfulness",
    "laziness",
    "tree sloth",
    "sloth"
  ],
  [
    "virtuous",
    "pure",
    "chaste",
    "new",
    "vestal",
    "virginal",
    "virgin"
  ],
  [
    "little",
    "junior",
    "younger"
  ],
  [
    "fellow",
    "baby",
    "sis",
    "brother",
    "sister"
  ],
  [
    "line",
    "strive",
    "form",
    "reach",
    "stock",
    "distort",
    "tense",
    "variety",
    "air",
    "stress",
    "tenor",
    "extend",
    "sieve",
    "breed",
    "straining",
    "filter",
    "try",
    "variant",
    "tune",
    "nisus",
    "deform",
    "sift",
    "striving",
    "song",
    "tense up",
    "puree",
    "melodic line",
    "melodic phrase",
    "filtrate",
    "pains",
    "filter out",
    "separate out",
    "mental strain",
    "nervous strain",
    "melody",
    "strain"
  ],
  [
    "collateral",
    "analog",
    "synchronic",
    "synchronous",
    "duplicate",
    "latitude",
    "twin",
    "analogue",
    "synchronal",
    "collimate",
    "in parallel",
    "antiparallel",
    "parallel of latitude",
    "nonintersecting",
    "line of latitude",
    "nonconvergent",
    "parallel"
  ],
  [
    "concubine",
    "courtesan",
    "odalisque",
    "doxy",
    "fancy man",
    "paramour"
  ],
  [
    "cross"
  ],
  [
    "undercooked"
  ],
  [
    "honeymooner",
    "newlywed"
  ],
  [
    "fast",
    "fleet",
    "western fence lizard",
    "blue-belly",
    "jonathan swift",
    "sceloporus occidentalis",
    "swift"
  ],
  [
    "noble",
    "revered",
    "grand",
    "aug",
    "honorable",
    "honourable",
    "lordly",
    "venerable",
    "august"
  ],
  [
    "sure",
    "surely",
    "sure enough",
    "sure as shooting",
    "for sure",
    "for certain",
    "certainly"
  ],
  [
    "suck",
    "suckle",
    "nurse",
    "lactate",
    "breastfeed",
    "give suck",
    "wetnurse"
  ],
  [
    "stepmother"
  ],
  [
    "little",
    "small",
    "overshadow",
    "midget",
    "gnome",
    "dwarfish",
    "shadow",
    "dwarf"
  ],
  [
    "horde",
    "emcee",
    "master of ceremonies",
    "innkeeper",
    "legion",
    "server",
    "host"
  ],
  [
    "nonetheless",
    "notwithstanding",
    "withal",
    "however",
    "yet",
    "even so",
    "all the same",
    "still",
    "nevertheless"
  ],
  [
    "cousin-german",
    "first cousin",
    "full cousin",
    "cousin"
  ],
  [
    "vapor",
    "evaporation",
    "vaporization",
    "vaporisation",
    "vapour"
  ],
  [
    "wind",
    "fart",
    "farting",
    "breaking wind",
    "flatus"
  ],
  [
    "pagan",
    "infidel",
    "irreligious",
    "heathenish",
    "gentile",
    "heathen"
  ],
  [
    "infidel",
    "irreligious",
    "heathenish",
    "gentile",
    "heathen",
    "pagan"
  ],
  [
    "humblebee",
    "bumblebee"
  ],
  [
    "mantid",
    "mantis"
  ],
  [
    "leonurus cardiaca",
    "motherwort"
  ],
  [
    "ambrosia",
    "nectar"
  ],
  [
    "dame",
    "madam",
    "peeress",
    "gentlewoman",
    "noblewoman",
    "madame",
    "lady"
  ],
  [
    "footwear"
  ],
  [
    "ni",
    "priced",
    "atomic number 28",
    "nickel"
  ],
  [
    "atomic number 30",
    "zn",
    "zinc"
  ],
  [
    "searching",
    "hunt",
    "search",
    "hunting"
  ],
  [
    "machine",
    "car",
    "auto",
    "motorcar",
    "automobile"
  ],
  [
    "cardinal",
    "meg",
    "one thousand thousand",
    "1000000",
    "a million",
    "million"
  ],
  [
    "gage",
    "pot",
    "weed",
    "grass",
    "sess",
    "dope",
    "mary jane",
    "hemp",
    "ganja",
    "marijuana",
    "marihuana",
    "sens",
    "skunk",
    "smoke",
    "cannabis"
  ],
  [
    "car",
    "railroad car",
    "railway car",
    "railcar"
  ],
  [
    "plane",
    "aeroplane",
    "airplane"
  ],
  [
    "unusual",
    "singular",
    "unparalleled",
    "alone",
    "incomparable",
    "uncomparable",
    "unequaled",
    "unequalled",
    "unique"
  ],
  [
    "noontide",
    "high noon",
    "noonday",
    "twelve noon",
    "noon",
    "midday"
  ],
  [
    "fetters"
  ],
  [
    "pair of scissors",
    "scissors"
  ],
  [
    "tentacle"
  ],
  [
    "articulate",
    "collective",
    "juncture",
    "stick",
    "articulation",
    "cooperative",
    "associated",
    "bilateral",
    "shared",
    "concerted",
    "clannish",
    "conjunct",
    "reefer",
    "combined",
    "conjoined",
    "join",
    "corporate",
    "two-sided",
    "roast",
    "conjunctive",
    "conjoint",
    "sharing",
    "cosignatory",
    "articulatio",
    "junction",
    "marijuana cigarette",
    "united",
    "joint"
  ],
  [
    "joint",
    "juncture",
    "join",
    "articulatio",
    "junction",
    "voice",
    "articulation"
  ],
  [
    "pass",
    "drop",
    "lapse",
    "settle",
    "slump",
    "bury",
    "dip",
    "sump",
    "cesspool",
    "go down",
    "go under",
    "fall off",
    "drop down",
    "cesspit",
    "slide down",
    "sink"
  ],
  [
    "strike",
    "solicit",
    "bug",
    "exploit",
    "rap",
    "pat",
    "pink",
    "knock",
    "dab",
    "intercept",
    "spigot",
    "beg",
    "hydrant",
    "wiretap",
    "tapdance",
    "water tap",
    "water faucet",
    "tap"
  ],
  [
    "faucet"
  ],
  [
    "work",
    "direct",
    "cover",
    "handle",
    "deal",
    "speech",
    "accost",
    "treat",
    "savoir-faire",
    "plow",
    "speak to",
    "speak",
    "destination",
    "turn to",
    "computer address",
    "come up to",
    "name and address",
    "address"
  ],
  [
    "sweets"
  ],
  [
    "glaze",
    "sugarcoat",
    "candy"
  ],
  [
    "lozenge",
    "tablet",
    "oral contraceptive",
    "birth control pill",
    "contraceptive pill",
    "oral contraceptive pill",
    "anovulatory drug",
    "pill"
  ],
  [
    "touch",
    "peer",
    "fit",
    "check",
    "jibe",
    "mate",
    "compeer",
    "oppose",
    "meet",
    "catch",
    "tally",
    "couple",
    "lucifer",
    "rival",
    "pair",
    "twin",
    "equal",
    "correspond",
    "agree",
    "friction match",
    "cope with",
    "gibe",
    "mates",
    "pit",
    "match"
  ],
  [
    "rubeola",
    "morbilli",
    "measles"
  ],
  [
    "woad"
  ],
  [
    "samsara"
  ],
  [
    "pastinaca sativa",
    "parsnip"
  ],
  [
    "petroselinum crispum",
    "parsley"
  ],
  [
    "tailor",
    "shoehorn"
  ],
  [
    "fireworks"
  ],
  [
    "client",
    "knob",
    "lymph node",
    "lymph gland",
    "guest",
    "node"
  ],
  [
    "lair",
    "hideout",
    "hideaway",
    "den"
  ],
  [
    "catamaran"
  ],
  [
    "butterflyfish"
  ],
  [
    "necropolis",
    "graveyard",
    "burying ground",
    "burial site",
    "burial ground",
    "cemetery"
  ],
  [
    "measure",
    "amount",
    "quantum",
    "quantity"
  ],
  [
    "syllable"
  ],
  [
    "bloodshed",
    "bloodbath",
    "battue",
    "bloodletting"
  ],
  [
    "asperity",
    "adversity",
    "rigour",
    "severity",
    "grimness",
    "rigorousness",
    "rigor",
    "hardship"
  ],
  [
    "prepuce",
    "foreskin"
  ],
  [
    "tailbone"
  ],
  [
    "afterbirth"
  ],
  [
    "placenta"
  ],
  [
    "windowsill"
  ],
  [
    "shoe",
    "u-shaped plate",
    "horseshoe"
  ],
  [
    "devotee",
    "buff",
    "afficionado",
    "winnow",
    "lover",
    "strike out",
    "sports fan",
    "fan"
  ],
  [
    "florence nightingale",
    "luscinia megarhynchos",
    "nightingale"
  ],
  [
    "snowbird",
    "turdus pilaris",
    "fieldfare"
  ],
  [
    "swindle",
    "castle",
    "con",
    "diddle",
    "nobble",
    "mulct",
    "bunco",
    "gyp",
    "defraud",
    "corvus frugilegus",
    "rook"
  ],
  [
    "carduelis spinus",
    "siskin"
  ],
  [
    "breaststroke"
  ],
  [
    "corncrake"
  ],
  [
    "ruffle",
    "trump",
    "choker",
    "trumping",
    "philomachus pugnax",
    "neck ruff",
    "ruff"
  ],
  [
    "atomic number 78",
    "pt",
    "platinum"
  ],
  [
    "capricious",
    "dynamic",
    "arbitrary",
    "impetuous",
    "whimsical",
    "spontaneous",
    "incautious",
    "hotheaded",
    "madcap",
    "dynamical",
    "unprompted",
    "driving",
    "unpremeditated",
    "brainish",
    "self-generated",
    "tearaway",
    "impulsive"
  ],
  [
    "ide"
  ],
  [
    "word",
    "parole",
    "watchword",
    "countersign",
    "password"
  ],
  [
    "headstone",
    "keystone"
  ],
  [
    "incendiary",
    "arsonist",
    "firebug"
  ],
  [
    "mine"
  ],
  [
    "get",
    "might",
    "crataegus oxycantha",
    "crataegus laevigata",
    "english hawthorn",
    "can",
    "whitethorn",
    "may"
  ],
  [
    "touch",
    "key signature",
    "theme song",
    "signature tune",
    "signature"
  ],
  [
    "reckoner",
    "calculator",
    "estimator",
    "figurer",
    "electronic computer",
    "information processing system",
    "data processor",
    "computer"
  ],
  [
    "trait"
  ],
  [
    "thurible",
    "censer"
  ],
  [
    "violin bow",
    "fiddlestick"
  ],
  [
    "cascade",
    "falls",
    "waterfall",
    "cataract"
  ],
  [
    "point",
    "level",
    "stage",
    "grade",
    "arcdegree",
    "academic degree",
    "degree"
  ],
  [
    "foundation",
    "creation",
    "initiation",
    "instauration",
    "origination",
    "founding",
    "establishment",
    "institution"
  ],
  [
    "isthmus"
  ],
  [
    "true",
    "authentic",
    "sure",
    "dependable",
    "honest",
    "trustworthy",
    "straight",
    "faithful",
    "undeviating",
    "trusty",
    "tested",
    "time-tested",
    "tried",
    "tried and true",
    "certain",
    "reliable"
  ],
  [
    "reliable",
    "authentic",
    "sure",
    "dependable",
    "honest",
    "faithful",
    "responsible",
    "fiducial",
    "creditworthy",
    "trusty",
    "trusted",
    "trustworthy"
  ],
  [
    "take",
    "flick",
    "picture",
    "shoot",
    "celluloid",
    "cinema",
    "movie",
    "motion picture",
    "moving picture",
    "picture show",
    "photographic film",
    "plastic film",
    "film"
  ],
  [
    "flick",
    "picture",
    "film",
    "motion picture",
    "moving picture",
    "picture show",
    "movie"
  ],
  [
    "edge",
    "limit",
    "bound",
    "bounds",
    "boundary"
  ],
  [
    "byzantine",
    "intricate",
    "convoluted",
    "tortuous",
    "compound",
    "labyrinthine",
    "composite",
    "multiplex",
    "tangled",
    "involved",
    "labyrinthian",
    "complicated",
    "interlinking",
    "gordian",
    "knotty",
    "interlacing",
    "thickening",
    "mazy",
    "interlocking",
    "analyzable",
    "decomposable",
    "building complex",
    "coordination compound",
    "colonial",
    "interwoven",
    "complex"
  ],
  [
    "complex",
    "complicated"
  ],
  [
    "calendar"
  ],
  [
    "falsified"
  ],
  [
    "faux",
    "sham",
    "counterfeit",
    "pretender",
    "fraud",
    "forge",
    "phony",
    "unreal",
    "artificial",
    "impostor",
    "pseud",
    "wangle",
    "bogus",
    "manipulate",
    "false",
    "falsify",
    "imposter",
    "pseudo",
    "imitation",
    "simulated",
    "fudge",
    "imitative",
    "postiche",
    "bull",
    "phoney",
    "misrepresent",
    "role player",
    "faker",
    "cook",
    "waffle",
    "fake"
  ],
  [
    "cathartic",
    "physic",
    "aperient",
    "evacuant",
    "laxative",
    "purgative"
  ],
  [
    "cinch",
    "girt",
    "gird",
    "begird",
    "girth"
  ],
  [
    "redolence",
    "fragrance",
    "posy",
    "corsage",
    "nosegay",
    "sweetness",
    "bouquet"
  ],
  [
    "den",
    "lair"
  ],
  [
    "barebacked",
    "unsaddled",
    "bareback"
  ],
  [
    "howitzer",
    "trench mortar",
    "mortar"
  ],
  [
    "bobbin",
    "reel",
    "spool"
  ],
  [
    "spark",
    "activate",
    "trip",
    "induction",
    "initiation",
    "actuate",
    "set off",
    "spark off",
    "touch off",
    "gun trigger",
    "trigger off",
    "trigger"
  ],
  [
    "dead",
    "short",
    "abruptly",
    "all of a sudden",
    "on the spur of the moment",
    "of a sudden",
    "suddenly"
  ],
  [
    "australian aborigine",
    "abo",
    "aboriginal",
    "native australian",
    "aborigine"
  ],
  [
    "convert",
    "play",
    "twist",
    "bit",
    "act",
    "release",
    "round",
    "bend",
    "sour",
    "routine",
    "spell",
    "convince",
    "grow",
    "crook",
    "reverse",
    "plow",
    "wrick",
    "turning",
    "ferment",
    "become",
    "tour",
    "win over",
    "turn into",
    "number",
    "plough",
    "good turn",
    "turn over",
    "turn of events",
    "sprain",
    "rick",
    "turn to",
    "go",
    "move around",
    "change by reversal",
    "change state",
    "bout",
    "wrench",
    "turn"
  ],
  [
    "push",
    "clit",
    "clitoris",
    "push button",
    "button"
  ],
  [
    "slew",
    "spate",
    "mass",
    "pile",
    "deal",
    "mint",
    "batch",
    "peck",
    "sight",
    "mess",
    "heap",
    "wad",
    "pot",
    "flock",
    "stack",
    "lot",
    "plenty",
    "great deal",
    "whole slew",
    "good deal",
    "whole lot",
    "hatful",
    "quite a little",
    "tidy sum",
    "mickle",
    "muckle",
    "raft"
  ],
  [
    "unskilled",
    "butcherly",
    "botchy",
    "unskillful"
  ],
  [
    "dull",
    "inert",
    "torpid",
    "slow",
    "inactive",
    "sluggish"
  ],
  [
    "chamomile",
    "anthemis nobilis",
    "chamaemelum nobilis",
    "camomile"
  ],
  [
    "awn"
  ],
  [
    "fishbone"
  ],
  [
    "subordinate",
    "adjunct",
    "supporter",
    "low-level",
    "help",
    "helper",
    "assistant"
  ],
  [
    "gnawer",
    "gnawing animal",
    "rodent"
  ],
  [
    "profiteer"
  ],
  [
    "galloon"
  ],
  [
    "exhibit",
    "demonstrate",
    "stride",
    "process",
    "parade",
    "marching",
    "master of architecture",
    "marching music",
    "mar",
    "march"
  ],
  [
    "millrace"
  ],
  [
    "sourdough"
  ],
  [
    "common",
    "predominant",
    "steady",
    "regular",
    "patronize",
    "prevailing",
    "sponsor",
    "shop",
    "shop at",
    "buy at",
    "frequent"
  ],
  [
    "persimmon tree",
    "persimmon"
  ],
  [
    "illustrious",
    "notable",
    "renowned",
    "noted",
    "celebrated",
    "known",
    "famed",
    "far-famed",
    "famous"
  ],
  [
    "afterworld"
  ],
  [
    "fleece",
    "woollen",
    "woolen",
    "wool"
  ],
  [
    "narrative",
    "thread",
    "recital",
    "tale",
    "story",
    "narration",
    "yarn"
  ],
  [
    "mean",
    "close",
    "meager",
    "penurious",
    "little",
    "miserly",
    "tight",
    "small",
    "grudging",
    "near",
    "chintzy",
    "niggardly",
    "ungenerous",
    "parsimonious",
    "mingy",
    "cheap",
    "selfish",
    "scrimy",
    "tightfisted",
    "chinchy",
    "closefisted",
    "scrimpy",
    "beggarly",
    "hardfisted",
    "cheeseparing",
    "penny-pinching",
    "stingy"
  ],
  [
    "duffer"
  ],
  [
    "ananas",
    "ananas comosus",
    "pineapple plant",
    "pineapple"
  ],
  [
    "possum",
    "phalanger",
    "opossum"
  ],
  [
    "coon cat",
    "coati-mundi",
    "coati-mondi",
    "nasua narica",
    "coati"
  ],
  [
    "honey bear",
    "potos caudivolvulus",
    "perodicticus potto",
    "potos flavus",
    "potto",
    "kinkajou"
  ],
  [
    "pangolin",
    "aardvark",
    "numbat",
    "ant bear",
    "scaly anteater",
    "spiny anteater",
    "banded anteater",
    "new world anteater",
    "echidna",
    "myrmecobius fasciatus",
    "orycteropus afer",
    "anteater"
  ],
  [
    "taira",
    "eira barbara",
    "tayra"
  ],
  [
    "tapir"
  ],
  [
    "wombat"
  ],
  [
    "native bear",
    "koala bear",
    "kangaroo bear",
    "phascolarctos cinereus",
    "koala"
  ],
  [
    "swish",
    "circuit",
    "circle",
    "lick",
    "overlap",
    "lap up",
    "swosh",
    "lap covering",
    "lap"
  ],
  [
    "enticement",
    "temptation"
  ],
  [
    "light",
    "glint",
    "discharge",
    "activate",
    "trip",
    "flicker",
    "sparkle",
    "actuate",
    "set off",
    "spark off",
    "electric discharge",
    "touch off",
    "electric arc",
    "trigger off",
    "arc",
    "trigger",
    "spark"
  ],
  [
    "once",
    "when"
  ],
  [
    "clavicle",
    "collarbone"
  ],
  [
    "patter",
    "spatter",
    "sprinkle",
    "tongue",
    "spue",
    "pitter-patter",
    "spit out",
    "ptyalize",
    "skewer",
    "expectoration",
    "spitting",
    "saliva",
    "spew",
    "spittle",
    "spit"
  ],
  [
    "electromagnetic unit",
    "dromaius novaehollandiae",
    "emu novaehollandiae",
    "emu"
  ],
  [
    "channel",
    "reference",
    "root",
    "seed",
    "author",
    "beginning",
    "generator",
    "informant",
    "germ",
    "origin",
    "source"
  ],
  [
    "cardinal",
    "septet",
    "heptad",
    "vii",
    "7",
    "sevener",
    "seven"
  ],
  [
    "porcelain"
  ],
  [
    "anvil",
    "incus"
  ],
  [
    "strawberry mark",
    "hemangioma simplex",
    "strawberry"
  ],
  [
    "cowry",
    "cowrie"
  ],
  [
    "throw",
    "fondle",
    "apoplexy",
    "shot",
    "slash",
    "stroking",
    "solidus",
    "separatrix",
    "virgule",
    "cerebrovascular accident",
    "cam stroke",
    "cva",
    "diagonal",
    "stroke"
  ],
  [
    "stroke",
    "cerebrovascular accident",
    "cva",
    "apoplexy"
  ],
  [
    "paladin",
    "friend",
    "supporter",
    "protagonist",
    "best",
    "defend",
    "champ",
    "booster",
    "fighter",
    "admirer",
    "prizewinning",
    "title-holder",
    "hero",
    "superior",
    "champion"
  ],
  [
    "achiever",
    "success",
    "victor",
    "winner"
  ],
  [
    "co",
    "atomic number 27",
    "cobalt"
  ],
  [
    "hammer",
    "malleus"
  ],
  [
    "dirty",
    "raw",
    "foul",
    "partial",
    "unjust",
    "slanted",
    "biased",
    "one-sided",
    "unsporting",
    "unsportsmanlike",
    "colored",
    "unfair"
  ],
  [
    "wakeful",
    "open-eyed",
    "watchful",
    "alert",
    "argus-eyed",
    "vigilant"
  ],
  [
    "amulet",
    "talisman"
  ],
  [
    "flattery"
  ],
  [
    "clutch",
    "hold",
    "clench",
    "grip",
    "clutches",
    "brooch",
    "buckle",
    "grasp",
    "clasp"
  ],
  [
    "heave",
    "clasp",
    "warp",
    "crumple",
    "buckle"
  ],
  [
    "condensation",
    "abridgment",
    "abridgement",
    "ejection seat",
    "space capsule",
    "ejector seat",
    "capsule"
  ],
  [
    "cooked",
    "roast",
    "roasted"
  ],
  [
    "pieplant",
    "rhubarb plant",
    "rhubarb"
  ],
  [
    "splinter",
    "shaving",
    "paring",
    "flinders",
    "sliver"
  ],
  [
    "scented fern",
    "golden buttons",
    "tanacetum vulgare",
    "tansy"
  ],
  [
    "past",
    "before",
    "early",
    "originally",
    "sooner",
    "to begin with",
    "earliest",
    "in the first place",
    "in the beginning",
    "earlier"
  ],
  [
    "eve",
    "eventide",
    "evening"
  ],
  [
    "gay",
    "queer",
    "sapphic",
    "butch",
    "pederastic",
    "homo",
    "paederastic",
    "homoerotic",
    "transvestic",
    "tribadistic",
    "lesbian",
    "homosexual"
  ],
  [
    "leery",
    "wary",
    "queer",
    "distrustful",
    "funny",
    "shady",
    "questionable",
    "mistrustful",
    "untrusting",
    "fishy",
    "suspect",
    "suspicious"
  ],
  [
    "dubious",
    "equivocal",
    "queer",
    "problematic",
    "suspicious",
    "funny",
    "shady",
    "doubtful",
    "dubitable",
    "debatable",
    "supposed",
    "problematical",
    "refutable",
    "impugnable",
    "fishy",
    "so-called",
    "self-styled",
    "deniable",
    "apocryphal",
    "suspect",
    "questionable"
  ],
  [
    "unfortunate",
    "doomed",
    "ill-fated",
    "ill-starred",
    "hexed",
    "luckless",
    "ill-omened",
    "jinxed",
    "unlucky"
  ],
  [
    "clubrush"
  ],
  [
    "conspicuous",
    "broad",
    "strong",
    "evident",
    "discernible",
    "obtrusive",
    "perceptible",
    "noted",
    "pronounced",
    "marked",
    "observable",
    "detectable",
    "noticeable"
  ],
  [
    "cloak",
    "masquerade",
    "masque",
    "dissemble",
    "block out",
    "mask"
  ],
  [
    "full",
    "unit",
    "all",
    "total",
    "wholly",
    "intact",
    "totally",
    "healthy",
    "altogether",
    "entirely",
    "entire",
    "completely",
    "undivided",
    "livelong",
    "full-length",
    "full-page",
    "whole thing",
    "hale",
    "integral",
    "whole"
  ],
  [
    "tense",
    "drawn",
    "tight",
    "taut"
  ],
  [
    "definition"
  ],
  [
    "sham",
    "pretender",
    "impostor",
    "pseud",
    "fake",
    "hoax",
    "imposter",
    "pseudo",
    "dupery",
    "put-on",
    "fraudulence",
    "role player",
    "faker",
    "fraud"
  ],
  [
    "beat",
    "swindle",
    "chicane",
    "deceiver",
    "screw",
    "betray",
    "chouse",
    "trickster",
    "cuckold",
    "tare",
    "cheating",
    "rip off",
    "jockey",
    "cheater",
    "cheat on",
    "darnel",
    "sell short",
    "bearded darnel",
    "lolium temulentum",
    "bromus secalinus",
    "chess",
    "shaft",
    "wander",
    "cheat"
  ],
  [
    "sling",
    "catapult",
    "slingshot"
  ],
  [
    "roll",
    "gyration",
    "rotation",
    "revolution"
  ],
  [
    "supporter",
    "sponsor",
    "attender",
    "frequenter",
    "patronne",
    "patron"
  ],
  [
    "defender",
    "guardian",
    "protector"
  ],
  [
    "treeless",
    "unwooded",
    "unforested"
  ],
  [
    "sorrowful",
    "mournful",
    "plaintive"
  ],
  [
    "fringe",
    "outer boundary",
    "periphery"
  ],
  [
    "pellicle"
  ],
  [
    "clit",
    "button",
    "clitoris"
  ],
  [
    "significant",
    "cardinal",
    "fundamental",
    "important",
    "operative",
    "identify",
    "describe",
    "primal",
    "distinguish",
    "name",
    "tonality",
    "of import",
    "cay",
    "winder",
    "kilo",
    "kilogram",
    "key out",
    "central",
    "discover",
    "florida keys",
    "kg",
    "key"
  ],
  [
    "obstruction",
    "obstacle"
  ],
  [
    "separator",
    "extractor",
    "centrifugate",
    "centrifuge"
  ],
  [
    "chromatic",
    "lavender",
    "colored",
    "lilac"
  ],
  [
    "totter",
    "teeterboard",
    "teeter-toter",
    "teeter",
    "seesaw"
  ],
  [
    "wishing bone",
    "wishbone"
  ],
  [
    "merrythought"
  ],
  [
    "sternum",
    "breastbone"
  ],
  [
    "refuge",
    "prophylactic",
    "bingle",
    "rubber",
    "condom",
    "base hit",
    "guard",
    "safe",
    "safety"
  ],
  [
    "old",
    "former",
    "late",
    "premature",
    "previous"
  ],
  [
    "copiousness",
    "abundance"
  ],
  [
    "petrel"
  ],
  [
    "hardworking"
  ],
  [
    "arduous",
    "heavy",
    "hard",
    "grueling",
    "effortful",
    "gruelling",
    "toilsome",
    "punishing",
    "labourious",
    "backbreaking",
    "laborious"
  ],
  [
    "loon",
    "underwater diver",
    "frogman",
    "diver"
  ],
  [
    "genus ranunculus",
    "ranunculus"
  ],
  [
    "vantage",
    "advantage"
  ],
  [
    "aroused",
    "strain",
    "taut",
    "restive",
    "jittery",
    "strained",
    "drawn",
    "high-strung",
    "tight",
    "nervous",
    "nervy",
    "uptight",
    "edgy",
    "electric",
    "wired",
    "overstrung",
    "constricted",
    "isotonic",
    "jumpy",
    "suspensive",
    "tense up",
    "wound up",
    "suspenseful",
    "unrelaxed",
    "cliff-hanging",
    "tense"
  ],
  [
    "disagreeable",
    "trying",
    "nerve-wracking",
    "nerve-racking",
    "stressful"
  ],
  [
    "malevolent",
    "malign",
    "malignant"
  ],
  [
    "position",
    "berth",
    "post",
    "office",
    "spot",
    "state of affairs",
    "slot",
    "site",
    "place",
    "situation"
  ],
  [
    "hopeless",
    "intolerable",
    "infeasible",
    "inconceivable",
    "unfeasible",
    "unattainable",
    "unthinkable",
    "unacceptable",
    "unimaginable",
    "out of the question",
    "unachievable",
    "impracticable",
    "insufferable",
    "unworkable",
    "unsufferable",
    "unrealizable",
    "undoable",
    "impossible"
  ],
  [
    "conversation"
  ],
  [
    "globe artichoke",
    "cynara scolymus",
    "artichoke plant",
    "artichoke"
  ],
  [
    "nonsensical",
    "folderol",
    "trumpery",
    "nonsensicality",
    "meaninglessness",
    "falderal",
    "gimcrackery",
    "frills",
    "gimcracks",
    "nonsense"
  ],
  [
    "caul",
    "humeral veil",
    "head covering",
    "embryonic membrane",
    "fetal membrane",
    "veil"
  ],
  [
    "prevarication",
    "dwell",
    "rest",
    "consist",
    "lie down",
    "belong",
    "lie in",
    "lie"
  ],
  [
    "falsity",
    "falsehood",
    "false statement",
    "untruth"
  ],
  [
    "guineapig"
  ],
  [
    "hit",
    "dispatch",
    "homicide",
    "remove",
    "mangle",
    "mutilate",
    "slaying",
    "bump off",
    "polish off",
    "slay",
    "murder"
  ],
  [
    "soft",
    "palatalized",
    "palatine",
    "palatal"
  ],
  [
    "sapphic",
    "homosexual",
    "gay woman",
    "lesbian"
  ],
  [
    "tb",
    "tuberculosis"
  ],
  [
    "guineafowl"
  ],
  [
    "petit dejeuner",
    "breakfast"
  ],
  [
    "pall",
    "drape",
    "drapery",
    "mantle",
    "curtain"
  ],
  [
    "upwind",
    "downwind",
    "lee",
    "lee side",
    "leeward"
  ],
  [
    "milieu",
    "environment",
    "surround",
    "environs",
    "surroundings"
  ],
  [
    "literacy"
  ],
  [
    "propellor",
    "propeller"
  ],
  [
    "support",
    "keep",
    "sustenance",
    "living",
    "bread and butter",
    "livelihood"
  ],
  [
    "cottonwool"
  ],
  [
    "purpose",
    "design",
    "intent",
    "aim",
    "intention"
  ],
  [
    "link",
    "association",
    "connexion",
    "connecting",
    "joining",
    "connectedness",
    "connective",
    "connector",
    "connecter",
    "connection"
  ],
  [
    "holiday",
    "vacation"
  ],
  [
    "background",
    "backcloth",
    "backdrop"
  ],
  [
    "shrimp",
    "prawn"
  ],
  [
    "daisy"
  ],
  [
    "sea bream",
    "freshwater bream",
    "bream"
  ],
  [
    "cod",
    "codfish"
  ],
  [
    "meteorite"
  ],
  [
    "narwhal"
  ],
  [
    "nerium oleander",
    "rose bay",
    "oleander"
  ],
  [
    "scourge",
    "mastigophore",
    "flagellated",
    "mastigophoran",
    "whiplike",
    "flagellated protozoan",
    "flagellate"
  ],
  [
    "stark",
    "cold",
    "clear",
    "idyllic",
    "consummate",
    "complete",
    "pure",
    "everlasting",
    "impeccable",
    "immaculate",
    "clean",
    "down",
    "gross",
    "exact",
    "flawless",
    "hone",
    "faultless",
    "undefiled",
    "thoroughgoing",
    "sodding",
    "pluperfect",
    "double-dyed",
    "perfective",
    "uncorrupted",
    "perfectible",
    "idealized",
    "unflawed",
    "errorless",
    "perfect tense",
    "perfective tense",
    "arrant",
    "ideal",
    "mastered",
    "staring",
    "utter",
    "perfect"
  ],
  [
    "stark",
    "good",
    "discharge",
    "hearty",
    "consummate",
    "skilled",
    "full",
    "pure",
    "everlasting",
    "sound",
    "thorough",
    "perfect",
    "dispatch",
    "clean",
    "accomplished",
    "concluded",
    "gross",
    "exhaustive",
    "make out",
    "all",
    "total",
    "realized",
    "nail",
    "finish",
    "over",
    "finished",
    "full-scale",
    "terminated",
    "thoroughgoing",
    "sodding",
    "fill in",
    "downright",
    "fill out",
    "double-dyed",
    "all-out",
    "full-blown",
    "fleshed out",
    "completed",
    "self-contained",
    "all over",
    "stand-alone",
    "ended",
    "allover",
    "full-dress",
    "right-down",
    "full-clad",
    "absolute",
    "arrant",
    "staring",
    "utter",
    "complete"
  ],
  [
    "legerdemain",
    "deception",
    "antic",
    "caper",
    "illusion",
    "joke",
    "magic",
    "fox",
    "prank",
    "magic trick",
    "conjuring trick",
    "fast one",
    "fob",
    "trick"
  ],
  [
    "deception",
    "misrepresentation",
    "dissimulation",
    "dissembling",
    "fraudulence",
    "deceit"
  ],
  [
    "work",
    "speculate",
    "caper",
    "problem",
    "task",
    "chore",
    "employment",
    "subcontract",
    "farm out",
    "job"
  ],
  [
    "prophylactic",
    "safety",
    "rubber",
    "safe",
    "condom"
  ],
  [
    "broad",
    "panoptic",
    "cover",
    "encompassing",
    "all-encompassing",
    "all-embracing",
    "wide",
    "all-inclusive",
    "across-the-board",
    "mantle",
    "blanket"
  ],
  [
    "accoucheuse",
    "midwife"
  ],
  [
    "godmother"
  ],
  [
    "tray"
  ],
  [
    "mean",
    "radical",
    "establish",
    "foundation",
    "inferior",
    "ignoble",
    "immoral",
    "cornerstone",
    "ground",
    "basal",
    "counterfeit",
    "post",
    "stem",
    "basic",
    "theme",
    "home",
    "humble",
    "lowly",
    "root",
    "stand",
    "basis",
    "station",
    "infrastructure",
    "fundament",
    "bag",
    "wrong",
    "groundwork",
    "unethical",
    "meanspirited",
    "foot",
    "dishonorable",
    "send",
    "illegitimate",
    "found",
    "imitative",
    "floor",
    "substructure",
    "baseborn",
    "lowborn",
    "pedestal",
    "radix",
    "dishonourable",
    "understructure",
    "root word",
    "alkali",
    "base of operations",
    "free-base",
    "place",
    "base"
  ],
  [
    "reckon",
    "figure",
    "nought",
    "aught",
    "zilch",
    "nix",
    "nil",
    "nothing",
    "naught",
    "cypher",
    "inscribe",
    "zero",
    "nonentity",
    "calculate",
    "nobody",
    "nada",
    "goose egg",
    "compute",
    "encrypt",
    "cryptograph",
    "encipher",
    "0",
    "write in code",
    "code",
    "encode",
    "secret code",
    "zip",
    "cipher"
  ],
  [
    "cipher",
    "cypher",
    "inscribe",
    "encrypt",
    "codification",
    "computer code",
    "encipher",
    "write in code",
    "encode",
    "code"
  ],
  [
    "cardinal",
    "cipher",
    "nought",
    "ordinal",
    "aught",
    "zilch",
    "nix",
    "nil",
    "nothing",
    "naught",
    "cypher",
    "zero in",
    "nada",
    "goose egg",
    "0",
    "zip",
    "zero"
  ],
  [
    "finger",
    "dactyl",
    "fingerbreadth",
    "digit"
  ],
  [
    "caning",
    "wicker",
    "wickerwork"
  ],
  [
    "swag",
    "droop",
    "pin",
    "flagstone",
    "sag",
    "ease up",
    "ease off",
    "sword lily",
    "slack off",
    "slacken off",
    "ensign",
    "fleur-de-lis",
    "iris",
    "national flag",
    "signal flag",
    "flag"
  ],
  [
    "large",
    "big",
    "streamer",
    "superior",
    "banner"
  ],
  [
    "asphodel"
  ],
  [
    "crossed",
    "crossbreed",
    "crossbred",
    "intercrossed",
    "loanblend",
    "interbred",
    "hybrid"
  ],
  [
    "work",
    "process",
    "play",
    "represent",
    "bit",
    "operation",
    "move",
    "turn",
    "routine",
    "do",
    "dissemble",
    "pretend",
    "enactment",
    "behave",
    "playact",
    "number",
    "act as",
    "cognitive process",
    "roleplay",
    "human action",
    "human activity",
    "cognitive operation",
    "act"
  ],
  [
    "what"
  ],
  [
    "however",
    "how"
  ],
  [
    "effort",
    "exploit",
    "title",
    "feat",
    "deed of conveyance",
    "deed"
  ],
  [
    "robust",
    "energetic",
    "vigorous"
  ],
  [
    "boom",
    "roar",
    "roaring",
    "thunder"
  ],
  [
    "albumin",
    "ovalbumin",
    "egg white",
    "albumen"
  ],
  [
    "greek clover",
    "trigonella foenumgraecum",
    "fenugreek seed",
    "fenugreek"
  ],
  [
    "advice"
  ],
  [
    "shrike"
  ],
  [
    "instep"
  ],
  [
    "globe flower",
    "globeflower"
  ],
  [
    "goldenrod"
  ],
  [
    "brand",
    "nerve",
    "blade",
    "sword",
    "steel"
  ],
  [
    "pulverize",
    "gunpowder",
    "powderize",
    "powder"
  ],
  [
    "considerable",
    "sizeable",
    "trim",
    "sizable",
    "orderly",
    "respectable",
    "neat",
    "straight",
    "goodly",
    "trig",
    "straighten out",
    "groomed",
    "kempt",
    "square away",
    "straighten",
    "neaten",
    "well-kept",
    "clean up",
    "shipshape",
    "ruly",
    "uncluttered",
    "clean-cut",
    "goodish",
    "tidy up",
    "slicked up",
    "unlittered",
    "hefty",
    "tidy"
  ],
  [
    "keen",
    "good",
    "refined",
    "adroit",
    "cool",
    "great",
    "elegant",
    "swell",
    "dandy",
    "bully",
    "nifty",
    "clean",
    "tasteful",
    "tidy",
    "straight",
    "groovy",
    "undiluted",
    "corking",
    "slap-up",
    "cracking",
    "bang-up",
    "smashing",
    "peachy",
    "not bad",
    "full-strength",
    "neat"
  ],
  [
    "world",
    "ground",
    "land",
    "terra firma",
    "globe",
    "dry land",
    "earthly concern",
    "worldly concern",
    "solid ground",
    "earth"
  ],
  [
    "dirty",
    "ground",
    "land",
    "filth",
    "colly",
    "stain",
    "bemire",
    "grease",
    "dirt",
    "begrime",
    "grime",
    "soil"
  ],
  [
    "soft spot",
    "fontanel",
    "fontanelle"
  ],
  [
    "magnet"
  ],
  [
    "form",
    "separate",
    "course",
    "division",
    "sort",
    "family",
    "sort out",
    "grade",
    "category",
    "assort",
    "year",
    "classify",
    "social class",
    "course of study",
    "course of instruction",
    "socio-economic class",
    "class"
  ],
  [
    "moral",
    "example",
    "deterrent example",
    "object lesson",
    "lesson"
  ],
  [
    "fair",
    "flaxen",
    "fairish",
    "towheaded",
    "nordic",
    "redheaded",
    "light-haired",
    "ash-blonde",
    "platinum-blonde",
    "blond",
    "sandy",
    "blonde"
  ],
  [
    "beat",
    "measure",
    "time",
    "metre",
    "cadence",
    "m",
    "meter"
  ],
  [
    "rice"
  ],
  [
    "sabbath"
  ],
  [
    "flexible joint",
    "hinge"
  ],
  [
    "exemption",
    "freedom"
  ],
  [
    "benumbed",
    "numb",
    "deceased",
    "departed",
    "at peace",
    "gone",
    "at rest",
    "asleep"
  ],
  [
    "aluminum",
    "atomic number 13",
    "al",
    "aluminium"
  ],
  [
    "blackcurrant"
  ],
  [
    "vacuous",
    "hollow",
    "insignificant",
    "empty",
    "nonsensical",
    "mindless",
    "pointless",
    "senseless",
    "unmeaning",
    "purposeless",
    "meaningless"
  ],
  [
    "device driver",
    "number one wood",
    "driver"
  ],
  [
    "desire",
    "trust",
    "promise",
    "go for",
    "hope"
  ],
  [
    "prospect",
    "anticipation",
    "outlook",
    "expected value",
    "arithmetic mean",
    "first moment",
    "expectation"
  ],
  [
    "armadillo"
  ],
  [
    "subset"
  ],
  [
    "against"
  ],
  [
    "hedgehog",
    "porcupine"
  ],
  [
    "varicella",
    "chickenpox"
  ],
  [
    "comma butterfly",
    "polygonia comma",
    "comma"
  ],
  [
    "subject",
    "adjunct",
    "dependent",
    "inferior",
    "petty",
    "subservient",
    "submissive",
    "lowly",
    "lower",
    "subsidiary",
    "subaltern",
    "secondary",
    "underling",
    "assistant",
    "junior",
    "hyponym",
    "low-level",
    "ruled",
    "lower-ranking",
    "junior-grade",
    "subordinate word",
    "buck",
    "subordinate"
  ],
  [
    "myriapod"
  ],
  [
    "oracle",
    "religious leader",
    "prophet"
  ],
  [
    "rush",
    "velocity",
    "race",
    "hurry",
    "accelerate",
    "hie",
    "fastness",
    "speeding",
    "hotfoot",
    "upper",
    "swiftness",
    "amphetamine",
    "f number",
    "hastening",
    "quicken",
    "pep pill",
    "hurrying",
    "speed up",
    "travel rapidly",
    "pelt along",
    "focal ratio",
    "stop number",
    "belt along",
    "bucket along",
    "cannonball along",
    "rush along",
    "hasten",
    "zip",
    "speed"
  ],
  [
    "speed",
    "velocity"
  ],
  [
    "delicate",
    "exquisite",
    "beautiful",
    "good",
    "tenuous",
    "close",
    "discerning",
    "elegant",
    "dainty",
    "delicately",
    "prime",
    "skilled",
    "quality",
    "bad",
    "pure",
    "pleasant",
    "precise",
    "choice",
    "little",
    "thin",
    "tight",
    "pretty",
    "small",
    "well",
    "satisfactory",
    "exquisitely",
    "prize",
    "alright",
    "discriminating",
    "okay",
    "all right",
    "mulct",
    "trained",
    "very well",
    "pulverized",
    "fine-grained",
    "ticket",
    "finely",
    "superfine",
    "powdery",
    "amercement",
    "floury",
    "fining",
    "powdered",
    "close-grained",
    "small-grained",
    "all-right",
    "ok",
    "select",
    "superior",
    "fine"
  ],
  [
    "punishment",
    "penalization",
    "penalty"
  ],
  [
    "armoracia rusticana",
    "red cole",
    "horseradish root",
    "horse radish",
    "horseradish"
  ],
  [
    "deadly nightshade",
    "atropa belladonna",
    "belladonna"
  ],
  [
    "asp viper",
    "vipera aspis",
    "egyptian cobra",
    "naja haje",
    "asp"
  ],
  [
    "hold",
    "suck",
    "suckle",
    "nanny",
    "nursemaid",
    "entertain",
    "wet-nurse",
    "lactate",
    "breastfeed",
    "give suck",
    "harbor",
    "harbour",
    "nurse"
  ],
  [
    "oyster plant",
    "vegetable oyster",
    "tragopogon porrifolius",
    "salsify"
  ],
  [
    "grain",
    "food grain",
    "cereal grass",
    "cereal"
  ],
  [
    "eaves"
  ],
  [
    "taken",
    "purloined",
    "stolen"
  ],
  [
    "delicate",
    "frail",
    "weak",
    "flimsy",
    "breakable",
    "fragile"
  ],
  [
    "champignon"
  ],
  [
    "image",
    "picture",
    "ikon",
    "icon"
  ],
  [
    "sew",
    "run up",
    "sew together",
    "stitch"
  ],
  [
    "undeveloped",
    "unploughed",
    "unbroken",
    "unexploited",
    "unplowed",
    "fallow"
  ],
  [
    "sweep",
    "thicket",
    "encounter",
    "copse",
    "skirmish",
    "clash",
    "coppice",
    "kiss",
    "brushing",
    "light touch",
    "brushwood",
    "brush"
  ],
  [
    "heavy",
    "full",
    "sonorous"
  ],
  [
    "boil",
    "furuncle"
  ],
  [
    "bedsheet"
  ],
  [
    "cover",
    "shield",
    "sieve",
    "test",
    "concealment",
    "sort",
    "blind",
    "silver screen",
    "block out",
    "screen door",
    "screen out",
    "projection screen",
    "crt screen",
    "covert",
    "riddle",
    "screen"
  ],
  [
    "paper",
    "newsprint",
    "newspaper publisher",
    "newspaper"
  ],
  [
    "luncheon",
    "dejeuner",
    "tiffin",
    "lunch"
  ],
  [
    "mind",
    "theme",
    "thought",
    "estimate",
    "approximation",
    "estimation",
    "musical theme",
    "melodic theme",
    "idea"
  ],
  [
    "pliant",
    "integrative",
    "elastic",
    "impressionable",
    "fictile",
    "moldable",
    "plastic"
  ],
  [
    "mink coat",
    "mink"
  ],
  [
    "coypu",
    "myocastor coypus",
    "nutria"
  ],
  [
    "nutria",
    "myocastor coypus",
    "coypu"
  ],
  [
    "fetlock joint",
    "fetlock"
  ],
  [
    "perpetual",
    "incessant",
    "continual",
    "interminable",
    "eternal",
    "long",
    "sempiternal",
    "infinite",
    "continuous",
    "dateless",
    "uninterrupted",
    "endless"
  ],
  [
    "myriad",
    "boundless",
    "sempiternal",
    "unbounded",
    "innumerable",
    "multitudinous",
    "limitless",
    "endless",
    "countless",
    "dateless",
    "incalculable",
    "inexhaustible",
    "unlimited",
    "uninflected",
    "infinitive",
    "numberless",
    "unnumbered",
    "uncounted",
    "innumerous",
    "unnumerable",
    "non-finite",
    "unnumberable",
    "absolute",
    "infinite"
  ],
  [
    "barren",
    "unfruitful",
    "childless"
  ],
  [
    "dependent",
    "hooked",
    "conditional",
    "qualified",
    "addicted",
    "strung-out",
    "drug-addicted",
    "dependant"
  ],
  [
    "naphthalene"
  ],
  [
    "iron pyrite",
    "pyrite"
  ],
  [
    "biotite"
  ],
  [
    "wormwood"
  ],
  [
    "ring",
    "resound",
    "reverberate",
    "recall",
    "reverberation",
    "repeat",
    "sound reflection",
    "echo"
  ],
  [
    "capibara",
    "hydrochoerus hydrochaeris",
    "capybara"
  ],
  [
    "cathartic",
    "physic",
    "aperient",
    "purgative",
    "evacuant",
    "laxative"
  ],
  [
    "horned",
    "lunate",
    "crescent-shaped",
    "semilunar",
    "bicephalous",
    "crescent"
  ],
  [
    "conspicuous",
    "candid",
    "free",
    "ingenuous",
    "clear",
    "overt",
    "coarse",
    "blatant",
    "give",
    "obvious",
    "artless",
    "raw",
    "blazing",
    "active",
    "vulnerable",
    "impartial",
    "air",
    "gaping",
    "unsettled",
    "loose",
    "naked",
    "empty",
    "unrestricted",
    "honest",
    "spread out",
    "available",
    "exposed",
    "assailable",
    "visible",
    "barefaced",
    "open up",
    "unconcealed",
    "wide",
    "unlawful",
    "unfold",
    "afford",
    "lawless",
    "unobstructed",
    "unresolved",
    "unprotected",
    "yawning",
    "agaze",
    "public",
    "open air",
    "unprejudiced",
    "unfastened",
    "undefendable",
    "bald",
    "undecided",
    "unsealed",
    "unfolded",
    "out-of-doors",
    "undetermined",
    "unconstricted",
    "outdoors",
    "opened",
    "undisguised",
    "undefended",
    "wide-open",
    "round-eyed",
    "unenclosed",
    "unstopped",
    "unstoppered",
    "honorable",
    "spread",
    "staring",
    "surface",
    "open"
  ],
  [
    "pendulum"
  ],
  [
    "cirrhus",
    "cirrus cloud",
    "cirrus"
  ],
  [
    "first-class",
    "superior",
    "excellent"
  ],
  [
    "set",
    "plume",
    "preen",
    "apparel",
    "trim",
    "raiment",
    "crop",
    "clip",
    "garnish",
    "coif",
    "arrange",
    "garb",
    "garment",
    "formal",
    "attire",
    "snip",
    "coiffure",
    "do",
    "prune",
    "frock",
    "groom",
    "primp",
    "decorate",
    "cut back",
    "line up",
    "lop",
    "tog",
    "habilitate",
    "clothe",
    "enclothe",
    "dress out",
    "fit out",
    "coiffe",
    "full-dress",
    "get dressed",
    "curry",
    "dress"
  ],
  [
    "sapwood"
  ],
  [
    "alburnum"
  ],
  [
    "mucous secretion",
    "mucus"
  ],
  [
    "sludge",
    "ooze",
    "gunk",
    "goo",
    "guck",
    "muck",
    "slime"
  ],
  [
    "essence",
    "core",
    "substance",
    "marrow",
    "heart",
    "meat",
    "kernel",
    "nub",
    "nitty-gritty",
    "inwardness",
    "center",
    "gist",
    "sum",
    "pith"
  ],
  [
    "bulb",
    "myelin",
    "medulla oblongata",
    "myeline",
    "medulla"
  ],
  [
    "temper",
    "mood",
    "humour",
    "witticism",
    "wittiness",
    "sense of humor",
    "sense of humour",
    "wit",
    "humor"
  ],
  [
    "ear",
    "pinna",
    "atrial auricle",
    "auricula atrii",
    "auricle"
  ],
  [
    "stern",
    "butt",
    "ass",
    "bum",
    "prat",
    "bottom",
    "tail",
    "arse",
    "fundament",
    "keister",
    "rear",
    "derriere",
    "rump",
    "behind",
    "tush",
    "posterior",
    "seat",
    "buttocks",
    "fanny",
    "buns",
    "tail end",
    "rear end",
    "hindquarters",
    "tooshie",
    "hind end",
    "back end",
    "can",
    "backside"
  ],
  [
    "view",
    "purview",
    "apparent horizon",
    "celestial horizon",
    "sensible horizon",
    "visible horizon",
    "skyline",
    "horizon"
  ],
  [
    "charge",
    "point",
    "unwavering",
    "flat",
    "steady",
    "even",
    "stage",
    "raze",
    "dismantle",
    "story",
    "plane",
    "tier",
    "floor",
    "grade",
    "horizontal",
    "even out",
    "take down",
    "pull down",
    "spirit level",
    "tear down",
    "level off",
    "horizontal surface",
    "degree",
    "rase",
    "storey",
    "level"
  ],
  [
    "childbearing",
    "accouchement",
    "vaginal birth",
    "childbirth"
  ],
  [
    "mergus merganser",
    "goosander"
  ],
  [
    "distinct",
    "decisive",
    "settled",
    "formed",
    "defined",
    "decided",
    "definite"
  ],
  [
    "reliable",
    "careful",
    "sure",
    "dependable",
    "doomed",
    "sealed",
    "destined",
    "foreordained",
    "predestinate",
    "fated",
    "predestined",
    "certain"
  ],
  [
    "configuration",
    "constellation"
  ],
  [
    "recall",
    "anamnesis",
    "recollection",
    "memorial",
    "commemoration",
    "remembrance"
  ],
  [
    "compliant",
    "acquiescent",
    "dutiful",
    "conformable",
    "duteous",
    "biddable",
    "obedient"
  ],
  [
    "fire",
    "combustible",
    "combustible material",
    "fuel"
  ],
  [
    "forbearance",
    "longanimity",
    "solitaire",
    "patience"
  ],
  [
    "puffing",
    "puffy",
    "huffing",
    "exhaling",
    "snoring",
    "breathed",
    "inhaling",
    "respiration",
    "snorting",
    "breathing"
  ],
  [
    "rhetorician",
    "speechmaker",
    "public speaker",
    "orator"
  ],
  [
    "juvenility",
    "young",
    "younker",
    "early days",
    "youthfulness",
    "young person",
    "youth"
  ],
  [
    "melancholic",
    "sad",
    "black bile",
    "melancholy"
  ],
  [
    "woody",
    "bamboo"
  ],
  [
    "court",
    "courtyard"
  ],
  [
    "countryside"
  ],
  [
    "epidemic parotitis",
    "mumps"
  ],
  [
    "familiar",
    "fellow",
    "comrade",
    "accompany",
    "company",
    "fellow traveller",
    "keep company",
    "fellow traveler",
    "associate",
    "companion"
  ],
  [
    "mate",
    "collaborator",
    "spouse",
    "pardner",
    "cooperator",
    "married person",
    "consort",
    "partner"
  ],
  [
    "where"
  ],
  [
    "willowherb"
  ],
  [
    "diabetes"
  ],
  [
    "source",
    "writer",
    "generator",
    "author"
  ],
  [
    "content",
    "subordinate",
    "case",
    "issue",
    "subjugate",
    "discipline",
    "field",
    "dependent",
    "study",
    "theme",
    "topic",
    "field of study",
    "subject field",
    "subject area",
    "depicted object",
    "branch of knowledge",
    "guinea pig",
    "matter",
    "national",
    "subject"
  ],
  [
    "emollient",
    "salve",
    "cream",
    "balm",
    "unguent",
    "ointment"
  ],
  [
    "althaea",
    "althea",
    "hollyhock"
  ],
  [
    "marshmallow"
  ],
  [
    "hibiscus"
  ],
  [
    "gorge",
    "gullet",
    "esophagus",
    "oesophagus"
  ],
  [
    "rump",
    "hindquarters",
    "croupe",
    "spasmodic laryngitis",
    "croup"
  ],
  [
    "foal"
  ],
  [
    "equine distemper",
    "strangles"
  ],
  [
    "gall",
    "rancor",
    "bitterness",
    "rancour",
    "resentment"
  ],
  [
    "umbrage",
    "discourtesy",
    "offensive",
    "violation",
    "infringement",
    "infraction",
    "offence",
    "misdemeanor",
    "misdemeanour",
    "offensive activity",
    "offense"
  ],
  [
    "swimbladder"
  ],
  [
    "matrimony",
    "wedlock",
    "wedding",
    "man and wife",
    "married couple",
    "marriage ceremony",
    "union",
    "marriage"
  ],
  [
    "doughnut",
    "donut",
    "sinker"
  ],
  [
    "dayspring",
    "dawning",
    "first light",
    "morning",
    "cockcrow",
    "break of day",
    "sunup",
    "break of the day",
    "aurora",
    "dawn",
    "daybreak",
    "sunrise"
  ],
  [
    "bagpipes"
  ],
  [
    "flagellum"
  ],
  [
    "fantan",
    "sevens",
    "parliament"
  ],
  [
    "subject",
    "substance",
    "happy",
    "capacity",
    "message",
    "subject matter",
    "contented",
    "contentedness",
    "cognitive content",
    "depicted object",
    "mental object",
    "content"
  ],
  [
    "humorous",
    "humourous",
    "witty"
  ],
  [
    "flat",
    "unraised",
    "unleavened"
  ],
  [
    "sword lily",
    "gladiola",
    "corpus sternum",
    "gladiolus"
  ],
  [
    "accent",
    "idiom",
    "dialect"
  ],
  [
    "assault",
    "barrage",
    "bombardment",
    "assault and battery",
    "shelling",
    "barrage fire",
    "electric battery",
    "stamp battery",
    "battery"
  ],
  [
    "atomic number 51",
    "sb",
    "antimony"
  ],
  [
    "umbel"
  ],
  [
    "cancer the crab",
    "genus cancer",
    "cancer"
  ],
  [
    "stirrup",
    "stapes"
  ],
  [
    "virtually",
    "near",
    "about",
    "well-nigh",
    "nearly",
    "all but",
    "just about",
    "almost",
    "to the highest degree",
    "nigh",
    "most"
  ],
  [
    "merit",
    "virtuousness",
    "moral excellence",
    "chastity",
    "sexual morality",
    "virtue"
  ],
  [
    "persona",
    "function",
    "character",
    "purpose",
    "use",
    "part",
    "office",
    "theatrical role",
    "role"
  ],
  [
    "soul",
    "individual",
    "mortal",
    "someone",
    "human",
    "person",
    "somebody"
  ],
  [
    "enchanted",
    "ensorcelled",
    "bewitched"
  ],
  [
    "shirt"
  ],
  [
    "parrot"
  ],
  [
    "sulphur",
    "atomic number 16",
    "s",
    "sulfur"
  ],
  [
    "baulk",
    "balk",
    "rafter"
  ],
  [
    "eden",
    "nirvana",
    "promised land",
    "heaven",
    "elysian fields",
    "elysium",
    "shangri-la",
    "valhalla",
    "paradise"
  ],
  [
    "eden",
    "nirvana",
    "paradise",
    "promised land",
    "shangri-la",
    "heaven"
  ],
  [
    "fast",
    "unreal",
    "artificial",
    "bleached",
    "tinted",
    "hennaed",
    "colorfast",
    "dyed-in-the-wool",
    "yarn-dyed",
    "colored",
    "dyed"
  ],
  [
    "paladin",
    "champion",
    "wedge",
    "torpedo",
    "submarine",
    "fighter",
    "sub",
    "bomber",
    "hoagie",
    "poor boy",
    "hero sandwich",
    "hoagy",
    "submarine sandwich",
    "cuban sandwich",
    "grinder",
    "italian sandwich",
    "zep",
    "hero"
  ],
  [
    "world",
    "ground",
    "land",
    "terra firma",
    "globe",
    "dry land",
    "earthly concern",
    "worldly concern",
    "solid ground",
    "earth"
  ],
  [
    "grapevine",
    "grape"
  ],
  [
    "villein",
    "helot",
    "serf"
  ],
  [
    "hundred",
    "centred",
    "100",
    "one c",
    "c",
    "century"
  ],
  [
    "jurisprudence",
    "constabulary",
    "police",
    "natural law",
    "police force",
    "law of nature",
    "legal philosophy",
    "practice of law",
    "law"
  ],
  [
    "law",
    "legal philosophy",
    "jurisprudence"
  ],
  [
    "peach",
    "sweetheart",
    "serve",
    "bag",
    "beauty",
    "knockout",
    "stunner",
    "lulu",
    "looker",
    "mantrap",
    "smasher",
    "dish out",
    "saucer",
    "cup of tea",
    "dish up",
    "serve up",
    "dish antenna",
    "dishful",
    "dish aerial",
    "dish"
  ],
  [
    "tyrant",
    "autocrat",
    "despot"
  ],
  [
    "despot",
    "autocrat",
    "tyrant"
  ],
  [
    "delight",
    "pleasure",
    "rejoice",
    "joyfulness",
    "joyousness",
    "gladden",
    "joy"
  ],
  [
    "campfire"
  ],
  [
    "balefire",
    "bonfire"
  ],
  [
    "hearth",
    "open fireplace",
    "fireplace"
  ],
  [
    "triumph",
    "victory"
  ],
  [
    "passion",
    "estrus",
    "ignite",
    "warmth",
    "rut",
    "oestrus",
    "stir up",
    "high temperature",
    "heating",
    "inflame",
    "hotness",
    "fire up",
    "heat up",
    "hot up",
    "heating system",
    "heating plant",
    "heat energy",
    "heat"
  ],
  [
    "malaria"
  ],
  [
    "erect",
    "upright",
    "plumb",
    "straight",
    "erectile",
    "perpendicular",
    "rearing",
    "unbowed",
    "fastigiate",
    "upended",
    "stand-up",
    "unbent",
    "straight-backed",
    "unsloped",
    "vertical"
  ],
  [
    "virtuous",
    "good",
    "just",
    "standing",
    "erect",
    "righteous",
    "straight",
    "erectile",
    "perpendicular",
    "rearing",
    "vertical",
    "unbowed",
    "fastigiate",
    "stand-up",
    "unbent",
    "upright piano",
    "straight-backed",
    "unsloped",
    "upright"
  ],
  [
    "rest",
    "pillow"
  ],
  [
    "will",
    "testament"
  ],
  [
    "pedagogy",
    "teaching",
    "instruction",
    "training",
    "education department",
    "educational activity",
    "breeding",
    "department of education",
    "education"
  ],
  [
    "ichor",
    "purulence",
    "suppuration",
    "sanies",
    "festering",
    "pus"
  ],
  [
    "succus",
    "juice"
  ],
  [
    "big",
    "self-aggrandizing",
    "cock-a-hoop",
    "boastful",
    "vaunter",
    "blowhard",
    "crowing",
    "boaster",
    "braggy",
    "bragging",
    "line-shooter",
    "braggart"
  ],
  [
    "zest",
    "spiciness",
    "spicery",
    "spice up",
    "spice"
  ],
  [
    "garnet"
  ],
  [
    "punica granatum",
    "pomegranate tree",
    "pomegranate"
  ],
  [
    "vowel sound",
    "vowel"
  ],
  [
    "peculiar",
    "inquisitive",
    "strange",
    "unusual",
    "queer",
    "singular",
    "questioning",
    "rummy",
    "funny",
    "nosy",
    "interested",
    "odd",
    "prying",
    "speculative",
    "rum",
    "nosey",
    "snoopy",
    "overcurious",
    "curious"
  ],
  [
    "interjection",
    "ejaculation"
  ],
  [
    "surveillance"
  ],
  [
    "bleak",
    "subdued",
    "dull",
    "obtuse",
    "indistinct",
    "black",
    "dark",
    "dense",
    "vague",
    "faint",
    "stupid",
    "hopeless",
    "slur",
    "shadowy",
    "slow",
    "dip",
    "blur",
    "wispy",
    "dumb",
    "blind",
    "dimmed",
    "darken",
    "dim"
  ],
  [
    "lean",
    "tilt",
    "tip",
    "weight",
    "fish",
    "angle"
  ],
  [
    "stroke",
    "oblique",
    "inclined",
    "slash",
    "slanted",
    "solidus",
    "separatrix",
    "virgule",
    "sloping",
    "aslant",
    "slanting",
    "aslope",
    "sloped",
    "bias",
    "diagonal"
  ],
  [
    "earwig"
  ],
  [
    "diphtheria"
  ],
  [
    "bulwark",
    "jetty",
    "mole",
    "breakwater",
    "groyne",
    "seawall",
    "groin"
  ],
  [
    "regime",
    "government",
    "authorities"
  ],
  [
    "bob",
    "bobber",
    "phellem",
    "cork up",
    "bobfloat",
    "cork"
  ],
  [
    "sawfish"
  ],
  [
    "bordello",
    "bagnio",
    "house of ill repute",
    "cathouse",
    "sporting house",
    "whorehouse",
    "bawdyhouse",
    "house of prostitution",
    "brothel"
  ],
  [
    "earlobe"
  ],
  [
    "tragus"
  ],
  [
    "libra the balance",
    "libra the scales",
    "libra"
  ],
  [
    "obscure",
    "indistinct",
    "dim",
    "indeterminate",
    "faint",
    "shadowy",
    "unclear",
    "wispy",
    "indefinable",
    "undefinable",
    "undefined",
    "vague"
  ],
  [
    "ambiguous",
    "artful",
    "elusive",
    "equivocal",
    "protective",
    "evasive"
  ],
  [
    "lovebird",
    "shell parakeet",
    "budgie",
    "grass parakeet",
    "melopsittacus undulatus",
    "budgereegah",
    "budgerygah",
    "budgerigar"
  ],
  [
    "harmful",
    "disadvantageous",
    "subtraction",
    "negative",
    "minus"
  ],
  [
    "goosebumps"
  ],
  [
    "point",
    "luff"
  ],
  [
    "optics"
  ],
  [
    "hornbill"
  ],
  [
    "surmount",
    "shell",
    "plate",
    "scurf",
    "weighing machine",
    "musical scale",
    "descale",
    "scale leaf",
    "graduated table",
    "ordered series",
    "scale of measurement",
    "scale"
  ],
  [
    "ambit",
    "range",
    "reach",
    "background",
    "compass",
    "orbit",
    "setting",
    "cro",
    "telescope",
    "oscilloscope",
    "cathode-ray oscilloscope",
    "scope"
  ],
  [
    "desolate",
    "wild",
    "languish",
    "barren",
    "ravage",
    "desert",
    "squander",
    "discarded",
    "ware",
    "macerate",
    "useless",
    "inhospitable",
    "wasteland",
    "consume",
    "liquidate",
    "emaciate",
    "rot",
    "dissipation",
    "cast-off",
    "devastate",
    "knock off",
    "run off",
    "do in",
    "pine away",
    "thriftlessness",
    "wastefulness",
    "junked",
    "waste product",
    "lay waste to",
    "permissive waste",
    "waste material",
    "waste matter",
    "blow",
    "godforsaken",
    "scrap",
    "waste"
  ],
  [
    "folderol",
    "pan",
    "junk",
    "trumpery",
    "scum",
    "tripe",
    "rubbish",
    "applesauce",
    "wish-wash",
    "tear apart",
    "scrap",
    "trash"
  ],
  [
    "delight",
    "joy",
    "pleasance",
    "pleasure"
  ],
  [
    "bedpan"
  ],
  [
    "epilepsy"
  ],
  [
    "wineskin"
  ],
  [
    "cinnamon bark",
    "ceylon cinnamon",
    "cinnamomum zeylanicum",
    "ceylon cinnamon tree",
    "cinnamon"
  ],
  [
    "porch"
  ],
  [
    "salutation",
    "greeting"
  ],
  [
    "fault",
    "mistake",
    "erroneousness",
    "wrongdoing",
    "misplay",
    "erroneous belief",
    "error"
  ],
  [
    "salacious",
    "abhorrent",
    "lewd",
    "dirty",
    "repugnant",
    "repulsive",
    "offensive",
    "indecent",
    "detestable",
    "obscene"
  ],
  [
    "cultivate",
    "direct",
    "develop",
    "discipline",
    "check",
    "take",
    "condition",
    "coach",
    "prepare",
    "string",
    "school",
    "caravan",
    "educate",
    "groom",
    "railroad train",
    "take aim",
    "civilize",
    "wagon train",
    "gears",
    "power train",
    "geartrain",
    "aim",
    "gearing",
    "train"
  ],
  [
    "lockjaw",
    "tetanus"
  ],
  [
    "government",
    "political science",
    "political relation",
    "political sympathies",
    "politics"
  ],
  [
    "sublime",
    "inviolable",
    "ineffable",
    "sanctified",
    "revered",
    "hallowed",
    "taboo",
    "numinous",
    "sacrosanct",
    "dedicated",
    "spiritual",
    "sacral",
    "holy",
    "religious",
    "unspeakable",
    "inviolate",
    "tabu",
    "unutterable",
    "consecrated",
    "inspirational",
    "reverenced",
    "unnameable",
    "divine",
    "reverend",
    "venerated",
    "worthy",
    "sacred"
  ],
  [
    "eggbeater",
    "whirlybird",
    "chopper",
    "helicopter"
  ],
  [
    "blunder",
    "boob",
    "hell",
    "wickedness",
    "goof",
    "sinfulness",
    "sinning",
    "sin"
  ],
  [
    "concordant",
    "harmonious",
    "accordant",
    "agreeable",
    "consistent",
    "conformable",
    "harmonic",
    "in agreement",
    "harmonized",
    "harmonical",
    "in accord",
    "in harmony",
    "consonant"
  ],
  [
    "modest",
    "comely",
    "adequate",
    "proper",
    "right",
    "nice",
    "sufficient",
    "decorous",
    "respectable",
    "comme il faut",
    "seemly",
    "properly",
    "becoming",
    "enough",
    "decently",
    "in good order",
    "the right way",
    "decent"
  ],
  [
    "elicit",
    "evoke",
    "educe",
    "express",
    "selection",
    "pull out",
    "draw out",
    "infusion",
    "excerpt",
    "distill",
    "take out",
    "distil",
    "press out",
    "extract"
  ],
  [
    "vomer"
  ],
  [
    "level",
    "true",
    "yet",
    "flat",
    "steady",
    "regular",
    "plane",
    "straight",
    "equal",
    "symmetrical",
    "tied",
    "justified",
    "even out",
    "symmetric",
    "fifty-fifty",
    "still",
    "even"
  ],
  [
    "action",
    "activeness",
    "natural process",
    "radioactivity",
    "bodily function",
    "bodily process",
    "body process",
    "natural action",
    "activity"
  ],
  [
    "calamity",
    "cataclysm",
    "catastrophe",
    "tragedy",
    "disaster"
  ],
  [
    "calamity",
    "cataclysm",
    "disaster",
    "tragedy",
    "catastrophe"
  ],
  [
    "component",
    "part",
    "allot",
    "assign",
    "parcel",
    "lot",
    "share",
    "luck",
    "percentage",
    "serving",
    "helping",
    "circumstances",
    "component part",
    "destiny",
    "fate",
    "fortune",
    "portion"
  ],
  [
    "mendicant",
    "pauperize",
    "beggar"
  ],
  [
    "cuke",
    "cucumis sativus",
    "cucumber vine",
    "cucumber"
  ],
  [
    "want",
    "inadequacy",
    "insufficiency",
    "lack",
    "deficiency"
  ],
  [
    "asbestos"
  ],
  [
    "psoriasis"
  ],
  [
    "repent",
    "regret",
    "herb of grace",
    "ruta graveolens",
    "rue"
  ],
  [
    "arsenic trioxide",
    "arsenous oxide",
    "arsenous anhydride",
    "atomic number 33",
    "as",
    "arsenic"
  ],
  [
    "cutlet",
    "scollop",
    "scallop"
  ],
  [
    "kerosine",
    "kerosene"
  ],
  [
    "cyclamen purpurascens",
    "cyclamen"
  ],
  [
    "peculiar",
    "strange",
    "unusual",
    "curious",
    "queer",
    "singular",
    "rummy",
    "funny",
    "unmatched",
    "left",
    "rum",
    "remaining",
    "inexact",
    "mismatched",
    "leftover",
    "left over",
    "unmated",
    "unexhausted",
    "unexpended",
    "unpaired",
    "odd"
  ],
  [
    "reins"
  ],
  [
    "pitch",
    "asphalt",
    "old salt",
    "seafarer",
    "jack-tar",
    "sea dog",
    "gob",
    "mariner",
    "seaman",
    "tar"
  ],
  [
    "bad",
    "prophylactic",
    "safety",
    "arctic",
    "condom",
    "impermeable",
    "gumshoe",
    "galosh",
    "no-good",
    "gum elastic",
    "caoutchouc",
    "rubberize",
    "golosh",
    "rubberized",
    "rubber eraser",
    "pencil eraser",
    "india rubber",
    "safe",
    "rubber"
  ],
  [
    "ibis"
  ],
  [
    "capture",
    "ictus",
    "gaining control",
    "seizure"
  ],
  [
    "gas",
    "gasoline",
    "gasolene",
    "petrol"
  ],
  [
    "gas",
    "petrol",
    "gasolene",
    "gasoline"
  ],
  [
    "pubic bone",
    "os pubis",
    "pubis"
  ],
  [
    "discourtesy",
    "offensive",
    "violation",
    "infringement",
    "offense",
    "infraction",
    "misdemeanor",
    "misdemeanour",
    "offensive activity",
    "offence"
  ],
  [
    "implausible",
    "last",
    "improbable",
    "remote",
    "outside",
    "unbelievable",
    "farfetched",
    "unconvincing",
    "unlikely"
  ],
  [
    "blank",
    "quad",
    "outer space",
    "distance",
    "topological space",
    "blank space",
    "place",
    "space"
  ],
  [
    "existence",
    "macrocosm",
    "world",
    "creation",
    "cosmos",
    "nature",
    "population",
    "universe of discourse",
    "universe"
  ],
  [
    "neoplasm",
    "tumour",
    "tumor"
  ],
  [
    "cephalopodan",
    "cephalopod mollusk",
    "cephalopod"
  ],
  [
    "strain",
    "emphasize",
    "accentuate",
    "focus",
    "accentuation",
    "accent",
    "emphasis",
    "tension",
    "punctuate",
    "straining",
    "bring out",
    "try",
    "set off",
    "tenseness",
    "stress"
  ],
  [
    "obstinate",
    "perverse",
    "adverse",
    "different",
    "opposite",
    "unfavorable",
    "reverse",
    "wayward",
    "disobedient",
    "unfavourable",
    "antonymous",
    "contrary"
  ],
  [
    "idiot box",
    "boob tube",
    "tv",
    "telly",
    "television set",
    "video",
    "goggle box",
    "telecasting",
    "television receiver",
    "television system",
    "tv set",
    "television"
  ],
  [
    "rime",
    "verse",
    "rhyme"
  ],
  [
    "carotid"
  ],
  [
    "bean",
    "noggin",
    "attic",
    "noodle"
  ],
  [
    "alimentary paste",
    "pasta"
  ],
  [
    "aggrandize",
    "embellish",
    "pad",
    "blow up",
    "dramatize",
    "dramatise",
    "embroider",
    "lard"
  ],
  [
    "semblance",
    "similitude",
    "alikeness",
    "likeness"
  ],
  [
    "similarity"
  ],
  [
    "calling",
    "career",
    "occupation",
    "occupational group",
    "vocation"
  ],
  [
    "psalterium",
    "third stomach",
    "omasum"
  ],
  [
    "second stomach",
    "reticulum"
  ],
  [
    "fourth stomach",
    "abomasum"
  ],
  [
    "first stomach",
    "rumen"
  ],
  [
    "dejected",
    "solitary",
    "lone",
    "alone",
    "lonesome",
    "unfrequented",
    "lonely"
  ],
  [
    "verbena",
    "vervain"
  ],
  [
    "pariah",
    "castaway",
    "friendless",
    "unwanted",
    "outcast"
  ],
  [
    "blunder",
    "ruffle",
    "tease",
    "bagatelle",
    "muff",
    "frivolity",
    "bollix",
    "spoil",
    "frippery",
    "bobble",
    "bollocks",
    "botch",
    "fumble",
    "mess up",
    "bungle",
    "flub",
    "mishandle",
    "muck up",
    "screw up",
    "foul up",
    "ball up",
    "louse up",
    "botch up",
    "bollix up",
    "bollocks up",
    "blow",
    "fluff"
  ],
  [
    "gamboge",
    "lemon yellow",
    "lemon tree",
    "citrus limon",
    "maize",
    "lemon"
  ],
  [
    "gynoecium",
    "pistil"
  ],
  [
    "stamen"
  ],
  [
    "mark",
    "brand",
    "stain",
    "stigma"
  ],
  [
    "syntacticsalt"
  ],
  [
    "syntacticsugar"
  ],
  [
    "metasyntacticvariable"
  ],
  [
    "computationallinguistics"
  ],
  [
    "spellchecker"
  ],
  [
    "grammarchecker"
  ],
  [
    "declarativeprogramming"
  ],
  [
    "imperativeprogramming"
  ],
  [
    "disemvowel"
  ]
]
];

export { allWordsInThesaurus };
