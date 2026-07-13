//may turn a word into a particle or affix, following the patterns laid out in "World lexicon of Grammaticalization" by Bern Heine and Tania Kuteva

import meaningKeys from "../assets/meaningKeys.jsx";
import grammaticalisationPatterns from "../assets/grammaticalisations.jsx";
import vowels from "../assets/allVowels.jsx";
import syllabify from "./prosody/syllabify.jsx";



const reduceWord = (word, prosodyType, type) => {
  //a word may or may not have syllables snipped from it in the process of becoming grammaticalised. Only 1 in 4 cases will not be reduced
  if (Math.floor(Math.random() * 7) === 1 || type === "verb" || type === "noun" || type === "adj") {
  return word;
}; //don't reduce at all

  const syllabified = syllabify(word, vowels);

  let chosenSyllable = "";

  //if a word is to be reduced, there are various methods of doing so.

  //if a language has stress, it may or may not preserve only the stressed syllable
  if (prosodyType === "stress" && Math.floor(Math.random() * 2) === 1) {
  const stressed = syllabified.find(s => s.startsWith("ˈ"));
  if (stressed) chosenSyllable = stressed;
}


  //decide to keep only a syllable from the left or right boundary
  if (Math.floor(Math.random() * 4) === 1) {
    //more likely to preserve the leftmost/first syllable
    chosenSyllable = syllabified[syllabified.length - 1];
  } else {
    chosenSyllable = syllabified[0];
  }

  const finalSyllable = [];
  //now that a syllable has been chosen, decide if it will be fully retained, or clipped further - only preserve contingent chars, if one char is not chosen, then no chars after it may be chosen
  const syllableArr = Array.from(chosenSyllable);

  if (type === "affix") {
    //since an affix won't stand alone, it may be comprised purely of non-syllabic consonants
    for (let i = 0; i < syllableArr.length; i++) {
      if (i === 0) {
        if (syllableArr[i] === "ˈ") {
          finalSyllable.push(syllableArr[i + 1]); //ensure the first char is always chosen
          i++;
        } else {
          finalSyllable.push(syllableArr[i]); //ensure the first char is always chosen
        }
      } else {
        if (Math.floor(Math.random() * 5) < 4) {
          finalSyllable.push(syllableArr[i]);
        } else {
          break;
        }
      }
    }
  }

  if (type === "particle") {
    //since the particle will be an indepentent word, ensure that it can stand alone as a syllable i.e has a nucleus
    let nucleusFound = false;
    for (let i = 0; i < syllableArr.length; i++) {
      if (!nucleusFound) {
  if (syllableArr[i + 1] === "\u0329") {
    finalSyllable.push(syllableArr[i] + syllableArr[i + 1]);
    i++; // skip the combining mark
  } else {
    finalSyllable.push(syllableArr[i]);
  }

  if (vowels.includes(syllableArr[i]) || syllableArr[i + 1] === "\u0329") {
    nucleusFound = true;
  }
}

    }
  }

  return finalSyllable.join("");
};

const grammaticalise = (word, prosodyType) => {
  //loop through all of a word's meaning
  meaningKeys.forEach((key) => {
    if (word[key.meaning]) {
      //check if the found meanings are in grammaticalisationPatterns
      grammaticalisationPatterns.forEach((pattern) => {
        //check if the originalWord in grammaticalisationPatterns has the same part of speech and if it shares a meaning with the supplied word

        if (
          Object.hasOwn(pattern.originalWord, key.meaning) &&
          pattern.originalWord[key.meaning].some((meaning) =>
            word[key.meaning].includes(meaning)
          )
        ) {
          //match has been found, now there is a 1 in 4 chance of grammaticalisation
          if (Math.floor(Math.random() * 4) === 0) {

            //now create the new affix or particle
            const grammaticlisedWord = reduceWord(
              word.ipa,
              prosodyType,
              pattern.type
            );

            //if various grammaticalised meanings exist, choose a random amount of random meanings
            let grammaticalisedMeanings = [];
            if (pattern.grammaticalised.length === 1) {
              grammaticalisedMeanings.push(pattern.grammaticalised[0]);
            } else {
              let pool = pattern.grammaticalised;

              // choose a random number from 1 to pool.length
              let amount = Math.floor(Math.random() * pool.length) + 1;

              for (let i = 0; i < amount; i++) {
                let index = Math.floor(Math.random() * pool.length);
                let chosen = pool[index];

                if (!grammaticalisedMeanings.includes(chosen)) {
                  grammaticalisedMeanings.push(chosen);
                }
              }
            }

            word.grammaticalised_word = grammaticlisedWord;
            
            if (pattern.type === "affix") {
              word.grammaticalised_meaning = {
                affix_meaning: grammaticalisedMeanings,
              };
              word.grammaticalised_word_type = Math.floor(Math.random() * 2) === 1 ? "suffix" : "prefix"
            }
            if (pattern.type === "num") {
              word.grammaticalised_meaning = {
                num_meaning: grammaticalisedMeanings,
              };
              word.grammaticalised_word_type = Math.floor(Math.random() * 2) === 1 ? "suffix" : "prefix"
            }
            if (pattern.type === "particle") {
              word.grammaticalised_meaning = {
                part_meaning: grammaticalisedMeanings,
              };
            }
            if (pattern.type === "adp") {
              word.grammaticalised_meaning = {
                adp_meaning: grammaticalisedMeanings,
              };
            }
            if (pattern.type === "conj") {
              word.grammaticalised_meaning = {
                conj_meaning: grammaticalisedMeanings,
              };
            }
            if (pattern.type === "adv") {
              word.grammaticalised_meaning = {
                adv_meaning: grammaticalisedMeanings,
              };
            }
            if (pattern.type === "adj") {
              word.grammaticalised_meaning = {
                adj_meaning: grammaticalisedMeanings,
              };
            }
            if (pattern.type === "interj") {
              word.grammaticalised_meaning = {
                interj_meaning: grammaticalisedMeanings,
              };
            }
            if (pattern.type === "noun") {
              word.grammaticalised_meaning = {
                noun_meaning: grammaticalisedMeanings,
              };
            }
            if (pattern.type === "pron") {
              word.grammaticalised_meaning = {
                pron_meaning: grammaticalisedMeanings,
              };
            }


            word[key.forms] = null;
          }
        }
      });
    }
  });
};

export default grammaticalise;
