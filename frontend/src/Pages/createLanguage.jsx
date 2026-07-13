import React, { use } from "react";
import { useState, useEffect } from "react";
import removeHomophones from "../Components/generateWord.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import spell from "../Components/orthography.jsx";
import { allWordsInThesaurus } from "../assets/thesaurus.js";
import CategoryManager from "../Components/syllableCategories.jsx";
import createDerivations from "../Functions/createDerivations.jsx";
import assignWeight from "../Functions/phonologyWeight.jsx";
import SavePhonologyModal from "../Components/savePhonologyModal.jsx";
import SelectPhonologyModal from "../Components/selectPhonology.jsx";
import ManageDerivationsModal from "../Components/ManageDerivationsModal.jsx";
import Collapsible from "../Components/collapsable.jsx";
import PaginatedGeneratedLanguage from "../Components/PaginatedGeneratedLanguage.jsx";
import SpellingCreator from "../Components/spellingCreator.jsx";
import masculine from "../assets/gender/masculine.json";
import feminine from "../assets/gender/feminine.json";
import neuter from "../assets/gender/neuter.json";
import animate from "../assets/gender/animate.jsx";
import inanimate from "../assets/gender/inanimate.jsx";
import meaningKeys from "../assets/meaningKeys.jsx";
import applyProsody from "../Functions/prosody/applyProsody.jsx";
import { toWords } from "number-to-words";
import affixArray from "../assets/affixArray";
import potentialAffixArray from "../assets/potentialAffixArray";

//const derivationsDesponse = await fetch("/affixDerivations.json");
//const derivations = await derivationsDesponse.json();

const coreEnglishWordsResponse = await fetch("/coreEnglishWords.json");
const coreEnglishWords = await coreEnglishWordsResponse.json();

import compoundDerivations from "../assets/compoundDerivations";
import ManageCompounds from "../Components/ManageCompounds.jsx";
import capitaliseFirstLetter from "../Functions/capitaliseFirstLetter.jsx";
import ThemeSelection from "../Components/themeSelection.jsx";
import SoundChangeMaker from "../Components/soundChangeMaker.jsx";
import applySoundChange from "../Functions/soundChange.jsx";
import PaginateAffixes from "../Components/PaginateAffixes.jsx";

const allAffixArray = affixArray.concat(potentialAffixArray);

let lastGeneratedId = 0;
function generateSafeId() {
  const base = Date.now() * 100;
  const randomPart = Math.floor(Math.random() * 100);
  let id = base + randomPart;
  if (id <= lastGeneratedId) id = lastGeneratedId + 1;
  lastGeneratedId = id;
  return id;
}

const CreateLanguage = ({ resetAll }) => {
  //const [numbers, setNumbers] = useState([]);

  const [listWithDerivations, setListWithDerivations] = useState([]);
  const [consonants, setConsonants] = useState([]);
  const [maxWords, setMaxWords] = useState(0);
  const [wordCategories, setWordCategories] = useState([]);
  const [wordForms, setWordForms] = useState([]);
  const [numRoot, setNumRoot] = useState(10);
  const [numRootWarning, setNumRootWarning] = useState();
  const [numBaseWarning, setNumBaseWarning] = useState();
  const [numberBase, setNumberBase] = useState(10);
  const [selectedSoundChanges, setSelectedSoundChanges] = useState([]);
  const [prosodyType, setProsodyType] = useState("stress");
  const [nounAffixes, setNounAffixes] = useState(false);
  const [selectedVerbHeadwordIndex, setSelectedVerbHeadwordIndex] =
    useState(null);
  const [nounAffix, setNounAffix] = useState("suffix");
  const [verbHeadwordForm, setVerbHeadwordForm] = useState();
  const [hundred, setHundred] = useState({});
  const [allCategoryValuesSoundChange, setAllCategoryValuesSoundChange] =
    useState({});
  const [gendersArr, setGendersArr] = useState([
    {
      name: "masculine",
      abbr: "masc",
      arr: masculine,
      suffixOrPrefix: "suffix",
    },
    { name: "feminine", abbr: "fem", arr: feminine, suffixOrPrefix: "suffix" },
    { name: "neuter", abbr: "neut", arr: neuter, suffixOrPrefix: "suffix" },
  ]);
  const [stressShiftWithAffix, setStressShiftWithAffix] = useState(true);
  const [spellings, setSpellings] = useState([]);
  const [verbAffixes, setVerbAffixes] = useState(false);
  const [vowels, setVowels] = useState([]);
  const [rootSyllableStructure, setRootSyllableStructure] = useState([]);
  const [accentPlacement, setAccentPlacement] = useState("free");
  const [affixSyllableStructure, setAffixSyllableStructure] = useState([]);
  const [hasGender, setHasGender] = useState(false);
  const [verbForms, setVerbForms] = useState([]);
  const [adjForms, setAdjForms] = useState([]);
  const [advForms, setAdvForms] = useState([]);
  const [adpForms, setAdpForms] = useState([]);
  const [pronForms, setPronForms] = useState([]);
  const [partForms, setPartForms] = useState([]);
  const [conjForms, setCOnjForms] = useState([]);
  const [interjForms, setInterjForms] = useState([]);
  const [nounForms, setNounForms] = useState([]);
  const [numForms, setNumForms] = useState([]);
  const [numberBaseWord, setNumberBaseWord] = useState();

  const [chosenGender, setChosenGender] = useState("masc-fem-neut");
  const [adjectivesAgree, setAdjectivesAgree] = useState(true);
  const [adjectiveheadwordGender, setAdjectiveheadwordGender] = useState();
  const [consonantsForTemplate, setConsonantsForTemplate] = useState([]);
  const [vowelsForTemplate, setVowelsForTemplate] = useState([]);
  const [chosenThemes, setChosenThemes] = useState(["real world animals", "real world plants"]);
  const [
    rootSyllableStructureForTemplate,
    setRootSyllableStructureForTemplate,
  ] = useState([]);
  const [
    affixSyllableStructureForTemplate,
    setAffixSyllableStructureForTemplate,
  ] = useState([]);

  const [consonantsForInputValue, setConsonantsForInputValue] = useState([]);
  const [vowelsForInputValue, setVowelsForInputValue] = useState([]);
  const [
    rootSyllableStructureForInputValue,
    setRootSyllableStructureForInputValue,
  ] = useState([]);

  const [
    affixSyllableStructureForInputValue,
    setAffixSyllableStructureForInputValue,
  ] = useState([]);

  const [expanded, setExpanded] = useState(false);
  const [maxRootSyllables, setMaxRootSyllables] = useState(1);
  const [minRootSyllables, setMinRootSyllables] = useState(1);
  const [maxAffixSyllables, setMaxAffixSyllables] = useState(1);
  const [compoundStressPlacement, setCompoundStressPlacement] =
    useState("first");
  const [minAffixSyllables, setMinAffixSyllables] = useState(1);
  const [allCategoryValues, setAllCategoryValues] = useState({});
  const [allCategoryAffixValues, setAllCategoryAffixValues] = useState({});
  const [adjectiveNature, setAdjectiveNature] = useState("nominal");
  const [selectedPhonology, setSelectedPhonology] = useState({});
  const [selectedCategoryValues, setSelectedCategoryValues] = useState({});
  const [selectedCategoryAffixValues, setSelectedCategoryAffixValues] =
    useState({});
  const { translate } = useTranslate();
  //   const [showLanguageNameWarning, setShowLanguageNameWarning] = useState(false);
  const [showSavePhonologyModal, setShowSavePhonologyModal] = useState(false);
  const [showManageDerivationModal, setShowManageDerivationModal] =
    useState(false);
  const [languageGenerated, setLanguageGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [primaryStressPlacement, setPrimaryStressPlacement] = useState("first");
  const [categoryRootArr, setCategoryRootArr] = useState([]);
  const [languageName, setLanguageName] = useState();
  const [showLanguageSavedMessage, setShowLanguageSavedMessage] =
    useState(false);
  const [whenNoHeavySyllable, setWhenNoHeavySyllable] = useState("first");
  const [languageLoading, setLanguageLoading] = useState(false);
  const [showSelectPhonologyModal, setShowSelectPhonologyModal] =
    useState(false);
  const [words, setWords] = useState([]);

  const [languageId, setLanguageId] = useState();

  const [rootCount, setRootCount] = useState();
  const [derivedWithAffixCount, setDrivedWithAffixCount] = useState(0);
  const [compoundCount, setCompoundCount] = useState(0);
  const [affixCount, setAffixCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [useOnlySelectedAffixes, setUseOnlySelectedAffixes] = useState(false);
  const [chosenAffixes, setChosenAffixes] = useState({});
  const [chosenDerivations, setChosenDerivations] = useState([]);
  const [indexForManageDerivations, setIndexForManageDerivations] = useState(0);
  const [chosenCompoundTypes, setChosenCompoundTypes] = useState([]);
  const [compoundChance, setCompoundChance] = useState(25);
  const [isNumConjunction, setIsNumConjunction] = useState(false);
  const [numOrder, setNumOrder] = useState("higher");
  const [numConjunction, setNumConjunction] = useState("and");
  const [derivations, setDerivations] = useState([]);


   useEffect(() => {
      async function loadDerivations() {
        const response = await fetch("/affixDerivations.json");
        const json = await response.json();
        setDerivations(json);
      }
  
      loadDerivations();
    }, []);

  const finalAffixSelection = [];
  let numbers = [];

  const handleCategoryValuesChange = (values) => {
    setAllCategoryValues(values);
  };

  const handleCategoryValuesAffixChange = (values, setValues) => {
    setAllCategoryAffixValues(values);
  };

  const handleValue = (value, setArr, setArrForTemplate, setForInputValue) => {
    const tokens = [];
    let buffer = "";
    let insideParens = false;

    setForInputValue(value);

    for (let char of value) {
      if (char === "(") {
        insideParens = true;
        buffer += char;
      } else if (char === ")") {
        buffer += char;
        insideParens = false;
      } else if (char === " " && !insideParens) {
        if (buffer.trim() !== "") {
          tokens.push(buffer.trim());
          buffer = "";
        }
      } else {
        buffer += char;
      }
    }

    // push final buffer
    if (buffer.trim() !== "") {
      tokens.push(buffer.trim());
    }

    // Save a **copy** before assignWeight mutates it
    setArrForTemplate([...tokens]);

    // Now mutate safely
    const weighted = assignWeight([...tokens]); // clone here too if needed
    setArr(weighted);
  };

  const handleNum = (value, setNum) => {
    setNum(value);
  };

  const toggleAffixes = (affixes, setAffixes) => {
    if (affixes) {
      setAffixes(false);
    } else {
      setAffixes(true);
    }
  };

  const toggleAgree = () => {
    if (adjectivesAgree) {
      setAdjectivesAgree(false);
    } else {
      setAdjectivesAgree(true);
    }
  };

  const toggleHasGender = () => {
    if (hasGender) {
      setHasGender(false);
    } else {
      setHasGender(true);

      const wordCategory = {
        name: "Gender",
        type: "noun",
        categories: {
          name: ["masculine", "feminine", "neuter"],
          abbreviation: ["masc", "fem", "neut"],
        },
      };

      setWordCategories(wordCategory);
      setGendersArr([
        {
          name: "masculine",
          abbr: "masc",
          arr: masculine,
          suffixOrPrefix: "suffix",
        },
        {
          name: "feminine",
          abbr: "fem",
          arr: feminine,
          suffixOrPrefix: "suffix",
        },
        { name: "neuter", abbr: "neut", arr: neuter, suffixOrPrefix: "suffix" },
      ]);
    }
  };

  const toggleChosenGender = (value) => {
    let wordCategory;
    setChosenGender(value);
    switch (value) {
      case "masc-fem-neut":
        wordCategory = {
          name: "Gender",
          type: "noun",
          categories: {
            name: ["masculine", "feminine", "neuter"],
            abbreviation: ["masc", "fem", "neut"],
          },
        };
        setGendersArr([
          {
            name: "masculine",
            abbr: "masc",
            arr: masculine,
            suffixOrPrefix: "suffix",
          },
          {
            name: "feminine",
            abbr: "fem",
            arr: feminine,
            suffixOrPrefix: "suffix",
          },
          {
            name: "neuter",
            abbr: "neut",
            arr: neuter,
            suffixOrPrefix: "suffix",
          },
        ]);
        break;
      case "anim-inan":
        wordCategory = {
          name: "Gender",
          type: "noun",
          categories: {
            name: ["animate", "inanimate"],
            abbreviation: ["anim", "inan"],
          },
        };
        setGendersArr([
          {
            name: "animate",
            abbr: "anima",
            arr: animate,
            suffixOrPrefix: "suffix",
          },
          {
            name: "inanimate",
            abbr: "inan",
            arr: inanimate,
            suffixOrPrefix: "suffix",
          },
        ]);
    }
    setWordCategories(wordCategory);
  };

  const assignGender = (words) => {
    return words.map((word) => {
      const updatedWord = { ...word };
      let count = 0;
      if (word.noun_meaning) {
        gendersArr.forEach((gender) => {
          if (
            gender.arr.some((definition) =>
              word.noun_meaning.includes(definition)
            )
          ) {
            count++;
            updatedWord["noun_word_categories"] = [
              {
                abbreviation: gender.abbr,
                category_name: "Gender",
                category_type: gender.name,
              },
            ];
          }
        });
        if (count === 0) {
          //word has no assigned gender, so give it a random one
          let chosenGender =
            gendersArr[Math.floor(Math.random() * gendersArr.length)];
          updatedWord["noun_word_categories"] = [
            {
              abbreviation: chosenGender.abbr,
              category_name: "Gender",
              category_type: chosenGender.name,
            },
          ];
        }
      }
      return updatedWord;
    });
  };

  const attachHeadwordAffixes = (words) => {
    return words.map((word) => {
      const updatedWord = { ...word };
      if (updatedWord.word_type !== "word") {
        return updatedWord;
      }

      if (hasGender && updatedWord.noun_meaning && word.noun_word_categories) {
        let gender = updatedWord.noun_word_categories[0];

        //find what gender the noun is
        gendersArr.forEach((gend) => {
          if (gend.name === gender.category_type) {
            //retrieve the gender's affix, or generate one if none was provided
            let affix = gend.affix
              ? gend.affix
              : removeHomophones(
                  consonants,
                  vowels,
                  rootSyllableStructure,
                  minRootSyllables,
                  maxRootSyllables,
                  allCategoryValues,
                  prosodyType,
                  primaryStressPlacement,
                  whenNoHeavySyllable,
                  accentPlacement
                );

            let inflectedWord = "";
            //attach headword and affix
            if (gend.suffixOrPrefix === "suffix") {
              inflectedWord = applyProsody(
                word.ipa + affix,
                prosodyType,
                primaryStressPlacement,
                "noDerivation",
                null,
                whenNoHeavySyllable,
                accentPlacement
              );
            } else {
              inflectedWord = applyProsody(
                affix + updatedWord.ipa,
                prosodyType,
                primaryStressPlacement,
                "noDerivation",
                null,
                whenNoHeavySyllable,
                accentPlacement
              );
            }
            updatedWord.translation = spell(inflectedWord, spellings);
            updatedWord.ipa = inflectedWord;
          }
        });
      }

      //if the language has noun gender and adjectives agree with nouns, make sure the adjective has forms for each gender, with one being the default headword and the rest being saved as word forms
      if (
        hasGender &&
        adjectiveNature === "nominal" &&
        adjectivesAgree &&
        updatedWord.adj_meaning
      ) {
        gendersArr.forEach((gend) => {
          //no need to match gender, since adjectives appear in all genders

          //retrieve the gender's affix, or generate one if none was provided
          let affix = gend.affix
            ? gend.affix
            : removeHomophones(
                consonants,
                vowels,
                rootSyllableStructure,
                minAffixSyllables,
                maxAffixSyllables,
                allCategoryAffixValues,
                prosodyType,
                primaryStressPlacement,
                whenNoHeavySyllable,
                accentPlacement
              );

          let inflectedWord = "";
          //attach headword and affix
          if (gend.suffixOrPrefix === "suffix") {
            inflectedWord = updatedWord.uninflected_root
              ? applyProsody(
                  updatedWord.uninflected_root + affix,
                  prosodyType,
                  primaryStressPlacement,
                  "noDerivation",
                  null,
                  whenNoHeavySyllable,
                  accentPlacement
                )
              : applyProsody(
                  updatedWord.ipa + affix,
                  prosodyType,
                  primaryStressPlacement,
                  "noDerivation",
                  null,
                  whenNoHeavySyllable,
                  accentPlacement
                );
          } else {
            inflectedWord = updatedWord.uninflected_root
              ? applyProsody(
                  affix + updatedWord.uninflected_root,
                  prosodyType,
                  primaryStressPlacement,
                  "noDerivation",
                  null,
                  whenNoHeavySyllable,
                  accentPlacement
                )
              : applyProsody(
                  affix + updatedWord.ipa,
                  prosodyType,
                  primaryStressPlacement,
                  "noDerivation",
                  null,
                  whenNoHeavySyllable,
                  accentPlacement
                );
          }

          //match gender to that selected to be the default for adjectives
          if (gend.name === adjectiveheadwordGender) {
            updatedWord.uninflected_root = updatedWord.ipa;
            updatedWord.translation = spell(inflectedWord, spellings);
            updatedWord.ipa = inflectedWord;
          } else {
            //gender is not the default for adjectives, so make a word form instead

            if (!updatedWord.adj_word_forms) {
              updatedWord.adj_word_forms = [
                {
                  name: gend.name,
                  type: "adj",
                  word: spell(inflectedWord, spellings),
                  ipa: inflectedWord,
                },
              ];
            } else {
              let newForm = {
                name: gend.name,
                type: "adj",
                word: spell(inflectedWord, spellings),
                ipa: inflectedWord,
              };
              updatedWord.adj_word_forms.push(newForm);
            }
          }
        });
      }

      if (verbForms.length > 0 && updatedWord.verb_meaning) {
        verbForms.forEach((form) => {
          //no need to match gender, since adjectives appear in all genders

          //retrieve the gender's affix, or generate one if none was provided
          let affix = form.affix
            ? form.affix
            : removeHomophones(
                consonants,
                vowels,
                rootSyllableStructure,
                minAffixSyllables,
                maxAffixSyllables,
                allCategoryAffixValues,
                prosodyType,
                primaryStressPlacement,
                whenNoHeavySyllable,
                accentPlacement
              );

          let inflectedWord = "";
          //attach headword and affix
          if (form.suffixOrPrefix === "suffix") {
            inflectedWord = updatedWord.uninflected_root
              ? applyProsody(
                  updatedWord.uninflected_root + affix,
                  prosodyType,
                  primaryStressPlacement,
                  "noDerivation",
                  null,
                  whenNoHeavySyllable,
                  accentPlacement
                )
              : applyProsody(
                  updatedWord.ipa + affix,
                  prosodyType,
                  primaryStressPlacement,
                  "noDerivation",
                  null,
                  whenNoHeavySyllable,
                  accentPlacement
                );
          } else {
            inflectedWord = updatedWord.uninflected_root
              ? applyProsody(
                  affix + updatedWord.uninflected_root,
                  prosodyType,
                  primaryStressPlacement,
                  "noDerivation",
                  null,
                  whenNoHeavySyllable,
                  accentPlacement
                )
              : applyProsody(
                  affix + updatedWord.ipa,
                  prosodyType,
                  primaryStressPlacement,
                  "noDerivation",
                  null,
                  whenNoHeavySyllable,
                  accentPlacement
                );
          }

          //match verb form to that selected to be the default for verbs
          if (form.formName === verbHeadwordForm) {
            updatedWord.uninflected_root = updatedWord.ipa;
            updatedWord.translation = spell(inflectedWord, spellings);
            updatedWord.ipa = inflectedWord;
          } else {
            //form is not the default for verbs, so make a word form instead

            if (!updatedWord.verb_word_forms) {
              updatedWord.verb_word_forms = [
                {
                  name: form.formName,
                  type: "verb",
                  word: spell(inflectedWord, spellings),
                  ipa: inflectedWord,
                },
              ];
            } else {
              let newForm = {
                name: form.formName,
                type: "verb",
                word: spell(inflectedWord, spellings),
                ipa: inflectedWord,
              };
              updatedWord.verb_word_forms.push(newForm);
            }
          }
        });
      }
      return updatedWord;
    });
  };

  const changeAffix = (setArr, index, affix) => {
    setArr((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], affix: affix, suffixOrPrefix: "suffix" };
      return copy;
    });
  };

  const changeAffixPlacement = (setArr, index, val) => {
    setArr((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], suffixOrPrefix: val };
      return copy;
    });
  };

  const createNumbers = (list) => {
    const nums = [];
    //***NUMBERS****************************************************************************/
    //first, create the root numbers (numbers not made by combining smaller ones)
    for (let i = 0; i < numRoot; i++) {
      const numWord = removeHomophones(
        consonants,
        vowels,
        rootSyllableStructure,
        1,
        1,
        allCategoryValues,
        prosodyType,
        primaryStressPlacement,
        whenNoHeavySyllable,
        accentPlacement
      );

      const obj = {
        translation: spell(numWord, spellings),
        ipa: numWord,
        num_meaning: [toWords(i + 1)],
        id: generateSafeId(),
        word_type: "word",
      };

      nums.push(obj);
    }

    //now, make more numbers by combining smaller numbers till you hit the base system. So if user choose unique numbers up to 5 with a base 10 system, then make 5+1=6, 5+2=7 etc till hitting ten

    //find which generated number matches the highest unique number, in example case this would be "5"
    const highestUniqueNum = nums[numRoot - 1].ipa;

    let count = numRoot + 1;
    let index = 0;

    while (count < Number(numberBase)) {
      const numToAdd = nums[index].ipa;
      const newNum = highestUniqueNum + numToAdd;
      const obj = {
        translation: spell(newNum, spellings),
        ipa: newNum,
        num_meaning: [toWords(count)],
        id: generateSafeId(),
        word_type: "word",
        etymology: {
          etymology_type: "derived",
          first_element_id: nums[numRoot - 1].id,
          second_element_id: nums[index].id,
          etymology_id: generateSafeId(),
        },
      };
      nums.push(obj);
      count++;
      index++;
    }

    //all numbers up to the first "step" have been made, now to make numbers for each step.
    //decide how first step is made

    // let firstStepNotPresent = true;
    // nums.forEach((num) => {
    //   if (num.num_meaning === toWords(Number(numberBase))) {
    //     firstStepNotPresent = false;
    //   }
    // });

    //if (numRoot !== Number(numberBase) && firstStepNotPresent) {
    //if both numbers are the same, the the first base has already been generated

    //first base is taken from a word

    //use a word meaning "set", "count", etc
    let useSetWord = Math.floor(Math.random() * 2) === 1;
    let chosenNumberBaseWord = {};

    if (numberBase !== 5 || numberBase !== 10) {
      const possibleWords = [
        "set",
        "count",
        "measure",
        "bundle",
        "group",
        "reckoning",
        "assortment",
      ];
      const selectedIndex = Math.floor(Math.random() * possibleWords.length);

      let chosenWord = list.find(
        (word) =>
          word.noun_meaning &&
          word.noun_meaning.includes(possibleWords[selectedIndex])
      );
      chosenWord["num_meaning"] = [toWords(numberBase)];
      list.forEach((word) => {
        if (word.id === chosenWord.id) {
          word["num_meaning"] = [toWords(numberBase)];
        }
      });
      chosenNumberBaseWord = chosenWord;
    }

    //if a base-5 language, use word for 'hand'
    if (numberBase === 5 && !useSetWord) {
      let hand = list.find(
        (word) => word.noun_meaning && word.noun_meaning.includes("hand")
      );
      hand["num_meaning"] = ["five"];
      list.forEach((word) => {
        if (word.id === hand.id) {
          word["num_meaning"] = ["five"];
        }
      });
      chosenNumberBaseWord = hand;
    }

    //if base-10 language, use 'two-hand'
    if (numberBase === 10 && !useSetWord) {
      const hand = list.find(
        (word) => word.noun_meaning && word.noun_meaning.includes("hand")
      );

      const two = nums[1];

      const tenIpa = two.ipa + hand.ipa;

      const ten = {
        translation: spell(tenIpa, spellings),
        ipa: tenIpa,
        num_meaning: [toWords(numberBase)],
        id: generateSafeId(),
        word_type: "word",
        etymology: {
          etymology_type: "derived",
          first_element_id: two.id,
          second_element_id: hand.id,
          etymology_id: generateSafeId(),
        },
      };
      chosenNumberBaseWord = ten;
    }

    setNumberBaseWord(chosenNumberBaseWord);

    nums.push(chosenNumberBaseWord);
    //}

    //subsequent steps are "num firstBase" e.g 20 = two ten
    //let stepCount = Number(numberBase) * 2; //in base-ten system, begin at 20, base 12 at 24 and so on
    let stepCount = Number(numberBase) * 2;

    let indexCount = 1;
    while (stepCount < 100) {
      //when the numberBase and numRoot are the same number, simply adding one to the base number won't necessarily find the next step, so this must be accounted for
      let numForBase = "";
      let numForBaseId = "";
      if (numRoot !== Number(numberBase)) {
        numForBase = nums[indexCount].ipa;
        numForBaseId = nums[indexCount].id;
      } else {
        if (indexCount > Number(numberBase)) {
          numForBase =
            nums[Number(numberBase - 1)].ipa +
            nums[indexCount - Number(numberBase) - 1].ipa;
          numForBaseId = generateSafeId();
        } else {
          numForBase = nums[indexCount].ipa;
          numForBaseId = nums[indexCount].id;
        }
      }

      const stepNum = numForBase + nums[Number(numberBase) - 1].ipa;

      const numMeaning =
        numRoot === Number(numberBase) && indexCount > Number(numberBase)
          ? toWords(stepCount - Number(numberBase))
          : toWords(stepCount);

      let misMadeCopyFound = false;
      nums.forEach((num) => {
        if (num.num_meaning === numMeaning) {
          (num.ipa = stepNum), (num.translation = spell(stepNum, spellings));
          misMadeCopyFound = true;
        }
      });

      if (!misMadeCopyFound) {
        const step = {
          translation: spell(stepNum, spellings),
          ipa: stepNum,
          num_meaning: [numMeaning],
          id: generateSafeId(),
          word_type: "word",
          etymology: {
            etymology_type: "derived",
            first_element_id: numForBaseId,
            second_element_id: nums[Number(numberBase) - 1].id,
            etymology_id: generateSafeId(),
          },
        };

        nums.push(step);
      }

      stepCount += Number(numberBase);
      indexCount++;
    }

    //make a term for "hundred" (if not base-10, then 'hundred' will be base number * 10)

    const hundredRandom = Math.floor(Math.random() * 10);

    if (hundredRandom < 5) {
      //polysemy, the word for "crowd" will also mean "100"

      const index = list.findIndex(
        (item) => item.noun_meaning && item.noun_meaning.includes("crowd")
      );
      list[index].num_meaning = ["hundred"];
      setHundred(list[index]);
    } else if (hundredRandom < 8) {
      //"big base-num"

      const index = list.findIndex(
        (item) => item.adj_meaning && item.adj_meaning.includes("big")
      );

      const big = list[index].ipa;

      const hundred = {
        translation: spell(big + chosenNumberBaseWord.ipa, spellings),
        ipa: big + chosenNumberBaseWord.ipa,
        num_meaning: ["hundred"],
        id: generateSafeId(),
        type: "word",
        etymology: {
          etymology_type: "derived",
          first_element_id: list[index].id,
          second_element_id: chosenNumberBaseWord.id,
          etymology_id: generateSafeId(),
        },
      };
      setHundred(hundred);
      //nums.push(hundred);
    } else {
      //unique root
      const hundredWord = removeHomophones(
        consonants,
        vowels,
        rootSyllableStructure,
        1,
        2,
        allCategoryValues,
        prosodyType,
        primaryStressPlacement,
        whenNoHeavySyllable,
        accentPlacement
      );
      const hundred = {
        translation: spell(hundredWord, spellings),
        ipa: hundredWord,
        num_meaning: ["hundred"],
        id: generateSafeId(),
        type: "word",
      };
      setHundred(hundred);
    }

    //setNumbers(nums);
    numbers = nums;
  };

  function applyPhonotactics(words) {
    const changes = selectedSoundChanges; // now guaranteed updated
    return words.map((word) => {
      const updatedWord = { ...word };
      updatedWord.ipa = applySoundChange(
        updatedWord.ipa,
        changes,
        allCategoryValuesSoundChange
      );
      updatedWord.word = spell(updatedWord.ipa, spellings);
      updatedWord.translation = spell(updatedWord.ipa, spellings);
      return updatedWord;
    });
  }

  const generateLanguage = async () => {
    setLanguageLoading(true);
    setShowLanguageSavedMessage(false);
    //setNumbers([]);

    // const response = await fetch(
    //   `${import.meta.env.VITE_BACKEND_URL}/api/handleEnglishWords`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       themes: chosenThemes,
    //       maxWords,
    //     }),
    //   }
    // );

    // const data = await response.json();

    if (coreEnglishWords) {
      function estimateWordSpace({
        syllableStructures,
        consonants,
        vowels,
        categories,
        minRootSyllables,
        maxRootSyllables,
      }) {
        function slotCount(char) {
          if (char === "C") return consonants.length;
          if (char === "V") return vowels.length;
          if (categories[char]) return categories[char].length;
          if ("#&*".includes(char)) return 1; // position markers
          return 1; // literal IPA characters
        }

        function countSyllableSpace(struct) {
          const chars = Array.from(struct);
          return chars.reduce((acc, ch) => acc * slotCount(ch), 1);
        }

        // total set of possible syllables
        const totalSyllableOptions = syllableStructures.reduce(
          (sum, struct) => sum + countSyllableSpace(struct),
          0
        );

        // now count possible words given n syllables
        let totalWordOptions = 0;

        for (let n = minRootSyllables; n <= maxRootSyllables; n++) {
          totalWordOptions += totalSyllableOptions ** n;
        }

        return {
          totalSyllables: totalSyllableOptions,
          totalWords: totalWordOptions,
        };
      }

      const { totalWords } = estimateWordSpace({
        syllableStructures: ["CV", "CVC"],
        consonants,
        vowels,
        categories: allCategoryValues,
        minRootSyllables,
        maxRootSyllables,
      });

      if (totalWords < coreEnglishWords.length) {
        alert(
          translate(
            "Warning: Your phoneme inventory and syllable rules cannot produce enough unique words. Extreme amounts of homophones are inevitable. Try increasing the amount of syllables per word."
          )
        );
        return;
      }

      const addPolysemy = (meaning, newMeaning) => {
        let found = false;

        for (const group of allWordsInThesaurus) {
          if (group.includes(meaning[0])) {
            found = true;

            //ensure original meanings remain
            newMeaning.push(meaning[0]);

            const allPossibleMeanings = [...group];
            //a word may have a max of 8 meanings
            const randomAmount = Math.floor(Math.random() * 9) + 1;

            for (let k = 0; k < randomAmount; k++) {
              const randomIndex = Math.floor(
                Math.random() * allPossibleMeanings.length
              );
              if (
                allPossibleMeanings[randomIndex] !== undefined &&
                allPossibleMeanings[randomIndex] !== meaning[0]
              ) {
                newMeaning.push(allPossibleMeanings[randomIndex]);
              }
              allPossibleMeanings.splice(randomIndex, 1); // prevent duplicates
            }

            break; // stop once we found the matching group
          }
        }

        if (!found) {
          // If meaning not found in thesaurus, keep original
          newMeaning.push(meaning[0]);
        }
      };

      const newWords = coreEnglishWords
        // Mandatory themes: ALL must match if present
        .filter(
          (word) =>
            !word.mandatory_themes ||
            word.mandatory_themes.every((theme) => chosenThemes.includes(theme))
        )

        // Optional themes: AT LEAST ONE must match if themes exist
        .filter(
          (word) =>
            !word.themes ||
            chosenThemes.some((theme) => word.themes.includes(theme))
        )

        .map((word) => {
          const generated = removeHomophones(
            consonants,
            vowels,
            rootSyllableStructure,
            minRootSyllables,
            maxRootSyllables,
            allCategoryValues,
            prosodyType,
            primaryStressPlacement,
            whenNoHeavySyllable,
            accentPlacement
          );

          const newWord = { ...word };

          //Loop through all meaning keys dynamically
          for (const key of meaningKeys) {
            if (Array.isArray(word[key.meaning])) {
              const newMeaning = [];
              addPolysemy(word[key.meaning], newMeaning, generated);
              newWord[key] = newMeaning;
            }
          }

          //change adjectives to stative verbs
          if (newWord.adj_meaning && adjectiveNature === "stative") {
            //get original meaning

            let adjMeaning = newWord.adj_meaning;

            const stativeVerbMeaning = [];

            //place "be " before each adjective
            for (let i = 0; i < adjMeaning.length; i++) {
              stativeVerbMeaning.push(`be ${adjMeaning[i]}`);
            }

            //now assign the new verbal meaning to verb_meaning and remove adj_meaning
            newWord.verb_meaning = stativeVerbMeaning;
            newWord.adj_meaning = null;
          }

          newWord.translation = spell(generated, spellings);
          newWord.ipa = generated;
          newWord.id = generateSafeId();

          return newWord;
        })
        .sort((a, b) => a.translation.localeCompare(b.translation));

      createNumbers(newWords);

      let newList = createDerivations(
        newWords,
        consonants,
        vowels,
        affixSyllableStructure,
        minAffixSyllables,
        maxAffixSyllables,
        allCategoryValues,
        spellings,
        chosenThemes,
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
      );

      let words = 0;
      let compounds = 0;
      let affixDerivs = 0;
      let affixes = 0;
      newList.forEach((word) => {
        if (word.word_type === "word") {
          setWordCount(wordCount + 1);

          if (word.hasOwnProperty("isCompound")) {
            compounds++;
          } else if (word.hasOwnProperty("isAffixedDerived")) {
            affixDerivs++;
          } else {
            words++;
          }
        } else {
          affixes++;
        }
      });

      newList = assignGender(newList);

      newList = attachHeadwordAffixes(newList);

      newList = applyPhonotactics(newList);

      setWordCount(newList.length);
      setDrivedWithAffixCount(affixDerivs);
      setCompoundCount(compounds);
      setAffixCount(finalAffixSelection.length);

      setWords(newList);
      setLanguageGenerated(true);
      setLanguageLoading(false);
    }
  };

  const saveLanguage = async () => {
    let nameToUse = languageName;

    if (!nameToUse) {
      const generatedName = removeHomophones(
        consonants,
        vowels,
        rootSyllableStructure,
        minRootSyllables,
        maxRootSyllables,
        allCategoryValues,
        prosodyType,
        primaryStressPlacement,
        whenNoHeavySyllable,
        accentPlacement
      );
      nameToUse =
        spell(generatedName, spellings).charAt(0).toUpperCase() +
        spell(generatedName, spellings).slice(1).toLowerCase();
    }
    setLoading(true);

    const formsArr = [];
    //sort word forms
    const sortWordForms = (forms, type) => {
      if (forms.length > 0) {
        forms.forEach((form) => {
          const obj = {
            name: form.formName,
            type: type,
          };
          formsArr.push(obj);
        });
      }
    };

    sortWordForms(verbForms, "verb");
    sortWordForms(adjForms, "adj");
    sortWordForms(nounForms, "noun");
    sortWordForms(numForms, "num");
    sortWordForms(advForms, "adv");
    sortWordForms(partForms, "part");
    sortWordForms(pronForms, "pron");
    sortWordForms(conjForms, "conj");
    sortWordForms(interjForms, "interj");
    sortWordForms(adpForms, "adp");

    const userId = localStorage.getItem("userId");

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/saveConlang`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          words,
          userId,
          nameToUse,
          spellings,
          themes: chosenThemes,
          wordCategories,
          wordForms: formsArr,
          numbers,
          numberBase,
          numRoot,
          numConjunction,
          isNumConjunction,
          numOrder,
          numberBaseWord,
          hundred,
        }),
      }
    );

    const data = await response.json();

    if (data) {
      setShowLanguageSavedMessage(true);
      setLanguageId(data.languageId);
      setLoading(false);
    }
  };

  const handleOpenLanguage = () => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/dictionary/${languageId}`,
      "_blank"
    );
  };

  const addForm = (setForms) => {
    setForms((prev) => [
      ...prev,
      { formName: "", affix: "", suffixOrPrefix: "--" },
    ]);
  };

  const updateForm = (index, newFormName, newFormValue, setForms) => {
    setForms((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        formName: newFormName,
        affix: newFormValue,
      };
      return copy;
    });
  };

  const removeForm = (index, setForms) => {
    setForms((prev) => prev.filter((_, i) => i !== index));
  };

  // const toggleExpandVocab = () => {
  //   if (expanded) {
  //     setExpanded(false);
  //   } else {
  //     setExpanded(true);
  //   }
  // };

  const handleLanguageName = (name) => {
    setLanguageName(name);
  };

  const handleRootCategoryValue = (value) => {};

  //C and V are purposefully omitted
  let alphabetArray = [
    "A",
    "B",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const handleAddNewCategory = () => {
    const newCategory = { id: Date.now(), letter: "", value: "" };
    setCategoryRootArr((prev) => [...prev, newCategory]);
  };

  const handleLetterChange = (id, letter) => {
    setCategoryRootArr((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, letter } : cat))
    );
  };

  const handleValueChange = (id, value) => {
    setCategoryRootArr((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, value } : cat))
    );
  };

  const removeCategoryRoot = (id) => {
    const filtered = categoryRootArr.filter((cat) => cat.id !== id);
    setCategoryRootArr(filtered);
  };

  const openMakeDaughterLang = () => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/makedaughter`, "_blank");
  };

  const savePhonology = () => {
    setShowSavePhonologyModal(true);
  };

  const handleSelectedPhonology = (obj) => {
    function inventory(inv) {
      const arr = Array.from(inv);
      let weighted = assignWeight(arr);
      return weighted;
    }

    setVowels(inventory(obj.phonology.vowels));
    setConsonants(inventory(obj.phonology.consonants));
    setRootSyllableStructure(inventory(obj.phonology.rootSyllableStructure));
    setAffixSyllableStructure(inventory(obj.phonology.affixSyllableStructure));
    setMinRootSyllables(obj.phonology.minRootSyllables);
    setMaxRootSyllables(obj.phonology.maxRootSyllables);
    setMinAffixSyllables(obj.phonology.minRootSyllables);
    setMaxAffixSyllables(obj.phonology.maxRootSyllables);
    setAllCategoryValues(obj.phonology.allCategoryValues);
    setAllCategoryAffixValues(obj.phonology.allCategoryAffixValues);
    setSelectedCategoryValues(obj.phonology.allCategoryValues);
    setSelectedCategoryAffixValues(obj.phonology.allCategoryAffixValues);

    setVowelsForTemplate(obj.phonology.vowels);
    setConsonantsForTemplate(obj.phonology.consonants);
    setRootSyllableStructureForTemplate(obj.phonology.rootSyllableStructure);
    setAffixSyllableStructureForTemplate(obj.phonology.affixSyllableStructure);

    setVowelsForInputValue(obj.phonology.vowels.join(" "));
    setConsonantsForInputValue(obj.phonology.consonants.join(" "));
    setRootSyllableStructureForInputValue(
      obj.phonology.rootSyllableStructure.join(" ")
    );
    setAffixSyllableStructureForInputValue(
      obj.phonology.affixSyllableStructure.join(" ")
    );
    setSpellings(obj.phonology.spellings);
  };

  const toggleStressShiftWithAffix = (set) => {
    if (stressShiftWithAffix) {
      set(false);
    } else {
      set(true);
    }
  };

  const verbFormEntries = Object.entries(verbForms);

  const toggleRadio = (index, setIndex, formName, setHeadword) => {
    setHeadword(formName);
    setIndex(
      (prev) => (prev === index ? null : index) // clicking the same one unselects it
    );
  };

  const handleNumberRoots = (num) => {
    num = Number(num);
    if (num.length === 0) {
      setNumRootWarning(false);
    }
    if (isNaN(num)) {
      setNumRootWarning(true);
    } else {
      setNumRootWarning(false);
      setNumRoot(num);
    }
  };

  const handleNumberBase = (num) => {
    num = Number(num);
    if (num.length === 0) {
      setNumBaseWarning(false);
    }
    if (isNaN(num)) {
      setNumBaseWarning(true);
    } else {
      setNumBaseWarning(false);
      setNumberBase(num);
    }
  };

  const toggleUseOnlySelectedAffixes = () => {
    if (useOnlySelectedAffixes) {
      setUseOnlySelectedAffixes(false);
    } else {
      setUseOnlySelectedAffixes(true);
    }
  };

  const updateAffix = (index, affix, updates = null) => {
    setChosenAffixes((prev) => {
      const next = { ...prev };

      // Checkbox toggle
      if (updates === null) {
        if (next[index]) {
          delete next[index]; // unchecked
        } else {
          next[index] = {
            affixName: affix.affixName,
            affixDescription: affix.affixDescription,
            affix: "",
            originWords: affix.originWords,
            type: "suffix",
            useOnlySelectedDerivations: false,
          };
        }
        return next;
      }

      // Ignore input changes if not checked
      if (!next[index]) return prev;

      // Input/select update
      next[index] = {
        ...next[index],
        ...updates,
      };

      return next;
    });
  };

  function changeAdjectiveToStativeVerb(description, adjectiveNature) {
    if (adjectiveNature === "stative") {
      description = description.replace("adjective", "stative verb");
    }

    return description;
  }

  function openManageDerivationModal(index) {
    setShowManageDerivationModal(true);
    setIndexForManageDerivations(index);
  }

  useEffect(() => {
    meaningKeys.forEach((key) => {
      const firstPartOfSpeech = key.type;
      meaningKeys.forEach((key2) => {
        const secondPartOfSpeech = key2.type;
        const merged = `${firstPartOfSpeech}-${secondPartOfSpeech}`;
        if (!chosenCompoundTypes.includes(merged))
          chosenCompoundTypes.push(merged);
      });
    });
  }, []);

  function toggleIsNumConjunction(val) {
    setIsNumConjunction(val);
  }

  function toggleNumConjunction(val) {
    setNumConjunction(val);
  }

  function toggleNumOrder(val) {
    setNumOrder(val);
  }

  return (
    <div>
      <SavePhonologyModal
        show={showSavePhonologyModal}
        setShow={setShowSavePhonologyModal}
        vowels={vowelsForTemplate}
        consonants={consonantsForTemplate}
        rootSyllableStructure={rootSyllableStructureForTemplate}
        affixSyllableStructure={affixSyllableStructureForTemplate}
        minRootSyllables={minRootSyllables}
        maxRootSyllables={maxRootSyllables}
        minAffixSyllables={minAffixSyllables}
        maxAffixSyllables={maxAffixSyllables}
        allCategoryValues={allCategoryValues}
        allCategoryAffixValues={allCategoryAffixValues}
        spellings={spellings}
      />

      <SelectPhonologyModal
        show={showSelectPhonologyModal}
        setShow={setShowSelectPhonologyModal}
        setSelected={handleSelectedPhonology}
      />

      <ManageDerivationsModal
        show={showManageDerivationModal}
        setShow={setShowManageDerivationModal}
        chosenAffixes={chosenAffixes}
        setChosenAffixes={setChosenAffixes}
        index={indexForManageDerivations}
        chosenDerivations={chosenDerivations}
        setChosenDerivations={setChosenDerivations}
      />

      <div id="customisation-options">
        <h1 id="custom-h1">Customise Your Language</h1>

        <button onClick={openMakeDaughterLang}>
          Derive a new language from an existing one
        </button>

        <p>Any option left blank will result in a randomly generated choice.</p>
        <p>When entering custom words into a text field, do so in IPA only.</p>

        <input
          onClick={resetAll}
          type="button"
          value="Reset Form"
          id="reset-form-button"
        />

        <div className="radio-section">
          <label htmlFor="language-name" className="label">
            {translate("Choose the language's name")}:
          </label>
          <input
            id="language-name"
            defaultValue=""
            onChange={(e) => handleLanguageName(e.target.value)}
          />
        </div>

        <button onClick={() => setShowSelectPhonologyModal(true)}>
          {translate("Select an existing phonology template")}
        </button>

        <Collapsible title={translate("Phonetic Inventory")}>
          <div className="radio-section">
            <p>
              Enter sounds using{" "}
              <a
                href="https://ipa.typeit.org/full/"
                target="_blank"
                rel="noreferrer"
              >
                IPA only
              </a>
              . Separate sounds using a blank space only.
              <br />
            </p>
            <label htmlFor="chosen-vowels" className="label">
              Vowels:
            </label>
            <input
              id="chosen-vowels"
              value={vowelsForInputValue}
              onChange={(e) =>
                handleValue(
                  e.target.value,
                  setVowels,
                  setVowelsForTemplate,
                  setVowelsForInputValue
                )
              }
            />
          </div>

          <div className="radio-section">
            <label htmlFor="chosen-consonants" className="label">
              Consonants:
            </label>
            <input
              id="chosen-consonants"
              value={consonantsForInputValue}
              onChange={(e) =>
                handleValue(
                  e.target.value,
                  setConsonants,
                  setConsonantsForTemplate,
                  setConsonantsForInputValue
                )
              }
            />
          </div>
        </Collapsible>

        <Collapsible title={translate("Syllable Structure")}>
          <div className="radio-section">
            <Collapsible title={translate("Syllable Structure Guide")}>
              <p>
                Enter your desired syllable structures below. You may enter as
                many possible syllable structures as you wish. When entering
                multiple options in the textfields below, separate them with
                spaces alone - don&apos;t use commas.
                <br />
                To create your own category of sounds, click "Add New Category"
                and assign any selection of sounds to a capital letter. Only two
                letters have been reserved: <strong>C</strong> for "any
                consonant" and <strong>V</strong> for "any vowel".
                <br />
                In the "Enter Root Syllable Structures" text field below, a
                capital letter will stand for any sound associated with it. So
                if you define <strong>P</strong> as any of{" "}
                <strong>p t k b d g</strong> then the structure{" "}
                <strong>PV</strong> may denote{" "}
                <strong>"pV" "tV" "kV" "bV" "dV" "gV"</strong> etc. Enter your
                chosen sounds using IPA only. You may also enter a lowercase IPA
                character directly in the "Enter Root Syllable Structures" text
                field, thus <strong>sCV</strong> would stand for "/s/ followed
                by any consonant and any vowel".
              </p>

              <h4>Syllable Location</h4>
              <p>
                You may also determine if a specific type of syllable may only
                occur in a certain position in the root by using the following
                prefixes:
              </p>
              <ul>
                <li>
                  <strong>#</strong>: only root initially
                </li>
                <li>
                  <strong>&amp;</strong>: only root internally
                </li>
                <li>
                  <strong>*</strong>: only word finally
                </li>
              </ul>
              <p>
                Thus a structure such as <strong>#sCV &amp;mCV *VrC CV</strong>{" "}
                means that the only word initial clusters allowed are /s/
                followed by any consonant, that the only root internal clusters
                allowed are /m/ followed by a consonant, and that the only root
                final clusters allowed are /r/ followed by a consonant, and that
                the <strong>CV</strong> may occur anywhere as it lacks a prefix.
                <br />
                Note that this is for the structure of syllables in roots, not
                entire words, so if the language takes on prefixes and/or
                suffixes, syllables designated as only initial or final may
                appear within a word - but always either at the beginning or end
                of the root itself.
              </p>

              <h4>Syllable Frequency</h4>
              <p>
                You may also determine the likelihood that a syllable may appear
                in any given word. If you want a syllable to be more likely to
                appear than others, you may assign it a frequency by suffixing a
                number from 1-9 - the higher the number, the more common the
                syllable shall be. Assigning several syllables with the same
                frequency will cancel out this effect, so use it wisely. If you
                wish to make a particular syllable less likely to occur, do so
                by assigning all other syllables a higher frequency than it.
                <br />
                Observe this example: <strong>CV8 CVC4 CrV4 sCrV</strong> - CV
                syllables will be the most common, followed by CVC and CrV
                syllables, with sCrV syllables being the rarest.
              </p>

              <h4>Number of Syllables</h4>
              <p>
                You may choose how many syllables a root or affix may have, but
                be aware that if you have chosen a small phonemic inventory,
                that a smaller amount of syllables per word, especially if you
                have only provided a small amount of syllable structures, will
                result in a very large amount of homophones in the language - a
                limited number of sounds and a limited number of ways to combine
                those sounds results in a lot of repetition. Real languages with
                small phonemic inventories tend to allow a greater amount of
                syllables per word while languages with larger inventories can
                get away with a smaller amount.
              </p>
            </Collapsible>

            <h4>Root Syllable Structure</h4>

            <div className="column-div">
              <CategoryManager
                translate={translate}
                onCategoryValuesChange={handleCategoryValuesChange}
                selectedCategoryValues={selectedCategoryValues}
              />
              <div className="row-div">
                <label htmlFor="chosen-syllables" className="label">
                  Enter Root Syllable Structures:
                </label>
                <input
                  id="chosen-syllables"
                  value={rootSyllableStructureForInputValue}
                  className="syllable-text-field"
                  onChange={(e) =>
                    handleValue(
                      e.target.value,
                      setRootSyllableStructure,
                      setRootSyllableStructureForTemplate,
                      setRootSyllableStructureForInputValue
                    )
                  }
                />
              </div>

              <div className="row-div">
                <div className="min-max-div">
                  <label htmlFor="min-syllables">
                    Minimum Amount Of Syllables Per Root
                  </label>
                  <input
                    type="text"
                    id="min-syllables"
                    className="syllable-amount-text-field"
                    value={minRootSyllables}
                    onChange={(e) =>
                      handleNum(e.target.value, setMinRootSyllables)
                    }
                  />
                </div>

                <div className="min-max-div">
                  <label htmlFor="max-syllables">
                    Maximum Amount Of Syllables Per Root
                  </label>
                  <input
                    type="text"
                    id="max-syllables"
                    className="syllable-amount-text-field"
                    value={maxRootSyllables}
                    onChange={(e) =>
                      handleNum(e.target.value, setMaxRootSyllables)
                    }
                  />
                </div>
              </div>
            </div>

            <h4>Affix Syllable Structure</h4>

            <div id="affix-syllable-category-and-button-div">
              <div id="affix-syllable-category-div"></div>
              <input
                type="submit"
                value={translate("Add New Category")}
                id="add-new-affix-syllable-category-button"
              />
            </div>

            <div className="column-div">
              <div className="row-div">
                <label htmlFor="affix-chosen-syllables" className="label">
                  Enter Affix Syllable Structures:
                </label>
                <input
                  id="affix-chosen-syllables"
                  className="syllable-text-field"
                  value={affixSyllableStructureForInputValue}
                  onChange={(e) =>
                    handleValue(
                      e.target.value,
                      setAffixSyllableStructure,
                      setAffixSyllableStructureForTemplate,
                      setAffixSyllableStructureForInputValue
                    )
                  }
                />
              </div>

              <div className="row-div">
                <div className="min-max-div">
                  <label htmlFor="affix-min-syllables">
                    Minimum Amount Of Syllables Per Affix
                  </label>
                  <input
                    type="text"
                    id="affix-min-syllables"
                    className="syllable-amount-text-field"
                    value={minAffixSyllables}
                    onChange={(e) =>
                      handleNum(e.target.value, setMinAffixSyllables)
                    }
                  />
                </div>

                <div className="min-max-div">
                  <label htmlFor="affix-max-syllables">
                    Maximum Amount Of Syllables Per Affix
                  </label>
                  <input
                    type="text"
                    id="affix-max-syllables"
                    className="syllable-amount-text-field"
                    value={maxAffixSyllables}
                    onChange={(e) =>
                      handleNum(e.target.value, setMaxAffixSyllables)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <button onClick={savePhonology}>
            {translate("Save phonology as a template")}
          </button>
        </Collapsible>
      </div>

      <Collapsible title={translate("Prosody")}>
        <select onChange={(e) => setProsodyType(e.target.value)}>
          <option value="stress">{translate("Stress-timed")}</option>
          <option value="syllable">{translate("Syllable-timed")}</option>
          <option value="pitch">{translate("Pitch Accent")}</option>
          <option value="tone">{translate("Tonal")}</option>
        </select>

        {prosodyType === "syllable" && (
          <p>
            {translate(
              "Syllable-timed: Each syllable in a word will have equal weight."
            )}
          </p>
        )}

        {prosodyType === "stress" && (
          <div>
            <br />
            <span>{translate("Stress will fall on the:")}</span>
            <select
              value={primaryStressPlacement}
              onChange={(e) => setPrimaryStressPlacement(e.target.value)}
            >
              <option value="first">{translate("First syllable")}</option>
              <option value="second">{translate("Second syllable")}</option>
              <option value="secondLast">
                {translate("Second last syllable")}
              </option>
              <option value="last">{translate("Last syllable")}</option>
              <option value="firstHeavy">
                {translate("First heavy syllable")}
              </option>
              <option value="lastHeavy">
                {translate("Last heavy syllable")}
              </option>
            </select>
            <br />

            {(primaryStressPlacement === "firstHeavy" ||
              primaryStressPlacement === "lastHeavy") && (
              <div>
                <span>
                  {translate(
                    "When a word has no heavy syllables, the stressed syllable shall be:"
                  )}
                </span>
                <select
                  value={whenNoHeavySyllable}
                  onChange={(e) => setWhenNoHeavySyllable(e.target.value)}
                >
                  <option value="first">{translate("First syllable")}</option>
                  <option value="second">{translate("Second syllable")}</option>
                  <option value="secondLast">
                    {translate("Second last syllable")}
                  </option>
                  <option value="last">{translate("Last syllable")}</option>
                </select>
              </div>
            )}

            <input
              type="checkbox"
              checked={stressShiftWithAffix}
              onChange={(e) =>
                toggleStressShiftWithAffix(setStressShiftWithAffix)
              }
            />
            <span>{translate("Stress shifts with affixes")}</span>
            <br />
            <span>
              {translate("When compounding, which word keeps the stress?")}
            </span>
            <select
              value={compoundStressPlacement}
              onChange={(e) => setCompoundStressPlacement(e.target.value)}
            >
              <option value="first">{translate("first word")}</option>
              <option value="second">{translate("second word")}</option>
              <option value="firstSecondary">
                {translate("first word but second word gains secondary stress")}
              </option>
              <option value="secondSecondary">
                {translate("second word but first word gains secondary stress")}
              </option>
            </select>
          </div>
        )}
        {prosodyType === "pitch" && (
          <div>
            <br />
            <span>{translate("The accented syllable shall be:")}</span>
            <select
              value={primaryStressPlacement}
              onChange={(e) => setAccentPlacement(e.target.value)}
            >
              <option value="free">{translate("any random syllable")}</option>
            </select>
          </div>
        )}
      </Collapsible>

      <Collapsible title={translate("Phonotactics")}>
        <SoundChangeMaker
          setShowLanguageSavedMessage={setShowLanguageSavedMessage}
          soundChangeOrPhonotactic={"phonotactic"}
          spellings={spellings}
          selectedSoundChanges={selectedSoundChanges}
          setSelectedSoundChanges={setSelectedSoundChanges}
          allCategoryValues={allCategoryValuesSoundChange}
        />
      </Collapsible>

      <Collapsible title={translate("Create Spellings")}>
        <div className="thin-white-border">
          <SpellingCreator spellings={spellings} setSpellings={setSpellings} />
        </div>
      </Collapsible>

      <Collapsible title={translate("Themes")}>
        <ThemeSelection
          chosenThemes={chosenThemes}
          setChosenThemes={setChosenThemes}
        />
      </Collapsible>

      <Collapsible title={translate("Adjectives: stative or nominal")}>
        <span>{translate("Adjectives are:")}</span>
        <select
          value={adjectiveNature}
          onChange={(e) => setAdjectiveNature(e.target.value)}
        >
          <option value="stative">{translate("stative")}</option>
          <option value="nominal">{translate("nominal")}</option>
        </select>
      </Collapsible>

      <Collapsible title={translate("Grammatical Gender")}>
        <input type="checkbox" id="gender" onChange={toggleHasGender} />
        <label htmlFor={"gender"}>{translate("Add Grammatical Gender")}</label>
        <br />

        {hasGender && (
          <div>
            <span>{translate("Choose gender system")}</span>
            <select
              value={chosenGender}
              onChange={(e) => toggleChosenGender(e.target.value)}
            >
              <option value="masc-fem-neut">
                {translate("Masculine - Feminine - Neuter")}
              </option>
              <option value="anim-inan">
                {translate("Animate - Inanimate")}
              </option>
            </select>

            {adjectiveNature === "nominal" && (
              <>
                <br />
                <input
                  checked={adjectivesAgree}
                  type="checkbox"
                  id="agree"
                  onChange={toggleAgree}
                />
                <label htmlFor={"agree"}>
                  {translate("Adjectives agree with nouns")}
                </label>
              </>
            )}

            {adjectiveNature === "nominal" && adjectivesAgree && (
              <>
                <br />
                <span>
                  {translate(
                    "Headwords for adjectives will appear in which gender:"
                  )}
                </span>
                <select
                  value={adjectiveheadwordGender}
                  onChange={(e) => setAdjectiveheadwordGender(e.target.value)}
                >
                  <option value="--">--</option>
                  {gendersArr.map((gender, index) => (
                    <option key={index} value={gender.name}>
                      {translate(gender.name)}
                    </option>
                  ))}
                </select>
                <span>
                  {translate(
                    "(all gendered forms of an adjectives will appear in the language's finished dictionary, this is just to choose which is the headword)"
                  )}
                </span>
              </>
            )}
          </div>
        )}
      </Collapsible>

      <Collapsible title={translate("Grammatical Affixes")}>
        <p>
          {translate(
            "Select if you want dictionary headwords to bear grammatical affixes. Blank text fields will result in randomly generated affixes. Enter IPA only, not the affix in the language's orthography."
          )}
        </p>
        <div>
          <input
            checked={nounAffixes}
            id="nounAffix"
            type="checkbox"
            onChange={() => toggleAffixes(nounAffixes, setNounAffixes)}
          />
          <label htmlFor={"nounAffix"}>{translate("Nouns")}</label>

          {nounAffixes && (
            <div className="thin-white-border">
              {hasGender &&
                gendersArr.map((gender, index) => (
                  <div key={index}>
                    <span style={{ marginRight: "5px" }}>
                      {translate(gender.name)}
                    </span>
                    <input
                      type="text"
                      placeholder={translate("enter affix")}
                      onChange={(e) =>
                        changeAffix(setGendersArr, index, e.target.value)
                      }
                    />

                    <select
                      value={gender.suffixOrPrefix}
                      style={{ marginLeft: "10px" }}
                      onChange={(e) =>
                        changeAffixPlacement(
                          setGendersArr,
                          index,
                          e.target.value
                        )
                      }
                    >
                      <option value="suffix">{translate("suffix")}</option>
                      <option value="prefix">{translate("prefix")}</option>
                    </select>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div>
          <input
            id="verbAffix"
            type="checkbox"
            checked={verbAffixes}
            onChange={() => toggleAffixes(verbAffixes, setVerbAffixes)}
          />
          <label htmlFor={"verbAffix"}>{translate("Verbs")}</label>

          {verbAffixes && (
            <div className="thin-white-border">
              <button onClick={() => addForm(setVerbForms)}>
                {translate("Add Form")}
              </button>
              <div>
                <p>{translate("Headword Form")}</p>

                {verbForms.map((form, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <input
                      type="radio"
                      checked={selectedVerbHeadwordIndex === index}
                      onChange={() =>
                        toggleRadio(
                          index,
                          setSelectedVerbHeadwordIndex,
                          form.formName,
                          setVerbHeadwordForm
                        )
                      }
                    />

                    <input
                      value={form.formName}
                      placeholder={translate("enter form name")}
                      onChange={(e) =>
                        updateForm(
                          index,
                          e.target.value,
                          form.affix,
                          setVerbForms
                        )
                      }
                    />

                    <input
                      value={form.affix}
                      placeholder={translate("enter affix")}
                      onChange={(e) =>
                        updateForm(
                          index,
                          form.formName,
                          e.target.value,
                          setVerbForms
                        )
                      }
                    />
                    <select
                      style={{ marginLeft: "10px" }}
                      onChange={(e) =>
                        changeAffixPlacement(
                          setVerbForms,
                          index,
                          e.target.value
                        )
                      }
                    >
                      <option value="--">--</option>
                      <option value="suffix">{translate("suffix")}</option>
                      <option value="prefix">{translate("prefix")}</option>
                    </select>
                    <button onClick={() => removeForm(index, setVerbForms)}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Collapsible>

      <Collapsible title={translate("Numbers")}>
        <div>
          <span>{translate("Number base:")}</span>
          <input
            type="text"
            placeholder={translate("Enter number")}
            onChange={(e) => handleNumberBase(e.target.value)}
          />
          {numBaseWarning && (
            <p className="warning">
              {translate("What you entered was not a number.")}
            </p>
          )}
        </div>

        <hr />
        <div>
          <span>
            {translate("Numbers will be made of unique roots up until:")}
          </span>
          <input
            type="text"
            placeholder={translate("Enter number")}
            onChange={(e) => handleNumberRoots(e.target.value)}
          />
          <span style={{ fontStyle: "italic" }}>
            {translate("Numbers between 4-12 are more realistic...")}
          </span>
          {numRootWarning && (
            <p className="warning">
              {translate("What you entered was not a number.")}
            </p>
          )}
        </div>
        <hr />
        <div>
          <span>
            {translate(
              'When two numbers are compounded to form another, do they simply compound the numbers (as in English "twenty-three" or do they insert a conjunction between them (as in German "dreiundzwanzig")?'
            )}
          </span>
          <select
            value={isNumConjunction}
            onChange={(e) => toggleIsNumConjunction(e.target.value)}
          >
            <option value="noConjunction">{translate("no conjunction")}</option>
            <option value="conjunction">{translate("conjunction")}</option>
          </select>
          <hr />

          {isNumConjunction === "conjunction" && (
            <div style={{ marginTop: "10px" }}>
              <span>
                {translate("Which conjunction is used to join numbers?")}
              </span>
              <select
                value={numConjunction}
                onChange={(e) => toggleNumConjunction(e.target.value)}
              >
                <option value="and">{translate("and")}</option>
                <option value="with">{translate("with")}</option>
                <option value="on">{translate("on")}</option>
                <option value="toward">{translate("toward")}</option>
                <option value="over">{translate("over")}</option>
              </select>
            </div>
          )}

          <hr />

          <div style={{ marginTop: "10px" }}>
            <span>
              {translate(
                "When two numbers are compounded to form another, does the higher number come first or the lower?"
              )}
            </span>
            <select
              value={numOrder}
              onChange={(e) => toggleNumOrder(e.target.value)}
            >
              <option value="higher">{translate("higher")}</option>
              <option value="lower">{translate("lower")}</option>
            </select>
          </div>
        </div>
      </Collapsible>

      <Collapsible title={translate("Derivation")}>
        <h5>
          {(affixArray.length + potentialAffixArray.length).toLocaleString()}{" "}
          possible derivational affixes with{" "}
          {derivations.length.toLocaleString()} possible derivations.
        </h5>

        <input
          type="checkbox"
          style={{ marginRight: "5px" }}
          onChange={toggleUseOnlySelectedAffixes}
        />
        <span style={{ marginRight: "5px" }}>
          {translate(
            "Use only selected derivational affixes, uncheck to allow non-selected options to be randomly selected"
          )}
        </span>

        <div className="thin-white-border">
          <PaginateAffixes
            allAffixArray={allAffixArray}
            updateAffix={updateAffix}
            chosenAffixes={chosenAffixes}
            adjectiveNature={adjectiveNature}
            openManageDerivationModal={openManageDerivationModal}
            changeAdjectiveToStativeVerb={changeAdjectiveToStativeVerb}
          />
        </div>

        <div className="thin-white-border">
          <h5>{translate("Compounding")}</h5>
          <h5>
            {compoundDerivations.length.toLocaleString()} possible compounds.
          </h5>

          {/*let user change likelihood of compounding*/}

          <div>
            <ManageCompounds
              chosenCompoundTypes={chosenCompoundTypes}
              setChosenCompoundTypes={setChosenCompoundTypes}
              compoundChance={compoundChance}
              setCompoundChance={setCompoundChance}
            />
          </div>
        </div>
      </Collapsible>

      {/* <div className="thin-white-border">
        <input id="expand" type="checkbox" onChange={toggleExpandVocab}></input>
        <label htmlFor={"expand"}>{translate("Expand Vocabulary")}</label>

        {expanded && (
          <div>
            <input
              id="maxWordInput"
              type="text"
              placeholder={maxWords}
              onChange={(e) => setMaxWords(e.target.value)}
            ></input>

            <span>
              {translate(
                "This expansion of vocabulary allows for up to nearly 700,000 words. Select how many extra words you would like your dictionary to have"
              )}
            </span>
          </div>
        )}
      </div> */}

      <button onClick={generateLanguage}>
        {translate("Generate Language")}
      </button>
      <button onClick={saveLanguage}>{translate("Save Language")}</button>

      {loading ? <h1>{translate("Saving Language...")}</h1> : <></>}

      {showLanguageSavedMessage ? (
        <div>
          <p className="word-link" onClick={handleOpenLanguage}>
            {translate(
              "Your new language has been saved! Click here to view it"
            )}
          </p>
        </div>
      ) : (
        <></>
      )}

      {languageLoading ? (
        <div>
          <p>{translate("Loading...")}</p>
        </div>
      ) : (
        <></>
      )}

      <div>
        {!showLanguageSavedMessage && !languageLoading && languageGenerated ? (
          <div>
            <p>
              {translate(
                "{totalWordCount} words: {wordCount} roots, {compoundCount} compounds, {derivedWithAffixCount} words derived with affixes and {affixCount} derivational affixes",
                {
                  wordCount: wordCount.toLocaleString(),
                  compoundCount: compoundCount.toLocaleString(),
                  derivedWithAffixCount: derivedWithAffixCount.toLocaleString(),
                  affixCount: affixCount,
                  totalWordCount: (
                    wordCount +
                    compoundCount +
                    derivedWithAffixCount +
                    affixCount
                  ).toLocaleString(),
                }
              )}
            </p>

            <p>{translate("")}</p>

            <div className="thin-white-border">
              <Collapsible title={translate("Numbers")}>
                <p>
                  {languageName ? languageName : "This language"} has a base-
                  {numberBase} system.{" "}
                  {numRoot !== Number(numberBase) && (
                    <span>
                      Words up until {numRoot} have unique roots, subsequent
                      words up until {numberBase} are made via compounding e.g "
                      {numRoot + 1}" being {numRoot} + 1, "{numRoot + 2}" being{" "}
                      {numRoot} + 2 and so on.
                    </span>
                  )}{" "}
                  Interval numbers between each "step", i.e the numbers between{" "}
                  {numberBase} - {Number(numberBase) + Number(numberBase)}, are
                  formed by taking the "step" number and compounding the
                  interval number e.g{" "}
                  {numbers.map(
                    (number) =>
                      number.num_meaning[0] === toWords(Number(numberBase)) && (
                        <b>
                          <span>{number.translation}</span>
                        </b>
                      )
                  )}{" "}
                  "{Number(numberBase)}" +{" "}
                  {numbers.map(
                    (number) =>
                      number.num_meaning[0] === "three" && (
                        <b>
                          <span>{number.translation}</span>
                        </b>
                      )
                  )}{" "}
                  "3" ={" "}
                  {numbers.map(
                    (number) =>
                      number.num_meaning[0] === toWords(Number(numberBase)) && (
                        <b>
                          <span>{number.translation}</span>
                        </b>
                      )
                  )}{" "}
                  {numbers.map(
                    (number) =>
                      number.num_meaning[0] === "three" && (
                        <b>
                          <span>{number.translation}</span>
                        </b>
                      )
                  )}{" "}
                  {toWords(Number(numberBase) + 3)}.
                </p>

                {numbers.map((word, index) => (
                  <div key={index} className="dictionary-entry">
                    <div>
                      <span>
                        <b style={{ fontWeight: "bolder" }}>
                          {word.word_type === "suffix" ||
                          word.word_type === "enclitic" ? (
                            <span>-</span>
                          ) : (
                            <></>
                          )}
                          <span className="headword">{word.translation}</span>

                          {word.word_type === "prefix" ||
                          word.word_type === "proclitic" ? (
                            <span>-</span>
                          ) : (
                            <></>
                          )}
                        </b>
                      </span>

                      <span
                        style={{ marginLeft: "5px", marginRight: "10px" }}
                        className="headword"
                      >
                        /{word.ipa}/
                      </span>

                      {word.num_meaning && (
                        <>
                          <span
                            style={{ marginLeft: "5px" }}
                            className="meaning"
                          >
                            "{word.num_meaning[0]}"
                          </span>

                          {Array.isArray(word.num_word_forms) &&
                            word.num_word_forms.length > 0 && (
                              <>
                                {word.num_word_forms.map(
                                  (wordForm, index) =>
                                    wordForm.word && (
                                      <span style={{ marginLeft: "10px" }}>
                                        <span>{wordForm.name}: </span>
                                        {(word.word_type === "suffix" ||
                                          word.word_type === "enclitic") && (
                                          <span>-</span>
                                        )}
                                        {(word.word_type === "prefix" ||
                                          word.word_type === "proclitic") && (
                                          <span>-</span>
                                        )}
                                        <i>{wordForm.translation}</i>{" "}
                                        <span>/{wordForm.ipa}/</span>;{" "}
                                      </span>
                                    )
                                )}
                              </>
                            )}
                        </>
                      )}

                      {word.hasOwnProperty("isAffixedDerived") && (
                        <span
                          style={{ marginLeft: "5px", fontStyle: "italic" }}
                        >
                          - {translate("derived with an affix")}
                        </span>
                      )}

                      {word.hasOwnProperty("isCompound") && (
                        <span
                          style={{ marginLeft: "5px", fontStyle: "italic" }}
                        >
                          - {translate("is a compound")}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </Collapsible>
            </div>

            <div className="thin-white-border">
              <PaginatedGeneratedLanguage words={words} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CreateLanguage;
