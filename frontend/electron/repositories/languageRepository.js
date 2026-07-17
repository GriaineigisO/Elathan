import db from "../database.js";
import { parseLanguage } from "./parse/parseLanguages.js";
import { parseGroup } from "./parse/parseGroup.js";

export function getLanguage(id) {
  const getLanguageStmt = db.prepare(`
        SELECT *
        FROM languages
        WHERE language_id = ?
    `);

  const fetchLanguage = getLanguageStmt.all(id).map(parseLanguage);

  // Clean the language object safely
  const languageToSearch = JSON.parse(
    JSON.stringify({
      is_proto: fetchLanguage[0].is_proto,
      word_forms: fetchLanguage[0].word_forms ?? null,
      language_id: fetchLanguage[0].language_id,
      language_name: fetchLanguage[0].language_name,
      mother_language_id: fetchLanguage[0].mother_language_id,
    }),
  );

  const getGroupsStmt = db
    .prepare(
      `
    SELECT *
    FROM groups
`,
    )
    .all();

  const getGroups = getGroupsStmt.map(parseGroup);

  const matchingGroups = getGroups.filter((group) =>
    group.languages.some(
      (lang) => lang.language_id === languageToSearch.language_id,
    ),
  );

  if (matchingGroups?.length) {
    fetchLanguage[0].groups = matchingGroups;
  } else {
    fetchLanguage[0].groups = [];
  }

  return fetchLanguage.map(parseLanguage);
}

export function getLanguages() {
  const getLanguageStmt = db.prepare(`
        SELECT *
        FROM languages
        ORDER BY language_name COLLATE NOCASE
    `);

  const fetchLanguage = getLanguageStmt.all().map(parseLanguage);

  return fetchLanguage;
}

export function getGroups() {
  const getGroupstmt = db.prepare(`
        SELECT *
        FROM groups
        ORDER BY group_name COLLATE NOCASE
    `);

  const fetchGroups = getGroupstmt.all().map(parseGroup);

  return fetchGroups;
}

export function getTags(languageId) {
  const getLanguageStmt = db.prepare(`
          SELECT tags
          FROM languages
          WHERE language_id = ?
          `);

  const getLanguage = getLanguageStmt.all(languageId).map(parseLanguage);

  const getGroupWordTagStmt = db
    .prepare(
      `
          SELECT 
            tags
          FROM groups
          `,
    )
    .all();

    const getGroupWordTag = getGroupWordTagStmt.all().map(parseGroup);



let filteredArr = getGroupWordTag ? getGroupWordTag.filter((tag) => tag.tags && tag.tags.length > 0) : [];
  //if tags come ftom both the language and group
  if (getLanguage.length > 0 && filteredArr.length > 0) {
    const allWordForms = getLanguage.concat(filteredArr);

    return allWordForms;

  } else if (getLanguage.length === 0 && filteredArr.length > 0) {
    return filteredArr;
  } else if (getLanguage.length > 0 && filteredArr.length === 0) {
    return getLanguage;
  } else {
    return [];
  }
}
