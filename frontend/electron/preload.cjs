
const { contextBridge, ipcRenderer } = require("electron");

const api = {};

api.getVersion = () => ipcRenderer.invoke("get-version");

api.rebuild = () => {
    return ipcRenderer.invoke("database:rebuild");
};

api.getAllWords = (languageId) => {
    return ipcRenderer.invoke("dictionary:getAllWords", languageId);
};

api.deleteWord = (id) => {
    return ipcRenderer.invoke("language:deleteWord", id);
};

api.getWordData = (id) => {
    return ipcRenderer.invoke("dictionary:getWordData", id);
};

api.getLanguage = (languageId) => {
    return ipcRenderer.invoke("language:getLanguage", languageId);
};

api.editLanguage = (id, languageName, motherLanguageId, daughterLanguageIds, removedDaughterLanguageIds, isProto, wordForms,  addedGroups, groupsToBeRemoved, newGroups, addedTagGroups, spelling, selectedSoundChanges, allCategoryValues) => {
    return ipcRenderer.invoke("language:editLanguage", id, languageName, motherLanguageId, daughterLanguageIds, removedDaughterLanguageIds, isProto, wordForms,  addedGroups, groupsToBeRemoved, newGroups, addedTagGroups, spelling, selectedSoundChanges, allCategoryValues);
};

api.getLanguages = () => {
    return ipcRenderer.invoke("language:getLanguages")
};

api.getDaughterLanguages = (id) => {
    return ipcRenderer.invoke("language:getDaughterLanguages", id)
};

api.getMotherLanguage = (id) => {
    return ipcRenderer.invoke("language:getMotherLanguage", id)
};

api.getInterfaceLanguage = () => {
    return ipcRenderer.invoke("language:getInterfaceLanguage")
};

api.getGroups = () => {
    return ipcRenderer.invoke("language:getGroups")
};

api.getGroup = () => {
    return ipcRenderer.invoke("language:getGroup")
};

api.editGroup = (groupName, wordForms, wordCategories, addedLanguages, id) => {
    return ipcRenderer.invoke("language:editGroup", groupName, wordForms, wordCategories, addedLanguages, id)
};

api.deleteGroup = (id) => {
    return ipcRenderer.invoke("language:deleteGroup", id)
};

api.deleteLanguage = (id) => {
    return ipcRenderer.invoke("language:deleteLanguage", id)
};

api.addLanguage = (id, languageName, motherLanguageId, daughterLanguageIds, isProto, wordForms, addedGroups) => {
    return ipcRenderer.invoke("language:addLanguage", id, languageName, motherLanguageId, daughterLanguageIds, isProto, wordForms, addedGroups)
};

api.addGroup = (groupName, wordForms, addedLanguages) => {
    return ipcRenderer.invoke("language:addGroup", groupName, wordForms, addedLanguages)
};

api.getTags = (languageId) => {
    return ipcRenderer.invoke("language:getTags", languageId);
};

api.getWordCategories = (languageId) => {
    return ipcRenderer.invoke("language:getWordCategories", languageId);
};

api.getDerivations = (id) => {
    return ipcRenderer.invoke("derivation:getDerivations", id);
};

api.getRootWord = (id, isFirstElement, isSecondElement, isThirdElement) => {
    return ipcRenderer.invoke("derivation:getRootWord", id, isFirstElement, isSecondElement, isThirdElement);
};

api.getEtymologyTrees = (id, rootIds) => {
    return ipcRenderer.invoke("etymology:getEtymologyTrees", id, rootIds);
};

api.getEtymology = (id) => {
    return ipcRenderer.invoke("etymology:getEtymology", id);
};

api.addEtymology = (languageId, word_id, etymologyType, motherWord, firstElementId, secondElementId, thirdElementId, loanWordId, note) => {
    return ipcRenderer.invoke("etymology:addEtymology", languageId, word_id, etymologyType, motherWord, firstElementId, secondElementId, thirdElementId, loanWordId, note);
};

api.getEncyclopedias = (id) => {
    return ipcRenderer.invoke("encyclopedia:getEncyclopedias", id);
};

api.getEncyclopedia = (id) => {
    return ipcRenderer.invoke("encyclopedia:getEncyclopedia", id);
};

api.getWordForms = (languageId) => {
    return ipcRenderer.invoke("language:getWordForms", languageId);
};

api.addWord = (date,
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
        thesaurusDomains) => {
    return ipcRenderer.invoke("language:addWord", date,
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
};

contextBridge.exposeInMainWorld("electron", api);

