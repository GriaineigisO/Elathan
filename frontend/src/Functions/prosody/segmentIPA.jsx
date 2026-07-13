import ipaChars from "../../assets/ipaChars";

function segmentIPA(word) {
    const chars = Array.from(word);

    // affricate tie bars
    const tieBars = ["\u0361", "\u035C"]; // ͡ and ͜

    let segments = [];
    let i = 0;

    while (i < chars.length) {
      let current = chars[i];

      // 1. If this is a tie-bar, attach it to previous (should not happen first)
      if (tieBars.includes(current)) {
        segments[segments.length - 1] += current;

        // also attach next consonant
        if (i + 1 < chars.length) {
          segments[segments.length - 1] += chars[i + 1];
          i += 2;
          continue;
        }
      }

      // 2. Start a new segment with the base character
      let ph = current;

      // 3. Merge all following combining diacritics into this phoneme
      while (i + 1 < chars.length && ipaChars.includes(chars[i + 1])) {
        ph += chars[i + 1];
        i++;
      }

      segments.push(ph);
      i++;
    }

    return segments;
  }

  export default segmentIPA;