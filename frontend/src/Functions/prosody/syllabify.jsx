import segmentIPA from "./segmentIPA";
import ipaChars from "../../assets/ipaChars";

function syllabify(word, vowels, allowedOnsets = true) {
  const letters = segmentIPA(word); // ← phoneme array
  const syllables = [];
  const nuclei = [];

  for (let i = 0; i < letters.length; i++) {
    let ph = letters[i];

    //check if ph includes anything from ipaChars
    ipaChars.forEach((char) => {
      if (ph.includes(char)) {
        const arr = Array.from(ph);
        ph = arr[0]; //ph should be the vowel with the ipaChar removed
      }
    });

    // vowel nucleus
    if (vowels.includes(ph)) {
      nuclei.push(i);
      continue;
    }

    // syllabic consonant nucleus: consonant ending in ̩
    if (ph.endsWith("\u0329")) {
      nuclei.push(i);
      continue;
    }
  }

  // No vowels → return whole word as 1 syllable
  if (nuclei.length === 0) {
    return [letters.join("")];
  }

  let start = 0;

  // --- 2. Build syllables ---
  for (let n = 0; n < nuclei.length; n++) {
    const nucleus = nuclei[n];
    const nextNucleus = nuclei[n + 1] ?? letters.length;

    // Onset = everything from start → nucleus
    const onset = letters.slice(start, nucleus);

    // Consonants between nucleus and next nucleus
    const inter = letters.slice(nucleus + 1, nextNucleus);

    let coda = [];
    let nextOnset = [];

    if (inter.length > 0) {
      if (n === nuclei.length - 1) {
        // FINAL SYLLABLE → ALL leftover consonants go to CODA
        coda = inter;
        nextOnset = [];
      } else if (inter.length === 1) {
        // Single intervocalic consonant → onset of next syllable
        coda = [];
        nextOnset = [inter[0]];
      } else {
        // Multiple consonants → C1 = coda, rest = onset
        coda = [inter[0]];
        nextOnset = inter.slice(1);
      }
    }

    // --- 4. Build the current syllable ---

    const syll = [...onset, letters[nucleus], ...coda].join("");
    syllables.push(syll);

    // Next syllable STARTS after nucleus + coda
    start = nucleus + 1 + coda.length;
  }

  return syllables;
}

export default syllabify;
