//assigns "frequency" to a syllable or consonant or vowel. If the user included a number in the syllable structure e.g "CV2", then the syllable is duplicated that amount of times, thus giving the syllable a greater chance of being randomly selected when a word is being generated

function assignWeight(arr) {
  // Ensure arr is an array
  const input = Array.isArray(arr) ? arr : Array.from(arr);

  const result = [];

  for (let item of input) {
    // Match: (base)(digits at end)
    // e.g. "e50" => ["e50", "e", "50"]
    const match = item.match(/^(.+?)(\d+)$/);

    if (match) {
      const base = match[1];
      const weight = Number(match[2]);

      for (let i = 0; i < weight; i++) {
        result.push(base);
      }
    } else {
      // no digits → normal weight 1
      result.push(item);
    }
  }

  return result;
}



export default assignWeight;
