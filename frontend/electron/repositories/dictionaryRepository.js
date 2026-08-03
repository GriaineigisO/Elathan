import db from "../database.js";
import { parseDictionary } from "./parse/parseDictionary.js";
import { parseEtymology } from "./parse/parseEtymology.js";

export function getAllWords(languageId) {
  const getWordsStmt = db.prepare(`
        SELECT *
        FROM dictionary
        WHERE language_id = ?
        ORDER BY word COLLATE NOCASE
    `);

  const getWords = getWordsStmt.all(languageId).map(parseDictionary);

  //step 2. get all word ids in an array
  const allWordIds = [];
  getWords.forEach((word) => {
    allWordIds.push(word.word_id);
  });

  //step 3: get all etymologies
  const placeholders = allWordIds.map(() => "?").join(",");

  const getEtymologiesStmt = db
    .prepare(
      `
    SELECT *
    FROM etymology
    WHERE word_id IN (${placeholders})
`,
    )
    .all(...allWordIds);

  const getEtymologies = getEtymologiesStmt.map(parseEtymology);

  const results = [];
  const etymologyWordIds = [];

  for (const etym of getEtymologies) {
    etymologyWordIds.push(etym.word_id);

    const mother = getWords.filter(
      (word) => word.word_id === etym.mother_word_id,
    );

    const first = getWords.filter(
      (word) => word.word_id === etym.first_element_id,
    );
    const second = getWords.filter(
      (word) => word.word_id === etym.second_element_id,
    );
    const third = getWords.filter(
      (word) => word.word_id === etym.third_element_id,
    );
    const loan = getWords.filter((word) => word.word_id === etym.loanword_id);

    // -- Construct enriched result --
    results.push({
      etymology_id: etym.etymology_id,
      word_id: etym.word_id,

      mother_word_id: mother.word_id,
      mother_word: mother.word,
      mother_word_meaning: mother.meaning,
      mother_word_type: mother.word_type,

      first_element_word_id: first.word_id,
      first_element_word: first.word,
      first_element_word_meaning: first.meaning,
      first_element_word_type: first.word_type,

      second_element_word_id: second.word_id,
      second_element_word: second.word,
      second_element_word_meaning: second.meaning,
      second_element_word_type: second.word_type,

      third_element_word_id: third.word_id,
      third_element_word: third.word,
      third_element_word_meaning: third.meaning,
      third_element_word_type: third.word_type,

      loanword_id: loan.word_id,
      loanword: loan.word,
      loanword_meaning: loan.meaning,
      loanword_type: loan.word_type,

      note: etym.note,
      uncertain: etym.uncertain,
      etymology_type: etym.etymology_type,
    });
  }

  for (let i = 0; i < getWords.length; i++) {
    //check if word has an etymology
    if (etymologyWordIds.includes(getWords[i].word_id)) {
      const result = results.filter((e) => e.word_id === getWords[i].word_id);

      getWords[i].etymology_type = result[0].etymology_type;
      getWords[i].note = result[0].note;

      getWords[i].first_element_word_id = result[0].first_element_word_id;
      getWords[i].first_element_word = result[0].first_element_word;
      getWords[i].first_element_word_meaning =
        result[0].first_element_word_meaning;
      getWords[i].first_element_word_type = result[0].first_element_word_type;

      getWords[i].second_element_word_id = result[0].second_element_word_id;
      getWords[i].second_element_word = result[0].second_element_word;
      getWords[i].second_element_word_meaning =
        result[0].second_element_word_meaning;
      getWords[i].second_element_word_type = result[0].second_element_word_type;

      getWords[i].third_element_word_id = result[0].third_element_word_id;
      getWords[i].third_element_word = result[0].third_element_word;
      getWords[i].third_element_word_meaning =
        result[0].third_element_word_meaning;
      getWords[i].third_element_word_type = result[0].third_element_word_type;
    } else {
      getWords[i].etymology_type = "not_derived";
    }
  }

  return getWords.map(parseDictionary);
}
