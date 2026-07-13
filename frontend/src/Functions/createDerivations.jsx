import removeHomophones from "../Components/generateWord";
import spell from "../Components/orthography";
import applyProsody from "./prosody/applyProsody";
import removeProsody from "./prosody/removeProsody";
import affixArray from "../assets/affixArray";
import potentialAffixArray from "../assets/potentialAffixArray";
//const derivationsDesponse = await fetch("/affixDerivations.json");
//const derivations = await derivationsDesponse.json();
import compoundDerivations from "../assets/compoundDerivations";
import meaningKeys from "../assets/meaningKeys";
import syllabify from "./prosody/syllabify";

const createDerivations = (
  words,
  consonants,
  vowels,
  affixSyllableStructure,
  minAffixSyllables,
  maxAffixSyllables,
  allCategoryValues,
  spellingGuide,
  themes,
  prosodyType,
  primaryStressPlacement,
  stressShiftWithAffix,
  compoundStressPlacement,
  whenNoHeavySyllable,
  accentPlacement,
  adjectiveNature,
  chosenAffixes,
  useOnlySelectedAffixes,
  chosenDerivations,
  chosenCompoundTypes,
  compoundChance,
  finalAffixSelection,
  numbers
) => {
const [derivations, setDerivations] = useState([]);

  useEffect(() => {
      async function loadDerivations() {
        const response = await fetch("/affixDerivations.json");
        const json = await response.json();
        setDerivations(json);
      }
  
      loadDerivations();
    }, []);


  let lastGeneratedId = 0;

  function chance(percent) {
    return Math.random() * 100 < percent;
  }

  function generateSafeId() {
    const base = Date.now() * 100;
    const randomPart = Math.floor(Math.random() * 100);
    let id = base + randomPart;
    if (id <= lastGeneratedId) id = lastGeneratedId + 1;
    lastGeneratedId = id;
    return id;
  }

  //cap max limit at 300-500 derivational affixes for a language
  const amountOfAffixes = Math.floor(Math.random() * (300 - 500) + 300);

  function addRandomlyChosenAffixes() {
    affixArray.forEach((affix) => {
      if (!finalAffixSelection.includes(affix)) finalAffixSelection.push(affix);
    });

    potentialAffixArray.forEach((affix) => {
      //if the affix theme is a user selected theme, then include it
      if (
        themes.some((theme) => affix.themes && affix.themes.includes(theme)) &&
        !finalAffixSelection.includes(affix)
      ) {
        finalAffixSelection.push(affix);
      }
      if (
        themes.some((theme) => affix.mandatory_themes && affix.mandatory_themes.includes(theme)) &&
        !finalAffixSelection.includes(affix)
      ) {
        finalAffixSelection.push(affix);
      }

      //else, it is a random chance if an affix is chosen
      if (Math.floor(Math.random() * 2) === 0 && !affixArray.includes(affix)) {
        if (
          !finalAffixSelection.includes(affix) &&
          finalAffixSelection.length < amountOfAffixes
        )
          finalAffixSelection.push(affix);
      }
    });
  }

  if (chosenAffixes.length === 0) {
    addRandomlyChosenAffixes();
  }

  if (!useOnlySelectedAffixes) {
    addRandomlyChosenAffixes();
  }

  if (Object.keys(chosenAffixes).length > 0) {
    //chose only user selected affixes
    for (const affix in chosenAffixes) {
      if (!finalAffixSelection.includes(chosenAffixes[affix]))
        finalAffixSelection.push(chosenAffixes[affix]);
    }
  }

  const affixObj = {};

  function minceAffix(affix) {
    const syllables = syllabify(removeProsody(affix), vowels);

    const finalAffix = [];

    for (let i = 0; i < syllables.length; i++) {
      if (i === 0) {
        //first syllable always survives
        finalAffix.push(syllables[i]);
      } else {
        if (Math.floor(Math.random() * 2) === 1) {
          //syllable has a 50% chance of surviving mincing
          finalAffix.push(syllables[i]);
        } else {
          //syllable not chosen, subsequent syllables not chosen either
          break;
        }
      }
    }

    return finalAffix.join("");
  }

  function createOrDeriveAffix(affix) {
    const chooseOriginWord = Math.floor(Math.random() * 3) !== 1; //66% an originWord is chosen

    if (affix.originWords && chooseOriginWord) {
      //instead of making the affix an entirely new morpheme, take one of the meanings in originWords and use the word created for it to form the affix, with optional "mincing"

      let meaningToUse = {};
      if (affix.originWords.length === 1) {
        meaningToUse = affix.originWords[0];
      } else {
        meaningToUse =
          affix.originWords[
            Math.floor(Math.random() * affix.originWords.length)
          ];
      }

      let selectedWord = "";

      meaningKeys.forEach((key) => {
        if (key.type === "number" && meaningToUse.num_meaning) {
          selectedWord = numbers.find(
            (number) =>
              number.num_meaning &&
              number.num_meaning[0] === meaningToUse.num_meaning
          );
        } else {
          if (meaningToUse[key.meaning]) {
            //now find the word with this meaning in words
            selectedWord = words.find(
              (word) =>
                word[key.meaning] &&
                word[key.meaning][0] === meaningToUse[key.meaning]
            );
          }
        }
      });

      //if selectedWord is undefined at this point, it's probably because the chosen originWord was a word not actually present in coreEnglishWords.js, so to prevent an error, here I'll just make the affix be a randomly generated word
      selectedWord = {
        ipa: removeHomophones(
          consonants,
          vowels,
          affixSyllableStructure,
          minAffixSyllables,
          maxAffixSyllables,
          allCategoryValues,
          null,
          null,
          null
        ),
      }


      let obj = {
        affix: minceAffix(selectedWord.ipa),
        originId: selectedWord.id,
      };

      return obj;
    } else {
      let obj = {
        affix: removeHomophones(
          consonants,
          vowels,
          affixSyllableStructure,
          minAffixSyllables,
          maxAffixSyllables,
          allCategoryValues,
          null,
          null,
          null
        ),
      };
      return obj;
    }
  }

  finalAffixSelection.forEach((affix) => {
    let suffixOrPrefix = "";

    if (Math.floor(Math.random() * 2) === 0) {
      suffixOrPrefix = "suffix";
    } else {
      suffixOrPrefix = "prefix";
    }

    let isDerivedFromAWord = false;

    let derivedAffix;

    if (affix.affix) {
      derivedAffix = { affix: affix.affix };
    } else {
      derivedAffix = createOrDeriveAffix(affix);
      isDerivedFromAWord = true;
    }

    affixObj[affix.affixName] = {
      affix: derivedAffix.affix,
      id: generateSafeId(),
      word_type: affix.type || suffixOrPrefix,
      affix_meaning: [affix.affixDescription],
      etymology: isDerivedFromAWord
        ? {
            etymology_type: "derived",
            first_element_id: derivedAffix.originId,
            etymology_id: generateSafeId(),
          }
        : null,
    };
  });

  /****************************************************** */

  /**Apply Affixes to words and create meanings of derivations*************************/

  const applyAffix = (originalWord, affix, suffixOrPrefix) => {
    if (suffixOrPrefix === "suffix") {
      if (stressShiftWithAffix) {
        return applyProsody(
          originalWord + affix,
          prosodyType,
          primaryStressPlacement,
          "affix",
          "noSecondaryStress",
          whenNoHeavySyllable
        );
      } else {
        return (
          applyProsody(
            originalWord,
            prosodyType,
            primaryStressPlacement,
            "affix",
            "noSecondaryStress",
            whenNoHeavySyllable
          ) + affix
        );
      }
    } else {
      if (stressShiftWithAffix) {
        return applyProsody(
          affix + originalWord,
          prosodyType,
          primaryStressPlacement,
          "affix",
          "noSecondaryStress",
          whenNoHeavySyllable
        );
      } else {
        return (
          affix +
          applyProsody(
            originalWord,
            prosodyType,
            primaryStressPlacement,
            "affix",
            "noSecondaryStress",
            whenNoHeavySyllable
          )
        );
      }
    }
  };

  //meaningKey is the part of speech of the original word

  const derive = (
    chanceOfHappening,
    affix,
    originalMeaning,
    derivedMeaning,
    originalPartOfSpeech,
    derivedPartOfSpeech
  ) => {
    if (chanceOfHappening == null) {
      chanceOfHappening = Math.floor(Math.random() * 101);
    }

    const willHappen = chance(chanceOfHappening);

    if (!willHappen) return false;

    let suffixOrPrefix = affixObj[affix].word_type;

    let meaning = "";

    if (
      derivedPartOfSpeech === "adj_meaning" &&
      adjectiveNature === "stative"
    ) {
      meaning = "verb_meaning";
    } else {
      meaning = derivedPartOfSpeech;
    }

    let originals = Array.isArray(originalMeaning)
      ? originalMeaning
      : [originalMeaning];

    //if adjectives are stative, make sure supplied adjectives start with "be "
    if (adjectiveNature === "stative" && originalPartOfSpeech === "adj") {
      originals.map((original) => {
        return `be ${original}`;
      });
    }

    let deriveds = Array.isArray(derivedMeaning)
      ? (() => {
          const arr = derivedMeaning;
          const count = Math.floor(Math.random() * arr.length) + 1;
          const shuffled = arr.slice().sort(() => Math.random() - 0.5);
          return shuffled.slice(0, count);
        })()
      : [derivedMeaning];

    //if adjectives are stative, make sure resulting adjectives start with "be "
    if (adjectiveNature === "stative" && toAdjectives.includes(affix)) {
      deriveds = deriveds.map((derived) => {
        derived = derived.trim();
        return `be ${derived}`;
      });
    }

    if (
      adjectiveNature === "stative" &&
      originalPartOfSpeech === "adj_meaning"
    ) {
      originalPartOfSpeech = "verb_meaning";

      originals = originals.map((item) => {
        item = item.trim();

        // already has "be "
        if (item.startsWith("be ")) return item;

        // add prefix
        return `be ${item}`;
      });
    }

    for (const word of words) {
      if (
        !(
          word[originalPartOfSpeech] &&
          originals.some((m) => word[originalPartOfSpeech].includes(m))
        )
      ) {
        continue;
      }

      const originalWord = word.ipa;
      const originalId = word.id;
      let originalMeaning = [];
      meaningKeys.forEach((key) => {
        if (word[key.meaning]) {
          originalMeaning.push(word[key.meaning]);
        }
      });

    
      // derive the form ONCE
      const derivedWord = applyAffix(
        originalWord,
        affixObj[affix].affix,
        suffixOrPrefix
      );

      // remove old conflicting words ONCE
      for (let i = words.length - 1; i >= 0; i--) {
        const w = words[i];
        if (
          Array.isArray(w[originalPartOfSpeech]) &&
          w[originalPartOfSpeech].some((m) => deriveds.includes(m))
        ) {
          words.splice(i, 1);
        }
      }

      //choose random amount of random derived meanings
      const finalDerivedMeanings = [];
      let randomIndex = Math.floor(Math.random() * deriveds.length);
      let randomFirstIndex = deriveds[randomIndex];
      finalDerivedMeanings.push(randomFirstIndex);
      deriveds.splice(randomIndex, 1);
      //now randomly choose what other indexes can join the final meaning
      deriveds.forEach((derived) => {
        if (Math.floor(Math.random() * 3) === 2)
          finalDerivedMeanings.push(derived);
      });

      // create ONE new word with ALL derived meanings
      const newWord = {
        translation: spell(derivedWord, spellingGuide),
        id: generateSafeId(),
        ipa: derivedWord,
        isAffixedDerived: true,
        word_type: "word",
        etymology:
          suffixOrPrefix === "suffix"
            ? {
                etymology_type: "derived",
                first_element_id: originalId,
                second_element_id: affixObj[affix].id,
                second_element_word: spell(
                  affixObj[affix].affix,
                  spellingGuide
                ),
                second_element_meaning: affixObj[affix].affix_meaning,
                etymology_id: generateSafeId(),
              }
            : {
                etymology_type: "derived",
                first_element_id: affixObj[affix].id,
                second_element_id: originalId,
                second_element_word: spell(originalWord, spellingGuide),
                second_element_meaning: originalMeaning.join(", "),
                etymology_id: generateSafeId(),
              },
        [meaning]: finalDerivedMeanings, // <- one word, multiple meanings
      };

      words.push(newWord);
      break; // <-- IMPORTANT: stop after one new word
    }
  };

  const includeIfLinguistics = [
    "transVerbToABleAdjectiveAffix",
    "causative",
    "NtoADJPrototypicalAffix",
    "similar",
    "verbToSubjectAdj",
  ];

  derivations.forEach((derivation) => {
    let count = 0;
    finalAffixSelection.forEach((affix) => {
      if (affix.affixName === derivation.affix) {
        count++;
      }
    });

    if (count === 0) return;

    let chance = derivation.chance;

    //ensure thematic derivations can only occur when their theme has been selected
   
    if (
      derivation.mandatory_themes &&
      derivation.mandatory_themes.length > 0 &&
      !derivation.mandatory_themes.every((theme) => themes.includes(theme))
    ) {
      chance = 0;
    }
    if (
      derivation.themes &&
      derivation.themes.length > 0 &&
      !themes.some((theme) => derivation.themes.includes(theme))
    ) {
      chance = 0;
    }

    if (chosenDerivations.includes(derivation)) {
      chance = 100;
    }

    let useOnlySelectedDerivations = false;

    if (Object.keys(chosenAffixes).length > 0) {
      for (const affix in chosenAffixes) {
        if (derivation.affix === chosenAffixes[affix].affixName) {
          if (
            !chosenDerivations.includes(derivation) &&
            chosenAffixes[affix].useOnlySelectedDerivations
          ) {
            chance = 0;
          }
        }
      }
    }

    derive(
      chance,
      derivation.affix,
      derivation.originalMeanings,
      derivation.derivedMeanings,
      derivation.originalPartOfSpeech,
      derivation.derivedPartOfSpeech
    );
  });

  /*********************************************************************************/

  //Now add affixes to the words array

  for (const value of Object.entries(affixObj)) {
    let newObj = {
      word_type: value[1].word_type,
      affix_meaning: value[1].affix_meaning,
      id: value[1].id,
      translation: spell(value[1].affix, spellingGuide),
      ipa: value[1].affix,
      etymology: value[1].etymology,
    };
    words.push(newObj);
  }

  /***MAKE COMPOUNDS***********************************************************************/
  const compound = (chanceOfHappening, word1, word2, compoundMeaning, note) => {
    if (chanceOfHappening == null) {
      chanceOfHappening = Math.floor(Math.random() * 101);
    }

    const willHappen = chance(chanceOfHappening);

    if (!willHappen) return false;

    const firstWords = Array.isArray(word1.meaning)
      ? word1.meaning
      : [word1.meaning];
    const secondWords = Array.isArray(word2.meaning)
      ? word2.meaning
      : [word2.meaning];
    const derivedWords = Array.isArray(compoundMeaning.meaning)
      ? (() => {
          const arr = compoundMeaning.meaning;
          const count = Math.floor(Math.random() * arr.length) + 1; // number of items to pick (1–length)
          const shuffled = arr.slice().sort(() => Math.random() - 0.5); // shallow shuffle
          return shuffled.slice(0, count); // take random subset
        })()
      : [compoundMeaning.meaning];

    let firstWord = "";
    let firstWordId = "";

    let secondWord = "";
    let secondWordId = "";
    let secondWordMeaning = [];

    for (const word of words) {
      if (
        word[word1.pos] &&
        word[word1.pos].some((m) => firstWords.includes(m))
      ) {
        firstWord = word.ipa;
        firstWordId = word.id;
      }

      if (
        word[word2.pos] &&
        secondWords.some((m) => word[word2.pos].includes(m))
      ) {
        secondWord = word.ipa;
        secondWordId = word.id;
        meaningKeys.forEach((key) => {
          if (word[key.meaning]) {
            secondWordMeaning.push(word[key.meaning]);
          }
        });
      }
    }

    if (firstWord && secondWord) {
      //removes all words which have the same meaning as the new compound
      for (let i = words.length - 1; i >= 0; i--) {
        const w = words[i];
        if (
          Array.isArray(w[compoundMeaning.pos]) &&
          w[compoundMeaning.pos].some((i) => derivedWords.includes(i))
        ) {
          words.splice(i, 1);
        }
      }

      //compound the two words together
      let compound = "";

      if (compoundStressPlacement === "first") {
        compound =
          applyProsody(
            firstWord,
            prosodyType,
            primaryStressPlacement,
            "compound",
            "noSecondaryStress",
            whenNoHeavySyllable
          ) + removeProsody(secondWord);
      }

      if (compoundStressPlacement === "second") {
        compound =
          removeProsody(firstWord) +
          applyProsody(
            secondWord,
            prosodyType,
            primaryStressPlacement,
            "compound",
            "noSecondaryStress",
            whenNoHeavySyllable
          );
      }

      if (compoundStressPlacement === "firstSecondary") {
        compound =
          applyProsody(
            firstWord,
            prosodyType,
            primaryStressPlacement,
            "compound",
            "noSecondaryStress",
            whenNoHeavySyllable
          ) +
          applyProsody(
            secondWord,
            prosodyType,
            primaryStressPlacement,
            "compound",
            "secondaryStress",
            whenNoHeavySyllable
          );
      }

      if (compoundStressPlacement === "secondSecondary") {
        compound =
          applyProsody(
            firstWord,
            prosodyType,
            primaryStressPlacement,
            "compound",
            "secondaryStress",
            whenNoHeavySyllable
          ) +
          applyProsody(
            secondWord,
            prosodyType,
            primaryStressPlacement,
            "compound",
            "noSecondaryStress",
            whenNoHeavySyllable
          );
      }

      //now, add the new compound
      let newObj = {
        translation: spell(compound, spellingGuide),
        ipa: compound,
        id: generateSafeId(),
        note: note ? note : null,
        isCompound: true,
        word_type: "word",
        [compoundMeaning.pos]: [...derivedWords],
        etymology: {
          etymology_type: "derived",
          first_element_id: firstWordId,
          second_element_id: secondWordId,
          second_element_word: spell(secondWord, spellingGuide),
          second_word_meaning: secondWordMeaning.join(", "),
          etymology_id: generateSafeId(),
        },
      };
      words.push(newObj);
    }
  };

  compoundDerivations.forEach((derivation) => {
    let chance = compoundChance;
    if (chance > 0) {
      if (derivation[2].themes) {
        if (themes.some((theme) => derivation[2].themes.includes(theme))) {
          chance = 100;
        } else {
          chance = 0;
        }
      }
    }

    //*********************************************/
    //determine if a given compound is one of the chosen types, e.g noun-noun, noun-verb etc, only compound if so
    let firstPartOfSpeech = derivation[0].pos;
    let secondPartOfSpeech = derivation[1].pos;

    meaningKeys.forEach((key) => {
      if (key.meaning === firstPartOfSpeech) {
        firstPartOfSpeech = key.type;
      }
      if (key.meaning === secondPartOfSpeech) {
        secondPartOfSpeech = key.type;
      }
    });

    const merged = `${firstPartOfSpeech}-${secondPartOfSpeech}`;

    if (chosenCompoundTypes.includes(merged)) {
      compound(
        chance,
        derivation[0],
        derivation[1],
        derivation[2],
        derivation[3] ? derivation[3] : null
      );
    }
    //*********************************************/
  });

  let sorted = words.sort((a, b) => a.translation.localeCompare(b.translation));
  return sorted;
};

export default createDerivations;
