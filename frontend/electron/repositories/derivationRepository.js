import db from "../database.js";
import { parseEtymology } from "./parse/parseEtymology.js";
import { parseDictionary } from "./parse/parseDictionary.js";

export function getDerivations(id) {
  // Step 1: Get all etymology rows for this word

  const getEtymologyStmt = db.prepare(`
    SELECT *
    FROM etymology
    WHERE first_element_id = ?
       OR second_element_id = ?
       OR third_element_id = ?
`);

const getEtymology = getEtymologyStmt
    .all(id, id, id)
    .map(parseEtymology);

  // Step 1: Gather all IDs
  const wordIds = getEtymology.map((e) => e.word_id);

  // Step 2: Single query for all words
  const placeholders = wordIds.map(() => "?").join(",");

const getWordsStmt = db.prepare(`
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
    WHERE word_id IN (${placeholders})
`);

const getWords = getWordsStmt
    .all(...wordIds)
    .map(parseDictionary);

  // Step 3: Map by ID for quick lookup
  const entryMap = new Map(getWords.map((e) => [e.word_id, e]));
  // Step 4: Build results array
  const results = getEtymology
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
  return results.map(parseDictionary);
}

export function getRootWord(id, isFirstElement, isSecondElement, isThirdElement) {
// Step 1: Get derivation info
      const getEtymologyStmt = db.prepare(`
        SELECT *
        FROM etymology
        WHERE word_id = ?
    `);

  const getEtymology = getEtymologyStmt.all(id).map(parseEtymology);
   


    const derivation = getEtymology[0];
    let rootWordId = null;

    if (isFirstElement || isThirdElement) {
      rootWordId = derivation.second_element_id;
    } else if (isSecondElement) {
      rootWordId = derivation.first_element_id;
    }


    if (!rootWordId) {
      return res.json({ message: "No root element resolved" });
    }

      const rootWordDataStmt = db.prepare(`
        SELECT *
        FROM dictionary 
        WHERE word_id = ?
        `)

        const rootWordData = rootWordDataStmt.all(rootWordId).map(parseDictionary)

    return rootWordData[0];
}