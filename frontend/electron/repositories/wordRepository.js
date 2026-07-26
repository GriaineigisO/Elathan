import db from "../database.js";
import { parseLanguage } from "./parse/parseLanguages.js";
import { parseDictionary } from "./parse/parseDictionary.js";
import { parseEtymology } from "./parse/parseEtymology.js";

export function getWordData(id) {
  let lang = {};
  let langId = {};

  function fetchWord() {
    //FIRST QUERY → Get the word itself
    const getWordStmt = db.prepare(`
            SELECT * 
            FROM dictionary
            WHERE word_id = ?
            `);

    const getWord = getWordStmt.all(id).map(parseDictionary);
    

    const word = getWord[0];

    const getVariantsStmt = db.prepare(`
    SELECT
        word,
        word_id
    FROM dictionary
    WHERE json_extract(variant_of, '$.word_id') = ?
`);

    const getVariants = getVariantsStmt.all(id).map(parseDictionary);

    langId = getWord[0].language_id;   

    const getLanguageStmt = db.prepare(`
    SELECT *
    FROM languages
    WHERE language_id = ?
    `);

    const getLanguage = getLanguageStmt.all(langId).map(parseLanguage);

    lang = getLanguage[0];

    return {
      wordData: { ...word, variants: getVariants || [] },
      languageData: lang,
    };
  }



  function getAllWords() {
    const getAllWordsStmt = db.prepare(`
            SELECT * 
            FROM dictionary
            WHERE language_id = ?
            ORDER BY word COLLATE NOCASE
            `);

    const fetchAllWords = getAllWordsStmt.all(langId).map(parseDictionary);

    return fetchAllWords;
  }

  function getCognates(id) {
    // Step 1: find the ancestor of the word if it is not derived
    const getEtymologyStmt = db.prepare(`
            SELECT * 
            FROM etymology
            WHERE word_id = ?
            `);

    const getEtymology = getEtymologyStmt.all(id).map(parseEtymology);

    if (getEtymology[0] && getEtymology[0].etymology_type === "fromMother") {
      const getMotherStmt = db.prepare(`
            SELECT * 
            FROM etymology
            WHERE mother_word_id = ?
            `);

      const getMother = getMotherStmt
        .all(getEtymology[0].mother_word_id)
        .map(parseEtymology);

      //now that the ancestor word has been found, find all words which also list this as mother word or loan word

      const cognatesStmt = db.prepare(`
            SELECT * 
            FROM etymology
            WHERE (mother_word_id = ?
                OR loanword_id = ?)
                AND word_id != ?
            `);

      const cognates = cognatesStmt.all(
        getEtymology[0].mother_word_id,
        getEtymology[0].mother_word_id,
        id,
      );


      const wordIds = cognates.map((row) => row.word_id);

      const wordsStmt = db.prepare(`
            SELECT * 
            FROM dictionary
            WHERE word_id IN (${wordIds})
            `);

      const words = wordsStmt.all().map(parseDictionary);
      let languageNameArr = [];
      const languageIds = [...new Set(words.map((w) => w.language_id))];

      const languagesStmt = db.prepare(`
            SELECT language_id, language_name, is_proto
            FROM languages
            WHERE language_id IN (${languageIds})
            `);

      const languages = languagesStmt.all().map(parseLanguage);
      const languageLookup = {};

      languages.forEach((lang) => {
        languageLookup[lang.language_id] = {
          language_name: lang.language_name,
          is_proto: lang.is_proto,
        };
      });

      const resultArr = words.map((word) => {
        const meanings = [
          word.noun_meaning,
          word.num_meaning,
          word.verb_meaning,
          word.adj_meaning,
          word.pron_meaning,
          word.adv_meaning,
          word.adp_meaning,
          word.interj_meaning,
          word.conj_meaning,
          word.part_meaning,
        ]
          .filter(Array.isArray)
          .flat();

        return {
          ...word,
          language_name:
            languageLookup[word.language_id]?.language_name ?? null,
          is_proto: languageLookup[word.language_id]?.is_proto ?? false,
          meaning: meanings,
        };
      });
      return resultArr;
    }
  }

  function getDerivations() {
    // Step 1: Get all etymology rows for this word
    const etymologyRowsStmt = db.prepare(`
            SELECT *
            FROM etymology
            WHERE first_element_id = ?
                OR second_element_id = ?
                OR third_element_id = ?
            `);

    const etymologyRows = etymologyRowsStmt.all(id, id, id);

    // Step 1: Gather all IDs
    const wordIds = etymologyRows.map((e) => e.word_id);

    // Step 2: Single query for all words
    const allEntriesStmt = db.prepare(`
            SELECT 
            word_id,
    word,
    noun_meaning,
    num_meaning,
    verb_meaning,
    adj_meaning,
    adv_meaning,
    adp_meaning,
    pron_meaning,
    interj_meaning,
    conj_meaning,
    part_meaning,
    affix_meaning
    FROM dictionary
    WHERE word_id IN (${wordIds})
            `);

    const allEntries = allEntriesStmt.all().map(parseDictionary);

    // Step 3: Map by ID for quick lookup
    const entryMap = new Map(allEntries.map((e) => [e.word_id, e]));
    // Step 4: Build results array
    const results = etymologyRows
      .map((etym) => {
        const entry = entryMap.get(etym.word_id);
        if (!entry) return null;

        const meanings = [
          ...(entry.noun_meaning || []),
          ...(entry.num_meaning || []),
          ...(entry.verb_meaning || []),
          ...(entry.adj_meaning || []),
          ...(entry.adv_meaning || []),
          ...(entry.adp_meaning || []),
          ...(entry.pron_meaning || []),
          ...(entry.interj_meaning || []),
          ...(entry.conj_meaning || []),
          ...(entry.part_meaning || []),
          ...(entry.affix_meaning || []),
        ];

        return {
          derived_word_id: etym.word_id,
          word: entry.word,
          meaning: meanings.join(", "),
          noun_meaning: entry.noun_meaning,
          num_meaning: entry.num_meaning,
          verb_meaning: entry.verb_meaning,
          adj_meaning: entry.adj_meaning,
          adv_meaning: entry.adv_meaning,
          adp_meaning: entry.adp_meaning,
          pron_meaning: entry.pron_meaning,
          part_meaning: entry.part_meaning,
          interj_meaning: entry.interj_meaning,
          conj_meaning: entry.conj_meaning,
          affix_meaning: entry.affix_meaning,
          is_first_element: etym.first_element_id === id,
          is_second_element: etym.second_element_id === id,
          is_third_element: etym.third_element_id === id,
        };
      })
      .filter(Boolean);

    return results;
  }

  function getSynonyms(selectedWord) {
    const wordsStmt = db.prepare(`
            SELECT *
            FROM dictionary
            WHERE language_id = ?
            `);

    const words = wordsStmt.all(lang.language_id).map(parseDictionary);

    //match meanings to meanings of other words

    let synonyms = [];

    const matchWords = (arr1, arr2, word, synonym) => {
      if (arr1 && arr2) {
        const isMatch = arr1.some((item) => arr2.includes(item));

        if (isMatch && synonym !== word.word && !synonyms.includes(word.word)) {
          //exclude the word from matching with itself
          synonyms.push(word);
        }
      }
    };

    words.forEach((word) => {
      if (word.noun_meaning && selectedWord.noun_meaning) {
        matchWords(
          word.noun_meaning,
          selectedWord.noun_meaning,
          word,
          selectedWord.word,
        );
      }

      if (word.num_meaning && selectedWord.num_meaning) {
        matchWords(
          word.num_meaning,
          selectedWord.num_meaning,
          word,
          selectedWord.word,
        );
      }

      if (word.verb_meaning && selectedWord.verb_meaning) {
        matchWords(
          word.verb_meaning,
          selectedWord.verb_meaning,
          word,
          selectedWord.word,
        );
      }

      if (word.adj_meaning && selectedWord.adj_meaning) {
        matchWords(
          word.adj_meaning,
          selectedWord.adj_meaning,
          word,
          selectedWord.word,
        );
      }

      if (word.adv_meaning && selectedWord.adv_meaning) {
        matchWords(
          word.adv_meaning,
          selectedWord.adv_meaning,
          word,
          selectedWord.word,
        );
      }

      if (word.adp_meaning && selectedWord.adp_meaning) {
        matchWords(
          word.adp_meaning,
          selectedWord.adp_meaning,
          word,
          selectedWord.word,
        );
      }

      if (word.conj_meaning && selectedWord.conj_meaning) {
        matchWords(
          word.conj_meaning,
          selectedWord.conj_meaning,
          word,
          selectedWord.word,
        );
      }

      if (word.interj_meaning && selectedWord.interj_meaning) {
        matchWords(
          word.interj_meaning,
          selectedWord.interj_meaning,
          word,
          selectedWord.word,
        );
      }

      if (word.pron_meaning && selectedWord.pron_meaning) {
        matchWords(
          word.part_meaning,
          selectedWord.part_meaning,
          word,
          selectedWord.word,
        );
      }

      if (word.part_meaning && selectedWord.part_meaning) {
        matchWords(
          word.part_meaning,
          selectedWord.part_meaning,
          word,
          selectedWord.word,
        );
      }

      if (word.affix_meaning && selectedWord.affix_meaning) {
        matchWords(
          word.affix_meaning,
          selectedWord.affix_meaning,
          word,
          selectedWord.word,
        );
      }
    });

    synonyms.forEach((synonym) => {
      let synonymMeaning = [];

      const mergeMeanings = (meaning) => {
        if (meaning) {
          meaning.forEach((i) => synonymMeaning.push(i));
        }
      };

      if (synonym.noun_meaning) mergeMeanings(synonym.noun_meaning);
      if (synonym.num_meaning) mergeMeanings(synonym.num_meaning);
      if (synonym.verb_meaning) mergeMeanings(synonym.verb_meaning);
      if (synonym.adj_meaning) mergeMeanings(synonym.adj_meaning);
      if (synonym.adp_meaning) mergeMeanings(synonym.adp_meaning);
      if (synonym.part_meaning) mergeMeanings(synonym.part_meaning);
      if (synonym.pron_meaning) mergeMeanings(synonym.pron_meaning);
      if (synonym.conj_meaning) mergeMeanings(synonym.conj_meaning);
      if (synonym.interj_meaning) mergeMeanings(synonym.interj_meaning);
      if (synonym.affix_meaning) mergeMeanings(synonym.affix_meaning);
      if (synonym.adv_meaning) mergeMeanings(synonym.adv_meaning);

      synonym["meaning"] = synonymMeaning;
    });

    return synonyms;
  }

  function getMotherLanguage(lang) {
    const motherId = lang.mother_language_id;

    if (motherId) {
      const getMotherStmt = db.prepare(`
                SELECT *
                FROM languages
                WHERE language_id = ?
                `);

      const getMother = getMotherStmt.all(motherId).map(parseLanguage);

      return {
        language_id: getMother[0].language_id,
        language_name: getMother[0].language_name,
        mother_language_id: getMother[0].mother_language_id,
        is_proto: getMother[0].is_proto,
      };
    }
  }

  function getDescendants(selectedWord) {
    // Step 1: Get all etymology rows for this word
    const etymologyRowsStmt = db.prepare(`
            SELECT * 
            FROM etymology
            WHERE mother_word_id = ?
                OR loanword_id = ?
            `);

    const etymologyRows = etymologyRowsStmt.all(id, id).map(parseEtymology);

    const wordIds = etymologyRows.map((row) => row.word_id);

    const wordsStmt = db.prepare(`
            SELECT 
                 word_id,
      word,
      word_type,
      language_id,
      noun_meaning,
      num_meaning,
      verb_meaning,
      adj_meaning,
      adv_meaning,
      adp_meaning,
      pron_meaning,
      interj_meaning,
      conj_meaning,
      part_meaning,
      affix_meaning
      FROM dictionary
      WHERE word_id IN (${wordIds})
            `);

    const words = wordsStmt.all().map(parseDictionary);

    const languageIds = [...new Set(words.map((w) => w.language_id))];

    const languagesStmt = db.prepare(`
            SELECT language_id, language_name, is_proto
            FROM languages
            WHERE language_id in (${languageIds})
            `);

    const languages = languagesStmt.all().map(parseLanguage);

    const wordLookup = {};

    words.forEach((word) => {
      wordLookup[word.word_id] = word;
    });

    const languageLookup = {};

    languages.forEach((lang) => {
      languageLookup[lang.language_id] = lang;
    });

    const results = etymologyRows
      .map((etym) => {
        const word = wordLookup[etym.word_id];

        if (!word) return null;

        const language = languageLookup[word.language_id];

        const meanings = [
          word.noun_meaning,
          word.num_meaning,
          word.verb_meaning,
          word.adj_meaning,
          word.adv_meaning,
          word.adp_meaning,
          word.pron_meaning,
          word.interj_meaning,
          word.conj_meaning,
          word.part_meaning,
          word.affix_meaning,
        ]
          .filter(Array.isArray)
          .flat()
          .join(", ");

        return {
          descendant_word_id: etym.word_id,
          etymology_type: etym.etymology_type,

          word_id: word.word_id,
          word: word.word,

          meaning: meanings,

          noun_meaning: word.noun_meaning,
          num_meaning: word.num_meaning,
          verb_meaning: word.verb_meaning,
          adj_meaning: word.adj_meaning,
          adv_meaning: word.adv_meaning,
          adp_meaning: word.adp_meaning,
          pron_meaning: word.pron_meaning,
          part_meaning: word.part_meaning,
          interj_meaning: word.interj_meaning,
          conj_meaning: word.conj_meaning,
          affix_meaning: word.affix_meaning,

          word_type: word.word_type,

          language_name: language?.language_name ?? null,
          is_proto: language?.is_proto ?? false,
        };
      })
      .filter(Boolean);

    return results;
  }

  const word = fetchWord();
  const language = lang;
  const allWords = getAllWords();
  const cognates = getCognates(word.wordData.word_id);
  const derivations = getDerivations();
  const synonyms = getSynonyms(word);
  const motherLanguage = getMotherLanguage(lang);
  const descendants = getDescendants();

  return {
    word,
    language,
    allWords,
    motherLanguage,
    cognates,
    descendants,
    derivations,
    synonyms,
  };
};

export function getWordsForms(id) {
  const wordForms = [];
  const getFormsStmt = db.prepare(`
    SELECT noun_word_forms, verb_word_forms, adv_word_forms, adp_word_forms, adj_word_forms, conj_word_forms, part_word_forms, pron_word_forms, interj_word_forms, affix_word_forms, clitic_word_forms, num_word_forms
    FROM dictionary
    WHERE word_id = ?
    `);

    const getForms = getFormsStmt.all(id).map(parseDictionary);

   
      if (getForms[0].noun_word_forms.length > 0) {
        wordForms.push(getForms[0].noun_word_forms)
      }

      if (getForms[0].verb_word_forms.length > 0) {
        wordForms.push(getForms[0].verb_word_forms)
      }

      if (getForms[0].adj_word_forms.length > 0) {
        wordForms.push(getForms[0].adj_word_forms)
      }

      if (getForms[0].adv_word_forms.length > 0) {
        wordForms.push(getForms[0].adv_word_forms)
      }

      if (getForms[0].conj_word_forms.length > 0) {
        wordForms.push(getForms[0].conj_word_forms)
      }

      if (getForms[0].num_word_forms.length > 0) {
        wordForms.push(getForms[0].num_word_forms)
      }

      if (getForms[0].interj_word_forms.length > 0) {
        wordForms.push(getForms[0].interj_word_forms)
      }

      if (getForms[0].part_word_forms.length > 0) {
        wordForms.push(getForms[0].part_word_forms)
      }

       if (getForms[0].pron_word_forms.length > 0) {
        wordForms.push(getForms[0].pron_word_forms)
      }

      if (getForms[0].affix_word_forms.length > 0) {
        wordForms.push(getForms[0].noun_word_forms)
      }

      if (getForms[0].adp_word_forms.length > 0) {
        wordForms.push(getForms[0].adp_word_forms)
      }

      if (getForms[0].clitic_word_forms.length > 0) {
        wordForms.push(getForms[0].clitic_word_forms)
      }
    
    return wordForms;
}

