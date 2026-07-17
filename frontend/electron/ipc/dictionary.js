import { ipcMain } from "electron";
import { getAllWords } from "../repositories/dictionaryRepository.js";
import { getWordData } from "../repositories/wordRepository.js";

export function registerDictionaryHandlers() {
  ipcMain.handle("dictionary:getAllWords", (_, languageId) =>
    getAllWords(languageId),
  );

  ipcMain.handle("dictionary:getWordData", (_, id) => getWordData(id));
}
