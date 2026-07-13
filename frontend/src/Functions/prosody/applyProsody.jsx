import ipaChars from "../../assets/ipaChars";
import removeNotation from "./removeNotation";
import removeProsody from "./removeProsody";
import syllabify from "./syllabify";
import segmentIPA from "./segmentIPA";
import vowels from "../../assets/allVowels";

const applyProsody = (
  word,
  prosodyType,
  primaryStressPlacement,
  derivation,
  secondaryStress,
  whenNoHeavySyllable,
  accentPlacement
) => {
  const syllables = [];
  let wordWithProsody = "";

  

  word = removeProsody(word);
  //if a word is being derived, first remove all previous prosody notation
  if (derivation !== "notDerived") {
    word = removeProsody(word);
  }

  /**************SEGMENT WORD INTO SYLLABLES***********************/

  function countMoras(syllable, vowels) {
    const seg = segmentIPA(syllable);
    let mora = 0;

    // Count vowels (length = 2)
    for (let ph of seg) {
      if (vowels.includes(ph)) {
        mora += 1;
      }
    }

    // Add coda mora: last phoneme not a vowel?
    const last = seg[seg.length - 1];
    if (!vowels.includes(last)) {
      mora += 1;
    }

    return mora;
  }

  let syllabifiedWord = syllabify(word, vowels);

  /*************************************/

  /**************APPLY PROSODY***********************/

  if (prosodyType === "syllable") {
    const withDots = [];

    for (let i = 0; i < syllabifiedWord.length; i++) {
      withDots.push(syllabifiedWord[i]);
      withDots.push(".");
    }

    // replace original
    syllabifiedWord = withDots;
  }

  if (prosodyType === "stress") {
    //place "ˈ" and "." around the selected stressed syllable
    const stressMarker = secondaryStress === "secondaryStress" ? "ˌ" : "ˈ";
    function placeStressBasedOnPosition(syllabifiedWord, placemant) {
      if (placemant === "first" || syllabifiedWord.length === 1) {
        syllabifiedWord.splice(0, 0, stressMarker);
        syllabifiedWord.splice(2, 0, ".");
      } else {
        if (placemant === "second") {
          syllabifiedWord.splice(1, 0, stressMarker);
          syllabifiedWord.splice(3, 0, ".");
        } else if (placemant === "secondLast") {
          syllabifiedWord.splice(syllabifiedWord.length - 2, 0, stressMarker);
          syllabifiedWord.splice(syllabifiedWord.length - 1, 0, ".");
        } else if (placemant === "last") {
          syllabifiedWord.splice(syllabifiedWord.length - 1, 0, stressMarker);
          syllabifiedWord.splice(syllabifiedWord.length, 0, ".");
        }
      }
    }

    if (primaryStressPlacement === "firstHeavy") {
      //if word has one syllable, then stress that
      if (syllabifiedWord.length === 1) {
        syllabifiedWord.splice(0, 0, stressMarker);
        syllabifiedWord.splice(2, 0, ".");
      } else {
        //detect heavy syllables
        for (let i = 0; i < syllabifiedWord.length; i++) {
         
          const weight = countMoras(syllabifiedWord[i], vowels);

          if (weight >= 2) {
            //syllabifiedWord[i] = stressMarker + syllabifiedWord[i];
            syllabifiedWord.splice(i, 0, stressMarker);
            syllabifiedWord.splice(i + 2, 0, ".");
            i++;
            break;
          }

          if (i === syllabifiedWord.length - 1) {
            //reached final syllable without finding a heavy syllable, thus default to how words without heavy syllables are stressed
            placeStressBasedOnPosition(syllabifiedWord, whenNoHeavySyllable);
            break;
          }
        }
      }
    } else if (primaryStressPlacement === "lastHeavy") {
      //if word has one syllable, then stress that
      if (syllabifiedWord.length === 1) {
        syllabifiedWord.splice(0, 0, stressMarker);
        syllabifiedWord.splice(2, 0, ".");
      } else {
        //detect heavy syllables
        const heavySyllableIndexes = []; //store all indexes of heavy syllables here, then choose the last one

        for (let i = 0; i < syllabifiedWord.length; i++) {
          const weight = countMoras(syllabifiedWord[i], vowels);

          if (weight >= 2) {
            heavySyllableIndexes.push(i);
          }
        }

        if (heavySyllableIndexes.length === 0) {
          //no heavy syllables found
          placeStressBasedOnPosition(syllabifiedWord, whenNoHeavySyllable);
        } else {
          syllabifiedWord.splice(
            heavySyllableIndexes[heavySyllableIndexes.length - 1],
            0,
            stressMarker
          );
          syllabifiedWord.splice(
            heavySyllableIndexes[heavySyllableIndexes.length - 1] + 2,
            0,
            "."
          );
        }
      }
    } else {
      placeStressBasedOnPosition(syllabifiedWord, primaryStressPlacement);
    }
  }

  if (prosodyType === "pitch") {
    if (accentPlacement === "free") {
      //any syllable may be the accented syllable

      let randomlyAccentedSyllable = Math.floor(
        Math.random() * syllabifiedWord.length + 1
      );

      for (let i = 0; i < syllabifiedWord.length; i++) {
        if (i + 1 === randomlyAccentedSyllable) {
          //accented syllable chosen, now to a=find the nucleus and attach an acute accent
          //first, turn syllable into an array
          let syllableArr = Array.from(syllabifiedWord[i]);
          //iterate till the nucelus is found
          for (let j = 0; j < syllableArr.length; j++) {
            if (
              vowels.includes(syllableArr[j]) ||
              syllableArr[j + 1] === "\u0329"
            ) {
              //attach acute accent
              syllableArr[j] = syllableArr[j] + "\u0301";

              //replace original syllable with now-accented syllable
              syllabifiedWord[i] = syllableArr.join("");
              break;
            }
          }
        }
      }
    }
  }

  /*************************************/

  const joined = syllabifiedWord.join("");

  return joined;
};

export default applyProsody;
