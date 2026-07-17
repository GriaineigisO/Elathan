import { ipcMain } from "electron";
import { getDerivations, getRootWord } from "../repositories/derivationRepository.js";

export function registerDerivationHandlers() {

    ipcMain.handle(
        "derivation:getDerivations",
        (_, id) => getDerivations(id)
    );

     ipcMain.handle(
        "derivation:getRootWord",
        (_, id, isFirstElement, isSecondElement, isThirdElement) => getRootWord(id, isFirstElement, isSecondElement, isThirdElement)
    );

}