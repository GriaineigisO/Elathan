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

api.getWordsForms = (id) => {
  return ipcRenderer.invoke("dictionary:getWordsForms", id);
};

api.getText = (textId, languageId) => {
  return ipcRenderer.invoke("language:getText", textId, languageId);
};

api.editText = (textId, languageId, title, text, translation) => {
  return ipcRenderer.invoke("language:editText", textId, languageId, title, text, translation);
};


api.getLanguage = (languageId) => {
  return ipcRenderer.invoke("language:getLanguage", languageId);
};

api.editLanguage = (
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
  convertIPA
) => {
  return ipcRenderer.invoke(
    "language:editLanguage",
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
    convertIPA
  );
};

api.getLanguages = () => {
  return ipcRenderer.invoke("language:getLanguages");
};

api.getDaughterLanguages = (id) => {
  return ipcRenderer.invoke("language:getDaughterLanguages", id);
};

api.getMotherLanguage = (id) => {
  return ipcRenderer.invoke("language:getMotherLanguage", id);
};


api.getGroups = () => {
  return ipcRenderer.invoke("language:getGroups");
};

api.getGroup = () => {
  return ipcRenderer.invoke("language:getGroup");
};

api.editGroup = (groupName, wordForms, wordCategories, addedLanguages, id) => {
  return ipcRenderer.invoke(
    "language:editGroup",
    groupName,
    wordForms,
    wordCategories,
    addedLanguages,
    id,
  );
};

api.deleteGroup = (id) => {
  return ipcRenderer.invoke("language:deleteGroup", id);
};

api.saveGrammar = (languageId, grammar) => {
  return ipcRenderer.invoke("language:saveGrammar", languageId, grammar);
};

api.addInterfaceLanguage = (id, languageName, merged) => {
  return ipcRenderer.invoke("language:addInterfaceLanguage", id, languageName, merged);
};

api.getInterfaceLanguages = () => {
  return ipcRenderer.invoke("language:getInterfaceLanguages");
};

api.addText = (id, title, text, translation) => {
  return ipcRenderer.invoke("language:addText", id, title, text, translation);
};

api.deleteText = (textId, languagId) => {
  return ipcRenderer.invoke("language:deleteText", textId, languagId);
};

api.getInterfaceLanguage = (id) => {
  return ipcRenderer.invoke("language:getInterfaceLanguage", id);
};

api.deleteInterfaceLanguage = (id) => {
  return ipcRenderer.invoke("language:deleteInterfaceLanguage", id);
};

api.editUserLanguage = (id) => {
  return ipcRenderer.invoke("language:editUserLanguage", id);
};

api.editInterfaceLanguage = (id, languageName, translations) => {
  return ipcRenderer.invoke("language:editInterfaceLanguage", id, languageName, translations);
};

api.deleteLanguage = (id) => {
  return ipcRenderer.invoke("language:deleteLanguage", id);
};

api.addLanguage = (
  id,
  languageName,
  motherLanguageId,
  daughterLanguageIds,
  isProto,
  wordForms,
  addedGroups,
) => {
  return ipcRenderer.invoke(
    "language:addLanguage",
    id,
    languageName,
    motherLanguageId,
    daughterLanguageIds,
    isProto,
    wordForms,
    addedGroups,
  );
};

api.addGroup = (groupName, wordForms, addedLanguages) => {
  return ipcRenderer.invoke(
    "language:addGroup",
    groupName,
    wordForms,
    addedLanguages,
  );
};

api.getTags = (languageId) => {
  return ipcRenderer.invoke("language:getTags", languageId);
};

api.getWordCategories = (languageId) => {
  return ipcRenderer.invoke("language:getWordCategories", languageId);
};

api.getWord = (id) => {
  return ipcRenderer.invoke("language:getWord", id);
};

api.getToolTipWord = (word, languageId) => {
  return ipcRenderer.invoke("language:getToolTipWord", word, languageId);
};

api.getDerivations = (id) => {
  return ipcRenderer.invoke("derivation:getDerivations", id);
};

api.getRootWord = (id, isFirstElement, isSecondElement, isThirdElement) => {
  return ipcRenderer.invoke(
    "derivation:getRootWord",
    id,
    isFirstElement,
    isSecondElement,
    isThirdElement,
  );
};

api.getEtymologyTrees = (id, rootIds) => {
  return ipcRenderer.invoke("etymology:getEtymologyTrees", id, rootIds);
};

api.editEtymology = (etymologyId,
        etymologyType,
        word_id,
        motherWord,
        firstElementId,
        secondElementId,
        thirdElementId,
        loanWordId,
        note) => {
  return ipcRenderer.invoke("etymology:editEtymology", etymologyId,
        etymologyType,
        word_id,
        motherWord,
        firstElementId,
        secondElementId,
        thirdElementId,
        loanWordId,
        note);
};

api.getEtymology = (id) => {
  return ipcRenderer.invoke("etymology:getEtymology", id);
};

api.deleteEtymology = (id) => {
  return ipcRenderer.invoke("etymology:deleteEtymology", id);
};

api.addEncyclopedia = (id, encyclopediaName, topics) => {
  return ipcRenderer.invoke(
    "encyclopedia:addEncyclopedia",
    id,
    encyclopediaName,
    topics,
  );
};

api.deleteEncyclopedia = (id) => {
  return ipcRenderer.invoke("encyclopedia:deleteEncyclopedia", id);
};

api.editEncyclopedia = (id, encyclopediaName, topics) => {
  return ipcRenderer.invoke(
    "encyclopedia:editEncyclopedia",
    id,
    encyclopediaName,
    topics,
  );
};

api.addEntry = (encyclopediaId, headword, entryText, entryTopic) => {
  return ipcRenderer.invoke(
    "encyclopedia:addEntry",
    encyclopediaId,
    headword,
    entryText,
    entryTopic,
  );
};

api.addEtymology = (
  word_id,
  etymologyType,
  motherWord,
  firstElementId,
  secondElementId,
  thirdElementId,
  loanWordId,
  note,
) => {
  return ipcRenderer.invoke(
    "etymology:addEtymology",
    word_id,
    etymologyType,
    motherWord,
    firstElementId,
    secondElementId,
    thirdElementId,
    loanWordId,
    note,
  );
};

api.getEncyclopedias = (id) => {
  return ipcRenderer.invoke("encyclopedia:getEncyclopedias", id);
};

api.getEncyclopedia = (id) => {
  return ipcRenderer.invoke("encyclopedia:getEncyclopedia", id);
};

api.deleteEntry = (id) => {
  return ipcRenderer.invoke("encyclopedia:deleteEntry", id);
};

api.getWordForms = (languageId) => {
  return ipcRenderer.invoke("language:getWordForms", languageId);
};

api.savePhonology = (title, template) => {
  return ipcRenderer.invoke("language:savePhonology", title, template);
};

api.getLoanerLanguage = (id) => {
  return ipcRenderer.invoke("language:getLoanerLanguage", id);
};

api.editWord = (
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
) => {
  return ipcRenderer.invoke(
    "language:editWord",
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
  );
};

api.editEntry = (headword, entryText, entryTopic, id) => {
  return ipcRenderer.invoke(
    "encyclopedia:editEntry",
    headword,
    entryText,
    entryTopic,
    id,
  );
};

api.getEntry = (id) => {
  return ipcRenderer.invoke("encyclopedia:getEntry", id);
};

api.addWord = (
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
  pronWordCategoryInputs,
  cliticWordCategoryInputs,
  tagInputs,
  variants,
  thesaurusDomains,
) => {
  return ipcRenderer.invoke(
    "language:addWord",
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
    pronWordCategoryInputs,
    cliticWordCategoryInputs,
    tagInputs,
    variants,
    thesaurusDomains,
  );
};

contextBridge.exposeInMainWorld("electron", api);
