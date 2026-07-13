import syllabify from "./syllabify";

function repairSyllables(ipa, vowels) {
  // 1. remove existing "." and stress
  ipa = ipa.replace(/[ˈˌ.]/g, "");

  const sylls = syllabify(ipa, vowels);

  // 3. add "." after each syllable for neatness
  return sylls.map(s => s + ".").join("");
}

export default repairSyllables;