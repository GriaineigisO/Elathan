export const vowelDiacritics = {
  length: {
    1: "ː",
    2: "ːː"
  },
  nasal: {
    true: "̃"
  },
  syllabic: {
    false: "̯"
  },
  voiced: {
    false: "̥"
  },
};

export const consonantDiacritics = {
    length: {
    1: "ː",
    2: "ːː"
  },
  voiced: {
    false: "̥"
  },
  aspirated: {
    true: "ʰ"
  },
  preaspirated: {
    true: "ʰ"
  },
  syllabic: {
    true: "̩"
  },
  palatalised: {
    true: "ʲ"
  },
  velarised: {
    true: "ˠ"
  },
  pharyngealised: {
    true: "ˤ"
  },
  glottalised: {
    true: "ˀ"
  },
  labialised: {
    true: "ʷ"
  },
  nasal_release: {
    true: "ⁿ"
  },
  lateral_release: {
    true: "ˡ"
  },
  ejective: {
    true: "ʼ"
  }
};

export const diacriticPlacement = {
  pre: ["preaspirated"],
  combining: ["nasal", "voiced", "syllabic"],
  post: [ "ejective", "aspirated", "labialised", "glottalised", "velarised", "pharyngealised", "palatalised", "nasal_release", "lateral_release","length"]
};

export const applicableFeatures = {
  vowel: new Set([
    "syllabic",
    "voiced",
    "nasal",
    "length",
  ]),
  plosive: new Set([
    "aspirated",
    "preaspirated",
    "labialised",
    "palatalised",
    "velarised",
    "length",
    "pharyngealised",
    "nasal_release", 
    "lateral_release",
    "ejective",
    "voiced"
  ]),
  fricative: new Set([
    "labialised",
    "palatalised",
    "velarised",
    "aspirated",
    "preaspirated",
    "syllabic",
    "length",
    "voiced"
  ]),
  nasal: new Set([
    "voiced",
    "place_of_articulation",
    "syllabic",
    "length",
  ]),
  "lateral approximant": new Set([
    "voiced",
    "syllabic",
    "length",
  ]),
  trill: new Set([
    "voiced",
    "syllabic",
    "length",
  ]),
  approximant: new Set([
    "place_of_articulation",
    "labialised",
    "palatalised",
    "velarised",
    "length",
  ])
};

