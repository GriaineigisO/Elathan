import { ipcMain } from "electron";
import { getLanguage, getLanguages, getGroups, getTags } from "../repositories/languageRepository.js";

export function registerLanguageHandlers() {

    ipcMain.handle(
        "language:getLanguage",
        (_, languageId) => getLanguage(languageId)
    );

     ipcMain.handle(
        "language:getLanguages",
        (_,) => getLanguages()
    );

    ipcMain.handle(
        "language:getGroups",
        (_,) => getGroups()
    );

     ipcMain.handle(
        "language:getTags",
        (_, languageId) => getTags(languageId)
    );

}