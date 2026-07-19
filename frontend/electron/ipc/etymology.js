import { ipcMain } from "electron";
import { getEtymologyTrees, getEtymology, addEtymology } from "../repositories/EtymologyRepository.js";

export function registerEtymologyHandlers() {

    ipcMain.handle(
        "etymology:getEtymologyTrees",
        (_, id, rootIds) => getEtymologyTrees(id, rootIds)
    );

    ipcMain.handle(
        "etymology:getEtymology",
        (_, id) => getEtymology(id)
    );


     ipcMain.handle(
        "etymology:addEtymology",
        (_, languageId, word_id, etymologyType, motherWord, firstElementId, secondElementId, thirdElementId, loanWordId, note) => addEtymology(languageId, word_id, etymologyType, motherWord, firstElementId, secondElementId, thirdElementId, loanWordId, note)
    );

  
}