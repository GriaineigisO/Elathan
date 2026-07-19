export async function getLanguage(languageId) {

    return await window.electron.getLanguage(languageId);
}

export async function getLanguages() {

    return await window.electron.getLanguages();
}

export async function editLanguage(id, languageName, motherLanguageId, daughterLanguageIds, removedDaughterLanguageIds, isProto, wordForms,  addedGroups, groupsToBeRemoved, newGroups, addedTagGroups, spelling, selectedSoundChanges, allCategoryValues) {

    return await window.electron.editLanguage(id, languageName, motherLanguageId, daughterLanguageIds, removedDaughterLanguageIds, isProto, wordForms,  addedGroups, groupsToBeRemoved, newGroups, addedTagGroups, spelling, selectedSoundChanges, allCategoryValues);
}

export async function getDaughterLanguages() {

    return await window.electron.getDaughterLanguages();
}

export async function getMotherLanguage(id) {

    return await window.electron.getMotherLanguage(id);
}

export async function getGroups() {

    return await window.electron.getGroups();
}

export async function getGroup() {

    return await window.electron.getGroup();
}

export async function deleteGroup(id) {

    return await window.electron.deleteGroup(id);
}

export async function deleteLanguage(id) {

    return await window.electron.deleteLanguage(id);
}

export async function editGroup(groupName, wordForms, wordCategories, addedLanguages, id) {

    return await window.electron.editGroup(groupName, wordForms, wordCategories, addedLanguages, id);
}

export async function getTags(languageId) {

    return await window.electron.getTags(languageId);
}

export async function getWordCategories(languageId) {

    return await window.electron.getWordCategories(languageId);
}

export async function getInterfaceLanguage(languageId) {

    return await window.electron.getInterfaceLanguage(languageId);
}

export async function getWordForms(languageId) {

    return await window.electron.getWordForms(languageId);
}

export async function deleteWord(id) {

    return await window.electron.deleteWord(id);
}

export async function addLanguage(id, languageName, motherLanguageId, daughterLanguageIds, isProto, wordForms, addedGroups) {

    return await window.electron.addLanguage(id, languageName, motherLanguageId, daughterLanguageIds, isProto, wordForms, addedGroups);
}

export async function addGroup(groupName, wordForms, addedLanguages) {

    return await window.electron.addGroup(groupName, wordForms, addedLanguages);
}

export async function addWord(date,
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
        pronWordCategoryInputs,
        cliticWordCategoryInputs,
        tagInputs,
        variants,
        thesaurusDomains) {

    return await window.electron.addWord(date,
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
        pronWordCategoryInputs,
        cliticWordCategoryInputs,
        tagInputs,
        variants,
        thesaurusDomains);
}