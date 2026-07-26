import { ipcMain } from "electron";
import { getLanguage, getLanguages, getDaughterLanguages, getGroups, getGroup, getTags, getInterfaceLanguage, getMotherLanguage, getWordForms, editGroup, deleteGroup, editLanguage, deleteLanguage, addLanguage, addGroup, addWord, getWordCategories, deleteWord, getWord, editWord, getText, getToolTipWord, editText, saveGrammar, addInterfaceLanguage, getInterfaceLanguages, editInterfaceLanguage, deleteInterfaceLanguage, editUserLanguage, addText, deleteText, getLoanerLanguage, savePhonology } from "../repositories/languageRepository.js";

export function registerLanguageHandlers() {

    ipcMain.handle(
        "language:getLanguage",
        (_, languageId) => getLanguage(languageId)
    );

    ipcMain.handle(
        "language:deleteWord",
        (_, id) => deleteWord(id)
    );

    ipcMain.handle(
        "language:getLoanerLanguage",
        (_, id) => getLoanerLanguage(id)
    );



    ipcMain.handle(
        "language:editWord",
        (_,wordId,
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
  thesaurusDomains) => editWord(wordId,
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
  thesaurusDomains)
    );

     ipcMain.handle(
        "language:getLanguages",
        (_,) => getLanguages()
    );

    
     ipcMain.handle(
        "language:getText",
        (_, textId, languageId) => getText(textId, languageId)
    );

      ipcMain.handle(
        "language:editText",
        (_, textId, languageId, title, text, translation) => editText(textId, languageId, title, text, translation)
    );


    



    ipcMain.handle(
        "language:deleteLanguage",
        (_, id) => deleteLanguage(id)
    );

    ipcMain.handle(
        "language:addGroup",
        (_, groupName, wordForms, addedLanguages) => addGroup(groupName, wordForms, addedLanguages)
    );

     ipcMain.handle(
        "language:addLanguage",
        (_, id, languageName, motherLanguageId, daughterLanguageIds, isProto, wordForms, addedGroups) => addLanguage(id, languageName, motherLanguageId, daughterLanguageIds,isProto, wordForms, addedGroups)
    );

     ipcMain.handle(
        "language:editLanguage",
        (_, id, languageName, motherLanguageId, daughterLanguageIds, removedDaughterLanguageIds, isProto, wordForms,  addedGroups, groupsToBeRemoved, newGroups, addedTagGroups, spelling, selectedSoundChanges, allCategoryValues) => editLanguage(id, languageName, motherLanguageId, daughterLanguageIds, removedDaughterLanguageIds, isProto, wordForms,  addedGroups, groupsToBeRemoved, newGroups, addedTagGroups, spelling, selectedSoundChanges, allCategoryValues)
    );

      ipcMain.handle(
        "language:getDaughterLanguages",
        (_, id) => getDaughterLanguages(id)
    );

     ipcMain.handle(
        "language:getMotherLanguage",
        (_, id) => getMotherLanguage(id)
    );

    ipcMain.handle(
        "language:getGroups",
        (_,) => getGroups()
    );

     ipcMain.handle(
        "language:editGroup",
        (_, groupName, wordForms, wordCategories, addedLanguages, id) => editGroup(groupName, wordForms, wordCategories, addedLanguages, id)
    );

    ipcMain.handle(
        "language:deleteGroup",
        (_, id) => deleteGroup(id)
    );


     ipcMain.handle(
        "language:getTags",
        (_, languageId) => getTags(languageId)
    );

     ipcMain.handle(
        "language:addInterfaceLanguage",
        (_, id, languageName, merged) => addInterfaceLanguage(id, languageName, merged)
    );

    ipcMain.handle(
        "language:getInterfaceLanguages",
        (_,) => getInterfaceLanguages()
    );

     ipcMain.handle(
        "language:getInterfaceLanguage",
        (_, id) => getInterfaceLanguage(id)
    );

    ipcMain.handle(
        "language:deleteInterfaceLanguage",
        (_, id) => deleteInterfaceLanguage(id)
    );

    ipcMain.handle(
        "language:editUserLanguage",
        (_, id) => editUserLanguage(id)
    );

      ipcMain.handle(
        "language:editInterfaceLanguage",
        (_, id, languageName, translations) => editInterfaceLanguage(id, languageName, translations)
    );

    ipcMain.handle(
        "language:getWordCategories",
        (_, languageId) => getWordCategories(languageId)
    );

    ipcMain.handle(
        "language:addText",
        (_, id, title, text, translation) => addText(id, title, text, translation)
    );


    ipcMain.handle(
        "language:deleteText",
        (_, textId, languagId) => deleteText(textId, languagId)
    );

 
    ipcMain.handle(
        "language:getWordForms",
        (_, languageId) => getWordForms(languageId)
    );

    ipcMain.handle(
        "language:saveGrammar",
        (_, languageId, grammar) => saveGrammar(languageId, grammar)
    );

    ipcMain.handle(
        "language:savePhonology",
        (_, title, template) => savePhonology(title, template)
    );

     ipcMain.handle(
        "language:getWord",
        (_, id) => getWord(id)
    );


    ipcMain.handle(
        "language:getToolTipWord",
        (_, word, languageId) => getToolTipWord(word, languageId)
    );

    ipcMain.handle(
        "language:addWord",
        (_, date,
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
        thesaurusDomains) => addWord(date,
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
        thesaurusDomains)
    );

}

