const makeSpelling = (consonants, vowels) => {
  const spellingGuide = {};
  //make obj with key (ipa) and value (spelling)

  const makeSpelling = (sounds) => {
    for (let i = 0; i < sounds.length; i++) {
      if (sounds[i].charAt(0) !== "(") {
        //no spelling provided, so ipa and spelling will be the same
        spellingGuide[sounds[i]] = sounds[i];
      } else {
        // Extract the content inside parentheses
        const match = sounds[i].match(/^\(([^=]+)=([^)]+)\)$/);

        if (match) {
          const beforeEquals = match[1];
          const afterEquals = match[2];
          spellingGuide[beforeEquals] = afterEquals;
        } else {
          console.warn(`Invalid spelling format: ${sounds[i]}`);
        }
      }
    }
  };

  makeSpelling(vowels);
  makeSpelling(consonants);

  return spellingGuide;
};

export default makeSpelling;
