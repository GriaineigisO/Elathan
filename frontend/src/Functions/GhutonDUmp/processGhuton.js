import { addLanguage } from "../../services/languageService";
import { addWord } from "../../services/languageService";
import contents from "./Ghuton Words.txt?raw";

const meaningKeys = [
  {
    meaning: "adv_meaning",
    abbr: "adv",
    categories: "adv_word_categories",
    forms: "adv_word_forms",
    type: "adverb",
    category_selection: "advCategorySelections",
  },
  {
    meaning: "verb_meaning",
    abbr: "v",
    categories: "verb_word_categories",
    forms: "verb_word_forms",
    type: "verb",
    category_selection: "verbCategorySelections",
  },
  {
    meaning: "adj_meaning",
    abbr: "adj",
    categories: "adj_word_categories",
    forms: "adj_word_forms",
    type: "adjective",
    category_selection: "adjCategorySelections",
  },
  {
    meaning: "adp_meaning",
    abbr: "adp",
    categories: "adp_word_categories",
    forms: "adp_word_forms",
    type: "adposition",
    category_selection: "adpCategorySelections",
  },
  {
    meaning: "conj_meaning",
    abbr: "conj",
    categories: "conj_word_categories",
    forms: "conj_word_forms",
    type: "conjunction",
    category_selection: "conjCategorySelections",
  },
  {
    meaning: "pron_meaning",
    abbr: "pron",
    categories: "pron_word_categories",
    forms: "pron_word_forms",
    type: "pronoun",
    category_selection: "pronCategorySelections",
  },
  {
    meaning: "part_meaning",
    abbr: "part",
    categories: "part_word_categories",
    forms: "part_word_forms",
    type: "particle",
    category_selection: "partCategorySelections",
  },
  {
    meaning: "interj_meaning",
    abbr: "interj",
    categories: "interj_word_categories",
    forms: "interj_word_forms",
    type: "interjection",
    category_selection: "interjCategorySelections",
  },
  {
    meaning: "affix_meaning",
    abbr: "affix",
    categories: "affix_word_categories",
    forms: "affix_word_forms",
    type: "affix",
    category_selection: "affixCategorySelections",
  },
  {
    meaning: "clitic_meaning",
    abbr: "clitic",
    categories: "clitic_word_categories",
    forms: "clitic_word_forms",
    type: "clitic",
    category_selection: "cliticCategorySelections",
  },
  {
    meaning: "num_meaning",
    abbr: "num",
    categories: "num_word_categories",
    forms: "num_word_forms",
    type: "number",
    category_selection: "numCategorySelections",
  },
  {
    meaning: "noun_meaning",
    abbr: "n",
    categories: "noun_word_categories",
    forms: "noun_word_forms",
    type: "noun",
    category_selection: "nounCategorySelections",
  },
];

function removeTo(arr) {
  //removes "to " in the english translations since Elatha automatically adds those to verbs

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes("to ")) {
      const splitDefition = arr[i].trim().split(" ");
      arr[i] = splitDefition[1];
    }
  }
  return arr;
}

export function convertGhutonom() {
  //get entire contents of Ghuton Words.txt as a single string

  //split the string to divide contents into an array of entries for each word
  const unformattedEntries = contents.split(/\r?\n/);

  //now loop through unformattedEntries to format each entry into an object
  const formattedEntries = [];

  unformattedEntries.forEach((line) => {
    const obj = {};

    //find headword
    const splitHeadword = line.trim().split(" - ");
    const headword = splitHeadword[0];
    obj["word"] = headword;

    let withoutHeadword = splitHeadword[1];

    //Artur marks prepositions, adverbs and numberals differently than other parts of speech. Now I will make them be marked the same as other parts of speech for ease laster on
    withoutHeadword = withoutHeadword.replace(
      " : preposition",
      "(preposition)",
    );
    withoutHeadword = withoutHeadword.replace(" : numeral", "(numeral)");
    withoutHeadword = withoutHeadword.replace(" : adverb", "(adverb)");

    //now find the english translations. These immediately follow the "-" and are always followed by brackets
    const splitTranslations = withoutHeadword.trim().split(/(?<!\s)[(:]/);
    const translations = splitTranslations[0];
    const withoutTranslations = splitTranslations[1];

    //now figure out which part of speech the word is. Artur provides this in the curly brackets before ":", or after ":" for adverbs and numbers but nouns are totally unmarked
    const splitPartOfSpeech = withoutTranslations.trim().split(":");

    const translationsArr = [];

    if (translations.includes(";")) {
      //Artur uses ";" in the translations to divide translations of different parts of speech. Detect this and deal with each part of speech seperately
      const splitTranslation = translations.trim().split(";");
      translationsArr.push(splitTranslation[0]);
      translationsArr.push(splitTranslation[1]);
    } else {
      translationsArr.push(translations);
    }

    splitPartOfSpeechLoop: for (const splitPart of splitPartOfSpeech) {
      for (const key of meaningKeys) {
        let isSamePartOfSpeech = false;

        if (key.type === "adverb" && splitPart.includes(key.type)) {
          isSamePartOfSpeech = true;
        } else if (splitPart.includes(key.type)) {
          isSamePartOfSpeech = true;
        }

        if (isSamePartOfSpeech) {
          //if a verb, then remove "to " since Elatha will later insert those automatically
          const translationArr = translations.split(", ");
          obj[key.meaning] = removeTo(translationArr);
          break splitPartOfSpeechLoop;
        }

        if (!isSamePartOfSpeech && key.type === "noun") {
          obj[key.meaning] = translations.split(", ");
        }
      }
    }

    //now process the themes
    const splitThemes = withoutTranslations.trim().split(" : ");
    const themes = [];
    if (splitThemes[1]) {
      const themeToSplit = splitThemes[1];
      const splitTheme = themeToSplit.split(";");
      splitTheme.forEach((theme) => {
        themes.push({ tag: theme, name: "Theme" });
      });

      obj["tags"] = themes;
    }

    //now process the categories
    //check if word is athematic or thematic
    meaningKeys.forEach((key) => {
      const categories = [];
      if (splitThemes[0].includes("athematic")) {
        if (key.meaning in obj)
          categories.push({
            abbreviation: "athem",
            category_name: "Thematicity",
            category_type: "athematic",
          });
      } else if (splitThemes[0].includes("thematic")) {
        if (key.meaning in obj)
          categories.push({
            abbreviation: "them",
            category_name: "Thematicity",
            category_type: "thematic",
          });
      }

      //check noun gender
      if (splitThemes[0].includes("masculine")) {
        if (key.meaning in obj && key.type === "noun")
          categories.push({
            abbreviation: "masc",
            category_name: "Gender",
            category_type: "masculine",
          });
      }

      if (splitThemes[0].includes("feminine")) {
        if (key.meaning in obj && key.type === "noun")
          categories.push({
            abbreviation: "fem",
            category_name: "Gender",
            category_type: "feminine",
          });
      }

      if (splitThemes[0].includes("neuter")) {
        if (key.meaning in obj && key.type === "noun")
          categories.push({
            abbreviation: "neut",
            category_name: "Gender",
            category_type: "neuter",
          });
      }

      //now check accent type
      if (splitThemes[0].includes("proterokinetic")) {
        if (key.meaning in obj) {
          categories.push({
            abbreviation: "proterokinetic",
            category_name: "accent type",
            category_type: "proterokinetic",
          });
        }
      }

      if (splitThemes[0].includes("hysterokinetic")) {
        if (key.meaning in obj) {
          categories.push({
            abbreviation: "hysterokinetic",
            category_name: "accent type",
            category_type: "hysterokinetic",
          });
        }
      }

      if (splitThemes[0].includes("acrostatic")) {
        if (key.meaning in obj) {
          categories.push({
            abbreviation: "acrostatic",
            category_name: "accent type",
            category_type: "acrostatic",
          });
        }
      }

      if (splitThemes[0].includes("amphikinetic")) {
        if (key.meaning in obj) {
          categories.push({
            abbreviation: "amphikinetic",
            category_name: "accent type",
            category_type: "amphikinetic",
          });
        }
      }

      //check declension
      const stems = [
        "u-stem",
        "n-stem",
        "s-stem",
        "r-stem",
        "l-stem",
        "i-stem",
      ];
      stems.forEach((stem) => {
        if (splitThemes[0].includes(stem)) {
          if (key.meaning in obj) {
            categories.push({
              abbreviation: stem,
              category_name: "declension",
              category_type: stem,
            });
          }
        }
      });

      //check verb types
      const verbTypes = [
        "reduplicated stative",
        "middle verb",
        "middle ye",
        "middle simple",
        "tudati",
        "nasal infix",
        "deponent",
        "irregular",
      ];
      verbTypes.forEach((type) => {
        if (splitThemes[0].includes(type)) {
          if (key.meaning in obj) {
            categories.push({
              abbreviation: type,
              category_name: "verb_type",
              category_type: type,
            });
          }
        }
      });

      obj[key.categories] = categories;
    });

    formattedEntries.push(obj);
  });

let wordId = Date.now();
  async function addGhutonWord(languageId, entry) {
    const meanings = {};
    meaningKeys.forEach((key) => {
      meanings[key.type] = entry[key.meaning];
    });

    const date = new Date();
     const currentWordId = wordId++
    const addGhutonWord = await window.electron.addWord(
      date,
      currentWordId,
      languageId,
      entry.word,
      meanings,
      "word",
      null,
      null,
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      entry.adj_word_categories,
      entry.noun_word_categories,
      entry.num_word_categories,
      entry.verb_word_categories,
      entry.adv_word_categories,
      entry.adp_word_categories,
      entry.part_word_categories,
      entry.conj_word_categories,
      entry.interj_word_categories,
      entry.affix_word_categories,
      entry.clitic_word_categories,
      entry.pron_word_categories,
      entry.tags ?? [],
      null,
      JSON.stringify({}),
    );

    if (!addGhutonWord.success) console.error(`error adding ${entry.word}`);

    if (addGhutonWord.success) console.error(`success adding ${entry.word}`);
  }

  //word list has now been converted into a JSON object. Now to enter the data into the database
  async function addGhutonom() {
    const languageId = Date.now();
    const data = await window.electron.addLanguage(
      Date.now(),
      "Ghutonóm",
      null,
      null,
      JSON.stringify(true),
      null,
      null,
    );

    if (!data.success) console.log("error adding Ghutonom");

    if (data.success) {
      //now, add the words
      formattedEntries.forEach((entry) => {
        addGhutonWord(languageId, entry);
      });
    }
  }

  addGhutonom();

  //console.log(formattedEntries);
}
