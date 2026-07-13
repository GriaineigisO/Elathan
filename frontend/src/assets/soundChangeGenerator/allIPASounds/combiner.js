//combine all base sounds with all possble diacritic combinations to produce a full list of all possible sounds in IPA

import { vowelDimensions, consonantDimensions } from "./soundDimensions.js";
import { baseVowels, baseConsonants } from "./baseSounds.js";
import {
  vowelDiacritics,
  consonantDiacritics,
  diacriticPlacement,
  applicableFeatures,
} from "./diacritics.js";
import fs from "fs";

function dedupeByIPA(sounds) {
  const map = new Map();
  for (const s of sounds) {
    if (!map.has(s.ipa)) {
      map.set(s.ipa, s);
    }
  }
  return [...map.values()];
}

function isLegal(sound) {
  // Prevent impossible combinations
  if (sound.manner === "vowel") {
    if (sound.syllabic === false && sound.length > 0) return false;
    if (sound.voiced === false && sound.nasal === true) return false;
  }

  if (sound.manner === "plosive") {
    if (sound.ejective && sound.voiced) return false;
    if (sound.ejective && sound.aspirated) return false;
    if (sound.preaspirated && sound.aspirated) return false;
    if (sound.palatalised && sound.labialised) return false;
    if (sound.palatalised && sound.velarised) return false;
    if (sound.labialised && sound.velarised) return false;
    if (sound.nasal_release && sound.lateral_release) return false;
  }

  if (sound.manner === "fricative") {
    if (sound.preaspirated && sound.aspirated) return false;
    if (sound.palatalised && sound.labialised) return false;
    if (sound.palatalised && sound.velarised) return false;
    if (sound.labialised && sound.velarised) return false;
    if (sound.place_of_articulation === "glottal" && sound.aspirated)
      return false;
    if (sound.place_of_articulation === "glottal" && sound.preaspirated)
      return false;
  }

  if (sound.manner === "approximant") {
    if (
      sound.palatalised ||
      sound.labialised ||
      sound.velarised ||
      sound.pharyngealised ||
      sound.glottalised
    )
      return false;
  }

  return true;
}

function calculateSonority(sound) {
  if (!sound.place_of_articulation) {
    //sound is a vowel, substract height from 16 to get sonority
    return 16 - sound.height;
  }

  if (sound.manner === "flap") return 10;
  if (sound.manner === "trill") return 9;
  if (sound.manner === "approximant") return 8;
  if (sound.manner === "lateral approximant") return 7;
  if (sound.manner === "nasal") return 6;
  if (sound.manner === "fricative" && sound.voiced) return 5;
  if (sound.manner === "fricative" && !sound.voiced) return 4;
  if (sound.manner === "plosive" && sound.voiced) return 3;
  if (sound.manner === "plosive" && !sound.voiced) return 2;
  if (sound.manner === "plosive" && sound.voiced && sound.ejective) return 1;
  if (sound.manner === "plosive" && !sound.voiced && sound.ejective) return 0;
}

function renderIPA(sound, diacritics, placement) {
  let pre = "";
  let combining = "";
  let post = "";

  const allowed = applicableFeatures[sound.manner] ?? new Set();

  const apply = (feature, bucket) => {
  if (!allowed.has(feature)) return bucket;

  const value = sound[feature];

  // SPECIAL CASE: voicing
  if (feature === "voiced") {
    // If voicing matches the base symbol, do nothing
    if (value === sound._baseVoiced) return bucket;

    const mark = diacritics.voiced?.[value];
    if (mark) bucket += mark;
    return bucket;
  }

  const mark = diacritics[feature]?.[value];
  if (mark) bucket += mark;
  return bucket;
};



  for (const feature of placement.pre) {
    pre = apply(feature, pre) ?? pre;
  }

  for (const feature of placement.combining) {
    combining = apply(feature, combining) ?? combining;
  }

  for (const feature of placement.post) {
    post = apply(feature, post) ?? post;
  }

  return pre + sound.ipa + combining + post;
}

function cartesianProduct(base, dimensions) {
  let results = base;
  for (const [feature, values] of Object.entries(dimensions)) {
    const next = [];
    for (const r of results) {
      for (const v of values) {
        next.push({
  ...r,
  _baseVoiced: r._baseVoiced ?? r.voiced,
  [feature]: v,
});

      }
    }
    results = next;
  }

  return results;
}

const vowels = dedupeByIPA(
  cartesianProduct(baseVowels, vowelDimensions)
    .filter(isLegal)
    .map((v) => ({
      ...v,
      ipa: renderIPA(v, vowelDiacritics, diacriticPlacement),
      sonority: calculateSonority(v),
    }))
);

const consonants = dedupeByIPA(
  cartesianProduct(baseConsonants, consonantDimensions)
    .filter(isLegal)
    .map((v) => ({
      ...v,
      ipa: renderIPA(v, consonantDiacritics, diacriticPlacement),
      sonority: calculateSonority(v),
    }))
);

fs.writeFileSync(
  "allConsonants.js",
  JSON.stringify(consonants, null, 2),
  "utf8"
);

fs.writeFileSync("allVowels.js", JSON.stringify(vowels, null, 2), "utf8");
