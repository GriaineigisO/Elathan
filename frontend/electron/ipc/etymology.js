import { ipcMain } from "electron";
import { getEtymologyTrees, getEtymology } from "../repositories/EtymologyRepository.js";

export function registerEtymologyHandlers() {

    ipcMain.handle(
        "etymology:getEtymologyTrees",
        (_, id, rootIds) => getEtymologyTrees(id, rootIds)
    );

    ipcMain.handle(
        "etymology:getEtymology",
        (_, id) => getEtymology(id)
    );

  
}