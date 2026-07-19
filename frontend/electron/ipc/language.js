import { ipcMain } from "electron";
import { getLanguage, getLanguages, getDaughterLanguages, getGroups, getGroup, getTags, getInterfaceLanguage, getMotherLanguage, getWordForms, editGroup, deleteGroup, editLanguage, deleteLanguage, addLanguage, addGroup, addWord, getWordCategories, deleteWord } from "../repositories/languageRepository.js";

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
        "language:getLanguages",
        (_,) => getLanguages()
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
        "language:getWordCategories",
        (_, languageId) => getWordCategories(languageId)
    );

    ipcMain.handle(
        "language:getInterfaceLanguage",
        (_, id) => getInterfaceLanguage(id)
    );

    ipcMain.handle(
        "language:getWordForms",
        (_, languageId) => getWordForms(languageId)
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