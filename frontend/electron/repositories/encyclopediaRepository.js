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

        const getEntries = getEntriesStmt.all(fetchEncyclopedia[0].encyclopedia_id).map(parseEncyclopedias);


    return {
        encyclopedia_name: fetchEncyclopedia[0].encyclopedia_name,
        topics: fetchEncyclopedia[0].topics,
        entries: getEntries
    }


  } catch (error) {
    console.error(`error getting encyclopedia: ${error}`)
  }
}
