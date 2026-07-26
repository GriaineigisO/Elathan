import db from "../database.js";
import { parseEncyclopedias } from "./parse/parseEncyclopedias.js";

export function getEncyclopedias() {
  try {
    const encyclopediasStmt = db.prepare(`
        SELECT *
        FROM encyclopedias
        `);

    const encyclopedias = encyclopediasStmt.all().map(parseEncyclopedias);

    return encyclopedias;
  } catch (error) {
    console.error(`error getting ecyclopedias: ${error}`);
  }
}

export function getEncyclopedia(id) {
  try {
    const getEncyclopediaStmt = db.prepare(`
        SELECT *
        FROM encyclopedias
        WHERE encyclopedia_id = ?
        `);

    const fetchEncyclopedia = getEncyclopediaStmt
      .all(id)
      .map(parseEncyclopedias);

    const getEntriesStmt = db.prepare(`
        SELECT *
        FROM encyclopedia_entries
        WHERE encyclopedia_id = ?
        ORDER BY headword COLLATE NOCASE
        `);

    const getEntries = getEntriesStmt
      .all(fetchEncyclopedia[0].encyclopedia_id)
      .map(parseEncyclopedias);

    return {
      encyclopedia_name: fetchEncyclopedia[0].encyclopedia_name,
      topics: fetchEncyclopedia[0].topics,
      entries: getEntries,
    };
  } catch (error) {
    console.error(`error getting encyclopedia: ${error}`);
  }
}

export function addEncyclopedia(id, encyclopediaName, topics) {
  const addEncStmt = db.prepare(`
          INSERT INTO encyclopedias
        (encyclopedia_id, encyclopedia_name, topics)
          VALUES(?, ?, ?)
          `);

  const tops = topics.length > 0 ? JSON.stringify(topics) : null;

  const addEnc = addEncStmt.run(id, encyclopediaName, tops);

  if (addEnc.changes === 0) return { success: false };

  return { success: true };
}

export function deleteEncyclopedia(id) {
  //first, delete all the entries
  const deleteEntriesStmt = db
    .prepare(
      `
    DELETE FROM encyclopedia_entries
    WHERE encyclopedia_id = ?
    `,
    )
    .run(id);

  const deleteEncStmt = db
    .prepare(
      `
    DELETE FROM encyclopedias
    WHERE encyclopedia_id = ?
    `,
    )
    .run(id);

  if (deleteEncStmt.changes === 0) return { success: false };

  return { success: true };
}

export function editEncyclopedia(id, encyclopediaName, topics) {
  const tops = topics.length > 0 ? JSON.stringify(topics) : null;

  const editEncStmt = db.prepare(`
    UPDATE encyclopedias
    SET encyclopedia_name = ?,
      topics = ?
    WHERE encyclopedia_id = ?
    `);

  const editEnc = editEncStmt.run(encyclopediaName, tops, id);

  if (editEnc.changes === 0) return { success: false };

  return { success: true };
}

export function addEntry(encyclopediaId, headword, entryText, entryTopic) {
  const addEntryStmt = db.prepare(`
    INSERT INTO encyclopedia_entries
  (entry_id, headword, entry_text, topic, encyclopedia_id)
    VALUES(?, ?,?,?,?)
    `);

  const addEntry = addEntryStmt.run(
    Date.now(),
    headword,
    entryText,
    entryTopic,
    encyclopediaId
  );

  if (addEntry.changes === 0) return {"success": false}

  return {"success": true}
}

export function editEntry(headword, entryText, entryTopic, id) {
  const edEntryStmt = db.prepare(`
    UPDATE encyclopedia_entries
    SET
      headword = ?,
      entry_text = ?,
      topic = ?
    WHERE entry_id = ?
    `);

    const edEntry = edEntryStmt.run(headword, entryText, entryTopic, id);

    if (edEntry.changes === 0) return {"success": false};

    return {"success": true};
}

export function getEntry(id) {
  const gtEntryStmt = db.prepare(`
    SELECT *
    FROM encyclopedia_entries
    WHERE entry_id = ?
    `);

    const gtEntry = gtEntryStmt.all(id).map(parseEncyclopedias);

    return gtEntry[0];
}

export function deleteEntry(id) {
  const delEntryStmt = db.prepare(`
    DELETE FROM encyclopedia_entries
    WHERE entry_id = ?
    `)

    const delEntry = delEntryStmt.run(id)

    if (delEntry.changes === 0) return {"success": false}

    return {"success": true}
}