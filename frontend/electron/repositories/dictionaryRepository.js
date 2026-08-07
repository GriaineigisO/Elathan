import db from "../database.js";
import { parseDictionary } from "./parse/parseDictionary.js";
import { parseEtymology } from "./parse/parseEtymology.js";
import {parseLanguage} from "./parse/parseLanguages.js";

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

export async function getAllWordsForPrint(id) {
 
  
      try {
      
  
        let wordIdArr = [];
  

  const getAllWordsStmt = db.prepare(`
    SELECT *
    FROM dictionary
    WHERE language_id = ?
    `);

    const allData = getAllWordsStmt.all(id).map(parseDictionary)
  
  allData.forEach((word) => wordIdArr.push(word.word_id));
  
        
        //now, find the etymology of each word. Instead of making a request for each word, get all data from the etymology table for the given language and sift through the array after
        function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  


  const placeholders = wordIdArr.map(() => "?").join(",");

  const getEtymologiesStmt = db.prepare(`
    SELECT *
    FROM etymology
    WHERE word_id IN (${placeholders})
    `) .all(...wordIdArr);

    const etymologyRows = getEtymologiesStmt.map(parseEtymology)
  
  
        const getWord = async (id, type) => {

          const dataStmt = db.prepare(`
            SELECT *
            FROM dictionary
            WHERE word_id = ?
            `).all(id);

            const data = dataStmt.map(parseDictionary)

         
  
          if (type === "word" && data[0]) {
            return data[0].word;
          }
  
          if (type === "meaning" && data[0]) {
            let concatMeaning = [].concat(
              data[0].noun_meaning ?? [],
              data[0].num_meaning ?? [],
              data[0].verb_meaning ?? [],
              data[0].adj_meaning ?? [],
              data[0].adv_meaning ?? [],
              data[0].pron_meaning ?? [],
              data[0].part_meaning ?? [],
              data[0].interj_meaning ?? [],
              data[0].conj_meaning ?? [],
              data[0].affix_meaning ?? []
            );
            return concatMeaning.join(", ");
          }
  
          if (type === "language" && data[0]) {
            return getLanguage(data[0].language_id, "name");
          }
  
          if (type === "proto" && data[0]) {
            return getLanguage(data[0].language_id, "proto");
          }
  
          if (type === "type" && data[0]) {
            return data[0].word_type;
          }
        };
  
        const getLanguage = async (languageId, type) => {

          const dataStmt = db.prepare(`
            SELECT *
            FROM languages
            WHERE language_id = ?
            `).all(Number(languageId));

            const data = dataStmt.map(parseLanguage)

  
          if (type === "name") {
            return data[0].language_name;
          }
  
          if (type === "proto") {
            return data[0].is_proto;
          }
        };
  
        const recursiveEtymology = async (wordId, seen = new Set()) => {
          if (!wordId || seen.has(wordId)) {
            console.warn("Skipping already seen or invalid wordId:", wordId);
            return [];
          }
  
          seen.add(wordId);

          const etymRowsStmt = db.prepare(`
            SELECT *
            FROM etymology
            WHERE word_id = ?
            `).all(wordId);

            const etymRows = etymRowsStmt.map(parseEtymology);
  
          const etym =
            etymRows.find((e) => e.etymology_type === "fromMother") ||
            etymRows.find((e) => e.etymology_type === "derived") ||
            etymRows.find((e) => e.etymology_type === "loaned");
  
          if (!etym) {
           // console.warn("No etymology found for word_id:", wordId);
            return [];
          }
  
          const formatVerbMeanings = (meanings) => {
            const result = [];
            for (let i = 0; i < meanings.length; i++) {
              const current = meanings[i];
              const next = meanings[i + 1];
              if (current.startsWith("(") && next) {
                result.push(`${current} to ${next}`);
                i++;
              } else if (!current.startsWith("(")) {
                result.push(`to ${current}`);
              }
            }
            return result.join(", ");
          };
  
          const fetchDictionaryAndLanguage = async (id) => {

            const dictStmt = db.prepare(`
              SELECT *
              FROM dictionary
              WHERE word_id = ?
              `).all(id);

              const dict = dictStmt.map(parseDictionary);
  
            if (!dict) return null;

            const langStmt = db.prepare(`
              SELECT language_name, is_proto
              FROM languages
              WHERE language_id = ?
              `).all(dict[0].language_id)

              const lang = langStmt.map(parseLanguage)
  
            const verbMeanings = dict[0].verb_meaning
              ? formatVerbMeanings(dict[0].verb_meaning)
              : "";
            const nounMeanings = dict[0].noun_meaning?.join(", ") || "";
            const numMeanings = dict[0].num_meaning?.join(", ") || "";
            const adjMeanings = dict[0].adj_meaning?.join(", ") || "";
            const advMeanings = dict[0].adv_meaning?.join(", ") || "";
            const adpMeanings = dict[0].adp_meaning?.join(", ") || "";
            const conjMeanings = dict[0].conj_meaning?.join(", ") || "";
            const affixMeanings = dict[0].affix_meaning?.join(", ") || "";
            const interjMeanings = dict[0].interj_meaning?.join(", ") || "";
            const pronMeanings = dict[0].pron_meaning?.join(", ") || "";
            const partMeanings = dict[0].part_meaning?.join(", ") || "";
  
            const meaning =
              nounMeanings +
              numMeanings +
              verbMeanings +
              adjMeanings +
              advMeanings +
              adpMeanings +
              pronMeanings +
              partMeanings +
              affixMeanings +
              conjMeanings +
              interjMeanings;
  
            return {
              word: dict[0].word,
              word_type: dict[0].word_type,
              is_proto: lang[0]?.is_proto,
              meaning,
              language_name: lang[0]?.language_name || "[Unknown language]",
              etymology_type: etym.etymology_type,
            };
          };
  
          // === Handle derived: stop after returning 1 or 2 elements ===
          if (etym.etymology_type === "derived") {
            const elements = [];
            for (const elementId of [
              etym.first_element_id,
              etym.second_element_id,
              etym.third_element_id,
            ]) {
              if (!elementId) continue;
              const info = await fetchDictionaryAndLanguage(elementId);
              if (info) elements.push(info);
            }
            return elements;
          }
  
          // === Handle fromMother and loaned: continue recursion ===
          const ancestorId =
            etym.etymology_type === "loaned"
              ? etym.loanword_id
              : etym.mother_word_id;
  
          if (!ancestorId) {
            console.warn("Missing ancestor ID for recursive etymology.");
            return [];
          }
  
          const current = await fetchDictionaryAndLanguage(ancestorId);
          if (!current) return [];
  
          const rest = await recursiveEtymology(ancestorId, seen);
          return [current, ...rest];
        };
  
        // Create a lookup map from word_id → etymology row
        const etymMap = new Map();
  
        etymologyRows.forEach((etym) => {
          if (!etymMap.has(etym.word_id)) {
            etymMap.set(etym.word_id, []);
          }
          etymMap.get(etym.word_id).push(etym);
        });
  
        for (const word of allData) {
          const etymologies = etymMap.get(word.word_id);
  
          if (etymologies && etymologies.length > 0) {
            word.has_etymology = true;
  
            word.etymology = await Promise.all(
              etymologies.map(async (etym) => {
                const etymObj = {
                  etymology_type: etym.etymology_type,
                  loanword_id: etym.loanword_id,
                  etymology_note: etym.note,
                  uncertain: etym.uncertain,
                };
  
                if (etym.mother_word_id) {
                  etymObj.mother_word = await getWord(
                    etym.mother_word_id,
                    "word"
                  );
                  etymObj.mother_word_meaning = await getWord(
                    etym.mother_word_id,
                    "meaning"
                  );
                  etymObj.mother_word_language = await getWord(
                    etym.mother_word_id,
                    "language"
                  );
                  etymObj.mother_language_is_proto = await getWord(
                    etym.mother_word_id,
                    "proto"
                  );
                  etymObj.mother_language_word_type = await getWord(
                    etym.mother_word_id,
                    "type"
                  );
                  etymObj.mother_word_id = etym.mother_word_id;
                }
  
                if (etym.first_element_id) {
                  etymObj.first_element = await getWord(
                    etym.first_element_id,
                    "word"
                  );
                  etymObj.first_element_meaning = await getWord(
                    etym.first_element_id,
                    "meaning"
                  );
                  etymObj.first_element_word_type = await getWord(
                    etym.first_element_id,
                    "type"
                  );
                }
  
                if (etym.second_element_id) {
                  etymObj.second_element = await getWord(
                    etym.second_element_id,
                    "word"
                  );
                  etymObj.second_element_meaning = await getWord(
                    etym.second_element_id,
                    "meaning"
                  );
                  etymObj.second_element_word_type = await getWord(
                    etym.second_element_id,
                    "type"
                  );
                }
  
                if (etym.third_element_id) {
                  etymObj.third_element = await getWord(
                    etym.third_element_id,
                    "word"
                  );
                  etymObj.third_element_meaning = await getWord(
                    etym.third_element_id,
                    "meaning"
                  );
                  etymObj.third_element_word_type = await getWord(
                    etym.third_element_id,
                    "type"
                  );
                }
  
                if (etym.loanword_id) {
                  etymObj.loan = await getWord(etym.loanword_id, "word");
                  etymObj.loan_meaning = await getWord(
                    etym.loanword_id,
                    "meaning"
                  );
                  etymObj.loan_word_type = await getWord(
                    etym.loanword_id,
                    "type"
                  );
                  etymObj.loan_language = await getWord(
                    etym.loanword_id,
                    "language"
                  );
                  etymObj.loan_language_is_proto = await getWord(
                    etym.loanword_id,
                    "proto"
                  );
                }
  
                return etymObj;
              })
            );
  
          
  
            if (
              word.etymology?.[0]?.mother_word_id ||
              word.etymology?.[0]?.loanword_id
            ) {
              word.etymology_chain = await recursiveEtymology(word.word_id);
            }

  
            // Get the ancestor etymology row (first 'fromMother' one)
            const ancestor = etymologies.find(
              (e) => e.etymology_type === "fromMother"
            );
  
            if (ancestor?.mother_word_id) {
              // Step 1: Get all etymology rows that reference this mother_word_id
              const cognateEtymsStmt = db.prepare(`
                SELECT *
                FROM etymology
                WHERE mother_word_id = ? OR loanword_id = ? AND word_id != ?
                `).all(ancestor.mother_word_id, ancestor.mother_word_id, word.word_id)

                const cognateEtyms = cognateEtymsStmt.map(parseEtymology)

  
              if (!cognateEtyms.length > 0) {
                console.error("Error fetching cognates");
                word.cognates = [];
              } else {
                // Step 2: Fetch the full dictionary data for each cognate word_id
                const cognateWords = await Promise.all(
                  cognateEtyms.map(async (etym) => {

                    const wordRowStmt = db.prepare(`
                      SELECT *
                      FROM dictionary
                      WHERE word_id = ?
                      `).all(etym.word_id);

                      const wordRow = wordRowStmt.map(parseDictionary);


                    if (!wordRow) return null;
  
                    // Get language name

                    const langRowStmt = db.prepare(`
                      SELECT language_name
                      FROM languages
                      WHERE language_id = ?
                      `).all(wordRow[0].language_id);

                      const langRow = langRowStmt.map(parseLanguage)

                    const languageName = langRow.length === 0 ? null : langRow[0].language_name;
  
                    // Gather all meanings
                    const allMeanings = [
                      wordRow[0].noun_meaning,
                      wordRow[0].num_meaning,
                      wordRow[0].verb_meaning,
                      wordRow[0].adj_meaning,
                      wordRow[0].pron_meaning,
                      wordRow[0].adv_meaning,
                      wordRow[0].adp_meaning,
                      wordRow[0].interj_meaning,
                      wordRow[0].conj_meaning,
                      wordRow[0].part_meaning,
                    ]
                      .filter((arr) => Array.isArray(arr))
                      .flat();
  
                    return {
                      word_id: wordRow[0].word_id,
                      word: wordRow[0].word,
                      word_type: wordRow[0].word_type,
                      is_proto: wordRow[0].is_proto,
                      language_name: languageName,
                      meaning: allMeanings,
                    };
                  })
                );
  
                word.cognates = cognateWords.filter(Boolean); // remove any nulls from failed lookups
              }
            } else {
              word.cognates = [];
            }
          } else {
            word.has_etymology = false;
            word.etymology = [];
          }

          const descendantEtymsStmt = db.prepare(`
            SELECT *
            FROM etymology
            WHERE mother_word_id = ? OR loanword_id = ?
            `).all(word.word_id, word.word_id);

            const descendantEtyms = descendantEtymsStmt.map(parseEtymology);
  
          if (!descendantEtyms) {
            console.error(
              `Error fetching descendants for word_id ${word.word_id}`
            );
            word.descendants = [];
            continue;
          }
  
          const descendants = await Promise.all(
            descendantEtyms.map(async (etym) => {


              const entryDataStmt = db.prepare(`
                SELECT *
                FROM dictionary
                WHERE word_id = ?
                `).all(etym.word_id);

                const entryData = entryDataStmt.map(parseDictionary);
  
              if (!entryData) return null;
  
              const meanings = [
                ...(entryData[0].noun_meaning || []),
                ...(entryData[0].num_meaning || []),
                ...(entryData[0].verb_meaning || []),
                ...(entryData[0].adj_meaning || []),
                ...(entryData[0].adv_meaning || []),
                ...(entryData[0].adp_meaning || []),
                ...(entryData[0].pron_meaning || []),
                ...(entryData[0].interj_meaning || []),
                ...(entryData[0].conj_meaning || []),
                ...(entryData[0].part_meaning || []),
                ...(entryData[0].affix_meaning || []),
              ];

              const langDataStmt = db.prepare(`
                SELECT language_name, is_proto
                FROM languages
                WHERE language_id = ?
                `).all(entryData[0].language_id);

                const langData = langDataStmt.map(parseLanguage)
  
              return {
                descendant_word_id: etym.word_id,
                etymology_type: etym.etymology_type,
                word: entryData[0].word,
                word_type: entryData[0].word_type,
                meaning: meanings.join(", "),
                language_name: langData[0]?.language_name || null,
                is_proto: langData[0]?.is_proto ?? null,
              };
            })
          );
  
          word.descendants = descendants.filter(Boolean); // remove nulls
          
          const derivationEtymsStmt = db.prepare(`
            SELECT *
            FROM etymology
            WHERE (first_element_id = ? OR second_element_id = ? OR third_element_id = ?) AND etymology_type = ?
            `).all(word.word_id, word.word_id, word.word_id, "derived");

            const derivationEtyms = derivationEtymsStmt.map(parseEtymology);

          if (!derivationEtyms) {
            console.error(
              `Error fetching derivations for word_id ${word.word_id}`
            );
            word.derivations = [];
          } else {
            const derivations = await Promise.all(
              derivationEtyms.map(async (etym) => {

                const entryDataStmt = db.prepare(`
                  SELECT *
                  FROM dictionary
                  WHERE word_id = ?
                  `).all(etym.word_id);

                  const entryData = entryDataStmt.map(parseDictionary);

                const allMeanings = [
                  ...(entryData[0].noun_meaning || []),
                  ...(entryData[0].num_meaning || []),
                  ...(entryData[0].verb_meaning || []),
                  ...(entryData[0].adj_meaning || []),
                  ...(entryData[0].adv_meaning || []),
                  ...(entryData[0].adp_meaning || []),
                  ...(entryData[0].pron_meaning || []),
                  ...(entryData[0].interj_meaning || []),
                  ...(entryData[0].conj_meaning || []),
                  ...(entryData[0].part_meaning || []),
                  ...(entryData[0].affix_meaning || []),
                ];

                const langDataStmt = db.prepare(`
                  SELECT *
                  FROM languages
                  WHERE language_id = ?
                  `).all(entryData[0].language_id);

                  const langData = langDataStmt.map(parseLanguage);

  
                return {
                  word_id: entryData[0].word_id,
                  word: entryData[0].word,
                  word_type: entryData[0].word_type,
                  meaning: allMeanings.join(", "),
                  language_name: langData[0]?.language_name || null,
                  is_proto: langData[0]?.is_proto ?? null,
                  etymology_type: etym.etymology_type,
                  is_first_element: etym.first_element_id === word.word_id,
                  is_second_element: etym.second_element_id === word.word_id,
                  is_third_element: etym.third_element_id === word.word_id,
                };
              })
            );
  
            word.derivations = derivations.filter(Boolean);
          }
        }
  
      
        allData.sort((a, b) => a.word.localeCompare(b.word));
        return allData
      } catch (error) {
        console.error("Error getting all words:", error);
      }
    
  
  
}