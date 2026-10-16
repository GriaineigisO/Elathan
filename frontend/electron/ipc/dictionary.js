import { ipcMain } from "electron";
import { getAllWords, getAllWordsForPrint } from "../repositories/dictionaryRepository.js";
import { getWordData, getWordsForms, editExcludedNearSynonyms } from "../repositories/wordRepository.js";

export function registerDictionaryHandlers() {
  ipcMain.handle("dictionary:getAllWords", (_, languageId) =>
    getAllWords(languageId),
  );

  ipcMain.handle("dictionary:getWordData", (_, id) => getWordData(id));

  ipcMain.handle("dictionary:editExcludedNearSynonyms", (_, arr, id) => editExcludedNearSynonyms(arr, id));

  ipcMain.handle("dictionary:getWordsForms", (_, id) => getWordsForms(id));

  ipcMain.handle("dictionary:getAllWordsForPrint", (_, id) => getAllWordsForPrint(id));

  
}
