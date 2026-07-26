import db from "../database.js";
import { parseDictionary } from "./parse/parseDictionary.js";
import { parseLanguage } from "./parse/parseLanguages.js";
import { parseEtymology } from "./parse/parseEtymology.js";

export function getEtymologyTrees(id, rootIds) {
  // ---------- Load tables ----------

  const words = db
    .prepare(
      `
        SELECT *
        FROM dictionary
    `,
    )
    .all()
    .map(parseDictionary);

  const etymologies = db
    .prepare(
      `
        SELECT *
        FROM etymology
    `,
    )
    .all();

  const languages = db
    .prepare(
      `
        SELECT *
        FROM languages
    `,
    )
    .all()
    .map(parseLanguage);

  // ---------- Lookup maps ----------

  const wordsById = new Map();

  for (const word of words) {
    wordsById.set(word.word_id, word);
  }

  const etymologyByWordId = new Map();

  for (const row of etymologies) {
    etymologyByWordId.set(row.word_id, row);
  }

  // ---------- Parent -> descendants ----------

  const children = new Map();

  function addChild(parentId, row) {
    if (!parentId) return;

    if (!children.has(parentId)) children.set(parentId, []);

    children.get(parentId).push(row);
  }

  for (const row of etymologies) {
    addChild(row.mother_word_id, row);
    addChild(row.loanword_id, row);
    addChild(row.first_element_id, row);
    addChild(row.second_element_id, row);
    addChild(row.third_element_id, row);
  }

  // ---------- Recursive tree ----------

  function buildTree(wordId, parentWordId = null) {
    const etymology = etymologyByWordId.get(wordId);

    const descendants = children.get(wordId) ?? [];

    const components = [];

    if (
      etymology?.first_element_id &&
      etymology.first_element_id !== parentWordId
    ) {
      components.push({
        position: 1,
        id: etymology.first_element_id,
        word: wordsById.get(etymology.first_element_id),
      });
    }

    if (
      etymology?.second_element_id &&
      etymology.second_element_id !== parentWordId
    ) {
      components.push({
        position: 2,
        id: etymology.second_element_id,
        word: wordsById.get(etymology.second_element_id),
      });
    }

    if (
      etymology?.third_element_id &&
      etymology.third_element_id !== parentWordId
    ) {
      components.push({
        position: 3,
        id: etymology.third_element_id,
        word: wordsById.get(etymology.third_element_id),
      });
    }

    return {
      word: wordsById.get(wordId),

      etymology,

      components,

      motherWord: etymology?.mother_word_id
        ? wordsById.get(etymology.mother_word_id)
        : null,

      loanWord: etymology?.loanword_id
        ? wordsById.get(etymology.loanword_id)
        : null,

      descendants: descendants.map((child) => buildTree(child.word_id, wordId)),
    };
  }

  return {
    trees: rootIds.map((rootId) => buildTree(rootId)),

    languages,
  };
}

export async function getEtymology(id) {
  // Step 1: Get all etymology rows for this word

  try {
    const etymologyRowsStmt = db.prepare(`
            SELECT *
            FROM etymology
            WHERE word_id = ?
            `);

    const etymologyRows = etymologyRowsStmt.all(id).map(parseEtymology);

    // Step 2: For each mother_word_id, get the dictionary entry
    const results = [];

    for (const etym of etymologyRows) {
      // -- Helper to fetch and format dictionary data --
      const fetchWordData = async (wordId) => {
        if (!wordId) return { word: null, meaning: null, word_id: null };

        const dataStmt = db.prepare(`
                SELECT 
                     word,
      word_type,
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
      WHERE word_id = ?
                `);

        const data = dataStmt.all(wordId).map(parseDictionary);

        const entry = data[0];

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
          word: entry.word,
          meaning: meanings.join(", "),
          word_id: wordId,
          word_type: entry.word_type,
        };
      };

      // -- Fetch dictionary data for all linked words --
      const mother = await fetchWordData(etym.mother_word_id);
      const first = await fetchWordData(etym.first_element_id);
      const second = await fetchWordData(etym.second_element_id);
      const third = await fetchWordData(etym.third_element_id);
      const loan = await fetchWordData(etym.loanword_id);

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
    return results;
  } catch (error) {
    console.error(`error getting etymology: ${error}`);
  }
}

export function addEtymology(
  word_id,
  etymologyType,
  motherWord,
  firstElementId,
  secondElementId,
  thirdElementId,
  loanWordId,
  note,
) {
  if (etymologyType === "fromMother") {
    try {
      const addEtymStmt = db.prepare(`
          INSERT INTO etymology
        (etymology_id, word_id, note, mother_word_id,etymology_type)
          VALUES(?, ?, ?, ?, ?)
          `);

      const addEtym = addEtymStmt.run(
        Date.now(),
        word_id,
        note,
        motherWord.word_id,
        etymologyType
      );

      if (addEtym.changes === 0) return { "success": false };

      return { "success": true };

    } catch (error) {
      console.error(`error adding fromMother: ${error}`);
    }
  }

  if (etymologyType === "derived") {
    try {
      const addEtymStmt = db.prepare(`
          INSERT INTO etymology
        (etymology_id, word_id, note, first_element_id, second_element_id, third_element_id, etymology_type)
          VALUES(?, ?, ?, ?,?,?, ?)
          `);

      const addEtym = addEtymStmt.run(
        Date.now(),
        word_id,
        note,
        firstElementId,
        secondElementId,
        thirdElementId,
        etymologyType
      );

       if (addEtym.changes === 0) return { "success": false };

      return { "success": true };
    } catch (error) {
      console.error(`error adding derived: ${error}`);
    }
  }

  if (etymologyType === "loaned") {
    try {
      const addEtymStmt = db.prepare(`
          INSERT INTO etymology
        (etymology_id, word_id, note, loanword_id, etymology_type)
          VALUES(?, ?, ?, ?, ?)
          `);

      const addEtym = addEtymStmt.run(
        Date.now(),
        word_id,
        note,
        loanWordId,
        etymologyType
      );

       if (addEtym.changes === 0) return { "success": false };

      return { "success": true };
    } catch (error) {
      console.error(`error adding loan: ${error}`);
    }
  }

  if (etymologyType === "other") {
    try {
      const addEtymStmt = db.prepare(`
          INSERT INTO etymology
        (etymology_id, word_id, note, mother_word_id, etymology_type)
          VALUES(?, ?, ?, ?, ?)
          `);

      const addEtym = addEtymStmt.run(
        Date.now(),
        word_id,
        note,
        null,
        etymologyType
      );

       if (addEtym.changes === 0) return { "success": false };

      return { "success": true };
    } catch (error) {
      console.error(`error adding other: ${error}`);
    }
  }
}

export function deleteEtymology(id) {
  const delEtymStmt = db.prepare(`
    DELETE FROM etymology
    WHERE etymology_id = ?
    `);

    const delEtym = delEtymStmt.run(id);

    if (delEtym.changes === 0) return {"success": false};

    return {"success": true};
}

export function editEtymology(etymologyId,
        etymologyType,
        word_id,
        motherWord,
        firstElementId,
        secondElementId,
        thirdElementId,
        loanWordId,
        note) {

       

  if (etymologyType === "fromMother") {

          const editEtymStmt = db.prepare(`
            UPDATE etymology
            SET
              word_id = ?,
              note = ?,
              etymology_type = ?,
              mother_word_id = ?
            WHERE etymology_id = ?
            `);

            const editEtym = editEtymStmt.run(word_id, note, etymologyType, motherWord, etymologyId);

            if (editEtym.changes === 0) return {"success": false};

            return {"success": true};

      }

      if (etymologyType === "derived") {
      
        const editEtymStmt = db.prepare(`
            UPDATE etymology
            SET
              word_id = ?,
              note = ?,
              etymology_type = ?,
              first_element_id = ?
               second_element_id = ?
              third_element_id = ?
            WHERE etymology_id = ?
            `);

            const editEtym = editEtymStmt.run(word_id, note, etymologyType, firstElementId,
        secondElementId,
        thirdElementId, etymologyId);

            if (editEtym.changes === 0) return {"success": false};

            return {"success": true};
      }

      if (etymologyType === "loaned") {
        const editEtymStmt = db.prepare(`
            UPDATE etymology
            SET
              word_id = ?,
              note = ?,
              etymology_type = ?,
              loanword_id = ?
            WHERE etymology_id = ?
            `);

            const editEtym = editEtymStmt.run(word_id, note, etymologyType, loanWordId, etymologyId);

            if (editEtym.changes === 0) return {"success": false};

            return {"success": true};
        }

      if (etymologyType === "other") {
        const editEtymStmt = db.prepare(`
            UPDATE etymology
            SET
              word_id = ?,
              note = ?,
              etymology_type = ?,
              mother_word_id = ?
            WHERE etymology_id = ?
            `);

            const editEtym = editEtymStmt.run(word_id, note, etymologyType, null, etymologyId);

            if (editEtym.changes === 0) return {"success": false};

            return {"success": true};
}
      }
