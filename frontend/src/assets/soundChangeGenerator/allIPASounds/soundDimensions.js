//store of all qualities which in IPA are marked with diacritics

export const vowelDimensions = {
  length: [0, 1, 2],
  nasal: [false, true],
  voiced: [true, false],
  syllabic: [true, false],
};

export const consonantDimensions = {
  aspirated: [true, false],
  preaspirated: [true, false],
  syllabic: [true, false],
  voiced: [true, false],
  velarised: [true, false],
  palatalised: [true, false],
  pharyngealised: [true, false],
  labialised: [true, false],
  glottalised: [true, false],
  ejective: [true, false],
  nasal_release: [true, false],
  lateral_release: [true, false],
  length: [0, 1, 2],
};
