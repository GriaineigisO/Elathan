import db from "../database.js";
import { parseLanguage } from "./parse/parseLanguages.js";
import { parseGroup } from "./parse/parseGroup.js";
import { parseDictionary } from "./parse/parseDictionary.js";
import { parseInterfaceLanguages } from "./parse/parseInterfaceLanguages.js";

export function addLanguage(
  id,
  languageName,
  motherLanguageId,
  daughterLanguageIds,
  isProto,
  wordForms,
  addedGroups,
) {
  const protoInt = isProto === "true" ? 1 : 0;

  try {
    const addLangStmt = db.prepare(`
    INSERT INTO languages
    (language_id, language_name, mother_language_id, is_proto, word_forms)
    VALUEs(?, ?, ?, ?, ?)
    `);

    const addLang = addLangStmt.run(
      id,
      languageName,
      motherLanguageId,
      protoInt,
      wordForms,
    );

    if (addLang.changes === 0) return;

    if (daughterLanguageIds) {
      for (const daughter of JSON.parse(daughterLanguageIds)) {
        try {
          const editDaughtersStmt = db.prepare(`
              UPDATE languages
              SET mother_language_id = ?
              WHERE language_id = ?
              `);

          const editDaughters = editDaughtersStmt.run(
            id,
            JSON.stringify(daughter),
          );
        } catch (error) {
          console.error(
            `error adding mother_language_id to daughter: ${error}`,
          );
          return { success: false };
        }
      }
    }

    if (addedGroups) {
      for (const group of JSON.parse(addedGroups)) {
        try {
          const addLanguageToGroupStmt = db.prepare(`
                UPDATE groups
                SET languages = ?
                WHERE group_id = ?
                `);

          const groupLangs =
            group.languages?.length > 0 ? group.languages : null;

          const addLanguageToGroup = addLanguageToGroupStmt.run(
            JSON.stringify(groupLangs),
            group.group_id,
          );
        } catch (error) {
          console.error(`error adding language to group: ${error}`);
          return { success: false };
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error(`errer adding language: ${error}`);
  }
}

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

export function deleteLanguage(id) {
  const delStmt = db.prepare(`
      DELETE FROM languages
      WHERE language_id = ?
      `);

  const del = delStmt.run(id);

  if (del.changes === 0) return { success: false };

  // 1) Get all word_ids from the dictionary for that language
  const getWordsStmt = db.prepare(`
          SELECT word_id
          FROM dictionary
          WHERE language_id = ?
          `);

  const getWords = getWordsStmt.all(id).map(parseDictionary);

  if (getWords.length > 0) {
    // 2) Extract plain array of IDs
    const wordIds = getWords.map((row) => row.word_id);

    if (wordIds.length > 0) {
      // 3) Delete all matching etymology rows
      const delEtymStmt = db.prepare(`
              DELETE FROM etymology
              WHERE word_id IN ?
            `);
    }
  }

  //delete all words from language
  const delWordsStmt = db.prepare(`
          DELETE FROM dictionary
          WHERE language_id = ?
          `);

  const delWords = delWordsStmt.run(id);

  return { success: true };
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

export function editLanguage(
  id,
  languageName,
  motherLanguageId,
  daughterLanguageIds,
  removedDaughterLanguageIds,
  isProto,
  wordForms,
  addedGroups,
  groupsToBeRemoved,
  newGroups,
  addedTagGroups,
  spelling,
  selectedSoundChanges,
  allCategoryValues,
) {
  const isproto = isProto === "true" ? 1 : 0;

  const editLangStmt = db.prepare(`
          UPDATE languages
          SET 
            language_name = ?,
            mother_language_id = ?,
            is_proto = ?,
            spelling = ?,
            sound_changes = ?,
            word_forms = ?,
            tags = ?
            WHERE language_id = ?
          `);

  const editLang = editLangStmt.run(
    languageName,
    motherLanguageId,
    isProto,
    spelling,
    selectedSoundChanges,
    wordForms,
    addedTagGroups,
    id,
  );

  if (editLang.changes > 0) {
    if (daughterLanguageIds) {
      for (const daughter of JSON.parse(daughterLanguageIds)) {
        const editDaughtersStmt = db.prepare(`
              UPDATE languages
              SET mother_language_id = ?
              WHERE language_id = ?
              `);

        const editDaughter = editDaughtersStmt.run(id, daughter);
      }
    }

    if (removedDaughterLanguageIds) {
      for (const daughter of JSON.parse(removedDaughterLanguageIds)) {
        const editDaughtersStmt = db.prepare(`
          UPDATE languages
          SET mother_language_id = ?
          WHERE language_id = ?
          `);

        const editDaughter = editDaughtersStmt.run(null, daughter);
      }
    }

    if (newGroups) {
      for (const group of JSON.parse(newGroups)) {
        // Remove groups key from each language
        const cleanedLanguages = (group.languages || []).map(
          ({ groups, ...rest }) => rest,
        );

        // Remove groups key from the group itself
        const { groups, ...cleanedGroup } = group;
        cleanedGroup.languages = cleanedLanguages;

        const cleanedL = cleanedLanguages.length > 0 ? cleanedLanguages : null;

        const addLanguageToGroupStmt = db.prepare(`
              UPDATE groups
              SET
              languages = ?
              WHERE group_id = ?
              `);

        const addLanguageToGroup = addLanguageToGroupStmt.run(cleanedL, id);
      }
    }

    if (groupsToBeRemoved) {
      for (const group of JSON.parse(groupsToBeRemoved)) {
        const languages = group.languages;

        const filter = languages.filter(
          (language) => language.language_id !== id,
        );

        const deleteLanguageFromGroupStmt = db.prepare(`
              UPDATE groups
              SET
                languages = ?
              WHERE group_id = ?
              `);

        const deleteLanguageFromGroup = deleteLanguageFromGroupStmt.run(
          filter,
          group.group_id,
        );
      }
    }

    return { success: true };
  }
}

export function addGroup(groupName, wordForms, addedLanguages) {
  try {
    const addGroupStmt = db.prepare(`
          INSERT INTO groups
          (group_id, group_name, word_forms, languages)
          VALUES(?, ?, ?, ?)
          `);

    const addGroup = addGroupStmt.run(
      Date.now(),
      groupName,
      wordForms,
      addedLanguages,
    );

    if (addGroup.changes === 0) return { success: false };

    return { success: true };
  } catch (error) {
    console.error(`error adding group: ${error}`);
  }
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

export function getGroup(id) {
  const getGroupstmt = db.prepare(`
        SELECT *
        FROM groups
        WHERE group_id = ?
    `);

  const fetchGroup = getGroupstmt.all(id).map(parseGroup);

  return fetchGroup;
}

export function editGroup(
  groupName,
  wordForms,
  wordCategories,
  addedLanguages,
  id,
) {
  const added = addedLanguages ? addedLanguages : null;

  const editGroupStmt = db.prepare(`
  UPDATE groups
  SET 
    group_name = ?,
    word_forms = ?,
    word_categories = ?,
    languages = ?
  WHERE group_id = ?
`);

  const editGroup = editGroupStmt.run(
    groupName,
    wordForms,
    wordCategories,
    added,
    id,
  );

  if (editGroup.changes > 0) {
    return { success: true };
  }
}

export function deleteGroup(id) {
  const deleteGroupStmt = db.prepare(`
    DELETE FROM groups
    WHERE group_id = ?
    `);

  const deleteGroup = deleteGroupStmt.run(id);

  if (deleteGroup.changes > 0) {
    return { success: true };
  }
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
         SELECT tags
FROM groups
WHERE EXISTS (
    SELECT 1
    FROM json_each(groups.languages)
    WHERE json_extract(json_each.value, '$.language_id') = ?
);
          `,
    )
    .all(languageId);

  const getGroupWordTag = getGroupWordTagStmt.map(parseGroup);

  let filteredArr = getGroupWordTag
    ? getGroupWordTag.filter((tag) => tag.tags && tag.tags.length > 0)
    : [];
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

export function getWordCategories(languageId) {
  try {
    const getCategoriesStmt = db.prepare(`
            SELECT word_categories
            FROM languages
            WHERE language_id = ?
            `);

    const getCategories = getCategoriesStmt.all(languageId).map(parseLanguage);

    const getCatsFromGroupStmt = db.prepare(`
  SELECT g.word_categories
  FROM groups AS g
  JOIN json_each(g.languages)
  WHERE json_extract(json_each.value, '$.language_id') = ?
`);

    const getCatsFromGroup = getCatsFromGroupStmt
      .all(languageId)
      .map(parseGroup);

    const filteredArr = getCatsFromGroup.filter(
      (cat) => cat.word_categories.length > 0,
    );

    //if wordForms come form both the language and group
    if (getCategories[0].word_categories && filteredArr.length > 0) {
      const allWordCategories = getCategories.concat(filteredArr);
      if (allWordCategories.length > 0) {
        return allWordCategories;
      } else {
        return [];
      }
    } else if (!getCategories[0].word_categories && filteredArr[0]) {
      return filteredArr;
    } else if (getCategories[0].word_categories && filteredArr.length === 0) {
      return getCategories;
    } else {
      return [];
    }
  } catch (error) {
    console.error(`error getting categories: ${error}`);
  }
}

export function getInterfaceLanguage() {
  try {
    const languagesStmt = db.prepare(`
          SELECT *
          FROM interfaceLanguages
          WHERE is_chosen = 1
          `);

    const languages = languagesStmt.all().map(parseInterfaceLanguages);

    return languages[0];
  } catch (error) {
    console.error(`error fetching interface languages: ${error}`);
  }
}

export function getDaughterLanguages(id) {
  try {
    const getDaughtersStmt = db.prepare(`
          SELECT *
          FROM languages
          WHERE mother_language_id = ?
          `);

    const getDaughter = getDaughtersStmt.all(id).map(parseLanguage);

    return getDaughter;
  } catch (error) {
    console.error(`error getting daughter languages: ${error}`);
  }
}

export function getMotherLanguage(id) {
  try {
    const getLanguageStmt = db.prepare(`
          SELECT *
          FROM languages
          WHERE language_id = ?
          `);

    const data = getLanguageStmt.all(id).map(parseLanguage);

    if (data.length > 0) {
      const motherId = data[0].mother_language_id;

      if (motherId) {
        const getMotherStmt = db.prepare(`
              SELECT * 
              FROM languages
              WHERE language_id = ?
              `);

        const getMother = getMotherStmt.all(motherId).map(parseLanguage);
        return getMother;
      } else {
        return {
          language_id: null,
          language_name: null,
          mother_language_id: null,
        };
      }
    } else {
      return {
        language_id: null,
        language_name: null,
        mother_language_id: null,
      };
    }
  } catch (error) {
    console.error(`error getting mother language: ${error}`);
  }
}

export function getWordForms(languageId) {
  try {
    const getLangWordFormStmt = db.prepare(`
          SELECT * 
          FROM languages
          WHERE language_id = ?
          `);

    const getLangWordForms = getLangWordFormStmt
      .all(languageId)
      .map(parseLanguage);

    const getGroupWordFormStmt = db.prepare(`
         SELECT word_forms
FROM groups
WHERE EXISTS (
  SELECT 1
  FROM json_each(groups.languages)
  WHERE json_extract(json_each.value, '$.language_id') = ?
);
          `);

    const groupWForms = getGroupWordFormStmt.all(languageId).map(parseGroup);

    const dataForms = getLangWordForms.flatMap((d) =>
      d && d.word_forms ? d.word_forms : [],
    );

    const groupWordForms = groupWForms.flatMap((d) =>
      d && d.word_forms ? d.word_forms : [],
    );

    if (dataForms.length > 0 && groupWordForms.length > 0) {
      const allWordForms = dataForms.concat(groupWordForms);

      return allWordForms;
    } else if (dataForms.length === 0 && groupWordForms.length > 0) {
      return groupWordForms;
    } else if (dataForms.length > 0 && groupWordForms.length === 0) {
      return dataForms;
    } else {
      return [];
    }
  } catch (error) {
    console.error(`error getting word forms: ${error}`);
  }
}

export function addWord(
  date,
  wordId,
  languageId,
  word,
  meanings,
  wordType,
  note,
  pronunciation,
  adjWordFormInputs,
  nounWordFormInputs,
  numWordFormInputs,
  verbWordFormInputs,
  advWordFormInputs,
  adpWordFormInputs,
  partWordFormInputs,
  conjWordFormInputs,
  interjWordFormInputs,
  affixWordFormInputs,
  cliticWordFormInputs,
  pronWordFormInputs,
  adjWordCategoryInputs,
  nounWordCategoryInputs,
  numWordCategoryInputs,
  verbWordCategoryInputs,
  advWordCategoryInputs,
  adpWordCategoryInputs,
  partWordCategoryInputs,
  conjWordCategoryInputs,
  interjWordCategoryInputs,
  affixWordCategoryInputs,
  cliticWordCategoryInputs,
  pronWordCategoryInputs,
  tagInputs,
  variants,
  thesaurusDomains,
) {
  const removeNulls = (arr) => {
    console.log(arr)
    console.log(typeof arr)
    if (!Array.isArray(arr)) return null;
    return JSON.stringify(arr.filter((obj) => obj !== null));
  };

  const thes = thesaurusDomains ? thesaurusDomains : {};

  const nounMeaning = Array.isArray(meanings.noun)
    ? JSON.stringify(meanings.noun)
    : null;
  const verbMeaning = Array.isArray(meanings.verb)
    ? JSON.stringify(meanings.verb)
    : null;
  const adjMeaning = Array.isArray(meanings.adj)
    ? JSON.stringify(meanings.adj)
    : null;
  const advMeaning = Array.isArray(meanings.adv)
    ? JSON.stringify(meanings.adv)
    : null;
  const adpMeaning = Array.isArray(meanings.adp)
    ? JSON.stringify(meanings.adp)
    : null;
  const partMeaning = Array.isArray(meanings.part)
    ? JSON.stringify(meanings.part)
    : null;
  const pronMeaning = Array.isArray(meanings.pron)
    ? JSON.stringify(meanings.pron)
    : null;
  const conjMeaning = Array.isArray(meanings.conj)
    ? JSON.stringify(meanings.conj)
    : null;
  const interjMeaning = Array.isArray(meanings.interj)
    ? JSON.stringify(meanings.interj)
    : null;
  const affixMeaning = Array.isArray(meanings.affix)
    ? JSON.stringify(meanings.affix)
    : null;
  const numMeaning = Array.isArray(meanings.num)
    ? JSON.stringify(meanings.num)
    : null;
  const cliticMeaning = Array.isArray(meanings.clitic)
    ? JSON.stringify(meanings.clitic)
    : null;

  const nounWordForms = removeNulls(nounWordFormInputs);
  const verbWordForms = removeNulls(verbWordFormInputs);
  const adjWordForms = removeNulls(adjWordFormInputs);
  const advWordForms = removeNulls(advWordFormInputs);
  const adpWordForms = removeNulls(adpWordFormInputs);
  const partWordForms = removeNulls(partWordFormInputs);
  const pronWordForms = removeNulls(pronWordFormInputs);
  const conjWordForms = removeNulls(conjWordFormInputs);
  const interjWordForms = removeNulls(interjWordFormInputs);
  const affixWordForms = removeNulls(affixWordFormInputs);
  const numWordForms = removeNulls(numWordFormInputs);
  const cliticWordForms = removeNulls(cliticWordFormInputs);

  try {
    const addWordStmt = db.prepare(`
          INSERT INTO dictionary
        (word_id, language_id, word, word_type, word_note, ipa, noun_meaning, verb_meaning, adj_meaning, adv_meaning, adp_meaning, part_meaning, pron_meaning, conj_meaning, interj_meaning, affix_meaning, num_meaning, clitic_meaning, noun_word_forms, verb_word_forms, adj_word_forms, adv_word_forms, adp_word_forms, part_word_forms, pron_word_forms, conj_word_forms, interj_word_forms, affix_word_forms, num_word_forms, clitic_word_forms,   noun_word_categories, verb_word_categories, adj_word_categories, adv_word_categories, adp_word_categories, part_word_categories, pron_word_categories, conj_word_categories, interj_word_categories, affix_word_categories, num_word_categories, clitic_word_categories, date_added, tags, thesaurus )
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?, ?, ?)
          `);

    const addWords = addWordStmt.run(
      wordId,
      languageId,
      word,
      wordType ?? null,
      note ?? null,
      pronunciation ?? null,
      nounMeaning ?? null,
      verbMeaning ?? null,
      adjMeaning ?? null,
      advMeaning ?? null,
      adpMeaning ?? null,
      partMeaning ?? null,
      pronMeaning ?? null,
      conjMeaning ?? null,
      interjMeaning ?? null,
      affixMeaning ?? null,
      numMeaning ?? null,
      cliticMeaning ?? null,
      nounWordForms ?? null,
      verbWordForms ?? null,
      adjWordForms ?? null,
      advWordForms ?? null,
      adpWordForms ?? null,
      partWordForms ?? null,
      pronWordForms ?? null,
      conjWordForms ?? null,
      interjWordForms ?? null,
      affixWordForms ?? null,
      numWordForms ?? null,
      cliticWordForms ?? null,
      removeNulls(nounWordCategoryInputs) ?? null,
      removeNulls(verbWordCategoryInputs) ?? null,
      removeNulls(adjWordCategoryInputs) ?? null,
      removeNulls(advWordCategoryInputs) ?? null,
      removeNulls(adpWordCategoryInputs) ?? null,
      removeNulls(partWordCategoryInputs) ?? null,
      removeNulls(pronWordCategoryInputs) ?? null,
      removeNulls(conjWordCategoryInputs) ?? null,
      removeNulls(interjWordCategoryInputs) ?? null,
      removeNulls(affixWordCategoryInputs) ?? null,
      removeNulls(numWordCategoryInputs) ?? null,
      removeNulls(cliticWordCategoryInputs) ?? null,
      JSON.stringify(date),
      JSON.stringify(tagInputs) ?? null,
      JSON.stringify(thes) ?? null,
    );

    if (addWords.changes === 0) return { success: false };

    return { success: true };
  } catch (error) {
    console.error(`error adding word: ${error}`);
    return { success: false };
  }

  try {
    //now, manage the variants
    if (variants) {
      let variantArr = variants.split(", ");

      for (let i = 0; i < variantArr.length; i++) {
        const varOf = {
          word: word,
          word_id: wordId,
        };

        const addVarStmt = db.prepare(`
          INSERT INTO dictionary
        (word_id, language_id, word, word_type, word_note, ipa, variant_of, noun_meaning, verb_meaning, adj_meaning, adv_meaning, adp_meaning, part_meaning, pron_meaning, conj_meaning, interj_meaning, affix_meaning, num_meaning, clitic_meaning, noun_word_forms, verb_word_forms, adj_word_forms, adv_word_forms, adp_word_forms, part_word_forms, pron_word_forms, conj_word_forms, interj_word_forms, affix_word_forms, num_word_forms, clitic_word_forms,   noun_word_categories, verb_word_categories, adj_word_categories, adv_word_categories, adp_word_categories, part_word_categories, pron_word_categories, conj_word_categories, interj_word_categories, affix_word_categories, num_word_categories, clitic_word_categories, date_added, tags, thesaurus )
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?, ?, ?)
          `);

        const addVar = addVarStmt.run(
          wordId,
          languageId,
          word,
          wordType,
          note,
          pronunciation,
          JSON.stringify(varOf),
          nounMeaning,
          verbMeaning,
          adjMeaning,
          advMeaning,
          adpMeaning,
          partMeaning,
          pronMeaning,
          conjMeaning,
          interjMeaning,
          affixMeaning,
          numMeaning,
          cliticMeaning,
          nounWordForms,
          verbWordForms,
          adjWordForms,
          advWordForms,
          adpWordForms,
          partWordForms,
          pronWordForms,
          conjWordForms,
          interjWordForms,
          affixWordForms,
          numWordForms,
          cliticWordForms,
          removeNulls(nounWordCategoryInputs),
          removeNulls(verbWordCategoryInputs),
          removeNulls(adjWordCategoryInputs),
          removeNulls(advWordCategoryInputs),
          removeNulls(adpWordCategoryInputs),
          removeNulls(partWordCategoryInputs),
          removeNulls(pronWordCategoryInputs),
          removeNulls(conjWordCategoryInputs),
          removeNulls(interjWordCategoryInputs),
          removeNulls(affixWordCategoryInputs),
          removeNulls(numWordCategoryInputs),
          removeNulls(cliticWordCategoryInputs),
          JSON.stringify(date),
          JSON.stringify(tagInputs),
          JSON.stringify(thes),
        );
      }
    }
  } catch (error) {
    console.error(`error adding variants: ${error}`);
    return { success: false };
  }

  return { success: true };
}

export function deleteWord(id) {
  try {
    try {
      const delWordStmt = db.prepare(`
        DELETE FROM dictionary
        WHERE word_id = ?
        `);

      const delWord = delWordStmt.run(id);
      if (delWord.changes === 0) return { success: false };
    } catch (error) {
      console.error(`error deleting word from dictionary: ${error}`);
    }

    try {
      //delete etymology for the word
      const delEtymStmt = db
        .prepare(
          `
          DELETE FROM etymology
          WHERE word_id = ?
          `,
        )
        .run(id);
    } catch (error) {
      console.error(`error deleting etymology: ${error}`);
    }

    try {
      //delete etymologies of words derived from this word
      const delDescendantEtymStmt = db
        .prepare(
          `
    DELETE FROM etymology
    WHERE mother_word_id = ?
      OR first_element_id = ?
      OR second_element_id = ?
      OR third_element_id = ?
      OR loanword_id = ?
    `,
        )
        .run(id);
    } catch (error) {
      console.error(`error deleting descendant etymologies: ${error}`);
    }

    return { success: true };
  } catch (error) {
    console.error(`errer deleting word: ${error}`);
  }
}

export function editWord(
  wordId,
  languageId,
  word,
  meanings,
  wordType,
  pronunciation,
  note,
  adjWordFormInputs,
  nounWordFormInputs,
  numWordFormInputs,
  verbWordFormInputs,
  advWordFormInputs,
  adpWordFormInputs,
  partWordFormInputs,
  conjWordFormInputs,
  interjWordFormInputs,
  affixWordFormInputs,
  cliticWordFormInputs,
  pronWordFormInputs,
  adjWordCategoryInputs,
  nounWordCategoryInputs,
  numWordCategoryInputs,
  verbWordCategoryInputs,
  advWordCategoryInputs,
  adpWordCategoryInputs,
  partWordCategoryInputs,
  conjWordCategoryInputs,
  interjWordCategoryInputs,
  affixWordCategoryInputs,
  cliticWordCategoryInputs,
  pronWordCategoryInputs,
  tagInputs,
  variants,
  thesaurusDomains,
) {
  const removeNulls = (arr) => {
     console.log(arr)
    console.log(typeof arr)
    if (!Array.isArray(arr)) return null;
    return JSON.stringify(arr.filter((obj) => obj !== null));
  };

  const thes = thesaurusDomains ? thesaurusDomains : {};

  const nounMeaning = Array.isArray(meanings.noun)
    ? JSON.stringify(meanings.noun)
    : null;
  const verbMeaning = Array.isArray(meanings.verb)
    ? JSON.stringify(meanings.verb)
    : null;
  const adjMeaning = Array.isArray(meanings.adj)
    ? JSON.stringify(meanings.adj)
    : null;
  const advMeaning = Array.isArray(meanings.adv)
    ? JSON.stringify(meanings.adv)
    : null;
  const adpMeaning = Array.isArray(meanings.adp)
    ? JSON.stringify(meanings.adp)
    : null;
  const partMeaning = Array.isArray(meanings.part)
    ? JSON.stringify(meanings.part)
    : null;
  const pronMeaning = Array.isArray(meanings.pron)
    ? JSON.stringify(meanings.pron)
    : null;
  const conjMeaning = Array.isArray(meanings.conj)
    ? JSON.stringify(meanings.conj)
    : null;
  const interjMeaning = Array.isArray(meanings.interj)
    ? JSON.stringify(meanings.interj)
    : null;
  const affixMeaning = Array.isArray(meanings.affix)
    ? JSON.stringify(meanings.affix)
    : null;
  const numMeaning = Array.isArray(meanings.num)
    ? JSON.stringify(meanings.num)
    : null;
  const cliticMeaning = Array.isArray(meanings.clitic)
    ? JSON.stringify(meanings.clitic)
    : null;

  const nounWordForms = removeNulls(nounWordFormInputs);
  const verbWordForms = removeNulls(verbWordFormInputs);
  const adjWordForms = removeNulls(adjWordFormInputs);
  const advWordForms = removeNulls(advWordFormInputs);
  const adpWordForms = removeNulls(adpWordFormInputs);
  const partWordForms = removeNulls(partWordFormInputs);
  const pronWordForms = removeNulls(pronWordFormInputs);
  const conjWordForms = removeNulls(conjWordFormInputs);
  const interjWordForms = removeNulls(interjWordFormInputs);
  const affixWordForms = removeNulls(affixWordFormInputs);
  const numWordForms = removeNulls(numWordFormInputs);
  const cliticWordForms = removeNulls(cliticWordFormInputs);

  const editWrdStmt = db.prepare(`
      UPDATE dictionary
      SET
       word =?, word_type =?, word_note =?, ipa =?, noun_meaning =?, verb_meaning =?, adj_meaning =?, adv_meaning =?, adp_meaning =?, part_meaning =?, pron_meaning =?, conj_meaning =?, interj_meaning =?, affix_meaning =?, num_meaning =?, clitic_meaning =?, noun_word_forms =?, verb_word_forms =?, adj_word_forms =?, adv_word_forms =?, adp_word_forms =?, part_word_forms =?, pron_word_forms =?, conj_word_forms =?, interj_word_forms =?, affix_word_forms =?, num_word_forms =?, clitic_word_forms =?,   noun_word_categories =?, verb_word_categories =?, adj_word_categories =?, adv_word_categories =?, adp_word_categories =?, part_word_categories =?, pron_word_categories =?, conj_word_categories =?, interj_word_categories =?, affix_word_categories =?, num_word_categories =?, clitic_word_categories =?, tags =?, thesaurus =?, date_edited = ?
       WHERE word_id = ?
      
          `);

  const editWrd = editWrdStmt.run(
    word,
    wordType ?? null,
    note ?? null,
    pronunciation ?? null,
    nounMeaning,
    verbMeaning,
    adjMeaning,
    advMeaning,
    adpMeaning,
    partMeaning,
    pronMeaning,
    conjMeaning,
    interjMeaning,
    affixMeaning,
    numMeaning,
    cliticMeaning,
    nounWordForms,
    verbWordForms,
    adjWordForms,
    advWordForms,
    adpWordForms,
    partWordForms,
    pronWordForms,
    conjWordForms,
    interjWordForms,
    affixWordForms,
    numWordForms,
    cliticWordForms,
    removeNulls(nounWordCategoryInputs) ?? null,
    removeNulls(verbWordCategoryInputs) ?? null,
    removeNulls(adjWordCategoryInputs) ?? null,
    removeNulls(advWordCategoryInputs) ?? null,
    removeNulls(adpWordCategoryInputs) ?? null,
    removeNulls(partWordCategoryInputs) ?? null,
    removeNulls(pronWordCategoryInputs) ?? null,
    removeNulls(conjWordCategoryInputs) ?? null,
    removeNulls(interjWordCategoryInputs) ?? null,
    removeNulls(affixWordCategoryInputs) ?? null,
    removeNulls(numWordCategoryInputs) ?? null,
    removeNulls(cliticWordCategoryInputs) ?? null,
    JSON.stringify(tagInputs) ?? null,
    JSON.stringify(thes) ?? null,
    Date.now(),
    wordId,
  );

  if (editWrd.changes === 0) return { success: false };

  //now, manage the variants
  if (variants) {
    let variantArr = variants.split(", ");

    for (let i = 0; i < variantArr.length; i++) {
      const addWordStmt = db.prepare(`
          INSERT INTO dictionary
        (variant_of, word_id, language_id, word, word_type, word_note, ipa, noun_meaning, verb_meaning, adj_meaning, adv_meaning, adp_meaning, part_meaning, pron_meaning, conj_meaning, interj_meaning, affix_meaning, num_meaning, clitic_meaning, noun_word_forms, verb_word_forms, adj_word_forms, adv_word_forms, adp_word_forms, part_word_forms, pron_word_forms, conj_word_forms, interj_word_forms, affix_word_forms, num_word_forms, clitic_word_forms,   noun_word_categories, verb_word_categories, adj_word_categories, adv_word_categories, adp_word_categories, part_word_categories, pron_word_categories, conj_word_categories, interj_word_categories, affix_word_categories, num_word_categories, clitic_word_categories, date_added, tags, thesaurus )
          VALUES(?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?, ?, ?, ?)
          `);

      const addWords = addWordStmt.run(
        wordId,
        Date.now(),
        languageId,
        word,
        wordType ?? null,
        note ?? null,
        pronunciation ?? null,
        nounMeaning ?? null,
        verbMeaning ?? null,
        adjMeaning ?? null,
        advMeaning ?? null,
        adpMeaning ?? null,
        partMeaning ?? null,
        pronMeaning ?? null,
        conjMeaning ?? null,
        interjMeaning ?? null,
        affixMeaning ?? null,
        numMeaning ?? null,
        cliticMeaning ?? null,
        nounWordForms ?? null,
        verbWordForms ?? null,
        adjWordForms ?? null,
        advWordForms ?? null,
        adpWordForms ?? null,
        partWordForms ?? null,
        pronWordForms ?? null,
        conjWordForms ?? null,
        interjWordForms ?? null,
        affixWordForms ?? null,
        numWordForms ?? null,
        cliticWordForms ?? null,
        removeNulls(nounWordCategoryInputs) ?? null,
        removeNulls(verbWordCategoryInputs) ?? null,
        removeNulls(adjWordCategoryInputs) ?? null,
        removeNulls(advWordCategoryInputs) ?? null,
        removeNulls(adpWordCategoryInputs) ?? null,
        removeNulls(partWordCategoryInputs) ?? null,
        removeNulls(pronWordCategoryInputs) ?? null,
        removeNulls(conjWordCategoryInputs) ?? null,
        removeNulls(interjWordCategoryInputs) ?? null,
        removeNulls(affixWordCategoryInputs) ?? null,
        removeNulls(numWordCategoryInputs) ?? null,
        removeNulls(cliticWordCategoryInputs) ?? null,
        JSON.stringify(Date.now()),
        JSON.stringify(tagInputs) ?? null,
        JSON.stringify(thes) ?? null,
      );
    }
  }

  return { success: true };
}

export function getWord(id) {
  const getWrdStmt = db.prepare(`
    SELECT * 
    FROM dictionary
    WHERE word_id = ?
    `);

  const getWrd = getWrdStmt.all(id).map(parseDictionary);

  return getWrd[0];
}



export function getToolTipWord(word, languageId) {
  const cleanedWord = word
    .split(" ")
    .map((w) => (w.includes("=") ? w.split("=")[1] : w))
    .join(" ");

  if (!word || !languageId) {
    return { message: "Missing word or languageId" };
  }

  const getWrdStmt = db.prepare(`
      SELECT *
      FROM dictionary
      WHERE word = ? AND language_id = ? AND word_type = ?
      `);

  const getWrd = getWrdStmt
    .all(cleanedWord.toLowerCase(), languageId, "word")
    .map(parseDictionary);

  return getWrd;
}

export function getText(textId, languageId) {
  const getLangStmt = db.prepare(`
    SELECT corpus
    FROM languages
    WHERE language_id = ?
    `);

  const getLang = getLangStmt.all(languageId).map(parseLanguage);

  let correctText = "";

  getLang[0].corpus.forEach((text) => {
    if (text.id == textId) {
      correctText = text;
    }
  });

  if (correctText) {
    return correctText;
  } else {
    return { message: "no corpus text found" };
  }
}

export function editText(textId, languageId, title, text, translation) {
  // Step 1: Get current corpus array
      const getCorpusStmt = db.prepare(`
        SELECT corpus
        FROM languages 
        where language_id = ?
        `)

        const getCorpus = getCorpusStmt.all(languageId).map(parseLanguage);

        const currentCorpus = getCorpus[0].corpus;

      currentCorpus.forEach((corpus) => {
        if (corpus.id == textId) {
          corpus.text = text,
          corpus.translation = translation,
          corpus.title = title
        }
      })


        const editCorpusStmt = db.prepare(`
          UPDATE languages
          SET corpus = ?
          WHERE language_id = ?
          `);

          const editCorpus = editCorpusStmt.run(JSON.stringify(currentCorpus), languageId);

          if (editCorpus.changes === 0) return {"success": false};

          return {"success": true};

    
}
